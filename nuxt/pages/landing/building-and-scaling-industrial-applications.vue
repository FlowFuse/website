<script setup>
const data = {
    hero: {
        headline: 'Building industrial applications works',
        headlineHighlight: 'until you need to scale them',
        intro1: "Most industrial teams start by solving a <span class='font-medium'>single use case</span> — connecting a machine, moving data, or building a workflow.",
        intro2: "That's the right approach early on, the challenge appears when those solutions need to <span class='font-medium'>scale across sites, teams, and systems.</span>",
        image: '/landing/images/building-applications.png',
        imageAlt: 'Industrial engineer working at a computer workstation',
        buttonText: 'Get the brief',
    },
    leftCard: {
        title: 'In-house',
        items: [
            { icon: 'snowflake', text: 'Each use case becomes a <span class="font-medium">separate implementation</span> ("snowflake")' },
            { icon: 'squares-2x2', text: "Difficult to <span class='font-medium'>standardize</span> across plants and teams" },
            { icon: 'users', text: "<span class='font-medium'>High dependency</span> on internal developers and tribal knowledge" },
            { icon: 'pin-slash', text: "<span class='font-medium'>No centralized governance</span>, versioning, or deployment control" },
            { icon: 'wrench-screwdriver', text: "<span class='font-medium'>Increasing maintenance</span> as the number of workflows grows" },
            { icon: 'eye-slash', text: "<span class='font-medium'>Limited visibility</span> across systems and operations" },
            { icon: 'target-view', text: "Hard to ensure <span class='font-medium'>consistency</span> in mission-critical environments" },
        ],
    },
    rightCard: {
        title: 'Industrial Application Platform<br>(FlowFuse Approach)',
        items: [
            { icon: 'check-circle', text: "<span class='font-medium'>Standardized</span> application patterns deployed across sites" },
            { icon: 'pin', text: "<span class='font-medium'>Centralized governance</span>, access control, and versioning" },
            { icon: 'layers', text: "Blueprint-driven deployments ensure <span class='font-medium'>consistency at scale</span>" },
            { icon: 'uns', text: "<span class='font-medium'>Connect</span> any machine, protocol, ERP, or MES system" },
            { icon: 'pulse', text: "<span class='font-medium'>Unified real-time data</span> across all operations" },
            { icon: 'sparkles', text: "Built-in <span class='font-medium'>AI assistance</span> to accelerate development and transformation" },
            { icon: 'shield-check', text: "Designed for production environments with <span class='font-medium'>security and reliability</span>" },
        ],
    },
    takeaway: {
        para1: "Building internally may solve individual problems quickly — but scaling industrial automation requires <span class='font-medium'>operational consistency, governance, and control.</span>",
        para2: "FlowFuse enables teams to move from isolated workflows to a <span class='font-medium'>globally scalable industrial application strategy.</span>",
    },
    form: { title: 'Download the brief' },
    hubspotFormId: '65f61b7f-0cb9-4a52-978a-00c78fb1548a',
}
useHead({
    title: 'Building and Scaling Industrial Applications | FlowFuse',
    meta: [
        { name: 'description', content: 'Most industrial teams can build — the challenge is scaling. See how FlowFuse solves it.' },
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
