<script setup lang="ts">
// Nav and footer icons, drawn from the same SVG files Eleventy renders.
//
// Eleventy's `navoption` shortcode wraps each icon file in an outer <svg> that
// carries the sizing class, leaving the file's own <svg> nested inside. This
// reproduces that exactly, so a given icon key renders identically whichever
// renderer served the page.
const props = withDefaults(defineProps<{ name?: string, solid?: boolean }>(), {
    name: '',
    solid: false,
})

const markup = computed(() => {
    if (!props.name) return ''
    const svg = navIcons[props.name]
    if (!svg && import.meta.dev) {
        console.warn(`[NavIcon] no icon for "${props.name}" - add it to nuxt/utils/navIcons.ts`)
    }
    return svg ?? ''
})
</script>

<template>
    <svg
        v-if="markup"
        class="ff-icon ff-icon-sm"
        :class="{ 'ff-icon--solid': solid }"
        fill="none"
        viewBox="0 0 24 24"
        v-html="markup"
    />
</template>
