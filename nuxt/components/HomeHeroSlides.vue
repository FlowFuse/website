<script setup lang="ts">
// The homepage hero's cross-fading background, ported from src/index.njk plus
// src/_data/heroImages.js.
//
// The .njk read src/images/home/hero/config.json and filtered it to the files that exist,
// so a slide could be removed by deleting the image. The list is imported directly here;
// a config entry with no file is a missing image either way, and the build now surfaces
// that rather than silently dropping the slide.
//
// The .njk's inline script queried .hero-slide and ran two timers with no teardown. This
// is one interval, cleared on unmount, and it still honours prefers-reduced-motion by
// never starting.
import slides from '../../src/images/home/hero/config.json'

const FIRST_ADVANCE_MS = 3200
const INTERVAL_MS = 4400

const current = ref(0)
let startTimer: ReturnType<typeof setTimeout> | undefined
let cycleTimer: ReturnType<typeof setInterval> | undefined

function advance() {
    current.value = (current.value + 1) % slides.length
}

onMounted(() => {
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    startTimer = setTimeout(() => {
        advance()
        cycleTimer = setInterval(advance, INTERVAL_MS)
    }, FIRST_ADVANCE_MS)
})

onUnmounted(() => {
    clearTimeout(startTimer)
    clearInterval(cycleTimer)
})
</script>

<template>
  <div v-if="slides.length" class="absolute inset-0 overflow-hidden" aria-hidden="true">
    <div
        v-for="(slide, i) in slides"
        :key="slide.file"
        class="hero-slide"
        :class="{ 'is-active': i === current }"
    >
      <img :src="`/images/home/hero/${slide.file}`" :alt="slide.alt" width="1920" class="w-full h-auto">
      <div v-if="slide.mobileOverlay" class="absolute inset-0 bg-gray-500/50 mix-blend-multiply md:hidden" />
    </div>
  </div>
</template>
