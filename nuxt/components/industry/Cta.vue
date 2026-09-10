<script setup lang="ts">
// The closing CTA band from layouts/industry.njk. Distinct from the use-case one: a
// single Book-a-demo button, and the copy is per page rather than defaulted.
defineProps<{ cta: { title: string, description?: string } }>()
</script>

<template>
  <div class="w-full px-6 pt-12 sm:pt-16 pb-24">
    <div class="ff-blue-card max-md:max-w-xl md:max-w-screen-lg mx-auto pt-12 pb-10">
      <h3 class="mb-4 w-full text-center">{{ cta.title }}</h3>
      <p class="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{{ cta.description }}</p>
      <div class="flex justify-center">
        <CtaBookDemo variant="highlight" position="cta" class="min-h-[40px]" />
      </div>
    </div>
  </div>
</template>
