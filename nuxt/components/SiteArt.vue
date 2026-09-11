<script setup lang="ts">
// Inlines one of the raw-included SVGs from utils/siteArt.ts. `display: contents` keeps
// this wrapper out of the layout, so the SVG sits in the caller's box exactly as the
// {% include %} placed it.
const props = defineProps<{ name?: string }>()

const markup = computed(() => {
    if (!props.name) return ''
    const svg = siteArt[props.name]
    if (!svg && import.meta.dev) {
        console.warn(`[SiteArt] no art for "${props.name}" - add it to nuxt/utils/siteArt.ts`)
    }
    return svg ?? ''
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-if="markup" class="contents" v-html="markup" />
</template>
