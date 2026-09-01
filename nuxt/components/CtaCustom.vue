<script setup lang="ts">
// Free-form CTA for one-off destinations that don't need (and shouldn't get)
// a dedicated fixed component - reuses CtaButton's style system, but does NOT
// get the copy guarantee the five reserved Cta* components do: the caller
// always supplies `label`, and supplies `href` too UNLESS the destination
// fixes one (see below).
//
// The PostHog event is NOT a free-form prop - it's looked up from
// `destinationKey` in lib/custom-cta-destinations.ts. A raw `event` string
// prop would let two different CtaCustom instances pointed at the same URL
// drift onto two different event names with nobody noticing until a report
// looked wrong.
//
// `href` is resolved the same way, for destinations where it CAN be: a
// registry entry with its own `href` (a genuinely fixed destination, e.g. the
// HubSpot meeting link) is used as-is, ignoring/rejecting a caller-supplied
// href - only that way is "this destination has exactly one URL" actually
// guaranteed structurally rather than duplicated as free text at every call
// site (which is exactly how a URL and its event could drift apart in the
// first place). A registry entry with no `href` (its destination is
// genuinely dynamic - e.g. AgentSetupTabs.vue's per-client URL) still
// requires the caller to pass one; only the event is pinned for those.
//
// Guarded at render time against pointing at one of the five reserved
// destinations - use the matching component instead (CtaSignUp, CtaSignIn,
// CtaContactUs, CtaBookDemo, CtaPricing) so PostHog keeps grouping that
// destination's clicks under one event name. A CtaCustom silently pointed at
// e.g. /book-demo/ would fragment that metric again. Same "throw a
// descriptive error" convention as CtaImage.vue's invalid-cta check (see
// CLAUDE.md).
import CtaButton from './cta/CtaButton.vue'
import { CTA_DESTINATIONS, normalizeHref } from '../lib/cta-destinations'
import { CUSTOM_CTA_DESTINATIONS } from '../lib/custom-cta-destinations'

const props = withDefaults(defineProps<{
    label: string
    // Required only when the destinationKey's registry entry has no fixed
    // href of its own - see the note above.
    href?: string
    variant: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'nav-text' | 'ghost'
    position: string
    // Key into CUSTOM_CTA_DESTINATIONS - add an entry there for a new custom
    // CTA rather than inventing an event name (or, for a fixed-URL
    // destination, an href) inline.
    destinationKey: keyof typeof CUSTOM_CTA_DESTINATIONS
    // Whether `href` is a route Nuxt actually serves - see CtaButton.vue's
    // `external` prop. Unlike the five reserved components (which each know
    // their own destination), CtaCustom can't infer this, so it defaults to
    // the safer choice: a full page load always works, while defaulting to
    // `false` could 404 a link to a still-11ty page via client-side routing.
    external?: boolean
    // For a link to an actual external site, where opening in the current
    // tab would navigate the visitor away - not needed for `external`, which
    // only controls Vue Router vs. real navigation, not what tab it opens in.
    target?: string
    plan?: string
    color?: 'primary' | 'highlight' | 'white'
    uppercase?: boolean
    padded?: boolean
    preview?: boolean
    icon?: string
}>(), { uppercase: undefined, external: true })

// A single definition of "was this actually provided" used everywhere below,
// instead of relying on JS truthiness (which would treat an empty string the
// same as "not passed" in an `&&` check, but as "passed" in a `??` fallback -
// two different rules for the same question, in the same function).
const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length > 0

// computed(), not a plain const: these depend on reactive props, so if a
// parent ever changed `destinationKey` or `href` after mount, a plain const
// captured once at setup() would silently go stale instead of updating.
const destination = computed(() => {
    const dest = CUSTOM_CTA_DESTINATIONS[props.destinationKey] as { href?: string, event: string } | undefined
    if (!dest) {
        throw new Error(`CtaCustom destinationKey "${props.destinationKey}" isn't in lib/custom-cta-destinations.ts - add an entry there first.`)
    }
    return dest
})

const HREF = computed(() => {
    const fixedHref = destination.value.href
    const hasFixedHref = isNonEmptyString(fixedHref)
    const hasCallerHref = isNonEmptyString(props.href)
    if (hasFixedHref && hasCallerHref && fixedHref !== props.href) {
        throw new Error(`CtaCustom destinationKey "${props.destinationKey}" already fixes its href to "${fixedHref}" in lib/custom-cta-destinations.ts - don't also pass a conflicting href="${props.href}" prop.`)
    }
    if (!hasFixedHref && !hasCallerHref) {
        throw new Error(`CtaCustom destinationKey "${props.destinationKey}" has no fixed href in lib/custom-cta-destinations.ts, so an href prop is required here.`)
    }
    return hasFixedHref ? fixedHref : props.href!
})

const EVENT = computed(() => destination.value.event)

const collision = computed(() => Object.values(CTA_DESTINATIONS).find(dest => normalizeHref(dest.href) === normalizeHref(HREF.value)))
if (collision.value) {
    throw new Error(`CtaCustom cannot point at "${HREF.value}" - use <${collision.value.component}> instead, so PostHog keeps grouping this destination under one event name.`)
}
</script>

<template>
  <CtaButton :event="EVENT" :href="HREF" :external="external" :target="target" :label="label" :variant="variant" :position="position" :plan="plan" :icon="icon" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
