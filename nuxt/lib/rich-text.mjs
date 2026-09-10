// Inline markup for content that 11ty rendered with `| safe`. Kept free of Nuxt and Vue
// imports so it can be unit tested with `node --test`.
//
// The content files under src/ carry small amounts of markup inside otherwise plain
// strings: <strong> and <span class="font-medium"> for the lead-in of a sentence, <br>
// for a deliberate line break, <code> for a filename, <a> for an inline link, and
// <span class="text-red-600"> for the accented half of a heading. Nunjucks printed all of
// that with `| safe`, which also meant everything else in the string was printed
// unescaped - including anything a future edit puts there.
//
// This escapes the whole string first, then re-enables a fixed set of inline tags. What
// gets through is decided here, not by the content:
//
//   tags       strong, b, em, i, code, br, span, a
//   attributes class (tokens must all be on ALLOWED_CLASSES), and href on <a>
//   href       site-absolute ("/...") or https://. Anything else - javascript:, data:,
//              protocol-relative - stays text.
//
// Everything else, including any other tag, attribute or class, stays visible text.
// Widening this is a deliberate edit here with a test beside it.
const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }

function escapeHtml (text) {
    return text.replace(/[&<>"]/g, char => ESCAPE_MAP[char])
}

const VOID_TAGS = new Set(['br'])
const ALLOWED_TAGS = new Set(['strong', 'b', 'em', 'i', 'code', 'br', 'span', 'a'])

// Typography utilities the content actually uses. Colour utilities are matched by shape
// so a new shade does not need a code change, but the property and palette still do.
const ALLOWED_CLASSES = new Set([
    'font-medium', 'font-semibold', 'font-bold', 'font-light',
    'italic', 'underline', 'no-underline', 'hover:underline',
    'whitespace-nowrap', 'inline-block', 'inline',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
])
const COLOUR_CLASS = /^text-(?:indigo|red|orange|gray|blue|green)-(?:[1-9]00|50)$/

function classAllowed (value) {
    const tokens = value.split(/\s+/).filter(Boolean)
    return tokens.length > 0 && tokens.every(token => ALLOWED_CLASSES.has(token) || COLOUR_CLASS.test(token))
}

function hrefAllowed (value) {
    return value.startsWith('/') && !value.startsWith('//') ? true : value.startsWith('https://')
}

// Runs over the ESCAPED string, so a tag here can only have come from the original input
// and its contents are already inert. Attribute values were escaped too, hence &quot;.
const TAG = /&lt;(\/?)([a-z]+)((?:\s+[a-z-]+=(?:&quot;|')[^"'&]*(?:&quot;|'))*)\s*(\/?)&gt;/g
const ATTR = /([a-z-]+)=(?:&quot;|')([^"'&]*)(?:&quot;|')/g

function renderTag (match, closing, tag, attrs, selfClosing) {
    if (!ALLOWED_TAGS.has(tag)) return match
    if (closing) return VOID_TAGS.has(tag) ? match : `</${tag}>`
    if (VOID_TAGS.has(tag)) return `<${tag}>`

    let className = null
    let href = null
    for (const [, name, value] of attrs.matchAll(ATTR)) {
        if (name === 'class') {
            if (!classAllowed(value)) return match
            className = value
        } else if (name === 'href' && tag === 'a') {
            if (!hrefAllowed(value)) return match
            href = value
        } else {
            // Any other attribute (target, onclick, style, data-*) disqualifies the tag.
            return match
        }
    }
    if (tag === 'a' && !href) return match

    const rendered = [tag]
    if (href) rendered.push(`href="${href}"`)
    if (className) rendered.push(`class="${className}"`)
    // An external link opens in a new tab, and rel is set here rather than trusted from
    // the content, which cannot set attributes at all.
    if (href && href.startsWith('https://')) rendered.push('target="_blank"', 'rel="noopener"')
    return `<${rendered.join(' ')}>${selfClosing ? '' : ''}`
}

export function renderRichText (value) {
    if (!value) return ''
    return escapeHtml(value).replace(TAG, renderTag)
}
