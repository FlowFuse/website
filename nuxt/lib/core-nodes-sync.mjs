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

/** The sidebar label and ordering for each palette category. */
export const CATEGORIES = {
    common: { title: 'Common', order: 1 },
    function: { title: 'Function', order: 2 },
    network: { title: 'Network', order: 3 },
    sequence: { title: 'Sequence', order: 4 },
    parsers: { title: 'Parsers', order: 5 },
    storage: { title: 'Storage', order: 6 },
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
    const hit = scripts.find(([, name]) => normalise(name) === want)
        ?? scripts.find(([, name]) => normalise(name).startsWith(want))
    return hit ? hit[2].trim() : ''
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
 * One locale file often serves several nodes, so responses are fetched once per file and
 * reused. That is 21 requests for 38 nodes.
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

/** One page: the FlowFuse use-case intro, then the mirrored upstream help. */
export function renderCoreNodePage (node, { useCase, help, navOrder }) {
    const fm = [
        `title: "Node-RED ${node.name} node"`,
        // The <title> and search-result title, kept byte-identical to the Eleventy page
        // this replaces ("Node-RED - Inject Node"), because these 39 URLs 301 onto the new
        // ones and carry their ranking with them. Without it the docs page falls back to
        // navTitle and the title becomes the bare node name, "Inject".
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
 * Deliberately NOT one page per category. A category page at
 * core-nodes/<category>/ collides with the node page at core-nodes/<category>.md
 * whenever a node shares its category's name, and one does: the Function node sits in
 * the `function` category, so both resolved to /docs/node-red/core-nodes/function/ and
 * @nuxt/content picked whichever it indexed last. The old Eleventy site had no category
 * route at all, and the legacy redirect for that URL points at the Function NODE, so the
 * node page keeps the URL and the grouping becomes headings on the section index.
 */
export function renderCategorySections (nodes) {
    return Object.entries(CATEGORIES)
        .sort((a, b) => a[1].order - b[1].order)
        .filter(([category]) => nodes.some(n => n.category === category))
        .map(([category, meta]) => {
            const list = nodes
                .filter(n => n.category === category)
                .map(n => `- [${n.name}](/docs/node-red/core-nodes/${n.slug}/)${n.description ? `: ${n.description}` : ''}`)
                .join('\n')
            return `## ${meta.title}\n\n${list}`
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
    const missing = nodes.filter(n => !help[`${n.category}/${n.slug}`])

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

Every node in Node-RED's default palette, grouped the way the editor groups them. Each
page opens with why you would reach for that node, then mirrors the node's built-in help.

${renderCategorySections(nodes)}
`, 'utf8')

    let count = 1
    for (const [category] of Object.entries(CATEGORIES)) {
        const inCategory = nodes.filter(n => n.category === category)
        if (!inCategory.length) continue

        for (const node of inCategory) {
            const useCasePath = join(repoRoot, 'src/_includes/core-nodes', `${node.slug}-use-case.md`)
            const useCase = existsSync(useCasePath)
                ? processLibraryMarkdown(readFileSync(useCasePath, 'utf8'), { title: node.name })
                : ''
            const dest = join(outDir, `${node.slug}.md`)
            mkdirSync(dirname(dest), { recursive: true })
            writeFileSync(dest, renderCoreNodePage(node, {
                useCase,
                help: help[`${node.category}/${node.slug}`],
                navOrder: count++,
            }), 'utf8')
        }
    }

    logger.info(`Generated ${nodes.length} core-node pages`)
    return { count: nodes.length }
}
