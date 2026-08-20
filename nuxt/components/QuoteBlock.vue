<script setup lang="ts">
defineProps<{
  quote: string
  author?: string
  role?: string
  avatar?: string
}>()
</script>

<template>
  <figure class="not-prose border-l-4 border-red-100 pl-6">
    <blockquote class="m-0 border-0 p-0 text-2xl font-normal italic text-gray-500">
      "{{ quote }}"
    </blockquote>
    <figcaption v-if="author" class="mt-4 flex items-center gap-3 text-sm text-gray-500">
      <span v-if="avatar" class="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white bg-red-200 shadow-md">
        <img :src="avatar" :alt="author" class="h-full w-full object-cover">
      </span>
      <span>
        <span class="font-semibold text-gray-700">{{ author }}</span>{{ role ? ` · ${role}` : '' }}
      </span>
    </figcaption>
  </figure>
</template>
