<script setup lang="ts">
// Free-form CTA for one-off destinations that don't need (and shouldn't get)
// a dedicated fixed component - reuses CtaButton's style system, but does NOT
// get the copy/event guarantee the five reserved Cta* components do: the
// caller supplies `label`, `href`, AND `event` directly - all three, by
// design, since this component's whole point is full customization.
//
// `event` is required, not defaulted to some generic 'cta-custom' - a
// default would mean every instance quietly falls into one undifferentiated
// PostHog bucket unless someone remembers to opt out of it, which is exactly
// the kind of fragmentation/aggregation problem this Cta* system exists to
// prevent. Forcing the caller to name it keeps click data meaningful from
// the start.
//
// Guarded at render time against pointing at one of the five reserved
// destinations - use the matching component instead (CtaSignUp, CtaSignIn,
// CtaContactUs, CtaBookDemo, CtaPricing) so PostHog keeps grouping that
// destination's clicks under one event name. A CtaCustom silently pointed at
// e.g. /book-demo/ would fragment that metric again. Same "throw a
// descriptive error" convention as CtaImage.vue's invalid-cta check (see
// CLAUDE.md).
import CtaButton from './cta/CtaButton.vue'
import { CTA_DESTINATIONS } from '../lib/cta-destinations'

const props = withDefaults(defineProps<{
    label: string
    href: string
    variant: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'nav-text' | 'ghost'
    position: string
    // Whether `href` is a route Nuxt actually serves - see CtaButton.vue's
    // `external` prop. Unlike the five reserved components (which each know
    // their own destination), CtaCustom can't infer this, so it defaults to
    // the safer choice: a full page load always works, while defaulting to
    // `false` could 404 a link to a still-11ty page via client-side routing.
    external?: boolean
    // Required - see the note above. When migrating an existing hand-written
    // button that already had a meaningful PostHog event (e.g.
    // 'cta-ai-open-client'), pass that same name so no tracking history is lost.
    event: string
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

const normalize = (href: string) => href.replace(/\/+$/, '')
const collision = Object.values(CTA_DESTINATIONS).find(dest => normalize(dest.href) === normalize(props.href))
if (collision) {
    throw new Error(`CtaCustom cannot point at "${props.href}" - use <${collision.component}> instead, so PostHog keeps grouping this destination under one event name.`)
}
</script>

<template>
  <CtaButton :event="event" :href="href" :external="external" :target="target" :label="label" :variant="variant" :position="position" :plan="plan" :icon="icon" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
