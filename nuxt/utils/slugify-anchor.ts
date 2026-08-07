// Normalises a link fragment to the heading id @nuxt/content generates
// (github-slugger style: lowercase, drop chars outside [a-z0-9-], collapse and
// trim dashes). Source markdown was authored against a different slugifier
// (keeping ? & . ( ) : and repeated dashes), so raw fragments miss their target.
export function slugifyAnchor(anchor: string): string {
    if (!anchor) return ''
    let raw = anchor.replace(/^#/, '')
    // Fragments may arrive percent-encoded (e.g. %3F for ?, %26 for &); decode
    // first so those characters are dropped rather than leaving hex residue.
    try { raw = decodeURIComponent(raw) } catch { /* keep raw on malformed input */ }
    let slug = raw.toLowerCase()
        .replace(/[^a-z0-9-]+/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    // @nuxt/content's heading slugifier prefixes an underscore when the slug
    // would otherwise start with a digit (e.g. "1. Foo" -> "_1-foo").
    if (/^[0-9]/.test(slug)) slug = '_' + slug
    return slug ? '#' + slug : ''
}
