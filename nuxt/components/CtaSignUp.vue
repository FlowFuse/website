<script setup lang="ts">
// Fixed destination, copy, and tracked event - only the look (variant) and
// where it lives on the page (position) vary per insertion.
import CtaButton from './cta/CtaButton.vue'
import site from '../../src/_data/site.json'
// Event/href-suffix/label all come from this single JSON file, which the
// equivalent 11ty macro (src/_includes/components/cta/cta-sign-up.njk) also
// reads - the one place these can drift between the two frameworks if only
// one side gets updated.
import ctaDestinations from '../../src/_data/ctaDestinations.json'

const props = withDefaults(defineProps<{
    variant: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'nav-text' | 'ghost'
    position: string
    plan?: string
    color?: 'primary' | 'highlight' | 'white'
    uppercase?: boolean
    padded?: boolean
    preview?: boolean
    icon?: string
}>(), { uppercase: undefined })

const dest = ctaDestinations.signUp
const EVENT = dest.event
const HREF = `${site.appURL}${dest.hrefSuffix}`

// Copy varies by placement, per the PostHog CTA analysis: the nav's
// sitewide "Free Trial" and everywhere else's "Try it out" were the two
// highest-volume variants for this destination, each proven in its own
// context. Kept as a fixed lookup (not a caller-supplied prop) so callers
// can't reintroduce arbitrary copy variants - only `position` decides.
const NAV_POSITIONS = new Set(dest.navPositions)
const LABEL = computed(() => NAV_POSITIONS.has(props.position) ? dest.navLabel : dest.label)
</script>

<template>
  <CtaButton :event="EVENT" :href="HREF" :external="false" :label="LABEL" :variant="variant" :position="position" :plan="plan" :icon="icon" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
