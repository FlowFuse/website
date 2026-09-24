<script setup lang="ts">
// Ported from src/platform/device-agent.njk (11ty).

const FIXES = [
    {
        icon: 'i-heroicons-truck',
        title: 'Getting to the machine costs a day',
        paragraphs: [
            'Changing a flow on a remote machine can mean a VPN request, a jump host, or someone driving to the site.',
            'The Device Agent makes an outbound connection to FlowFuse instead. Put the machine in <a href="/docs/device-agent/quickstart/#developer-mode">Developer Mode</a> and open its <span class="whitespace-nowrap">Node-RED</span> editor in your browser, wherever the machine is running.',
        ],
    },
    {
        icon: 'i-heroicons-document-duplicate',
        title: 'Every site ends up with its own version of the flow',
        paragraphs: [
            'One engineer fixes a flow on site two. Someone else copies it to site five. Six months later, nobody is sure which version is running where.',
            'Create a snapshot and set it as the target for a <a href="/docs/user/device-groups/">device group</a>. Every device in the group runs that version, and new devices automatically receive the same target when they join.',
        ],
    },
    {
        icon: 'i-heroicons-arrow-uturn-left',
        title: '200 machine updates, 200 chances to go wrong.',
        paragraphs: [
            'Promote a snapshot along a <a href="/docs/user/devops-pipelines/">DevOps pipeline</a> (development, then test, then production) so a change only reaches the plant floor after it has run somewhere safe. If it still goes wrong, set the previous snapshot as the target and the fleet rolls back.',
        ],
    },
    {
        icon: 'i-heroicons-signal-slash',
        title: 'The connection drops, but the line doesn\'t',
        paragraphs: [
            'A remote machine shouldn\'t stop doing its job because its connection to FlowFuse disappears.',
            'Flows continue running on the device when its connection to FlowFuse is lost. The Device Agent reconnects automatically and picks up the target snapshot when connectivity is restored.',
        ],
    },
    {
        icon: 'i-heroicons-question-mark-circle',
        title: '“What version is site 12 running?” shouldn\'t require a phone call',
        paragraphs: [
            'When devices are spread across plants, answering a simple version question can mean asking someone at each site to check.',
            'Registered machines show their online status, the snapshot they are running, and whether it matches the version assigned to them.',
        ],
    },
    {
        icon: 'i-heroicons-shield-check',
        title: 'Security has to sign it off before anything goes to the plant',
        paragraphs: [
            'IT and security teams need to know what an edge machine connects to before allowing it onto the network.',
            'The Device Agent uses outbound connections to FlowFuse, with no inbound ports required for remote management. The required hosts and connectivity are documented for review.',
            'The Device Agent is <a href="https://github.com/FlowFuse/device-agent">Apache-2.0 open source</a>, so your team can inspect how it works. With a self-hosted FlowFuse deployment, devices connect to your own FlowFuse server.',
        ],
    },
]

const STEPS = [
    {
        label: 'Step one',
        icon: 'i-heroicons-command-line',
        title: 'Install and provision',
        paragraphs: [
            'Run the installer on the machine. It installs the required components, registers the machine with your FlowFuse team, and configures the Device Agent as a service so it starts again after a reboot.',
            'For larger deployments, use <a href="/docs/device-agent/register/#bulk-registration">bulk registration options</a> to provision multiple devices.',
        ],
    },
    {
        label: 'Step two',
        icon: 'i-heroicons-wrench-screwdriver',
        title: 'Build and test against the real hardware',
        paragraphs: [
            'Developer Mode opens that device\'s <span class="whitespace-nowrap">Node-RED</span> editor through FlowFuse. Build against the real PLC, sensors, and network, then take a snapshot when the application is ready.',
        ],
    },
    {
        label: 'Step three',
        icon: 'i-heroicons-rocket-launch',
        title: 'Deploy the version you tested',
        paragraphs: [
            'Set that snapshot as the target for one device or a group of hundreds. Devices update to the assigned version and stay there until you assign another target.',
            'Use <a href="/docs/user/devops-pipelines/">DevOps pipelines</a> to move changes from development through testing and into production.',
        ],
    },
]

