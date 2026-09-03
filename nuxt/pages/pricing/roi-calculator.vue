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
    who: 'System integrators & automation partners',
    lead: 'Every project you win is a project you have to staff.',
    body: 'The margin on an integration contract is decided by how much of it you rebuild from scratch. Standardised Blueprints, a shared Team Library and versioned pipelines let one engineer carry more sites, and let a junior ship work that used to need your most senior person. On the model above that shows up in <b>speed to deploy</b> — the largest single line for most integrator teams.',
  },
  {
    who: 'Manufacturers & plant engineering teams',
    lead: 'Your downtime number is bigger than your software number.',
    body: 'A single unplanned line stop costs more than a year of platform licensing. Snapshots, one-click rollback and remote deployment across the fleet turn a multi-hour recovery into a multi-minute one. That is the <b>fault tolerance</b> line, and it is why the payback window in this calculator is usually measured in months rather than years.',
  },
  {
    who: 'OEMs & machine builders',
    lead: 'You ship the same application to hundreds of customer sites.',
    body: 'Managing that estate by hand — remoting into each machine, tracking which one runs which version — does not scale past a few dozen deployments. Centralised device management and staged rollout collapse the per-site cost of every update, which compounds across <b>waste elimination</b> and <b>speed to deploy</b> at once.',
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
  ogUrl: 'https://flowfuse.com/pricing/roi-calculator/',
  twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage' }),
  ...faqs.map(item => defineQuestion(item)),
])
</script>

