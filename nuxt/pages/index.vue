<script setup lang="ts">
// Ported from src/index.njk (11ty), which this replaces. Same page, same copy, same
// classes from src/css/style.css. This is the last 11ty-rendered route on the site.
//
// What the port changes on purpose:
//  - The hero's cross-fading background becomes <HomeHeroSlides>, which replaces an
//    inline script that queried the DOM and ran two timers with no teardown.
//  - testimonials.njk becomes <TestimonialCarousel>, explore-more-content.njk becomes
//    <ExploreMoreContent> (renamed from ThankYouExploreMore, since this page renders it
//    too), social-proof.njk becomes <SocialProof> and faq.njk becomes <BlogFaq>.
//  - cta-get-started.njk was a four-line partial reading a `cta` object the caller set;
//    it is the markup at the foot of this page.
//  - site.messaging.heroTagLine and .subtitle came from src/_data/site.json, which Nuxt
//    still imports for its own config. They are literals here, so the page reads as the
//    page.
const capture = useCapture()

const METRICS = [
    { number: '50%', text: 'Reduction in scrap rate with real-time operational monitoring' },
    { number: '10x', text: 'Faster from idea to deployed operational application with FlowFuse Expert' },
    { number: '20+', text: 'Manufacturing sites standardized from a single platform without rebuilding' },
]

const PROBLEMS = [
    { svgPath: 'arrow-path', title: 'Every solution starts from scratch', description: 'Operational logic stays local. The same problem gets solved differently at every site, by every team, every time.' },
    { svgPath: 'link-slash', title: "Your core systems don't cover everything", description: 'MES, ERP, and SCADA solve standard problems well. The workflows in the gaps (quality gates, shift handovers, custom validation) fall back to custom code and manual workarounds.' },
    { svgPath: 'building-office-2', title: "What works on one line won't scale to fifty", description: 'A working solution on one machine requires rebuilding from scratch for the next site. There is no system to standardize, deploy, and govern what works' },
]

const CAPABILITIES = [
    {
        capability: "Build operational workflows your core systems can't",
        feature: 'Low-code development with FlowFuse Expert',
        description: 'Create the operational applications that MES, ERP, and SCADA platforms struggle to support natively, from quality validation and workforce assignment to shift handovers and production visibility. Describe what you need in plain language and FlowFuse Expert generates the starting logic directly in your workspace.',
        imagePath: '/images/home/home-node-red.png',
        imageAlt: 'FlowFuse UI',
        linkText: 'Learn more about FlowFuse Expert',
        linkHref: '/ai/',
    },
    {
        capability: 'Standardize proven workflows across every site',
        feature: 'Device Agent and DevOps Pipelines',
        description: 'Turn a successful workflow on one machine or line into a repeatable operational standard across plants. Roll out updates with version control, staged deployments, and centrally managed industrial devices. No more rebuilding from scratch for every site, or leaving improvements siloed in one location.',
        imagePath: '/images/home/home-pipeline.png',
        imageAlt: 'FlowFuse flow editor',
        linkText: 'See how device management works',
        linkHref: '/platform/device-agent/',
    },
    {
        capability: 'Connect shop floor events to enterprise systems',
        feature: 'Flow-based IT/OT connectivity',
        description: 'Move production events, work orders, alarms, and operational data securely between PLCs, edge devices, MES, ERP, cloud platforms, and operator interfaces, without brittle point-to-point integrations or exposing inbound firewall ports.',
        imagePath: '/images/home/home-dashboard.png',
        imageAlt: 'FlowFuse Dashboard',
        linkText: 'Explore production monitoring',
        linkHref: '/use-cases/production-monitoring/',
    },
]

const OPERATIONAL_SYSTEM = [
    {
        title: 'PRODUCTION & OPERATIONS',
        items: [
            { name: 'Production Monitoring', url: '/use-cases/production-monitoring/', description: 'OEE tracking across lines, shifts, and plants.' },
            { name: 'Continuous Improvement', description: 'Digital CI workflow from suggestion to closure.' },
        ],
    },
    {
        title: 'OPERATIONAL WORKFLOWS',
        items: [
            { name: 'Workforce Assignment', description: 'Dynamic operator allocation using training, ergonomics, and demand data.' },
            { name: 'Shop Floor Communication', url: '/use-cases/shop-floor-communication/', description: 'Real-time alerts, escalation, and cross-site coordination.' },
        ],
    },
    {
        title: 'SYSTEM EXTENSIONS',
        items: [
            { name: 'Quality Validation', description: 'Inline inspection and QA checks outside the core system.' },
            { name: 'Track & Trace', description: 'Part, component, and batch traceability across the plant.' },
        ],
    },
    {
        title: 'OPERATIONAL INFRASTRUCTURE',
        items: [
            { name: 'Equipment Monitoring', description: 'PLC and device health monitoring across controller types.' },
            { name: 'Operational Data Pipelines', description: 'Structured controller data flows, diagnostics, and routing.' },
            { name: 'System Diagnostics', description: 'Error tracking and root cause analysis across deployed applications.' },
        ],
    },
]

