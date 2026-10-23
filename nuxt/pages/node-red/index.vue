<script setup lang="ts">
// /node-red/ for the enterprise. Visitors here already know Node-RED, so the page doesn't explain
// it. It shows how FlowFuse relates to Node-RED and how it differs, who it's for (teams running
// Node-RED in production at scale), what it adds, and proof, then asks them to talk to us.
// Every link in the body goes to a top-of-funnel page rather than the docs, except where an
// FAQ answer needs the detail.
import { faqAnswerText } from '../../lib/faq-answer.mjs'

const META_TITLE = 'Node-RED for the Enterprise | FlowFuse'
const META_DESCRIPTION = 'Run Node-RED across your organization with FlowFuse: the same open-source Node-RED, with DevOps pipelines, access control, monitoring and fleet management for production.'

// Who FlowFuse is for
const FIT = [
    { text: 'You run Node-RED on many lines, in many plants and on edge devices' },
    { text: 'Several teams build and change flows at the same time' },
    { text: 'Changes must be tested before they reach production' },
    { text: 'IT and auditors need to know who can change what, and who did' },
    { text: 'One change has to reach every site at once' },
]

// What FlowFuse adds: each card leads to a top-of-funnel page
const ADDS = [
    {
        title: 'Run your whole Node-RED fleet',
        text: 'Bring every Node-RED instance, in the cloud or on edge devices, into a single view. Track health and performance, get alerted when something fails, and push updates remotely without a site visit.',
        image: { src: '/images/node-red/flowfuse-home-framed.webp', alt: 'FlowFuse home screen: 76 hosted and 40 remote Node-RED instances running, with recently modified instances and recent activity', width: 2767, height: 1860 },
        variant: 'indigo',
        link: { to: '/use-cases/remote-device-management/', label: 'Explore remote device management' },
    },
    {
        title: 'Change flows without stopping the line',
        text: 'Promote each change from development to test to production through pipelines. Every version is saved as a snapshot, so a bad change is one click from being rolled back.',
        image: { src: '/images/node-red/flowfuse-pipelines-plants-framed.webp', alt: 'FlowFuse DevOps pipelines for a manufacturing plant: development to staging to GitHub, then an edge deployment rolled out to Japan, Europe and the USA', width: 1186, height: 797 },
        variant: 'red',
        link: { to: '/platform/device-agent/', label: 'See how changes reach the plant floor safely' },
    },
    {
        title: 'Pass the security review',
        text: 'FlowFuse covers what security reviewers ask for: company SSO with two-factor login, a role for every person in every application, and an audit log of every change. Its SOC 2 Type I and Type II audits are already complete.',
        image: { src: '/images/node-red/flowfuse-application-access-framed.webp', alt: 'Application user access settings in FlowFuse, with owner, member and dashboard roles per user', width: 2030, height: 1364 },
        variant: 'indigo',
        link: { to: '/platform/security/', label: 'Review FlowFuse security' },
    },
    {
        title: 'Describe it, and AI builds it',
        text: 'Tell FlowFuse Expert what you need and it builds the flow, or connect the AI agent your company already approved, such as Copilot, ChatGPT or Claude. Nothing goes live until your team approves it.',
        image: { src: '/images/use-cases/mes/torque-monitoring-video.webp', alt: 'Video: an industrial AI agent builds a torque monitoring app in 68 minutes', width: 1280, height: 720 },
        youtube: 'kPBLW-kMfsg',
        variant: 'red',
        link: { to: '/ai/', label: 'Explore Industrial AI' },
    },
    {
        title: 'Standardize integrations across every plant',
        text: 'Run your Unified Namespace on the built-in MQTT broker, use OPC UA, Modbus and Siemens S7 nodes certified and maintained by FlowFuse, and share proven flows with every site through a team library.',
        image: { src: '/images/node-red/flowfuse-broker-hierarchy-framed.webp', alt: 'The FlowFuse MQTT broker, connected, showing a Unified Namespace topic hierarchy from plant to assembly line, cell, PLC and sensor', width: 1628, height: 1094 },
        variant: 'indigo',
        link: { to: '/use-cases/uns/', label: 'Explore the Unified Namespace' },
    },
    {
        title: 'See it in your industry',
        text: 'Applications, compliance requirements and customer results for automotive, industrial machinery, building materials, energy and aerospace.',
        image: { src: '/images/industries/energy-utilities.jpg', alt: 'Solar panels on an industrial roof beside farmland', width: 750, height: 422 },
        variant: 'red',
        link: { to: '/industries/', label: 'Explore industries' },
    },
]

