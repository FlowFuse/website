<script setup lang="ts">
// Nav and footer icons, drawn from the SVG files in nuxt/assets/nav-icons/.
//
// Each icon file is wrapped in an outer <svg> that carries the sizing class. Most files
// are complete SVGs and end up nested inside it; a few are bare <path> fragments that
// rely on the outer viewBox. That is the markup Eleventy's `navoption` shortcode
// produced, kept so the icons render as they always have.
const props = withDefaults(defineProps<{ name?: string, solid?: boolean, size?: 'sm' | 'lg' }>(), {
    name: '',
    solid: false,
    // `navoption` (nav and footer) wraps icons at ff-icon-sm; `ffIconLg`, which page
    // content used, is the same wrapper at ff-icon-lg. One prop covers both shortcodes.
    size: 'sm',
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
        class="ff-icon"
        :class="[`ff-icon-${size}`, { 'ff-icon--solid': solid }]"
        fill="none"
        viewBox="0 0 24 24"
        v-html="markup"
    />
</template>
