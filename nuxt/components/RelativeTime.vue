<script setup lang="ts">
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { formatRelative, toIso } from '../lib/relative-time.mjs'

const props = defineProps<{
    value: string
}>()

const iso = computed(() => toIso(props.value))

// Docs pages are prerendered, so a relative label baked in at build time would be stale
// by the time anyone reads it. Render the exact stamp on the server, which is also what
// a reader without JS keeps, then relabel on mount. Starting the ref at the same value
// the server sent keeps hydration quiet.
const label = ref(props.value)

onMounted(() => {
    label.value = formatRelative(props.value) ?? props.value
})
</script>

<template>
  <time v-if="iso" :datetime="iso" :title="value" class="cursor-help">{{ label }}</time>
  <template v-else>{{ value }}</template>
</template>
