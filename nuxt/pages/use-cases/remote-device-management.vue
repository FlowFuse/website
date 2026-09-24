<script setup lang="ts">
// Replaces the old /use-cases/edge-connectivity/ page (now a 301 to here, see
// redirects.ts). A one-off layout built from the Figma file (FF Website V3, node
// 7421:6134): each band reuses markup already on the site rather than a shared template,
// noted per section below. If a second use-case page adopts this structure, lift it into
// components/use-case-page/ + a .yml the way industry-page/ was.
//
// Copy strings support the same `[label](url)` / **bold** subset as BlogFaq's answers,
// rendered through <InlineMarkdown>.

// `before` is optional: only the two results that are a change (1 → 130+, 15 → 1) have
// one. `company` is pulled out of `text` because the whole card is the link, so the name
// is styled like a link rather than being a second <a> nested inside the first.
const RESULTS = [
    {
        before: '1',
        after: '130+',
        unit: 'instances',
        company: 'Walter Tools',
        text: 'scaled from a single Node-RED instance to over 130 across four continents and unified five separate machine-connectivity systems — with the same seven-person IT team.',
        linkText: 'Read the case study with Walter Tools',
        linkName: 'Walter Tools',
        linkHref: '/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/',
    },
    {
        before: '15',
        after: '1',
        unit: 'deployment',
        company: 'Aperia Technologies',
        text: 'replaced a USB-stick walk across five lines with one device-group deployment, and freed 8–12 hours a day of idle end-of-line test equipment.',
        linkText: 'Read the case study with Aperia Technologies',
        linkName: 'Aperia Technologies',
        linkHref: '/customer-stories/aperia-technologies-plc-replacement/',
    },
    {
        after: '½',
        unit: 'shift returned',
        company: 'Paloma Irrigation and Drainage District\'s',
        text: 'team spent half of every shift driving between remote pumping stations. Remote access and automated alerts ended the routine visits across 30,000 acres.',
        linkText: 'Read the case study with Paloma Irrigation',
        linkName: 'Paloma Irrigation',
        linkHref: '/customer-stories/leveraging-node-red-and-flowfuse-to-revolutionize-irrigation/',
    },
    {
        after: '7,000 km',
        unit: 'of grid',
        company: 'Energinet',
        text: 'monitors substation health at hundreds of critical nodes across Denmark\'s transmission grid — 24/7, with a small operations team.',
        linkText: 'Read the Energinet case study',
        linkName: 'Energinet',
        linkHref: '/customer-stories/energinet-streamlining-critical-infrastructure-data-management/',
    },
]

const VISIBILITY = [
    {
        icon: 'i-heroicons-cpu-chip',
        title: 'Every device, one view',
        text: 'Instance state and last seen. CPU and memory over time. Agent and Node-RED versions. [Device groups](/docs/user/device-groups/) by site or line.',
    },
    {
        icon: 'i-lucide-history',
        title: 'What changed, and who changed it',
        text: '[Audit log](/docs/user/logs/#audit-log) across the team. [Snapshot comparison](/docs/user/snapshots/#comparing-snapshots). [Version history](/docs/user/snapshots/#timeline-view). Attribution on every deployment.',
    },
    {
        icon: 'i-heroicons-lifebuoy',
        title: 'When something goes wrong',
        text: '[Node-RED logs](/docs/user/logs/#node-red-logs) without SSH. Health checks and auto-restart. Diagnostic emails with the logs attached. Structured JSON logs for Loki or Elastic.',
    },
    {
        icon: 'i-heroicons-signal',
        title: 'Reach a machine you can\'t touch',
        text: 'Open the editor from your browser. Developer Mode tunnel for live debugging. Restart a device remotely. Outbound-only — no inbound ports.',
    },
]

const STEPS = [
    {
        icon: 'i-heroicons-wrench-screwdriver',
        title: 'Fix One',
        text: 'Open the Node-RED editor on the machine itself, from your browser, and change the flow on live hardware.',
    },
    {
        icon: 'i-heroicons-camera',
        title: 'Snapshot It',
        text: 'Capture the working state as a versioned snapshot you can compare, promote and roll back.',
    },
    {
        icon: 'i-heroicons-rocket-launch',
        title: 'Roll It Out',
        text: 'Push that snapshot to the device group through a [pipeline](/docs/user/devops-pipelines/) — every filler on every line, or every site in the region.',
    },
]

