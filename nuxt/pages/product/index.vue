<script setup lang="ts">
// Ported from src/platform/features.njk (11ty). Cta* components enforce
// fixed copy/destinations (see CLAUDE.md), so the old custom-copy "Request a
// Demo" buttons become <CtaBookDemo>; "View Pricing" isn't one of the four
// unified destinations, so it keeps a plain ff-btn link, same precedent as
// BlogPostCta.vue's pricing fallback.
useSeoMeta({
    title: 'FlowFuse Features',
    description: 'FlowFuse provides the features companies require to reliably deliver industrial applications to devices and cloud in a collaborative, secure manner.',
    ogUrl: 'https://flowfuse.com/product/',
    twitterSite: '@FlowFuseinc',
})

const capture = useCapture()

const TIERS = [
    {
        id: 'edge',
        label: 'FlowFuse Edge',
        heading: 'You run the plant floor',
        description: 'Connect <a class="text-indigo-600 hover:underline" href="/blog/2025/12/what-is-plc/">PLCs</a>, machines, and controllers. Standardize automation across sites instead of reinventing it plant by plant. Built for OT and digitalization leadership running production at scale.',
        idealFit: 'Ideal fit if you\'re dealing with: multi-plant rollouts, <a class="text-indigo-600 hover:underline" href="/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/">PLC/SCADA integration</a>, <a class="text-indigo-600 hover:underline" href="/blog/2025/10/plc-to-mqtt-using-flowfuse/">machine connectivity</a>, or Node-RED sprawl across sites.',
        image: { src: '/images/home/home-scada.png', alt: 'FlowFuse Edge: industrial edge connectivity' },
    },
    {
        id: 'hub',
        label: 'FlowFuse Hub',
        heading: 'You move data across the business',
        description: 'Integrate and orchestrate data across <a class="text-indigo-600 hover:underline" href="/blog/2025/06/connect-shop-floor-to-odoo-erp-flowfuse/">ERPs</a>, <a class="text-indigo-600 hover:underline" href="/blog/2025/08/getting-started-with-flowfuse-tables/">databases</a>, and cloud APIs — governed centrally, not stitched together app by app. Built for central IT and enterprise architecture teams.',
        idealFit: 'Ideal fit if you\'re dealing with: system integration, API orchestration, <a class="text-indigo-600 hover:underline" href="/blog/2026/02/mqtt-influxdb-tutorial/">data pipelines</a>, or governance across business systems.',
        image: { src: '/images/product/hub.jpg', alt: 'FlowFuse Hub: enterprise data integration' },
    },
    {
        id: 'fleet',
        label: 'FlowFuse Fleet',
        heading: 'You manage a Node-RED fleet',
        description: 'Push flows, ship updates, and roll back remotely across thousands of distributed devices, without waiting on a firmware release. Built for hardware OEMs, partners, and asset operators.',
        idealFit: "Ideal fit if you're dealing with: distributed devices, remote sites, sensors and telemetry at scale, or shipping Node-RED inside your own product.",
        image: { src: '/images/product/fleet.jpg', alt: 'FlowFuse Fleet: device fleet management console' },
    },
]

const DIFFERENTIATORS = [
    {
        heading: 'Vendor-Free Open Source',
        description: 'Every factory is different, so why deploy the same solution as everyone else? Build your way with <a class="text-indigo-600 hover:underline" href="/blueprints/">ready-made blueprints</a>, your own app store, or anything in between — we never dictate your tools.',
        icon: 'i-lucide-puzzle',
    },
    {
        heading: 'Flexible and Secure',
        description: 'From whole-factory rollouts to last-mile fixes across any industry. Build your solution, then secure it with <a class="text-indigo-600 hover:underline" href="/blog/2024/04/role-based-access-control-rbac-for-node-red-with-flowfuse/">granular RBAC</a>, auditing, <a class="text-indigo-600 hover:underline" href="/blog/2024/09/node-red-version-control-with-snapshots/">version control</a>, and traceability.',
        icon: 'i-lucide-shield-check',
    },
    {
        heading: 'Seamless Collaboration',
        description: 'OT teams prototype and deploy fast while IT keeps the governance, security, and auditability they need — no trade-offs.',
        icon: 'i-lucide-handshake',
    },
]

