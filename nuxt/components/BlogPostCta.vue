<script setup lang="ts">
const props = defineProps<{
    title: string
    cta?: { type?: string, title?: string, description?: string } | null
}>()

// 'sign-up' / 'demo' / 'contact' now render one of the unified Cta* components
// (fixed copy/href/event) instead of a local buttonText/buttonUrl pair, so the
// blog CTA can't drift from the rest of the site's copy. 'pricing' isn't one
// of the four unified destinations, so it keeps its own link.
const CTA_VARIANTS: Record<string, { title: string, description: string }> = {
    'sign-up': {
        title: 'Start building with your own industrial data',
        description: 'Connect your systems, automate workflows, and see what’s possible in your environment.',
    },
    demo: {
        title: 'See how FlowFuse works in real environments',
        description: 'Walk through real use cases and see how teams connect systems, automate workflows, and deploy at scale.',
    },
    contact: {
        title: 'Discuss your use case with our team',
        description: 'See how FlowFuse can support your architecture, integrations, and deployment needs.',
    },
    pricing: {
        title: 'Explore plans that fit your deployment',
        description: 'Compare options based on your scale, infrastructure, and security requirements.',
    },
}

// Missing type defaults to 'contact'; an unrecognised one (e.g. typo'd
// `type: signup`) falls back to 'sign-up' - same two fallbacks as before.
const KNOWN_TYPES = new Set(['sign-up', 'demo', 'contact', 'pricing'])
const ctaType = computed(() => {
    const type = props.cta?.type
    if (!type) return 'contact'
    return KNOWN_TYPES.has(type) ? type : 'sign-up'
})
const currentCta = computed(() => CTA_VARIANTS[ctaType.value])

// Kept as-is from Eleventy for data continuity - fires alongside, not
// instead of, each Cta* component's own cta-* event.
// Delegated from the wrapping row, since the three Cta* components own their
// own root element. That row is the full width of the card while the button
// is ~130px, so without the closest('a') guard a click on the empty space
// beside the button reports a CTA click that never happened.
function onCtaClick (event: MouseEvent) {
    const target = event.target as Element | null
    if (!target?.closest('a')) return
    if (typeof (window as any).capture === 'function') {
        (window as any).capture('blog-cta', { reference: `Blog: ${props.title}`, cta_type: ctaType.value })
    }
}
</script>

<template>
  <div class="ff-blue-card blog-post-cta p-8 sm:p-12 m-auto max-w-prose">
    <div class="flex flex-col gap-6 sm:gap-8 text-center sm:text-left">
      <h3 class="mt-0 mb-0 !text-3xl text-indigo-800">{{ cta?.title || currentCta.title }}</h3>
      <p class="mt-0 mb-0 max-w-4xl mx-auto sm:mx-0 leading-relaxed">{{ cta?.description || currentCta.description }}</p>
      <div class="flex justify-center sm:justify-start" @click="onCtaClick">
        <CtaSignUp v-if="ctaType === 'sign-up'" variant="highlight" position="blog-post-cta" />
        <CtaBookDemo v-else-if="ctaType === 'demo'" variant="highlight" position="blog-post-cta" />
        <CtaContactUs v-else-if="ctaType === 'contact'" variant="highlight" position="blog-post-cta" />
        <a v-else class="ff-btn ff-btn--highlight uppercase items-center text-base no-underline" href="/pricing">View Pricing</a>
      </div>
    </div>
  </div>
</template>
