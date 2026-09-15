<script setup lang="ts">
// Industry lens page for building products / building materials component
// manufacturers (windows, doors, panels, glass, cabinetry, roofing, insulation).
//
// Built from nuxt/pages/industries/automotive.vue, which is the house template for
// industry pages. It lives in Nuxt rather than 11ty for the same reason automotive
// does: <RoiCalculator compact /> is a Vue component and cannot render inside 11ty's
// Nunjucks output. src/industries/building-materials.njk is the `permalink: false`
// stub that keeps this page in the `industry` collection so the card grid on
// /industries/ (still 11ty) picks it up.
//
// IMAGES: every screenshot below is a placeholder borrowed from the automotive page.
// They are generic FlowFuse UI, so nothing here is misrepresented, but they are not
// building-products applications. Replace each one marked TODO(image).
useSeoMeta({
    title: 'Building Materials Manufacturing Applications',
    description: 'Connect extrusion lines, presses, CNC, glass lines, and plant IT systems in one place. FlowFuse helps building products manufacturers monitor, automate, and standardize production across plants in real time.',
    ogUrl: 'https://flowfuse.com/industries/building-materials/',
    twitterSite: '@FlowFuseinc',
})

// Each figure is sourced, not estimated. Swap for vetted industry-scoped counts
// (the automotive page carries those) once marketing has them for this vertical.
const metrics = [
    // src/customer-stories/manufacturing-digital-transformation.md
    { number: '1,000s', text: 'Node-RED instances managed by a single US manufacturer on FlowFuse' },
    // Platform capability, same figure the automotive page uses.
    { number: '40+', text: 'Industrial protocols and systems supported out of the box' },
    // Platform-wide, matches the SocialProof default copy.
    { number: '36,000+', text: 'Users building on FlowFuse worldwide' },
]

const applications = [
    {
        title: 'Connect Your Existing Plant Systems',
        description: 'No rip and replace; instead, connect extruders, presses, CNC routers, saws, glass lines, coating and paint systems, PLCs, SCADA, historians, ERP, and databases using open industrial protocols. Bring data from across the plant into one platform to build custom low-code applications.',
        linkText: 'See how FlowFuse connects your existing systems',
        linkHref: '/use-cases/data-integration/',
        image: '/images/industries/automotive/1-connect-systems.png', // TODO(image): building-products connectivity screenshot
        imageAlt: 'Screenshot of a FlowFuse application connecting plant systems',
        variant: 'indigo',
    },
    {
        title: 'Monitor Line Performance in Real Time',
        description: 'Build production dashboards with low-code and AI assistance to track line speed, linear feet or units per shift, changeover time, scrap rate, and OEE across profile extrusion, glass fabrication, fabrication, and final assembly.',
        linkText: 'See what production monitoring looks like with FlowFuse',
        linkHref: '/use-cases/production-monitoring/',
        image: '/images/industries/automotive/2-monitor-production.png', // TODO(image): line performance dashboard
        imageAlt: 'Screenshot of a real-time line performance dashboard',
        variant: 'red',
    },
    {
        title: 'Track Made-to-Order Work Through the Plant',
        description: 'Building products are configured per order, so almost every unit is different. Give operators a live order panel that shows what is running, what is queued, and which options each unit carries, driven by the same data your machines already produce.',
        linkText: 'Read how to build a smart manufacturing order panel',
        linkHref: '/blog/2025/07/smart-manufacturing-order-panel-flowfuse/',
        image: '/images/industries/automotive/3-reduce-downtime.png', // TODO(image): order panel screenshot
        imageAlt: 'Screenshot of a live production order panel',
        variant: 'mixed',
    },
    {
        title: 'Catch Defects Before They Reach the Yard',
        description: 'A mis-sized sash or a failed seal found at shipping is a remake, not a repair. Capture inspection results, gauge readings, and vision checks at the station where they happen, and measure first pass yield by line, shift, and product family.',
        linkText: 'Read how to track first pass inspection and yield',
        linkHref: '/blog/2026/09/first-pass-inspection-fpa/',
        image: '/images/industries/automotive/4-quality-traceability.png', // TODO(image): first pass yield dashboard
        imageAlt: 'Screenshot of a first pass yield and inspection dashboard',
        variant: 'indigo',
    },
]