const CAPABILITIES = [
    { label: 'Industrial AI', to: '/ai/' },
    { label: 'IT/OT Middleware', to: '/use-cases/it-ot-middleware/' },
    { label: 'Unified Namespace', to: '/use-cases/uns/' },
    { label: 'MES', to: '/use-cases/mes/' },
    { label: 'SCADA', to: '/use-cases/scada/' },
    { label: 'Edge Connectivity', to: '/use-cases/edge-connectivity/' },
    { label: 'Data Integration', to: '/use-cases/data-integration/' },
]
const activeTier = ref('edge')
const stepRefs = ref<Record<string, HTMLElement | null>>({})

// Whichever step's top has crossed the viewport's vertical midpoint is active -
// walking the steps in DOM order and overwriting on each match means the
// deepest (furthest scrolled-to) step wins. An IntersectionObserver watching a
// thin band around the midpoint was tried first, but the gap between steps
// (mt-20/pt-20/border-t below) is wider than that band, so scrolling through
// a gap left neither step intersecting and the indicator stuck on whichever
// step was active before the gap.
function updateActiveTier () {
    const steps = Object.entries(stepRefs.value).filter((entry): entry is [string, HTMLElement] => !!entry[1])
    if (!steps.length) return
    const mid = window.innerHeight / 2
    let current = steps[0][0]
    for (const [tier, el] of steps) {
        if (el.getBoundingClientRect().top <= mid) current = tier
    }
    activeTier.value = current
}

let tierTicking = false
function onTierScroll () {
    if (!tierTicking) { tierTicking = true; requestAnimationFrame(() => { tierTicking = false; updateActiveTier() }) }
}

onMounted(() => {
    window.addEventListener('scroll', onTierScroll, { passive: true })
    window.addEventListener('resize', onTierScroll, { passive: true })
    updateActiveTier()
})

onUnmounted(() => {
    window.removeEventListener('scroll', onTierScroll)
    window.removeEventListener('resize', onTierScroll)
})
</script>

