import { test } from 'node:test'
import assert from 'node:assert/strict'

import { createMeetingTracker } from './hubspot-meeting-tracker.mjs'

test('a repeat height does not count as progress', () => {
    const tracker = createMeetingTracker()
    assert.equal(tracker.recordResize(640), true)
    assert.equal(tracker.recordResize(640), false)
    assert.equal(tracker.stepCount, 1)
})

test('recordBooked is true once, false for a resent message', () => {
    const tracker = createMeetingTracker()
    assert.equal(tracker.recordBooked(), true)
    assert.equal(tracker.recordBooked(), false)
})

test('abandonment is not reported at step 1 (the embed\'s own first render)', () => {
    const tracker = createMeetingTracker()
    tracker.recordResize(528)
    assert.equal(tracker.recordAbandonment(), false)
})

test('abandonment is reported past step 1', () => {
    const tracker = createMeetingTracker()
    tracker.recordResize(528)
    tracker.recordResize(640)
    assert.equal(tracker.recordAbandonment(), true)
})

test('abandonment is not reported twice', () => {
    const tracker = createMeetingTracker()
    tracker.recordResize(528)
    tracker.recordResize(640)
    assert.equal(tracker.recordAbandonment(), true)
    assert.equal(tracker.recordAbandonment(), false)
})

test('abandonment is not reported once booked', () => {
    const tracker = createMeetingTracker()
    tracker.recordResize(528)
    tracker.recordResize(640)
    tracker.recordBooked()
    assert.equal(tracker.recordAbandonment(), false)
})

test('resumeFromBfcache allows a second abandonment after a second departure', () => {
    const tracker = createMeetingTracker()
    tracker.recordResize(528)
    tracker.recordResize(640)
    assert.equal(tracker.recordAbandonment(), true)
    tracker.resumeFromBfcache()
    tracker.recordResize(690)
    assert.equal(tracker.recordAbandonment(), true)
})

test('resumeFromBfcache does not re-arm abandonment once booked', () => {
    const tracker = createMeetingTracker()
    tracker.recordResize(528)
    tracker.recordResize(640)
    tracker.recordAbandonment()
    tracker.recordBooked()
    tracker.resumeFromBfcache()
    assert.equal(tracker.recordAbandonment(), false)
})
