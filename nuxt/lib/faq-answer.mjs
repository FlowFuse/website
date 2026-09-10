// Renders one FAQ answer. Kept free of Nuxt and Vue imports so it can be unit tested
// with `node --test`; <BlogFaq> is the only caller.
//
// Answers are authored as plain text, and any literal "<...>" in them - "<ip>", "<img>"
// and similar placeholders in the docs-derived answers - must stay literal. So the whole
// string is escaped first, and only a small markdown subset is enabled afterwards, which
// means a URL or a label cannot reintroduce markup.
const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }

function escapeHtml (text) {
    return text.replace(/[&<>"]/g, char => ESCAPE_MAP[char])
}

// [label](url), where url is http(s) or site-absolute. Anything else stays text.
const LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g
// **bold** and *italic*, non-greedy and single-line so an unclosed marker in prose does
// not swallow the rest of the answer.
const BOLD = /\*\*([^*\n]+)\*\*/g
const ITALIC = /\*([^*\n]+)\*/g

function inline (text) {
    return escapeHtml(text)
        .replace(LINK, '<a href="$2" class="text-indigo-600 hover:underline">$1</a>')
        .replace(BOLD, '<strong>$1</strong>')
        .replace(ITALIC, '<em>$1</em>')
}

// A blank line starts a new paragraph. 11ty's faq.njk printed answers with `| safe`, so
// the few answers that needed two paragraphs wrote their own <p> tags; those are blank
// lines now and this is what renders them.
export function renderFaqAnswer (answer) {
    if (!answer) return []
    return answer
        .split(/\n\s*\n/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
        .map(inline)
}
