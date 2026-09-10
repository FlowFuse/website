<script setup lang="ts">
// "What You Get with FlowFuse" from layouts/industry.njk.
import { renderRichText } from '../../lib/rich-text.mjs'

defineProps<{
    solution: {
        title: string
        benefits?: Array<{ svgPath?: string, text: string }>
    }
    image: string
    industry: string
}>()
</script>

<template>
  <div class="w-full bg-[radial-gradient(ellipse_120%_120%_at_50%_120%,theme(colors.indigo.600)_0%,theme(colors.indigo.900)_100%)] py-16 sm:py-24 px-6">
    <div class="max-w-screen-lg mx-auto">
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="md:w-1/2">
          <h2 class="text-white max-md:text-center">{{ solution.title }}</h2>
          <ul class="mt-8 flex flex-col gap-6 list-none p-0 m-0">
            <li v-for="benefit in solution.benefits" :key="benefit.text" class="flex items-start gap-6">
              <span class="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <span class="w-6 h-6"><NavIcon :name="benefit.svgPath" /></span>
              </span>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p class="text-indigo-100 m-0 font-light" v-html="renderRichText(benefit.text)" />
            </li>
          </ul>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <img :src="image" :alt="`Diagram of how FlowFuse solves those problems for ${industry}`" class="max-w-full h-auto">
        </div>
      </div>
    </div>
  </div>
</template>
