<script setup lang="ts">
// Inline image-as-CTA for blog markdown: ::cta-image{...}
// `cta` is separate from the frontmatter `cta` (only used by BlogPostCta).
import { useCapture } from '../../composables/useCapture'
import type { CUSTOM_CTA_DESTINATIONS } from '../../lib/custom-cta-destinations'
import { CTA_IMAGE_DESTINATIONS, ctaImageError, customCtaImageDestination } from '../../lib/cta-image'

const props = defineProps<{
    src: string
    alt: string
    cta: 'sign-up' | 'demo' | 'contact' | 'pricing' | 'custom'
    destinationKey?: keyof typeof CUSTOM_CTA_DESTINATIONS
    /**
     * What the event's `reference` should say, for a page that is not a blog post.
     *
     * Blog posts leave this unset and get `Blog: <post title>` from the injected title
     * below. The Node-RED guides under /docs have no injected title and no post, and
     * carried their own reference string in a hand-written `onclick="capture(...)"` while
     * they were Eleventy pages - MDC strips `onclick`, so that tracking went silent the
     * moment they became content files. This prop is how those pages keep the exact
     * reference they were already reporting, rather than a new dimension.
     */
    reference?: string
}>()

const POSITION = 'inline-image'
const VARIANT = 'image'
// Same event as BlogPostCta - cta_type distinguishes the destination, same as there.
const EVENT = 'blog-cta'

const destination = computed(() => {
    const error = ctaImageError(props.cta, props.destinationKey)
    if (error) throw new Error(`CtaImage: ${error}`)
    return props.cta === 'custom' ? undefined : CTA_IMAGE_DESTINATIONS[props.cta]
})
const custom = computed(() => destination.value ? undefined : customCtaImageDestination(props.destinationKey))
const capture = useCapture()

// Provided by nuxt/pages/blog/[...slug].vue - avoids repeating the title per instance.
const postTitle = inject<Ref<string> | undefined>('blogPostTitle', undefined)

function onClick () {
    if (custom.value) capture(custom.value.event, { position: POSITION, variant: VARIANT })
    capture(EVENT, {
        reference: props.reference || `Blog: ${postTitle?.value || ''}`,
        position: POSITION,
        cta_type: props.cta,
        ...(custom.value && { destination_key: props.destinationKey }),
    })
}
</script>

<template>
  <CtaLink v-if="destination" :destination="destination" :position="POSITION" :variant="VARIANT" class="mb-4 block" @click="onClick">
    <NuxtImg :src="src" :alt="alt" />
  </CtaLink>
  <ULink v-else :href="custom?.href" external raw class="mb-4 block" @click="onClick">
    <NuxtImg :src="src" :alt="alt" />
  </ULink>
</template>
