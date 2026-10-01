<script setup lang="ts">
// The band a marketing page ends on. Before this there were three copies: one for the
// use cases, one for the industry pages and one for the legacy industry pages.
//  - card: the light blue `ff-blue-card` (use cases, legacy industry pages, /use-cases/).
//  - banner: the dark `ff-get-started-bg` gradient (industry pages,
//    remote-device-management).
// Buttons are a list of fixed CTA destinations (see <ActionButtons>), a demo request plus
// sign-up unless the caller lists its own. `position` is the PostHog placement name, kept
// per caller so each page's existing series carries on.
import { richText } from '../lib/rich-text.mjs'

withDefaults(defineProps<{
    heading: string
    description?: string
    layout?: 'card' | 'banner'
    ctas?: Array<Record<string, unknown>>
    position?: string
}>(), {
    description: undefined,
    layout: 'card',
    ctas: () => [{ cta: 'book-demo' }, { cta: 'sign-up' }],
    position: 'footer',
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <section v-if="layout === 'banner'" class="w-full px-6 py-20">
    <div class="max-w-screen-lg mx-auto">
      <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
        <p class="text-white text-4xl sm:text-5xl font-medium m-0" v-html="richText(heading)" />
        <p v-if="description" class="text-indigo-50 font-light text-xl max-w-3xl m-0" v-html="richText(description)" />
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <ActionButtons :ctas="ctas" :position="position" />
        </div>
      </div>
    </div>
  </section>

  <section v-else class="w-full px-6 py-20">
    <div class="ff-blue-card max-md:max-w-xl md:max-w-screen-lg mx-auto pt-12 pb-10 text-center">
      <h3 class="mb-4 w-full text-center" v-html="richText(heading)" />
      <p v-if="description" class="text-gray-600 mb-8 max-w-2xl mx-auto text-center" v-html="richText(description)" />
      <div class="flex flex-wrap gap-4 justify-center" :class="{ 'mt-8': !description }">
        <ActionButtons :ctas="ctas" :position="position" />
      </div>
    </div>
  </section>
</template>
