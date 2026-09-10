<script setup lang="ts">
// Ported from src/partners/referral-sign-up.njk (11ty), which this replaces. Same page,
// same copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - hs-form.njk becomes <HubSpotForm>, keeping the same form id, cta event and
//    reference.
//  - The frontmatter `description` was an HTML fragment printed with `| safe`; it is
//    template markup in the hero here.
//  - The .njk closed the "Benefits of FlowFuse" heading with </h1> after an <h2>; the
//    markup here is well-formed.
const BENEFITS = [
    { image: '/images/pictograms/time_blue.png', alt: "Graphic of a clock, depicting 'Time'.", title: 'One-Minute Setup' },
    { image: '/images/pictograms/security_blue.png', alt: "Graphic of a padlock, depicting 'Security'.", title: 'Enterprise Ready' },
    { image: '/images/pictograms/ticket_blue.png', alt: "Graphic of a ticket, depicting 'Ticket-Based Support'.", title: 'Ticket-Based Support' },
    { image: '/images/pictograms/community_blue.png', alt: "Graphic depicting 'Flexibility'.", title: 'Flexible Deployment' },
    { image: '/images/pictograms/node_catalog_blue.png', alt: "Graphic of nodes & wires, depicting 'Node-RED'.", titleLines: ['Node-RED, Managed', 'For You'] },
    { image: '/images/pictograms/browser_blue.png', alt: 'Graphic of a globe, depicting FlowFuse being full browser-based.', title: 'Full Browser-Based' },
]

useSeoMeta({
    title: 'Partnership program',
    ogUrl: 'https://flowfuse.com/partners/referral-sign-up/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="hero container m-auto text-center flex flex-wrap mt-6 py-6 px-6 md:px-0 pb-24 md:flex-nowrap md:max-w-screen-md md:mt-12">
        <div class="text-left md:pr-6">
          <h1>Introducing the FlowFuse Referral Program</h1>
          <p class="mt-8">
            Many companies are realizing the benefits of using FlowFuse for their Node-RED development. We want to
            encourage them to recommend FlowFuse to other potential users. That's why we're excited to offer a referral
            program that rewards others for spreading the word about our platform.
          </p>
        </div>
        <div class="hidden md:block flex-shrink-0">
          <img src="/images/pictograms/community_blue.png" alt="Hero Image for Introducing the FlowFuse Referral Program" width="586" class="w-full h-auto">
        </div>
      </div>
    </div>
    <div class="content">
      <div class="product w-full px-6 pb-20 md:px-0">
        <div class="container md:max-w-xl m-auto text-center">
          <h2 class="mb-6">Register here</h2>
          <HubSpotForm
              form-id="aad1cda7-2e1f-423d-a528-05228b0c4a3f"
              cta="cta-referral-register"
              reference="referral-sign-up"
          />
        </div>
      </div>

      <div class="w-full bg-gray-50 px-6 pt-16 pb-8 md:px-0">
        <div class="container px-3 md:px-12 md:max-w-screen-lg m-auto text-center max-w-4xl">
          <div class="m-auto w-full text-center">
            <h2>Benefits of FlowFuse</h2>
          </div>
          <div class="mt-20 flex flex-wrap justify-center">
            <div v-for="benefit in BENEFITS" :key="benefit.title || benefit.titleLines?.[0]" class="company-value">
              <img :src="benefit.image" :alt="benefit.alt" width="128" loading="lazy" class="w-full h-auto">
              <h5 v-if="benefit.titleLines">{{ benefit.titleLines[0] }}<br>{{ benefit.titleLines[1] }}</h5>
              <h5 v-else>{{ benefit.title }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
