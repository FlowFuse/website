<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'

const META_TITLE = 'Composable MES: Build Apps Around Your MES | FlowFuse'
const META_DESCRIPTION = 'Build a composable MES with FlowFuse: AI-assisted, low-code apps and MES integration that work alongside the system you already run, without replacing it.'

const EXCEPTIONS = 'There\'s always a machine that doesn\'t fit the standard, [a legacy device the MES can\'t talk to](/use-cases/shop-floor-communication/), or [an operator screen that takes three weeks to learn](/platform/dashboard/). We work with your team to build those customizations as applications around the MES, so its core stays standard, and your team can run and extend them across every plant.'

const COMPARISON = [
    {
        area: 'Role',
        flowfuse: 'The application layer around it: [integrations](/integrations/), operator apps, and line-specific workflows',
        mes: 'System of record for orders, routing, genealogy, and validated records',
    },
    {
        area: 'Data',
        flowfuse: 'Live machine data, collected and [shaped](/blog/2025/06/structuring-storing-data-mes-integration/), then handed to the MES',
        mes: 'Production records and transactions',
    },
    {
        area: 'Changes',
        flowfuse: 'Built and changed by your own team, with AI, and approved before going live',
        mes: 'Kept standard, with vendor-managed upgrades',
    },
    {
        area: 'Deployment',
        flowfuse: '[Hosted and edge instances](/product/edge/) managed from one platform, across every site',
        mes: 'Per your vendor\'s architecture',
    },
    {
        area: 'AI',
        flowfuse: '[FlowFuse Expert](/ai/) (our Built-in AI) plus MCP integration with the agents your company already approved, scoped by team and logged',
        mes: 'Varies by vendor',
    },
]

const CAPABILITIES = [
    {
        title: 'Connect what the MES can\'t',
        description: 'Bring in data from PLCs, [legacy devices](/platform/device-agent/), and other systems over [OPC UA](/integrations/opcua/), [Modbus](/integrations/node-red-contrib-modbus/), [MQTT](/docs/user/mqtt-nodes/), Sparkplug B, REST, and more, then hand it to the MES in the format it expects.',
        image: { src: '/images/use-cases/mes/flow-editor.webp', alt: 'A FlowFuse flow reading PLC and Modbus data and publishing it to production topics', width: 1284, height: 846 },
        variant: 'indigo',
        link: { to: '/integrations/', label: 'Browse integrations' },
    },
    {
        title: 'Describe it, and AI builds it with you',
        description: 'Tell FlowFuse\'s [built-in AI](/ai/) what the line needs, such as [live OEE](/blueprints/manufacturing/oee-dashboard/), [andon calls](/blueprints/manufacturing/andon-system/), or a [quality check](/blog/2026/07/defect-and-quality-monitoring/) at the machine. It builds the first version of the logic and the operator screens in [FlowFuse Dashboard](/platform/dashboard/), explains flows you inherited, and writes custom code. Nothing changes until your team approves it.',
        image: { src: '/images/use-cases/mes/torque-monitoring-video.webp', alt: 'Video: Building a Torque Monitoring App in 68 Minutes', width: 1280, height: 720 },
        youtube: 'kPBLW-kMfsg',
        variant: 'red',
        link: { to: '/ai/', label: 'Learn about FlowFuse AI and see how it builds apps' },
    },
    {
        title: 'Reuse it across sites',
        description: 'Version applications, [promote them through pipelines](/docs/user/devops-pipelines/), and [deploy to every line and plant from one place](/use-cases/remote-device-management/).',
        image: { src: '/images/use-cases/mes/platform-home-card.webp', alt: 'FlowFuse home screen showing hosted and remote instances for packaging line monitoring, OEE and predictive maintenance apps', width: 1272, height: 855 },
        variant: 'indigo',
        link: { to: '/platform/why-flowfuse/', label: 'Explore the FlowFuse platform' },
    },
    {
        title: 'Connect the AI you already use',
        description: '[Bring the agent your company has already approved](/blog/2026/09/industrial-ai-agent/), such as Microsoft Copilot, ChatGPT, or Claude, or run a local model so nothing leaves your network. Agents reach only the teams you allow, and every action is logged.',
        image: { src: '/images/industries/industrial-machinery/bring-your-ai.png', alt: 'Screenshot of an AI chat interface showing supported AI tool logos and a prompt to build an MCP server exposing CNC machine data', width: 856, height: 564 },
        variant: 'red',
        link: { to: '/blog/2026/09/industrial-ai-agent/', label: 'Read how to connect an industrial AI agent to FlowFuse' },
    },
]

