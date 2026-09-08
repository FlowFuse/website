// Generates the /docs/node-red/core-nodes/** pages.
//
// These are the one part of the Node-RED library that was never a file. Under Eleventy,
// `src/node-red/core-nodes/*.njk` paginated over `src/_data/coreNodes.json` and each page
// called a shortcode that fetched the node's help straight out of the Node-RED project's
// repo at build time (`lib/core-node-docs.js`). @nuxt/content indexes files, so the pages
// have to exist as markdown before it runs.
//
// The help text is upstream's, so it is fetched from the Node-RED repo on every build
// rather than copied into this one. That is a deliberate trade: a copy cannot be 1:1 with
// upstream, and nobody should have to remember to refresh it. The cost is that a deploy
// depends on raw.githubusercontent.com being reachable and on the catalogue still matching
// upstream's help names.
//
// What is NOT acceptable is the old failure mode. `lib/core-node-docs.js` selected the
// help with an xpath, got an empty node-set when upstream renamed a block, joined it to
// an empty string and rendered the page anyway. Four pages shipped an empty "Node
// Documentation" section that way. So every miss here throws, and a rename stops the
// build instead of quietly emptying a page.
//
// The FlowFuse-authored half is `src/_includes/core-nodes/<slug>-use-case.md`: a short
// "why you would reach for this node" intro that exists for every node. That is the part
// worth keeping, so it leads the page and the mirrored help follows under its own heading.
// Those fragments are Eleventy markdown and most of them embed a flow, so they go through
// the same library-markdown transforms as the rest of the section rather than being
// inlined raw - otherwise `{% renderFlow %}` reaches @nuxt/content as literal text.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { processLibraryMarkdown } from './library-markdown.mjs'

const UPSTREAM = 'https://raw.githubusercontent.com/node-red/node-red/master/packages/node_modules/%40node-red/nodes/locales/en-US'

/**
 * The heading, sidebar label and ordering for each palette category.
 *
 * `navTitle` is not just `title` with a word added: a category's sidebar entry is the
 * parent of its nodes, and Node-RED names one node after its own category, so a bare
 * "Function" would appear immediately above a node also called "Function" with nothing to
 * tell them apart. `title` stays the plain palette name for the section index's headings,
 * where it is a heading rather than a nav entry and reads better short.
 */
export const CATEGORIES = {
    common: { title: 'Common', navTitle: 'Common nodes', order: 1 },
    function: { title: 'Function', navTitle: 'Function nodes', order: 2 },
    network: { title: 'Network', navTitle: 'Network nodes', order: 3 },
    sequence: { title: 'Sequence', navTitle: 'Sequence nodes', order: 4 },
    parsers: { title: 'Parsers', navTitle: 'Parser nodes', order: 5 },
    storage: { title: 'Storage', navTitle: 'Storage nodes', order: 6 },
}

/** `Read File` -> `read-file`, matching the URLs these pages have always had. */
export function slugFor (name) {
    return String(name).toLowerCase().replace(/\s+/g, '-')
}

/**
 * Pull one node's help out of a locale file.
 *
 * A locale file can hold help for several nodes, each in its own
 * `<script data-help-name="...">`, so the right script is selected by name. Kept as a
 * pure string function so it is testable without the network.
 *
 * The match tolerates hyphen-versus-space, and that is not cosmetic. `coreNodes.json`
 * asks for `mqtt-in` while upstream's file now says `mqtt in`. The Eleventy version used
 * an xpath `starts-with()` on the literal string, found nothing, and rendered the page
 * with an empty "Node Documentation" section rather than failing - so the live
 * /node-red/core-nodes/mqtt-in/ and mqtt-out/ pages have been shipping no help at all.
 * Normalising here fixes both, and `syncCoreNodes` throws on a miss so the next rename
 * is loud instead of silent.
 */
const normalise = (s) => String(s).toLowerCase().replace(/[\s-]+/g, ' ').trim()

