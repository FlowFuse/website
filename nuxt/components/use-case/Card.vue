<script setup lang="ts">
// The cross-link card shared by the /use-cases/ listing and components/use-case-links.njk,
// which rendered identical markup in both places.
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
    <span class="mt-2 text-indigo-600 text-sm font-semibold flex items-center gap-2">
      {{ label }}
      <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
    </span>
  </NuxtLink>
</template>
