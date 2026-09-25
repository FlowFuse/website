import { test } from 'node:test'
import assert from 'node:assert/strict'

import { certifiedNodeCards, certifiedNodeName } from './certified-nodes.mjs'

const SCOPE = '@flowfuse-certified-nodes'

function entry (slug, collections, extra = {}) {
    return {
        _id: `${SCOPE}/${slug}`,
        name: slug,
        description: `${slug} description`,
        version: '1.0.0',
        collections,
        ...extra,
    }
}

test('acronyms come from the override map', () => {
    assert.equal(certifiedNodeName(`${SCOPE}/opcua`), 'OPC UA')
    assert.equal(certifiedNodeName(`${SCOPE}/rtsp`), 'RTSP')
    assert.equal(certifiedNodeName(`${SCOPE}/cip-suite`), 'CIP Suite')
})

test('other slugs are title-cased word by word', () => {
    assert.equal(certifiedNodeName(`${SCOPE}/modbus`), 'Modbus')
    assert.equal(certifiedNodeName(`${SCOPE}/google-sheets`), 'Google Sheets')
    assert.equal(certifiedNodeName('redis'), 'Redis')
})

test('the catalogue name is ignored, since it is only the lowercase slug', () => {
    const [card] = certifiedNodeCards([[entry('rtsp', ['edge'])]])
    assert.equal(card.name, 'RTSP')
})

test('a node certified in two collections gets one card per collection', () => {
    const cards = certifiedNodeCards([[entry('modbus', ['hub', 'edge'])]])
    assert.deepEqual(cards.map(card => card.collection), ['hub', 'edge'])
    assert.ok(cards.every(card => card.id === `${SCOPE}/modbus`))
})

test('an entry with no collections gets no card', () => {
    assert.deepEqual(certifiedNodeCards([[entry('kafka', undefined), entry('redis', [])]]), [])
})

test('docsPath keeps the normalised docsUrl and falls back to the collection index', () => {
    const [withDocs, withoutDocs] = certifiedNodeCards([[
        entry('kafka', ['hub'], { docsUrl: '/docs/flowfuse-nodes/hub/kafka/' }),
        entry('modbus', ['edge']),
    ]])
    assert.equal(withDocs.docsPath, '/docs/flowfuse-nodes/hub/kafka/')
    assert.equal(withoutDocs.docsPath, '/docs/flowfuse-nodes/edge/')
})

test('cards from both feeds are sorted together by display name', () => {
    const hub = [entry('redis', ['hub']), entry('opcua', ['hub'])]
    const edge = [entry('modbus', ['edge']), entry('cip-suite', ['edge'])]
    assert.deepEqual(
        certifiedNodeCards([hub, edge]).map(card => card.name),
        ['CIP Suite', 'Modbus', 'OPC UA', 'Redis'],
    )
})

test('the same node in both feeds stays in feed order after sorting', () => {
    const cards = certifiedNodeCards([[entry('kafka', ['hub'])], [entry('kafka', ['edge'])]])
    assert.deepEqual(cards.map(card => card.collection), ['hub', 'edge'])
})

test('no feeds, or empty feeds after a fetch failure, give no cards', () => {
    assert.deepEqual(certifiedNodeCards([]), [])
    assert.deepEqual(certifiedNodeCards([[], []]), [])
})
