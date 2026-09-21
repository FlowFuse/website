<script setup lang="ts">
// "Key Outcomes" from layouts/industry.njk.
defineProps<{
    outcomes: {
        title: string
        subtitle?: string
        items?: Array<{ svgPath?: string, title: string, description: string }>
    }
}>()
</script>

<template>
  <div class="w-full py-16 sm:py-24 px-6">
    <div class="max-w-screen-lg mx-auto">
      <div class="flex flex-col md:flex-row gap-12">
        <h2 class="md:w-1/4 max-md:text-center">
          <span class="text-indigo-600">{{ outcomes.title }}</span> {{ outcomes.subtitle }}
        </h2>
        <div class="md:w-3/4 flex flex-col gap-4">
          <div v-for="item in outcomes.items" :key="item.title" class="bg-indigo-50 border border-indigo-200 rounded-lg p-5 flex items-center gap-6">
            <div class="flex-shrink-0 w-8 h-8 text-indigo-500 mt-0.5">
              <NavIcon :name="item.svgPath" />
            </div>
            <p class="m-0 text-xl font-light">
              <strong>{{ item.title }}</strong> {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
