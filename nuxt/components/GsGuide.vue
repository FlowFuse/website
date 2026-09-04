<script setup lang="ts">
// Product-keyed getting-started guide. Tabs are the three product lanes
// (Edge / Hub / Fleet) — "choose your path" — and each panel is that product's
// step-by-step "path section" with tailored starting materials.
//
// The active product is shared via useState('gs-product') so the fit-finder
// above can drop the visitor straight onto the right tab ("you're Hub → start").
import site from '../../src/_data/site.json'
const capture = useCapture()

const APP = site.appURL

type Product = 'edge' | 'hub' | 'fleet'
const TONE: Record<Product, string> = { edge: '#DA3D0B', hub: '#4f46e5', fleet: '#35AAB0' }
const TINT: Record<Product, string> = { edge: '#ffe8e5', hub: '#eef2ff', fleet: '#e4fbfc' }

interface Step { t: string; b: string; cta?: { label: string; href: string; external?: boolean } }
interface Mat { label: string; href: string }
interface Lane { id: Product; name: string; who: string; lead: string; steps: Step[]; materials: Mat[] }

const lanes: Lane[] = [
  {
    id: 'edge', name: 'FlowFuse Edge', who: 'OT & digitalization teams',
    lead: 'Connect the machines on your plant floor and standardize automation across every site.',
    steps: [
      { t: 'Install the Device Agent', b: 'Install the Device Agent on your edge hardware — an industrial PC, a Raspberry Pi, whatever runs on the floor.', cta: { label: 'Device Agent quickstart', href: '/docs/device-agent/quickstart/', external: true } },
      { t: 'Register your device', b: 'It appears in your team as a remote instance, managed from the same place as everything else.' },
      { t: 'Connect your machines', b: 'Use OT-certified nodes — OPC-UA, Modbus, EtherNet/IP — to read PLCs and sensors, and build your edge app.' },
      { t: 'Standardize and roll out', b: 'Snapshot a working app and deploy it across every line and site.' },
    ],
    materials: [
      { label: 'Edge overview', href: '/product/edge/' },
      { label: 'Device Agent docs', href: '/docs/device-agent/' },
      { label: 'Blueprints', href: '/blueprints/' },
      { label: 'Talk to sales', href: '/book-demo/' },
    ],
  },
  {
    id: 'hub', name: 'FlowFuse Hub', who: 'Central IT & integration teams',
    lead: 'Move data between your business systems with governed, central integration.',
    steps: [
      { t: 'Create a Hub instance', b: 'In your FlowFuse team, spin up a cloud instance for your integration flows — or self-host on your own infrastructure.', cta: { label: 'Open FlowFuse', href: APP, external: true } },
      { t: 'Connect your systems', b: 'Add ERP, database, cloud API and message-queue nodes to move data between your business systems.' },
      { t: 'Build and deploy', b: 'Assemble the integration in the editor and deploy it — start from a Blueprint to go faster.' },
      { t: 'Govern it centrally', b: 'SSO, role-based access, audit and DevOps pipelines — one standard for the whole organisation.' },
    ],
    materials: [
      { label: 'Hub overview', href: '/product/hub/' },
      { label: 'Self-hosting guide', href: '/docs/install/' },
      { label: 'Blueprints', href: '/blueprints/' },
      { label: 'Talk to sales', href: '/book-demo/' },
    ],
  },
  {
    id: 'fleet', name: 'FlowFuse Fleet', who: 'OEMs & asset operators',
    lead: 'Manage and update a fleet of distributed devices from one place.',
    steps: [
      { t: 'Provision your devices', b: 'Install the Device Agent across the devices in your fleet.', cta: { label: 'Device Agent quickstart', href: '/docs/device-agent/quickstart/', external: true } },
      { t: 'Group devices into a fleet', b: 'Organise instances by application so a change targets exactly the right devices.' },
      { t: 'Deploy once, everywhere', b: 'Push flows and updates fleet-wide, and roll back safely when you need to.' },
      { t: 'Monitor the fleet', b: 'One live view across every device in the field — no truck rolls.' },
    ],
    materials: [
      { label: 'Fleet overview', href: '/product/fleet/' },
      { label: 'Device Agent docs', href: '/docs/device-agent/' },
      { label: 'Documentation', href: '/docs/' },
      { label: 'Talk to sales', href: '/book-demo/' },
    ],
  },
]

const product = useState<Product>('gs-product', () => 'edge')
const current = computed(() => lanes.find(l => l.id === product.value) ?? lanes[0])
function pick (id: Product) { product.value = id; capture('gs-product-tab', { product: id }) }
</script>

