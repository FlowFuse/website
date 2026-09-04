<script setup lang="ts">
// /platform/hmi/ - the operator-screen page, sibling to /platform/dashboard/.
//
// Why a separate page from /platform/dashboard/: that page sells Dashboard as a
// visualisation tool to a Node-RED audience. This one answers a different buyer's
// question - "can this replace the panel on my machine?" - which is about where the
// screen runs, how it reaches the PLC, and how one design gets onto every station,
// not about widgets. /use-cases/scada/ is the supervisory layer above this; the two
// link to each other rather than repeating each other.
//
// Claim discipline, same rule as /ai/: everything in CAPABILITIES and HOW_IT_WORKS
// ships today. The unreleased work (Tags and Canvas) is quarantined in its own
// section that says so in the copy, and its wording is taken verbatim in substance
// from /dashboard/tags-and-canvas-feedback/, which is the approved public phrasing.
// Do not promote anything out of that section without product sign-off.
useSeoMeta({
    // No ' | FlowFuse' suffix here: nuxt.config.ts's titleTemplate already appends
    // '• FlowFuse', and spelling it out again gave 'HMI Software ... | FlowFuse • FlowFuse'.
    title: 'HMI Software for Industrial Machines',
    description: 'Build operator screens in Node-RED and run them on the panel at the machine. One design, deployed to every station, with the PLC connectivity, access control and rollback of a managed platform.',
    ogUrl: 'https://flowfuse.com/platform/hmi/',
    twitterSite: '@FlowFuseinc',
})

const capture = useCapture()

const LINK = 'text-indigo-600 hover:text-indigo-800 underline'

const FAQ = [
    {
        question: 'What is an HMI?',
        answer: 'An HMI, or human machine interface, is the screen an operator uses to run a machine or a line. It shows the current state of the process and lets the operator start, stop, adjust and acknowledge alarms. It is usually a panel mounted on or next to the equipment.',
    },
    {
        question: 'Can FlowFuse replace a traditional HMI?',
        answer: 'For many machines, yes. You build the operator screen with FlowFuse Dashboard, connect it to the PLC with certified Modbus, EtherNet/IP, OPC UA or MQTT nodes, and run it on a panel PC or industrial gateway with the FlowFuse Device Agent. Where an HMI is part of a safety function or is certified with the machine, it stays where it is and FlowFuse runs alongside it.',
    },
    {
        question: 'Does the screen keep working if the network goes down?',
        answer: 'Yes. The remote instance runs Node-RED on the panel itself and serves the screen locally, so the operator keeps working while the connection to the platform is out. The platform is how you build, deploy and monitor, not something the running screen depends on.',
    },
    {
        question: 'What hardware does it run on?',
        answer: 'Any device that runs the FlowFuse Device Agent, which covers industrial PCs, panel PCs, gateways and single board computers on Linux, Windows and macOS. There is no dedicated HMI hardware to buy and no licence tied to a specific panel.',
    },
    {
        question: 'How do I get the same screen onto every station?',
        answer: 'You build it once, take a snapshot, and deploy that snapshot to a device group. Every remote instance in the group runs the same version. To change all of them you deploy a new snapshot, and to undo it you deploy the previous one.',
    },
    {
        question: 'Is FlowFuse an HMI or a SCADA system?',
        answer: 'It can be both, and the difference is where the screen sits. An HMI runs at the machine and controls one piece of equipment. SCADA supervises many machines and sites from a control room. FlowFuse runs the same flows and the same dashboards in both places, so the operator screen and the supervisory view are built with one toolset.',
    },
]

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: item.answer })),
])

// The panel photo's screen rectangle is measured off the source rather than
// eyeballed: in the 2816x1300 hero crop the bezel-to-glass brightness step sits at
// x 739..2075 and y 348..1073. It lives as percentages in .ff-hmi-panel__screen so
// the projected dashboard stays registered to the glass at any width, and re-cropping
// the photo means re-measuring it. Note the CSS is built once at container start by
// prod:postcss-nuxt, so an edit to style.css needs that script re-run to show up.
const PANEL_ALT = 'An industrial panel HMI mounted on a filling machine, its screen showing a FlowFuse Dashboard with OEE, performance, availability and quality gauges, a downtime summary and a production chart.'

