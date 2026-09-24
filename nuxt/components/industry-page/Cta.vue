<script setup lang="ts">
// The closing CTA band from automotive.vue. Distinct from industry-page/Roi's fixed link
// and from the industriesLegacy Cta band: this one is the "get started" gradient card,
// always ending in a single Book-a-demo button.
defineProps<{ heading: string, description: string }>()
</script>

<template>
  <div class="w-full px-6 pb-20">
    <div class="max-w-screen-lg mx-auto">
      <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
        <p class="text-white text-5xl font-medium m-0">{{ heading }}</p>
        <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">{{ description }}</p>
        <CtaBookDemo variant="highlight" position="final-cta" />
      </div>
    </div>
  </div>
</template>