<template>
  <div class="w-full product-page">
    <div class="w-full px-6 product-content">
      <div class="pt-12 max-w-screen-lg mx-auto">
        <!-- Hero -->
        <div class="container max-w-screen-lg mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl md:text-5xl font-medium">
                Build, deploy, and govern industrial applications - <span class="text-red-600">in record time</span>
              </h1>
              <p class="mt-6 text-lg text-gray-500 max-w-xl mx-auto lg:mx-0">Bridge the gap between OT and IT teams using FlowFuse, the only comprehensive application platform with industrial AI and governance baked in.</p>
              <div class="mt-8 flex flex-row flex-wrap gap-4 items-center justify-center lg:justify-start">
                <CtaBookDemo variant="highlight" position="hero" />
                <a class="ff-btn group flex flex-col" href="/pricing/" @click="capture('cta-pricing', { position: 'hero' })">
                  <span class="flex items-center justify-center gap-2 text-base uppercase text-indigo-600 hover:text-indigo-800">
                    <span>VIEW PRICING</span>
                    <IconsArrowRightIcon class="w-5 h-5" />
                  </span>
                </a>
              </div>
            </div>
            <div class="w-full">
              <div class="rounded-lg shadow-2xl border-2 border-indigo-200">
                <img :src="'/images/industries/automotive/1-connect-systems.png'" alt="FlowFuse Features" class="w-full h-full object-cover rounded-lg" loading="eager">
              </div>
            </div>
          </div>
        </div>

        <!-- Differentiator cards -->
        <div class="mt-24">
          <h2 class="mb-10 max-md:text-center">
            The needs of modern industry requires <span class="text-indigo-600">modern solutions</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div
              v-for="diff in DIFFERENTIATORS"
              :key="diff.heading"
              class="rounded-lg bg-gradient-to-br from-indigo-50/50 to-red-50/50 p-6 pt-8 flex flex-col gap-4 text-center md:text-left"
            >
              <Icon :name="diff.icon" class="w-6 h-6 text-indigo-600 mx-auto md:mx-0" />
              <h3 class="text-xl font-semibold text-indigo-600">{{ diff.heading }}</h3>
              <p class="mb-0" v-html="diff.description" />
            </div>
          </div>

          <!-- Tier scrollytelling -->
          <div class="max-w-screen-lg mx-auto pt-8 pb-20">
            <h2 class="mb-12 max-lg:text-center">Find the product for <span class="text-indigo-600">how you work</span></h2>
            <div class="flex flex-col lg:flex-row gap-10">
              <nav class="hidden lg:block lg:w-44 shrink-0">
                <ul class="sticky top-24 flex flex-col border-l border-gray-200">
                  <li v-for="tier in TIERS" :key="tier.id">
                    <a
                      :href="`#tier-${tier.id}`"
                      class="block py-[0.6rem] pl-5 -ml-px border-l-2 font-medium transition-colors duration-200"
                      :class="activeTier === tier.id ? 'text-indigo-600 border-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'"
                    >{{ tier.label }}</a>
                  </li>
                </ul>
              </nav>
              <div class="flex-1 min-w-0 flex flex-col gap-20">
                <div
                  v-for="(tier, index) in TIERS"
                  :id="`tier-${tier.id}`"
                  :key="tier.id"
                  :ref="(el) => { stepRefs[tier.id] = el as HTMLElement | null }"
                  :data-tier="tier.id"
                  class="scroll-mt-24 grid md:grid-cols-2 gap-12 items-center md:items-stretch"
                  :class="index > 0 ? 'pt-20 border-t border-gray-100' : ''"
                >
                  <div class="flex flex-col justify-center text-center md:text-left">
                    <div class="text-sm font-semibold uppercase tracking-wide text-red-300">{{ tier.label }}</div>
                    <h3 class="text-3xl mt-2">{{ tier.heading }}</h3>
                    <p class="mt-4 text-gray-500" v-html="tier.description" />
                    <ProseNote class="mt-4"><span v-html="tier.idealFit" /></ProseNote>
                    <a class="mt-6 inline-flex items-center gap-1 font-medium blue-600 hover:underline" href="/pricing/" @click="capture('cta-learn-more', { position: `features-${tier.id}` })">Learn more about {{ tier.label }} &rarr;</a>
                  </div>
                  <div class="min-h-64 rounded-lg overflow-hidden border border-gray-200">
                    <img :src="tier.image.src" :alt="tier.image.alt" class="block w-full h-full object-cover" loading="lazy">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FlowFuse Platform / integrations -->
          <div class="max-w-screen-lg mx-auto pt-8 pb-20 text-center lg:text-left">
            <h2 class="m-0">The FlowFuse platform is <span class="text-indigo-600">the foundation for all of your IT/OT applications</span></h2>
            <p class="mt-6 text-gray-500">Leveraging enterprise-grade development, deployment, and governance solutions, you can build faster, scale more efficiently, and secure deployments of any size.</p>
            <div class="mt-10">
              <div class="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">Integrations</div>
              <div class="product-cap-links flex flex-nowrap sm:flex-wrap justify-center lg:justify-start gap-2">
                <NuxtLink
                  v-for="cap in CAPABILITIES"
                  :key="cap.to"
                  :to="cap.to"
                  class="whitespace-nowrap inline-flex items-center gap-1 py-1.5 px-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 bg-white no-underline hover:no-underline transition-colors duration-150 after:text-indigo-300 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 hover:after:text-indigo-600"
                >{{ cap.label }}</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
      <EnterpriseSecurity />
    <div class="w-full px-6">
      <div class="max-w-screen-lg mx-auto py-20">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-4xl sm:text-5xl font-medium m-0">Get Started with FlowFuse</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Your first operational application could be running this week. Request a demo to see how, or explore pricing to find the right fit.</p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="get-started" />
            <a class="ff-btn group flex flex-col" href="/pricing/" @click="capture('cta-pricing', { position: 'get-started' })">
              <span class="text-base uppercase items-center text-base flex gap-2 uppercase items-center text-white hover:text-gray-200">
              <span>VIEW PRICING</span>
                <IconsArrowRightIcon class="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
