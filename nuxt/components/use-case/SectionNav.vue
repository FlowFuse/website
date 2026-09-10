<script setup lang="ts">
// The sticky in-page nav from layouts/use-case.njk. The .njk built its item list by
// testing each block for existence in turn; the renderer passes the resolved list here.
defineProps<{ items: Array<{ id: string, label: string }> }>()

function ordinal(index: number) {
    return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <nav v-if="items.length" class="sticky top-0 z-30 w-full bg-white/90 backdrop-blur border-y border-gray-100">
    <div class="max-w-screen-lg mx-auto px-6">
      <ul class="flex gap-1 sm:gap-2 overflow-x-auto list-none m-0 p-0 py-2 text-sm">
        <li v-for="(item, i) in items" :key="item.id" class="flex-shrink-0">
          <a :href="`#${item.id}`" class="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            <span class="font-semibold text-indigo-400">{{ ordinal(i) }}</span>
            <span class="whitespace-nowrap">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
