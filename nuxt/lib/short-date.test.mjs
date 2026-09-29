import { test } from 'node:test'
import assert from 'node:assert/strict'

import { shortDate } from './short-date.mjs'

test('formats the way the published webinar list always has', () => {
    assert.equal(shortDate('2025-09-30'), '30 Sep, 2025')
    assert.equal(shortDate('2026-01-27'), '27 Jan, 2026')
    assert.equal(shortDate('2024-09-24'), '24 Sep, 2024')
})

// The reason this file exists: en-GB abbreviates September to four letters.
test('September is Sep, not Sept', () => {
    assert.match(shortDate('2023-09-21'), /\bSep\b/)
    assert.doesNotMatch(shortDate('2023-09-21'), /Sept/)
})

test('every month abbreviates to three letters', () => {
    const months = Array.from({ length: 12 }, (_, i) =>
        shortDate(`2026-${String(i + 1).padStart(2, '0')}-15`).split(' ')[1].replace(',', '')
    )
    assert.deepEqual(months, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
})

test('a date-only string is read as UTC, so the day never slips', () => {
    // Without timeZone: 'UTC' this renders 31 Dec in any negative-offset zone.
    assert.equal(shortDate('2026-01-01'), '1 Jan, 2026')
})

test('accepts a Date and rejects an unparseable value', () => {
    assert.equal(shortDate(new Date('2025-09-30T12:00:00Z')), '30 Sep, 2025')
    assert.equal(shortDate('not a date'), '')
})
