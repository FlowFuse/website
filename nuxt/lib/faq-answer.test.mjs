import { test } from 'node:test'
import assert from 'node:assert/strict'

import { renderFaqAnswer } from './faq-answer.mjs'

test('escapes markup so placeholders stay literal', () => {
    assert.deepEqual(renderFaqAnswer('use <ip> here'), ['use &lt;ip&gt; here'])
    assert.deepEqual(renderFaqAnswer('<script>alert(1)</script>'), ['&lt;script&gt;alert(1)&lt;/script&gt;'])
    assert.deepEqual(renderFaqAnswer('a & b'), ['a &amp; b'])
})

test('renders site-absolute and http links', () => {
    assert.deepEqual(
        renderFaqAnswer('see the [pricing page](/pricing)'),
        ['see the <a href="/pricing" class="text-indigo-600 hover:underline">pricing page</a>'],
    )
    assert.deepEqual(
        renderFaqAnswer('[device-agent](https://github.com/FlowFuse/device-agent)'),
        ['<a href="https://github.com/FlowFuse/device-agent" class="text-indigo-600 hover:underline">device-agent</a>'],
    )
})

test('leaves a non-http, non-absolute link target as text', () => {
    assert.deepEqual(renderFaqAnswer('[x](javascript:alert(1))'), ['[x](javascript:alert(1))'])
})

test('renders bold and italic', () => {
    assert.deepEqual(renderFaqAnswer('save you *a lot* of clicking'), ['save you <em>a lot</em> of clicking'])
    assert.deepEqual(renderFaqAnswer('**Fleet Mode** deploys'), ['<strong>Fleet Mode</strong> deploys'])
})

test('an unclosed marker stays text rather than swallowing the answer', () => {
    assert.deepEqual(renderFaqAnswer('2 * 3 is six'), ['2 * 3 is six'])
})

test('a blank line starts a new paragraph', () => {
    assert.deepEqual(
        renderFaqAnswer('First point.\n\nSecond point.'),
        ['First point.', 'Second point.'],
    )
})

test('empty input renders no paragraphs', () => {
    assert.deepEqual(renderFaqAnswer(''), [])
    assert.deepEqual(renderFaqAnswer(undefined), [])
})
