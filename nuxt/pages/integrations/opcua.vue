<script setup lang="ts">
// Static route, sibling to the [...id].vue integration-node catch-all - Vue Router
// resolves this exact path first, so /integrations/opcua never falls into the
// catch-all's "integration not found" 404.
useSeoMeta({
    title: 'OPC UA Client & Server | Certified Node | FlowFuse',
    description: 'Connect, secure, and bridge OPC UA with a FlowFuse Certified Node, then reach Modbus, EtherNet/IP, MQTT, and 5,000+ other integrations without leaving the canvas.',
    ogUrl: 'https://flowfuse.com/integrations/opcua/',
    twitterSite: '@FlowFuseinc',
})

const OPCUA_SECTIONS = [
    {
        id: 'opcua-overview',
        label: 'Overview',
        headingId: 'what-is-opc-ua',
        heading: 'What is <span class="text-indigo-600">OPC UA</span>?',
        paragraphs: [
            '<strong>OPC UA</strong> (<strong>OPC Unified Architecture</strong>) is the modern, platform-independent standard for exchanging data between industrial equipment, applications, and enterprise systems. Where a protocol like Modbus moves raw register values, OPC UA exposes a structured <em>information model</em>, an address space of typed objects and relationships, with security built into the spec rather than bolted on.',
            'FlowFuse connects to OPC UA through a dedicated Certified Node, then bridges that data to Modbus, EtherNet/IP, MQTT, or a historian without a separate gateway. If you\'re integrating directly with PLC hardware across multiple protocols, the <a href="/landing/plc/" class="text-indigo-600 hover:underline">FlowFuse PLC integration</a> covers that broader case.',
        ],
    },
    {
        id: 'opcua-client',
        label: 'OPC UA Client',
        headingId: 'what-is-an-opc-ua-client',
        heading: 'What is an <span class="text-indigo-600">OPC UA Client</span>?',
        paragraphs: [
            'An <strong>OPC UA client</strong> is the application that connects to a server to browse, read, write, and subscribe to data. That source might be a PLC, a historian, or any other software exposing its own OPC UA server.',
            'FlowFuse acts as a client on any deployment, cloud or self-hosted, connecting to any third-party OPC UA server without restriction.',
        ],
    },
    {
        id: 'opcua-server',
        label: 'OPC UA Server',
        headingId: 'what-is-an-opc-ua-server',
        heading: 'What is an <span class="text-indigo-600">OPC UA Server</span>?',
        paragraphs: [
            'An <strong>OPC UA server</strong> exposes data as a browsable information model that other applications connect to. It\'s the source side of the relationship: a PLC, historian, or gateway that other software queries.',
            'FlowFuse can host its own OPC UA server, exposing a curated information model built from any connected data source, in the same runtime as its client.',
        ],
    },
]

const capabilities = [
    {
        icon: 'i-heroicons-cube-transparent',
        title: 'Structured Information Model',
        description: 'Browse a real address space of objects, types, and relationships instead of a flat register list. Data arrives with a name and structure attached, not a bare tag number.',
        linkText: 'Browse & explore the address space',
        url: '/node-red/flowfuse/edge/opcua/#12.-browse',
    },
    {
        icon: 'i-heroicons-bolt',
        title: 'Real-Time Subscriptions',
        description: 'Subscribe to nodes and get notified only when values change. No polling every tag on a fixed interval, no wasted controller scan budget.',
        linkText: 'Monitor node reference',
        url: '/node-red/flowfuse/edge/opcua/#10.-monitor',
    },
    {
        icon: 'i-heroicons-clock',
        title: 'Historical Access & Logging',
        description: 'Read a server\'s native History (HA) service, or log live values into InfluxDB or TimescaleDB. Trends stay queryable long after the PLC buffer rolls over.',
        linkText: 'History Read node reference',
        url: '/node-red/flowfuse/edge/opcua/#14.-history-read',
    },
    {
        icon: 'i-heroicons-bell-alert',
        title: 'Alarms & Events',
        description: 'Subscribe to condition-based alarms natively, filtered by type and severity on the server side. Stop polling fault bits and reconstructing state changes after the fact.',
        linkText: 'Monitor Event node reference',
        url: '/node-red/flowfuse/edge/opcua/#11.-monitor-event',
    },
    {
        icon: 'i-heroicons-shield-check',
        title: 'Security Built Into the Spec',
        description: 'X.509 certificate authentication, user authentication, and SignAndEncrypt come with the standard. Manage the certificate trust list yourself instead of leaving it on vendor defaults.',
        linkText: 'Configure a secure connection',
        url: '/node-red/flowfuse/edge/opcua/#5.-configure-a-connection',
    },
    {
        icon: 'i-heroicons-server-stack',
        title: 'Client + Server, One Runtime',
        description: 'Read and write a third-party server as a client. On self-hosted FlowFuse, expose your own information model as a server, side by side.',
        linkText: 'Hosting an OPC UA server',
        url: '/node-red/flowfuse/edge/opcua/#16.-hosting-an-opc-ua-server',
    },
]

