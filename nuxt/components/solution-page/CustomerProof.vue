<script setup lang="ts">
// A customer result above the fold: one approved, published customer story, its headline
// result and quote, linked to the full story. Only quote stories already on the site.
defineProps<{
    logo: string
    brand: string
    result: string
    quote: string
    author: string
    role: string
    headshot: string
    story: string
}>()
</script>

<template>
  <section class="w-full pt-24 pb-4 px-6">
    <div class="max-w-screen-lg mx-auto">
      <div class="relative">
        <div class="absolute -top-2 -left-2 w-full h-full rounded-lg bg-gradient-to-tl from-red-200 via-red-100 to-red-50" aria-hidden="true" />
        <div class="relative rounded-lg border border-red-100 bg-white p-8 md:p-10 grid md:grid-cols-[1fr_1.4fr] gap-8 items-center">
          <div class="max-md:text-center">
            <img :src="logo" :alt="`${brand} logo`" class="h-10 w-auto max-md:mx-auto" loading="lazy">
            <p class="mt-6 mb-0 text-2xl md:text-3xl font-medium text-gray-800 leading-snug">{{ result }}</p>
            <NuxtLink :to="story" class="mt-5 inline-flex items-center gap-1.5 text-blue-600 hover:underline">
              Read the {{ brand }} story
              <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5 shrink-0" />
            </NuxtLink>
          </div>
          <figure class="m-0 md:border-l md:border-gray-200 md:pl-8">
            <blockquote class="m-0 text-lg italic text-gray-600">&ldquo;{{ quote }}&rdquo;</blockquote>
            <figcaption class="mt-5 flex items-center gap-3">
              <img :src="headshot" :alt="author" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow" loading="lazy">
              <span class="text-sm text-gray-500"><b class="text-gray-700">{{ author }}</b><br>{{ role }}, {{ brand }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