const INTELLIGENCE = [
    {
        icon: 'i-heroicons-cpu-chip',
        title: 'Run the model where the data is',
        text: 'Drop a trained [ONNX model](/blog/2025/10/custom-onnx-model/) into a flow and run inference on the device. No round trip, no inference bill, no data leaving the plant.',
    },
    {
        icon: 'i-heroicons-chat-bubble-left-right',
        title: 'Ask the factory a question',
        text: '[FlowFuse Expert](/docs/user/expert/) Insights Mode connects to the MCP servers in your instances, so you can query live state in plain language instead of building a report for it.',
    },
    {
        icon: 'i-heroicons-bolt',
        title: 'Allow an agent to act',
        text: 'Expose your flows to our [MCP integration](/changelog/2025/10/mcp-nodes/) so Copilot, Claude or your own AI agent can read live operational state and act on it, inside the role-based access control you already run. Read-only stays read-only. Every action is logged.',
    },
]

const FAQ = [
    {
        question: 'What is remote device management?',
        answer: 'Remote device management lets teams monitor, troubleshoot, update, and deploy application flows to devices without being physically present at the device.',
    },
    {
        question: 'What is a remote device management platform?',
        answer: 'Remote device management platform provides centralized tools for monitoring and managing devices across multiple machines, sites, or facilities.',
    },
    {
        question: 'Can FlowFuse manage Node-RED on remote devices?',
        answer: 'Yes. FlowFuse lets teams remotely monitor, edit, deploy, restart, and manage Node-RED instances running across their device fleet.',
    },
    {
        question: 'Can FlowFuse deploy changes to multiple remote devices?',
        answer: 'Yes. FlowFuse supports [device groups](/docs/user/device-groups/) and centralized deployments, allowing teams to roll out a tested flow or [snapshot](/docs/user/snapshots/) to multiple devices at once.',
    },
]

// The hover overlay highlights `linkName` inside the card's link text, the way the ROI
// evidence cards highlight their source ("Read more at <source>").
function splitLinkText (result: { linkText: string, linkName: string }) {
    const at = result.linkText.indexOf(result.linkName)
    return {
        before: result.linkText.slice(0, at),
        name: result.linkName,
        after: result.linkText.slice(at + result.linkName.length),
    }
}

useSeoMeta({
    title: 'Remote Device Management for Industrial Equipment',
    description: 'Remote device management for every machine in the field. See, edit, and deploy Node-RED across your fleet.',
    ogImage: 'https://flowfuse.com/images/solutions/og-solutions-device-management.jpg',
    ogUrl: 'https://flowfuse.com/use-cases/remote-device-management/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion(item)),
])
</script>

