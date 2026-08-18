<script setup lang="ts">
// Fixed destination, copy, and tracked event - only the look (variant) and
// where it lives on the page (position) vary per insertion.
// First component to give the Sign In link any tracking at all.
import CtaButton from './cta/CtaButton.vue'
import site from '../../src/_data/site.json'
// Shared with the equivalent 11ty macro (cta-sign-in.njk) - see CtaSignUp.vue.
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

const dest = ctaDestinations.signIn
const EVENT = dest.event
const HREF = `${site.appURL}${dest.hrefSuffix}`
const LABEL = dest.label
</script>

<template>
  <CtaButton :event="EVENT" :href="HREF" :external="false" :label="LABEL" :variant="variant" :position="position" :plan="plan" :icon="icon" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
