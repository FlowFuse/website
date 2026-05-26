<script setup>
defineProps({
    items: { type: Array, default: () => [] },
    current: { type: String, default: '' }
})

// Content nav paths have no trailing slash; served routes do. Normalise both.
const norm = (p) => (p || '').replace(/\/+$/, '')

// Humanise a path segment for directory nodes that have no index page.
const labelFor = (item) => {
    if (item.title) return item.title
    const seg = norm(item.path).split('/').pop() || ''
    return seg.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// A node is linkable only if it is a real page (has its own content/title).
// Directory-only nodes (no index page) render as a plain label to avoid
// empty-text links and links to non-existent routes.
const isPage = (item) => item.page !== false && !!item.title
</script>

<template>
  <ul class="space-y-0.5">
    <li v-for="item in items" :key="item.path">
      <NuxtLink
        v-if="isPage(item)"
        :to="item.path + '/'"
        class="block py-0.5"
        :class="norm(item.path) === norm(current) ? 'text-blue-700 font-medium' : 'text-gray-600 hover:text-blue-700'"
      >{{ labelFor(item) }}</NuxtLink>
      <span v-else class="block py-0.5 text-gray-500 font-medium">{{ labelFor(item) }}</span>
      <div v-if="item.children?.length" class="pl-3 border-l border-gray-200 ml-1 mt-0.5">
        <HandbookNavTree :items="item.children" :current="current" />
      </div>
    </li>
  </ul>
</template>
