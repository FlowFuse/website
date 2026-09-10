<script setup lang="ts">
// Ported from src/industries.njk (11ty), which this replaces. Same page, same copy, same
// classes from src/css/style.css.
//
// What the port changes on purpose:
//  - collections["industry"] becomes the `industries` data collection plus the one
//    hand-written page. src/industries/industries.json tagged every file in that
//    directory, so automotive.njk was on the listing too even though it used its own
//    layout; AUTOMOTIVE below keeps it there.
//  - The CTA macros become <CtaContactUs> and <CtaSignUp>.
const { data: industries } = await useAsyncData('industries-listing', () =>
    queryCollection('industries').select('slug', 'seoMeta', 'hero').all()
)

// /industries/automotive/ is a hand-written page, not a collection entry, so its card
// copy is declared here. It reads from the same fields the collection cards use.
const AUTOMOTIVE = {
    slug: 'automotive',
    title: 'Automotive Manufacturing Applications | FlowFuse',
    description: 'Connect PLCs, SCADA, MES, and plant IT systems in one place. FlowFuse helps teams monitor, automate, and standardize production workflows across plants in real time.',
    image: '/images/industries/automotive.jpg',
    imageAlt: 'Aerial view of an automotive manufacturing plant floor',
}

// The .njk stripped the brand suffix off meta.title for the card heading.
function cardTitle(title: string) {
    return title.replace(' | FlowFuse', '').replace('| FlowFuse', '')
}

const cards = computed(() => {
    const fromCollection = (industries.value || []).map(industry => ({
        slug: industry.slug,
        title: industry.seoMeta.title,
        description: industry.seoMeta.description,
        image: industry.hero?.image,
        imageAlt: industry.hero?.imageAlt,
    }))
    // `| sort(false, true, "data.meta.title")`: case-insensitive, ascending.
    return [...fromCollection, AUTOMOTIVE]
        .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
})

useSeoMeta({
    title: 'Industries',
    description: 'FlowFuse helps industrial teams connect, automate, and standardize operations across sectors. Explore how FlowFuse is applied in your industry.',
    ogUrl: 'https://flowfuse.com/industries/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full">
    <div class="w-full px-6 bg-[radial-gradient(ellipse_120%_140%_at_50%_-20%,theme(colors.indigo.50)_0%,theme(colors.white)_60%)]">
      <div class="max-w-screen-lg mx-auto py-16 sm:py-24 text-center">
        <p class="uppercase text-sm font-semibold text-indigo-500 mb-4">Industries</p>
        <h1 class="m-auto max-w-3xl font-medium">Built for the way <span class="text-indigo-600">your industry</span> operates</h1>
        <p class="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          FlowFuse meets manufacturers where they are, connecting OT and IT systems, automating workflows, and
          standardizing operations across every site.
        </p>
        <div class="mt-10 flex flex-wrap gap-4 justify-center">
          <CtaContactUs variant="highlight" position="hero" class="min-h-[40px]" />
        </div>
      </div>
    </div>

    <div class="w-full py-16 sm:py-24 px-6 bg-white">
      <div class="max-w-screen-lg mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
              v-for="card in cards"
              :key="card.slug"
              :to="`/industries/${card.slug}/`"
              class="group hover:no-underline flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div v-if="card.image" class="aspect-[16/9] w-full ff-image-cover bg-gray-100">
              <img :src="card.image" :alt="card.imageAlt || cardTitle(card.title)" width="560" loading="lazy" class="w-full h-auto">
            </div>
            <div class="flex flex-col gap-3 p-6">
              <h3 class="m-0 text-gray-800 group-hover:text-indigo-600 transition-colors">{{ cardTitle(card.title) }}</h3>
              <p class="m-0 text-gray-600 text-sm flex-grow">{{ card.description }}</p>
              <span class="mt-2 text-indigo-600 text-sm font-semibold flex items-center gap-2">
                View industry
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="w-full px-6 py-20">
      <div class="ff-blue-card max-md:max-w-xl md:max-w-screen-lg mx-auto pt-12 pb-10 text-center">
        <h3 class="mb-4 w-full text-center">See it in your plant</h3>
        <p class="text-gray-600 mb-8 max-w-xl mx-auto text-center">Talk to an expert, or get started with FlowFuse today.</p>
        <div class="flex flex-wrap gap-4 justify-center">
          <CtaContactUs variant="highlight" position="footer" class="min-h-[40px]" />
          <CtaSignUp variant="primary-outlined" position="footer" class="min-h-[40px]" />
        </div>
      </div>
    </div>
  </div>
</template>
