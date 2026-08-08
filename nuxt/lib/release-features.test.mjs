import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import jsYaml from 'js-yaml'

import { allFeatures } from './feature-catalog.mjs'
import {
    injectReleaseFeatures,
    nodeText,
    resolveFeatureEntry,
    resolveReleaseFeatures,
} from './release-features.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const catalog = jsYaml.load(readFileSync(join(here, '..', 'content', 'feature-catalog.yml'), 'utf8'))

const fixture = {
    sections: [{
        id: 'x',
        title: 'X',
        features: [
            {
                id: 'expert',
                title: 'FlowFuse Expert',
                docsLink: '/docs/user/expert/',
                changelog: [
                    { url: '/changelog/2026/02/old/', release: '2.28' },
                    { url: '/changelog/2026/06/new/', release: '2.31' },
                ],
                tiers: { edge: true, hub: true, fleet: true },
            },
            { id: 'nodes-it', title: 'Certified Nodes - IT', tiers: { edge: false, hub: true, fleet: true } },
            { id: 'nodes-ot', title: 'Certified Nodes - OT', tiers: { edge: true, hub: false, fleet: false } },
            { id: 'unsettled', title: 'Undecided', changelog: [{ url: '/changelog/2026/07/u/', release: '2.33' }] },
        ],
    }],
}

test('nodeText flattens inline markup inside a heading', () => {
    assert.equal(nodeText(['h2', {}, 'Plain heading']), 'Plain heading')
    assert.equal(nodeText(['h2', {}, 'Use ', ['code', {}, 'ff'], ' now']), 'Use ff now')
})

test('resolveFeatureEntry links only the changelog posts from this release', () => {
    const resolved = resolveFeatureEntry({ id: 'expert', heading: 'H' }, fixture, '2.31')
    assert.deepEqual(resolved.changelog.map(entry => entry.url), ['/changelog/2026/06/new/'])
})

test('resolveFeatureEntry uses the changelog post title when one is known', () => {
    const titles = { '/changelog/2026/06/new/': 'Expert builds your app' }
    const resolved = resolveFeatureEntry({ id: 'expert', heading: 'H' }, fixture, '2.31', titles)
    assert.equal(resolved.changelog[0].label, 'Expert builds your app')

    const noTitle = resolveFeatureEntry({ id: 'expert', heading: 'H' }, fixture, '2.31')
    assert.equal(noTitle.changelog[0].label, 'Changelog 2.31')
})

test('resolveFeatureEntry unions the plans when a heading covers several features', () => {
    const resolved = resolveFeatureEntry({ id: ['nodes-it', 'nodes-ot'], heading: 'H' }, fixture, '2.31')
    assert.deepEqual(resolved.plans, ['Edge', 'Hub', 'Fleet'])
})

test('resolveFeatureEntry publishes no badge for a feature with unsettled availability', () => {
    const resolved = resolveFeatureEntry({ id: 'unsettled', heading: 'H' }, fixture, '2.33')
    assert.deepEqual(resolved.plans, [])
    assert.equal(resolved.changelog.length, 1)
})

test('resolveFeatureEntry accepts inline tiers for a section that is not a catalog feature', () => {
    const resolved = resolveFeatureEntry({ heading: 'What else is new?', tiers: { edge: true, hub: true, fleet: true } }, fixture, '2.31')
    assert.deepEqual(resolved.plans, ['Edge', 'Hub', 'Fleet'])
    assert.deepEqual(resolved.changelog, [])
})

test('resolveFeatureEntry drops an entry naming an id the catalog does not have', () => {
    assert.equal(resolveFeatureEntry({ id: 'ghost', heading: 'H' }, fixture, '2.31'), null)
})

test('resolveReleaseFeatures drops entries that would render nothing', () => {
    const resolved = resolveReleaseFeatures(
        [{ heading: 'Bare heading' }, { id: 'expert', heading: 'H' }],
        fixture, '2.31',
    )
    assert.deepEqual(resolved.map(entry => entry.heading), ['H'])
})

