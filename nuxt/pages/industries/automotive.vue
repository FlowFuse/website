<script setup lang="ts">
// Ported from src/industries/automotive.njk (11ty), which this replaces. Same page, same
// copy, same classes from src/css/style.css.
//
// This is the one industry page that did NOT use layouts/industry.njk - it has its own
// sections (testimonial hero, metrics, applications, enterprise, compliance), so it stays
// a hand-written page rather than being forced into the shared block set. It does reuse
// the derived use-case grid, which is the one band it shared with that layout.
//
// What the port changes on purpose:
//  - The "Built for Enterprise Manufacturing" section becomes <EnterpriseSecurity>, which
//    was extracted from this very block when /product/ and /pricing/ were ported. It uses
//    its own radial-gradient background where this page had comparison-section-bg, and a
//    lucide arrow on its link; that is the shared component's look, not a new choice here.
//  - The four compliance glyphs, which the .njk {% include %}d raw with no wrapper, become
//    <SiteArt>: they take their colour from `currentColor` on the container, so an <img>
//    would lose it, and NavIcon's wrapper would override the container's size.
//  - The eyebrow glyph keeps the NavIcon wrapper, which is what that markup had.
//  - faq.njk becomes <BlogFaq> plus useSchemaOrg; cta-get-started.njk becomes the markup
//    below with <CtaBookDemo>; social-proof.njk becomes <SocialProof>.
//  - Frontmatter carrying <span class="text-…"> went through `| safe`. The headings are
//    written as template markup here, so nothing interpolates an HTML string.
const HERO = {
    eyebrow: 'Automotive Manufacturing',
    eyebrowIcon: 'car',
    description: 'Connect PLCs, SCADA, MES, and plant IT systems in one place. FlowFuse helps teams monitor, automate, and standardize production workflows across plants in real time.',
    testimonial: {
        quote: 'At PennEngineering, I built out the FlowFuse deployment from scratch: machine monitoring, machine dashboards, ERP integration. What FlowFuse gave us was revision control and a platform the whole team could own. That made the deployment self-sustaining.',
        name: 'Lidiya Shutaya',
        title: 'Sr. Operational Technology System Architect,',
        company: 'PennEngineering (formerly)',
        avatar: '/images/industries/automotive/headshot-lidiya-shutaya-metaltec-and-pen.png',
    },
    trustedByText: '30+ automotive manufacturers in 20 countries have run their operations on FlowFuse',
}

const METRICS = [
    { number: '300+', text: 'Automotive applications built' },
    { number: '120+', text: 'Plants or production lines running FlowFuse' },
    { number: '40+', text: 'Industrial protocols and systems supported out of the box' },
]

const PROBLEM = {
    heading: 'Not Every Production Challenge Requires a New Platform',
    description: "Most production challenges don't require new hardware or replacing existing systems. The real challenge is that PLCs, robots, SCADA, MES, historians, databases, and cloud services operate separately, creating disconnected data and manual processes. FlowFuse brings these systems together to build, deploy, and manage automotive manufacturing applications using your existing infrastructure.",
    image: '/images/industries/automotive-line-stoppage.jpg',
    imageAlt: 'Automotive assembly line with robotic welding stations and real-time production monitoring for line stoppage detection and incident management.',
}

