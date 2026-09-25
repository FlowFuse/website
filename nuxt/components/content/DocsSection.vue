<script setup lang="ts">
// One section of a docs landing page: a small eyebrow, a heading, a line saying what the
// section is for (the first paragraph of the slot), then its cards or tiles. A contents
// page reads as an overview this way rather than as a bare list of links.
//
//   ::docs-section{eyebrow="Platform" title="Choose how you run FlowFuse" cols="2"}
//   One line.
//
//   :::card-group
//   ...
//   :::
//   ::
//
// `cols` sets how many cards a card-group in the section shows side by side on wide
// screens (2 by default). Links listed inside a card read as plain rows, not bullets.
const props = withDefaults(defineProps<{
    title: string
    eyebrow?: string
    id?: string
    cols?: string | number
}>(), {
    cols: 2,
})

const anchor = computed(() => props.id || props.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
</script>

<template>
  <section class="ff-docs-section not-prose">
    <p v-if="eyebrow" class="ff-docs-section__eyebrow">{{ eyebrow }}</p>
    <h2 :id="anchor" class="ff-docs-section__title">{{ title }}</h2>
    <div class="ff-docs-section__body" :class="`ff-docs-section__body--cols-${cols}`">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.ff-docs-section {
    margin-top: 5.5rem;
}

.ff-docs-section__eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
}

.ff-docs-section__title {
    margin: 0;
    font-size: 1.875rem;
    line-height: 1.2;
    font-weight: 400;
    color: #111827;
    scroll-margin-top: calc(var(--ff-header-height, 56px) + 1.5rem);
}

.ff-docs-section__body > :deep(p:first-child) {
    margin: 0.625rem 0 2rem;
    max-width: 42rem;
    font-size: 1.0625rem;
    line-height: 1.6;
    color: #4b5563;
}

.ff-docs-section__body > :deep(.grid) {
    margin: 0;
    gap: 1rem;
}

/* Without a lead line the cards would sit right under the heading. */
.ff-docs-section__body > :deep(.grid:first-child) {
    margin-top: 2rem;
}

/* Cards hold a line or two, not an article: tighter than Nuxt UI's default card. */
.ff-docs-section__body > :deep(.grid > div) {
    padding: 1.25rem;
}

.ff-docs-section__body > :deep(.grid > div p) {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.5;
}

/* The numbered stages of a ::steps journey. Nuxt UI wraps each step heading's text in an
   anchor link, which the site's link colour would turn blue. */
.ff-docs-section__body :deep(h3) {
    margin: 2.75rem 0 0.25rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: #111827;
}

.ff-docs-section__body :deep(h3:first-child) {
    margin-top: 0;
}

.ff-docs-section__body :deep(h3 > a) {
    color: inherit;
    text-decoration: none;
}

.ff-docs-section__body :deep(h3 + p) {
    margin: 0.25rem 0 1rem;
    color: #4b5563;
}

@media (min-width: 1024px) {
    .ff-docs-section__body--cols-3 > :deep(.grid) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .ff-docs-section__body--cols-4 > :deep(.grid) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

/* A card's list of links: plain rows with their icons, the way Claude's platform cards
   list Quickstart / API reference / SDKs. */
.ff-docs-section__body :deep(.grid ul) {
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
}

.ff-docs-section__body :deep(.grid li) {
    margin: 0;
    padding: 0.3rem 0;
}

.ff-docs-section__body :deep(.grid li a) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #1f2937;
    font-weight: 500;
    border: 0;
    text-decoration: none;
}

.ff-docs-section__body :deep(.grid li a:hover) {
    color: #4f46e5;
}

.ff-docs-section__body :deep(.grid li a .iconify) {
    width: 1rem;
    height: 1rem;
    color: #6b7280;
}

/* Anything that follows the card-group, such as a row of tiles, keeps its distance. */
.ff-docs-section__body > :deep(.grid + *) {
    margin-top: 1rem;
}
</style>
