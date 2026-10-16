<script setup lang="ts">
import { faqAnswerText } from '../../lib/faq-answer.mjs'
// The /ai landing page. Originally ported from src/ai.njk (11ty), then rebuilt in
// Oct 2026 around the Industrial AI positioning: it does the work, it already
// reaches the plant, it cannot move without you, and it stays yours.
//
// What the original port changed on purpose:
//  - The two hand-rolled DOM scripts (agent tabs, showcase rotation) become
//    reactive state. That was ~120 lines of querySelectorAll in the .njk.
//  - The copy button becomes <FfCommand>, and the whole agent picker becomes
//    <AgentSetupTabs>, both shared with the changelog and the docs page instead
//    of markup plus a copy helper pasted per page.
//  - jsonld.njk's meta.faq becomes useSchemaOrg, which escapes properly. The 11ty
//    partial interpolated answers straight into a JSON string.
//  - Sign-up buttons become <CtaSignUp>, so the copy is the site's fixed "Try it
//    out" and the event is the unified cta-sign-up. The .njk had bespoke labels
//    ("Start a free trial", "GET STARTED") and reused cta-try-it-out.
useSeoMeta({
    title: 'AI for Industrial Applications: Governed AI for Industry',
    description: 'The Industrial AI that does the work: FlowFuse Expert or your own agent builds the change and ships it to every site, behind your approvals and permissions.',
    ogUrl: 'https://flowfuse.com/ai/',
    twitterSite: '@FlowFuseinc',
})

const LINK = 'text-indigo-600 hover:text-indigo-800 underline'

const capture = useCapture()

// Every governance claim on this page is held to the MCP and Expert docs as of
// FlowFuse 3.1 (docs/user/mcp.md, docs/user/expert/chat.md). Agents CAN delete
// and deploy when a person grants Destructive access or turns on AI Flow Deploy,
// so the claims are about who grants what, not about tools that do not exist.
// Re-check those pages before strengthening any of them.
const FAQ = [
    {
        question: 'What is AI for industrial applications?',
        answer: 'AI for industrial applications means using AI to work with industrial data, equipment and processes. Common uses include helping engineers build automation applications, analysing machine data, inspecting products with computer vision, and allowing people or AI agents to interact with production systems. FlowFuse provides a platform for connecting these AI capabilities to industrial data and applications.',
    },
    {
        question: 'How is AI used in industrial applications?',
        answer: 'AI can support different parts of an industrial operation, from engineering and quality inspection to production monitoring and automation. For example, it can help generate application logic, analyse live machine data, identify defects from camera feeds, or let an AI agent interact with industrial systems. FlowFuse brings these capabilities into the same environment as the industrial applications and data they need to work with.',
    },
    {
        question: 'What are examples of AI for industrial applications?',
        answer: 'Examples include AI-assisted engineering, automated visual inspection, natural-language access to production data, AI agents that interact with industrial systems, and AI models running locally at the edge. With FlowFuse, teams can use FlowFuse Expert to build and explain applications, connect external AI agents over MCP, run ONNX vision models, and use cloud or local LLMs within industrial workflows.',
    },
    {
        question: 'How is FlowFuse different from other industrial AI?',
        answer: 'Most industrial AI analyses a copy of your data and hands you a recommendation, and a person still has to go and make the change. FlowFuse AI works inside the Node-RED flows already connected to your machines, so what it produces is the change itself: built, reviewed by you, and shipped to every site that needs it. FlowFuse sells no hardware and works with any vendor\'s equipment and any AI model.',
    },
    {
        question: 'Does FlowFuse AI work with my existing PLCs and systems?',
        answer: 'Yes. FlowFuse is built on Node-RED, which connects to OPC UA, Modbus, EtherNet/IP, Siemens S7, MQTT and more, plus over 5,000 community nodes. It is designed for brownfield sites, so it works alongside your existing PLCs, MES, ERP and SCADA rather than replacing them, and anything FlowFuse can reach, the AI can work with.',
    },
    {
        question: 'Can I use my own AI agent with FlowFuse?',
        answer: 'Yes. FlowFuse acts as an MCP server, so Microsoft Copilot, ChatGPT, Claude or a local model can connect to it and work your platform. You add one address, sign in, and choose which teams the agent may act on and whether it gets Read, Write or Destructive access in each. Because the agent is yours, so is the model behind it.',
    },
    {
        question: 'Does FlowFuse work with Cursor, Visual Studio Code or Gemini CLI?',
        answer: 'Yes. Command-line and editor agents such as Cursor, Visual Studio Code, Gemini CLI, Claude Code and Codex connect to FlowFuse over MCP, using the same URL as any other agent. On a self-hosted platform, use your own FlowFuse domain instead. Setup for each client is in the [third-party agents documentation](/docs/user/expert/third-party-agents/).',
    },
    {
        question: 'How do you keep AI from making changes you did not approve?',
        answer: 'Every AI action runs through the permissions you grant, checked on every call: Read, Write or Destructive, set team by team, so a call that reaches past its grant is refused. By default FlowFuse Expert shows you each change and waits for your approval before it writes or deletes anything. Nothing goes live on its own unless a team owner turns on agent deploy, and every action is recorded in the audit log, marked as coming from Expert or from your own agent.',
    },
    {
        question: 'Does FlowFuse Expert send my data to OpenAI?',
        answer: 'Some FlowFuse Expert features use the OpenAI API, so the context you choose to share, such as a flow, your palette or debug logs, is sent to OpenAI to answer the request. No FlowFuse data is used to train models, and OpenAI deletes API data after 30 days of abuse monitoring. See [data privacy](/docs/user/expert/#data-privacy) for details.',
    },
    {
        question: 'Can I run industrial AI without sending data to the cloud?',
        answer: 'Yes, for the AI that runs in your flows. You can self-host FlowFuse on your own infrastructure, including air-gapped sites, run ONNX vision models at the edge, and use the Ollama node against a local model with no API key. You can also connect an agent that runs on your own model. FlowFuse Expert itself uses a hosted model, so it needs an outbound connection.',
    },
    {
        question: 'Is FlowFuse Expert included in FlowFuse?',
        answer: 'Yes. Every FlowFuse product, Edge, Hub and Fleet, includes FlowFuse Expert, and it is installed automatically in every hosted and remote instance. On self-hosted installations it needs an Enterprise license.',
    },
]

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
])

