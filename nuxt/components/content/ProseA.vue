<template>
    <CtaLink v-if="destination" :destination="destination" :href="href" :target="target" position="inline-link" prose>
        <slot />
    </CtaLink>
    <UiProseA v-else :href="href" :target="target">
        <slot />
    </UiProseA>
</template>

<script setup lang="ts">
import UiProseA from '@nuxt/ui/components/prose/A.vue'
import { ctaDestinationKey } from '../../lib/cta-destinations'

const props = defineProps<{
    href?: string
    target?: string
}>()

const destination = computed(() => ctaDestinationKey(props.href))
</script>
