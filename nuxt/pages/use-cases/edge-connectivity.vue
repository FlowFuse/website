<script setup lang="ts">
// Ported from src/use-cases/edge-connectivity.njk (11ty), which this replaces.
//
// The .njk version was six equal-weight blurbs on the shared `solution` layout,
// in no particular order, describing deployment mechanics. This is a narrative
// page: the argument is that edge connectivity is about shortening the loop
// between something happening on a line and something being done about it, and
// every section earns the next one.
//
// Claim discipline, because this page is easy to overclaim on:
//  - Remote-instance telemetry is CPU + memory + last-seen + logs + audit. That
//    is what §4 claims and no more.
//  - Threshold ALERTS are documented on hosted instances only (fixed 75%), so
//    this page does not promise alerting at the edge. Do not add it without
//    product sign-off. The ABM landing page's "Edge Monitoring & Alerting" is
//    the claim in question.
//  - No anomaly detection is a platform feature. §6 attributes it to what a
//    customer builds in a flow with ONNX, which is the truth.
//  - FlowFuse Expert Insights Mode is beta and is labelled as such.
// See also the NOTE in pages/ai/index.vue about omitted AI claims.
useSeoMeta({
    title: 'Edge Connectivity for Industrial Operations',
    description: 'See what every machine is doing and change it without a site visit. FlowFuse runs Node-RED next to your PLCs and governs it from one place: remote editor, snapshots, device groups and fleet-wide rollout.',
    ogUrl: 'https://flowfuse.com/use-cases/edge-connectivity/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ name: 'Edge Connectivity for Industrial Operations' }),
])

const capture = useCapture()

/* ------------------------------------------------------------------ *
 * Hero: the fleet view.
 *
 * The Dashboard page opens on a live product surface rather than a
 * screenshot, and that is most of why it works. The equivalent here is
 * not a dashboard (we have a dashboard page) but the thing this page is
 * actually selling: one screen, many machines, three questions.
 *
 * Same twelve devices in all three views, re-sorted and re-columned per
 * question, so switching reads as one estate answering differently
 * rather than three unrelated mocks.
 * ------------------------------------------------------------------ */
type Device = {
    name: string
    site: string
    state: 'running' | 'restarting' | 'offline'
    cpu: number
    mem: number
    agent: string
    nodered: string
    change: string
    changedMinutes: number
    by: string
}

const DEVICES: Device[] = [
    { name: 'cov-line3-filler', site: 'Coventry', state: 'running', cpu: 31, mem: 44, agent: '4.0.1', nodered: '4.0.9', change: 'Torque limit 62 Nm', changedMinutes: 34, by: 'p.nowak' },
    { name: 'cov-line3-capper', site: 'Coventry', state: 'running', cpu: 91, mem: 78, agent: '4.0.1', nodered: '4.0.9', change: 'Torque limit 62 Nm', changedMinutes: 34, by: 'p.nowak' },
    { name: 'cov-line3-labeller', site: 'Coventry', state: 'running', cpu: 27, mem: 39, agent: '4.0.1', nodered: '4.0.9', change: 'Torque limit 62 Nm', changedMinutes: 34, by: 'p.nowak' },
    { name: 'cov-line4-filler', site: 'Coventry', state: 'restarting', cpu: 12, mem: 22, agent: '4.0.1', nodered: '4.0.9', change: 'Snapshot rollback', changedMinutes: 6, by: 's.ahmed' },
    { name: 'cov-utilities-air', site: 'Coventry', state: 'running', cpu: 18, mem: 31, agent: '3.8.1', nodered: '4.0.5', change: 'Compressor alarm routing', changedMinutes: 2760, by: 's.ahmed' },
    { name: 'gda-line1-press', site: 'Gdańsk', state: 'running', cpu: 44, mem: 51, agent: '4.0.1', nodered: '4.0.9', change: 'Cycle counter reset', changedMinutes: 420, by: 'm.kowal' },
    { name: 'gda-line1-oven', site: 'Gdańsk', state: 'running', cpu: 38, mem: 47, agent: '4.0.1', nodered: '4.0.9', change: 'Zone 2 setpoint', changedMinutes: 420, by: 'm.kowal' },
    { name: 'gda-line2-press', site: 'Gdańsk', state: 'offline', cpu: 0, mem: 0, agent: '3.6.0', nodered: '3.1.11', change: 'Recipe sync', changedMinutes: 11520, by: 'm.kowal' },
    { name: 'gda-packing-robot', site: 'Gdańsk', state: 'running', cpu: 52, mem: 58, agent: '4.0.1', nodered: '4.0.9', change: 'Pallet pattern B', changedMinutes: 1440, by: 'm.kowal' },
    { name: 'mty-line1-weld', site: 'Monterrey', state: 'running', cpu: 35, mem: 42, agent: '4.0.1', nodered: '4.0.9', change: 'Weld log to historian', changedMinutes: 95, by: 'j.ibarra' },
    { name: 'mty-line1-vision', site: 'Monterrey', state: 'running', cpu: 63, mem: 66, agent: '4.0.1', nodered: '4.0.9', change: 'Reject threshold 0.82', changedMinutes: 95, by: 'j.ibarra' },
    { name: 'mty-utilities-water', site: 'Monterrey', state: 'running', cpu: 9, mem: 17, agent: '3.8.1', nodered: '4.0.5', change: 'Flow totaliser', changedMinutes: 8640, by: 'j.ibarra' },
]

const VIEWS = [
    { id: 'health', label: 'Health', question: 'Is anything unhappy right now?' },
    { id: 'versions', label: 'Versions', question: 'What is each device actually running?' },
    { id: 'changes', label: 'Last change', question: 'What changed out there, and who changed it?' },
] as const

type ViewId = typeof VIEWS[number]['id']
const view = ref<ViewId>('health')

function selectView (id: ViewId) {
    view.value = id
    capture('edge-fleet-view', { view: id })
}

