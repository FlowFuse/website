import { CTA_DESTINATIONS, ctaDestinationKey, normalizeHref } from './cta-destinations'

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
// A note on migrated events, here and on agentSetupClientOpen below: only
// the EVENT NAME is preserved from each destination's pre-CtaCustom
// hand-written capture() call, so existing PostHog insights/dashboards
// filtering by that name keep working. The property payload is not
// preserved byte-for-byte - CtaButton always sends {position, variant,
// plan?} now, which is a deliberate enrichment (hubspotMeeting's original
// call sent no properties at all; agentSetupClientOpen's sent only
// `position`), not an attempt at an identical payload shape.
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
    // ExploreMoreContent.vue's query). Named for that destination, not for
    // the fact that it's shown as a post-conversion suggestion.
    latestWebinar: {
        event: 'cta-latest-webinar',
    },
    // href varies per AI client (Claude Desktop, Cursor, etc.) - only the
    // event is fixed. Kept as the same event name AgentSetupTabs.vue already
    // used (see the payload note above - only the name matches, not the
    // full property shape).
    agentSetupClientOpen: {
        event: 'cta-ai-open-client',
    },
    // Event name preserved from the hand-written capture() call this replaces
    // on the OPC UA integration page (see the note above on migrated events).
    opcuaCertifiedNodeDocs: {
        href: '/docs/flowfuse-nodes/edge/opcua/',
        event: 'cta-certified-opcua-node',
    },
    deviceAgentInstall: {
        href: '/platform/device-agent/#install-from-your-terminal',
        event: 'cta-device-agent-install',
    },
} as const

// Self-check, run when this module loads: a second entry must not reuse a URL another
// entry already registered, and no entry may point at one of the five reserved
// destinations (cta-destinations.ts), matched with ctaDestinationKey - the same rule
// CtaCustom, CtaLink and ProseA use, so a query string, hash or absolute flowfuse.com
// URL doesn't slip past. nuxt/lib/cta-destinations.test.mjs loads this module, so a bad
// entry fails `npm test`.
const hrefOwners = new Map<string, string>()
for (const [key, dest] of Object.entries(CUSTOM_CTA_DESTINATIONS)) {
    if (!('href' in dest) || !dest.href) continue
    const reserved = ctaDestinationKey(dest.href)
    if (reserved) {
        throw new Error(`custom-cta-destinations.ts: "${key}" points at "${dest.href}", one of the five reserved CTA destinations - use <${CTA_DESTINATIONS[reserved].component}> or <CtaLink destination="${reserved}"> instead.`)
    }
    const owner = hrefOwners.get(normalizeHref(dest.href))
    if (owner) {
        throw new Error(`custom-cta-destinations.ts: "${dest.href}" is registered under both "${owner}" and "${key}" - reuse "${owner}" instead of adding a second key for the same URL.`)
    }
    hrefOwners.set(normalizeHref(dest.href), key)
}
