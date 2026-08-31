<script setup lang="ts">
// The agent picker: a tab per agent, and the three setup steps that apply to the
// one selected. Lives in components/content/ so markdown can use it as
// ::agent-setup-tabs as well as pages using it directly, which is the point: the
// changelog entry and the third-party-agents docs page need the same steps /ai has,
// and hand-copying them into each surface is how they drift apart.
//
// Styling comes from the .ff-agent-* rules in src/css/style.css, which nuxt.config.ts
// links on every Nuxt page, rather than from utility classes on the elements. That is
// forced: this renders inside .prose on the changelog and docs pages, and the site's
// prose rules are unlayered, which outranks Tailwind's @layer utilities whatever the
// specificity. As utilities, `h-4` on a tab logo lost to .prose img's width:100% and
// the marks blew up to full column width.
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

// The Cloud address. Self-hosted platforms answer on their own domain, so the block
// takes one (host-swap) rather than telling the reader in prose to edit what they
// have just copied.
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
        step2Title: 'Settings, Apps & Connectors, Advanced settings',
        step2Body: 'Turn on developer mode there, then add FlowFuse by URL. Developer mode needs a paid plan, so it is not on the free tier.',
        step2Label: 'Open ChatGPT',
        step2Url: 'https://chatgpt.com/',
    },
    {
        id: 'claude',
        logo: '/images/ai/agents/claude.svg',
        name: 'Claude',
        step2Title: 'Add a custom connector',
        step2Body: 'Where custom connectors are available on your plan, add one and paste the URL. On Team and Enterprise an owner adds it once for everyone.',
        step2Label: 'Open Claude',
        step2Url: 'https://claude.ai/',
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
  <div class="ff-agent-card overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm">
    <div class="ff-agent-tabs border-b border-indigo-100 bg-indigo-50/60" role="tablist" aria-label="Choose your AI agent">
      <button
        v-for="client in clients"
        :id="`ff-tab-${client.id}`"
        :key="client.id"
        type="button"
        role="tab"
        class="ff-agent-tab"
        :class="{ 'ff-agent-tab--active': activeClient === client.id }"
        :aria-controls="`ff-panel-${client.id}`"
        :aria-selected="activeClient === client.id"
        @click="selectClient(client.id)"
      >
        <UIcon v-if="client.icon" :name="client.icon" class="ff-agent-tab__glyph" aria-hidden="true" />
        <img v-else-if="client.logo" :src="client.logo" alt="" aria-hidden="true">
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
      class="ff-agent-panel"
    >
      <div class="ff-agent-step">
        <p class="ff-agent-step__num">01</p>
        <p class="ff-agent-step__title">{{ client.builtIn ? client.step1Title : STEP1.title }}</p>
        <p class="ff-agent-step__body">{{ client.builtIn ? client.step1Body : STEP1.description }}</p>
        <div v-if="client.builtIn" class="ff-agent-step__cta">
          <CtaSignUp variant="primary" :position="`${surface}-tab-expert`" class="w-full" />
        </div>
        <div v-else class="ff-agent-step__cta">
          <FfCommand :command="ENDPOINT" event="cta-copy-mcp-endpoint" :position="pos(client.id)" stacked host-swap />
        </div>
      </div>

      <div class="ff-agent-step">
        <p class="ff-agent-step__num">02</p>
        <p class="ff-agent-step__title">{{ client.step2Title }}</p>
        <p class="ff-agent-step__body">{{ client.step2Body }}</p>
        <div class="ff-agent-step__cta">
          <CtaCustom
            :label="client.step2Label"
            :href="client.step2Url"
            event="cta-ai-open-client"
            :position="pos(client.id)"
            :target="client.step2Url.startsWith('http') ? '_blank' : undefined"
            variant="primary-outlined"
            class="w-full"
          />
        </div>
      </div>

      <div class="ff-agent-step">
        <p class="ff-agent-step__num">03</p>
        <p class="ff-agent-step__title">{{ client.step3Title || STEP3.title }}</p>
        <p class="ff-agent-step__body">{{ client.step3Body || STEP3.description }}</p>
        <div v-if="signup && !client.noStep3Cta" class="ff-agent-step__cta">
          <CtaSignUp variant="primary" :position="`${surface}-connect-step3`" class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
