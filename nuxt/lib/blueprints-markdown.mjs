// Pure transforms applied to a blueprint README from FlowFuse/blueprint-library before
// @nuxt/content parses it. Kept free of Nuxt and filesystem imports so they can be
// unit tested with `node --test`.
//
// A blueprint is authored as a README next to its own screenshots, so every image path in
// it is relative to the blueprint's directory. Under 11ty that was fine: `scripts/copy_blueprints.js`
// copied the whole directory into src/ and eleventy-img resolved each path against the page's
// input file. There is no equivalent here - the markdown lands in nuxt/content/ and the
// screenshots in nuxt/public/ - so the paths are rewritten to the public URL the assets end
// up at, which is the one place both halves agree on.

/** The public URL prefix a blueprint's own assets are copied to. */
export function assetBaseFor (category, slug) {
    return `/blueprints/${category}/${slug}`
}

// Everything up to the closing delimiter is frontmatter; a README with no frontmatter is
// left entirely in the body, so an unfronted file is never silently reinterpreted.
const FRONTMATTER = /^---[ \t]*\r?\n([\s\S]*?\r?\n)---[ \t]*\r?\n?/

export function splitFrontmatter (content) {
    const match = FRONTMATTER.exec(content)
    if (!match) return { frontmatter: '', body: content }
    return { frontmatter: match[1], body: content.slice(match[0].length) }
}

function joinFrontmatter (frontmatter, body) {
    return frontmatter ? `---\n${frontmatter}---\n${body}` : body
}

/**
 * Turn one authored image reference into the URL its file is served from.
 *
 * Left alone: anything already absolute, an external URL, and a data: URI. A blueprint
 * that points at /images/... is pointing into the website's own asset tree, not its own
 * directory, and rewriting it would break the reference.
 */
export function resolveAssetPath (assetBase, value) {
    const trimmed = value.trim().replace(/^["']|["']$/g, '')
    if (!trimmed) return trimmed
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(trimmed)) return trimmed
    return `${assetBase}/${trimmed.replace(/^\.\//, '')}`
}

const FRONTMATTER_IMAGE = /^image:[ \t]*(\S.*?)[ \t]*$/m

/** Point the card/OG image at the copied file. Read on /blueprints/, so it must be absolute. */
export function rewriteFrontmatterImage (content, assetBase) {
    const { frontmatter, body } = splitFrontmatter(content)
    return joinFrontmatter(
        frontmatter.replace(FRONTMATTER_IMAGE, (_, value) => `image: ${resolveAssetPath(assetBase, value)}`),
        body
    )
}

// A markdown image, split into its destination and its optional title string.
//
// The destination allows one level of balanced parentheses, which CommonMark permits and
// three of the multi-user-dashboard screenshots rely on (`multi-users-dashboard(1).png`);
// matching only up to the first ')' would rewrite half a filename. The title is captured
// separately so it is put back untouched rather than treated as part of the path.
const BODY_IMAGE = /(!\[[^\]]*\]\()((?:[^()\s]+|\([^()]*\))+)(\s+"[^"]*"|\s+'[^']*')?(\))/g

/** Rewrite the relative image destinations in the body. */
export function rewriteBodyImages (content, assetBase) {
    const { frontmatter, body } = splitFrontmatter(content)
    const rewritten = body.replace(
        BODY_IMAGE,
        (_, open, dest, title, close) => `${open}${resolveAssetPath(assetBase, dest)}${title ?? ''}${close}`
    )
    return joinFrontmatter(frontmatter, rewritten)
}

/**
 * Record when the source README last changed, for the sitemap's lastmod.
 *
 * A blank date is left out rather than written as an empty key: YAML reads `updated:` with
 * no value as null, which the collection's `z.string().optional()` rejects, and a schema
 * failure drops the whole page. That happens whenever the library is not a git checkout.
 */
export function injectUpdated (content, updated) {
    if (!updated) return content
    const { frontmatter, body } = splitFrontmatter(content)
    return joinFrontmatter(`updated: ${updated}\n${frontmatter}`, body)
}

/** Drop the Eleventy-only frontmatter field that named the Nunjucks layout. */
export function stripLayout (content) {
    return content.replace(/^layout:[^\n]*\n/m, '')
}

export function processBlueprint (content, { assetBase, updated }) {
    let out = stripLayout(content)
    out = rewriteFrontmatterImage(out, assetBase)
    out = rewriteBodyImages(out, assetBase)
    return injectUpdated(out, updated)
}