const VARIANTS: Record<string, { gradient: string, border: string, mobileGradient: string, mobileBorder: string }> = {
    indigo: { gradient: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300', mobileGradient: 'from-indigo-100 to-indigo-50', mobileBorder: 'border-indigo-200' },
    red: { gradient: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100', mobileGradient: 'from-red-50 to-white', mobileBorder: 'border-red-100' },
    mixed: { gradient: 'from-red-200 to-indigo-100', border: 'border-indigo-100', mobileGradient: 'from-red-50 to-indigo-50', mobileBorder: 'border-indigo-100' },
}

// Heroicons outline glyphs, named for <UIcon>. Unlike the automotive page there is no
// FlowFuse-drawn mark here, so every card carries an `icon` and none falls through to
// <IconsCertificateIcon>.
interface ComplianceItem { title: string, text: string, linkText: string, linkHref: string, icon?: string }

const compliance: ComplianceItem[] = [
    {
        title: 'ISO 9001',
        icon: 'i-heroicons-document-check',
        text: 'Asks you to find the cause of a nonconformity and prove the fix held. FlowFuse links corrective actions to the production data that triggered them, so the evidence is already there.',
        linkText: 'Learn more about how FlowFuse supports CAPA workflows',
        linkHref: '/blog/2026/09/capa-corrective-preventive-action/',
    },
    {
        title: 'AAMA & NFRC certification',
        icon: 'i-heroicons-chart-bar',
        text: 'Certified product programs ask for in-line test and process records, not a one-off sample. FlowFuse puts those measurements on live control charts as they are taken.',
        linkText: 'Learn more about statistical process control with FlowFuse',
        linkHref: '/blog/2026/08/statistical-process-control/',
    },
    {
        title: 'Declaration of Performance',
        icon: 'i-heroicons-document-chart-bar',
        text: 'CE marking under EN 14351-1 needs a performance record per product, on demand. FlowFuse generates those documents from the production data already captured.',
        linkText: 'Learn more about generating reports from production data',
        linkHref: '/blog/2025/05/how-to-generate-pdf-reports-using-node-red/',
    },
    {
        title: 'Gauge calibration',
        icon: 'i-heroicons-beaker',
        text: 'An out-of-calibration gauge invalidates every reading it took. FlowFuse tracks calibration status and due dates next to the measurements themselves.',
        linkText: 'Learn more about building a calibration management dashboard',
        linkHref: '/blog/2026/07/calibration-management-dashboard/',
    },
]

// The 11ty original derived this grid from every use-case page whose `industries[]`
// front matter contains this page's slug (src/_includes/components/industry-use-cases.njk).
// Those pages are .njk and invisible to @nuxt/content, so the grid is curated here instead
// and this list is the source of truth for what renders. Production Monitoring and Shop
// Floor Communication also carry this page's slug in their own `industries[]` front matter,
// which is what drives the reverse link (the "Common in these industries" band on the use
// case page). The cross-cutting entries below are deliberately not tagged there - listing a
// partial industry set on a use case that applies to all of them would read as a claim that
// it doesn't. Add the tag in src/use-cases/ if that reverse link is wanted.
const useCases = [
    {
        title: 'Production Monitoring',
        problem: "Your operation is running. You just can't see it clearly enough, until something breaks.",
        href: '/use-cases/production-monitoring/',
    },
    {
        title: 'Shop Floor Communication',
        problem: 'The line stopped four minutes ago. The person who can fix it will find out when someone walks over.',
        href: '/use-cases/shop-floor-communication/',
    },
    {
        title: 'Data Integration',
        problem: 'Collect, transform, and route data from any industrial source to any destination, without writing integration code from scratch.',
        href: '/use-cases/data-integration/',
    },
]

const faqs = [
    {
        question: 'Can FlowFuse track a single made-to-order unit through the whole plant?',
        answer: 'Yes. FlowFuse reads the order or work ticket identifier wherever it is scanned or produced, associates each station’s data with it as that data is captured, and routes the result to the systems where it is stored. That builds a per-unit history across cutting, fabrication, glazing, assembly, and shipping without a separate tracking system.',
    },
    {
        question: 'How does FlowFuse handle a plant with extruders, presses, and CNC from different vendors?',
        answer: 'FlowFuse connects to each of them using the protocol that machine already speaks, including OPC UA, Modbus TCP and RTU, EtherNet/IP, Siemens S7, MTConnect, and plain serial. Values are normalized in the flow, so a dashboard or report treats a 20-year-old press and a new CNC router the same way.',
    },
    {
        question: 'Our older saws and presses only have serial or dry contacts. Can those be included?',
        answer: 'Yes. Machines with no network stack can be brought in over RS232 or RS485, or by wiring run, stop, and cycle-complete signals into an edge device running the FlowFuse Device Agent. That is often the fastest way to get honest cycle counts from equipment that predates the plant network.',
    },
    {
        question: 'Can FlowFuse produce the records an AAMA, NFRC, or CE audit asks for?',
        answer: 'FlowFuse captures test and process data at the source and routes it to the systems where it can be stored and queried. Reports and declarations of performance are generated from that data rather than assembled by hand, so what the auditor sees matches what the line actually did.',
    },
    {
        question: 'Can FlowFuse run air-gapped in a plant with no cloud connectivity?',
        answer: 'Yes. FlowFuse supports self-hosted, on-premises, and air-gapped deployments for manufacturing with strict network isolation requirements.',
    },
    {
        question: 'How is this different from adding a module to our existing ERP or MES?',
        answer: 'ERP and MES modules are built for standard workflows. FlowFuse handles the plant-specific gaps, such as configured-product routing rules, one-off quality gates, and non-standard handovers between fabrication and assembly, that those modules typically cannot cover without a vendor change request.',
    },
]

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...faqs.map(item => defineQuestion(item)),
])
</script>

