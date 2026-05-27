<script setup>
const data = {
    heroTitle: "Still Running Your <span class='text-indigo-600'>Plant on Spreadsheets?</span>",
    description: 'Unlock plant-wide automation and orchestration. FlowFuse gives you the power of real-time workflows and centralized control without the monolith.',
    values: [
        'Coordinate across lines, teams, and recipes, all in one open platform',
        'Automate reporting, handoffs, and continuous improvement projects',
        'Centralized dashboards and workflows accessible plant-wide',
    ],
    hero: { buttonText: 'Request a Demo', buttonLink: '/book-demo/' },
    image: '/landing/images/hero-plant.png',
    imageDescription: 'Engineer monitoring a factory floor while working with the Node-RED interface inside FlowFuse on a desktop screen.',
    problem: {
        title: "Manual Plant Management</span> Holding You Back?",
        description: [
            'Most plants – even highly automated ones – still turn to spreadsheets or ad hoc systems for critical coordination. Old MES and MOM tools break down as needs change, leading to bottlenecks, errors, and frustration.',
            'Without real orchestration, reporting and handoffs stay slow and manual. Improvement projects never scale beyond one line or shift, and nobody in the plant has true real-time visibility.',
        ],
    },
    solution: {
        title: "Plant Orchestration, <span class='text-indigo-600'>the Open Way</span>",
        description: 'FlowFuse brings the flexibility of open-source Node-RED to the entire plant. Connect every asset, line, and team. Build automated workflows, plant-wide dashboards, and recipe-driven processes using visual flows – no more spreadsheet juggling.',
        benefits: [
            { icon: 'arrows-right-left', title: 'Cross-Line Coordination', description: 'Run recipes and workflows across multiple lines, hand off automatically, and track results – all in one place.' },
            { icon: 'cog', title: 'Centralized Automation', description: 'Automate reporting, downtime analysis, quality checks, and more plant-wide, not just in pockets.' },
            { icon: 'eye', title: 'Real-Time Plant Visibility', description: 'See the status of every line, team, and asset with shared dashboards. Catch issues before they scale.' },
            { icon: 'arrow-trending-up', title: 'Plant-Wide Improvement', description: 'Turn every project into a repeatable flow. Empower teams to iterate and improve at scale.' },
        ],
    },
    testimonialsTitle: "From Spreadsheets to  <span class='text-indigo-600'>Smart Plants</span>",
    useCases: {
        title: "How Modern Plants Use <span class='text-indigo-600'>FlowFuse</span>",
        image: '/landing/images/use-cases-plant.png',
        imgAlt: 'Plant workers looking at a screen with a dashboard',
        case: [
            { title: 'Recipe Management & Rollout', description: 'Digitize, update, and roll out process recipes plant-wide, eliminating spreadsheets and manual checks.' },
            { title: 'Cross-Line Coordination', description: 'Automate production handoffs and improvement initiatives across multiple lines, teams, or even sites.' },
            { title: 'Plant Reporting & Visibility', description: 'Centralize reporting and dashboards so any team can see plant status in real time and act fast.' },
            { title: 'Continuous Improvement at Scale', description: 'Build, update, and deploy process improvements as visual flows, sharing and collaborating across teams.' },
        ],
    },
    how: {
        title: "<span class='text-indigo-600'>Upgrade Plant Operations</span> in 3 Steps",
        steps: [
            { title: 'Unite Data & Devices', description: 'Connect all plant assets, lines, and teams via Node-RED flows.' },
            { title: 'Build Automated Workflows & Dashboards', description: 'Create cross-line logic, reporting, and orchestration visually – no code, no spreadsheets.' },
            { title: 'Launch & Scale', description: 'Deploy plant-wide, monitor and improve from a central dashboard, and empower your teams to own innovation.' },
        ],
    },
    features: {
        title: "Everything You Need for <span class='text-indigo-600'>the Modern Plant</span>",
        features: [
            { icon: 'cog', title: 'Recipe and workflow automation' },
            { icon: 'building-office-2', title: 'Multi-line and multi-site orchestration' },
            { icon: 'chart', title: 'Centralized dashboards & reporting' },
            { icon: 'shield-check', title: 'Plant-wide permissions and controls' },
            { icon: 'arrow-trending-up', title: 'Continuous improvement workflow engine' },
            { icon: 'puzzle-piece', title: 'Integration with legacy MES/ERP' },
            { icon: 'cursor-arrow-rays', title: 'Visual, low-code builder for all teams' },
        ],
    },
    ctaSection: {
        title: 'Move From Spreadsheets to Smart Plant',
        description: 'See how FlowFuse lets you orchestrate and automate at scale. Book a live demo and transform your plant operations.',
        primaryCta: 'Book a Demo',
        secondaryCta: 'Start Free Trial',
    },
}
useHead({
    title: 'Still Running Your Plant on Spreadsheets?',
    meta: [{ name: 'description', content: 'Unlock plant-wide automation and orchestration. FlowFuse gives you the power of real-time workflows and centralized control without the monolith.' }],
})
</script>

<template>
  <div class="w-full page hero"><div class="content"><AbmLanding v-bind="data" /></div></div>
</template>
