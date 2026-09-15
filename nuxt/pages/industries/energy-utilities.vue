<script setup lang="ts">
// Industry lens page for energy and utilities: grid and transmission operators,
// water and wastewater, irrigation districts, municipal utilities, and distributed
// energy operations.
//
// Deliberately distinct from /industries/renewables/, which is about generation asset
// fleets (solar, wind, storage). This page is about distributed operational
// infrastructure - remote sites, RTUs, pump and pumping stations, SCADA, and the
// regulatory reporting that comes with running public infrastructure. The two pages
// cross-link rather than overlap.
//
// Built from nuxt/pages/industries/automotive.vue, which is the house template for
// industry pages. It lives in Nuxt rather than 11ty for the same reason automotive
// does: <RoiCalculator compact /> is a Vue component and cannot render inside 11ty's
// Nunjucks output. src/industries/energy-utilities.njk is the `permalink: false`
// stub that keeps this page in the `industry` collection so the card grid on
// /industries/ (still 11ty) picks it up.
//
// IMAGES: the first two applications use real Energinet and Paloma story images. The
// last two are placeholders borrowed from the automotive page - generic FlowFuse UI,
// so nothing is misrepresented, but not utility applications. See TODO(image).
useSeoMeta({
    title: 'Energy & Utilities Operations Applications',
    description: 'Connect SCADA, RTUs, pumping stations, meters, and remote sites in one place. FlowFuse helps energy and utility teams monitor, automate, and report on distributed infrastructure in real time.',
    ogUrl: 'https://flowfuse.com/industries/energy-utilities/',
    twitterSite: '@FlowFuseinc',
})

// Each figure is sourced from a published customer story, not estimated. Swap for
// vetted industry-scoped counts (the automotive page carries those) once marketing
// has them for this vertical.
const metrics = [
    // src/customer-stories/energinet-streamlining-critical-infrastructure-data-management.md
    { number: '7,000 km', text: 'Of grid infrastructure with data governed through FlowFuse at Energinet' },
    // src/customer-stories/leveraging-node-red-and-flowfuse-to-revolutionize-irrigation.md
    { number: '185,000', text: 'Acre-feet of water delivered annually with FlowFuse at Paloma Irrigation' },
    // Platform capability, same figure the automotive page uses.
    { number: '40+', text: 'Industrial protocols and systems supported out of the box' },
]

