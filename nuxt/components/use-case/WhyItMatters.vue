<script setup lang="ts">
// "03 Why this is important" from layouts/use-case.njk.
defineProps<{
    block: {
        heading: string
        intro?: string
        points?: Array<{ title: string, detail: string }>
    }
}>()

function ordinal(index: number) {
    return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <div id="why-it-matters" class="w-full bg-[radial-gradient(ellipse_120%_120%_at_50%_120%,theme(colors.indigo.600)_0%,theme(colors.indigo.900)_100%)] py-16 sm:py-24 px-6 scroll-mt-16">
    <div class="max-w-screen-lg mx-auto">
      <p class="uppercase text-xs font-semibold text-indigo-300 mb-2">03 · Why this is important</p>
      <h2 class="text-white max-md:text-center">{{ block.heading }}</h2>
      <p v-if="block.intro" class="mt-4 max-w-3xl text-indigo-100 font-light">{{ block.intro }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div v-for="(point, i) in block.points" :key="point.title" class="rounded-xl border border-indigo-400/40 bg-indigo-950/30 p-6 flex gap-4">
          <span class="text-indigo-300 text-2xl font-semibold leading-none">{{ ordinal(i) }}</span>
          <div>
            <h4 class="text-white m-0">{{ point.title }}</h4>
            <p class="text-indigo-100 font-light m-0 mt-1 text-sm">{{ point.detail }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
