import { test } from 'node:test'
import assert from 'node:assert/strict'

import { blueprintAuthor, blueprintTagLabel, blueprintTags, deployUrl } from './blueprint-display.mjs'

test('blueprintAuthor resolves a named author', () => {
    assert.deepEqual(blueprintAuthor('signl'), { name: 'SIGNL4', img: '/images/signl4_logo.png', url: 'https://www.signl4.com/' })
})

test('blueprintAuthor falls back to FlowFuse for an unattributed or unknown author', () => {
    assert.equal(blueprintAuthor(undefined).name, 'FlowFuse')
    assert.equal(blueprintAuthor('a-partner-with-no-data-file').name, 'FlowFuse')
})

test('blueprintTags drops the tag that defines the collection', () => {
    assert.deepEqual(blueprintTags(['blueprints', 'manufacturing', 'MES']), ['manufacturing', 'MES'])
    assert.deepEqual(blueprintTags(undefined), [])
})

test('blueprintTagLabel reproduces every label the library currently produces', () => {
    assert.equal(blueprintTagLabel('manufacturing'), 'Manufacturing')
    assert.equal(blueprintTagLabel('getting-started'), 'Getting Started')
    assert.equal(blueprintTagLabel('dashboard-20'), 'Dashboard 2.0')
    assert.equal(blueprintTagLabel('dashboard-2.0'), 'Dashboard 2.0')
    assert.equal(blueprintTagLabel('other'), 'Other')
    // Acronyms are authored in capitals and printed as authored.
    assert.equal(blueprintTagLabel('MES'), 'MES')
    assert.equal(blueprintTagLabel('HMI'), 'HMI')
    // The one label the source tag gets wrong; see the helper's comment.
    assert.equal(blueprintTagLabel('ai'), 'Ai')
})

test('deployUrl encodes the blueprint id', () => {
    assert.equal(deployUrl('PaRL4JNeBM'), 'https://app.flowfuse.com/deploy/blueprint?blueprintId=PaRL4JNeBM')
    assert.equal(deployUrl('a&b=c'), 'https://app.flowfuse.com/deploy/blueprint?blueprintId=a%26b%3Dc')
    assert.equal(deployUrl(undefined), 'https://app.flowfuse.com/deploy/blueprint?blueprintId=')
})
