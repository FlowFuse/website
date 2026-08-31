<script setup lang="ts">
// Free-form CTA for one-off destinations that don't need (and shouldn't get)
// a dedicated fixed component - reuses CtaButton's style system, but does NOT
// get the copy/event guarantee the five reserved Cta* components do: the
// caller supplies both `label` and `href` directly.
//
// Guarded at render time against pointing at one of those five reserved
// destinations - use the matching component instead (CtaSignUp, CtaSignIn,
// CtaContactUs, CtaBookDemo, CtaPricing) so PostHog keeps grouping that
// destination's clicks under one event name. A CtaCustom silently pointed at
// e.g. /book-demo/ would fragment that metric again, exactly what the Cta*
// system exists to prevent. Same "throw a descriptive error" convention as
// CtaImage.vue's invalid-cta check (see CLAUDE.md).
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
    plan?: string
    color?: 'primary' | 'highlight' | 'white'
    uppercase?: boolean
    padded?: boolean
    preview?: boolean
    icon?: string
}>(), { uppercase: undefined, external: true })

const EVENT = 'cta-custom'

const normalize = (href: string) => href.replace(/\/+$/, '')
const collision = Object.values(CTA_DESTINATIONS).find(dest => normalize(dest.href) === normalize(props.href))
if (collision) {
    throw new Error(`CtaCustom cannot point at "${props.href}" - use <${collision.component}> instead, so PostHog keeps grouping this destination under one event name.`)
}
</script>

<template>
  <CtaButton :event="EVENT" :href="href" :external="external" :label="label" :variant="variant" :position="position" :plan="plan" :icon="icon" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
