<script setup lang="ts">
// The homepage, written for director-level buyers. Six parts, in this order:
//   1. Value statement (hero, with the animated wireframe plant: components/home/Hero.vue)
//   2. Your outcomes: the business outcomes a first solution delivers
//   3. One solution, every site: what FlowFuse is, the problem it solves, and the
//      Foundation Partnership that makes each site faster than the last
//   4. Metrics of success: customer results, each linked to its story
//   (logo strip with the user count sits straight under the hero)
//   5. Social proof: testimonials
//   5b. Security: SOC 2 and the controls enterprise IT asks about
//   6. Call to action
//
// The illustrations are isometric wireframes generated in nuxt/lib/home-iso-scenes.ts
// and rendered by <HomeIsoArt>, in place of stock photography.
//
// The page sells one idea: each site is faster than the last, and the Foundation
// Partnership is what makes it so. Calls to action follow where the reader is: the hero
// offers both "Talk to Us" and the partnership; mid-page there is one "learn more" to the
// partnership; the close asks for the conversation, with the ROI calculator as the
// lighter option. Partnership links go to /build-with-us/ through CtaLink, so clicks
// still count as the signUp CTA.
import { foundationSiteCenters } from '../lib/home-iso-scenes'
import { faqAnswerText } from '../lib/faq-answer.mjs'

// The scorecard plant and operations leaders already report against (Quality, Delivery,
// Cost), plus Uptime for maintenance. Under each word, one line that sees the problem and
// acts on it: these are solutions that do something, not dashboards. The next section carries "every plant", so this one stays off it.
// Each card links to the page that goes deepest on that number.
const SCORECARD = [
    { scene: 'quality', name: 'Quality', text: 'Stop bad parts at the station, not at the end of the line.', link: 'Production line monitoring', to: '/use-cases/production-line-monitoring/' },
    { scene: 'delivery', name: 'Delivery', text: 'Spot a slipping order while there’s still time to save it.', link: 'For operations teams', to: '/teams/manufacturing-operations/' },
    { scene: 'cost', name: 'Cost', text: 'Find your costliest stops and fix them first.', link: 'Estimate your ROI', to: '/resources/roi-calculator/' },
    { scene: 'uptime', name: 'Uptime', text: 'Turn early warnings into work orders before a machine fails.', link: 'For maintenance teams', to: '/teams/maintenance-reliability/' },
] as const

const PROBLEM = [
    'A fix that works at one plant stays at that plant.',
    'Every new site starts as a new project.',
    'Improvements depend on whoever built them.',
]

const SOLUTION = [
    'A solution is proven once and deployed everywhere.',
    'Each site starts on the foundation the last one built, so it goes faster.',
    'Your team owns the solution and pushes improvements to every site.',
]

// What the first solution leaves behind, reused at every site after it.
// Same four pieces as the FOUNDATION list on /build-with-us/; keep the two in step.
// Each card links to where that piece is covered in depth.
const FOUNDATION = [
    { icon: 'i-lucide-plug', title: 'Integrations', text: 'Connections to your machines, historians and business systems. Built at the first site, reused at the next.', to: '/integrations/' },
    { icon: 'i-lucide-database', title: 'Data models', text: 'One structure for your operational data, so every plant speaks the same language.', to: '/use-cases/uns/' },
    { icon: 'i-lucide-rocket', title: 'Deployment patterns', text: 'A tested way to roll the solution out to new lines and plants without starting over.', to: '/platform/device-agent/' },
    { icon: 'i-lucide-shield-check', title: 'Governance', text: 'Roles, access and change control, set up once and applied everywhere.', to: '/platform/security/' },
]

