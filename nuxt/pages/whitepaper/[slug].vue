<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: page } = await useAsyncData(`whitepaper-${slug}`, () =>
    queryCollection('whitepapers').path(`/whitepapers/${slug}`).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Whitepaper not found' })
}

useHead({
    title: `${page.value.meta?.title} • FlowFuse`,
    meta: [
        { name: 'description', content: page.value.meta?.description ?? '' },
    ]
})
</script>

<template>
  <div class="w-full nohero py-16">
    <div class="container flex flex-col m-auto text-left max-lg:px-6 md:max-w-screen-lg items-stretch">
      <div class="ff-prose whitepaper w-full flex flex-col md:flex-row md:gap-10 mt-3 pb-4 md:pb-12">
        <div class="sm:1/3 md:w-1/2 flex-grow">
          <div class="ff-image-cover ff-image-rounded w-full h-full mb-6">
            <img :src="page.image" :alt="`Image representing ${page.meta?.title}`">
          </div>
        </div>
        <div class="main-content prose sm:2/3 md:w-1/2">
          <h1 class="md:max-w-screen-md">{{ page.heroTitle }}</h1>
          <p>{{ page.heroContent }}</p>
        </div>
      </div>
    </div>

    <div class="w-full md:bg-white md:pt-8">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg md:gap-14 items-stretch">
        <div class="ff-prose whitepaper w-full mt-3 md:w-2/3">
          <label class="text-red-600 font-medium mb-2">Whitepaper</label>
          <h3 class="text-gray-600 leading-snug">{{ page.whitepaperTitle }}</h3>
          <h4 v-if="page.whitepaperSubtitle" class="text-gray-600">{{ page.whitepaperSubtitle }}</h4>
          <div class="prose">
            <ContentRenderer :value="page" />
          </div>
        </div>
        <div class="max-w-[350px] flex flex-col mx-auto">
          <div class="sticky top-20 bg-indigo-50 border-2 border-indigo-200 rounded-md drop-shadow-xl px-6 pb-2 mt-4">
            <p class="text-gray-600">
              <span class="font-semibold">{{ page.formTitle ?? 'Download our whitepaper' }}</span><br>
              {{ page.formSubtitle ?? 'to learn how to unleash your engineers\' potential and accelerate industrial innovation.' }}
            </p>
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
</template>
