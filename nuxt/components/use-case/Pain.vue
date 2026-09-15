<script setup lang="ts">
// "01 Customer pain" from layouts/use-case.njk.
// The .njk pulled card icons with {% include "components/icons/<name>.svg" %}; the same
// glyphs come from the icon sets already installed here, mapped in useCaseIcon().
defineProps<{
    block: {
        heading: string
        intro?: string[]
        cards?: Array<{ icon?: string, title: string, detail: string }>
    }
}>()
</script>

<template>
  <div id="customer-pain" class="w-full py-16 sm:py-24 px-6 bg-white scroll-mt-16">
    <div class="max-w-screen-lg mx-auto">
      <p class="uppercase text-xs font-semibold text-indigo-400 mb-2">01 · Customer pain</p>
      <h2 class="max-md:text-center"><span class="text-red-600">{{ block.heading }}</span></h2>
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <p v-for="(paragraph, i) in block.intro" :key="i" class="text-gray-600 m-0">{{ paragraph }}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        <div v-for="card in block.cards" :key="card.title" class="rounded-xl bg-gray-50 border border-gray-200 p-6 flex flex-col gap-3">
          <div class="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-red-500">
            <UIcon :name="useCaseIcon(card.icon)" class="w-5 h-5" />
          </div>
          <h4 class="m-0 text-gray-800">{{ card.title }}</h4>
          <p class="m-0 text-gray-600 text-sm">{{ card.detail }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