// Ways in by industry and by team, under the results.
const EXPLORE = [
    {
        label: 'By industry',
        links: [
            { name: 'Automotive', to: '/industries/automotive/' },
            { name: 'Industrial machinery', to: '/industries/industrial-machinery/' },
            { name: 'Building materials', to: '/industries/building-materials/' },
            { name: 'Energy and utilities', to: '/industries/energy-utilities/' },
            { name: 'Aviation and aerospace', to: '/industries/aviation-aerospace/' },
        ],
    },
    {
        label: 'By team',
        links: [
            { name: 'Manufacturing operations', to: '/teams/manufacturing-operations/' },
            { name: 'Maintenance and reliability', to: '/teams/maintenance-reliability/' },
            { name: 'Automation and controls', to: '/teams/automation-controls/' },
            { name: 'Digital transformation', to: '/teams/digital-transformation/' },
        ],
    },
]

// One label under each site in the foundation picture, placed where that site is drawn.
const FOUNDATION_LABELS = foundationSiteCenters().map((at, i) => ({
    at,
    name: `Site ${i + 1}`,
    note: i === 0 ? 'Foundation built' : 'Foundation reused',
}))

// Every figure here is a customer result published in nuxt/content/customer-stories/.
const METRICS = [
    {
        kind: 'Time to change',
        number: 'Minutes',
        text: 'to update torque specs on 15 controllers across 5 lines. It used to mean a visit to each one.',
        company: 'Aperia Technologies',
        to: '/customer-stories/aperia-technologies-plc-replacement/',
    },
    {
        kind: 'Capacity recovered',
        number: '8–12 hrs',
        text: 'a day of idle end-of-line test equipment put back to work.',
        company: 'Aperia Technologies',
        to: '/customer-stories/aperia-technologies-plc-replacement/',
    },
    {
        kind: 'Scale',
        number: '1 → 130+',
        text: 'instances across every site, run by the IT team that started with one.',
        company: 'Walter',
        to: '/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/',
    },
    {
        kind: 'Coverage',
        number: '7,000 km',
        text: 'of national grid monitored around the clock from one governed platform.',
        company: 'Energinet',
        to: '/customer-stories/energinet-streamlining-critical-infrastructure-data-management/',
    },
]

// The security section. Same claims as the shared <EnterpriseSecurity> block on the
// product and pricing pages, drawn in this page's card style instead of that block's.
const SECURITY = [
    { icon: 'i-lucide-key-round', title: 'Single sign-on', text: 'Sign in through the identity provider you already use.' },
    { icon: 'i-lucide-users', title: 'Role-based access', text: 'Decide who can view, change and deploy, site by site.' },
    { icon: 'i-lucide-scroll-text', title: 'Audit logs', text: 'Every change recorded: who made it, what changed and when.' },
    { icon: 'i-lucide-server', title: 'Self-hosted or air-gapped', text: 'Run it in your own environment, offline if you need to.' },
]

// Rendered by <Faq> and repeated as FAQ structured data below.
const FAQ = [
    { question: 'What is FlowFuse?', answer: 'FlowFuse solves hard operational problems for manufacturers, asset operators and the companies that service industrial equipment, using an industrial application platform built on open-source [Node-RED](/node-red/). Our engineers build your first solution alongside your team. Together we prove it at one site, then deploy it to the rest, faster with each one.' },
    { question: 'What is the Foundation Partnership?', answer: 'FlowFuse engineers build your first solution with your team, on the equipment you already run. What they build becomes the foundation every later site reuses, and we roll it out with your team, site by site. [See how the Foundation Partnership works](/build-with-us/).' },
    { question: 'What kinds of problems does FlowFuse solve?', answer: 'Problems that repeat across your plants: scrap and rework, late orders, unplanned stops and the cost behind them. We start with the one you are measured on. See how other teams solved theirs in our [customer stories](/customer-stories/).' },
    { question: 'Can FlowFuse work with our existing systems?', answer: 'Yes. FlowFuse connects to and extends your existing MES, ERP, SCADA, PLCs and other systems, without replacing them or changing your core platforms. See the full list of [integrations](/integrations/).' },
    { question: 'Who owns the solution once it is built?', answer: 'You do. Everything we build together runs in your FlowFuse environment, with full version history, so your team can change it, extend it and roll it out without waiting on us. It is built on open-source Node-RED, so nothing is locked away.' },
    { question: 'How does FlowFuse handle security and compliance?', answer: 'FlowFuse is SOC 2 Type II certified. It supports single sign-on, role-based access, audit logs, and self-hosted or air-gapped deployments. Read more on our [security page](/platform/security/).' },
]

