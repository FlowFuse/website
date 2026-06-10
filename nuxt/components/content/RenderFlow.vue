<template>
  <div>
    <div
      ref="container"
      :style="`height: ${height}px`"
      data-grid-lines="true"
      data-zoom="true"
      data-images="true"
      data-link-lines="false"
      data-labels="true"
    />
    <div ref="slotContent" class="hidden"><slot /></div>
  </div>
</template>

<script setup>
defineProps({
  height: { type: Number, default: 200 }
})

const container = ref(null)
const slotContent = ref(null)

onMounted(async () => {
  const codeEl = slotContent.value?.querySelector('code')
  if (!codeEl || !container.value) return
  const raw = codeEl.textContent
  const src = '/js/flowrenderer.min.js'
  const { default: FlowRenderer } = await import(/* @vite-ignore */ src)
  new FlowRenderer().renderFlows(JSON.parse(raw), { container: container.value })
})
</script>