// Agent versions are dotted strings, so compare numerically per segment rather
// than lexically: '3.8.1' must sort before '4.0.1', and '3.10.0' after '3.8.1'.
function compareVersions (a: string, b: string) {
    const left = a.split('.').map(Number)
    const right = b.split('.').map(Number)
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
        const diff = (left[i] ?? 0) - (right[i] ?? 0)
        if (diff !== 0) return diff
    }
    return 0
}

// Each view sorts by whatever makes its own question answerable at a glance:
// health puts whatever needs a human first, versions puts the oldest agent
// first (that is the upgrade queue), changes puts the most recent first.
const STATE_ORDER: Record<Device['state'], number> = { offline: 0, restarting: 1, running: 2 }

const rows = computed(() => {
    const list = [...DEVICES]
    if (view.value === 'health') {
        return list.sort((a, b) => STATE_ORDER[a.state] - STATE_ORDER[b.state] || b.cpu - a.cpu)
    }
    if (view.value === 'versions') {
        return list.sort((a, b) => compareVersions(a.agent, b.agent) || a.name.localeCompare(b.name))
    }
    return list.sort((a, b) => a.changedMinutes - b.changedMinutes)
})

const siteCount = new Set(DEVICES.map(device => device.site)).size
const needsAttention = DEVICES.filter(device => device.state !== 'running' || device.cpu >= 75).length

const STATE_LABEL: Record<Device['state'], string> = {
    running: 'Running',
    restarting: 'Restarting',
    offline: 'Offline',
}

// Status is never colour alone - every chip carries its word, and the CPU meter
// always prints its number beside the bar.
function stateClass (state: Device['state']) {
    if (state === 'offline') return 'ec-chip ec-chip--critical'
    if (state === 'restarting') return 'ec-chip ec-chip--warn'
    return 'ec-chip ec-chip--good'
}

function meterClass (cpu: number) {
    if (cpu >= 85) return 'ec-meter-fill ec-meter-fill--critical'
    if (cpu >= 75) return 'ec-meter-fill ec-meter-fill--warn'
    return 'ec-meter-fill'
}

function relativeTime (minutes: number) {
    if (minutes < 60) return `${minutes} min ago`
    if (minutes < 1440) return `${Math.round(minutes / 60)} h ago`
    return `${Math.round(minutes / 1440)} d ago`
}

const LATEST_AGENT = '4.0.1'

/* ------------------------------------------------------------------ *
 * Section content
 * ------------------------------------------------------------------ */

// Every chip that can point at a doc does. The ones that cannot are plain
// text rather than a dead link - see the claims note at the top of this file.
const SEE_CARDS = [
    {
        title: 'Every device, one view',
        icon: 'i-lucide-layout-grid',
        chips: [
            { label: 'Instance state and last seen', href: '/docs/user/instance-states/' },
            { label: 'CPU and memory over time', href: '/docs/device-agent/introduction/' },
            { label: 'Agent and Node-RED versions', href: '/docs/device-agent/running/' },
            { label: 'Device groups by site or line', href: '/docs/user/device-groups/' },
        ],
    },
    {
        title: 'What changed, and who changed it',
        icon: 'i-lucide-history',
        chips: [
            { label: 'Audit log across the team', href: '/docs/user/logs/' },
            { label: 'Snapshot comparison', href: '/docs/user/snapshots/' },
            { label: 'Version history timeline', href: '/docs/user/snapshots/' },
            { label: 'Attribution on every deploy', href: '/docs/user/logs/' },
        ],
    },
    {
        title: 'When something goes wrong',
        icon: 'i-lucide-siren',
        chips: [
            { label: 'Node-RED logs without SSH', href: '/docs/user/logs/' },
            { label: 'Health checks and auto-restart', href: '/docs/user/instance-states/' },
            { label: 'Diagnostic emails with the logs attached', href: null },
            { label: 'Structured JSON logs for Loki or Elastic', href: '/docs/device-agent/running/' },
        ],
    },
    {
        title: 'Reach a machine you cannot touch',
        icon: 'i-lucide-plug-zap',
        chips: [
            { label: 'Open the editor from your browser', href: '/docs/device-agent/running/' },
            { label: 'Developer Mode tunnel for live debugging', href: '/docs/device-agent/deploy/' },
            { label: 'Restart a device remotely', href: '/docs/device-agent/introduction/' },
            { label: 'Outbound-only, no inbound ports', href: '/docs/device-agent/introduction/' },
        ],
    },
]

const ACT_STEPS = [
    { n: '01', title: 'Fix one', detail: 'Open the Node-RED editor on the machine itself, from your browser, and change the flow on live hardware.' },
    { n: '02', title: 'Snapshot it', detail: 'Capture the working state as a versioned snapshot you can compare, promote and roll back.' },
    { n: '03', title: 'Roll it out', detail: 'Push that snapshot to the device group through a pipeline. Every filler on every line, or every site in the region.' },
]

const DECIDE_CARDS = [
    {
        title: 'Run the model where the data is',
        icon: 'i-lucide-cpu',
        beta: false,
        body: 'Drop a trained ONNX model into a flow and run inference on the edge device itself. No round trip, no inference bill, no data leaving the plant. One of our own builds catches motor anomalies from an accelerometer using a 33-feature autoencoder trained only on what normal looks like.',
        link: { label: 'ONNX in flows', href: '/docs/flowfuse-nodes/ai/onxx/' },
    },
    {
        title: 'Give an agent hands, not just answers',
        icon: 'i-lucide-bot',
        beta: false,
        body: 'Expose your flows as MCP tools and let Copilot, Claude, ChatGPT or your own agent read live operational state and act on it, inside the role-based access control you already run. Read-only stays read-only. No agent can delete an instance, an application, a snapshot or a team. Every action is logged as via MCP.',
        link: { label: 'MCP servers', href: '/docs/flowfuse-nodes/mcp/' },
    },
    {
        title: 'Ask the factory a question',
        icon: 'i-lucide-message-square-text',
        beta: true,
        body: 'FlowFuse Expert Insights Mode connects to the MCP servers in your Node-RED instances, so you can query live state in plain language instead of building a report for it.',
        link: { label: 'FlowFuse Expert', href: '/docs/user/expert/' },
    },
]

