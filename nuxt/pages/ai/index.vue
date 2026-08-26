<script setup lang="ts">
// Ported from src/ai.njk (11ty), which this replaces. Same page, same copy, same
// classes from src/css/style.css, which nuxt.config.ts already links here.
//
// What the port changes on purpose:
//  - The two hand-rolled DOM scripts (agent tabs, showcase rotation) become
//    reactive state. That was ~120 lines of querySelectorAll in the .njk.
//  - The copy button becomes <FfCommand>, shared with the changelog and any other
//    markdown page, instead of markup plus a copy helper pasted per page.
//  - jsonld.njk's meta.faq becomes useSchemaOrg, which escapes properly. The 11ty
//    partial interpolated answers straight into a JSON string.
//  - Sign-up buttons become <CtaSignUp>, so the copy is the site's fixed "Try it
//    out" and the event is the unified cta-sign-up. The .njk had bespoke labels
//    ("Start a free trial", "GET STARTED") and reused cta-try-it-out.
useSeoMeta({
    title: 'AI for Industrial Applications: Governed AI for Industry',
    description: 'AI for industrial applications, without losing control: use FlowFuse Expert, or connect Copilot, ChatGPT, Claude or a local model to your operations.',
    ogUrl: 'https://flowfuse.com/ai/',
    twitterSite: '@FlowFuseinc',
})

const capture = useCapture()

const LINK = 'text-indigo-600 hover:text-indigo-800 underline'

// Icons are the repo's own SVGs, inlined the way src/ai.njk did with
// {% include %}. UIcon was tried first and four of the six lucide names had no
// CSS rule emitted at all (no local @iconify-json collection to resolve them
// from), so those tiles rendered as empty spans. These carry stroke="currentColor"
// so the tab glyph still turns white when its tab is active.
const ICON = {
    lock: "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' width='100%' height='100%'> <path stroke-linecap='round' stroke-linejoin='round' d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z' /> </svg>",
    shieldCheck: "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' width='100%' height='100%'> <path stroke-linecap='round' stroke-linejoin='round' d='M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z' /> </svg>",
    checkCircle: "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' width='100%' height='100%'> <path stroke-linecap='round' stroke-linejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /> </svg>",
    clipboardCheck: "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' width='100%' height='100%'> <path stroke-linecap='round' stroke-linejoin='round' d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75' /> </svg>",
    serverStack: "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' width='100%' height='100%'> <path stroke-linecap='round' stroke-linejoin='round' d='M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z' /> </svg>",
    chevronDown: "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-5 h-5 ff-icon--down'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/></svg>",
}


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
        question: 'Can I use my own AI agent with FlowFuse?',
        answer: 'Yes. FlowFuse acts as an MCP server, so Microsoft Copilot, ChatGPT, Claude, Gemini or a local model can connect to it and work your platform. You add one address, sign in, and choose which teams the agent may act on and whether it has editing rights or read access only. Because the agent is yours, so is the model behind it.',
    },
    {
        question: 'How do you keep AI from making changes you did not approve?',
        answer: 'Every AI action runs through the same permissions and role-based access control that govern your teams, enforced on every call, so a read-only grant is refused whatever the agent tries. No agent can delete an instance, an application, a snapshot or a team, deploying stays with a person, and every action is logged and attributed in the audit log.',
    },
]

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: item.answer })),
])

const ENDPOINT = 'https://app.flowfuse.com/mcp'
const ENDPOINT_NOTE = 'Self-hosted, use your own platform address.'

const STEP1 = {
    title: 'Copy the FlowFuse connector URL',
    description: 'You will paste this into your agent in the next step.',
}
const STEP3 = {
    title: 'Sign in and choose what it reaches',
    description: 'Which teams the agent may act on, and whether it has editing rights or read access only.',
}

