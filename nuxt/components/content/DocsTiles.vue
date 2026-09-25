<script setup lang="ts">
// A markdown list of links shown as a grid of tiles, each one clickable across its whole
// area. Start a link's text with an icon to give its tile one:
//
//   ::docs-tiles{cols="3"}
//   - [:icon{name="i-lucide-history"} Snapshots](/docs/user/snapshots/)
//   - [:icon{name="i-lucide-git-branch"} DevOps pipelines](/docs/user/devops-pipelines/)
//   ::
//
// The links stay ordinary markdown links, so the flowfuse docs link check still covers them.
withDefaults(defineProps<{
    cols?: string | number
}>(), {
    cols: 3,
})
</script>

<template>
  <div class="ff-docs-tiles not-prose" :class="`ff-docs-tiles--cols-${cols}`">
    <slot />
  </div>
</template>

<style scoped>
.ff-docs-tiles :deep(ul) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

@media (min-width: 640px) {
    .ff-docs-tiles :deep(ul) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) {
    .ff-docs-tiles--cols-3 :deep(ul) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .ff-docs-tiles--cols-4 :deep(ul) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

.ff-docs-tiles :deep(li) {
    position: relative;
    margin: 0;
    padding: 0;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    background: #fff;
    transition: border-color 0.15s ease, background-color 0.15s ease;
}

.ff-docs-tiles :deep(li:hover) {
    border-color: #a5b4fc;
    background: #f5f7ff;
}

.ff-docs-tiles :deep(li:has(a:focus-visible)) {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
}

.ff-docs-tiles :deep(li a) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    color: #1f2937;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.35;
    border: 0;
    text-decoration: none;
}

.ff-docs-tiles :deep(li a:focus-visible) {
    outline: none;
}

/* The link covers its whole tile. */
.ff-docs-tiles :deep(li a::after) {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
}

.ff-docs-tiles :deep(li a .iconify) {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
    color: #6b7280;
}
</style>
