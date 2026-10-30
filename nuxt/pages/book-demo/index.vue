<script setup lang="ts">
const highlights = [
    '<span class="font-semibold">Your goals:</span> where your operation is headed, and what\'s in the way',
    '<span class="font-semibold">Your operation:</span> the equipment, systems and sites involved, and how your team will maintain it',
    '<span class="font-semibold">Your first solution:</span> where to start, what it\'s worth, and how to reuse it across every plant',
]

const approach = [
    {
        heading: 'Define',
        description: 'Start with what matters most. We learn how your operation runs, agree the problem worth solving first, and define what success looks like.',
        icon: 'i-lucide-target',
    },
    {
        heading: 'Design',
        description: 'Plan for every plant, not just the first. We design the architecture, data models and governance to carry to the next line and the next site.',
        icon: 'i-lucide-pencil-ruler',
    },
    {
        heading: 'Deliver',
        description: 'Build it together, then hand it over. Our engineers work alongside yours, put it into production, and leave your team owning it. It\'s open source, so it\'s still yours in ten years.',
        icon: 'i-lucide-rocket',
    },
]

useSeoMeta({
    title: 'Talk to FlowFuse about your operation',
    description: 'Tell us where your operation is headed. We\'ll shape a first solution with you and show how it scales across your plants.',
    ogImage: '/images/og-book-demo.jpeg',
})
</script>

<template>
  <MqlContactPage
    eyebrow="Talk to our team"
    title="Start with your operation, not our product"
    subtitle="Shape a solution that scales to every plant"
    subtitle-icon="i-lucide-arrow-right"
    description="Tell us where your operation is headed and what's in the way. We'll work out where the data lives, what the solution looks like, and how it scales."
    :highlights="highlights"
  >
    <HubSpotMeetings />
  </MqlContactPage>

  <div class="container m-auto max-w-5xl px-6 pb-20">
    <h2 class="mb-10 text-center">
      From the first conversation <span class="text-indigo-600">to every plant</span>
    </h2>
    <DifferentiatorCards :items="approach" />
  </div>
</template>
