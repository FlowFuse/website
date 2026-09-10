<script setup lang="ts">
// The use-case cross-link card. Three .njk files rendered this: the /use-cases/ listing
// and components/use-case-links.njk shared one look, and
// components/industry-use-cases.njk used a slightly different footer link (blue, not
// semibold, long arrow, underline on hover). Both are kept rather than picking one.
withDefaults(defineProps<{
    to: string
    title: string
    problem?: string
    label?: string
    look?: 'listing' | 'industry'
}>(), {
    label: 'View use case',
    look: 'listing',
})
</script>

<template>
  <NuxtLink :to="to" class="group hover:no-underline flex flex-col gap-3 rounded-xl border border-gray-200 p-6 bg-white hover:border-indigo-300 hover:shadow-sm transition-all">
    <h3 class="m-0 text-gray-800 group-hover:text-indigo-600 transition-colors">{{ title }}</h3>
    <p class="m-0 text-gray-600 text-sm flex-grow">{{ problem }}</p>
    <span
        v-if="look === 'industry'"
        class="mt-2 text-blue-600 text-sm flex items-center gap-1.5 group-hover:underline"
    >
      {{ label }}
      <UIcon name="i-heroicons-arrow-long-right" class="shrink-0 w-4 h-4" />
    </span>
    <span v-else class="mt-2 text-indigo-600 text-sm font-semibold flex items-center gap-2">
      {{ label }}
      <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
    </span>
  </NuxtLink>
</template>
