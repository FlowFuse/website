<script setup>
import indexData from '../../customer-stories.index.json'

const route = useRoute()
const slug = computed(() => {
    const s = route.params.slug
    return (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean).join('/')
})
const isIndex = computed(() => slug.value === '')

const stories = indexData.stories
const meta = computed(() => stories.find((s) => s.slug === slug.value) || {})

const { data: story } = await useAsyncData(
    () => `story-${slug.value}`,
    () => isIndex.value ? Promise.resolve(null) : queryCollection('customerStories').path(`/customer-stories/${slug.value}`).first()
)
if (!isIndex.value && !story.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead(() => ({
    title: isIndex.value ? 'Customer Stories • FlowFuse' : `${meta.value.title} • FlowFuse`
}))
</script>

<template>
  <!-- INDEX -->
  <div v-if="isIndex" class="container m-auto text-left max-w-md sm:max-w-6xl pt-8 pb-24 w-full">
    <div class="px-6"><h1>Customer Stories</h1></div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-6">
      <li v-for="s in stories" :key="s.url" class="border rounded-lg overflow-hidden flex flex-col bg-white">
        <a :href="s.url" class="flex flex-col h-full hover:no-underline">
          <div v-if="s.image" class="h-40 bg-cover bg-center" :style="`background-image:url(${s.image})`" />
          <div class="p-4 flex flex-col gap-2 flex-grow">
            <p v-if="s.story.brand" class="text-xs uppercase text-gray-500">{{ s.story.brand }}</p>
            <h3 class="text-lg font-medium">{{ s.title }}</h3>
          </div>
        </a>
      </li>
    </ul>
  </div>

  <!-- STORY -->
  <div v-else class="w-full page post story">
    <div v-if="meta.image" class="w-full py-6 bg-cover bg-center md:py-9 md:min-h-[272px] md:flex md:content-center"
         :style="`background-image: linear-gradient(to right, #1F2937, #1F293700), url(${meta.image})`">
      <div class="post-title container m-auto text-center max-lg:px-6 flex md:max-w-screen-lg">
        <div class="text-left max-w-screen-md md:pr-32">
          <label><span class="text-indigo-200">Customer Story</span></label>
          <h1 class="text-shadow-header text-white">{{ meta.title }}</h1>
          <h4 v-if="meta.subtitle">{{ meta.subtitle }}</h4>
        </div>
      </div>
    </div>
    <div class="blog nohero w-full pt-6 pb-24 bg-gray-50">
      <div class="container flex flex-col m-auto text-left max-lg:px-6 md:max-w-screen-lg items-stretch">
        <a class="inline-flex align-center gap-1 mb-5 md:mb-4" href="/customer-stories/">&larr; Back to Customer Stories</a>
        <div class="ff-prose flex flex-col-reverse md:flex-row md:gap-8 mb-6 border-b">
          <div class="flex-grow">
            <div class="prose">
              <q v-if="meta.story?.quote" class="py-6 md:pt-3 px-6 text-xl text-gray-600 italic font-bold w-full block">{{ meta.story.quote }}</q>
              <ContentRenderer :value="story" />
            </div>
          </div>
          <div class="w-80 max-w-full flex-shrink-0 self-center md:self-auto">
            <div class="flex flex-col border rounded-lg py-6 px-6" style="box-shadow: 4px 4px 6px rgba(75,85,99,0.05)">
              <a v-if="meta.story?.logo" :href="meta.story.url" target="_blank" class="h-[180px] flex items-center justify-center bg-white p-2">
                <img :src="meta.story.logo" :alt="`${meta.story.brand} logo`" class="max-h-full object-contain" />
              </a>
              <div v-if="meta.story?.challenge" class="border-b pb-3 pt-3">
                <h3 class="text-base">Challenge</h3>
                <p class="mt-2">{{ meta.story.challenge }}</p>
              </div>
              <div v-if="meta.story?.solution" class="border-b pt-3 pb-3">
                <h3 class="text-base">Solution</h3>
                <p class="mt-2">{{ meta.story.solution }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