// The homepage ranks for the brand, so its title leads with it. The site-wide template
// would append "• FlowFuse" again, so it's switched off for this page only.
useHead({ titleTemplate: '%s' })
useSeoMeta({
    title: 'FlowFuse | Deploy Proven Industrial Solutions at Every Site',
    description: 'FlowFuse builds the first solution with your team on the equipment you already run, proves it at one site, and deploys it to the rest, faster with each one.',
    ogDescription: 'FlowFuse builds the first solution with your team on the equipment you already run, proves it at one site, and deploys it to the rest, faster with each one.',
    keywords: 'Industrial Solutions, Node-RED, Industrial Applications, IIoT, Multi-site Manufacturing, Edge, Industrial Automation, Industry 4.0',
    ogUrl: 'https://flowfuse.com/',
    twitterSite: '@FlowFuseinc',
})
useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
])
</script>

<template>
  <!-- 1. Value statement -->
  <section class="home-dark w-full px-6 pt-16 md:pt-24 pb-16 md:pb-20 overflow-hidden">
    <div class="max-w-screen-xl mx-auto grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 md:gap-6 items-center">
      <div class="max-md:text-center relative z-10">
        <p class="home-eyebrow text-red-300">Industrial solutions for multi-site operations</p>
        <h1 class="text-balance text-white font-medium text-4xl md:text-5xl leading-[1.08] mt-5 mb-0">Deploy proven solutions across every site, faster with each one.</h1>
        <p class="text-indigo-100 text-lg md:text-xl font-light mt-6 mb-0 max-w-lg max-md:mx-auto">
          Mission-critical problems need more than software. They need a solution that works on the equipment you already run and delivers a result you can measure. We build the first one with your team, prove it at one site, and deploy it to the rest.
        </p>
        <div class="flex flex-wrap gap-4 items-center mt-10 max-md:justify-center">
          <CtaBookDemo variant="highlight" position="hero" />
          <CtaLink destination="signUp" position="hero" class="flex items-center gap-1.5 text-white font-semibold uppercase hover:underline">
            Foundation Partnership
            <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
          </CtaLink>
        </div>
      </div>
      <div class="relative">
        <HomeHero class="w-full max-w-[680px] mx-auto" />
      </div>
    </div>
  </section>

  <!-- Logo strip: users count and customer logos, straight under the hero -->
  <section class="home-after-hero w-full px-6 pb-4">
    <div class="max-w-screen-lg mx-auto text-center">
      <SocialProof />
    </div>
  </section>

  <!-- 2. Results you can measure: picks up the hero's last promise -->
  <section class="home-band w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto">
      <div class="max-md:text-center">
        <p class="home-eyebrow text-red-500">Your outcomes</p>
        <h2 class="text-balance mt-4 mb-0 md:text-5xl">Every solution matches <br class="max-md:hidden"><span class="text-indigo-600">your business outcome.</span></h2>
        <p class="text-gray-600 text-lg font-light mt-6 mb-0 max-w-xl max-md:mx-auto">
          You set the outcome. We build the solution that delivers it.
        </p>
      </div>
      <div class="mt-14 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(67,56,202,0.12)] overflow-hidden">
        <NuxtLink
            v-for="(kpi, i) in SCORECARD"
            :key="kpi.name"
            :to="kpi.to"
            class="group relative flex flex-col p-7 md:p-8 border-gray-200 hover:no-underline hover:bg-indigo-50/40 transition-colors"
            :class="[
              i % 2 === 1 ? 'border-l' : '',
              i > 1 ? 'max-lg:border-t lg:border-l' : '',
            ]"
        >
          <div class="h-28 flex items-center justify-center rounded-xl bg-gradient-to-b from-indigo-50/70 to-transparent">
            <HomeIsoArt :scene="kpi.scene" class="max-h-[88px] w-auto max-w-[170px]" />
          </div>
          <p class="m-0 mt-6 text-center text-gray-900 text-xl md:text-2xl font-medium tracking-tight">{{ kpi.name }}</p>
          <p class="m-0 mt-2 text-center text-gray-500 text-[15px] leading-6 text-balance flex-grow">{{ kpi.text }}</p>
          <span class="mt-5 flex items-center justify-center gap-1 text-indigo-600 text-sm font-medium">
            <span class="group-hover:underline">{{ kpi.link }}</span>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- 3. One solution, every site: the problem, what FlowFuse is, then the Foundation
       Partnership as the answer. One section, so the page says it once. -->
  <section class="w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto">
      <p class="home-eyebrow text-red-500 max-md:text-center">One solution, every site</p>
      <h2 class="text-balance mt-4 md:text-5xl max-md:text-center max-w-3xl">Solve it at one plant. <span class="text-indigo-600">Run it at all of them.</span></h2>
      <!-- What FlowFuse is, in plain words, before the page explains how it works -->
      <p class="text-gray-600 text-lg font-light mt-6 mb-0 max-w-2xl max-md:text-center max-md:mx-auto">
        FlowFuse solves hard operational problems for manufacturers, asset operators and the companies that service industrial equipment, using an industrial application platform built on open-source <NuxtLink to="/node-red/" class="text-indigo-600 font-normal underline decoration-indigo-200 underline-offset-2 hover:decoration-indigo-600">Node-RED</NuxtLink>.
      </p>

      <div class="grid md:grid-cols-2 gap-5 mt-10">
        <div class="rounded-xl bg-white border border-indigo-100 p-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 m-0">Where it stalls today</p>
          <ul class="mt-4 mb-0 p-0 list-none flex flex-col gap-3">
            <li v-for="line in PROBLEM" :key="line" class="flex gap-3 items-start m-0 text-gray-600 font-light">
              <UIcon name="i-lucide-x" class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <span>{{ line }}</span>
            </li>
          </ul>
        </div>
        <div class="rounded-xl p-6 bg-gradient-to-br from-indigo-600 to-indigo-800">
          <p class="text-xs font-semibold uppercase tracking-wide text-indigo-200 m-0">With FlowFuse</p>
          <ul class="mt-4 mb-0 p-0 list-none flex flex-col gap-3">
            <li v-for="line in SOLUTION" :key="line" class="flex gap-3 items-start m-0 text-white">
              <UIcon name="i-lucide-check" class="w-5 h-5 text-red-300 shrink-0 mt-0.5" />
              <span>{{ line }}</span>
            </li>
          </ul>
        </div>
      </div>
      <NuxtLink to="/product/" class="inline-flex items-center gap-1.5 text-indigo-600 font-medium hover:underline mt-5 max-md:w-full max-md:justify-center">
        See the platform that runs it at every site
        <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
      </NuxtLink>

      <!-- The Foundation Partnership: how the first site makes every later one faster -->
      <div class="mt-20 pt-16 border-t border-indigo-100">
        <p class="home-eyebrow text-red-500 max-md:text-center">The Foundation Partnership</p>
        <h3 class="text-balance mt-4 mb-0 text-3xl md:text-4xl font-medium text-gray-800 max-md:text-center max-w-3xl">The first site builds the foundation. <span class="text-indigo-600">Every site after starts on it.</span></h3>
        <p class="text-gray-600 text-lg font-light mt-6 mb-0 max-w-2xl max-md:text-center max-md:mx-auto">
          FlowFuse engineers build your first solution alongside your team, on the equipment you already run. What they build is more than one project. It's the foundation every later site reuses, so each rollout has less left to build.
        </p>

        <div class="mt-12 rounded-2xl home-dark px-6 pt-10 pb-6 md:px-10">
          <HomeIsoArt scene="foundation" variant="dark" class="w-full" />
          <div class="relative h-12 mt-4">
            <div
                v-for="l in FOUNDATION_LABELS"
                :key="l.name"
                class="absolute top-0 -translate-x-1/2 text-center whitespace-nowrap"
                :style="{ left: `${l.at * 100}%` }"
            >
              <p class="m-0 text-white text-sm font-medium">{{ l.name }}</p>
              <p class="m-0 text-xs max-sm:hidden" :class="l.at === FOUNDATION_LABELS[0].at ? 'text-red-300' : 'text-indigo-200'">{{ l.note }}</p>
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 pt-4 border-t border-white/10 text-xs text-indigo-200">
            <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-sm border border-[#ff7b6b] bg-[#3b2546]" />Built new at this site</span>
            <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-sm border border-[#a5b4fc] bg-[#1c2650]" />Reused from the foundation</span>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          <NuxtLink
              v-for="f in FOUNDATION"
              :key="f.title"
              :to="f.to"
              class="group rounded-xl border border-indigo-100 bg-white p-6 hover:no-underline hover:border-indigo-300 transition-colors"
          >
            <UIcon :name="f.icon" class="w-6 h-6 text-indigo-500" />
            <p class="text-gray-800 font-medium mt-4 mb-0 flex items-center gap-1.5">
              <span class="group-hover:underline">{{ f.title }}</span>
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-indigo-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
            </p>
            <p class="text-gray-600 font-light text-sm leading-5 mt-2 mb-0">{{ f.text }}</p>
          </NuxtLink>
        </div>

        <!-- Mid-page, the reader is still learning: one "learn more", no sales ask -->
        <div class="flex mt-12 max-md:justify-center">
          <CtaLink destination="signUp" position="foundation-partnership" class="inline-flex items-center gap-1.5 text-indigo-600 font-medium hover:underline">
            How the Foundation Partnership works
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </CtaLink>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Metrics of success, then ways in by industry and team -->
  <section class="home-band w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto">
      <p class="home-eyebrow text-red-500 max-md:text-center">Results</p>
      <h2 class="text-balance mt-4 mb-12 md:text-5xl max-md:text-center">Measured on the line, <span class="text-indigo-600">not in a report.</span></h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <NuxtLink
            v-for="m in METRICS"
            :key="m.kind"
            :to="m.to"
            class="group flex flex-col rounded-xl bg-red-50/70 p-6 hover:no-underline hover:bg-red-50 transition-colors"
        >
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 m-0">{{ m.kind }}</p>
          <p class="text-4xl font-semibold text-red-500 mt-3 mb-0 whitespace-nowrap">{{ m.number }}</p>
          <p class="text-gray-700 font-light leading-6 mt-3 mb-0 flex-grow">{{ m.text }}</p>
          <span class="flex items-center gap-1.5 text-indigo-600 text-sm font-medium mt-5">
            <span class="group-hover:underline">{{ m.company }}</span>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </span>
        </NuxtLink>
      </div>
      <div class="mt-12 pt-8 border-t border-indigo-100 flex flex-col gap-4">
        <div v-for="group in EXPLORE" :key="group.label" class="flex flex-wrap items-baseline gap-x-5 gap-y-2 max-md:justify-center">
          <span class="text-xs font-semibold uppercase tracking-wide text-gray-500 w-28 shrink-0 max-md:w-full max-md:text-center">{{ group.label }}</span>
          <NuxtLink v-for="l in group.links" :key="l.to" :to="l.to" class="text-indigo-600 text-sm font-medium hover:underline">{{ l.name }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Social proof: customer quotes -->
  <section class="w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto">
      <p class="home-eyebrow text-red-500 max-md:text-center">Customers</p>
      <h2 class="text-balance mt-4 mb-10 md:text-5xl max-md:text-center">Real results from <span class="text-indigo-600">industrial teams</span></h2>
      <HomeTestimonials />
    </div>
  </section>

  <!-- 5b. Security -->
  <section class="home-band w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-14 items-center">
      <div class="max-md:text-center">
        <p class="home-eyebrow text-red-500">Security</p>
        <h2 class="text-balance mt-4 mb-0 md:text-5xl">Built for enterprise <span class="text-indigo-600">manufacturing.</span></h2>
        <p class="text-gray-600 text-lg font-light mt-6 mb-0 max-w-md max-md:mx-auto">
          FlowFuse is SOC 2 Type II certified, with the access controls and deployment options large manufacturers' security teams ask for.
        </p>
        <NuxtLink to="/platform/security/" class="inline-flex items-center gap-1.5 text-indigo-600 font-medium hover:underline mt-6">
          Security and compliance details
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
      <div class="grid sm:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] gap-5">
        <div class="rounded-xl border border-indigo-100 bg-white p-6 flex flex-col items-center justify-center text-center">
          <div class="w-32 h-32">
            <IconsSoc2BadgeIcon />
          </div>
          <p class="text-gray-800 font-medium mt-4 mb-0">SOC 2 Type II</p>
          <p class="text-gray-600 font-light text-sm mt-1 mb-0">Independently audited</p>
        </div>
        <div class="flex flex-col gap-5">
          <div v-for="item in SECURITY" :key="item.title" class="rounded-xl border border-indigo-100 bg-white px-5 py-4 flex gap-4 items-start">
            <UIcon :name="item.icon" class="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p class="text-gray-800 font-medium m-0">{{ item.title }}</p>
              <p class="text-gray-600 font-light text-sm leading-5 mt-1 mb-0">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="w-full px-6 pt-20">
    <div class="max-w-screen-lg mx-auto">
      <h2 class="mb-1 md:text-5xl max-md:text-center">Frequently asked <span class="text-indigo-600">questions</span></h2>
      <div class="-mt-20">
        <Faq :faq="FAQ" variant="page" />
      </div>
    </div>
  </section>

  <!-- 6. Call to action -->
  <section class="home-band w-full px-6 pt-16 pb-20 md:pb-24">
    <div class="home-cta max-w-screen-lg mx-auto rounded-2xl px-6 py-16 md:py-20 text-center">
     <div class="max-w-3xl mx-auto">
      <h2 class="text-balance text-white md:text-5xl mt-0">Bring us the problem that repeats across your sites.</h2>
      <p class="text-indigo-100 font-light text-lg md:text-xl mt-6 mb-0">We'll build the first one with you, prove it at one site, and roll it out to the rest on the same foundation.</p>
      <div class="flex flex-wrap gap-4 items-center justify-center mt-10">
        <CtaBookDemo variant="highlight" position="get-started" />
        <!-- Not ready to talk? A lighter next step than the one the page already offered twice -->
        <NuxtLink to="/resources/roi-calculator/" class="flex items-center gap-1.5 text-white font-medium hover:underline">
          Estimate your ROI first
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
/* Page rhythm: the hero is the only dark section. The strip under it picks up the
   hero's indigo and lets it go to white, and the closing call to action is a card in the
   hero's colours on the light page, rather than a second full-width dark band.
   Below the strip, sections alternate white and .home-band, so the light middle of the
   page never runs white for long. */
.home-band {
  background-color: #f5f7ff;
  background-image:
    linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center top;
  border-top: 1px solid #e0e7ff;
  border-bottom: 1px solid #e0e7ff;
}
.home-after-hero {
  background: linear-gradient(to bottom, #eef2ff 0%, #ffffff 100%);
}
.home-cta {
  background:
    radial-gradient(ellipse 60% 70% at 75% 45%, rgba(99, 102, 241, 0.22), transparent 70%),
    #0c1330;
}
.home-dark {
  background:
    radial-gradient(ellipse 60% 70% at 75% 45%, rgba(99, 102, 241, 0.22), transparent 70%),
    #0c1330;
}
.home-eyebrow {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