<template>
  <div class="w-full roi-page">
    <!-- ============================ HERO ============================ -->
    <section class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pt-8">
        <Breadcrumbs :items="[{ label: 'Pricing', to: '/pricing/' }, { label: 'ROI Calculator' }]" />
      </div>
      <div class="max-w-screen-lg mx-auto pt-6 pb-8 text-center">
        <span class="roi-pill">ROI calculator</span>
        <h1 class="mt-4 leading-tight text-4xl sm:text-5xl font-bold">Industrial automation ROI, <span class="text-indigo-600">in your numbers.</span></h1>
        <p class="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Three places industrial automation teams quietly bleed money: hunting for information, rebuilding and hand-deploying work, and riding out downtime. Put your plant, fleet or project numbers in — every figure below traces to published research.</p>
      </div>
    </section>

    <!-- ============================ CALCULATOR ============================ -->
    <section class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pb-12">
        <RoiCalculator />
      </div>
    </section>

    <!-- ============================ AUDIENCES ============================ -->
    <section class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pb-12">
        <div class="text-center mb-8">
          <span class="roi-pill">Who this is for</span>
          <h2 class="mt-4">Where the return comes from in industrial automation</h2>
          <p class="text-gray-500 max-w-2xl mx-auto mt-2">The same three categories apply whether you run one plant, integrate for dozens of customers, or ship machines into the field. What changes is which line dominates.</p>
        </div>
        <div class="roi-aud">
          <div v-for="a in audiences" :key="a.who" class="roi-aud__card">
            <h3 class="roi-aud__who">{{ a.who }}</h3>
            <p class="roi-aud__lead">{{ a.lead }}</p>
            <p class="roi-aud__body" v-html="a.body"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================ EVIDENCE ============================ -->
    <section class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pb-8">
        <div class="text-center mb-8">
          <span class="roi-pill">The evidence</span>
          <h2 class="mt-4">Why these numbers hold up</h2>
          <p class="text-gray-500 max-w-2xl mx-auto mt-2">Every figure traces to published research, and the defaults are set deliberately on the conservative side.</p>
        </div>
        <div class="roi-evidence">
          <a v-for="e in evidence" :key="e.source" :href="e.url" target="_blank" rel="noopener" class="roi-ev" @click="capture('roi-evidence', { source: e.source })">
            <div class="roi-ev__stat">{{ e.stat }}</div>
            <div class="roi-ev__claim">{{ e.claim }}</div>
            <div class="roi-ev__src">{{ e.source }} &nearr;</div>
          </a>
        </div>
      </div>
    </section>

    <!-- ============================ METHODOLOGY ============================ -->
    <section class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pb-12">
        <details class="roi-method">
          <summary>How the calculation works</summary>
          <div class="roi-method__body">
            <p><b>1 · Waste elimination.</b> Engineers lose ~20% of the week finding information (McKinsey). We recover the share you set (default 30%): <code>engineers × salary × 0.20 × recovery</code>.</p>
            <p><b>2 · Speed to deploy.</b> Building from scratch and hand-deploying is labour you can reclaim with reuse and pipelines: <code>(apps × hrs/app × reuse% + deploys × hrs/deploy × pipeline%) × hourly rate</code>. Reuse gains are grounded in Lim (40–57%); deployment automation in DORA.</p>
            <p><b>3 · Fault tolerance.</b> Slow recovery means idle machines and engineers: <code>incidents × downtime hrs × cost/hr × avoided%</code>. The $125k/hr industry average (ABB) is the ceiling; we default far lower.</p>
            <p><b>Net &amp; payback.</b> A representative FlowFuse package cost is subtracted from gross savings to show net savings, an ROI multiple, and a payback window. It’s an estimate for comparison — see <a href="/pricing/">FlowFuse pricing</a> for what each product includes, or <a :href="DEMO_URL">book a demo</a> for an exact quote.</p>
          </div>
        </details>
      </div>
    </section>

    <!-- ============================ FAQ ============================ -->
    <section class="w-full px-6">
      <div class="max-w-screen-lg mx-auto pb-14">
        <h2 class="text-center mb-8">ROI questions industrial teams ask</h2>
        <BlogFaq :faq="faqs" />
      </div>
    </section>

    <!-- ============================ CLOSING CTA ============================ -->
    <div class="w-full px-6 pb-16">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-6 md:px-9 py-8 md:py-12 flex flex-col items-center gap-6 text-center ff-get-started-bg">
          <h2 class="text-white font-medium max-w-2xl">Stop paying for the work your team keeps redoing.</h2>
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
.roi-pill { display: inline-block; font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #4f46e5; background: #eef2ff; border: 1px solid #e0e4ff; border-radius: 9999px; padding: .3rem .8rem; }

/* Audiences */
.roi-aud { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.roi-aud__card { border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.5rem; background: #fff; box-shadow: 0 16px 40px rgba(2,6,13,0.05); }
.roi-aud__who { font-size: 1rem; font-weight: 700; color: #4f46e5; margin: 0; }
.roi-aud__lead { font-size: 1.05rem; font-weight: 600; color: #111827; margin: .6rem 0 .5rem; line-height: 1.35; }
.roi-aud__body { font-size: .88rem; color: #4b5563; line-height: 1.55; margin: 0; }
.roi-aud__body :deep(b) { color: #111827; font-weight: 600; }

/* Evidence */
.roi-evidence { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
.roi-ev { display: block; border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1.1rem 1.25rem; background: #fff; transition: border-color .15s ease, box-shadow .15s ease; text-decoration: none; }
.roi-ev:hover { border-color: #c7d2fe; box-shadow: 0 8px 24px rgba(2,6,13,0.07); }
.roi-ev__stat { font-size: 1.25rem; font-weight: 800; color: #4f46e5; letter-spacing: -0.01em; }
.roi-ev__claim { font-size: .86rem; color: #374151; margin-top: .3rem; line-height: 1.4; }
.roi-ev__src { font-size: .73rem; color: #9ca3af; margin-top: .6rem; }

/* Methodology */
.roi-method { border: 1px solid #e5e7eb; border-radius: .75rem; background: #fafafa; }
.roi-method summary { cursor: pointer; padding: 1rem 1.25rem; font-weight: 600; color: #374151; }
.roi-method__body { padding: 0 1.25rem 1.25rem; }
.roi-method__body p { font-size: .88rem; color: #4b5563; line-height: 1.5; margin: .6rem 0; }
.roi-method__body code { background: #eef2ff; color: #3730a3; padding: .1rem .35rem; border-radius: .3rem; font-size: .82rem; }
.roi-method__body a { color: #4f46e5; }
</style>
