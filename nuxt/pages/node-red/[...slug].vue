<script setup>
import navTree from '~/node-red.nav.json'

const route = useRoute()

const contentPath = computed(() => {
    const p = route.path.replace(/\/+$/, '')
    return p === '/node-red' || p === '' ? '/node-red' : p
})

const { data: page } = await useAsyncData(`node-red-${contentPath.value}`, () =>
    queryCollection('nodeRed').path(contentPath.value).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const toc = computed(() => page.value?.body?.toc?.links ?? [])

useHead(() => ({
    title: `${page.value?.title || 'Node-RED'} • FlowFuse`,
    meta: [{ name: 'description', content: page.value?.description || '' }],
}))
</script>

<template>
  <div class="w-full pl-6 bg-white/50">
    <div class="handbook ff-prose text-left pb-24 m-auto mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8">
      <!-- Learning resources sidebar -->
      <aside class="lg:border-r w-full lg:max-w-[300px] lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto text-sm lg:pt-2">
        <nav>
          <NodeRedNavTree :items="navTree" :current="route.path" />
        </nav>
      </aside>

      <!-- Main content -->
      <article class="min-w-0 flex-1 px-2 lg:px-6 pt-8">
        <div class="mt-6 mb-4 prose prose-blue main-content max-w-none">
          <ContentRenderer :value="page" />
        </div>
      </article>

      <!-- TOC -->
      <aside v-if="toc.length" class="lg:w-56 lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start text-sm hidden lg:block pt-8">
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
