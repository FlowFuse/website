<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'
// The first of the solution pages: one operational problem, solved with FlowFuse and built
// with the customer (the Foundation Partnership: Define, Design, Deliver). Hand-written
// rather than a useCases entry because its blocks (video hero, walkthrough with a step
// outline, the foundation graphic) are not ones the [slug].vue layout has.
//
// Search targets: predictive maintenance, predictive monitoring, condition-based
// monitoring. Copy rules: FlowFuse finds wear early from condition data; it does not
// claim to predict failure dates or remaining life, and quotes no outcome numbers. The
// demo plant is never described as simulated, and no customer is named until approved.
//
// Layout follows the industry pages: full-bleed bands, content at max-w-screen-lg. The
// photography is stills from the solution film's b-roll, and the indigo plate behind the
// product shots is the one the films use, so page and film read as one piece.
//
// Both films live in public/images/use-cases/predictive-maintenance/ like the AI page's
// demo, as WebM with an MP4 fallback.
const ASSETS = '/images/use-cases/predictive-maintenance'

const HIGHLIGHTS = [
    { icon: 'i-lucide-list-ordered', text: 'Every asset ranked by real risk' },
    { icon: 'i-lucide-activity', text: 'Bearing wear caught, not just shaking' },
    { icon: 'i-lucide-clipboard-check', text: 'Maintenance gets the evidence' },
]

const PAINS = [
    { icon: 'i-lucide-siren', title: 'Alarms on the wrong asset', description: 'The pump that shakes the most gets flagged, while the one that is wearing out reads normal.' },
    { icon: 'i-lucide-circle-help', title: 'No reason given', description: 'An alarm says a limit was crossed. It does not say why, or whether the plan explains it.' },
    { icon: 'i-lucide-layers', title: 'Evidence scattered across systems', description: 'Vibration data, the production plan and the maintenance system each hold part of the story.' },
]

// What the alarm shows, against what is really happening (the film's story, as a graphic).
const ALARM_ROWS = [
    { asset: 'CP-107', state: 'Vibration high', alarm: true },
    { asset: 'CP-104', state: 'Normal', alarm: false },
    { asset: 'CP-101', state: 'Normal', alarm: false },
]

const CAPABILITIES = [
    {
        image: `${ASSETS}/ranked-answer.jpg`,
        alt: 'FlowFuse AI ranking the pumps that need attention, with CP-104 first because its bearing defect band rose more than fourfold in seven days',
        kicker: 'Find',
        title: 'Ranks equipment by what really needs attention',
        description: 'Ask which assets need attention this week. FlowFuse AI checks every wear trend against the production plan and explains its ranking in plain language.',
        points: ['Reads condition data across every asset', 'Separates real wear from planned slowdowns'],
    },
    {
        image: `${ASSETS}/new-rule.jpg`,
        alt: 'The updated health rules: an asset now needs attention when its bearing defect band is above 0.2 g or its kurtosis is above 4.5',
        kicker: 'Fix',
        title: 'Updates the alarm rules so wear is caught early',
        description: 'FlowFuse AI teaches the alarm to watch bearing wear, not just overall shaking. A person on your team approves the change before it goes live.',
        points: ['Every change reviewed and recorded', 'Roll back with one click'],
    },
    {
        image: `${ASSETS}/work-request.jpg`,
        alt: 'A work request raised for CP-104, titled Inspect CP-104 bearings, awaiting approval',
        kicker: 'Act',
        title: 'Raises the work request with the evidence',
        description: 'Maintenance gets the asset, the trend and the reason in one request, so the bearing is changed on schedule, not in a breakdown.',
        points: ['Lands in your maintenance system', 'The trend travels with the request'],
    },
]

const PARTNERSHIP = [
    { step: 'Define', description: 'Our engineers and your team pick one real operational problem, agree what success looks like, and map the equipment and data behind it.' },
    { step: 'Design', description: 'Together we design the solution on a reusable foundation (connections, data model, governance and AI agents) and build it into your environment.' },
    { step: 'Deliver', description: 'It goes into production on your equipment. Your team is trained alongside ours, so you own it and can extend it yourselves.' },
]

