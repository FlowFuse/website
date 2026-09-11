<script setup lang="ts">
// Ported from src/industries/automotive.njk (11ty). The move to Nuxt is what lets this
// page embed <RoiCalculator compact /> — a Vue component, so it cannot render inside
// 11ty's Nunjucks output. src/industries/automotive.njk survives as a `permalink: false`
// stub: it emits no HTML (nothing may shadow this route in nuxt/public/) but stays in the
// `industry` collection so the card grid on /industries/, still 11ty, keeps its entry.
//
// The "Not Every Production Challenge Requires a New Platform" section it replaced lives
// on in the PROBLEM + ROI section below — reframed to hand off to the calculator. That
// copy is deliberately page-local and not pushed down into RoiCalculator.vue, which is
// shared with /pricing/ and /resources/roi-calculator/.
useSeoMeta({
    title: 'Automotive Manufacturing Applications',
    description: 'Connect PLCs, SCADA, MES, and plant IT systems in one place. FlowFuse helps teams monitor, automate, and standardize production workflows across plants in real time.',
    ogUrl: 'https://flowfuse.com/industries/automotive/',
    twitterSite: '@FlowFuseinc',
})

const metrics = [
    { number: '300+', text: 'Automotive applications built' },
    { number: '120+', text: 'Plants or production lines running FlowFuse' },
    { number: '40+', text: 'Industrial protocols and systems supported out of the box' },
]

const applications = [
    {
        title: 'Connect Your Existing Manufacturing Systems',
        description: 'No rip and replace; instead, connect PLCs, robots, SCADA, historians, MES, ERP systems, databases, and cloud services using open industrial protocols. Bring data from across your factory into one platform to build custom low-code applications.',
        linkText: 'See how FlowFuse connects your existing systems',
        linkHref: '/use-cases/data-integration/',
        image: '/images/industries/automotive/1-connect-systems.png',
        imageAlt: 'Screenshot of a FlowFuse application connecting manufacturing systems',
        variant: 'indigo',
    },
    {
        title: 'Monitor Production in Real Time',
        description: 'Build production dashboards with low-code and AI assistance to monitor machine status, production counts, cycle time, OEE, alarms, and line performance using live data from your manufacturing systems.',
        linkText: 'See what production monitoring looks like with FlowFuse',
        linkHref: '/use-cases/production-monitoring/',
        image: '/images/industries/automotive/2-monitor-production.png',
        imageAlt: 'Screenshot of a real-time production monitoring dashboard',
        variant: 'red',
    },
    {
        title: 'Reduce Downtime with Live Visibility',
        description: 'Automatically detect stoppages, capture downtime events, analyze root causes, and understand where production time is being lost with applications built on live machine data.',
        linkText: 'Read how to build a downtime logger',
        linkHref: '/blog/2026/07/build-downtime-logger/',
        image: '/images/industries/automotive/3-reduce-downtime.png',
        imageAlt: 'Screenshot of a live downtime tracking dashboard',
        variant: 'mixed',
    },
    {
        title: 'Improve Quality with Complete Traceability',
        description: 'Trace every VIN and manufactured part through its complete production history, including torque values, weld parameters, barcode scans, batch records, and vision inspection results to accelerate investigations and improve quality.',
        linkText: 'Read how to build a defect and quality monitoring dashboard',
        linkHref: '/blog/2026/07/defect-and-quality-monitoring/',
        image: '/images/industries/automotive/4-quality-traceability.png',
        imageAlt: 'Screenshot of a quality traceability application',
        variant: 'indigo',
    },
]

