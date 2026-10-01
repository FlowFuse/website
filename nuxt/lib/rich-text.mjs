// Renders one line of page copy authored in YAML into HTML. Kept free of Nuxt and Vue
// imports so it can be unit tested with `node --test`.
//
// The use-case pages keep their copy in content/use-cases/*.yml, and that copy carries
// the same few pieces of markup the hand-written pages used to write as template HTML:
// a coloured accent inside a heading, an inline link, a bold run, a forced line break.
// It is escaped first, exactly like BlogFaq's answers (lib/faq-answer.mjs supplies the
// link, bold and italic rules), so a YAML string cannot reintroduce arbitrary markup.
//
//   [label](url)   inline link, http(s) or site-absolute only
//   **bold**       <strong>
//   *italic*       <em>
//   ==text==       the indigo accent, `text-indigo-600`
//   !!text!!       the red accent, `text-red-600`
//   newline        <br> (a heading split over two lines)
import { inline } from './faq-answer.mjs'

// Non-greedy and single-line, so an unclosed marker does not swallow the rest.
const INDIGO = /==([^=\n]+)==/g
const RED = /!!([^!\n]+)!!/g

export function richText (text) {
    if (!text) return ''
    return inline(String(text).trim())
        .replace(INDIGO, '<span class="text-indigo-600">$1</span>')
        .replace(RED, '<span class="text-red-600">$1</span>')
        // The space after <br> keeps the two lines apart for a screen reader, which reads
        // straight through a <br> otherwise.
        .replace(/\s*\n\s*/g, '<br> ')
}
