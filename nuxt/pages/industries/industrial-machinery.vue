<script setup lang="ts">
// Industry lens page for industrial machinery, tooling, and precision component
// manufacturers (cutting tools, tool and die, fasteners, abrasives, contract
// precision manufacturing).
//
// Built from nuxt/pages/industries/automotive.vue, which is the house template for
// industry pages. It lives in Nuxt rather than 11ty for the same reason automotive
// does: <RoiCalculator compact /> is a Vue component and cannot render inside 11ty's
// Nunjucks output. src/industries/industrial-machinery.njk is the `permalink: false`
// stub that keeps this page in the `industry` collection so the card grid on
// /industries/ (still 11ty) picks it up.
//
// IMAGES: unlike the other two new industry pages, the screenshots below are real and
// on-topic - they come from the Walter and Abrasive Technology customer stories. Swap
// for purpose-shot application screenshots when marketing has them.
useSeoMeta({
    title: 'Industrial Machinery Manufacturing Applications',
    description: 'Connect CNC machines, PLCs, SCADA, MES, and plant IT systems in one place. FlowFuse helps machinery, tooling, and precision component manufacturers monitor, automate, and standardize production across sites in real time.',
    ogUrl: 'https://flowfuse.com/industries/industrial-machinery/',
    twitterSite: '@FlowFuseinc',
})

// Each figure is sourced from a published customer story, not estimated. Swap for
// vetted industry-scoped counts (the automotive page carries those) once marketing
// has them for this vertical.
const metrics = [
    // src/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge.md
    { number: '130+', text: 'Instances run by Walter’s IT team, scaled up from one' },
    { number: '5', text: 'Siloed systems unified into a single platform at Walter' },
    // Platform capability, same figure the automotive page uses.
    { number: '40+', text: 'Industrial protocols and systems supported out of the box' },
]

const applications = [
    {
        title: 'Connect Machines Across Every Site',
        description: 'No rip and replace; instead, connect CNC machining centers, grinders, EDM, presses, robots, PLCs, SCADA, historians, MES, and ERP using open industrial protocols. Standardize one connectivity pattern and reuse it at every plant instead of rebuilding per site.',
        linkText: 'See how FlowFuse connects your existing systems',
        linkHref: '/use-cases/data-integration/',
        image: '/images/stories/waler-architecture.png',
        imageAlt: 'Architecture diagram of Walter’s FlowFuse deployment connecting machines across sites',
        variant: 'indigo',
    },
    {
        title: 'Monitor Machine Utilization in Real Time',
        description: 'Build production dashboards with low-code and AI assistance to track spindle utilization, cycle time, parts per hour, setup versus run time, alarms, and OEE, using live data from the machines already on your floor.',
        linkText: 'See what production monitoring looks like with FlowFuse',
        linkHref: '/use-cases/production-monitoring/',
        image: '/images/stories/walter-flow.png',
        imageAlt: 'Screenshot of a Node-RED flow feeding a machine utilization dashboard at Walter',
        variant: 'red',
    },
    {
        title: 'Read CNC Data Without a Vendor Gateway',
        description: 'Machine tools speak MTConnect, OPC UA, FOCAS, and a long tail of vendor protocols. FlowFuse reads them directly, normalizes the tags, and sends the result wherever you need it, so a mixed fleet reports the same numbers the same way.',
        linkText: 'Read how to map MTConnect streams with FlowFuse',
        linkHref: '/blog/2026/02/mapping-mtconnect-streams/',
        image: '/images/stories/abrasive-tech-dashboard.png',
        imageAlt: 'Screenshot of a machine monitoring dashboard at Abrasive Technology',
        variant: 'mixed',
    },
    {
        title: 'Move Maintenance Off the Calendar',
        description: 'Spindle load, vibration, temperature, and cycle counts already predict wear. Trigger maintenance on what the machine is actually doing rather than on a fixed interval, and keep the history that shows which failures were caught early.',
        linkText: 'Read how to move from reactive to preventive maintenance',
        linkHref: '/blog/2025/09/preventive-maintenance-equipment-failure/',
        image: '/images/stories/abrasive-tech-dashboard-2.png',
        imageAlt: 'Screenshot of an equipment condition dashboard at Abrasive Technology',
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
        title: 'Run at Rate',
        icon: 'i-heroicons-chart-bar',
        text: 'Customers qualifying your tooling want a demonstrated rate, not a claimed one. FlowFuse records the run as it happens and reports the rate from machine data.',
        linkText: 'Learn more about running a Run at Rate study',
        linkHref: '/blog/2026/08/run-at-rate/',
    },
    {
        title: 'IEC 62443 & NIS2',
        icon: 'i-heroicons-shield-check',
        text: 'Connecting machines widens the attack surface unless the connection layer is governed. FlowFuse adds role-based access, audit logging, and controlled deployment to OT integrations.',
        linkText: 'Learn more about NIS2 and IEC 62443 for manufacturers',
        linkHref: '/blog/2026/05/nis2-iec-62443-manufacturers/',
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
        title: 'MES',
        problem: 'Build exactly the MES your operation needs, compose modular execution, tracking, and reporting flows without a monolithic vendor platform.',
        href: '/use-cases/mes/',
    },
    {
        title: 'Data Integration',
        problem: 'Collect, transform, and route data from any industrial source to any destination, without writing integration code from scratch.',
        href: '/use-cases/data-integration/',
    },
]