const MES_LOGOS = [
    { src: '/images/mes-logos/siemens-logo.svg', alt: 'Siemens Opcenter', height: 'h-6' },
    { src: '/images/mes-logos/rockwell-automation-logo.svg', alt: 'Rockwell Automation Plex', height: 'h-10' },
    { src: '/images/mes-logos/sap-logo.svg', alt: 'SAP Digital Manufacturing', height: 'h-10' },
    { src: '/images/mes-logos/aveva-logo.svg', alt: 'AVEVA MES', height: 'h-6' },
    { src: '/images/mes-logos/critical-manufacturing-logo.svg', alt: 'Critical Manufacturing MES', height: 'h-10' },
    { src: '/images/mes-logos/dassault-systemes-logo.svg', alt: 'Dassault Systèmes DELMIA Apriso', height: 'h-10' },
    { src: '/images/mes-logos/ge-vernova-logo.svg', alt: 'GE Vernova Proficy', height: 'h-7' },
    { src: '/images/mes-logos/tulip-logo.svg', alt: 'Tulip', height: 'h-8' },
]

const QUOTES = [
    {
        text: 'Suppliers say, okay, this is possible. But when you try to change it — oh, it costs millions.',
        role: 'Application manager',
        company: 'Regulated manufacturer',
    },
    {
        text: 'If you have ever worked with MES, there is nothing standard. All MES systems are custom.',
        role: 'Digital manufacturing lead',
        company: 'Building-products manufacturer',
    },
    {
        text: 'We\'ve spent over 12 months implementing our MES, I\'m too scared to spend more time to customize it. But I need value now, so customizations have to be easy.',
        role: 'Operations lead',
        company: 'Automotive supplier',
    },
]

const FAQ = [
    {
        question: 'Is FlowFuse an MES alternative?',
        answer: 'No, and we don\'t want to be. Most software vendors want you to standardize on their platform. We\'d rather you keep the MES you spent years implementing. For order management, genealogy, and validated records, it should stay. FlowFuse is how teams make an MES composable: the standard core stays in place, and the line-specific pieces are built as separate applications your team controls. Teams without an MES often start the same way, building [OEE tracking](/blueprints/manufacturing/oee-dashboard/) or [shift reporting](/use-cases/production-monitoring/) as individual apps, and decide on MES scope later.',
    },
    {
        question: 'How does FlowFuse use AI?',
        answer: '[FlowFuse Expert](/blog/2025/10/introducing-flowfuse-expert/), the AI built into the platform, builds flows from a plain-language description, explains flows your team inherited, writes custom code, and answers questions about what\'s running on the floor. Every change waits for your approval. You can also [connect the AI agents your company already uses](/ai/), such as Microsoft Copilot, ChatGPT, or Claude, or a local model so nothing leaves your network. Agents reach only the teams you allow, and every action is logged. Inside your applications, [AI agents can work with live production data](/docs/flowfuse-nodes/mcp/), and you can [run your own models at the edge](/docs/flowfuse-nodes/ai/onnx/).',
    },
    {
        question: 'How does MES integration work with FlowFuse?',
        answer: 'The right integration path depends on what your MES exposes. Common options are [REST or SOAP APIs, database connections, file exchanges, and MQTT](/use-cases/it-ot-middleware/). FlowFuse connects to these alongside equipment protocols such as [OPC UA](/integrations/opcua/) and [Modbus](/integrations/node-red-contrib-modbus/).',
    },
    {
        question: 'What is a composable MES?',
        answer: 'A composable MES approach pairs a standard core with [smaller, purpose-built applications](/blueprints/) for the needs that core doesn\'t cover, rather than relying on one vendor for everything. FlowFuse is a platform for building and managing those applications.',
    },
    {
        question: 'Do we need an MES before using FlowFuse?',
        answer: 'No. Some teams start with [data collection and reporting](/blog/2025/06/data-acquisition-for-mes/), such as replacing paper shift reports, and [decide on MES scope later](/blog/2023/10/mes-build-buy/). Others build the MES functions they need, such as production tracking, data collection, or resource management, as individual applications and add more over time. Because FlowFuse is built on open-source Node-RED, it gives you an open-source path to MES functionality without vendor lock-in.',
    },
    {
        question: 'Will this disrupt our MES rollout?',
        answer: 'No. A gradual evaluation can start with one application on one line while the MES project continues.',
    },
    {
        question: 'What is FlowFuse built on?',
        answer: 'FlowFuse is built on [Node-RED](/node-red/), the open-source, low-code platform widely used in industrial automation. FlowFuse adds what production use requires: [built-in AI](/ai/), [team collaboration](/docs/user/team/), [version control](/docs/user/snapshots/), [deployment pipelines](/docs/user/devops-pipelines/), [role-based access](/docs/user/role-based-access-control/), [audit logs](/platform/security/), and [management of applications across sites](/product/fleet/).',
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
    ogUrl: 'https://flowfuse.com/use-cases/mes/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
])
</script>

