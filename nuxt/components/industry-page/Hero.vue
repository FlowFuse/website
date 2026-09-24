<script setup lang="ts">
// The hero band from pages/industries/automotive.vue: eyebrow badge, accent heading,
// buttons, a customer-quote card, and an optional SocialProof line. The metrics grid and
// customer-story bridge live in industry-page/Metrics.vue, rendered right after this.
defineProps<{
    hero: {
        eyebrow: string
        eyebrowIcon: string
        heading: string
        description: string
        quote?: {
            text: string
            author: string
            role: string
            company: string
            image: string
            imageAlt: string
        } | null
    }
    socialProof?: string
}>()
</script>

<template>
  <section class="w-full relative">
    <div class="px-6 pt-16 md:pt-20">
      <div class="max-w-screen-lg mx-auto grid gap-12 items-stretch" :class="{ 'md:grid-cols-2': hero.quote }">
        <div class="max-md:text-center md:flex md:flex-col md:justify-center" :class="{ 'max-w-3xl': !hero.quote }">
          <div class="mb-4 max-md:flex max-md:justify-center">
            <span class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 industry-eyebrow-icon text-gray-800">
              <span class="w-5 h-5 inline-flex items-center shrink-0"><NavIcon :name="hero.eyebrowIcon" /></span>
              <span class="font-medium">{{ hero.eyebrow }}</span>
            </span>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h1 class="text-4xl md:text-5xl font-medium m-0" v-html="hero.heading" />
          <p class="mt-6 text-gray-700">{{ hero.description }}</p>
          <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
            <CtaBookDemo variant="highlight" position="hero" />
            <CtaPricing variant="ghost" position="hero" icon="i-lucide-arrow-right" />
          </div>
        </div>
        <div v-if="hero.quote" class="w-full md:flex md:items-center">
          <div class="relative w-full md:pt-6 max-md:mt-10">
            <div class="relative rounded-lg border border-indigo-200 p-6 pt-28 bg-indigo-50/50">
              <div class="absolute -top-14 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-36 h-36 rounded-full bg-red-200 border-4 border-white shadow-lg overflow-hidden ff-image-cover">
                <img :src="hero.quote.image" :alt="hero.quote.imageAlt" loading="eager">
              </div>
              <p class="italic text-gray-600 font-medium m-0">&ldquo;{{ hero.quote.text }}&rdquo;</p>
              <p class="text-gray-500 text-right mt-4 mb-0">{{ hero.quote.author }}, {{ hero.quote.role }}, <span class="font-semibold text-gray-600">{{ hero.quote.company }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-screen-lg mx-auto mt-16 text-center">
        <div class="mx-auto text-center -mt-0.5 -mb-10">
          <!-- No `socialProof`: falls back to SocialProof's own generic default line,
               same as any other page that doesn't pass `eyebrow`. `?? undefined`
               matters here — an absent optional @nuxt/content field comes through as
               `null`, and SocialProof's own `withDefaults` only substitutes for
               `undefined`, not `null`. -->
          <SocialProof :eyebrow="socialProof ?? undefined" eyebrow-bg="indigo" />
        </div>
      </div>
    </div>
  </section>
</template>