const PROOF = [
    {
        stat: '1 → 130+',
        unit: 'instances',
        detail: 'Walter scaled from a single Node-RED instance to over 130 across four continents, unified five separate machine-connectivity and dashboarding systems, and kept the same seven-person IT team.',
        name: 'Walter',
        href: '/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/',
    },
    {
        stat: '15 → 1',
        unit: 'deploy',
        detail: 'Aperia replaced a USB-stick walk across five lines with a single device-group deploy, and freed 8 to 12 hours a day of idle end-of-line test equipment for overnight reliability testing.',
        name: 'Aperia Technologies',
        href: '/customer-stories/aperia-technologies-plc-replacement/',
    },
    {
        stat: '½ shift',
        unit: 'returned',
        detail: 'Paloma’s team was spending half of every shift driving between remote pumping stations. Remote access and automated alerts ended the routine visits across 30,000 acres.',
        name: 'Paloma Irrigation',
        href: '/customer-stories/leveraging-node-red-and-flowfuse-to-revolutionize-irrigation/',
    },
    {
        stat: '7,000 km',
        unit: 'of grid',
        detail: 'Energinet monitors substation health and environmental conditions at hundreds of critical nodes across Denmark’s transmission grid, with a small operations team and 24/7 surveillance.',
        name: 'Energinet',
        href: '/customer-stories/energinet-streamlining-critical-infrastructure-data-management/',
    },
]

// The two use cases most often built on top of an edge estate. The .njk page
// pulled these from the 11ty `use-case` collection via components/use-case-links.njk,
// which Nuxt cannot see - those pages are still on 11ty. Restated here, and this
// block goes back to being collection-driven when /use-cases/ finishes migrating.
const BUILT_AT_THE_EDGE = [
    {
        title: 'Production Monitoring',
        problem: 'Your operation is running. You just can’t see it clearly enough, until something breaks.',
        href: '/use-cases/production-monitoring/',
    },
    {
        title: 'Shop Floor Communication',
        problem: 'The line stopped four minutes ago. The person who can fix it will find out when someone walks over.',
        href: '/use-cases/shop-floor-communication/',
    },
]

const LINK = 'text-indigo-600 hover:text-indigo-800 underline'
</script>

