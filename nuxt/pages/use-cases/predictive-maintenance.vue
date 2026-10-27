<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'
// Predictive maintenance: one solution under the Production Performance track
// (/use-cases/production-performance/). Hand-written rather than a useCases entry because
// its blocks (film hero, walkthrough with a step outline) are not ones [slug].vue has.
//
// Built from the industry pages' own pieces so it reads as part of the site: their hero
// layout with the logo strip straight under it, the zigzag Applications band, FAQ and the
// ff-blue-card close. "Talk to Us" is the only call to action. The pitch is building the
// solution with the customer, not a product off the shelf.
//
// Search targets: predictive maintenance, predictive monitoring, condition-based
// monitoring. Copy rules: FlowFuse finds wear early from condition data; it does not
// claim to predict failure dates or remaining life, and quotes no outcome numbers. The
// demo plant is never described as simulated, and no customer is named until approved.
const ASSETS = '/images/use-cases/predictive-maintenance'

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

const SOLUTION = [
    {
        title: 'Rank every asset by real risk',
        description: 'FlowFuse AI checks each wear trend against the production plan and explains its ranking, so the pump that is really failing comes first, not the loudest one.',
        linkText: 'See it built',
        linkHref: '#see-it-built',
        image: `${ASSETS}/ranked-answer.jpg`,
        imageAlt: 'FlowFuse AI ranking the pumps that need attention, with CP-104 first because its bearing defect band rose more than fourfold in seven days',
        variant: 'indigo' as const,
    },
    {
        title: 'Catch wear, not just shaking',
        description: 'The alarm rules learn to watch bearing wear. Your team approves every change before it goes live, and every change is recorded.',
        linkText: 'See it built',
        linkHref: '#see-it-built',
        image: `${ASSETS}/new-rule.jpg`,
        imageAlt: 'The updated health rules: an asset now needs attention when its bearing defect band is above 0.2 g or its kurtosis is above 4.5',
        variant: 'red' as const,
    },
    {
        title: 'Send maintenance the evidence',
        description: 'One work request with the asset, the trend and the reason, so repairs happen on schedule, not in a breakdown.',
        linkText: 'See it built',
        linkHref: '#see-it-built',
        image: `${ASSETS}/work-request.jpg`,
        imageAlt: 'A work request raised for CP-104, titled Inspect CP-104 bearings, awaiting approval',
        variant: 'mixed' as const,
    },
]

// Where each step starts in the walkthrough film, in seconds (from the cut list in
// solution-sim/film/corrow_walk).
const STEPS = [
    { at: 26, label: 'Step 1', title: 'The vibration alarm flags one pump', description: 'The pump that shakes most is flagged. Every other pump looks fine.' },
    { at: 37, label: 'Step 2', title: 'Ask FlowFuse AI which pumps really need attention', description: 'It checks every pump\'s wear trend and the production plan, and finds the bearing that has been wearing for nine days.' },
    { at: 83, label: 'Step 3', title: 'FlowFuse AI teaches the alarm to spot bearing wear', description: 'It updates the health rules, and the change is reviewed and deployed.' },
    { at: 125, label: 'Step 4', title: 'Send maintenance the evidence', description: 'A work request with the wear trend, raised before the bearing fails.' },
]

