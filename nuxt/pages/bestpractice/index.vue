<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { data: pages } = await useBestPracticePages()

const guides = computed(() => GUIDES.map(guide => ({
    ...guide,
    pages: pagesForGuide(pages.value, guide.id),
})))

const title = 'Best Practice • FlowFuse'
const description = 'How to build and deploy with FlowFuse and Node-RED: the packages, the architectures and the flow patterns we teach during a proof of concept.'

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: 'https://flowfuse.com/bestpractice/',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

defineOgImage('Default', {
    title: 'Best Practice',
    section: 'FlowFuse',
})
</script>

<template>
  <div class="light w-full bg-white">
    <div class="mx-auto w-full max-w-screen-xl px-6 pb-24 pt-12 text-left">
      <h1 class="m-0 text-4xl font-bold text-gray-800">Best Practice</h1>
      <p class="mt-4 max-w-3xl text-lg text-gray-600">
        Two guides for the decisions you make before you start building: which FlowFuse pieces
        an app is made of, where they run, and what a flow should look like once it is. This is
        the material we walk through during a proof of concept, written down so you can work
        through it yourself.
      </p>

      <div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section
          v-for="guide in guides"
          :key="guide.id"
          class="rounded-lg border border-gray-200 bg-white p-6"
        >
          <h2 class="m-0 text-2xl font-bold text-gray-800">{{ guide.title }}</h2>
          <p class="mt-2 text-gray-600">{{ guide.tagline }}</p>
          <ul class="mt-6 list-none p-0">
            <li v-for="page in guide.pages" :key="page.path" class="m-0 border-t border-gray-100 first:border-t-0">
              <NuxtLink
                :to="page.path"
                class="group flex flex-col py-3 no-underline hover:no-underline"
              >
                <span class="font-medium text-gray-800 group-hover:text-indigo-700">{{ page.title }}</span>
                <span v-if="page.blurb" class="mt-0.5 text-sm text-gray-500">{{ page.blurb }}</span>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
