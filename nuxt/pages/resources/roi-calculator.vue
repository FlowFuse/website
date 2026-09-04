<script setup lang="ts">
// The calculator itself lives in components/RoiCalculator.vue, shared with the
// truncated embed on /pricing/. This page wraps it with the framing, the evidence
// and the methodology.

// window.capture is injected by the site's analytics script — guarded because it's absent outside production.
function capture (eventName?: string, props?: Record<string, unknown>) {
  if (!eventName) return
  if (typeof (window as any).capture === 'function') {
    (window as any).capture(eventName, props)
  }
}

const DEMO_URL = '/book-demo/'

const evidence = [
  { stat: '~20% of the work-week', claim: 'is lost searching for internal information.', source: 'McKinsey Global Institute — The Social Economy (2012)', url: 'https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy' },
  { stat: '17.3 hrs / week', claim: 'of developer time goes to maintenance & technical debt — ~42% of the week.', source: 'Stripe — The Developer Coefficient (2018)', url: 'https://stripe.com/files/reports/the-developer-coefficient.pdf' },
  { stat: '~90%', claim: 'of the effort to create new work recreates something that already exists.', source: 'IDC / Susan Feldman — KMWorld (2004)', url: 'https://www.kmworld.com/Articles/Editorial/Features/The-high-cost-of-not-finding-information-9534.aspx' },
  { stat: '40–57%', claim: 'productivity gain from systematic software reuse.', source: 'Lim — IEEE Software (1994)', url: 'https://ieeexplore.ieee.org/document/311048/' },
  { stat: 'up to 6,570×', claim: 'faster failure recovery for teams that automate deployment & rollback.', source: 'Google / DORA — State of DevOps (2021)', url: 'https://cloud.google.com/blog/products/devops-sre/announcing-dora-2021-accelerate-state-of-devops-report' },
  { stat: '$125,000 / hour', claim: 'average cost of unplanned downtime (the default here is far lower).', source: 'ABB — Value of Reliability survey (2023)', url: 'https://new.abb.com/news/detail/107660/abb-survey-reveals-unplanned-downtime-costs-125-000-per-hour' },
  { stat: '$1.4 trillion / yr', claim: 'lost to unplanned downtime across the Fortune Global 500 — 11% of revenue.', source: 'Siemens — True Cost of Downtime (2024)', url: 'https://assets.new.siemens.com/siemens/assets/api/uuid:1b43afb5-2d07-47f7-9eb7-893fe7d0bc59/TCOD-2024_original.pdf' },
  { stat: '$122,930', claim: 'median US wage for controls/automation engineers, before the ~1.25–1.4× loaded multiplier.', source: 'US Bureau of Labor Statistics, OEWS (May 2024)', url: 'https://www.bls.gov/oes/current/oes172199.htm' },
]

// Who is usually holding the spreadsheet when this page gets opened, and which line
// of the model moves most for them.
const audiences = [
  {
    heading: 'System integrators & automation partners',
    lead: 'More output per engineer',
    description: 'Reusable Blueprints and versioned pipelines cut the time to ship each site, so the same team handles more work without adding headcount. That's <b class="font-semibold text-gray-900">increase in revenue</b> and speed of deployment, the largest single line for most integrator teams.',
    icon: 'i-lucide-blocks',
  },
  {
    heading: 'Manufacturers & plant engineering teams',
    lead: 'One avoided outage pays for the platform',
    description: 'A single unplanned line stop can cost more than a year of licensing. Snapshots, one-click rollback, and remote deployment turn a multi-hour recovery into minutes. That <b class="font-semibold text-gray-900">uptime</b> and recovery speed, and it is why the payback window in this calculator is usually measured in months rather than years.',
    icon: 'i-lucide-factory',
  },
  {
    heading: 'OEMs & machine builders',
    lead: 'Grow your install base without growing support headcount',
    description: 'Manually managing multiple sites by remoting in, tracking versions, etc. stops scaling past a few dozen machines. Centralized device management and staged rollout keep per-site cost flat as the fleet grows, compounding <b class="font-semibold text-gray-900">waste elimination</b> and <b class="font-semibold text-gray-900">speed to deploy</b> at once.',
    icon: 'i-lucide-boxes',
  },
]

