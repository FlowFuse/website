import { CTA_DESTINATIONS } from './cta-destinations'

// Registry for one-off CTA destinations that aren't one of the five reserved
// ones (see cta-destinations.ts) but still deserve one fixed PostHog event -
// whether because the same URL is used in more than one place, or because the
// destination's href is dynamic (varies per instance) and only the event name
// needs to stay stable across every instance.
//
// CtaCustom takes a `destinationKey` into this map instead of a raw `event`
// string, so "this destination is always tracked under this one event name"
// is a structural guarantee - there's exactly one place a key's event is
// decided, not two props on every call site that could quietly drift apart.
//
// Entries with a fixed `href` are the actual structural guarantee: CtaCustom
// reads that href from here rather than accepting one from the caller, so
// there is exactly one URL for that key, same as there's exactly one event.
// Without `href` here too, two call sites could each type the same URL by
// hand and pick different keys (or the same key with a since-changed URL)
// and nothing would catch it - the guarantee only holds for what actually
// lives in this file.
//
// Entries with no `href` are for a destination whose URL is genuinely
// dynamic (varies per instance, e.g. per webinar or per AI client) - for
// those, only the event can be pinned here; the caller still supplies `href`
// each time, same as before.
export const CUSTOM_CTA_DESTINATIONS = {
    hubspotMeeting: {
        href: 'https://meetings-eu1.hubspot.com/michael-davis/round-robin-sales-team',
        event: 'calendar_fallback_cta_clicked',
    },
    communityForum: {
        href: 'https://discourse.nodered.org/c/vendors/flowfuse/24/',
        event: 'cta-community-forum',
    },
    // Both the key and the event are named for the destination (the
    // homepage), not the page it's used from (the 404 error page) - same
    // convention as every other entry here.
    homepage: {
        href: '/',
        event: 'cta-homepage',
    },
    // href varies - always the single most-recently-dated webinar (past or
    // upcoming), never the general webinars listing (see
    // ThankYouExploreMore.vue's query). Named for that destination, not for
    // the fact that it's shown as a post-conversion suggestion.
    latestWebinar: {
        event: 'cta-latest-webinar',
    },
    // href varies per AI client (Claude Desktop, Cursor, etc.) - only the
    // event is fixed. Kept as the same name AgentSetupTabs.vue's tab-click
    // tracking already used, for continuity with existing PostHog data.
    agentSetupClientOpen: {
        event: 'cta-ai-open-client',
    },
} as const

// Self-check, run once when this module loads (so at build/dev-start time,
// before any page renders and regardless of whether anything uses the new
// entry yet): CtaCustom's own checks stop a *caller* from mismatching an
// href and a key, but nothing stopped a second entry from being added HERE
// with the same href as an existing one - reuse the existing key instead of
// adding a new one for a URL already registered.
//
// Also checked against the five RESERVED destinations (cta-destinations.ts):
// without this, adding a custom entry whose href duplicates e.g. bookDemo's
// would load fine and only fail later, if and when some page actually
// rendered a <CtaCustom> with that key - CtaCustom's own render-time guard
// would still catch it then, but only for a key that's actually used
// somewhere, not the instant the bad entry is registered.
//
// Same normalization CtaCustom.vue uses for its own reserved-destination
// check - without it, "/book-demo/" and "/book-demo" would count as
// different URLs and slip past this check.
const normalize = (href: string) => href.replace(/\/+$/, '')

const hrefOwners = new Map<string, string>(
    Object.values(CTA_DESTINATIONS).map(dest => [normalize(dest.href), dest.component]),
)
for (const [key, dest] of Object.entries(CUSTOM_CTA_DESTINATIONS)) {
    if (!('href' in dest) || !dest.href) continue
    const normalizedHref = normalize(dest.href)
    const owner = hrefOwners.get(normalizedHref)
    if (owner) {
        throw new Error(`custom-cta-destinations.ts: "${dest.href}" is registered under both "${owner}" and "${key}" - reuse "${owner}" instead of adding a second key for the same URL.`)
    }
    hrefOwners.set(normalizedHref, key)
}