// A client renders `logo` as a brand mark when set, `icon` as our own glyph when not.
// A brand mark keeps its own colours so it stays an <img>; the glyph inherits
// currentColor and turns white with the label when its tab is active.
const CLIENTS = [
    {
        id: 'expert',
        logo: '/images/ai/agents/flowfuse-expert.svg',
        name: 'FlowFuse Expert',
        builtIn: true,
        step1Title: 'Sign in to FlowFuse',
        step1Body: 'A new account puts you in a hosted instance with Expert already in the editor. Nothing to add, no connector, no token.',
        step2Title: 'Or start with the Device Agent',
        step2Body: 'Already running Node-RED on your own hardware? Connect it as a remote instance and Expert works there in the same way.',
        step2Label: 'Install the Device Agent',
        step2Url: '/docs/device-agent/quickstart/',
        step3Title: 'Ask for what you need',
        step3Body: 'Build a flow, explain one you inherited, write the Function node, or ask what is running on the floor. Every write waits for you to approve, edit or reject.',
        noStep3Cta: true,
    },
    {
        id: 'copilot',
        logo: '/images/ai/agents/microsoft-copilot.svg',
        name: 'Microsoft Copilot',
        step2Title: 'Copilot Studio, Tools, Add a tool',
        step2Body: 'Choose Model Context Protocol and paste the URL. Describe what it is for: the orchestrator reads that to decide when to call it.',
        step2Label: 'Open Copilot Studio',
        step2Url: 'https://copilotstudio.microsoft.com/',
    },
    {
        id: 'chatgpt',
        logo: '/images/ai/agents/chatgpt.svg',
        name: 'ChatGPT',
        step2Title: 'Settings, Connectors',
        step2Body: 'An administrator enables custom connectors first, under Permissions and Roles.',
        step2Label: 'Open ChatGPT',
        step2Url: 'https://chatgpt.com/',
    },
    {
        id: 'claude',
        logo: '/images/ai/agents/claude.svg',
        name: 'Claude',
        step2Title: 'Settings, Customize, Connectors',
        step2Body: 'Add a custom connector and paste the URL. On Team and Enterprise an owner adds it once for everyone.',
        step2Label: 'Open Claude connectors',
        step2Url: 'https://claude.ai/settings/connectors',
    },
    {
        id: 'gemini',
        logo: '/images/ai/agents/gemini.svg',
        name: 'Gemini',
        step2Title: 'Settings, Manage team, Connected apps',
        step2Body: 'Add the FlowFuse URL as an MCP server.',
        step2Label: 'Open Gemini',
        step2Url: 'https://gemini.google.com/',
    },
    {
        id: 'local',
        icon: ICON.serverStack,
        name: 'Local and Custom Agents',
        step2Title: "Your MCP client's config",
        step2Body: 'Any MCP-capable client works, pointed at your own model, so nothing has to leave your network.',
        step2Label: 'See the documentation',
        step2Url: '/docs/user/expert/third-party-agents/#local-and-self-hosted-models',
    },
]

const CODING_NOTE = 'Command-line and editor agents such as Claude Code, Cursor, Visual Studio Code and Gemini CLI connect to the same URL.'

const activeClient = ref(CLIENTS[0].id)

function selectClient (id: string) {
    activeClient.value = id
    capture('cta-ai-agent-tab', { position: id })
}

// Showcase: two views of the same platform, alternating so both get seen without
// the reader doing anything. Picking one stops the rotation for good, which is the
// expected behaviour for an auto-advancing control.
const SHOWCASE_INTERVAL = 6000
const SLIDES = [
    {
        id: 'expert',
        label: 'FlowFuse Expert',
        media: '/images/ai/schematic-expert.svg',
        mediaAlt: 'FlowFuse Expert sits inside the FlowFuse platform and Node-RED, as part of it.',
    },
    {
        id: 'external',
        label: 'Your own agent',
        media: '/images/ai/schematic-external.svg',
        mediaAlt: 'An external AI agent stays its own thing and overlaps the FlowFuse platform and Node-RED, reaching into it.',
    },
]

