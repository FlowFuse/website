<script setup lang="ts">
// The platform page: FlowFuse as the foundation every solution we build runs on, not a feature
// list. The structure follows tulip.co/platform (a layered hero diagram, four building blocks,
// a "built to compound" band, proof); it stays high level and links out to the pages that go
// into the detail. The solutions are the point; the platform is why they ship fast, stay
// governed and get reused at the next plant.
//
// Copy rules (as on the solution pages): AI proposes, a person approves; no outcome numbers of
// our own; Edge, Hub and Fleet keep their names and read as where the platform runs.
useSeoMeta({
    title: 'The Platform Behind Every Solution | FlowFuse',
    description: 'Every FlowFuse solution runs on one governed platform: connected to your machines, built and changed with AI your team approves, and reused at every plant.',
    ogUrl: 'https://flowfuse.com/product/',
    twitterSite: '@FlowFuseinc',
})

const capture = useCapture()

// The three solution tracks and the solutions under each, as in the solution examples sheet
// (tracks A, B and C; the letters stay internal). Solution names use the sheet's SEO terms.
// Only Production Performance has a page so far; the other two link to a conversation.
const TRACKS = [
    {
        key: 'production-performance',
        icon: 'i-lucide-gauge',
        name: 'Production Performance',
        description: 'Find the losses that keep lines and machines short of target, and fix the biggest one first.',
        solutions: ['Production Line Monitoring', 'CNC Machine Monitoring'],
        to: '/use-cases/production-line-monitoring/',
    },
    {
        key: 'operations-control',
        icon: 'i-lucide-scan-eye',
        name: 'Intelligent Operations & Control',
        description: 'Turn what you detect into an approved response at the line or the well, not a report.',
        solutions: ['Visual Quality Inspection', 'Well Production Optimization'],
    },
    {
        key: 'remote-operations',
        icon: 'i-lucide-radio-tower',
        name: 'Remote Equipment & Service Operations',
        description: 'Catch failing assets before they stop production, and fix remote sites without a wasted visit.',
        solutions: ['Predictive Maintenance', 'Remote Energy Monitoring'],
    },
]

// The hero diagram, top to bottom: the solution tracks, the AI that works on them, the
// platform they run on, and the equipment underneath.
const HERO_PLATFORM = [
    { icon: 'i-lucide-cable', label: 'Connect' },
    { icon: 'i-lucide-layout-dashboard', label: 'Build' },
    { icon: 'i-lucide-shield-check', label: 'Govern' },
    { icon: 'i-lucide-factory', label: 'Deploy' },
]
const HERO_EQUIPMENT = ['PLCs', 'Sensors', 'Historians', 'MES', 'ERP']

const BLOCKS = [
    {
        icon: 'i-lucide-cable',
        eyebrow: 'Connect',
        title: 'Reaches any machine',
        description: 'OPC UA, Modbus, EtherNet/IP, MQTT and 5,000+ Node-RED nodes. It works with the equipment and systems you already run, old and new.',
        to: '/integrations/',
        linkText: 'See the integrations',
    },
    {
        icon: 'i-lucide-layout-dashboard',
        eyebrow: 'Build',
        title: 'Apps your team can change',
        description: 'Low-code flows, dashboards and ready-made blueprints. Your engineers change a solution in minutes, without waiting on a project.',
        to: '/platform/dashboard/',
        linkText: 'See the dashboards',
    },
    {
        icon: 'i-lucide-sparkles',
        eyebrow: 'AI',
        title: 'AI that does the work',
        description: 'FlowFuse AI builds the change and ships it to every site. A person approves, edits or rejects each change before it reaches a machine.',
        to: '/ai/',
        linkText: 'How FlowFuse AI works',
    },
    {
        icon: 'i-lucide-shield-check',
        eyebrow: 'Govern',
        title: 'Control you can audit',
        description: 'Role-based access, an audit log of every change, snapshots and one-click rollback. Your security team sees who changed what, and when.',
        to: '/platform/security/',
        linkText: 'See how it is governed',
    },
]