const FRAME_VARIANTS = {
    indigo: { backdrop: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300' },
    red: { backdrop: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100' },
} as const

// Customer proof: published case studies, each showing Node-RED running at scale on FlowFuse
const PROOF = [
    {
        logo: { src: '/images/home-logos/walter-logo.svg', alt: 'Walter', height: 'h-7' },
        stat: '130+',
        label: 'Node-RED instances, run by a seven-person IT team',
        line: 'One FlowFuse platform replaced five separate systems across Walter\'s locations.',
        link: { to: '/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/', label: 'Read the Walter story' },
    },
    {
        logo: { src: '/images/home-logos/energinet-logo.png', alt: 'Energinet', height: 'h-8' },
        stat: '7,000 km',
        label: 'of Denmark\'s power grid, monitored in real time',
        line: 'A small team connects SCADA systems and IoT sensors for the national grid operator, and every change goes through development before production.',
        link: { to: '/customer-stories/energinet-streamlining-critical-infrastructure-data-management/', label: 'Read the Energinet story' },
    },
    {
        logo: { src: '/images/home-logos/arch-systems-logo.png', alt: 'Arch Systems', height: 'h-8' },
        stat: '100+',
        label: 'manufacturing databases automated',
        line: 'Arch builds a Node-RED flow once and deploys it to every customer site through DevOps pipelines.',
        link: { to: '/customer-stories/scaling-manufacturing-automation-with-flowfuse/', label: 'Read the Arch Systems story' },
    },
]

// Customer quotes already published on flowfuse.com
const QUOTES = [
    {
        text: 'FlowFuse has helped us take our Node-RED from proof-of-concept through to a reliable, scalable solution for the future.',
        name: 'Robert VanHofwegen',
        role: 'Paloma Irrigation District',
        avatar: '/images/customer-headshots/robert-van-hofwegen-paloma-irrigation.png',
    },
    {
        text: 'The Node-RED editor allows for very rapid development, and FlowFuse makes deployment and updates very easy. We can create and deploy a new dashboard page in days rather than weeks.',
        name: 'Dave Olsen',
        role: 'Product Manager, Wenco',
        avatar: '/images/customer-headshots/dave-olsen-wenco.png',
    },
    {
        text: 'FlowFuse removes concerns about scalability and reliability. It also makes it a lot easier for us to complete security audits for our customers.',
        name: 'Alan Yeung',
        role: 'CTO, Power Workplace',
        avatar: '/images/customer-headshots/alan-yeung-power-workplace.png',
    },
    {
        text: 'Without FlowFuse, I would be able to support maybe one production unit, but that\'s it. FlowFuse gives us the chance to deliver what the business asks us for while maintaining our small team size.',
        name: 'Felix Reck',
        role: 'IT Application Manager, Walter',
        avatar: '/images/customer-headshots/felix-reck-walter-tools.png',
    },
]

// One quote sits in the large card and the rest beside it. The large card moves through every
// customer in turn, starting with Walter's scale quote; it pauses on hover and stays put for
// visitors who prefer reduced motion.
const featuredIndex = ref(QUOTES.findIndex(q => q.name === 'Felix Reck'))
const FEATURED_QUOTE = computed(() => QUOTES[featuredIndex.value]!)
const OTHER_QUOTES = computed(() => QUOTES.filter((_, i) => i !== featuredIndex.value))
const quotesPaused = ref(false)
let quoteTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    quoteTimer = setInterval(() => {
        if (!quotesPaused.value) featuredIndex.value = (featuredIndex.value + 1) % QUOTES.length
    }, 7000)
})
onUnmounted(() => clearInterval(quoteTimer))

// Node-RED Con 2026: the FAQ names this year's date until the conference has ended
const NR_CON_ENDS = new Date('2026-11-03T20:00:00Z')
const nrConUpcoming = Date.now() < NR_CON_ENDS.getTime()

