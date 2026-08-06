// Turns a release blog's `features:` frontmatter into rendered availability badges and
// related links, by splicing component nodes into the parsed markdown body.
//
// Kept free of Nuxt and Vue imports so `node --test` can run it. The Eleventy transform this
// replaces rewrote the output HTML with regexes; working on the parsed tree instead means a
// heading containing a link or inline code still matches, and nothing can be injected into
// an attribute by accident.

import { allFeatures, normalizePath, planLabels } from './feature-catalog.mjs'

const HEADING = /^h([2-6])$/

/**
 * MDC "minimal" nodes are `[tag, props, ...children]`. Return the heading level, or 0.
 */
function headingLevel (node) {
    if (!Array.isArray(node) || typeof node[0] !== 'string') return 0
    const match = node[0].match(HEADING)
    return match ? Number(match[1]) : 0
}

/**
 * The visible text of a node, with any nested inline markup flattened away.
 */
export function nodeText (node) {
    if (typeof node === 'string') return node
    if (!Array.isArray(node)) return ''
    return node.slice(2).map(nodeText).join('')
}

function featureById (catalog, id) {
    return allFeatures(catalog).find(feature => feature.id === id) ?? null
}

/**
 * Resolve one `features:` entry against the catalog.
 *
 * `id` may name several features, for a heading that covers more than one catalog entry
 * (Certified Nodes is IT and OT). Their plans are unioned, because the heading is about the
 * group and a reader wants to know which plans have any of it.
 *
 * An entry with no `id` may carry `tiers` inline, for a section that is not a catalog
 * feature at all ("What else is new?").
 *
 * Only changelog posts from this release are linked. A feature accumulates changelog entries
 * across releases, and the 2.31 blog linking the 2.28 post would just be noise.
 */
export function resolveFeatureEntry (entry, catalog, release, changelogTitles = {}) {
    const ids = entry.id ? (Array.isArray(entry.id) ? entry.id : [entry.id]) : []
    const features = ids.map(id => featureById(catalog, id)).filter(Boolean)

    if (ids.length && !features.length) return null

    const tiers = features.length
        ? features.reduce((merged, feature) => ({
            edge: merged.edge || !!feature.tiers?.edge,
            hub: merged.hub || !!feature.tiers?.hub,
            fleet: merged.fleet || !!feature.tiers?.fleet,
        }), { edge: false, hub: false, fleet: false })
        : entry.tiers

    // A feature with no `tiers` at all resolves to all-false above. That is the "availability
    // not settled" case, and it must publish no badge, same as everywhere else.
    const anyTiers = features.length ? features.some(feature => feature.tiers) : !!entry.tiers

    const changelog = features.flatMap(feature =>
        (feature.changelog ?? [])
            .filter(item => item.release === release)
            .map(item => ({ url: item.url, label: changelogTitles[normalizePath(item.url)] ?? `Changelog ${item.release}` })),
    )

    const withDocs = features.find(feature => feature.docsLink)

    return {
        heading: entry.heading,
        plans: anyTiers ? planLabels(tiers) : [],
        changelog,
        docs: withDocs ? { href: withDocs.docsLink, label: withDocs.title } : null,
    }
}

export function resolveReleaseFeatures (features, catalog, release, changelogTitles) {
    return (features ?? [])
        .map(entry => resolveFeatureEntry(entry, catalog, release, changelogTitles))
        .filter(resolved => resolved && (resolved.plans.length || resolved.changelog.length || resolved.docs))
}

/**
 * Splice badges and related links into a parsed body.
 *
 * Badges go directly after their heading. Links go at the end of that heading's section,
 * which is the next heading at the same or a higher level, because they are about everything
 * the section just described rather than about its first paragraph.
 *
 * Returns the original array untouched when there is nothing to add, so a post without a
 * `features:` block costs nothing.
 */
export function injectReleaseFeatures (body, resolved) {
    if (!Array.isArray(body) || !resolved?.length) return body

    const headings = body
        .map((node, index) => ({ index, level: headingLevel(node), text: nodeText(node).trim() }))
        .filter(heading => heading.level > 0)

    // Collected first and applied back to front, so an earlier splice cannot shift a later index.
    const inserts = []

    for (const feature of resolved) {
        const position = headings.findIndex(heading => heading.text === feature.heading)
        if (position === -1) continue
        const heading = headings[position]

        if (feature.plans.length) {
            // Comma separated, not an array: MDC's propsToData joins an all-strings array prop
            // with spaces (it is written for `class`), which would collapse the list into one
            // string and make the component's v-for iterate its characters. Object props, like
            // the links below, are passed through untouched and need no such care.
            inserts.push({ index: heading.index + 1, node: ['feature-tier-badges', { plans: feature.plans.join(',') }] })
        }

        if (feature.changelog.length || feature.docs) {
            const nextPeer = headings.find((other, i) => i > position && other.level <= heading.level)
            inserts.push({
                index: nextPeer ? nextPeer.index : body.length,
                node: ['feature-release-links', { changelog: feature.changelog, docs: feature.docs }],
            })
        }
    }

    if (!inserts.length) return body

    const next = body.slice()
    for (const insert of inserts.sort((a, b) => b.index - a.index)) {
        next.splice(insert.index, 0, insert.node)
    }
    return next
}
