/** Format an integer with thousands separators (matches Eleventy's `formatNumber` filter). */
export function formatNumber (num: number | undefined): string {
    if (num == null) return ''
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/** Format an ISO date as "Mon DD, YYYY" (matches Eleventy's `shortDate` filter behaviour). */
export function shortDate (iso: string | undefined): string {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/** Clean a `git+...git` repository URL into a browsable form. */
export function cleanRepoUrl (url: string | undefined): string {
    if (!url) return ''
    return url.replace('git+', '').replace('.git', '').replace('git://', 'https://')
}