export function extractHelp (html, helpName) {
    const scripts = [...String(html).matchAll(
        /<script[^>]*\bdata-help-name="([^"]*)"[^>]*>([\s\S]*?)<\/script>/g
    )]
    const want = normalise(helpName)

    // An exact name wins on its own. Without this, asking for `file` (Write File) would
    // also drag in `file in` (Read File) by prefix and put both nodes' help on one page.
    const exact = scripts.find(([, name]) => normalise(name) === want)
    if (exact) return exact[2].trim()

    // Otherwise every name starting with the requested one, joined in document order.
    // Several catalogue entries name a whole family rather than one node - `link` covers
    // link in, link out and link call; `websocket` covers four - and the Eleventy page
    // showed all of them: its xpath was starts-with() over a node set, joined. Taking
    // only the first match here dropped most of those pages' help while still captioning
    // it as the node's complete built-in help, which is worse than dropping it visibly.
    return scripts
        .filter(([, name]) => normalise(name).startsWith(want))
        .map(([, , help]) => help.trim())
        .filter(Boolean)
        .join('\n\n')
}

/** Every node in the catalogue, flattened, with its category and slug resolved. */
export function listNodes (coreNodes) {
    return Object.entries(coreNodes).flatMap(([category, nodes]) =>
        nodes.map(node => ({ ...node, category, slug: slugFor(node.name) })))
}

/**
 * Fetch every node's help from the Node-RED repo.
 *
 * Uses the global fetch and nothing else: `scripts/sync_docs.mjs` runs this before
 * `npm install` in CI, so it cannot reach for a dependency.
 *
 * Two failures are told apart on purpose. A transport failure or a 5xx is transient and
 * retried, because one bad minute at GitHub should not fail a deploy. A 404, or a file
 * that does not contain the help name the catalogue asked for, is a real mismatch that no
 * retry will fix, so it throws immediately and names both the node and the URL.
 *
 * One locale file often serves several nodes (mqtt in/out, udp in/out, split/join), so
 * responses are fetched once per file and reused rather than once per node.
 */
export async function fetchCoreNodeHelp ({ coreNodes, fetchImpl = fetch, retries = 3, delay = 500 } = {}) {
    const nodes = listNodes(coreNodes)
    const files = new Map()

    for (const url of new Set(nodes.map(n => `${UPSTREAM}/${n.category}/${n.file}.html`))) {
        let lastError
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const res = await fetchImpl(url)
                if (res.status === 404) throw new Error(`${url} returned 404; the catalogue points at a file upstream no longer has`)
                if (!res.ok) { lastError = new Error(`${url} returned ${res.status}`); }
                else { files.set(url, await res.text()); lastError = null; break }
            } catch (err) {
                if (/404/.test(err.message)) throw err
                lastError = err
            }
            if (attempt < retries) await new Promise(r => setTimeout(r, delay * attempt))
        }
        if (lastError) throw new Error(`Could not fetch core node help: ${lastError.message}`)
    }

    const help = {}
    const missing = []
    for (const node of nodes) {
        const url = `${UPSTREAM}/${node.category}/${node.file}.html`
        const extracted = extractHelp(files.get(url), node.xpath)
        if (!extracted) missing.push(`${node.name} (wanted data-help-name="${node.xpath}" in ${node.category}/${node.file}.html)`)
        help[`${node.category}/${node.slug}`] = extracted
    }

    // Reported together rather than one at a time: when upstream reorganises a locale
    // file, several nodes move at once and one error per run makes that take several runs
    // to discover.
    if (missing.length) {
        throw new Error(
            'Upstream help not found for ' + missing.length + ' core node(s):\n  ' + missing.join('\n  ') +
            '\nUpstream renamed or moved these help blocks. Fix src/_data/coreNodes.json.'
        )
    }

    return help
}

/** Where a core-node page's images and videos are served from, whatever the page's depth. */
export const CORE_NODE_ASSETS = '/docs/node-red/core-nodes/images/'

/**
 * Make a use-case include's asset references absolute.
 *
 * The includes live in src/_includes/core-nodes/ but their images live with the library
 * pages, so they reference them as `./images/x.png`. A relative reference resolves against
 * the directory the built page sits in, which means it silently depends on how deep the
 * page's URL is. That held while the pages were flat, directly under core-nodes/ where
 * images/ also sits, and broke the moment the palette categories added a level: every
 * `./images/x.png` started resolving to core-nodes/<category>/images/x.png.
 *
 * Writing the asset path out means the page's depth stops mattering. The absolute
 * references some includes already use for <video> were unaffected either way, which is
 * exactly the inconsistency this removes.
 */