const FAQ = [
    {
        question: 'Does FlowFuse replace Node-RED?',
        answer: 'No. FlowFuse runs standard open-source Node-RED and manages it: where each instance runs, who can change it, and how updates are rolled out. Your engineers keep building in Node-RED. [See the full comparison](/blog/2025/10/node-red-vs-flowfuse/)',
    },
    {
        question: 'Will Node-RED stay free and open source?',
        answer: 'Yes. Node-RED is an OpenJS Foundation project under the Apache 2.0 license, independent of any one company. FlowFuse is a commercial platform built around it, not a paid version of it.',
    },
    {
        question: 'How do we move existing Node-RED instances to FlowFuse?',
        answer: 'Export the flows, credentials and environment variables from each instance, then restore them in FlowFuse. Read the [migration guide](/docs/migration/introduction/).',
    },
    {
        question: 'Can we take our flows out of FlowFuse?',
        answer: 'Yes. Flows stay standard Node-RED, so you can export them at any time and run them in any Node-RED.',
    },
    {
        question: 'Where can FlowFuse run?',
        answer: 'In FlowFuse Cloud, on your own servers, or both, with Node-RED instances on edge devices managed from either. Self-hosted deployments support air-gapped sites. See [deployment architectures](/docs/application-guide/architectures/).',
    },
    {
        question: 'Does FlowFuse meet enterprise security requirements?',
        answer: 'FlowFuse has completed SOC 2 Type I and Type II audits. It supports company SSO, two-factor login, role-based access and a full audit log. Learn about [FlowFuse security](/platform/security/).',
    },
    {
        question: 'How is FlowFuse priced, and what support is included?',
        answer: 'Pricing depends on your scale and how you deploy. Paid plans include support for the FlowFuse platform and your account from our team. View [pricing](/pricing/).',
    },
    {
        question: 'Are there community events for Node-RED users?',
        answer: `Yes. Node-RED Con is an annual online event where the Node-RED community comes together to share projects, real-world use cases, and updates on the future of Node-RED.${nrConUpcoming ? ' The 2026 event takes place on Tuesday, 3 November, with free registration.' : ''} It's held in collaboration with the OpenJS Foundation and sponsored by FlowFuse. [${nrConUpcoming ? 'Register for Node-RED Con' : 'Learn more about Node-RED Con'}](https://nrcon.nodered.org/)`,
    },
]

useSeoMeta({
    title: META_TITLE,
    description: META_DESCRIPTION,
    ogTitle: META_TITLE,
    ogDescription: META_DESCRIPTION,
    keywords: 'node-red enterprise, node-red at scale, node-red in production, node-red fleet management, node-red devops, node-red security, node-red vs flowfuse',
    ogUrl: 'https://flowfuse.com/node-red/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
])
</script>

