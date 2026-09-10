<script setup lang="ts">
// Ported from src/community/newsletter.njk (11ty), which this replaces.
//
// That page rendered an empty shell in production. Its whole body - the newsletter list
// AND the sign-up form - sat inside `{% if loop.first %}` on a loop over
// collections.newsletter, and that collection is empty, so the loop body never ran.
// Production serves a <main> of a few hundred bytes containing the word "Newsletter".
//
// There are no newsletter entries to list, so this is the heading and the sign-up form
// the page was for. If newsletter issues are published later they need a collection and
// a listing; this does not invent one.
useSeoMeta({
    title: 'Newsletter',
    description: 'Sign up for monthly email updates from FlowFuse.',
    ogDescription: 'Sign up for monthly email updates from FlowFuse.',
    ogUrl: 'https://flowfuse.com/community/newsletter/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="newsletter nohero container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
        <div class="px-2">
          <h1>Newsletter</h1>
        </div>
        <div class="w-full px-2 pt-2 pb-2 mb-2 flex flex-col border-t-2 border-b-2">
          <a id="sign-up" />
          <h5 class="mb-0">Sign up for our monthly email updates:</h5>
          <HubSpotForm
              form-id="159c173d-dd95-49bd-922b-ff3ef243e90c"
              cta="cta-blog-subscribe"
              reference="newsletter"
          />
        </div>
      </div>
    </div>
  </div>
</template>
