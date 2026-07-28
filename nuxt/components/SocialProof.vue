<script setup lang="ts">
// Infinite-scroll logo marquee, ported from src/_includes/social-proof.njk.
// The original duplicates the logos into two sibling divs at runtime so the
// CSS `slide` keyframe (translateX 0 -> -100%, see .social-proof-carousel in
// src/css/style.css) can loop seamlessly; we render both copies directly in
// the template instead of mutating the DOM.
const { data: logos } = await useFetch('/api/home-logos')

function altFromPath (path: string) {
    return path
        .replace('/images/home-logos/', '')
        .replace(/-/g, ' ')
        .replace(/\.(png|svg)$/, '')
        .replace(/^./, c => c.toUpperCase())
}
</script>

<template>
  <div v-if="logos?.length" class="social-proof-carousel">
    <div class="mix-blend-luminosity opacity-70 saturate-0">
      <img v-for="logo in logos" :key="logo" :src="logo" :alt="altFromPath(logo)" loading="lazy">
    </div>
    <div class="mix-blend-luminosity opacity-70 saturate-0" aria-hidden="true">
      <img v-for="logo in logos" :key="`dup-${logo}`" :src="logo" :alt="altFromPath(logo)" loading="lazy">
    </div>
  </div>
</template>
