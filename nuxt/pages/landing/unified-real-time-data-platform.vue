<script setup>
const data = {
    hero: {
        headline: 'From fragmented industrial systems to',
        headlineHighlight: 'a unified, real-time data platform',
        intro1: 'Many industrial organizations already collect data — but it is often siloed across machines, protocols, and systems. In most cases, existing systems already solve 60–70% of the problem.',
        intro2: "The real challenge isn't starting from scratch — it's connecting and extending what's already in place: <span class='font-medium'>data exists, but it is not unified, actionable, or scalable.</span>",
        image: '/landing/images/edge-hero.png',
        imageAlt: 'Industrial facility with connected machines and systems',
        buttonText: 'Get the brief',
    },
    leftCard: {
        title: 'Fragmented',
        items: [
            { icon: 'archive-box-x-mark', text: "<span class='font-medium'>Data trapped</span> in different protocols and systems" },
            { icon: 'hand-raised', text: "<span class='font-medium'>Manual integration</span> between tools" },
            { icon: 'adjustments-vertical', text: "<span class='font-medium'>Limited ability</span> to transform and structure data" },
            { icon: 'clock', text: "<span class='font-medium'>Slow deployment</span> of new use cases" },
            { icon: 'link-slash', text: "<span class='font-medium'>Difficult to connect</span> shop floor data to enterprise systems" },
            { icon: 'building-office-2', text: "High reliance on <span class='font-medium'>vendor-specific solutions</span>" },
        ],
    },
    rightCard: {
        title: 'Event-Driven Data Bridge<br>+ System Agility (FlowFuse Approach)',
        items: [
            { icon: 'link', text: "<span class='font-medium'>Connect anything:</span> machines, PLCs, ERP, MES, cloud services" },
            { icon: 'arrow-path', text: "Convert and unify data across <span class='font-medium'>any protocol</span>" },
            { icon: 'bolt', text: "Event-driven architecture triggers <span class='font-medium'>real-time data flows</span>" },
            { icon: 'sparkles', text: "Build and deploy logic using <span class='font-medium'>AI-assisted</span> low-code tools" },
            { icon: 'arrow-top-right-on-square', text: "<span class='font-medium'>Extend existing systems</span> without replacing them" },
            { icon: 'shield-check', text: "Create a <span class='font-medium'>real-time source of truth</span> across operations" },
        ],
    },
    takeaway: {
        para1: "The challenge is not collecting data — it is making it <span class='font-medium'>usable, connected, and actionable in real time.</span>",
        para2: "FlowFuse turns fragmented systems into a <span class='font-medium'>unified, event-driven industrial data platform.</span>",
    },
    form: { title: 'Download the brief' },
    hubspotFormId: '9f5ee2fb-c62e-42ed-8d7a-bbf5c7e10e8d',
}
useHead({
    title: 'From Fragmented to a Unified, Real-Time Industrial Data Platform | FlowFuse',
    meta: [
        { name: 'description', content: "Most industrial data already exists — but it's siloed and disconnected. See how FlowFuse turns it into a unified, real-time, event-driven platform." },
        { name: 'robots', content: 'noindex' },
    ],
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <LandingComparison v-bind="data" />
    </div>
  </div>
</template>
