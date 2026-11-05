<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'

// Unified Namespace: FlowFuse as the complete toolkit for building a UNS. The layout follows
// the /teams pages and the MES and SCADA use-case pages (gradient hero, logo strip, gray
// band, alternating capability rows, quotes, FAQ, closing CTA), so it reads as part of the
// same family.
//
// Copy rule for the toolkit rows: the lead sentence says why the layer matters to a UNS,
// and the bullets say how FlowFuse handles it, each starting with a verb.

const META_TITLE = 'Unified Namespace (UNS) Toolkit: Connect, Contextualize, Transport | FlowFuse'
const META_DESCRIPTION = 'Build your Unified Namespace with one toolkit: connect every machine, contextualize raw tags, run a built-in MQTT broker, and manage the namespace across every plant.'

// Kept to one shape so they line up:
// a short title (one line) and a detail of about fifteen words.
const CHALLENGES = [
    { title: 'Most machines don\'t speak MQTT', detail: 'Legacy PLCs, SCADA and serial devices get left out of the namespace because nothing reads them.' },
    { title: 'Point-to-point links keep breaking', detail: 'Every new system needs a custom link to every other system, and each one breaks on its own.' },
    { title: 'Raw values have no meaning', detail: 'A register address like %MW104 tells the MES, the dashboard or the analyst nothing at all.' },
    { title: 'Every layer is a separate product', detail: 'The broker, the integrations and the applications each need their own tool, vendor and team.' },
    { title: 'The topic tree drifts', detail: 'As more teams publish, topic names and payloads stop matching and consumers break.' },
    { title: 'Every plant starts from scratch', detail: 'What worked at the first site gets rebuilt by hand at the next, and the two drift apart.' },
]

// Toolkit row ids, from the eyebrow: 'Transform & Contextualize' -> 'transform-contextualize'.
function rowId(eyebrow: string) {
    return eyebrow.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')
}

type ToolkitRow = {
    eyebrow: string
    title: string
    description: string
    // Short check-mark bullets under the lead sentence, as on the /teams cards.
    points: string[]
    link: { to: string, label: string }
    // `video` is a short muted loop, as on the /teams cards, with `src` as its poster and as
    // the still shown when reduced motion is on. `youtube` swaps the frame for a video embed.
    // `poster` overrides `src` as the clip's first frame, when the clip doesn't start on `src`.
    image: { src: string, alt: string, video?: string, poster?: string, youtube?: string }
}

