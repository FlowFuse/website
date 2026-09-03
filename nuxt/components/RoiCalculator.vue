<script setup lang="ts">
// The ROI model, shared by the full calculator page (/pricing/roi-calculator/) and the
// truncated teaser embedded on /pricing/. `compact` drops the three category cards and
// runs them on their defaults, so the numbers on both surfaces come from one model and
// cannot drift apart.
const props = withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })

// window.capture is injected by the site's analytics script — guarded because it's absent outside production.
function capture (eventName?: string, payload?: Record<string, unknown>) {
  if (!eventName) return
  if (typeof (window as any).capture === 'function') {
    (window as any).capture(eventName, payload)
  }
}

const FULL_CALCULATOR_URL = '/pricing/roi-calculator/'

// Fixed, research-grounded constant (see the evidence section on the calculator page).
const SEARCH_SHARE = 0.20 // McKinsey (2012): ~20% of the work-week lost to finding information

// ── All inputs in one reactive object so the template can render them from descriptors ──
const f = reactive({
  // Team
  engineers: 25,
  salary: 150000,       // fully-loaded $/engineer/yr
  workHours: 2080,      // working hours/engineer/yr
  // 1 — Waste elimination
  searchRecovery: 30,   // % of search time recovered by Expert + governance
  // 2 — Speed to deploy
  appsPerYear: 24,      // new applications/flows built per year
  hoursPerApp: 120,     // engineer-hours to build one from scratch
  reuseReduction: 45,   // % cut by reuse (Blueprints, components, Team Library)
  deploysPerYear: 100,  // deployments/updates per year
  hoursPerDeploy: 12,   // hours per manual deployment (machine-to-machine on raw Node-RED)
  pipeReduction: 70,    // % cut by pipelines, snapshots & remote deploy
  // 3 — Fault tolerance
  incidents: 6,         // production incidents per year
  downtimeHoursEach: 4, // downtime hours per incident without fast rollback
  costPerHour: 25000,   // $/hour of downtime (lost production + idle engineers)
  recoverReduction: 50, // % of downtime avoided via snapshots, rollback & monitoring
  // Investment scale
  sites: 5,
})

const hourly = computed(() => f.salary / Math.max(1, f.workHours))
const hoursLostSearch = computed(() => Math.round(f.workHours * SEARCH_SHARE))

// ── Three savings categories ──
const cat1 = computed(() => f.engineers * f.salary * SEARCH_SHARE * (f.searchRecovery / 100))
const cat2a = computed(() => f.appsPerYear * f.hoursPerApp * (f.reuseReduction / 100) * hourly.value)
const cat2b = computed(() => f.deploysPerYear * f.hoursPerDeploy * (f.pipeReduction / 100) * hourly.value)
const cat2 = computed(() => cat2a.value + cat2b.value)
const cat3 = computed(() => f.incidents * f.downtimeHoursEach * f.costPerHour * (f.recoverReduction / 100))
const gross = computed(() => cat1.value + cat2.value + cat3.value)

const categories = computed(() => [
  { key: 'waste', label: 'Waste elimination', sub: 'Time recovered finding information', value: cat1.value, barClass: 'bg-indigo-300' },
  { key: 'speed', label: 'Speed to deploy', sub: 'Reuse + automated deployment', value: cat2.value, barClass: 'bg-gray-300' },
  { key: 'fault', label: 'Fault tolerance', sub: 'Avoided downtime & idle time', value: cat3.value, barClass: 'bg-red-100' },
])
const maxCat = computed(() => Math.max(1, ...categories.value.map(c => c.value)))

// The site-wide range-input reset (src/css/style.css) paints the whole track one flat
// color, so `accent-color` has no effect once -webkit-appearance is stripped. Building
// the "traveled vs remaining" look needs an explicit two-stop gradient instead, split at
// the field's current percentage. Colors are the theme's own CSS variables (Tailwind v4
// exposes every shade as --color-{name}-{shade}), not hardcoded hex.
function rangeStyle (value: number, max: number, filled: string, empty: string) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return { background: `linear-gradient(to right, ${filled} 0%, ${filled} ${pct}%, ${empty} ${pct}%, ${empty} 100%)` }
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmtK = (n: number) => {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 2) + 'M'
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'k'
  return '$' + Math.round(n)
}

