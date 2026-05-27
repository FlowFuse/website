<script setup>
const data = {
    hero: {
        headline: 'Coordinating industrial systems at scale —',
        headlineHighlight: 'beyond point tools',
        intro1: "Many tools solve individual integration or automation problems. But industrial organizations rarely have just one use case. The challenge isn't the tools themselves — it's coordinating how they work together.",
        intro2: "They need <span class='font-medium'>a system that connects, scales, and adapts</span> across the entire operation.",
        image: '/landing/images/unified-real-time-data-platform.png',
        imageAlt: 'Industrial facility with coordinated automation systems',
        buttonText: 'Get the brief',
    },
    leftCard: {
        title: 'Point solutions',
        items: [
            { icon: 'adjustments-horizontal', text: "Built for <span class='font-medium'>single use cases</span>" },
            { icon: 'arrows-pointing-out', text: "<span class='font-medium'>Limited scalability</span> across sites and teams" },
            { icon: 'puzzle-piece', text: "<span class='font-medium'>Fragmented</span> integrations and workflows" },
            { icon: 'shield-exclamation', text: "<span class='font-medium'>No centralized</span> governance" },
            { icon: 'wrench-screwdriver', text: "<span class='font-medium'>Difficult</span> to extend or adapt over time" },
            { icon: 'clock', text: "<span class='font-medium'>Not</span> designed for <span class='font-medium'>real-time</span> orchestration" },
        ],
    },
    rightCard: {
        title: 'Industrial Application Platform<br>(FlowFuse Approach)',
        items: [
            { icon: 'link', text: "<span class='font-medium'>Connect, collect, build, and scale</span> in one platform" },
            { icon: 'squares-2x2', text: "Supports <span class='font-medium'>multiple use cases</span> across the organization" },
            { icon: 'uns', text: "<span class='font-medium'>Centralized management</span> of workflows, devices, and applications" },
            { icon: 'share', text: "Event-driven data <span class='font-medium'>orchestration across IT and OT</span>" },
            { icon: 'sparkles', text: "<span class='font-medium'>AI-assisted</span> development to accelerate use case delivery" },
            { icon: 'lock-open', text: "Extend existing systems <span class='font-medium'>without vendor lock-in</span>" },
        ],
    },
    takeaway: {
        para1: 'Point tools solve isolated problems.',
        para2: "FlowFuse enables organizations to <span class='font-medium'>build a scalable, event-driven industrial application layer</span> across their entire operation.",
    },
    form: { title: 'Download the brief' },
    hubspotFormId: '9626d5d4-386c-466a-95d9-6fc78820e7e7',
}
useHead({
    title: 'Coordinating Industrial Systems at Scale — Beyond Point Tools | FlowFuse',
    meta: [
        { name: 'description', content: 'Point tools solve isolated problems. See how FlowFuse enables a scalable, event-driven industrial application layer across your entire operation.' },
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