const TOOLKIT: ToolkitRow[] = [
    {
        eyebrow: 'Connect & Collect',
        title: 'Bring every machine into the namespace',
        description: "A UNS only works if every machine publishes to it, and most plant equipment doesn't speak MQTT.",
        points: [
            'Connect over certified OPC UA, Modbus, Siemens S7 and EtherNet/IP nodes, plus 5,000+ other integrations',
            'Read from PLCs, SCADA and historians without changing a line of PLC logic',
            'Collect at the edge, right beside your machines, and send a value only when it changes',
        ],
        image: { src: '/images/use-cases/mes/flow-editor.webp', alt: 'A FlowFuse flow reading Siemens S7, Allen-Bradley, OPC UA and Modbus sources and publishing them to UNS topics', video: '/images/teams/clips/flow-editor.mp4' },
        link: { to: '/integrations/', label: 'Explore industrial integrations' },
    },
    {
        eyebrow: 'Transform & Contextualize',
        title: 'Give every value a name, a unit and a place',
        description: 'A raw register means nothing to the MES, the dashboard or the analyst reading it.',
        points: [
            'Rename cryptic tags: %MW104 becomes filler/temperature in °C',
            'Organize every value by site, area, line and machine, following ISA-95',
            'Give MES, dashboards and analysts data they can use without a tag list from the PLC programmer',
        ],
        image: { src: '/images/use-cases/uns/add-context.webp', alt: 'Before: raw PLC registers HR 0 = 2, HR 2 = 119, HR 3 = 285, HR 4 = 62143, HR 7 = 630, HR 8 = 39, HR 9 = 4998. After FlowFuse, in your UNS: state Run, speed 119 bottles/min, bottles filled 18,739,903, tank level 63.0 %, product temp 3.9 °C and fill volume 499.8 ml', video: '/images/use-cases/uns/clips/add-context.mp4' },
        link: { to: '/use-cases/data-integration/', label: 'Explore data integration' },
    },
    {
        eyebrow: 'Transport',
        title: 'Run your namespace on a built-in MQTT broker',
        description: 'The broker is the hub of a UNS, where every producer publishes and every consumer subscribes.',
        points: [
            'Use the MQTT broker built into FlowFuse, with nothing extra to install',
            'Or keep the MQTT broker you already run and manage it from FlowFuse',
            'Run plain MQTT and Sparkplug B in the same namespace',
        ],
        image: { src: '/images/use-cases/uns/broker-choice.webp', alt: 'Add a new Broker in FlowFuse: choose the built-in FlowFuse Broker, recommended and with 20 MQTT clients included in your plan, or bring your own MQTT broker' },
        link: { to: '/use-cases/it-ot-middleware/', label: 'Explore IT/OT integration' },
    },
    {
        eyebrow: 'Browse & Manage',
        title: 'Keep the namespace consistent as it grows',
        description: 'A UNS falls apart when every team names topics its own way.',
        points: [
            'See every topic in your namespace as a live tree',
            'Get topic schemas generated from live data and documented for you',
            'Give every team, at every plant, the same documented structure to build against',
        ],
        image: { src: '/images/node-red/flowfuse-broker-hierarchy-framed.webp', alt: 'The FlowFuse broker topic hierarchy, from enterprise to plant, area, line, cell, PLC and sensor, with an Open Schema button for the auto-generated schema', video: '/images/use-cases/uns/clips/broker-hierarchy.mp4' },
        link: { to: '/product/', label: 'Explore the FlowFuse platform' },
    },
    {
        eyebrow: 'AI',
        title: 'Map thousands of tags in minutes, not weeks',
        description: 'Mapping tags into a hierarchy is the slowest part of building any UNS.',
        points: [
            'Describe your register map to FlowFuse Expert, and it builds the flows that name, scale and place every tag',
            'Or connect the AI agent your company already approved, such as Microsoft Copilot or ChatGPT, to do the same work',
            'Nothing is deployed until an engineer has reviewed and approved it',
        ],
        image: { src: '/images/use-cases/uns/ai-modbus-to-uns.webp', alt: 'Video: Turn Legacy Modbus Data into a Unified Namespace (UNS) with FlowFuse MCP', youtube: 'GlFiye5sJRM' },
        link: { to: '/ai/', label: 'Explore FlowFuse AI' },
    },
    {
        eyebrow: 'Manage & Scale',
        title: 'Run every plant\'s UNS from one place',
        description: 'A UNS proves itself on one line and pays off only when every plant runs it the same way.',
        points: [
            'See every plant\'s instances, versions and changes in one view',
            'Promote changes from dev to test to production, with one-click rollback',
            'Roll the proven setup out to the next site without rebuilding it',
        ],
        image: { src: '/images/use-cases/mes/platform-home.webp', alt: 'The FlowFuse home screen: 76 hosted and 40 remote instances running across plants, from packaging line monitoring and OEE dashboards to plant edge gateways', video: '/images/teams/clips/platform-home.mp4' },
        link: { to: '/use-cases/remote-device-management/', label: 'Explore remote device management' },
    },
]

