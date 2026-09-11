<script setup lang="ts">
// components/use-case-chips.njk. The slug -> label map mirrors the Use Cases Asana
// project fields, which are its source of truth.
defineProps<{ industries?: string[] }>()

const INDUSTRY_LABELS: Record<string, string> = {
    'automotive': 'Automotive',
    'food-beverage': 'Food & Beverage',
    'life-sciences': 'Life Sciences',
    'aviation-aerospace': 'Aviation & Aerospace',
    'aerospace-components': 'Aerospace Components',
    'renewables': 'Renewables',
    'semiconductors': 'Semiconductors',
    'electronics-appliances': 'Electronics & Appliances',
}
</script>

<template>
  <div v-if="industries?.length" class="w-full px-6 py-10 bg-gray-50 border-y border-gray-100">
    <div class="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-x-8 gap-y-4 items-baseline">
      <span class="uppercase text-xs font-semibold text-gray-400 tracking-widest">Common in these industries</span>
      <p class="m-0 text-gray-700">
        <template v-for="(slug, i) in industries" :key="slug">
          <NuxtLink :to="`/industries/${slug}/`" class="text-indigo-600 hover:text-indigo-800 font-medium">{{ INDUSTRY_LABELS[slug] || slug }}</NuxtLink><template v-if="i < industries.length - 1">, </template>
        </template>
        <span class="text-gray-400"> · </span> <NuxtLink to="/industries/" class="text-gray-500 hover:text-indigo-600 text-sm">all industries</NuxtLink>
      </p>
    </div>
  </div>
</template>
