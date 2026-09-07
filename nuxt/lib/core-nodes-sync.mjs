// Generates the /docs/node-red/core-nodes/** pages.
//
// These are the one part of the Node-RED library that was never a file. Under Eleventy,
// `src/node-red/core-nodes/*.njk` paginated over `src/_data/coreNodes.json` and each page
// called a shortcode that fetched the node's help straight out of the Node-RED project's
// repo at build time (`lib/core-node-docs.js`). @nuxt/content indexes files, so the pages
// have to exist as markdown before it runs.
//
// The help text is upstream's, so it is mirrored rather than owned: `data/core-node-help.json`
// holds a snapshot, committed, and `refreshCoreNodeHelp` re-fetches it on demand. That
// keeps the production build hermetic. Fetching per build would put a third-party raw
// githubusercontent URL on the critical path of every deploy and fail the site whenever
// upstream renamed a locale file.
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
 * Re-fetch every node's help from upstream and rewrite the snapshot.
 *
 * Run deliberately (`node scripts/refresh_core_node_help.mjs`), never from a build. A node
 * whose help cannot be fetched throws rather than being written empty: a silently
 * help-less page looks fine in CI and is useless to a reader.
 */
export async function refreshCoreNodeHelp ({ coreNodes, fetchImpl = fetch } = {}) {
    const help = {}
    for (const node of listNodes(coreNodes)) {
        const url = `${UPSTREAM}/${node.category}/${node.file}.html`
        const res = await fetchImpl(url)
        if (!res.ok) throw new Error(`${node.name}: ${url} returned ${res.status}`)
        const extracted = extractHelp(await res.text(), node.xpath)
        if (!extracted) throw new Error(`${node.name}: no data-help-name="${node.xpath}" in ${url}`)
        help[`${node.category}/${node.slug}`] = extracted
    }
    return help
}

/** One page: the FlowFuse use-case intro, then the mirrored upstream help. */
export function renderCoreNodePage (node, { useCase, help, navOrder }) {
    const fm = [
        `title: "Node-RED ${node.name} node"`,
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

/** The category index, listing its nodes. */
export function renderCategoryPage (category, nodes) {
    const meta = CATEGORIES[category]
    const list = nodes
        .map(n => `- [${n.name}](/docs/node-red/core-nodes/${n.slug}/)${n.description ? `: ${n.description}` : ''}`)
        .join('\n')

    return `---
title: "Node-RED ${meta.title} nodes"
navTitle: "${meta.title}"
navOrder: ${meta.order}
meta:
    description: "Reference for the ${meta.title.toLowerCase()} nodes in the default Node-RED palette."
---

# ${meta.title} nodes

The ${meta.title.toLowerCase()} nodes in Node-RED's default palette.

${list}
`
}

/**
 * Write the whole core-nodes tree into the docs content tree.
 *
 * Called from the docs-source module after guides-sync, so the pages are in place before
 * @nuxt/content indexes the collection. The destination is nuxt/content/docs, which is
 * gitignored and wiped on every sync - the same place guides-sync writes to, and the
 * reason these generated pages are not committed. Writing them into content-guides/
 * instead would dirty the working tree on every build.
 */
export function syncCoreNodes ({ repoRoot, nuxtRoot, coreNodes, help, logger = console }) {
    const outDir = join(nuxtRoot, 'content', 'docs', 'node-red', 'core-nodes')
    const nodes = listNodes(coreNodes)
    const missing = nodes.filter(n => !help[`${n.category}/${n.slug}`])

    if (missing.length) {
        throw new Error(
            'No mirrored help for: ' + missing.map(n => n.name).join(', ') +
            '. Run scripts/refresh_core_node_help.mjs.'
        )
    }

    mkdirSync(outDir, { recursive: true })

    // Section index.
    writeFileSync(join(outDir, 'README.md'), `---
title: "Node-RED core nodes"
navTitle: "Core nodes"
navOrder: 3
meta:
    description: "What each node in the default Node-RED palette does, and a worked reason to reach for it."
---

# Core nodes

Every node in Node-RED's default palette, grouped the way the editor groups them. Each
page opens with why you would reach for that node, then mirrors the node's built-in help.

${Object.entries(CATEGORIES)
        .sort((a, b) => a[1].order - b[1].order)
        .filter(([c]) => nodes.some(n => n.category === c))
        .map(([c, m]) => `- [${m.title}](/docs/node-red/core-nodes/${c}/)`)
        .join('\n')}
`, 'utf8')

    let count = 1
    for (const [category] of Object.entries(CATEGORIES)) {
        const inCategory = nodes.filter(n => n.category === category)
        if (!inCategory.length) continue

        mkdirSync(join(outDir, category), { recursive: true })
        writeFileSync(join(outDir, category, 'README.md'),
            renderCategoryPage(category, inCategory), 'utf8')

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
