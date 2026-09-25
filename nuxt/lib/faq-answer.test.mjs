import { test } from 'node:test'
import assert from 'node:assert/strict'

import { parseFaqAnswer } from './faq-answer.mjs'

const text = value => ({ type: 'text', value })
const p = (...children) => ({ type: 'p', children })

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
