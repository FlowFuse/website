<script setup lang="ts">
// The ROI model, shared by the full calculator page (/resources/roi-calculator/) and the
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

const FULL_CALCULATOR_URL = '/resources/roi-calculator/'

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
  <div class="grid lg:grid-cols-2 gap-6 items-start">

    <!-- Inputs -->
    <div class="flex flex-col gap-4">
      <!-- Team -->
      <div class="card border border-gray-200 pb-8">
        <h3 class="text-base mb-5 text-gray-900 font-semibold">Your team</h3>
        <label v-for="fld in teamFields" :key="fld.key" class="block mb-4 last:mb-0">
          <span class="block text-sm text-gray-700 mb-1.5 font-semibold">{{ fld.label }}</span>
          <div v-if="fld.type === 'money'" class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input v-model.number="f[fld.key]" type="number" min="0" step="5000" class="input pl-6" />
          </div>
          <input v-else v-model.number="f[fld.key]" type="number" min="0" class="input pl-3" />
          <span v-if="fld.hint" class="block text-xs text-gray-400 mt-1.5 leading-snug">{{ fld.hint }}</span>
        </label>
        <label class="block mb-3.5 last:mb-0">
          <span class="block text-sm text-gray-700 mb-1.5 font-semibold">Sites / deployments (for your investment)</span>
          <input v-model.number="f.sites" type="number" min="1" max="500" class="input pl-3" />
        </label>

        <p v-if="compact" class="text-xs text-gray-500 leading-normal mt-5 pt-4 border-t border-gray-100">
          Running on conservative defaults for reuse, deployment automation and downtime recovery.
          <a :href="FULL_CALCULATOR_URL" @click="capture('roi-open-full', { position: 'pricing-embed' })" class="font-semibold text-indigo-600">Open the full ROI calculator</a> to tune every lever and see the research behind it.
        </p>
      </div>

      <template v-if="!compact">
        <!-- 1 · Waste elimination -->
        <div class="card border-2 border-indigo-300 pb-8">
          <div class="flex items-center justify-between mb-2">
            <div><span class="badge bg-indigo-100 text-indigo-700">1</span><h3 class="text-base m-0 inline text-gray-900 font-semibold">Waste elimination</h3></div>
            <span class="text-base text-indigo-700 font-semibold">{{ fmtK(cat1) }}/yr</span>
          </div>
          <p class="text-sm text-gray-500 leading-normal mt-1 mb-4">Each engineer loses about <b class="text-gray-700">{{ hoursLostSearch }} hours a year</b> ({{ (SEARCH_SHARE * 100) }}% of the week) tracking down documentation and context. FlowFuse Expert surfaces it instead.</p>
          <label class="flex flex-col gap-1.5 text-sm text-gray-700 mb-4 last:mb-0">
            <span>Search time FlowFuse recovers <b class="text-indigo-700">{{ f.searchRecovery }}%</b></span>
            <input v-model.number="f.searchRecovery" type="range" min="0" max="60" class="w-full roi-range--waste" :style="rangeStyle(f.searchRecovery, 60, 'var(--color-indigo-400)', 'var(--color-indigo-100)')" />
          </label>
        </div>

        <!-- 2 · Speed to deploy -->
        <div class="card border-2 border-gray-300 pb-8">
          <div class="flex items-center justify-between mb-2">
            <div><span class="badge bg-gray-100 text-gray-700">2</span><h3 class="text-base m-0 inline text-gray-900 font-semibold">Speed to deploy</h3></div>
            <span class="text-base text-gray-700 font-semibold">{{ fmtK(cat2) }}/yr</span>
          </div>
          <p class="text-sm text-gray-500 leading-normal mt-1 mb-4">Reusing components instead of rebuilding, and shipping through pipelines instead of walking machine to machine.</p>
          <template v-for="fld in speedFields" :key="fld.key">
            <label v-if="fld.type === 'pct'" class="flex flex-col gap-1.5 text-sm text-gray-700 mb-4 last:mb-0">
              <span>{{ fld.label }} <b class="text-gray-700">{{ f[fld.key] }}%</b></span>
              <input v-model.number="f[fld.key]" type="range" min="0" max="90" class="w-full roi-range--speed" :style="rangeStyle(f[fld.key], 90, 'var(--color-gray-400)', 'var(--color-gray-100)')" />
            </label>
            <label v-else class="block mb-3.5 last:mb-0">
              <span class="block text-sm text-gray-700 mb-1.5 font-semibold">{{ fld.label }}</span>
              <input v-model.number="f[fld.key]" type="number" min="0" class="input pl-3" />
            </label>
          </template>
        </div>

        <!-- 3 · Fault tolerance -->
        <div class="card border-2 border-red-100 pb-8">
          <div class="flex items-center justify-between mb-2">
            <div><span class="badge bg-red-50 text-red-700">3</span><h3 class="text-base m-0 inline text-gray-900 font-semibold">Fault tolerance</h3></div>
            <span class="text-base text-red-700 font-semibold">{{ fmtK(cat3) }}/yr</span>
          </div>
          <p class="text-sm text-gray-500 leading-normal mt-1 mb-4">When something breaks and you can’t roll back fast, machines sit idle, engineers scramble, and you’re exposed to client disputes.</p>
          <template v-for="fld in faultFields" :key="fld.key">
            <label v-if="fld.type === 'pct'" class="flex flex-col gap-1.5 text-sm text-gray-700 mb-4 last:mb-0">
              <span>{{ fld.label }} <b class="text-red-700">{{ f[fld.key] }}%</b></span>
              <input v-model.number="f[fld.key]" type="range" min="0" max="90" class="w-full roi-range--fault" :style="rangeStyle(f[fld.key], 90, 'var(--color-red-200)', 'var(--color-red-50)')" />
            </label>
            <label v-else class="block mb-3.5 last:mb-0">
              <span class="block text-sm text-gray-700 mb-1.5 font-semibold">{{ fld.label }}</span>
              <div v-if="fld.type === 'money'" class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input v-model.number="f[fld.key]" type="number" min="0" step="1000" class="input pl-6" />
              </div>
              <input v-else v-model.number="f[fld.key]" type="number" min="0" class="input pl-3" />
              <span v-if="fld.hint" class="block text-xs text-gray-400 mt-1.5 leading-snug">{{ fld.hint }}</span>
            </label>
          </template>
        </div>
      </template>
    </div>

    <!-- Results -->
    <div
        class="rounded-2xl p-7 text-white bg-gradient-to-b from-indigo-600 via-indigo-800 via-60% to-indigo-950 shadow-2xl shadow-indigo-600/28"
        :class="{ 'sticky top-20': !compact }"
    >
      <div class="text-xs tracking-widest uppercase text-indigo-200 font-semibold">Estimated annual recovery</div>
      <div class="text-5xl tracking-tight leading-none mt-1 font-semibold">{{ fmt(gross) }}<span class="text-base text-indigo-200 ml-1.5 font-medium">/ year</span></div>

      <div class="mt-6 flex flex-col gap-3.5">
        <div v-for="c in categories" :key="c.key">
          <div class="flex justify-between gap-3 text-sm text-indigo-100 mb-1">
            <span>{{ c.label }} <em class="text-indigo-300 not-italic text-xs">· {{ c.sub }}</em></span>
            <span class="text-white whitespace-nowrap font-semibold">{{ fmtK(c.value) }}</span>
          </div>
          <div class="h-2 rounded-full bg-white/15 overflow-hidden"><span :class="c.barClass" class="block h-full rounded-full transition-all duration-300 ease-in-out" :style="{ width: (c.value / maxCat * 100) + '%' }"></span></div>
        </div>
      </div>

      <!-- Net — computed in-form -->
      <div class="mt-6 pt-5 border-t border-white/20">
        <div class="flex items-baseline justify-between gap-4 text-sm text-indigo-100">
          <span>Net savings after your FlowFuse investment</span>
          <b class="text-2xl text-white whitespace-nowrap font-semibold">{{ positive ? fmt(netSavings) : '—' }}</b>
        </div>
        <div class="flex flex-wrap gap-2 mt-3" v-if="positive">
          <span class="chip">≈{{ roiMultiple }}× return</span>
          <span class="chip">pays for itself in {{ paybackBand }}</span>
        </div>
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <CtaSignUp variant="highlight" :position="ctaPosition" />
        <CtaBookDemo variant="ghost" color="white" icon="i-lucide-arrow-right" :position="ctaPosition" />
      </div>
      <p class="text-xs text-indigo-200 mt-4 leading-snug">Directional estimate for comparison, not a quote. Every input is yours to change.</p>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/theme.css";