const VARIANTS: Record<string, { gradient: string, border: string, mobileGradient: string, mobileBorder: string }> = {
    indigo: { gradient: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300', mobileGradient: 'from-indigo-100 to-indigo-50', mobileBorder: 'border-indigo-200' },
    red: { gradient: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100', mobileGradient: 'from-red-50 to-white', mobileBorder: 'border-red-100' },
    mixed: { gradient: 'from-red-200 to-indigo-100', border: 'border-indigo-100', mobileGradient: 'from-red-50 to-indigo-50', mobileBorder: 'border-indigo-100' },
}

// Three of these are verbatim Heroicons outline glyphs, named for <UIcon>. IATF 16949's
// is a FlowFuse-drawn mark with no Iconify equivalent, so that card falls through to
// <IconsCertificateIcon> (the same inline SVG the 11ty page included) - hence the
// missing `icon` key rather than an unused placeholder.
interface ComplianceItem { title: string, text: string, linkText: string, linkHref: string, icon?: string }

const compliance: ComplianceItem[] = [
    {
        title: 'IATF 16949',
        text: 'Asks for ongoing process audits. FlowFuse captures layered process audit findings and corrective actions so evidence stays current between visits.',
        linkText: 'Learn more about how FlowFuse supports layered process audits',
        linkHref: '/blog/2026/08/layered-process-audit/',
    },
    {
        title: 'VDA 6.3',
        icon: 'i-heroicons-clipboard-document-check',
        text: 'Asks for objective evidence that production matches documentation. FlowFuse connects machines, PLCs, and quality systems so that evidence is easy to retrieve.',
        linkText: 'Learn more about how FlowFuse supports VDA 6.3 process audits',
        linkHref: '/blog/2026/08/vda-6.3/',
    },
    {
        title: 'Control Plans',
        icon: 'i-heroicons-document-chart-bar',
        text: 'Asks what to measure, how often, and how to react. FlowFuse links that plan to live measurement data instead of a manual cross-check.',
        linkText: 'Learn more about how FlowFuse connects control plans to production data',
        linkHref: '/blog/2026/08/control-plans/',
    },
    {
        title: 'Recall defense',
        icon: 'i-heroicons-shield-check',
        text: 'FlowFuse traces a VIN back through every recorded step, fast.',
        linkText: 'Learn more about how FlowFuse enables automotive traceability',
        linkHref: '/blog/2026/08/automotive-traceability/',
    },
]

// The 11ty original derived this grid from every use-case page whose `industries[]`
// front matter contains "automotive" (src/_includes/components/industry-use-cases.njk).
// Those pages are .njk and invisible to @nuxt/content, so the two that carry the tag are
// listed here instead. Keep in sync with the `industries` front matter in src/use-cases/.
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
]

const faqs = [
    {
        question: 'How do I trace a VIN through body shop, paint, and assembly?',
        answer: "FlowFuse allows you to collect data from each station, associate it with the relevant VIN as it's captured, and route it to the systems where that data is stored and used. This connects weld records, paint parameters, torque results, inspection outcomes, and other production data across the vehicle's journey, making it easier to build a complete production history.",
    },
    {
        question: 'Can FlowFuse get OEE from a line with mixed Siemens and Allen-Bradley PLCs?',
        answer: 'Yes. FlowFuse reads tag data from both S7 and EtherNet/IP-connected PLCs in the same flow, normalizes it, and calculates OEE metrics regardless of which controller brand runs which station.',
    },
    {
        question: 'What does IATF 16949 require for production data retention?',
        answer: 'IATF 16949 requires traceable records of process parameters, torque, weld, and inspection data, retained at a level of detail that supports root-cause investigation and audit. FlowFuse allows you to capture this data at the source, connect and process it, and route it to the systems where it can be stored and queried for quality, traceability, and audit needs.',
    },
    {
        question: 'How long does FlowFuse deployment take on one line versus twenty plants?',
        answer: 'Deployment time depends on the complexity of the application, the plant environment, and the systems being connected. Once a flow is built and validated, it can be reused and deployed across additional lines or plants rather than rebuilt from scratch each time, helping reduce the integration effort involved in scaling.',
    },
    {
        question: 'Can FlowFuse run air-gapped in a plant with no cloud connectivity?',
        answer: 'Yes. FlowFuse supports self-hosted, on-premises, and air-gapped deployments for manufacturing with strict network isolation requirements.',
    },
    {
        question: 'How is this FlowFuse different from adding a module to our existing MES?',
        answer: "MES modules are built for standard workflows. FlowFuse handles the plant-specific gaps (custom quality gates, one-off traceability rules, non-standard handovers) that MES modules typically can't cover without a vendor change request.",
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
                <span class="w-5 h-5 inline-flex items-center shrink-0"><IconsCarIcon /></span>
                <span class="font-medium">Automotive Manufacturing</span>
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-medium m-0">
              <span class="text-red-600">Scale automotive operations</span> without rewiring your stack
            </h1>
            <p class="mt-6 text-gray-700">Connect PLCs, SCADA, MES, and plant IT systems in one place. FlowFuse helps teams monitor, automate, and standardize production workflows across plants in real time.</p>
            <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
              <CtaBookDemo variant="highlight" position="hero" />
              <CtaPricing variant="ghost" position="hero" icon="i-lucide-arrow-right" />
            </div>
          </div>
          <div class="w-full md:flex md:items-center">
            <div class="relative w-full md:pt-6 max-md:mt-10">
              <div class="relative rounded-lg border border-indigo-200 p-6 pt-28 bg-indigo-50/50">
                <div class="absolute -top-14 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-36 h-36 rounded-full bg-red-200 border-4 border-white shadow-lg overflow-hidden ff-image-cover">
                  <img src="/images/industries/automotive/headshot-lidiya-shutaya-metaltec-and-pen.png" alt="Lidiya Shutaya" loading="eager">
                </div>
                <p class="italic text-gray-600 font-medium m-0">&ldquo;At PennEngineering, I built out the FlowFuse deployment from scratch: machine monitoring, machine dashboards, ERP integration. What FlowFuse gave us was revision control and a platform the whole team could own. That made the deployment self-sustaining.&rdquo;</p>
                <p class="text-gray-500 text-right mt-4 mb-0">Lidiya Shutaya, Sr. Operational Technology System Architect, <span class="font-semibold text-gray-600">PennEngineering (formerly)</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-screen-lg mx-auto mt-16 text-center">
          <div class="mx-auto text-center -mt-0.5 -mb-10">
            <SocialProof eyebrow="30+ automotive manufacturers in 20 countries have run their operations on FlowFuse" />
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
          <h2 class="text-gray-700 mb-4">The Gap Between Your Systems Is What Costs You</h2>
          <p class="text-gray-600 m-0">Most production challenges don't need new hardware or a new platform. PLCs, robots, SCADA, MES, historians, and cloud services already hold the data your teams need, they just run separately, so engineers close the gap by hand. That manual work shows up as engineering hours spent searching and rebuilding, and production hours lost when something breaks with no fast way back. Set your team size, sites, and cost of downtime against it below.</p>
        </div>
        <div class="mt-10">
          <RoiCalculator compact />
        </div>
        <p class="text-center text-sm text-gray-500 mt-8">Want to tune every assumption and see the research behind it? <a href="/resources/roi-calculator/" class="text-indigo-600 font-semibold hover:underline">Open the full ROI calculator</a>.</p>
      </div>
    </section>

    <!-- ============================================================
         APPLICATIONS FOR AUTOMOTIVE MANUFACTURING
    ============================================================ -->
    <section class="w-full relative py-20 px-6 overflow-hidden">
      <div class="absolute inset-x-0 top-0 h-[400px] md:h-[561px] solution-section-bg-flipped" aria-hidden="true" />
      <div class="relative z-10">
        <div class="max-w-screen-lg mx-auto max-md:text-center mb-28 md:mt-10">
          <h2 class="text-indigo-600 text-4xl md:text-5xl">Applications for Automotive Manufacturing</h2>
          <p class="text-gray-600 text-lgmd:text-2xl">See how FlowFuse supports automotive manufacturers with solutions for connectivity, production visibility, downtime reduction, and operational improvement.</p>
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
         AUTOMOTIVE COMPLIANCE & STANDARDS
    ============================================================ -->
    <section class="w-full py-16 md:py-24 px-6 bg-radial-[ellipse_60%_70%_at_center_bottom] from-blue-200/30 to-blue-200/0">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-w-2xl mb-12">
          <h2 class="text-gray-700 mb-2">Automotive <span class="text-indigo-600">Compliance &amp; Standards</span></h2>
          <p class="text-xl font-medium mt-0 mb-4">The Data Your Audit Asks For, In One Place</p>
          <p class="text-gray-600">Automotive carries traceability requirements most industries don't. FlowFuse helps ensure the data an auditor asks for exists and is queryable when they ask for it.</p>
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
        <h2 class="max-md:text-center">Use cases in <span class="text-indigo-600">Automotive</span></h2>
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
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Every automotive manufacturer has different operational challenges. FlowFuse lets you build the automotive manufacturing applications your teams need using the systems already running your plant.</p>
          <CtaBookDemo variant="highlight" position="final-cta" />
        </div>
      </div>
    </div>
  </div>
</template>