const protocols = [
    {
        icon: 'i-heroicons-arrows-pointing-out',
        title: 'Modbus',
        description: 'TCP, UDP, and Serial (RTU/ASCII), running right next to your OPC UA connections. Read and write coils and registers, or simulate a server for testing.',
        linkText: 'Modbus Certified Node',
        url: '/node-red/flowfuse/edge/modbus/',
    },
    {
        icon: 'i-heroicons-cpu-chip',
        title: 'EtherNet/IP (CIP)',
        description: 'Native Rockwell and Allen-Bradley connectivity: ControlLogix, CompactLogix, Micro800, SLC500, and other CIP-capable devices, normalized into the same data model as your OPC UA connection.',
        linkText: 'CIP Suite Certified Node',
        url: '/node-red/flowfuse/edge/cip-suite/',
    },
    {
        icon: 'i-heroicons-camera',
        title: 'RTSP Video',
        description: 'Turn factory-floor camera feeds into images your flow can act on. Join a frame with the OPC UA values read at that instant, so a quality event is recorded with both the picture and the process conditions behind it.',
        linkText: 'RTSP Certified Node',
        url: '/node-red/flowfuse/edge/rtsp/',
    },
    {
        icon: 'i-heroicons-server-stack',
        title: 'Siemens S7',
        description: 'Direct S7comm connectivity to S7-300, S7-400, S7-1200, and S7-1500 PLCs, for the many Siemens deployments that predate an OPC UA server.',
        linkText: 'Siemens S7 integration guide',
        url: '/blog/2025/01/integrating-siemens-s7-plcs-with-node-red-guide/',
    },
    {
        icon: 'i-heroicons-wifi',
        title: 'MQTT',
        description: 'Publish OPC UA, Modbus, or S7 data to any MQTT broker, normalized into a Unified Namespace topic hierarchy on the way.',
        linkText: 'Bridging OPC UA to MQTT',
        url: '/blog/2024/08/opc-ua-to-mqtt-with-node-red/',
    },
    {
        icon: 'i-heroicons-squares-plus',
        title: '5,000+ Community Nodes',
        description: 'Beyond the certified set: PROFINET, BACnet, DNP3, IEC 61850, Mitsubishi MC Protocol, Omron FINS, Beckhoff TwinCAT ADS, and more, wired in beside your OPC UA flow.',
        linkText: 'Browse the node library',
        url: '/integrations/',
    },
]

const comparisons = [
    {
        title: 'OPC UA vs MQTT',
        description: 'Different jobs, not rivals. OPC UA pulls structured data out of a single source. MQTT distributes it many-to-many across a Unified Namespace. Most plants run both.',
        linkText: 'Read the full comparison',
        url: '/blog/2026/01/opcua-vs-mqtt/',
    },
    {
        title: 'OPC UA vs Modbus',
        description: 'OPC UA wins on security, data typing, and discoverability. Modbus still ships on new field devices because it\'s cheap, simple, and universal.',
        linkText: 'Why Modbus survives',
        url: '/blog/2026/03/why-opcua-is-not-replacing-modbus-yet/',
    },
    {
        title: 'OPC UA vs OPC DA',
        description: 'OPC DA is the Windows-only COM/DCOM original, with no built-in security and no information model. Most teams bridge DA into UA rather than choose between them.',
        linkText: 'Bridge a legacy OPC server',
        url: '/blog/2024/02/connect-node-red-to-kepware-opc/',
    },
    {
        title: 'FlowFuse vs Kepware',
        description: 'Per-tag pricing scales badly, and ownership changes make long-term cost harder to predict. Connect to your existing Kepware server, or replace it outright.',
        linkText: 'Beyond Kepware',
        url: '/blog/2026/01/kepware-opcua-better-alternative/',
    },
]