// The panel behind each application screenshot, keyed by the item's `variant`.
const VARIANTS = {
    indigo: { gradient: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300', mobileGradient: 'from-indigo-100 to-indigo-50', mobileBorder: 'border-indigo-200' },
    red: { gradient: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100', mobileGradient: 'from-red-50 to-white', mobileBorder: 'border-red-100' },
    mixed: { gradient: 'from-red-200 to-indigo-100', border: 'border-indigo-100', mobileGradient: 'from-red-50 to-indigo-50', mobileBorder: 'border-indigo-100' },
} as const

const APPLICATIONS = {
    heading: 'Applications for Automotive Manufacturing',
    description: 'See how FlowFuse supports automotive manufacturers with solutions for connectivity, production visibility, downtime reduction, and operational improvement.',
    items: [
        { title: 'Connect Your Existing Manufacturing Systems', description: 'No rip and replace; instead, connect PLCs, robots, SCADA, historians, MES, ERP systems, databases, and cloud services using open industrial protocols. Bring data from across your factory into one platform to build custom low-code applications.', linkText: 'See how FlowFuse connects your existing systems', linkHref: '/use-cases/data-integration/', image: '/images/industries/automotive/1-connect-systems.png', imageAlt: 'Screenshot of a FlowFuse application connecting manufacturing systems', variant: 'indigo' as const },
        { title: 'Monitor Production in Real Time', description: 'Build production dashboards with low-code and AI assistance to monitor machine status, production counts, cycle time, OEE, alarms, and line performance using live data from your manufacturing systems.', linkText: 'See what production monitoring looks like with FlowFuse', linkHref: '/use-cases/production-monitoring/', image: '/images/industries/automotive/2-monitor-production.png', imageAlt: 'Screenshot of a real-time production monitoring dashboard', variant: 'red' as const },
        { title: 'Reduce Downtime with Live Visibility', description: 'Automatically detect stoppages, capture downtime events, analyze root causes, and understand where production time is being lost with applications built on live machine data.', linkText: 'Read how to build a downtime logger', linkHref: '/blog/2026/07/build-downtime-logger/', image: '/images/industries/automotive/3-reduce-downtime.png', imageAlt: 'Screenshot of a live downtime tracking dashboard', variant: 'mixed' as const },
        { title: 'Improve Quality with Complete Traceability', description: 'Trace every VIN and manufactured part through its complete production history, including torque values, weld parameters, barcode scans, batch records, and vision inspection results to accelerate investigations and improve quality.', linkText: 'Read how to build a defect and quality monitoring dashboard', linkHref: '/blog/2026/07/defect-and-quality-monitoring/', image: '/images/industries/automotive/4-quality-traceability.png', imageAlt: 'Screenshot of a quality traceability application', variant: 'indigo' as const },
    ],
}

// <EnterpriseSecurity>'s defaults already carry this page's heading, badge label, item
// list and link, because that component was extracted from this very block. Only the
// description is passed, and only so the divergence is obvious if either side changes.
const ENTERPRISE = {
    description: 'FlowFuse is SOC 2 Type I and Type II certified, with role-based access control, single sign-on, audit logging, and air-gapped, self-hosted deployment options, built for the security and compliance requirements of large-scale manufacturing organizations.',
}

const COMPLIANCE = {
    subtitle: 'The Data Your Audit Asks For, In One Place',
    description: "Automotive carries traceability requirements most industries don't. FlowFuse helps ensure the data an auditor asks for exists and is queryable when they ask for it.",
    items: [
        { title: 'IATF 16949', icon: 'certificate', text: 'Asks for ongoing process audits. FlowFuse captures layered process audit findings and corrective actions so evidence stays current between visits.', linkText: 'Learn more about how FlowFuse supports layered process audits', linkHref: '/blog/2026/08/layered-process-audit/' },
        { title: 'VDA 6.3', icon: 'clipboard-document-check', text: 'Asks for objective evidence that production matches documentation. FlowFuse connects machines, PLCs, and quality systems so that evidence is easy to retrieve.', linkText: 'Learn more about how FlowFuse supports VDA 6.3 process audits', linkHref: '/blog/2026/08/vda-6.3/' },
        { title: 'Control Plans', icon: 'document-chart-bar', text: 'Asks what to measure, how often, and how to react. FlowFuse links that plan to live measurement data instead of a manual cross-check.', linkText: 'Learn more about how FlowFuse connects control plans to production data', linkHref: '/blog/2026/08/control-plans/' },
        { title: 'Recall defense', icon: 'shield-check', text: 'FlowFuse traces a VIN back through every recorded step, fast.', linkText: 'Learn more about how FlowFuse enables automotive traceability', linkHref: '/blog/2026/08/automotive-traceability/' },
    ],
}

const CTA = {
    title: 'Bring your production challenge',
    description: 'Every automotive manufacturer has different operational challenges. FlowFuse lets you build the automotive manufacturing applications your teams need using the systems already running your plant.',
    position: 'final-cta',
}

const FAQ = [
    { question: 'How do I trace a VIN through body shop, paint, and assembly?', answer: "FlowFuse allows you to collect data from each station, associate it with the relevant VIN as it's captured, and route it to the systems where that data is stored and used. This connects weld records, paint parameters, torque results, inspection outcomes, and other production data across the vehicle's journey, making it easier to build a complete production history." },
    { question: 'Can FlowFuse get OEE from a line with mixed Siemens and Allen-Bradley PLCs?', answer: 'Yes. FlowFuse reads tag data from both S7 and EtherNet/IP-connected PLCs in the same flow, normalizes it, and calculates OEE metrics regardless of which controller brand runs which station.' },
    { question: 'What does IATF 16949 require for production data retention?', answer: 'IATF 16949 requires traceable records of process parameters, torque, weld, and inspection data, retained at a level of detail that supports root-cause investigation and audit. FlowFuse allows you to capture this data at the source, connect and process it, and route it to the systems where it can be stored and queried for quality, traceability, and audit needs.' },
    { question: 'How long does FlowFuse deployment take on one line versus twenty plants?', answer: 'Deployment time depends on the complexity of the application, the plant environment, and the systems being connected. Once a flow is built and validated, it can be reused and deployed across additional lines or plants rather than rebuilt from scratch each time, helping reduce the integration effort involved in scaling.' },
    { question: 'Can FlowFuse run air-gapped in a plant with no cloud connectivity?', answer: 'Yes. FlowFuse supports self-hosted, on-premises, and air-gapped deployments for manufacturing with strict network isolation requirements.' },
    { question: 'How is this FlowFuse different from adding a module to our existing MES?', answer: "MES modules are built for standard workflows. FlowFuse handles the plant-specific gaps (custom quality gates, one-off traceability rules, non-standard handovers) that MES modules typically can't cover without a vendor change request." },
]

useSeoMeta({
    title: 'Automotive Manufacturing Applications | FlowFuse',
    description: HERO.description,
    ogDescription: HERO.description,
    ogImage: 'https://flowfuse.com/images/industries/automotive.jpg',
    ogUrl: 'https://flowfuse.com/industries/automotive/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: item.answer })),
])
</script>

<template>
  <div class="w-full">
    <section class="w-full relative">
      <div class="px-6 pt-16 md:pt-20">
        <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-stretch">
          <div class="max-md:text-center md:flex md:flex-col md:justify-center">
            <div class="mb-4 max-md:flex max-md:justify-center">
              <span class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 industry-eyebrow-icon text-gray-800">
                <span class="w-5 h-5 inline-flex items-center shrink-0"><NavIcon :name="HERO.eyebrowIcon" /></span>
                <span class="font-medium">{{ HERO.eyebrow }}</span>
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-medium m-0">
              <span class="text-red-600">Scale automotive operations</span> without rewiring your stack
            </h1>
            <p class="mt-6 text-gray-700">{{ HERO.description }}</p>
            <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
              <CtaBookDemo variant="highlight" position="hero" />
              <CtaPricing variant="ghost" position="hero" icon />
            </div>
          </div>
          <div class="w-full md:flex md:items-center">
            <div class="relative w-full md:pt-6 max-md:mt-10">
              <div class="relative rounded-lg border border-indigo-200 p-6 pt-28 bg-indigo-50/50">
                <div class="absolute -top-14 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-36 h-36 rounded-full bg-red-200 border-4 border-white shadow-lg overflow-hidden ff-image-cover">
                  <img :src="HERO.testimonial.avatar" :alt="HERO.testimonial.name" class="w-full h-auto">
                </div>
                <p class="italic text-gray-600 font-medium m-0">&ldquo;{{ HERO.testimonial.quote }}&rdquo;</p>
                <p class="text-gray-500 text-right mt-4 mb-0">
                  {{ HERO.testimonial.name }}, {{ HERO.testimonial.title }}
                  <span class="font-semibold text-gray-600">{{ HERO.testimonial.company }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-screen-lg mx-auto mt-16 text-center">
          <div class="mx-auto text-center -mt-0.5 -mb-10">
            <SocialProof :eyebrow="HERO.trustedByText" />
          </div>
        </div>
        <div class="max-w-md sm:max-w-screen-lg mx-auto mt-16 pb-10 bg-radial-red">
          <div class="grid sm:grid-cols-3 gap-12 my-4 max-sm:w-full m-auto">
            <div v-for="metric in METRICS" :key="metric.number" class="w-full h-full rounded-lg bg-red-50/70 pb-3 px-6 pt-6">
              <h3 class="text-5xl font-semibold text-red-400">{{ metric.number }}</h3>
              <p class="mt-0 font-normal leading-6">{{ metric.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full py-16 md:py-24 px-6 bg-white">
      <div class="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-12 items-stretch">
        <div class="md:w-1/2 relative">
          <div class="ff-image-cover ff-image-rounded w-full h-full">
            <img :src="PROBLEM.image" :alt="PROBLEM.imageAlt" width="720" class="w-full h-auto">
          </div>
        </div>
        <div class="md:w-1/2 max-md:text-center md:pt-6 self-center">
          <h2 class="text-gray-700">{{ PROBLEM.heading }}</h2>
          <p class="text-gray-700">{{ PROBLEM.description }}</p>
        </div>
      </div>
    </section>

    <section class="w-full relative py-20 px-6 overflow-hidden">
      <div class="absolute inset-x-0 top-0 h-[400px] md:h-[561px] solution-section-bg-flipped" aria-hidden="true" />
      <div class="relative z-10">
        <div class="max-w-screen-lg mx-auto max-md:text-center mb-28 md:mt-10">
          <h2 class="text-indigo-600 text-4xl md:text-5xl">{{ APPLICATIONS.heading }}</h2>
          <p class="text-gray-600 text-lgmd:text-2xl">{{ APPLICATIONS.description }}</p>
        </div>

        <div class="md:max-w-screen-lg mx-auto">
          <div
              v-for="(item, i) in APPLICATIONS.items"
              :key="item.title"
              class="max-md:text-center md:flex md:flex-row gap-8 items-center m-auto mb-14 md:mb-20"
              :class="{ 'md:flex-row-reverse': i % 2 === 1 }"
          >
            <div class="max-md:hidden md:w-[45%]">
              <div class="relative aspect-[430/289]">
                <div
                    class="absolute -top-5 w-full h-full rounded-lg bg-gradient-to-tl"
                    :class="[VARIANTS[item.variant].gradient, i % 2 === 0 ? '-left-5' : '-right-5']"
                />
                <div class="absolute inset-0 rounded-lg border-2 overflow-hidden ff-image-cover" :class="VARIANTS[item.variant].border">
                  <img :src="item.image" :alt="item.imageAlt" width="860" class="w-full h-auto">
                </div>
              </div>
            </div>
            <div class="md:w-[55%] flex flex-col gap-3">
              <h3 class="text-gray-700 text-3xl font-medium m-0">{{ item.title }}</h3>
              <div class="md:hidden rounded-xl w-full bg-gradient-to-tl max-w-[500px] mx-auto my-4 p-4" :class="VARIANTS[item.variant].mobileGradient">
                <div class="ff-image-rounded w-full border overflow-hidden" :class="VARIANTS[item.variant].mobileBorder">
                  <img :src="item.image" :alt="item.imageAlt" width="440" loading="lazy" class="w-full h-auto">
                </div>
              </div>
              <p class="text-gray-500 m-0">{{ item.description }}</p>
              <NuxtLink :to="item.linkHref" class="flex items-center gap-1.5 text-blue-600 hover:underline max-md:justify-center">
                {{ item.linkText }}
                <UIcon name="i-heroicons-arrow-long-right" class="shrink-0 w-5 h-5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <EnterpriseSecurity :description="ENTERPRISE.description" />

    <section class="w-full py-16 md:py-24 px-6 bg-radial-[ellipse_60%_70%_at_center_bottom] from-blue-200/30 to-blue-200/0">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-w-2xl mb-12">
          <h2 class="text-gray-700 mb-2">Automotive <span class="text-indigo-600">Compliance &amp; Standards</span></h2>
          <p class="text-xl font-medium mt-0 mb-4">{{ COMPLIANCE.subtitle }}</p>
          <p class="text-gray-600">{{ COMPLIANCE.description }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <NuxtLink
              v-for="item in COMPLIANCE.items"
              :key="item.title"
              :to="item.linkHref"
              class="group hover:no-underline flex flex-col gap-3 rounded-xl border border-gray-200 p-5 bg-white hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div class="w-6 h-6 text-indigo-600"><SiteArt :name="item.icon" /></div>
            <h3 class="m-0 text-lg font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">{{ item.title }}</h3>
            <p class="m-0 text-gray-600 text-sm flex-grow">{{ item.text }}</p>
            <span class="mt-2 text-blue-600 text-sm flex items-center gap-1.5 group-hover:underline">
              {{ item.linkText }}
              <UIcon name="i-heroicons-arrow-long-right" class="shrink-0 w-4 h-4" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <IndustryMatchingUseCases slug="automotive" display-name="Automotive" />

    <div class="w-full px-6 pt-20 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <div class="-mt-20">
          <BlogFaq :faq="FAQ" />
        </div>
      </div>
    </div>

    <div class="w-full px-6 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-5xl font-medium m-0">{{ CTA.title }}</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">{{ CTA.description }}</p>
          <CtaBookDemo variant="highlight" :position="CTA.position" />
        </div>
      </div>
    </div>
  </div>
</template>
