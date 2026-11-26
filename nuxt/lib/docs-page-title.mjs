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
    if (page?.metaTitle) return page.metaTitle
    // A generic sidebar label ("Overview", "Introduction", "Quick Start") only makes sense
    // under its section heading in the nav. As a <title> it said nothing, and the section
    // landing pages that use it all shared one (Semrush: Duplicate title tag). Their H1
    // names the section, so it is the title instead.
    if (page?.title && GENERIC_NAV_LABELS.has(String(page?.navTitle || '').trim().toLowerCase())) return page.title
    return page?.navTitle || page?.title || slugParts.at(-1) || 'Documentation'
}

const GENERIC_NAV_LABELS = new Set(['overview', 'introduction', 'quick start'])
