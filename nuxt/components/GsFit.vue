<script setup lang="ts">
// Guided product-fit finder. Four questions map an answer to Edge / Hub / Fleet
// using the same discriminators as the product pages (data origin, unit of scale,
// sponsoring team, protocol needs). Highest score wins; Q1 (data origin) is weighted.
const capture = useCapture()
withDefaults(defineProps<{ showHeader?: boolean }>(), { showHeader: true })

type Tier = 'edge' | 'hub' | 'fleet'
const TONE: Record<Tier, string> = { edge: '#DA3D0B', hub: '#4f46e5', fleet: '#35AAB0' }

interface Q { q: string; weight?: number; options: { label: string; tier: Tier }[] }
const questions: Q[] = [
  { q: 'Where does most of your data come from?', weight: 2, options: [
    { label: 'Machines on the plant floor — PLCs, SCADA, sensors', tier: 'edge' },
    { label: 'Software systems — ERPs, databases, cloud APIs', tier: 'hub' },
    { label: 'Devices deployed across many remote sites', tier: 'fleet' },
  ] },
  { q: 'What are you trying to scale?', options: [
    { label: 'Production and automation across one or more plants', tier: 'edge' },
    { label: 'Governed integrations that serve the whole business', tier: 'hub' },
    { label: 'A fleet of distributed devices, updated remotely', tier: 'fleet' },
  ] },
  { q: "Who's driving the project?", options: [
    { label: 'An OT or digitalization team', tier: 'edge' },
    { label: 'Central IT or an integration team', tier: 'hub' },
    { label: 'A hardware OEM or asset operator shipping a product', tier: 'fleet' },
  ] },
  { q: 'Do you need industrial protocol connectivity — OPC-UA, Modbus, EtherNet/IP?', options: [
    { label: 'Yes — connecting to industrial hardware is core', tier: 'edge' },
    { label: "No — it's software-to-software integration", tier: 'hub' },
    { label: 'It lives on the devices we ship and manage', tier: 'fleet' },
  ] },
]

const results: Record<Tier, { label: string; eyebrow: string; why: string }> = {
  edge: { label: 'FlowFuse Edge', eyebrow: 'For OT & Digitalization Teams', why: "Your data starts at the machines, and you're standardizing production across the plant floor." },
  hub: { label: 'FlowFuse Hub', eyebrow: 'For IT & Integration Teams', why: "You're building governed integration between software systems, sponsored by central IT." },
  fleet: { label: 'FlowFuse Fleet', eyebrow: 'For Hardware OEMs & Asset Operators', why: 'Distributed devices are your unit of scale — you need remote updates, rollback, and fleet-wide visibility.' },
}

const ORDER: Tier[] = ['edge', 'hub', 'fleet']
const maxScore = questions.reduce((n, q) => n + (q.weight ?? 1), 0)

const step = ref(0)
const answers = ref<(Tier | null)[]>(Array(questions.length).fill(null))

const answeredCount = computed(() => answers.value.filter(Boolean).length)
const finished = computed(() => answers.value.every(Boolean))
const progress = computed(() => Math.round((answeredCount.value / questions.length) * 100))

const scores = computed(() => {
  const s: Record<Tier, number> = { edge: 0, hub: 0, fleet: 0 }
  answers.value.forEach((a, i) => { if (a) s[a] += questions[i].weight ?? 1 })
  return s
})
const best = computed<Tier>(() => {
  const s = scores.value
  let top = ORDER[0]
  for (const t of ORDER) if (s[t] > s[top]) top = t
  const tied = ORDER.filter(t => s[t] === s[top])
  if (tied.length > 1 && answers.value[0]) return answers.value[0] as Tier
  return top
})
const others = computed(() => ORDER.filter(t => t !== best.value))

function choose (tier: Tier) {
  answers.value[step.value] = tier
  capture('gs-fit-answer', { step: step.value + 1, choice: tier })
  if (step.value < questions.length - 1) setTimeout(() => { step.value++ }, 170)
  else capture('gs-fit-result', { result: best.value })
}
function back () { if (step.value > 0) step.value-- }
function restart () { answers.value = Array(questions.length).fill(null); step.value = 0; capture('gs-fit-restart', {}) }

// Route the recommendation into the get-started guide: set the shared product so
// the guide's tabs land on the right lane, then scroll there. Falls back to the
// product page if the guide isn't on the page (component reused elsewhere).
const gsProduct = useState<Tier>('gs-product', () => 'edge')
function startWith (tier: Tier) {
  gsProduct.value = tier
  capture('gs-fit-start', { result: tier })
  const el = document.getElementById('get-started')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  else navigateTo(`/product/${tier}/`)
}
</script>