const useCases = [
    {
        icon: 'i-heroicons-clock',
        title: 'Historical Data Logging',
        description: 'Subscribe to OPC UA nodes and write timestamped values into InfluxDB or TimescaleDB, for a durable history that outlives the server\'s own buffer.',
        linkText: 'OPC UA to InfluxDB guide',
        url: '/blog/2026/06/opcua-to-influxdb/',
    },
    {
        icon: 'i-heroicons-computer-desktop',
        title: 'OPC UA Client Dashboards',
        description: 'Browse an address space, read and write values, subscribe to alarms, then wire the results straight into a live operator dashboard. No separate client, no separate HMI license.',
        linkText: 'Build an OPC UA client dashboard',
        url: '/blog/2023/07/how-to-build-a-opc-client-dashboard-in-node-red/',
    },
    {
        icon: 'i-heroicons-wifi',
        title: 'Bridging OPC UA to MQTT / UNS',
        description: 'Pull structured data out of an OPC UA server and republish it to any MQTT broker, normalized into a Unified Namespace topic hierarchy on the way.',
        linkText: 'Bridging OPC UA to MQTT',
        url: '/blog/2024/08/opc-ua-to-mqtt-with-node-red/',
    },
    {
        icon: 'i-heroicons-cog',
        title: 'Agentic AI on OPC UA Data',
        description: 'Let an AI agent query the information model directly, correlating live values, alarms, and history to surface a root cause instead of a manual address-space search.',
        linkText: 'Agentic AI reads OPC UA servers',
        url: '/blog/2026/01/eliminate-opc-ua-bottleneck-ai-agents/',
    },
    {
        icon: 'i-heroicons-link',
        title: 'Migrating Off Kepware',
        description: 'Connect to an existing KepServerEX server as a client today, no rip-and-replace. Retire it on your own timeline by hosting an equivalent server on self-hosted FlowFuse.',
        linkText: 'Connect to a Kepware OPC server',
        url: '/blog/2024/02/connect-node-red-to-kepware-opc/',
    },
    {
        icon: 'i-heroicons-server-stack',
        title: 'Hosting Your Own OPC UA Server',
        description: 'Model your own address space and expose it as a standards-compliant server, so any SCADA, historian, or other client can browse and subscribe to it. Requires self-hosted FlowFuse.',
        linkText: 'Deploy a basic OPC UA server',
        url: '/blog/2023/07/how-to-deploy-a-basic-opc-ua-server-in-node-red/',
    },
]

const steps = [
    {
        number: '1',
        icon: 'i-heroicons-link',
        title: 'Connect or Build',
        description: 'Browse and connect to an existing OPC UA server as a client. On self-hosted FlowFuse, model your own address space and expose it as a server, from the same canvas.',
    },
    {
        number: '2',
        icon: 'i-heroicons-shield-check',
        title: 'Secure the Session',
        description: 'Set Security Policy to SignAndEncrypt, then add the client certificate to the server\'s trusted list so the secure handshake succeeds.',
    },
    {
        number: '3',
        icon: 'i-heroicons-arrows-right-left',
        title: 'Bridge Other Protocols',
        description: 'Wire in Modbus, EtherNet/IP, or Siemens S7 nodes alongside OPC UA on the same canvas, for the plants that aren\'t running OPC UA end to end.',
    },
    {
        number: '4',
        icon: 'i-heroicons-chart-bar',
        title: 'Visualize, Route & Scale',
        description: 'Wire the results into a live dashboard, forward data to MQTT, a time-series database, or a cloud platform. Then push the flow to one edge device or a thousand with one click.',
    },
]