const SUPPORTED = [
    {
        title: 'Hardware and operating systems',
        chips: [
            'Linux',
            'Windows',
            'macOS',
            'Docker',
            'Kubernetes',
            'Arm',
            'x86',
            'Node.js 18, 20, 22, 24',
            { label: 'Hardware setup guides', href: '/docs/hardware/introduction/' },
        ],
    },
    {
        title: 'Industrial protocols and systems',
        chips: [
            { label: 'Modbus', href: '/docs/flowfuse-nodes/edge/modbus/' },
            { label: 'OPC UA', href: '/integrations/opcua/' },
            { label: 'MQTT', href: '/blog/2024/06/how-to-use-mqtt-in-node-red/' },
            { label: 'S7', href: '/blog/2025/01/integrating-siemens-s7-plcs-with-node-red-guide/' },
            { label: 'EtherNet/IP', href: '/blog/2025/10/using-ethernet-ip-with-flowfuse/' },
            { label: 'Serial', href: '/blog/2025/07/connect-legacy-equipment-serial-flowfuse/' },
            { label: 'REST', href: '/docs/node-red/integration-technologies/rest/' },
            { label: 'SQL', href: '/docs/node-red/database/mysql/' },
            '5,000+ Node-RED nodes',
        ],
    },
]

const MANAGEMENT = [
    {
        title: 'OT device management',
        text: '<a href="/product/edge/">FlowFuse Edge</a> helps OT teams connect PLCs, machines, and controllers and standardize industrial applications across sites.',
        image: '/images/home/home-scada.png',
        imageAlt: 'FlowFuse Edge: industrial edge connectivity',
    },
    {
        title: 'IoT fleet management',
        text: '<a href="/product/fleet/">FlowFuse Fleet</a> provides tools for pushing flows, shipping updates, and rolling back applications across distributed devices.',
        image: '/images/product/fleet.jpg',
        imageAlt: 'FlowFuse Fleet: device fleet management console',
    },
]

const FAQ = [
    {
        question: 'How much does the Device Agent cost?',
        answer: 'The Device Agent is free, and [open-source](https://github.com/FlowFuse/device-agent). Depending on which offering/hosting of FlowFuse you choose there may be charges for the FlowFuse service itself, you can find out more on our [pricing page](/pricing/).',
    },
    {
        question: 'Can I run the Device Agent in a closed network?',
        answer: 'Yes, you can, although it does need to be able to connect to your FlowFuse (Cloud or your self-hosted instance) in order to receive updates and deploy new flows. Once they\'re deployed though, the device agent will keep your flows running even if it loses connection to the internet.',
    },
    {
        question: 'How do I deploy to thousands of devices at once?',
        answer: 'With FlowFuse, you can use [Provisioning Tokens](/docs/device-agent/register/#bulk-registration) to register large numbers of devices. This will automatically register each device in the FlowFuse Editor and save you *a lot* of clicking.',
    },
    {
        question: 'I\'ve installed the Device Agent on my device, how do I access the Node-RED Editor?',
        answer: 'The key advantage of the device agent is that it allows you to access the Node-RED editor from FlowFuse directly. Simply navigate to the device in the FlowFuse UI, and click on the "Open Editor" button. Once you\'ve made your changes, within FlowFuse you can then rollout those flows to hundreds of other devices in just a few clicks.',
    },
    {
        question: 'What\'s the difference between "Fleet Mode" and "Developer Mode"',
        answer: '"Fleet Mode" allows you to deploy a single Snapshot to multiple devices at once. The Device will have a "Target Snapshot", and whenever that is set, your device will automatically update.\n\n"Developer Mode" on the other hand opens a tunnel to your device, allowing you to edit the flows on that device directly. This is useful for debugging flows, or testing new flows on live hardware, before distributing them out to the rest of our',
    },
    {
        question: 'What are the system requirements for the Device Agent? Will it run on my hardware?',
        answer: 'Device Agent supports NodeJS 14 and above, and is designed to work with a wide range of devices. If you\'re unsure if your device is supported, please do get in touch.',
    },
    {
        question: 'Can I run the Device Agent as a service?',
        answer: 'Yes, the Device Agent is designed to run as a service on your device, we have an example written up for a Raspberry Pi [here](/blog/2023/05/device-agent-as-a-service/).',
    },
]

useSeoMeta({
    title: 'Edge Device Management for Node-RED',
    description: 'Edge device management for Node-RED. Deploy, manage, and roll back flows remotely without VPNs or inbound ports.',
    keywords: 'Edge Device Management, OT Device Management, Device Provisioning, OT/IT Convergence, IoT Fleet Management, Industrial IoT Device Management',
    ogUrl: 'https://flowfuse.com/platform/device-agent/',
    twitterSite: '@FlowFuseinc',
})

