<script setup lang="ts">
// Fixed destination, copy, and tracked event - only the look (variant) and
// where it lives on the page (position) vary per insertion.
import CtaButton from './cta/CtaButton.vue'
import site from '../../src/_data/site.json'

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

const EVENT = 'cta-sign-up'
const HREF = `${site.appURL}/account/create`

// Copy varies by placement, per the PostHog CTA analysis: the nav's
// sitewide "Free Trial" and everywhere else's "Try it out" were the two
// highest-volume variants for this destination, each proven in its own
// context. Kept as a fixed lookup (not a caller-supplied prop) so callers
// can't reintroduce arbitrary copy variants - only `position` decides.
const NAV_POSITIONS = new Set(['main-nav', 'mobile-cta-bar'])
const LABEL = computed(() => NAV_POSITIONS.has(props.position) ? 'Free Trial' : 'Try it out')
</script>

<template>
  <CtaButton :event="EVENT" :href="HREF" :label="LABEL" :variant="variant" :position="position" :plan="plan" :icon="icon" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
