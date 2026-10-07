<template>
    <CtaLink v-if="cta" :destination="cta.destination" :query="cta.query" :target="target" position="inline-link" prose>
        <slot />
    </CtaLink>
    <UiProseA v-else :href="href" :target="target">
        <slot />
    </UiProseA>
</template>

<script setup lang="ts">
import UiProseA from '@nuxt/ui/components/prose/A.vue'
import { ctaLink } from '../../lib/cta-destinations'

const props = defineProps<{
    href?: string
    target?: string
}>()

const cta = computed(() => ctaLink(props.href))
</script>
