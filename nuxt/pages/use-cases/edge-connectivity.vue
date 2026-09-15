<script setup lang="ts">
// Ported from src/use-cases/edge-connectivity.njk (11ty), which this replaces.
//
// The .njk version was six equal-weight blurbs on the shared `solution` layout,
// in no particular order, describing deployment mechanics. This is a narrative
// page: the argument is that edge connectivity is about shortening the loop
// between something happening on a line and something being done about it, and
// every section earns the next one.
//
// Section order: hero, the open loop (problem + frame + diagram), see, act,
// decide, proof, start. "See" borrows the treatment from /platform/dashboard/'s
// "In the box" block, since it plays the same role here - the first look at what
// you actually get.
//
// Claim discipline, because this page is easy to overclaim on:
//  - Remote-instance telemetry is CPU + memory + last-seen + logs + audit. That
//    is what "See" claims and no more.
//  - Threshold ALERTS are documented on hosted instances only (fixed 75%), so
//    this page does not promise alerting at the edge. Do not add it without
//    product sign-off. The ABM landing page's "Edge Monitoring & Alerting" is
//    the claim in question.
//  - No anomaly detection is a platform feature. "Decide" attributes it to what
//    a customer builds in a flow with ONNX, which is the truth.
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

// The hero recording loops silently. Anyone who has asked their OS for less
// motion gets the poster frame instead - autoplay is not something CSS can
// switch off, so it has to be done here.
const heroVideo = ref<HTMLVideoElement | null>(null)
onMounted(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        heroVideo.value?.pause()
    }
})

/* ------------------------------------------------------------------ *
 * Section content
 * ------------------------------------------------------------------ */

