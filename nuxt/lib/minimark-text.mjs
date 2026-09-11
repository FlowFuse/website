// Reading plain text back out of @nuxt/content's parsed markdown.
//
// A minimark node is either a string or an element array, `[tag, attrs, ...children]`.
// The parser stores one of these trees per page body and, where a page uses `<!--more-->`,
// a second one for the excerpt.
//
// Kept free of Nuxt and Vue imports so it can be unit tested with `node --test`.

/**
 * All the text in a node, with the markup dropped.
 *
 * A link contributes its label and not its href, which is what Eleventy's `stripLinks`
 * filter did to the same excerpts.
 */
export function minimarkText (node) {
    if (typeof node === 'string') return node
    if (!Array.isArray(node)) return ''
    return node.slice(2).map(minimarkText).join('')
}

/**
 * One string per top-level paragraph, in order.
 *
 * Anything that is not a paragraph (a list, a figure) is flattened to its text too, so a
 * caller asking for a summary never silently loses a block.
 */
export function minimarkParagraphs (tree) {
    const value = Array.isArray(tree) ? tree : tree?.value
    if (!Array.isArray(value)) return []
    return value.map(minimarkText).map(text => text.trim()).filter(Boolean)
}

/** Word count of a whole tree, for reading-time estimates. */
export function minimarkWordCount (tree) {
    const value = Array.isArray(tree) ? tree : tree?.value
    if (!Array.isArray(value)) return 0
    return value.map(minimarkText).join(' ').split(/\s+/).filter(Boolean).length
}