<template>
  <div class="w-full text-gray-700">
    <section class="mes-gradient w-full px-6 pt-16 md:pt-20 pb-20">
      <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="max-md:text-center">
          <h1 class="text-4xl md:text-5xl font-medium m-0">
            Keep your MES.
            <span class="block text-red-600">Make it composable.</span>
          </h1>
          <p class="mt-6 mb-0 text-gray-700">
            FlowFuse engineers work alongside your team to deliver the first application, one costly problem at a time, 
              and leave you a foundation your team can run and extend across every plant.
          </p>
          <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
            <CtaBookDemo variant="highlight" position="hero" />
            <CtaPricing variant="ghost" position="hero" icon="i-lucide-arrow-right" />
          </div>
          <p class="mt-4 mb-0 text-sm text-gray-500">No rip and replace. Start with one line, then scale to every plant.</p>
        </div>
        <img
            src="/images/use-cases/mes/composable-mes-hero.webp"
            alt="Diagram: FlowFuse sits between the shop floor and your MES. PLCs, machines, sensors, SCADA and legacy systems feed apps built with FlowFuse, such as OEE dashboards, andon calls, quality checks, operator screens, production tracking, shift reports, maintenance alerts and energy monitoring, deployed to every plant and exchanging data with your MES, which stays the system of record"
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
          MES integration <span class="text-indigo-600">without touching the core</span>.
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600">
          FlowFuse connects to MES platforms over the interfaces they already expose:
          <NuxtLink to="/docs/node-red/integration-technologies/rest/">APIs</NuxtLink>,
          <NuxtLink to="/docs/node-red/database/">databases</NuxtLink>, file exchange, and
          <NuxtLink to="/blog/2024/06/how-to-use-mqtt-in-node-red/">MQTT</NuxtLink>. Define who owns each record,
          <NuxtLink to="/blog/2025/06/structuring-storing-data-mes-integration/">validate payloads</NuxtLink>, and
          control any write-back to production systems.
        </p>
        <ul class="mt-12 mb-0 p-0 list-none grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 items-center">
          <li v-for="logo in MES_LOGOS" :key="logo.src" class="m-0 flex items-center justify-center">
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

    <section class="mes-gradient w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl">
          Composable MES: Your MES + FlowFuse are <span class="text-indigo-600">better together</span>.
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600">
          Your MES is the system of record, and it should stay that way. Most software vendors want to become your
          system of everything. We don't. Here's how the work splits.
        </p>
        <ul class="md:hidden mt-10 mb-0 px-6 py-8 list-none flex flex-col gap-12 rounded-lg border border-gray-200 bg-white">
          <li v-for="row in COMPARISON" :key="row.area" class="m-0">
            <h3 class="m-0 text-xl font-normal text-gray-800">{{ row.area }}</h3>
            <p class="mt-4 mb-0 text-indigo-600">Your MES</p>
            <p class="mt-1 mb-0 font-light text-gray-700">{{ row.mes }}</p>
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
                <th scope="col" class="w-[37.5%] px-5 py-4 bg-indigo-50 font-medium text-gray-700">Your MES</th>
                <th scope="col" class="w-[40.5%] px-5 py-4 bg-indigo-600 font-medium text-white">FlowFuse</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in COMPARISON" :key="row.area" class="border-t border-gray-200 align-top">
                <th scope="row" class="px-5 py-5 font-medium text-gray-700">{{ row.area }}</th>
                <td class="px-5 py-5 font-light text-gray-600">{{ row.mes }}</td>
                <td class="px-5 py-5 font-light text-gray-700">
                  <InlineMarkdown :text="row.flowfuse" position="comparison-table" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-6 mb-0 text-sm text-gray-500">Capabilities vary by MES vendor, edition, and configuration.</p>
      </div>
    </section>

    <section class="w-full px-6 pt-20 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl">
          Don't replace your MES. <span class="text-indigo-600">Build around it.</span>
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
                  <LiteYoutube v-if="item.youtube" :videoid="item.youtube" :title="item.image.alt" :poster="item.image.src" class="mes-frame__video" />
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
          <h2 class="mt-2">What manufacturers say about changing their MES</h2>
          <p class="mt-4 mb-0 text-gray-600">
            From discovery calls with manufacturing teams, shared anonymously.
          </p>
        </div>
        <div
            class="relative rounded-lg border border-indigo-200 bg-indigo-50/50 overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Quotes from manufacturing teams"
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
        <h2 class="mb-1 text-center md:text-left">Composable MES: <span class="text-indigo-600">FAQs</span></h2>
        <p class="mt-3 mb-0 text-gray-600 text-center md:text-left">
          Clear answers for teams deciding what belongs in the MES and what belongs around it.
        </p>
        <Faq :faq="FAQ" />
      </div>
    </section>

    <IndustryPageCta
        heading="Build the app your MES is missing."
        description="Bring one real use case: a line that doesn't fit, a system the MES can't reach, or a screen operators avoid. We'll bring an engineer and work out the first step together."
    />
  </div>
</template>

<style scoped>
.mes-gradient {
    background: linear-gradient(100deg, var(--color-indigo-50) 0%, white 50%, color-mix(in oklab, var(--color-red-50) 70%, white) 100%);
}

.mes-frame__video {
    border-radius: 0;
}
</style>
