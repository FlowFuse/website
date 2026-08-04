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
const preRef = ref(null)
const copied = ref(false)
let renderCount = 0
let copiedTimer = null

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

onBeforeUnmount(() => {
    if (copiedTimer) clearTimeout(copiedTimer)
})

async function copyCode () {
    // props.code is the raw source; the rendered <pre> is the fallback for the
    // rare block that reaches this component without it.
    const text = props.code || preRef.value?.textContent || ''
    if (!text) return

    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text)
        } else {
            // navigator.clipboard is unavailable outside secure contexts
            const field = document.createElement('textarea')
            field.value = text
            field.setAttribute('readonly', '')
            field.style.position = 'absolute'
            field.style.left = '-9999px'
            document.body.appendChild(field)
            field.select()
            document.execCommand('copy')
            document.body.removeChild(field)
        }
    } catch {
        return
    }

    copied.value = true
    if (copiedTimer) clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div v-if="language === 'mermaid'" ref="mermaidRef" class="mermaid-diagram overflow-x-auto py-4" />
  <div v-else class="code-block group relative">
    <!--
      Nuxt UI's own ProsePre ships a copy button, but this component shadows it to
      render mermaid blocks, so the button is reproduced here rather than adopting
      Nuxt UI's Pre and restyling every code block in docs and handbook.
    -->
    <button
      type="button"
      class="absolute right-2 top-2 z-10 rounded border border-slate-500 bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-200 transition hover:border-slate-300 hover:text-white opacity-100 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      :aria-label="copied ? 'Code copied' : 'Copy code'"
      @click="copyCode"
    >
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
    <pre ref="preRef" :class="$props.class"><slot /></pre>
  </div>
</template>

<style>
pre code .line { display: block }

/* Long lines (curl commands, container image refs) were clipped at the content edge
   instead of scrolling, because the shiki classes on <pre> set no overflow behaviour. */
pre {
    overflow-x: auto;
    max-width: 100%;
}

/* Keep code clear of the copy button in the top right corner. */
.code-block pre {
    padding-right: 4.5rem;
}
</style>