// Where each step starts in the walkthrough film, in seconds (from the cut list in
// solution-sim/film/corrow_walk).
const STEPS = [
    { at: 26, label: 'Step 1', title: 'The vibration alarm flags one pump', description: 'The pump that shakes most is flagged. Every other pump looks fine.' },
    { at: 37, label: 'Step 2', title: 'Ask FlowFuse AI which pumps really need attention', description: 'It checks every pump\'s wear trend and the production plan, and finds the bearing that has been wearing for nine days.' },
    { at: 83, label: 'Step 3', title: 'FlowFuse AI teaches the alarm to spot bearing wear', description: 'It updates the health rules, and the change is reviewed and deployed.' },
    { at: 125, label: 'Step 4', title: 'Send maintenance the evidence', description: 'A work request with the wear trend, raised before the bearing fails.' },
]

const FOUNDATION = [
    { icon: 'i-lucide-cable', text: 'Connected equipment and sensors' },
    { icon: 'i-lucide-database', text: 'A shared data model for every asset' },
    { icon: 'i-lucide-shield-check', text: 'Approvals and change control' },
    { icon: 'i-lucide-sparkles', text: 'FlowFuse AI on your own data' },
    { icon: 'i-lucide-factory', text: 'Deployment to every site' },
]

const NEXT = [
    { icon: 'i-lucide-zap', title: 'Energy use per asset', description: 'The same connections, now measuring what each machine costs to run.' },
    { icon: 'i-lucide-package', title: 'Spare-parts planning', description: 'Wear trends that tell stores which bearings to have on the shelf.' },
    { icon: 'i-lucide-clipboard-list', title: 'Automated work orders', description: 'Requests that land in your maintenance system with the evidence attached.' },
    { icon: 'i-lucide-fan', title: 'Fans, compressors and more', description: 'The same monitoring rolled out to every rotating asset, not just pumps.' },
]

// Swap in the sibling solution pages as they go live.
const RELATED = [
    { to: '/use-cases/production-monitoring/', title: 'Production Monitoring', problem: 'Real-time visibility into what your production lines are actually doing.' },
    { to: '/use-cases/remote-device-management/', title: 'Remote Device Management', problem: 'Manage and update the devices on every site from one place.' },
    { to: '/use-cases/uns/', title: 'Unified Namespace', problem: 'One shared structure for your operational data, across every plant.' },
]

const FAQ = [
    {
        question: 'What is the difference between condition-based monitoring and predictive maintenance?',
        answer: 'Condition-based monitoring watches the real condition of your equipment, such as vibration, temperature and bearing wear, and acts when it changes. Predictive maintenance uses those same signals and their trends to plan work before a failure. Condition-based monitoring is the foundation: without trustworthy condition data, there is nothing to predict from.',
    },
    {
        question: 'What is predictive monitoring?',
        answer: 'Predictive monitoring means watching the trend, not just the current reading. A bearing can stay inside its vibration limit while its wear signal climbs for days. FlowFuse tracks those trends across every asset and raises the ones that are getting worse, with the reason.',
    },
    {
        question: 'Do we need new sensors or a new maintenance system?',
        answer: 'Usually not. FlowFuse connects to the vibration sensors, PLCs, historians and maintenance systems you already run, and brings their data together. Where a gap does need new hardware, we plan it with you in the Define stage.',
    },
    {
        question: 'Does the AI change our systems on its own?',
        answer: 'No. FlowFuse AI proposes the change and explains it, and a person on your team approves it before it is deployed. Every change is recorded, so you can see who approved what and roll it back.',
    },
    {
        question: 'How do we get started?',
        answer: 'Start with one problem on one line. We define it with your team, design the solution on a foundation you can reuse, and deliver it into production. [Talk to us](cta:bookDemo) about your first solution.',
    },
]

const TITLE = 'Predictive Maintenance & Condition-Based Monitoring'
const DESCRIPTION = 'Find the failing bearing a vibration alarm misses. FlowFuse brings condition-based monitoring and AI together to rank what really needs attention, catch wear early and send maintenance the evidence.'