// ── Net / ROI / payback (computed in-form) ──
// Representative blended annual package figure with a volume taper. Kept low-key
// rather than server-side — a public calculator can be reverse-engineered anyway,
// and this keeps the whole thing dependency-free.
const PACKAGE_BASE = 249 * 100
function volumeFactor (n: number): number {
  if (n >= 10) return 0.80
  if (n >= 5) return 0.85
  if (n >= 2) return 0.90
  return 1
}
const investment = computed(() => Math.round(f.sites * PACKAGE_BASE * volumeFactor(f.sites)))
const positive = computed(() => gross.value - investment.value > 0)
const netSavings = computed(() => Math.round(Math.max(0, gross.value - investment.value) / 5000) * 5000)
const roiMultiple = computed(() => investment.value > 0 ? Math.round(gross.value / investment.value * 10) / 10 : 0)
const paybackBand = computed(() => {
  const m = gross.value > 0 ? investment.value / (gross.value / 12) : null
  if (m === null || !isFinite(m)) return '—'
  if (m < 1) return 'under a month'
  if (m < 3) return '1–3 months'
  if (m < 6) return '3–6 months'
  if (m < 12) return '6–12 months'
  return 'about a year'
})

// Where a CTA click came from, so the two placements are separable in analytics.
const ctaPosition = computed(() => props.compact ? 'roi-pricing-embed' : 'roi-result')

// ── Input descriptors (rendered with v-for; keeps the template lean) ──
const teamFields = [
  { key: 'engineers', label: 'Engineers building & maintaining automation', type: 'int' },
  { key: 'salary', label: 'Fully-loaded cost per engineer / year', type: 'money', hint: 'US median for controls engineers is ~$123k base (BLS) — ~$150k+ fully loaded.' },
  { key: 'workHours', label: 'Working hours per engineer / year', type: 'int' },
]
const speedFields = [
  { key: 'appsPerYear', label: 'New applications / flows built per year', type: 'int' },
  { key: 'hoursPerApp', label: 'Engineer-hours to build one from scratch', type: 'int' },
  { key: 'reuseReduction', label: 'Reduction from reuse (Blueprints, Team Library)', type: 'pct' },
  { key: 'deploysPerYear', label: 'Deployments / updates per year', type: 'int' },
  { key: 'hoursPerDeploy', label: 'Hours per manual deployment (machine-to-machine)', type: 'int' },
  { key: 'pipeReduction', label: 'Reduction from pipelines & remote deploy', type: 'pct' },
]
const faultFields = [
  { key: 'incidents', label: 'Production incidents per year', type: 'int' },
  { key: 'downtimeHoursEach', label: 'Downtime hours per incident (no fast rollback)', type: 'int' },
  { key: 'costPerHour', label: 'Cost per hour of downtime', type: 'money', hint: 'Industry average is ~$125k/hr (ABB, 2023). Default is deliberately conservative.' },
  { key: 'recoverReduction', label: 'Downtime avoided via snapshots & rollback', type: 'pct' },
]
</script>

