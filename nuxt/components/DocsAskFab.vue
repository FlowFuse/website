<script setup lang="ts">
// "Ask Docs": the one entry point to FlowFuse Expert on every docs page, floating in the
// bottom-right corner at every screen width. It steps aside while a page's own question
// box (FfExpertAsk) is on screen, since that box opens the same conversation.
//
// It wears FlowFuse Expert's colours, as the Expert button in the FlowFuse app does: the
// FlowFuse mark, and a slowly turning brand-red to indigo border. Its box matches the
// header's Book a demo button (40px tall, 16px text, 8px 16px padding), so the two calls
// to action read as one family; the pill shape marks this one as floating.
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
      <img :src="'/images/ff-minimal-red.svg'" alt="" class="ff-ask-fab__mark">
      <span>Ask Docs</span>
    </button>
  </Transition>
</template>

<style scoped>
@property --ff-ask-fab-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 135deg;
}

.ff-ask-fab {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 2.5rem;
    padding: 8px 18px 8px 14px;
    border: 1.5px solid transparent;
    border-radius: 9999px;
    background:
        linear-gradient(#fff, #fff) padding-box,
        conic-gradient(from var(--ff-ask-fab-angle), #DA3D0B, #9333EA, #4F46E5, #9333EA, #DA3D0B) border-box;
    color: #111827;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    box-shadow: 0 4px 8px rgb(17 24 39 / 0.08), 0 12px 28px -2px rgb(79 70 229 / 0.22);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

@media (prefers-reduced-motion: no-preference) {
    .ff-ask-fab {
        animation: ff-ask-fab-swirl 9s linear infinite;
    }
}

.ff-ask-fab:hover {
    background:
        linear-gradient(#f5f5ff, #f5f5ff) padding-box,
        conic-gradient(from var(--ff-ask-fab-angle), #DA3D0B, #9333EA, #4F46E5, #9333EA, #DA3D0B) border-box;
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgb(17 24 39 / 0.1), 0 16px 32px -4px rgb(79 70 229 / 0.3);
}

.ff-ask-fab:focus-visible {
    outline: 2px solid #4F46E5;
    outline-offset: 3px;
}

.ff-ask-fab__mark {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
}

@media (max-width: 639px) {
    .ff-ask-fab {
        right: 1rem;
        bottom: 1rem;
    }
}

@keyframes ff-ask-fab-swirl {
    from { --ff-ask-fab-angle: 135deg; }
    to { --ff-ask-fab-angle: 495deg; }
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
