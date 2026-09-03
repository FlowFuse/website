<script setup lang="ts">
import { useDocsNavTree, findDocsBreadcrumb } from '~/composables/useDocsNav'

definePageMeta({ layout: 'default' })

const route = useRoute()
const slugParts = computed(() =>
    Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug].filter(Boolean)
)
const contentPath = computed(() =>
    slugParts.value.length ? `/docs/${slugParts.value.join('/')}` : '/docs'
)

const { data: page } = await useAsyncData(
    () => `docs-${contentPath.value}`,
    () => queryCollection('docs').path(contentPath.value).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// No redirect handling here: modules/docs-source.ts turns `layout: redirect` frontmatter
// into a Nitro route rule at build time, so those URLs never reach this component. Doing it
// here meant the prerenderer wrote a `<meta http-equiv="refresh">` stub served with a 200
// instead of a 301.

const pageTitle = computed(() => page.value?.navTitle || page.value?.title || slugParts.value.at(-1) || 'Documentation')

// Empty on most docs pages: only the ones a catalog feature names as its docsLink get badges.
const plans = useDocsPlans(contentPath)

useHead({
    title: pageTitle,
    meta: [
        { name: 'description', content: computed(() => (page.value as any)?.meta?.description || '') },
    ],
})
useHead({
    templateParams: { siteName: () => slugParts.value.length ? 'FlowFuse Docs' : 'FlowFuse' },
}, { tagPriority: 1000 })

// Same key+handler DocsLeftNav uses, so useAsyncData dedupes into one fetch per request.
const { data: navGroups } = await useDocsNavTree()

const breadcrumbItems = computed(() => {
    const crumbs = findDocsBreadcrumb(navGroups.value ?? [], route.path)
    const withRoot = [{ title: 'Docs', path: '/docs' }, ...crumbs]
    return withRoot.map((crumb, i) => ({
        label: crumb.title,
        ...(i === withRoot.length - 1 ? {} : { to: crumb.path }),
    }))
})
</script>

<template>
  <div class="w-full pl-6">
    <div class="handbook ff-prose text-left pb-24 m-auto">

      <!-- Left navigation -->
      <DocsLeftNav />

      <!-- Main content area -->
      <div class="px-10 pt-8">
        <div class="w-full">
          <!-- Breadcrumbs + Search bar -->
          <div class="font-medium pb-1 flex flex-col gap-1">
            <div class="md:flex-1">
              <Breadcrumbs :items="breadcrumbItems" />
            </div>
            <div class="w-full mb-1">
              <AlgoliaSearch index-filter="category:docs" placeholder="Search in Docs..." source-id="docs" />
            </div>
          </div>
        </div>

        <!-- Page content -->
        <div class="w-full">
          <div class="order-last md:order-first">
            <div class="mt-6 mb-4 prose prose-blue main-content handbook-content prose-natural-size-images">
              <FeatureTierBadges :plans="plans" />
              <ContentRenderer v-if="page" :value="page" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right sidebar: TOC -->
      <div class="lg right-nav">
        <div class="sticky top-20 w-full mt-4 md:mt-6 px-8">
          <HandbookToc :links="page?.body?.toc?.links" />
          <div v-if="page?.updated" class="text-xs pb-1 text-right mt-4 text-gray-500 max-lg:hidden">
            Updated: <RelativeTime :value="page.updated" />
          </div>
          <ClientOnly>
            <div v-if="page?.originalPath" class="text-xs pb-1 text-right italic max-lg:hidden">
              <a :href="`https://github.com/FlowFuse/flowfuse/edit/main/docs/${page.originalPath}`"
                target="_blank" rel="noopener">Edit this page</a>
            </div>
          </ClientOnly>
        </div>
      </div>

    </div>
  </div>
</template>