// Approved customer quotes, word for word, alternating IT and OT, in the MES and SCADA pages'
// quote carousel.
const QUOTES = [
    { team: 'IT', text: 'We started using Node-RED at the plant level, but FlowFuse is what turned it into an enterprise-grade solution. Everything runs centrally from corporate IT, across multiple plants, with the dev and production pipelines and controls our organization requires.', name: 'James Wise', role: 'Sr. Product Owner, Milliken & Company' },
    { team: 'OT', text: 'I built out the FlowFuse deployment from scratch: machine monitoring, machine dashboards, ERP integration. What FlowFuse gave us was revision control and a platform the whole team could own. That made the deployment self-sustaining.', name: 'Lidiya Shutaya', role: 'OT Architecture & Standardization, formerly with Penn Engineering' },
    { team: 'IT', text: 'FlowFuse is like a Swiss Army knife that I can drive most of our IT systems from, versus having 10 different vendor relationships, 10 different point solutions, and then having to build practices around all that.', name: 'Chris Meyer', role: 'IT Director, Wilson Tool International' },
    { team: 'OT', text: 'We had expensive equipment sitting idle for 8 to 12 hours a day, capital doing nothing. Now those same machines run production validation during the day and automatically switch to reliability stress testing at night. Same hardware performing two jobs, with zero manual setup between shifts. With FlowFuse, we have 1 connected station to update every controller, instantly.', name: 'Rhythm Agarwal', role: 'Sr. Manufacturing Engineer, Aperia Technologies' },
    { team: 'IT', text: 'FlowFuse removes most of our concerns about scalability and reliability. It\'s also making it a lot easier for us to complete security audits for our customers. FlowFuse\'s stack is open, widely used and well documented, which gives auditors confidence in our applications built on your platform.', name: 'Alan Yeung', role: 'CTO, Power Workplace' },
    { team: 'OT', text: 'Once we settled on using Node-RED, we knew we needed a solution to help us manage our edge devices as well as our central control system. FlowFuse has helped us take our Node-RED from proof-of-concept through to a reliable, scalable solution for the future.', name: 'Robert VanHofwegen', role: 'District Manager, Paloma Irrigation and Drainage District' },
]

const QUOTE_INTERVAL_MS = 8000

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

// "You're never alone" from /teams/manufacturing-operations/, with the copy pointed at a UNS.
// Each description is split into parts so a part with an href renders as a link.
const SUPPORT = [
    { icon: 'i-lucide-handshake', title: 'Built with your team', parts: [
        { text: 'Our engineers work alongside yours to design the namespace and deliver the first plant, then stay close whenever a site needs help. See ' },
        { text: 'how we work with your team', href: '/professional-services/' },
        { text: '.' },
    ] },
    { icon: 'i-lucide-lock-open', title: 'No lock-in, ever', parts: [
        { text: 'FlowFuse is built on open-source ' },
        { text: 'Node-RED', href: '/node-red/' },
        { text: ' and MQTT. Your flows, topics and schemas belong to you, and your team can change them without waiting on us.' },
    ] },
    { icon: 'i-lucide-graduation-cap', title: 'Your team grows with it', parts: [
        { text: 'Your engineers learn by building alongside ours, and come away able to ' },
        { text: 'run and extend it on their own', href: '/docs/' },
        { text: '.' },
    ] },
]

// One row of four, all in the FlowFuse indigo branding, so the row matches the page.
const READING = [
    { title: 'Why FlowFuse is the Complete Toolkit for Building Your UNS', url: '/blog/2025/01/why-flowfuse-is-complete-toolkit-for-uns/', image: '/blog/2025/01/images/why-flowfuse-is-complete-toolkit-for-uns.jpeg', alt: 'Why FlowFuse is the Complete Toolkit for Building Your UNS' },
    { title: 'Designing a Clear Topic Structure for Your UNS', url: '/blog/2025/01/designing-topic-hierarchy-for-your-uns/', image: '/blog/2025/01/images/uns-topic-structer.png', alt: 'Designing a Clear Topic Structure for Your UNS, over the FlowFuse broker topic hierarchy' },
    { title: 'MQTT: The Frontrunner for Your UNS Broker', url: '/blog/2025/01/mqtt-frontrunner-for-uns/', image: '/blog/2025/01/images/mqtt-for-uns-1.png', alt: 'MQTT: The Frontrunner for Your UNS Broker, with FlowFuse and MQTT at the center of a UNS' },
    { title: 'Data Modeling: The Key to a Successful Unified Namespace', url: '/blog/2024/12/why-uns-need-data-modeling/', image: '/blog/2024/12/images/data-modeling-uns.png', alt: 'Data Modeling: The Key to a Successful Unified Namespace' },
]

