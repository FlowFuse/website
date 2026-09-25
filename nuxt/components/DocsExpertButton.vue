<script setup lang="ts">
// Opens the FlowFuse Expert conversation from anywhere on a docs page.
//
// Both variants follow the Expert button in the FlowFuse app header: the FlowFuse mark and
// a label inside a slowly turning gradient border. `toc` is the full-width "Ask Expert"
// under the table of contents; `compact` is the smaller "Expert" for the site header on
// narrow screens.
const props = withDefaults(defineProps<{
    variant?: 'toc' | 'compact'
    position?: string
    /** Compact only: the FlowFuse mark alone, for a header that is short of room. */
    iconOnly?: boolean
}>(), {
    variant: 'toc',
    position: 'docs-toc',
    iconOnly: false,
})

function open () {
    const capture = (window as any).capture
    if (typeof capture === 'function') capture('cta-ai-get-started', { position: props.position })
    openDocsExpert()
}
</script>

<template>
  <button
    type="button"
    class="ff-expert-btn"
    :class="[`ff-expert-btn--${variant}`, { 'ff-expert-btn--icon': iconOnly }]"
    aria-label="Ask FlowFuse Expert"
    @click="open"
  >
    <img :src="'/images/ff-minimal-red.svg'" alt="" class="ff-expert-btn__mark">
    <span class="ff-expert-btn__label">{{ variant === 'toc' ? 'Ask Expert' : 'Expert' }}</span>
  </button>
</template>

<style scoped>
@property --ff-expert-border-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 135deg;
}

.ff-expert-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-weight: 700;
    color: #1f2937;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 6px;
    background:
        linear-gradient(#fff, #fff) padding-box,
        conic-gradient(from var(--ff-expert-border-angle), #BC3838, #9333EA, #4F46E5, #9333EA, #BC3838) border-box;
}

@media (prefers-reduced-motion: no-preference) {
    .ff-expert-btn {
        animation: ff-expert-swirl 9s linear infinite;
    }
}

.ff-expert-btn:hover {
    background:
        linear-gradient(#f5f5ff, #f5f5ff) padding-box,
        conic-gradient(from var(--ff-expert-border-angle), #BC3838, #9333EA, #4F46E5, #9333EA, #BC3838) border-box;
}

.ff-expert-btn:focus-visible {
    outline: 2px solid #4F46E5;
    outline-offset: 2px;
}

.ff-expert-btn--compact {
    padding: 6px 9px;
    font-size: 0.85rem;
    line-height: 20px;
}

.ff-expert-btn__mark {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: -0.25rem;
    flex-shrink: 0;
}

/* On a phone the header also carries search, Book a demo and the menu, so the pill shows
   the FlowFuse mark only. */
@media (max-width: 599px) {
    .ff-expert-btn--compact .ff-expert-btn__label {
        display: none;
    }

    .ff-expert-btn--compact .ff-expert-btn__mark {
        margin-left: 0;
    }
}

.ff-expert-btn--icon .ff-expert-btn__label {
    display: none;
}

.ff-expert-btn--icon .ff-expert-btn__mark {
    margin-left: 0;
}

.ff-expert-btn--toc {
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    font-size: 0.95rem;
    line-height: 1.25rem;
}

.ff-expert-btn--toc .ff-expert-btn__mark {
    margin-left: 0;
}

@keyframes ff-expert-swirl {
    from { --ff-expert-border-angle: 135deg; }
    to { --ff-expert-border-angle: 495deg; }
}
</style>
