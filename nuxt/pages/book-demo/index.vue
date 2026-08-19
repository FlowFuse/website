<script setup lang="ts">
const highlights = [
    '<span class="font-semibold">5→1</span> systems unified into one platform, like <a href="/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge">Walter Tools</a>',
    '<span class="font-semibold">3-5X</span> faster deployment, like <a href="/customer-stories/node-red-building-management">Power Workplace</a>',
    '<span class="font-semibold">40+</span> industrial protocols supported out of box',
]

useSeoMeta({
    title: 'Walk through your setup with our team',
    description: 'Book a demo to understand how FlowFuse helps you professionalize your Node-RED deployment.',
    ogImage: '/images/og-book-demo.jpeg',
})
</script>

<template>
  <MqlContactPage
    eyebrow="Get a personalized product tour"
    title="Standardize your production workflows"
    subtitle="Starting with one conversation"
    subtitle-icon="i-lucide-arrow-right"
    description="See how you'd build, deploy, and govern operational applications across your own plants and production lines."
    :highlights="highlights"
    social-proof-title="Over 2,000 users have trusted FlowFuse"
  >
    <HubSpotMeetings data-src="https://meetings-eu1.hubspot.com/michael-davis/round-robin-sales-team?embed=true" />
  </MqlContactPage>

  <div class="container m-auto max-w-5xl px-6 pb-20">
    <h2 class="mb-10 text-center">
      Built for <span class="text-indigo-600">OT and IT, together</span>
    </h2>
    <DifferentiatorCards />
  </div>
</template>
