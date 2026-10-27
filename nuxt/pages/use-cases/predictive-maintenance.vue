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
// Both films live in public/images/use-cases/predictive-maintenance/ like the AI page's
// demo, as WebM with an MP4 fallback.
const ASSETS = '/images/use-cases/predictive-maintenance'
const LINK = 'text-indigo-600 hover:text-indigo-800 underline'

const PAINS = [
    { icon: 'i-lucide-siren', title: 'Alarms on the wrong asset', description: 'The pump that shakes the most gets flagged, while the one that is wearing out reads normal.' },
    { icon: 'i-lucide-circle-help', title: 'No reason given', description: 'An alarm says a limit was crossed. It does not say why, or whether the plan explains it.' },
    { icon: 'i-lucide-layers', title: 'Evidence scattered across systems', description: 'Vibration data, the production plan and the maintenance system each hold part of the story.' },
]

const CAPABILITIES = [
    { image: `${ASSETS}/ranked-answer.jpg`, alt: 'FlowFuse AI ranking the pumps that need attention, with CP-104 first because its bearing defect band rose more than fourfold in seven days', title: 'Ranks equipment by what really needs attention', description: 'FlowFuse AI checks every asset\'s wear trend against the production plan and explains its ranking in plain language.' },
    { image: `${ASSETS}/new-rule.jpg`, alt: 'The updated health rules: an asset now needs attention when its bearing defect band is above 0.2 g or its kurtosis is above 4.5', title: 'Updates the alarm rules so wear is caught early', description: 'Bearing wear now raises the flag, not just overall shaking. A person approves the change before it goes live.' },
    { image: `${ASSETS}/work-request.jpg`, alt: 'A work request raised for CP-104, titled Inspect CP-104 bearings, awaiting approval', title: 'Raises the work request with the evidence', description: 'Maintenance gets the asset, the trend and the reason in one request, before the bearing fails.' },
]

const PARTNERSHIP = [
    { step: 'Define', icon: 'i-lucide-target', description: 'Our engineers and your team pick one real operational problem, agree what success looks like, and map the equipment and data behind it.' },
    { step: 'Design', icon: 'i-lucide-drafting-compass', description: 'Together we design the solution on a reusable foundation (connections, data model, governance and AI agents) and build it into your environment.' },
    { step: 'Deliver', icon: 'i-lucide-rocket', description: 'It goes into production on your equipment. Your team is trained alongside ours, so you own it and can extend it yourselves.' },
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
    'Connected equipment and sensors',
    'A shared data model for every asset',
    'Approvals and change control',
    'FlowFuse AI working on your own data',
    'Deployment to every site',
]

