<script setup lang="ts">
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

// Handle redirect pages
if (page.value.layout === 'redirect' && page.value.redirect?.to) {
    await navigateTo(page.value.redirect.to, { redirectCode: 301 })
}

const pageTitle = computed(() => page.value?.navTitle || page.value?.title || slugParts.value.at(-1) || 'Documentation')

useHead({
    title: computed(() => slugParts.value.length ? `${pageTitle.value} • FlowFuse Docs` : 'FlowFuse Documentation'),
    meta: [
        { name: 'description', content: computed(() => (page.value as any)?.meta?.description || '') },
    ],
})

const breadcrumbs = computed(() => {
    const parts = ['docs', ...slugParts.value]
    let path = ''
    return parts.map(part => {
        path += '/' + part
        return { name: part, path }
    })
})
</script>

<template>
  <div class="w-full pl-6 bg-white/50">
    <div class="handbook ff-prose text-left pb-24 m-auto">

      <!-- Left navigation -->
      <DocsLeftNav />

      <!-- Main content area -->
      <div class="px-10 pt-8">
        <div class="w-full">
          <!-- Breadcrumbs -->
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
          <div v-if="page?.updated" class="text-xs pb-1 text-right mt-4 text-gray-500 max-lg:hidden">
            Updated: {{ page.updated }}
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
