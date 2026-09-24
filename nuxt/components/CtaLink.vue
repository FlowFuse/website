<script setup lang="ts">
import UiProseA from '@nuxt/ui/components/prose/A.vue'
import { CTA_DESTINATIONS, ctaDestinationKey } from '../lib/cta-destinations'
import { useCapture } from '../composables/useCapture'

const props = withDefaults(defineProps<{
    destination: keyof typeof CTA_DESTINATIONS
    position: string
    variant?: 'text' | 'image'
    href?: string
    target?: string
    prose?: boolean
}>(), { variant: 'text' })

const dest = computed(() => {
    const match = CTA_DESTINATIONS[props.destination]
    if (!match) throw new Error(`CtaLink: invalid destination "${props.destination}" - must be one of: ${Object.keys(CTA_DESTINATIONS).join(', ')}`)
    if (props.href && ctaDestinationKey(props.href) !== props.destination) throw new Error(`CtaLink: href "${props.href}" doesn't point at ${props.destination} (${match.href})`)
    return match
})
const linkHref = computed(() => props.href || dest.value.href)
const capture = useCapture()

function onClick () {
    capture(dest.value.event, { position: props.position, variant: props.variant })
}
</script>

<template>
  <UiProseA v-if="prose" :href="linkHref" :target="target" @click="onClick">
    <slot />
  </UiProseA>
  <ULink v-else :href="linkHref" :target="target" raw @click="onClick">
    <slot />
  </ULink>
</template>
