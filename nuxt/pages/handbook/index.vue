<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { data: page } = await useAsyncData('handbook-root', () =>
    queryCollection('handbook').path('/handbook').first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({
    title: 'FlowFuse Handbook',
    meta: [{ name: 'robots', content: 'noindex' }]
})
</script>

<template>
  <div class="w-full pl-6 bg-white/50">
    <div class="handbook ff-prose text-left pb-24 m-auto">

      <HandbookLeftNav />

      <div class="px-10 pt-8">
        <div class="w-full">
          <div class="font-medium border-b pb-1 flex flex-col gap-1">
            <div class="md:flex-1">
              <nav aria-label="Breadcrumb" class="text-sm text-gray-500">
                <span class="capitalize text-gray-700">handbook</span>
              </nav>
            </div>
            <div class="w-full mb-1">
              <HandbookSearch />
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="order-last md:order-first">
            <div class="mt-6 mb-4 prose prose-blue main-content handbook-content">
              <ContentRenderer v-if="page" :value="page" />
            </div>
          </div>
        </div>
      </div>

      <div class="lg:border-l right-nav">
        <div class="sticky top-20 w-full mt-4 md:mt-6 px-8">
          <HandbookToc />
          <div class="text-xs pb-1 text-right mb-4 italic max-lg:hidden">
            <a href="https://github.com/FlowFuse/website/edit/main/src/handbook/index.md"
              target="_blank" rel="noopener">Edit this page</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
