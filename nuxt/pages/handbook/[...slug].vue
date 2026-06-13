<script setup lang="ts">
import { findPageBreadcrumb } from '@nuxt/content/utils'

definePageMeta({ layout: 'default' })

const route = useRoute()
const slugParts = computed(() =>
    Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug].filter(Boolean)
)
const contentPath = computed(() =>
    slugParts.value.length ? `/handbook/${slugParts.value.join('/')}` : '/handbook'
)

const { data: page } = await useAsyncData(
    () => `handbook-${contentPath.value}`,
    () => queryCollection('handbook').path(contentPath.value).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const pageTitle = computed(() => page.value?.title || slugParts.value.at(-1) || 'Handbook')
const fullTitle = computed(() => slugParts.value.length ? `${pageTitle.value} • FlowFuse Handbook` : 'FlowFuse Handbook')
const canonicalUrl = computed(() => `https://flowfuse.com${route.path}`)

useSeoMeta({
    title: fullTitle,
    description: computed(() => page.value?.description || ''),
    ogTitle: fullTitle,
    ogDescription: computed(() => page.value?.description || ''),
    ogUrl: canonicalUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

const { data: navTree } = await useHandbookNav()

useSchemaOrg([
    // Exclude the last crumb (current page) — nuxt-schema-org appends it automatically
    defineBreadcrumb({
        itemListElement: findPageBreadcrumb(navTree.value ?? [], route.path)
            .slice(0, -1)
            .map(crumb => ({ name: crumb.title, item: crumb.path })),
    }),
    defineArticle({
        headline: pageTitle,
        description: computed(() => page.value?.description || ''),
        author: [{ name: 'FlowFuse', url: 'https://flowfuse.com' }],
    }),
])

defineOgImage('Default', {
    title: pageTitle.value,
    section: 'Handbook',
})
</script>

<template>
  <div class="w-full pl-6 bg-white/50">
    <div class="handbook ff-prose text-left pb-24 m-auto">

      <!-- Left navigation -->
      <HandbookLeftNav />

      <!-- Main content area -->
      <div class="px-10 pt-8">
        <div class="w-full">
          <!-- Breadcrumbs + Search bar -->
          <div class="font-medium pb-1 flex flex-col gap-1">
            <div class="md:flex-1">
              <HandbookBreadcrumbs />
            </div>
            <div class="w-full mb-1">
              <HandbookSearch />
            </div>
          </div>
        </div>

        <!-- Page content -->
        <div class="w-full">
          <div class="order-last md:order-first">
            <div class="mt-6 mb-4 prose prose-blue main-content handbook-content">
              <ContentRenderer v-if="page" :value="page" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right sidebar: TOC -->
      <div class="lg right-nav">
        <div class="sticky top-20 w-full mt-4 md:mt-6 px-8">
          <HandbookToc :links="page?.body?.toc?.links" />
          <ClientOnly>
            <div class="text-xs pb-1 text-right mb-4 italic max-lg:hidden">
              <a :href="`/_studio?redirect=${encodeURIComponent(route.path)}`" target="_blank" rel="noopener">Edit this page</a>
            </div>
          </ClientOnly>
        </div>
      </div>

    </div>
  </div>
</template>
