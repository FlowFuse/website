// Finding markdown that MDC will read as a Vue binding rather than as text.
//
// @nuxt/content compiles a content file with MDC, and MDC treats `{{ ... }}` in prose the
// way a Vue template does: it becomes a binding node against a scope that holds the page,
// not the words that were typed. Nothing errors. `{{ msg.payload }}` in a paragraph simply
// renders as nothing, and a page can lose a sentence with no sign anywhere that it did.
//
// The Node-RED pages are full of mustache examples - it is the Template node's own
// templating syntax - so this is not a theoretical risk on this tree.
//
// The scan is deliberately over-broad: it reports every `{{` that is not inside code,
// whether or not a `}}` closes it, because the failure modes are not all the same shape.
//
//   `{{ msg.payload }}`     one line, closed        -> binds, renders empty
//   `{{{triple}}}`          triple brace           -> binds (value `{triple`), renders empty
//   `{{` .. newline .. `}}` spanning lines         -> crashes the markdown parser outright
//   `{{` with no `}}`       unclosed               -> crashes the markdown parser outright
//
// A scan that only looked for a closed, single-line pair would miss the last two, which are
// the ones that break a build rather than quietly emptying a sentence, and would miss the
// triple-brace form too (the inner `{` is not what a `[^{}]*` body matches).
//
// Where a mustache is safe, and why this scan skips exactly those places:
//
//   fenced code blocks, indented code blocks, inline code spans
//       MDC leaves the text alone. This is how every Node-RED page shows mustache syntax,
//       and it is the fix for anything this scan reports.
//
// Block-level raw HTML is NOT skipped. MDC does leave `{{ }}` alone inside a raw HTML
// *block*, but not inside *inline* HTML: `<span>{{ msg.payload }}</span>` in a paragraph
// binds exactly like bare prose does. Telling those two apart needs the parser, so this
// reports both and the writer moves the example into a code span.

/** Strips fenced code blocks, leaving line count intact so reported lines stay right. */
function blankFencedBlocks (lines) {
    const out = [...lines]
    let fence = null
    for (let i = 0; i < out.length; i++) {
        const opening = out[i].match(/^\s{0,3}(`{3,}|~{3,})/)
        if (!fence && opening) {
            fence = opening[1][0].repeat(opening[1].length)
            out[i] = ''
            continue
        }
        if (fence) {
            const closing = out[i].match(/^\s{0,3}(`{3,}|~{3,})\s*$/)
            out[i] = ''
            if (closing && closing[1][0] === fence[0] && closing[1].length >= fence.length) fence = null
        }
    }
    return out
}

/** Strips inline code spans and indented code blocks from one line. */
function blankCode (line) {
    if (/^(\s{4,}|\t)/.test(line)) return ''
    return line.replace(/(`+)(?:(?!\1)[\s\S])*?\1/g, '')
}

/**
 * Every place in `markdown` where MDC could read a mustache as a binding.
 *
 * Returns `{ line, text }` per hit, one-based lines, so a failure message can point at the
 * file and line rather than just naming the file.
 */
export function bindableMustaches (markdown) {
    const lines = blankFencedBlocks(String(markdown).split('\n'))
    const hits = []
    lines.forEach((line, i) => {
        if (blankCode(line).includes('{{')) hits.push({ line: i + 1, text: line.trim() })
    })
    return hits
}