<template>
  <div class="roi-calc grid lg:grid-cols-2 gap-6 items-start">

    <!-- Inputs -->
    <div class="roi-col">
      <!-- Team -->
      <div class="roi-card border border-gray-200 pb-8">
        <h3 class="roi-card__h font-semibold">Your team</h3>
        <label v-for="fld in teamFields" :key="fld.key" class="roi-field">
          <span class="roi-field__label font-semibold">{{ fld.label }}</span>
          <div v-if="fld.type === 'money'" class="roi-input-wrap">
            <span class="roi-input-prefix">$</span>
            <input v-model.number="f[fld.key]" type="number" min="0" step="5000" class="roi-input roi-input--prefixed" />
          </div>
          <input v-else v-model.number="f[fld.key]" type="number" min="0" class="roi-input" />
          <span v-if="fld.hint" class="roi-field__hint">{{ fld.hint }}</span>
        </label>
        <label class="roi-field roi-field--tight">
          <span class="roi-field__label font-semibold">Sites / deployments (for your investment)</span>
          <input v-model.number="f.sites" type="number" min="1" max="500" class="roi-input" />
        </label>

        <p v-if="compact" class="roi-card__foot">
          Running on conservative defaults for reuse, deployment automation and downtime recovery.
          <a :href="FULL_CALCULATOR_URL" @click="capture('roi-open-full', { position: 'pricing-embed' })" class="font-semibold">Open the full ROI calculator</a> to tune every lever and see the research behind it.
        </p>
      </div>

      <template v-if="!compact">
        <!-- 1 · Waste elimination -->
        <div class="roi-card roi-cat border-2 border-indigo-300 pb-8">
          <div class="roi-cat__head">
            <div><span class="roi-cat__num bg-indigo-100 text-indigo-700 font-semibold">1</span><h3 class="roi-card__h roi-card__h--inline font-semibold">Waste elimination</h3></div>
            <span class="roi-cat__sub text-indigo-700 font-semibold">{{ fmtK(cat1) }}/yr</span>
          </div>
          <p class="roi-cat__note">Each engineer loses about <b>{{ hoursLostSearch }} hours a year</b> ({{ (SEARCH_SHARE * 100) }}% of the week) tracking down documentation and context. FlowFuse Expert surfaces it instead.</p>
          <label class="roi-slider">
            <span>Search time FlowFuse recovers <b class="text-indigo-700">{{ f.searchRecovery }}%</b></span>
            <input v-model.number="f.searchRecovery" type="range" min="0" max="60" class="roi-range roi-range--waste" :style="rangeStyle(f.searchRecovery, 60, 'var(--color-indigo-400)', 'var(--color-indigo-100)')" />
          </label>
        </div>

        <!-- 2 · Speed to deploy -->
        <div class="roi-card roi-cat border-2 border-gray-300 pb-8">
          <div class="roi-cat__head">
            <div><span class="roi-cat__num bg-gray-100 text-gray-700 font-semibold">2</span><h3 class="roi-card__h roi-card__h--inline font-semibold">Speed to deploy</h3></div>
            <span class="roi-cat__sub text-gray-700 font-semibold">{{ fmtK(cat2) }}/yr</span>
          </div>
          <p class="roi-cat__note">Reusing components instead of rebuilding, and shipping through pipelines instead of walking machine to machine.</p>
          <template v-for="fld in speedFields" :key="fld.key">
            <label v-if="fld.type === 'pct'" class="roi-slider">
              <span>{{ fld.label }} <b class="text-gray-700">{{ f[fld.key] }}%</b></span>
              <input v-model.number="f[fld.key]" type="range" min="0" max="90" class="roi-range roi-range--speed" :style="rangeStyle(f[fld.key], 90, 'var(--color-gray-400)', 'var(--color-gray-100)')" />
            </label>
            <label v-else class="roi-field roi-field--tight">
              <span class="roi-field__label font-semibold">{{ fld.label }}</span>
              <input v-model.number="f[fld.key]" type="number" min="0" class="roi-input" />
            </label>
          </template>
        </div>

        <!-- 3 · Fault tolerance -->
        <div class="roi-card roi-cat border-2 border-red-100 pb-8">
          <div class="roi-cat__head">
            <div><span class="roi-cat__num bg-red-50 text-red-700 font-semibold">3</span><h3 class="roi-card__h roi-card__h--inline font-semibold">Fault tolerance</h3></div>
            <span class="roi-cat__sub text-red-700 font-semibold">{{ fmtK(cat3) }}/yr</span>
          </div>
          <p class="roi-cat__note">When something breaks and you can’t roll back fast, machines sit idle, engineers scramble, and you’re exposed to client disputes.</p>
          <template v-for="fld in faultFields" :key="fld.key">
            <label v-if="fld.type === 'pct'" class="roi-slider">
              <span>{{ fld.label }} <b class="text-red-700">{{ f[fld.key] }}%</b></span>
              <input v-model.number="f[fld.key]" type="range" min="0" max="90" class="roi-range roi-range--fault" :style="rangeStyle(f[fld.key], 90, 'var(--color-red-200)', 'var(--color-red-50)')" />
            </label>
            <label v-else class="roi-field roi-field--tight">
              <span class="roi-field__label font-semibold">{{ fld.label }}</span>
              <div v-if="fld.type === 'money'" class="roi-input-wrap">
                <span class="roi-input-prefix">$</span>
                <input v-model.number="f[fld.key]" type="number" min="0" step="1000" class="roi-input roi-input--prefixed" />
              </div>
              <input v-else v-model.number="f[fld.key]" type="number" min="0" class="roi-input" />
              <span v-if="fld.hint" class="roi-field__hint">{{ fld.hint }}</span>
            </label>
          </template>
        </div>
      </template>
    </div>

    <!-- Results -->
    <div class="roi-result" :class="{ 'sticky top-20': !compact }">
      <div class="roi-result__eyebrow font-semibold">Estimated annual recovery</div>
      <div class="roi-result__big font-semibold">{{ fmt(gross) }}<span class="roi-result__per font-medium">/ year</span></div>

      <div class="roi-bars">
        <div v-for="c in categories" :key="c.key" class="roi-bar">
          <div class="roi-bar__top">
            <span>{{ c.label }} <em>· {{ c.sub }}</em></span>
            <span class="roi-bar__val font-semibold">{{ fmtK(c.value) }}</span>
          </div>
          <div class="roi-bar__track"><span :class="c.barClass" :style="{ width: (c.value / maxCat * 100) + '%' }"></span></div>
        </div>
      </div>

      <!-- Net — computed in-form -->
      <div class="roi-net">
        <div class="roi-net__row">
          <span>Net savings after your FlowFuse investment</span>
          <b class="font-semibold">{{ positive ? fmt(netSavings) : '—' }}</b>
        </div>
        <div class="roi-net__chips" v-if="positive">
          <span class="roi-chip font-semibold">≈{{ roiMultiple }}× return</span>
          <span class="roi-chip font-semibold">pays for itself in {{ paybackBand }}</span>
        </div>
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <CtaSignUp variant="highlight" :position="ctaPosition" />
        <CtaBookDemo variant="ghost" color="white" icon="i-lucide-arrow-right" :position="ctaPosition" />
      </div>
      <p class="roi-result__fine">Directional estimate for comparison, not a quote. Every input is yours to change.</p>
    </div>
  </div>
