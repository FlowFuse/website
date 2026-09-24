<script setup lang="ts">
// The zigzag "Applications for X Manufacturing" band from automotive.vue.
// Supports the same `[label](url)` inline-link subset as BlogFaq's answers.

type Item = {
    title: string
    description: string
    linkText: string
    linkHref: string
    image: string
    imageAlt: string
    variant: 'indigo' | 'red' | 'mixed'
}

defineProps<{ heading: string, description: string, items: Item[] }>()

const VARIANTS: Record<string, { gradient: string, border: string, mobileGradient: string, mobileBorder: string }> = {
    indigo: { gradient: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300', mobileGradient: 'from-indigo-100 to-indigo-50', mobileBorder: 'border-indigo-200' },
    red: { gradient: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100', mobileGradient: 'from-red-50 to-white', mobileBorder: 'border-red-100' },
    mixed: { gradient: 'from-red-200 to-indigo-100', border: 'border-indigo-100', mobileGradient: 'from-red-50 to-indigo-50', mobileBorder: 'border-indigo-100' },
}
</script>

<template>
  <section class="w-full relative pb-20 pt-14 px-6 overflow-hidden">
    <div class="absolute inset-x-0 top-0 h-[400px] md:h-[561px] solution-section-bg-flipped" aria-hidden="true" />
    <div class="relative z-10">
      <div class="max-w-screen-lg mx-auto max-md:text-center mb-28 md:mt-10">
        <h2 class="text-indigo-600 text-4xl md:text-5xl">{{ heading }}</h2>
        <p class="text-gray-600 text-lgmd:text-2xl">{{ description }}</p>
      </div>

      <div class="md:max-w-screen-lg mx-auto">
        <div
            v-for="(item, index) in items"
            :key="item.title"
            class="max-md:text-center md:flex md:flex-row gap-8 items-center m-auto mb-14 md:mb-20"
            :class="{ 'md:flex-row-reverse': index % 2 === 1 }"
        >
          <!-- Image (desktop): full-size screenshot offset over a colored panel -->
          <div class="max-md:hidden md:w-[45%]">
            <div class="relative aspect-[430/289]">
              <div
                  class="absolute -top-5 w-full h-full rounded-lg bg-gradient-to-tl"
                  :class="[VARIANTS[item.variant].gradient, index % 2 === 0 ? '-left-5' : '-right-5']"
              />
              <div class="absolute inset-0 rounded-lg border-2 overflow-hidden ff-image-cover" :class="VARIANTS[item.variant].border">
                <img :src="item.image" :alt="item.imageAlt" loading="lazy">
              </div>
            </div>
          </div>
          <!-- Text -->
          <div class="md:w-[55%] flex flex-col gap-3">
            <h3 class="text-gray-700 text-3xl font-medium m-0">{{ item.title }}</h3>
            <div class="md:hidden rounded-xl w-full bg-gradient-to-tl max-w-[500px] mx-auto my-4 p-4" :class="VARIANTS[item.variant].mobileGradient">
              <div class="ff-image-rounded w-full border overflow-hidden" :class="VARIANTS[item.variant].mobileBorder">
                <img :src="item.image" :alt="item.imageAlt" loading="lazy">
              </div>
            </div>
            <p class="text-gray-500 m-0"><InlineMarkdown :text="item.description" /></p>
            <a :href="item.linkHref" class="flex items-center gap-1.5 text-blue-600 hover:underline max-md:justify-center">
              {{ item.linkText }}
              <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
