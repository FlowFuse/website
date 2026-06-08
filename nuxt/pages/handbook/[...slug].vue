<script setup lang="ts">
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

// Build breadcrumbs from URL parts
const breadcrumbs = computed(() => {
    const parts = ['handbook', ...slugParts.value]
    let path = ''
    return parts.map(part => {
        path += '/' + part
        return { name: part, path }
    })
})

useSchemaOrg([
    // Exclude the last crumb (current page) — nuxt-schema-org appends it automatically
    defineBreadcrumb({
        itemListElement: breadcrumbs.value.slice(0, -1).map(crumb => ({
            name: crumb.name,
            item: crumb.path,
        })),
    }),
    defineArticle({
        headline: pageTitle,
        description: computed(() => page.value?.description || ''),
        author: [{ name: 'FlowFuse', url: 'https://flowfuse.com' }],
    }),
])

defineOgImageComponent('Default', {
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
          <div class="font-medium border-b pb-1 flex flex-col gap-1">
            <div class="md:flex-1">
              <nav aria-label="Breadcrumb" class="text-sm text-gray-500">
                <span v-for="(crumb, i) in breadcrumbs" :key="crumb.path">
                  <NuxtLink v-if="i < breadcrumbs.length - 1"
                    :href="crumb.path"
                    class="hover:text-indigo-600 capitalize">{{ crumb.name }}</NuxtLink>
                  <span v-else class="capitalize text-gray-700">{{ crumb.name }}</span>
                  <span v-if="i < breadcrumbs.length - 1" class="mx-1">/</span>
                </span>
              </nav>
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
      <div class="lg:border-l right-nav">
        <div class="sticky top-20 w-full mt-4 md:mt-6 px-8">
          <HandbookToc />
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
