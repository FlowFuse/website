<script setup>
const otherChannels = [
    { title: 'Prefer to start with a message?', description: "Share your use case and we’ll get back to you shortly.", buttonText: 'Contact us', buttonLink: '/contact-us', icon: 'mail' },
    { title: 'Looking for technical help?', description: 'Visit our Help Center for docs, guides, and community support.', buttonText: 'Help center', buttonLink: '/support', icon: 'lifebuoy' },
]
useHead({
    title: 'Walk through your setup with our team • FlowFuse',
    meta: [{ name: 'description', content: 'Book a demo to understand how FlowFuse helps you professionalize your Node-RED deployment.' }],
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <MqlContact
        title="Walk through your setup with our team"
        description="Walk through your setup, discuss your use case, and get guidance on the right approach for your production setup."
        :other-channels="otherChannels">
        <template #form>
          <HubSpotMeeting data-src="https://meetings-eu1.hubspot.com/michael-davis/contact-us-scheduler?embed=true" />
        </template>
      </MqlContact>
    </div>
  </div>
</template>
