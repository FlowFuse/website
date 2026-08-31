<script setup lang="ts">
import { getAllBlogPosts } from '~/utils/sharedContent'
// Ported from src/ai.njk (11ty), which this replaces. Same page, same copy, same
// classes from src/css/style.css, which nuxt.config.ts already links here.
//
// What the port changes on purpose:
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
    description: 'AI for industrial applications, without losing control: use FlowFuse Expert, or connect Copilot, ChatGPT, Claude or a local model to your operations.',
    ogUrl: 'https://flowfuse.com/ai/',
    twitterSite: '@FlowFuseinc',
})

const capture = useCapture()

const LINK = 'text-indigo-600 hover:text-indigo-800 underline'

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
        answer: 'Yes. FlowFuse acts as an MCP server, so Microsoft Copilot, ChatGPT, Claude or a local model can connect to it and work your platform. You add one address, sign in, and choose which teams the agent may act on and whether it has editing rights or read access only. Because the agent is yours, so is the model behind it.',
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

// The Cloud address. Self-hosted platforms answer on their own domain, so the block
// takes one (host-swap) rather than telling the reader in prose to edit what they
// have just copied.
const CODING_NOTE = 'Command-line and editor agents such as Claude Code, Cursor, Visual Studio Code and Gemini CLI connect to the same URL.'

const GOVERNANCE = {
    title: 'AI Governance you can <span class="text-indigo-600">prove</span>',
    subtitle: 'The control plane every AI action runs through, the same one that governs your teams.',
    items: [
        { icon: 'i-lucide-lock', title: 'Only the teams you grant', description: 'AI reaches the teams you allow and nothing else, enforced by the platform on every call.' },
        { icon: 'i-lucide-shield-check', title: 'Role-based access', description: 'The same RBAC that governs your teams governs what AI can see and do.' },
        { icon: 'i-lucide-circle-check', title: 'Nothing gets deleted', description: 'No agent can remove an instance, an application, a snapshot or a team. There is no tool for it.' },
        { icon: 'i-lucide-clipboard-check', title: 'Audit on everything', description: 'Every action AI takes is logged and attributed, so you can show exactly what happened and when.' },
    ],
}

const CAPABILITY_INTRO = {
    title: 'Every way AI shows up in <span class="text-indigo-600">your operations</span>',
    subtitle: 'From accelerating how you build, to acting inside live flows, to connecting the AI your company already trusts. Each one runs on the same governed platform.',
}