const COMPOUND = [
    { icon: 'i-lucide-target', title: 'Start with one problem', description: 'One line, one loss worth fixing. Not a year-long transformation programme.' },
    { icon: 'i-lucide-layers', title: 'Build on a foundation', description: 'Connections, data model, approvals and AI are set up once and stay in place.' },
    { icon: 'i-lucide-copy', title: 'Reuse it at every plant', description: 'Ship the same solution to the next line and the next site, governed and in sync.' },
    { icon: 'i-lucide-trending-up', title: 'Each one makes the next faster', description: 'Every new solution starts on what is already there, not from a blank page.' },
]

// Edge, Hub and Fleet are the three places the platform runs, not three platforms.
const PLACES = [
    {
        id: 'edge',
        label: 'FlowFuse Edge',
        where: 'At the site',
        description: 'Runs on the plant floor, next to the PLCs and machines it connects.',
        image: { src: '/images/home/home-scada.png', alt: 'FlowFuse Edge: a dashboard running on the plant floor' },
    },
    {
        id: 'hub',
        label: 'FlowFuse Hub',
        where: 'In the data centre',
        description: 'Joins plant data to ERP, MES and the rest of the business.',
        image: { src: '/images/product/hub.jpg', alt: 'FlowFuse Hub: plant data integrated with business systems' },
    },
    {
        id: 'fleet',
        label: 'FlowFuse Fleet',
        where: 'In the field',
        description: 'Updates and rolls back thousands of remote devices from one place.',
        image: { src: '/images/product/fleet.jpg', alt: 'FlowFuse Fleet: managing remote devices from one console' },
    },
]

const YOURS = [
    { icon: 'i-lucide-git-branch', title: 'Open source at the core', description: 'Apache-2.0, built on Node-RED.' },
    { icon: 'i-lucide-server', title: 'Run it where you want', description: 'FlowFuse Cloud, self-hosted or air-gapped.' },
    { icon: 'i-lucide-plug', title: 'Bring your own AI', description: 'Connect your own agents over MCP.' },
    { icon: 'i-lucide-package-x', title: 'No hardware to sell you', description: 'It works with the equipment you have.' },
]
</script>

