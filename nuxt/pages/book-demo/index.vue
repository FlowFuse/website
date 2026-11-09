<script setup lang="ts">
const highlights = [
    '<span class="font-semibold">What it\'s worth:</span> the output, operating cost or risk at stake',
    '<span class="font-semibold">What you already run:</span> how a solution works with your existing equipment and systems, not instead of them',
    '<span class="font-semibold">How it scales:</span> where to start, and how one solution reaches every site',
]

const approach = [
    {
        heading: 'Start with the problem',
        description: 'We learn how your operation runs, agree one costly problem that repeats across your sites, and set the result we\'ll measure.',
        icon: 'i-lucide-target',
    },
    {
        heading: 'Build together',
        description: 'Not build or buy, but both: your team\'s expertise, our forward-deployed engineers and the FlowFuse platform, building on the systems you already run.',
        icon: 'i-lucide-handshake',
    },
    {
        heading: 'Scale what works',
        description: 'The first site proves the solution, then the approved version rolls out to the next. Your team owns it, and pushes each improvement to every site running it.',
        icon: 'i-lucide-rocket',
    },
]

useSeoMeta({
    title: 'Talk to FlowFuse about your operation',
    description: 'Bring us the problem that costs your operation the most. We\'ll help you size what solving it is worth, and how one solution reaches every site.',
    ogImage: '/images/og-book-demo.jpeg',
})
</script>

<template>
  <MqlContactPage
    eyebrow="Talk to our team"
    title="Bring us the problem that costs your operation the most"
    subtitle="Each site goes live faster than the last"
    subtitle-icon="i-lucide-arrow-right"
    description="A conversation about your operation, not a product demo. We'll learn how your sites run, help you size what the problem costs, and tell you honestly whether FlowFuse is the right way to solve it."
    :highlights="highlights"
  >
    <HubSpotMeetings />
  </MqlContactPage>

  <div class="container m-auto max-w-5xl px-6 pb-20">
    <h2 class="mb-10 text-center">
      From the first conversation <span class="text-indigo-600">to every site</span>
    </h2>
    <DifferentiatorCards :items="approach" />
  </div>
</template>
