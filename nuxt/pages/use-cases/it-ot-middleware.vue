<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'

// IT/OT middleware: FlowFuse as the one integration layer between the plant and the business
// systems. Written for the people who fund and approve integration work (operations, IT and
// digital leaders), so each section leads with what the layer costs or saves the business and
// follows with how FlowFuse does it. The layout is the /use-cases/uns/ page's (gradient hero,
// logo strip, gray challenges band, alternating capability rows, security, support, quotes,
// reading, FAQ, closing CTA), so the two read as one family. UNS is the architecture; this
// page is the integration layer that moves data both ways today, and links there as the next
// step.
//
// Copy rule for the capability rows: the lead sentence is the business outcome, and each
// bullet is a short result the reader gets, not a feature list.

const META_TITLE = 'IT/OT Middleware: Connect Plant Systems to ERP, MES and Cloud | FlowFuse'
const META_DESCRIPTION = 'Connect your plants to ERP, MES and the cloud in both directions, on one platform IT governs and OT runs. Fewer systems, faster rollouts, every plant run the same way.'

// Kept to one shape so they line up:
// a short title (one line) and a detail of about fifteen words.
const CHALLENGES = [
    { title: 'Every link is a project', detail: 'Each new pairing of system and machine needs its own build, its own budget and its own owner.' },
    { title: 'Integrations nobody owns', detail: 'Scripts and gateways written years ago still run production, and the people who wrote them have moved on.' },
    { title: 'A vendor for every connection', detail: 'Each protocol and each system brings its own tool, licence and support contract to manage.' },
    { title: 'IT and OT work apart', detail: 'IT can\'t see what runs at the plant, and the plant can\'t wait in IT\'s queue.' },
    { title: 'Security reviews stall the rollout', detail: 'Connecting the plant network to business systems is where most integration projects lose months.' },
    { title: 'Data only flows one way', detail: 'Reports come out of the plant, but orders and recipes still go back in by hand.' },
]

// Capability row ids, from the eyebrow: 'Faster Rollouts' -> 'faster-rollouts'.
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
    // `animation` draws a built-in looping scene in place of a screenshot or clip.
    image: { src: string, alt: string, video?: string, poster?: string, youtube?: string, animation?: 'connections' | 'data-model' }
}

const TOOLKIT: ToolkitRow[] = [
    {
        eyebrow: 'Connected Operations',
        title: 'Every machine and system, connected both ways',
        description: 'Connect each system once, and data moves both ways: decisions reach the line, results reach the business.',
        points: [
            'PLCs, SCADA and historians reach ERP, MES and the cloud, older equipment included',
            'Orders and recipes reach the line, and counts, scrap and downtime reach the business',
            'Data waits at the edge when a link drops, and sends once it returns',
        ],
        image: { src: '/images/use-cases/mes/flow-editor.webp', alt: 'Plant protocols and business systems each connecting once to FlowFuse, with decisions flowing down to the line and results flowing up to the business', animation: 'connections' },
        link: { to: '/integrations/', label: 'Explore industrial integrations' },
    },
    {
        eyebrow: 'Standardized Data',
        title: 'One data model at every plant',
        description: 'A raw register means nothing to a business system. Data arrives named, in context and the same from every site.',
        points: [
            'Whatever format a device sends, each value arrives named, with its unit and place in the plant',
            'All sites report the same way, so plants compare like for like',
            'Business systems receive what they need, not every raw reading',
        ],
        image: { src: '/images/use-cases/uns/add-context.webp', alt: 'Data in many formats passing through FlowFuse into one named data model', animation: 'data-model' },
        link: { to: '/use-cases/data-integration/', label: 'Explore data integration' },
    },
    {
        eyebrow: 'Real-Time Visibility',
        title: 'The apps your business systems can\'t provide',
        description: 'ERP and MES were never built for the floor. With FlowFuse Dashboard, your team builds the apps that fill those gaps.',
        points: [
            'Operators get screens made for their line, machine and shift',
            'Supervisors, maintenance and plant leaders see their area live',
            'New apps follow your priorities, not a vendor\'s roadmap',
        ],
        image: { src: '/images/teams/manufacturing-all-plants-dashboard.webp', alt: 'FlowFuse Dashboard comparing five plants: company OEE, availability, performance and quality gauges, a seven-day OEE trend per plant against the 85% target, and a table of each plant\'s figures', video: '/images/teams/clips/manufacturing-all-plants-dashboard.mp4' },
        link: { to: '/platform/dashboard/', label: 'Explore FlowFuse Dashboard' },
    },
    {
        eyebrow: 'Device Management',
        title: 'Run at the edge, manage every plant from one place',
        description: 'A small central team can look after every site, however many you add.',
        points: [
            'The health and version of every device, at every plant, in one view',
            'Fixes and updates go out remotely, with no trip to site',
            'Devices are managed in groups by plant, line or region',
        ],
        image: { src: '/images/use-cases/mes/platform-home.webp', alt: 'The FlowFuse home screen: 76 hosted and 40 remote instances running across plants, from packaging line monitoring and OEE dashboards to plant edge gateways', video: '/images/teams/clips/platform-home.mp4' },
        link: { to: '/use-cases/remote-device-management/', label: 'Explore remote device management' },
    },
    {
        eyebrow: 'Faster Rollouts',
        title: 'Prove it once, roll it out everywhere',
        description: 'Each new plant becomes a deployment, not another integration project.',
        points: [
            'Every change is tested in staging before it reaches production',
            'One proven integration deploys to every plant, each with its own settings',
            'A bad change rolls back in one click',
        ],
        image: { src: '/images/teams/pipelines-plants.webp', alt: 'FlowFuse DevOps pipeline pushing Development to Staging, then Staging to Production, where every device in the America group moves to the new snapshot', video: '/images/teams/clips/pipelines-plants.mp4' },
        link: { to: '/platform/device-agent/', label: 'Explore the FlowFuse Device Agent' },
    },
]

