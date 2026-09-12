<script setup lang="ts">
const props = defineProps<{
    title: string
    cta?: { type?: string, title?: string, description?: string } | null
}>()

// All four types now render one of the unified Cta* components (fixed
// copy/href/event) instead of a local buttonText/buttonUrl pair, so the blog
// CTA can't drift from the rest of the site's copy.
const CTA_VARIANTS: Record<string, { title: string, description: string }> = {
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

// Self-serve sign-up is not offered from page content for now, so a post
// asking for the sign-up CTA gets the demo one instead. That covers 320 of
// the 415 posts: 274 declare no `cta` block at all and reach this through
// the fallback, 43 ask for `sign-up` and 3 for a typo'd `signup`.
//
// Those posts' own `cta.title`/`cta.description` are ignored too (see
// `heading`/`body`): 46 of them say "Sign up for FlowFuse" or "start a free
// trial" in the copy directly above the button, which would otherwise now
// sit above a Book a Demo. Ignoring the override keeps every post's copy
// truthful without editing 46 markdown files, so putting sign-up back is
// this block and nothing else.
const SIGNUP_TYPES = new Set(['sign-up', 'signup'])
const KNOWN_TYPES = new Set(['demo', 'contact', 'pricing'])
const FALLBACK_TYPE = 'demo'
const ctaType = computed(() => {
    const type = props.cta?.type
    return type && KNOWN_TYPES.has(type) ? type : FALLBACK_TYPE
})
const currentCta = computed(() => CTA_VARIANTS[ctaType.value])
const isRedirectedSignUp = computed(() => SIGNUP_TYPES.has(props.cta?.type ?? ''))
const heading = computed(() => (isRedirectedSignUp.value ? currentCta.value.title : props.cta?.title || currentCta.value.title))
const body = computed(() => (isRedirectedSignUp.value ? currentCta.value.description : props.cta?.description || currentCta.value.description))

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
  <div class="ff-blue-card blog-post-cta p-8 sm:p-12 m-auto">
    <div class="flex flex-col gap-6 sm:gap-8 text-center sm:text-left">
      <h3 class="mt-0 mb-0 !text-3xl text-indigo-800">{{ heading }}</h3>
      <p class="mt-0 mb-0 max-w-4xl mx-auto sm:mx-0 leading-relaxed">{{ body }}</p>
      <div class="flex justify-center sm:justify-start" @click="onCtaClick">
        <CtaBookDemo v-if="ctaType === 'demo'" variant="highlight" position="blog-post-cta" />
        <CtaContactUs v-else-if="ctaType === 'contact'" variant="highlight" position="blog-post-cta" />
        <CtaPricing v-else variant="highlight" position="blog-post-cta" />
      </div>
    </div>
  </div>
</template>
