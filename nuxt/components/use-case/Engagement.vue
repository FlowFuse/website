<script setup lang="ts">
// "07 How we work with you": the solution-page pitch for building the first system with
// the customer and handing it over. Not in layouts/use-case.njk; it sits last, ahead of
// the closing CTA, so the numbered blocks before it keep their existing labels.
defineProps<{
    block: {
        heading: string
        intro?: string
        steps?: Array<{ title: string, detail: string }>
        keepHeading?: string
        keep?: Array<{ title: string, detail: string }>
    }
}>()

function ordinal(index: number) {
    return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <div id="engagement" class="w-full py-16 sm:py-24 px-6 bg-white scroll-mt-16">
    <div class="max-w-screen-lg mx-auto">
      <p class="uppercase text-xs font-semibold text-indigo-400 mb-2">07 · How we work with you</p>
      <h2 class="max-md:text-center">{{ block.heading }}</h2>
      <p v-if="block.intro" class="mt-4 max-w-3xl text-gray-600">{{ block.intro }}</p>
      <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12 list-none m-0 p-0">
        <li v-for="(step, i) in block.steps" :key="step.title" class="rounded-xl bg-white border border-gray-200 border-l-4 border-l-indigo-500 p-5 flex flex-col gap-2">
          <span class="text-indigo-500 text-xs font-semibold uppercase tracking-widest">Step {{ ordinal(i) }}</span>
          <h4 class="m-0 text-gray-800">{{ step.title }}</h4>
          <p class="m-0 text-gray-600 text-sm">{{ step.detail }}</p>
        </li>
      </ol>
      <div v-if="block.keep?.length" class="mt-10 rounded-xl bg-indigo-50 border border-indigo-100 p-6 sm:p-8">
        <h3 class="m-0 text-indigo-700">{{ block.keepHeading || 'What you keep' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
          <div v-for="item in block.keep" :key="item.title" class="flex items-start gap-3">
            <UIcon name="i-heroicons-check-circle" class="flex-shrink-0 w-6 h-6 text-indigo-500 mt-0.5" />
            <div>
              <h5 class="m-0 text-gray-800">{{ item.title }}</h5>
              <p class="m-0 mt-1 text-gray-600 text-sm">{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