// Approved customer quotes, word for word (from the customer quotes tracker, or already published
// on flowfuse.com), as IT and OT pairs: the IT voice on the left, the OT voice on the right, and
// the pair rotates together.
type Quote = { text: string, name: string, role: string }
const QUOTES: Array<{ it: Quote, ot: Quote }> = [
    {
        it: { text: 'FlowFuse is like a Swiss Army knife that I can drive most of our IT systems from, versus having 10 different vendor relationships, 10 different point solutions, and then having to build practices around all that.', name: 'Chris Meyer', role: 'IT Director, Wilson Tool International' },
        ot: { text: 'I built out the FlowFuse deployment from scratch: machine monitoring, machine dashboards, ERP integration. What FlowFuse gave us was revision control and a platform the whole team could own. That made the deployment self-sustaining.', name: 'Lidiya Shutaya', role: 'OT Architecture & Standardization, formerly with Penn Engineering' },
    },
    {
        it: { text: 'We started using Node-RED at the plant level, but FlowFuse is what turned it into an enterprise-grade solution. Everything runs centrally from corporate IT, across multiple plants, with the dev and production pipelines and controls our organization requires.', name: 'James Wise', role: 'Sr. Product Owner, Milliken & Company' },
        ot: { text: 'We had expensive equipment sitting idle for 8 to 12 hours a day, capital doing nothing. Now those same machines run production validation during the day and automatically switch to reliability stress testing at night. With FlowFuse, we have 1 connected station to update every controller, instantly.', name: 'Rhythm Agarwal', role: 'Sr. Manufacturing Engineer, Aperia Technologies' },
    },
    {
        it: { text: 'FlowFuse removes most of our concerns about scalability and reliability. It\'s also making it a lot easier for us to complete security audits for our customers. FlowFuse\'s stack is open, widely used and well documented, which gives auditors confidence in our applications built on your platform.', name: 'Alan Yeung', role: 'CTO, Power Workplace' },
        ot: { text: 'Once we settled on using Node-RED, we knew we needed a solution to help us manage our edge devices as well as our central control system. FlowFuse has helped us take our Node-RED from proof-of-concept through to a reliable, scalable solution for the future.', name: 'Robert VanHofwegen', role: 'District Manager, Paloma Irrigation and Drainage District' },
    },
]

