<script setup lang="ts">
// Ported from src/platform/security.md (11ty), which this replaces.
//
// The .md carried `layout: nohero`, which is layouts/page.njk's centred-title branch
// (an <h1> from `title`) wrapping the body, and the body opened with its own
// `<div class="prose prose-blue container m-auto max-w-4xl px-6 pb-24">`. Both are this
// page's markup now, so the content file is plain markdown with a title and nothing else.
const { data: page } = await useAsyncData('platform-security', () =>
    queryCollection('platformPages').path('/platform/security').first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
    title: 'Security Statement - FlowFuse',
    ogUrl: 'https://flowfuse.com/platform/security/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="container m-auto text-center flex py-12 px-12 md:max-w-screen-lg md:pt-12">
        <div class="text-center w-full">
          <h1>Security Statement - FlowFuse</h1>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="nohero w-full">
        <div class="prose prose-blue container m-auto max-w-4xl px-6 pb-24">
          <ContentRenderer :value="page" />
        </div>
      </div>
    </div>
  </div>
</template>
