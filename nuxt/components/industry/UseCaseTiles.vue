<script setup lang="ts">
// The hand-authored "Use Cases" tile grid from layouts/industry.njk, which renders either
// a flat list of tiles or the same tiles under group labels.
import { renderRichText } from '../../lib/rich-text.mjs'

type Tile = { image: string, imageAlt?: string, description: string }

const props = defineProps<{
    useCases: {
        title: string
        items?: Tile[]
        groups?: Array<{ label: string, items: Tile[] }>
    }
}>()

// The .njk branched on `groups`; normalising to one shape keeps the tile markup written
// once instead of duplicated across both branches.
const groups = computed(() =>
    props.useCases.groups?.length
        ? props.useCases.groups
        : [{ label: '', items: props.useCases.items || [] }]
)
</script>

<template>
  <div class="w-full py-16 px-6 comparison-section-bg">
    <div class="max-w-screen-lg mx-auto">
      <h2 class="text-center text-indigo-600 mb-10">{{ useCases.title }}</h2>
      <div v-for="group in groups" :key="group.label" :class="group.label ? 'mb-10' : ''">
        <h3 v-if="group.label" class="text-sm font-semibold uppercase text-indigo-400 mb-4">{{ group.label }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="item in group.items" :key="item.image" class="flex flex-col gap-3 rounded-xl border border-white p-3 bg-[linear-gradient(135deg,_theme(colors.white)_0%,_theme(colors.white/10%)_100%)]">
            <div class="w-full h-48 ff-image-cover rounded overflow-hidden">
              <img :src="item.image" :alt="item.imageAlt" width="400" loading="lazy" class="w-full h-auto">
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="m-0 py-1" v-html="renderRichText(item.description)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
