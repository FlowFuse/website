// src/_includes/smooth-scroll.njk, which four pages pulled in to make one in-page link
// scroll rather than jump. The .njk defined a global function and wired it through an
// inline onclick; this is the same behaviour as a handler the template can bind.
export function useScrollToAnchor() {
    return function scrollToAnchor(event: Event, anchorId: string) {
        event.preventDefault()
        document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' })
    }
}