const PROBLEMS = [
    {
        icon: 'i-lucide-lock-keyhole',
        title: 'The screen belongs to the vendor',
        description: 'Changing a label or adding a value means the vendor\'s engineering software, a licence for it, and usually the one person who has it installed. A small change waits for that person.',
    },
    {
        icon: 'i-lucide-hard-drive',
        title: 'The design lives on the panel',
        description: 'The screen exists on the hardware and nowhere else. There is no history, no diff, and no way back to last week\'s version if the change was wrong.',
    },
    {
        icon: 'i-lucide-copy',
        title: 'Every station is its own project',
        description: 'A body shop can run dozens of operator stations. When each one is a separate file, one design change becomes dozens of edits, and they drift apart between visits.',
    },
    {
        icon: 'i-lucide-unplug',
        title: 'The data stops at the panel',
        description: 'Values that drive the screen stay inside the HMI runtime. Anything that wants them for reporting or a shared namespace has to collect them a second time.',
    },
]

const CAPABILITIES = [
    {
        icon: 'i-lucide-layout-dashboard',
        title: 'The screen itself',
        description: `Build the operator view with <a href="/platform/dashboard/" class="${LINK}">FlowFuse Dashboard</a>: gauges, charts, tables, buttons, forms and text, laid out by dragging nodes rather than writing markup. Theme presets, including a dark theme built for a screen on a shop floor, ship in the box, so a screen looks finished without a stylesheet.`,
    },
    {
        icon: 'i-lucide-cpu',
        title: 'Runs at the machine',
        description: `The <a href="/platform/device-agent/" class="${LINK}">FlowFuse Device Agent</a> turns a panel PC, industrial PC or gateway into a remote instance. Node-RED and the screen run on that hardware, so the operator keeps working when the network to the platform is down.`,
    },
    {
        icon: 'i-lucide-plug',
        title: 'Talks to the PLC',
        description: `Certified nodes for <a href="/node-red/flowfuse/edge/modbus/" class="${LINK}">Modbus</a> TCP, UDP and serial, <a href="/node-red/flowfuse/edge/cip-suite/" class="${LINK}">EtherNet/IP</a> for Allen-Bradley ControlLogix, CompactLogix, Micro800, MicroLogix, SLC500 and PLC-5, <a href="/node-red/flowfuse/edge/opcua/" class="${LINK}">OPC UA</a> and <a href="/node-red/flowfuse/mqtt/" class="${LINK}">MQTT</a>. Maintained and security-scanned by FlowFuse, not pinned to whatever a forum thread recommended.`,
    },
    {
        icon: 'i-lucide-layers',
        title: 'One design, every station',
        description: 'Build the screen once, snapshot it, and deploy that snapshot to a device group. Every station in the group runs the same version. A change is one edit and one deploy, not one edit per panel.',
    },
    {
        icon: 'i-lucide-shield-check',
        title: 'Who may change what',
        description: `Single sign-on and role-based access decide who can open a screen, who can edit the flows behind it, and who can deploy. Every action is attributed in the audit log, which is the same control plane described in the <a href="/platform/security/" class="${LINK}">security statement</a>.`,
    },
    {
        icon: 'i-lucide-rotate-ccw',
        title: 'Change it, and undo it',
        description: `Every deploy is a snapshot you can return to, on one station or across a group. Promote a screen from a test cell to the line with a <a href="/docs/user/devops-pipelines/" class="${LINK}">DevOps pipeline</a> instead of copying files onto the panel by hand.`,
    },
]

const HOW_IT_WORKS = [
    {
        step: '01',
        title: 'Connect the machine',
        description: 'Drag in the certified node for your controller, point it at the PLC, and the values are in the flow. The same instance can read several controllers and protocols at once.',
    },
    {
        step: '02',
        title: 'Build the screen',
        description: 'Lay out the operator view in FlowFuse Dashboard and wire each widget to the values you just connected. You see the result in the browser as you build it.',
    },
    {
        step: '03',
        title: 'Put it on the panel',
        description: 'Install the Device Agent on the panel PC at the machine and assign the instance to it. The screen now runs on that hardware and stays up without the network.',
    },
    {
        step: '04',
        title: 'Roll it out',
        description: 'Snapshot the working screen and deploy it to the device group covering the rest of the stations. They all move to the same version at once.',
    },
]

