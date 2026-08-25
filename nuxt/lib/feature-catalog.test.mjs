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
    featurePlanLabels,
    findFeatureByChangelog,
    findFeatureByDocsPage,
    normalizePath,
    onPricing,
    planBadges,
    planHref,
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
            {
                id: 'retired',
                title: 'Shipped, but off the pricing table',
                docsLink: '/docs/user/retired/',
                changelog: [{ url: '/changelog/2026/07/retired/' }],
                showOnPricing: false,
                tiers: { edge: true, hub: true, fleet: true },
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

test('planHref points a badge at its own plan page', () => {
    assert.equal(planHref('Edge'), '/product/edge/')
    assert.equal(planHref('Hub'), '/product/hub/')
    assert.equal(planHref('Fleet'), '/product/fleet/')
})

test('planHref returns nothing for a label that names no plan', () => {
    assert.equal(planHref('Enterprise'), null)
    assert.equal(planHref(''), null)
    assert.equal(planHref(undefined), null)
})

test('planBadges pairs each plan label with the page it links to', () => {
    assert.deepEqual(planBadges(['Edge', 'Fleet']), [
        { plan: 'Edge', href: '/product/edge/' },
        { plan: 'Fleet', href: '/product/fleet/' },
    ])
})

// An unlinked badge reads the same as a real one, so a label naming no plan would state
// availability on a plan that does not exist. Hand written markup is the only way to get one.
test('planBadges drops a label that names no plan rather than rendering it unlinked', () => {
    assert.deepEqual(planBadges(['Edge', 'Enterprise']), [{ plan: 'Edge', href: '/product/edge/' }])
    assert.deepEqual(planBadges(['Starter', 'Team']), [])
})

test('planBadges treats nothing to badge as nothing to render', () => {
    assert.deepEqual(planBadges([]), [])
    assert.deepEqual(planBadges(undefined), [])
})

// The href is built from the plan id, so a plan whose product page is missing would badge a
// 404. /product/[tier] resolves its page out of nuxt/content/products/.
test('every plan a badge can link to has a product page', () => {
    const products = readdirSync(join(contentDir, 'products'))
        .filter(file => file.endsWith('.yml'))
        .map(file => jsYaml.load(readFileSync(join(contentDir, 'products', file), 'utf8')).tierId)

    assert.deepEqual(PLANS.map(plan => plan.id).filter(id => !products.includes(id)), [])
})

test('onPricing defaults to true, so omitting the key keeps a feature on the table', () => {
    assert.equal(onPricing({ title: 'No key' }), true)
    assert.equal(onPricing({ showOnPricing: true }), true)
    assert.equal(onPricing({ showOnPricing: false }), false)
})

test('featurePlanLabels badges a feature that has a row on the pricing page', () => {
    const expert = findFeatureByDocsPage(fixture, '/docs/user/expert/')
    assert.deepEqual(featurePlanLabels(expert), ['Edge', 'Hub', 'Fleet'])
})

// The badge links to a plan's product page, not to the pricing comparison table, so it never
// sends the reader looking for a row that is not there. Availability is stated wherever known.
test('featurePlanLabels badges a feature that is off the pricing page', () => {
    const retired = findFeatureByChangelog(fixture, '/changelog/2026/07/retired/')
    assert.deepEqual(featurePlanLabels(retired), ['Edge', 'Hub', 'Fleet'])
})

test('featurePlanLabels publishes no badge when availability is unsettled', () => {
    const unsettled = findFeatureByChangelog(fixture, '/changelog/2026/07/unsettled/')
    assert.equal(unsettled.tiers, undefined)
    assert.deepEqual(featurePlanLabels(unsettled), [])
})

test('featurePlanLabels treats a missing feature as nothing to say', () => {
    assert.deepEqual(featurePlanLabels(null), [])
    assert.deepEqual(featurePlanLabels(undefined), [])
})

// The one remaining reason a catalog entry publishes no badge.
test('every feature in the shipped catalog that declares tiers badges', () => {
    const silent = allFeatures(catalog)
        .filter(feature => !featurePlanLabels(feature).length && feature.tiers)
        .map(feature => feature.id)

    assert.deepEqual(silent, [])
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