<template>
  <div class="gs-fit">
    <div v-if="showHeader" class="gs-fit__head">
      <span class="gs-fit__eyebrow">Find Your Fit</span>
      <h2 class="gs-fit__title">Which FlowFuse Is Right for You?</h2>
      <p class="gs-fit__sub">Answer four quick questions and we'll point you to the right product to start with — Edge, Hub, or Fleet.</p>
    </div>

    <div class="gs-fit__bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
      <span :style="{ width: progress + '%' }"></span>
    </div>

    <Transition name="fit" mode="out-in">
      <!-- QUESTION -->
      <div v-if="!finished" :key="step" class="gs-fit__card">
        <div class="gs-fit__count">Question {{ step + 1 }} of {{ questions.length }}</div>
        <div class="gs-fit__q">{{ questions[step].q }}</div>
        <div class="gs-fit__opts">
          <button
            v-for="o in questions[step].options"
            :key="o.label"
            type="button"
            class="gs-fit__opt"
            :class="{ 'is-picked': answers[step] === o.tier }"
            :style="{ '--t': TONE[o.tier] }"
            @click="choose(o.tier)"
          >
            <span class="gs-fit__optdot" aria-hidden="true"></span>
            <span class="gs-fit__optlabel">{{ o.label }}</span>
            <svg class="gs-fit__optarrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <button v-if="step > 0" type="button" class="gs-fit__back" @click="back">&larr; Back</button>
      </div>

      <!-- RESULT -->
      <div v-else key="result" class="gs-fit__result" :style="{ '--t': TONE[best] }">
        <div class="gs-fit__resulthead">
          <span class="gs-fit__resulteyebrow">Your best fit</span>
          <div class="gs-fit__resultname">{{ results[best].label }}</div>
          <div class="gs-fit__resultrole">{{ results[best].eyebrow }}</div>
          <p class="gs-fit__resultwhy">{{ results[best].why }}</p>
        </div>

        <div class="gs-fit__scores">
          <div v-for="t in ORDER" :key="t" class="gs-fit__score" :class="{ 'is-best': t === best }" :style="{ '--t': TONE[t] }">
            <span class="gs-fit__scorelabel">{{ results[t].label.replace('FlowFuse ', '') }}</span>
            <span class="gs-fit__scoretrack"><span :style="{ width: (scores[t] / maxScore * 100) + '%' }"></span></span>
          </div>
        </div>

        <div class="gs-fit__actions">
          <button type="button" class="gs-fit__cta" @click="startWith(best)">
            Get started with {{ results[best].label }} <span aria-hidden="true">&rarr;</span>
          </button>
          <div class="gs-fit__also">
            <span>Or learn more:</span>
            <a :href="`/product/${best}/`" @click="capture('gs-fit-learn', { tier: best })">{{ results[best].label.replace('FlowFuse ', '') }} overview</a>
            <a v-for="t in others" :key="t" :href="`/product/${t}/`" @click="capture('gs-fit-other', { tier: t })">{{ results[t].label.replace('FlowFuse ', '') }}</a>
          </div>
        </div>

        <button type="button" class="gs-fit__restart" @click="restart">&#8635; Start over</button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.gs-fit { position: relative; border-radius: 1.5rem; padding: 2.25rem 2rem; overflow: hidden; background: radial-gradient(120% 120% at 0% 0%, #f5f7ff 0%, #ffffff 55%); border: 1px solid #e6e8f4; box-shadow: 0 18px 44px rgba(2,6,13,0.07); }
