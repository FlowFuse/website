<script setup>
// Recursive nav renderer for the grouped docs/handbook sidebar (Dimension 1).
// Mirrors NodeRedNavTree.vue: auto-expand the branch containing the current
// route, chevron toggle, consumes { title, url, children } items.
const props = defineProps({
    items: { type: Array, default: () => [] },
    current: { type: String, default: '' },
})

const norm = (p) => (p || '').replace(/\/+$/, '')

function containsCurrent(item) {
    if (norm(item.url) === norm(props.current)) return true
    return (item.children || []).some(containsCurrent)
}

const open = reactive({})
for (const item of props.items) {
    if (item.children?.length && containsCurrent(item)) open[item.url] = true
}
const toggle = (url) => { open[url] = !open[url] }
const isActive = (item) => norm(item.url) === norm(props.current)
</script>

<template>
  <ul class="space-y-0.5">
    <li v-for="item in items" :key="item.url">
      <div v-if="item.children?.length" class="flex items-center justify-between">
        <NuxtLink
          :to="item.url"
          class="block py-0.5"
          :class="isActive(item) ? 'text-blue-700 font-medium' : 'text-gray-600 hover:text-blue-700'"
        >{{ item.title }}</NuxtLink>
        <button
          type="button"
          class="px-1 text-gray-400 hover:text-gray-600"
          :aria-expanded="open[item.url] ? 'true' : 'false'"
          @click="toggle(item.url)"
        >
          <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': open[item.url] }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" /></svg>
        </button>
      </div>
      <NuxtLink
        v-else
        :to="item.url"
        class="block py-0.5"
        :class="isActive(item) ? 'text-blue-700 font-medium' : 'text-gray-600 hover:text-blue-700'"
      >{{ item.title }}</NuxtLink>
      <div v-if="item.children?.length" v-show="open[item.url]" class="pl-3 border-l border-gray-200 ml-1 mt-0.5">
        <HandbookNavSubtree :items="item.children" :current="current" />
      </div>
    </li>
  </ul>
</template>
