<script setup lang="ts">
// "06 Build it with AI" from layouts/use-case.njk. The .njk wrote its CTA as a raw
// <a class="ff-btn"> with an inline capture() call; this keeps the same event name and
// props but routes it through useCapture like every other Nuxt CTA.
const props = defineProps<{
    block: {
        heading?: string
        intro?: string
        steps?: Array<{ title: string, detail: string }>
        note?: string
    }
    slug: string
}>()

const capture = useCapture()

function ordinal(index: number) {
    return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <div id="ai-build-layer" class="w-full py-16 sm:py-24 px-6 bg-gray-50 border-y border-gray-100 scroll-mt-16">
    <div class="max-w-screen-lg mx-auto">
      <p class="uppercase text-xs font-semibold text-indigo-400 mb-2">06 · Build it with AI</p>
      <h2 class="max-md:text-center">{{ block.heading || 'From described to deployed, with the FlowFuse Expert' }}</h2>
      <p v-if="block.intro" class="mt-4 max-w-3xl text-gray-600">{{ block.intro }}</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div v-for="(step, i) in block.steps" :key="step.title" class="rounded-xl bg-white border border-gray-200 p-6 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-indigo-500" />
            <span class="text-indigo-500 text-xs font-semibold uppercase tracking-widest">Step {{ ordinal(i) }}</span>
          </div>
          <h4 class="m-0 text-gray-800">{{ step.title }}</h4>
          <p class="m-0 text-gray-600 text-sm">{{ step.detail }}</p>
        </div>
      </div>
      <div class="mt-10 flex">
        <NuxtLink
            class="ff-btn ff-btn--primary-outlined uppercase"
            to="/ai/"
            @click="capture('cta-ai', { position: 'use-case-ai-build-layer', page: props.slug })"
        >Get started with the Expert</NuxtLink>
      </div>
      <p v-if="block.note" class="mt-8 text-sm text-gray-400">{{ block.note }}</p>
    </div>
  </div>
</template>
