<script setup lang="ts">
// Two blocks side by side on wide screens, the first twice as wide as the second, stacked
// on narrow ones. The docs home uses it to put the Expert question box next to the card
// that leads to human support, so the section spans the page.
//
//   ::docs-columns
//   :::ff-expert-ask
//   :::
//
//   :::card{title="..." to="..."}
//   ...
//   :::
//   ::
</script>

<template>
  <div class="ff-docs-columns not-prose">
    <slot />
  </div>
</template>

<style scoped>
.ff-docs-columns {
    display: grid;
    gap: 1.5rem;
}

@media (min-width: 1024px) {
    .ff-docs-columns {
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        align-items: start;
    }
}

.ff-docs-columns > :deep(*) {
    margin-top: 0;
    margin-bottom: 0;
}
</style>
