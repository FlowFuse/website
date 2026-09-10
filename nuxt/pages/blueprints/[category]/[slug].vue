<script setup lang="ts">
// Ported from src/_includes/layouts/blueprint.njk (11ty), which this replaces: one
// blueprint's page. The body is the README from FlowFuse/blueprint-library, copied into
// nuxt/content/blueprints by modules/blueprints-source.ts.
//
// What the port changes on purpose:
//  - The description was printed with `| safe`. It comes from another repository, so it
//    goes through renderRichText, which escapes it and then re-enables a small allowlist.
//  - Screenshots are served from nuxt/public/blueprints/ and resized by @nuxt/image
//    instead of by eleventy-img. The `{data-zoomable}` attribute the READMEs carry stays
//    an inert attribute, exactly as it now does on the migrated /docs pages.
//  - The layout had an `{% if dependencies %}` "Integrations:" block whose body was
//    commented out, and no blueprint sets `dependencies`. It is not carried over.
//  - The Deploy button is hidden rather than pointing at an empty id when a blueprint
//    carries no `blueprintId`.
import { blueprintAuthor, deployUrl } from '../../../lib/blueprint-display.mjs'
import { renderRichText } from '../../../lib/rich-text.mjs'

definePageMeta({ layout: 'default' })

const route = useRoute()
const contentPath = computed(() => `/blueprints/${route.params.category}/${route.params.slug}`)

const { data: page } = await useAsyncData(
    () => `blueprint-${contentPath.value}`,
    () => queryCollection('blueprints').path(contentPath.value).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const author = computed(() => blueprintAuthor(page.value?.author))
const canonicalUrl = computed(() => `https://flowfuse.com${route.path}`)
const absoluteImage = computed(() => {
    const image = page.value?.image
    if (!image) return undefined
    return image.startsWith('http') ? image : `https://flowfuse.com${image}`
})

useSeoMeta({
    title: () => page.value?.title,
    description: () => page.value?.description,
    ogDescription: () => page.value?.description,
    ogImage: absoluteImage,
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div v-if="page" class="w-full page post">
    <div class="post-title container m-auto text-center max-lg:px-6 flex mt-6 mb-6 md:max-w-screen-lg md:mt-12">
      <div class="text-left md:pr-32">
        <label>Blueprint</label>
        <h1>{{ page.title }}</h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h4 v-if="page.description" v-html="renderRichText(page.description)" />
      </div>
    </div>
    <div class="blog nohero w-full pb-12">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8 items-stretch">
        <div class="ff-prose min-w-0">
          <NuxtLink to="/blueprints/" class="inline-flex align-center gap-1 mb-4">
            <SiteArt name="chevron-left" />
            Back to Blueprints Library
          </NuxtLink>
          <div class="prose w-full flex-grow">
            <ContentRenderer :value="page" />
          </div>
        </div>
        <div class="w-72 max-w-full flex-shrink-0">
          <div class="sticky top-20 mt-6 flex flex-col">
            <a
                v-if="page.blueprintId"
                :href="deployUrl(page.blueprintId)"
                class="ff-btn ff-btn--primary flex gap-2 mb-6 mt-4 uppercase"
                target="_blank"
                rel="noopener"
            >Deploy <SiteArt name="rocket-launch" /></a>
            <h3 class="mb-3">Author:</h3>
            <BlueprintCompanyTile :company="author" />
            <ContactUsCtaLine />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
