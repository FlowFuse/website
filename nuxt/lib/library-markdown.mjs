// Transforms for the Node-RED library pages as they move from Eleventy into the docs
// content tree.
//
// These pages were authored as Nunjucks-in-markdown against `src/node-red/`'s own
// shortcodes, so they need more repair than the guides in nuxt/content-guides/ (authored
// as MDC from the start) and different repair from the FlowFuse/flowfuse docs. The
// overlap with docs-markdown.mjs is deliberate and one-way: `joinHtmlBlocks` and
// `convertCallouts` are imported from there rather than reimplemented, because the
// library uses the same `{% note %}` / `{% warning %}` shortcodes and the same
// column-0 raw-HTML style.
//
// ORDER MATTERS. `convertCallouts` finishes by stripping every remaining `{% ... %}`
// tag, which would silently swallow the 77 `{% renderFlow %}` blocks and every
// `{% raw %}` guard on the page. Everything that needs to read a Nunjucks tag therefore
// runs before it. `processLibraryMarkdown` encodes that order; call it rather than
// composing these by hand.
//
// Kept free of Nuxt and filesystem imports so `node --test` can exercise it directly.

import { convertCallouts, joinHtmlBlocks } from './docs-markdown.mjs'

/**
 * `{% renderFlow %}` becomes the `render-flow` MDC component.
 *
 * The Eleventy shortcode took the flow JSON as its paired body and an optional pixel
 * height as its first argument, then emitted a div plus an inline module script. The Vue
 * component reads the JSON out of a fenced code block in its slot instead, so the body
 * moves into a ```json fence. Run this BEFORE convertCallouts.
 */
export function convertRenderFlow (content) {
    return content.replace(
        /\{%-?\s*renderFlow(?:\s+(\d+))?\s*-?%\}\r?\n([\s\S]*?)\r?\n\{%-?\s*endrenderFlow\s*-?%\}/g,
        (_, height, body) => {
            const attrs = height ? `{:height="${height}"}` : ''
            return `::render-flow${attrs}\n\`\`\`json\n${body.trim()}\n\`\`\`\n::`
        }
    )
}

/**
 * Resolve the `{{ meta.title }}` interpolation the pages use for their own H1.
 *
 * Eleventy rendered frontmatter into the body, so 70 of these pages open with
 * `# {{meta.title}}` rather than a literal heading. @nuxt/content does not interpolate
 * frontmatter into markdown, and the docs page component renders the H1 from the body,
 * so the title has to be written out. Whitespace inside the braces varies in the source.
 */
export function resolveTitleInterpolation (content, title) {
    if (!title) return content
    return content.replace(/\{\{-?\s*meta\.title\s*-?\}\}/g, title)
}

/**
 * Neutralise `{% raw %}` guards and the Node-RED mustaches they protect.
 *
 * These pages document Node-RED, whose own templating uses `{{ msg.payload }}`. Under
 * Eleventy the author wrapped those in `{% raw %}` so Nunjucks left them alone. MDC
 * treats `{{ }}` in a text node as a Vue binding, so simply dropping the guard would
 * turn documented syntax into a render error or an empty string. Each mustache is moved
 * into an inline code span, which MDC does not interpolate, and which is how the rest of
 * the docs already write `msg.payload`.
 *
 * A mustache already inside a code span or a fenced block is left alone: fences are
 * skipped wholesale, and an existing backtick immediately around the match is honoured.
 */
export function protectMustaches (content) {
    const segments = content.split(/(^```[\s\S]*?^```)/gm)

    return segments.map((segment, i) => {
        // Odd indices are the captured fenced blocks. Node-RED syntax shown in a fence is
        // already safe and must keep its exact bytes.
        if (i % 2 === 1) return segment

        return segment
            .replace(/\{%-?\s*(?:end)?raw\s*-?%\}\r?\n?/g, '')
            .replace(/(`?)(\{\{[^{}\n]*\}\})(`?)/g, (whole, before, mustache, after) =>
                (before && after) ? whole : `\`${mustache}\``)
    }).join('')
}

/**
 * Rewrite the library's own links and asset paths to their new home.
 *
 * `/node-red/` itself is deliberately NOT rewritten: it stays on Eleventy as a marketing
 * page, so a link to it must keep pointing there. Only paths with something after the
 * prefix move. The FlowFuse node pages split off to their own docs section, so they are
 * matched first.
 */
export function rewriteLibraryPaths (content) {
    return content
        .replace(/(["'(])\/node-red\/flowfuse\//g, '$1/docs/flowfuse-nodes/')
        .replace(/(["'(])\/node-red\/(?=[a-z0-9])/g, '$1/docs/node-red/')
}

/**
 * Everything, in the one order that works.
 *
 * `title` comes from the page's own frontmatter and is only used to resolve the H1.
 */
export function processLibraryMarkdown (content, { title } = {}) {
    let out = convertRenderFlow(content)
    out = resolveTitleInterpolation(out, title)
    out = protectMustaches(out)
    out = rewriteLibraryPaths(out)
    out = joinHtmlBlocks(out)
    // Last: this strips every Nunjucks tag still standing.
    return convertCallouts(out)
}
