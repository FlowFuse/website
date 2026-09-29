<script setup lang="ts">
// "02 Outcome first" from layouts/use-case.njk.
defineProps<{
    block: {
        heading: string
        intro?: string
        dimensions?: Array<{ label: string, title: string, detail: string }>
    }
}>()
</script>

<template>
  <div id="outcome-first" class="w-full py-16 sm:py-24 px-6 bg-gray-50 border-y border-gray-100 scroll-mt-16">
    <div class="max-w-screen-lg mx-auto">
      <p class="uppercase text-xs font-semibold text-indigo-400 mb-2">02 · Outcome first</p>
      <h2 class="max-md:text-center">{{ block.heading }}</h2>
      <p v-if="block.intro" class="mt-4 max-w-3xl text-gray-600">{{ block.intro }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div v-for="dim in block.dimensions" :key="dim.title" class="rounded-xl bg-white border border-gray-200 p-6 flex flex-col gap-2">
          <span class="text-indigo-500 text-xs font-semibold uppercase tracking-widest">{{ dim.label }}</span>
          <h4 class="m-0 text-gray-800">{{ dim.title }}</h4>
          <p class="m-0 text-gray-600 text-sm">{{ dim.detail }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
