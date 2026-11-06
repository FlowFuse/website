<script setup lang="ts">
const highlights = [
    '<span class="font-semibold">What it\'s worth:</span> a first view of the output, cost or risk at stake',
    '<span class="font-semibold">What you already run:</span> how a solution works with your equipment and systems, not instead of them',
    '<span class="font-semibold">How it scales:</span> where to start, and how one solution reaches every plant',
]

const approach = [
    {
        heading: 'Start with the problem',
        description: 'We learn how your operation runs, agree one costly problem worth solving, and set the result we\'ll measure from day one.',
        icon: 'i-lucide-target',
    },
    {
        heading: 'Build together',
        description: 'Not build or buy, but both. Our forward-deployed engineers and your team build the first solution on the FlowFuse platform, working with the systems you already run.',
        icon: 'i-lucide-handshake',
    },
    {
        heading: 'Scale what works',
        description: 'Prove it at one plant, then roll the approved version to every site. Your team owns it, and every change is approved, recorded and reversible.',
        icon: 'i-lucide-rocket',
    },
]

useSeoMeta({
    title: 'Talk to FlowFuse about your operation',
    description: 'Bring us the problem that costs your plants the most. We\'ll help you see what solving it is worth, and how one solution can reach every site.',
    ogImage: '/images/og-book-demo.jpeg',
})
</script>

<template>
  <MqlContactPage
    eyebrow="Talk to our team"
    title="Bring us the problem that costs your plants the most"
    subtitle="See what it's worth to solve, and how to solve it once for every plant"
    subtitle-icon="i-lucide-arrow-right"
    description="This is a conversation about your operation, not a product demo. We'll learn how your plants run, help you size what the problem costs, and tell you honestly whether FlowFuse is the right way to solve it."
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
