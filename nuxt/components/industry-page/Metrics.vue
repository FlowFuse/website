<script setup lang="ts">
// The metrics grid from pages/industries/automotive.vue, plus an optional customer-story
// bridge (heading + description above the grid, link below it, right-aligned). Split out
// of industry-page/Hero.vue so the hero band and this one can change independently.
defineProps<{
    metrics: Array<{ number: string, text: string }>
    metricsBridge?: { heading: string, description: string, linkText?: string, linkHref?: string }
}>()
</script>

<template>
  <div class="w-full px-6">
    <!-- The radial fade only applies when there's a bridge above the metrics — the same
         soft-red look .bg-radial-red gives automotive's own metrics band elsewhere, just
         lighter (from-red-100/15, vs. that class's fixed 0.3 alpha) and built as a plain
         Tailwind arbitrary gradient so the alpha's easy to tune per page if needed. -->
    <div
        class="max-w-md sm:max-w-screen-lg mx-auto mt-16 pb-10"
        :class="{ 'bg-radial-[ellipse_50%_70%_at_center_bottom] from-red-50/50 to-red-100/0': metricsBridge }"
    >
      <div v-if="metricsBridge" class="max-md:text-center mb-8">
        <h2 class="text-gray-700 mb-4 mt-20" v-html="metricsBridge.heading" />
        <p class="text-gray-600">{{ metricsBridge.description }}</p>
      </div>
      <div class="grid sm:grid-cols-3 gap-12 my-4 max-sm:w-full m-auto">
        <div v-for="metric in metrics" :key="metric.number" class="w-full h-full rounded-lg bg-red-50/70 pb-3 px-6 pt-6">
          <h3 class="text-5xl font-semibold text-red-400">{{ metric.number }}</h3>
          <p class="mt-0 font-normal leading-6">{{ metric.text }}</p>
        </div>
      </div>
      <div v-if="metricsBridge?.linkHref" class="text-right mt-8">
        <a :href="metricsBridge.linkHref" class="inline-flex items-center gap-1.5 text-blue-600 hover:underline">
          {{ metricsBridge.linkText }}
          <UIcon name="i-heroicons-arrow-long-right" class="w-4 h-4 shrink-0" />
        </a>
      </div>
    </div>
  </div>
</template>
