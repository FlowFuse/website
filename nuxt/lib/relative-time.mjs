// Formats the docs `updated:` stamp. Kept free of Nuxt and Vue imports so it can be
// unit tested with `node --test`.

// Git writes commit dates as "2026-03-18 15:07:47 +0000". That is not a valid HTML
// datetime value, and engines are not required to parse it, so normalise it here
// rather than handing it to `new Date()` and hoping.
const GIT_DATE = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})(?:\s*([+-])(\d{2}):?(\d{2}))?$/

const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

/**
 * Normalise a git commit date to an ISO 8601 string, or return null if it is not one.
 */
export function toIso (raw) {
    if (typeof raw !== 'string') return null

    const match = raw.trim().match(GIT_DATE)
    if (!match) return null

    const [, date, time, sign, offsetHours, offsetMinutes] = match
    const offset = sign ? `${sign}${offsetHours}:${offsetMinutes}` : 'Z'

    const iso = `${date}T${time}${offset}`
    return Number.isNaN(Date.parse(iso)) ? null : iso
}

/**
 * Turn a git commit date into "3 days ago". Returns null when the input is unparseable,
 * so the caller can fall back to showing the raw stamp.
 *
 * The unit is the largest one that still yields a count of at least 1, because "8 months
 * ago" tells a reader more about how stale a page is than "241 days ago" does.
 */
export function formatRelative (raw, now = new Date()) {
    const iso = toIso(raw)
    if (!iso) return null

    const seconds = (Date.parse(iso) - now.getTime()) / 1000
    const absolute = Math.abs(seconds)

    if (absolute < MINUTE) return 'just now'

    const format = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

    if (absolute < HOUR) return format.format(Math.round(seconds / MINUTE), 'minute')
    if (absolute < DAY) return format.format(Math.round(seconds / HOUR), 'hour')
    if (absolute < DAY * 7) return format.format(Math.round(seconds / DAY), 'day')
    if (absolute < DAY * 30) return format.format(Math.round(seconds / (DAY * 7)), 'week')
    if (absolute < DAY * 365) return format.format(Math.round(seconds / (DAY * 30)), 'month')

    return format.format(Math.round(seconds / (DAY * 365)), 'year')
}