const NEXT = [
    { icon: 'i-lucide-zap', title: 'Energy use per asset' },
    { icon: 'i-lucide-package', title: 'Spare-parts planning' },
    { icon: 'i-lucide-clipboard-list', title: 'Automated work orders' },
    { icon: 'i-lucide-fan', title: 'Fans, compressors and more' },
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
const DESCRIPTION = 'FlowFuse engineers build condition-based monitoring with your team that finds the real cause of failing equipment, so maintenance acts before the line stops.'

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
    <SolutionPageHero
        eyebrow="Predictive Maintenance"
        eyebrow-icon="pulse"
        heading="See the cause, <span class=&quot;text-indigo-600&quot;>not just the state</span>"
        description="Our engineers build condition-based monitoring with your team that finds the real cause, so maintenance acts before the line stops."
        :video="{
          webm: `${ASSETS}/promo.webm`,
          mp4: `${ASSETS}/promo.mp4`,
          poster: `${ASSETS}/promo-poster.jpg`,
          label: 'Film: a vibration alarm flags the wrong pump while another pump\'s bearing wears out. FlowFuse finds the real risk, the alarm learns to spot wear, and maintenance fixes the pump on schedule.',
        }"
    />

    <!-- THE PROBLEM: the alarm's view against what is really happening -->
    <section class="w-full pt-28 pb-16 md:pb-24 px-6">
      <div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="max-md:text-center">
          <h2 class="m-0">Traditional vibration alarms show you the state, <span class="text-red-600">not the cause</span></h2>
          <p class="mt-6 text-gray-600">An alarm trips when a machine shakes too much, so the loudest machine gets the attention.</p>
          <p class="mt-4 text-gray-600">A bearing can be wearing out on a pump that still reads "normal". Meanwhile, the pump that tripped is only running rough because of a planned slowdown.</p>
          <p class="mt-4 text-gray-600">Engineers lose hours separating the real problems from the noise, and the real failure still arrives unannounced.</p>
        </div>
        <div class="relative max-md:max-w-md max-md:mx-auto w-full" aria-hidden="true">
          <div class="absolute -top-4 -right-4 w-full h-full rounded-lg bg-gradient-to-tl from-red-200 via-red-100 to-red-50" />
          <div class="relative rounded-lg overflow-hidden border-2 border-red-100 min-h-[380px] bg-gray-900 flex flex-col justify-center">
            <img :src="`${ASSETS}/gauge.jpg`" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-br from-red-900/40 via-gray-900/20 to-gray-950/60" />
            <div class="relative p-6 flex flex-col gap-4">
              <div class="rounded-lg bg-white/95 shadow-xl p-4 max-w-xs">
                <p class="m-0 text-[11px] font-semibold uppercase tracking-widest text-gray-400">What the alarm sees</p>
                <ul class="list-none p-0 m-0 mt-3 flex flex-col gap-2">
                  <li v-for="row in ALARM_ROWS" :key="row.asset" class="m-0 flex items-center justify-between text-sm">
                    <span class="font-semibold text-gray-800">{{ row.asset }}</span>
                    <span class="rounded-full px-2 py-0.5 text-xs font-medium" :class="row.alarm ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">{{ row.state }}</span>
                  </li>
                </ul>
              </div>
              <div class="rounded-lg bg-white shadow-2xl p-4 max-w-sm self-end ring-2 ring-indigo-500">
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
      </div>
      <div class="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        <div v-for="pain in PAINS" :key="pain.title" class="rounded-lg bg-gray-50 border border-gray-200 p-6 flex flex-col gap-3">
          <div class="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-red-500">
            <UIcon :name="pain.icon" class="w-5 h-5" />
          </div>
          <h3 class="m-0 text-lg text-gray-800">{{ pain.title }}</h3>
          <p class="m-0 text-gray-600 text-sm">{{ pain.description }}</p>
        </div>
      </div>
    </section>

    <!-- THE SOLUTION: the industry pages' zigzag band -->
    <IndustryPageApplications
        heading="We find the cause. Your team stays in charge."
        description="We connect your sensors, production plan and maintenance system, and FlowFuse AI reads the trends across all of them."
        :items="SOLUTION"
    />

    <SolutionPagePartnership :image="`${ASSETS}/crew.jpg`" image-alt="Two engineers in hard hats working on a pump together" />

    <!-- SEE IT BUILT: the walkthrough, with its steps as a clickable outline -->
    <section id="see-it-built" class="w-full py-16 md:py-24 px-6 scroll-mt-16">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-md:text-center">See it <span class="text-indigo-600">built</span></h2>
        <p class="mt-4 text-gray-600 max-md:text-center">From the alarm to the work request, step by step.</p>
        <div class="mt-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          <div class="rounded-lg border-2 border-indigo-200 overflow-hidden bg-indigo-950">
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
                  :class="i === activeStep ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-gray-200 hover:border-indigo-200'"
                  @click="seek(step.at)"
              >
                <span class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-red-600">
                  {{ step.label }} <span class="text-gray-400 font-normal normal-case tracking-normal">{{ formatTime(step.at) }}</span>
                </span>
                <span class="block mt-1 font-medium text-gray-800">{{ step.title }}</span>
                <span class="block mt-1 text-sm text-gray-600">{{ step.description }}</span>
              </button>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <SolutionPageFoundation solution="Predictive maintenance">
      <p class="mt-6 mb-2 text-sm font-semibold text-gray-700">What you can build next on the same foundation</p>
      <ul class="list-none p-0 m-0 grid grid-cols-2 gap-2">
        <li v-for="item in NEXT" :key="item.title" class="m-0 flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-3 py-2 text-sm text-gray-700">
          <UIcon :name="item.icon" class="w-4 h-4 text-indigo-600 shrink-0" />
          {{ item.title }}
        </li>
      </ul>
      <p class="mt-6 mb-0 text-sm">
        Part of <NuxtLink to="/use-cases/production-performance/" class="text-blue-600 hover:underline">Production Performance</NuxtLink>
      </p>
    </SolutionPageFoundation>

    <div class="w-full px-6 pt-20 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <Faq :faq="FAQ" variant="page" />
      </div>
    </div>

    <SolutionPageClosingCta
        heading="Start your first solution with us"
        description="Pick one problem on one line. We'll define it with your team, design it on a foundation you can reuse, and deliver it into production."
    />
  </div>
</template>
