<script setup>
const props = defineProps({
    // Already-sanitised flow JSON string (escaped at build time in the composable).
    flow: { type: String, required: true },
    // Index used for the underlying DOM id, mirroring the Eleventy template.
    index: { type: Number, required: true }
})

const container = ref(null)
let cleanedUp = false

async function loadAndRender () {
    if (!container.value || cleanedUp) return
    try {
        // Dynamic import of the global JS lib bundled into Nuxt's public/js/ by build:js:nuxt.
        // The /* @vite-ignore */ tells Vite to treat this as a runtime URL, not a bundled module.
        const flowrendererUrl = '/js/flowrenderer.min.js'
        const mod = await import(/* @vite-ignore */ flowrendererUrl)
        const Renderer = mod.default ?? mod
        const renderer = new Renderer()
        // The flow string was JSON.stringify'd in the composable; parse it back here.
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
