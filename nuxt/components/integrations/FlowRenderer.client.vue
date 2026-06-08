<script setup lang="ts">
// Sanitised at build time (see sanitiseFlow in integrations-enrich.ts).
const props = defineProps<{
    flow: string
    index: number
}>()

const container = ref<HTMLDivElement | null>(null)
let cleanedUp = false

async function loadAndRender () {
    if (!container.value || cleanedUp) return
    try {
        // @vite-ignore: treat as runtime URL, not a bundled module — flowrenderer.min.js
        // is copied into public/js/ at build time and isn't in node_modules.
        const flowrendererUrl = '/js/flowrenderer.min.js'
        const mod = await import(/* @vite-ignore */ flowrendererUrl)
        const Renderer = mod.default ?? mod
        const renderer = new Renderer()
        const parsed = JSON.parse(props.flow)
        renderer.renderFlows(parsed, {
            container: container.value,
            direction: 'LR',
            gridLines: true,
            zoom: true,
            labels: true,
            autoZoom: true
        })
    } catch (err) {
        console.error('FlowRenderer failed:', err)
    }
}

onMounted(() => { void loadAndRender() })
onBeforeUnmount(() => { cleanedUp = true })
</script>

<template>
    <div :id="`flow-renderer-${index}`" ref="container" class="flow-renderer-container" style="height: 400px;"></div>
</template>
