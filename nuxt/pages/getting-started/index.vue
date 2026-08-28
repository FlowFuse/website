<script setup lang="ts">
definePageMeta({ layout: 'getting-started' })
useSeoMeta({
  title: 'Getting Started',
  description: 'Get building on FlowFuse fast. Find your product — Edge, Hub, or Fleet — and follow a step-by-step guide to your first industrial application, with a quick tour of how the platform works.',
  ogUrl: 'https://flowfuse.com/getting-started/',
  twitterSite: '@FlowFuseinc',
})
const capture = useCapture()

function jump (e: MouseEvent, slug: string) {
  const el = document.getElementById(slug)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${slug}`)
}

const whyDifferent = [
  { title: 'Open, Not a Black Box', body: 'Built on open-source Node-RED. You can see and change how everything works.' },
  { title: 'Yours to Own', body: 'Run it on your infrastructure or ours. Your flows are portable — no lock-in.' },
  { title: 'The Layer Above Your Data', body: 'It sits on top of the brokers, historians and machines you already run.' },
]

const corePieces = [
  { title: 'Instances', body: 'Your Node-RED runtimes — in the cloud, on your server, or on edge hardware. Same platform, wherever they live.' },
  { title: 'Team Broker', body: 'A shared message bus — your Unified Namespace — that ties data together across lines, sites and systems.' },
  { title: 'Tables', body: 'One shared operational database, built in. No separate service to stand up.' },
  { title: 'Dashboards', body: 'Operator-facing screens for the people who actually run the line.' },
  { title: 'Device & Fleet Management', body: 'Deploy, update and roll back across many devices, lines and plants from one place.' },
  { title: 'Governance & Security', body: 'SSO, role-based access and audit built in — the enterprise controls IT expects.' },
]

const teams = [
  { key: 'ot', badge: 'FlowFuse Edge · OT', name: 'Run the Plant Floor', who: 'OT & digitalization teams', builds: ['Connect PLCs, machines & controllers', 'Standardize automation across every site', 'Run apps right at the edge'], value: 'One way to automate — every plant.' },
  { key: 'it', badge: 'FlowFuse Hub · IT', name: 'Move Data Across the Business', who: 'Central IT & enterprise architects', builds: ['Integrate ERPs, databases & cloud APIs', 'Govern centrally, not app by app', 'Serve the whole organisation'], value: 'One governed integration layer.' },
  { key: 'fleet', badge: 'FlowFuse Fleet', name: 'Manage a Fleet of Devices', who: 'OEMs, partners & asset operators', builds: ['Ship & roll back flows remotely', 'Update thousands of devices at once', 'One live view across the field'], value: 'Update the fleet without a truck roll.' },
]

const values = [
  { icon: 'bolt', grad: 'linear-gradient(135deg,#6366f1,#4338ca)', title: 'Speed to Value', body: 'First app running in days, not a multi-year project. Reuse building blocks and ship changes through pipelines.' },
  { icon: 'layers', grad: 'linear-gradient(135deg,#50C3C9,#35AAB0)', title: 'One Platform, Every Team', body: 'OT, IT and field teams build on the same governed foundation — no silos, one standard.' },
  { icon: 'lock', grad: 'linear-gradient(135deg,#FF6E4A,#DA3D0B)', title: 'Own It, No Lock-In', body: 'Open and built on Node-RED. Run it on your infrastructure or ours, and take your work with you.' },
  { icon: 'scale', grad: 'linear-gradient(135deg,#818cf8,#4338ca)', title: 'Scales Without Breaking', body: 'From one line to thousands of sites and devices — the same pieces, centrally managed.' },
]

const workedPieces = [
  { title: 'Edge Block', body: 'Reads machine signals at the edge and publishes state. Built once, rolled out to every line.' },
  { title: 'Team Broker', body: 'Carries machine state from edge to cloud. The edge publishes; the cloud app subscribes.' },
  { title: 'Data-Driven App', body: 'Computes availability, performance and quality, and shows the OEE dashboard.' },
  { title: 'Time-Series DB', body: 'Every reading is written so trends can be charted over time.' },
]

const storiesTeam = [
  { slug: 'scaling-industrial-iot-operations-while-maintaining-competitive-edge', name: 'Walter', note: 'Connected machines and scaled operations without adding IT overhead.', image: '/images/stories/walter.png' },
  { slug: 'energinet-streamlining-critical-infrastructure-data-management', name: 'Energinet', note: "Governs real-time data across 7,000 km of Denmark's power grid.", image: '/images/stories/energinet.jpg' },
]
const storiesPayoff = [
  { slug: 'scaling-manufacturing-automation-with-flowfuse', name: 'Arch Systems', note: 'Automated 100+ databases and scaled real-time manufacturing data.', image: '/images/stories/arch_systems.jpeg' },
  { slug: 'manufacturing-digital-transformation', name: 'Large US Manufacturer', note: 'Deployed thousands of instances across the enterprise.', image: '/images/stories/large-us-manufacturing.jpg' },
]
const storiesAction = [
  { slug: 'leveraging-node-red-and-flowfuse-to-automate-precision-manufacturing', name: 'Abrasive Technology', note: 'Automated precision manufacturing and streamlined machine communication.', image: '/images/stories/abrasive_tech.jpg' },
  { slug: 'opto22-embraces-node-red', name: 'Opto 22', note: 'Brought flow-based automation into their hardware platform.', image: '/images/stories/opto22.jpg' },
]
</script>

<template>
  <div class="gs-page">
    <!-- ===================== HERO ===================== -->
    <div class="gs-hero">
      <span class="gs-pill">Getting Started</span>
      <h1 class="gs-hero__title">Get Started with FlowFuse — <span class="text-indigo-600">Fast</span></h1>
      <p class="gs-hero__lead">Find the product that fits how you work, then follow a step-by-step guide to your first application. New to FlowFuse? There's a quick tour of how it all works further down.</p>
      <div class="mt-7 flex flex-wrap items-center gap-3">
        <a class="ff-btn ff-btn--primary" href="#find-your-product" @click="jump($event, 'find-your-product')">Find your product</a>
        <a class="ff-btn ff-btn--primary-outlined" href="#get-started" @click="jump($event, 'get-started')">I know my product</a>
      </div>
    </div>

    <!-- ===================== 01 FIND YOUR PRODUCT ===================== -->
    <section id="find-your-product" class="gs-section gs-sec--all">
      <div class="gs-section__head">
        <span class="gs-section__step gs-step--all">01</span>
        <div class="gs-section__intro">
          <span class="gs-persona-chip gs-persona-chip--all">Start here</span>
          <h2 class="gs-section__title">Find Your Product</h2>
          <p class="gs-section__lead">FlowFuse comes in three products for three jobs. Answer four quick questions and we'll point you to the right one — then take you straight to its get-started guide. Already know? Skip ahead and pick it below.</p>
        </div>
        <GsSectionShare slug="find-your-product" />
      </div>
      <GsFit :show-header="false" />
    </section>

    <div class="gs-divider" aria-hidden="true"></div>

    <!-- ===================== 02 GET STARTED (product guide) ===================== -->
    <section id="get-started" class="gs-section gs-sec--it">
      <div class="gs-section__head">
        <span class="gs-section__step gs-step--it">02</span>
        <div class="gs-section__intro">
          <span class="gs-persona-chip gs-persona-chip--it">Edge · Hub · Fleet</span>
          <h2 class="gs-section__title">Get Started</h2>
          <p class="gs-section__lead">Pick your product and follow the steps to your first running application. Each guide points to the exact starting materials for that path.</p>
        </div>
        <GsSectionShare slug="get-started" />
      </div>
      <GsGuide />
    </section>

    <!-- ===================== NEW TO FLOWFUSE: understand ===================== -->
    <div class="gs-divider" aria-hidden="true"></div>
    <div class="gs-part">
      <div class="gs-part__eyebrow">New to FlowFuse?</div>
      <h2 class="gs-part__title">How It All Works</h2>
      <p class="gs-part__lead">A five-minute tour of what FlowFuse is and how the pieces fit together — handy before you build, and here whenever you want it.</p>
    </div>

    <!-- ===================== 03 WHAT FLOWFUSE IS ===================== -->
    <section id="what-flowfuse-is" class="gs-section gs-sec--it">
      <div class="gs-section__head">
        <span class="gs-section__step gs-step--it">03</span>
        <div class="gs-section__intro">
          <span class="gs-persona-chip gs-persona-chip--it">The Big Idea</span>
          <h2 class="gs-section__title">What FlowFuse Is</h2>
          <p class="gs-section__lead">FlowFuse is the industrial application platform — the place you build the applications that actually run your operation. It sits on top of the data and machines you already have, and unlike a closed product, it's open and yours to own.</p>
        </div>
        <GsSectionShare slug="what-flowfuse-is" />
      </div>

      <div class="gs-stack">
        <div class="gs-stack__layer">
          <div class="gs-stack__label">What You Build</div>
          <div class="gs-stack__title">Your Applications<small>OEE, dashboards, integrations, alerts, MES-style apps</small></div>
        </div>
        <div class="gs-stack__arrow" aria-hidden="true">&uarr; runs on</div>
        <div class="gs-stack__layer gs-stack__layer--you">
          <span class="gs-stack__own">You Own This</span>
          <div class="gs-stack__label">The Platform</div>
          <div class="gs-stack__title">FlowFuse<small>build · deploy · govern — on managed Node-RED</small></div>
        </div>
        <div class="gs-stack__arrow" aria-hidden="true">&uarr; sits on</div>
        <div class="gs-stack__layer">
          <div class="gs-stack__label">What You Already Have</div>
          <div class="gs-stack__title">Your Data &amp; Machines<small>PLCs, sensors, brokers, historians, ERPs</small></div>
        </div>
      </div>

      <h3 class="gs-h3">Why That's Different</h3>
      <div class="gs-cards">
        <div v-for="w in whyDifferent" :key="w.title" class="gs-cardp">
          <div class="gs-cardp__title">{{ w.title }}</div>
          <div class="gs-cardp__body">{{ w.body }}</div>
        </div>
      </div>

      <GsGoDeeper :links="[{ slug: 'foundations', title: 'Foundations' }]" />
    </section>

    <div class="gs-divider" aria-hidden="true"></div>

    <!-- ===================== 04 BUILDING BLOCKS ===================== -->
    <section id="building-blocks" class="gs-section gs-sec--it">
      <div class="gs-section__head">
        <span class="gs-section__step gs-step--it">04</span>
        <div class="gs-section__intro">
          <span class="gs-persona-chip gs-persona-chip--it">The Building Blocks</span>
          <h2 class="gs-section__title">The Pieces You Build With</h2>
          <p class="gs-section__lead">Every FlowFuse application — however big — is assembled from the same six pieces. Learn these and you understand the whole platform.</p>
        </div>
        <GsSectionShare slug="building-blocks" />
      </div>

      <div class="gs-diagram" role="img" aria-label="FlowFuse platform: services bridge through the Device Agent to remote instances on edge hardware.">
        <div class="gs-lane gs-lane--it">
          <div class="gs-lane__label">The Platform — Runs and Connects Everything</div>
          <div class="gs-nodes">
            <div class="gs-node gs-node--it"><b>Instances</b><small>cloud or edge</small></div>
            <div class="gs-node gs-node--it"><b>Dashboards</b><small>live operator UI</small></div>
            <div class="gs-node gs-node--broker"><b>Team Broker</b><small>your UNS</small></div>
            <div class="gs-node gs-node--it"><b>Tables</b><small>shared database</small></div>
          </div>
        </div>
        <GsFlow tone="indigo" label="Device Agent — bridges the platform to the edge" />
        <div class="gs-lane gs-lane--edge">
          <div class="gs-lane__label">Your Machines &amp; Data</div>
          <div class="gs-nodes">
            <div class="gs-node gs-node--muted"><b>PLCs</b><small>controllers</small></div>
            <div class="gs-node gs-node--muted"><b>Sensors</b><small>signals</small></div>
            <div class="gs-node gs-node--muted"><b>Historians</b><small>time-series</small></div>
            <div class="gs-node gs-node--muted"><b>ERPs / APIs</b><small>business systems</small></div>
          </div>
        </div>
      </div>

      <h3 class="gs-h3">The Six Pieces</h3>
      <div class="gs-cards">
        <div v-for="c in corePieces" :key="c.title" class="gs-cardp">
          <div class="gs-cardp__title">{{ c.title }}</div>
          <div class="gs-cardp__body">{{ c.body }}</div>
        </div>
      </div>

      <GsGoDeeper :links="[{ slug: 'foundations', title: 'Foundations' }, { slug: 'data-plane', title: 'Data Plane' }]" />
    </section>

    <div class="gs-divider" aria-hidden="true"></div>

    <!-- ===================== 05 FITS EVERY TEAM ===================== -->
    <section id="fits-your-team" class="gs-section gs-sec--all">
      <div class="gs-section__head">
        <span class="gs-section__step gs-step--all">05</span>
        <div class="gs-section__intro">
          <span class="gs-persona-chip gs-persona-chip--all">OT · IT · Fleet</span>
          <h2 class="gs-section__title">It Fits Every Team</h2>
          <p class="gs-section__lead">The plant floor, the business systems, and the devices in the field are different worlds — but the same platform and the same building blocks serve all three. That's how one company standardizes on FlowFuse instead of a tool per team.</p>
        </div>
        <GsSectionShare slug="fits-your-team" />
      </div>

      <div class="gs-tri">
        <div v-for="t in teams" :key="t.key" class="gs-tri__col" :class="`gs-tri__col--${t.key}`">
          <span class="gs-tri__badge">{{ t.badge }}</span>
          <div class="gs-tri__name">{{ t.name }}</div>
          <div class="gs-tri__who">{{ t.who }}</div>
          <ul class="gs-tri__list">
            <li v-for="b in t.builds" :key="b">{{ b }}</li>
          </ul>
          <div class="gs-tri__value">{{ t.value }}</div>
        </div>
      </div>

      <GsStories :items="storiesTeam" />

      <GsGoDeeper :links="[{ slug: 'hardware-apps', title: 'Hardware Apps' }, { slug: 'software-apps', title: 'Software Apps' }, { slug: 'ot-architectures', title: 'OT Architectures' }, { slug: 'it-architectures', title: 'IT Architectures' }, { slug: 'iiot-architectures', title: 'IIoT Architectures' }]" />
    </section>

    <div class="gs-divider" aria-hidden="true"></div>

    <!-- ===================== 06 WHY IT PAYS OFF ===================== -->
    <section id="build-and-own" class="gs-section gs-sec--it">
      <div class="gs-section__head">
        <span class="gs-section__step gs-step--it">06</span>
        <div class="gs-section__intro">
          <span class="gs-persona-chip gs-persona-chip--it">The Payoff</span>
          <h2 class="gs-section__title">Why It Pays Off</h2>
          <p class="gs-section__lead">Anyone can connect a PLC to a dashboard once. The reason teams standardize on FlowFuse is what happens next — shipping fast, governing centrally, scaling everywhere, and never getting locked in.</p>
        </div>
        <GsSectionShare slug="build-and-own" />
      </div>

      <div class="gs-values">
        <div v-for="v in values" :key="v.title" class="gs-value">
          <span class="gs-value__ic" :style="{ background: v.grad }" aria-hidden="true">
            <svg v-if="v.icon === 'bolt'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3L5 13h6l-1 8 7-11h-6l1-7z" stroke-linejoin="round"/></svg>
            <svg v-else-if="v.icon === 'layers'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke-linejoin="round"/><path d="M3 12l9 5 9-5M3 16.5l9 5 9-5" stroke-linejoin="round"/></svg>
            <svg v-else-if="v.icon === 'lock'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="5" y="10.5" width="14" height="9" rx="1.6"/><path d="M8 10.5V7a4 4 0 017.5-1.9" stroke-linecap="round"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <div class="gs-value__title">{{ v.title }}</div>
          <div class="gs-value__body">{{ v.body }}</div>
        </div>
      </div>

      <GsStories :items="storiesPayoff" />

      <GsGoDeeper :links="[{ slug: 'app-delivery-methods', title: 'App Delivery Methods' }, { slug: 'architectures', title: 'Architectures' }]" />
    </section>

    <div class="gs-divider" aria-hidden="true"></div>

    <!-- ===================== 07 SEE IT IN ACTION ===================== -->
    <section id="in-action" class="gs-section gs-sec--fleet">
      <div class="gs-section__head">
        <span class="gs-section__step gs-step--fleet">07</span>
        <div class="gs-section__intro">
          <span class="gs-persona-chip gs-persona-chip--fleet">End to End</span>
          <h2 class="gs-section__title">See It in Action</h2>
          <p class="gs-section__lead">Here's every piece working together in one real application: OEE — how much good product a line makes versus its potential — from the machine at the edge to a live dashboard in the cloud.</p>
        </div>
        <GsSectionShare slug="in-action" />
      </div>

      <div class="gs-diagram">
        <div class="gs-lane gs-lane--ot">
          <div class="gs-lane__label">At the Edge — Built Once, Rolled Out per Line</div>
          <div class="gs-nodes"><div class="gs-node gs-node--ot"><b>Line A</b><small>Edge block</small></div><div class="gs-node gs-node--ot"><b>Line B</b><small>Edge block</small></div><div class="gs-node gs-node--ot"><b>Line C</b><small>Edge block</small></div></div>
        </div>
        <GsFlow tone="ot" label="Publish machine state over MQTT / UNS" />
        <div class="gs-lane gs-lane--broker">
          <div class="gs-lane__label">Team Broker</div>
          <div class="gs-nodes"><div class="gs-node gs-node--broker"><b>Machine State</b><small>edge &rarr; cloud</small></div></div>
        </div>
        <GsFlow tone="broker" label="Subscribe · Write History" />
        <div class="gs-lane gs-lane--it">
          <div class="gs-lane__label">In the Cloud</div>
          <div class="gs-nodes"><div class="gs-node gs-node--it"><b>Data-Driven App</b><small>computes + shows OEE</small></div><div class="gs-node gs-node--it"><b>Time-Series DB</b><small>history &amp; trends</small></div></div>
        </div>
      </div>

      <div class="gs-cards">
        <div v-for="p in workedPieces" :key="p.title" class="gs-cardp">
          <div class="gs-cardp__title">{{ p.title }}</div>
          <div class="gs-cardp__body">{{ p.body }}</div>
        </div>
      </div>
      <p class="gs-p">Four pieces, two connections — and you can see how the same pattern powers everything from energy monitoring to full MES.</p>

      <GsStories :items="storiesAction" />

      <GsGoDeeper :links="[{ slug: 'worked-example', title: 'Worked Example' }]" />
    </section>

    <!-- ===================== CTA ===================== -->
    <div id="ready-cta" class="gs-cta">
      <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-6 text-center ff-get-started-bg">
        <p class="text-white text-3xl sm:text-4xl font-medium m-0 max-w-2xl">Ready to build? Open FlowFuse and get going.</p>
        <p class="text-indigo-50 font-light text-lg max-w-2xl m-0">Jump into the platform and start your first application, or bring a use case and we'll walk it through with you.</p>
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <CtaSignIn variant="highlight" position="getting-started-final" />
          <CtaBookDemo variant="ghost" color="white" position="getting-started-final" />
        </div>
      </div>
    </div>
  </div>
</template>
