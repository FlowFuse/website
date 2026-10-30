<script setup lang="ts">
const PAGE = {
    slug: 'maintenance-reliability',
    metaTitle: 'Maintenance & Reliability: From Reactive to Planned | FlowFuse',
    metaDescription: 'Move every site from reactive to planned maintenance. FlowFuse turns machine conditions into CMMS work orders for maintenance and reliability teams.',
    hero: {
        eyebrow: 'For maintenance & reliability leaders',
        title: ['Every Site\'s Maintenance & Reliability,', 'From Reactive to Planned'] as [string, string],
        subtext: 'Catch failing equipment while there\'s still time to plan the repair, send the work order straight to your CMMS, and roll out what works site by site. FlowFuse connects your equipment to your maintenance and reliability teams.',
        imagePlaceholder: 'Hero image: maintenance & reliability leader',
        image: { src: '/images/teams/hero-maintenance-reliability.webp', alt: 'A maintenance and reliability leader and a technician in hard hats inspecting a press machine on the plant floor with a tablet' },
    },
    outcomes: {
        heading: ['Fewer Breakdowns,', 'Without a Bigger Maintenance Budget'] as [string, string],
        intro: 'Production wants the machines running. Finance wants the budget held. And your boss wants to hear about a problem when it starts, not after something breaks. Here\'s what changes with FlowFuse:',
        items: [
            { label: 'Downtime', title: 'Fewer surprise breakdowns', detail: 'Equipment drifting out of range raises a warning early, so more repairs go on the schedule and fewer on the breakdown list.', icon: 'i-lucide-clock' },
            { label: 'MTBF', title: 'Maintenance based on condition, not the calendar', detail: 'PM effort follows what the equipment is actually doing, so your teams spend their hours where the wear is.', icon: 'i-lucide-activity' },
            { label: 'MTTR', title: 'Shorter repairs', detail: 'Work orders carry the readings that triggered them, so repairs start with the facts, not a diagnosis.', icon: 'i-lucide-wrench' },
            { label: 'Cost', title: 'A maintenance budget with a return you can show', detail: 'You can set each avoided breakdown against the lost production and repair it would have cost, and give finance the numbers it asks for.', icon: 'i-lucide-piggy-bank' },
        ],
    },
    solutions: {
        heading: ['What FlowFuse Adds to Your', 'Maintenance & Reliability Program'] as [string, string],
        intro: 'The condition data, warnings and work orders your plants are missing, built on the equipment and CMMS you already run.',
        cards: [
            {
                eyebrow: 'Connect Every Plant\'s Equipment',
                title: 'Condition data from the equipment you already own.',
                description: 'Older machines, OEM equipment and new lines alike, connected without changing PLC programs or replacing anything.',
                points: [
                    'Siemens, Allen-Bradley, OPC UA, Modbus, MQTT and 5,000+ other integrations',
                    'Readings from sensors you add where equipment has none',
                    'No rip-and-replace, no new controllers',
                ],
                image: { src: '/images/use-cases/mes/flow-editor.webp', alt: 'Node-RED flow reading S7, Allen-Bradley, OPC UA and Modbus sources', fit: 'cover' },
                link: { to: '/integrations/', label: 'Browse all integrations' },
            },
            {
                eyebrow: 'Warnings Your Teams Trust',
                title: 'Limits set by your own reliability engineers.',
                description: 'The people who know each asset decide what abnormal looks like, so warnings mean something and nuisance alarms don\'t wear down trust.',
                points: [
                    'Limits and trends on the signals that come before failure',
                    'Warnings routed to the right team at each site',
                    'One tuning change applied everywhere',
                ],
                image: { src: '/images/teams/maintenance-condition-dashboard.webp', alt: 'FlowFuse Dashboard showing vibration, bearing temperature, motor current and oil pressure gauges, a 24-hour vibration trend crossing its warning limit, and a table of assets with active warnings', fit: 'cover' },
                link: { to: '/platform/dashboard/', label: 'See FlowFuse Dashboard' },
            },
            {
                eyebrow: 'Straight Into Your CMMS',
                title: 'Warnings become planned work orders.',
                description: 'When a limit is crossed, a work order lands in the maintenance system your teams already use, with the evidence attached, so planned work grows and data entry doesn\'t.',
                points: [
                    'Works with SAP PM, IBM Maximo, Infor EAM, MaintainX, Fiix or whichever CMMS you run',
                    'No double entry for technicians',
                    'Every failure and its cause logged for root-cause review',
                ],
                image: { src: '/images/teams/maintenance-warning-to-work-order.webp', alt: 'Node-RED flow that subscribes to a pump vibration tag over OPC UA, publishes a warning over MQTT when it passes its limit, then builds a work order, creates it in the CMMS and logs the failure and cause', fit: 'cover' },
                link: { to: '/use-cases/it-ot-middleware/', label: 'See IT/OT integration' },
            },
            {
                eyebrow: 'One Asset Type First, Then Every Site',
                title: 'Prove it at one plant, then make it your standard.',
                description: 'Start with the equipment that costs you most. Once it proves itself, the same monitoring goes to every plant that runs it, managed centrally.',
                points: [
                    'Rolled out by site, line or asset type',
                    'Updates pushed remotely, without a site visit',
                    'Each site\'s limits kept in its own settings',
                ],
                image: { src: '/images/teams/maintenance-device-groups.webp', alt: 'FlowFuse Groups view for a manufacturing team showing Europe, America and Japan device groups, each with its target snapshot and device count', fit: 'cover' },
                link: { to: '/use-cases/remote-device-management/', label: 'Manage every site remotely' },
            },
        ],
    },
    support: {
        heading: ['Your Team Keeps the Machines Running.', 'We Help With the Rest.'] as [string, string],
        intro: 'Your people are already stretched between breakdowns and PMs. We work alongside them from the first asset, so monitoring never becomes another job on their list.',
        items: [
            { title: 'We set up the first one with you', descriptionLinks: [
                { text: 'Our engineers connect your first asset type, set the warning limits with your reliability engineers, and get the first work order into your CMMS. ' },
                { text: 'Platform', href: '/product/' },
                { text: ' and ' },
                { text: 'Certified Node', href: '/integrations/?certified=1' },
                { text: ' support is covered by an SLA.' },
            ], icon: 'i-lucide-handshake' },
            { title: 'Your team learns to run it', description: 'Your engineers build alongside ours and come away able to add the next asset type themselves, without needing a data team.', icon: 'i-lucide-graduation-cap' },
            { title: 'We stand with you in the IT review', descriptionLinks: [
                { text: 'We answer security\'s questions with you: cloud, ' },
                { text: 'self-hosted', href: '/docs/install/introduction/' },
                { text: ' or air-gapped, ' },
                { text: 'single sign-on', href: '/platform/security/' },
                { text: ', ' },
                { text: 'audit logs', href: '/platform/security/' },
                { text: ', and ' },
                { text: 'SOC 2 Type I and Type II certification', href: '/platform/security/#certifications' },
                { text: '.' },
            ], icon: 'i-lucide-shield-check' },
        ],
    },
    proof: {
        heading: ['What Customers', 'Have Done With It'] as [string, string],
        intro: 'Results FlowFuse customers and partners have published.',
        items: [
            { number: 'Hours, not months', text: 'to connect a new production unit at Walter, with the IT team it already had' },
            { number: 'Half a shift', text: 'of every shift spent driving to remote pumps at Paloma, until automated alerts ended the routine visits' },
            { number: '24/7', text: 'health monitoring across hundreds of critical substation nodes at Energinet, run by a small operations team' },
            { number: '7 sites', text: 'running one micro-stop detection application at a food producer, built once and deployed centrally' },
        ],
    },
    faq: {
        heading: ['Maintenance & Reliability', 'FAQs'] as [string, string],
        items: [
            {
                question: 'Do we have to replace our CMMS?',
                answer: 'No. FlowFuse handles the equipment side and feeds whichever CMMS or EAM you already run, from SAP PM and Maximo to MaintainX, using [integrations](/integrations/) to connect the systems. Your teams keep working in the system they know.',
            },
            {
                question: 'Will it work with the equipment across our plants?',
                answer: 'Usually, yes. Most plants run a mix of old, new and OEM equipment, and FlowFuse reads from most of it through [industrial integrations](/integrations/) without changing PLC programs. Where a machine exposes no data, sensors can be added.',
            },
            {
                question: 'How does this fit our reliability program?',
                answer: 'It supports the program you already run, whether that\'s TPM or reliability-centered maintenance. Condition turns into scheduled work, and every failure is logged with its cause for root-cause review. See how [condition data can drive planned maintenance](/use-cases/production-line-monitoring/).',
            },
            {
                question: 'Do you provide the prediction model?',
                answer: 'Most teams don\'t need one to start. Limits and trends on the right signals catch the failures you already know about. When you\'re ready for machine learning, [FlowFuse AI Nodes](/ai/) run your own or a vendor\'s models at the plant (in the open ONNX format) and act on what they find.',
            },
            {
                question: 'What do we need on our side to start?',
                answer: 'One asset type, access to its PLC or sensors, a reliability engineer who knows how it fails, and access to your CMMS. Browse [supported integrations](/integrations/) and [talk with our team](/contact-us/); our engineers handle the rest with you.',
            },
            {
                question: 'We already pay for condition monitoring. Where does FlowFuse fit?',
                answer: 'Alongside it. FlowFuse brings your condition-monitoring vendor\'s alerts together with PLC and machine data through [integrations](/integrations/), and turns them into work orders in your CMMS, so the monitoring you\'ve paid for starts driving planned work.',
            },
            {
                question: 'How do we show the return?',
                answer: 'Pick the asset type whose failures cost most last year, in lost production plus repair. Track every warning and what the technician found, and the savings make the case for the next asset type and the next site.',
            },
            {
                question: 'How is FlowFuse priced?',
                answer: 'Per instance, meaning each running application or connected device. Each plan includes a set number of instances, and there are volume discounts for rollouts of hundreds or thousands. See [FlowFuse pricing](/pricing/), or tell us how many sites and assets you expect and we\'ll model the cost with you.',
            },
        ],
    },
    cta: {
        heading: 'Start With the Equipment That Costs You Most',
        body: 'Pick the asset type whose failures cost most across your plants, prove it at one site, and send the first warnings into your CMMS. Once it has caught its first failures, roll it out to every site that runs it.',
        buttons: ['signUp', 'bookDemo'] as Array<'bookDemo' | 'signUp'>,
    },
}
</script>

<template>
  <TeamPage :page="PAGE" />
</template>
