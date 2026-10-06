// The page a content path is rendered at. The two are the same everywhere except the
// whitepapers: their files live under content/whitepapers/, but the route is singular
// (pages/whitepaper/[slug].vue). Shared by the sitemap (server/api/__sitemap__/content-urls.get.ts)
// and the /raw canonical (raw-canonical.mjs), so the two cannot disagree about a page's url.

/**
 * @param {string} path a content path, e.g. /whitepapers/open-source-software-for-manufacturing
 * @returns {string} e.g. /whitepaper/open-source-software-for-manufacturing
 */
export const contentPagePath = path => path.replace(/^\/whitepapers\//, '/whitepaper/')
