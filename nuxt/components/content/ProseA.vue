<template>
    <UiProseA :href="href" :target="target" @click="onClick">
        <slot />
    </UiProseA>
</template>

<script setup lang="ts">
import UiProseA from '@nuxt/ui/components/prose/A.vue'
import { ctaDestinationForHref } from '../../lib/cta-destinations'
import { useCapture } from '../../composables/useCapture'

const props = defineProps<{
    href?: string
    target?: string
}>()

const capture = useCapture()
const destination = computed(() => ctaDestinationForHref(props.href))

function onClick () {
    if (destination.value) capture(destination.value.event, { position: 'inline-link' })
}
</script>
