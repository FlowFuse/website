<script setup lang="ts">
// "The Problem Today" from layouts/industry.njk. `problemTitle` overrides the default
// heading on the one page that sets it.
import { renderRichText } from '../../lib/rich-text.mjs'

defineProps<{
    problems: string[]
    image: string
    title?: string
    industry: string
}>()
</script>

<template>
  <div class="w-full py-16 sm:py-24 px-6 bg-white">
    <div class="max-w-screen-lg mx-auto">
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="md:w-1/2">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 v-if="title" class="max-md:text-center" v-html="renderRichText(title)" />
          <h2 v-else class="max-md:text-center"><span class="text-red-600">The Problem</span> Today</h2>
          <ul class="mt-6 flex flex-col gap-6 list-none p-0 m-0">
            <li v-for="problem in problems" :key="problem" class="flex items-start gap-3">
              <span class="flex-shrink-0 w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-white">
                <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
              </span>
              <p class="text-gray-700 m-0 pt-2">{{ problem }}</p>
            </li>
          </ul>
        </div>
        <div class="md:w-1/2 flex justify-center md:order-first">
          <img :src="image" :alt="`Diagram of the problems ${industry} teams face today`" class="max-w-full h-auto">
        </div>
      </div>
    </div>
  </div>
</template>
