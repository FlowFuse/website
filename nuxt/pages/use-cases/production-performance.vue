<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'
import { CtaLink, NuxtLink } from '#components'
// Production Performance: a solution track, the theme a buyer talks to us about, with the
// solutions we have built under it shown as examples of what we build with a customer
// rather than products off the shelf. The structure follows tulip.co/production-management
// (hero film, logo strip, why-us band, how manufacturers use it, proof); the look is the
// industry pages', from their own components, so it reads as part of the site.
//
// "Talk to Us" is the only call to action. Copy rules: no outcome numbers, no customer
// names until approved, never describe the demo plants as simulated.
const ASSETS = '/images/use-cases/production-performance'

// Each reason links to the page that shows it. "Built once" goes to /build-with-us/, a CTA
// destination, so it routes through CtaLink (cta-destinations.test.mjs rejects a literal href).
const WHY = [
    { icon: 'i-lucide-cable', title: 'Connect what you already run', description: 'PLCs, machines, sensors, historians and business systems, over the protocols they already speak. No rip and replace.', to: '/integrations/', linkText: 'See the integrations' },
    { icon: 'i-lucide-search-check', title: 'Find the cause, not just the state', description: 'FlowFuse AI reads across every machine, shift and plan to explain where output is really being lost.', to: '/ai/', linkText: 'How FlowFuse AI works' },
    { icon: 'i-lucide-shield-check', title: 'A person approves every change', description: 'AI proposes the fix and your team approves it. Every change is recorded and can be rolled back.', to: '/platform/security/', linkText: 'See how it is governed' },
    { icon: 'i-lucide-factory', title: 'Built once, reused at every plant', description: 'The first solution becomes the template for the next line and the next site.', destination: 'signUp' as const, linkText: 'How we build with you' },
]

// The solutions under this track, one tab each: the film, what it solves, and where to go
// next when the solution has its own page.
const FILMS = [
    {
        key: 'packaging',
        name: 'Downtime Tracking',
        story: 'Finding the hidden losses on a packaging line',
        description: 'Short stops too brief for the downtime log add up to real lost output. FlowFuse counts every stop on every machine, shows the biggest loss to the team on shift, and measures each fix from a baseline.',
        webm: `${ASSETS}/packaging.webm`,
        mp4: `${ASSETS}/packaging.mp4`,
        poster: `${ASSETS}/packaging-poster.jpg`,
    },
    {
        key: 'machining',
        name: 'Machine Utilization',
        story: 'Finding the capacity a machining cell is losing',
        description: 'Idle time is not the same as lost capacity. FlowFuse separates time lost to how machines are run from time with no work, ties it to the orders at risk, and shows it shift by shift.',
        webm: `${ASSETS}/machining.webm`,
        mp4: `${ASSETS}/machining.mp4`,
        poster: `${ASSETS}/machining-poster.jpg`,
    },
    {
        key: 'maintenance',
        name: 'Predictive Maintenance',
        story: 'Finding the real cause before a pump fails',
        description: 'Vibration alarms show the state, not the cause. FlowFuse ranks every asset by its real wear, teaches the alarm to catch it early, and sends maintenance the evidence before the line stops.',
        webm: '/images/use-cases/predictive-maintenance/promo.webm',
        mp4: '/images/use-cases/predictive-maintenance/promo.mp4',
        poster: '/images/use-cases/predictive-maintenance/promo-poster.jpg',
        to: '/use-cases/predictive-maintenance/',
        linkText: 'Explore predictive maintenance',
    },
]

const FAQ = [
    {
        question: 'What is production performance management?',
        answer: 'It is the work of knowing where your lines lose output, whether to stops, slow running, quality or failing equipment, and acting on it while it still matters. FlowFuse brings the data from your machines and systems together and helps your team find and fix the biggest losses first.',
    },
    {
        question: 'Is this an off-the-shelf product?',
        answer: 'No. Every operation measures performance differently, so we build the solution with your team on your equipment, starting with one problem on one line. It runs on the FlowFuse platform and becomes a foundation you reuse at the next line and the next plant.',
    },
    {
        question: 'Do we need new equipment or a new MES?',
        answer: 'Usually not. FlowFuse connects to the PLCs, sensors, historians, MES and ERP systems you already run. Where a gap does need new hardware, we plan it with you in the Define stage.',
    },
    {
        question: 'Can it calculate OEE?',
        answer: 'Yes. Availability, performance and quality come from the same machine and line data, so OEE is one view among many. The bigger win is seeing which losses sit behind the number, down to the machine and the shift.',
    },
    {
        question: 'How do we get started?',
        answer: 'Pick one problem on one line. We define it with your team, design the solution on a foundation you can reuse, and deliver it into production. [Talk to us](cta:bookDemo) about your first solution.',
    },
]

const TITLE = 'Production Performance'
const DESCRIPTION = 'FlowFuse engineers build production performance solutions with your team: find the hidden losses, lost capacity and failing equipment on your lines, and act on them before the shift ends.'

