<script setup lang="ts">
// The cross-link card shared by the /use-cases/ listing, components/use-case-links.njk,
// and components/industry-use-cases.njk (now IndustryPageUseCases.vue) — one look
// across all three call sites.
withDefaults(defineProps<{
    to: string
    title: string
    problem?: string
    label?: string
}>(), { label: 'View use case' })
</script>

<template>
  <NuxtLink :to="to" class="group hover:no-underline flex flex-col gap-3 rounded-xl border border-gray-200 p-6 bg-white hover:border-indigo-300 hover:shadow-sm transition-all">
    <h3 class="m-0 text-gray-800 group-hover:text-indigo-600 transition-colors">{{ title }}</h3>
    <p class="m-0 text-gray-600 text-sm flex-grow">{{ problem }}</p>
    <span class="mt-2 text-blue-600 text-sm flex items-center gap-1.5 group-hover:underline">
      {{ label }}
      <UIcon name="i-heroicons-arrow-long-right" class="shrink-0 w-4 h-4" />
    </span>
  </NuxtLink>
</template>
