// Which of a docs page's several titles becomes the browser and search-result title.
//
// Lives here rather than inline in nuxt/pages/docs/[...slug].vue so `node --test` can
// assert the order. It is one expression, but it is the expression that decides what
// Google shows for every page under /docs, and getting it wrong is invisible: the page
// still renders, still builds, still passes the link checker, and simply has the wrong
// title. That is exactly how the Node-RED library's pages lost theirs.

/**
 * @param {{metaTitle?: string|null, navTitle?: string|null, title?: string|null}|null} page
 * @param {string[]} slugParts the docs path segments, used only as a last resort
 * @returns {string}
 */
export function docsPageTitle (page, slugParts = []) {
    // metaTitle first: navTitle is the sidebar label, kept short enough to fit the nav
    // column, so a page whose full title is longer needs a way to say which one Google
    // gets. Pages migrated off Eleventy carry it, and nothing in FlowFuse/flowfuse's docs
    // sets it, so their titles are unaffected by its presence here.
    return page?.metaTitle || page?.navTitle || page?.title || slugParts.at(-1) || 'Documentation'
}