const FAQ = [
    {
        question: 'What is a Unified Namespace?',
        answer: 'A Unified Namespace (UNS) is one shared, structured place where every machine, system and application publishes and reads its data, organized by enterprise, site, area, line and device. Instead of building a connection between every pair of systems, each one connects once to the UNS. Read the [introduction to UNS](/blog/2023/12/introduction-to-unified-namespace/).',
    },
    {
        question: 'Do we need to replace our SCADA or historian?',
        answer: 'No. FlowFuse connects to the SCADA, historians and other systems you already run and publishes their data to the UNS alongside data from your machines. They keep doing their jobs. See how FlowFuse works [alongside SCADA](/use-cases/scada/).',
    },
    {
        question: 'Can FlowFuse connect equipment that doesn\'t speak MQTT?',
        answer: 'Yes. FlowFuse connects PLCs and machines over [OPC UA](/integrations/opcua/), [Modbus](/integrations/node-red-contrib-modbus/), Siemens S7 and [many other industrial protocols](/integrations/), then publishes their data to your UNS. Legacy equipment stays as it is, with no changes to PLC logic.',
    },
    {
        question: 'Do we have to use the FlowFuse MQTT broker?',
        answer: 'No. FlowFuse includes a [built-in MQTT broker](/docs/user/teambroker/), but you can also connect the broker you already run and manage your UNS from FlowFuse. Learn [how to choose a UNS broker](/blog/2024/01/unified-namespace-what-broker/).',
    },
    {
        question: 'Does FlowFuse support Sparkplug B?',
        answer: 'Yes. You can publish and consume Sparkplug B alongside plain MQTT topics in the same UNS. See [how to use MQTT Sparkplug B with Node-RED](/blog/2024/08/using-mqtt-sparkplugb-with-node-red/).',
    },
    {
        question: 'How do we keep topics and payloads consistent across plants?',
        answer: 'FlowFuse shows your full topic hierarchy and generates a schema from live data, documenting every topic automatically. Every team builds against the same structure, and new plants start from the one that already works.',
    },
    {
        question: 'Can we start with one plant and expand later?',
        answer: 'Yes, and most teams do. Prove the UNS on one line or plant, then reuse the same flows, topic structure and [deployment pipelines](/docs/user/devops-pipelines/) at every new site.',
    },
    {
        question: 'Where can FlowFuse run?',
        answer: 'On FlowFuse Cloud, on your own servers, or both, with instances on [edge devices](/platform/device-agent/) managed from either. [Self-hosted deployments](/docs/install/introduction/) can run fully air-gapped.',
    },
    {
        question: 'Does FlowFuse meet enterprise security requirements?',
        answer: 'Yes. FlowFuse is SOC 2 Type I and Type II certified and supports single sign-on, multi-factor authentication, role-based access and a full audit log. See [FlowFuse security](/platform/security/).',
    },
]

const FRAME_VARIANTS = [
    { backdrop: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300' },
    { backdrop: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100' },
]

function pad(n: number) {
    return String(n).padStart(2, '0')
}

// Toolkit clips play only while on screen, and not at all with reduced motion (the still
// image shows instead), the same as the /teams cards.
const clips = ref<HTMLVideoElement[]>([])
let clipObserver: IntersectionObserver | undefined

onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    clipObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            const video = entry.target as HTMLVideoElement
            if (entry.isIntersecting) video.play().catch(() => {})
            else video.pause()
        }
    }, { threshold: 0.25 })
    clips.value.forEach(video => clipObserver!.observe(video))
})

onBeforeUnmount(() => clipObserver?.disconnect())

