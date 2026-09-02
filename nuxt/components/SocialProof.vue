<script setup lang="ts">
// Infinite-scroll logo marquee, ported from src/_includes/social-proof.njk.
// Both copies are rendered directly (the original duplicates via JS) so the
// `slide` keyframe can loop seamlessly.
// useState so the shuffle happens once on the server and ships in the
// payload, avoiding a client/server hydration mismatch.
const logos = useState('home-logos', () => useHomeLogos())

const DEFAULT_EYEBROW = 'Over 36,000 users have trusted FlowFuse'

// String to override the copy, `false` to hide it, omitted for the homepage default.
// eyebrowBg: radial-gradient glow behind the eyebrow — off by default. `true` (or 'indigo')
// matches the homepage; 'red' is for pages themed around the red accent (e.g. /integrations/opcua/).
const props = withDefaults(defineProps<{
    eyebrow?: string | false
    eyebrowBg?: boolean | 'indigo' | 'red'
}>(), {
    eyebrow: DEFAULT_EYEBROW,
    eyebrowBg: false,
})

const eyebrowBgClass = computed(() => {
    if (!props.eyebrowBg) return ''
    return props.eyebrowBg === 'red' ? 'bg-radial-red' : 'bg-radial-indigo'
})

function altFromPath (path: string) {
    return path
        .replace('/images/home-logos/', '')
        .replace(/-/g, ' ')
        .replace(/\.(png|svg)$/, '')
        .replace(/^./, c => c.toUpperCase())
}
</script>

<template>
  <div>
    <div v-if="props.eyebrow" class="w-full text-center min-h-14 flex justify-center items-center mt-8" :class="eyebrowBgClass">
      <h2 class="text-gray-600 text-lg font-semibold">
        {{ props.eyebrow }}
      </h2>
    </div>
    <div v-if="logos?.length" class="social-proof-carousel">
      <div class="mix-blend-luminosity opacity-70 saturate-0">
        <img v-for="logo in logos" :key="logo" :src="logo" :alt="altFromPath(logo)" loading="lazy">
      </div>
      <div class="mix-blend-luminosity opacity-70 saturate-0" aria-hidden="true">
        <img v-for="logo in logos" :key="`dup-${logo}`" :src="logo" :alt="altFromPath(logo)" loading="lazy">
      </div>
    </div>
  </div>
</template>
