import { test } from 'node:test'
import assert from 'node:assert/strict'

import { parseMeetingMessage } from './hubspot-meeting-message.mjs'

test('a booking-succeeded message returns the contact email and name', () => {
    // Shape captured from a real test booking on meetings-eu1.hubspot.com - not documented
    // by HubSpot anywhere, so this fixture is the actual contract, not a guess. Values
    // replaced with fake ones; only the shape matters for the test.
    const data = {
        meetingBookSucceeded: true,
        meetingsPayload: {
            bookingResponse: {
                postResponse: {
                    bookedOffline: false,
                    contact: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', fullName: '', name: 'Jane Doe' },
                    organizer: { firstName: 'Sam', lastName: 'Rep', email: '', fullName: '', name: 'Sam Rep' },
                },
            },
            formGuid: '00000000-0000-0000-0000-000000000000',
            linkType: 'ROUND_ROBIN_CALENDAR',
            userSlug: 'sam-rep/round-robin-sales-team',
        },
    }

    assert.deepEqual(parseMeetingMessage(data), { type: 'booked', email: 'jane@example.com', name: 'Jane Doe' })
})

test('a booking-succeeded message with no contact still reports booked, with nulls', () => {
    assert.deepEqual(
        parseMeetingMessage({ meetingBookSucceeded: true }),
        { type: 'booked', email: null, name: null }
    )
})

test('meetingBookSucceeded: false is not a booking', () => {
    assert.deepEqual(parseMeetingMessage({ meetingBookSucceeded: false }), { type: 'unknown' })
})

test('a resize message returns its height', () => {
    assert.deepEqual(parseMeetingMessage({ height: 640 }), { type: 'resize', height: 640 })
})

test('a non-numeric height is not a resize message', () => {
    assert.deepEqual(parseMeetingMessage({ height: '640' }), { type: 'unknown' })
})

test('an unrelated or empty message is unknown', () => {
    assert.deepEqual(parseMeetingMessage({ someOtherKey: true }), { type: 'unknown' })
    assert.deepEqual(parseMeetingMessage(null), { type: 'unknown' })
    assert.deepEqual(parseMeetingMessage('a string'), { type: 'unknown' })
})