// NOTE: Predictive analytics and Edge ML are intentionally omitted from public
// claims (not shipped / not on the roadmap). Do not add them here without product
// sign-off.
const CAPABILITY_GROUPS = [
    {
        id: 'build',
        title: 'Accelerate engineering',
        eyebrow: 'Build',
        subtitle: 'FlowFuse Expert turns intent into working industrial applications, right in the editor.',
        items: [
            { name: 'AI-assisted engineering', diagram: 'assisted-engineering', description: `Generate and edit <a href="/node-red/" class="${LINK}">Node-RED</a> flows, Function node JavaScript, SQL queries and dashboard UI from plain language, and ask Expert to explain any existing flow so any engineer can pick it up. It works inline in the editor your team already uses, so there is no separate tool to context-switch into. That turns unfamiliar or inherited flows into something the whole team can read and maintain.` },
            { name: 'Prompt-to-app', diagram: 'prompt-to-app', description: 'Describe the application you need and FlowFuse Expert agentically builds the starting flows and logic directly in your workspace. You begin from a working draft instead of a blank canvas, then refine it like any other flow. Everything it creates stays inside the platform, so the same permissions and review apply from the first node.' },
            { name: 'Build your own AI agents', diagram: 'build-agents', description: `Start from an agent blueprint, like the <a href="/blueprints/ai/llm-chat-agent/" class="${LINK}">LLM chat agent</a> or <a href="/blueprints/ai/rag-chat-agent/" class="${LINK}">RAG chat agent</a>, to stand up a task-specific AI agent grounded in your own data, tools and context. It gives you a proven structure to adapt rather than wiring an agent up from scratch. With MCP servers you can give the agent access to anything, including your RAG applications. Because it runs on the platform, the agent operates within the access you grant it.` },
            { name: 'Built-in product knowledge', diagram: 'product-knowledge', description: 'A chat assistant with answers grounded in FlowFuse and Node-RED documentation, so guidance comes from the product, not stale wikis. Ask how a node works or how to approach a build and get an answer without leaving your workspace. It shortens the path from question to working flow for new and experienced users alike.' },
        ],
    },
    {
        id: 'operate',
        title: 'Operate with AI, safely',
        eyebrow: 'Operate',
        subtitle: 'AI that acts inside your flows and answers questions about live operations, always behind your controls.',
        items: [
            { name: 'Governed autonomous operations', diagram: 'governed-operations', externalNote: 'For external agents, approval cards do not apply. The access you granted is the control, enforced on every call.', description: 'Platform Automations let AI act on live systems, with every write behind an approval card, session-scoped and fully audited. A person approves, edits or rejects each proposed change before it reaches a machine. Nothing runs outside the permissions and RBAC that already govern your teams.' },
            { name: 'Ask your plant anything', diagram: 'ask-your-plant', externalNote: 'For external agents, whether they can reach the MCP servers you build in your own flows depends on the agent.', description: 'In Insights mode, ask questions in natural language and get answers grounded in live machine state, alarms and logs. Operators and engineers can check what is happening on the floor without building a report or querying a database by hand. Table and MQTT-broker reading are coming soon.' },
            { name: 'Automated visual inspection', diagram: 'visual-inspection', description: `Run <a href="/node-red/flowfuse/ai/onxx/" class="${LINK}">ONNX</a> vision models inside flows next to the machine, with camera ingest over <a href="/node-red/flowfuse/edge/rtsp/" class="${LINK}">RTSP</a>, for inference that works offline and keeps data on your network. Detection results flow into the same logic as any other signal, so you can trigger alerts or actions from what the model sees. Running at the edge means no round trip to the cloud and no image data leaving the plant.` },
            { name: 'Use any model within flows', diagram: 'any-model', description: `<a href="/node-red/flowfuse/ai/llm-nodes/" class="${LINK}">Certified LLM nodes</a> bring OpenAI, Anthropic, Gemini or local models via Ollama into any flow with your own keys. Choose the provider that fits each task, or keep everything on local models when data cannot leave your network. Because you supply the keys, model access and spend stay under your control.` },
        ],
    },
    {
        id: 'connect',
        title: 'Connect your own agent',
        eyebrow: 'Connect',
        subtitle: 'The agent your company already approved, working your platform and building in Node-RED. Your agent, your model, on a boundary you set.',
        items: [
            { name: 'Bring your own AI agent', diagram: 'bring-your-agent', description: 'Point Microsoft Copilot, ChatGPT, Claude or a local model at FlowFuse, sign in, and it can query your teams and instances and build Node-RED applications for you. Where company policy only permits an approved AI agent, this is how that agent reaches your operations, instead of nobody getting AI on the platform at all.' },
            { name: 'You decide what it reaches', diagram: 'you-decide', description: 'Signing in asks which teams the agent may act on and whether it may make changes at all. FlowFuse holds you to that on every call, so a read-only grant is refused whatever the agent tries. Nothing an agent reaches can delete an instance, an application, a snapshot or a team, and deploying stays yours.' },
        ],
    },
    {
        id: 'expose',
        title: 'Expose your own tools',
        eyebrow: 'Expose',
        subtitle: 'The other direction. Your flows become tools that an agent can call as part of its work.',
        items: [
            { name: 'AI that uses your tools', diagram: 'your-tools', externalNote: 'Anyone can build them. For external agents, whether they can call them depends on the agent.', description: `Build your own <a href="/node-red/flowfuse/mcp/" class="${LINK}">MCP servers</a> and let Insights-mode agents call your tools and services as part of a workflow. Wrap an internal API or system as a tool once, then let agents use it wherever it fits. The agent stays inside the workflow you designed, calling only the tools you register.` },
        ],
    },
]

// Curated rather than "latest in /blog/ai/", but rendered from the real post
// records so the tiles carry the same date, image, summary and byline as every
// other post listing on the site. Titles are no longer restated here - they come
// from the posts, so they cannot drift when a post is retitled.
const FURTHER_READING_PATHS = [
    '/blog/2026/03/ai-usecases-in-factory',
    '/blog/2026/03/last-mile-problem-ai',
    '/blog/2026/06/process-rtsp-camera-feeds-at-the-edge',
    '/blog/2026/02/motor-anomaly-detector-ai',
]

