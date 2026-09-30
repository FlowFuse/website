// Maps a /raw/<path>.md request to the html page it is a copy of, for a canonical Link
// header. Free of Nuxt imports so `node --test` runs it directly; the middleware in
// nuxt/server/middleware/raw-canonical.ts only sets the header.
//
// @nuxt/content serves every page of a page-type collection a second time, as markdown at
// /raw/<path>.md, and llms.txt links to those copies. The copies carry the same
// `X-Robots-Tag: index, follow` as the html, so to a search engine every doc, post and
// changelog entry has an indexable twin competing with it. Google honours
// `Link: <url>; rel="canonical"` on non-html responses, which folds the twin into the page
// while leaving the markdown readable for the agents llms.txt is for.

import { contentPagePath } from './content-page-path.mjs'

// Anything that could end the <...> of the header value or start a new header.
const UNSAFE = /[<>"\s]/

const decode = (segment) => {
    try {
        return decodeURIComponent(segment)
    } catch {
        return segment
    }
}

/**
 * @param {string} pathname the request path, e.g. /raw/docs/user/mcp.md
 * @param {string} siteUrl e.g. https://flowfuse.com
 * @returns {string | null} e.g. https://flowfuse.com/docs/user/mcp/, or null when the
 *   path is not a raw markdown url
 */
export function rawMarkdownCanonical (pathname, siteUrl) {
    const match = /^\/raw\/(.+)\.md$/.exec(pathname.split('?')[0])
    if (!match || UNSAFE.test(match[1])) return null

    // Netlify decodes the path before the function sees it, so a slug with a reserved
    // character arrives as "flowfuse+llm" where the sitemap has "flowfuse%2Bllm". Decoding
    // and re-encoding each segment gives the sitemap's spelling whichever form came in.
    let path = '/' + match[1].split('/').map(segment => encodeURIComponent(decode(segment))).join('/')
    // Same mapping as the route handler: a trailing /index is the section's own page.
    if (path.endsWith('/index')) path = path.slice(0, -'/index'.length)
    // /raw/whitepapers/<slug>.md is a copy of /whitepaper/<slug>/, as the sitemap has it.
    path = contentPagePath(path)

    // Every page on the site ends in a slash (site.trailingSlash), so the canonical does too.
    return `${siteUrl.replace(/\/$/, '')}${path}/`
}
