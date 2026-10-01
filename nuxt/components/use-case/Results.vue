<script setup lang="ts">
// Customer metric cards, each one a link to its case study. Background and hover
// treatment are the ones from /resources/roi-calculator/'s "The research behind the ROI
// analysis". `before` is optional: only a result that is a change (1 → 130+) has one.
// `company` is separate from `text` because the whole card is the link, so the name is
// styled like one rather than being a second <a> nested inside the first.
import { richText } from '../../lib/rich-text.mjs'

defineProps<{
    block: {
        eyebrow?: string
        heading: string
        items: Array<{
            before?: string
            after: string
            unit: string
            company: string
            text: string
            linkText: string
            linkName: string
            href: string
        }>
    }
}>()

// The hover overlay highlights `linkName` inside the card's link text, the way the ROI
// evidence cards highlight their source ("Read more at <source>").
function splitLinkText(item: { linkText: string, linkName: string }) {
    const at = item.linkText.indexOf(item.linkName)
    if (at === -1) return { before: item.linkText, after: '' }
    return { before: item.linkText.slice(0, at), after: item.linkText.slice(at + item.linkName.length) }
}
</script>

<template>
  <section class="w-full px-6 pt-20 pb-20 relative overflow-hidden">
    <div class="absolute -inset-y-1 inset-x-0 solution-section-bg" aria-hidden="true" />
    <div class="max-w-screen-lg mx-auto relative">
      <p v-if="block.eyebrow" class="text-gray-500 text-sm font-semibold uppercase m-0 max-md:text-center">{{ block.eyebrow }}</p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h2 class="mt-3 mb-0 max-md:text-center" v-html="richText(block.heading)" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
        <NuxtLink
            v-for="item in block.items"
            :key="item.company"
            :to="item.href"
            class="group relative z-[1] overflow-hidden md:overflow-visible bg-white rounded-lg border border-gray-200 px-7 pt-6 pb-7 flex flex-col gap-9 transition-all duration-200 ease-out hover:no-underline md:hover:z-[2] md:motion-safe:hover:scale-[1.04] md:after:absolute md:after:inset-0 md:after:rounded-lg md:after:pointer-events-none md:after:opacity-0 md:after:shadow-lift md:after:transition-opacity md:after:duration-200 md:after:ease-linear md:hover:after:opacity-100"
        >
          <UIcon name="i-heroicons-arrow-up-right" class="absolute top-6 right-7 z-10 w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
          <div class="flex flex-col gap-1 pr-8">
            <div class="flex items-center gap-3.5 text-5xl font-semibold text-red-400">
              <template v-if="item.before">
                <span>{{ item.before }}</span>
                <UIcon name="i-heroicons-chevron-right" class="w-8 h-8 shrink-0" />
              </template>
              <span>{{ item.after }}</span>
            </div>
            <span class="text-xl font-semibold text-red-500 opacity-90">{{ item.unit }}</span>
          </div>
          <p class="text-sm leading-5 text-gray-700 opacity-90 m-0">
            <span class="font-semibold text-blue-700">{{ item.company }}</span> {{ item.text }}
          </p>
          <div class="hidden md:flex absolute inset-0 rounded-lg items-center justify-center text-center px-6 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
            <span class="text-sm font-medium text-gray-900">{{ splitLinkText(item).before }}<span class="text-indigo-600">{{ item.linkName }}</span>{{ splitLinkText(item).after }}</span>
          </div>
          <span class="absolute -inset-px z-20 rounded-lg border border-transparent group-hover:border-indigo-600 pointer-events-none transition-colors duration-200" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
