<script setup lang="ts">
// A customer result above the fold: one approved, published customer story, its headline
// result and quote, linked to the full story. Only quote stories already on the site.
// With a video, the film sits on the left and the quote stacks on the right, so the page
// can be shown to a customer live: the film never autoplays, and plays with its sound on.
defineProps<{
    logo: string
    brand: string
    result: string
    quote: string
    author: string
    role: string
    headshot: string
    story: string
    video?: { webm: string, mp4: string, poster: string, label: string }
}>()
</script>

<template>
  <section class="w-full pt-24 pb-4 px-6">
    <div v-if="video" class="max-w-screen-lg mx-auto grid lg:grid-cols-[3fr_2fr] gap-10 items-center">
      <div class="relative">
        <div class="absolute -top-2 -left-2 w-full h-full rounded-lg bg-gradient-to-tl from-indigo-400 via-indigo-300 to-indigo-100" aria-hidden="true" />
        <div class="relative rounded-lg border border-indigo-300 overflow-hidden bg-indigo-950 shadow-lg">
          <video
              class="block w-full h-auto"
              :poster="video.poster"
              width="1280"
              height="720"
              controls
              playsinline
              preload="metadata"
              :aria-label="video.label"
          >
            <source :src="video.webm" type="video/webm">
            <source :src="video.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -top-2 -left-2 w-full h-full rounded-lg bg-gradient-to-tl from-red-200 via-red-100 to-red-50" aria-hidden="true" />
        <figure class="relative m-0 rounded-lg border border-red-100 bg-white p-7 max-lg:text-center">
          <img :src="logo" :alt="`${brand} logo`" class="h-9 w-auto max-lg:mx-auto" loading="lazy">
          <p class="mt-5 mb-0 text-xl font-medium text-gray-800 leading-snug">{{ result }}</p>
          <blockquote class="mt-5 mb-0 text-base italic text-gray-600">&ldquo;{{ quote }}&rdquo;</blockquote>
          <figcaption class="mt-5 flex items-center gap-3 max-lg:justify-center max-lg:text-left">
            <img :src="headshot" :alt="author" class="w-11 h-11 rounded-full object-cover border-2 border-white shadow" loading="lazy">
            <span class="text-sm text-gray-500"><b class="text-gray-700">{{ author }}</b><br>{{ role }}, {{ brand }}</span>
          </figcaption>
          <NuxtLink :to="story" class="mt-5 inline-flex items-center gap-1.5 text-blue-600 hover:underline">
            Read the {{ brand }} story
            <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5 shrink-0" />
          </NuxtLink>
        </figure>
      </div>
    </div>
    <div v-else class="max-w-screen-lg mx-auto">
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
