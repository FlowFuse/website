<script setup>
import indexData from '../../ebooks.index.json'

const route = useRoute()
const slug = computed(() => {
    const s = route.params.slug
    return (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean).join('/')
})

const meta = computed(() => indexData.ebooks.find((e) => e.slug === slug.value) || {})

const { data: page } = await useAsyncData(
    () => `ebook-${slug.value}`,
    () => queryCollection('ebooks').path(`/ebooks/${slug.value}`).first()
)
if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead(() => ({
    title: `${meta.value.title || ''} • FlowFuse`,
    meta: [{ name: 'description', content: meta.value.description || '' }],
}))
</script>

<template>
  <div class="w-full page ebook">
    <div class="m-auto px-6 mt-6 mb-6 md:max-w-screen-lg md:mt-12 max-w-lg mx-auto">
      <label class="text-red-600">eBook</label>
      <div class="md:flex md:flex-row gap-6">
        <div class="text-left md:w-1/2">
          <h1 v-html="meta.contentTitle" />
          <div v-if="meta.secondaryImage && meta.tertiaryImage" class="my-6 flex gap-3 ebook-images">
            <img :src="meta.secondaryImage" alt="FlowFuse Dashboard" style="max-width:147px" />
            <img :src="meta.tertiaryImage" alt="FlowFuse Dashboard" style="max-width:303px" />
          </div>
        </div>
        <div class="ff-prose md:w-1/2">
          <div class="prose mt-3">
            <ContentRenderer :value="page" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full pb-16 px-6 mt-12">
      <div class="ff-blue-card m-auto text-left px-6 max-md:text-center max-md:max-w-md md:max-w-screen-lg gap-8 items-stretch">
        <h3 class="font-semibold mb-8"><span class="text-red-600">Download now</span> <span class="inline-block">for free</span></h3>
        <div class="w-full grid md:grid-cols-3 gap-6">
          <div class="ff-image-rounded relative max-md:max-w-[150px] mx-auto">
            <div class="absolute top-0 right-0 transform translate-x-[-15%] md:translate-x-[-30%] rounded-b-md bg-white md:px-4 px-2 py-1">
              <label class="text-red-600 max-md:text-sm">eBook</label>
            </div>
            <img :src="meta.coverImage" alt="eBook cover image with title and FlowFuse logo" style="max-width:302px" />
          </div>
          <div class="mb-4 hero-img prose ff-prose">
            <h5>Table of Contents</h5>
            <ul class="text-left">
              <li v-for="(item, i) in meta.contentTable" :key="i" v-html="item" />
            </ul>
          </div>
          <div class="product">
            <div class="w-80 w-full mx-auto">
              <HubSpotForm v-if="meta.hubspotFormId" :form-id="meta.hubspotFormId" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
