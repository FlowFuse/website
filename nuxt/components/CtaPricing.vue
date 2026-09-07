<script setup lang="ts">
// Fixed destination, copy, and tracked event - only the look (variant) and
// where it lives on the page (position) vary per insertion.
import CtaButton from './cta/CtaButton.vue'
import { CTA_DESTINATIONS } from '../lib/cta-destinations'

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

const DEST = CTA_DESTINATIONS.pricing
const EVENT = DEST.event
const HREF = DEST.href
const LABEL = DEST.label
</script>

<template>
  <CtaButton :event="EVENT" :href="HREF" :external="false" :label="LABEL" :variant="variant" :position="position" :plan="plan" :icon="icon" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
