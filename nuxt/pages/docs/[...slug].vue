<script setup>
import docsIndex from '~/docs.index.json'

const route = useRoute()

// Map the served URL (trailing slash) to the Content path (no trailing slash).
const contentPath = computed(() => {
    const p = route.path.replace(/\/+$/, '')
    return p === '/docs' || p === '' ? '/docs' : p
})

// Redirect pages (legacy `layout: redirect`) keep their URL but forward.
const meta = docsIndex[route.path] || docsIndex[contentPath.value + '/'] || {}
if (meta.redirect) {
    await navigateTo(meta.redirect, { redirectCode: 302, external: /^https?:/.test(meta.redirect) })
}

const { data: page } = await useAsyncData(`docs-${contentPath.value}`, () =>
    queryCollection('docs').path(contentPath.value).first()
)

if (!page.value && !meta.redirect) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const { data: nav } = await useAsyncData('docs-nav', () =>
    queryCollectionNavigation('docs')
)

const tree = computed(() => {
    const root = nav.value?.find((i) => i.path === '/docs') || nav.value?.[0]
    return root?.children ?? nav.value ?? []
})

const toc = computed(() => page.value?.body?.toc?.links ?? [])

useHead({
    title: `${page.value?.title || 'Documentation'} • FlowFuse Docs`
})
</script>

<template>
  <div class="handbook ff-prose w-full text-left pb-24">
    <div class="mx-auto max-w-screen-xl flex flex-col md:flex-row gap-8 px-6 pt-8">
      <!-- Sidebar navigation -->
      <aside class="md:w-64 md:flex-shrink-0 md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-6rem)] md:overflow-y-auto text-sm">
        <nav>
          <HandbookNavTree :items="tree" :current="route.path" />
        </nav>
      </aside>

      <!-- Main content -->
      <article v-if="page" class="min-w-0 flex-1 prose prose-blue max-w-none main-content">
        <ContentRenderer :value="page" />
      </article>

      <!-- Table of contents -->
      <aside v-if="toc.length" class="lg:w-56 lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start text-sm hidden lg:block">
        <p class="font-medium border-b pb-1 mb-2">On this page</p>
        <ul class="space-y-1">
          <li v-for="link in toc" :key="link.id">
            <a :href="`#${link.id}`" class="text-gray-500 hover:text-blue-700">{{ link.text }}</a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