/* Small utility-combos reused 2-4 times each across this template (`@apply`, not
   hand-written values) — kept out of `padding-left`/anything a caller overrides per
   instance, since a scoped rule always wins over a Tailwind utility on the same
   property regardless of specificity (unlayered beats `@layer utilities`). `.input`
   deliberately omits left padding for that reason: callers add `pl-3`/`pl-6` themselves. */
.card { @apply bg-white rounded-2xl shadow-xl shadow-gray-900/6 pt-6 pl-6 pr-6; }
.input { @apply w-full border border-gray-200 rounded-lg py-2 pr-3 text-base text-gray-900 bg-white focus:outline-none focus:border-indigo-600; }
.badge { @apply inline-grid place-items-center w-6 h-6 rounded-full text-xs mr-2 align-middle font-semibold; }
.chip { @apply text-xs bg-white/15 text-white rounded-full py-1 px-3 font-semibold; }

/* Per-category thumb color, overriding the site-wide indigo reset (src/css/style.css).
   Tailwind has no utility for vendor pseudo-elements, so this is the one part of this
   component that can't move to a class. Hover variants are needed too: the global rule's
   `input[type="range"]::-webkit-slider-thumb:hover` selector is otherwise more specific
   than a plain classed one at the same specificity tier and would win the tie-break,
   reverting the thumb to indigo on hover. */
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
</style>
