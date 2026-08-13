<script setup lang="ts">
definePageMeta({ layout: 'application-guide' })

const { data: pages } = await useApplicationGuidePages()

const guides = computed(() => GUIDES.map(guide => ({
    ...guide,
    pages: pagesForGuide(pages.value, guide.id),
})))

const title = 'FlowFuse Application Guide'
const description = 'How to build and deploy with FlowFuse and Node-RED: the packages, the architectures and the flow patterns we teach during a proof of concept.'

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: 'https://flowfuse.com/application-guide/',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

defineOgImage('Default', {
    title: 'FlowFuse Application Guide',
    section: 'FlowFuse',
})
</script>

<template>
  <div id="ag-content" class="ag-main ag-landing">
    <h1 class="ag-landing-title">FlowFuse Application Guide</h1>
    <p class="ag-landing-lead">
      Two guides for the decisions you make before you start building: which FlowFuse pieces
      an app is made of, where they run, and what a flow should look like once it is. This is
      the material we walk through during a proof of concept, written down so you can work
      through it yourself.
    </p>

    <div class="ag-guides">
      <section v-for="guide in guides" :key="guide.id" class="ag-guide">
        <h2>{{ guide.title }}</h2>
        <p class="ag-guide-tagline">{{ guide.tagline }}</p>
        <ul class="ag-guide-list">
          <li v-for="page in guide.pages" :key="page.path">
            <NuxtLink :to="page.path" class="ag-guide-link">
              <strong>{{ page.title }}</strong>
              <span v-if="page.blurb">{{ page.blurb }}</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
