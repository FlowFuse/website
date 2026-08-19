<script setup lang="ts">
// Infinite-scroll logo marquee, ported from src/_includes/social-proof.njk.
// Both copies are rendered directly (the original duplicates via JS) so the
// `slide` keyframe can loop seamlessly.
// useState so the shuffle happens once on the server and ships in the
// payload, avoiding a client/server hydration mismatch.
const logos = useState('home-logos', () => useHomeLogos())

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