useSeoMeta({
    title: `${TITLE} | FlowFuse`,
    description: DESCRIPTION,
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogImage: `https://flowfuse.com${ASSETS}/og.jpg`,
    ogUrl: 'https://flowfuse.com/use-cases/predictive-maintenance/',
    keywords: 'predictive maintenance, predictive monitoring, condition based monitoring, condition-based monitoring, predictive maintenance and condition based monitoring, vibration monitoring, bearing wear, FlowFuse',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
    defineVideo({
        name: 'Finding the real cause before a pump fails',
        description: 'A vibration alarm flags the wrong pump. FlowFuse finds the bearing that is really wearing out, updates the alarm rules and sends maintenance the evidence.',
        thumbnailUrl: `https://flowfuse.com${ASSETS}/promo-poster.jpg`,
        contentUrl: `https://flowfuse.com${ASSETS}/promo.mp4`,
        uploadDate: '2026-10-27',
    }),
    defineVideo({
        name: 'Predictive maintenance with FlowFuse: the full walkthrough',
        description: 'Step by step: the alarm flags one pump, FlowFuse AI ranks the pumps that need attention, teaches the alarm to spot bearing wear, and raises the work request.',
        thumbnailUrl: `https://flowfuse.com${ASSETS}/walkthrough-poster.jpg`,
        contentUrl: `https://flowfuse.com${ASSETS}/walkthrough.mp4`,
        uploadDate: '2026-10-27',
    }),
])

const walkthrough = ref<HTMLVideoElement | null>(null)
const current = ref(0)
const activeStep = computed(() => STEPS.findLastIndex(s => current.value >= s.at))
function seek(at: number) {
    const v = walkthrough.value
    if (!v) return
    v.currentTime = at
    v.play().catch(() => {})
}
const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
</script>

