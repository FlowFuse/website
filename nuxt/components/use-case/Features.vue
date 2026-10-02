<script setup lang="ts">
// A list of items, each optionally led by an icon or pictogram, under an optional
// eyebrow, heading and intro. Before the template every architecture page wrote its own
// copy of this band: "The FlowFuse Advantage" three times verbatim, plus feature grids,
// challenge lists and pictogram rows that differed only in what led each item.
//
// `layout` keeps the four looks those copies actually had:
//  - grid: plain items in 1-3 columns.
//  - cards: items on translucent white cards (meant for the gradient background).
//  - panel: the whole list inside one bordered indigo panel.
//  - alternating: one item per row, pictogram flipping sides.

const props = defineProps<{
    block: {
        layout?: 'grid' | 'cards' | 'panel' | 'alternating'
        columns?: number
        background?: 'white' | 'gray' | 'indigo' | 'gradient'
        centered?: boolean
        eyebrow?: string
        heading?: string
        intro?: string
        lead?: string
        image?: { src: string, alt: string, width?: number }
        items: Array<{
            icon?: string
            navIcon?: string
            solid?: boolean
            image?: string
            title?: string
            text?: string | string[]
        }>
        note?: string
    }
}>()

const layout = computed(() => props.block.layout || 'grid')

const BACKGROUNDS = {
    white: '',
    gray: 'bg-gray-50',
    indigo: 'bg-indigo-50/50',
    gradient: 'comparison-section-bg',
}

// Written out in full so Tailwind sees every class.
const COLUMNS: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
}

const paragraphs = (text?: string | string[]) => (Array.isArray(text) ? text : text ? [text] : [])
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="w-full px-6 py-16 md:py-20" :class="BACKGROUNDS[block.background || 'white']">
    <div class="max-w-screen-lg mx-auto" :class="{ 'text-center': block.centered }">
      <div
          :class="layout === 'panel' ? 'm-auto text-center sm:text-left p-8 max-w-md sm:max-w-screen-lg bg-indigo-50 rounded-lg border-[3px] border-indigo-200 drop-shadow-xl' : ''"
      >
        <p v-if="block.eyebrow" class="text-gray-500 text-sm font-semibold uppercase m-0 max-md:text-center">{{ block.eyebrow }}</p>
        <h2 v-if="block.heading" class="max-md:text-center" :class="block.eyebrow ? 'mt-3 mb-0' : 'mb-0'" v-html="block.heading" />
        <p v-if="block.intro" class="mt-6 mb-0 max-w-3xl max-md:text-center" :class="{ 'mx-auto': block.centered }" v-html="block.intro" />

        <div v-if="block.image" class="mx-auto mt-10" :style="{ maxWidth: block.image.width ? `${block.image.width}px` : undefined }">
          <img :src="block.image.src" :alt="block.image.alt" :width="block.image.width || 1024" loading="lazy" class="w-full h-auto">
        </div>

        <div v-if="layout === 'alternating'" class="mt-16">
          <div
              v-for="(item, i) in block.items"
              :key="item.title"
              class="flex flex-col gap-8 mb-12 text-left items-center"
              :class="i % 2 === 0 ? 'sm:flex-row sm:pr-24 md:pr-48' : 'sm:flex-row-reverse sm:text-right sm:pl-24 md:pl-48'"
          >
            <div v-if="item.image" class="w-32 sm:w-48 flex-shrink-0">
              <img :src="item.image" alt="" width="128" loading="lazy" class="w-full h-auto">
            </div>
            <div>
              <h4 v-if="item.title" v-html="item.title" />
              <p v-for="(paragraph, p) in paragraphs(item.text)" :key="p" v-html="paragraph" />
            </div>
          </div>
        </div>

        <div v-else class="grid gap-x-12 gap-y-12 mt-12 text-left" :class="COLUMNS[block.columns || 3]">
          <div v-if="block.lead" class="flex flex-col justify-center w-full max-md:max-w-md mx-auto sm:bg-indigo-50 rounded-lg sm:p-7">
            <h3 class="text-center w-full sm:text-left text-3xl text-gray-500 font-light leading-snug m-0" v-html="block.lead" />
          </div>
          <div
              v-for="(item, i) in block.items"
              :key="item.title || i"
              class="flex flex-col max-md:text-center"
              :class="layout === 'cards'
                ? 'gap-9 rounded-lg border border-white p-5 bg-[linear-gradient(135deg,_theme(colors.white)_0%,_theme(colors.white/20%)_100%)]'
                : 'gap-3'"
          >
            <UIcon v-if="item.icon" :name="item.icon" class="w-8 h-8 text-indigo-600 max-md:mx-auto" />
            <div v-else-if="item.navIcon" class="text-indigo-700">
              <NavIcon :name="item.navIcon" :solid="item.solid" size="lg" />
            </div>
            <div v-else-if="item.image" class="w-24 mb-3 flex-shrink-0 max-md:mx-auto">
              <img :src="item.image" alt="" width="128" loading="lazy" class="w-full h-auto">
            </div>
            <div>
              <h3 v-if="item.title" class="text-xl font-semibold text-gray-600 m-0" v-html="item.title" />
              <p
                  v-for="(paragraph, p) in paragraphs(item.text)"
                  :key="p"
                  class="font-light text-gray-700 leading-relaxed mb-0"
                  :class="item.title ? 'mt-4' : 'mt-0'"
                  v-html="paragraph"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <ProseNote v-if="block.note" class="mt-16"><span v-html="block.note" /></ProseNote>
    </div>
  </section>
</template>
