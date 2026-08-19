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
const canonicalUrl = computed(() => `https://flowfuse.com${route.path}`)

// Nested pages get the "Handbook" qualifier on the brand name; the section root
// doesn't (its own title already says "Handbook"). og:title infers from the
// resolved title. Needs an explicit high tagPriority in its own useHead call —
// nuxt-seo-utils pushes its own global siteName with tagPriority: 'low', and that
// otherwise wins over a page-level override regardless of registration order.
useHead({
    templateParams: { siteName: () => slugParts.value.length ? 'FlowFuse Handbook' : 'FlowFuse' },
}, { tagPriority: 1000 })

useSeoMeta({
    title: pageTitle,
    description: computed(() => page.value?.description || ''),
    ogDescription: computed(() => page.value?.description || ''),
    ogUrl: canonicalUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

const { data: navTree } = await useHandbookNav()

const githubEditUrl = computed(() => {
    const stem = page.value?.stem || `handbook/${slugParts.value.join('/')}`
    return `https://github.com/FlowFuse/website/edit/main/nuxt/content/${stem}.md`
})

const breadcrumbItems = computed(() => {
    // findPageBreadcrumb excludes the current page unless told otherwise - `current: true`
    // includes it so it can be the last, unlinked crumb below.
    const crumbs = findPageBreadcrumb(navTree.value ?? [], route.path, { current: true })
    return crumbs.map((crumb, i) => ({
        label: crumb.title ?? '',
        ...(i === crumbs.length - 1 ? {} : { to: crumb.path }),
    }))
})

useSchemaOrg([
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
  <div class="light w-full pl-6">
    <div class="handbook ff-prose text-left pb-24 m-auto">

      <!-- Left navigation -->
      <HandbookLeftNav />

      <!-- Main content area -->
      <div class="px-10 pt-8">
        <div class="w-full">
          <!-- Breadcrumbs + Search bar -->
          <div class="font-medium pb-1 flex flex-col gap-1">
            <div class="md:flex-1">
              <Breadcrumbs :items="breadcrumbItems" />
            </div>
            <div class="w-full mb-1">
              <HandbookSearch />
            </div>
          </div>
        </div>

        <!-- Page content -->
        <div class="w-full">
          <div class="order-last md:order-first">
            <div class="mt-6 mb-4 prose prose-blue main-content handbook-content prose-natural-size-images">
              <ContentRenderer v-if="page" :value="page" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right sidebar: TOC -->
      <div class="lg right-nav">
        <div class="sticky top-20 w-full mt-4 md:mt-6 px-8">
          <HandbookToc :links="page?.body?.toc?.links" />
          <div class="text-xs pb-1 text-right mb-4 italic max-lg:hidden">
            <a :href="githubEditUrl" target="_blank" rel="noopener">Edit this page</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