useSeoMeta({
    title: META_TITLE,
    description: META_DESCRIPTION,
    ogTitle: META_TITLE,
    ogDescription: META_DESCRIPTION,
    ogImage: 'https://flowfuse.com/images/node-red/flowfuse-broker-hierarchy-framed.webp',
    ogUrl: 'https://flowfuse.com/use-cases/uns/',
    keywords: 'Unified Namespace, UNS, UNS architecture, ISA-95, MQTT broker, Sparkplug B, OPC UA, Modbus, Siemens S7, industrial data, Node-RED, FlowFuse',
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
    <!-- HERO -->
    <section class="uns-gradient w-full px-6 pt-16 md:pt-20 pb-20">
      <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="max-md:text-center">
          <h1 class="m-0 text-4xl lg:text-[2.75rem] lg:leading-tight font-medium">
            The complete toolkit
            <span class="block text-red-600 text-balance">for your Unified Namespace</span>
          </h1>
          <p class="mt-6 mb-0 text-gray-700">
            Give every plant one source of truth, and every system the same language. FlowFuse connects the machines
            you already run and turns their data into live information your whole business can act on. Build your UNS
            once, then roll it out to every site.
          </p>
          <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
            <CtaBookDemo variant="highlight" position="hero" />
            <CtaSignUp variant="ghost" position="hero" icon="i-lucide-arrow-right" />
          </div>
        </div>
        <img
            src="/images/use-cases/uns/uns-hero.webp"
            alt="Diagram: PLCs, machines and SCADA feed into FlowFuse, which connects, collects, transforms and contextualizes their data and transports it through a built-in MQTT broker to MES, ERP and AI."
            width="2280"
            height="1680"
            loading="eager"
            class="block w-full h-auto max-md:mt-4"
        >
      </div>
    </section>

    <section class="w-full px-6 pb-16">
      <SocialProof />
    </section>

    <!-- CHALLENGES: plain and quiet on purpose, a number, the problem and one line under a
         thin rule. No boxes, icons or links. -->
    <section class="w-full px-6 py-20 bg-gray-50 border-y border-gray-100">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center">
          Where UNS projects <span class="text-indigo-600">get stuck</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">
          One source of truth sounds simple. The trouble starts when you try to build it, and it usually starts in the
          same six places.
        </p>
        <ol class="mt-12 mb-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          <li v-for="(item, i) in CHALLENGES" :key="item.title" class="m-0 pt-5 border-t border-gray-200">
            <span class="text-sm tabular-nums text-red-500">{{ pad(i + 1) }}</span>
            <h3 class="mt-2 mb-0 text-lg font-medium leading-snug text-gray-800">{{ item.title }}</h3>
            <p class="mt-2 mb-0 text-sm leading-relaxed text-gray-500">{{ item.detail }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- TOOLKIT: every layer of the UNS -->
    <section id="toolkit" class="w-full px-6 pt-20 pb-20 scroll-mt-16">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center text-balance">
          Every layer of your UNS, <span class="text-indigo-600">in one platform</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">
          Each of those problems lives at a different layer. FlowFuse answers every one, so you build your whole UNS in
          one place instead of stitching together a separate tool for each layer.
        </p>

        <div class="mt-20 md:max-w-screen-lg mx-auto">
          <div
              v-for="(row, i) in TOOLKIT"
              :id="rowId(row.eyebrow)"
              :key="row.eyebrow"
              class="flex flex-col md:flex-row gap-8 items-center mb-14 md:mb-20 last:mb-0 scroll-mt-28"
              :class="{ 'md:flex-row-reverse': i % 2 === 1 }"
          >
            <div class="w-full max-w-[500px] md:max-w-none md:w-[45%] max-md:mt-5">
              <!-- Screenshots and clips keep the frame's fixed shape; a video is 16:9, as on the MES page. -->
              <div class="relative" :class="row.image.youtube ? 'aspect-video' : 'aspect-[430/289]'">
                <div
                    class="absolute -top-5 w-full h-full rounded-lg bg-gradient-to-tl"
                    :class="[FRAME_VARIANTS[i % 2]!.backdrop, i % 2 === 0 ? '-left-5' : '-right-5']"
                    aria-hidden="true"
                />
                <div class="absolute inset-0 rounded-lg border-2 overflow-hidden bg-white" :class="FRAME_VARIANTS[i % 2]!.border">
                  <LiteYoutube
                      v-if="row.image.youtube"
                      :videoid="row.image.youtube"
                      :title="row.image.alt"
                      :poster="row.image.src"
                      class="!h-full !max-w-none"
                  />
                  <template v-else>
                    <video
                        v-if="row.image.video"
                        ref="clips"
                        :src="row.image.video"
                        :poster="row.image.poster ?? row.image.src"
                        :aria-label="row.image.alt"
                        muted
                        loop
                        playsinline
                        preload="none"
                        class="motion-reduce:hidden w-full h-full object-cover object-top"
                    />
                    <img
                        :src="row.image.src"
                        :alt="row.image.alt"
                        loading="lazy"
                        class="w-full h-full object-cover object-top"
                        :class="{ 'motion-safe:hidden': row.image.video }"
                    >
                  </template>
                </div>
              </div>
            </div>
            <div class="md:w-[55%] flex flex-col gap-3 max-md:text-center">
              <p class="m-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">{{ row.eyebrow }}</p>
              <h3 class="m-0 text-3xl font-medium text-gray-700 text-balance">{{ row.title }}</h3>
              <p class="m-0 text-gray-500">{{ row.description }}</p>
              <ul class="mt-2 mb-0 p-0 list-none flex flex-col gap-2.5 max-md:text-left">
                <li v-for="point in row.points" :key="point" class="m-0 flex items-start gap-2.5 text-gray-600">
                  <UIcon name="i-lucide-check" class="w-5 h-5 mt-0.5 shrink-0 text-indigo-600" />
                  <span>{{ point }}</span>
                </li>
              </ul>
              <NuxtLink :to="row.link.to" class="mt-2 flex items-center gap-1.5 text-blue-600 hover:underline max-md:justify-center">
                {{ row.link.label }}
                <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ENTERPRISE: the industry pages' block, as it is -->
    <EnterpriseSecurity
        heading="Built to pass IT review <span class=&quot;text-indigo-600&quot;>at every plant</span>"
        description="Rolling your UNS out to every plant means IT has to approve each one. FlowFuse is SOC 2 Type I and Type II certified, with single sign-on, role-based access, audit logs, and self-hosted or air-gapped options for sites that can't use the cloud."
    />

    <!-- NEVER ALONE: the support section from the /teams pages -->
    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center">
          You're never alone, <span class="text-indigo-600">and never locked in</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">
          Software is only half of a UNS rollout. We become part of your team from the first plant, and stay long after the last one goes live.
        </p>
        <ul class="mt-12 mb-0 p-0 list-none grid md:grid-cols-3 gap-6">
          <li v-for="item in SUPPORT" :key="item.title" class="m-0 rounded-xl bg-white border border-indigo-100 p-7 flex flex-col gap-3">
            <span class="w-11 h-11 rounded-lg bg-indigo-600 inline-flex items-center justify-center">
              <UIcon :name="item.icon" class="w-5 h-5 text-white" />
            </span>
            <h3 class="mt-2 mb-0 text-xl font-medium text-gray-800">{{ item.title }}</h3>
            <p class="m-0 text-gray-600">
              <template v-for="(part, i) in item.parts" :key="i">
                <NuxtLink v-if="part.href" :to="part.href" class="text-indigo-600 hover:underline">{{ part.text }}</NuxtLink><template v-else>{{ part.text }}</template>
              </template>
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- IT AND OT QUOTES: the MES and SCADA pages' quote carousel -->
    <section class="w-full px-6 py-20 bg-gray-50">
      <div class="max-w-screen-lg mx-auto grid lg:grid-cols-[1fr_590px] gap-10 lg:gap-16 items-center">
        <div class="max-lg:text-center">
          <p class="m-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">From IT and OT teams</p>
          <h2 class="mt-2">What customers say about FlowFuse</h2>
          <p class="mt-4 mb-0 text-gray-600">
            A UNS succeeds when OT gets every machine connected and IT can govern it at scale. Here's how both teams
          describe taking FlowFuse from one site to many.
        </p>
          <NuxtLink to="/customer-stories/" class="mt-6 inline-flex items-center gap-1.5 text-blue-600 hover:underline">
            Read customer stories
            <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
          </NuxtLink>
        </div>
        <div
            class="relative rounded-lg border border-indigo-200 bg-indigo-50/50 overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Quotes from IT and OT teams"
            @mouseenter="quotePaused = true"
            @mouseleave="quotePaused = false"
            @focusin="quotePaused = true"
            @focusout="quotePaused = false"
        >
          <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="absolute right-7 top-7 w-9 h-9 text-indigo-200" aria-hidden="true" />
          <div class="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none" :style="{ transform: `translateX(-${currentQuote * 100}%)` }">
            <figure
                v-for="(q, i) in QUOTES"
                :key="q.name"
                class="m-0 w-full shrink-0 flex flex-col p-7"
                :aria-hidden="i !== currentQuote"
                :inert="i !== currentQuote || undefined"
            >
              <blockquote class="m-0 pr-12 flex-1 text-lg leading-relaxed italic font-medium text-gray-700">
                &ldquo;{{ q.text }}&rdquo;
              </blockquote>
              <figcaption class="mt-6 pt-5 border-t border-indigo-100 flex items-start justify-between gap-4">
                <div>
                  <p class="m-0 text-sm font-semibold text-gray-700">{{ q.name }}</p>
                  <p class="m-0 text-sm text-gray-500">{{ q.role }}</p>
                </div>
                <span class="shrink-0 rounded-full border border-indigo-200 bg-white px-2.5 py-0.5 text-xs font-medium text-indigo-600">{{ q.team }}</span>
              </figcaption>
            </figure>
          </div>
          <div class="flex items-center justify-between gap-4 px-7 pb-6">
            <div class="flex items-center gap-1.5">
              <button
                  v-for="(q, i) in QUOTES"
                  :key="q.name"
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

    <!-- READING -->
    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center">
          Unified Namespace <span class="text-indigo-600">resources</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">
          Guides and deep dives on building a UNS, from structuring topics to choosing a broker.
        </p>
        <ul class="mt-12 mb-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <li v-for="article in READING" :key="article.url" class="m-0">
            <NuxtLink :to="article.url" class="group h-full hover:no-underline rounded-lg border border-gray-200 bg-white overflow-hidden flex flex-col hover:border-indigo-300 hover:shadow-sm transition-all">
              <div class="aspect-[16/9] bg-gray-50 overflow-hidden">
                <img :src="article.image" :alt="article.alt" loading="lazy" class="w-full h-full object-cover">
              </div>
              <p class="m-0 p-5 text-gray-700 font-medium leading-snug group-hover:text-indigo-600 transition-colors">{{ article.title }}</p>
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink to="/blog/uns/" class="mt-10 inline-flex items-center gap-1.5 text-blue-600 hover:underline">
          Read all UNS articles
          <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
        </NuxtLink>
      </div>
    </section>

    <!-- FAQ -->
    <section class="w-full px-6 pt-10 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">Unified Namespace and FlowFuse: <span class="text-indigo-600">FAQs</span></h2>
        <Faq :faq="FAQ" />
      </div>
    </section>

    <!-- CLOSING CTA: start with the hardest line, then every site -->
    <section class="w-full px-6 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <h2 class="m-0 text-white text-3xl md:text-5xl font-medium">Start with the line that's hardest to connect</h2>
          <p class="m-0 text-indigo-50 font-light text-xl max-w-2xl">
            Tell us what equipment it runs. We'll show you its data in your namespace, named and in context, and how
            the same setup reaches every other site.
          </p>
          <div class="flex gap-4 items-center justify-center flex-wrap">
            <CtaBookDemo variant="highlight" position="final-cta" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.uns-gradient {
    background: linear-gradient(100deg, var(--color-indigo-50) 0%, white 50%, color-mix(in oklab, var(--color-red-50) 70%, white) 100%);
}
</style>