.gs-fit__head { text-align: center; max-width: 34rem; margin: 0 auto 1.5rem; }
.gs-fit__eyebrow { display: inline-block; font-size: .7rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #6366f1; margin-bottom: .5rem; }
.gs-fit__title { font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em; color: #0f172a; margin: 0; }
.gs-fit__sub { font-size: .95rem; color: #64748b; margin: .5rem 0 0; }

.gs-fit__bar { max-width: 34rem; margin: 0 auto 1.4rem; height: 5px; border-radius: 9999px; background: #eceefb; overflow: hidden; }
.gs-fit__bar span { display: block; height: 100%; border-radius: 9999px; background: linear-gradient(90deg, #818cf8, #4f46e5); transition: width .4s cubic-bezier(.4,0,.2,1); }

.gs-fit__card { max-width: 40rem; margin: 0 auto; }
.gs-fit__count { font-size: .72rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: #94a3b8; text-align: center; }
.gs-fit__q { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.01em; color: #0f172a; text-align: center; margin: .5rem 0 1.4rem; line-height: 1.3; }
.gs-fit__opts { display: flex; flex-direction: column; gap: .7rem; }
.gs-fit__opt { display: flex; align-items: center; gap: .85rem; width: 100%; text-align: left; padding: 1rem 1.15rem; border-radius: .9rem; border: 1.5px solid #e5e7f0; background: #fff; cursor: pointer; transition: border-color .16s ease, box-shadow .18s ease, transform .12s ease, background .16s ease; }
.gs-fit__opt:hover { border-color: var(--t); box-shadow: 0 10px 22px rgba(2,6,13,0.08); transform: translateY(-1px); }
.gs-fit__opt.is-picked { border-color: var(--t); background: color-mix(in srgb, var(--t) 7%, #fff); }
.gs-fit__optdot { flex: none; width: 1.15rem; height: 1.15rem; border-radius: 9999px; border: 2px solid #d5d9e6; transition: border-color .16s ease, background .16s ease, box-shadow .16s ease; }
.gs-fit__opt:hover .gs-fit__optdot, .gs-fit__opt.is-picked .gs-fit__optdot { border-color: var(--t); background: var(--t); box-shadow: 0 0 0 4px color-mix(in srgb, var(--t) 18%, transparent); }
.gs-fit__optlabel { flex: 1; font-size: .95rem; font-weight: 500; color: #1e293b; line-height: 1.4; }
.gs-fit__optarrow { flex: none; width: 1.1rem; height: 1.1rem; color: var(--t); opacity: 0; transform: translateX(-4px); transition: opacity .16s ease, transform .16s ease; }
.gs-fit__opt:hover .gs-fit__optarrow { opacity: 1; transform: translateX(0); }
.gs-fit__back { display: block; margin: 1.2rem auto 0; font-size: .82rem; font-weight: 600; color: #64748b; background: none; border: none; cursor: pointer; }
.gs-fit__back:hover { color: #4f46e5; }

/* result */
.gs-fit__result { max-width: 40rem; margin: 0 auto; text-align: center; }
.gs-fit__resulthead { position: relative; border-radius: 1.1rem; padding: 1.6rem 1.5rem; background: color-mix(in srgb, var(--t) 8%, #fff); border: 1px solid color-mix(in srgb, var(--t) 28%, transparent); }
.gs-fit__resulthead::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 4px; border-radius: 1.1rem 1.1rem 0 0; background: var(--t); }
.gs-fit__resulteyebrow { display: inline-block; font-size: .7rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--t); }
.gs-fit__resultname { font-size: 1.9rem; font-weight: 800; letter-spacing: -0.02em; color: #0f172a; margin-top: .25rem; }
.gs-fit__resultrole { font-size: .82rem; font-weight: 600; color: #64748b; margin-top: .2rem; }
.gs-fit__resultwhy { font-size: .98rem; color: #334155; line-height: 1.55; margin: .8rem auto 0; max-width: 30rem; }

.gs-fit__scores { display: flex; flex-direction: column; gap: .5rem; margin: 1.4rem auto; max-width: 24rem; }
.gs-fit__score { display: grid; grid-template-columns: 4.5rem 1fr; align-items: center; gap: .7rem; opacity: .55; }
.gs-fit__score.is-best { opacity: 1; }
.gs-fit__scorelabel { font-size: .8rem; font-weight: 700; color: #334155; text-align: right; }
.gs-fit__scoretrack { height: 8px; border-radius: 9999px; background: #eef0f7; overflow: hidden; }
.gs-fit__scoretrack span { display: block; height: 100%; border-radius: 9999px; background: var(--t); transition: width .5s cubic-bezier(.4,0,.2,1); }

.gs-fit__actions { display: flex; flex-direction: column; align-items: center; gap: .9rem; }
.gs-fit__cta { display: inline-flex; align-items: center; gap: .45rem; padding: .8rem 1.5rem; border: 0; cursor: pointer; border-radius: 9999px; background: var(--t); color: #fff; font-weight: 700; font-size: .95rem; text-decoration: none; box-shadow: 0 8px 20px color-mix(in srgb, var(--t) 35%, transparent); transition: transform .12s ease, box-shadow .18s ease; }
.gs-fit__cta:hover { transform: translateY(-2px); box-shadow: 0 14px 28px color-mix(in srgb, var(--t) 42%, transparent); text-decoration: none; color: #fff; }
.gs-fit__also { font-size: .85rem; color: #94a3b8; display: inline-flex; flex-wrap: wrap; align-items: center; gap: .55rem; justify-content: center; }
.gs-fit__also a { font-weight: 700; color: #4338ca; text-decoration: none; }
.gs-fit__also a:hover { color: #4f46e5; text-decoration: underline; }
.gs-fit__restart { display: block; margin: 1.3rem auto 0; font-size: .82rem; font-weight: 600; color: #94a3b8; background: none; border: none; cursor: pointer; }
.gs-fit__restart:hover { color: #4f46e5; }

/* transitions */
.fit-enter-active, .fit-leave-active { transition: opacity .26s ease, transform .26s cubic-bezier(.4,0,.2,1); }
.fit-enter-from { opacity: 0; transform: translateY(10px); }
.fit-leave-to { opacity: 0; transform: translateY(-8px); }
@media (prefers-reduced-motion: reduce) {
  .fit-enter-active, .fit-leave-active, .gs-fit__bar span, .gs-fit__scoretrack span { transition: none; }
}
</style>