// The message runs in one order down the page: it does the work, it can already
// reach the plant, it cannot move without you, and it stays yours. Keep new
// sections inside that order rather than adding a fifth argument.

// LAND: the difference from general-purpose AI assistants, shown as two short
// sequences. The generic side leans negative on purpose: the point is the handoff.
const GENERIC_STEPS = [
    'You describe a problem',
    'It tries to create a solution',
    'You copy it and hope it works',
    'Someone has to pick up the pieces later',
]
const FLOWFUSE_STEPS = [
    'Works in the flows already wired to your machines',
    'Builds the change',
    'You review and approve it',
    'Ships it to every site that needs it',
]
// For engineers: the work it takes off them. Never framed as headcount.
const TEDIOUS_WORK = [
    'Configuring the same flow forty times',
    'Hand-typing a shift report from data you already have',
    'Copying tag lists between systems',
    'Reverse-engineering a flow someone left in 2019',
    'Watching twenty small changes wait a quarter to ship',
]

// What a connected agent actually builds, in place of the starter prompts this page
// used to carry. The prompts carousel still lives on the blog post that embeds it.
// `title` is the YouTube title, used for the embed's accessible name; `label` is the
// shorter caption shown under each video. The automotive build sits in the middle so
// the two manufacturing examples are spread out rather than side by side.
const BUILD_VIDEOS = [
    { id: '2e8-CXt-RsM', label: 'Send machine alerts from any PLC to Slack', duration: '14 min', title: 'Machine Alerts in Slack, From Legacy PLCs to New Equipment I Built in 14 minutes' },
    { id: 'kPBLW-kMfsg', label: 'Build an automotive torque monitoring app', duration: '68 min', title: 'Industrial AI Agent Builds a Torque Monitoring App in 68 Minutes | FlowFuse + Claude MCP' },
    { id: 'dgwB7oFL_YY', label: 'Build an OEE monitoring app for any line', duration: '44 min', title: 'Industrial AI Agent Builds an OEE Monitoring App in 44 Minutes | FlowFuse + Claude MCP' },
]