<template>
  <div class="w-full">

    <!-- ==================================================================
         01 · HERO
         The promise, then the estate. No pictogram, no subtitle slot: this
         is why the page leaves the shared `solution` layout behind.
    =================================================================== -->
    <section class="w-full px-6">
      <div class="max-w-md sm:max-w-screen-lg mx-auto pt-10 md:pt-14">
        <div class="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 md:gap-12 items-start">

          <!-- copy column -->
          <div class="flex flex-col gap-5 text-center md:text-left">
            <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">For OT and controls teams</span>
            <h1 class="font-medium m-0 max-sm:text-4xl">
              See what every machine is doing.
              <span class="text-indigo-600">Change it without leaving your desk.</span>
            </h1>
            <p class="text-lg text-gray-500 font-light max-w-xl mx-auto md:mx-0 m-0">
              FlowFuse runs <a href="/node-red/" :class="LINK">Node-RED</a> next to your machines and
              governs it from one place. Read the PLC, watch the instance, open the editor on a line
              400 km away, and roll the fix to every site that needs it. No site visit. No USB stick.
              No inbound firewall rule.
            </p>

            <div class="flex flex-row flex-wrap gap-4 items-center justify-center md:justify-start mt-1">
              <CtaBookDemo variant="highlight" position="edge-hero" />
              <a
                class="text-base uppercase font-semibold text-indigo-600 hover:text-indigo-800 no-underline"
                href="/docs/device-agent/install/"
                @click="capture('cta-device-agent-install', { position: 'edge-hero' })"
              >Install the Device Agent →</a>
            </div>

            <hr class="border-0 border-t border-gray-200 w-full max-w-md mx-auto md:mx-0 mt-2 mb-0">

            <figure class="border-l-2 border-indigo-100 pl-5 max-w-lg mx-auto md:mx-0 my-0 text-left">
              <blockquote class="m-0 text-base italic font-light text-gray-800 leading-relaxed">
                &ldquo;It&rsquo;s not just about connecting machines &mdash; it&rsquo;s about creating
                the foundation that makes everything else possible.&rdquo;
              </blockquote>
              <figcaption class="mt-3 flex items-center gap-3 text-sm text-gray-500">
                <span class="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 grid place-items-center text-xs font-bold shrink-0 ec-mono" aria-hidden="true">FR</span>
                <span><span class="font-semibold text-gray-700">Felix Reck</span> &middot; IT Application Manager, Walter</span>
              </figcaption>
            </figure>
          </div>

          <!-- fleet view -->
          <div class="flex flex-col gap-3 min-w-0">
            <div class="ec-seg" role="group" aria-label="Fleet view">
              <button
                v-for="item in VIEWS"
                :key="item.id"
                type="button"
                :aria-pressed="view === item.id"
                @click="selectView(item.id)"
              >{{ item.label }}</button>
            </div>

            <div class="ec-frame">
              <div class="ec-chrome">
                <i /><i /><i />
                <span>Fleet &middot; {{ DEVICES.length }} devices &middot; {{ siteCount }} sites</span>
              </div>

              <div class="ec-panel">
                <p class="ec-question">
                  {{ VIEWS.find(item => item.id === view)?.question }}
                  <span v-if="view === 'health'" class="ec-attention">{{ needsAttention }} need attention</span>
                </p>

                <div class="ec-scroll">
                  <table class="ec-table">
                    <thead>
                      <tr v-if="view === 'health'">
                        <th>Device</th><th>Site</th><th>State</th><th class="ec-num">CPU</th>
                      </tr>
                      <tr v-else-if="view === 'versions'">
                        <th>Device</th><th>Site</th><th>Agent</th><th>Node-RED</th>
                      </tr>
                      <tr v-else>
                        <th>Device</th><th>Last change</th><th>When</th><th>By</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="device in rows" :key="device.name">
                        <td class="ec-name">{{ device.name }}</td>

                        <template v-if="view === 'health'">
                          <td class="ec-dim">{{ device.site }}</td>
                          <td><span :class="stateClass(device.state)">{{ STATE_LABEL[device.state] }}</span></td>
                          <td class="ec-num">
                            <span class="ec-meter-wrap">
                              <span class="ec-meter" aria-hidden="true">
                                <span :class="meterClass(device.cpu)" :style="{ width: `${device.cpu}%` }" />
                              </span>
                              <span class="ec-meter-val">{{ device.state === 'offline' ? '—' : `${device.cpu}%` }}</span>
                            </span>
                          </td>
                        </template>

                        <template v-else-if="view === 'versions'">
                          <td class="ec-dim">{{ device.site }}</td>
                          <td>
                            <span :class="device.agent === LATEST_AGENT ? 'ec-chip ec-chip--good' : 'ec-chip ec-chip--warn'">{{ device.agent }}</span>
                          </td>
                          <td class="ec-dim ec-mono">{{ device.nodered }}</td>
                        </template>

                        <template v-else>
                          <td class="ec-dim">{{ device.change }}</td>
                          <td class="ec-dim ec-mono">{{ relativeTime(device.changedMinutes) }}</td>
                          <td class="ec-dim ec-mono">{{ device.by }}</td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <p class="text-xs text-gray-400 text-center md:text-left m-0">
              Illustrative fleet. Every column is a field FlowFuse reports today.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- ==================================================================
         02 · THE GAP
    =================================================================== -->
    <section class="w-full bg-gray-50 border-t border-b border-gray-200 mt-20">
      <div class="w-full px-6 py-16 md:py-20">
        <div class="max-w-md sm:max-w-screen-lg mx-auto">
          <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">The gap</span>
          <h2 class="mt-3 mb-6 text-center w-full md:text-left">
            Most plants aren&rsquo;t short of data. They&rsquo;re short of a <span class="text-indigo-600">place to stand.</span>
          </h2>

          <div class="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl">
            <div class="flex flex-col gap-4 text-gray-500 font-light">
              <p class="m-0">
                Your machines produce more signal than they ever have. The PLC knows the cycle time.
                The drive knows the current draw. The vision system knows the reject rate. All of it
                exists, somewhere, in a format someone chose years ago.
              </p>
              <p class="m-0">
                What doesn&rsquo;t exist is one place to look at it &mdash; and one place to do
                something about it.
              </p>
            </div>
            <div class="flex flex-col gap-4 text-gray-500 font-light">
              <p class="m-0">
                So the work goes sideways. An engineer drives to a pumping station to read a gauge. A
                torque spec change means reprogramming fifteen controllers by hand, across five lines,
                with a USB stick. One production unit reports runtime and downtime to the MES; the unit
                next door reports nothing, because nobody has built it yet and nobody has the time.
              </p>
              <p class="m-0">
                It holds until it doesn&rsquo;t. A bearing gives up at 2:47 on a Tuesday. The vibration
                had been climbing for six weeks. Nobody was watching that number, because watching it
                would have meant building something, and building something would have meant a project.
              </p>
            </div>
          </div>

          <p class="mt-10 text-xl md:text-2xl font-light text-gray-800 max-w-3xl m-0">
            The gap isn&rsquo;t between your machines and the cloud. It&rsquo;s between noticing
            something and <span class="text-indigo-600">being able to do anything about it.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- ==================================================================
         03 · THE LOOP
    =================================================================== -->
    <section class="w-full px-6 py-16 md:py-24">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">The loop</span>
        <h2 class="mt-3 mb-6 text-center w-full md:text-left">
          Every improvement you want is a loop. <span class="text-indigo-600">The edge is where it closes.</span>
        </h2>

        <div class="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl">
          <div class="flex flex-col gap-4 text-gray-500 font-light">
            <p class="m-0">Signal. Context. Action. That&rsquo;s the whole shape of it.</p>
            <p class="m-0">
              A motor draws 2.3 amps &mdash; that&rsquo;s a <strong class="font-medium text-gray-700">signal</strong>,
              and on its own it means nothing. It becomes useful when you know which line, which recipe,
              which shift, and what the last four weeks looked like: that&rsquo;s
              <strong class="font-medium text-gray-700">context</strong>. And it only pays for itself when
              somebody, or something, changes what the machine does next. That&rsquo;s
              <strong class="font-medium text-gray-700">action</strong>.
            </p>
          </div>
          <div class="flex flex-col gap-4 text-gray-500 font-light">
            <p class="m-0">
              Most industrial architectures close that loop in the cloud, or in a person&rsquo;s head, or
              in next month&rsquo;s report. Which means the loop is measured in hours, or days, or a site
              visit. A historian tells you what happened. A dashboard tells you what&rsquo;s happening.
              Neither one lets you change anything.
            </p>
            <p class="m-0 text-gray-700">
              FlowFuse closes it where the machine is. The flow reading the PLC, the logic deciding what
              it means, and the editor you change that logic in are the same thing, running on the same
              device, behind the same login.
            </p>
          </div>
        </div>

        <!-- Loop diagram. Full width rather than beside the copy: at half width it
             renders about 700px across and reads as an aside, when it is the
             section's argument. Inline SVG so it inherits the page's type and
             needs no library at runtime. -->
        <figure class="m-0 mt-10 md:mt-12 rounded-xl border border-gray-200 bg-white px-4 py-8 md:px-14 md:py-12">
            <svg
              viewBox="0 0 720 320"
              class="w-full h-auto"
              role="img"
              aria-label="Diagram: a machine feeds Signal, then Context, then Action, which returns to the machine in milliseconds on the device. A longer dashed path routes the same loop through the cloud, taking 20 to 100 milliseconds and only while the link is up."
            >
              <!-- cloud path (the long way round) -->
              <path d="M 96 108 C 140 26, 300 18, 360 18 C 430 18, 570 30, 616 108"
                    fill="none" stroke="#9ca3af" stroke-width="2" stroke-dasharray="5 5" />
              <rect x="300" y="0" width="122" height="34" rx="17" fill="#ffffff" stroke="#e5e7eb" />
              <text x="361" y="22" text-anchor="middle" font-size="14" fill="#6b7280">Cloud / IT</text>
              <text x="361" y="54" text-anchor="middle" font-size="12.5" fill="#9ca3af">
                20&ndash;100 ms, and only while the link is up
              </text>
              <polygon points="616,112 611,100 621,100" fill="#9ca3af" />

              <!-- machine -->
              <rect x="30" y="118" width="120" height="76" rx="10" fill="#f9fafb" stroke="#d1d5db" stroke-width="2" />
              <text x="90" y="150" text-anchor="middle" font-size="14" font-weight="500" fill="#374151">Machine</text>
              <text x="90" y="170" text-anchor="middle" font-size="12" fill="#9ca3af">PLC &middot; drive &middot; sensor</text>

              <!-- the three stages -->
              <g>
                <rect x="190" y="124" width="140" height="64" rx="10" fill="#eef2ff" stroke="#c7d2fe" stroke-width="2" />
                <text x="260" y="150" text-anchor="middle" font-size="15" font-weight="600" fill="#4f46e5">Signal</text>
                <text x="260" y="170" text-anchor="middle" font-size="12" fill="#6b7280">2.3 A</text>

                <rect x="360" y="124" width="140" height="64" rx="10" fill="#eef2ff" stroke="#c7d2fe" stroke-width="2" />
                <text x="430" y="150" text-anchor="middle" font-size="15" font-weight="600" fill="#4f46e5">Context</text>
                <text x="430" y="170" text-anchor="middle" font-size="12" fill="#6b7280">line, recipe, history</text>

                <rect x="530" y="124" width="140" height="64" rx="10" fill="#eef2ff" stroke="#c7d2fe" stroke-width="2" />
                <text x="600" y="150" text-anchor="middle" font-size="15" font-weight="600" fill="#4f46e5">Action</text>
                <text x="600" y="170" text-anchor="middle" font-size="12" fill="#6b7280">alert, setpoint, stop</text>
              </g>

              <!-- forward arrows -->
              <g stroke="#4f46e5" stroke-width="2" fill="none">
                <line x1="152" y1="156" x2="182" y2="156" />
                <line x1="332" y1="156" x2="352" y2="156" />
                <line x1="502" y1="156" x2="522" y2="156" />
              </g>
              <g fill="#4f46e5">
                <polygon points="190,156 178,151 178,161" />
                <polygon points="360,156 348,151 348,161" />
                <polygon points="530,156 518,151 518,161" />
              </g>

              <!-- return path (the short way round) -->
              <path d="M 600 190 L 600 256 L 90 256 L 90 198"
                    fill="none" stroke="#4f46e5" stroke-width="2" />
              <polygon points="90,192 85,204 95,204" fill="#4f46e5" />
              <rect x="248" y="240" width="228" height="32" rx="16" fill="#ffffff" />
              <text x="362" y="261" text-anchor="middle" font-size="13" font-weight="500" fill="#4f46e5">
                milliseconds, on the device
              </text>

              <text x="362" y="300" text-anchor="middle" font-size="12.5" fill="#9ca3af">
                The loop keeps closing when the link drops.
              </text>
            </svg>
        </figure>
      </div>
    </section>

    <!-- ==================================================================
         04 · SEE
    =================================================================== -->
    <section class="w-full bg-gray-50 border-t border-b border-gray-200">
      <div class="w-full px-6 py-16 md:py-20">
        <div class="max-w-md sm:max-w-screen-lg mx-auto">
          <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">See</span>
          <h2 class="mt-3 mb-3 text-center w-full md:text-left">
            Know what&rsquo;s running out there, <span class="text-indigo-600">and whether it&rsquo;s healthy.</span>
          </h2>
          <p class="max-w-3xl mx-auto md:mx-0 text-gray-500 font-light">
            The first question any operations lead eventually asks is the simplest one: what is actually
            running out there, and is it safe? FlowFuse answers it from one screen.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div v-for="card in SEE_CARDS" :key="card.title" class="rounded-lg border border-indigo-200 bg-white p-6">
              <h3 class="text-lg font-semibold m-0 mb-4 text-indigo-600 flex items-center gap-2.5 justify-center md:justify-start">
                <UIcon :name="card.icon" class="size-5 shrink-0" aria-hidden="true" />
                {{ card.title }}
              </h3>
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <template v-for="chip in card.chips" :key="chip.label">
                  <a v-if="chip.href" class="ec-tag" :href="chip.href">{{ chip.label }}</a>
                  <span v-else class="ec-tag ec-tag--static">{{ chip.label }}</span>
                </template>
              </div>
            </div>
          </div>

          <p class="mt-8 text-gray-500 font-light max-w-3xl mx-auto md:mx-0">
            None of this needs an agent on top of the agent. It&rsquo;s the same
            <a href="/platform/device-agent/" :class="LINK">Device Agent</a> that runs your flows,
            reporting on itself.
          </p>
        </div>
      </div>
    </section>

    <!-- ==================================================================
         05 · ACT
    =================================================================== -->
    <section class="w-full px-6 py-16 md:py-24">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">Act</span>
        <h2 class="mt-3 mb-6 text-center w-full md:text-left">
          Seeing it is half. <span class="text-indigo-600">The other half is changing it, everywhere, at once.</span>
        </h2>

        <div class="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div class="flex flex-col gap-4 text-gray-500 font-light">
            <p class="m-0">This is where a monitoring tool stops and FlowFuse keeps going.</p>
            <p class="m-0">
              You spot the problem on one machine. You open that machine&rsquo;s editor from your browser
              and fix the flow on live hardware. You snapshot it. Then you push that snapshot to the
              device group &mdash; every filler on every line, or every site in the region &mdash; through
              a pipeline, with a rollback waiting if you need it.
            </p>
            <p class="m-0">
              Aperia used to change a torque spec by walking fifteen controllers across five lines with a
              USB stick. Now it&rsquo;s one deploy to a device group, in minutes. Walter went from one
              Node-RED instance to over 130 across four continents without adding anybody to a
              seven-person IT team.
            </p>
            <p class="m-0 text-gray-700">
              The test we use on proof-of-value calls is a single sentence: a change made centrally
              reaches every target instance through a pipeline, with nobody logging into an edge node.
              If that&rsquo;s true, the loop is closed.
            </p>
          </div>

          <ol class="list-none m-0 p-0 flex flex-col gap-4">
            <li v-for="step in ACT_STEPS" :key="step.n" class="ec-step">
              <span class="ec-step-n ec-mono">{{ step.n }}</span>
              <span class="flex flex-col gap-1">
                <span class="font-medium text-gray-900">{{ step.title }}</span>
                <span class="text-gray-500 font-light">{{ step.detail }}</span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ==================================================================
         06 · DECIDE
    =================================================================== -->
    <section class="w-full bg-gray-50 border-t border-b border-gray-200">
      <div class="w-full px-6 py-16 md:py-20">
        <div class="max-w-md sm:max-w-screen-lg mx-auto">
          <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">Decide</span>
          <h2 class="mt-3 mb-3 text-center w-full md:text-left">
            Once the loop is closed, <span class="text-indigo-600">intelligence is a node, not a project.</span>
          </h2>
          <p class="max-w-3xl mx-auto md:mx-0 text-gray-500 font-light">
            Eighty-four per cent of manufacturers pursuing IIoT are still stuck in pilot. The models are
            rarely the reason. The reason is that a model needs trustworthy data, a way to reach hardware
            nobody can physically touch, a way to see what it&rsquo;s doing once it&rsquo;s live, and an
            answer to who gets the call at three in the morning. That&rsquo;s infrastructure. It&rsquo;s
            the part FlowFuse is.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div v-for="card in DECIDE_CARDS" :key="card.title" class="rounded-lg border border-gray-200 bg-white p-6 flex flex-col gap-3">
              <div class="flex items-center gap-2.5">
                <UIcon :name="card.icon" class="size-5 text-indigo-600 shrink-0" aria-hidden="true" />
                <span v-if="card.beta" class="ec-beta">Beta</span>
              </div>
              <h3 class="text-lg font-semibold m-0 text-gray-900">{{ card.title }}</h3>
              <p class="m-0 text-gray-500 font-light flex-grow">{{ card.body }}</p>
              <a :href="card.link.href" class="ec-go text-indigo-600 text-sm font-medium">{{ card.link.label }} →</a>
            </div>
          </div>

          <p class="mt-10 text-xl md:text-2xl font-light text-gray-800 max-w-3xl m-0">
            Infrastructure first. <span class="text-indigo-600">Intelligence on top of it.</span> Not the other way around.
          </p>
        </div>
      </div>
    </section>

    <!-- ==================================================================
         07 · PROOF
    =================================================================== -->
    <section class="w-full px-6 py-16 md:py-24">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">Proof</span>
        <h2 class="mt-3 mb-10 text-center w-full md:text-left">
          What teams do once they can <span class="text-indigo-600">see and change the edge.</span>
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            v-for="item in PROOF"
            :key="item.name"
            :href="item.href"
            class="ec-proof rounded-lg border border-gray-200 bg-white p-6 flex flex-col gap-3 no-underline hover:border-indigo-300"
          >
            <span class="flex items-baseline gap-2">
              <span class="text-3xl md:text-4xl font-medium text-indigo-600 leading-none">{{ item.stat }}</span>
              <span class="text-sm text-gray-400">{{ item.unit }}</span>
            </span>
            <span class="text-gray-500 font-light flex-grow">{{ item.detail }}</span>
            <span class="text-sm font-medium text-gray-700 ec-proof-name">{{ item.name }} →</span>
          </a>
        </div>

        <div class="mt-14">
          <h3 class="text-xl font-medium m-0 mb-5 text-center w-full md:text-left">
            What teams build <span class="text-indigo-600">on top of it</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a
              v-for="item in BUILT_AT_THE_EDGE"
              :key="item.title"
              :href="item.href"
              class="ec-proof rounded-lg border border-gray-200 bg-white p-6 flex flex-col gap-2 no-underline hover:border-indigo-300"
            >
              <span class="font-medium text-gray-900">{{ item.title }}</span>
              <span class="text-sm text-gray-500 font-light flex-grow">{{ item.problem }}</span>
              <span class="text-sm font-medium text-gray-700 ec-proof-name">View use case →</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================================
         08 · WHO OWNS THIS
         The gatekeeper section. Openness lives here rather than in the hero:
         it is what gets FlowFuse through architecture review, and it is a
         claim every competitor makes at the top of a page.
    =================================================================== -->
    <section class="w-full bg-gray-50 border-t border-b border-gray-200">
      <div class="w-full px-6 py-16 md:py-20">
        <div class="max-w-md sm:max-w-screen-lg mx-auto">
          <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">Who owns this</span>
          <h2 class="mt-3 mb-3 text-center w-full md:text-left">
            IT needs to know it&rsquo;s safe. OT needs it to not get in the way.
            <span class="text-indigo-600">Same system, two views.</span>
          </h2>
          <p class="max-w-3xl mx-auto md:mx-0 text-gray-500 font-light">
            You cannot scale what you cannot see, and you cannot secure what nobody owns. Edge estates
            usually fail on the second one first &mdash; a machine somebody set up in 2021, a flow that
            exists in one person&rsquo;s memory, a Raspberry Pi under a desk that nothing on the network
            inventory knows about.
          </p>

          <div class="grid md:grid-cols-2 gap-6 mt-10">
            <div class="rounded-lg border border-gray-200 bg-white p-6">
              <h3 class="text-lg font-semibold m-0 mb-3 text-gray-900">For IT and architecture</h3>
              <p class="m-0 text-gray-500 font-light">
                Outbound-only connections from every device: no inbound ports, no VPN, no static IPs, no
                certificates to manage. SSO, two-factor and role-based access across the whole estate.
                A full audit log of every change, every deploy, every agent action. Structured JSON
                logging into the stack you already run. And an open core &mdash; FlowFuse is built on
                Node-RED, the Device Agent is
                <a href="https://github.com/FlowFuse/device-agent" :class="LINK">open source</a>, and the
                flows you build stay portable. Nothing you build here is trapped here.
              </p>
            </div>
            <div class="rounded-lg border border-gray-200 bg-white p-6">
              <h3 class="text-lg font-semibold m-0 mb-3 text-gray-900">For OT and controls</h3>
              <p class="m-0 text-gray-500 font-light">
                The editor you already know, on the hardware you already have. Flows keep running when
                the link drops. Developer Mode when you need to work on live equipment, Fleet Mode when
                you need a device to stay exactly as deployed.
                <a href="/docs/user/snapshots/" :class="LINK">Snapshots</a> and one-click rollback, so
                changing something on a running line stops being the scariest part of the week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================================
         09 · START
    =================================================================== -->
    <section class="w-full px-6 py-16 md:py-24">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">Start</span>
        <h2 class="mt-3 mb-3 text-center w-full md:text-left">
          Bring one machine online. <span class="text-indigo-600">Then decide.</span>
        </h2>

        <!-- min-w-0 on both children: the stacked command block below sets
             white-space:nowrap on the install command, and without this its
             min-content width sizes the single mobile grid track, pushing the
             whole page sideways at phone widths. -->
        <div class="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 md:gap-14 items-start mt-8">
          <ol class="list-none m-0 p-0 flex flex-col gap-6 min-w-0">
            <li class="ec-step">
              <span class="ec-step-n ec-mono">01</span>
              <span class="flex flex-col gap-1">
                <span class="font-medium text-gray-900">Install the agent</span>
                <span class="text-gray-500 font-light">
                  Run one command on the machine you want to connect. The installer registers the device,
                  creates your account if you don&rsquo;t have one, and offers to import the flows if it&rsquo;s
                  already running Node-RED.
                </span>
              </span>
            </li>
            <li class="ec-step">
              <span class="ec-step-n ec-mono">02</span>
              <span class="flex flex-col gap-1">
                <span class="font-medium text-gray-900">Connect what&rsquo;s on it</span>
                <span class="text-gray-500 font-light">
                  Read the PLC with certified
                  <a href="/docs/flowfuse-nodes/edge/opcua/" :class="LINK">OPC-UA</a>,
                  <a href="/docs/flowfuse-nodes/edge/modbus/" :class="LINK">Modbus</a>,
                  <a href="/docs/flowfuse-nodes/edge/cip-suite/" :class="LINK">EtherNet/IP</a> or
                  <a href="/docs/flowfuse-nodes/edge/rtsp/" :class="LINK">RTSP</a> nodes &mdash; maintained
                  and security-patched by FlowFuse, so a production connection never rests on an
                  unmaintained community package.
                </span>
              </span>
            </li>
            <li class="ec-step">
              <span class="ec-step-n ec-mono">03</span>
              <span class="flex flex-col gap-1">
                <span class="font-medium text-gray-900">Do it again, 200 times</span>
                <span class="text-gray-500 font-light">
                  Snapshot what works. Group your devices by site or line. Push through a
                  <a href="/docs/user/devops-pipelines/" :class="LINK">pipeline</a>. Nobody logs into an
                  edge node again.
                </span>
              </span>
            </li>
          </ol>

          <!-- w-full: .ff-blue-card carries `m-auto`, and auto margins on a grid
               item make it shrink-to-fit rather than stretch - so it sized itself
               to the nowrap install command and clamped at max-w-md (448px),
               overflowing a 342px phone track. -->
          <div class="ff-blue-card min-w-0 w-full">
            <h3 class="font-medium w-full text-center md:text-left mb-6 m-0">Install on edge, straight from your terminal</h3>
            <p class="font-medium mb-2">Linux and macOS</p>
            <FfCommand
              command='/bin/bash -c "$(curl -fsSL https://flowfuse.github.io/device-agent/get.sh)" && ./flowfuse-device-agent-installer'
              event="cta-copy-device-agent-install"
              position="edge-connectivity"
              stacked
            />
            <p class="font-medium mb-2 mt-6">Windows (run elevated)</p>
            <FfCommand
              command='Set-Location $env:USERPROFILE; powershell -c "irm https://flowfuse.github.io/device-agent/get.ps1 | iex"; .\flowfuse-device-agent-installer.exe'
              event="cta-copy-device-agent-install"
              position="edge-connectivity"
              stacked
            />
            <p class="font-light mt-6 m-0">
              Installing with npm or Docker instead? The
              <a href="/docs/device-agent/install/overview/" :class="LINK">installation docs</a> cover
              every route.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================================
         10 · CLOSING CTA
    =================================================================== -->
    <section class="w-full px-6 pb-20">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-6 text-center ff-get-started-bg">
          <p class="text-white text-3xl md:text-4xl font-medium m-0 max-w-2xl">
            Tell us about the machine you can&rsquo;t see.
          </p>
          <p class="text-indigo-50 font-light text-lg max-w-2xl m-0">
            The one that&rsquo;s on a mezzanine, or at another site, or behind a controller nobody has
            the password for. We&rsquo;ll show you what it takes to bring it into view &mdash; on the
            call, with your protocol.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="edge-footer" />
            <a
              class="text-base uppercase font-semibold text-white hover:text-gray-200 no-underline"
              href="/docs/device-agent/install/"
              @click="capture('cta-device-agent-install', { position: 'edge-footer' })"
            >Install the Device Agent →</a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Namespaced .ec- so nothing here can collide with the site's components or
   with .ffd- on /platform/dashboard/. The site loads Heebo only, so the mono
   stack matches the one style.dashboard.css already uses for numeric labels. */
