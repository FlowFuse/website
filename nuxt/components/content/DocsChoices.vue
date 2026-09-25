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
defineProps<{
    title?: string
}>()

provide('ff-docs-choices-name', useId())
</script>

<template>
  <div class="ff-docs-choices not-prose">
    <p v-if="title" class="ff-docs-choices__title">{{ title }}</p>
    <div class="ff-docs-choices__list">
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
}
</style>
