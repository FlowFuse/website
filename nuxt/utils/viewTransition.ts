// Shared by the docs and handbook view transitions: the page change in
// plugins/section-view-transitions.client.ts and the search dialog in AlgoliaSearch.vue.

/** The view-transition-name the docs and handbook search fields share. */
export const SEARCH_TRANSITION_NAME = 'ff-search'

/** Whether a view transition can run here, and the reader has not asked for less motion. */
export function canViewTransition (): boolean {
    return typeof document !== 'undefined'
        && 'startViewTransition' in document
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Whether any part of the element is on screen. A hidden element (display: none) is not. */
export function isInViewport (el: Element): boolean {
    const rect = el.getBoundingClientRect()
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight
}