const applications = [
    {
        title: 'Connect SCADA, RTUs, and Remote Sites',
        description: 'No rip and replace; instead, connect SCADA systems, RTUs, PLCs, meters, sensors, and historians to databases, analytics, and cloud services using open industrial protocols including DNP3, Modbus, OPC UA, MQTT, and LoRaWAN. One governed layer instead of a script per site.',
        linkText: 'See how FlowFuse connects your existing systems',
        linkHref: '/use-cases/data-integration/',
        image: '/images/stories/energinet.jpg',
        imageAlt: 'Energinet grid infrastructure',
        variant: 'indigo',
    },
    {
        title: 'Operate Distributed Assets Without the Drive',
        description: 'Pumping stations, lift stations, gates, and substations are rarely close together. Build dashboards and controls that let operators see status and act from where they are, the way Paloma Irrigation removed the need to travel to pumping stations for normal operation.',
        linkText: 'Read how Paloma Irrigation operates its network with FlowFuse',
        linkHref: '/customer-stories/leveraging-node-red-and-flowfuse-to-revolutionize-irrigation/',
        image: '/images/stories/pidd-view.png',
        imageAlt: 'Water control structure in the Paloma Irrigation and Drainage District network',
        variant: 'red',
    },
    {
        title: 'Keep the Record Intact When the Link Drops',
        description: 'Remote sites lose connectivity, and a gap in the telemetry record is a gap in the report you have to file. Buffer readings at the edge and forward them when the link returns, so the history stays continuous rather than merely recent.',
        linkText: 'Read how store and forward edge buffering works',
        linkHref: '/blog/2025/11/store-and-forward-edge-data-buffering/',
        image: '/images/industries/automotive/3-reduce-downtime.png', // TODO(image): edge buffering / remote site screenshot
        imageAlt: 'Screenshot of an edge data buffering and site connectivity dashboard',
        variant: 'mixed',
    },
    {
        title: 'Get Alarms to the Person on Call',
        description: 'An alarm that sits on a screen nobody is watching is not an alarm. Route events to the right person by asset, severity, and shift, escalate when they are not acknowledged, and keep the record of who was told and when.',
        linkText: 'Read how to build an event-driven escalation workflow',
        linkHref: '/blog/2026/06/event-driven-downtime-escalation-workflow/',
        image: '/images/industries/automotive/4-quality-traceability.png', // TODO(image): alarm escalation screenshot
        imageAlt: 'Screenshot of an alarm routing and escalation dashboard',
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
        title: 'IEC 62443 & NIS2',
        icon: 'i-heroicons-shield-check',
        text: 'Critical infrastructure operators have to show the OT integration layer is governed, not improvised. FlowFuse adds role-based access, audit logging, and controlled deployment to every connection.',
        linkText: 'Learn more about NIS2 and IEC 62443 for operators',
        linkHref: '/blog/2026/05/nis2-iec-62443-manufacturers/',
    },
    {
        title: 'OPC UA security',
        icon: 'i-heroicons-lock-closed',
        text: 'A misconfigured OPC UA endpoint is a route into the control network. FlowFuse connects with certificates, signing, and encryption rather than an anonymous open endpoint.',
        linkText: 'Learn more about OPC UA security best practices',
        linkHref: '/blog/2026/06/opc-ua-security-best-practices/',
    },
    {
        title: 'Regulatory reporting',
        icon: 'i-heroicons-document-chart-bar',
        text: 'Regulators ask for the same figures on a schedule. FlowFuse generates those reports from the operational data already captured instead of a monthly spreadsheet exercise.',
        linkText: 'Learn more about generating reports from operational data',
        linkHref: '/blog/2025/05/how-to-generate-pdf-reports-using-node-red/',
    },
    {
        title: 'Time synchronization',
        icon: 'i-heroicons-clock',
        text: 'Sequence-of-events analysis only works if every site agrees what time it is. FlowFuse keeps edge timestamps aligned so a post-event reconstruction holds up.',
        linkText: 'Learn more about time synchronization across edge devices',
        linkHref: '/blog/2026/07/time-synchronization-edge-devices/',
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
        title: 'SCADA',
        problem: 'Modernize SCADA with low-code flows that connect legacy hardware, stream real-time data, and drive dashboards and alerts from a single platform.',
        href: '/use-cases/scada/',
    },
    {
        title: 'Production Monitoring',
        problem: "Your operation is running. You just can't see it clearly enough, until something breaks.",
        href: '/use-cases/production-monitoring/',
    },
    {
        title: 'Data Integration',
        problem: 'Collect, transform, and route data from any industrial source to any destination, without writing integration code from scratch.',
        href: '/use-cases/data-integration/',
    },
]

