<script setup lang="ts">
// FlowFuse Expert, embedded in a page: a question box that opens the Expert conversation.
//
// The conversation itself is src/js/ai-expert-modal.js, the script the old /ai/ page used,
// driving the modal that DocsExpertHost renders in the layout. The script listens for the
// #tell-me-how-btn button and morphs this card (the .textarea-wrapper holding the
// data-ff-expert-input textarea) into the modal. Keep those hooks as they are.
//
// Usage from markdown:
//   ::ff-expert-ask
//   ::
const props = withDefaults(defineProps<{
    placeholder?: string
    button?: string
    position?: string
}>(), {
    placeholder: 'Ask a question about FlowFuse or Node-RED',
    button: 'Ask Docs',
    position: 'docs-home',
})

const root = ref<HTMLElement>()
const inlineVisible = useExpertInlineVisible()
let observer: IntersectionObserver | undefined

onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
        inlineVisible.value = entry.isIntersecting
    })
    if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
    observer?.disconnect()
    inlineVisible.value = false
})

function track () {
    const capture = (window as any).capture
    if (typeof capture === 'function') capture('cta-ai-get-started', { position: props.position })
}
</script>

<template>
  <div ref="root" class="ff-expert-ask not-prose mt-6 max-w-4xl">
    <div class="ai-chat-box ff-expert-ask__box">
      <div class="textarea-wrapper ff-expert-ask__card relative rounded-lg overflow-hidden">
        <div class="ff-expert-ask__brand">
          <DocsExpertBrand uid="expert-ask" />
        </div>
        <div class="ff-expert-ask__input relative p-4 pb-12">
          <textarea
            data-ff-expert-input
            :placeholder="placeholder"
            class="w-full bg-transparent border-0 focus:outline-none text-gray-600 placeholder-gray-400 resize-none"
            aria-label="Ask FlowFuse Expert"
          />
          <div class="absolute bottom-3 left-4 text-[10px] font-light text-gray-500 pr-36 line-clamp-2">
            AI uses FlowFuse's knowledge base
          </div>
          <button
            id="tell-me-how-btn"
            type="button"
            class="absolute bottom-3 right-4 ff-btn ff-btn--highlight whitespace-nowrap px-6 py-3"
            @click="track"
          >
            {{ button }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The box fills whatever height it is given, so beside a taller card (DocsColumns) the two
   stand the same height. */
.ff-expert-ask {
    display: flex;
}

.ff-expert-ask__box {
    display: flex;
}

.ff-expert-ask__card {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.ff-expert-ask__input {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 8rem;
}

.ff-expert-ask__input textarea {
    flex: 1;
}

/* Same padding as the modal header, so the brand flies between matching spots. */
.ff-expert-ask__brand {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid transparent;
    background:
        linear-gradient(#fff, #fff) padding-box,
        linear-gradient(90deg, #f87171, #f472b6, #a78bfa) border-box;
}
</style>
