<script setup lang="ts">
definePageMeta({ layout: 'bestpractice' })

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
  <!-- The guide nav is in the layout, so it is present on every page in the section. -->
  <div id="bp-content" class="bp-main">
    <div class="bp-hero">
      <p class="bp-hero-guide">{{ guide?.title }}</p>
      <h1 class="bp-title">{{ page?.title }}</h1>
      <p v-if="page?.blurb" class="bp-subtitle">{{ page.blurb }}</p>
    </div>

    <div class="bp-body">
      <GuideBlocks :blocks="(page?.blocks ?? []) as any" />

      <nav class="bp-paging">
        <NuxtLink v-if="previous" :to="previous.path">← {{ previous.title }}</NuxtLink>
        <span v-else />
        <NuxtLink v-if="next" :to="next.path">{{ next.title }} →</NuxtLink>
      </nav>
    </div>
  </div>
</template>
