<script setup lang="ts">
// "05 With / without FlowFuse" from layouts/use-case.njk.
defineProps<{
    block: {
        without?: Array<{ title: string, detail: string }>
        with?: Array<{ title: string, detail: string }>
    }
}>()
</script>

<template>
  <div id="with-without" class="w-full py-16 sm:py-24 px-6 comparison-section-bg scroll-mt-16">
    <div class="max-w-screen-lg mx-auto">
      <p class="uppercase text-xs font-semibold text-indigo-400 mb-2">05 · With / without FlowFuse</p>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 class="text-gray-500 m-0">Without FlowFuse</h3>
          <div class="mt-6 flex flex-col gap-4">
            <div v-for="row in block.without" :key="row.title" class="bg-white border border-gray-200 rounded-lg p-5 flex items-start gap-4">
              <UIcon name="i-heroicons-x-mark" class="flex-shrink-0 w-6 h-6 text-red-400 mt-0.5" />
              <div>
                <h5 class="m-0 text-gray-800">{{ row.title }}</h5>
                <p class="m-0 mt-1 text-gray-600 text-sm">{{ row.detail }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-indigo-600 m-0">With FlowFuse</h3>
          <div class="mt-6 flex flex-col gap-4">
            <div v-for="row in block.with" :key="row.title" class="bg-white border border-indigo-100 rounded-lg p-5 flex items-start gap-4">
              <UIcon name="i-heroicons-check-circle" class="flex-shrink-0 w-6 h-6 text-indigo-500 mt-0.5" />
              <div>
                <h5 class="m-0 text-gray-800">{{ row.title }}</h5>
                <p class="m-0 mt-1 text-gray-600 text-sm">{{ row.detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
