<script setup lang="ts">
const PAGE = {
    slug: 'manufacturing-operations',
    metaTitle: 'Manufacturing Operations: Every Plant on Plan | FlowFuse',
    metaDescription: 'See output, downtime and quality live at every plant, on equipment you already run. FlowFuse helps manufacturing operations leaders hit plans across sites.',
    hero: {
        eyebrow: 'For multi-plant leaders',
        title: ['Every Plant on Plan,', 'Across Your Manufacturing Operations'] as [string, string],
        subtext: 'Know how every plant is doing while there\'s still time to recover the shift, compare sites on numbers nobody argues about, and roll out what works. FlowFuse connects your manufacturing operations to make it happen.',
        imagePlaceholder: 'Hero image: plant director at the control room screens',
        image: { src: '/images/teams/hero-manufacturing-operations.webp', alt: 'A plant operator in a hard hat and hi-vis jacket watching a control room wall of plant monitoring screens' },
    },
    outcomes: {
        heading: ['Move the KPIs', 'You\'re Already Measured On'] as [string, string],
        intro: 'Every review starts with the same question: how did we do? FlowFuse doesn\'t add another metric to answer it. It moves the ones already on your scorecard.',
        items: [
            { label: 'Quality', title: 'Fewer escapes, fewer complaints', detail: 'Problems are caught at the line, before they turn into a containment, a return or a red mark on your customer\'s scorecard.', icon: 'i-lucide-shield-check' },
            { label: 'Delivery', title: 'Make the plan, or know early why you won\'t', detail: 'A slipping line shows up while the shift can still recover, not in tomorrow\'s meeting or as premium freight at the end of the week.', icon: 'i-lucide-truck' },
            { label: 'Cost', title: 'Lower cost per unit, without new capital', detail: 'Output lost to short stops and slow cycles is won back on equipment you already own, before you approve new capex or another weekend of overtime.', icon: 'i-lucide-trending-down' },
            { label: 'People', title: 'Stronger teams, less paperwork', detail: 'Supervisors and engineers stop chasing numbers, operators see how their own line is doing, and what your most experienced people know is built into how every line runs.', icon: 'i-lucide-users' },
        ],
    },
    solutions: {
        heading: ['What FlowFuse Adds to', 'Your Plants and Your Teams'] as [string, string],
        intro: 'The visibility, tools and standards your plants are missing, built on the systems they already run, by the teams you already have.',
        cards: [
            {
                eyebrow: 'Connected Plants',
                title: 'One true picture of every plant.',
                description: 'The numbers in your review come straight from the plant floor, so the conversation is about what to do, not whether the numbers are right.',
                points: [
                    'Every plant included, whatever the age of its equipment',
                    'Plant, division and company views drawn from the same source',
                    'Figures available as each shift runs, not at month-end',
                ],
                image: { src: '/images/teams/manufacturing-all-plants-dashboard.webp', alt: 'FlowFuse Dashboard comparing five plants: company OEE, availability, performance and quality gauges, a seven-day OEE trend per plant against the 85% target, and a table of each plant\'s figures', fit: 'cover' },
                link: { to: '/use-cases/production-line-monitoring/', label: 'See production line monitoring' },
            },
            {
                eyebrow: 'What Your Systems Don\'t Cover',
                title: 'Your plants get the tools they\'ve been missing.',
                description: 'Your teams build what each plant actually needs, in weeks, not on a vendor\'s timeline or as another large IT project.',
                points: [
                    'Paper logs and end-of-shift spreadsheets replaced by live records',
                    'Line displays tied to the targets you set',
                    'Automatic action when something goes wrong: suspect product held and the right people alerted before it moves down the line',
                    'Built with the people who\'ll use them, so they\'re still in use long after launch',
                ],
                image: { src: '/images/use-cases/scada/alert-escalation.webp', alt: 'Node-RED flow escalating a high-priority alarm by email and SMS', fit: 'cover' },
                link: { to: '/use-cases/mes/', label: 'Explore FlowFuse for MES' },
            },
            {
                eyebrow: 'One Standard, Every Plant',
                title: 'Your best plant\'s way of working, everywhere.',
                description: 'What works in one plant is carried to the rest, adapted where a plant differs instead of rebuilt from scratch.',
                points: [
                    'Every plant kept up to date from one place',
                    'Issues at a distant site resolved without sending anyone',
                    'Changes introduced one plant at a time, so production is never put at risk',
                ],
                image: { src: '/images/teams/pipelines-plants.webp', alt: 'FlowFuse DevOps pipeline deploying from development to production', fit: 'cover' },
                link: { to: '/use-cases/remote-device-management/', label: 'Manage every plant remotely' },
            },
            {
                eyebrow: 'More From the Team You Have',
                title: 'Get more improvement out of the engineers you already have.',
                description: 'Built-in AI takes on the routine build work, so your engineers spend their time on the problems that move your numbers.',
                points: [
                    'New solutions delivered faster, without adding headcount',
                    'Ideas from the floor turned into working solutions quickly',
                    'Your team reviews every change before it goes live',
                ],
                image: { src: '/images/teams/expert-assistant.webp', alt: 'FlowFuse Expert assistant next to a Node-RED flow', fit: 'cover' },
                link: { to: '/ai/', label: 'See FlowFuse AI' },
            },
        ],
    },
    support: {
        heading: ['You\'re Never Alone,', 'and Never Locked In.'] as [string, string],
        intro: 'We become part of your team from the first conversation, and stay that way long after go-live.',
        items: [
            { title: 'Built together, around your goals', description: 'Our team works alongside yours to build solutions around what you\'re accountable for, and stays close whenever a plant needs help.', icon: 'i-lucide-handshake' },
            { title: 'No lock-in, ever', description: 'FlowFuse is built on open-source Node-RED. Everything you build belongs to you, and your team can change it without waiting on us.', icon: 'i-lucide-lock-open' },
            { title: 'Your team grows with it', description: 'Your engineers learn by building alongside ours, and come away able to run and extend it on their own.', icon: 'i-lucide-graduation-cap' },
        ],
    },
    proof: {
        heading: ['What It', 'Adds Up To'] as [string, string],
        intro: 'Results FlowFuse customers have reported, in the terms you answer for: quality, scale, capacity and headcount.',
        items: [
            { number: '50%', text: 'reduction in scrap rate with real-time operational monitoring' },
            { number: '20+', text: 'manufacturing sites standardized from a single platform, without rebuilding' },
            { number: '8–12 hrs', text: 'a day that Aperia\'s end-of-line test equipment used to sit idle, now put to work' },
            { number: '0', text: 'additional IT staff as Walter scaled machine connectivity across all its sites' },
        ],
    },
    faq: {
        heading: ['Manufacturing Operations', 'FAQs'] as [string, string],
        items: [
            {
                question: 'Do we need to replace our MES, ERP or SCADA?',
                answer: 'No. Whether you run Siemens Opcenter, Rockwell Plex, SAP or something built in-house, it stays in place. FlowFuse connects the machines your MES can\'t reach, handles the workflows it was never built for, and sends the results back into it, so the systems you\'ve already paid for get more useful.',
            },
            {
                question: 'How quickly will we see results?',
                answer: 'Faster than most plant projects, because the first step is small. A typical start is one line and one question: why does it keep stopping? A live downtime view with reasons for that line takes weeks, not a year-long rollout, and what it shows becomes the case for the next line.',
            },
            {
                question: 'Our plants all run different equipment. Will this work?',
                answer: 'Yes. A Siemens line in one plant, Allen-Bradley in another and decades-old machines in a third is normal, and FlowFuse connects all of them. [Walter](/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/) uses the same approach to connect machines of every configuration across all its sites, and each plant still reports the same numbers the same way.',
            },
            {
                question: 'Do we need to hire more engineers?',
                answer: 'No. Walter Tools connected machines across all its sites with the same seven-person IT team it started with. Solutions are reused at the next plant instead of rebuilt, built-in AI handles much of the routine work, and our [partners](/partners/) can add hands for a large rollout.',
            },
            {
                question: 'How does FlowFuse fit with our continuous improvement program?',
                answer: 'It gives it better numbers. The morning tier meeting opens on yesterday\'s downtime by reason and by shift, already counted. A kaizen on a line is measured before and after on the same data, and when an improvement works, it\'s rolled out to similar lines as the new standard instead of living in one team\'s spreadsheet.',
            },
            {
                question: 'What happens when a plant needs help?',
                answer: 'Your engineers can see and fix any plant\'s setup from one place, and push the fix out without anyone travelling to site. Behind them is a FlowFuse team that knows your setup, and a platform backed by a 99.9% uptime commitment.',
            },
            {
                question: 'Will our IT and security teams approve FlowFuse?',
                answer: 'It\'s built for their checklist. FlowFuse runs in the cloud or on your own servers, including fully offline sites, with single sign-on, role-based access, audit trails and [SOC 2 Type I and Type II certification](/platform/security/#certifications). Plants connect out securely, without opening your network to inbound traffic.',
            },
            {
                question: 'How is FlowFuse priced?',
                answer: 'It scales with your deployment, with volume pricing as you add plants, so you start with what one plant needs and grow from there. Tell us which plants you want to begin with and we\'ll scope it with you.',
            },
        ],
    },
    cta: {
        heading: 'Start With the Plant That Worries You Most',
        body: 'Tell us where output is slipping. We\'ll show you what the first line could look like.',
        buttons: ['bookDemo'] as Array<'bookDemo' | 'signUp'>,
    },
}
</script>

<template>
  <TeamPage :page="PAGE" />
</template>
