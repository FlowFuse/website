<script setup lang="ts">
// Ported from src/_includes/testimonials.njk, shared by the homepage and the ABM landing
// pages. The .njk rendered every testimonial and then toggled an `active` class from a
// script that queried the DOM and ran a 10-second interval; that is `current` here.
//
// The auto-advance stops on interaction, as it did, and also stops when the component
// unmounts - the .njk's setInterval had no teardown because 11ty pages never unmount.
import testimonials from '../../src/_data/testimonials.json'

withDefaults(defineProps<{
    hideReadMore?: boolean
    browseAllUrl?: string
    browseAllText?: string
}>(), {
    hideReadMore: false,
    browseAllUrl: undefined,
    browseAllText: 'Browse all customer stories',
})

const AUTOPLAY_MS = 10000

const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function start() {
    timer = setInterval(() => {
        current.value = (current.value + 1) % testimonials.length
    }, AUTOPLAY_MS)
}

function show(index: number) {
    current.value = index
    clearInterval(timer)
}

// Site-relative paths: the data file writes them "./images/..." for 11ty's image handler.
function asset(path: string) {
    return '/' + path.replace(/^\.?\//, '')
}

onMounted(start)
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div>
    <div class="flex flex-col flex-wrap content-center justify-center p-6 sm:max-w-screen-lg max-w-5xl mx-auto border-2 border-indigo-200 rounded-xl bg-white hover:drop-shadow-lg hover:border-blue-600 hover:border-2 transition ease-in-out duration-300">
      <NuxtLink
          v-for="(t, i) in testimonials"
          :id="t.id"
          :key="t.id"
          :to="t.url"
          class="testimonial sm:text-left hover:no-underline sm:min-h-[284]"
          :class="{ active: i === current }"
      >
        <div class="m-auto max-w-screen-lg">
          <div class="max-w-none mx-auto flex flex-col sm:grid justify-center items-center" style="grid-template-columns: 35% auto;">
            <div class="w-full h-full aspect-[331/239] ff-image-cover scale rounded-md mb-4 sm:mb-0">
              <img :src="asset(t.imageFile)" :alt="`Image depicting${t.imageAlt}`" width="360" loading="lazy" class="w-full h-auto">
            </div>
            <div class="items-end justify-between sm:pl-12 flex-1 flex flex-col h-full w-full justify-items-end">
              <span v-if="!hideReadMore" class="text-right pb-5 flex gap-1 hover:underline">
                Read the full story <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5" />
              </span>
              <p class="font-normal italic text-2xl">"{{ t.quote }}"</p>
              <p class="text-lg mt-4 flex flex-row gap-3 text-right items-center self-end mb-0 mr-0">
                <span>{{ t.author }}, <span class="font-medium">{{ t.company }}</span></span>
                <span class="w-16 h-16 min-w-16 rounded-full mx-1 bg-black p-1">
                  <img :src="asset(t.companyLogo)" :alt="`${t.company} logo`" width="56" loading="lazy" class="w-full h-auto">
                </span>
              </p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div
        class="flex items-center justify-center gap-3 my-6"
        :class="browseAllUrl ? 'flex-col sm:flex-row sm:justify-between' : 'flex-row flex-wrap'"
    >
      <div class="flex flex-wrap flex-row justify-center gap-3">
        <button
            v-for="(t, i) in testimonials"
            :key="t.id"
            class="testimonial-button align-baseline max-md:p-2"
            :class="{ active: i === current }"
            :aria-label="`Show testimonial from ${t.author}, ${t.company}`"
            @click="show(i)"
        ><span /></button>
      </div>
      <NuxtLink v-if="browseAllUrl" :to="browseAllUrl" class="flex items-center gap-1.5 text-blue-600 hover:underline">
        {{ browseAllText }}
        <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5" />
      </NuxtLink>
    </div>
  </div>
</template>
