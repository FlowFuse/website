// Splits one FAQ answer into paragraphs and lists of inline nodes (see inline-markdown.mjs),
// which <Faq> renders. Kept free of Nuxt and Vue imports so it can be unit tested with
// `node --test`.
//
//   blank line       a new paragraph
//   "- item" lines   an unordered list
//   "1. item" lines  an ordered list
import { parseInline } from './inline-markdown.mjs'

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

// The same answer as plain text, for FAQ structured data (JSON-LD): a link keeps only its label,
// and each paragraph and list item goes on its own line.
export function faqAnswerText (answer) {
    const text = nodes => nodes.map(node => node.type === 'text' ? node.value : text(node.children)).join('')
    return parseFaqAnswer(answer)
        .map(block => block.type === 'p' ? text(block.children) : block.items.map(text).join('\n'))
        .join('\n\n')
}
