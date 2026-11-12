<script setup lang="ts">
// The homepage, written for director-level buyers. Six parts, in this order:
//   1. Value statement (hero, with the wireframe plant)
//   2. Results you can measure: the scorecard numbers a first solution moves
//   3. Problem to solution: one plant proven, every site running it
//   3b. The Foundation Partnership: why each site is faster than the last
//   4. Metrics of success: customer results, each linked to its story
//   (logo strip with the user count sits straight under the hero)
//   5. Social proof: testimonials, security credentials
//   6. Call to action
//
// The illustrations are isometric wireframes generated in nuxt/lib/home-iso-scenes.ts
// and rendered by <HomeIsoArt>, in place of stock photography.
//
// The page sells one idea: each site is faster than the last, and the Foundation
// Partnership is what makes it so. Every secondary link leads to /build-with-us/
// (the partnership page) through CtaLink, so clicks still count as the signUp CTA.
import { foundationSiteCenters } from '../lib/home-iso-scenes'

// The scorecard plant and operations leaders already report against (Quality, Delivery,
// Cost), plus Uptime for maintenance. Under each word, one line that sees the problem and
// acts on it: these are solutions that do something, not dashboards. The next section carries "every plant", so this one stays off it.
const SCORECARD = [
    { scene: 'quality', name: 'Quality', text: 'Stop bad parts at the station, not at the end of the line.' },
    { scene: 'delivery', name: 'Delivery', text: 'Spot a slipping order while there’s still time to save it.' },
    { scene: 'cost', name: 'Cost', text: 'Find your costliest stops and fix them first.' },
    { scene: 'uptime', name: 'Uptime', text: 'Turn early warnings into work orders before a machine fails.' },
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
const FOUNDATION = [
    { icon: 'i-lucide-plug', title: 'Integrations', text: 'Connections to your machines, historians and business systems. Built at the first site, reused at the next.' },
    { icon: 'i-lucide-database', title: 'Data models', text: 'One structure for your operational data, so every plant speaks the same language.' },
    { icon: 'i-lucide-rocket', title: 'Deployment patterns', text: 'A tested way to roll the solution out to new lines and plants without starting over.' },
    { icon: 'i-lucide-shield-check', title: 'Governance', text: 'Roles, access and change control, set up once and applied everywhere.' },
]

const STEPS = [
    { name: 'Define', text: 'We agree the problem and the number it has to move.' },
    { name: 'Design', text: 'Our engineers build the first solution with your team, on your equipment, and lay the foundation as they go.' },
    { name: 'Deliver', text: 'Prove it at one site, then roll it out on the same foundation, with your team, a partner or ours.' },
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

const TRUST = [
    { icon: 'i-lucide-shield-check', label: 'SOC 2 Type II' },
    { icon: 'i-lucide-key-round', label: 'Single sign-on' },
    { icon: 'i-lucide-users', label: 'Role-based access' },
    { icon: 'i-lucide-scroll-text', label: 'Audit logs' },
    { icon: 'i-lucide-server', label: 'Self-hosted or air-gapped' },
]

useSeoMeta({
    title: 'Deploy proven solutions across every site',
    description: 'FlowFuse builds the first solution with your team on the equipment you already run, proves it at one site, and deploys it to the rest, faster with each one.',
    ogDescription: 'FlowFuse builds the first solution with your team on the equipment you already run, proves it at one site, and deploys it to the rest, faster with each one.',
    keywords: 'Industrial Solutions, Node-RED, Industrial Applications, IIoT, Multi-site Manufacturing, Edge, Industrial Automation, Industry 4.0',
    ogUrl: 'https://flowfuse.com/',
    twitterSite: '@FlowFuseinc',
})
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
        <HomeIsoArt scene="hero" variant="dark" class="w-full max-w-[680px] mx-auto" />
        <div class="home-chip absolute left-2 bottom-2 md:left-0 md:bottom-6">
          <UIcon name="i-lucide-circle-check" class="w-5 h-5 text-emerald-300 shrink-0" />
          <div class="text-left">
            <p class="m-0 text-white text-sm font-medium leading-5">Proven at site 1</p>
            <p class="m-0 text-indigo-200 text-xs leading-4">Deploying to every site</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Logo strip: users count and customer logos, straight under the hero -->
  <section class="w-full px-6 pb-4 border-b border-gray-100">
    <div class="max-w-screen-lg mx-auto text-center">
      <SocialProof />
    </div>
  </section>

  <!-- 2. Results you can measure: picks up the hero's last promise -->
  <section class="w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto">
      <div class="max-md:text-center">
        <p class="home-eyebrow text-red-500">Results you can measure</p>
        <h2 class="text-balance mt-4 mb-0 md:text-5xl">Every solution starts with <br class="max-md:hidden"><span class="text-indigo-600">a number on your scorecard.</span></h2>
        <p class="text-gray-600 text-lg font-light mt-6 mb-0 max-w-xl max-md:mx-auto">
          We agree the number first, then build the solution that moves it.
        </p>
      </div>
      <div class="mt-14 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(67,56,202,0.12)] overflow-hidden">
        <div
            v-for="(kpi, i) in SCORECARD"
            :key="kpi.name"
            class="relative p-7 md:p-8 border-gray-200"
            :class="[
              i % 2 === 1 ? 'border-l' : '',
              i > 1 ? 'max-lg:border-t lg:border-l' : '',
            ]"
        >
          <div class="h-28 flex items-center justify-center rounded-xl bg-gradient-to-b from-indigo-50/70 to-transparent">
            <HomeIsoArt :scene="kpi.scene" class="max-h-[88px] w-auto max-w-[170px]" />
          </div>
          <p class="m-0 mt-6 text-center text-gray-900 text-xl md:text-2xl font-medium tracking-tight">{{ kpi.name }}</p>
          <p class="m-0 mt-2 text-center text-gray-500 text-[15px] leading-6 text-balance">{{ kpi.text }}</p>
        </div>
      </div>
      <p class="m-0 mt-8 text-center text-gray-500">Measured on something else? <span class="text-gray-800 font-medium">We start there too.</span></p>
    </div>
  </section>

  <!-- 3. Problem to solution -->
  <section class="w-full px-6 py-20 md:py-24 bg-gradient-to-br from-indigo-50 to-red-50/60">
    <div class="max-w-screen-lg mx-auto">
      <p class="home-eyebrow text-red-500 max-md:text-center">One solution, every site</p>
      <h2 class="text-balance mt-4 md:text-5xl max-md:text-center max-w-3xl">Solve it at one plant. <span class="text-indigo-600">Run it at all of them.</span></h2>

      <div class="grid md:grid-cols-2 gap-10 items-center mt-12">
        <HomeIsoArt scene="sites" class="w-full max-w-[460px] mx-auto" />
        <div class="flex flex-col gap-4">
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
      </div>

    </div>
  </section>

  <!-- 3b. The Foundation Partnership -->
  <section class="w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto">
      <p class="home-eyebrow text-red-500 max-md:text-center">The Foundation Partnership</p>
      <h2 class="text-balance mt-4 md:text-5xl max-md:text-center max-w-3xl">The first site builds the foundation. <span class="text-indigo-600">Every site after starts on it.</span></h2>
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
        <div v-for="f in FOUNDATION" :key="f.title" class="rounded-xl border border-indigo-100 bg-white p-6">
          <UIcon :name="f.icon" class="w-6 h-6 text-indigo-500" />
          <p class="text-gray-800 font-medium mt-4 mb-0">{{ f.title }}</p>
          <p class="text-gray-600 font-light text-sm leading-5 mt-2 mb-0">{{ f.text }}</p>
        </div>
      </div>

      <div class="grid sm:grid-cols-3 gap-6 mt-14 pt-10 border-t border-indigo-100">
        <div v-for="(step, i) in STEPS" :key="step.name" class="max-sm:text-center">
          <p class="m-0 text-indigo-600 text-2xl font-medium"><span class="text-red-400 text-base font-semibold mr-2">0{{ i + 1 }}</span>{{ step.name }}</p>
          <p class="m-0 mt-2 text-gray-600 font-light">{{ step.text }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 items-center mt-12 max-md:justify-center">
        <CtaBookDemo variant="primary" position="foundation-partnership" />
        <CtaLink destination="signUp" position="foundation-partnership" class="flex items-center gap-1.5 text-indigo-600 font-medium hover:underline">
          How the Foundation Partnership works
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </CtaLink>
      </div>
    </div>
  </section>

  <!-- 4. Metrics of success -->
  <section class="w-full px-6 py-20 md:py-24">
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
    </div>
  </section>

  <!-- 5. Social proof -->
  <section class="home-dark w-full px-6 pt-16 pb-20">
    <div class="max-w-screen-lg mx-auto">
      <div class="mt-4">
        <h2 class="text-balance text-white md:text-5xl">Real results from <span class="text-indigo-300">industrial teams</span></h2>
        <TestimonialCarousel dark hide-read-more browse-all-url="/customer-stories/" browse-all-text="Browse all customer stories" />
      </div>
      <div class="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4">
        <span v-for="t in TRUST" :key="t.label" class="flex items-center gap-2 text-indigo-100 text-sm">
          <UIcon :name="t.icon" class="w-5 h-5 text-indigo-300" />
          {{ t.label }}
        </span>
        <NuxtLink to="/platform/security/" class="flex items-center gap-1 text-white text-sm font-medium hover:underline">
          Security details
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- 6. Call to action -->
  <section class="home-dark w-full px-6 py-20 md:py-24 text-center">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-balance text-white md:text-5xl mt-0">Bring us the problem that repeats across your sites.</h2>
      <p class="text-indigo-100 font-light text-lg md:text-xl mt-6 mb-0">We'll build the first one with you, prove it at one site, and roll it out to the rest on the same foundation.</p>
      <div class="flex flex-wrap gap-4 items-center justify-center mt-10">
        <CtaBookDemo variant="highlight" position="get-started" />
        <CtaLink destination="signUp" position="get-started" class="flex items-center gap-1.5 text-white font-medium hover:underline">
          How the Foundation Partnership works
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </CtaLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
.home-chip {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.875rem;
  border-radius: 0.75rem;
  background: #1b2452;
  border: 1px solid #3c4a8a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}
</style>
