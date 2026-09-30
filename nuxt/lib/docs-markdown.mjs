// Pure markdown transforms applied to docs sourced from FlowFuse/flowfuse before
// @nuxt/content parses them. Kept free of Nuxt and filesystem imports so they can be
// unit tested with `node --test`.

// Block-level tags that start a raw HTML block at column 0 in the docs content.
const BLOCK_TAGS = new Set(['div', 'table', 'ul', 'ol', 'section', 'figure', 'details'])

/**
 * Remove blank lines from inside top-level raw HTML blocks.
 *
 * CommonMark ends a raw HTML block at the first blank line. The upstream docs contain
 * stray blank lines inside the card grids, so everything after one is re-parsed as
 * markdown, and because the markup is indented it becomes an indented code block. That
 * is why fragments like `</div>` and `<label>Device Groups</label>` render as escaped
 * dark boxes instead of tiles.
 *
 * A block runs from a column-0 opening tag to its matching column-0 closing tag. Nested
 * tags are always indented in this content, so a column-0 close is unambiguous. An opener
 * with no matching close is left untouched rather than swallowing the rest of the file.
 */
export function joinHtmlBlocks (content) {
    const lines = content.split('\n')
    const out = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const opener = /^<([a-zA-Z][a-zA-Z0-9-]*)[\s>]/.exec(line)
        const tag = opener?.[1].toLowerCase()

        if (!tag || !BLOCK_TAGS.has(tag)) {
            out.push(line)
            continue
        }

        const closer = new RegExp(`^</${tag}>`)
        let end = -1
        for (let j = i + 1; j < lines.length; j++) {
            if (closer.test(lines[j])) { end = j; break }
        }

        if (end === -1) {
            out.push(line)
            continue
        }

        for (let j = i; j <= end; j++) {
            if (j > i && lines[j].trim() === '') continue
            out.push(lines[j])
        }
        i = end
    }

    return out.join('\n')
}

/**
 * Strip inline <script> blocks.
 *
 * The upstream docs define custom elements (icon-chevron-right, checklist-item) in inline
 * scripts. @nuxt/content does not execute them, and both are provided as MDC components in
 * nuxt/components/content/ instead. Only column-0 script tags are removed, which is where
 * all of them sit, so scripts shown as examples inside fenced code blocks are left alone.
 */
export function stripInlineScripts (content) {
    return content.replace(/^<script[\s\S]*?<\/script>[ \t]*\n?/gm, '')
}

/**
 * Fail on a Nunjucks tag left in the docs.
 *
 * The upstream docs were written for Eleventy, which ran them through Nunjucks. @nuxt/content
 * does not, and callouts and components are MDC now (`::note`, `::HubSpotForm{...}`). This
 * used to strip leftover tags, which removed the installation form from
 * docs/install/introduction.md without anyone noticing, so a tag now fails the build and
 * names the line. Tags inside fenced code blocks and inline code are examples and stay.
 */
export function assertNoNunjucks (content, originalPath) {
    const lines = content.split('\n')
    let fence = null

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (fence) {
            if (fence.test(line)) fence = null
            continue
        }

        const opener = /^\s*(`{3,}|~{3,})/.exec(line)
        if (opener) {
            fence = new RegExp(`^\\s*${opener[1][0] === '`' ? '`' : '~'}{${opener[1].length},}\\s*$`)
            continue
        }

        if (line.replace(/`[^`]*`/g, '').includes('{%')) {
            throw new Error(`docs/${originalPath}:${i + 1} has a Nunjucks tag, which @nuxt/content does not render. Use MDC instead (e.g. ::note). Line: ${line.trim()}`)
        }
    }
}

/** Prepend build-time provenance to the page frontmatter. */
export function injectFrontmatter (content, originalPath, updated, version) {
    const injected = `originalPath: ${originalPath}\nupdated: ${updated}\nversion: ${version}\n`

    return /^---/.test(content)
        ? content.replace(/^---\n/, `---\n${injected}`)
        : `---\n${injected}---\n${content}`
}

export function processMarkdown (content, originalPath, updated, version) {
    // Before injectFrontmatter, so the reported line number is the source file's.
    assertNoNunjucks(content, originalPath)
    let out = injectFrontmatter(content, originalPath, updated, version)
    out = stripInlineScripts(out)
    return joinHtmlBlocks(out)
}