const NEXT = [
    { icon: 'i-lucide-zap', title: 'Energy use per asset', description: 'The same connections, now measuring what each machine costs to run.' },
    { icon: 'i-lucide-package', title: 'Spare-parts planning', description: 'Wear trends that tell stores which bearings to have on the shelf.' },
    { icon: 'i-lucide-clipboard-check', title: 'Automated work orders', description: 'Requests that land in your maintenance system with the evidence attached.' },
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
    <!-- HERO: the problem as the payoff, the promo film beside it. -->
    <section class="w-full px-6 bg-[radial-gradient(ellipse_120%_140%_at_50%_-20%,theme(colors.indigo.50)_0%,theme(colors.white)_60%)]">
      <div class="max-w-screen-xl mx-auto py-12 md:py-20 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
        <div class="max-lg:text-center">
          <p class="uppercase text-sm font-semibold text-indigo-500 mb-4">Predictive maintenance · Condition-based monitoring</p>
          <h1 class="font-medium m-0">See the cause, <span class="text-indigo-600">not just the state.</span></h1>
          <p class="mt-6 text-lg text-gray-600 max-lg:mx-auto max-w-xl">
            Find the failing bearing a vibration alarm misses, and fix it before it stops the line.
          </p>
          <div class="mt-8 flex flex-wrap gap-3 max-lg:justify-center">
            <CtaBookDemo variant="highlight" position="hero" class="min-h-[40px]" />
            <CtaSignUp variant="primary-outlined" position="hero" class="min-h-[40px]" />
          </div>
        </div>
        <!-- The frame clips, not the video: Chrome ignores a radius on its own control bar. -->
        <div class="overflow-hidden rounded-xl border border-indigo-100 bg-indigo-950 shadow-2xl">
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
    </section>

    <!-- THE PROBLEM -->
    <section class="w-full py-16 sm:py-24 px-6 bg-white">
      <div class="max-w-screen-lg mx-auto">
        <p class="uppercase text-xs font-semibold text-red-500 mb-2 max-md:text-center">The problem</p>
        <h2 class="max-md:text-center max-w-3xl">Traditional vibration alarms show you the state, <span class="text-red-600">not the cause.</span></h2>
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
          <p class="m-0">An alarm trips when a machine shakes too much, so the loudest machine gets the attention.</p>
          <p class="m-0">A bearing can be wearing out on a pump that still reads "normal". Meanwhile, the pump that tripped is only running rough because of a planned slowdown.</p>
          <p class="m-0">Engineers lose hours separating the real problems from the noise, and the real failure still arrives unannounced.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div v-for="pain in PAINS" :key="pain.title" class="rounded-xl bg-gray-50 border border-gray-200 p-6 flex flex-col gap-3">
            <div class="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-red-500">
              <UIcon :name="pain.icon" class="w-5 h-5" />
            </div>
            <h3 class="m-0 text-lg text-gray-800">{{ pain.title }}</h3>
            <p class="m-0 text-gray-600 text-sm">{{ pain.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- THE SOLUTION: what it does, how we build it with you, and the walkthrough -->
    <section class="w-full py-16 sm:py-24 px-6 bg-indigo-50/50 border-y border-indigo-100">
      <div class="max-w-screen-lg mx-auto">
        <p class="uppercase text-xs font-semibold text-indigo-500 mb-2 max-md:text-center">The solution</p>
        <h2 class="max-md:text-center max-w-3xl">
          FlowFuse finds the cause and helps your team act on it, <span class="text-indigo-600">with a person approving every change.</span>
        </h2>
        <p class="mt-6 max-w-3xl text-gray-600 max-md:text-center">
          Condition-based monitoring that looks past the alarm. FlowFuse connects your vibration sensors, production plan and
          maintenance system, and FlowFuse AI reads the trends across all of them.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div v-for="cap in CAPABILITIES" :key="cap.title" class="rounded-xl bg-white border border-gray-200 overflow-hidden flex flex-col">
            <div class="aspect-[4/3] overflow-hidden border-b border-gray-200 bg-gray-50">
              <img :src="cap.image" :alt="cap.alt" loading="lazy" class="w-full h-full object-cover object-top">
            </div>
            <div class="p-6 flex flex-col gap-2">
              <h3 class="m-0 text-lg text-gray-800">{{ cap.title }}</h3>
              <p class="m-0 text-gray-600 text-sm">{{ cap.description }}</p>
            </div>
          </div>
        </div>

        <div class="mt-20">
          <h3 class="max-md:text-center text-2xl">How we build it with you: <span class="text-indigo-600">the Foundation Partnership</span></h3>
          <p class="mt-3 max-w-3xl text-gray-600 max-md:text-center">
            FlowFuse engineers work alongside your team, not instead of it.
            <CtaLink destination="signUp" position="partnership" :class="LINK">How the partnership works</CtaLink>
          </p>
          <ol class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 list-none p-0">
            <li v-for="(stage, i) in PARTNERSHIP" :key="stage.step" class="relative rounded-xl bg-white border border-gray-200 p-6 m-0">
              <div class="flex items-center gap-3">
                <span class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">{{ i + 1 }}</span>
                <h4 class="m-0 text-xl text-gray-800">{{ stage.step }}</h4>
                <UIcon :name="stage.icon" class="ml-auto w-6 h-6 text-indigo-400" />
              </div>
              <p class="mt-4 mb-0 text-gray-600 text-sm">{{ stage.description }}</p>
            </li>
          </ol>
        </div>

        <div id="see-it-built" class="mt-20 scroll-mt-16">
          <h3 class="max-md:text-center text-2xl">See it built</h3>
          <p class="mt-3 max-w-3xl text-gray-600 max-md:text-center">The full walkthrough, from the alarm to the work request, in under two and a half minutes.</p>
          <div class="mt-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
            <div class="overflow-hidden rounded-xl border border-indigo-100 bg-indigo-950 shadow-xl">
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
                    :class="i === activeStep ? 'bg-white border-indigo-300 shadow-sm' : 'bg-transparent border-transparent hover:bg-white/70'"
                    @click="seek(step.at)"
                >
                  <span class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-red-500">
                    {{ step.label }} <span class="text-gray-400 font-normal normal-case tracking-normal">{{ formatTime(step.at) }}</span>
                  </span>
                  <span class="block mt-1 font-medium text-gray-800">{{ step.title }}</span>
                  <span class="block mt-1 text-sm text-gray-600">{{ step.description }}</span>
                </button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- SCALABLE: one solution, every plant, and the foundation under it -->
    <section class="w-full py-16 sm:py-24 px-6 bg-white">
      <div class="max-w-screen-lg mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="max-md:text-center">
            <p class="uppercase text-xs font-semibold text-indigo-500 mb-2">Scalable</p>
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
          <div class="rounded-2xl overflow-hidden border border-indigo-100" role="img" aria-label="An iceberg: this one solution sits above the waterline; below it is the reusable foundation of connected equipment, a shared data model, approvals, FlowFuse AI and deployment to every site.">
            <div class="bg-gradient-to-b from-white to-indigo-50 px-6 pt-8 pb-4 flex flex-col items-center">
              <span class="uppercase text-[11px] font-semibold tracking-widest text-gray-400 mb-3">What you see</span>
              <div class="rounded-lg bg-white border-2 border-indigo-600 px-5 py-3 text-center shadow-sm">
                <span class="block font-semibold text-gray-800">Predictive maintenance</span>
                <span class="block text-xs text-gray-500">This solution</span>
              </div>
            </div>
            <svg class="block w-full h-6 -mb-px" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 12 C 40 2, 80 22, 120 12 S 200 2, 240 12 S 320 22, 360 12 S 400 6, 400 6 V24 H0 Z" fill="#4f46e5" />
            </svg>
            <div class="bg-gradient-to-b from-indigo-600 to-indigo-950 px-6 pt-4 pb-8">
              <span class="block text-center uppercase text-[11px] font-semibold tracking-widest text-indigo-200 mb-4">The foundation it sits on</span>
              <ul class="list-none p-0 m-0 flex flex-col gap-2">
                <li
                    v-for="(layer, i) in FOUNDATION"
                    :key="layer"
                    class="m-0 rounded-md bg-white/10 border border-white/15 text-white text-sm text-center py-2 mx-auto"
                    :style="{ width: `${70 + i * 7.5}%` }"
                >
                  {{ layer }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="mt-20 max-md:text-center text-2xl">What you can build next</h3>
        <p class="mt-3 text-gray-600 max-md:text-center">Each of these reuses the connections, data model and approvals from the first solution.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div v-for="item in NEXT" :key="item.title" class="rounded-xl bg-gray-50 border border-gray-200 p-6 flex flex-col gap-3">
            <div class="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-indigo-600">
              <UIcon :name="item.icon" class="w-5 h-5" />
            </div>
            <h4 class="m-0 text-gray-800">{{ item.title }}</h4>
            <p class="m-0 text-gray-600 text-sm">{{ item.description }}</p>
          </div>
        </div>

        <h3 class="mt-20 max-md:text-center text-2xl">Other solutions on the same foundation</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <UseCaseCard v-for="uc in RELATED" :key="uc.to" :to="uc.to" :title="uc.title" :problem="uc.problem" />
        </div>
      </div>
    </section>

    <UseCaseIndustryChips :industries="['energy-utilities', 'building-materials', 'industrial-machinery', 'food-beverage']" />

    <!-- SOCIAL PROOF: platform customers. Nothing here claims they run this solution. -->
    <section class="w-full px-6 pt-8">
      <SocialProof eyebrow="Trusted by manufacturing teams in energy, automotive and food" />
    </section>

    <section class="w-full px-6 pb-4">
      <div class="max-w-screen-md mx-auto">
        <h2 class="text-center mb-0">Predictive maintenance <span class="text-indigo-600">questions</span></h2>
        <Faq :faq="FAQ" variant="page" />
      </div>
    </section>

    <UseCaseClosingCta
        heading="Start your first solution with us"
        description="Pick one problem on one line. We'll define it with your team, design it on a foundation you can reuse, and deliver it into production."
    />
  </div>
</template>
