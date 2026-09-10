// Renders one FAQ answer into a list of HTML blocks. Kept free of Nuxt and Vue imports so
// it can be unit tested with `node --test`; <BlogFaq> is the only caller.
//
// Answers are authored as plain text, and any literal "<...>" in them - "<ip>", "<img>"
// and similar placeholders in the docs-derived answers - must stay literal. So the whole
// string is escaped first, and only a small markdown subset is enabled afterwards, which
// means a URL or a label cannot reintroduce markup.
//
// The subset covers what the 11ty answers expressed with raw tags under `| safe`:
//
//   [label](url)     inline link, http(s) or site-absolute only
//   **bold**         <strong>
//   *italic*         <em>
//   blank line       a new paragraph (the .njk answers used <p> tags)
//   "- item" lines   an unordered list (the .njk answers used <ul><li>)
//   "1. item" lines  an ordered list (the .njk answers used <ol><li>)
const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }

function escapeHtml (text) {
    return text.replace(/[&<>"]/g, char => ESCAPE_MAP[char])
}

// url is http(s) or site-absolute. Anything else - javascript:, data:, protocol-relative -
// is left as text.
const LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s/)][^\s)]*|\/)\)/g
// Non-greedy and single-line, so an unclosed marker in prose does not swallow the rest.
const BOLD = /\*\*([^*\n]+)\*\*/g
const ITALIC = /\*([^*\n]+)\*/g

function inline (text) {
    return escapeHtml(text)
        .replace(LINK, '<a href="$2" class="text-indigo-600 hover:underline">$1</a>')
        .replace(BOLD, '<strong>$1</strong>')
        .replace(ITALIC, '<em>$1</em>')
}

const UNORDERED_ITEM = /^[-*]\s+(.*)$/
const ORDERED_ITEM = /^\d+[.)]\s+(.*)$/

function renderList (lines, ordered) {
    const tag = ordered ? 'ol' : 'ul'
    const pattern = ordered ? ORDERED_ITEM : UNORDERED_ITEM
    const items = lines
        .map(line => line.match(pattern)?.[1])
        .filter(item => item !== undefined)
        .map(item => `<li>${inline(item)}</li>`)
    return `<${tag}>${items.join('')}</${tag}>`
}

// A paragraph made entirely of list-item lines renders as a list; anything else renders as
// a paragraph with its lines joined, which is how the source wrapped long answers.
function renderBlock (paragraph) {
    const lines = paragraph.split('\n').map(line => line.trim()).filter(Boolean)
    if (lines.length && lines.every(line => UNORDERED_ITEM.test(line))) return renderList(lines, false)
    if (lines.length && lines.every(line => ORDERED_ITEM.test(line))) return renderList(lines, true)
    return inline(lines.join(' '))
}

export function renderFaqAnswer (answer) {
    if (!answer) return []
    return answer
        .split(/\n\s*\n/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
        .map(renderBlock)
}

// A block that is a list must not be wrapped in <p>, which is invalid; <BlogFaq> asks
// this rather than sniffing the markup itself.
export function isListBlock (block) {
    return block.startsWith('<ul>') || block.startsWith('<ol>')
}
