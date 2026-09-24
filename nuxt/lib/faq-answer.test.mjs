import { test } from 'node:test'
import assert from 'node:assert/strict'

import { parseFaqAnswer, parseInline } from './faq-answer.mjs'

const text = value => ({ type: 'text', value })
const p = (...children) => ({ type: 'p', children })

test('markup stays literal text, for Vue to escape', () => {
    assert.deepEqual(parseFaqAnswer('use <ip> here'), [p(text('use <ip> here'))])
    assert.deepEqual(parseFaqAnswer('<script>alert(1)</script>'), [p(text('<script>alert(1)</script>'))])
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

test('an unclosed marker stays text rather than swallowing the answer', () => {
    assert.deepEqual(parseInline('2 * 3 is six'), [text('2 * 3 is six')])
})

test('a blank line starts a new paragraph', () => {
    assert.deepEqual(parseFaqAnswer('First point.\n\nSecond point.'), [p(text('First point.')), p(text('Second point.'))])
})

test('empty input parses to no blocks', () => {
    assert.deepEqual(parseFaqAnswer(''), [])
    assert.deepEqual(parseFaqAnswer(undefined), [])
})

test('parses an unordered list when every line is a bullet', () => {
    assert.deepEqual(parseFaqAnswer('- first\n- second'), [{ type: 'ul', items: [[text('first')], [text('second')]] }])
})

test('parses an ordered list, and links inside items', () => {
    assert.deepEqual(parseFaqAnswer('1. go to [pricing](/pricing)\n2. pick a plan'), [{
        type: 'ol',
        items: [
            [text('go to '), { type: 'link', href: '/pricing', children: [text('pricing')] }],
            [text('pick a plan')],
        ],
    }])
})

test('a paragraph that only partly looks like a list stays a paragraph', () => {
    assert.deepEqual(parseFaqAnswer('Here is why:\n- because'), [p(text('Here is why: - because'))])
})

test('joins the wrapped lines of a paragraph with spaces', () => {
    assert.deepEqual(parseFaqAnswer('one line\nwrapped onto another'), [p(text('one line wrapped onto another'))])
})

test('a list and a paragraph in one answer parse as separate blocks', () => {
    assert.deepEqual(parseFaqAnswer('Uses include:\n\n- monitoring\n- alerting\n\nAnd more.'), [
        p(text('Uses include:')),
        { type: 'ul', items: [[text('monitoring')], [text('alerting')]] },
        p(text('And more.')),
    ])
})
