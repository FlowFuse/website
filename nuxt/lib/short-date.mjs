// "30 Sep, 2025", the format Eleventy's `shortDate` filter produced with spacetime.
//
// Not `toLocaleDateString('en-GB', { month: 'short' })`: modern ICU abbreviates September
// as "Sept" in en-GB, so that spelling silently differs from every date the site published
// before. en-US abbreviates to three letters but orders the parts month-first, so the parts
// are assembled here instead.
//
// Kept free of Nuxt and Vue imports so it can be unit tested with `node --test`.
const FORMATTER = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
})

export function shortDate (date) {
    const value = date instanceof Date ? date : new Date(date)
    if (Number.isNaN(value.getTime())) return ''

    const parts = Object.fromEntries(
        FORMATTER.formatToParts(value).map(part => [part.type, part.value])
    )
    return `${parts.day} ${parts.month}, ${parts.year}`
}
