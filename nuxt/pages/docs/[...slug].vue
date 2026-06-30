<script setup>
import docsIndex from '~/docs.index.json'
import docsNav from '~/docs.nav.json'

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

// Static grouped nav generated at copy time (scripts/copy_docs_nuxt.js),
// reproducing the 11ty navGroup/navOrder sidebar.
const nav = docsNav

const toc = computed(() => page.value?.body?.toc?.links ?? [])

// Breadcrumbs — mirror the 11ty `handbookBreadcrumbs` filter: split the URL into
// parts (dropping a trailing `index`), each linking to its cumulative path with a
// trailing slash (URL parity), labelled with the raw slug.
const breadcrumbs = computed(() => {
    const parts = route.path.split('/').filter(Boolean)
    if (parts[parts.length - 1] === 'index') parts.pop()
    let path = ''
    return parts.map((name) => {
        path += '/' + name
        return { name, path: path + '/' }
    })
})

// Edit this page — mirror the 11ty `handbookEditLink` filter for `/docs`: point at
// the source file in the external FlowFuse/flowfuse repo. `editPath` (e.g.
// `docs/api/README.md`) is stamped into docs.index.json by copy_docs_nuxt.js from
// each doc's `originalPath` frontmatter; fall back to the content frontmatter.
const editPath = computed(() => meta.editPath || page.value?.originalPath && `docs/${page.value.originalPath}`)
const editLink = computed(() =>
    editPath.value ? `https://github.com/FlowFuse/flowfuse/edit/main/${editPath.value}` : null
)

// Sidebar is a collapsible disclosure below lg; always shown inline at lg+.
const navOpen = ref(false)
watch(() => route.path, () => { navOpen.value = false })

useHead({
    title: `${page.value?.title || 'Documentation'} • FlowFuse Docs`,
    meta: [{ property: 'article:section', content: 'docs' }]
})
</script>

<template>
  <div class="handbook handbook-shell ff-prose w-full text-left pb-24">
    <div class="mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 px-6 pt-8">
      <!-- Sidebar navigation -->
      <aside class="lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto text-sm">
        <button
          type="button"
          class="lg:hidden w-full flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-2 font-medium text-gray-700"
          :aria-expanded="navOpen"
          @click="navOpen = !navOpen"
        >
          <span>Documentation menu</span>
          <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': navOpen }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
        </button>
        <div class="mt-2 lg:mt-0 mb-4">
          <AlgoliaSearch scope="docs" />
        </div>
        <nav :class="navOpen ? 'block' : 'hidden lg:block'" class="mt-2 lg:mt-0">
          <HandbookNavTree :nav="nav" :current="route.path" />
        </nav>
      </aside>

      <!-- Main content -->
      <article v-if="page" class="min-w-0 flex-1 prose prose-blue max-w-none main-content">
        <!-- Breadcrumbs + edit-this-page (parity with 11ty documentation.njk) -->
        <div class="not-prose flex items-center justify-between gap-4 border-b pb-2 mb-6 text-sm">
          <nav aria-label="Breadcrumb" class="text-gray-500 min-w-0 truncate">
            <span v-for="(crumb, i) in breadcrumbs" :key="crumb.path">
              <NuxtLink :href="crumb.path" class="hover:text-blue-700">{{ crumb.name }}</NuxtLink>
              <span v-if="i < breadcrumbs.length - 1" class="mx-1 text-gray-300">/</span>
            </span>
          </nav>
          <a
            v-if="editLink"
            :href="editLink"
            target="_blank"
            rel="noopener"
            class="flex-shrink-0 text-gray-500 hover:text-blue-700 italic"
          >Edit this page</a>
        </div>
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
