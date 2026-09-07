import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import {
    extractHelp,
    listNodes,
    refreshCoreNodeHelp,
    renderCoreNodePage,
    slugFor,
    syncCoreNodes,
} from './core-nodes-sync.mjs'

const CATALOGUE = {
    common: [{ xpath: 'inject', name: 'Inject', file: '20-inject', description: 'Injects a message', keywords: 'inject' }],
    network: [{ xpath: 'mqtt in', name: 'MQTT In', file: '10-mqtt', description: 'Subscribes' }],
}

test('a node slug matches the URL the page has always had', () => {
    assert.equal(slugFor('Read File'), 'read-file')
    assert.equal(slugFor('HTTP request'), 'http-request')
})

test('help is selected by name out of a file holding several nodes', () => {
    const html = [
        '<script type="text/html" data-help-name="mqtt in">IN</script>',
        '<script type="text/html" data-help-name="mqtt out">OUT</script>',
        '<script type="text/html" data-help-name="mqtt-broker">BROKER</script>',
    ].join('\n')

    assert.equal(extractHelp(html, 'mqtt in'), 'IN')
    assert.equal(extractHelp(html, 'mqtt out'), 'OUT')
})

test('a hyphenated request still finds a space-separated help name', () => {
    // The regression this guards: coreNodes.json asked for "mqtt-in" while upstream
    // renamed the block to "mqtt in". The Eleventy xpath found nothing and the page
    // shipped an empty help section instead of failing.
    const html = '<script type="text/html" data-help-name="mqtt in">IN</script>'

    assert.equal(extractHelp(html, 'mqtt-in'), 'IN')
})

test('a name that matches nothing returns empty rather than the wrong node', () => {
    const html = '<script type="text/html" data-help-name="udp in">IN</script>'

    assert.equal(extractHelp(html, 'tcp in'), '')
})

test('the catalogue flattens to nodes carrying their category and slug', () => {
    const nodes = listNodes(CATALOGUE)

    assert.deepEqual(nodes.map(n => `${n.category}/${n.slug}`), ['common/inject', 'network/mqtt-in'])
})

test('a refresh that cannot find a node throws instead of storing nothing', async () => {
    const fetchImpl = async () => ({ ok: true, text: async () => '<script data-help-name="other">x</script>' })

    await assert.rejects(
        () => refreshCoreNodeHelp({ coreNodes: CATALOGUE, fetchImpl }),
        /no data-help-name/
    )
})

test('a refresh propagates an upstream HTTP failure', async () => {
    const fetchImpl = async () => ({ ok: false, status: 404 })

    await assert.rejects(() => refreshCoreNodeHelp({ coreNodes: CATALOGUE, fetchImpl }), /404/)
})

test('a page leads with the FlowFuse use case and puts the mirrored help under its own heading', () => {
    const out = renderCoreNodePage(
        { name: 'Inject', description: 'Injects a message' },
        { useCase: 'Reach for this to kick a flow off.', help: '<p>upstream</p>', navOrder: 1 }
    )

    assert.match(out, /^---\n/)
    assert.match(out, /navTitle: "Inject"/)
    assert.match(out, /# Inject/)
    assert.ok(out.indexOf('Reach for this') < out.indexOf('## Node help'),
        'the use case must come before the mirrored help')
    assert.match(out, /mirrored from the Node-RED project/)
    assert.match(out, /<p>upstream<\/p>/)
})

test('a sync missing any node help fails loudly and names the node', () => {
    assert.throws(
        () => syncCoreNodes({
            repoRoot: '/nope',
            nuxtRoot: '/nope/nuxt',
            coreNodes: CATALOGUE,
            help: { 'common/inject': 'x' },
            logger: { info () {} },
        }),
        /MQTT In.*refresh_core_node_help/s
    )
})

test('a full sync writes a page per node plus the section and category indexes', () => {
    const root = mkdtempSync(join(tmpdir(), 'core-nodes-'))
    const help = { 'common/inject': '<p>i</p>', 'network/mqtt-in': '<p>m</p>' }

    const { count } = syncCoreNodes({
        repoRoot: root,
        nuxtRoot: join(root, 'nuxt'),
        coreNodes: CATALOGUE,
        help,
        logger: { info () {} },
    })

    const dir = join(root, 'nuxt/content/docs/node-red/core-nodes')
    const entries = readdirSync(dir).sort()

    assert.equal(count, 2)
    assert.deepEqual(entries, ['README.md', 'common', 'inject.md', 'mqtt-in.md', 'network'])
    assert.match(readFileSync(join(dir, 'README.md'), 'utf8'), /navGroup|navTitle: "Core nodes"/)
    assert.match(readFileSync(join(dir, 'common/README.md'), 'utf8'), /\/docs\/node-red\/core-nodes\/inject\//)
})
