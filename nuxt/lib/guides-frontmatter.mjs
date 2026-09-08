// Frontmatter checks over the guides tree, for the two ways a page's titles go wrong
// silently. Both of these shipped in the Node-RED library migration and neither produced
// a build error, a broken link or a failing test - the only symptom was the rendered page
// being wrong, which is why they are asserted here rather than left to review.
//
// Test-only, so unlike guides-sync.mjs this may depend on node_modules.

import { join } from 'node:path'

import { listGuideFiles } from './guides-sync.mjs'
import { readFrontmatter } from './meta-title-length.mjs'

/** Every markdown page under the guides tree, with its parsed frontmatter. */
export function readGuidePages (guidesDir) {
    return listGuideFiles(guidesDir)
        .filter(relPath => relPath.endsWith('.md'))
        .map(relPath => ({ relPath, frontmatter: readFrontmatter(join(guidesDir, relPath)) || {} }))
}

// A directory index, under either name. The guides are authored as README.md and
// guides-sync renames them to index.md on the way into the content tree, so both spellings
// have to count: recognising only one leaves every nested index in a bucket of its own,
// and the duplicate-label check below then passes for the wrong reason.
const INDEX_NAMES = new Set(['README.md', 'index.md'])

/**
 * The nav node a page labels: an index titles the directory it sits in, any other page
 * titles itself. `node-red/getting-started/README.md` and `node-red/getting-started.md`
 * would both label `node-red/getting-started`.
 */
function navNodeFor (relPath) {
    const segments = relPath.split('/')
    if (INDEX_NAMES.has(segments.at(-1))) return segments.slice(0, -1).join('/')
    return [...segments.slice(0, -1), segments.at(-1).replace(/\.md$/, '')].join('/')
}

/**
 * Groups of nav entries a reader cannot tell apart, because they share both a label and a
 * position in the sidebar.
 *
 * The sidebar nests by directory and labels each entry with `navTitle`, so a label is only
 * useful if it is unique among the entries it appears next to: its siblings, and the
 * parent it is indented under. nuxt/lib/docs-nav.mjs cannot catch this, because as far as
 * it is concerned the titles it was handed are the titles.
 *
 * The migration hit this by giving every nested directory index the nav key of its
 * *parent* Eleventy nav entry instead of its own, so getting-started/{editor,library,
 * programming}/README.md all came out as "Getting started" nested underneath a "Getting
 * started" that was already there.
 */
export function findDuplicateSiblingNavTitles (guidesDir) {
    const labelled = readGuidePages(guidesDir)
        .filter(({ frontmatter }) => typeof frontmatter.navTitle === 'string')
        .map(({ relPath, frontmatter }) => ({
            relPath,
            node: navNodeFor(relPath),
            navTitle: frontmatter.navTitle,
        }))

    const fileFor = new Map(labelled.map(p => [p.node, p.relPath]))
    const labelFor = new Map(labelled.map(p => [p.node, p.navTitle]))
    const groups = new Map()

    for (const { relPath, node, navTitle } of labelled) {
        const parent = node.split('/').slice(0, -1).join('/')
        const key = `${parent} ${navTitle}`

        if (!groups.has(key)) groups.set(key, { under: parent || '.', navTitle, files: new Set() })
        groups.get(key).files.add(relPath)

        // A parent indented directly above its children is as ambiguous as two siblings,
        // and it is the shape the screenshot on #5750 showed.
        if (labelFor.get(parent) === navTitle) groups.get(key).files.add(fileFor.get(parent))
    }

    return [...groups.values()]
        .filter(group => group.files.size > 1)
        .map(({ under, navTitle, files }) => ({ under, navTitle, files: [...files].sort() }))
}

/**
 * Pages whose full title can never reach a browser tab or a search result.
 *
 * nuxt/pages/docs/[...slug].vue titles a page `metaTitle || navTitle || title`. `navTitle`
 * is deliberately short, because it has to fit the sidebar column, so a page that gives
 * `title` the whole phrase and `navTitle` an abbreviation of it needs `metaTitle` to say
 * which one Google gets. Without it the abbreviation wins and the phrase is only ever
 * visible as the on-page heading.
 *
 * This is how 121 moved library pages lost their titles: "Using MySQL with Node-RED (2026
 * Updated)" became "MySQL", with nothing anywhere reporting a problem.
 */
export function findPagesWithUnreachableTitle (guidesDir) {
    return readGuidePages(guidesDir)
        .filter(({ frontmatter: fm }) =>
            typeof fm.title === 'string' &&
            typeof fm.navTitle === 'string' &&
            fm.navTitle !== fm.title &&
            typeof fm.metaTitle !== 'string')
        .map(({ relPath, frontmatter }) => ({
            file: relPath,
            title: frontmatter.title,
            navTitle: frontmatter.navTitle,
        }))
}
