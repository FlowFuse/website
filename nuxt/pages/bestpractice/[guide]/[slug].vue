<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const guideId = computed(() => String(route.params.guide))
const slug = computed(() => String(route.params.slug))

const guide = computed(() => guideById(guideId.value))

const { data: pages } = await useBestPracticePages()

const { data: page } = await useAsyncData(
    () => `bestpractice-${guideId.value}-${slug.value}`,
    async () => {
        const all = await queryCollection('bestpractice').all()
        return all.find((entry: Record<string, unknown>) =>
            entry.guide === guideId.value && entry.slug === slug.value
        ) ?? null
    },
    { watch: [guideId, slug] }
)

if (!page.value || !guide.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const siblings = computed(() => pagesForGuide(pages.value, guideId.value))
const currentIndex = computed(() => siblings.value.findIndex(entry => entry.slug === slug.value))
const previous = computed(() => currentIndex.value > 0 ? siblings.value[currentIndex.value - 1] : null)
const next = computed(() =>
    currentIndex.value > -1 && currentIndex.value < siblings.value.length - 1
        ? siblings.value[currentIndex.value + 1]
        : null
)

const fullTitle = computed(() => `${page.value?.title} • ${guide.value?.title} • FlowFuse`)
const description = computed(() => page.value?.blurb || guide.value?.tagline || '')

useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: computed(() => `https://flowfuse.com${route.path}`),
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

defineOgImage('Default', {
    title: page.value?.title ?? 'Best Practice',
    section: guide.value?.title ?? 'Best Practice',
})
</script>

<template>
  <div class="light w-full bg-white">
    <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-6 pb-24 pt-8 lg:flex-row">

      <!-- Left navigation. The section is deliberately not linked from the site nav yet,
           so the FlowFuse logo in the header is the way back out to the rest of the site. -->
      <aside class="w-full shrink-0 lg:sticky lg:top-24 lg:h-fit lg:w-64">
        <GuideLeftNav />
      </aside>

      <div class="min-w-0 flex-1 text-left">
        <p class="m-0 text-sm font-medium text-indigo-600">{{ guide?.title }}</p>
        <h1 class="mt-1 mb-2 text-3xl font-bold text-gray-800">{{ page?.title }}</h1>
        <p v-if="page?.blurb" class="max-w-3xl text-lg text-gray-600">{{ page.blurb }}</p>

        <hr class="my-8 border-gray-200">

        <GuideBlocks :blocks="(page?.blocks ?? []) as any" />

        <!-- Within-guide paging: the only navigation this PR adds -->
        <nav class="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between">
          <NuxtLink v-if="previous" :to="previous.path" class="text-sm font-medium">
            ← {{ previous.title }}
          </NuxtLink>
          <span v-else />
          <NuxtLink v-if="next" :to="next.path" class="text-sm font-medium sm:text-right">
            {{ next.title }} →
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>