const activeSlide = ref(SLIDES[0].id)
const rotating = ref(false)
// Bumped on every switch so the fill animation restarts from zero. Vue reuses the
// element, so re-adding a class alone would not retrigger the CSS animation.
const fillKey = ref(0)
let slideTimer: ReturnType<typeof setInterval> | undefined

function stopRotation () {
    if (slideTimer) { clearInterval(slideTimer); slideTimer = undefined }
    rotating.value = false
}

function selectSlide (id: string) {
    stopRotation()
    activeSlide.value = id
}

onMounted(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    rotating.value = true
    fillKey.value++
    slideTimer = setInterval(() => {
        const next = (SLIDES.findIndex(s => s.id === activeSlide.value) + 1) % SLIDES.length
        activeSlide.value = SLIDES[next].id
        fillKey.value++
    }, SHOWCASE_INTERVAL)
})

onUnmounted(stopRotation)

const GOVERNANCE = {
    title: 'AI Governance you can <span class="text-indigo-600">prove</span>',
    subtitle: 'The control plane every AI action runs through, the same one that governs your teams.',
    items: [
        { icon: ICON.lock, title: 'Only the teams you grant', description: 'AI reaches the teams you allow and nothing else, enforced by the platform on every call.' },
        { icon: ICON.shieldCheck, title: 'Role-based access', description: 'The same RBAC that governs your teams governs what AI can see and do.' },
        { icon: ICON.checkCircle, title: 'Nothing gets deleted', description: 'No agent can remove an instance, an application, a snapshot or a team. There is no tool for it.' },
        { icon: ICON.clipboardCheck, title: 'Audit on everything', description: 'Every action AI takes is logged and attributed, so you can show exactly what happened and when.' },
    ],
}

const CAPABILITY_INTRO = {
    title: 'Every way AI shows up in <span class="text-indigo-600">your operations</span>',
    subtitle: 'From accelerating how you build, to acting inside live flows, to connecting the AI your company already trusts. Each one runs on the same governed platform.',
}

