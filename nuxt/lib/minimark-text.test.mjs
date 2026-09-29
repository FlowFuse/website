import { test } from 'node:test'
import assert from 'node:assert/strict'

import { minimarkParagraphs, minimarkText, minimarkWordCount } from './minimark-text.mjs'

// The shape @nuxt/content stores for the /webinars/ excerpt that prompted this file.
const EXCERPT = {
    type: 'minimark',
    value: [
        ['p', {}, 'There are days where you keep eleven plants from drifting apart.'],
        ['p', {}, 'This webinar launches the solutions built for each one - ',
            ['a', { href: '/product/hub/' }, 'Hub'], ', ',
            ['a', { href: '/product/edge/' }, 'Edge'], ', and ',
            ['a', { href: '/product/fleet/' }, 'Fleet'], ' - live.'],
    ],
}

test('minimarkText returns a plain string unchanged', () => {
    assert.equal(minimarkText('just text'), 'just text')
})

test('minimarkText keeps a link label and drops its href', () => {
    assert.equal(minimarkText(['a', { href: '/product/hub/' }, 'Hub']), 'Hub')
})

test('minimarkText joins inline children without inserting spaces', () => {
    const node = ['p', {}, 'un', ['em', {}, 'break'], 'able']
    assert.equal(minimarkText(node), 'unbreakable')
})

test('minimarkText ignores anything that is neither a string nor a node', () => {
    assert.equal(minimarkText(undefined), '')
    assert.equal(minimarkText(null), '')
    assert.equal(minimarkText(42), '')
})

test('minimarkParagraphs returns one entry per block, links flattened', () => {
    assert.deepEqual(minimarkParagraphs(EXCERPT), [
        'There are days where you keep eleven plants from drifting apart.',
        'This webinar launches the solutions built for each one - Hub, Edge, and Fleet - live.',
    ])
})

test('minimarkParagraphs accepts a bare value array as well as the wrapper', () => {
    assert.deepEqual(minimarkParagraphs(EXCERPT.value).length, 2)
})

test('minimarkParagraphs drops empty blocks and returns [] for nothing', () => {
    assert.deepEqual(minimarkParagraphs({ type: 'minimark', value: [['p', {}, '   ']] }), [])
    assert.deepEqual(minimarkParagraphs(undefined), [])
    assert.deepEqual(minimarkParagraphs({}), [])
})

test('minimarkWordCount counts across blocks', () => {
    assert.equal(minimarkWordCount({ type: 'minimark', value: [['p', {}, 'one two'], ['p', {}, 'three']] }), 3)
    assert.equal(minimarkWordCount(undefined), 0)
})
