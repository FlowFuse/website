<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'

const META_TITLE = 'SCADA Integration Software for Ignition & More | FlowFuse'
const META_DESCRIPTION = 'FlowFuse is SCADA integration software that connects Ignition, WinCC, and FactoryTalk to MES, ERP, and the cloud. Keep your SCADA and build around it.'

const EXCEPTIONS = 'There\'s always [a device the SCADA has no driver for](/use-cases/shop-floor-communication/), a report someone exports to Excel every morning, or a request for plant data that lands in an already-full controls backlog. We work with your team to build those as applications around the SCADA, so its core stays stable, and your team can run and extend them across every plant.'

const COMPARISON = [
    {
        area: 'Role',
        flowfuse: 'The application layer around it: [integrations](/integrations/), operator apps, and site-specific workflows',
        scada: 'Supervisory control, HMI screens, and alarms for the process',
    },
    {
        area: 'Data',
        flowfuse: 'Data from the devices and systems SCADA doesn\'t reach, plus SCADA data [shaped and routed](/use-cases/it-ot-middleware/) to [MES](/use-cases/mes/), [ERP](/landing/enterprise-integration/), the cloud, and your [UNS](/unified-namespace/)',
        scada: 'Real-time tags, alarms, and process history',
    },
    {
        area: 'Changes',
        flowfuse: 'Built and changed by your own team, with [AI](/ai/), and approved before going live',
        scada: 'Owned by controls engineering, under your validation process',
    },
    {
        area: 'Deployment',
        flowfuse: '[Hosted and edge instances](/product/edge/) managed from one platform, across every site',
        scada: 'Per your vendor\'s architecture and licensing',
    },
    {
        area: 'AI',
        flowfuse: '[FlowFuse Expert](/ai/) (our [built-in AI](/webinars/2026/integrating-external-ai-agents-in-industrial-workflows/)) plus MCP integration with the agents your company already approved, scoped by team and logged',
        scada: 'Varies by vendor',
    },
]

const CAPABILITIES = [
    {
        title: 'Connect what the SCADA can\'t',
        description: 'Bring in data from [legacy devices](/platform/device-agent/), serial equipment, and systems without a native driver over [Modbus](/integrations/node-red-contrib-modbus/), [OPC UA](/integrations/opcua/), [MQTT](/docs/user/mqtt-nodes/), Sparkplug B, REST, and more. Then route it to the SCADA, the [MES](/use-cases/mes/), or the cloud in the format each one expects.',
        image: { src: '/images/use-cases/mes/flow-editor.webp', alt: 'A FlowFuse flow reading PLC and Modbus data and publishing it to production topics', width: 1284, height: 846 },
        variant: 'indigo',
        link: { to: '/integrations/', label: 'Browse integrations' },
    },
    {
        title: 'Take reporting and analytics off the SCADA',
        description: 'Run [OEE](/blueprints/manufacturing/oee-dashboard/), downtime, and shift reports outside your SCADA, keeping analytics workloads separate from control. Give production, maintenance, and management teams access to live dashboards without relying on control-room screens or manual exports.',
        image: { src: '/images/use-cases/scada/oee-dashboard.webp', alt: 'A FlowFuse OEE dashboard showing OEE, performance, availability and quality gauges, a downtime summary, production counts, the top underperforming machines, recent downtime events and a daily OEE trend', width: 1600, height: 1076 },
        variant: 'red',
        link: { to: '/platform/dashboard/', label: 'See how FlowFuse Dashboard works' },
    },
    {
        title: 'Describe it, and AI builds it with you',
        description: 'Tell FlowFuse Expert what the plant needs, such as an MES handover screen or a UNS topic mapping, and it builds the application on your workspace, hosted or edge, so a small team doesn\'t wait on the controls backlog. Or [connect the agent your company has already approved](/webinars/2026/integrating-external-ai-agents-in-industrial-workflows/), such as Microsoft Copilot, ChatGPT, or Claude. Nothing changes until your team approves it.',
        image: { src: '/images/use-cases/mes/torque-monitoring-video.webp', alt: 'Video: Building a Torque Monitoring App in 68 Minutes', width: 1280, height: 720 },
        youtube: 'dgwB7oFL_YY',
        variant: 'indigo',
        link: { to: '/ai/', label: 'Learn about FlowFuse AI and see how it builds apps' },
    },
    {
        title: 'Alerts that never fail silent',
        description: 'Keep alarms in your SCADA and build notification and escalation workflows around them. Send alerts through supported channels, such as [email](/docs/node-red/notification/email/) and SMS, and escalate when no one acknowledges so critical events are less likely to go unnoticed.',
        image: { src: '/images/use-cases/scada/alert-escalation.webp', alt: 'A FlowFuse flow that subscribes to SCADA alarm events over OPC UA, keeps those with severity 700 or higher, emails the shift lead and texts the on-call technician, and escalates to the manager if no one presses the dashboard Acknowledge button within 10 minutes, which also acknowledges the alarm in the SCADA', width: 1600, height: 1075 },
        variant: 'red',
        link: { to: '/docs/node-red/notification/', label: 'Build your notification workflow' },
    },
    {
        title: 'Build once, run at every plant',
        description: 'Build an application once, then [deploy it across lines and plants from one place](/use-cases/remote-device-management/). Use [deployment pipelines](/docs/user/devops-pipelines/) to promote changes from development to production, and [version control](/docs/user/snapshots/) to track application changes.',
        image: { src: '/images/use-cases/mes/platform-home-card.webp', alt: 'FlowFuse home screen showing hosted and remote instances for packaging line monitoring, OEE and predictive maintenance apps', width: 1272, height: 855 },
        variant: 'indigo',
        link: { to: '/platform/why-flowfuse/', label: 'Explore the FlowFuse platform' },
    },
]

