// Maps a docs page's path on disk to the /docs path it will be served at.
//
// /docs is assembled from two sources and they sit in different places on disk.
// FlowFuse/flowfuse's docs are materialized into nuxt/content/docs by docs-sync.mjs, so
// their path already contains the `/docs/` segment. This repo's own guides are read
// straight out of nuxt/content-guides/, which does not contain it, and the collection
// gives that source `prefix: 'docs'` to put them under the same URL space.
//
// Anything resolving a relative URL inside a page needs the served path rather than the
// on-disk one, and keying only off `/docs/` silently skipped the whole second source:
// every relative image URL in the guides reached the browser unresolved and 404'd
// against the page's own URL instead. Kept in nuxt/lib as plain JS so `node --test` can
// exercise it directly, like docs-nav.mjs.

const GUIDES_SEGMENT = '/content-guides/'
const DOCS_SEGMENT = '/docs/'

/**
 * The `/docs/...` path a source file is served at, or `null` if it is not a docs page.
 *
 * @param {string} filePath absolute or repo-relative path of the source file
 * @returns {string|null}
 */
export function docsPathForSourceFile (filePath) {
    const path = String(filePath || '')

    const guidesIndex = path.lastIndexOf(GUIDES_SEGMENT)
    if (guidesIndex !== -1) {
        return DOCS_SEGMENT + path.slice(guidesIndex + GUIDES_SEGMENT.length)
    }

    const docsIndex = path.lastIndexOf(DOCS_SEGMENT)
    return docsIndex === -1 ? null : path.slice(docsIndex)
}
