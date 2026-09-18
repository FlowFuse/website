<script setup lang="ts">
import { useDocsNavTree, findDocsBreadcrumb, findDocsSurround } from '~/composables/useDocsNav'
import { docsSeo } from '~/lib/docs-seo.mjs'

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

// Empty on most docs pages: only the ones a catalog feature names as its docsLink get badges.
const plans = useDocsPlans(contentPath)

// /docs is assembled from two repos, so "Edit this page" has to point at whichever one
// owns the page. Guides overlaid from this repo carry a ready-made `editUrl` (stamped by
// nuxt/lib/guides-sync.mjs); everything else came from FlowFuse/flowfuse and is addressed
// by its path within that repo's docs/ tree.
const editHref = computed(() => {
    const source = page.value as { editUrl?: string, originalPath?: string } | null
    if (source?.editUrl) return source.editUrl
    return source?.originalPath
        ? `https://github.com/FlowFuse/flowfuse/edit/main/docs/${source.originalPath}`
        : undefined
})

// The heading it returns is docsPageTitle's, so the <title>, og:title and the og-image
// card can never drift apart. The rest of the SEO surface is derived alongside it.
const seo = computed(() => docsSeo(page.value as any, route.path, slugParts.value))

useHead({
    templateParams: { siteName: () => seo.value.siteName },
}, { tagPriority: 1000 })

useSeoMeta({
    // og:title is left out on purpose: it infers from the resolved title, brand suffix
    // and all, so setting it here would only strip the suffix back off.
    title: computed(() => seo.value.heading),
    description: computed(() => seo.value.description),
    ogDescription: computed(() => seo.value.description),
    ogUrl: computed(() => seo.value.canonicalUrl),
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    // TechArticle, not Article: these pages are product documentation, and it is the
    // schema.org subtype for exactly that.
    defineArticle({
        '@type': 'TechArticle',
        headline: computed(() => seo.value.heading),
        description: computed(() => seo.value.description),
        // The git commit date docs-sync stamps on the synced file, when it has one.
        dateModified: computed(() => seo.value.dateModified),
        author: [{ name: 'FlowFuse', url: 'https://flowfuse.com' }],
    }),
])

// Server-side only, like every other defineOgImage call on the site: the tag it writes is
// for crawlers reading the prerendered HTML, so it resolves once per page build.
defineOgImage('Default', seo.value.ogImage)

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

// Previous and next page in sidebar reading order, so a reader finishing a page has
// somewhere to go. Order comes from the same tree the sidebar renders, rather than from
// queryCollectionItemSurroundings, which reads in collection order and would disagree with
// the nav on every page. The group name rides along as the card's description, because the
// sequence runs straight through the manual and the last page of one group leads into the
// first of the next.
const surround = computed(() => {
    const [previous, next] = findDocsSurround(navGroups.value ?? [], route.path)
    return [previous, next].map(entry => entry && ({
        path: entry.path,
        title: entry.title,
        description: entry.group,
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
            <UContentSurround :surround="surround" class="not-prose mb-10" />
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
            <div v-if="editHref" class="text-xs pb-1 text-right italic max-lg:hidden">
              <a :href="editHref" target="_blank" rel="noopener">Edit this page</a>
            </div>
          </ClientOnly>
        </div>
      </div>

    </div>
  </div>
</template>
