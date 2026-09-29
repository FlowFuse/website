<script setup lang="ts">
// "04 Why off-the-shelf doesn't work" from layouts/use-case.njk.
defineProps<{
    block: {
        heading: string
        intro?: string
        traps?: Array<{ label: string, title: string, detail: string }>
    }
}>()
</script>

<template>
  <div id="competition" class="w-full py-16 sm:py-24 px-6 bg-white scroll-mt-16">
    <div class="max-w-screen-lg mx-auto">
      <p class="uppercase text-xs font-semibold text-indigo-400 mb-2">04 · Why off-the-shelf doesn't work</p>
      <h2 class="max-md:text-center">{{ block.heading }}</h2>
      <p v-if="block.intro" class="mt-4 max-w-3xl text-gray-600">{{ block.intro }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div v-for="trap in block.traps" :key="trap.title" class="rounded-xl bg-gray-50 border border-gray-200 p-6 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-x-circle" class="w-6 h-6 text-red-400" />
            <span class="text-red-500 text-xs font-semibold uppercase tracking-widest">{{ trap.label }}</span>
          </div>
          <h4 class="m-0 text-gray-800">{{ trap.title }}</h4>
          <p class="m-0 text-gray-600 text-sm">{{ trap.detail }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