// Wording follows /dashboard/tags-and-canvas-feedback/, which is the approved public
// description of both. Neither has shipped. Keep "has not shipped" in the copy, not
// only in this comment.
const COMING = [
    {
        icon: 'i-lucide-tags',
        title: 'Tags',
        description: 'Live state held server-side, so a screen shows real values the moment it opens instead of waiting for the next message to arrive. An operator walking up to a panel, or a browser waking from sleep, sees the process rather than blanks.',
    },
    {
        icon: 'i-lucide-pen-tool',
        title: 'Canvas',
        description: 'A new page type you draw on, so the screen can look like your actual process instead of a grid of widgets. Shapes bound to values with colour rules, standard industrial symbols to drop on, and a station block you draw once and reuse per station.',
    },
]

const RELATED = [
    {
        href: '/use-cases/scada/',
        title: 'SCADA',
        description: 'The supervisory layer above the panel: many machines and sites, watched and controlled from one place.',
    },
    {
        href: '/use-cases/production-monitoring/',
        title: 'Production monitoring',
        description: 'Turn the same machine data into OEE, downtime reasons and line performance for the people who do not stand at the panel.',
    },
    {
        href: '/use-cases/uns/',
        title: 'Unified namespace',
        description: 'Publish what the screen already reads, once, so every other system takes it from one place instead of polling the PLC again.',
    },
]

const READING = [
    {
        href: '/blog/2025/11/building-hmi-for-equipment-control/',
        title: 'Building a web HMI for factory equipment control',
        description: 'A worked build: connect a PLC, then put start, stop and a colour-coded status display in front of an operator.',
    },
    {
        href: '/blog/2025/04/build-manufacturing-oee-dashboard/',
        title: 'Build a manufacturing OEE dashboard',
        description: 'The screen shown on the panel above, built step by step from machine data.',
    },
    {
        href: '/blueprints/',
        title: 'Blueprint library',
        description: 'Working starting points you can import into an instance and adapt, rather than starting from an empty flow.',
    },
]
</script>

