<script setup lang="ts">
// Fixed destination, copy, and tracked event - only the look (variant) and
// where it lives on the page (position) vary per insertion.
// First component to give the Sign In link any tracking at all.
import CtaButton from './cta/CtaButton.vue'
import site from '../../src/_data/site.json'

withDefaults(defineProps<{
    variant: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'text'
    position: string
    plan?: string
    uppercase?: boolean
    padded?: boolean
    icon?: string
    size?: 'sm' | 'md' | 'lg'
}>(), { uppercase: undefined })

const EVENT = 'cta-sign-in'
const HREF = site.appURL
const LABEL = 'Sign In'
</script>

<template>
  <CtaButton :event="EVENT" :href="HREF" :label="LABEL" :variant="variant" :position="position" :plan="plan" :icon="icon" :size="size" :uppercase="uppercase" :padded="padded" />
</template>
