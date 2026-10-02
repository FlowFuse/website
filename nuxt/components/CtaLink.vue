<script setup lang="ts">
import UiProseA from '@nuxt/ui/components/prose/A.vue'
import { CTA_DESTINATIONS, withCtaQuery, type CtaQuery } from '../lib/cta-destinations'
import { useCapture } from '../composables/useCapture'

const props = withDefaults(defineProps<{
    destination: keyof typeof CTA_DESTINATIONS
    position: string
    variant?: 'text' | 'image'
    query?: CtaQuery
    target?: string
    prose?: boolean
}>(), { variant: 'text' })

const dest = computed(() => {
    const match = CTA_DESTINATIONS[props.destination]
    if (!match) throw new Error(`CtaLink: invalid destination "${props.destination}" - must be one of: ${Object.keys(CTA_DESTINATIONS).join(', ')}`)
    return match
})
const linkHref = computed(() => withCtaQuery(dest.value.href, props.query))
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