const faqs = [
    {
        question: 'Can FlowFuse read data from a mixed fleet of CNC machines?',
        answer: 'Yes. FlowFuse connects to machine tools over MTConnect, OPC UA, FOCAS, Modbus TCP and RTU, EtherNet/IP, and Siemens S7, and normalizes the tags in the flow. A Fanuc control and a Siemens control can feed the same utilization dashboard without a per-vendor gateway product.',
    },
    {
        question: 'We are a small IT team supporting many machines. Does this add headcount?',
        answer: 'It is the opposite problem FlowFuse is usually brought in to solve. Walter scaled from a single production unit to more than 130 instances with the same IT team, because flows are built once, version controlled, and deployed to every site rather than rebuilt per machine.',
    },
    {
        question: 'How does FlowFuse handle high-mix, low-volume job shop work?',
        answer: 'Job and setup data is treated the same as machine data. FlowFuse associates cycle, inspection, and operator entries with the job or work order identifier as they are captured, so setup time, run time, and yield can be reported per job rather than only per machine.',
    },
    {
        question: 'Can older machines with no network interface be included?',
        answer: 'Yes. Machines that predate the plant network can be brought in over RS232 or RS485, or by wiring run, stop, and cycle-complete signals into an edge device running the FlowFuse Device Agent. That is often the fastest way to get honest utilization numbers from legacy equipment.',
    },
    {
        question: 'Can FlowFuse run air-gapped in a plant with no cloud connectivity?',
        answer: 'Yes. FlowFuse supports self-hosted, on-premises, and air-gapped deployments for manufacturing with strict network isolation requirements.',
    },
    {
        question: 'How is this different from the monitoring software our machine vendor sells?',
        answer: 'Vendor monitoring covers that vendor’s machines and reports in that vendor’s terms. FlowFuse sits above the fleet, so one definition of utilization or OEE applies across every brand you run, and the data stays yours to route into ERP, quality systems, or your own analytics.',
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
                <span class="w-5 h-5 inline-flex items-center shrink-0"><UIcon name="i-heroicons-wrench-screwdriver" class="size-5" /></span>
                <span class="font-medium">Industrial Machinery Manufacturing</span>
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-medium m-0">
              <span class="text-red-600">Scale machinery operations</span> without rewiring your stack
            </h1>
            <p class="mt-6 text-gray-700">Connect CNC machines, PLCs, SCADA, MES, and plant IT systems in one place. FlowFuse helps teams monitor, automate, and standardize production workflows across sites in real time.</p>
            <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
              <CtaBookDemo variant="highlight" position="hero" />
              <CtaPricing variant="ghost" position="hero" icon="i-lucide-arrow-right" />
            </div>
          </div>
          <div class="w-full md:flex md:items-center">
            <div class="relative w-full md:pt-6 max-md:mt-10">
              <!--
                Quote and attribution from src/_data/testimonials.json (testimonial1) and
                src/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge.md.
                The circle carries the Walter facility photo, not a headshot - no headshot
                for Felix Reck exists in the repo. TODO(image): swap in a headshot if cleared.
              -->
              <div class="relative rounded-lg border border-indigo-200 p-6 pt-28 bg-indigo-50/50">
                <div class="absolute -top-14 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-36 h-36 rounded-full bg-red-200 border-4 border-white shadow-lg overflow-hidden ff-image-cover">
                  <img src="/images/stories/walter.png" alt="Walter Tools manufacturing facility" loading="eager">
                </div>
                <p class="italic text-gray-600 font-medium m-0">&ldquo;Without FlowFuse, I would be able to support maybe one production unit, but that's it. FlowFuse gives us the chance to deliver what the business asks us for while maintaining our small team size. It's not just about connecting machines, it's about creating the foundation that makes everything else possible.&rdquo;</p>
                <p class="text-gray-500 text-right mt-4 mb-0">Felix Reck, IT Application Manager, <span class="font-semibold text-gray-600">Walter</span></p>
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
          <p class="text-gray-600 m-0">Machining centers, grinders, robots, SCADA, MES, and ERP already hold the data your teams need; they just don't talk to each other. Closing that gap manually costs engineering hours spent searching and rebuilding, and spindle hours when a machine sits idle with no one aware. See what that's costing you below.</p>
        </div>
        <div class="mt-10">
          <RoiCalculator compact />
        </div>
        <p class="text-center text-sm text-gray-500 mt-8">Want to tune every assumption and see the research behind it? <a href="/resources/roi-calculator/" class="text-indigo-600 font-semibold hover:underline">Open the full ROI calculator</a>.</p>
      </div>
    </section>

    <!-- ============================================================
         APPLICATIONS FOR INDUSTRIAL MACHINERY MANUFACTURING
    ============================================================ -->
    <section class="w-full relative py-20 px-6 overflow-hidden">
      <div class="absolute inset-x-0 top-0 h-[400px] md:h-[561px] solution-section-bg-flipped" aria-hidden="true" />
      <div class="relative z-10">
        <div class="max-w-screen-lg mx-auto max-md:text-center mb-28 md:mt-10">
          <h2 class="text-indigo-600 text-4xl md:text-5xl">Applications for Industrial Machinery Manufacturing</h2>
          <p class="text-gray-600 text-lgmd:text-2xl">See how FlowFuse supports machinery, tooling, and precision component manufacturers with solutions for connectivity, machine utilization, maintenance, and multi-site standardization.</p>
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
         INDUSTRIAL MACHINERY COMPLIANCE & STANDARDS
    ============================================================ -->
    <section class="w-full py-16 md:py-24 px-6 bg-radial-[ellipse_60%_70%_at_center_bottom] from-blue-200/30 to-blue-200/0">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-w-2xl mb-12">
          <h2 class="text-gray-700 mb-2">Industrial Machinery <span class="text-indigo-600">Compliance &amp; Standards</span></h2>
          <p class="text-xl font-medium mt-0 mb-4">The Data Your Audit Asks For, In One Place</p>
          <p class="text-gray-600">Supplying regulated customers means your own process gets audited too. FlowFuse helps ensure the data an auditor asks for exists and is queryable when they ask for it.</p>
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
        <h2 class="max-md:text-center">Use cases in <span class="text-indigo-600">Industrial Machinery</span></h2>
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
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Every machinery and tooling manufacturer runs a different mix of machines, jobs, and customers. FlowFuse lets you build the applications your teams need using the systems already running your plant.</p>
          <CtaBookDemo variant="highlight" position="final-cta" />
        </div>
      </div>
    </div>
  </div>
</template>
