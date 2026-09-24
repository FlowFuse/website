// Parses one FAQ answer into blocks of inline nodes, which <Faq> and <InlineMarkdown>
// render. Kept free of Nuxt and Vue imports so it can be unit tested with `node --test`.
//
// The output is data, not HTML: Vue escapes text as it renders it, so literal "<...>" in an
// answer - "<ip>", "<img>" and similar placeholders in the docs-derived answers - stays
// literal.
//
//   [label](url)     inline link, http(s) or site-absolute only
//   **bold**         strong
//   *italic*         em
//   blank line       a new paragraph
//   "- item" lines   an unordered list
//   "1. item" lines  an ordered list

// url is http(s) or site-absolute. Anything else - javascript:, data:, protocol-relative -
// is left as text.
const LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s/)][^\s)]*|\/)\)/
// Non-greedy and single-line, so an unclosed marker in prose does not swallow the rest.
const BOLD = /\*\*([^*\n]+)\*\*/
const ITALIC = /\*([^*\n]+)\*/

// Earliest match wins; on a tie, the order here.
const MARKERS = [['link', LINK], ['strong', BOLD], ['em', ITALIC]]

export function parseInline (text) {
    const nodes = []
    let rest = text
    while (rest) {
        let found
        for (const [type, pattern] of MARKERS) {
            const match = pattern.exec(rest)
            if (match && (!found || match.index < found.match.index)) found = { type, match }
        }
        if (!found) {
            nodes.push({ type: 'text', value: rest })
            break
        }
        const { type, match } = found
        if (match.index) nodes.push({ type: 'text', value: rest.slice(0, match.index) })
        nodes.push(type === 'link'
            ? { type, href: match[2], children: parseInline(match[1]) }
            : { type, children: parseInline(match[1]) })
        rest = rest.slice(match.index + match[0].length)
    }
    return nodes
}

const UNORDERED_ITEM = /^[-*]\s+(.*)$/
const ORDERED_ITEM = /^\d+[.)]\s+(.*)$/

// A paragraph made entirely of list-item lines is a list; anything else is a paragraph with
// its lines joined, which is how the source wrapped long answers.
function parseBlock (paragraph) {
    const lines = paragraph.split('\n').map(line => line.trim()).filter(Boolean)
    for (const [type, pattern] of [['ul', UNORDERED_ITEM], ['ol', ORDERED_ITEM]]) {
        if (lines.length && lines.every(line => pattern.test(line))) {
            return { type, items: lines.map(line => parseInline(line.match(pattern)[1])) }
        }
    }
    return { type: 'p', children: parseInline(lines.join(' ')) }
}

export function parseFaqAnswer (answer) {
    if (!answer) return []
    return answer
        .split(/\n\s*\n/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
        .map(parseBlock)
}
