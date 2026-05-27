<script setup>
const benefits = [
    { img: '/images/pictograms/time_blue.png', alt: "Graphic of a clock, depicting 'Time'.", title: 'One-Minute Setup' },
    { img: '/images/pictograms/security_blue.png', alt: "Graphic of a padlock, depicting 'Security'.", title: 'Enterprise Ready' },
    { img: '/images/pictograms/ticket_blue.png', alt: "Graphic of a ticket, depicting 'Ticket-Based Support'.", title: 'Ticket-Based Support' },
    { img: '/images/pictograms/community_blue.png', alt: "Graphic depicting 'Flexibility'.", title: 'Flexible Deployment' },
    { img: '/images/pictograms/node_catalog_blue.png', alt: "Graphic of nodes & wires, depicting 'Node-RED'.", title: 'Node-RED, Managed<br>For You', html: true },
    { img: '/images/pictograms/browser_blue.png', alt: 'Graphic of a globe, depicting FlowFuse being full browser-based.', title: 'Full Browser-Based' },
]

useHead({
    title: 'Partnership program • FlowFuse',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="hero container m-auto text-center flex flex-wrap mt-6 py-6 px-6 md:px-0 pb-24 md:flex-nowrap md:max-w-screen-md md:mt-12">
        <div class="text-left md:pr-6">
          <h1>Introducing the FlowFuse Referral Program</h1>
          <p class="mt-8">Many companies are realizing the benefits of using FlowFuse for their Node-RED development. We want to encourage them to recommend FlowFuse to other potential users. That's why we're excited to offer a referral program that rewards others for spreading the word about our platform.</p>
        </div>
        <div class="hidden md:block flex-shrink-0">
          <img src="/images/pictograms/community_blue.png" alt="Hero Image for Introducing the FlowFuse Referral Program" style="max-width:586px" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="product w-full px-6 pb-20 md:px-0">
        <div class="container md:max-w-xl m-auto text-center">
          <h2 class="mb-6">Register here</h2>
          <HubSpotForm form-id="aad1cda7-2e1f-423d-a528-05228b0c4a3f" />
        </div>
      </div>
      <div class="w-full bg-gray-50 px-6 pt-16 pb-8 md:px-0">
        <div class="container px-3 md:px-12 md:max-w-screen-lg m-auto text-center max-w-4xl">
          <div class="m-auto w-full text-center"><h2>Benefits of FlowFuse</h2></div>
          <div class="mt-20 flex flex-wrap justify-center">
            <div v-for="b in benefits" :key="b.title" class="company-value">
              <img :src="b.img" :alt="b.alt" style="max-width:128px" />
              <h5 v-if="b.html" v-html="b.title" />
              <h5 v-else>{{ b.title }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
