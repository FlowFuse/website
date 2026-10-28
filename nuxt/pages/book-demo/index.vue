<script setup lang="ts">
const highlights = [
    '<span class="font-semibold">The problem:</span> what it costs you today, and what fixed looks like',
    '<span class="font-semibold">The wiring:</span> the PLCs, systems and sites involved, brownfield included',
    '<span class="font-semibold">The first build:</span> what we\'d build first, and how it reuses across every plant',
]

const approach = [
    {
        heading: 'Define',
        description: 'Pick one problem worth solving. We agree on the operational problem, the data behind it, and what success looks like on your floor.',
        icon: 'i-lucide-target',
    },
    {
        heading: 'Design',
        description: 'Build it once, built to reuse. The architecture, data models and governance are made to carry to the next line and the next plant.',
        icon: 'i-lucide-pencil-ruler',
    },
    {
        heading: 'Deliver',
        description: 'Ship it, then hand it over. Our engineers build alongside your team, put it into production, and leave you owning it. It\'s open source, so it\'s still yours in ten years.',
        icon: 'i-lucide-rocket',
    },
]

useSeoMeta({
    title: 'Talk to FlowFuse about your operation',
    description: 'Bring one operational problem. We\'ll scope the fix and show how FlowFuse, our AI and our engineers deliver it across your plants.',
    ogImage: '/images/og-book-demo.jpeg',
})
</script>

<template>
  <MqlContactPage
    eyebrow="Talk to our team"
    title="Bring us one problem from your floor"
    subtitle="Leave with a plan to fix it"
    subtitle-icon="i-lucide-arrow-right"
    description="Tell us what's slowing your plants down. We'll work out where the data lives, what the fix looks like, and who builds it: your team, FlowFuse Expert, or our engineers. A person approves every change before it reaches a machine."
    :highlights="highlights"
  >
    <HubSpotMeetings />
  </MqlContactPage>

  <div class="container m-auto max-w-5xl px-6 pb-20">
    <h2 class="mb-10 text-center">
      We don't hand you a report. We <span class="text-indigo-600">build it with you.</span>
    </h2>
    <DifferentiatorCards :items="approach" />
  </div>
</template>
