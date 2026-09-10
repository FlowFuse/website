<script setup lang="ts">
// The hero band from layouts/industry.njk. The eyebrow glyph and the accented heading
// half both came out of frontmatter; the glyph resolves through <NavIcon> (the same SVG
// file the .njk included) and the heading through renderRichText's fixed allowlist.
import { renderRichText } from '../../lib/rich-text.mjs'

defineProps<{
    hero: {
        eyebrow?: string
        eyebrowIcon?: string
        heading: string
        description?: string
        image: string
        imageAlt?: string
        subCta?: string
    }
}>()
</script>

<template>
  <div class="w-full">
    <div class="w-full px-6 py-10 sm:py-12 md:pt-6">
      <div class="md:flex md:my-16 md:flex-row md:justify-between container mx-auto max-md:text-left md:max-w-screen-lg gap-8 items-stretch">
        <div class="m-auto md:w-1/2">
          <div v-if="hero.eyebrow" class="mb-4 max-md:flex max-md:justify-start">
            <span class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 industry-eyebrow-icon text-gray-800">
              <span v-if="hero.eyebrowIcon" class="w-5 h-5 inline-flex items-center shrink-0">
                <NavIcon :name="hero.eyebrowIcon" />
              </span>
              <span class="font-medium">{{ hero.eyebrow }}</span>
            </span>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h1 class="w-full mt-0 m-auto font-medium text-3xl sm:text-4xl" v-html="renderRichText(hero.heading)" />
          <p class="mb-10 text-gray-600">{{ hero.description }}</p>
          <div class="md:mt-3 gap-2 hidden md:flex md:flex-col md:items-start md:justify-start">
            <p v-if="hero.subCta" class="text-sm text-gray-600 m-0 mb-1">{{ hero.subCta }}</p>
            <div class="flex gap-4 items-center flex-row">
              <CtaBookDemo variant="highlight" position="hero" class="min-h-[40px]" />
              <CtaContactUs variant="ghost" position="hero" icon />
            </div>
          </div>
        </div>
        <div class="md:w-1/2 flex-grow relative">
          <div class="ff-image-cover ff-image-rounded w-full h-full">
            <img :src="hero.image" :alt="hero.imageAlt" width="496" class="w-full h-auto">
          </div>
        </div>
        <div class="flex flex-col md:hidden gap-3 mt-8 items-start">
          <p v-if="hero.subCta" class="text-sm text-gray-600 m-0 mb-1">{{ hero.subCta }}</p>
          <div class="flex flex-row gap-4 items-center justify-start flex-wrap">
            <CtaBookDemo variant="highlight" position="hero-mobile" class="min-h-[40px]" />
            <CtaContactUs variant="ghost" position="hero-mobile" icon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
