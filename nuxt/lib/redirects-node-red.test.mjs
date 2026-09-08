// The /node-red/** -> /docs/** map is 126 hand-written lines whose correctness nothing
// else checks. Every entry is a promise that an indexed URL still lands somewhere, and
// every way of breaking one is silent: a 301 into a 404 is a normal-looking response, and
// the build has no idea a redirect target does not exist.
//
// The core-node half maps an old flat URL onto a page that now sits under its palette
// category, so it goes stale the moment a page moves between categories: the map keeps
// pointing at the old path and nothing fails.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { GUIDES_SOURCE, listGuideFiles } from './guides-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..')
const read = rel => readFileSync(join(repoRoot, rel), 'utf8')

const withSlashes = path => '/' + path.split('/').filter(Boolean).join('/') + '/'

/** The `from: to` pairs out of nuxt/redirects-node-red.ts. */
function nodeRedRedirects () {
    return Object.fromEntries(
        [...read('nuxt/redirects-node-red.ts').matchAll(/'(\/[^']+)':\s*'(\/[^']+)'/g)]
            .map(([, from, to]) => [from, to])
    )
}

/** The `from` keys of the site-wide map, which the node-red targets must not land on. */
function siteRedirectSources () {
    return [...read('nuxt/redirects.ts').matchAll(/'(\/[^']+)':\s*\{\s*redirect:/g)].map(([, from]) => from)
}

/** Every /docs/ URL the authored guides produce. */
function docsUrlsThatWillExist () {
    const urls = new Set()

    for (const relPath of listGuideFiles(join(repoRoot, GUIDES_SOURCE))) {
        if (!relPath.endsWith('.md')) continue
        urls.add(withSlashes('/docs/' + relPath.replace(/(README|index)?\.md$/, '')))
    }

    return urls
}

/** slug -> category, read off the core-node pages themselves. */
function coreNodeCategories () {
    const prefix = 'node-red/core-nodes/'
    const bySlug = new Map()

    for (const relPath of listGuideFiles(join(repoRoot, GUIDES_SOURCE))) {
        if (!relPath.startsWith(prefix) || !relPath.endsWith('.md')) continue
        const rest = relPath.slice(prefix.length)
        const [category, file] = rest.split('/')
        if (!file || file === 'index.md') continue
        bySlug.set(file.replace(/\.md$/, ''), category)
    }

    return bySlug
}

test('every redirect lands on a page that will exist', () => {
    const existing = docsUrlsThatWillExist()
    // Pages from FlowFuse/flowfuse are not on disk at test time, so only this repo's own
    // prefixes can be checked. Those are the ones this map actually moves.
    const ours = /^\/docs\/(node-red|flowfuse-nodes|application-guide|node-red-guide)\//

    const dangling = Object.entries(nodeRedRedirects())
        .filter(([, to]) => ours.test(to) && !existing.has(to))
        .map(([from, to]) => `${from} -> ${to}`)

    assert.deepEqual(dangling, [], dangling.join('\n'))
})

test('no redirect target is itself a redirect source', () => {
    const map = nodeRedRedirects()
    const sources = new Set([...Object.keys(map), ...siteRedirectSources()])

    const hops = Object.entries(map)
        .filter(([, to]) => sources.has(to))
        .map(([from, to]) => `${from} -> ${to} -> (redirects again)`)

    assert.deepEqual(hops, [], hops.join('\n'))
})

test('the core-node entries point at where the pages actually are', () => {
    // The one half of the map that is a function of something else: a node page's URL is
    // its category directory plus its filename, so moving a page between categories
    // strands the redirect on a path nothing serves.
    const categories = coreNodeCategories()
    const expected = { '/node-red/core-nodes/': '/docs/node-red/core-nodes/' }

    for (const [slug, category] of categories) {
        expected[`/node-red/core-nodes/${slug}/`] = `/docs/node-red/core-nodes/${category}/${slug}/`
    }

    // A bare category path was never a page under Eleventy, but it is one now, so it is
    // mapped too - except where a node already owns that URL. /node-red/core-nodes/function/
    // was the Function NODE's own URL and keeps pointing at the node, one level down.
    for (const category of new Set(categories.values())) {
        if (categories.has(category)) continue
        expected[`/node-red/core-nodes/${category}/`] = `/docs/node-red/core-nodes/${category}/`
    }

    const actual = Object.fromEntries(
        Object.entries(nodeRedRedirects()).filter(([from]) => from.startsWith('/node-red/core-nodes/'))
    )

    assert.deepEqual(actual, expected)
})