const SCADA_LOGOS = [
    { src: '/images/scada-logos/inductive-automation-ignition-logo.svg', alt: 'Inductive Automation Ignition', height: 'h-10' },
    { src: '/images/mes-logos/siemens-logo.svg', alt: 'Siemens WinCC', height: 'h-6' },
    { src: '/images/mes-logos/rockwell-automation-logo.svg', alt: 'Rockwell Automation FactoryTalk View', height: 'h-10' },
    { src: '/images/mes-logos/aveva-logo.svg', alt: 'AVEVA System Platform', height: 'h-6' },
    { src: '/images/mes-logos/ge-vernova-logo.svg', alt: 'GE Vernova Proficy iFIX', height: 'h-7' },
    { src: '/images/scada-logos/schneider-electric-logo.svg', alt: 'Schneider Electric EcoStruxure Geo SCADA', height: 'h-9' },
    { src: '/images/scada-logos/copa-data-logo.svg', alt: 'COPA-DATA zenon', height: 'h-7' },
    { src: '/images/scada-logos/iconics-logo.svg', alt: 'ICONICS GENESIS64', height: 'h-7' },
]

const QUOTES = [
    {
        text: 'There are many cases where the SCADA system is just not what it\'s meant for. Especially when you\'re dealing with high data throughput, very heavy data.',
        role: 'Manufacturing manager',
        company: 'Global packaging manufacturer',
    },
    {
        text: 'Ignition has gaps when it comes to connectivity and alerting. FlowFuse is a great solution here because we built alarm escalations and nothing fails silent anymore',
        role: 'OT manager',
        company: 'Global energy company',
    },
    {
        text: 'It\'s almost impossible to do modern analytics with SCADA. You have to find a separate solution for that or build around its shortcomings.',
        role: 'SCADA leader',
        company: 'Water utility',
    },
]