const FAQ = [
    { question: "What's the difference between Node-RED and FlowFuse?", answer: "Node-RED is the open-source runtime FlowFuse is built on. It's how you build the logic. FlowFuse adds everything after the build: deployment across sites, version control, team access management, and enterprise security. You can use FlowFuse without prior Node-RED experience." },
    { question: 'Do I need Node-RED experience to use FlowFuse?', answer: 'No. FlowFuse Expert, our AI-assisted development tool, lets your team describe what they need in plain language and generates the logic. Your team can build without a steep learning curve.' },
    { question: 'Can FlowFuse work with our existing systems?', answer: 'Yes, FlowFuse is designed for brownfield environments. It connects to and extends your existing MES, ERP, SCADA, PLCs, and other systems without replacing them or requiring modifications to core platforms.' },
    { question: 'How does FlowFuse handle security and compliance?', answer: 'FlowFuse is SOC 2 Type 1 and Type 2 certified. It supports RBAC, SSO, audit logs, and air-gapped self-hosted deployments for environments with strict network isolation requirements.' },
    { question: 'How long does a typical deployment take?', answer: 'Most teams are operational within days. FlowFuse is designed to start with a single use case and expand, not require a multi-month implementation before delivering value.' },
]

// base.njk gave the homepage a title of "FlowFuse • <tagLine>" rather than the usual
// "<title> • FlowFuse", and metaTitle overrode it. metaTitle is what production serves.
useSeoMeta({
    title: 'Build Industrial Applications at Scale',
    description: 'Build industrial applications in minutes with AI, then deploy and govern production from cloud to edge.',
    ogDescription: 'Build industrial applications in minutes with AI, then deploy and govern production from cloud to edge.',
    keywords: 'Node-RED, Application Development, IoT, IIoT, Low-Code, open source, Integration, Workflow, Automation, Data Processing, Data Integration, Data Transformation, Data Visualization, Industrial Automation, Industrial IoT, Industry 4.0',
    ogUrl: 'https://flowfuse.com/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: item.answer })),
])
</script>