<template>
  <div class="w-full">
    <!-- Hero + quote, under one soft indigo glow from the top-right corner -->
    <div class="w-full px-6 bg-[radial-gradient(ellipse_65%_80%_at_100%_0%,theme(colors.indigo.100)_0%,theme(colors.indigo.50/0)_100%)]">
      <!-- Hero: two-column layout from product/[tier].vue -->
      <section class="max-w-screen-lg mx-auto pt-16 md:pt-32 grid md:grid-cols-2 gap-12 items-center">
        <div class="text-center md:text-left">
          <h1 class="text-4xl md:text-[42px] md:leading-10 font-medium m-0">Remote device management <span class="text-red-600">for every machine in the field</span></h1>
          <p class="mt-10 text-gray-700 leading-relaxed max-w-md mx-auto md:mx-0">
            FlowFuse runs Node-RED next to your <NuxtLink to="/landing/plc/">PLCs</NuxtLink> and governs it from one place with remote device management, editing, <NuxtLink to="/docs/user/snapshots/">snapshots</NuxtLink>, and fleet-wide controls.
          </p>
          <div class="mt-12 flex flex-row flex-wrap gap-4 items-center justify-center md:justify-start">
            <CtaBookDemo variant="highlight" position="hero" />
            <CtaSignUp variant="ghost" position="hero" icon="i-lucide-arrow-right" />
          </div>
        </div>
        <div class="rounded-xl border-2 border-red-100 overflow-hidden shadow-[20px_20px_40px_0_rgba(0,0,0,0.25)] aspect-[3/2]">
          <img src="/images/use-cases/edge-connectivity.jpg" alt="Machines on a factory shop floor" width="1082" height="722" class="w-full h-full object-cover" loading="eager">
        </div>
      </section>

      <!-- Quote: /product/edge/'s QuoteBlock -->
      <div class="max-w-screen-lg mx-auto pt-16">
        <QuoteBlock
            quote="It's not just about connecting machines; it's about creating the foundation that makes everything else possible."
            author="Felix Reck"
            role="IT Application Manager, Walter"
            avatar="/images/customer-headshots/felix-reck-walter-tools.png"
        />
      </div>
    </div>

    <!-- Results: background and hover cards from /resources/roi-calculator/'s "The research
         behind the ROI analysis" -->
    <section class="w-full px-6 pt-20 pb-20 relative overflow-hidden">
      <div class="absolute -inset-y-1 inset-x-0 solution-section-bg" aria-hidden="true" />
      <div class="max-w-screen-lg mx-auto relative">
        <p class="text-gray-500 text-sm font-semibold uppercase m-0 max-md:text-center">Results</p>
        <h2 class="mt-3 mb-0 max-md:text-center"><span class="text-red-500">Customer results</span> with remote device management</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <NuxtLink
              v-for="result in RESULTS"
              :key="result.company"
              :to="result.linkHref"
              class="group relative z-[1] overflow-hidden md:overflow-visible bg-white rounded-lg border border-gray-200 px-7 pt-6 pb-7 flex flex-col gap-9 transition-all duration-200 ease-out hover:no-underline md:hover:z-[2] md:motion-safe:hover:scale-[1.04] md:after:absolute md:after:inset-0 md:after:rounded-lg md:after:pointer-events-none md:after:opacity-0 md:after:shadow-lift md:after:transition-opacity md:after:duration-200 md:after:ease-linear md:hover:after:opacity-100"
          >
            <UIcon name="i-heroicons-arrow-up-right" class="absolute top-6 right-7 z-10 w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
            <div class="flex flex-col gap-1 pr-8">
              <div class="flex items-center gap-3.5 text-5xl font-semibold text-red-400">
                <template v-if="result.before">
                  <span>{{ result.before }}</span>
                  <UIcon name="i-heroicons-chevron-right" class="w-8 h-8 shrink-0" />
                </template>
                <span>{{ result.after }}</span>
              </div>
              <span class="text-xl font-semibold text-red-500 opacity-90">{{ result.unit }}</span>
            </div>
            <p class="text-sm leading-5 text-gray-700 opacity-90 m-0">
              <span class="font-semibold text-blue-700">{{ result.company }}</span> {{ result.text }}
            </p>
            <div class="hidden md:flex absolute inset-0 rounded-lg items-center justify-center text-center px-6 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
              <span class="text-sm font-medium text-gray-900">{{ splitLinkText(result).before }}<span class="text-indigo-600">{{ result.linkName }}</span>{{ splitLinkText(result).after }}</span>
            </div>
            <span class="absolute -inset-px z-20 rounded-lg border border-transparent group-hover:border-indigo-600 pointer-events-none transition-colors duration-200" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Visibility -->
    <section class="w-full px-6 pt-20 pb-24 bg-gray-50">
      <div class="max-w-screen-lg mx-auto">
        <p class="text-gray-500 text-sm font-semibold uppercase m-0 max-md:text-center">Visibility</p>
        <h2 class="mt-3 mb-0 max-md:text-center">See and manage <span class="text-indigo-600">every remote device from one place</span></h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 mt-16">
          <div v-for="item in VISIBILITY" :key="item.title" class="max-md:text-center">
            <UIcon :name="item.icon" class="w-8 h-8 text-indigo-600" />
            <p class="text-xl font-semibold text-gray-600 mt-3 mb-0">{{ item.title }}</p>
            <p class="font-light text-gray-700 leading-relaxed mt-6 mb-0"><InlineMarkdown :text="item.text" /></p>
          </div>
        </div>
        <ProseNote class="mt-16">
          The <a href="/platform/device-agent/">FlowFuse Device Agent</a> runs your flows on remote devices and keeps them connected to FlowFuse for centralized monitoring and management.
        </ProseNote>
      </div>
    </section>

    <!-- Connectivity: the sticky-heading step list from integrations/opcua.vue ("From OPC
         UA to insight, step by step") -->
    <section class="w-full px-6 pt-20 pb-24">
      <div class="max-w-screen-lg mx-auto md:flex md:gap-12 md:items-start">
        <div class="mb-12 md:mb-0 md:w-[373px] md:shrink-0 md:sticky! md:top-24 md:self-start max-md:text-center">
          <p class="text-gray-500 text-sm font-semibold uppercase m-0">Connectivity</p>
          <h2 class="mt-3 mb-0">Fix one machine. <span class="text-indigo-600">Deploy to all of them.</span></h2>
          <p class="font-light text-gray-700 leading-relaxed mt-6 mb-0">This is where a monitoring tool stops and remote device management keeps going.</p>
          <NuxtLink to="/docs/device-agent/install/overview/" class="mt-3 inline-flex items-center gap-1.5">
            Learn how to install the FlowFuse Device Agent
            <UIcon name="i-heroicons-arrow-long-right-20-solid" class="w-5 h-5 shrink-0" />
          </NuxtLink>
        </div>
        <div class="max-w-screen-md mx-auto md:mx-0">
          <div v-for="(step, index) in STEPS" :key="step.title" class="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div class="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0">
              <div class="ff-line h-px flex-1 sm:hidden" />
              <UIcon :name="step.icon" class="w-7 h-7 text-indigo-600 shrink-0 sm:mt-7" />
              <div class="ff-line h-px flex-1 sm:hidden" />
              <div v-if="index !== STEPS.length - 1" class="ff-line hidden sm:block w-px flex-1 my-4 bg-gray-300" />
            </div>
            <div :class="index !== STEPS.length - 1 ? 'pb-10 sm:pb-16' : ''">
              <span class="block font-semibold text-gray-500 mb-1 text-center sm:text-left">Step {{ index + 1 }}</span>
              <h4 class="mt-0 mb-4 text-xl font-semibold text-indigo-600 text-center sm:text-left">{{ step.title }}</h4>
              <p class="font-light text-gray-700 leading-relaxed mb-0"><InlineMarkdown :text="step.text" /></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Intelligence at the Edge: background and card style of the "Use Cases" tiles on
         the industry pages (industry/UseCaseTiles.vue), with an icon in place of the photo -->
    <section class="w-full px-6 py-20 comparison-section-bg">
      <div class="max-w-screen-lg mx-auto">
        <p class="text-gray-500 text-sm font-semibold uppercase m-0 max-md:text-center">Intelligence at the Edge</p>
        <h2 class="mt-3 mb-0 max-md:text-center">Once the loop is closed, <span class="text-indigo-600">intelligence is a node, not a project</span></h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
          <div v-for="item in INTELLIGENCE" :key="item.title" class="flex flex-col gap-9 rounded-lg border border-white p-5 bg-[linear-gradient(135deg,_theme(colors.white)_0%,_theme(colors.white/20%)_100%)]">
            <div class="flex flex-col gap-3">
              <UIcon :name="item.icon" class="w-8 h-8 text-indigo-600" />
              <p class="text-lg font-semibold text-gray-600 m-0">{{ item.title }}</p>
            </div>
            <p class="text-sm leading-5 font-light text-gray-700 m-0"><InlineMarkdown :text="item.text" /></p>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing CTA: the get-started card from /product/, with this page's heading -->
    <section class="w-full px-6 pt-28">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-4xl sm:text-5xl font-medium m-0">Make your remote devices intelligent</p>
          <p class="text-indigo-50 font-light text-xl max-w-3xl m-0">Your first operational application could be running this week. Request a demo to see how, or explore pricing to find the right fit.</p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="final-cta" />
            <CtaSignUp variant="ghost" color="white" position="final-cta" icon="i-lucide-arrow-right" />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ: last on the page, as in the doc -->
    <section class="w-full px-6 pt-24 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <div class="-mt-20">
          <BlogFaq :faq="FAQ" variant="page" />
        </div>
      </div>
    </section>
  </div>
</template>
