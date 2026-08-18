<script setup lang="ts">
// Fixed destination, copy, and tracked event - only the look (variant) and
// where it lives on the page (position) vary per insertion.
import CtaButton from './cta/CtaButton.vue'
// Shared with the equivalent 11ty macro (cta-book-demo.njk) - see CtaSignUp.vue.
import ctaDestinations from '../../src/_data/ctaDestinations.json'

withDefaults(defineProps<{
    variant: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'nav-text' | 'ghost'
    position: string
    plan?: string
    color?: 'primary' | 'highlight' | 'white'
    uppercase?: boolean
    padded?: boolean
    preview?: boolean
    icon?: string
}>(), { uppercase: undefined })

const dest = ctaDestinations.bookDemo
const EVENT = dest.event
const HREF = dest.href
const LABEL = dest.label
// /book-demo/ is still served by 11ty, not a Nuxt route - see CtaButton.vue's
// `external` prop.
</script>

<template>
  <CtaButton :event="EVENT" :href="HREF" :external="true" :label="LABEL" :variant="variant" :position="position" :plan="plan" :icon="icon" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
