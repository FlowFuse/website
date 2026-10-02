<script setup lang="ts">
// Every use-case hero, one `layout` per look:
//  - centered: the operational pages' band (ported from layouts/use-case.njk).
//  - split: copy left, art right; SCADA, MES and UNS, which shared it verbatim.
//  - pictogram: a centred title over a pictogram beside the text (layouts/solution.njk).
//  - feature: copy left, a framed photo right, an optional quote under both, all under
//    one indigo glow from the top-right corner (remote-device-management).
// `heading` and `text` fall back to the page's own title and problem, which is what the
// operational pages show.

type Image = { src: string, alt: string, width?: number }

const props = defineProps<{
    hero: {
        layout: 'centered' | 'split' | 'pictogram' | 'feature'
        eyebrow?: string
        heading?: string
        subtitle?: string
        text?: string
        image?: Image
        ctas?: Array<Record<string, unknown>>
        quote?: { text: string, author: string, role?: string, avatar?: string }
    }
    title: string
    problem?: string
}>()

// The centered band shows the page title in the indigo accent, as layouts/use-case.njk did.
const heading = computed(() => {
    if (props.hero.heading) return props.hero.heading
    return props.hero.layout === 'centered' ? `<span class="text-indigo-600">${props.title}</span>` : props.title
})
const text = computed(() => props.hero.text || props.problem)
const ctas = computed(() => props.hero.ctas || [{ cta: 'book-demo' }])
const maxWidth = (image?: Image) => image?.width ? `${image.width}px` : undefined
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="hero.layout === 'centered'" class="w-full px-6 bg-[radial-gradient(ellipse_120%_140%_at_50%_-20%,theme(colors.indigo.50)_0%,theme(colors.white)_60%)]">
    <div class="max-w-screen-lg mx-auto py-16 sm:py-24 text-center">
      <p class="uppercase text-sm font-semibold text-indigo-500 mb-4">{{ hero.eyebrow || 'Use case' }}</p>
      <h1 class="m-auto max-w-3xl font-medium" v-html="heading" />
      <p v-if="text" class="mt-6 max-w-2xl mx-auto text-lg text-gray-600" v-html="text" />
      <div class="mt-10 flex flex-wrap gap-4 justify-center">
        <ActionButtons :ctas="ctas" position="hero" />
      </div>
    </div>
  </div>

  <div v-else-if="hero.layout === 'split'" class="w-full px-6 pt-12 pb-20 md:pt-6 md:pb-8">
    <div class="md:flex md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8">
      <div class="my-auto max-md:mx-auto md:w-1/2 lg:w-5/12 max-w-lg">
        <h1 class="w-full mt-0 md:px-0 m-auto font-medium" v-html="heading" />
        <p class="mb-10" v-html="text" />
        <div v-if="hero.image" class="flex md:hidden justify-center m-auto max-w-[400px] mb-10">
          <img :src="hero.image.src" :alt="hero.image.alt" width="400" class="w-full h-auto">
        </div>
        <div class="flex gap-3 max-md:max-w-sm max-md:mx-auto max-sm:flex-col max-md:justify-center">
          <ActionButtons :ctas="ctas" position="hero" />
        </div>
      </div>
      <div v-if="hero.image" class="flex max-md:hidden justify-center m-auto" :style="{ maxWidth: maxWidth(hero.image) }">
        <img :src="hero.image.src" :alt="hero.image.alt" :width="hero.image.width" class="w-full h-auto">
      </div>
    </div>
  </div>

  <div v-else-if="hero.layout === 'pictogram'" class="page w-full px-6 mt-12 md:px-0">
    <div class="hero container m-auto text-center max-w-screen-md">
      <h1 class="px-12 md:px-0 m-auto" v-html="heading" />
      <h4 v-if="hero.subtitle" class="mt-4 text-indigo-400">{{ hero.subtitle }}</h4>
      <div class="flex items-center gap-6 mt-6">
        <div v-if="hero.image" class="hidden sm:block w-64 flex-shrink-0">
          <img :src="hero.image.src" :alt="hero.image.alt" width="250" class="w-full h-auto">
        </div>
        <div class="flex flex-col justify-center text-center sm:text-left py-2">
          <p class="mt-0" v-html="text" />
        </div>
      </div>
    </div>
    <div class="mt-6 flex flex-wrap gap-8 justify-center">
      <ActionButtons :ctas="ctas" position="hero" />
    </div>
  </div>

  <div v-else class="w-full px-6 bg-[radial-gradient(ellipse_65%_80%_at_100%_0%,theme(colors.indigo.100)_0%,theme(colors.indigo.50/0)_100%)]">
    <section class="max-w-screen-lg mx-auto pt-16 md:pt-32 grid md:grid-cols-2 gap-12 items-center">
      <div class="text-center md:text-left">
        <h1 class="text-4xl md:text-[42px] md:leading-10 font-medium m-0" v-html="heading" />
        <p class="mt-10 text-gray-700 leading-relaxed max-w-md mx-auto md:mx-0" v-html="text" />
        <div class="mt-12 flex flex-row flex-wrap gap-4 items-center justify-center md:justify-start">
          <ActionButtons :ctas="ctas" position="hero" />
        </div>
      </div>
      <div v-if="hero.image" class="rounded-xl border-2 border-red-100 overflow-hidden shadow-[20px_20px_40px_0_rgba(0,0,0,0.25)] aspect-[3/2]">
        <img :src="hero.image.src" :alt="hero.image.alt" width="1082" height="722" class="w-full h-full object-cover" loading="eager">
      </div>
    </section>
    <div v-if="hero.quote" class="max-w-screen-lg mx-auto pt-16">
      <QuoteBlock :quote="hero.quote.text" :author="hero.quote.author" :role="hero.quote.role" :avatar="hero.quote.avatar" />
    </div>
  </div>
</template>
