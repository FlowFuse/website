<script setup lang="ts">
import { useDocsNavTree, findDocsBreadcrumb, findDocsSurround } from '~/composables/useDocsNav'
import { docsPageTitle } from '~/lib/docs-page-title.mjs'

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

// The order is asserted in nuxt/lib/docs-page-title.mjs, which explains why it is that
// order. It decides the <title> of every page under /docs and getting it wrong shows up
// nowhere except in the rendered title, so it is not left inline as a bare expression.
const pageTitle = computed(() => docsPageTitle(page.value, slugParts.value))

// Empty on most docs pages: only the ones a catalog feature names as its docsLink get badges.
const plans = useDocsPlans(contentPath)

// A contents page such as the docs home lays itself out from its own components, so it
// gets the full width: no sidebar, no table of contents, no previous and next cards.
const isLanding = computed(() => (page.value as { landing?: boolean } | null)?.landing === true)

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
  <!-- Not wrapped in .prose: every block on a landing page is a component that styles
       itself, and Tailwind Typography's unlayered rules would fight them. -->
  <div v-if="isLanding" class="ff-docs-landing w-full max-w-6xl mx-auto px-6 lg:px-10 pt-8 pb-24 text-left">
    <!-- The docs home has no trail to show: it would be the single word Docs. -->
    <Breadcrumbs v-if="slugParts.length" :items="breadcrumbItems" />
    <ContentRenderer v-if="page" :value="page" />
  </div>

  <!-- lg:pr-6 mirrors the header's own padding, so the two centre alike and the sidebar
       search lines up under the logo at every width (with pl-6 alone they parted by 12px
       between 1280 and 1536, where both stop at the same max width). -->
  <div v-else class="w-full pl-6 lg:pr-6">
    <div class="handbook ff-prose text-left pb-24 m-auto">

      <!-- Left navigation -->
      <DocsLeftNav />

      <!-- Main content area -->
      <div class="px-10 pt-8">
        <div class="w-full">
          <!-- Breadcrumbs -->
          <div class="font-medium pb-1 flex flex-col gap-1">
            <div class="md:flex-1">
              <Breadcrumbs :items="breadcrumbItems" />
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
        <!-- On wide screens the column never runs past the bottom of the window: a long table
             of contents scrolls inside itself, so the lines under it stay in view.
             "On this page" lines up with the sidebar's search text and the breadcrumb: the
             column starts where the search field does (mt-6), and pt-2.5 is half of the
             field's 40px less one 20px line. -->
        <div class="sticky top-20 w-full mt-4 md:mt-6 px-8 lg:flex lg:flex-col lg:max-h-[calc(100vh-7.5rem)]">
          <HandbookToc :links="page?.body?.toc?.links" :ui="{ root: 'lg:min-h-0', container: 'lg:pt-2.5' }" />
          <div v-if="page?.updated" class="text-xs pb-1 text-right mt-4 text-gray-500 max-lg:hidden shrink-0">
            Updated: <RelativeTime :value="page.updated" />
          </div>
          <ClientOnly>
            <div v-if="editHref" class="text-xs pb-1 text-right italic max-lg:hidden shrink-0">
              <a :href="editHref" target="_blank" rel="noopener">Edit this page</a>
            </div>
          </ClientOnly>
        </div>
      </div>

    </div>
  </div>
</template>
