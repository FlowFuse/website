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
    { id: 'edge', label: 'FlowFuse Edge' },
    { id: 'hub', label: 'FlowFuse Hub' },
    { id: 'fleet', label: 'FlowFuse Fleet' },
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
            <div class="text-left">
              <h1 class="text-4xl md:text-5xl font-medium">
                Build, deploy, and govern industrial applications - <span class="text-red-600">in record time</span>
              </h1>
              <p class="mt-6 text-lg text-gray-500 max-w-xl">Bridge the gap between OT and IT teams using FlowFuse, the only comprehensive application platform with industrial AI and governance baked in.</p>
              <div class="mt-8 flex gap-4 items-start sm:items-center justify-start flex-col sm:flex-row">
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
                <img :src="'/images/features/flowfuse-features-hero.png'" alt="FlowFuse Features" class="w-full h-full object-cover rounded-lg" loading="eager">
              </div>
            </div>
          </div>
        </div>

        <!-- Differentiator cards -->
        <div class="mt-24">
          <h2 class="mb-10 max-sm:text-center">
            The needs of modern industry requires <span class="text-indigo-600">modern solutions</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="rounded-lg bg-indigo-50/50 p-6 pt-8 flex flex-col gap-4">
              <h3 class="text-2xl font-light text-indigo-600">Vendor-Free Open Source</h3>
              <p class="mb-0">Every factory is different, so why deploy the same solution as everyone else? Build your way with ready-made blueprints, your own app store, or anything in between — we never dictate your tools.</p>
            </div>
            <div class="rounded-lg bg-indigo-50/50 p-6 pt-8 flex flex-col gap-4">
              <h3 class="text-2xl font-light text-indigo-600">Flexible and Secure</h3>
              <p class="mb-0">From whole-factory rollouts to last-mile fixes across any industry. Build your solution, then secure it with granular RBAC, auditing, version control, and traceability.</p>
            </div>
            <div class="rounded-lg bg-indigo-50/50 p-6 pt-8 flex flex-col gap-4">
              <h3 class="text-2xl font-light text-indigo-600">Seamless Collaboration</h3>
              <p class="mb-0">OT teams prototype and deploy fast while IT keeps the governance, security, and auditability they need — no trade-offs.</p>
            </div>
          </div>

          <!-- Tier scrollytelling -->
          <div class="max-w-screen-lg mx-auto pt-8 pb-20">
            <h2 class="mb-12 max-sm:text-center">Find the product for <span class="text-indigo-600">how you work</span></h2>
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
                <div id="tier-edge" :ref="(el) => { stepRefs.edge = el }" data-tier="edge" class="scroll-mt-24 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div class="text-sm font-semibold uppercase tracking-wide text-gray-500">FlowFuse Edge</div>
                    <h3 class="text-3xl mt-2">You run the plant floor</h3>
                    <p class="mt-4 text-gray-500">Connect PLCs, machines, and controllers. Standardize automation across sites instead of reinventing it plant by plant. Built for OT and digitalization leadership running production at scale.</p>
                    <p class="mt-4 text-sm text-gray-500 italic">Ideal fit if you're dealing with: multi-plant rollouts, PLC/SCADA integration, machine connectivity, or Node-RED sprawl across sites.</p>
                    <a class="mt-6 inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline" href="/pricing/" @click="capture('cta-learn-more', { position: 'features-edge' })">Learn more about FlowFuse Edge &rarr;</a>
                  </div>
                  <div class="product-tier-img">
                    <img :src="'/images/home/home-edge-connectivity.png'" alt="FlowFuse Edge: industrial edge connectivity" loading="lazy">
                  </div>
                </div>
                <div id="tier-hub" :ref="(el) => { stepRefs.hub = el }" data-tier="hub" class="scroll-mt-24 grid md:grid-cols-2 gap-12 items-center pt-20 border-t border-[#f1f1f4]">
                  <div>
                    <div class="text-sm font-semibold uppercase tracking-wide text-gray-500">FlowFuse Hub</div>
                    <h3 class="text-3xl mt-2">You move data across the business</h3>
                    <p class="mt-4 text-gray-500">Integrate and orchestrate data across ERPs, databases, and cloud APIs — governed centrally, not stitched together app by app. Built for central IT and enterprise architecture teams.</p>
                    <p class="mt-4 text-sm text-gray-500 italic">Ideal fit if you're dealing with: system integration, API orchestration, data pipelines, or governance across business systems.</p>
                    <a class="mt-6 inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline" href="/pricing/" @click="capture('cta-learn-more', { position: 'features-hub' })">Learn more about FlowFuse Hub &rarr;</a>
                  </div>
                  <div class="product-tier-img">
                    <img :src="'/images/home/home-data-integration.png'" alt="FlowFuse Hub: enterprise data integration" loading="lazy">
                  </div>
                </div>
                <div id="tier-fleet" :ref="(el) => { stepRefs.fleet = el }" data-tier="fleet" class="scroll-mt-24 grid md:grid-cols-2 gap-12 items-center pt-20 border-t border-[#f1f1f4]">
                  <div>
                    <div class="text-sm font-semibold uppercase tracking-wide text-gray-500">FlowFuse Fleet</div>
                    <h3 class="text-3xl mt-2">You manage a Node-RED fleet</h3>
                    <p class="mt-4 text-gray-500">Push flows, ship updates, and roll back remotely across thousands of distributed devices, without waiting on a firmware release. Built for hardware OEMs, partners, and asset operators.</p>
                    <p class="mt-4 text-sm text-gray-500 italic">Ideal fit if you're dealing with: distributed devices, remote sites, sensors and telemetry at scale, or shipping Node-RED inside your own product.</p>
                    <a class="mt-6 inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline" href="/pricing/" @click="capture('cta-learn-more', { position: 'features-fleet' })">Learn more about FlowFuse Fleet &rarr;</a>
                  </div>
                  <div class="product-tier-img">
                    <img :src="'/images/screen-pseudo-devices.png'" alt="FlowFuse Fleet: device fleet management console" loading="lazy">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FlowFuse Platform / integrations -->
          <div class="max-w-screen-lg mx-auto pt-8 pb-20">
            <h2 class="m-0">The FlowFuse Platform is the Foundation for All of your IT/OT Applications</h2>
            <p class="mt-6 text-gray-500">Leveraging enterprise-grade development, deployment, and governance solutions, you can build faster, scale more efficiently, and secure deployments of any size.</p>
            <div class="mt-10">
              <div class="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">Integrations</div>
              <div class="product-cap-links flex flex-nowrap sm:flex-wrap gap-2">
                <NuxtLink class="product-cap-link" to="/ai/">Industrial AI</NuxtLink>
                <NuxtLink class="product-cap-link" to="/use-cases/it-ot-middleware/">IT/OT Middleware</NuxtLink>
                <NuxtLink class="product-cap-link" to="/use-cases/uns/">Unified Namespace</NuxtLink>
                <NuxtLink class="product-cap-link" to="/use-cases/mes/">MES</NuxtLink>
                <NuxtLink class="product-cap-link" to="/use-cases/scada/">SCADA</NuxtLink>
                <NuxtLink class="product-cap-link" to="/use-cases/edge-connectivity/">Edge Connectivity</NuxtLink>
                <NuxtLink class="product-cap-link" to="/use-cases/data-integration/">Data Integration</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
      <EnterpriseSecurity />
    <div class="w-full px-6">
      <div class="max-w-screen-lg mx-auto py-20">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center product-get-started-bg">
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

<style scoped>
.product-tier-img { align-self: start; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 12px 32px rgba(2,6,13,0.12); border: 1px solid #e5e7eb; }
.product-tier-img img { display: block; width: 100%; height: auto; }

.product-cap-link {
    white-space: nowrap; display: inline-flex; align-items: center; gap: .3rem;
    padding: .4rem .8rem; border: 1px solid #e5e7eb; border-radius: 9999px;
    font-size: .8rem; font-weight: 500; color: #374151; background: #fff;
    transition: border-color .15s ease, color .15s ease, background .15s ease;
}
.product-cap-link::after { content: "\2192"; color: #a5b4fc; }
.product-cap-link:hover { border-color: #4f46e5; color: #4f46e5; background: #eef2ff; }
.product-cap-link:hover::after { color: #4f46e5; }

.product-get-started-bg { background: radial-gradient(ellipse 50% 150% at 50% 100%, #6366f1, #211c64); }
.product-get-started-pricing { background: #ffffff; color: #211c64; }
</style>
