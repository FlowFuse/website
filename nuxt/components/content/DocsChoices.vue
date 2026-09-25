<script setup lang="ts">
// A short list of ways in, one open at a time: each ::docs-choice explains one option in a
// sentence or two and links onward. It explains and routes rather than walking through
// setup, because the pages it links to (the Device Agent install, the AI agent picker)
// already do that better.
//
//   ::docs-choices{title="Where do you want to start?"}
//   :::docs-choice{label="FlowFuse Cloud" icon="i-lucide-cloud" open}
//   What it is, in a line or two.
//
//   - [The first thing to do](https://...)
//   - [The guide](/docs/...)
//   :::
//   ::
//
// Each choice is a native <details>; sharing one name makes the browser keep a single one
// open, with no script involved.
//
// The list keeps the height of its tallest open option, whichever is open, so opening
// another option never moves what sits below or beside it. That height is measured once
// mounted and again when the width changes: every option is opened in turn with the
// transition off, inside one synchronous pass, so nothing is painted in between.
defineProps<{
    title?: string
}>()

provide('ff-docs-choices-name', useId())

const list = ref<HTMLElement>()
let resizeObserver: ResizeObserver | undefined
let lastWidth = 0

function reserveHeight () {
    const el = list.value
    if (!el) return
    const items = Array.from(el.querySelectorAll<HTMLDetailsElement>(':scope > .ff-docs-choice'))
    if (!items.length) return

    const wasOpen = items.find(item => item.open)
    el.classList.add('ff-docs-choices__list--measuring')
    el.style.minHeight = ''

    let tallest = 0
    for (const item of items) {
        item.open = true
        tallest = Math.max(tallest, el.offsetHeight)
    }
    for (const item of items) item.open = item === wasOpen

    el.style.minHeight = `${tallest}px`
    void el.offsetHeight // settle layout before transitions come back
    el.classList.remove('ff-docs-choices__list--measuring')
}

onMounted(() => {
    reserveHeight()
    resizeObserver = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width)
        if (width === lastWidth) return
        lastWidth = width
        reserveHeight()
    })
    if (list.value) resizeObserver.observe(list.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div class="ff-docs-choices not-prose">
    <p v-if="title" class="ff-docs-choices__title">{{ title }}</p>
    <div ref="list" class="ff-docs-choices__list">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ff-docs-choices__title {
    margin: 0 0 0.75rem;
    font-size: 1rem;
    font-weight: 500;
    color: #111827;
}

.ff-docs-choices__list {
    border-top: 1px solid #e5e7eb;
    /* Lets an option's content animate to its natural height (see DocsChoice). */
    interpolate-size: allow-keywords;
}

/* While measuring, options open and close instantly. */
.ff-docs-choices__list--measuring :deep(.ff-docs-choice::details-content),
.ff-docs-choices__list--measuring :deep(.ff-docs-choice__chevron) {
    transition: none !important;
}
</style>