// Results from published customer stories (the figures the /teams, /ai and /node-red/ pages use),
// each caption written to continue its number as one phrase ("100+ manufacturing databases...").
const PROOF = [
    { logo: { src: '/images/home-logos/walter-logo.svg', alt: 'Walter', height: 'h-9' }, number: '5 → 1', text: 'machine-connectivity systems, consolidated into one platform', href: '/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/', label: 'Read the Walter story' },
    { logo: { src: '/images/stories/logos/aperia-technologies.png', alt: 'Aperia Technologies', height: 'h-7' }, number: 'Minutes', text: 'to roll a new spec out to 15 controllers, once done station by station', href: '/customer-stories/aperia-technologies-plc-replacement/', label: 'Read the Aperia story' },
    { logo: { src: '/images/home-logos/arch-systems-logo.png', alt: 'Arch Systems', height: 'h-7' }, number: '100+', text: 'manufacturing databases feeding MES from a single integration', href: '/customer-stories/scaling-manufacturing-automation-with-flowfuse/', label: 'Read the Arch story' },
    { logo: { src: '/images/home-logos/energinet-logo.png', alt: 'Energinet', height: 'h-8' }, number: '7,000 km', text: 'of power grid connected, from SCADA systems to IoT sensors', href: '/customer-stories/energinet-streamlining-critical-infrastructure-data-management/', label: 'Read the Energinet story' },
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

// Partnership: three steps from the first plant to full ownership, so a leader sees how long the
// program depends on us (not long) and what they keep (everything). One short line each.
const SUPPORT = [
    { phase: 'First plant', title: 'We get it live together', text: 'FlowFuse engineers work with your team to put the first integrations into production.' },
    { phase: 'Every plant', title: 'Your team rolls it out', text: 'Your engineers take it to the next sites, with our support when they need it.' },
    { phase: 'Ongoing', title: 'It stays yours', text: 'Built on open-source Node-RED, so your team can run it without us.' },
]

// Leadership questions first, then the technical ones they hand to their team.
const FAQ = [
    {
        question: 'Does FlowFuse replace our MES or ERP?',
        answer: 'No. MES and ERP keep their roles. FlowFuse connects them to the plant floor and to each other, so your roadmap gains a common integration layer instead of another multi-year rollout.',
    },
    {
        question: 'How is this different from a traditional integration platform?',
        answer: 'Enterprise integration platforms are built for business systems. FlowFuse is built for the plant: it speaks [industrial protocols](/integrations/) natively, runs at the edge beside the machines, and is maintained by engineers who already know [Node-RED](/node-red/). It connects to your enterprise integration platform rather than competing with it.',
    },
    {
        question: 'Will IT and security approve it?',
        answer: 'It\'s built for their review. Run it in the cloud, on your own servers or fully air-gapped. Plants connect outward, with no inbound ports to open. Single sign-on, role-based access and audit logging cover the controls IEC 62443 and NIS2 assessments look for, and FlowFuse is SOC 2 Type I and Type II certified. See [FlowFuse security](/platform/security/).',
    },
    {
        question: 'What happens to production if the link to ERP or the cloud drops?',
        answer: 'Production keeps running. Integrations run on [edge devices](/platform/device-agent/) beside the machines, not in the cloud, so a lost connection doesn\'t stop them. Flows can hold data locally and send it on when the link returns.',
    },
    {
        question: 'How do we control what gets written back to equipment?',
        answer: 'Nothing reaches a machine except through a flow your team built and approved. Role-based access decides who can deploy those flows and to which sites, every change is tested in staging before it reaches production, and the audit log records who deployed what, and when.',
    },
    {
        question: 'Do we need to stop production to implement it?',
        answer: 'No. Most teams start with read-only connections alongside the systems already running, then add write-back to the line during a planned maintenance window.',
    },
    {
        question: 'We have mixed vendors, legacy equipment and existing OPC servers. Will it work?',
        answer: 'Yes. FlowFuse connects Siemens, Rockwell, Schneider, Omron and other equipment directly over OPC UA, Modbus, Siemens S7 and EtherNet/IP, or reads from the OPC servers and gateways you already run, so you can consolidate on your own schedule. Older equipment connects through serial converters, with no change to PLC logic.',
    },
    {
        question: 'Do we need a Unified Namespace?',
        answer: 'No. FlowFuse connects systems directly from day one. When you\'re ready, the same platform runs a Unified Namespace on its built-in MQTT broker. See [Unified Namespace](/use-cases/uns/).',
    },
]

const FRAME_VARIANTS = [
    { backdrop: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300' },
    { backdrop: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100' },
]

function pad(n: number) {
    return String(n).padStart(2, '0')
}

// Row clips play only while on screen, and not at all with reduced motion (the still
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
    ogImage: 'https://flowfuse.com/images/use-cases/it-ot-middleware/it-ot-hero.webp',
    ogUrl: 'https://flowfuse.com/use-cases/it-ot-middleware/',
    keywords: 'IT/OT integration, IT/OT middleware, IT/OT convergence, industrial integration, PLC to ERP, SAP integration, MES integration, OPC UA, Modbus, Siemens S7, EtherNet/IP, Node-RED, FlowFuse',
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
    <section class="itot-gradient w-full px-6 pt-16 md:pt-20 pb-20">
      <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="max-md:text-center">
          <p class="mt-0 mb-4 text-sm font-semibold uppercase tracking-wide text-indigo-600">IT/OT Middleware</p>
          <h1 class="m-0 text-4xl lg:text-[2.75rem] lg:leading-tight font-medium">
            Connect the plant
            <span class="block text-red-600 text-balance">to the business, and back again</span>
          </h1>
          <p class="mt-6 mb-0 text-gray-700">
            Your business systems know what should be made. Your machines know what is being made. FlowFuse keeps the two
            in step, in both directions, at every plant, on one platform IT governs and OT runs.
          </p>
          <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
            <CtaBookDemo variant="highlight" position="hero" />
            <CtaSignUp variant="ghost" position="hero" icon="i-lucide-arrow-right" />
          </div>
        </div>
        <img
            src="/images/use-cases/it-ot-middleware/it-ot-hero.webp"
            alt="Diagram: IT business systems (ERP, MES, CMMS and analytics) above and the OT factory floor (PLCs, SCADA, historians and machines) below, each side joined to FlowFuse in the middle by one two-way connection. Decisions flow down to the factory floor, and operational data flows up to the business."
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
    <section class="w-full px-6 py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center">
          Where IT/OT integration <span class="text-indigo-600">breaks down</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">
          Most manufacturers already connect the plant to the business. The cost is in how it was done, and it usually
          shows up in the same six places.
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

    <!-- CAPABILITIES: what the integration layer gives the business -->
    <section id="capabilities" class="w-full px-6 pt-20 pb-20 scroll-mt-16">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center text-balance">
          What FlowFuse <span class="text-indigo-600">gives your business</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">
          Replace the gateways, scripts and point tools between your plants and your business with one platform. Fewer
          systems to maintain, faster rollouts, and every plant run the same way.
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
                  <ItOtConnectionsClip v-if="row.image.animation === 'connections'" />
                  <ItOtDataModelClip v-else-if="row.image.animation === 'data-model'" />
                  <LiteYoutube
                      v-else-if="row.image.youtube"
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
        heading="Enterprise-grade security, <span class=&quot;text-indigo-600&quot;>without opening your network</span>"
        description="Plants connect outward, so the OT network stays segmented and no inbound firewall ports are opened. FlowFuse is SOC 2 Type I and Type II certified, with single sign-on, role-based access and audit logs, and runs self-hosted or air-gapped where the cloud isn't an option."
    />

    <!-- PROOF: four results from published customer stories, in one row -->
    <section class="w-full px-6 py-20 bg-gradient-to-b from-indigo-50/60 to-white">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-md:text-center text-balance">What manufacturers have achieved <span class="text-indigo-600">with FlowFuse</span></h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">
          Published results from teams running their IT/OT integration on FlowFuse.
        </p>
        <ul class="mt-12 mb-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-gray-200 bg-white divide-gray-200 max-sm:divide-y sm:max-lg:[&>li:nth-child(n+3)]:border-t lg:divide-x sm:max-lg:[&>li:nth-child(even)]:border-l">
          <li v-for="c in PROOF" :key="c.logo.alt" class="m-0 flex flex-col p-7 border-gray-200">
            <div class="h-9 flex items-center">
              <img :src="c.logo.src" :alt="c.logo.alt" class="w-auto max-w-[9rem] object-contain object-left" :class="c.logo.height" loading="lazy">
            </div>
            <p class="mt-5 mb-0 text-4xl font-medium text-indigo-600">{{ c.number }}</p>
            <p class="mt-2 mb-0 text-sm leading-snug text-gray-700">{{ c.text }}</p>
            <NuxtLink :to="c.href" class="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
              {{ c.label }}
              <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5 shrink-0" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- IT AND OT QUOTES: an IT voice and an OT voice side by side, split by a center line,
         rotating as a pair. Kept plain on purpose: two quotes, two names, nothing boxed. -->
    <section class="w-full px-6 py-20">
      <div
          class="max-w-screen-lg mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label="Quotes from IT and OT teams"
          @mouseenter="quotePaused = true"
          @mouseleave="quotePaused = false"
          @focusin="quotePaused = true"
          @focusout="quotePaused = false"
      >
        <div class="flex items-end justify-between gap-6 max-md:flex-col max-md:items-center">
          <div class="max-md:text-center">
            <h2 class="m-0">Why IT and OT teams <span class="text-indigo-600">choose FlowFuse</span></h2>
            <p class="mt-4 mb-0 text-gray-600">In their own words, from both sides of the plant.</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button type="button" class="w-10 h-10 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer" aria-label="Previous quotes" @click="showQuote(currentQuote - 1)">
              <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
            </button>
            <button type="button" class="w-10 h-10 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer" aria-label="Next quotes" @click="showQuote(currentQuote + 1)">
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="mt-12 grid md:grid-cols-2 border-y border-gray-200 md:divide-x max-md:divide-y divide-gray-200">
          <figure v-for="side in (['it', 'ot'] as const)" :key="side" class="relative m-0 py-12 flex flex-col overflow-hidden" :class="side === 'it' ? 'md:pr-12' : 'md:pl-12'">
            <!-- Large, faint IT / OT behind the quote, so each side reads at a glance -->
            <span
                class="pointer-events-none select-none absolute top-4 right-0 text-[12rem] leading-none font-bold tracking-tight"
                :class="[side === 'it' ? 'text-indigo-600/[0.12]' : 'text-slate-700/[0.12]', side === 'it' ? 'md:right-12' : 'right-3']"
                aria-hidden="true"
            >{{ side.toUpperCase() }}</span>
            <Transition name="quote-fade" mode="out-in">
              <div :key="currentQuote" class="relative flex-1 flex flex-col">
                <blockquote class="m-0 flex-1 text-xl leading-relaxed text-gray-800">
                  &ldquo;{{ QUOTES[currentQuote]![side].text }}&rdquo;
                </blockquote>
                <figcaption class="mt-8">
                  <span class="block text-sm font-semibold text-gray-800">{{ QUOTES[currentQuote]![side].name }}</span>
                  <span class="block text-sm text-gray-500">{{ QUOTES[currentQuote]![side].role }}</span>
                </figcaption>
              </div>
            </Transition>
          </figure>
        </div>

        <div class="mt-6 flex items-center justify-between gap-4">
          <div class="flex items-center gap-1.5">
            <button
                v-for="(q, i) in QUOTES"
                :key="q.it.name + q.ot.name"
                type="button"
                class="h-1.5 rounded-full transition-all cursor-pointer"
                :class="i === currentQuote ? 'w-6 bg-indigo-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'"
                :aria-label="`Show quotes ${i + 1}`"
                :aria-current="i === currentQuote"
                @click="showQuote(i)"
            />
          </div>
          <NuxtLink to="/customer-stories/" class="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
            Read customer stories
            <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5 shrink-0" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- PARTNERSHIP: the case on the left, three numbered steps on the right, in the layout of the
         /node-red/ page's "Who FlowFuse is for" section -->
    <section class="w-full px-6 py-20 md:py-24">
      <div class="max-w-screen-lg mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
        <div class="lg:sticky lg:top-28 self-start max-lg:text-center">
          <p class="m-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">How we work with you</p>
          <h2 class="mt-2 mb-0 text-balance">
            Support from the first plant <span class="text-indigo-600">to every plant after</span>
          </h2>
          <p class="mt-4 mb-0 text-lg text-gray-600">
            We help you get the first plant live, then your team takes it from there.
          </p>
          <NuxtLink to="/professional-services/" class="mt-6 inline-flex items-center gap-1.5 text-blue-600 hover:underline">
            See how we work with your team
            <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
          </NuxtLink>
        </div>
        <ol class="m-0 p-0 list-none">
          <li v-for="(item, i) in SUPPORT" :key="item.title" class="m-0 grid grid-cols-[3.5rem_1fr] gap-2 py-7 border-b border-gray-200 first:border-t">
            <span class="text-3xl font-medium tabular-nums text-indigo-300 leading-none pt-1">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <p class="m-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">{{ item.phase }}</p>
              <h3 class="mt-1.5 mb-0 text-xl font-medium text-gray-800">{{ item.title }}</h3>
              <p class="mt-2 mb-0 text-gray-600">{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- FAQ -->
    <section class="w-full px-6 pb-10">
      <div class="max-w-screen-lg mx-auto pt-20 border-t border-gray-100">
        <h2 class="mb-1 text-center md:text-left">IT/OT integration with FlowFuse: <span class="text-indigo-600">FAQs</span></h2>
        <Faq :faq="FAQ" />
      </div>
    </section>

    <!-- CLOSING CTA: one integration, one plant, then every site -->
    <section class="w-full px-6 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <h2 class="m-0 text-white text-3xl md:text-5xl font-medium">Pick one integration and one plant</h2>
          <p class="m-0 text-indigo-50 font-light text-xl max-w-2xl">
            Start with the integration that costs your business the most today. We'll show you how it runs on FlowFuse,
            and how it reaches every other site.
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
.quote-fade-enter-active,
.quote-fade-leave-active {
    transition: opacity 300ms ease;
}
.quote-fade-enter-from,
.quote-fade-leave-to {
    opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
    .quote-fade-enter-active,
    .quote-fade-leave-active {
        transition: none;
    }
}

.itot-gradient {
    background: linear-gradient(100deg, var(--color-indigo-50) 0%, white 50%, color-mix(in oklab, var(--color-red-50) 70%, white) 100%);
}
</style>
