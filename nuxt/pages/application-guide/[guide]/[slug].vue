<script setup lang="ts">
// Docs-conformant Application Guide page: markdown rendered via ContentRenderer
// inside the docs .ff-prose frame, exactly like /docs.
definePageMeta({ layout: 'default' })

const route = useRoute()
const guideId = computed(() => String(route.params.guide))
const slug = computed(() => String(route.params.slug))
const guide = computed(() => guideById(guideId.value))

const contentPath = computed(() => `/application-guide/${guideId.value}/${slug.value}`)
const { data: mdPage } = await useAsyncData(
    () => `agmd-${guideId.value}-${slug.value}`,
    () => queryCollection('applicationGuideDoc').path(contentPath.value).first(),
    { watch: [guideId, slug] },
)

if (!mdPage.value || !guide.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const title = computed(() => (mdPage.value as any)?.title || slug.value)
const blurb = computed(() => (mdPage.value as any)?.blurb || guide.value?.tagline || '')

const { data: pages } = await useApplicationGuidePages()
const navItems = computed(() => applicationGuideNavItems(pages.value, route.path))
const breadcrumbItems = computed(() => findGuideBreadcrumb(pages.value, route.path))

const siblings = computed(() => pagesForGuide(pages.value, guideId.value))
const currentIndex = computed(() => siblings.value.findIndex(e => e.slug === slug.value))
const previous = computed(() => currentIndex.value > 0 ? siblings.value[currentIndex.value - 1] : null)
const next = computed(() => currentIndex.value > -1 && currentIndex.value < siblings.value.length - 1 ? siblings.value[currentIndex.value + 1] : null)

const baseTitle = computed(() => `${title.value} • ${guide.value?.title}`)

// Guide pages always get the "Application Guide" qualifier on the brand name.
// og:title infers from the resolved title. Needs an explicit high tagPriority in
// its own useHead call — nuxt-seo-utils pushes its own global siteName with
// tagPriority: 'low', and that otherwise wins over a page-level override
// regardless of registration order.
useHead({ templateParams: { siteName: 'FlowFuse Application Guide' } }, { tagPriority: 1000 })

useSeoMeta({
    title: baseTitle,
    description: blurb,
    ogDescription: blurb,
    ogUrl: computed(() => `https://flowfuse.com${route.path}`),
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})
defineOgImage('Default', { title: title.value, section: guide.value?.title ?? 'FlowFuse Application Guide' })
</script>

<template>
  <div class="w-full pl-6">
    <div class="handbook ff-prose text-left pb-24 m-auto">

      <SidebarNav :items="navItems" />

      <div class="px-10 pt-8">
        <div class="w-full font-medium pb-1">
          <Breadcrumbs :items="breadcrumbItems" />
        </div>

        <div class="w-full">
          <div class="mt-6 mb-4 prose prose-blue main-content handbook-content">

            <ContentRenderer :value="mdPage" />

            <nav class="mt-10 pt-6 border-t border-gray-200 flex justify-between gap-4">
              <NuxtLink v-if="previous" :to="previous.path" class="font-semibold text-[color:var(--ui-primary)] no-underline hover:underline">← {{ previous.title }}</NuxtLink>
              <span v-else />
              <NuxtLink v-if="next" :to="next.path" class="font-semibold text-[color:var(--ui-primary)] no-underline hover:underline">{{ next.title }} →</NuxtLink>
            </nav>
          </div>
        </div>
      </div>

      <!-- Guided experience: no per-page TOC — the reclaimed column gives the
           diagrams room to break out wider (see .ag-diagram in FlowDiagram.vue). -->
      <div class="lg right-nav"></div>

    </div>
  </div>
</template>