<template>
  <div class="w-full">

    <!-- ============================================================
         HERO
    ============================================================ -->
    <section class="w-full relative">
      <div class="px-6 pt-16 md:pt-20">
        <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-stretch">
          <div class="max-md:text-center md:flex md:flex-col md:justify-center">
            <div class="mb-4 max-md:flex max-md:justify-center">
              <span class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 industry-eyebrow-icon text-gray-800">
                <span class="w-5 h-5 inline-flex items-center shrink-0"><UIcon name="i-heroicons-building-office-2" class="size-5" /></span>
                <span class="font-medium">Building Materials Manufacturing</span>
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-medium m-0">
              <span class="text-red-600">Scale building products production</span> without rewiring your stack
            </h1>
            <p class="mt-6 text-gray-700">Connect extrusion lines, presses, CNC, glass lines, and plant IT systems in one place. FlowFuse helps teams monitor, automate, and standardize production workflows across plants in real time.</p>
            <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
              <CtaBookDemo variant="highlight" position="hero" />
              <CtaPricing variant="ghost" position="hero" icon="i-lucide-arrow-right" />
            </div>
          </div>
          <div class="w-full md:flex md:items-center">
            <div class="relative w-full md:pt-6 max-md:mt-10">
              <!--
                No building-products customer story exists yet, so this quote is borrowed
                from an adjacent, multi-plant US manufacturer and attributed exactly as
                its own story attributes it. Swap in an Andersen or Decospan quote when
                one is cleared. See src/customer-stories/manufacturing-digital-transformation.md
              -->
              <div class="relative rounded-lg border border-indigo-200 p-6 pt-28 bg-indigo-50/50">
                <div class="absolute -top-14 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-36 h-36 rounded-full bg-red-200 border-4 border-white shadow-lg overflow-hidden ff-image-cover">
                  <img src="/images/stories/large-us-manufacturing.jpg" alt="Production floor at a large US manufacturer" loading="eager">
                </div>
                <p class="italic text-gray-600 font-medium m-0">&ldquo;The low code paradigm makes it possible for companies to decentralize innovation within an organization.&rdquo;</p>
                <p class="text-gray-500 text-right mt-4 mb-0">Project lead, <span class="font-semibold text-gray-600">large US manufacturing company</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-screen-lg mx-auto mt-16 text-center">
          <div class="mx-auto text-center -mt-0.5 -mb-10">
            <SocialProof />
          </div>
        </div>
        <div class="max-w-md sm:max-w-screen-lg mx-auto mt-16 pb-10 bg-radial-red">
          <div class="grid sm:grid-cols-3 gap-12 my-4 max-sm:w-full m-auto">
            <div v-for="metric in metrics" :key="metric.number" class="w-full h-full rounded-lg bg-red-50/70 pb-3 px-6 pt-6">
              <h3 class="text-5xl font-semibold text-red-400">{{ metric.number }}</h3>
              <p class="mt-0 font-normal leading-6">{{ metric.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         THE PROBLEM, AND WHAT IT COSTS  (+ ROI CALCULATOR)
    ============================================================ -->
    <section class="w-full py-16 px-6 bg-white">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-w-3xl max-md:mx-auto max-md:text-center">
          <h2 class="text-gray-700 mb-4">Every Disconnected System Has a Price Tag</h2>
          <p class="text-gray-600 m-0">Extruders, presses, glass lines, CNC cells, SCADA, ERP, and the spreadsheets in between already hold the data your teams need; they just don't talk to each other. Closing that gap manually costs engineering hours spent searching and rebuilding, and production hours when a line stops with no quick answer. See what that's costing you below.</p>
        </div>
        <div class="mt-10">
          <RoiCalculator compact />
        </div>
        <p class="text-center text-sm text-gray-500 mt-8">Want to tune every assumption and see the research behind it? <a href="/resources/roi-calculator/" class="text-indigo-600 font-semibold hover:underline">Open the full ROI calculator</a>.</p>
      </div>
    </section>

    <!-- ============================================================
         APPLICATIONS FOR BUILDING MATERIALS MANUFACTURING
    ============================================================ -->
    <section class="w-full relative py-20 px-6 overflow-hidden">
      <div class="absolute inset-x-0 top-0 h-[400px] md:h-[561px] solution-section-bg-flipped" aria-hidden="true" />
      <div class="relative z-10">
        <div class="max-w-screen-lg mx-auto max-md:text-center mb-28 md:mt-10">
          <h2 class="text-indigo-600 text-4xl md:text-5xl">Applications for Building Materials Manufacturing</h2>
          <p class="text-gray-600 text-lgmd:text-2xl">See how FlowFuse supports building products manufacturers with solutions for connectivity, line visibility, made-to-order tracking, and quality.</p>
        </div>

        <div class="md:max-w-screen-lg mx-auto">
          <div
              v-for="(item, index) in applications"
              :key="item.title"
              class="max-md:text-center md:flex md:flex-row gap-8 items-center m-auto mb-14 md:mb-20"
              :class="{ 'md:flex-row-reverse': index % 2 === 1 }"
          >
            <!-- Image (desktop): full-size screenshot offset over a colored panel -->
            <div class="max-md:hidden md:w-[45%]">
              <div class="relative aspect-[430/289]">
                <div
                    class="absolute -top-5 w-full h-full rounded-lg bg-gradient-to-tl"
                    :class="[VARIANTS[item.variant].gradient, index % 2 === 0 ? '-left-5' : '-right-5']"
                />
                <div class="absolute inset-0 rounded-lg border-2 overflow-hidden ff-image-cover" :class="VARIANTS[item.variant].border">
                  <img :src="item.image" :alt="item.imageAlt" loading="lazy">
                </div>
              </div>
            </div>
            <!-- Text -->
            <div class="md:w-[55%] flex flex-col gap-3">
              <h3 class="text-gray-700 text-3xl font-medium m-0">{{ item.title }}</h3>
              <div class="md:hidden rounded-xl w-full bg-gradient-to-tl max-w-[500px] mx-auto my-4 p-4" :class="VARIANTS[item.variant].mobileGradient">
                <div class="ff-image-rounded w-full border overflow-hidden" :class="VARIANTS[item.variant].mobileBorder">
                  <img :src="item.image" :alt="item.imageAlt" loading="lazy">
                </div>
              </div>
              <p class="text-gray-500 m-0">{{ item.description }}</p>
              <a :href="item.linkHref" class="flex items-center gap-1.5 text-blue-600 hover:underline max-md:justify-center">
                {{ item.linkText }}
                <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         BUILT FOR ENTERPRISE MANUFACTURING
    ============================================================ -->
    <EnterpriseSecurity />

    <!-- ============================================================
         BUILDING MATERIALS COMPLIANCE & STANDARDS
    ============================================================ -->
    <section class="w-full py-16 md:py-24 px-6 bg-radial-[ellipse_60%_70%_at_center_bottom] from-blue-200/30 to-blue-200/0">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-w-2xl mb-12">
          <h2 class="text-gray-700 mb-2">Building Materials <span class="text-indigo-600">Compliance &amp; Standards</span></h2>
          <p class="text-xl font-medium mt-0 mb-4">The Data Your Audit Asks For, In One Place</p>
          <p class="text-gray-600">Certified building products carry performance claims that have to be backed by records. FlowFuse helps ensure the data an auditor asks for exists and is queryable when they ask for it.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <a
              v-for="item in compliance"
              :key="item.title"
              :href="item.linkHref"
              class="group hover:no-underline flex flex-col gap-3 rounded-xl border border-gray-200 p-5 bg-white hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div class="w-6 h-6 text-indigo-600">
              <UIcon v-if="item.icon" :name="item.icon" class="size-6" />
              <IconsCertificateIcon v-else />
            </div>
            <h3 class="m-0 text-lg font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">{{ item.title }}</h3>
            <p class="m-0 text-gray-600 text-sm flex-grow">{{ item.text }}</p>
            <span class="mt-2 text-blue-600 text-sm flex items-center gap-1.5 group-hover:underline">
              {{ item.linkText }}
              <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         USE CASES FOR THIS INDUSTRY
    ============================================================ -->
    <div class="w-full py-16 sm:py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-md:text-center">Use cases in <span class="text-indigo-600">Building Materials</span></h2>
        <p class="mt-4 max-w-3xl text-gray-600">Operational workflow patterns teams in this industry build and own with FlowFuse.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <a
              v-for="useCase in useCases"
              :key="useCase.href"
              :href="useCase.href"
              class="group hover:no-underline flex flex-col gap-3 rounded-xl border border-gray-200 p-6 bg-white hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <h3 class="m-0 text-gray-800 group-hover:text-indigo-600 transition-colors">{{ useCase.title }}</h3>
            <p class="m-0 text-gray-600 text-sm flex-grow">{{ useCase.problem }}</p>
            <span class="mt-2 text-blue-600 text-sm flex items-center gap-1.5 group-hover:underline">
              View use case
              <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- ============================================================
         FAQ
    ============================================================ -->
    <div class="w-full px-6 pt-20 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <BlogFaq :faq="faqs" />
      </div>
    </div>

    <!-- ============================================================
         CTA
    ============================================================ -->
    <div class="w-full px-6 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-5xl font-medium m-0">Bring your production challenge</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Every building products manufacturer runs a different mix of lines, options, and order patterns. FlowFuse lets you build the applications your teams need using the systems already running your plant.</p>
          <CtaBookDemo variant="highlight" position="final-cta" />
        </div>
      </div>
    </div>
  </div>
</template>