const FAQ = [
    {
        question: 'Does FlowFuse work with Ignition?',
        answer: 'Yes. Ignition is the SCADA we see most often alongside FlowFuse. Teams use FlowFuse to move data from Ignition to MES, ERP, historians, and the cloud, to connect devices Ignition has no native driver for and pass that data back to it, and to run the same applications across plants, including plants that don\'t run Ignition. Ignition keeps the HMI, the alarms, and control.',
    },
    {
        question: 'Is FlowFuse an Ignition alternative?',
        answer: 'It can be, but that\'s not where we start. Most software vendors want you to standardize on their platform. We\'d rather you keep the Ignition system your controls team spent years building and validating, and build what it doesn\'t cover around it. If you do want to move off Ignition, at one site or across all of them, we\'re happy to talk about that too. [Talk to our team](/book-demo/) and we\'ll plan the migration at your pace.',
    },
    {
        question: 'How does Ignition integration work with FlowFuse?',
        answer: 'The right path depends on how your Gateways are set up. Common options are Ignition\'s [OPC UA](/integrations/opcua/) server, [MQTT and Sparkplug B](/blog/2024/08/using-mqtt-sparkplugb-with-node-red/), the SQL databases Ignition logs to, and REST endpoints. Where you need data Ignition doesn\'t collect, FlowFuse also [connects to PLCs directly](/landing/plc/) over protocols such as S7, EtherNet/IP, and Modbus. The same options apply to most other SCADA platforms.',
    },
    {
        question: 'What should we build in Ignition, and what in FlowFuse?',
        answer: 'Keep HMI screens, alarms, and supervisory control in Ignition, where your controls team already manages them. Build in FlowFuse when the work crosses into IT or the cloud, needs a device Ignition can\'t reach, runs the same way across many sites, or uses AI. Many teams make that split one application at a time.',
    },
    {
        question: 'How does FlowFuse use AI?',
        answer: '[FlowFuse Expert](/blog/2025/10/introducing-flowfuse-expert/), the AI built into the platform, builds flows from a plain-language description, explains flows your team inherited, writes custom code, and answers questions about what\'s running on the floor. Every change waits for your approval. You can also [connect the AI agents your company already uses](/ai/), such as Microsoft Copilot, ChatGPT, or Claude, or a local model so nothing leaves your network. Agents reach only the teams you allow, and every action is logged.',
    },
    {
        question: 'Will this disrupt our SCADA or plant operations?',
        answer: 'No. A gradual evaluation can start with one application on one line, reading data only, while the SCADA keeps running the process. Write-back is added only when your team approves it. FlowFuse can also take load off the SCADA by subscribing to data it already publishes rather than polling PLCs a second time, and by handling high-volume data and reporting work.',
    },
    {
        question: 'What is FlowFuse built on?',
        answer: 'FlowFuse is built on [Node-RED](/node-red/), the open-source, low-code platform widely used in industrial automation. FlowFuse adds what production use requires: built-in AI, [team collaboration](/docs/user/team/), [version control](/docs/user/snapshots/), [deployment pipelines](/docs/user/devops-pipelines/), [role-based access](/docs/user/role-based-access-control/), [audit logs](/platform/security/), and [management of applications across sites](/product/fleet/).',
    },
]

const FRAME_VARIANTS = {
    indigo: { backdrop: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300' },
    red: { backdrop: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100' },
}

const QUOTE_INTERVAL_MS = 6000

const currentQuote = ref(0)
const quotePaused = ref(false)
let quoteTimer: ReturnType<typeof setInterval> | undefined

function showQuote(index: number) {
    currentQuote.value = (index + QUOTES.length) % QUOTES.length
    startQuoteTimer()
}

function startQuoteTimer() {
    clearInterval(quoteTimer)
    quoteTimer = setInterval(() => {
        if (!quotePaused.value) currentQuote.value = (currentQuote.value + 1) % QUOTES.length
    }, QUOTE_INTERVAL_MS)
}

onMounted(startQuoteTimer)
onUnmounted(() => clearInterval(quoteTimer))

function pad(n: number) {
    return String(n).padStart(2, '0')
}

useSeoMeta({
    title: META_TITLE,
    description: META_DESCRIPTION,
    ogTitle: META_TITLE,
    ogDescription: META_DESCRIPTION,
    ogImage: 'https://flowfuse.com/images/use-cases/mes/platform-home.webp',
    ogUrl: 'https://flowfuse.com/use-cases/scada/',
    twitterSite: '@FlowFuseinc',
})

useHead({ titleTemplate: '%s' })

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
])
</script>

