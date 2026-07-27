<script setup lang="ts">
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '')

const [ebooks, whitepapers] = await Promise.all([
    queryCollection('ebooks').all(),
    queryCollection('whitepapers').all(),
])

const publications = [
    ...ebooks.map(e => ({
        url: e.path.replace(/^\/ebooks/, '/ebooks') + '/',
        thumbnail: e.thumbnail ?? e.coverImage ?? e.image,
        title: stripHtml(e.contentTitle ?? ''),
        tag: 'eBook',
    })),
    ...whitepapers.map(w => ({
        url: w.path.replace(/^\/whitepapers/, '/whitepaper') + '/',
        thumbnail: w.thumbnail,
        title: w.whitepaperTitle,
        tag: 'Whitepaper',
    })),
]

useHead({
    title: 'Publications: eBooks and Whitepapers • FlowFuse',
    meta: [
        { name: 'description', content: 'Browse our library of whitepapers and eBooks and discover the power of our low-code industrial data platform.' },
    ]
})
</script>

<template>
  <div class="w-full catalog-hero cropped">
    <div class="container m-auto text-left max-w-md sm:max-w-6xl pt-16 pb-24 w-full">
      <div class="px-6">
        <h1>
          <span class="text-2xl">Publications</span><br>
          <span class="text-indigo-600">eBooks and Whitepapers</span>
        </h1>
        <p class="max-w-2xl">Ready to dive deeper into the world of FlowFuse? Browse our library of whitepapers and ebooks and discover the power of our low-code industrial data platform.</p>
      </div>
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-16">
        <li
          v-for="item in publications"
          :key="item.url"
          class="customer-story-tile w-full my-2 border border-gray-200 px-0 rounded-lg hover:drop-shadow-lg hover:border-blue-600 transition ease-in-out duration-300 bg-white"
        >
          <NuxtLink :to="item.url" class="w-full flex flex-col group hover:no-underline h-full m-0">
            <div>
              <div class="relative border-b border-gray-200">
                <div class="w-full h-52 ff-image-cover ff-image-top-rounded">
                  <img :src="item.thumbnail" :alt="`Image representing ${item.title}`" class="w-full h-full object-cover">
                </div>
              </div>
              <div class="mt-1 mb-0 p-5 pt-3">
                <label
                  class="px-2 py-1 rounded-md font-semibold"
                  :class="item.tag === 'Whitepaper' ? 'bg-indigo-100 text-gray-700' : 'bg-indigo-600 text-white'"
                >{{ item.tag }}</label>
                <h3 class="group-hover:text-blue-600 font-medium m-0 mt-3 text-lg">{{ item.title }}</h3>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