const FURTHER_READING_COUNT = 3

const { data: furtherReading } = await useAsyncData('ai-further-reading', async () => {
    const all = await getAllBlogPosts()
    const byPath = new Map(all.map(entry => [String(entry.path).replace(/\/$/, ''), entry]))
    return FURTHER_READING_PATHS
        .map(path => byPath.get(path))
        .filter(Boolean)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, FURTHER_READING_COUNT)
})

// Capability group nav. Same behaviour as the product page's tier list: whichever
// group's top has last crossed the viewport midpoint is the active one, so walking
// them in DOM order and overwriting on each match leaves the deepest match winning.
// A midpoint check rather than an IntersectionObserver for the same reason it is
// there - the gaps between groups are taller than any sensible observer band, so a
// scroll through a gap would leave nothing intersecting and the marker stranded.
const activeGroup = ref(CAPABILITY_GROUPS[0].id)
const groupRefs = ref<Record<string, HTMLElement | null>>({})

function updateActiveGroup () {
    const groups = Object.entries(groupRefs.value).filter((entry): entry is [string, HTMLElement] => !!entry[1])
    if (!groups.length) return
    const mid = window.innerHeight / 2
    let current = groups[0][0]
    for (const [id, el] of groups) {
        if (el.getBoundingClientRect().top <= mid) current = id
    }
    activeGroup.value = current
}

let groupTicking = false
function onGroupScroll () {
    if (!groupTicking) { groupTicking = true; requestAnimationFrame(() => { groupTicking = false; updateActiveGroup() }) }
}

onMounted(() => {
    window.addEventListener('scroll', onGroupScroll, { passive: true })
    window.addEventListener('resize', onGroupScroll, { passive: true })
    updateActiveGroup()
})

onUnmounted(() => {
    window.removeEventListener('scroll', onGroupScroll)
    window.removeEventListener('resize', onGroupScroll)
})

</script>

