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
    /* The row gap matches FfExpertAsk's own: a subgrid with a different gap spreads the
       difference into its rows, and the box would stand 4px taller than the card. */
    .ff-docs-columns {
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        grid-template-rows: auto auto;
        gap: 1rem 1.5rem;
    }

    /* The first block spans both rows and hands them to its own children (subgrid): its
       first child shares the top row with the second column, so the two boxes are the same
       height, and whatever follows it (the Expert box's prompts) sits in the row below. */
    .ff-docs-columns > :deep(:first-child) {
        grid-row: 1 / span 2;
        grid-template-rows: subgrid;
    }

    .ff-docs-columns > :deep(:not(:first-child)) {
        grid-row: 1;
    }
}

.ff-docs-columns > :deep(*) {
    margin-top: 0;
    margin-bottom: 0;
}
</style>