// NOTE: Predictive analytics and Edge ML are intentionally omitted from public
// claims (not shipped / not on the roadmap). Do not add them here without product
// sign-off. `media` is an empty slot per item until the assets exist.
const CAPABILITY_GROUPS = [
    {
        title: 'Accelerate engineering',
        eyebrow: 'Build',
        subtitle: 'FlowFuse Expert turns intent into working industrial applications, right in the editor.',
        items: [
            { name: 'AI-assisted engineering', description: `Generate and edit <a href="/node-red/" class="${LINK}">Node-RED</a> flows, Function node JavaScript, SQL queries and dashboard UI from plain language, and ask Expert to explain any existing flow so any engineer can pick it up. It works inline in the editor your team already uses, so there is no separate tool to context-switch into. That turns unfamiliar or inherited flows into something the whole team can read and maintain.` },
            { name: 'Prompt-to-app', description: 'Describe the application you need and FlowFuse Expert agentically builds the starting flows and logic directly in your workspace. You begin from a working draft instead of a blank canvas, then refine it like any other flow. Everything it creates stays inside the platform, so the same permissions and review apply from the first node.' },
            { name: 'Build your own AI agents', description: `Start from an agent blueprint, like the <a href="/blueprints/ai/llm-chat-agent/" class="${LINK}">LLM chat agent</a> or <a href="/blueprints/ai/rag-chat-agent/" class="${LINK}">RAG chat agent</a>, to stand up a task-specific AI agent grounded in your own data, tools and context. It gives you a proven structure to adapt rather than wiring an agent up from scratch. With MCP servers you can give the agent access to anything, including your RAG applications. Because it runs on the platform, the agent operates within the access you grant it.` },
            { name: 'Built-in product knowledge', description: 'A chat assistant with answers grounded in FlowFuse and Node-RED documentation, so guidance comes from the product, not stale wikis. Ask how a node works or how to approach a build and get an answer without leaving your workspace. It shortens the path from question to working flow for new and experienced users alike.' },
        ],
    },
    {
        title: 'Operate with AI, safely',
        eyebrow: 'Operate',
        subtitle: 'AI that acts inside your flows and answers questions about live operations, always behind your controls.',
        items: [
            { name: 'Governed autonomous operations', externalNote: 'For external agents, approval cards do not apply. The access you granted is the control, enforced on every call.', description: 'Platform Automations let AI act on live systems, with every write behind an approval card, session-scoped and fully audited. A person approves, edits or rejects each proposed change before it reaches a machine. Nothing runs outside the permissions and RBAC that already govern your teams.' },
            { name: 'Ask your plant anything', externalNote: 'For external agents, whether they can reach the MCP servers you build in your own flows depends on the agent.', description: 'In Insights mode, ask questions in natural language and get answers grounded in live machine state, alarms and logs. Operators and engineers can check what is happening on the floor without building a report or querying a database by hand. Table and MQTT-broker reading are coming soon.' },
            { name: 'Automated visual inspection', description: `Run <a href="/node-red/flowfuse/ai/onxx/" class="${LINK}">ONNX</a> vision models inside flows next to the machine, with camera ingest over <a href="/node-red/flowfuse/edge/rtsp/" class="${LINK}">RTSP</a>, for inference that works offline and keeps data on your network. Detection results flow into the same logic as any other signal, so you can trigger alerts or actions from what the model sees. Running at the edge means no round trip to the cloud and no image data leaving the plant.` },
            { name: 'Use any model within flows', description: `<a href="/node-red/flowfuse/ai/llm-nodes/" class="${LINK}">Certified LLM nodes</a> bring OpenAI, Anthropic, Gemini or local models via Ollama into any flow with your own keys. Choose the provider that fits each task, or keep everything on local models when data cannot leave your network. Because you supply the keys, model access and spend stay under your control.` },
        ],
    },
    {
        title: 'Connect your own agent',
        eyebrow: 'Connect in',
        subtitle: 'The agent your company already approved, working your platform and building in Node-RED. Your agent, your model, on a boundary you set.',
        items: [
            { name: 'Bring your own AI agent', description: 'Point Microsoft Copilot, ChatGPT, Claude or a local model at FlowFuse, sign in, and it can query your teams and instances and build Node-RED applications for you. Where company policy only permits an approved AI agent, this is how that agent reaches your operations, instead of nobody getting AI on the platform at all.' },
            { name: 'You decide what it reaches', description: 'Signing in asks which teams the agent may act on and whether it may make changes at all. FlowFuse holds you to that on every call, so a read-only grant is refused whatever the agent tries. Nothing an agent reaches can delete an instance, an application, a snapshot or a team, and deploying stays yours.' },
        ],
    },
    {
        title: 'Expose your own tools',
        eyebrow: 'Send out',
        subtitle: 'The other direction. Your flows become tools that an agent can call as part of its work.',
        items: [
            { name: 'AI that uses your tools', externalNote: 'Anyone can build them. For external agents, whether they can call them depends on the agent.', description: `Build your own <a href="/node-red/flowfuse/mcp/" class="${LINK}">MCP servers</a> and let Insights-mode agents call your tools and services as part of a workflow. Wrap an internal API or system as a tool once, then let agents use it wherever it fits. The agent stays inside the workflow you designed, calling only the tools you register.` },
        ],
    },
]

const FURTHER_READING = [
    { to: '/blog/2026/03/ai-usecases-in-factory/', title: '5 Places Smart Factories Are Already Using AI' },
    { to: '/blog/2026/03/last-mile-problem-ai/', title: 'The Last Mile Problem in Industrial AI' },
    { to: '/blog/2026/06/process-rtsp-camera-feeds-at-the-edge/', title: 'Processing RTSP Camera Feeds at the Edge' },
    { to: '/blog/2026/02/motor-anomaly-detector-ai/', title: 'Building an AI Vibration Anomaly Detector for Industrial Motors' },
]

const openFaq = ref<number | null>(null)
</script>