</template>

<style scoped>
/* Input column */
.roi-col { display: flex; flex-direction: column; gap: 1rem; }
.roi-card { background: #fff; border-radius: 1rem; padding-top: 1.5rem; padding-left: 1.5rem; padding-right: 1.5rem; box-shadow: 0 16px 40px rgba(2,6,13,0.06); }
.roi-card__h { font-size: 1.05rem; margin: 0 0 1.15rem; color: #111827; }
.roi-card__h--inline { margin: 0; display: inline; }
.roi-card__foot { font-size: .78rem; color: #6b7280; line-height: 1.45; margin: 1.15rem 0 0; padding-top: 1rem; border-top: 1px solid #f3f4f6; }
.roi-card__foot a { color: #4f46e5; }
.roi-cat__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: .5rem; }
.roi-cat__num { display: inline-grid; place-items: center; width: 1.4rem; height: 1.4rem; border-radius: 9999px; font-size: .8rem; margin-right: .55rem; vertical-align: middle; }
.roi-cat__sub { font-size: 1.05rem; }
.roi-cat__note { font-size: .84rem; color: #6b7280; line-height: 1.45; margin: .1rem 0 1rem; }
.roi-cat__note b { color: #374151; }

.roi-field { display: block; margin-bottom: 1.05rem; }
.roi-field--tight { margin-bottom: .9rem; }
.roi-field:last-child, .roi-field--tight:last-child { margin-bottom: 0; }
.roi-field__label { display: block; font-size: .88rem; color: #374151; margin-bottom: .4rem; }
.roi-field__hint { display: block; font-size: .75rem; color: #9ca3af; margin-top: .35rem; line-height: 1.35; }
.roi-input { width: 100%; border: 1.5px solid #e5e7eb; border-radius: .6rem; padding: .55rem .8rem; font-size: 1rem; color: #111827; background: #fff; }
.roi-input:focus { outline: none; border-color: #4f46e5; }
.roi-input-wrap { position: relative; }
.roi-input-prefix { position: absolute; left: .8rem; top: 50%; transform: translateY(-50%); color: #9ca3af; }
.roi-input--prefixed { padding-left: 1.6rem; }
.roi-slider { display: flex; flex-direction: column; gap: .35rem; font-size: .85rem; color: #374151; margin-bottom: 1rem; }
.roi-slider:last-child { margin-bottom: 0; }
.roi-slider input[type=range] { width: 100%; }

/* Per-category thumb color, overriding the site-wide indigo reset (src/css/style.css).
   Hover variants are needed too: the global rule's `input[type="range"]::-webkit-slider-
   thumb:hover` selector is otherwise more specific than a plain classed one at the same
   specificity tier and would win the tie-break, reverting the thumb to indigo on hover. */
.roi-range--waste::-webkit-slider-thumb { background-color: var(--color-indigo-400); border-color: var(--color-indigo-100); }
.roi-range--waste::-moz-range-thumb { background-color: var(--color-indigo-400); border-color: var(--color-indigo-100); }
.roi-range--waste::-webkit-slider-thumb:hover { background-color: var(--color-indigo-600); }
.roi-range--waste::-moz-range-thumb:hover { background-color: var(--color-indigo-600); }
.roi-range--speed::-webkit-slider-thumb { background-color: var(--color-gray-400); border-color: var(--color-gray-100); }
.roi-range--speed::-moz-range-thumb { background-color: var(--color-gray-400); border-color: var(--color-gray-100); }
.roi-range--speed::-webkit-slider-thumb:hover { background-color: var(--color-gray-600); }
.roi-range--speed::-moz-range-thumb:hover { background-color: var(--color-gray-600); }
.roi-range--fault::-webkit-slider-thumb { background-color: var(--color-red-200); border-color: var(--color-red-50); }
.roi-range--fault::-moz-range-thumb { background-color: var(--color-red-200); border-color: var(--color-red-50); }
.roi-range--fault::-webkit-slider-thumb:hover { background-color: var(--color-red-600); }
.roi-range--fault::-moz-range-thumb:hover { background-color: var(--color-red-600); }

/* Results card */
.roi-result { border-radius: 1rem; padding: 1.75rem; color: #fff; background: linear-gradient(160deg, #4f46e5 0%, #3730a3 60%, #211c64 100%); box-shadow: 0 24px 54px rgba(79,70,229,0.28); }
.roi-result__eyebrow { font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: #c7d2fe; }
.roi-result__big { font-size: 2.9rem; letter-spacing: -0.02em; line-height: 1.05; margin-top: .25rem; }
.roi-result__per { font-size: 1rem; color: #c7d2fe; margin-left: .4rem; }
.roi-bars { margin-top: 1.5rem; display: flex; flex-direction: column; gap: .9rem; }
.roi-bar__top { display: flex; justify-content: space-between; gap: .75rem; font-size: .85rem; color: #e0e7ff; margin-bottom: .3rem; }
.roi-bar__top em { color: #a5b4fc; font-style: normal; font-size: .78rem; }
.roi-bar__val { color: #fff; white-space: nowrap; }
.roi-bar__track { height: 8px; border-radius: 9999px; background: rgba(255,255,255,0.16); overflow: hidden; }
.roi-bar__track span { display: block; height: 100%; border-radius: 9999px; transition: width .3s ease; }
.roi-net { margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.2); }
.roi-net__row { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; font-size: .9rem; color: #e0e7ff; }
.roi-net__row b { font-size: 1.5rem; color: #fff; white-space: nowrap; }
.roi-net__chips { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem; }
.roi-chip { font-size: .78rem; background: rgba(255,255,255,0.16); color: #fff; border-radius: 9999px; padding: .3rem .7rem; }
.roi-result__fine { font-size: .74rem; color: #c7d2fe; margin: 1rem 0 0; line-height: 1.4; }
</style>