const body = () => [
    ['h2', { id: 'a' }, 'First feature'],
    ['p', {}, 'body of first'],
    ['h3', { id: 'a1' }, 'A detail'],
    ['p', {}, 'detail body'],
    ['h2', { id: 'b' }, 'Second feature'],
    ['p', {}, 'body of second'],
]

test('injectReleaseFeatures puts badges after the heading and links at the end of the section', () => {
    const resolved = [{
        heading: 'First feature',
        plans: ['Edge'],
        changelog: [{ url: '/changelog/x/', label: 'X' }],
        docs: { href: '/docs/x/', label: 'X' },
    }]
    const out = injectReleaseFeatures(body(), resolved)

    assert.deepEqual(out.map(node => node[0]), [
        'h2', 'feature-tier-badges', 'p', 'h3', 'p', 'feature-release-links', 'h2', 'p',
    ])
    assert.equal(out[1][1].plans, 'Edge')
})

test('injectReleaseFeatures ends a section at the next same-or-higher heading, not the next heading', () => {
    // The h3 sits inside the h2's section, so the h2's links belong after it, before the next h2.
    const out = injectReleaseFeatures(body(), [{
        heading: 'First feature', plans: [], changelog: [{ url: '/c/', label: 'C' }], docs: null,
    }])
    assert.equal(out.findIndex(node => node[0] === 'feature-release-links'), 4)
})

test('injectReleaseFeatures places the last section links at the end of the post', () => {
    const out = injectReleaseFeatures(body(), [{
        heading: 'Second feature', plans: [], changelog: [{ url: '/c/', label: 'C' }], docs: null,
    }])
    assert.equal(out.at(-1)[0], 'feature-release-links')
})

test('injectReleaseFeatures keeps several features in the right order', () => {
    const out = injectReleaseFeatures(body(), [
        { heading: 'First feature', plans: ['Edge'], changelog: [{ url: '/1/', label: '1' }], docs: null },
        { heading: 'Second feature', plans: ['Hub'], changelog: [], docs: null },
    ])
    assert.deepEqual(out.map(node => node[0]), [
        'h2', 'feature-tier-badges', 'p', 'h3', 'p', 'feature-release-links', 'h2', 'feature-tier-badges', 'p',
    ])
})

test('injectReleaseFeatures matches a heading that contains inline markup', () => {
    const withCode = [['h2', {}, 'Use ', ['code', {}, 'ff'], ' now'], ['p', {}, 'x']]
    const out = injectReleaseFeatures(withCode, [{ heading: 'Use ff now', plans: ['Edge'], changelog: [], docs: null }])
    assert.equal(out[1][0], 'feature-tier-badges')
})

test('injectReleaseFeatures leaves a body alone when nothing resolves or a heading is missing', () => {
    const original = body()
    assert.equal(injectReleaseFeatures(original, []), original)
    assert.equal(injectReleaseFeatures(original, [{ heading: 'Nowhere', plans: ['Edge'], changelog: [], docs: null }]), original)
})

test('every release blog features entry names a catalog feature that exists', () => {
    const blogDir = join(here, '..', '..', 'src', 'blog')
    const ids = new Set(allFeatures(catalog).map(feature => feature.id))
    const posts = []
    const walk = (dir) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            if (entry.isDirectory()) walk(join(dir, entry.name))
            else if (entry.name.endsWith('.md')) posts.push(join(dir, entry.name))
        }
    }
    walk(blogDir)

    const broken = []
    for (const post of posts) {
        const match = readFileSync(post, 'utf8').match(/^---\n([\s\S]*?)\n---/)
        if (!match) continue
        let frontmatter
        try { frontmatter = jsYaml.load(match[1]) } catch { continue }
        for (const entry of frontmatter?.features ?? []) {
            for (const id of [entry.id ?? []].flat()) {
                if (!ids.has(id)) broken.push(`${post.split('/src/')[1]}: ${id}`)
            }
        }
    }

    assert.deepEqual(broken, [])
})
