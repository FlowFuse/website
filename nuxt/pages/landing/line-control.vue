<script setup>
const data = {
    heroTitle: "<span class='text-indigo-600'>Operators Flying Blind?</span> Not Anymore",
    description: 'Give your line teams instant visibility and control. FlowFuse delivers real-time HMI and line orchestration, no code required.',
    values: [
        'Custom HMIs built and deployed in days – not months',
        'Real-time alarms and production data delivered to any screen',
        'Empower engineers to adapt, own, and improve their lines',
    ],
    hero: { buttonText: 'Request a Demo', buttonLink: '/book-demo/' },
    image: '/landing/images/hero-line-control.png',
    imageDescription: 'Plant worker interacting with an HMI',
    problem: {
        title: "Alarm Fatigue. Manual Controls. <span class='text-indigo-600'>Flying Blind?</span>",
        description: [
            'Fragmented controls and outdated HMI systems mean operators constantly juggle alarms and manual processes. With poor visibility, errors and downtime slip by unnoticed. Customizing old systems takes months and costs a fortune – so teams stick with spreadsheets and sticky notes.',
            'Your line engineers can’t adapt quickly. The result? Alarm fatigue, slow reactions, and missed improvement opportunities.',
        ],
    },
    solution: {
        title: "<span class='text-indigo-600'>Line-Level Control</span> Made Simple",
        description: 'Build and deploy modern HMIs and line orchestration apps with visual flows – no custom software, no SCADA headaches.',
        benefits: [
            { icon: 'bell-alert', title: 'Real-Time Alarms & Status', description: 'Get instant alerts, monitor run conditions, and see live data for every line, all from a unified dashboard.' },
            { icon: 'adjustments-horizontal', title: 'Customizable HMIs', description: 'Design operator screens for every station and device. Adapt flows as needs change, with rapid visual configuration.' },
            { icon: 'wrench-screwdriver', title: 'Engineer Empowerment', description: 'Put controls in the hands of your engineers. Make improvements, troubleshoot, and scale new features in hours, not weeks.' },
            { icon: 'bolt', title: 'Rapid Deployment', description: 'Go from whiteboard to working solution in days. No vendor bottlenecks, no custom code, no endless consulting.' },
        ],
    },
    testimonialsTitle: "Proven on <span class='text-indigo-600'>Hundreds of Lines</span>",
    useCases: {
        title: "How Line Teams Use <span class='text-indigo-600'>FlowFuse</span>",
        image: '/landing/images/line-solution.png',
        imgAlt: 'Plant workers looking at a screen with a dashboard',
        case: [
            { title: 'Real-Time Line Dashboards', description: 'Give operators and managers instant visibility into production status, alarms, efficiency, and bottlenecks' },
            { title: 'Empower Engineers', description: 'Let your team adapt controls, build custom screens, and react quickly to process changes – without waiting for IT or vendors.' },
            { title: 'Alarm Management', description: 'Centralize and customize alarms across multiple systems, reducing noise and enabling rapid action.' },
            { title: 'Rapid HMI Deployment', description: 'Replace legacy panels with modern, flexible HMIs tailored to every station and team.' },
        ],
    },
    how: {
        title: "Get Your Line <span class='text-indigo-600'>Flowing in 3 Steps</span>",
        steps: [
            { title: 'Map Line Devices & Data', description: 'Connect PLCs, sensors, and controllers to Node-RED with drag-and-drop flows.' },
            { title: 'Build Custom HMIs', description: 'Design operator screens, dashboards, and alarm logic visually – no coding required.' },
            { title: 'Deploy & Monitor', description: 'Push flows to the line instantly, monitor performance, and update as needs change.' },
        ],
    },
    features: {
        title: "Everything You Need to <span class='text-indigo-600'>Own Your Line</span>",
        features: [
            { icon: 'squares-plus', title: 'User-friendly visual flow builder' },
            { icon: 'computer-desktop', title: 'HMI and dashboard templates' },
            { icon: 'bell-alert', title: 'Alarm management & escalation' },
            { icon: 'rocket-launch', title: 'Rapid deployment to production' },
            { icon: 'lock-closed', title: 'Secure access, versioning & rollback' },
            { icon: 'queue-list', title: 'Multi-line orchestration' },
            { icon: 'arrow-path-rounded-square', title: 'Integration with MES/ERP/Cloud' },
        ],
    },
    ctaSection: {
        title: 'Put Control Back in Operator Hands',
        description: 'See how FlowFuse empowers your line teams to improve efficiency, reduce downtime, and own their workflows.',
        primaryCta: 'Request a Demo',
        secondaryCta: 'Start Free Trial',
    },
}
useHead({
    title: 'Operators Flying Blind?',
    meta: [{ name: 'description', content: 'Give your line teams instant visibility and control. FlowFuse delivers real-time HMI and line orchestration, no code required.' }],
})
</script>

<template>
  <div class="w-full page hero"><div class="content"><AbmLanding v-bind="data" /></div></div>
</template>
