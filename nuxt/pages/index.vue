<script setup lang="ts">
// The homepage, written for director-level buyers. Six parts, in this order:
//   1. Value statement (hero, with the wireframe plant)
//   2. Choose where to start: four team entry points, one per /teams/ page
//   3. Problem to solution: one plant proven, every site running it
//   4. Metrics of success: customer results, each linked to its story
//   5. Social proof: logos, testimonials, security credentials
//   6. Call to action
//
// The illustrations are isometric wireframes generated in nuxt/lib/home-iso-scenes.ts
// and rendered by <HomeIsoArt>, in place of stock photography.

const START_POINTS = [
    {
        scene: 'operations',
        team: 'Operations',
        title: 'Every plant on plan',
        text: 'See output, downtime and quality live at every plant, and roll out what works.',
        to: '/teams/manufacturing-operations/',
    },
    {
        scene: 'maintenance',
        team: 'Maintenance & reliability',
        title: 'Fewer surprise stops',
        text: 'Catch failures before they stop the line. Send technicians with the diagnosis in hand.',
        to: '/teams/maintenance-reliability/',
    },
    {
        scene: 'automation',
        team: 'Automation & controls',
        title: 'One standard, every change on record',
        text: 'Run approved logic across mixed controllers and sites, tested and versioned.',
        to: '/teams/automation-controls/',
    },
    {
        scene: 'digital',
        team: 'Digital transformation',
        title: 'From pilot to every plant',
        text: 'Turn one working pilot into the standard every site runs.',
        to: '/teams/digital-transformation/',
    },
] as const

const PROBLEM = [
    'A fix that works at one plant stays at that plant.',
    'Every new site starts as a new project.',
    'Improvements depend on whoever built them.',
]

const SOLUTION = [
    'A solution is proven once and deployed everywhere.',
    'Each deployment goes faster than the last.',
    'Your team owns the solution and pushes improvements to every site.',
]

const STEPS = [
    { name: 'Define', text: 'We agree the problem and the number it moves.' },
    { name: 'Design', text: 'Our engineers build it with your team, on your equipment.' },
    { name: 'Deliver', text: 'It runs at one site, then every site.' },
]

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
          <CtaSignUp variant="ghost" color="white" position="hero" icon="i-lucide-arrow-right" />
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

  <!-- 2. Choose where to start -->
  <section class="w-full px-6 py-20 md:py-24">
    <div class="max-w-screen-lg mx-auto">
      <p class="home-eyebrow text-red-500 max-md:text-center">Choose where to start</p>
      <h2 class="text-balance mt-4 mb-12 md:text-5xl max-md:text-center">Start with the result <span class="text-indigo-600">you're measured on.</span></h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <NuxtLink
            v-for="item in START_POINTS"
            :key="item.to"
            :to="item.to"
            class="home-start group flex flex-col rounded-xl border border-indigo-100 bg-white p-6 hover:no-underline hover:border-indigo-300 transition-colors"
        >
          <div class="h-24 flex items-center justify-center mb-6">
            <HomeIsoArt :scene="item.scene" class="max-h-24 w-auto max-w-[150px]" />
          </div>
          <p class="text-xs font-semibold uppercase tracking-wide text-indigo-500 m-0">{{ item.team }}</p>
          <p class="text-gray-800 text-lg font-medium leading-6 mt-2 mb-0">{{ item.title }}</p>
          <p class="text-gray-600 font-light text-sm leading-5 mt-3 mb-0 flex-grow">{{ item.text }}</p>
          <span class="flex items-center gap-1.5 text-indigo-600 text-sm font-medium mt-6">
            <span class="group-hover:underline">Start here</span>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </NuxtLink>
      </div>
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

      <div class="grid sm:grid-cols-3 gap-6 mt-14 pt-10 border-t border-indigo-200/70">
        <div v-for="(step, i) in STEPS" :key="step.name" class="max-sm:text-center">
          <p class="m-0 text-indigo-600 text-2xl font-medium"><span class="text-red-400 text-base font-semibold mr-2">0{{ i + 1 }}</span>{{ step.name }}</p>
          <p class="m-0 mt-2 text-gray-600 font-light">{{ step.text }}</p>
        </div>
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
  <section class="w-full px-6 pt-4 pb-20 bg-radial-indigo-small">
    <div class="max-w-screen-lg mx-auto">
      <div class="text-center">
        <SocialProof />
      </div>
      <div class="mt-16">
        <h2 class="text-balance md:text-5xl">Real results from <span class="text-indigo-600">industrial teams</span></h2>
        <TestimonialCarousel hide-read-more browse-all-url="/customer-stories/" browse-all-text="Browse all customer stories" />
      </div>
      <div class="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4">
        <span v-for="t in TRUST" :key="t.label" class="flex items-center gap-2 text-gray-600 text-sm">
          <UIcon :name="t.icon" class="w-5 h-5 text-indigo-500" />
          {{ t.label }}
        </span>
        <NuxtLink to="/platform/security/" class="flex items-center gap-1 text-indigo-600 text-sm font-medium">
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
      <p class="text-indigo-100 font-light text-lg md:text-xl mt-6 mb-0">We'll build the first one with you, prove it at one site, and roll it out to the rest.</p>
      <div class="flex flex-wrap gap-4 items-center justify-center mt-10">
        <CtaBookDemo variant="highlight" position="get-started" />
        <NuxtLink to="/professional-services/" class="flex items-center gap-1.5 text-white font-medium hover:underline">
          How we work with you
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
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