// Questions industrial buyers actually ask when they take this to a finance review.
const faqs = [
  {
    question: 'How do you calculate ROI on an industrial automation platform?',
    answer: 'Industrial automation ROI is annual value recovered divided by annual platform investment. This calculator builds the value side from three measurable sources — engineering time lost finding information, engineering time spent rebuilding and hand-deploying applications, and production time lost to slow recovery from failure — then subtracts a representative FlowFuse package cost to show net savings, an ROI multiple and a payback window.',
  },
  {
    question: 'What is a realistic payback period for a Node-RED platform like FlowFuse?',
    answer: 'For most industrial teams the payback lands inside the first year, and frequently inside the first quarter. The reason is the asymmetry between the two sides of the equation: platform licensing is a five-figure annual line, while a single hour of unplanned downtime at industry-average cost is roughly $125,000 (ABB, 2023). Avoiding a handful of hours a year covers the investment on its own.',
  },
  {
    question: 'What should a system integrator include in an ROI model?',
    answer: 'Beyond licence cost, include the engineer-hours per project you can eliminate through reuse, the travel and on-site time removed by remote deployment, the cost of maintaining bespoke one-off applications across a customer estate, and the risk-adjusted cost of a rollback you cannot perform quickly. Those are the inputs this calculator exposes, so you can hand a finance team a model rather than a claim.',
  },
  {
    question: 'Are the assumptions in this ROI calculator conservative?',
    answer: 'Deliberately. The downtime default is set at $25,000 per hour against a published industry average of $125,000. The information-search figure comes from McKinsey rather than from vendor benchmarks, and the reuse gain sits at the bottom of the 40–57% range published by Lim in IEEE Software. Every source is linked on this page so you can substitute your own numbers.',
  },
  {
    question: 'Does the calculator give me a quote?',
    answer: 'No — it produces a directional estimate for comparison. The investment figure is a representative blended package price with a volume taper, not your price. Book a demo and we will build the model against your actual site count, engineering headcount and downtime cost.',
  },
]

useSeoMeta({
  title: 'Industrial Automation ROI Calculator | FlowFuse',
  description: 'Calculate the ROI of industrial automation for your plant, integration business or machine fleet. Estimate recovered engineering time, faster deployment and avoided downtime — every assumption traced to published research, with net savings and payback period.',
  ogUrl: 'https://flowfuse.com/resources/roi-calculator/',
  twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage' }),
  ...faqs.map(item => defineQuestion(item)),
])
</script>