<template>
  <div class="w-full text-gray-700">
    <!-- Hero -->
    <section class="nr-gradient w-full px-6 pt-14 md:pt-20 pb-16 md:pb-20">
      <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div class="max-md:text-center">
          <h1 class="m-0 text-4xl md:text-5xl font-medium">
            Node-RED
            <span class="block text-red-600">for the enterprise</span>
          </h1>
          <p class="mt-6 mb-0 text-lg text-gray-700">
            FlowFuse gives you one platform to deploy, secure and manage <span class="whitespace-nowrap">Node-RED</span>
            across your organization, with the control IT needs and the speed your engineers expect.
          </p>
          <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
            <CtaBookDemo variant="highlight" position="hero" />
            <CtaPricing variant="ghost" position="hero" icon="i-lucide-arrow-right" />
          </div>
        </div>
        <!-- FlowFuse and what it adds, above the Node-RED editor it runs -->
        <div class="rounded-2xl border border-indigo-100 bg-white p-4 sm:p-6 shadow-[0_24px_48px_-32px_rgba(55,48,163,0.45)]">
        <img
            src="/images/node-red/flowfuse-nodered-hero.webp"
            alt="FlowFuse, enterprise application management: security and access control, deployments and versioning, team management, monitoring and observability, multi-tenant and scaling, above a Node-RED editor running a Plant A flow that publishes PLC and sensor data to Unified Namespace topics"
            width="1820"
            height="1166"
            loading="eager"
            class="block w-full h-auto"
        >
        </div>
      </div>
    </section>

    <!-- Shared social proof strip, placed right after the hero as on the other templates -->
    <section class="w-full px-6 pb-4">
      <SocialProof />
    </section>

    <!-- Who FlowFuse is for: the case on the left, five numbered conditions on the right -->
    <section class="w-full px-6 py-20 md:py-28">
      <div class="max-w-screen-lg mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
        <div class="lg:sticky lg:top-28 self-start max-lg:text-center">
          <p class="m-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">Who FlowFuse is for</p>
          <h2 class="mt-2 mb-0">Built for <span class="text-indigo-600 whitespace-nowrap">mission-critical</span> <span class="whitespace-nowrap">Node-RED</span></h2>
          <p class="mt-4 mb-0 text-lg text-gray-600">
            Once <span class="whitespace-nowrap">Node-RED</span> runs production across hundreds or thousands of instances,
            it carries the same risk as any other system on the line. FlowFuse is the right fit when:
          </p>
        </div>
        <div>
          <ol class="m-0 p-0 list-none">
            <li v-for="(f, i) in FIT" :key="f.text" class="m-0 grid grid-cols-[3.5rem_1fr] items-baseline gap-2 py-6 border-b border-gray-200 first:border-t">
              <span class="text-3xl font-medium tabular-nums text-indigo-300">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="text-xl leading-snug text-gray-800">{{ f.text }}</span>
            </li>
          </ol>
          <p class="mt-8 mb-0 pl-[4rem] max-lg:pl-0 max-lg:text-center text-lg font-medium text-indigo-700">If this describes your operation, FlowFuse is designed for you.</p>
        </div>
      </div>
    </section>

    <!-- What FlowFuse adds -->
    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0 max-w-3xl">What FlowFuse adds <span class="text-indigo-600">to Node-RED</span></h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600">
          <span class="whitespace-nowrap">Node-RED</span> stays exactly as your team knows it, standard and open source.
          FlowFuse takes care of everything around it, from running the fleet to passing the security review.
        </p>
        <div class="mt-20">
          <div
              v-for="(item, i) in ADDS"
              :key="item.title"
              class="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-14 md:mb-20 last:mb-0"
              :class="{ 'md:flex-row-reverse': i % 2 === 1 }"
          >
            <div class="w-full max-w-[500px] md:max-w-none md:w-[45%] max-md:mt-5">
              <div class="relative" :class="'youtube' in item ? 'aspect-video' : 'aspect-[430/289]'">
                <div
                    class="absolute -top-5 w-full h-full rounded-lg bg-gradient-to-tl"
                    :class="[FRAME_VARIANTS[item.variant].backdrop, i % 2 === 0 ? '-left-5' : '-right-5']"
                    aria-hidden="true"
                />
                <div class="absolute inset-0 rounded-lg border-2 overflow-hidden ff-image-cover bg-white" :class="FRAME_VARIANTS[item.variant].border">
                  <LiteYoutube v-if="'youtube' in item" :videoid="item.youtube" :title="item.image.alt" :poster="item.image.src" class="nr-frame__video" />
                  <img
                      v-else
                      :src="item.image.src"
                      :alt="item.image.alt"
                      :width="item.image.width"
                      :height="item.image.height"
                      loading="lazy"
                      :style="(item.image as { fit?: string }).fit === 'contain' ? 'object-fit: contain; padding: 12px' : 'object-position: left top'"
                  >
                </div>
              </div>
            </div>
            <div class="md:w-[55%] flex flex-col gap-3">
              <h3 class="m-0 text-3xl font-medium text-gray-700">{{ item.title }}</h3>
              <p class="m-0 text-gray-500">{{ item.text }}</p>
              <NuxtLink :to="item.link.to" class="flex items-center gap-1.5 text-blue-600 hover:underline">
                {{ item.link.label }}
                <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Proof -->
    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <div class="text-center">
          <h2 class="m-0">Organizations running Node-RED <span class="text-indigo-600">at scale with FlowFuse</span></h2>
          <p class="mt-4 mb-0 mx-auto max-w-2xl text-lg text-gray-600">
            These organizations run <span class="whitespace-nowrap">Node-RED</span> on FlowFuse as part of daily operations,
            from tool manufacturing to a national power grid.
          </p>
        </div>
        <ul class="mt-12 mb-0 p-0 list-none grid md:grid-cols-3 rounded-2xl border border-gray-200 bg-white md:divide-x max-md:divide-y divide-gray-200">
          <li v-for="c in PROOF" :key="c.logo.alt" class="m-0 flex flex-col p-7">
            <img :src="c.logo.src" :alt="c.logo.alt" class="w-auto self-start object-contain" :class="c.logo.height" loading="lazy">
            <p class="mt-6 mb-0 text-4xl font-medium text-indigo-600">{{ c.stat }}</p>
            <p class="mt-1 mb-0 font-medium text-gray-800">{{ c.label }}</p>
            <p class="mt-3 mb-0 text-sm text-gray-600">{{ c.line }}</p>
            <NuxtLink :to="c.link.to" class="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
              {{ c.link.label }}
              <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5 shrink-0" />
            </NuxtLink>
          </li>
        </ul>
        <div class="mt-8 text-center">
          <NuxtLink to="/customer-stories/" class="inline-flex items-center gap-1.5 text-blue-600 hover:underline">
            See all customer stories
            <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Quotes: the scale quote featured, the other three beside it -->
    <section class="w-full px-6 py-20 bg-gray-50">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="m-0">What teams say about running <span class="text-indigo-600"><span class="whitespace-nowrap">Node-RED</span> with FlowFuse</span></h2>
        <div class="mt-10 grid lg:grid-cols-[1.1fr_1fr] gap-6" @mouseenter="quotesPaused = true" @mouseleave="quotesPaused = false">
          <figure class="quote-featured m-0 flex flex-col rounded-2xl p-8 md:p-10 text-white">
            <UIcon name="i-lucide-quote" class="w-10 h-10 text-indigo-200" />
            <blockquote :key="FEATURED_QUOTE.name" class="quote-fade m-0 my-8 flex-1 flex items-center text-xl md:text-[1.75rem] leading-snug font-medium" aria-live="polite">{{ FEATURED_QUOTE.text }}</blockquote>
            <figcaption :key="`by-${FEATURED_QUOTE.name}`" class="quote-fade flex items-center gap-4">
              <img v-if="FEATURED_QUOTE.avatar" :src="FEATURED_QUOTE.avatar" :alt="FEATURED_QUOTE.name" width="56" height="56" loading="lazy" class="w-14 h-14 shrink-0 rounded-full object-cover ring-2 ring-white/40">
              <span>
                <span class="block font-semibold">{{ FEATURED_QUOTE.name }}</span>
                <span class="block text-sm text-indigo-100">{{ FEATURED_QUOTE.role }}</span>
              </span>
            </figcaption>
          </figure>
          <ul class="m-0 p-0 list-none flex flex-col gap-6">
            <li v-for="q in OTHER_QUOTES" :key="q.name" class="quote-fade m-0 flex-1">
              <figure class="m-0 flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6">
                <blockquote class="m-0 flex-1 leading-relaxed text-gray-700">&ldquo;{{ q.text }}&rdquo;</blockquote>
                <figcaption class="mt-4 flex items-center gap-3">
                  <img v-if="q.avatar" :src="q.avatar" :alt="q.name" width="36" height="36" loading="lazy" class="w-9 h-9 shrink-0 rounded-full object-cover">
                  <span v-else class="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700" aria-hidden="true">{{ q.name.split(' ').map(w => w[0]).join('') }}</span>
                  <span>
                    <span class="block text-sm font-semibold text-gray-800">{{ q.name }}</span>
                    <span class="block text-xs text-gray-500">{{ q.role }}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="w-full px-6 pt-20 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">Node-RED and FlowFuse: <span class="text-indigo-600">FAQs</span></h2>
        <Faq :faq="FAQ" />
      </div>
    </section>

    <IndustryPageCta
        heading="Running Node-RED in more than one place?"
        description="Tell us how many instances you run and how you update them today. We'll show you how to manage them all from one place."
    />
  </div>
</template>

<style scoped>
.quote-fade {
    animation: quote-in 0.5s ease-out;
}

@keyframes quote-in {
    from { opacity: 0; transform: translateY(8px); }
}

@media (prefers-reduced-motion: reduce) {
    .quote-fade { animation: none; }
}

.quote-featured {
    background:
        radial-gradient(80% 60% at 100% 0%, color-mix(in oklab, var(--color-indigo-400) 45%, transparent), transparent 70%),
        linear-gradient(135deg, var(--color-indigo-700), var(--color-indigo-900));
}

.nr-frame__video {
    border-radius: 0;
}

.nr-gradient {
    background: linear-gradient(100deg, var(--color-indigo-50) 0%, white 50%, color-mix(in oklab, var(--color-red-50) 70%, white) 100%);
}
</style>
