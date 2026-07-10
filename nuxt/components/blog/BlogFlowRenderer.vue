<script setup lang="ts">
// Renders an embedded Node-RED flow diagram, using the same global FlowRenderer
// script 11ty's `renderFlow` shortcode used (built by build:js(:nuxt) into
// public/js/flowrenderer.min.js). The flow JSON arrives base64-encoded from the
// content:file:beforeParse fixup (see utils/blog-nunjucks-fixup.ts) since raw JSON
// in markdown risks being mangled by the markdown parser.
const props = defineProps<{
    flow: string
    height?: string
}>()

const container = ref<HTMLElement | null>(null)

function loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        if ((window as any).FlowRenderer) { resolve(); return }
        const existing = document.querySelector('script[src="/js/flowrenderer.min.js"]') as HTMLScriptElement | null
        if (existing) { existing.addEventListener('load', () => resolve(), { once: true }); return }
        const script = document.createElement('script')
        script.src = '/js/flowrenderer.min.js'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('FlowRenderer script failed to load'))
        document.head.appendChild(script)
    })
}

onMounted(async () => {
    try {
        await loadScript()
        const json = decodeURIComponent(escape(atob(props.flow)))
        const flow = JSON.parse(json)
        // eslint-disable-next-line new-cap
        new (window as any).FlowRenderer().renderFlows(flow, { container: container.value })
    } catch {
        // silently fail if the flow can't be rendered (e.g. script unavailable in dev)
    }
})
</script>

<template>
  <div
    ref="container"
    :style="{ height: `${height || 200}px` }"
    data-grid-lines="true"
    data-zoom="true"
    data-images="true"
    data-link-lines="false"
    data-labels="true"
  />
</template>
