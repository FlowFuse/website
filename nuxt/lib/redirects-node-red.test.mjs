// The /node-red/** -> /docs/** map is 126 hand-written lines whose correctness nothing
// else checks. Every entry is a promise that an indexed URL still lands somewhere, and
// every way of breaking one is silent: a 301 into a 404 is a normal-looking response, and
// the build has no idea a redirect target does not exist.
//
// The core-node half is derived from src/_data/coreNodes.json rather than authored, so it
// goes stale on its own. Move a node between palette categories and the generated page
// appears at a new path while the map keeps pointing at the old one, with nothing failing.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { CATEGORIES, listNodes } from './core-nodes-sync.mjs'
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

/** Every /docs/ URL that will exist: the authored guides plus the generated core nodes. */
function docsUrlsThatWillExist () {
    const urls = new Set()

    for (const relPath of listGuideFiles(join(repoRoot, GUIDES_SOURCE))) {
        if (!relPath.endsWith('.md')) continue
        urls.add(withSlashes('/docs/' + relPath.replace(/(README|index)?\.md$/, '')))
    }

    const coreNodes = JSON.parse(read('src/_data/coreNodes.json'))
    urls.add('/docs/node-red/core-nodes/')
    for (const node of listNodes(coreNodes)) {
        urls.add(`/docs/node-red/core-nodes/${node.category}/`)
        urls.add(`/docs/node-red/core-nodes/${node.category}/${node.slug}/`)
    }

    return urls
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

test('the core-node entries match what the generator will actually write', () => {
    // The half of the map that is derived rather than authored. A node moving between
    // palette categories changes the page's path, and this is what notices.
    const coreNodes = JSON.parse(read('src/_data/coreNodes.json'))
    const expected = { '/node-red/core-nodes/': '/docs/node-red/core-nodes/' }

    for (const category of Object.keys(CATEGORIES)) {
        if (!listNodes(coreNodes).some(n => n.category === category)) continue
        // /node-red/core-nodes/function/ is excluded on purpose: that was the Function
        // NODE's own URL under Eleventy, so it keeps pointing at the node, one level down.
        const nodeOwnsThisPath = listNodes(coreNodes).some(n => n.slug === category)
        if (!nodeOwnsThisPath) {
            expected[`/node-red/core-nodes/${category}/`] = `/docs/node-red/core-nodes/${category}/`
        }
    }

    for (const node of listNodes(coreNodes)) {
        expected[`/node-red/core-nodes/${node.slug}/`] =
            `/docs/node-red/core-nodes/${node.category}/${node.slug}/`
    }

    const actual = Object.fromEntries(
        Object.entries(nodeRedRedirects()).filter(([from]) => from.startsWith('/node-red/core-nodes/'))
    )

    assert.deepEqual(actual, expected)
})
