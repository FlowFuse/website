<script setup lang="ts">
const otherChannels = [
    {
        title: 'Want to talk it through live?',
        description: 'Book a session and we\'ll go through your setup together.',
        buttonText: 'Book a session',
        buttonLink: 'https://meetings-eu1.hubspot.com/michael-davis/round-robin-sales-team',
        icon: 'calendar',
    },
    {
        title: 'Need technical help instead?',
        description: 'Visit our Help Center for docs, guides and access to our support team.',
        buttonText: 'Help center',
        buttonLink: '/support',
        icon: 'life-buoy',
    },
]

useSeoMeta({
    title: 'Tell us about your setup',
    description: 'Whether you\'re connecting systems, automating workflows, or scaling industrial data, we\'ll help you figure out the right approach for your production setup.',
})
</script>

<template>
  <MqlContactPage
    title="Tell us about your setup"
    description="Whether you're connecting systems, automating workflows, or scaling industrial data, we'll help you figure out the right approach for your production setup."
    :other-channels="otherChannels"
  >
    <div class="border border-indigo-200 rounded-xl p-6 bg-white shadow-sm overflow-hidden">
      <HubSpotForm form-id="734455e5-4cda-4329-97da-07e40cda791c" cta="cta-contact-us" reference="contact-us" />
    </div>
  </MqlContactPage>
</template>
