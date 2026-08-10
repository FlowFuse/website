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
let observer: IntersectionObserver | null = null

onMounted(() => {
    const steps = Object.values(stepRefs.value).filter((el): el is HTMLElement => !!el)
    if (!steps.length) return
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) activeTier.value = (entry.target as HTMLElement).dataset.tier ?? activeTier.value
        })
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
    steps.forEach(el => observer!.observe(el))
})

onUnmounted(() => observer?.disconnect())

// Scroll-driven 3D rotation for the hero image (n8n-style): a flat PNG on a
// CSS perspective plane that eases from a tilt to flat as you scroll down.
const heroInner = ref<HTMLElement | null>(null)
const START_Y = -8 // starting rotateY in degrees; negative = left edge recedes
const SCROLL_DIST = 500 // px of scroll over which it flattens
let ticking = false

function updateHeroTilt () {
    ticking = false
    if (!heroInner.value) return
    const y = window.scrollY || window.pageYOffset || 0
    const p = Math.max(0, Math.min(1, y / SCROLL_DIST))
    heroInner.value.style.transform = `rotateY(${(START_Y * (1 - p)).toFixed(2)}deg)`
}

function onHeroScroll () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateHeroTilt) }
}

onMounted(() => {
    if (!heroInner.value) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        heroInner.value.style.transform = 'none'
        return
    }
    window.addEventListener('scroll', onHeroScroll, { passive: true })
    window.addEventListener('resize', onHeroScroll, { passive: true })
    updateHeroTilt()
})

onUnmounted(() => {
    window.removeEventListener('scroll', onHeroScroll)
    window.removeEventListener('resize', onHeroScroll)
})
</script>

<template>
  <div class="nohero w-full product-page">
    <div class="product-hero-bg" aria-hidden="true" />
    <div class="w-full px-6 product-content">
      <div class="pt-12 max-w-screen-lg mx-auto">
        <!-- Hero -->
        <div class="container max-w-screen-lg mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div class="text-left">
              <h1 class="leading-tight text-4xl sm:text-5xl">
                Build, deploy, and govern industrial applications - in record time.
              </h1>
              <p class="mt-6 text-lg text-gray-500 max-w-xl">Bridge the gap between OT and IT teams using FlowFuse, the only comprehensive application platform with industrial AI and governance baked in.</p>
              <div class="mt-8 flex gap-4 items-start sm:items-center justify-start flex-col sm:flex-row">
                <CtaBookDemo variant="primary" position="hero" />
                <a class="ff-btn ff-btn--primary-outlined flex flex-col" href="/pricing/" @click="capture('cta-pricing', { position: 'hero' })">
                  <span class="text-base uppercase items-center">View Pricing</span>
                </a>
              </div>
            </div>
            <div class="product-hero-3d w-full">
              <div ref="heroInner" class="product-hero-3d__inner rounded-lg shadow-2xl border border-gray-200">
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
            <h2 class="mb-12 max-sm:text-center">Find the Product for <span class="text-indigo-600">How You Work</span></h2>
            <div class="flex flex-col lg:flex-row gap-10">
              <nav class="hidden lg:block lg:w-60 shrink-0">
                <ul class="product-tier-nav flex flex-col border-l border-gray-200">
                  <li v-for="tier in TIERS" :key="tier.id">
                    <a
                      :href="`#tier-${tier.id}`"
                      class="product-tier-tab"
                      :class="{ 'is-active': activeTier === tier.id }"
                    >{{ tier.label }}</a>
                  </li>
                </ul>
              </nav>
              <div class="flex-1 min-w-0 flex flex-col gap-20">
                <div id="tier-edge" :ref="(el) => { stepRefs.edge = el }" data-tier="edge" class="product-tier-step scroll-mt-24 grid md:grid-cols-2 gap-12 items-center">
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
                <div id="tier-hub" :ref="(el) => { stepRefs.hub = el }" data-tier="hub" class="product-tier-step scroll-mt-24 grid md:grid-cols-2 gap-12 items-center">
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
                <div id="tier-fleet" :ref="(el) => { stepRefs.fleet = el }" data-tier="fleet" class="product-tier-step scroll-mt-24 grid md:grid-cols-2 gap-12 items-center">
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
            <a class="ff-btn product-get-started-pricing" href="/pricing/" @click="capture('cta-pricing', { position: 'get-started' })">View Pricing</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modern, on-brand backdrop behind the hero: indigo + soft coral blobs, faint grid, fading to white. */
.product-page { position: relative; }
.product-content { position: relative; z-index: 1; }

.product-hero-bg {
    position: absolute; top: 0; left: 0; right: 0; height: 560px;
    z-index: 0; overflow: hidden; pointer-events: none;
    background:
        radial-gradient(48% 62% at 6% -6%, rgba(99,102,241,0.34), transparent 62%),
        radial-gradient(44% 56% at 106% -4%, rgba(255,110,74,0.16), transparent 60%),
        radial-gradient(35% 45% at 80% 38%, rgba(129,140,248,0.13), transparent 65%),
        linear-gradient(180deg, #E7EAFF 0%, #EEF0FF 26%, #ffffff 74%);
}
.product-hero-bg::after {
    content: ""; position: absolute; inset: 0;
    background-image:
        linear-gradient(to right, rgba(79,70,229,0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(79,70,229,0.08) 1px, transparent 1px);
    background-size: 42px 42px;
    -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.6), transparent 68%);
    mask-image: linear-gradient(180deg, rgba(0,0,0,0.6), transparent 68%);
}

.product-hero-3d { perspective: 1200px; }
.product-hero-3d__inner {
    transform-style: preserve-3d;
    transform-origin: center center;
    will-change: transform;
    transform: rotateY(-8deg);
    aspect-ratio: 1504 / 862;
}

.product-tier-tab {
    display: block; padding: 0.6rem 0 0.6rem 1.25rem; margin-left: -1px;
    border-left: 2px solid transparent; color: #6b7280; font-weight: 500;
    transition: color .2s ease, border-color .2s ease;
}
.product-tier-tab:hover { color: #4f46e5; }
.product-tier-tab.is-active { color: #4f46e5; border-left-color: #4f46e5; }
.product-tier-nav { position: sticky; top: 6rem; }

/* Tailwind gap-20/scroll-mt-24 don't compile in the legacy CSS build; kept
   here for parity now that this section lives in a scoped SFC style. */
.product-tier-step + .product-tier-step { margin-top: 5rem; padding-top: 5rem; border-top: 1px solid #f1f1f4; }
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
