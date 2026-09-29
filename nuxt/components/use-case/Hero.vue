<script setup lang="ts">
// The hero band from layouts/use-case.njk. Ported verbatim, classes included.
defineProps<{ title: string, problem?: string }>()
</script>

<template>
  <div class="w-full px-6 bg-[radial-gradient(ellipse_120%_140%_at_50%_-20%,theme(colors.indigo.50)_0%,theme(colors.white)_60%)]">
    <div class="max-w-screen-lg mx-auto py-16 sm:py-24 text-center">
      <p class="uppercase text-sm font-semibold text-indigo-500 mb-4">Use case</p>
      <h1 class="m-auto max-w-3xl font-medium"><span class="text-indigo-600">{{ title }}</span></h1>
      <p v-if="problem" class="mt-6 max-w-2xl mx-auto text-lg text-gray-600">{{ problem }}</p>
      <div class="mt-10 flex flex-wrap gap-4 justify-center">
        <CtaBookDemo variant="highlight" position="hero" class="min-h-[40px]" />
      </div>
    </div>
  </div>
</template>
