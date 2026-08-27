<script setup lang="ts">
// The agent picker: a tab per agent, and the three setup steps that apply to the
// one selected. Lives in components/content/ so markdown can use it as
// ::agent-setup-tabs as well as pages using it directly, which is the point: the
// changelog entry and the third-party-agents docs page need the same steps /ai has,
// and hand-copying them into each surface is how they drift apart.
//
// Styling comes from .ff-agent-tabs / .ff-agent-tab / .ff-agent-panel in
// src/css/style.css, which nuxt.config.ts links on every Nuxt page.
const props = withDefaults(defineProps<{
    // Drops the FlowFuse Expert tab. For surfaces that are specifically about
    // connecting your own agent, where Expert is not one of the options.
    excludeExpert?: boolean
    // Whether step 03 ends on a sign-up CTA. Off for documentation, where the
    // reader already has an account.
    signup?: boolean
    // Distinguishes this instance in PostHog. 'ai' keeps the positions the /ai
    // page already reports, so its existing numbers stay comparable.
    surface?: string
}>(), { excludeExpert: false, signup: true, surface: 'ai' })

const capture = useCapture()

const ENDPOINT = 'https://app.flowfuse.com/mcp'

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
        icon: 'i-lucide-server',
        name: 'Local and Custom Agents',
        step2Title: "Your MCP client's config",
        step2Body: 'Any MCP-capable client works, pointed at your own model, so nothing has to leave your network.',
        step2Label: 'See the documentation',
        step2Url: '/docs/user/expert/',
    },
]

const clients = computed(() => props.excludeExpert ? CLIENTS.filter(client => !client.builtIn) : CLIENTS)

// Prefix only off the /ai page, so the positions that page already reports to
// PostHog keep their current values and its existing insights stay valid.
function pos (id: string) {
    return props.surface === 'ai' ? id : `${props.surface}-${id}`
}

const activeClient = ref(clients.value[0].id)

// A surface can switch excludeExpert at runtime in dev; keep the selection valid.
watch(clients, (list) => {
    if (!list.some(client => client.id === activeClient.value)) activeClient.value = list[0].id
})

function selectClient (id: string) {
    activeClient.value = id
    capture('cta-ai-agent-tab', { position: pos(id) })
}
</script>

<template>
  <div class="mt-12 overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm">
    <div class="ff-agent-tabs flex flex-nowrap gap-1 overflow-x-auto border-b border-indigo-100 bg-indigo-50/60 p-2" role="tablist" aria-label="Choose your AI agent">
      <button
        v-for="client in clients"
        :id="`ff-tab-${client.id}`"
        :key="client.id"
        type="button"
        role="tab"
        :aria-controls="`ff-panel-${client.id}`"
        :aria-selected="activeClient === client.id"
        class="ff-agent-tab flex flex-none items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition"
        :class="activeClient === client.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-white hover:text-gray-900'"
        @click="selectClient(client.id)"
      >
        <UIcon v-if="client.icon" :name="client.icon" class="flex-none size-4" aria-hidden="true" />
        <img v-else-if="client.logo" :src="client.logo" alt="" class="h-4 w-auto flex-none" aria-hidden="true">
        <span>{{ client.name }}</span>
      </button>
    </div>

    <div
      v-for="client in clients"
      v-show="activeClient === client.id"
      :id="`ff-panel-${client.id}`"
      :key="`panel-${client.id}`"
      role="tabpanel"
      :aria-labelledby="`ff-tab-${client.id}`"
      class="ff-agent-panel grid grid-cols-1 gap-8 p-6 md:grid-cols-3 md:gap-10 md:p-8"
    >
      <div class="flex flex-col">
        <p class="font-mono text-xs font-semibold text-indigo-600 m-0">01</p>
        <p class="text-lg font-medium text-gray-900 mt-2 mb-0">{{ client.builtIn ? client.step1Title : STEP1.title }}</p>
        <p class="text-gray-600 font-light text-sm mt-2 mb-0">{{ client.builtIn ? client.step1Body : STEP1.description }}</p>
        <div v-if="client.builtIn" class="mt-auto pt-5">
          <CtaSignUp variant="primary" :position="`${surface}-tab-expert`" class="w-full" />
        </div>
        <div v-else class="mt-auto pt-5">
          <FfCommand :command="ENDPOINT" event="cta-copy-mcp-endpoint" :position="pos(client.id)" stacked />
        </div>
      </div>

      <div class="flex flex-col">
        <p class="font-mono text-xs font-semibold text-indigo-600 m-0">02</p>
        <p class="text-lg font-medium text-gray-900 mt-2 mb-0">{{ client.step2Title }}</p>
        <p class="text-gray-600 font-light text-sm mt-2 mb-0">{{ client.step2Body }}</p>
        <div class="mt-auto pt-5">
          <a
            :href="client.step2Url"
            class="ff-btn ff-btn--primary-outlined flex w-full"
            :target="client.step2Url.startsWith('http') ? '_blank' : undefined"
            :rel="client.step2Url.startsWith('http') ? 'noopener' : undefined"
            @click="capture('cta-ai-open-client', { position: pos(client.id) })"
          >{{ client.step2Label }}</a>
        </div>
      </div>

      <div class="flex flex-col">
        <p class="font-mono text-xs font-semibold text-indigo-600 m-0">03</p>
        <p class="text-lg font-medium text-gray-900 mt-2 mb-0">{{ client.step3Title || STEP3.title }}</p>
        <p class="text-gray-600 font-light text-sm mt-2 mb-0">{{ client.step3Body || STEP3.description }}</p>
        <div v-if="signup && !client.noStep3Cta" class="mt-auto pt-5">
          <CtaSignUp variant="primary" :position="`${surface}-connect-step3`" class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