<template>
  <div class="w-full">
    <!-- HERO: the agent picker is the primary action on this page, so it lives here
         rather than below a wall of positioning copy. -->
    <!-- No bg-white: the layout's main already paints .gradient-bg, a radial indigo
         wash anchored at the top right, and an opaque hero sits exactly over it. The
         connector card below keeps its own white, because that is a card. -->
    <section class="w-full relative">
      <!-- pb-0: the recording below is the picker's own result, so the space between
           them belongs to that section's pt rather than being split across a section
           boundary here. Two paddings meeting in the middle of one thread is what
           left 128px of empty gradient under the docs card. -->
      <div class="relative z-10 w-full px-6 pt-12 md:pt-24 pb-0">
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
                Use FlowFuse Expert, or bring the agent your company already approved. Both reach only the teams you allow, and every action is logged.
              </p>
            </div>

            <!-- CONNECTOR: pick your agent, then three steps specific to it, so the
                 reader only sees the instructions that apply to them. -->
            <AgentSetupTabs class="mt-12" />
            <!-- Docs pointer, not a step. Carded in the same tinted, hover-lifting
                 treatment the platform page uses for its How-it-works blocks, so it
                 reads as somewhere to go rather than as fine print under step 03.
                 The whole card is the link, which is what marks it as navigable. -->
            <a
              href="/docs/user/expert/"
              class="ff-doc-note mt-5 flex items-start gap-4 rounded-lg border border-indigo-100 bg-indigo-50/50 p-5 no-underline transition duration-300 ease-in-out hover:bg-indigo-50 hover:no-underline"
              @click="capture('cta-ai-docs', { position: 'connector-note' })"
            >
              <UIcon name="i-lucide-terminal" class="size-6 flex-none text-indigo-600" aria-hidden="true" />
              <span class="min-w-0">
                <span class="block text-sm text-gray-600">{{ CODING_NOTE }}</span>
                <span class="mt-2 block text-sm font-semibold text-indigo-600">See the documentation &rarr;</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- DEMO: the payoff of the picker above. Those three steps say how to connect
         an outside agent; this is what it looks like when you do, consent screen
         included - the part a reader does not take on faith. It also hands off to
         the governance section directly below, which is the same grant stated as a
         claim rather than shown.
         Autoplaying muted loop, the same treatment the install animation uses. The
         controls stay on for one reason: at 57 seconds this runs long enough that
         moving content needs a way to stop it, and the play/pause button is it.
         Browsers pause an offscreen muted autoplay video by themselves, so there is
         no observer here, and no preload hint either - autoplay settles that. The
         poster still earns its place as the first paint before playback starts.
         WebM only, and no MP4 fallback: full WebM support starts at Safari 16 and
         iOS 17.4, which leaves 1.1% of global users out, and an H.264 copy costs
         1.9MB to reach them - more than the WebM itself, on a video that now
         autoplays for everyone. Those readers get the poster and a play button that
         does nothing, which is the trade. Kept as a <source> with a type rather than
         src on the video so a browser that cannot play WebM never fetches it.
         The recording has no audio track at all, so muted is both the autoplay
         precondition and the truth, and playsinline stops iOS taking it fullscreen.
         pb-0 for the same reason the hero has it: these three sections are all
         transparent, so a boundary between them is space and nothing else, and each
         one owning only its top padding keeps that space to a single 64px. Doubling
         up here put 128px above the governance card while the card sat 64px above
         the capabilities band, which reads as the card floating low in a gap rather
         than as a section change. Doubling is for boundaries that also change
         background, the way the capabilities band does. -->
    <section class="ff-ai-demo w-full px-6 pt-12 sm:pt-16 pb-0">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="max-md:text-center">Connect and build <span class="text-indigo-600">faster than ever</span></h2>
        <p class="mt-3 text-gray-600 max-w-3xl">
          Connect in seconds and start building. Use natural-language to leverage your company-sanctioned AI in a secure and governed way.
        </p>
        <!-- The frame is the wrapper, not the video, and it clips: Chrome builds its
             native control bar in shadow DOM and ignores the video's own
             border-radius, so a radius set directly on the video left the bar's
             square corners poking out past the rounded border. Same rounded /
             bordered / shadowed treatment the product page gives its hero shot.
             A plain div rather than a figure now the caption is gone - a figure with
             nothing to caption is just a wrapper. -->
        <div class="mt-8 overflow-hidden rounded-lg border-2 border-indigo-100 shadow-2xl">
          <video
            class="block w-full"
            poster="/images/ai/demo-external-agents-poster.jpg"
            width="1600"
            height="1056"
            autoplay
            loop
            muted
            playsinline
            controls
            aria-label="Screen recording: Claude adds FlowFuse as a custom MCP connector, signs in, is granted full access to one team, and then provisions a Node-RED instance from the OEE blueprint."
          >
            <source src="/images/ai/demo-external-agents.webm" type="video/webm">
          </video>
        </div>
      </div>
    </section>

    <!-- GOVERNANCE: the control plane every AI action runs through. Path-neutral,
         which is what lets it sit above the picker rather than under Expert. -->
    <div class="ff-ai-governance w-full px-6 py-12 sm:py-16">
      <div class="md:max-w-screen-lg m-auto ff-blue-card pt-12 pb-12 px-6 md:px-10">
        <div class="text-center max-w-3xl mx-auto">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 class="w-full" v-html="GOVERNANCE.title" />
          <p class="mt-3 text-gray-600">{{ GOVERNANCE.subtitle }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div v-for="tile in GOVERNANCE.items" :key="tile.title" class="flex flex-col items-center text-center gap-3">
            <UIcon :name="tile.icon" class="size-8 text-indigo-600" aria-hidden="true" />
            <p class="font-medium text-indigo-700 m-0">{{ tile.title }}</p>
            <p class="text-sm text-gray-600 font-light m-0">{{ tile.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CAPABILITIES: every AI use case, grouped by how it shows up in operations.
         A sticky contents list on the left tracks which group you are in. -->
    <div id="capabilities" class="w-full px-6 py-12 sm:py-16 bg-indigo-50/60 border-t border-gray-100 scroll-mt-16">
      <div class="md:max-w-screen-lg m-auto">
        <div class="max-w-4xl">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 class="w-full" v-html="CAPABILITY_INTRO.title" />
          <p class="mt-3 text-gray-600">{{ CAPABILITY_INTRO.subtitle }}</p>
        </div>
        <!-- Group nav on the left, groups stacked on the right - the same contents
             list the product page uses for Edge / Hub / Fleet. It replaces the old
             per-group headers that pinned and alternated sides: with four groups and
             eleven items, a reader needed to know what the section contained and how
             far through it they were, which alternating headers could not tell them.
             Desktop only; below lg the groups simply stack and each header does the
             work on its own. -->
        <div class="mt-16 flex flex-col lg:flex-row lg:gap-12">
          <nav class="hidden lg:block lg:w-44 shrink-0" aria-label="Capability groups">
            <ul class="sticky top-24 flex list-none flex-col border-l border-indigo-200 p-0">
              <li v-for="group in CAPABILITY_GROUPS" :key="group.id" class="m-0">
                <a
                  :href="`#cap-${group.id}`"
                  class="-ml-px block border-l-2 py-[0.6rem] pl-5 font-medium no-underline transition-colors duration-200"
                  :class="activeGroup === group.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'"
                  :aria-current="activeGroup === group.id ? 'true' : undefined"
                >{{ group.eyebrow }}</a>
              </li>
            </ul>
          </nav>
          <div class="min-w-0 flex-1">
        <section
          v-for="(group, gi) in CAPABILITY_GROUPS"
          :id="`cap-${group.id}`"
          :key="group.title"
          :ref="(el) => { groupRefs[group.id] = el as HTMLElement | null }"
          class="ff-cap-group scroll-mt-24"
          :class="gi > 0 ? 'mt-20 pt-20 border-t border-indigo-200/70' : ''"
        >
          <div class="mb-10">
            <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 m-0">
              <span class="font-mono text-indigo-600">0{{ gi + 1 }}</span>
              <span>{{ group.eyebrow }}</span>
            </p>
            <h3 class="text-3xl md:text-4xl font-medium text-gray-900 leading-tight mt-4 mb-0">{{ group.title }}</h3>
            <p class="text-gray-600 font-light max-w-2xl mt-4 mb-0">{{ group.subtitle }}</p>
          </div>
          <div>
            <div
              v-for="(item, ii) in group.items"
              :key="item.name"
              class="ff-cap-item"
              :class="ii === 0 ? 'pb-10' : 'mt-10 pt-10 pb-10 border-t border-indigo-100'"
            >
              <!-- MEDIA WELL: the capability's schematic, one shared three-column
                   layout across all of them, so the section reads as one platform
                   rather than eleven unrelated pictures. -->
              <div class="ff-cap-well">
                <AiCapabilityDiagram :kind="item.diagram" />
              </div>
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
      </div>
    </div>

    <!-- FURTHER READING: keeps the page from being a dead end and points at where
         the depth actually is. -->
    <div class="w-full px-6 py-12 sm:py-16">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="max-md:text-center">More on <span class="text-indigo-600">industrial AI</span></h2>
        <p class="mt-3 text-gray-600 max-w-3xl">
          Worked examples and the thinking behind them, from the
          <a href="/blog/ai/" :class="LINK">FlowFuse AI blog</a>.
        </p>
        <!-- Same tile as the blog index, tag pages and author pages: BlogListItem
             renders its own <li>, so this is the flex-wrap <ul> those listings use
             rather than a grid of our own. -->
        <ul class="mt-6 flex flex-wrap">
          <BlogListItem v-for="post in furtherReading" :key="post.path" :entry="post" />
        </ul>
      </div>
    </div>

    <!-- FINAL CTA: the same block that closes /product/, so the two pages end the
         same way rather than each inventing a sign-off. -->
    <div class="w-full px-6 py-12 sm:py-16">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <p class="text-white text-4xl sm:text-5xl font-medium m-0">Get Started with FlowFuse</p>
          <p class="text-indigo-50 font-light text-xl max-w-2xl m-0">Your first operational application could be running this week. Request a demo to see how, or explore pricing to find the right fit.</p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="get-started" />
            <a class="ff-btn group flex flex-col" href="/pricing/" @click="capture('cta-pricing', { position: 'get-started' })">
              <span class="text-base uppercase items-center text-base flex gap-2 uppercase items-center text-white hover:text-gray-200">
                <span>VIEW PRICING</span>
                <IconsArrowRightIcon class="w-5 h-5" />
              </span>
            </a>
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
        <BlogFaq :faq="FAQ" />
      </div>
    </div>
  </div>
</template>
