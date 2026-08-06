import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// js-yaml rather than yaml: it is the declared root dependency, and `node --test` resolves
// it as raw ESM without Vite's CommonJS interop in the way.
import jsYaml from 'js-yaml'

import {
    PLANS,
    allFeatures,
    findFeatureByChangelog,
    findFeatureByDocsPage,
    normalizePath,
    planLabels,
} from './feature-catalog.mjs'

const contentDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'content')
const catalog = jsYaml.load(readFileSync(join(contentDir, 'feature-catalog.yml'), 'utf8'))

const fixture = {
    sections: [{
        id: 'empower',
        title: 'Empower',
        features: [
            {
                id: 'expert',
                title: 'FlowFuse Expert',
                docsLink: '/docs/user/expert',
                changelog: [{ url: '/changelog/2026/02/banner/', release: '2.28' }],
                tiers: { edge: true, hub: true, fleet: true },
            },
            {
                id: 'expert-support',
                title: 'Support Mode',
                docsLink: '/docs/user/expert/chat/#support-mode',
                subfeature: true,
                tiers: { edge: true, hub: false, fleet: false },
            },
            {
                id: 'unsettled',
                title: 'Not decided yet',
                changelog: [{ url: '/changelog/2026/07/unsettled/' }],
                showOnPricing: false,
            },
        ],
    }],
}

test('normalizePath makes hand written catalog paths comparable', () => {
    assert.equal(normalizePath('/docs/user/expert'), '/docs/user/expert/')
    assert.equal(normalizePath('/docs/user/expert/'), '/docs/user/expert/')
    assert.equal(normalizePath('https://flowfuse.com/docs/user/expert/'), '/docs/user/expert/')
    assert.equal(normalizePath('/docs/user/expert/chat/#support-mode'), '/docs/user/expert/chat/')
})

test('normalizePath rejects off-site links and empty input', () => {
    assert.equal(normalizePath('https://dashboard.flowfuse.com/user/multi-tenancy.html'), null)
    assert.equal(normalizePath(''), null)
    assert.equal(normalizePath(undefined), null)
})

test('findFeatureByChangelog matches regardless of trailing slash', () => {
    assert.equal(findFeatureByChangelog(fixture, '/changelog/2026/02/banner/')?.id, 'expert')
    assert.equal(findFeatureByChangelog(fixture, '/changelog/2026/02/banner')?.id, 'expert')
})

test('findFeatureByChangelog returns null for an uncatalogued post', () => {
    assert.equal(findFeatureByChangelog(fixture, '/changelog/2026/02/something-else/'), null)
})

test('findFeatureByDocsPage ignores the fragment on the page it is given', () => {
    assert.equal(findFeatureByDocsPage(fixture, '/docs/user/expert/')?.id, 'expert')
})

test('findFeatureByDocsPage skips subfeatures so a heading does not badge a whole page', () => {
    assert.equal(findFeatureByDocsPage(fixture, '/docs/user/expert/chat/'), null)
})

test('planLabels lists the plans a feature is in, in plan order', () => {
    assert.deepEqual(planLabels({ edge: true, hub: false, fleet: true }), ['Edge', 'Fleet'])
    assert.deepEqual(planLabels({ edge: true, hub: true, fleet: true }), ['Edge', 'Hub', 'Fleet'])
})

test('planLabels returns nothing when availability is unset or empty', () => {
    assert.deepEqual(planLabels(undefined), [])
    assert.deepEqual(planLabels({ edge: false, hub: false, fleet: false }), [])
})

test('PLANS matches the plan files that drive the pricing table', () => {
    const plansDir = join(contentDir, 'plans')
    const plans = readdirSync(plansDir)
        .filter(file => file.endsWith('.yml'))
        .map(file => jsYaml.load(readFileSync(join(plansDir, file), 'utf8')))
        .sort((a, b) => a.order - b.order)

    assert.deepEqual(PLANS, plans.map(plan => ({ id: plan.tierId, label: plan.title })))
})

test('every catalog feature shown on pricing declares its tiers', () => {
    const missing = allFeatures(catalog)
        .filter(feature => feature.showOnPricing !== false && !feature.tiers)
        .map(feature => feature.id)

    assert.deepEqual(missing, [])
})

test('catalog feature ids are unique', () => {
    const ids = allFeatures(catalog).map(feature => feature.id)
    assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), [])
})

test('every catalog changelog url points at a changelog post that exists', () => {
    const changelogDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'changelog')
    const posts = new Set()
    const walk = (dir, prefix) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            if (entry.isDirectory()) walk(join(dir, entry.name), `${prefix}${entry.name}/`)
            else if (entry.name.endsWith('.md')) posts.add(`${prefix}${entry.name.replace(/\.md$/, '')}/`)
        }
    }
    walk(changelogDir, '/changelog/')

    const broken = allFeatures(catalog)
        .flatMap(feature => (feature.changelog ?? []).map(entry => entry.url))
        .filter(url => !posts.has(normalizePath(url)))

    assert.deepEqual(broken, [])
})
