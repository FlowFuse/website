<script setup lang="ts">
// The opening of a docs landing page: a heading and a line from the default slot, the docs
// search, a row of buttons from the `actions` slot (a markdown list of links) and, beside
// them on wide screens, whatever the `aside` slot holds (the docs home puts its quick-start
// tabs there).
//
//   ::docs-hero{eyebrow="FlowFuse Docs"}
//   # Start building with FlowFuse
//   One line.
//
//   #actions
//   - [:icon{name="i-lucide-play"} A tutorial](/docs/tutorials/...)
//
//   #aside
//   ...
//   ::
//
// The search here is the page's only one with the Cmd+K shortcut: a landing page has no
// sidebar, whose search would otherwise take it.
defineProps<{
    eyebrow?: string
}>()
</script>

<template>
  <section class="ff-docs-hero not-prose">
    <div class="ff-docs-hero__main">
      <p v-if="eyebrow" class="ff-docs-hero__eyebrow">{{ eyebrow }}</p>
      <div class="ff-docs-hero__intro">
        <slot />
      </div>
      <AlgoliaSearch
        class="ff-docs-hero__search"
        index-filter="category:docs"
        placeholder="Search the docs"
        source-id="docs"
        size="lg"
        detached
        shortcut
      />
      <div v-if="$slots.actions" class="ff-docs-hero__actions">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="$slots.aside" class="ff-docs-hero__aside">
      <slot name="aside" />
    </div>
  </section>
</template>

<style scoped>
.ff-docs-hero {
    display: grid;
    gap: 2.5rem;
    margin-top: 2.5rem;
}

/* Top-aligned, not centred: the aside can change height (the ways-in list opens and closes),
   and a centred heading would move with it. */
@media (min-width: 1024px) {
    .ff-docs-hero {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 4rem;
        align-items: start;
    }
}

.ff-docs-hero__eyebrow {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    color: #6b7280;
}

.ff-docs-hero__intro :deep(h1) {
    margin: 0;
    font-size: 2.5rem;
    line-height: 1.1;
    font-weight: 400;
    color: #111827;
    letter-spacing: -0.01em;
}

@media (min-width: 640px) {
    .ff-docs-hero__intro :deep(h1) {
        font-size: 3.25rem;
    }
}

/* The heading's own anchor link would underline it on hover; the title is not a link. */
.ff-docs-hero__intro :deep(h1 a) {
    color: inherit;
    border: 0;
    pointer-events: none;
}

.ff-docs-hero__intro :deep(p) {
    margin: 1.5rem 0 0;
    max-width: 32rem;
    font-size: 1.125rem;
    line-height: 1.6;
    color: #4b5563;
}

.ff-docs-hero__search {
    margin-top: 2rem;
    max-width: 30rem;
}

.ff-docs-hero__actions {
    margin-top: 1.25rem;
}

.ff-docs-hero__actions :deep(ul) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.ff-docs-hero__actions :deep(li) {
    margin: 0;
    padding: 0;
}

.ff-docs-hero__actions :deep(a) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 2.5rem;
    padding: 0 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #fff;
    color: #1f2937;
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.15s ease, background-color 0.15s ease;
}

.ff-docs-hero__actions :deep(a:hover) {
    border-color: #a5b4fc;
    background: #f5f7ff;
}

.ff-docs-hero__actions :deep(a:focus-visible) {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
}

.ff-docs-hero__actions :deep(a .iconify) {
    width: 1.125rem;
    height: 1.125rem;
    color: #4b5563;
}

.ff-docs-hero__aside {
    min-width: 0;
    padding: 0.5rem 1.5rem 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 1px 2px rgb(17 24 39 / 0.04), 0 8px 24px -8px rgb(17 24 39 / 0.08);
}

.ff-docs-hero__aside > :deep(:first-child) {
    margin-top: 0;
}

/* Tabs as wide as their labels, never cut short: Nuxt UI's tabs share the row out equally
   and truncate, which in a phone-width card leaves "Devic..." */
.ff-docs-hero__aside :deep([role="tab"]) {
    flex: 0 0 auto;
}

.ff-docs-hero__aside :deep([role="tab"] span) {
    overflow: visible;
    text-overflow: clip;
}

@media (max-width: 639px) {
    .ff-docs-hero__aside {
        padding: 0.25rem 1rem 1.25rem;
    }

    .ff-docs-hero__aside :deep([role="tab"]) {
        padding-inline: 0.5rem;
    }
}

/* Quick-start steps: a heading and a line each, close together. Nuxt UI wraps each step
   heading's text in an anchor link, which the site's link colour would turn blue. */
.ff-docs-hero__aside :deep(h4) {
    margin: 1.5rem 0 0.25rem;
    font-size: 1rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: #111827;
}

.ff-docs-hero__aside :deep(h4:first-child) {
    margin-top: 0.5rem;
}

.ff-docs-hero__aside :deep(h4 > a) {
    color: inherit;
    text-decoration: none;
}

.ff-docs-hero__aside :deep(p) {
    margin: 0.25rem 0 0.5rem;
    font-size: 0.9375rem;
    line-height: 1.55;
    color: #4b5563;
}

.ff-docs-hero__aside :deep(.ff-command) {
    margin: 0.75rem 0;
}
</style>
