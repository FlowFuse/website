// Parses the inline markdown subset used in copy strings and FAQ answers into nodes, which
// <InlineMarkdown> renders. Kept free of Nuxt and Vue imports so it can be unit tested with
// `node --test`.
//
// The output is data, not HTML: Vue escapes text as it renders it, so literal "<...>" - "<ip>",
// "<img>" and similar placeholders in the docs-derived FAQ answers - stays literal.
//
//   [label](url)  inline link, http(s) or site-absolute only
//   **bold**      strong
//   *italic*      em

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