const resourceGroups = [
    {
        group: 'Start here',
        items: [
            { title: 'OPC UA Tutorial: Connect and Exchange Data with Industrial Equipment', image: '/blog/2025/07/images/opcua-tutorial.png', alt: 'Reading and writing PLC tags over OPC UA in a Node-RED flow', url: '/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/' },
            { title: 'OPC UA Tutorial: Advanced Monitoring with Subscriptions, Alarms & History', image: '/blog/2025/08/images/advanced-opcua-real-time-subscriptions-alarms-historical-data.png', alt: 'Subscriptions, alarms, and historical reads in an OPC UA flow', url: '/blog/2025/08/advanced-opcua-real-time-subscriptions-alarms-historical-data/' },
            { title: 'How to Deploy a Basic OPC UA Server in Node-RED', image: '/blog/2023/07/images/opc-ua-1/opc-ua-1-title-image.png', alt: 'An OPC UA server running inside a Node-RED flow', url: '/blog/2023/07/how-to-deploy-a-basic-opc-ua-server-in-node-red/' },
        ],
    },
    {
        group: 'Secure it',
        items: [
            { title: 'OPC UA Security: How Threat Actors Exploit Industrial Protocol Vulnerabilities', image: '/blog/2026/05/images/opcua-security-blog.png', alt: 'Common OPC UA misconfigurations that attackers target', url: '/blog/2026/05/opc-ua-security-attack-vectors/' },
            { title: 'OPC UA Security: How to Establish a Defensible Architecture', image: '/blog/2026/06/images/opc-ua-security.png', alt: 'A defensible OPC UA architecture with Reverse Connect and managed certificates', url: '/blog/2026/06/opc-ua-security-best-practices/' },
        ],
    },
    {
        group: 'Compare and migrate',
        items: [
            { title: 'MQTT vs OPC UA: Why This Question Never Has a Straight Answer', image: '/blog/2026/01/images/opcua-vs-mqtt.png', alt: 'Where MQTT and OPC UA each fit in an industrial architecture', url: '/blog/2026/01/opcua-vs-mqtt/' },
            { title: 'Why OPC UA Is Not Replacing Modbus (Yet)', image: '/blog/2026/03/images/opcua-is-not-replacing-modbus-yet.png', alt: 'Why Modbus still ships on new field devices', url: '/blog/2026/03/why-opcua-is-not-replacing-modbus-yet/' },
            { title: 'Beyond Kepware: Why Modern Industrial Connectivity Demands a Second Look', image: '/blog/2026/01/images/kepware-alternative.png', alt: 'Alternatives to per-tag OPC UA gateway licensing', url: '/blog/2026/01/kepware-opcua-better-alternative/' },
        ],
    },
    {
        group: 'Put the data to work',
        items: [
            { title: 'Historical Data Logging with OPC UA and InfluxDB', image: '/blog/2026/06/images/opcua-to-influxdb.png', alt: 'Logging OPC UA values into an InfluxDB time-series database', url: '/blog/2026/06/opcua-to-influxdb/' },
            { title: 'Connect Node-RED to KepServerEX OPC Server', image: '/blog/2024/02/images/node-red-to-kepware.png', alt: 'A Node-RED client session against a KepServerEX OPC UA server', url: '/blog/2024/02/connect-node-red-to-kepware-opc/' },
        ],
    },
]

const webinars = [
    { title: 'MQTT vs OPC UA: The Industrial Data Showdown', image: '/images/webinars/webinar-mqtt-vs-opc-ua.jpg', alt: 'MQTT vs OPC UA industrial data showdown webinar', url: '/webinars/2026/mqtt-vs-opc-ua-industrial-data-showdown/' },
    { title: 'Making Industry Work – Leveraging OPC UA at Scale', image: '/images/webinars/making-industry-work-leveraging-opc-ua-at-scale.jpg', alt: 'Leveraging OPC UA at scale webinar', url: '/webinars/2026/making-industry-work-leveraging-opc-ua-at-scale/' },
    { title: 'Simplifying OPC UA: Implement Scalable Information Models with FlowFuse', image: '/images/webinars/simplifying-opc-ua.jpg', alt: 'Simplifying OPC UA webinar', url: '/webinars/2025/simplifying-opc-ua/' },
    { title: 'Getting Started with OPC-UA and Node-RED', image: '/images/webinars/getting-started-with-opc-ua-and-node-red-webinar-august.jpg', alt: 'Getting started with OPC-UA and Node-RED webinar', url: '/webinars/2023/getting-started-opcua-node-red/' },
]

// Answers include internal links, rendered with v-html below - BlogFaq.vue interpolates
// plain text only, so it can't be reused here without stripping those links.
const faq = [
    {
        question: 'Is there a free OPC UA client?',
        answer: 'Yes, in a couple of forms. UaExpert, from Unified Automation, is a free (though closed-source) generic client for browsing a server\'s address space and testing connectivity, and it\'s a great first stop. Node-RED, which FlowFuse is built on, also has free, open-source community OPC UA client nodes such as node-red-contrib-opcua. FlowFuse also offers a professionally maintained OPC UA Certified Node, built by Sterfive, for teams that want that node vetted and supported rather than self-maintained.',
    },
    {
        question: 'Is OPC UA secure?',
        answer: 'OPC UA builds security into the specification rather than bolting it on afterward: application authentication via X.509 certificates, user authentication, and message-level SignAndEncrypt for integrity and confidentiality. The problem in practice isn\'t the spec. Trust lists get left in "accept all" mode, self-signed certificates never get rotated, and Security Policy gets set to None for convenience during commissioning and never revisited. Our two-part guide covers both sides: <a href="/blog/2026/05/opc-ua-security-attack-vectors/">how attackers actually exploit these gaps</a> and <a href="/blog/2026/06/opc-ua-security-best-practices/">how to build a defensible architecture</a>.',
    },
    {
        question: 'Can FlowFuse act as both an OPC UA client and an OPC UA server?',
        answer: 'Yes, with one restriction. FlowFuse can browse and read/write tags from any third-party OPC UA server as a client, on any deployment, cloud or self-hosted. Acting as a server, exposing FlowFuse\'s own information model for other OPC UA clients to consume, requires self-hosted FlowFuse, since Cloud only exposes HTTP/HTTPS and an OPC UA server needs a raw TCP port.',
    },
    {
        question: 'Do I need Kepware or another OPC UA gateway product?',
        answer: 'Not necessarily. Kepware and similar products became the default when building an OPC UA server or client from scratch was hard, but per-tag pricing scales badly and recent ownership changes have made long-term cost and support less predictable. FlowFuse can connect to an existing Kepware server as a client on any deployment (see our <a href="/blog/2024/02/connect-node-red-to-kepware-opc/">Kepware connection guide</a>), or replace it outright. See <a href="/blog/2026/01/kepware-opcua-better-alternative/">Beyond Kepware: Why Modern Industrial Connectivity Demands a Second Look</a>.',
    },
    {
        question: 'Does FlowFuse work on-premises or in the cloud for OPC UA?',
        answer: 'Both. Run FlowFuse on FlowFuse Cloud, self-managed on your own infrastructure, or on the FlowFuse Device Agent at the edge, right next to the OPC UA servers you\'re connecting to. Many teams run the OPC UA client on an industrial PC inside the plant network, then forward selected data outward over MQTT, so nothing inside the plant has to accept inbound connections from outside it.',
    },
]

