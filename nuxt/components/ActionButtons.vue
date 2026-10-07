<script setup lang="ts">
// A row of buttons given as data, for components whose buttons come from content (the
// use-case sections) or vary per caller (<ClosingCta>). Each entry names one of the
// fixed CTA destinations, so copy, href and event stay owned by the Cta* components; an
// entry with `href` instead is a plain in-page link (it-ot-middleware's "Read
// Whitepaper" jumps to its own #whitepapers list), which is navigation, not a tracked CTA.
type Cta =
    | { cta: 'book-demo' | 'contact-us' | 'sign-up' | 'pricing', variant?: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'ghost', color?: 'primary' | 'highlight' | 'white', icon?: string }
    | { label: string, href: string }

defineProps<{
    ctas: Cta[]
    position: string
}>()

const COMPONENTS = {
    'book-demo': resolveComponent('CtaBookDemo'),
    'contact-us': resolveComponent('CtaContactUs'),
    'sign-up': resolveComponent('CtaSignUp'),
    'pricing': resolveComponent('CtaPricing'),
}

// The first button leads, every later one follows, so a page only names a variant when it
// wants something other than that.
function variantFor(cta: { variant?: string }, index: number) {
    return cta.variant || (index === 0 ? 'highlight' : 'primary-outlined')
}
</script>

<template>
  <template v-for="(cta, i) in ctas" :key="i">
    <a v-if="'href' in cta" :href="cta.href" class="inline-block ff-btn ff-btn--primary-outlined shadow uppercase">{{ cta.label }}</a>
    <component
        :is="COMPONENTS[cta.cta]"
        v-else
        :variant="variantFor(cta, i)"
        :color="cta.color"
        :icon="cta.icon"
        :position="position"
        class="min-h-[40px]"
    />
  </template>
</template>