<template>
  <div class="w-full">
    <!-- HERO: headline, then the photograph full bleed, then the calls to action.
         A panel on a machine with a FlowFuse Dashboard on its glass says "this
         replaces that" faster than any sentence can, so the photograph gets the full
         width of the page rather than sitting in a container as an illustration.

         The headline is above it rather than below because the photograph is shown
         whole at its own aspect ratio, which on a wide monitor is tall: with the
         image first, the fold was entirely photograph and the h1 was off screen.

         The image is never cropped or clipped, at any width. See .ff-hmi-hero.

         The projection is CSS, not a flattened composite: the dashboard is a real
         screenshot in a percentage-positioned box over the photo. It stays sharp at
         any width, and the screen contents can be swapped without re-compositing.

         All three files live in nuxt/public/images/, not src/images/, which is where
         a Nuxt page's own assets belong (see nuxt/public/images/ai/). Vite resolves a
         literal src="/images/..." against publicDir at compile time: present, and it
         passes through; absent, and it silently rewrites to a broken /_nuxt/@fs/ URL
         that only shows up as a 404 in dev. The dashboard is a copy of
         src/images/solutions/oee-dashboard--1.png rather than a reference to it, so
         the solutions pages can change theirs without changing what is on this panel. -->
    <section class="w-full px-6 pt-12 md:pt-16 pb-8 sm:pb-10">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="font-medium home m-auto text-gray-900 mb-6 max-w-3xl">
          <span class="text-indigo-600">HMI screens</span> your own engineers can build
        </h1>
        <p class="text-xl md:text-2xl font-medium text-gray-800 max-w-2xl mx-auto mb-6">
          Built in Node-RED. Running on the panel at the machine.
        </p>
        <p class="max-w-3xl mx-auto text-gray-600 mb-0">
          One screen design, deployed to every station on the floor, connected to the PLC you already have. Changed the same day, by the people who run the line.
        </p>
      </div>
    </section>

    <section class="ff-hmi-hero">
      <div class="ff-hmi-panel">
        <picture>
          <source srcset="/images/platform/hmi/hmi-panel.webp" type="image/webp">
          <img
            src="/images/platform/hmi/hmi-panel.jpg"
            :alt="PANEL_ALT"
            width="2560"
            height="1396"
            fetchpriority="high"
            class="ff-hmi-panel__photo"
          >
        </picture>
        <div class="ff-hmi-panel__screen">
          <img
            src="/images/platform/hmi/oee-dashboard.png"
            alt=""
            width="3014"
            height="1572"
            aria-hidden="true"
            class="ff-hmi-panel__ui"
          >
          <span class="ff-hmi-panel__glare" aria-hidden="true" />
        </div>
      </div>
    </section>

    <!-- Caption and calls to action under the photograph, as one block: the caption
         names what is on the glass, the buttons act on it. -->
    <section class="w-full px-6 pt-6 sm:pt-8 pb-0">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-sm text-gray-500 m-0">
          A FlowFuse Dashboard running on a panel at the machine, on hardware the plant already owns.
        </p>
        <div class="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CtaContactUs variant="primary" position="hero" />
          <CtaSignUp variant="primary-outlined" position="hero" />
        </div>
      </div>
    </section>

    <!-- PROBLEM: named before the capability list, because the capabilities only
         read as answers if the reader has the question in mind. Four failures, all
         of them things a controls engineer has actually waited on. -->
    <section class="w-full px-6 pt-12 sm:pt-16 pb-0">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="max-md:text-center">What the panel on the machine <span class="text-indigo-600">costs you</span></h2>
        <p class="mt-3 text-gray-600 max-w-3xl">
          Traditional HMI software was priced and built for one screen on one machine. That shape is what makes a small change slow and a fleet-wide change expensive.
        </p>
        <ul class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <li
            v-for="item in PROBLEMS"
            :key="item.title"
            class="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-6"
          >
            <UIcon :name="item.icon" class="size-6 flex-none text-gray-400" aria-hidden="true" />
            <span class="min-w-0">
              <span class="block text-lg font-medium text-gray-900">{{ item.title }}</span>
              <span class="mt-2 block text-gray-600 font-light">{{ item.description }}</span>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- CAPABILITIES: everything here ships today. See the claim-discipline note in
         the script block before adding to this list. -->
    <section class="w-full px-6 pt-12 sm:pt-16 pb-0">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="max-md:text-center">What you <span class="text-indigo-600">build with today</span></h2>
        <p class="mt-3 text-gray-600 max-w-3xl">
          An operator screen needs more than a chart library. It has to reach the controller, survive a dropped network, land on every station, and be safe to change. All of this is available now.
        </p>
        <ul class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <li
            v-for="item in CAPABILITIES"
            :key="item.title"
            class="rounded-lg border border-indigo-100 bg-indigo-50/40 p-6 transition duration-300 ease-in-out hover:bg-indigo-50"
          >
            <UIcon :name="item.icon" class="size-6 text-indigo-600" aria-hidden="true" />
            <p class="mt-4 mb-0 text-lg font-medium text-gray-900">{{ item.title }}</p>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="mt-2 mb-0 text-gray-600 font-light" v-html="item.description" />
          </li>
        </ul>
      </div>
    </section>

    <!-- HOW IT WORKS: the same four steps a reader would have to guess at otherwise,
         in the order they happen, so the capability list above resolves into a path. -->
    <section class="w-full px-6 pt-12 sm:pt-16 pb-0">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="max-md:text-center">From <span class="text-indigo-600">PLC to panel</span></h2>
        <ol class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <li
            v-for="item in HOW_IT_WORKS"
            :key="item.step"
            class="rounded-lg border border-gray-200 bg-white p-6"
          >
            <span class="block text-sm font-semibold tracking-widest text-indigo-600">{{ item.step }}</span>
            <p class="mt-3 mb-0 text-lg font-medium text-gray-900">{{ item.title }}</p>
            <p class="mt-2 mb-0 text-gray-600 font-light">{{ item.description }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ROADMAP: fenced off on purpose. Everything above ships; these two do not,
         and the section says so in its own copy rather than relying on a heading.
         The CTA is the feedback form, not a sign-up, because the ask here is input. -->
    <section class="w-full px-6 py-12 sm:py-16">
      <div class="md:max-w-screen-lg m-auto ff-blue-card pt-12 pb-12 px-6 md:px-10">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-widest text-indigo-600 m-0">In design</p>
          <h2 class="mt-3">Drawing the screen, <span class="text-indigo-600">not assembling it</span></h2>
          <p class="mt-3 text-gray-600">
            A widget grid is the wrong shape for an operator screen that should look like the machine in front of it. Two additions to FlowFuse Dashboard are being designed to close that gap. Neither has shipped yet, which is why they are listed here separately from everything above.
          </p>
        </div>
        <ul class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <li
            v-for="item in COMING"
            :key="item.title"
            class="rounded-lg border border-indigo-200 bg-white p-6"
          >
            <UIcon :name="item.icon" class="size-6 text-indigo-600" aria-hidden="true" />
            <p class="mt-4 mb-0 text-lg font-medium text-gray-900">{{ item.title }}</p>
            <p class="mt-2 mb-0 text-gray-600 font-light">{{ item.description }}</p>
          </li>
        </ul>
        <a
          href="/dashboard/tags-and-canvas-feedback/"
          class="ff-doc-note mt-8 flex items-start gap-4 rounded-lg border border-indigo-200 bg-white p-5 no-underline transition duration-300 ease-in-out hover:bg-indigo-50 hover:no-underline"
          @click="capture('cta-contact-us', { position: 'hmi-roadmap' })"
        >
          <UIcon name="i-lucide-message-square-plus" class="size-6 flex-none text-indigo-600" aria-hidden="true" />
          <span class="min-w-0">
            <span class="block text-sm text-gray-600">The design is not locked in. Tell us what you would bind to a shape, and what it would take to replace the screens you run today.</span>
            <span class="mt-2 block text-sm font-semibold text-indigo-600">Give feedback on Tags and Canvas &rarr;</span>
          </span>
        </a>
      </div>
    </section>

    <!-- WHERE THIS SITS: the panel is one layer. Pointing at the layers above it
         keeps a reader who arrived on the wrong page from bouncing. -->
    <section class="w-full px-6 pt-0 pb-12 sm:pb-16">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="max-md:text-center">Above the panel, <span class="text-indigo-600">the same platform</span></h2>
        <p class="mt-3 text-gray-600 max-w-3xl">
          The screen at the machine is one layer. The flows behind it feed the supervisory view, the reporting and the namespace, without collecting the same value twice.
        </p>
        <ul class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <li v-for="item in RELATED" :key="item.href">
            <a
              :href="item.href"
              class="block h-full rounded-lg border border-gray-200 bg-white p-6 no-underline transition duration-300 ease-in-out hover:border-indigo-200 hover:bg-indigo-50/40 hover:no-underline"
            >
              <span class="block text-lg font-medium text-gray-900">{{ item.title }}</span>
              <span class="mt-2 block text-gray-600 font-light">{{ item.description }}</span>
              <span class="mt-4 block text-sm font-semibold text-indigo-600">Read more &rarr;</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- FURTHER READING: hand-picked rather than a blog query, because the three that
         matter here are a build walkthrough, the dashboard in the hero, and the
         blueprints - not the most recent posts on a tag. -->
    <section class="w-full px-6 py-12 sm:py-16 bg-gray-50">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="max-md:text-center">Build one <span class="text-indigo-600">yourself</span></h2>
        <ul class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <li v-for="item in READING" :key="item.href">
            <a
              :href="item.href"
              class="block h-full rounded-lg border border-gray-200 bg-white p-6 no-underline transition duration-300 ease-in-out hover:border-indigo-200 hover:no-underline"
            >
              <span class="block text-lg font-medium text-gray-900">{{ item.title }}</span>
              <span class="mt-2 block text-gray-600 font-light">{{ item.description }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- FINAL CTA: the same block that closes /product/ and /ai/. -->
    <div class="w-full px-6 py-12 sm:py-16">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-4xl sm:text-5xl font-medium m-0">Put it on a real panel</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Bring one machine and one screen. We will show you what it takes to get that screen running on the panel, and what it takes to get it onto the rest of the line.</p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="get-started" />
            <CtaPricing variant="ghost" color="white" position="get-started" icon="i-lucide-arrow-right" />
          </div>
        </div>
      </div>
    </div>

    <section class="w-full px-6 py-12 sm:py-16 bg-indigo-50/50">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-8">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <BlogFaq :faq="FAQ" />
      </div>
    </section>
  </div>
</template>
