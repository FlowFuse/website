<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { data: stories } = await useAsyncData(
    'customer-stories-index',
    () => queryCollection('stories').order('date', 'DESC').all()
)

useSeoMeta({
    title: 'Customer Stories • FlowFuse',
    description: 'Read how FlowFuse customers efficiently leverage Node-RED with FlowFuse for automation across various industries, including manufacturing, automobile, and building management.',
})
</script>

<template>
  <div class="container m-auto w-full max-w-md pb-24 pt-8 text-left sm:max-w-6xl">
    <div class="px-6">
      <h1>Customer Stories</h1>
    </div>
    <ul v-if="stories && stories.length > 0" class="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3">
      <StoryTile
        v-for="item in stories"
        :key="item.path"
        :title="item.title"
        :path="item.path"
        :brand="item.story.brand"
        :logo="item.logo"
        :image="item.image"
      />
    </ul>
    <div v-else class="mx-auto">
      <div class="pb-3 text-3xl font-medium text-blue-hero md:text-5xl">
        Ooops!
      </div>
      <div class="text-lg text-black-hero-body">
        No-one has written anything yet. Come back soon!
      </div>
    </div>
  </div>
</template>
