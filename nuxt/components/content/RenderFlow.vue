<script setup>
// MDC component reproducing the 11ty `renderFlow` paired shortcode: renders a
// Node-RED flow client-side via the bundled @flowfuse/flow-renderer
// (/js/flowrenderer.min.js). The flow JSON is passed base64-encoded (UTF-8) to
// avoid markdown/MDC escaping issues with the raw JSON.
const props = defineProps({
    flow: { type: String, default: '' },
    height: { type: [String, Number], default: 200 },
})
const el = ref(null)
const px = computed(() => (typeof props.height === 'number' ? props.height : parseInt(props.height) || 200))

// Load /js/flowrenderer.min.js once via a runtime module script (bypassing the
// bundler) so it assigns window.FlowRenderer, exactly as the legacy 11ty site does.
function loadRenderer() {
    return new Promise((resolve, reject) => {
        if (window.FlowRenderer) return resolve(window.FlowRenderer)
        if (!document.querySelector('script[data-flowrenderer]')) {
            const s = document.createElement('script')
            s.type = 'module'
            s.dataset.flowrenderer = '1'
            s.textContent = "import F from '/js/flowrenderer.min.js'; window.FlowRenderer = window.FlowRenderer || F;"
            document.head.appendChild(s)
        }
        let tries = 0
        const iv = setInterval(() => {
            if (window.FlowRenderer) { clearInterval(iv); resolve(window.FlowRenderer) }
            else if (++tries > 120) { clearInterval(iv); reject(new Error('flowrenderer load timeout')) }
        }, 50)
    })
}

onMounted(async () => {
    if (!props.flow || !el.value) return
    try {
        const FlowRenderer = await loadRenderer()
        const bytes = Uint8Array.from(atob(props.flow), (c) => c.charCodeAt(0))
        const json = JSON.parse(new TextDecoder().decode(bytes))
        new FlowRenderer().renderFlows(json, { container: el.value, direction: 'LR' })
    } catch (e) {
        console.error('RenderFlow failed', e)
    }
})
</script>

<template>
  <div
    ref="el"
    :style="`height:${px}px`"
    data-grid-lines="true"
    data-zoom="true"
    data-images="true"
    data-link-lines="false"
    data-labels="true"
  />
</template>
