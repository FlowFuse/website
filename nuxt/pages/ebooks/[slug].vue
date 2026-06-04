<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: page } = await useAsyncData(`ebook-${slug}`, () =>
    queryCollection('ebooks').path(`/ebooks/${slug}`).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'eBook not found' })
}

const coverImage = computed(() => page.value?.coverImage ?? page.value?.image)

useHead({
    title: `${page.value.meta?.title ?? page.value.contentTitle} • FlowFuse`,
    meta: [
        { name: 'description', content: page.value.meta?.description ?? '' },
    ]
})
</script>

<template>
  <div class="w-full page ebook">
    <div class="m-auto px-6 mt-6 mb-6 md:max-w-screen-lg md:mt-12 max-w-lg mx-auto">
      <label class="text-red-600">eBook</label>
      <div class="md:flex md:flex-row gap-6">
        <div class="text-left md:w-1/2">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h1 v-html="page.contentTitle" />
          <div v-if="page.secondaryImage && page.tertiaryImage" class="my-6 flex gap-3 ebook-images">
            <img :src="page.secondaryImage" alt="FlowFuse Dashboard" width="147">
            <img :src="page.tertiaryImage" alt="FlowFuse Dashboard" width="303">
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
        <h3 class="font-semibold mb-8">
          <span class="text-red-600">Download now</span>
          <span class="inline-block">for free</span>
        </h3>
        <div class="w-full grid md:grid-cols-3 gap-6">
          <div class="ff-image-rounded relative max-md:max-w-[150px] mx-auto">
            <div class="absolute top-0 right-0 transform translate-x-[-15%] md:translate-x-[-30%] rounded-b-md bg-white md:px-4 px-2 py-1">
              <label class="text-red-600 max-md:text-sm">eBook</label>
            </div>
            <img :src="coverImage" alt="eBook cover image with title and FlowFuse logo">
          </div>
          <div class="mb-4 hero-img prose ff-prose">
            <h5>Table of Contents</h5>
            <ul class="text-left">
              <li
                v-for="(item, index) in page.contentTable"
                :key="index"
                v-html="item"
              />
            </ul>
          </div>
          <div class="product">
            <div class="w-80 w-full mx-auto">
              <HubSpotForm
                :form-id="page.hubspot.formId"
                :cta="page.hubspot.cta"
                :reference="page.hubspot.reference"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