export function absolutiseUseCaseAssets (content) {
    return content.replace(/(["'(])\.\/images\//g, `$1${CORE_NODE_ASSETS}`)
}

/**
 * Fold a use-case include's own H1s under the H1 this generator emits.
 *
 * The page is assembled here, so it owns the `# <node name>` heading; a use-case file that
 * also opens with one leaves the page with two. `mqtt-in-use-case.md` and
 * `mqtt-out-use-case.md` start with `# {{ meta.title }}`, which the library transforms
 * resolve to the node's own name, so those two rendered the node name twice in a row.
 *
 * On Eleventy the same duplicate H1 was there but empty (`meta.title` was undefined on a
 * paginated core-node page), so it was invisible and stayed. Resolving the interpolation
 * made it visible, which is how the review caught it.
 *
 * A heading that just repeats the node name is dropped rather than demoted, since it says
 * nothing the H1 above it has not. Any other H1 becomes an H2, which is what it should
 * have been inside an include: a section of the page, not the page's title. Fenced blocks
 * are left byte for byte, so a `#` comment in an example is not a heading.
 */
export function foldUseCaseHeadings (content, nodeName) {
    const normaliseHeading = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
    const isNodeName = (text) => normaliseHeading(text) === normaliseHeading(nodeName)

    // Indentation allowed, so a fence inside a list item is recognised too.
    return content.split(/(^[ \t]*```[\s\S]*?^[ \t]*```)/gm).map((block, index) => {
        if (index % 2 === 1) return block

        return block
            .replace(/^# +(.+?)[ \t]*$\n?(?:[ \t]*\n)*/gm, (_match, text) =>
                isNodeName(text) ? '' : `## ${text}\n\n`)
    }).join('')
}

/**
 * One palette category: the sidebar group its nodes sit in, and a page listing them.
 *
 * The categories are a level of the tree rather than headings on one page because
 * nuxt/lib/docs-nav.mjs builds the sidebar from paths alone - there is no nav-only
 * grouping field below the top-level navGroup - and the editor's own palette is grouped
 * this way, so the sidebar should be too.
 *
 * Nesting is also what keeps the Function node and the Function category apart. Flat, both
 * wanted /docs/node-red/core-nodes/function/ and whichever @nuxt/content resolved last
 * won, silently. As a directory the category is that path and the node is
 * core-nodes/function/function/, which is unambiguous.
 */
export function renderCoreNodeCategoryPage (category, meta, nodes) {
    const list = nodes
        .map(n => `- [${n.name}](/docs/node-red/core-nodes/${category}/${n.slug}/)${n.description ? `: ${n.description}` : ''}`)
        .join('\n')

    return `---
title: "Node-RED ${meta.title.toLowerCase()} nodes"
metaTitle: "Node-RED ${meta.title} Nodes"
navTitle: "${meta.navTitle}"
navOrder: ${meta.order}
meta:
    description: "The ${meta.title} nodes in Node-RED's default palette, and what each one is for."
---

# ${meta.title}

The **${meta.title}** section of Node-RED's default palette. Each page opens with why you
would reach for that node, then mirrors the node's built-in help.

${list}
`
}

/** One page: the FlowFuse use-case intro, then the mirrored upstream help. */
export function renderCoreNodePage (node, { useCase, help, navOrder }) {
    const fm = [
        `title: "Node-RED ${node.name} node"`,
        // The <title> and search-result title, kept byte-identical to the Eleventy page
        // this replaces ("Node-RED - Inject Node"), because every one of these URLs 301s
        // onto its new one and carries its ranking with it. Without this the docs page
        // falls back to navTitle and the title becomes the bare node name, "Inject".
        `metaTitle: "Node-RED - ${node.name} Node"`,
        `navTitle: "${node.name}"`,
        `navOrder: ${navOrder}`,
        'meta:',
        `    description: "${String(node.description || '').replace(/"/g, '\\"')}"`,
        node.keywords ? `    keywords: "${String(node.keywords).replace(/"/g, '\\"')}"` : null,
    ].filter(Boolean).join('\n')

    const body = [
        `# ${node.name}`,
        useCase ? useCase.trim() : '',
        '## Node help',
        '::callout{icon="i-lucide-info"}',
        `This is the ${node.name} node's built-in help, mirrored from the Node-RED project. It is the same text the editor shows in its Info sidebar.`,
        '::',
        help.trim(),
    ].filter(Boolean).join('\n\n')

    return `---\n${fm}\n---\n\n${body}\n`
}

/**
 * The node list for the section index, grouped by palette category.
 *
 * Each heading links its category's own page, which renderCoreNodeCategoryPage writes;
 * the rationale for the categories being pages at all is there rather than repeated here.
 * The section index lists every node as well, so it stays usable as one flat overview.
 */
export function renderCategorySections (nodes) {
    return Object.entries(CATEGORIES)
        .sort((a, b) => a[1].order - b[1].order)
        .filter(([category]) => nodes.some(n => n.category === category))
        .map(([category, meta]) => {
            const list = nodes
                .filter(n => n.category === category)
                .map(n => `- [${n.name}](/docs/node-red/core-nodes/${category}/${n.slug}/)${n.description ? `: ${n.description}` : ''}`)
                .join('\n')
            return `## [${meta.title}](/docs/node-red/core-nodes/${category}/)\n\n${list}`
        })
        .join('\n\n')
}

/**
 * Write the whole core-nodes tree into the docs content tree.
 *
 * Called from the docs-source module after guides-sync, so the pages are in place before
 * @nuxt/content indexes the collection. The destination is nuxt/content/docs, which is
 * gitignored and wiped on every sync - the same place guides-sync writes to, and the
 * reason these generated pages are not committed. Writing them into content-guides/
 * instead would dirty the working tree on every build.
 *
 * Takes `help` rather than fetching it, so the whole tree-writing half stays synchronous
 * and testable without a network stub.
 */
export function syncCoreNodes ({ repoRoot, nuxtRoot, coreNodes, help, logger = console }) {
    const outDir = join(nuxtRoot, 'content', 'docs', 'node-red', 'core-nodes')
    const nodes = listNodes(coreNodes)
    // Trimmed, because renderCoreNodePage trims before deciding whether there is help to
    // show. Guarding on the untrimmed value let whitespace-only help through, which then
    // rendered the "Node help" heading and its callout with nothing underneath - the exact
    // empty-section failure this module exists to make impossible.
    const missing = nodes.filter(n => !String(help[`${n.category}/${n.slug}`] ?? '').trim())

    if (missing.length) {
        throw new Error(
            'No help fetched for: ' + missing.map(n => n.name).join(', ') +
            '. fetchCoreNodeHelp should have thrown before this point.'
        )
    }

    mkdirSync(outDir, { recursive: true })

    // `index.md`, not `README.md`. The README convention belongs to the sync layer:
    // guides-sync's destinationFor renames it on the way into the content tree. This
    // writes straight into that tree, so it has to use the name @nuxt/content and the
    // prerender collector expect. Getting this wrong produced routes like
    // /docs/node-red/core-nodes/README/ that prerendered as 404s and failed the build.
    writeFileSync(join(outDir, 'index.md'), `---
title: "Node-RED core nodes"
metaTitle: "Node-RED Core Nodes"
navTitle: "Core nodes"
navOrder: 3
meta:
    description: "What each node in the default Node-RED palette does, and a worked reason to reach for it."
---

# Core nodes

Every node in Node-RED's default palette, grouped into the same sections the editor's
palette uses. Each page opens with why you would reach for that node, then mirrors the
node's built-in help.

${renderCategorySections(nodes)}
`, 'utf8')

    for (const [category, meta] of Object.entries(CATEGORIES)) {
        const inCategory = nodes.filter(n => n.category === category)
        if (!inCategory.length) continue

        const categoryDir = join(outDir, category)
        mkdirSync(categoryDir, { recursive: true })
        writeFileSync(join(categoryDir, 'index.md'), renderCoreNodeCategoryPage(category, meta, inCategory), 'utf8')

        // Restarts per category: navOrder ranks a node among its siblings, which are now
        // the nodes in its own category rather than all of them.
        let navOrder = 1
        for (const node of inCategory) {
            const useCasePath = join(repoRoot, 'src/_includes/core-nodes', `${node.slug}-use-case.md`)
            const useCase = existsSync(useCasePath)
                ? foldUseCaseHeadings(
                    absolutiseUseCaseAssets(
                        processLibraryMarkdown(readFileSync(useCasePath, 'utf8'), { title: node.name })),
                    node.name)
                : ''
            const dest = join(categoryDir, `${node.slug}.md`)
            mkdirSync(dirname(dest), { recursive: true })
            writeFileSync(dest, renderCoreNodePage(node, {
                useCase,
                help: help[`${node.category}/${node.slug}`],
                navOrder: navOrder++,
            }), 'utf8')
        }
    }

    logger.info(`Generated ${nodes.length} core-node pages`)
    return { count: nodes.length }
}