<template>
  <div class="w-full">
    <!-- HERO: the plant behind, the problem as the payoff, the promo film beside it. -->
    <section class="relative w-full px-6 overflow-hidden bg-indigo-950">
      <img :src="`${ASSETS}/hero-plant.jpg`" alt="" class="absolute inset-0 w-full h-full object-cover" fetchpriority="high">
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-indigo-950/70 to-indigo-950/20" />
      <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-indigo-950 to-transparent" />
      <div class="relative max-w-screen-lg mx-auto pt-16 md:pt-24 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="max-md:text-center">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-1 text-sm text-indigo-100">
              <UIcon name="i-lucide-activity" class="w-4 h-4" />
              Predictive maintenance · Condition-based monitoring
            </span>
            <h1 class="text-4xl md:text-5xl font-medium text-white mt-6 mb-0">
              See the cause, <span class="text-indigo-300">not just the state.</span>
            </h1>
            <p class="mt-6 text-lg text-indigo-100 max-md:mx-auto max-w-md">
              Find the failing bearing a vibration alarm misses, and fix it before it stops the line.
            </p>
            <div class="mt-8 flex flex-wrap gap-3 max-md:justify-center">
              <CtaBookDemo variant="highlight" position="hero" class="min-h-[40px]" />
              <CtaSignUp variant="ghost" color="white" position="hero" icon="i-heroicons-arrow-long-right" class="min-h-[40px]" />
            </div>
          </div>
          <!-- The frame clips, not the video: Chrome ignores a radius on its own control bar. -->
          <div class="overflow-hidden rounded-xl ring-1 ring-white/15 bg-indigo-950 shadow-2xl shadow-black/50">
            <video
                class="block w-full h-auto"
                :poster="`${ASSETS}/promo-poster.jpg`"
                width="1280"
                height="720"
                autoplay
                loop
                muted
                playsinline
                controls
                preload="metadata"
                aria-label="Film: a vibration alarm flags the wrong pump while another pump's bearing wears out. FlowFuse finds the real risk, the alarm learns to spot wear, and maintenance fixes the pump on schedule."
            >
              <source :src="`${ASSETS}/promo.webm`" type="video/webm">
              <source :src="`${ASSETS}/promo.mp4`" type="video/mp4">
            </video>
          </div>
        </div>
        <ul class="list-none p-0 m-0 mt-14 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <li v-for="h in HIGHLIGHTS" :key="h.text" class="m-0 flex items-center gap-3 text-white max-sm:justify-center">
            <span class="w-10 h-10 shrink-0 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-indigo-200">
              <UIcon :name="h.icon" class="w-5 h-5" />
            </span>
            <span class="font-medium">{{ h.text }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- THE PROBLEM: the alarm's view against what is really happening -->
    <section class="w-full py-16 md:py-24 px-6 bg-white">
      <div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="max-md:text-center">
          <p class="uppercase text-xs font-semibold tracking-wide text-red-600 mb-3">The problem</p>
          <h2 class="m-0">Traditional vibration alarms show you the state, <span class="text-red-600">not the cause.</span></h2>
          <p class="mt-6 text-gray-600">An alarm trips when a machine shakes too much, so the loudest machine gets the attention.</p>
          <p class="mt-4 text-gray-600">A bearing can be wearing out on a pump that still reads "normal". Meanwhile, the pump that tripped is only running rough because of a planned slowdown.</p>
          <p class="mt-4 text-gray-600">Engineers lose hours separating the real problems from the noise, and the real failure still arrives unannounced.</p>
        </div>
        <div class="relative rounded-2xl overflow-hidden min-h-[400px] bg-gray-900 flex flex-col justify-center" aria-hidden="true">
          <img :src="`${ASSETS}/gauge.jpg`" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-br from-red-900/50 via-gray-900/30 to-gray-950/70" />
          <div class="relative p-6 flex flex-col gap-4">
            <!-- what the alarm sees -->
            <div class="rounded-xl bg-white/95 shadow-xl p-4 max-w-xs">
              <p class="m-0 text-[11px] font-semibold uppercase tracking-widest text-gray-400">What the alarm sees</p>
              <ul class="list-none p-0 m-0 mt-3 flex flex-col gap-2">
                <li v-for="row in ALARM_ROWS" :key="row.asset" class="m-0 flex items-center justify-between text-sm">
                  <span class="font-semibold text-gray-800">{{ row.asset }}</span>
                  <span
                      class="rounded-full px-2 py-0.5 text-xs font-medium"
                      :class="row.alarm ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
                  >{{ row.state }}</span>
                </li>
              </ul>
            </div>
            <!-- what is really happening -->
            <div class="rounded-xl bg-white shadow-2xl p-4 max-w-sm self-end ring-2 ring-indigo-500">
              <p class="m-0 text-[11px] font-semibold uppercase tracking-widest text-indigo-500">What's really happening</p>
              <p class="m-0 mt-2 text-sm font-semibold text-gray-800">CP-104 bearing wear, last nine days</p>
              <svg viewBox="0 0 300 100" class="mt-3 w-full h-24">
                <defs>
                  <linearGradient id="wear-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.35" />
                    <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="38" x2="300" y2="38" stroke="#dc2626" stroke-dasharray="4 4" stroke-width="1.5" />
                <text x="4" y="33" font-size="10" fill="#dc2626">Wear threshold</text>
                <path d="M0 92 L37 91 L75 89 L112 86 L150 80 L187 71 L225 56 L262 36 L300 12 L300 100 L0 100 Z" fill="url(#wear-fill)" />
                <path d="M0 92 L37 91 L75 89 L112 86 L150 80 L187 71 L225 56 L262 36 L300 12" fill="none" stroke="#4f46e5" stroke-width="3" stroke-linejoin="round" />
                <circle cx="300" cy="12" r="4" fill="#4f46e5" />
              </svg>
              <p class="m-0 mt-2 text-xs text-gray-500">Still reads "Normal" on the vibration alarm.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        <div v-for="pain in PAINS" :key="pain.title" class="rounded-xl bg-gray-50 border border-gray-200 p-6 flex flex-col gap-3">
          <div class="w-10 h-10 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center text-red-600">
            <UIcon :name="pain.icon" class="w-5 h-5" />
          </div>
          <h3 class="m-0 text-lg text-gray-800">{{ pain.title }}</h3>
          <p class="m-0 text-gray-600 text-sm">{{ pain.description }}</p>
        </div>
      </div>
    </section>

    <!-- THE SOLUTION: product moments on the films' indigo plate, alternating sides -->
    <section class="relative w-full py-16 md:py-24 px-6 overflow-hidden bg-indigo-900">
      <img :src="`${ASSETS}/plate.jpg`" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover">
      <div class="relative max-w-screen-lg mx-auto">
        <div class="max-w-3xl max-md:text-center max-md:mx-auto">
          <p class="uppercase text-xs font-semibold tracking-wide text-orange-300 mb-3">The solution</p>
          <h2 class="m-0 text-white">FlowFuse finds the cause and helps your team act on it, <span class="text-indigo-200">with a person approving every change.</span></h2>
          <p class="mt-6 text-indigo-100">
            Condition-based monitoring that looks past the alarm. FlowFuse connects your vibration sensors, production
            plan and maintenance system, and FlowFuse AI reads the trends across all of them.
          </p>
        </div>
        <div class="mt-16 flex flex-col gap-16 md:gap-20">
          <div
              v-for="(cap, i) in CAPABILITIES"
              :key="cap.title"
              class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div :class="i % 2 ? 'md:order-2' : ''">
              <!-- a light browser frame, so the screenshot reads as the product -->
              <div class="rounded-xl overflow-hidden bg-white shadow-2xl shadow-indigo-950/60 ring-1 ring-white/20">
                <div class="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span class="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <img :src="cap.image" :alt="cap.alt" loading="lazy" width="1200" height="900" class="block w-full h-auto">
              </div>
            </div>
            <div class="max-md:text-center">
              <p class="m-0 flex items-center gap-3 max-md:justify-center">
                <span class="text-5xl font-light text-white/30 leading-none">0{{ i + 1 }}</span>
                <span class="uppercase text-xs font-semibold tracking-widest text-orange-300">{{ cap.kicker }}</span>
              </p>
              <h3 class="mt-4 mb-0 text-2xl text-white">{{ cap.title }}</h3>
              <p class="mt-4 text-indigo-100">{{ cap.description }}</p>
              <ul class="list-none p-0 m-0 mt-4 flex flex-col gap-2">
                <li v-for="point in cap.points" :key="point" class="m-0 flex items-center gap-2 text-sm text-indigo-100 max-md:justify-center">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-green-300 shrink-0" />
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW WE BUILD IT WITH YOU: Define, Design, Deliver -->
    <section class="w-full py-16 md:py-24 px-6 bg-white">
      <div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="relative rounded-2xl overflow-hidden min-h-[360px] md:min-h-[480px]">
          <img :src="`${ASSETS}/crew.jpg`" alt="Two engineers in hard hats working on a pump together" loading="lazy" class="absolute inset-0 w-full h-full object-cover">
          <div class="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-indigo-950/90 to-transparent">
            <p class="m-0 text-white font-medium">FlowFuse engineers work alongside your team, not instead of it.</p>
          </div>
        </div>
        <div>
          <p class="uppercase text-xs font-semibold tracking-wide text-indigo-500 mb-3 max-md:text-center">The Foundation Partnership</p>
          <h2 class="m-0 max-md:text-center">We build it <span class="text-indigo-600">with you</span></h2>
          <ol class="list-none p-0 m-0 mt-8 relative">
            <li v-for="(stage, i) in PARTNERSHIP" :key="stage.step" class="relative m-0 pl-16 pb-8 last:pb-0">
              <span v-if="i < PARTNERSHIP.length - 1" class="absolute left-[21px] top-12 bottom-0 w-0.5 bg-indigo-100" aria-hidden="true" />
              <span class="absolute left-0 top-0 w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold shadow-lg shadow-indigo-600/30">{{ i + 1 }}</span>
              <h3 class="m-0 text-xl text-gray-800">{{ stage.step }}</h3>
              <p class="mt-2 mb-0 text-gray-600">{{ stage.description }}</p>
            </li>
          </ol>
          <p class="mt-8 mb-0 max-md:text-center">
            <CtaLink destination="signUp" position="partnership" class="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1">
              How the partnership works <UIcon name="i-heroicons-arrow-long-right" class="w-4 h-4" />
            </CtaLink>
          </p>
        </div>
      </div>
    </section>

    <!-- SEE IT BUILT: the walkthrough, with its steps as a clickable outline -->
    <section id="see-it-built" class="w-full py-16 md:py-24 px-6 bg-gray-950 scroll-mt-16">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-md:text-center">
          <p class="uppercase text-xs font-semibold tracking-wide text-orange-300 mb-3">See it built</p>
          <h2 class="m-0 text-white">From the alarm to the work request, <span class="text-indigo-300">step by step</span></h2>
        </div>
        <div class="mt-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          <div class="overflow-hidden rounded-xl ring-1 ring-white/10 bg-indigo-950 shadow-2xl">
            <video
                ref="walkthrough"
                class="block w-full h-auto"
                :poster="`${ASSETS}/walkthrough-poster.jpg`"
                width="1920"
                height="1080"
                controls
                playsinline
                preload="metadata"
                aria-label="Walkthrough: the alarm flags one pump, FlowFuse AI ranks the pumps that need attention, updates the alarm rules to catch bearing wear, and a work request is raised for maintenance."
                @timeupdate="current = ($event.target as HTMLVideoElement).currentTime"
            >
              <source :src="`${ASSETS}/walkthrough.webm`" type="video/webm">
              <source :src="`${ASSETS}/walkthrough.mp4`" type="video/mp4">
            </video>
          </div>
          <ol class="list-none p-0 m-0 flex flex-col gap-2">
            <li v-for="(step, i) in STEPS" :key="step.at" class="m-0">
              <button
                  type="button"
                  class="w-full text-left rounded-lg border p-4 transition-colors cursor-pointer"
                  :class="i === activeStep ? 'bg-white/10 border-indigo-400' : 'bg-transparent border-white/10 hover:bg-white/5'"
                  @click="seek(step.at)"
              >
                <span class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-orange-300">
                  {{ step.label }} <span class="text-gray-400 font-normal normal-case tracking-normal">{{ formatTime(step.at) }}</span>
                </span>
                <span class="block mt-1 font-medium text-white">{{ step.title }}</span>
                <span class="block mt-1 text-sm text-gray-400">{{ step.description }}</span>
              </button>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- SCALABLE: one solution, every plant, and the foundation under it -->
    <section class="w-full py-16 md:py-24 px-6 bg-gradient-to-b from-white to-indigo-50/60">
      <div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="max-md:text-center">
          <p class="uppercase text-xs font-semibold tracking-wide text-indigo-500 mb-3">Scalable</p>
          <h2 class="m-0">One solution, <span class="text-indigo-600">every plant.</span></h2>
          <p class="mt-6 text-gray-600">
            What's built for the first line becomes the template for the rest. FlowFuse deploys the same solution to every
            site and keeps them governed and in sync, so plant two takes days, not a new project.
          </p>
          <p class="mt-4 text-gray-600">
            The pump monitoring is only the part you can see. Underneath it is a foundation every next solution reuses.
          </p>
        </div>
        <!-- The iceberg: this solution above the waterline, the reusable foundation below it. -->
        <div class="rounded-2xl overflow-hidden shadow-xl shadow-indigo-900/10" role="img" aria-label="An iceberg: this one solution sits above the waterline; below it is the reusable foundation of connected equipment, a shared data model, approvals, FlowFuse AI and deployment to every site.">
          <div class="bg-gradient-to-b from-sky-50 to-indigo-50 pt-6 flex flex-col items-center">
            <span class="uppercase text-[11px] font-semibold tracking-widest text-gray-400 mb-3">What you see</span>
            <div class="rounded-lg bg-indigo-600 text-white px-4 py-2 text-center shadow-lg">
              <span class="block font-semibold text-sm">Predictive maintenance</span>
              <span class="block text-[11px] text-indigo-100">This solution</span>
            </div>
            <!-- the tip of the iceberg, breaking the waterline -->
            <svg viewBox="0 0 240 56" class="w-60 mt-2 -mb-px" aria-hidden="true">
              <path d="M60 56 L94 16 L112 26 L128 2 L150 30 L166 22 L196 56 Z" fill="#ffffff" stroke="#c7d2fe" stroke-width="2" stroke-linejoin="round" />
            </svg>
          </div>
          <svg class="block w-full h-5 -mt-px" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 10 C 40 2, 80 18, 120 10 S 200 2, 240 10 S 320 18, 360 10 S 400 4, 400 4 V20 H0 Z" fill="#4338ca" />
          </svg>
          <div class="relative bg-gradient-to-b from-indigo-700 via-indigo-900 to-indigo-950 px-6 pt-2 pb-8">
            <span class="block text-center uppercase text-[11px] font-semibold tracking-widest text-indigo-200 mb-4">The foundation it sits on</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-2">
              <li
                  v-for="(layer, i) in FOUNDATION"
                  :key="layer.text"
                  class="m-0 rounded-md bg-white/10 border border-white/15 text-white text-sm py-2 px-3 mx-auto flex items-center justify-center gap-2"
                  :style="{ width: `${68 + i * 8}%` }"
              >
                <UIcon :name="layer.icon" class="w-4 h-4 text-indigo-200 shrink-0" />
                {{ layer.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="max-w-screen-lg mx-auto mt-20">
        <h3 class="m-0 max-md:text-center text-2xl">What you can build next</h3>
        <p class="mt-3 text-gray-600 max-md:text-center">Each of these reuses the connections, data model and approvals from the first solution.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div v-for="item in NEXT" :key="item.title" class="group rounded-xl bg-white border border-gray-200 p-6 flex flex-col gap-3 hover:border-indigo-300 hover:shadow-md transition-all">
            <div class="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
              <UIcon :name="item.icon" class="w-5 h-5" />
            </div>
            <h4 class="m-0 text-gray-800">{{ item.title }}</h4>
            <p class="m-0 text-gray-600 text-sm">{{ item.description }}</p>
          </div>
        </div>

        <h3 class="mt-20 mb-0 max-md:text-center text-2xl">Other solutions on the same foundation</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <UseCaseCard v-for="uc in RELATED" :key="uc.to" :to="uc.to" :title="uc.title" :problem="uc.problem" />
        </div>
      </div>
    </section>

    <UseCaseIndustryChips :industries="['energy-utilities', 'building-materials', 'industrial-machinery', 'food-beverage']" />

    <!-- SOCIAL PROOF: platform customers. Nothing here claims they run this solution. -->
    <section class="w-full px-6 pt-8 pb-8">
      <SocialProof eyebrow="Trusted by manufacturing teams in energy, automotive and food" />
    </section>

    <section class="w-full px-6 pb-8">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="text-center mb-0">Predictive maintenance <span class="text-indigo-600">questions</span></h2>
        <div class="max-w-screen-md mx-auto">
          <Faq :faq="FAQ" variant="page" />
        </div>
      </div>
    </section>

    <!-- CLOSING CTA: back to the plant -->
    <section class="relative w-full px-6 py-20 md:py-28 overflow-hidden bg-indigo-950">
      <img :src="`${ASSETS}/wear.jpg`" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-indigo-950/75 to-indigo-950/30" />
      <div class="relative max-w-screen-lg mx-auto max-md:text-center">
        <h2 class="m-0 text-white max-w-xl max-md:mx-auto">Start your first solution with us</h2>
        <p class="mt-4 text-indigo-100 max-w-xl max-md:mx-auto">
          Pick one problem on one line. We'll define it with your team, design it on a foundation you can reuse, and
          deliver it into production.
        </p>
        <div class="mt-8 flex flex-wrap gap-3 max-md:justify-center">
          <CtaBookDemo variant="highlight" position="footer" class="min-h-[40px]" />
          <CtaSignUp variant="ghost" color="white" position="footer" icon="i-heroicons-arrow-long-right" class="min-h-[40px]" />
        </div>
      </div>
    </section>
  </div>
</template>
