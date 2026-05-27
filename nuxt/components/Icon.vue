<script setup>
// Renders a legacy 11ty icon by name (src/_includes/components/icons/<name>.svg,
// copied into ./icons by scripts/copy_icons.js). SVGs use currentColor and are
// sized by the wrapping element.
const props = defineProps({ name: { type: String, required: true } })

const icons = import.meta.glob('./icons/*.svg', { query: '?raw', import: 'default', eager: true })

const svg = computed(() => {
    const key = Object.keys(icons).find((k) => k.endsWith(`/${props.name}.svg`))
    return key ? icons[key] : ''
})
</script>

<template>
  <span v-html="svg" />
</template>
