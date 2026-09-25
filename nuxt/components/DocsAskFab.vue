<script setup lang="ts">
// "Ask Docs": the one entry point to FlowFuse Expert on every docs page, floating in the
// bottom-right corner at every screen width. It steps aside while a page's own question
// box (FfExpertAsk) is on screen, since that box opens the same conversation.
const inlineVisible = useExpertInlineVisible()

function open () {
    const capture = (window as any).capture
    if (typeof capture === 'function') capture('cta-ai-get-started', { position: 'docs-fab' })
    openDocsExpert()
}
</script>

<template>
  <Transition name="ff-ask-fab">
    <button
      v-show="!inlineVisible"
      type="button"
      class="ff-ask-fab"
      title="Ask FlowFuse Expert about the docs"
      @click="open"
    >
      <span>Ask Docs</span>
      <UIcon name="i-lucide-book-open" class="ff-ask-fab__icon" aria-hidden="true" />
    </button>
  </Transition>
</template>

<style scoped>
.ff-ask-fab {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 2.5rem;
    padding: 0 1rem 0 1.125rem;
    border-radius: 9999px;
    background: #111827;
    color: #fff;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    box-shadow: 0 4px 8px rgb(17 24 39 / 0.08), 0 12px 28px -2px rgb(17 24 39 / 0.18);
    transition: background-color 0.15s ease, transform 0.15s ease;
}

.ff-ask-fab:hover {
    background: #1f2937;
    transform: translateY(-1px);
}

.ff-ask-fab:focus-visible {
    outline: 2px solid #4F46E5;
    outline-offset: 3px;
}

.ff-ask-fab__icon {
    width: 1.125rem;
    height: 1.125rem;
}

@media (max-width: 639px) {
    .ff-ask-fab {
        right: 1rem;
        bottom: 1rem;
    }
}

.ff-ask-fab-enter-active,
.ff-ask-fab-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.ff-ask-fab-enter-from,
.ff-ask-fab-leave-to {
    opacity: 0;
    transform: translateY(0.5rem);
}
</style>