const faqs = [
    {
        question: 'Can FlowFuse connect to our existing SCADA rather than replacing it?',
        answer: 'Yes, and that is the usual deployment. FlowFuse sits alongside SCADA, reads from it over OPC UA, Modbus, DNP3, or a database connection, and routes that data to historians, analytics, reporting, and cloud services. SCADA keeps doing supervisory control; FlowFuse handles the integration and application layer above it.',
    },
    {
        question: 'How does FlowFuse handle sites with intermittent or low-bandwidth connectivity?',
        answer: 'Edge instances running the FlowFuse Device Agent buffer readings locally and forward them when the link returns, so the record stays continuous. Cellular, satellite, and LoRaWAN-connected sites are common deployments, and payloads can be filtered or compressed at the edge to keep bandwidth costs down.',
    },
    {
        question: 'Can operators control equipment from a FlowFuse dashboard, not just view it?',
        answer: 'Yes. Dashboards can write back to PLCs and RTUs, with role-based access control determining who is permitted to act and audit logging recording what was changed and by whom. How much control is exposed is a decision each operator makes for their own risk posture.',
    },
    {
        question: 'Is FlowFuse suitable for critical infrastructure with strict network isolation?',
        answer: 'Yes. FlowFuse supports self-hosted, on-premises, and air-gapped deployments, and Energinet, Denmark’s national transmission system operator, uses it as a governed orchestration layer across roughly 7,000 km of grid infrastructure.',
    },
    {
        question: 'How is this different from our historian or analytics platform?',
        answer: 'A historian stores time-series data and an analytics platform interprets it. Neither gets the data out of a mixed fleet of RTUs, meters, and legacy controllers in the first place, or acts on it. FlowFuse is the layer that connects, normalizes, and routes, and it feeds the historian rather than competing with it.',
    },
    {
        question: 'We operate renewable generation as well. Is this the right page?',
        answer: 'If your focus is a fleet of solar, wind, or storage assets, the renewables page covers that directly. Many operators run both, and the same FlowFuse deployment serves generation assets and distribution infrastructure together.',
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
                <span class="w-5 h-5 inline-flex items-center shrink-0"><UIcon name="i-heroicons-bolt" class="size-5" /></span>
                <span class="font-medium">Energy &amp; Utilities</span>
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-medium m-0">
              <span class="text-red-600">Scale utility operations</span> without rewiring your stack
            </h1>
            <p class="mt-6 text-gray-700">Connect SCADA, RTUs, pumping stations, meters, and remote sites in one place. FlowFuse helps teams monitor, automate, and report on distributed infrastructure in real time.</p>
            <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
              <CtaBookDemo variant="highlight" position="hero" />
              <CtaPricing variant="ghost" position="hero" icon="i-lucide-arrow-right" />
            </div>
          </div>
          <div class="w-full md:flex md:items-center">
            <div class="relative w-full md:pt-6 max-md:mt-10">
              <!--
                Quote and attribution from src/_data/testimonials.json (testimonial4) and
                src/customer-stories/leveraging-node-red-and-flowfuse-to-revolutionize-irrigation.md.
                The circle carries a district network photo, not a headshot - no headshot
                for Robert VanHofwegen exists in the repo. TODO(image): swap in a headshot
                if cleared.
              -->
              <div class="relative rounded-lg border border-indigo-200 p-6 pt-28 bg-indigo-50/50">
                <div class="absolute -top-14 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-36 h-36 rounded-full bg-red-200 border-4 border-white shadow-lg overflow-hidden ff-image-cover">
                  <img src="/images/stories/pidd-view.png" alt="Water control structure in the Paloma Irrigation and Drainage District network" loading="eager">
                </div>
                <p class="italic text-gray-600 font-medium m-0">&ldquo;Once we settled on using Node-RED, we knew we needed a solution to help us manage our edge devices as well as our central control system. FlowFuse has helped us take our Node-RED from proof-of-concept through to a reliable, scalable solution for the future.&rdquo;</p>
                <p class="text-gray-500 text-right mt-4 mb-0">Robert VanHofwegen, <span class="font-semibold text-gray-600">Paloma Irrigation and Drainage District</span></p>
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
          <p class="text-gray-600 m-0">SCADA, RTUs, meters, historians, and the cloud services layered on top already hold the data your teams need; they just don't talk to each other. Closing that gap manually costs engineering hours spent searching and rebuilding, and service hours when a site fails with nobody aware. See what that's costing you below.</p>
        </div>
        <div class="mt-10">
          <RoiCalculator compact />
        </div>
        <p class="text-center text-sm text-gray-500 mt-8">Want to tune every assumption and see the research behind it? <a href="/resources/roi-calculator/" class="text-indigo-600 font-semibold hover:underline">Open the full ROI calculator</a>.</p>
      </div>
    </section>

    <!-- ============================================================
         APPLICATIONS FOR ENERGY & UTILITIES
    ============================================================ -->
    <section class="w-full relative py-20 px-6 overflow-hidden">
      <div class="absolute inset-x-0 top-0 h-[400px] md:h-[561px] solution-section-bg-flipped" aria-hidden="true" />
      <div class="relative z-10">
        <div class="max-w-screen-lg mx-auto max-md:text-center mb-28 md:mt-10">
          <h2 class="text-indigo-600 text-4xl md:text-5xl">Applications for Energy &amp; Utilities</h2>
          <p class="text-gray-600 text-lgmd:text-2xl">See how FlowFuse supports energy and utility operators with solutions for connectivity, remote site operations, data integrity, and alarm response.</p>
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
         ENERGY & UTILITIES COMPLIANCE & STANDARDS
    ============================================================ -->
    <section class="w-full py-16 md:py-24 px-6 bg-radial-[ellipse_60%_70%_at_center_bottom] from-blue-200/30 to-blue-200/0">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-w-2xl mb-12">
          <h2 class="text-gray-700 mb-2">Energy &amp; Utilities <span class="text-indigo-600">Compliance &amp; Standards</span></h2>
          <p class="text-xl font-medium mt-0 mb-4">The Data Your Audit Asks For, In One Place</p>
          <p class="text-gray-600">Running public infrastructure carries obligations most industries don't. FlowFuse helps ensure the data a regulator or auditor asks for exists and is queryable when they ask for it.</p>
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
        <h2 class="max-md:text-center">Use cases in <span class="text-indigo-600">Energy &amp; Utilities</span></h2>
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
        <p class="mt-8 text-gray-600">Operating a fleet of solar, wind, or storage assets as well? <a href="/industries/renewables/" class="text-indigo-600 font-semibold hover:underline">See the renewables page</a>.</p>
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
          <p class="text-white text-5xl font-medium m-0">Bring your operational challenge</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Every utility runs a different mix of sites, assets, and reporting obligations. FlowFuse lets you build the applications your teams need using the systems already running your network.</p>
          <CtaBookDemo variant="highlight" position="final-cta" />
        </div>
      </div>
    </div>
  </div>
</template>