.ec-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

/* ---------- view switcher ---------- */
.ec-seg {
    display: inline-flex;
    background-color: var(--color-gray-100);
    border: 1px solid var(--color-gray-200);
    border-radius: 999px;
    padding: 3px;
    gap: 2px;
}
.ec-seg button {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.3125rem 0.75rem;
    border-radius: 999px;
    border: 0;
    background-color: transparent;
    color: var(--color-gray-500);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
}
.ec-seg button:hover {
    color: var(--color-gray-800);
}
.ec-seg button[aria-pressed="true"] {
    background-color: #ffffff;
    color: #4f46e5;
    box-shadow: 0 1px 2px rgb(17 24 39 / 0.12);
}

/* ---------- the framed estate ---------- */
/* min-width/max-width: a grid item defaults to min-width:auto, which lets the
   nowrap table below push the whole column past the viewport at phone widths
   instead of letting .ec-scroll scroll. */
.ec-frame {
    border: 1px solid var(--color-gray-200);
    border-radius: 0.625rem;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 12px 28px -18px rgb(17 24 39 / 0.35);
    min-width: 0;
    max-width: 100%;
}
.ec-chrome {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: var(--color-gray-50);
    border-bottom: 1px solid var(--color-gray-200);
}
.ec-chrome i {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background-color: var(--color-gray-300);
}
.ec-chrome span {
    margin-left: 0.375rem;
    font-size: 0.6875rem;
    color: var(--color-gray-500);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
.ec-panel {
    padding: 0.875rem 1rem 1rem;
    min-width: 0;
}
.ec-question {
    margin: 0 0 0.75rem;
    font-size: 0.8125rem;
    color: var(--color-gray-600);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}
.ec-attention {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #b45309;
    background-color: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 999px;
    padding: 0.125rem 0.5rem;
}

/* A table can be wider than a phone; give it its own scroller rather than
   letting the page scroll sideways. */
.ec-scroll {
    overflow-x: auto;
    /* Tall enough for all twelve rows, so the panel reads as a whole estate
       rather than a list cut off mid-scroll. */
    max-height: 26rem;
    overflow-y: auto;
    min-width: 0;
    max-width: 100%;
}
.ec-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.75rem;
    white-space: nowrap;
}
.ec-table th {
    text-align: left;
    font-weight: 500;
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-gray-400);
    padding: 0 0.5rem 0.4375rem;
    border-bottom: 1px solid var(--color-gray-200);
    position: sticky;
    top: 0;
    background-color: #ffffff;
}
.ec-table td {
    padding: 0.4375rem 0.5rem;
    border-bottom: 1px solid var(--color-gray-100);
    color: var(--color-gray-700);
    vertical-align: middle;
}
.ec-table tr:last-child td {
    border-bottom: 0;
}
.ec-name {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.6875rem;
    color: var(--color-gray-900);
}
.ec-dim {
    color: var(--color-gray-500);
}
.ec-num {
    text-align: right;
}

