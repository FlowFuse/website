<script setup lang="ts">
withDefaults(defineProps<{
    title: string
    path: string
    brand: string
    logo?: string | null
    image?: string | null
}>(), {
    logo: undefined,
    image: undefined,
})
</script>

<template>
  <li>
    <NuxtLink :to="path" class="group flex h-full flex-col hover:no-underline">
      <div class="relative">
        <img
          :src="image ?? '/images/og-blog.jpg'"
          :alt="image ? `Image representing ${title}` : 'Elevate Node-RED with Flowfuse'"
          class="ff-image-cover ff-image-top-rounded h-40 w-full object-cover"
        >
        <div v-if="logo" class="absolute left-0 top-0 flex h-full w-1/2 items-center justify-center bg-white">
          <img :src="logo" :alt="`Image representing ${brand} logo`" class="max-h-full max-w-full object-contain p-2">
        </div>
      </div>
      <div class="flex flex-grow flex-col rounded-b-lg border border-t-0 p-4">
        <span class="text-sm font-bold text-gray-500">{{ brand }}</span>
        <h3 class="text-base group-hover:text-blue-600">{{ title }}</h3>
      </div>
    </NuxtLink>
  </li>
</template>
