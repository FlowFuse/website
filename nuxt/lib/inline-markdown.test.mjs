import { test } from 'node:test'
import assert from 'node:assert/strict'

import { parseInline } from './inline-markdown.mjs'

const text = value => ({ type: 'text', value })

test('markup stays literal text, for Vue to escape', () => {
    assert.deepEqual(parseInline('use <ip> here'), [text('use <ip> here')])
    assert.deepEqual(parseInline('<script>alert(1)</script>'), [text('<script>alert(1)</script>')])
})

test('parses site-absolute and http links', () => {
    assert.deepEqual(parseInline('see the [pricing page](/pricing)'), [
        text('see the '),
        { type: 'link', href: '/pricing', children: [text('pricing page')] },
    ])
    assert.deepEqual(parseInline('[device-agent](https://github.com/FlowFuse/device-agent)'), [
        { type: 'link', href: 'https://github.com/FlowFuse/device-agent', children: [text('device-agent')] },
    ])
})

test('leaves a non-http, non-absolute link target as text', () => {
    assert.deepEqual(parseInline('[x](javascript:alert(1))'), [text('[x](javascript:alert(1))')])
})

test('parses bold and italic', () => {
    assert.deepEqual(parseInline('save you *a lot* of clicking'), [
        text('save you '), { type: 'em', children: [text('a lot')] }, text(' of clicking'),
    ])
    assert.deepEqual(parseInline('**Fleet Mode** deploys'), [
        { type: 'strong', children: [text('Fleet Mode')] }, text(' deploys'),
    ])
})

test('nests links and emphasis either way round', () => {
    assert.deepEqual(parseInline('**see [docs](/docs/)**'), [
        { type: 'strong', children: [text('see '), { type: 'link', href: '/docs/', children: [text('docs')] }] },
    ])
    assert.deepEqual(parseInline('[**docs**](/docs/)'), [
        { type: 'link', href: '/docs/', children: [{ type: 'strong', children: [text('docs')] }] },
    ])
})

test('an asterisk inside a URL is not emphasis', () => {
    assert.deepEqual(parseInline('[x](/a*b*c)'), [{ type: 'link', href: '/a*b*c', children: [text('x')] }])
})

test('an unclosed marker stays text rather than swallowing the rest', () => {
    assert.deepEqual(parseInline('2 * 3 is six'), [text('2 * 3 is six')])
})

test('empty input parses to no nodes', () => {
    assert.deepEqual(parseInline(''), [])
})