/* ---------- status chips ----------
   Reserved status colours, never reused as decoration, and never colour
   alone: each chip carries its own word. */
.ec-chip {
    display: inline-block;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.625rem;
    letter-spacing: 0.04em;
    border-radius: 999px;
    padding: 0.125rem 0.4375rem;
    border: 1px solid transparent;
}
.ec-chip--good {
    color: #15803d;
    background-color: #f0fdf4;
    border-color: #bbf7d0;
}
.ec-chip--warn {
    color: #b45309;
    background-color: #fffbeb;
    border-color: #fde68a;
}
.ec-chip--critical {
    color: #b91c1c;
    background-color: #fef2f2;
    border-color: #fecaca;
}

/* ---------- CPU meter ----------
   Thin, baseline-anchored, rounded data end, and the number always printed
   beside it so the bar is never the only carrier of the value. */
.ec-meter-wrap {
    display: inline-flex;
    align-items: center;
    gap: 0.4375rem;
    justify-content: flex-end;
}
.ec-meter {
    display: inline-block;
    width: 3.25rem;
    height: 0.375rem;
    border-radius: 999px;
    background-color: var(--color-gray-100);
    overflow: hidden;
}
.ec-meter-fill {
    display: block;
    height: 100%;
    border-radius: 999px;
    background-color: #4f46e5;
    transition: width 0.25s ease;
}
.ec-meter-fill--warn {
    background-color: #d97706;
}
.ec-meter-fill--critical {
    background-color: #dc2626;
}
.ec-meter-val {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.6875rem;
    color: var(--color-gray-600);
    min-width: 2.25rem;
    text-align: right;
}

