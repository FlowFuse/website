<script setup lang="ts">
// Docs-conformant Application Guide landing: same .ff-prose frame + left nav as the
// guide pages and /docs, so the section reads as one coherent, on-brand experience.
definePageMeta({ layout: 'default' })

const { data: pages } = await useApplicationGuidePages()

const guides = computed(() => GUIDES.map(guide => ({
    ...guide,
    pages: pagesForGuide(pages.value, guide.id),
})))

const breadcrumbItems = [{ label: 'Application Guide' }]

const title = 'Application Guide'
const description = 'How to build and deploy with FlowFuse and Node-RED: the packages, the architectures and the flow patterns we teach during a proof of concept.'

useSeoMeta({
    title,
    description,
    ogDescription: description,
    ogUrl: 'https://flowfuse.com/application-guide/',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

defineOgImage('Default', { title: 'FlowFuse Application Guide', section: 'FlowFuse' })
</script>

<template>
  <div class="w-full pl-6">
    <div class="handbook ff-prose text-left pb-24 m-auto">

      <GuideLeftNav />

      <div class="px-10 pt-8">
        <div class="w-full font-medium pb-1">
          <Breadcrumbs :items="breadcrumbItems" />
        </div>

        <div class="w-full">
          <div class="mt-6 mb-4 prose prose-blue main-content handbook-content">
            <h1>FlowFuse Application Guide</h1>
            <p class="lead">
              Two guides for the decisions you make before you start building: which FlowFuse
              pieces an app is made of, where they run, and what a flow should look like once it
              is. This is the material we walk through during a proof of concept, written down so
              you can work through it yourself.
            </p>

            <template v-for="guide in guides" :key="guide.id">
              <h2>{{ guide.title }}</h2>
              <p>{{ guide.tagline }}</p>
              <ul>
                <li v-for="page in guide.pages" :key="page.path">
                  <NuxtLink :to="page.path">{{ page.title }}</NuxtLink><template v-if="page.blurb"> — {{ page.blurb }}</template>
                </li>
              </ul>
            </template>
          </div>
        </div>
      </div>

      <div class="lg right-nav"></div>

    </div>
  </div>
</template>