<template>
  <div class="w-full">
    <!-- HERO: the agent picker is the primary action on this page, so it lives here
         rather than below a wall of positioning copy. -->
    <section class="w-full relative bg-white">
      <div class="relative z-10 w-full px-6 pt-12 md:pt-24 pb-10">
        <div class="sm:max-w-screen-lg mt-6 sm:mt-12 mx-auto">
          <div class="container m-auto text-left max-w-screen-lg">
            <div class="max-w-3xl mx-auto">
              <h1 class="font-medium home m-auto text-center text-gray-900 mb-6 max-w-2xl">
                <span class="text-indigo-600">AI for Industrial Applications,</span> Governed and Built-In
              </h1>
              <p class="text-center text-xl md:text-2xl font-medium text-gray-800 max-w-2xl mx-auto mb-6">
                The platform is the <span class="text-indigo-600">control plane.</span> AI is the <span class="text-indigo-600">accelerator.</span>
              </p>
              <p class="text-center max-w-4xl mx-auto text-gray-600">
                AI capability is table stakes in 2026. Governed access to your operations is the difference.
              </p>
            </div>

            <!-- CONNECTOR: pick your agent, then three steps specific to it, so the
                 reader only sees the instructions that apply to them. -->
            <div class="mt-12 border border-gray-200 bg-white">
              <div class="ff-agent-tabs flex flex-nowrap gap-1 overflow-x-auto border-b border-gray-200 p-2" role="tablist" aria-label="Choose your AI agent">
                <button
                  v-for="client in CLIENTS"
                  :id="`ff-tab-${client.id}`"
                  :key="client.id"
                  type="button"
                  role="tab"
                  :aria-controls="`ff-panel-${client.id}`"
                  :aria-selected="activeClient === client.id"
                  class="ff-agent-tab ff-btn flex flex-none items-center gap-2 whitespace-nowrap"
                  :class="activeClient === client.id ? 'ff-btn--primary' : 'text-gray-700 hover:bg-gray-100'"
                  @click="selectClient(client.id)"
                >
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span v-if="client.icon" class="flex-none w-4 h-4" aria-hidden="true" v-html="client.icon" />
                  <img v-else-if="client.logo" :src="client.logo" alt="" class="h-4 w-auto flex-none" aria-hidden="true">
                  <span>{{ client.name }}</span>
                </button>
              </div>

              <div
                v-for="client in CLIENTS"
                v-show="activeClient === client.id"
                :id="`ff-panel-${client.id}`"
                :key="`panel-${client.id}`"
                role="tabpanel"
                :aria-labelledby="`ff-tab-${client.id}`"
                class="ff-agent-panel grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-8"
              >
                <div class="flex flex-col">
                  <p class="font-mono text-xs font-semibold text-indigo-600 m-0">01</p>
                  <p class="text-lg font-medium text-gray-900 mt-2 mb-0">{{ client.builtIn ? client.step1Title : STEP1.title }}</p>
                  <p class="text-gray-600 font-light text-sm mt-2 mb-0">{{ client.builtIn ? client.step1Body : STEP1.description }}</p>
                  <div v-if="client.builtIn" class="mt-auto pt-5">
                    <CtaSignUp variant="primary" position="ai-tab-expert" />
                  </div>
                  <div v-else class="mt-auto pt-5">
                    <p class="text-xs text-gray-500 mb-2">{{ ENDPOINT_NOTE }}</p>
                    <FfCommand :command="ENDPOINT" event="cta-copy-mcp-endpoint" :position="client.id" />
                  </div>
                </div>

                <div class="flex flex-col">
                  <p class="font-mono text-xs font-semibold text-indigo-600 m-0">02</p>
                  <p class="text-lg font-medium text-gray-900 mt-2 mb-0">{{ client.step2Title }}</p>
                  <p class="text-gray-600 font-light text-sm mt-2 mb-0">{{ client.step2Body }}</p>
                  <div class="mt-auto pt-5">
                    <a
                      :href="client.step2Url"
                      class="ff-btn ff-btn--primary-outlined"
                      :target="client.step2Url.startsWith('http') ? '_blank' : undefined"
                      :rel="client.step2Url.startsWith('http') ? 'noopener' : undefined"
                      @click="capture('cta-ai-open-client', { position: client.id })"
                    >{{ client.step2Label }}</a>
                  </div>
                </div>

                <div class="flex flex-col">
                  <p class="font-mono text-xs font-semibold text-indigo-600 m-0">03</p>
                  <p class="text-lg font-medium text-gray-900 mt-2 mb-0">{{ client.step3Title || STEP3.title }}</p>
                  <p class="text-gray-600 font-light text-sm mt-2 mb-0">{{ client.step3Body || STEP3.description }}</p>
                  <div v-if="!client.noStep3Cta" class="mt-auto pt-5">
                    <CtaSignUp variant="primary" position="ai-connect-step3" />
                  </div>
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-5 mb-0">
              {{ CODING_NOTE }}
              <a href="/docs/user/expert/third-party-agents/" class="text-indigo-600 font-semibold">See the documentation</a>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SHOWCASE: one well, two views. Containment versus overlap carries the
         Expert / bring-your-own distinction in a glance. -->
    <div class="w-full bg-white px-6 pt-10 sm:pt-14 pb-8 sm:pb-10">
      <div class="md:max-w-screen-lg mx-auto" :style="{ '--ff-show-duration': `${SHOWCASE_INTERVAL}ms` }">
        <div class="ff-show-tabs" role="tablist" aria-label="Choose a view">
          <button
            v-for="slide in SLIDES"
            :id="`ff-show-tab-${slide.id}`"
            :key="slide.id"
            type="button"
            role="tab"
            :aria-controls="`ff-show-panel-${slide.id}`"
            :aria-selected="activeSlide === slide.id"
            class="ff-show-tab"
            :class="{ 'is-active': activeSlide === slide.id }"
            @click="selectSlide(slide.id)"
          >
            <span class="ff-show-tab__label">{{ slide.label }}</span>
            <span class="ff-show-tab__track">
              <span
                v-if="activeSlide === slide.id"
                :key="fillKey"
                class="ff-show-tab__fill"
                :class="rotating ? 'is-running' : 'is-full'"
              />
              <span v-else class="ff-show-tab__fill" />
            </span>
          </button>
        </div>
        <div class="ff-showcase">
          <div
            v-for="slide in SLIDES"
            v-show="activeSlide === slide.id"
            :id="`ff-show-panel-${slide.id}`"
            :key="`show-${slide.id}`"
            role="tabpanel"
            :aria-labelledby="`ff-show-tab-${slide.id}`"
            class="ff-cap-well"
          >
            <img :src="slide.media" :alt="slide.mediaAlt" class="w-full h-full object-cover" loading="lazy">
          </div>
        </div>
      </div>
    </div>

    <!-- GOVERNANCE: the control plane every AI action runs through. Path-neutral,
         which is what lets it sit above the picker rather than under Expert. -->
    <div class="w-full pt-4 pb-16 sm:pt-6 sm:pb-24 px-6">
      <div class="md:max-w-screen-lg m-auto ff-blue-card pt-12 pb-12 px-6 md:px-10">
        <div class="text-center max-w-3xl mx-auto">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 class="w-full" v-html="GOVERNANCE.title" />
          <p class="mt-3 text-gray-600">{{ GOVERNANCE.subtitle }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div v-for="tile in GOVERNANCE.items" :key="tile.title" class="flex flex-col items-center text-center gap-3">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="w-8 h-8 text-indigo-600" aria-hidden="true" v-html="tile.icon" />
            <p class="font-medium text-indigo-700 m-0">{{ tile.title }}</p>
            <p class="text-sm text-gray-600 font-light m-0">{{ tile.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CAPABILITIES: every AI use case, grouped by how it shows up in operations.
         Group headers pin on desktop and alternate sides per group. -->
    <div id="capabilities" class="w-full bg-indigo-50/60 py-16 sm:py-24 px-6 border-t border-gray-100 scroll-mt-16">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-4xl">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 class="w-full" v-html="CAPABILITY_INTRO.title" />
          <p class="mt-3 text-gray-600">{{ CAPABILITY_INTRO.subtitle }}</p>
        </div>
        <section
          v-for="(group, gi) in CAPABILITY_GROUPS"
          :key="group.title"
          class="ff-cap-group md:grid md:grid-cols-5 md:gap-x-12 lg:gap-x-16 mt-24"
          :class="{ 'pt-20 border-t border-indigo-200/70': gi > 0 }"
        >
          <div class="ff-cap-sticky md:col-span-2 max-md:mb-10" :class="{ 'md:col-start-4': (gi + 1) % 2 === 0 }">
            <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 m-0">
              <span class="font-mono text-indigo-600">0{{ gi + 1 }}</span>
              <span>{{ group.eyebrow }}</span>
            </p>
            <h3 class="text-3xl md:text-4xl font-medium text-gray-900 leading-tight mt-4 mb-0">{{ group.title }}</h3>
            <p class="text-gray-600 font-light max-w-md mt-4 mb-0">{{ group.subtitle }}</p>
          </div>
          <div class="md:col-span-3" :class="{ 'md:col-start-1 md:row-start-1': (gi + 1) % 2 === 0 }">
            <div
              v-for="(item, ii) in group.items"
              :key="item.name"
              class="ff-cap-item px-2 py-7"
              :class="ii === 0 ? 'md:pt-0' : 'mt-6 pt-14 border-t border-indigo-100'"
            >
              <!-- MEDIA WELL: a reserved 16:9 slot for a screenshot or short loop.
                   Visible while empty on purpose, so the page shows where the assets
                   go rather than reflowing when they land. -->
              <div class="ff-cap-well" />
              <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mt-5">
                <span class="text-xl font-medium text-gray-900">{{ item.name }}</span>
              </div>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p class="text-gray-600 font-light mt-2 mb-0" v-html="item.description" />
              <p v-if="item.externalNote" class="ff-cap-differs mt-3 mb-0">{{ item.externalNote }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- FURTHER READING: keeps the page from being a dead end and points at where
         the depth actually is. -->
    <div class="w-full px-6 pb-16 sm:pb-20 pt-16 sm:pt-20">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="max-md:text-center">More on <span class="text-indigo-600">industrial AI</span></h2>
        <p class="mt-3 text-gray-600 max-w-3xl">
          Worked examples and the thinking behind them, from the
          <a href="/blog/ai/" :class="LINK">FlowFuse AI blog</a>.
        </p>
        <ul class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
          <li v-for="post in FURTHER_READING" :key="post.to" class="m-0">
            <a :href="post.to" :class="LINK">{{ post.title }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- FAQ: the questions are also emitted as FAQPage structured data by
         useSchemaOrg above, off the same array. -->
    <div id="faqs" class="w-full px-6 pt-20 pb-16 bg-indigo-50/50">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-8">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <div v-for="(item, i) in FAQ" :key="item.question" class="w-full py-4" :class="{ 'border-b': i < FAQ.length - 1 }">
          <h3 class="m-0">
            <button
              type="button"
              class="flex flex-row justify-between items-center w-full m-0 p-0 gap-6 cursor-pointer text-left bg-transparent border-0 text-lg font-medium"
              :aria-expanded="openFaq === i"
              :aria-controls="`answer-${i}`"
              @click="openFaq = openFaq === i ? null : i"
            >
              <span>{{ item.question }}</span>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span
                class="w-5 h-5 shrink-0 transition-transform duration-300 ease-in-out"
                :class="{ 'rotate-180': openFaq === i }"
                aria-hidden="true"
                v-html="ICON.chevronDown"
              />
            </button>
          </h3>
          <div v-show="openFaq === i" :id="`answer-${i}`" class="px-6 mt-6">
            <p class="text-gray-600">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