// Every chip that can point at a doc does. The ones that cannot are plain
// text rather than a dead link - see the claims note at the top of this file.
const SEE_CARDS = [
    {
        title: 'Every device, one view',
        chips: [
            { label: 'Instance state and last seen', href: '/docs/user/instance-states/' },
            { label: 'CPU and memory over time', href: '/docs/device-agent/introduction/' },
            { label: 'Agent and Node-RED versions', href: '/docs/device-agent/running/' },
            { label: 'Device groups by site or line', href: '/docs/user/device-groups/' },
        ],
    },
    {
        title: 'What changed, and who changed it',
        chips: [
            { label: 'Audit log across the team', href: '/docs/user/logs/' },
            { label: 'Snapshot comparison', href: '/docs/user/snapshots/' },
            { label: 'Version history timeline', href: '/docs/user/snapshots/' },
            { label: 'Attribution on every deploy', href: '/docs/user/logs/' },
        ],
    },
    {
        title: 'When something goes wrong',
        chips: [
            { label: 'Node-RED logs without SSH', href: '/docs/user/logs/' },
            { label: 'Health checks and auto-restart', href: '/docs/user/instance-states/' },
            { label: 'Diagnostic emails with the logs attached', href: null },
            { label: 'Structured JSON logs for Loki or Elastic', href: '/docs/device-agent/running/' },
        ],
    },
    {
        title: 'Reach a machine you cannot touch',
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
        beta: false,
        body: 'Drop a trained ONNX model into a flow and run inference on the edge device itself. No round trip, no inference bill, no data leaving the plant. One of our own builds catches motor anomalies from an accelerometer using a 33-feature autoencoder trained only on what normal looks like.',
        link: { label: 'ONNX in flows', href: '/docs/flowfuse-nodes/ai/onxx/' },
    },
    {
        title: 'Give an agent hands, not just answers',
        beta: false,
        body: 'Expose your flows as MCP tools and let Copilot, Claude, ChatGPT or your own agent read live operational state and act on it, inside the role-based access control you already run. Read-only stays read-only. No agent can delete an instance, an application, a snapshot or a team. Every action is logged as via MCP.',
        link: { label: 'MCP servers', href: '/docs/flowfuse-nodes/mcp/' },
    },
    {
        title: 'Ask the factory a question',
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
         The recording is landscape and full of real UI, so it gets the full
         column width under a two-column headline rather than being squeezed
         into half a grid beside the copy.
    =================================================================== -->
    <section class="w-full px-6">
      <div class="max-w-md sm:max-w-screen-lg mx-auto pt-10 md:pt-14 pb-16 md:pb-20">
        <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">For OT and controls teams</span>

        <!-- items-start, not items-end: the right column is taller than the
             headline, so bottom-aligning pushed the h1 down and left a hole under
             the eyebrow. Both columns start at the same top edge instead, with a
             small optical nudge on the smaller type. -->
        <div class="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6 md:gap-12 md:items-start mt-4">
          <h1 class="font-medium m-0 max-sm:text-4xl">
            See what every machine is doing.
            <span class="text-indigo-600">Change it without leaving your desk.</span>
          </h1>

          <div class="flex flex-col gap-5 md:pt-2">
            <p class="text-lg text-gray-500 font-light m-0">
              FlowFuse runs <a href="/node-red/" :class="LINK">Node-RED</a> next to your machines and
              governs it from one place. Read the PLC, watch the instance, open the editor on a line
              400 km away, and roll the fix to every site that needs it. No site visit. No USB stick.
              No inbound firewall rule.
            </p>
            <div class="flex flex-row flex-wrap gap-4 items-center">
              <CtaBookDemo variant="highlight" position="edge-hero" />
              <a
                class="text-base uppercase font-semibold text-indigo-600 hover:text-indigo-800 no-underline"
                href="/docs/device-agent/install/"
                @click="capture('cta-device-agent-install', { position: 'edge-hero' })"
              >Install the Device Agent →</a>
            </div>
          </div>
        </div>

        <figure class="m-0 mt-10 md:mt-12">
          <div class="rounded-xl border border-gray-200 overflow-hidden bg-white ec-shot">
            <video
              ref="heroVideo"
              autoplay loop muted playsinline preload="none"
              poster="/images/use-cases/edge-remote-instance-poster.jpg"
              width="1400" height="630"
              class="w-full h-auto block"
              aria-label="A Remote Instance in FlowFuse: connection status and last seen, agent and Node-RED versions, target snapshot and device mode, with a live activity log. The view then switches to the Node-RED editor running on that same device."
            >
              <source src="/images/use-cases/edge-remote-instance.webm" type="video/webm">
            </video>
          </div>
          <figcaption class="mt-3 text-sm text-gray-400">
            One remote instance in FlowFuse &mdash; state, versions and recent activity, then the editor
            open on the device itself.
          </figcaption>
        </figure>

        <!-- Full container width rather than a narrow column: at max-w-2xl under a
             1024px recording it read as a leftover, not as the close of the hero. -->
        <figure class="border-l-2 border-indigo-100 pl-6 md:pl-8 mt-12 mb-0 mx-0 text-left">
          <blockquote class="m-0 text-xl md:text-2xl italic font-light text-gray-800 leading-snug">
            &ldquo;It&rsquo;s not just about connecting machines &mdash; it&rsquo;s about creating
            the foundation that makes everything else possible.&rdquo;
          </blockquote>
          <figcaption class="mt-4 flex items-center gap-3 text-sm text-gray-500">
            <span class="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 grid place-items-center text-xs font-bold shrink-0 ec-mono" aria-hidden="true">FR</span>
            <span><span class="font-semibold text-gray-700">Felix Reck</span> &middot; IT Application Manager, Walter</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- ==================================================================
         02 · THE OPEN LOOP
         The problem and the frame for it, in one section: the gap IS an open
         loop, so splitting them into two sections made the page state the
         same idea twice.
    =================================================================== -->
    <section class="w-full px-6 py-16 md:py-24 border-t border-gray-200">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <span class="ec-mono text-xs uppercase tracking-[0.16em] text-gray-600">The open loop</span>
        <h2 class="mt-3 mb-8 text-center w-full md:text-left">
          Most plants don&rsquo;t lack data. <span class="text-indigo-600">They lack connectivity.</span>
        </h2>

        <p class="max-w-3xl text-lg text-gray-500 font-light m-0">
          Any change you want to make in a modern factory is a loop: a signal, the context that makes
          it mean something, and an action that changes what the machine does next. If you lack
          connectivity at the edge, you don&rsquo;t just lack information &mdash; you lack the ability
          to deploy controls and effectively govern your systems.
        </p>

        <!-- Loop diagram. This section is heading, one paragraph, diagram, one
             line: the picture carries the argument, so it runs full width rather
             than sitting beside copy that would repeat it. Inline SVG so it
             inherits the page's type and needs no library at runtime. -->
        <figure class="m-0 mt-10 md:mt-12 rounded-xl border border-gray-200 bg-gray-50 px-4 py-8 md:px-14 md:py-12">
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
            <rect x="30" y="118" width="120" height="76" rx="10" fill="#ffffff" stroke="#d1d5db" stroke-width="2" />
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
            <rect x="248" y="240" width="228" height="32" rx="16" fill="#f9fafb" />
            <text x="362" y="261" text-anchor="middle" font-size="13" font-weight="500" fill="#4f46e5">
              milliseconds, on the device
            </text>

            <text x="362" y="300" text-anchor="middle" font-size="12.5" fill="#9ca3af">
              The loop keeps closing when the link drops.
            </text>
          </svg>
        </figure>

        <p class="mt-10 text-xl md:text-2xl font-light text-gray-800 max-w-3xl m-0">
          Edge connectivity is about more than polling &mdash;
          <span class="text-indigo-600">it&rsquo;s about full control and observability across your entire system.</span>
        </p>
      </div>
    </section>

    <!-- ==================================================================
         03 · SEE
         Same treatment as "In the box" on /platform/dashboard/: a short lead,
         then bordered cards of linked capability chips. It plays the same role
         here - the first concrete look at what you get.
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
              <h3 class="text-lg font-semibold m-0 mb-4 text-indigo-600 text-center md:text-left">{{ card.title }}</h3>
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
         04 · ACT
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

          <ol class="list-none m-0 p-0 flex flex-col gap-4 min-w-0">
            <li v-for="step in ACT_STEPS" :key="step.n" class="ec-step">
              <span class="ec-step-n ec-mono">{{ step.n }}</span>
              <span class="flex flex-col gap-1 min-w-0">
                <span class="font-medium text-gray-900">{{ step.title }}</span>
                <span class="text-gray-500 font-light">{{ step.detail }}</span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ==================================================================
         05 · DECIDE
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
              <div class="flex items-center gap-2.5 min-h-[1.25rem]">
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
         06 · PROOF
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
         07 · START
    =================================================================== -->
    <section class="w-full bg-gray-50 border-t border-b border-gray-200">
      <div class="w-full px-6 py-16 md:py-20">
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
                <span class="flex flex-col gap-1 min-w-0">
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
                <span class="flex flex-col gap-1 min-w-0">
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
                <span class="flex flex-col gap-1 min-w-0">
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
      </div>
    </section>

    <!-- ==================================================================
         08 · CLOSING CTA
    =================================================================== -->
    <section class="w-full px-6 py-16 md:py-20">
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

/* ---------- hero recording ---------- */
.ec-shot {
    box-shadow: 0 18px 40px -24px rgb(17 24 39 / 0.4);
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
