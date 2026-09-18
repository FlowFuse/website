<script setup lang="ts">
// "The problem, and what it costs" band from automotive.vue. The calculator itself and
// the "open the full calculator" link are identical on every page, so they stay fixed
// here rather than becoming per-page data.
defineProps<{ heading: string, description: string }>()
</script>

<template>
  <section class="w-full py-16 px-6">
    <div class="max-w-screen-lg mx-auto">
      <div class="max-w-3xl max-md:mx-auto max-md:text-center">
        <h2 class="text-gray-700 mb-4">{{ heading }}</h2>
        <p class="text-gray-600 m-0">{{ description }}</p>
      </div>
      <div class="mt-10">
        <RoiCalculator compact />
      </div>
      <p class="text-center text-sm text-gray-500 mt-8">Want to tune every assumption and see the research behind it? <a href="/resources/roi-calculator/" class="text-indigo-600 font-semibold hover:underline">Open the full ROI calculator</a>.</p>
    </div>
  </section>
</template>