<template>
  <div class="w-full">
    <!-- ============================ HERO ============================ -->
    <section class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pt-14 pb-8 text-center">
        <p class="eyebrow">ROI calculator</p>
        <h1 class="mt-2 leading-tight text-4xl sm:text-5xl">Industrial automation ROI, <span class="text-indigo-600">in your numbers.</span></h1>
        <p class="my-8 text-lg text-gray-500 max-w-2xl mx-auto">Three places industrial automation teams quietly bleed money: hunting for information, manual rework, and tracking downtime. Plug in your numbers, every figure below traces to published research.</p>t,
      </div>
    </section>

    <!-- ============================ CALCULATOR ============================ -->
    <section class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pb-12">
        <RoiCalculator />
      </div>
    </section>

    <!-- ============================ AUDIENCES ============================ -->
    <section class="w-full px-6 pt-16">
      <div class="max-w-screen-lg mx-auto pb-12">
        <div class="mb-16">
          <p class="eyebrow">Who this is for</p>
          <h2 class="my-4">How to justify the ROI of industrial automation to your boss</h2>
          <p class="max-w-2xl mt-2">Improvements in speed of deployment, waste elimination, and machine uptime directly affects operational costs and revenue. Here's how to justify ROI to decision-makers, depending on your business</p>
        </div>
        <DifferentiatorCards :items="audiences" description-class="text-sm" />
      </div>
    </section>

    <!-- ============================ EVIDENCE ============================ -->
    <section class="w-full px-6 py-16 relative overflow-hidden">
      <div class="absolute -inset-y-1 inset-x-0 solution-section-bg" aria-hidden="true" />
      <div class="max-w-screen-lg mx-auto relative">
        <div class="mb-12">
          <p class="eyebrow">The evidence</p>
          <h2 class="my-4">The research behind the ROI analysis</h2>
          <p class="max-w-2xl mt-2">Every figure traces to published research, and the defaults are set deliberately on the conservative side.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <a
              v-for="e in evidence"
              :key="e.source"
              :href="e.url"
              target="_blank"
              rel="noopener"
              class="group relative overflow-hidden bg-white rounded-xl border border-gray-200 p-5 flex flex-col transition duration-300 ease-in-out hover:border-indigo-600 hover:drop-shadow-lg hover:no-underline"
              @click="capture('roi-evidence', { source: e.source })"
          >
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="absolute top-4 right-4 z-10 w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
            <div class="text-xl font-semibold text-indigo-600 pr-6">{{ e.stat }}</div>
            <p class="text-sm text-gray-600 leading-snug flex-grow mb-0 mt-3">{{ e.claim }}</p>
            <span class="text-sm text-blue-600 mt-3 md:hidden">{{ e.source }}</span>
            <div class="hidden md:flex absolute inset-0 items-center justify-center text-center px-6 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
              <span class="text-sm font-medium text-gray-900">Read more at <span class="text-indigo-600">{{ e.source }}</span></span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ============================ METHODOLOGY ============================ -->
    <section class="w-full px-6 pt-6">
      <div class="max-w-screen-lg mx-auto py-12">
        <div class="border border-gray-200 rounded-xl bg-gray-50">
          <div class="px-5 py-4 text-gray-700 font-semibold">How the calculation works</div>
          <div class="prose prose-sm max-w-none px-5 pb-5">
            <p><b>1 · Waste elimination.</b> Engineers lose ~20% of the week finding information (McKinsey). We recover the share you set (default 30%): <code>engineers × salary × 0.20 × recovery</code>.</p>
            <p><b>2 · Speed to deploy.</b> Building from scratch and hand-deploying is labour you can reclaim with reuse and pipelines: <code>(apps × hrs/app × reuse% + deploys × hrs/deploy × pipeline%) × hourly rate</code>. Reuse gains are grounded in Lim (40–57%); deployment automation in DORA.</p>
            <p><b>3 · Fault tolerance.</b> Slow recovery means idle machines and engineers: <code>incidents × downtime hrs × cost/hr × avoided%</code>. The $125k/hr industry average (ABB) is the ceiling; we default far lower.</p>
            <p><b>Net &amp; payback.</b> A representative FlowFuse package cost is subtracted from gross savings to show net savings, an ROI multiple, and a payback window. It’s an estimate for comparison — see <a href="/pricing/">FlowFuse pricing</a> for what each product includes, or <a :href="DEMO_URL">book a demo</a> for an exact quote.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================ FAQ ============================ -->
    <section class="w-full px-6 pt-10">
      <div class="max-w-screen-lg mx-auto pb-18">
        <h2 class="mb-8"><span class="text-indigo-600">ROI questions</span> industrial teams ask</h2>
        <BlogFaq :faq="faqs" />
      </div>
    </section>

    <!-- ============================ CLOSING CTA ============================ -->
    <div class="w-full px-6 pb-16">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-6 md:px-9 py-8 md:py-12 flex flex-col items-center gap-6 text-center ff-get-started-bg">
          <h2 class="text-white font-medium max-w-2xl">Stop paying for the work your team keeps redoing</h2>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaSignUp variant="highlight" position="roi-final" />
            <CtaBookDemo variant="ghost" color="white" icon="i-lucide-arrow-right" position="roi-final" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/theme.css";

/* Repeated across hero + 2 section headers; @apply, not a hand-written value. */
.eyebrow { @apply text-indigo-600 text-sm font-semibold uppercase m-0; }
</style>

