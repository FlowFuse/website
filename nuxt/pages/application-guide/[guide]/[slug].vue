<script setup lang="ts">
definePageMeta({ layout: 'application-guide' })

const route = useRoute()
const guideId = computed(() => String(route.params.guide))
const slug = computed(() => String(route.params.slug))

const guide = computed(() => guideById(guideId.value))

const { data: pages } = await useApplicationGuidePages()

const { data: page } = await useAsyncData(
    () => `application-guide-${guideId.value}-${slug.value}`,
    async () => {
        const all = await queryCollection('applicationGuide').all()
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

const fullTitle = computed(() => `${page.value?.title} • ${guide.value?.title} • FlowFuse Application Guide`)
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
    title: page.value?.title ?? 'FlowFuse Application Guide',
    section: guide.value?.title ?? 'FlowFuse Application Guide',
})
</script>

<template>
  <!-- The guide nav is in the layout, so it is present on every page in the section. -->
  <div id="ag-content" class="ag-main">
    <div class="ag-hero">
      <p class="ag-hero-guide">{{ guide?.title }}</p>
      <h1 class="ag-title">{{ page?.title }}</h1>
      <p v-if="page?.blurb" class="ag-subtitle">{{ page.blurb }}</p>
    </div>

    <div class="ag-body">
      <GuideBlocks :blocks="(page?.blocks ?? []) as any" />

      <nav class="ag-paging">
        <NuxtLink v-if="previous" :to="previous.path">← {{ previous.title }}</NuxtLink>
        <span v-else />
        <NuxtLink v-if="next" :to="next.path">{{ next.title }} →</NuxtLink>
      </nav>
    </div>
  </div>
</template>