<template>
  <div class="gs-guide" :style="{ '--t': TONE[current.id], '--tint': TINT[current.id] }">
    <div class="gs-guide__choose">Choose your product</div>
    <div class="gs-guide__tabs" role="tablist" aria-label="Choose your product">
      <button
        v-for="l in lanes"
        :key="l.id"
        type="button"
        role="tab"
        :aria-selected="product === l.id"
        class="gs-guide__tab"
        :class="{ 'is-active': product === l.id }"
        :style="{ '--t': TONE[l.id] }"
        @click="pick(l.id)"
      >{{ l.name }}</button>
    </div>

    <div class="gs-guide__panel">
      <div class="gs-guide__who">{{ current.who }}</div>
      <p class="gs-guide__lead">{{ current.lead }}</p>

      <ol class="gs-guide__steps">
        <li v-for="(s, i) in current.steps" :key="s.t" class="gs-step">
          <span class="gs-step__num">{{ i + 1 }}</span>
          <div class="gs-step__body">
            <div class="gs-step__title">{{ s.t }}</div>
            <p class="gs-step__text">{{ s.b }}</p>
            <a
              v-if="s.cta"
              :href="s.cta.href"
              :target="s.cta.external ? '_blank' : undefined"
              :rel="s.cta.external ? 'noopener' : undefined"
              class="ff-btn ff-btn--primary gs-step__cta"
              @click="capture('gs-guide-cta', { product: current.id, step: i + 1 })"
            >{{ s.cta.label }}</a>
          </div>
        </li>
      </ol>

      <div class="gs-guide__mats">
        <span class="gs-guide__mats-label">Starting materials</span>
        <div class="gs-guide__mats-links">
          <a
            v-for="m in current.materials"
            :key="m.label"
            :href="m.href"
            :target="m.href.startsWith('/product/') ? undefined : '_blank'"
            :rel="m.href.startsWith('/product/') ? undefined : 'noopener'"
            class="gs-mat"
            @click="capture('gs-guide-material', { product: current.id, to: m.href })"
          >{{ m.label }} <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gs-guide { margin-top: 1.15rem; border: 1px solid #e5e7eb; border-top: 4px solid var(--t); border-radius: 1rem; overflow: hidden; background: #fff; }
.gs-guide__choose { padding: 1rem 1.4rem .3rem; font-size: .7rem; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; color: #9ca3af; }
.gs-guide__tabs { display: flex; flex-wrap: wrap; gap: .5rem; padding: .3rem 1.4rem 1rem; border-bottom: 1px solid #eef0f5; }
.gs-guide__tab { flex: 1 1 auto; min-width: 9rem; padding: .7rem 1rem; border-radius: .7rem; border: 1.5px solid #e5e7eb; background: #fff; color: #4b5563; font-weight: 700; font-size: .95rem; cursor: pointer; transition: background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease; }
.gs-guide__tab:hover { border-color: var(--t); color: #111827; }
.gs-guide__tab.is-active { background: var(--t); border-color: var(--t); color: #fff; box-shadow: 0 6px 16px color-mix(in srgb, var(--t) 30%, transparent); }
.gs-guide__panel { padding: 1.3rem 1.4rem 1.5rem; }
.gs-guide__who { display: inline-block; font-size: .66rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--t); background: var(--tint); border-radius: 9999px; padding: .28rem .6rem; }
.gs-guide__lead { font-size: 1.05rem; color: #374151; line-height: 1.5; margin: .7rem 0 0; font-weight: 500; }
.gs-guide__steps { list-style: none; margin: 1.3rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 1.1rem; }
.gs-step { display: flex; gap: .9rem; align-items: flex-start; }
.gs-step__num { flex: none; width: 1.9rem; height: 1.9rem; border-radius: 9999px; display: grid; place-items: center; font-weight: 800; font-size: .9rem; color: #fff; background: var(--t); box-shadow: 0 3px 8px color-mix(in srgb, var(--t) 32%, transparent); }
.gs-step__body { min-width: 0; }
.gs-step__title { font-size: 1.05rem; font-weight: 700; color: #111827; letter-spacing: -0.01em; }
.gs-step__text { font-size: .9rem; color: #4b5563; line-height: 1.55; margin: .25rem 0 0; font-weight: 300; }
.gs-step__cta { display: inline-flex; margin-top: .7rem; }
.gs-guide__mats { margin-top: 1.5rem; padding-top: 1.1rem; border-top: 1px solid #eef0f5; }
.gs-guide__mats-label { font-size: .66rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #9ca3af; }
.gs-guide__mats-links { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .7rem; }
.gs-mat { display: inline-flex; align-items: center; gap: .3rem; font-size: .82rem; font-weight: 600; color: #4338ca; background: #f5f6ff; border: 1px solid #e0e7ff; border-radius: 9999px; padding: .4rem .8rem; text-decoration: none; transition: border-color .15s ease, background .15s ease; }
.gs-mat:hover { border-color: #a5b4fc; background: #eef2ff; text-decoration: none; }
</style>
