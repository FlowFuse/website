<script setup lang="ts">
// The closing band, in the same ff-blue-card as the use-case pages, with "Talk to Us" as
// the only button (UseCaseClosingCta also offers sign-up, which these pages leave out).
defineProps<{ heading: string, description: string }>()
</script>

<template>
  <div class="w-full px-6 py-20">
    <div class="ff-blue-card max-md:max-w-xl md:max-w-screen-lg mx-auto pt-12 pb-10 text-center">
      <h3 class="mb-4 w-full text-center">{{ heading }}</h3>
      <p class="text-gray-600 mb-8 max-w-xl mx-auto text-center">{{ description }}</p>
      <div class="flex justify-center">
        <CtaBookDemo variant="highlight" position="footer" class="min-h-[40px]" />
      </div>
    </div>
  </div>
</template>
