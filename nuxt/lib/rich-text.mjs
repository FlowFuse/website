// Inline emphasis for content that 11ty rendered with `| safe`. Kept free of Nuxt and
// Vue imports so it can be unit tested with `node --test`.
//
// The industry and landing content files carry three bits of markup inside otherwise
// plain strings: <strong> for the lead-in of a sentence, <br> for a deliberate line
// break, and <span class="text-red-600"> for the accented half of a heading. Nunjucks
// printed those unescaped, which also meant everything else in the string was printed
// unescaped.
//
// This escapes the whole string first and then re-enables exactly those three, so the
// rendered output is identical while anything else - a stray "<script", an angle bracket
// in prose, a tag someone adds later without reading this - stays visible text rather
// than markup. Widening the allowlist is a deliberate edit here, not something a content
// file can do on its own.
const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }

function escapeHtml (text) {
    return text.replace(/[&<>"]/g, char => ESCAPE_MAP[char])
}

// Only this one class is allowed: it is the accent colour the headings use, and keeping
// it a fixed string means content cannot inject arbitrary styling or attributes.
const ACCENT_CLASS = 'text-red-600'
const ACCENT_OPEN = new RegExp(`&lt;span class=(?:&quot;|')${ACCENT_CLASS}(?:&quot;|')&gt;`, 'g')

export function renderRichText (value) {
    if (!value) return ''
    return escapeHtml(value)
        .replace(/&lt;strong&gt;/g, '<strong>')
        .replace(/&lt;\/strong&gt;/g, '</strong>')
        .replace(/&lt;br\s*\/?&gt;/g, '<br>')
        .replace(ACCENT_OPEN, `<span class="${ACCENT_CLASS}">`)
        .replace(/&lt;\/span&gt;/g, '</span>')
}