// BELIEVE: what the AI can reach. Protocol list matches the certified OT nodes and
// the Device Agent page; "5,000+" is the figure the rest of the site uses. Each
// pill links to the deepest page the site has on it, and where the Device Agent
// page links the same protocol, it uses the same target so the two stay in step.
const PROTOCOLS = [
    { label: 'OPC UA', href: '/integrations/opcua/' },
    { label: 'Modbus TCP & RTU', href: '/docs/flowfuse-nodes/edge/modbus/' },
    { label: 'EtherNet/IP', href: '/blog/2025/10/using-ethernet-ip-with-flowfuse/' },
    { label: 'Siemens S7', href: '/docs/flowfuse-nodes/edge/s7/' },
    { label: 'MQTT', href: '/blog/2024/06/how-to-use-mqtt-in-node-red/' },
    { label: 'RTSP cameras', href: '/blog/2026/06/process-rtsp-camera-feeds-at-the-edge/' },
    { label: 'REST', href: '/docs/node-red/integration-technologies/rest/' },
    { label: 'SQL', href: '/docs/node-red/database/mysql/' },
    { label: 'Kafka', href: '/blog/2024/03/using-kafka-with-node-red/' },
    { label: '5,000+ Node-RED nodes', href: '/integrations/' },
]
const REACH = [
    { icon: 'i-lucide-factory', title: 'Brownfield first', description: 'Works with your existing PLCs, MES, ERP and SCADA. Nothing gets ripped out.' },
    { icon: 'i-lucide-cpu', title: 'Already at the edge', description: 'The Device Agent runs next to the machine, outbound only, and keeps flows running if the link drops.' },
    { icon: 'i-lucide-network', title: 'Every site at once', description: 'Device groups and pipelines take one approved change to the whole fleet.' },
]

const CAPABILITY_INTRO = {
    title: 'Where AI fits in <span class="text-indigo-600">your operations</span>',
    subtitle: 'Build, operate and connect AI on one governed platform.',
}

// NOTE: Predictive analytics and Edge ML are intentionally omitted from public
// claims (not shipped / not on the roadmap). Do not add them here without product
// sign-off.
//
// Three cards side by side rather than eleven full-width rows: one sentence per
// capability, so the section reads as an overview a person can take in at once.
// `note` is the qualification for external agents, where a capability does not
// behave the same as with Expert. `badge` marks anything not yet generally available.
const CAPABILITY_GROUPS = [
    {
        id: 'build',
        eyebrow: 'Build',
        title: 'Accelerate engineering',
        subtitle: 'FlowFuse Expert, right in the editor.',
        items: [
            { icon: 'i-lucide-sparkles', name: 'AI-assisted engineering', description: `Generate and explain <a href="/node-red/" class="${LINK}">Node-RED</a> flows from plain language.` },
            { icon: 'i-lucide-wand-sparkles', name: 'Prompt-to-app', description: 'Describe an app and get a working first draft.' },
            { icon: 'i-lucide-bot', name: 'Build your own AI agents', description: `Start from an <a href="/blueprints/ai/llm-chat-agent/" class="${LINK}">LLM</a> or <a href="/blueprints/ai/rag-chat-agent/" class="${LINK}">RAG</a> agent blueprint.` },
            { icon: 'i-lucide-book-open', name: 'Built-in product knowledge', description: 'Answers from the FlowFuse and Node-RED docs.' },
        ],
    },
    {
        id: 'operate',
        eyebrow: 'Operate',
        title: 'Operate with AI, safely',
        subtitle: 'AI on live systems, behind your controls.',
        items: [
            { icon: 'i-lucide-shield-check', name: 'Platform Automations', description: 'Expert creates instances, takes snapshots and registers devices, asking first by default.', note: 'For external agents, the access you grant is the control.' },
            { icon: 'i-lucide-message-circle-question', name: 'Ask your plant anything', description: `Ask questions of live data through <a href="/docs/flowfuse-nodes/mcp/" class="${LINK}">MCP servers</a> you build in your flows.` },
            { icon: 'i-lucide-scan-eye', name: 'Automated visual inspection', description: `Run <a href="/docs/flowfuse-nodes/ai/onnx/" class="${LINK}">ONNX</a> vision models on <a href="/docs/flowfuse-nodes/edge/rtsp/" class="${LINK}">RTSP</a> cameras at the edge.` },
            { icon: 'i-lucide-cpu', name: 'LLMs inside your flows', description: `Use OpenAI, Anthropic, Gemini or Ollama via <a href="/docs/flowfuse-nodes/ai/llm-nodes/" class="${LINK}">certified LLM nodes</a>.` },
        ],
    },
    {
        id: 'connect',
        eyebrow: 'Connect',
        title: 'Connect your own agent',
        subtitle: 'Your approved agent, on a boundary you set.',
        items: [
            { icon: 'i-lucide-plug', name: 'Bring your own AI agent', description: `Connect Copilot, ChatGPT, Claude or a local model <a href="/docs/user/mcp/" class="${LINK}">over MCP</a>.` },
            { icon: 'i-lucide-lock', name: 'You decide what it reaches', description: 'Grant Read, Write or Destructive access, team by team.' },
            { icon: 'i-lucide-wrench', name: 'Expose your own tools', description: `Turn flows into <a href="/docs/flowfuse-nodes/mcp/" class="${LINK}">MCP servers</a> agents can call.`, note: 'Support varies by external agent.' },
        ],
    },
]