<template>
  <!--Hero Content-->
  <section class="w-full relative bg-indigo-800 md:min-h-[800px]">
      <HomeHeroSlides />
      <div class="relative z-10 px-6 w-full pt-12 md:pt-28 pb-36 md:pb-24">
          <div class="sm:max-w-screen-lg mx-auto">
              <div class="container m-auto text-left max-w-screen-lg">
                  <div class="mx-auto">
                      <!-- heroTagLine, not tagLine: tagLine is also the brand name in
                      every page's <title> and in llms.txt, where the persona clause
                      would push the title past search-result truncation. -->
                      <h1 class="font-medium m-auto text-5xl md:text-7xl text-center text-white max-w-4xl">
                          The Edge-Native Platform for Industrial IT, OT, and IIOT Applications
                      </h1>
                      <p class="mt-12 text-center text-gray-200 md:text-xl m-auto max-w-4xl">
                          <!-- The .njk ran this through replace("-", "&#8209;"); the current subtitle
                               contains no hyphens, so that filter changed nothing. -->
                          Build industrial applications in minutes with AI, then deploy and govern production from cloud to edge.
                      </p>
                      <div class="flex flex-col mt-12">
                          <div class="m-auto flex gap-4 items-center justify-center flex-row">
                              <CtaBookDemo variant="highlight" position="hero" class="flex flex-col mb-6" />
                              <CtaSignUp variant="ghost" color="white" position="hero" icon class="flex flex-col mb-6" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>

  <!-- Screenshot bridge: overlaps hero from below -->
  <div class="relative z-10 px-6 -mt-28 md:-mt-48">
      <div class="sm:max-w-screen-lg mx-auto">
          <div class="w-full flex-grow relative bg-gradient-to-b from-red-50 to-indigo-100 p-4 md:p-8 rounded-xl">
              <div class="ff-image-cover center ff-image-rounded bg-center w-full h-full">
                  <img src="/images/home/flowfuse-home-ui.png" alt="FlowFuse Home UI" width="960" class="w-full h-auto">
              </div>
          </div>
      </div>
  </div>

  <!-- Social Proof + Metrics -->
  <div class="w-full px-6 pt-8">
      <!-- Social Proof -->
      <div class="sm:max-w-screen-lg m-auto max-w-5xl mb-10">
          <div class="mx-auto text-center -mt-0.5">
              <SocialProof eyebrow-bg />
          </div>
      </div>

      <!-- Metrics -->
      <div class="max-w-md sm:max-w-screen-lg mx-auto mb-10">
          <div class="grid sm:grid-cols-3 gap-12 my-4 max-sm:w-full m-auto">
                  <div v-for="metric in METRICS" :key="metric.number" class="w-full h-full rounded-lg bg-red-50/70 pb-3 px-6 pt-6">
                      <h3 class="text-5xl font-semibold text-red-400">{{ metric.number }}</h3>
                      <p class="mt-0 font-normal leading-6">{{ metric.text }}</p>
                  </div>
          </div>
      </div>
  </div>
  <!-- Problem section -->
  <div class="about w-full py-20 px-6 bg-indigo-50/50 mt-16">
      <div class="max-sm:text-center max-w-screen-lg mx-auto pb-8 bg-radial-indigo-small mb-10">
          <h2 class=" w-full">Industrial innovation is accelerating. <span class="text-red-400">Execution is not.</span></h2>
          <p>Teams can access data and build applications faster than ever. But <span class="font-medium">the operational logic that drives throughput, quality, and response still lives in custom code, isolated scripts, and one-off solutions that don't scale.</span> </p>
          <!-- Status Quo section -->
          <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mt-16">
              <div v-for="section in PROBLEMS" :key="section.title" class="relative w-full max-md:max-w-md mx-auto">
                  <div class="flex flex-col items-center sm:items-start">
                      <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                          <div class="w-8 h-8 m-auto sm:m-0 text-red-400">
                              <SiteArt :name="section.svgPath" />
                          </div>
                          <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                              <p class="w-full font-semibold md:m-0 text-gray-600">
                              {{ section.title }}
                              </p>
                          </div>
                      </div>
                      <div>
                          <p class="font-light">{{ section.description }}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- Cost of inaction section -->
      <div class="text-center sm:text-left max-w-screen-lg mx-auto pt-6 grid sm:grid-cols-2 gap-10">
          <div class="flex flex-col max-md:max-w-md mx-auto md:flex-row md:items-center gap-2 md:gap-4">
              <h4 class="text-5xl font-semibold text-red-400 shrink-0 m-0">$50B</h4>
              <p class="m-0 leading-snug"><span class="font-medium">Annual cost of unplanned downtime</span> across industrial manufacturers globally</p>
          </div>
          <div class="flex flex-col max-md:max-w-md mx-auto md:flex-row md:items-center gap-2 md:gap-4">
              <h4 class="text-5xl font-semibold text-red-400 shrink-0 m-0">800h</h4>
              <p class="m-0 leading-snug"><span class="font-medium">Average equipment downtime</span> per year experienced by manufacturers (over 15 hours per week)</p>
          </div>
      </div>
  </div>

  <!-- Solution section -->
  <div class="solution-section-bg w-full px-6 py-24">
      <div class="relative z-10 max-w-screen-lg mx-auto max-md:text-center">
          <p class="text-indigo-500 text-sm font-semibold uppercase m-0">The missing operational layer</p>
          <h2 class="mt-4 md:text-5xl">FlowFuse is the industrial application platform that sits between your systems and your operations</h2>
          <p>Whether you're extending an existing system, standardizing a proven solution across sites, or connecting OT and IT data flows, FlowFuse gives your team the platform to <strong>build once and run everywhere</strong>.</p>
          <div class="flex gap-4 items-center max-md:justify-center flex-wrap mt-6">
              <CtaBookDemo variant="primary" position="secondary" />
              <CtaSignUp variant="ghost" position="secondary" icon />
          </div>
      </div>
  </div>

  <div class="w-full px-6">
      <!-- Capabilities & Features -->
      <div class="md:max-w-screen-lg mx-auto mt-24">
          <div
              v-for="(item, i) in CAPABILITIES"
              :key="item.capability"
              class="max-md:text-center md:flex md:flex-row gap-8 my-4 m-auto mb-12 md:mb-24"
              :class="{ 'md:flex-row-reverse': (i + 1) % 2 === 0 }"
          >
              <div class="max-md:hidden md:w-[45%] max-md:mb-12 flex items-center">
                  <div class="rounded-xl w-full bg-gradient-to-tl from-red-100 to-indigo-100 p-5 md:p-8 m-auto">
                      <div class="ff-image-rounded w-full overflow-hidden">
                          <img :src="item.imagePath" :alt="item.imageAlt" width="440" class="w-full h-auto">
                      </div>
                  </div>
              </div>
              <div class="md:w-[55%] my-auto flex flex-col">
                  <h3 class="text-red-400 mb-3 text-sm font-semibold uppercase">{{ item.feature }}</h3>
                  <h2>{{ item.capability }}</h2>
                  <div class="md:hidden rounded-xl w-full bg-gradient-to-tl from-red-100 to-indigo-100 max-w-[500px] mx-auto my-6 p-4">
                      <div class="ff-image-rounded w-full border border-red-200 overflow-hidden">
                          <img :src="item.imagePath" :alt="item.imageAlt" width="440" class="w-full h-auto">
                      </div>
                  </div>
                  <p>
                      {{ item.description }}
                  </p>
                  <NuxtLink :to="item.linkHref" class="flex items-center gap-1.5 text-blue-600 hover:underline max-md:justify-center mt-3">
                      {{ item.linkText }}
                      <SiteArt name="arrow-long-right" />
                  </NuxtLink>
              </div>
          </div>
      </div>
  </div>

  <!-- Mature Adoption - Operational Application System section -->
  <div class="w-full px-6 py-20 bg-gradient-to-br from-indigo-50 to-red-50">
      <div class="max-w-screen-lg mx-auto max-md:text-center">
          <p class="text-indigo-400 text-sm font-semibold uppercase m-0">What mature adoption looks like</p>
          <h2 class="my-4 md:text-5xl">From one-off solutions to <span class="text-indigo-600">an operational application system</span></h2>
          <p class="max-w-screen-md">These are not use cases. They are production applications running across the business. Built once, governed centrally, deployed across every site.</p>

          <div class="mt-10 bg-white/40 border-2 border-white rounded-xl pt-8 p-5 flex flex-col gap-8">
              <p class="text-center text-indigo-600 text-3xl font-normal m-0">Operational Application System</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div v-for="category in OPERATIONAL_SYSTEM" :key="category.title" class="bg-indigo-50 border border-indigo-300 rounded-lg flex flex-col">
                      <div class="bg-indigo-600 text-white text-sm font-medium text-center uppercase px-4 py-2.5 rounded-t-lg leading-5 min-h-16 flex items-start justify-center">
                          {{ category.title }}
                      </div>
                      <div class="flex flex-col gap-[18px] p-2.5 flex-grow">
                          <template v-for="item in category.items" :key="item.name">
                          <NuxtLink v-if="item.url" :to="item.url" class="group bg-white border border-white rounded-lg p-4 flex flex-col gap-3 hover:no-underline hover:border-indigo-300 transition-colors">
                              <p class="text-indigo-500 font-medium m-0"><span>{{ item.name }}</span></p>
                              <p class="text-gray-700 font-light m-0 text-sm leading-5">{{ item.description }}</p>
                          </NuxtLink>
                          <div v-else class="bg-white border border-white rounded-lg p-4 flex flex-col gap-3">
                              <p class="text-indigo-500 font-medium m-0">{{ item.name }}</p>
                              <p class="text-gray-700 font-light m-0 text-sm leading-5">{{ item.description }}</p>
                          </div>
                          </template>
                      </div>
                  </div>
              </div>

              <div class="rounded-xl px-8 py-9" style="background: radial-gradient(ellipse 50% 125% at 50% 100%, #6366f1, #312e81)">
                  <div class="flex flex-col md:flex-row gap-8 items-start">
                      <p class="text-white text-3xl font-medium m-0 md:w-80 shrink-0 leading-10">Every problem solved becomes a reusable application</p>
                      <div class="flex flex-col gap-3.5 md:pt-2.5">
                          <p class="text-indigo-50 font-light text-xl leading-6 m-0">That's how a small team manages operations across dozens of sites, without rebuilding from scratch every time.</p>
                          <p class="text-red-50 font-medium text-xl leading-6 m-0">Ready to build yours?</p>
                          <div class="flex justify-center md:justify-end mt-2">
                              <CtaBookDemo variant="highlight" position="oas" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div class="w-full bg-radial-indigo-small pt-6 pb-10 px-6">
      <!-- Testimonials -->
      <div class="w-full mt-16 md:px-0">
          <div class="max-w-screen-lg mx-auto">
              <h2 class="md:text-5xl">Real results from <span class="text-indigo-600">industrial teams</span></h2>
              <p class="mb-8">See how manufacturers and industrial operators are using FlowFuse to standardize, scale, and govern their operations.</p>
              <TestimonialCarousel hide-read-more browse-all-url="/customer-stories/" browse-all-text="Browse all customer stories" />
          </div>
      </div>
  </div>

  <!-- AI section -->
  <div class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
          <p class="text-red-400 text-sm font-semibold uppercase m-0 max-md:text-center">AI in industrial operations</p>
          <h2 class="mt-4 md:text-5xl max-md:text-center">AI makes building faster. <span class="text-red-400">FlowFuse makes it operational.</span></h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
              <div class="border-2 border-red-200 rounded-lg p-6 flex flex-col justify-between bg-gradient-to-tl from-red-50/50 to-transparent">
                  <div class="flex flex-col gap-8">
                      <div class="flex items-center gap-3">
                          <div class="w-8 h-8 shrink-0 text-red-400">
                              <SiteArt name="bolt" />
                          </div>
                          <p class="text-red-400 text-2xl font-medium m-0">AI accelerates the build</p>
                      </div>
                      <p class="text-gray-700 font-light m-0">FlowFuse Expert, our industrial-tuned AI assistant, lets your team describe what they need in plain language, and generates flows, data transformations, and dashboard logic. No waiting on scarce developers.</p>
                  </div>
                  <a href="/ai/" class="group hover:no-underline flex items-center justify-end gap-1.5 text-indigo-600 mt-6">
                      <span class="group-hover:underline">Learn more about FlowFuse AI</span>
                      <span class="w-5 h-5 shrink-0 flex items-center [&>svg]:w-full [&>svg]:h-full"><SiteArt name="arrow-long-right" /></span>
                  </a>
              </div>
              <div class="border-2 border-red-200 rounded-lg p-6 flex flex-col justify-between bg-gradient-to-tl from-red-50/50 to-transparent">
                  <div class="flex flex-col gap-8">
                      <div class="flex items-center gap-3">
                          <div class="w-8 h-8 shrink-0 text-red-400">
                              <SiteArt name="shield-check" />
                          </div>
                          <p class="text-red-400 text-2xl font-medium m-0">FlowFuse governs the result</p>
                      </div>
                      <p class="text-gray-700 font-light m-0">Speed without governance creates new debt. FlowFuse provides the production layer where AI-assisted work becomes visible, versioned, secure, and reusable, across the enterprise.</p>
                  </div>
                  <!-- No plain-text-link variant exists in the shared Cta* system (CLAUDE.md
                       reserves `text` for that), and ghost is too heavy (bold/uppercase/button
                       padding) for this inline sentence-style link. Hand-written until that
                       variant exists, but firing the same event and props the real
                       CtaBookDemo would, tagged variant="text" so it is identifiable in
                       PostHog as this one-off style. -->
                  <NuxtLink to="/book-demo/" class="group hover:no-underline flex items-center justify-end gap-1.5 text-indigo-600 mt-6" @click="capture('cta-book-demo', { position: 'ai', variant: 'text' })">
                      <span class="group-hover:underline">Book a demo</span>
                      <span class="w-5 h-5 shrink-0 flex items-center [&>svg]:w-full [&>svg]:h-full"><SiteArt name="arrow-long-right" /></span>
                  </NuxtLink>
              </div>
          </div>
      </div>
  </div>

  <!-- FAQ Section -->
  <div class="w-full px-6 pt-20 bg-indigo-50/50 mb-10">
      <div class="max-w-screen-lg mx-auto">
          <h2 class="mb-1">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
          <div class="-mt-20">
              <BlogFaq :faq="FAQ" variant="page" />
          </div>
      </div>
  </div>

  <div class="pb-10 md:pb-12 pt-14 px-6">
      <!-- Get Started -->
      <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-5xl font-medium m-0">Get Started with FlowFuse</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Your first operational application could be running this week. Book a demo to see how, or start a free trial and build it yourself.</p>
          <CtaBookDemo variant="highlight" position="get-started" />
      </div>
      <!-- FF Content -->
      <div class="max-w-screen-lg m-auto">
          <div class="pt-12 mt-10 pb-12">
          <h2 class="text-center w-full md:text-left col-span-full font-medium"><span class="text-indigo-600">Explore more</span> about FlowFuse</h2>
              <ExploreMoreContent hubspot-reference="homepage" />
          </div>
      </div>
  </div>
</template>