<template>
  <div class="w-full product-page">
    <!-- Hero: what the platform is for, and a picture of the layers -->
    <section class="w-full px-6 pt-16 pb-20 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 text-white">
      <div class="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left">
          <div class="text-sm font-semibold uppercase tracking-widest text-indigo-200">The FlowFuse Platform</div>
          <h1 class="mt-4 text-4xl md:text-5xl font-medium text-white">One platform under <span class="text-red-300">every solution</span></h1>
          <p class="mt-6 text-lg text-indigo-100 max-w-xl mx-auto lg:mx-0">
            Every solution we build with you runs on FlowFuse. Connected to your machines. Changed by AI your team approves. Ready to reuse at the next plant.
          </p>
          <div class="mt-8 flex flex-row flex-wrap gap-4 items-center justify-center lg:justify-start">
            <CtaBookDemo variant="highlight" position="hero" />
            <NuxtLink
                to="#solutions"
                class="inline-flex items-center gap-1 font-semibold text-white hover:underline"
                @click="capture('cta-learn-more', { position: 'hero-solutions' })"
            >
              See the solutions
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>

        <div
            class="rounded-xl border border-white/15 bg-white/5 p-5 flex flex-col gap-3"
            role="img"
            aria-label="The FlowFuse platform in layers: three solution tracks sit on top (Production Performance, Intelligent Operations and Control, and Remote Equipment and Service Operations); FlowFuse AI proposes changes that people approve; the platform connects, builds, governs and deploys; underneath are the PLCs, sensors, historians, MES and ERP you already run."
        >
          <div class="text-[11px] font-semibold uppercase tracking-widest text-indigo-200">Solutions</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div v-for="track in TRACKS" :key="track.key" class="rounded-md bg-white text-indigo-900 px-3 py-2.5">
              <div class="text-xs font-semibold leading-snug">{{ track.name }}</div>
              <ul class="list-none p-0 m-0 mt-1.5">
                <li v-for="solution in track.solutions" :key="solution" class="m-0 text-[11px] leading-snug text-gray-500">{{ solution }}</li>
              </ul>
            </div>
          </div>

          <div class="rounded-md bg-red-500/90 text-white text-sm px-3 py-2.5 flex items-center justify-center gap-2">
            <UIcon name="i-lucide-sparkles" class="w-4 h-4 shrink-0" />
            <span><span class="font-semibold">FlowFuse AI</span> builds the change. You approve it.</span>
          </div>

          <div class="rounded-md bg-indigo-600 px-3 py-3">
            <div class="text-[11px] font-semibold uppercase tracking-widest text-indigo-100 text-center mb-2">The FlowFuse platform</div>
            <div class="grid grid-cols-4 gap-2">
              <div v-for="item in HERO_PLATFORM" :key="item.label" class="rounded bg-white/10 border border-white/20 py-2 flex flex-col items-center gap-1 text-xs">
                <UIcon :name="item.icon" class="w-4 h-4 text-indigo-100" />
                {{ item.label }}
              </div>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-2 pt-1">
            <span v-for="item in HERO_EQUIPMENT" :key="item" class="rounded-full border border-white/25 text-indigo-100 text-xs px-3 py-1">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- The solutions the platform is for -->
    <section id="solutions" class="w-full px-6 pt-20 pb-4 scroll-mt-16">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-md:text-center">What we build <span class="text-indigo-600">on FlowFuse</span></h2>
        <p class="mt-4 text-gray-600 max-w-2xl max-md:text-center max-md:mx-auto">
          Three areas we solve with you. Each solution starts from one problem on one line, and every one runs on the same platform.
        </p>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="track in TRACKS" :key="track.key" class="rounded-lg border-2 border-indigo-100 bg-indigo-50/40 p-6 flex flex-col">
            <span class="w-11 h-11 rounded-md bg-indigo-600 text-white flex items-center justify-center">
              <UIcon :name="track.icon" class="w-6 h-6" />
            </span>
            <h3 class="mt-4 mb-0 text-xl text-gray-800">{{ track.name }}</h3>
            <p class="mt-2 mb-0 text-gray-600">{{ track.description }}</p>
            <ul class="list-none p-0 m-0 mt-5 flex-1 flex flex-col gap-2">
              <li v-for="solution in track.solutions" :key="solution" class="m-0 flex items-center gap-2 text-sm font-medium text-gray-700">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-indigo-600 shrink-0" />
                {{ solution }}
              </li>
            </ul>
            <NuxtLink
                v-if="track.to"
                :to="track.to"
                class="mt-6 inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline"
                @click="capture('cta-learn-more', { position: `platform-track-${track.key}` })"
            >
              Explore {{ track.name }}
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </NuxtLink>
            <CtaLink v-else destination="bookDemo" :position="`platform-track-${track.key}`" class="mt-6 inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline">
              Talk to us about this
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>

    <!-- The four building blocks -->
    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-md:text-center">Four building blocks. <span class="text-indigo-600">Every solution uses them.</span></h2>
        <p class="mt-4 text-gray-600 max-w-2xl max-md:text-center max-md:mx-auto">
          You don't buy a pile of features. You get a solution that works, on a platform that keeps it working.
        </p>
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="block in BLOCKS" :key="block.eyebrow" class="rounded-lg border border-gray-200 p-6 flex flex-col">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <UIcon :name="block.icon" class="w-5 h-5" />
              </span>
              <span class="text-sm font-semibold uppercase tracking-wide text-red-400">{{ block.eyebrow }}</span>
            </div>
            <h3 class="mt-4 mb-0 text-2xl text-gray-800">{{ block.title }}</h3>
            <p class="mt-3 mb-0 text-gray-600 flex-1">{{ block.description }}</p>
            <NuxtLink
                :to="block.to"
                class="mt-5 inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline"
                @click="capture('cta-learn-more', { position: `platform-${block.eyebrow.toLowerCase()}` })"
            >
              {{ block.linkText }}
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Built once, reused everywhere -->
    <section class="w-full px-6 py-20 bg-indigo-50/50 border-y border-indigo-100">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-md:text-center">Built once. <span class="text-indigo-600">Reused at every plant.</span></h2>
        <p class="mt-4 text-gray-600 max-w-2xl max-md:text-center max-md:mx-auto">
          The first solution is the hardest one. Everything under it stays in place, so plant two takes days, not a new project.
        </p>
        <ol class="list-none p-0 m-0 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <li v-for="(step, i) in COMPOUND" :key="step.title" class="m-0 rounded-lg bg-white border border-indigo-100 p-6">
            <div class="flex items-center justify-between">
              <UIcon :name="step.icon" class="w-6 h-6 text-indigo-600" />
              <span class="text-sm font-semibold text-indigo-300">0{{ i + 1 }}</span>
            </div>
            <h3 class="mt-4 mb-0 text-lg text-gray-800">{{ step.title }}</h3>
            <p class="mt-2 mb-0 text-sm text-gray-600">{{ step.description }}</p>
          </li>
        </ol>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 items-center max-md:justify-center">
          <p class="m-0 text-gray-700">Our engineers build the first one with your team.</p>
          <CtaSignUp variant="primary" position="platform-compound" icon="i-lucide-arrow-right" />
        </div>
      </div>
    </section>

    <!-- Where it runs: Edge, Hub and Fleet -->
    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-md:text-center">Govern centrally. <span class="text-indigo-600">Run wherever the work is.</span></h2>
        <p class="mt-4 text-gray-600 max-w-2xl max-md:text-center max-md:mx-auto">
          One platform in three places, with the same approvals, access control and audit log in each.
        </p>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
              v-for="place in PLACES"
              :key="place.id"
              :to="`/product/${place.id}/`"
              class="group rounded-lg border border-gray-200 overflow-hidden flex flex-col no-underline hover:no-underline hover:border-indigo-300 transition-colors"
              @click="capture('cta-learn-more', { position: `features-${place.id}` })"
          >
            <div class="aspect-[16/10] overflow-hidden bg-gray-50">
              <img :src="place.image.src" :alt="place.image.alt" class="block w-full h-full object-cover" loading="lazy">
            </div>
            <div class="p-6 flex flex-col flex-1">
              <div class="text-sm font-semibold uppercase tracking-wide text-red-400">{{ place.where }}</div>
              <h3 class="mt-2 mb-0 text-xl text-gray-800">{{ place.label }}</h3>
              <p class="mt-2 mb-0 text-gray-600 flex-1">{{ place.description }}</p>
              <span class="mt-4 inline-flex items-center gap-1 font-medium text-indigo-600 group-hover:underline">
                Learn more
                <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <EnterpriseSecurity />

    <!-- Independence: rung four of the ladder, after the trust block -->
    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-md:text-center">Still yours <span class="text-indigo-600">in ten years</span></h2>
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="item in YOURS" :key="item.title" class="max-sm:text-center">
            <UIcon :name="item.icon" class="w-6 h-6 text-indigo-600" />
            <h3 class="mt-3 mb-0 text-lg text-gray-800">{{ item.title }}</h3>
            <p class="mt-1 mb-0 text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Proof -->
    <section class="w-full px-6 pb-8">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-8 max-md:text-center">From one line <span class="text-indigo-600">to every plant</span></h2>
        <TestimonialCarousel hide-read-more browse-all-url="/customer-stories/" browse-all-text="Browse all customer stories" />
      </div>
    </section>

    <div class="w-full px-6">
      <div class="max-w-screen-lg mx-auto py-20">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-4xl sm:text-5xl font-medium m-0">Start with one problem</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Tell us the loss that costs you most. We'll show you what the first solution looks like on your equipment.</p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="get-started" />
            <CtaPricing variant="ghost" color="white" position="get-started" icon="i-lucide-arrow-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