// TRUST: what holds the AI back. Each tile is a claim the docs back as written.
const GOVERNANCE = [
    { icon: 'i-lucide-lock', title: 'Access you grant, checked every call', description: 'Read, Write or Destructive, team by team. A call beyond the grant is refused.' },
    { icon: 'i-lucide-hand', title: 'Asks before it changes anything', description: 'By default, Expert shows the exact change and waits for your approval.' },
    { icon: 'i-lucide-rocket', title: 'Nothing goes live on its own', description: 'Agent deploy stays off until a team owner turns it on.' },
    { icon: 'i-lucide-clipboard-check', title: 'On the record, and reversible', description: 'The audit log marks every action via Expert or via MCP. Snapshots roll back any change.' },
]

// OWNERSHIP: independence and data handling as one list, so it reads as "and it
// stays yours" straight after the proof. Say what we are not (a hardware vendor),
// never what nobody owns. Data claims follow docs/user/expert/index.md.
const OWNERSHIP = [
    { icon: 'i-lucide-git-branch', title: 'Open at the core', description: 'Built on Node-RED and an Apache-2.0 core. Your flows are portable JSON.' },
    { icon: 'i-lucide-cog', title: 'Any vendor\'s equipment', description: 'Siemens, Rockwell, Schneider or a 20-year-old PLC. We sell no hardware, so we take no sides.' },
    { icon: 'i-lucide-sparkles', title: 'Any model, any agent', description: 'Expert, Copilot, ChatGPT or Claude, or keep inference local with Ollama and ONNX.' },
    { icon: 'i-lucide-server', title: 'Runs where you do', description: 'FlowFuse Cloud in the EU, your own data centre, or fully air-gapped on-prem.' },
    { icon: 'i-lucide-eye', title: 'You choose the context', description: 'Expert only sees the flows, palette or logs you share with it.' },
    { icon: 'i-lucide-shield-off', title: 'Never used for training', description: 'No FlowFuse data trains third-party models. OpenAI deletes API data after 30 days.' },
]

// PROOF: platform results from published customer stories. None of these are AI
// results and the copy must not imply they are - no customer story mentions AI yet.
const RESULTS = [
    { logo: '/images/stories/logos/walter-logo.png', brand: 'Walter Tools', number: '1 → 130+', text: 'instances, run by the same seven-person IT team', href: '/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/' },
    { logo: '/images/stories/logos/aperia-technologies.png', brand: 'Aperia Technologies', number: 'Minutes', text: 'to ship a torque spec to 15 controllers across 5 lines, once done station by station', href: '/customer-stories/aperia-technologies-plc-replacement/' },
    { logo: '/images/home-logos/energinet-logo.png', brand: 'Energinet', number: '7,000 km', text: 'of grid data, governed by a small team', href: '/customer-stories/energinet-streamlining-critical-infrastructure-data-management/' },
]

