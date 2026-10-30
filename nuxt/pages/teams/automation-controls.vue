<script setup lang="ts">
const PAGE = {
    slug: 'automation-controls',
    metaTitle: 'Automation & Controls: One Standard, Every Site | FlowFuse',
    metaDescription: 'Build automation and controls applications once, deploy them across sites in stages, and roll back changes. FlowFuse runs beside your PLCs.',
    hero: {
        eyebrow: 'For automation & controls leaders',
        title: ['One Automation & Controls Standard,', 'Every Change on Record'] as [string, string],
        subtext: 'Take what works at one site to the next without rebuilding it, know which version each site is running, and undo a change that goes wrong. FlowFuse handles the automation and controls applications around your PLCs, and the PLCs stay in charge of the machines.',
        imagePlaceholder: 'Hero image: automation & controls leader',
        image: { src: '/images/teams/hero-automation-controls.webp', alt: 'An automation and controls engineer in a hi-vis vest leaning in to check process control screens' },
    },
    outcomes: {
        heading: ['Scale Automation', 'Without Scaling Risk or Headcount'] as [string, string],
        intro: 'The requests keep coming: more data, more automation, more sites. Your job is to deliver them without stopping a line, and to show your boss it all scales and stays under control. Here\'s what changes with FlowFuse:',
        items: [
            { label: 'Scalability', title: 'One proven application, rolled out site by site', detail: 'It moves to the next plant with only the site settings changed, so each new site is a rollout, not a rebuild.', icon: 'i-lucide-layers' },
            { label: 'Uptime', title: 'Changes tested before they reach the line', detail: 'Each change goes through a test stage first, and one that misbehaves in production can be rolled back.', icon: 'i-lucide-activity' },
            { label: 'Control', title: 'A record of what\'s running and who changed it', detail: 'Each change is logged with who made it, when and on which device, so you can show your boss or the auditor exactly what\'s in place.', icon: 'i-lucide-clipboard-check' },
            { label: 'Headcount', title: 'More sites with the same team', detail: 'A small team can support many sites, and how each application works is visible to everyone, not just the person who built it.', icon: 'i-lucide-users' },
        ],
    },
    solutions: {
        heading: ['The Automation & Controls Layer', 'Around Your PLCs'] as [string, string],
        intro: 'The connectivity, applications and deployment tooling between the PLCs and the rest of the business, managed in one place.',
        cards: [
            {
                eyebrow: 'Connect Old and New Equipment',
                title: 'PLCs, gateways and systems, including legacy and OEM equipment.',
                description: 'Read from the equipment on site and send named, structured data to SCADA, the historian, MES or the cloud.',
                points: [
                    'Siemens, Allen-Bradley, OPC UA, Modbus, MQTT and 5,000+ other integrations',
                    'Works alongside Ignition, Kepware and FactoryTalk',
                    'No changes to PLC logic',
                ],
                image: { src: '/images/use-cases/mes/flow-editor.webp', alt: 'Node-RED flow reading S7, Allen-Bradley, OPC UA and Modbus sources', fit: 'cover' },
                link: { to: '/integrations/', label: 'Browse all integrations' },
            },
            {
                eyebrow: 'Build What Your Systems Don\'t Cover',
                title: 'Applications SCADA and MES weren\'t built for.',
                description: 'Data collection and context, alerts, escalations and dashboards, built by the team on site rather than added to a vendor\'s backlog.',
                points: [
                    'OEE and other Blueprints to start from',
                    'An AI assistant that drafts flows and dashboards',
                    'Results written back to SCADA, MES or ERP',
                ],
                image: { src: '/images/use-cases/scada/oee-dashboard.webp', alt: 'OEE dashboard with availability, performance and quality gauges, downtime and production data for a line', fit: 'cover' },
                link: { to: '/use-cases/scada/', label: 'Explore FlowFuse for SCADA' },
            },
            {
                eyebrow: 'Roll Out in Stages, Roll Back When Needed',
                title: 'DEV, TEST and PROD for the plant floor.',
                description: 'Promote an application through stages, then deploy it to one site, a group or all of them. If a change misbehaves, restore the previous version.',
                points: [
                    'Manual promotion between stages, with optional pull request review',
                    'Site settings held in environment variables',
                    'Automatic snapshots on deploy (applications only, not PLC programs)',
                ],
                image: { src: '/images/teams/pipelines-plants.webp', alt: 'FlowFuse DevOps pipelines from development to production', fit: 'cover' },
                link: { to: '/platform/device-agent/', label: 'See staged rollout and rollback' },
            },
            {
                eyebrow: 'Manage All Sites From One Screen',
                title: 'Device status and versions in one view.',
                description: 'See what each device is running, group devices by site or line, and update them remotely.',
                points: [
                    'Status and running version per device',
                    'Open any device\'s editor from the browser, without a site visit',
                    'Flows keep running if a device loses its connection',
                ],
                image: { src: '/images/use-cases/mes/platform-home.webp', alt: 'FlowFuse home screen with hosted and remote instances', fit: 'cover' },
                link: { to: '/use-cases/remote-device-management/', label: 'Manage every site remotely' },
            },
        ],
    },
    support: {
        heading: ['Your Engineers and Ours,', 'With Nothing Locked In'] as [string, string],
        intro: 'We work as part of your team from the first deployment, and we\'re still there when the last site goes live.',
        items: [
            { title: 'Side by side with your engineers', descriptionLinks: [
                { text: 'From the first deployment, our team works with yours and is there when a site needs help. ' },
                { text: 'Platform', href: '/product/' },
                { text: ' and ' },
                { text: 'Certified Node', href: '/integrations/?certified=1' },
                { text: ' support is covered by an SLA, so there\'s someone to call.' },
            ], icon: 'i-lucide-handshake' },
            { title: 'Never locked in', descriptionLinks: [
                { text: 'FlowFuse is built on open-source ' },
                { text: 'Node-RED', href: '/node-red/' },
                { text: '. What your team builds stays readable, changeable and yours, with no dependency on our roadmap or on any one hardware vendor. Applications are standard Node-RED flows that export as plain JSON.' },
            ], icon: 'i-lucide-lock-open' },
            { title: 'Ready for your CISO', descriptionLinks: [
                { text: 'Run it in the cloud, ' },
                { text: 'on your own servers or air-gapped', href: '/docs/install/introduction/' },
                { text: ', with ' },
                { text: 'single sign-on', href: '/docs/admin/sso/' },
                { text: ', ' },
                { text: 'role-based access', href: '/docs/user/role-based-access-control/' },
                { text: ' and ' },
                { text: 'audit logging', href: '/docs/user/logs/#audit-log' },
                { text: ': the controls IEC 62443 and NIS2 assessments look for. FlowFuse is ' },
                { text: 'SOC 2 Type I and Type II certified', href: '/platform/security/#certifications' },
                { text: '.' },
            ], icon: 'i-lucide-shield-check' },
        ],
    },
    proof: {
        heading: ['Small Engineering Teams,', 'Running Automation at Scale'] as [string, string],
        intro: 'Each of these teams started with one project, then reused it across lines, sites and systems.',
        items: [
            { number: '130+', text: 'instances running at Walter, managed by the same seven-person IT team that started with one' },
            { number: 'Thousands', text: 'of edge instances on industrial PCs across a large US manufacturer\'s factories, deployed and managed with FlowFuse by a team of five developers' },
            { number: '20+', text: 'manufacturing sites running one standard from a single platform, without rebuilding' },
            { number: '100+', text: 'manufacturing databases at Arch Systems fed by one integration, edited once and deployed to all of them' },
        ],
    },
    faq: {
        heading: ['Automation & Controls', 'FAQs'] as [string, string],
        items: [
            {
                question: 'Does FlowFuse replace our PLCs or SCADA?',
                answer: 'No. The PLCs keep control of the machines and the SCADA stays as it is. FlowFuse reads from them, reaches equipment they can\'t, and runs the data and supervisory applications around them. See how FlowFuse fits [alongside SCADA](/use-cases/scada/) and [connects industrial equipment](/integrations/). It isn\'t built for e-stops, interlocks or other deterministic control, which stay in the PLCs.',
            },
            {
                question: 'Can FlowFuse write to our PLCs?',
                answer: 'Yes, when you choose to. Most teams start read-only and add write actions later, one step at a time. Anything that writes to a controller goes through the same [versioned, staged deployment](/platform/device-agent/) as any other change, and [role-based access](/docs/user/role-based-access-control/) decides who can deploy it.',
            },
            {
                question: 'Where does it sit in our network?',
                answer: 'Plants connect outward, so no inbound connections need to be opened into the OT network. FlowFuse can be placed in whichever zone your policy calls for. See the [OT deployment architecture](/docs/application-guide/architectures/ot/) and [security overview](/platform/security/).',
            },
            {
                question: 'Is open source safe in our OT?',
                answer: '[Certified Nodes](/integrations/?certified=1) are tested before they\'re certified and lose that status if a vulnerability turns up. You choose which nodes teams can use, and every change is logged.',
            },
            {
                question: 'We already run Node-RED on some lines. Can FlowFuse manage it?',
                answer: 'Yes. Existing flows can be brought under central management, with [snapshots](/docs/user/snapshots/), [access control](/docs/user/role-based-access-control/) and a view of every device, so a setup only one person understood becomes something the team can support. It\'s one of the most common ways teams start. Learn more about [managing Node-RED with FlowFuse](/node-red/).',
            },
            {
                question: 'What does it run on at the plant?',
                answer: 'The [FlowFuse Device Agent](/platform/device-agent/) runs on Linux, Windows or macOS, or in Docker, which covers most industrial PCs and gateways. [Aperia\'s](/customer-stories/aperia-technologies-plc-replacement/) smart fixtures, for example, run it on edge Windows instances.',
            },
            {
                question: 'Can we trust what the AI builds?',
                answer: 'Nothing it builds goes live on its own. Engineers review what it drafts with [FlowFuse Expert](/docs/user/expert/), and it moves through the same [deployment stages](/docs/user/devops-pipelines/) as any other change, with a [snapshot](/docs/user/snapshots/) to go back to.',
            },
            {
                question: 'How is FlowFuse priced?',
                answer: 'Per instance. Each plan includes a set number of instances, and there are volume discounts for rollouts of hundreds or thousands. See [FlowFuse pricing](/pricing/), or tell us how many sites you expect and we\'ll model the cost with you, including what the next site adds.',
            },
        ],
    },
    cta: {
        heading: 'Start With One Line and One Gateway',
        body: 'Connect the controllers you already run, deploy your first application, and see versioning and rollback work on your own equipment. When it\'s proven, take it to the next site.',
        buttons: ['bookDemo', 'signUp'] as Array<'bookDemo' | 'signUp'>,
    },
}
</script>

<template>
  <TeamPage :page="PAGE" />
</template>
