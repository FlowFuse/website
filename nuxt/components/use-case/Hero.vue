<script setup lang="ts">
// The hero band from layouts/use-case.njk. Ported verbatim, classes included.
// With `media`, it becomes a two-column hero: text left, an autoplaying demo right.
defineProps<{
    title: string
    problem?: string
    media?: {
        video: string
        poster?: string
        alt: string
        width?: number
        height?: number
    }
}>()
</script>

<template>
  <div class="w-full px-6 bg-[radial-gradient(ellipse_120%_140%_at_50%_-20%,theme(colors.indigo.50)_0%,theme(colors.white)_60%)]">
    <div v-if="media" class="max-w-screen-xl mx-auto py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-12 items-center">
      <div class="text-center lg:text-left">
        <p class="uppercase text-sm font-semibold text-indigo-500 mb-4">Use case</p>
        <h1 class="font-medium m-0"><span class="text-indigo-600">{{ title }}</span></h1>
        <p v-if="problem" class="mt-6 max-w-2xl mx-auto lg:mx-0 text-lg text-gray-600">{{ problem }}</p>
        <div class="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
          <CtaBookDemo variant="highlight" position="hero" class="min-h-[40px]" />
        </div>
      </div>
      <div class="overflow-hidden rounded-lg border border-indigo-100 shadow-2xl bg-white">
        <video
            class="block w-full h-auto"
            :poster="media.poster"
            :width="media.width"
            :height="media.height"
            :aria-label="media.alt"
            autoplay
            loop
            muted
            playsinline
        >
          <source :src="media.video" :type="media.video.endsWith('.mp4') ? 'video/mp4' : 'video/webm'">
        </video>
      </div>
    </div>
    <div v-else class="max-w-screen-lg mx-auto py-16 sm:py-24 text-center">
      <p class="uppercase text-sm font-semibold text-indigo-500 mb-4">Use case</p>
      <h1 class="m-auto max-w-3xl font-medium"><span class="text-indigo-600">{{ title }}</span></h1>
      <p v-if="problem" class="mt-6 max-w-2xl mx-auto text-lg text-gray-600">{{ problem }}</p>
      <div class="mt-10 flex flex-wrap gap-4 justify-center">
        <CtaBookDemo variant="highlight" position="hero" class="min-h-[40px]" />
      </div>
    </div>
  </div>
</template>
