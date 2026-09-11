<script setup lang="ts">
// src/_includes/blueprints/blueprint-card.njk - one tile in the Blueprint Library grid.
//
// What the port changes on purpose:
//  - The description was printed with `| safe`. It comes from a README in
//    FlowFuse/blueprint-library, so it goes through renderRichText, which escapes the
//    string and then re-enables a small inline allowlist.
//  - `tileImage` ran each screenshot through eleventy-img at 380px. The image is now a
//    plain path into nuxt/public/blueprints/, resized by @nuxt/image's Netlify provider.
import { blueprintAuthor, blueprintTagLabel, blueprintTags, deployUrl } from '../lib/blueprint-display.mjs'
import { renderRichText } from '../lib/rich-text.mjs'
import type { BlueprintListEntry } from '../composables/useBlueprintList'

const props = defineProps<{ entry: BlueprintListEntry }>()

const FALLBACK_IMAGE = '/images/og-blog.jpg'
const FALLBACK_IMAGE_ALT = 'Image with logo and the slogan: Elevate Node-RED with Flowfuse'

const tags = computed(() => blueprintTags(props.entry.tags))
const author = computed(() => blueprintAuthor(props.entry.author))
const image = computed(() => props.entry.image || FALLBACK_IMAGE)
const imageAlt = computed(() => props.entry.image ? `Image representing ${props.entry.title}` : FALLBACK_IMAGE_ALT)
</script>

<template>
  <li class="flex flex-col h-full">
    <div class="mb-2">
      <label
          v-for="tag in tags"
          :key="tag"
          class="text-gray-700 text-xs font-light rounded-sm bg-indigo-50 py-1.5 px-2 inline-block w-auto"
      >{{ blueprintTagLabel(tag) }}</label>
    </div>
    <div class="grid bg-white ff-image-cover blueprint rounded-lg border drop-shadow-md hover:drop-shadow-lg grow">
      <NuxtLink :to="`${entry.path}/`" class="w-full flex flex-col group hover:no-underline">
        <div class="transition-transform group-hover:scale-105 ff-image-cover aspect-video border-b">
          <img :src="image" :alt="imageAlt" width="380" loading="lazy" class="w-full h-auto">
        </div>
        <h5 class="mt-4 mb-0 group-hover:underline px-4 font-medium text-lg leading-6">{{ entry.title }}</h5>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="text-sm leading-normal font-light pt-1 mb-4 mt-3 px-4 text-gray-500" v-html="renderRichText(entry.description)" />
      </NuxtLink>
      <div class="justify-self-end flex flex-row justify-between items-center w-full px-4 py-2 bg-indigo-50/50 mt-auto border-t">
        <div class="flex flex-col">
          <label class="text-xs">Author:</label>
          <BlueprintCompanyTile :company="author" />
        </div>
        <a
            v-if="entry.blueprintId"
            :href="deployUrl(entry.blueprintId)"
            class="ff-btn ff-btn--primary-outlined flex gap-2"
            target="_blank"
            rel="noopener"
        >DEPLOY <SiteArt name="rocket-launch" /></a>
      </div>
    </div>
  </li>
</template>
