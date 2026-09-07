import site from '../../src/_data/site.json'
import ctaDestinations from '../../src/_data/ctaDestinations.json'

// Shared by CtaCustom.vue and custom-cta-destinations.ts, both of which
// compare hrefs for equality - a trailing slash shouldn't make two otherwise
// identical URLs count as different destinations.
export const normalizeHref = (href: string) => href.replace(/\/+$/, '')

type RawDestination = {
    component: string
    event: string
    href?: string
    hrefSuffix?: string
    label: string
    navLabel?: string
    navPositions?: string[]
}

// signUp/signIn's href depends on site.appURL, which is resolved here rather
// than baked into ctaDestinations.json itself - site.json already owns that
// value, and duplicating it into a second data file wouldn't make it any
// more "single source of truth" than it already is.
function withResolvedHref<T extends RawDestination>(dest: T) {
    return { ...dest, href: dest.href ?? `${site.appURL}${dest.hrefSuffix ?? ''}` }
}

// Single source of truth for the five reserved CTA destinations' event name,
// href, and fixed label - read by each Cta*.vue component (instead of each
// one hardcoding its own copy of this) and by CtaCustom.vue, which uses the
// hrefs to guard against a caller pointing it at one of these five.
//
// The actual data lives in src/_data/ctaDestinations.json, not here - that
// JSON is what 11ty's Nunjucks macros (src/_includes/components/cta/*.njk)
// also read, via a Nunjucks global registered in .eleventy.js. This file
// only resolves the one thing that can't live in static JSON (signUp/signIn's
// site.appURL-dependent href). A `CTA_DESTINATIONS` that duplicated the JSON's
// values by hand here, instead of importing them, would defeat the entire
// point of having one shared file - which is exactly the bug this replaced.
export const CTA_DESTINATIONS = {
    signUp: withResolvedHref(ctaDestinations.signUp),
    signIn: withResolvedHref(ctaDestinations.signIn),
    contactUs: withResolvedHref(ctaDestinations.contactUs),
    bookDemo: withResolvedHref(ctaDestinations.bookDemo),
    pricing: withResolvedHref(ctaDestinations.pricing),
}
