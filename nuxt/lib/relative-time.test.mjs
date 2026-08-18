import { test } from 'node:test'
import assert from 'node:assert/strict'

import { formatRelative, toIso } from './relative-time.mjs'

const now = new Date('2026-08-03T12:00:00Z')

test('toIso normalises a git commit date', () => {
    assert.equal(toIso('2026-03-18 15:07:47 +0000'), '2026-03-18T15:07:47+00:00')
    assert.equal(toIso('2026-03-18 15:07:47 +0100'), '2026-03-18T15:07:47+01:00')
    assert.equal(toIso('2026-03-18 15:07:47 -0500'), '2026-03-18T15:07:47-05:00')
})

test('toIso accepts a stamp with no offset', () => {
    assert.equal(toIso('2026-03-18 15:07:47'), '2026-03-18T15:07:47Z')
})

test('toIso rejects anything it cannot read', () => {
    assert.equal(toIso(''), null)
    assert.equal(toIso('last Tuesday'), null)
    assert.equal(toIso(undefined), null)
    assert.equal(toIso('2026-13-45 99:99:99 +0000'), null)
})

test('formatRelative picks the largest unit that still counts at least one', () => {
    const cases = [
        ['2026-08-03 11:59:30 +0000', 'just now'],
        ['2026-08-03 11:30:00 +0000', '30 minutes ago'],
        ['2026-08-03 04:00:00 +0000', '8 hours ago'],
        ['2026-08-01 12:00:00 +0000', '2 days ago'],
        ['2026-07-20 12:00:00 +0000', '2 weeks ago'],
        ['2026-03-18 12:00:00 +0000', '5 months ago'],
        ['2024-08-03 12:00:00 +0000', '2 years ago'],
    ]

    for (const [raw, expected] of cases) {
        assert.equal(formatRelative(raw, now), expected, raw)
    }
})

test('formatRelative words a count of one the way a person would', () => {
    assert.equal(formatRelative('2026-08-02 12:00:00 +0000', now), 'yesterday')
    assert.equal(formatRelative('2026-07-27 12:00:00 +0000', now), 'last week')
    assert.equal(formatRelative('2026-07-04 12:00:00 +0000', now), 'last month')
    assert.equal(formatRelative('2025-07-10 12:00:00 +0000', now), 'last year')
})

test('formatRelative honours the offset rather than the wall clock', () => {
    // Same instant, written in two zones: both are one hour ago.
    assert.equal(formatRelative('2026-08-03 11:00:00 +0000', now), '1 hour ago')
    assert.equal(formatRelative('2026-08-03 12:00:00 +0100', now), '1 hour ago')
})

test('formatRelative returns null on an unreadable stamp so the caller can fall back', () => {
    assert.equal(formatRelative('not a date', now), null)
})