/* ---------- capability tags ---------- */
.ec-tag {
    display: inline-block;
    font-size: 0.75rem;
    line-height: 1.25rem;
    padding: 0.1875rem 0.5625rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-gray-200);
    background-color: var(--color-gray-50);
    color: var(--color-gray-700);
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s, background-color 0.15s;
}
a.ec-tag:hover {
    border-color: #c7d2fe;
    background-color: #eef2ff;
    color: #4338ca;
    text-decoration: none;
}
.ec-tag--static {
    color: var(--color-gray-500);
}

/* ---------- numbered steps ---------- */
.ec-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}
.ec-step-n {
    flex: none;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #4f46e5;
    background-color: #eef2ff;
    border: 1px solid #c7d2fe;
    border-radius: 0.5rem;
    padding: 0.375rem 0.5rem;
    line-height: 1;
}

/* ---------- beta marker ---------- */
.ec-beta {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-gray-600);
    background-color: var(--color-gray-100);
    border: 1px solid var(--color-gray-200);
    border-radius: 999px;
    padding: 0.125rem 0.4375rem;
}

.ec-go {
    text-decoration: none;
}
.ec-go:hover {
    text-decoration: underline;
}

/* ---------- proof cards ---------- */
.ec-proof {
    transition: border-color 0.15s, box-shadow 0.15s;
}
.ec-proof:hover {
    box-shadow: 0 8px 20px -14px rgb(17 24 39 / 0.4);
}
.ec-proof:hover .ec-proof-name {
    color: #4f46e5;
}
</style>
