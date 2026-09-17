<script setup lang="ts">
// Ported from src/use-cases.njk (11ty), which this replaces. Same page, same copy, same
// classes from src/css/style.css.
//
// What the port changes on purpose:
//  - collections["use-case"] becomes the `useCases` data collection. Whether an entry
//    lands under "Operational use cases" or "By architecture" still turns on whether it
//    declares `values:`, which is the same test the .njk made.
//  - The repeated card markup becomes <UseCaseCard>, shared with the cross-link band that
//    components/use-case-links.njk used to render.
//  - The CTA macros become <CtaContactUs> and <CtaSignUp>, and the closing band is the
//    shared <UseCaseClosingCta> the use-case pages also end on.
const { data: useCases } = await useAsyncData('use-cases-listing', () =>
    queryCollection('useCases').select('slug', 'title', 'problem', 'values').all()
)

// `| sort(false, true, "data.title")`: case-insensitive, ascending.
const byTitle = (a: { title: string }, b: { title: string }) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())

const operational = computed(() =>
    (useCases.value || []).filter(uc => uc.values?.length).sort(byTitle)
)
const architectures = computed(() =>
    (useCases.value || []).filter(uc => !uc.values?.length).sort(byTitle)
)

useSeoMeta({
    title: 'Use Cases',
    description: 'Generic operational workflow patterns for industrial teams. Turn events into action with FlowFuse. Placeholder skeleton hub.',
    ogUrl: 'https://flowfuse.com/use-cases/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full">
    <div class="w-full px-6 bg-[radial-gradient(ellipse_120%_140%_at_50%_-20%,theme(colors.indigo.50)_0%,theme(colors.white)_60%)]">
      <div class="max-w-screen-lg mx-auto py-16 sm:py-24 text-center">
        <p class="uppercase text-sm font-semibold text-indigo-500 mb-4">Use cases</p>
        <h1 class="m-auto max-w-3xl font-medium">Turn industrial events into <span class="text-indigo-600">action</span></h1>
        <p class="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Operational workflow patterns that follow Event, Decision, Action. Explore how each one is operationalized
          with FlowFuse.
        </p>
        <div class="mt-10 flex flex-wrap gap-4 justify-center">
          <CtaContactUs variant="highlight" position="hero" class="min-h-[40px]" />
        </div>
      </div>
    </div>

    <div class="w-full py-16 sm:py-24 px-6 bg-white">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-md:text-center">Operational <span class="text-indigo-600">use cases</span></h2>
        <p class="mt-4 max-w-3xl text-gray-600">
          Problems operations teams own, and how they are solved with FlowFuse. Each use case is also reachable by
          <NuxtLink to="/industries/">industry</NuxtLink>.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <UseCaseCard
              v-for="uc in operational"
              :key="uc.slug"
              :to="`/use-cases/${uc.slug}/`"
              :title="uc.title"
              :problem="uc.problem"
          />
        </div>
      </div>
    </div>

    <div class="w-full py-16 sm:py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-md:text-center">By <span class="text-indigo-600">architecture</span></h2>
        <p class="mt-4 max-w-3xl text-gray-600">
          How FlowFuse is deployed and where it sits in your stack. Architectures are the technical evaluator's entry
          point; the use cases above are what gets built on them.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <UseCaseCard
              v-for="uc in architectures"
              :key="uc.slug"
              :to="`/use-cases/${uc.slug}/`"
              :title="uc.title"
              :problem="uc.problem"
              label="View architecture"
          />
        </div>
      </div>
    </div>

    <UseCaseClosingCta
        heading="See it on your workflow"
        description="Talk to an expert, or get started with FlowFuse today."
        lead="contact-us"
    />
  </div>
</template>