<template>
  <div class="w-full text-gray-700">
    <section class="scada-gradient w-full px-6 pt-16 md:pt-20 pb-20">
      <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="max-md:text-center">
          <h1 class="text-4xl md:text-5xl font-medium m-0">
            Keep your SCADA.
            <span class="block text-red-600">Make it work with everything else.</span>
          </h1>
          <p class="mt-6 mb-0 text-gray-700">
            Your SCADA runs the process. FlowFuse extends its capabilities with applications that connect equipment,
            bring production data into live dashboards, automate alerts, and share information with MES, ERP, and cloud
            systems. Keep your existing SCADA in place while giving your team more ways to use plant data.
          </p>
          <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
            <CtaSignUp variant="highlight" position="hero" />
            <CtaPricing variant="ghost" position="hero" icon="i-lucide-arrow-right" />
          </div>
        </div>
        <img
            src="/images/use-cases/scada/scada-hero.webp"
            alt="Diagram: your SCADA keeps running the process with HMI, alarms and supervisory control, next to IT systems such as MES, ERP, the cloud and a UNS. FlowFuse sits between them and the shop floor: it reads tags, alarms and history from the SCADA and sends back device data and approved writes, sends production data to IT systems and receives orders and requests, and connects PLCs, machines, sensors, serial devices and legacy systems. Apps built with FlowFuse, such as alarm escalation, OEE dashboards, shift reports, device integration, MES and ERP sync, operator apps, downtime tracking and energy monitoring, are deployed to every plant"
            width="2400"
            height="2000"
            loading="eager"
            class="block w-full h-auto max-md:mt-4"
        >
      </div>
    </section>

    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl">
          SCADA integration <span class="text-indigo-600">without touching the core</span>.
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600">
          FlowFuse connects to SCADA platforms over the interfaces they already expose:
          <NuxtLink to="/integrations/opcua/">OPC UA</NuxtLink>,
          <NuxtLink to="/blog/2024/08/using-mqtt-sparkplugb-with-node-red/">MQTT and Sparkplug B</NuxtLink>,
          <NuxtLink to="/docs/node-red/database/">SQL databases</NuxtLink>, and
          <NuxtLink to="/docs/node-red/core-nodes/network/http-request/">REST APIs</NuxtLink>. Read tags and history
          from the SCADA instead of polling the same PLCs twice, decide which system owns each value, and control any
          write-back to the process.
        </p>
        <ul class="mt-12 mb-0 p-0 list-none grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 items-center">
          <li v-for="logo in SCADA_LOGOS" :key="logo.src" class="m-0 flex items-center justify-center">
            <img
                :src="logo.src"
                :alt="logo.alt"
                :title="logo.alt"
                loading="lazy"
                class="w-auto max-w-full mix-blend-luminosity opacity-70 saturate-0"
                :class="logo.height"
            >
          </li>
        </ul>
        <NuxtLink to="/integrations/" class="mt-12 inline-flex items-center gap-1.5 text-blue-600 hover:underline">
          See all integrations
          <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
        </NuxtLink>
      </div>
    </section>

    <section class="scada-gradient w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl">
          Your SCADA + FlowFuse are <span class="text-indigo-600">better together</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600">
          Your SCADA runs the process, and it should stay that way. Most software vendors want you to rip and replace.
          We don't. Here's how the work splits.
        </p>
        <ul class="md:hidden mt-10 mb-0 px-6 py-8 list-none flex flex-col gap-12 rounded-lg border border-gray-200 bg-white">
          <li v-for="row in COMPARISON" :key="row.area" class="m-0">
            <h3 class="m-0 text-xl font-normal text-gray-800">{{ row.area }}</h3>
            <p class="mt-4 mb-0 text-indigo-600">Your SCADA</p>
            <p class="mt-1 mb-0 font-light text-gray-700">{{ row.scada }}</p>
            <p class="mt-5 mb-0 text-indigo-600">FlowFuse</p>
            <p class="mt-1 mb-0 font-light text-gray-700">
              <InlineMarkdown :text="row.flowfuse" position="comparison-table" />
            </p>
          </li>
        </ul>
        <div class="max-md:hidden mt-10 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table class="w-full min-w-[680px] table-fixed text-left">
            <thead>
              <tr>
                <th scope="col" class="w-[22%] px-5 py-4 bg-indigo-50 font-medium text-gray-700">Area</th>
                <th scope="col" class="w-[37.5%] px-5 py-4 bg-indigo-50 font-medium text-gray-700">Your SCADA</th>
                <th scope="col" class="w-[40.5%] px-5 py-4 bg-indigo-600 font-medium text-white">FlowFuse</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in COMPARISON" :key="row.area" class="border-t border-gray-200 align-top">
                <th scope="row" class="px-5 py-5 font-medium text-gray-700">{{ row.area }}</th>
                <td class="px-5 py-5 font-light text-gray-600">{{ row.scada }}</td>
                <td class="px-5 py-5 font-light text-gray-700">
                  <InlineMarkdown :text="row.flowfuse" position="comparison-table" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-6 mb-0 text-sm text-gray-500">Capabilities vary by SCADA vendor, edition, licensed modules, and configuration.</p>
      </div>
    </section>

    <section class="w-full px-6 pt-20 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl">
          Don't replace your SCADA. <span class="text-indigo-600">Build around it.</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600">
          <InlineMarkdown :text="EXCEPTIONS" position="exceptions" />
        </p>

        <div class="mt-20 md:max-w-screen-lg mx-auto">
          <div
              v-for="(item, i) in CAPABILITIES"
              :key="item.title"
              class="flex flex-col md:flex-row gap-8 items-center mb-14 md:mb-20 last:mb-0"
              :class="{ 'md:flex-row-reverse': i % 2 === 1 }"
          >
            <div class="w-full max-w-[500px] md:max-w-none md:w-[45%] max-md:mt-5">
              <div class="relative" :class="item.youtube ? 'aspect-video' : 'aspect-[430/289]'">
                <div
                    class="absolute -top-5 w-full h-full rounded-lg bg-gradient-to-tl"
                    :class="[FRAME_VARIANTS[item.variant as keyof typeof FRAME_VARIANTS].backdrop, i % 2 === 0 ? '-left-5' : '-right-5']"
                    aria-hidden="true"
                />
                <div class="absolute inset-0 rounded-lg border-2 overflow-hidden ff-image-cover bg-white" :class="FRAME_VARIANTS[item.variant as keyof typeof FRAME_VARIANTS].border">
                  <LiteYoutube v-if="item.youtube" :videoid="item.youtube" :title="item.image.alt" :poster="item.image.src" class="scada-frame__video" />
                  <img
                      v-else
                      :src="item.image.src"
                      :alt="item.image.alt"
                      :width="item.image.width"
                      :height="item.image.height"
                      loading="lazy"
                  >
                </div>
              </div>
            </div>
            <div class="md:w-[55%] flex flex-col gap-3 max-md:text-center">
              <h3 class="m-0 text-3xl font-medium text-gray-700">{{ item.title }}</h3>
              <p class="m-0 text-gray-500">
                <InlineMarkdown :text="item.description" :position="`capability-${i + 1}`" />
              </p>
              <NuxtLink :to="item.link.to" class="flex items-center gap-1.5 text-blue-600 hover:underline max-md:justify-center">
                {{ item.link.label }}
                <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full px-6 py-20 bg-gray-50">
      <div class="max-w-screen-lg mx-auto grid lg:grid-cols-[1fr_590px] gap-10 lg:gap-16 items-center">
        <div class="max-lg:text-center">
          <p class="m-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">From real conversations</p>
          <h2 class="mt-2">What operations teams say about building around SCADA</h2>
          <p class="mt-4 mb-0 text-gray-600">
            From discovery calls with manufacturing and utility teams, shared anonymously.
          </p>
        </div>
        <div
            class="relative rounded-lg border border-indigo-200 bg-indigo-50/50 overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Quotes from operations teams"
            @mouseenter="quotePaused = true"
            @mouseleave="quotePaused = false"
            @focusin="quotePaused = true"
            @focusout="quotePaused = false"
        >
          <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="absolute right-7 top-7 w-9 h-9 text-indigo-200" aria-hidden="true" />
          <div class="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none" :style="{ transform: `translateX(-${currentQuote * 100}%)` }">
            <figure
                v-for="(q, i) in QUOTES"
                :key="i"
                class="m-0 w-full shrink-0 flex flex-col p-7"
                :aria-hidden="i !== currentQuote"
                :inert="i !== currentQuote || undefined"
            >
              <blockquote class="m-0 pr-12 flex-1 text-2xl leading-snug italic font-medium text-gray-700">
                &ldquo;{{ q.text }}&rdquo;
              </blockquote>
              <figcaption class="mt-6 pt-5 border-t border-indigo-100">
                <p class="m-0 text-sm font-semibold text-gray-700">{{ q.role }}</p>
                <p v-if="q.company" class="m-0 text-sm text-gray-500">{{ q.company }}</p>
              </figcaption>
            </figure>
          </div>
          <div class="flex items-center justify-between gap-4 px-7 pb-6">
            <div class="flex items-center gap-1.5">
              <button
                  v-for="(q, i) in QUOTES"
                  :key="i"
                  type="button"
                  class="h-1.5 rounded-full transition-all cursor-pointer"
                  :class="i === currentQuote ? 'w-6 bg-indigo-600' : 'w-1.5 bg-indigo-200 hover:bg-indigo-300'"
                  :aria-label="`Show quote ${i + 1}`"
                  :aria-current="i === currentQuote"
                  @click="showQuote(i)"
              />
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-400 tabular-nums">{{ pad(currentQuote + 1) }}/{{ pad(QUOTES.length) }}</span>
              <button
                  type="button"
                  class="w-8 h-8 inline-flex items-center justify-center rounded-md border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                  aria-label="Previous quote"
                  @click="showQuote(currentQuote - 1)"
              >
                <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
              </button>
              <button
                  type="button"
                  class="w-8 h-8 inline-flex items-center justify-center rounded-md border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                  aria-label="Next quote"
                  @click="showQuote(currentQuote + 1)"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <EnterpriseSecurity />

    <section class="w-full px-6 pt-20 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">SCADA and FlowFuse: <span class="text-indigo-600">FAQs</span></h2>
        <Faq :faq="FAQ" />
      </div>
    </section>

  </div>
</template>

<style scoped>
.scada-gradient {
    background: linear-gradient(100deg, var(--color-indigo-50) 0%, white 50%, color-mix(in oklab, var(--color-red-50) 70%, white) 100%);
}

.scada-frame__video {
    border-radius: 0;
}
</style>
