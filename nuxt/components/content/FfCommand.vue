<script setup lang="ts">
// The copyable command / URL block. Lives in components/content/ so markdown can
// use it as ::ff-command{command="..."} as well as pages using it directly, which
// is the point: before this, the markup was hand-copied into every 11ty page that
// wanted one (src/platform/device-agent.njk, and /ai) with a per-page copy script.
//
// Styling comes from .ff-command in src/css/style.css, which nuxt.config.ts already
// links on every Nuxt page, so there is no duplicated CSS here either.
const props = withDefaults(defineProps<{
    command: string
    // Optional PostHog event fired on a successful copy. The 11ty version fired on
    // click whether or not the copy landed; this only counts real copies.
    event?: string
    position?: string
    // Puts the copy control below the address as a full-width primary button
    // instead of a small chip inside the dark block. For narrow columns, where
    // the inline button leaves too little room for the address to stay on one
    // line, and where the button needs to match the other CTAs beside it.
    stacked?: boolean
    // Offers a field for a self-hosted platform address, which replaces the host in
    // the command shown and copied. For addresses that are only the Cloud one by
    // default: the docs say "substitute your own platform address" in prose, and a
    // self-hosted reader otherwise copies an address that is not theirs.
    hostSwap?: boolean
}>(), { event: undefined, position: undefined, stacked: false, hostSwap: false })

const capture = useCapture()
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

// Shared by every FfCommand on the page rather than held per instance. /ai renders
// one per agent tab, so per-instance state would mean typing the address again on
// each tab, which is the friction this is here to remove.
const host = useState('ff-command-host', () => '')
const editing = useState('ff-command-host-editing', () => false)

const STORAGE_KEY = 'ff-command-host'

// Takes what people actually paste: a bare domain, a full URL, a trailing path.
function normaliseHost (value: string) {
    return value.trim().replace(/^[a-z][a-z0-9+.-]*:\/\//i, '').replace(/[/?#].*$/, '')
}

const shownCommand = computed(() => {
    if (!props.hostSwap || !host.value) return props.command
    return props.command.replace(/^(https?:\/\/)[^/\s]+/i, `$1${host.value}`)
})

function setHost (value: string) {
    host.value = normaliseHost(value)
    try {
        if (host.value) localStorage.setItem(STORAGE_KEY, host.value)
        else localStorage.removeItem(STORAGE_KEY)
    } catch {
        // Storage can be unavailable (private mode, blocked cookies). The field
        // still works for this visit; it just will not be remembered.
    }
}

function useCloud () {
    setHost('')
    editing.value = false
}

// Read after hydration, not during setup: the prerendered HTML carries the default
// address, so reading storage any earlier would make the server and client markup
// disagree.
onMounted(() => {
    if (!props.hostSwap || host.value) return
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            host.value = stored
            editing.value = true
        }
    } catch {
        // As above.
    }
})

async function writeToClipboard (text: string) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return
    }
    // Fallback for a non-secure context, where navigator.clipboard is undefined.
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'absolute'
    field.style.left = '-9999px'
    document.body.appendChild(field)
    field.select()
    document.execCommand('copy')
    document.body.removeChild(field)
}

async function copy () {
    try {
        await writeToClipboard(shownCommand.value)
    } catch {
        return
    }
    if (props.event) {
        const payload: Record<string, unknown> = {}
        if (props.position) payload.position = props.position
        // Whether the reader copied their own address or ours, which is the one
        // thing this control can tell us that the copy count cannot.
        if (props.hostSwap) payload.self_hosted = !!host.value
        capture(props.event, Object.keys(payload).length ? payload : undefined)
    }
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => { copied.value = false }, 2000)
}

onUnmounted(() => clearTimeout(resetTimer))
</script>

<template>
  <!-- The wrapper exists so the address field can sit under the block: the block is
       the thing you copy, and the field changes what that is. -->
  <div>
    <div class="ff-command" :class="{ 'ff-command--stacked': stacked }">
      <code class="ff-command__text">{{ shownCommand }}</code>
      <!-- Stacked uses the site's own button classes rather than the chip styling,
           so it is the same object as the CTAs it sits beside. -->
      <button
        v-if="stacked"
        type="button"
        class="ff-btn ff-btn--primary flex w-full uppercase"
        @click="copy"
      >{{ copied ? 'Copied' : 'Copy' }}</button>
      <button
        v-else
        type="button"
        class="ff-command__copy"
        :class="{ 'ff-command__copy--done': copied }"
        @click="copy"
      >{{ copied ? 'Copied' : 'Copy' }}</button>
    </div>

    <div v-if="hostSwap" class="ff-command__host">
      <button
        v-if="!editing"
        type="button"
        class="ff-command__host-toggle"
        @click="editing = true"
      >Self-hosted? Use your own address</button>
      <div v-else class="ff-command__host-field">
        <input
          :value="host"
          type="text"
          inputmode="url"
          autocomplete="off"
          spellcheck="false"
          class="ff-command__host-input"
          placeholder="flowfuse.example.com"
          aria-label="Your FlowFuse address"
          @input="setHost(($event.target as HTMLInputElement).value)"
        >
        <button
          type="button"
          class="ff-command__host-reset"
          @click="useCloud"
        >Use FlowFuse Cloud</button>
      </div>
    </div>
  </div>
</template>