</script>

<template>
  <div class="w-full">
    <!-- HERO: names the category and makes the one promise. The argument lives in
         the sections below it; the hero never argues. The eyebrow keeps the page's
         search phrase in visible copy now that the h1 no longer carries it.
         No bg-white: the layout's main already paints .gradient-bg. -->
    <section class="w-full relative">
      <div class="relative z-10 w-full px-6 pt-12 md:pt-24 pb-0">
        <div class="sm:max-w-screen-lg mt-6 sm:mt-12 mx-auto">
          <div class="container m-auto text-left max-w-screen-lg">
            <div class="max-w-3xl mx-auto text-center">
              <p class="m-0 mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">AI for industrial applications</p>
              <h1 class="font-medium home m-auto text-gray-900 mb-6 max-w-2xl">
                The Industrial AI that <span class="text-indigo-600">does the work.</span>
              </h1>
              <p class="text-xl md:text-2xl font-medium text-gray-800 max-w-2xl mx-auto mb-6">
                Builds the change. Ships it to every site. Nothing reaches a machine until you allow it.
              </p>
              <p class="max-w-2xl mx-auto text-gray-600">
                Use FlowFuse Expert, or bring the agent your company already approved. Either way it works in your flows, on your permissions, in your audit log.
              </p>
              <!-- Two audiences, two doors: the demo for whoever signs off, the setup
                   steps for the engineer who wants to try it now. -->
              <div class="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
                <CtaBookDemo variant="highlight" position="hero" />
                <a
                  href="#connect"
                  class="inline-flex items-center gap-2 font-medium text-indigo-600 no-underline hover:text-indigo-800"
                  @click="capture('cta-ai-connect', { position: 'hero' })"
                >
                  Connect your agent
                  <UIcon name="i-lucide-arrow-down" class="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <!-- PRODUCT SHOT: the Claude connector recording, straight under the
                 headline so the page opens on the product doing the thing the h1
                 claims, consent screen included. Sharp and framed rather than a faded
                 backdrop: it is the proof, so it has to be readable.
                 Autoplaying muted loop. The controls stay on because at 57 seconds
                 moving content needs a way to stop it. WebM only, no MP4 fallback:
                 full WebM support starts at Safari 16 / iOS 17.4, which leaves about
                 1.1% of users with the poster, against 1.9MB for an H.264 copy. Kept
                 as a <source> with a type so a browser that cannot play WebM never
                 fetches it. The recording has no audio track, so muted is also the
                 truth, and playsinline stops iOS taking it fullscreen.
                 The frame is the wrapper, not the video, and it clips: Chrome draws
                 its control bar in shadow DOM and ignores a radius on the video. -->
            <div class="mt-12 overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-2xl">
              <video
                class="block w-full"
                poster="/images/ai/demo-claude-connector-poster.jpg"
                width="1562"
                height="1080"
                autoplay
                loop
                muted
                playsinline
                controls
                aria-label="Screen recording: Claude adds the FlowFuse connector from its connector directory, signs in, is granted access on the FlowFuse consent screen, and then answers which instances are running, listing five hosted Node-RED instances."
              >
                <source src="/images/ai/demo-claude-connector.webm" type="video/webm">
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LOGOS: the shared customer marquee. These are platform customers; nothing
         here says they use the AI. -->
    <div class="w-full px-6 pt-8">
      <SocialProof eyebrow="Trusted by companies across the globe" />
    </div>

    <!-- LAND: it does the work. The contrast with insight-only AI is the reason to
         buy, so it comes before anything about how. -->
    <section class="w-full px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-3xl">
          <h2 class="m-0">Not a recommendation. <span class="text-indigo-600">A deployed change.</span></h2>
          <p class="mt-3 text-gray-600">Most industrial AI stops at advice. FlowFuse AI works in the software that already runs your plant, so what it hands you is the finished change.</p>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p class="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Generalized AI</p>
            <ol class="m-0 mt-5 list-none space-y-3 p-0">
              <li v-for="(step, i) in GENERIC_STEPS" :key="step" class="m-0 flex items-start gap-3 text-gray-500">
                <span class="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full border border-gray-300 font-mono text-xs">{{ i + 1 }}</span>
                <span>{{ step }}</span>
              </li>
            </ol>
          </div>
          <div class="rounded-xl border border-indigo-200 bg-white p-6 shadow-sm">
            <p class="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">FlowFuse AI</p>
            <ol class="m-0 mt-5 list-none space-y-3 p-0">
              <li v-for="(step, i) in FLOWFUSE_STEPS" :key="step" class="m-0 flex items-start gap-3 text-gray-900">
                <span class="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-indigo-600 font-mono text-xs text-white">{{ i + 1 }}</span>
                <span>{{ step }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- START: the agent picker and what it builds. The hero's "Connect your agent"
         link lands here. -->
    <section id="connect" class="w-full px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 scroll-mt-16" aria-labelledby="ai-connect-title">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-3xl">
          <h2 id="ai-connect-title" class="m-0">Start <span class="text-indigo-600">in minutes</span></h2>
          <p class="mt-3 text-gray-600">Pick your agent. Three steps and it's building in your workspace.</p>
        </div>
        <!-- CONNECTOR: pick your agent, then three steps specific to it, so the
             reader only sees the instructions that apply to them. -->
        <AgentSetupTabs class="mt-8" />

        <!-- What a connected agent builds, straight after the picker: how to
             connect, then what it looks like in practice. Carded with the same
             tinted header rail as the agent picker, so the two read as one family. -->
        <section class="mt-8 overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm" aria-labelledby="ai-build-videos">
          <div class="border-b border-indigo-100 bg-indigo-50/60 px-4 py-3">
            <h3 id="ai-build-videos" class="m-0 font-mono text-xs font-semibold uppercase leading-4 tracking-[0.04em] text-indigo-600">
              Watch AI build real industrial applications from start to finish
            </h3>
          </div>
          <ul class="m-0 grid list-none grid-cols-1 gap-6 p-4 md:grid-cols-3 md:p-5">
            <li v-for="video in BUILD_VIDEOS" :key="video.id" class="m-0 flex flex-col gap-3">
              <!-- height auto lets lite-youtube's own 16:9 ratio size the frame, in
                   place of the component's fixed 480px, which suits a full-width
                   blog hero but not a third of a column. -->
              <LiteYoutube
                :videoid="video.id"
                :title="video.title"
                :poster="`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`"
                class="overflow-hidden rounded-lg"
                style="height: auto; max-width: none; background-size: cover; background-position: center;"
              />
              <p class="m-0 text-sm font-medium text-gray-900">
                {{ video.label }}
                <span class="block mt-1 text-xs font-normal text-gray-500">Built in {{ video.duration }}</span>
              </p>
            </li>
          </ul>
        </section>
      </div>
    </section>

    <!-- BELIEVE: why it can do the work. It is already holding the wire, so it can
         take the repetitive work off your engineers. -->
    <section class="w-full px-6 pt-12 pb-16 sm:pt-16 sm:pb-24" aria-labelledby="ai-reach-title">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-3xl">
          <h2 id="ai-reach-title" class="m-0">Already wired <span class="text-indigo-600">to your plant</span></h2>
          <p class="mt-3 text-gray-600">AI is only as useful as what it can reach. FlowFuse runs on Node-RED, which already talks to the equipment you have, from new lines to decades-old PLCs.</p>
        </div>
        <!-- Two halves of one argument: what it can reach on the left, and so what
             it can take off your engineers on the right. -->
        <div class="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <ul class="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Supported protocols and systems">
              <li v-for="protocol in PROTOCOLS" :key="protocol.label" class="m-0">
                <NuxtLink
                  :to="protocol.href"
                  class="inline-flex items-center rounded-full border border-indigo-100 bg-white px-3 py-1 text-sm font-medium text-gray-700 no-underline transition-colors duration-150 hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 hover:no-underline"
                >{{ protocol.label }}</NuxtLink>
              </li>
            </ul>
            <div class="mt-8 flex flex-col gap-6">
              <div v-for="item in REACH" :key="item.title" class="flex gap-3">
                <UIcon :name="item.icon" class="mt-0.5 size-6 flex-none text-indigo-600" aria-hidden="true" />
                <div>
                  <p class="m-0 font-medium text-gray-900">{{ item.title }}</p>
                  <p class="m-0 mt-1 text-sm text-gray-600">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white p-6 shadow-sm">
            <h3 class="m-0 text-xl font-medium text-gray-900 leading-snug">FlowFuse AI does the work nobody became an engineer to do</h3>
            <p class="m-0 mt-2 text-sm text-gray-600">You can build your solution without having to waste time on boilerplate or endlessly repeating configurations.</p>
            <ul class="m-0 mt-4 list-none p-0">
              <li v-for="item in TEDIOUS_WORK" :key="item" class="m-0 flex items-center gap-3 border-b border-indigo-50 py-3 text-gray-700 last:border-b-0 last:pb-0">
                <UIcon name="i-lucide-x" class="size-4 flex-none text-red-400" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CAPABILITIES: every AI use case, grouped by how it shows up in operations,
         as three cards side by side so the whole set fits on about one screen.
         Below lg the cards stack. -->
    <div id="capabilities" class="w-full px-6 py-12 sm:py-16 bg-indigo-50/60 border-t border-gray-100 scroll-mt-16">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-3xl">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 class="w-full" v-html="CAPABILITY_INTRO.title" />
          <p class="mt-3 text-gray-600">{{ CAPABILITY_INTRO.subtitle }}</p>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section
            v-for="(group, gi) in CAPABILITY_GROUPS"
            :id="`cap-${group.id}`"
            :key="group.id"
            class="flex flex-col rounded-xl border border-indigo-100 bg-white p-6 shadow-sm scroll-mt-24"
            :aria-labelledby="`cap-${group.id}-title`"
          >
            <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 m-0">
              <span class="font-mono">0{{ gi + 1 }}</span>
              <span>{{ group.eyebrow }}</span>
            </p>
            <h3 :id="`cap-${group.id}-title`" class="text-xl font-medium text-gray-900 leading-snug mt-2 mb-0">{{ group.title }}</h3>
            <p class="text-sm text-gray-600 mt-2 mb-0">{{ group.subtitle }}</p>
            <ul class="m-0 mt-5 list-none border-t border-indigo-100 p-0">
              <li v-for="item in group.items" :key="item.name" class="m-0 flex gap-3 border-b border-indigo-50 py-4 last:border-b-0 last:pb-0">
                <UIcon :name="item.icon" class="mt-0.5 size-5 flex-none text-indigo-600" aria-hidden="true" />
                <div class="min-w-0">
                  <p class="m-0 flex flex-wrap items-center gap-2 font-medium text-gray-900">
                    {{ item.name }}
                    <span v-if="item.badge" class="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-amber-700">{{ item.badge }}</span>
                  </p>
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <p class="m-0 mt-1 text-sm text-gray-600" v-html="item.description" />
                  <p v-if="item.note" class="ff-cap-differs m-0 mt-2 !text-xs">{{ item.note }}</p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>

    <!-- TRUST: it can't move without you. Governance only; data handling and
         independence follow the proof, as what keeps the platform yours. -->
    <section class="ff-ai-governance w-full px-6 pt-16 pb-16 sm:pt-24 sm:pb-24" aria-labelledby="ai-trust-title">
      <div class="md:max-w-screen-lg m-auto ff-blue-card pt-12 pb-12 px-6 md:px-10">
        <div class="text-center max-w-3xl mx-auto">
          <h2 id="ai-trust-title" class="w-full m-0">It can't move <span class="text-indigo-600">without you</span></h2>
          <p class="mt-3 text-gray-600">Every AI action runs through the same platform that governs your teams.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-12">
          <div v-for="tile in GOVERNANCE" :key="tile.title" class="flex flex-col items-center text-center gap-3">
            <UIcon :name="tile.icon" class="size-8 text-indigo-600" aria-hidden="true" />
            <p class="font-medium text-indigo-700 m-0">{{ tile.title }}</p>
            <p class="text-sm text-gray-600 font-light m-0">{{ tile.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PROOF: platform results from published stories, labelled as platform
         results. The AI works on this platform; these are not AI case studies.
         Then why it stays yours, then a customer quote that says the same. -->
    <section class="w-full px-6 py-12 sm:py-16 bg-indigo-50/60 border-t border-gray-100" aria-labelledby="ai-proof-title">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-3xl">
          <h2 id="ai-proof-title" class="m-0">The platform it runs on, <span class="text-indigo-600">in production today</span></h2>
          <p class="mt-3 text-gray-600">FlowFuse AI works in the same platform these teams already run their plants on.</p>
        </div>
        <ul class="m-0 mt-10 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
          <li v-for="result in RESULTS" :key="result.brand" class="m-0">
            <a :href="result.href" class="group flex h-full flex-col rounded-xl border border-indigo-100 bg-white p-6 no-underline shadow-sm transition hover:border-indigo-300 hover:no-underline">
              <img :src="result.logo" :alt="result.brand" class="h-8 w-auto max-w-40 self-start object-contain object-left">
              <p class="m-0 mt-6 text-4xl font-semibold text-indigo-600">{{ result.number }}</p>
              <p class="m-0 mt-2 text-gray-600">{{ result.text }}</p>
              <span class="mt-auto pt-6 text-sm font-semibold text-indigo-600 group-hover:text-indigo-800">Read the {{ result.brand }} story &rarr;</span>
            </a>
          </li>
        </ul>
        <!-- Then why it stays yours, then a customer saying so. -->
        <div class="mt-16 border-t border-indigo-200/70 pt-12">
          <h3 class="m-0 text-2xl md:text-3xl font-medium text-gray-900 leading-snug">Still yours <span class="text-indigo-600">in ten years</span></h3>
          <p class="m-0 mt-3 text-gray-600">No hardware to sell you, no model to lock you into, and your data under your control. SOC 2 Type I and II audited.</p>
          <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in OWNERSHIP" :key="item.title" class="flex gap-3">
              <UIcon :name="item.icon" class="mt-0.5 size-6 flex-none text-indigo-600" aria-hidden="true" />
              <div>
                <p class="m-0 font-medium text-gray-900">{{ item.title }}</p>
                <p class="m-0 mt-1 text-sm text-gray-600">{{ item.description }}</p>
              </div>
            </div>
          </div>
          <p class="m-0 mt-8 flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
            <a href="/docs/user/expert/#data-privacy" :class="LINK">Read the Expert data privacy notes</a>
            <a href="/platform/security/" :class="LINK">See security and compliance details</a>
          </p>
        </div>
        <QuoteBlock
          class="mt-14"
          quote="FlowFuse removes most of our concerns about scalability and reliability. It's also making it a lot easier for us to complete security audits for our customers. FlowFuse's stack is open, widely used and well documented which gives auditors confidence in our applications built on your platform."
          author="Alan Yeung"
          role="CTO, Power Workplace"
          result="Read the Power Workplace story."
          result-link-text="Power Workplace story"
          result-href="/customer-stories/node-red-building-management/"
        />
        <p class="m-0 mt-10 text-gray-600">
          More worked examples, and the thinking behind them, on the
          <a href="/blog/ai/" :class="LINK">FlowFuse AI blog</a>.
        </p>
      </div>
    </section>

    <!-- FINAL CTA: the same block that closes /product/, so the two pages end the
         same way rather than each inventing a sign-off. -->
    <div class="w-full px-6 py-12 sm:py-16">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-4xl sm:text-5xl font-medium m-0">See it do the work</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Bring one change your team keeps putting off. We'll show you FlowFuse AI building it, behind your approvals.</p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="get-started" />
            <CtaPricing variant="ghost" color="white" position="get-started" icon="i-lucide-arrow-right" />
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ: the questions are also emitted as FAQPage structured data by
         useSchemaOrg above, off the same array. -->
    <div class="w-full px-6 py-12 sm:py-16 bg-indigo-50/50">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-8">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <!-- The shared accordion, same as the blog and customer stories. It carries
             the #faqs anchor itself, so the wrapper above no longer sets one. -->
        <Faq :faq="FAQ" />
      </div>
    </div>
  </div>
</template>
