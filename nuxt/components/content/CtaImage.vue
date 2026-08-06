<script setup lang="ts">
// Inline image-as-CTA for blog markdown: ::cta-image{...}
// `cta` is separate from the frontmatter `cta` (only used by BlogPostCta).
import { useCapture } from '../../composables/useCapture'
import site from '../../../src/_data/site.json'

const props = defineProps<{
    src: string
    alt: string
    cta: 'sign-up' | 'demo' | 'contact' | 'pricing'
}>()

const POSITION = 'inline-image'
// Same event as BlogPostCta - cta_type distinguishes the destination, same as there.
const EVENT = 'blog-cta'

const DESTINATIONS: Record<string, { href: string, external: boolean }> = {
    'sign-up': { href: `${site.appURL}/account/create`, external: false },
    demo: { href: '/book-demo/', external: true },
    contact: { href: '/contact-us/', external: true },
    pricing: { href: '/pricing', external: true },
}

const destination = computed(() => {
    const match = DESTINATIONS[props.cta]
    if (!match) throw new Error(`CtaImage: invalid cta "${props.cta}" - must be one of: ${Object.keys(DESTINATIONS).join(', ')}`)
    return match
})
const capture = useCapture()

// Provided by nuxt/pages/blog/[...slug].vue - avoids repeating the title per instance.
const postTitle = inject<Ref<string> | undefined>('blogPostTitle', undefined)

function onClick () {
    capture(EVENT, {
        reference: `Blog: ${postTitle?.value || ''}`,
        position: POSITION,
        cta_type: props.cta,
    })
}
</script>

<template>
  <a class="mb-4 block" :href="destination.href" @click="onClick">
    <NuxtImg :src="src" :alt="alt" />
  </a>
</template>