const FAQ_DISPLAY = FAQ.map(item => ({
    question: item.question.replaceAll('Node-RED', 'Node\u2011RED'),
    answer: item.answer.replaceAll('Node-RED', 'Node\u2011RED'),
}))

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion(item)),
])
</script>

<template>
  <div class="w-full">
    <div class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pt-12">
        <!-- Hero: /product/edge/ (product/[tier].vue) -->
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <div class="text-center md:text-left">
            <div class="mb-8 flex justify-center md:justify-start">
              <img src="/images/ff-logo-device-agent-light.svg" alt="FlowFuse Device Agent" width="225" loading="eager">
            </div>
            <h1 class="text-4xl md:max-w-md font-medium">Edge Device Management for <span class="whitespace-nowrap text-red-600">Node-RED</span></h1>
            <p class="mt-8 max-w-xl mx-auto md:mx-0">The FlowFuse Device Agent runs <span class="whitespace-nowrap">Node-RED</span> on your edge hardware and connects it to FlowFuse. Open the editor anywhere, push the same flows to every machine in a group, and roll back between snapshots without a site visit, a VPN request, or a single inbound port.</p>
          </div>
          <div class="flex justify-center">
            <TerminalFrame
                src="/images/device-agent/terminal-install.gif"
                alt="The FlowFuse Device Agent installer running in a terminal, opening a browser to register the machine"
                :width="500"
            />
          </div>
        </div>

        <!-- Quote: /product/edge/ -->
        <QuoteBlock
            class="mt-16 md:mt-20"
            quote="Without FlowFuse, I would be able to support maybe one production unit, but that's it. FlowFuse gives us the chance to deliver what the business asks us for while maintaining our small team size."
            author="Felix Reck"
            role="IT Application Manager, Walter Tools (formerly)"
            avatar="/images/customer-headshots/felix-reck-walter-tools.png"
            result="Walter Tools scaled from 1 to 130+ instances with the same IT team."
            result-link-text="Walter Tools"
            result-href="/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/"
        />

        <!-- Install: /ai/ (AgentSetupTabs) -->
        <section id="install-from-your-terminal" class="scroll-mt-20 pt-24">
          <h2 class="text-center md:text-left m-0">Install the Device Agent from your terminal</h2>
          <p class="max-w-3xl mt-6 mb-0 max-md:text-center">Start where your hardware already is. Run the installer on the machine you want to bring online and it walks you through the rest, including creating a FlowFuse account if you don't have one yet.</p>
          <DeviceAgentInstallTabs class="mt-8" />
        </section>
      </div>
    </div>

    <!-- What it fixes: homepage problem grid; icon badge from /vs/ -->
    <div class="about w-full py-20 px-6 bg-indigo-50/50 mt-24">
      <div class="max-sm:text-center max-w-screen-lg mx-auto">
        <h2 class="w-full">What FlowFuse Edge Device Management Fixes</h2>
        <p class="max-w-3xl"><span class="whitespace-nowrap">Node-RED</span> is easy to run on one machine in front of you. The work starts when that machine is remote, the fleet grows, and every change has to reach production safely.</p>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14 mt-16">
          <div v-for="item in FIXES" :key="item.title" class="relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-4 w-full">
                <div class="w-12 h-12 m-auto sm:m-0 rounded-full bg-red-50 text-red-700 flex items-center justify-center">
                  <UIcon :name="item.icon" class="w-6 h-6" />
                </div>
                <h3 class="w-full text-lg font-semibold md:m-0 text-gray-600">{{ item.title }}</h3>
              </div>
              <div>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p v-for="(paragraph, p) in item.paragraphs" :key="p" class="font-light" v-html="paragraph" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- How it works: /integrations/opcua/ ("From OPC UA to insight, step by step") -->
    <section class="w-full px-6 py-20 md:py-24">
      <div class="max-w-screen-lg mx-auto md:flex md:gap-16 md:items-start">
        <div class="mb-12 md:mb-0 md:w-1/3 md:shrink-0 md:sticky! md:top-24 md:self-start max-md:text-center">
          <h2 class="mt-0 mb-0">How the Device Agent Works</h2>
          <p class="font-light text-gray-700 mt-6 mb-0">Three steps take you from a machine sitting on a bench to a <span class="whitespace-nowrap">Node-RED</span> application running in production.</p>
        </div>
        <div class="max-w-screen-md mx-auto md:mx-0">
          <div v-for="(step, index) in STEPS" :key="step.title" class="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div class="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0">
              <div class="ff-line h-px flex-1 sm:hidden" />
              <span class="flex items-center h-7 shrink-0 sm:mt-6">
                <UIcon :name="step.icon" class="w-6 h-6 text-indigo-600" />
              </span>
              <div class="ff-line h-px flex-1 sm:hidden" />
              <div v-if="index !== STEPS.length - 1" class="ff-line hidden sm:block w-px flex-1 mt-3 -mb-3 bg-gray-300" />
            </div>
            <div :class="index !== STEPS.length - 1 ? 'pb-10 sm:pb-12' : ''">
              <span class="block text-sm leading-5 font-semibold text-gray-500 mb-1 text-center sm:text-left">{{ step.label }}</span>
              <h3 class="mt-0 mb-4 sm:mb-2 text-xl leading-7 font-semibold text-indigo-600 text-center sm:text-left">{{ step.title }}</h3>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-for="(paragraph, p) in step.paragraphs" :key="p" class="font-light text-gray-600" :class="p === step.paragraphs.length - 1 ? 'mb-0' : ''" v-html="paragraph" />
            </div>
          </div>
          <p class="font-light text-gray-600 mt-12 mb-0 max-sm:text-center">See the <a href="/docs/device-agent/install/overview/">Device Agent documentation</a> for Docker, Kubernetes, and bulk installation options.</p>
        </div>
      </div>
    </section>

    <!-- Where it runs: /product/edge/ ("What's Included") -->
    <section class="w-full px-6 pb-24">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-8 text-center md:text-left">Supported Hardware, Operating Systems, and Protocols</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="group in SUPPORTED" :key="group.title" class="rounded-lg border border-indigo-200 p-6">
            <h3 class="text-lg font-semibold m-0 text-indigo-600 text-center md:text-left">{{ group.title }}</h3>
            <div class="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <template v-for="chip in group.chips" :key="typeof chip === 'string' ? chip : chip.label">
                <NuxtLink
                    v-if="typeof chip !== 'string'"
                    :to="chip.href"
                    class="inline-flex items-center gap-1 py-1.5 px-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 bg-white no-underline hover:no-underline transition-colors duration-150 after:text-indigo-300 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 hover:after:text-indigo-600"
                >{{ chip.label }}</NuxtLink>
                <span
                    v-else
                    class="inline-flex items-center py-1.5 px-3 rounded-full border border-gray-200 text-sm font-regular bg-gray-50 whitespace-nowrap"
                >{{ chip }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What sits behind it: /industries/aerospace-components/ ("Use Cases") -->
    <section class="w-full py-16 px-6 comparison-section-bg">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-md:text-center">OT Device Management and IoT Fleet Management</h2>
        <p class="max-w-3xl max-md:text-center">Plant-floor applications rarely live in isolation. They connect PLCs, machines, databases, APIs, and other systems while IT teams need a consistent way to deploy and maintain them across sites.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div v-for="item in MANAGEMENT" :key="item.title" class="flex flex-col gap-3 rounded-xl border border-white p-3 bg-[linear-gradient(135deg,_theme(colors.white)_0%,_theme(colors.white/10%)_100%)]">
            <div class="w-full h-48 ff-image-cover rounded overflow-hidden">
              <img :src="item.image" :alt="item.imageAlt" width="400" loading="lazy" class="w-full h-auto">
            </div>
            <h3 class="text-lg font-semibold text-gray-600 m-0 pt-1">{{ item.title }}</h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="m-0 pb-1" v-html="item.text" />
          </div>
        </div>
      </div>
    </section>

    <!-- Closing CTA: /product/ -->
    <section class="w-full px-6 pt-24">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <h2 class="text-white text-4xl sm:text-5xl font-medium m-0">Pick the machine that’s inconvenient to visit</h2>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Install the Device Agent on that one and watch it appear in FlowFuse. It is one command, and it costs nothing to find out.</p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaCustom label="Install the Device Agent" destination-key="deviceAgentInstall" variant="highlight" position="final-cta" />
            <CtaBookDemo variant="ghost" color="white" position="final-cta" icon="i-lucide-arrow-right" />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ: homepage -->
    <div class="w-full px-6 pt-20 bg-indigo-50/50 mt-24">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <div class="-mt-20">
          <BlogFaq :faq="FAQ_DISPLAY" variant="page" />
        </div>
      </div>
    </div>
  </div>
</template>