useSeoMeta({
    title: `${TITLE}: Find and Fix Lost Output | FlowFuse`,
    description: DESCRIPTION,
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogImage: `https://flowfuse.com${ASSETS}/packaging-poster.jpg`,
    ogUrl: 'https://flowfuse.com/use-cases/production-performance/',
    keywords: 'production performance, production performance management, OEE, downtime tracking, manufacturing performance, lost capacity, predictive maintenance, FlowFuse',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
    ...FILMS.map(f => defineVideo({
        name: f.story,
        description: f.description,
        thumbnailUrl: `https://flowfuse.com${f.poster}`,
        contentUrl: `https://flowfuse.com${f.mp4}`,
        uploadDate: '2026-10-27',
    })),
])

const filmIndex = ref(0)
const film = computed(() => FILMS[filmIndex.value]!)
</script>

<template>
  <div class="w-full">
    <SolutionPageHero
        eyebrow="Production Performance"
        eyebrow-icon="arrow-trending-up"
        heading="Win back the output <span class=&quot;text-indigo-600&quot;>your lines are losing</span>"
        description="Our engineers build production performance solutions with your team, on your equipment: finding the hidden losses, lost capacity and failing assets, and acting on them before the shift ends."
        :image="{
          src: `${ASSETS}/hidden-loss.gif`,
          alt: 'The problem: 48 minutes of cartoner stops in one shift, each under two minutes, and 0 minutes in the downtime log, because traditional downtime tracking only logs the long stops. Then FlowFuse AI answers where pack line 2 lost the most output: the cartoner, with 42 short stops totalling 48 minutes.',
          width: 720,
          height: 406,
        }"
    />

    <!-- WHY FLOWFUSE: four short reasons, in the band layout Tulip uses -->
    <section class="w-full pt-28 pb-16 px-6">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-md:text-center">Your dashboards show the state. <span class="text-indigo-600">We find the cause.</span></h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <component
              :is="item.destination ? CtaLink : NuxtLink"
              v-for="item in WHY"
              :key="item.title"
              v-bind="item.destination ? { destination: item.destination, position: 'why-card' } : { to: item.to }"
              class="group hover:no-underline rounded-lg border border-gray-200 bg-white p-6 flex flex-col gap-3 max-sm:text-center max-sm:items-center hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div class="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <UIcon :name="item.icon" class="w-5 h-5" />
            </div>
            <h3 class="m-0 text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">{{ item.title }}</h3>
            <p class="m-0 text-sm text-gray-600 flex-grow">{{ item.description }}</p>
            <span class="text-blue-600 text-sm flex items-center gap-1.5 group-hover:underline">
              {{ item.linkText }}
              <UIcon name="i-heroicons-arrow-long-right" class="shrink-0 w-4 h-4" />
            </span>
          </component>
        </div>
      </div>
    </section>


    <!-- THE FILMS: one player, a tab per solution -->
    <section id="films" class="w-full py-16 md:py-24 px-6 bg-indigo-50/50 border-y border-indigo-100 scroll-mt-16">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-md:text-center">How manufacturers use FlowFuse for <span class="text-indigo-600">production performance</span></h2>
        <p class="mt-4 text-gray-600 max-md:text-center">Every one of these started as a single problem on a single line. We build yours the same way, around your equipment and your data.</p>
        <div class="mt-8 flex flex-wrap gap-2 max-md:justify-center" role="tablist">
          <button
              v-for="(f, i) in FILMS"
              :key="f.key"
              type="button"
              role="tab"
              :aria-selected="i === filmIndex"
              class="rounded-lg border px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
              :class="i === filmIndex ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300'"
              @click="filmIndex = i"
          >
            {{ f.name }}
          </button>
        </div>
        <div class="mt-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-center">
          <div class="relative">
            <div class="absolute -top-2 -left-2 w-full h-full rounded-lg bg-gradient-to-tl from-indigo-400 via-indigo-300 to-indigo-100" aria-hidden="true" />
            <div class="relative rounded-lg border border-indigo-300 overflow-hidden bg-indigo-950 shadow-lg">
              <video
                  :key="film.key"
                  class="block w-full h-auto"
                  :poster="film.poster"
                  width="1280"
                  height="720"
                  controls
                  playsinline
                  preload="metadata"
                  :aria-label="`Film: ${film.story}`"
              >
                <source :src="film.webm" type="video/webm">
                <source :src="film.mp4" type="video/mp4">
              </video>
            </div>
          </div>
          <div class="max-lg:text-center">
            <h3 class="m-0 text-3xl font-medium text-gray-700">{{ film.name }}</h3>
            <p class="mt-2 mb-0 text-sm font-medium text-indigo-600">{{ film.story }}</p>
            <p class="mt-4 mb-0 text-gray-600">{{ film.description }}</p>
            <NuxtLink v-if="film.to" :to="film.to" class="mt-4 inline-flex items-center gap-1.5 text-blue-600 hover:underline">
              {{ film.linkText }}
              <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5 shrink-0" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <SolutionPagePartnership
        image="/images/use-cases/predictive-maintenance/crew.jpg"
        image-alt="Two engineers in hard hats working on a pump together"
    />

    <SolutionPageFoundation solution="Production performance" />

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
