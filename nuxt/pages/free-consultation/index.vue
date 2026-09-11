<script setup lang="ts">
// Ported from src/free-consultation.njk (11ty) and layouts/landing-form.njk, which this
// replaces. That layout had exactly one user, so it is this page's markup rather than a
// component.
//
// hs-form.njk becomes <HubSpotForm> and social-proof.njk becomes <SocialProof>. The
// frontmatter's `robots: noindex, nofollow` is a real meta tag here.
const CARD_TEXT = 'Our expertise has helped businesses across the world streamline Node-RED operations, developer velocity, security, and compliance.'

useSeoMeta({
    title: 'Schedule your Free Consultation',
    description: 'Schedule a 30 minute free consultation with our experts and see how we can help scale your workflows.',
    ogDescription: 'Schedule a 30 minute free consultation with our experts and see how we can help scale your workflows.',
    ogUrl: 'https://flowfuse.com/free-consultation/',
    twitterSite: '@FlowFuseinc',
})

useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
        <div class="mx-auto max-w-screen-xl md:max-w-xl">
          <h1>Schedule your Free Consultation</h1>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="w-full page webinar">
        <div class="w-full pt-6 pb-24">
          <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8">
            <div class="max-w-screen-sm w-full">
              <p>
                Facing challenges with your Node-RED applications in industrial or enterprise environments?
                <span class="font-bold">Schedule a free 30-minute consultation with our experts.</span>
                We'll assess your current setup and provide tailored recommendations to help you address
                pain points such as scalability, security, and workflow automation.
              </p>
              <div class="ff-blue-card flex flex-row gap-6 items-center">
                <div class="max-w-24">
                  <img src="/images/node-red-icon.png" alt="Node-RED logo" width="100" class="w-full h-auto">
                </div>
                <h4 class="font-light text-left">{{ CARD_TEXT }}</h4>
              </div>
              <SocialProof />
            </div>
            <div class="product mt-3">
              <div class="w-full mx-auto">
                <HubSpotForm
                    form-id="d24fa635-f19c-400b-82d4-b6f233faf38b"
                    cta="schedule-free-consult"
                    reference="free-consultation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
