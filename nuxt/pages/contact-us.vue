<script setup>
const otherChannels = [
    { title: 'Want to talk it through live?', description: "Book a session and we'll go through your setup together.", buttonText: 'Book a session', buttonLink: 'https://meetings-eu1.hubspot.com/michael-davis/contact-us-scheduler', icon: 'calendar' },
    { title: 'Need technical help instead?', description: 'Visit our Help Center for docs, guides and access to our support team.', buttonText: 'Help center', buttonLink: '/support', icon: 'lifebuoy' },
]
useHead({
    title: 'Tell us about your setup • FlowFuse',
    meta: [{ name: 'description', content: "Whether you're connecting systems, automating workflows, or scaling industrial data — we'll help you figure out the right approach for your production setup." }],
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <MqlContact
        title="Tell us about your setup"
        description="Whether you're connecting systems, automating workflows, or scaling industrial data — we'll help you figure out the right approach for your production setup."
        :other-channels="otherChannels">
        <template #form>
          <div class="border border-indigo-200 rounded-xl p-6 bg-white shadow-sm overflow-hidden">
            <HubSpotForm form-id="734455e5-4cda-4329-97da-07e40cda791c" />
          </div>
        </template>
      </MqlContact>
    </div>
  </div>
</template>
