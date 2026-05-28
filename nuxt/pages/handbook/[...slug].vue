<script setup>
const route = useRoute()

// Map the served URL (trailing slash) to the Content path (no trailing slash).
const contentPath = computed(() => {
    const p = route.path.replace(/\/+$/, '')
    return p === '/handbook' || p === '' ? '/handbook' : p
})

const { data: page } = await useAsyncData(`handbook-${contentPath.value}`, () =>
    queryCollection('handbook').path(contentPath.value).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const { data: nav } = await useAsyncData('handbook-nav', () =>
    queryCollectionNavigation('handbook')
)

// The collection nav is rooted at /handbook; render its children.
const tree = computed(() => {
    const root = nav.value?.find((i) => i.path === '/handbook') || nav.value?.[0]
    return root?.children ?? nav.value ?? []
})

const toc = computed(() => page.value?.body?.toc?.links ?? [])

// Sidebar is a collapsible disclosure below lg; always shown inline at lg+.
const navOpen = ref(false)
watch(() => route.path, () => { navOpen.value = false })

useHead({
    title: `${page.value.title} • FlowFuse Handbook`
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
          <span>Handbook menu</span>
          <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': navOpen }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
        </button>
        <nav :class="navOpen ? 'block' : 'hidden lg:block'" class="mt-2 lg:mt-0">
          <HandbookNavTree :items="tree" :current="route.path" />
        </nav>
      </aside>

      <!-- Main content -->
      <article class="min-w-0 flex-1 prose prose-blue max-w-none main-content">
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
