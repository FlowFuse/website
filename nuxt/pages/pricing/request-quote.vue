<script setup lang="ts">
// Ported from src/pricing/request-quote.njk (11ty), which this replaces.
//
// <MqlContactPage> already ports layouts/mql-contact.njk, so this page is its data.
//
// The .njk also carried a template body with a second "Request a Quote" heading and a
// second copy of the same HubSpot form. None of it rendered: mql-contact.njk has no
// {{ content }} at all, so the body was dead. Production shows one form and one h1,
// which is what this renders.
const OTHER_CHANNELS = [
    {
        title: 'Talk to an expert first?',
        description: 'Pick a date and time and we’ll guide you through the purchasing process.',
        buttonText: 'Book a call',
        buttonLink: '/book-demo',
        icon: 'calendar',
    },
    {
        title: 'Where you looking to solve some technical issue?',
        description: 'Check out our Help Center for support, you’ll find all the channels available to solve any issues you’re encountering.',
        buttonText: 'Help center',
        buttonLink: '/support',
        icon: 'life-buoy',
    },
]

const DESCRIPTION = 'Ready to unlock all FlowFuse has to offer? Share what you need, and a quote will be created for you shortly.'

useSeoMeta({
    title: 'Request a Quote',
    description: 'Request a quote for FlowFuse, the automation platform.',
    ogDescription: 'Request a quote for FlowFuse, the automation platform.',
    keywords: 'FlowFuse Quote, License FlowFuse',
    ogUrl: 'https://flowfuse.com/pricing/request-quote/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <MqlContactPage title="Request a Quote" :description="DESCRIPTION" :other-channels="OTHER_CHANNELS">
    <div class="border border-indigo-200 rounded-xl p-6 bg-white shadow-sm overflow-hidden">
      <HubSpotForm form-id="5b9d1cfb-f658-43c3-8d4d-a5b1b2802b74" cta="cta-request-quote" reference="pricing" />
    </div>
  </MqlContactPage>
</template>
