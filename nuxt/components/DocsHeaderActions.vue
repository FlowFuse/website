<script setup lang="ts">
// Docs search for the site header, where the docs sidebar is not on screen. AppHeader shows
// it below lg, on docs pages only. FlowFuse Expert is the Ask Docs button (DocsAskFab).
const route = useRoute()
const isDocs = computed(() => route.path === '/docs' || route.path.startsWith('/docs/'))

function openSearch () {
    // AlgoliaSearch in the docs sidebar listens for this and opens its search dialog.
    window.dispatchEvent(new CustomEvent('ff-docs-search:open'))
}
</script>

<template>
  <div v-if="isDocs" class="ff-docs-header-actions flex items-center gap-2">
    <button
      type="button"
      class="ff-docs-header-actions__search"
      aria-label="Search the documentation"
      @click="openSearch"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.ff-docs-header-actions__search {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    color: #374151;
    border-radius: 6px;
}

.ff-docs-header-actions__search:hover {
    background: #f3f4f6;
}

.ff-docs-header-actions__search:focus-visible {
    outline: 2px solid #4F46E5;
    outline-offset: 2px;
}
</style>
