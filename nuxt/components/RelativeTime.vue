<script setup lang="ts">
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { formatRelative, toIso } from '../lib/relative-time.mjs'

const props = defineProps<{
    value: string
}>()

const iso = computed(() => toIso(props.value))

// Docs pages are prerendered, so a relative label baked in at build time would be stale
// by the time anyone reads it. Leave `now` unset on the server so the exact stamp is what
// gets rendered, which is also what a reader without JS keeps and what makes hydration
// match, then set it on mount to switch every instance over to relative.
const now = ref<Date | null>(null)

onMounted(() => {
    now.value = new Date()
})

// Derived rather than assigned on mount: every /docs page shares this one route
// component, so navigating between pages patches `value` in place instead of remounting.
// An assigned ref would keep showing the previous page's label.
const label = computed(() => {
    if (!now.value) return props.value
    return formatRelative(props.value, now.value) ?? props.value
})
</script>

<template>
  <time v-if="iso" :datetime="iso" :title="value" class="cursor-help">{{ label }}</time>
  <template v-else>{{ value }}</template>
</template>