const openFaqIndex = ref<number | null>(null)
function toggleFaq (i: number) {
    openFaqIndex.value = openFaqIndex.value === i ? null : i
}
</script>

<template>
  <div class="w-full">

    <!-- Hero -->
    <div class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pt-12 pb-3 md:pt-20">
        <div class="md:flex md:flex-row md:justify-between items-stretch gap-12">
          <div class="m-auto md:w-1/2">
            <h1 class="w-full mt-0 mb-6 m-auto font-medium">
              <span class="text-red-600 inline-block">OPC UA</span> Client and Server
            </h1>
            <p class="mb-10">
              Using the FlowFuse Certified Node for OPC UA, connect to any OPC UA server as a client, or host your own server on self-hosted FlowFuse. Bridge structured, secured industrial data to Modbus, EtherNet/IP, MQTT, historians, and the cloud, all from one canvas.
            </p>
            <div class="flex gap-3 max-md:max-w-sm max-md:mx-auto max-sm:flex-col max-md:justify-center">
              <CtaBookDemo variant="highlight" position="opcua-hero" />
              <CtaSignUp variant="ghost" position="opcua-hero" icon="i-lucide-arrow-right" />
            </div>
          </div>
          <div class="md:w-1/2 flex-grow relative max-md:mt-12">
            <div class="ff-image-cover ff-image-rounded md:relative w-full h-full max-md:max-h-[300px] border-2 border-red-100">
              <img src="/images/integrations/opcua-landing-image.png" alt="Industrial engineer building an OPC UA flow with FlowFuse on a laptop" class="md:absolute md:inset-0 rounded-none!">
            </div>
          </div>
        </div>
        <SocialProof class="mt-12" eyebrow-bg="red" />
      </div>
    </div>

    <!-- What is OPC UA -->
    <div class="w-full relative max-md:pb-10 py-20 px-6">
      <div class="absolute inset-0 opacity-30 solution-section-bg-flipped" aria-hidden="true" />
      <div class="relative z-10 max-w-screen-lg mx-auto">
        <ScrollSpySections :items="OPCUA_SECTIONS" breakpoint="md" aria-label="OPC UA overview, client, and server">
          <template v-for="section in OPCUA_SECTIONS" :key="section.id" #[section.id]="{ item }">
            <div class="max-w-3xl space-y-5">
              <h2 :id="item.headingId" class="mt-0" v-html="item.heading" />
              <p v-for="(paragraph, i) in item.paragraphs" :key="i" class="mb-0" v-html="paragraph" />
            </div>
          </template>
        </ScrollSpySections>
      </div>
    </div>

    <!-- Certified node + core capabilities -->
    <div class="w-full pt-10 px-6">
      <div class="ff-blue-card text-left p-14 pb-12">
        <h2 id="opc-ua-certified-node" class="font-semibold mb-8">Backed by a <span class="text-red-600">FlowFuse Certified Node</span></h2>
        <div class="space-y-5">
          <p>
            FlowFuse connects to OPC UA through a <strong>FlowFuse Certified Node</strong> built on <strong>node-opcua</strong> and maintained by <strong>Sterfive</strong>, the team behind that open-source stack. Certified Nodes are vetted for quality, security, and ongoing support, unlike community packages, which can go unmaintained without warning.
          </p>
          <p>
            One node handles both directions: connect to third-party OPC UA servers as a client, or host your own server on self-hosted FlowFuse (not available on FlowFuse Cloud). Both sides share a single certificate store, so a trust decision made for one applies to the other. The node ships through the FlowFuse Edge Certified Nodes catalogue, <a href="/contact-us/" class="text-indigo-600 hover:underline">contact us</a> to enable it for your instance.
          </p>
        </div>
        <div class="mt-8">
          <CtaCustom class="-ml-4" destinationKey="opcuaCertifiedNodeDocs" variant="ghost" icon="i-lucide-arrow-right" position="mid-page" label="View the Certified Node Docs" />
        </div>
      </div>
      <div class="max-w-screen-lg mx-auto">
        <div class="mt-28 pb-24">
          <div class="mb-12 md:mb-16">
            <h2 id="opc-ua-client-and-server-capabilities" class="mb-6"><span class="text-indigo-600">Core OPC UA capabilities</span> in FlowFuse</h2>
            <p class="text-gray-600 mb-0">
              FlowFuse supports OPC UA through dedicated client and server nodes, making it easy to connect OPC UA systems to your industrial applications.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <a
                v-for="capability in capabilities"
                :key="capability.title"
                :href="capability.url"
                class="group bg-white rounded-xl border border-gray-200 p-7 flex flex-col transition duration-300 ease-in-out hover:border-blue-600 hover:drop-shadow-lg hover:no-underline"
            >
              <div class="w-8 h-8 text-indigo-600 mb-5">
                <UIcon :name="capability.icon" class="w-full h-full" />
              </div>
              <h4 class="mt-0 mb-3 text-gray-800 group-hover:text-blue-600">{{ capability.title }}</h4>
              <p class="text-gray-600 font-light flex-grow mb-0">{{ capability.description }}</p>
              <span class="flex items-center gap-1.5 text-blue-600 group-hover:underline mt-3">
                {{ capability.linkText }}
                <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bridge every industrial protocol -->
    <div class="w-full bg-indigo-50/50 py-20 md:py-24 px-6">
      <div class="max-w-screen-lg mx-auto">
        <h2 id="bridge-industrial-protocols" class="mt-0 mb-6">OPC UA is one protocol. <span class="text-indigo-600">FlowFuse bridges all of them.</span></h2>
        <p class="text-gray-600 mb-12 md:mb-16">
          Real plants are never one protocol. OPC UA on the new line, Modbus on the legacy skid, EtherNet/IP on the Allen-Bradley cell, a camera feed nobody's touched since commissioning. FlowFuse runs them all together, so bridging data between them is a wire between nodes rather than a separate integration project.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16">
          <div v-for="protocol in protocols" :key="protocol.title" class="flex flex-col gap-3 items-start">
            <div class="flex flex-row gap-3 items-center justify-center">
              <UIcon :name="protocol.icon" class="w-6 h-6 text-indigo-600 flex-shrink-0" />
              <h4 class="m-0 text-gray-800">{{ protocol.title }}</h4>
            </div>
            <div>
              <p class="text-gray-600 font-light mb-2">{{ protocol.description }}</p>
              <a :href="protocol.url" class="flex items-center gap-1.5 text-blue-600 hover:underline mt-5">
                {{ protocol.linkText }}
                <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-500 mt-12 mb-0">
          Modbus, EtherNet/IP, and RTSP ship as FlowFuse Certified Nodes through the FlowFuse Edge catalogue. Everything else is a free, open-source community node or built into core Node-RED.
        </p>

      </div>
    </div>

    <!-- Security spotlight -->
    <div class="w-full py-20 md:py-28 px-6">
      <div class="max-w-screen-lg mx-auto">
        <h2 id="opc-ua-security" class="mt-0 mb-6"><span class="text-red-600">Lock down OPC UA security,</span> don't leave it optional</h2>
        <p class="text-gray-600 md:mb-16">
          Most OPC UA breaches in the field don't come from broken cryptography. They come from security that was configured once during commissioning and never switched on. FlowFuse makes the secure path the easy path.
        </p>
        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          <a
              href="/blog/2026/05/opc-ua-security-attack-vectors/"
              class="group bg-white rounded-xl border border-gray-300 p-7 flex flex-col transition duration-300 ease-in-out hover:border-gray-500 hover:drop-shadow-lg hover:no-underline"
          >
            <div class="w-8 h-8 text-gray-500 mb-5">
              <UIcon name="i-heroicons-shield-exclamation" class="w-full h-full" />
            </div>
            <h4 class="mt-0 mb-3 text-gray-800">How attackers get in</h4>
            <p class="text-gray-600 font-light flex-grow mb-0">Disabled trust lists, self-signed certificates that never rotate, and Security Policy left at None since commissioning. These are the openings threat actors actually use, not cryptographic flaws in the standard.</p>
            <span class="flex items-center gap-1.5 text-blue-600 group-hover:underline mt-3">
              Read: how threat actors exploit OPC UA
              <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
            </span>
          </a>
          <a
              href="/blog/2026/06/opc-ua-security-best-practices/"
              class="group bg-indigo-50 rounded-xl border-2 border-indigo-300 p-7 flex flex-col transition duration-300 ease-in-out hover:border-indigo-500 hover:drop-shadow-lg hover:no-underline"
          >
            <div class="w-8 h-8 text-indigo-600 mb-5">
              <UIcon name="i-heroicons-shield-check" class="w-full h-full" />
            </div>
            <h4 class="mt-0 mb-3 text-gray-800">A defensible architecture</h4>
            <p class="text-gray-600 font-light flex-grow mb-0">Certificate trust you configure explicitly, SignAndEncrypt as the default message mode, username/password or X.509 authentication, and role-based access for anything you host yourself. A checklist turned into working configuration.</p>
            <span class="flex items-center gap-1.5 text-blue-600 group-hover:underline mt-3">
              Read: building a defensible OPC UA architecture
              <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
            </span>
          </a>
        </div>

      </div>
    </div>

    <!-- Built for enterprise OPC UA deployments -->
    <EnterpriseSecurity
        heading='Built for <span class="text-indigo-600">enterprise OPC UA deployments</span>'
        description="FlowFuse is SOC 2 Type I and Type II certified, with role-based access control, single sign-on, audit logging, and air-gapped, self-hosted deployment options, for teams running OPC UA clients and servers across regulated or security-sensitive plants."
    />

    <!-- Comparisons -->
    <div class="w-full py-20 md:py-28 px-6 bg-radial-[70%_30%_at_center_bottom] from-blue-200/30 to-blue-200/0">
      <div class="max-w-screen-lg mx-auto">
        <h2 id="opc-ua-vs-mqtt-modbus-kepware" class="mt-0 mb-4">How does OPC UA compare?</h2>
        <p class="text-gray-600 mb-12 md:mb-16">
          OPC UA gets compared to other protocols and products constantly, usually without enough nuance. Here's the honest version of each.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          <a
              v-for="item in comparisons"
              :key="item.title"
              :href="item.url"
              class="group bg-white rounded-xl border border-indigo-100 p-7 flex flex-col transition duration-300 ease-in-out hover:border-blue-600 hover:drop-shadow-lg hover:no-underline"
          >
            <h4 class="mt-0 mb-3 text-gray-800 group-hover:text-blue-600">{{ item.title }}</h4>
            <p class="text-gray-600 font-light flex-grow mb-0">{{ item.description }}</p>
            <span class="flex items-center gap-1.5 text-blue-600 group-hover:underline mt-3">
              {{ item.linkText }}
              <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
            </span>
          </a>
        </div>

      </div>
    </div>

    <!-- Use cases -->
    <div class="w-full py-20 md:py-24 px-6 relative">
      <div class="absolute -inset-px opacity-40 solution-section-bg" aria-hidden="true" />
      <div class="relative z-10 max-w-screen-lg mx-auto">
        <h2 id="opc-ua-use-cases" class="mb-12 md:mb-16">What you can build with <span class="text-red-600">OPC UA + FlowFuse</span></h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">
          <div v-for="useCase in useCases" :key="useCase.title">
            <div class="flex items-center gap-5">
              <UIcon :name="useCase.icon" class="w-10 h-10 text-red-200 flex-shrink-0" />
              <h4 class="m-0">{{ useCase.title }}</h4>
            </div>
            <div class="pl-15 mt-2">
              <p class="font-light text-gray-600 mb-2">{{ useCase.description }}</p>
              <a :href="useCase.url" class="flex items-center gap-1.5 text-blue-600 hover:underline mt-3">
                {{ useCase.linkText }}
                <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- How it works -->
    <div class="w-full py-20 md:py-24 px-6">
      <div class="max-w-screen-lg mx-auto md:flex md:gap-16 md:items-start">
        <h2 class="mb-12 md:mb-0 md:w-1/3 md:shrink-0 md:sticky! md:top-24 md:self-start"><span class="text-indigo-600">From OPC UA to insight,</span> step by step</h2>
        <div class="max-w-screen-md mx-auto md:mx-0">
          <div v-for="(step, index) in steps" :key="step.number" class="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div class="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0">
              <!-- Mobile: icon flanked by two short horizontal lines (hidden past
                   the first/last step), matching /partners/certify-hardware/'s
                   mobile layout. Desktop: single vertical line below the icon,
                   offset with mt-7 so the icon lines up with the title instead
                   of the "Step N" label above it. -->
              <div class="ff-line h-px flex-1 sm:hidden" />
              <UIcon :name="step.icon" class="w-6 h-6 text-indigo-600 shrink-0 sm:mt-7" />
              <div class="ff-line h-px flex-1 sm:hidden" />
              <div v-if="index !== steps.length - 1" class="ff-line hidden sm:block w-px flex-1 my-4 bg-gray-300" />
            </div>
            <div :class="index !== steps.length - 1 ? 'pb-10 sm:pb-12' : ''">
              <span class="block text-sm font-semibold text-gray-500 mb-1 text-center sm:text-left">Step {{ step.number }}</span>
              <h4 class="mt-0 mb-4 sm:mb-2 text-indigo-600 text-center sm:text-left">{{ step.title }}</h4>
              <p class="font-light text-gray-600 mb-0">{{ step.description }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- FAQ -->
    <div class="w-full bg-indigo-50/50 py-20 md:py-20 px-6">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-w-2xl mb-12">
          <h2 class="mt-0 mb-0">
            Frequently asked <span class="text-indigo-600">questions</span>
          </h2>
        </div>
        <div class="w-full ff-prose">
          <div class="prose max-w-none">
            <div v-for="(item, i) in faq" :key="i" class="w-full py-4" :class="{ 'border-b': i !== faq.length - 1 }">
              <h3 class="not-prose m-0">
                <button
                    class="question flex flex-row justify-between items-center w-full m-0 p-0 gap-6 cursor-pointer text-left bg-transparent border-0 text-lg font-medium"
                    type="button"
                    :aria-expanded="openFaqIndex === i"
                    @click="toggleFaq(i)"
                >
                  <span>{{ item.question }}</span>
                  <UIcon
                      name="i-heroicons-chevron-down"
                      class="transition-transform ease-in-out duration-300 shrink-0"
                      :class="{ 'rotate-180': openFaqIndex === i }"
                  />
                </button>
              </h3>
              <div v-show="openFaqIndex === i" class="px-6 mt-6">
                <p v-html="item.answer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Learn more: guides + webinars -->
    <div class="w-full py-20 md:py-20 px-6">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-8">OPC UA <span class="text-indigo-600">guides and webinars</span></h2>
        <div v-for="group in resourceGroups" :key="group.group" class="mb-12 last:mb-0">
          <h3 class="mb-3 text-sm font-semibold uppercase">{{ group.group }}</h3>
          <div class="ff-nodered-resources grid grid-cols-1 md:grid-cols-2 gap-4">
            <a v-for="resource in group.items" :key="resource.url" class="h-full" :href="resource.url">
              <li class="h-full">
                <div class="w-2/5 max-md:aspect-video ff-image-cover ff-image-left-rounded h-full">
                  <img :src="resource.image" :alt="resource.alt" loading="lazy">
                </div>
                <label class="w-3/5 font-light">{{ resource.title }}</label>
              </li>
            </a>
          </div>
        </div>
        <a href="/blog/opcua/" class="flex items-center justify-end gap-1.5 text-blue-600 hover:underline">
          See all OPC UA articles
          <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
        </a>
        <div class="mt-12 py-12 border-t border-gray-200">
          <h3 class="mb-3 text-sm font-semibold uppercase">Webinars</h3>
          <div class="ff-nodered-resources grid grid-cols-1 md:grid-cols-2 gap-4">
            <a v-for="webinar in webinars" :key="webinar.url" class="h-full" :href="webinar.url">
              <li class="h-full">
                <div class="w-2/5 max-md:aspect-video ff-image-cover ff-image-left-rounded h-full">
                  <img :src="webinar.image" :alt="webinar.alt" loading="lazy">
                </div>
                <label class="w-3/5 font-light">{{ webinar.title }}</label>
              </li>
            </a>
          </div>
        </div>
        <a href="/webinars/" class="flex items-center justify-end gap-1.5 text-blue-600 hover:underline">
          See all webinars
          <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
        </a>
      </div>
    </div>

    <!-- CTA -->
    <div class="w-full px-6 pb-24">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-6 md:px-9 py-8 md:py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <h2 class="text-white font-medium">Ready to build an OPC UA client or server the right way?</h2>
          <p class="text-indigo-50 font-light text-xl max-w-3xl mt-0">No per-tag licensing. No Security Policy left at None. Connect to any OPC UA server, host your own, and bridge both to Modbus, MQTT, or a historian without extra middleware. See it live, or start free.</p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="opcua-final" />
            <CtaSignUp variant="ghost" color="white" icon="i-lucide-arrow-right" position="opcua-final" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
