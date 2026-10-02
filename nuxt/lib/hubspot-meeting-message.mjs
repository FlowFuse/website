// Parses HubSpot's undocumented meetings-embed postMessage shapes, kept pure and testable
// so a format change breaks a test here instead of going silently quiet in the component.

/**
 * @param {unknown} data
 * @returns {{ type: 'booked', email: string | null, name: string | null } | { type: 'resize', height: number } | { type: 'unknown' }}
 */
export function parseMeetingMessage (data) {
    if (!data || typeof data !== 'object') return { type: 'unknown' }

    if ('meetingBookSucceeded' in data && data.meetingBookSucceeded) {
        const contact = data.meetingsPayload?.bookingResponse?.postResponse?.contact
        return { type: 'booked', email: contact?.email ?? null, name: contact?.name ?? null }
    }

    if ('height' in data && typeof data.height === 'number') {
        return { type: 'resize', height: data.height }
    }

    return { type: 'unknown' }
}
