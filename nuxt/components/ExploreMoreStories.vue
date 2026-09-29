<script setup lang="ts">
// Ported from src/_includes/stories-block.njk + src/_includes/stories/customer-story.njk.
// The random pick happens inside useAsyncData's fetcher (server-only), so the result is
// serialized once and reused on the client - re-shuffling in the template would cause a
// hydration mismatch.
const { data: stories } = await useAsyncData('thank-you-stories', async () => {
    const all = await queryCollection('stories')
        .select('path', 'title', 'image', 'logo', 'story')
        .all()
    return all
        .map(story => ({ sort: Math.random(), story }))
        .sort((a, b) => a.sort - b.sort)
        .slice(0, 3)
        .map(({ story }) => story)
})
</script>

<template>
  <ul class="w-full max-w-md md:max-w-none mx-auto flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-x-4 pt-8">
    <li v-for="story in stories" :key="story.path" class="w-full my-2 border rounded-lg hover:drop-shadow-lg hover:border-blue-600 transition ease-in-out duration-300 bg-white">
      <a :href="story.path" class="w-full flex flex-col group hover:no-underline h-full m-0">
        <div class="relative border-b">
          <div class="w-full h-52 sm:h-48 overflow-hidden rounded-t-lg">
            <img :src="story.image || '/images/og-blog.jpg'" :alt="`Image representing ${story.title}`" class="w-full h-full object-cover">
          </div>
          <div v-if="story.logo" class="w-1/2 h-full absolute left-0 top-0 bg-white flex items-center justify-center rounded-tl-lg">
            <img :src="story.logo" :alt="`${story.story?.brand} logo`" class="max-w-[70%] max-h-[70%] object-contain">
          </div>
        </div>
        <div class="flex flex-col mt-1 mb-0 p-5 pt-3 gap-2">
          <span class="font-bold text-gray-600">{{ story.story?.brand }}</span>
          <h3 class="group-hover:text-blue-600 font-medium m-0 mt-0 mb-2 text-lg leading-relaxed">
            {{ story.title }}
          </h3>
        </div>
      </a>
    </li>
  </ul>
</template>
