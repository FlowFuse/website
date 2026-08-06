<script setup lang="ts">
// Fixed destination, copy, and tracked event - only the look (variant) and
// where it lives on the page (position) vary per insertion.
import CtaButton from './cta/CtaButton.vue'

withDefaults(defineProps<{
    variant: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'text' | 'ghost'
    position: string
    plan?: string
    color?: 'primary' | 'highlight' | 'white'
    uppercase?: boolean
    padded?: boolean
    preview?: boolean
    icon?: string
    size?: 'sm' | 'md' | 'lg'
}>(), { uppercase: undefined })

const EVENT = 'cta-book-demo'
const HREF = '/book-demo/'
const LABEL = 'Book a Demo'
</script>

<template>
  <CtaButton :event="EVENT" :href="HREF" :label="LABEL" :variant="variant" :position="position" :plan="plan" :icon="icon" :size="size" :uppercase="uppercase" :padded="padded" :color="color" :preview="preview" />
</template>
