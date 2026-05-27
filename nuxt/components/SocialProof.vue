<script setup>
// Mirrors src/_includes/social-proof.njk: the collections.homeLogos carousel
// (all files in src/images/home-logos). Rendered twice for the scroll effect.
const FILES = [
    'The-Innovation-Hub-for-Allied-Command-Transformation-logo.png',
    'bosch-logo.svg', 'energinet-logo.png', 'enexis-logo.svg', 'epcor-logo.png',
    'henkel-logo.svg', 'knobelsdorff-logo.png', 'laepple-logo.png',
    'newell-logo.svg', 'pem-logo.svg', 'verduyn-logo.png', 'walter-logo.svg',
    'wenco-logo.svg', 'wings-logo.png',
]
const alt = (f) => {
    const s = f.replace(/-/g, ' ').replace(/\.(png|svg)$/, '')
    return s.charAt(0).toUpperCase() + s.slice(1)
}
const logos = [...FILES, ...FILES]
</script>

<template>
  <div class="social-proof-carousel">
    <div class="mix-blend-luminosity opacity-70 saturate-0">
      <img v-for="(f, i) in logos" :key="i" :src="`/images/home-logos/${f}`" :alt="alt(f)" />
    </div>
  </div>
</template>
