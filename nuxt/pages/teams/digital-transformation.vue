<script setup lang="ts">
const PAGE = {
    slug: 'digital-transformation',
    metaTitle: 'Digital Transformation: From Pilot to Every Plant | FlowFuse',
    metaDescription: 'Turn successful pilots into one standard every plant adopts. FlowFuse helps digital transformation teams scale on the systems plants already run.',
    hero: {
        eyebrow: 'For digital transformation leaders',
        title: ['Take Digital Transformation', 'From Pilot to Every Plant'] as [string, string],
        subtext: 'Prove a use case at one plant, turn it into a standard the other sites actually want, and show the business what it delivered. FlowFuse builds on the systems your plants already run.',
        imagePlaceholder: 'Hero image: digital transformation leader',
        image: { src: '/images/teams/hero-digital-transformation.webp', alt: 'A plant leader with a tablet standing on a mezzanine, looking out over a multi-level industrial facility' },
    },
    outcomes: {
        heading: ['Show Results at Every Plant,', 'Not Just the Pilot Site'] as [string, string],
        intro: 'Operations wants results it can see. IT wants it governed. And leadership keeps asking why the pilot hasn\'t reached the other plants. Here\'s what changes with FlowFuse:',
        items: [
            { label: 'Adoption', title: 'A standard plants choose to use', detail: 'Plants take it up because it fixes problems they already track, so adoption doesn\'t depend on a mandate from the center.', icon: 'i-lucide-thumbs-up' },
            { label: 'Speed', title: 'The next plant starts from what\'s proven', detail: 'Each new site starts from the version that already works, so a rollout is a deployment, not another project.', icon: 'i-lucide-zap' },
            { label: 'Value', title: 'Results the business can compare', detail: 'Every site reports the same measures the same way, so you can show what the program delivered, plant by plant.', icon: 'i-lucide-trending-up' },
            { label: 'Control', title: 'A program that stays governed as it grows', detail: 'More plants can join without the program drifting, because who builds, who deploys and what changed are always on record.', icon: 'i-lucide-shield-check' },
        ],
    },
    solutions: {
        heading: ['What FlowFuse Adds to Your', 'Digital Transformation Program'] as [string, string],
        intro: 'The data foundation, plant applications and rollout control that turn one successful pilot into a network-wide standard.',
        cards: [
            {
                eyebrow: 'One Data Foundation Across Plants',
                title: 'Every machine and system, connected and structured the same way.',
                description: 'Old and new equipment, MES, ERP and SCADA connected at every site without ripping anything out, with the data shaped the same way so it\'s ready for analytics and AI.',
                points: [
                    'Siemens, Allen-Bradley, OPC UA, Modbus, MQTT and 5,000+ other integrations',
                    'Consistent naming and structure, so data from every plant compares',
                    'Plant data delivered to your data lake, cloud or AI tools',
                ],
                image: { src: '/images/use-cases/mes/flow-editor.webp', alt: 'Node-RED flow publishing PLC data to structured plant, area and line topics', fit: 'cover' },
                link: { to: '/integrations/', label: 'Browse all integrations' },
            },
            {
                eyebrow: 'Build the Use Cases Plants Ask For',
                title: 'Applications your core systems don\'t cover.',
                description: 'OEE, downtime, quality and energy applications, built by your team or the plants\' own engineers rather than added to a vendor\'s backlog.',
                points: [
                    'Blueprints for common plant use cases to start from',
                    'The same KPIs calculated the same way at every site',
                    'An AI assistant that drafts flows and dashboards for engineers to review',
                ],
                image: { src: '/images/use-cases/scada/oee-dashboard.webp', alt: 'OEE dashboard showing gauges, downtime and production data for a line', fit: 'cover' },
                link: { to: '/blueprints/', label: 'Browse Blueprints' },
            },
            {
                eyebrow: 'Roll Out Without Rebuilding',
                title: 'Prove it once, deploy it to every plant.',
                description: 'A proven application is promoted through stages and deployed to a group of sites, with each plant\'s differences held in its own settings.',
                points: [
                    'Development, test and production stages',
                    'Deployment by site, region or line',
                    'Version history and rollback for every application',
                ],
                image: { src: '/images/teams/pipelines-plants.webp', alt: 'FlowFuse DevOps pipeline deploying from development to production', fit: 'cover' },
                link: { to: '/use-cases/remote-device-management/', label: 'See rollouts across every plant' },
            },
            {
                eyebrow: 'Run the Program From One Place',
                title: 'Every site, every version and every change in one view.',
                description: 'One platform that IT and the plants both work in. Your central team sees what\'s running where, who changed it and when, and decides who can build and deploy.',
                points: [
                    'Role-based access and single sign-on',
                    'An audit log of every change',
                    'Remote updates, without site visits',
                ],
                image: { src: '/images/teams/digital-transformation-audit-log.webp', alt: 'FlowFuse team Audit Log listing recent events on an OT gateway: flow deployments, Node-RED settings changes, nodes installed and removed, and remote access enabled', fit: 'cover' },
                link: { to: '/platform/security/', label: 'See platform security' },
            },
        ],
    },
    support: {
        heading: ['Your Team Sets the Standard.', 'We Help You Scale It.'] as [string, string],
        intro: 'We work alongside your central team from the first use case, and stay with you as it reaches every plant.',
        items: [
            { title: 'Finding the first use case', description: 'Our engineers help you pick a first use case with a clear result and an owner at the plant, shape the business case behind it, then build it with your team.', icon: 'i-lucide-target' },
            { title: 'A small team for many plants', description: 'Your central team sets the standard and the guardrails, and we help train people at each site to work within them, so a team of a few can support many plants.', icon: 'i-lucide-users' },
            { title: 'Never locked in', description: 'FlowFuse is built on open-source Node-RED. Everything you build belongs to you, and your team can change it without waiting on us.', icon: 'i-lucide-lock-open' },
        ],
    },
    proof: {
        heading: ['Proof the', 'Standard Scales'] as [string, string],
        intro: 'Results FlowFuse customers have published from rolling one standard out across their plants.',
        items: [
            { number: '20+', text: 'manufacturing sites on one standard, run from a single platform' },
            { number: 'Hour, not months', text: 'to bring a new production unit onto Walter\'s standard, with no new IT hires' },
            { number: 'Thousands', text: 'of plant devices at a large US manufacturer, managed by a central team of five' },
            { number: '10x', text: 'faster from idea to a running plant application with FlowFuse Expert' },
        ],
    },
    faq: {
        heading: ['Digital Transformation', 'FAQs'] as [string, string],
        items: [
            {
                question: 'How does this fit with the MES and ERP in our roadmap?',
                answer: 'It sits alongside them. MES and ERP keep their roles, and FlowFuse connects them to the plant floor and to each other, so your roadmap gains a common layer instead of another multi-year rollout.',
            },
            {
                question: 'Isn\'t this just another point solution?',
                answer: 'No. It\'s the layer your point solutions plug into, so plants stop collecting one-off tools. [Walter](/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/) replaced five separate machine-connectivity systems with FlowFuse.',
            },
            {
                question: 'What should our first use case be?',
                answer: 'One with a clear owner and a number the plant already watches, such as downtime on a bottleneck line or energy on a major asset. Keep it to one line or asset so it shows a result fast, and let that result make the case for the next plant.',
            },
            {
                question: 'How do we stop plants building their own one-offs?',
                answer: 'Set the standard centrally and let plants adapt within it. Roles decide who can build and who can deploy, and every change moves through stages, so plants can adjust the standard without copying it.',
            },
            {
                question: 'We already run Node-RED in some plants. Can FlowFuse bring it under one standard?',
                answer: 'Yes, and it\'s one of the most common ways programs start. Existing flows move under central management, so scattered projects become one governed program.',
            },
            {
                question: 'Where does AI fit?',
                answer: 'At both ends. Your data platform gets consistent plant data to build on, and [FlowFuse AI Nodes](/ai/) run your own or a vendor\'s models at the plant (in the open ONNX format), so a model can act on the line, not just in a report.',
            },
            {
                question: 'Will IT and security approve it?',
                answer: 'It\'s built for their review. Run it in the cloud, on your own servers or air-gapped. Plants connect outward with no inbound ports to open. Single sign-on, role-based access and audit logging cover the controls IEC 62443 and NIS2 assessments look for, and FlowFuse is SOC 2 Type I and Type II certified.',
            },
            {
                question: 'How is FlowFuse priced when budgets sit with the plants?',
                answer: 'Per instance, meaning each running application or connected device. A first plant can start small, each plan includes a set number of instances, and volume discounts apply as the program reaches hundreds or thousands. Tell us how many plants you plan to reach and we\'ll model the cost with you.',
            },
        ],
    },
    cta: {
        heading: 'Pick One Use Case and One Plant',
        body: 'Choose a result the plant already cares about, prove it there with your team and ours, then roll it out as the standard across your network.',
        buttons: ['bookDemo', 'signUp'] as Array<'bookDemo' | 'signUp'>,
    },
}
</script>

<template>
  <TeamPage :page="PAGE" />
</template>
