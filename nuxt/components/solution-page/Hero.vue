<script setup lang="ts">
// The hero for the solution pages (solution tracks and the solutions under them). Laid out
// like industry-page/Hero.vue so the pages read as part of the same site: eyebrow badge,
// accent heading, the logo strip directly beneath. Two differences on purpose: a film
// where the industry pages have a quote card, and "Talk to Us" as the only button, since
// these pages exist to start a conversation about building the solution together.
defineProps<{
    eyebrow: string
    eyebrowIcon: string
    heading: string
    description: string
    video: { webm: string, mp4: string, poster: string, label: string }
    socialProof?: string
}>()
</script>

<template>
  <section class="w-full relative">
    <div class="px-6 pt-16 md:pt-20">
      <div class="max-w-screen-lg mx-auto grid gap-12 items-center md:grid-cols-2">
        <div class="max-md:text-center md:flex md:flex-col md:justify-center">
          <div class="mb-4 max-md:flex max-md:justify-center">
            <span class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 industry-eyebrow-icon text-gray-800">
              <span class="w-5 h-5 inline-flex items-center shrink-0"><NavIcon :name="eyebrowIcon" /></span>
              <span class="font-medium">{{ eyebrow }}</span>
            </span>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h1 class="text-4xl md:text-5xl font-medium m-0" v-html="heading" />
          <p class="mt-6 text-gray-700">{{ description }}</p>
          <div class="mt-8 flex gap-4 items-center max-md:justify-center">
            <CtaBookDemo variant="highlight" position="hero" />
          </div>
        </div>
        <!-- An offset colour panel behind the film, like the industry pages' application
             images. The frame clips, not the video: Chrome ignores a radius on its controls. -->
        <div class="relative max-md:mt-4">
          <div class="absolute -top-4 -right-4 w-full h-full rounded-lg bg-gradient-to-tl from-indigo-400 via-indigo-300 to-indigo-100" aria-hidden="true" />
          <div class="relative rounded-lg border-2 border-indigo-300 overflow-hidden bg-indigo-950 shadow-xl">
            <video
                class="block w-full h-auto"
                :poster="video.poster"
                width="1280"
                height="720"
                autoplay
                loop
                muted
                playsinline
                controls
                preload="metadata"
                :aria-label="video.label"
            >
              <source :src="video.webm" type="video/webm">
              <source :src="video.mp4" type="video/mp4">
            </video>
          </div>
        </div>
      </div>
      <div class="max-w-screen-lg mx-auto mt-16 text-center">
        <div class="mx-auto text-center -mt-0.5 -mb-10">
          <SocialProof :eyebrow="socialProof" eyebrow-bg="indigo" />
        </div>
      </div>
    </div>
  </section>
</template>
