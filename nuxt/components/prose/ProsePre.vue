<script setup>
const props = defineProps({
    code: { type: String, default: '' },
    language: { type: String, default: null },
    filename: { type: String, default: null },
    highlights: { type: Array, default: () => [] },
    meta: { type: String, default: null },
    class: { type: String, default: null },
})

const mermaidRef = ref(null)
let renderCount = 0

onMounted(async () => {
    if (props.language !== 'mermaid' || !props.code || !mermaidRef.value) return

    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

    renderCount++
    const uniqueId = `mermaid-${renderCount}-${Math.random().toString(36).slice(2, 7)}`
    try {
        const { svg } = await mermaid.render(uniqueId, props.code)
        if (mermaidRef.value) mermaidRef.value.innerHTML = svg
    } catch {
        if (mermaidRef.value) mermaidRef.value.textContent = props.code
    }
})
</script>

<template>
  <div v-if="language === 'mermaid'" ref="mermaidRef" class="mermaid-diagram overflow-x-auto py-4" />
  <pre v-else :class="$props.class"><slot /></pre>
</template>

<style>
pre code .line { display: block }
</style>
