<script setup lang="ts">
// The HubSpot meetings scheduler, with a "choose a time" panel that stands in for it when
// analytics consent hasn't been given yet. Always the shared sales calendar
// (site.meetings.salesRoundRobin).
//
// Consent-gated and MUST STAY THAT WAY: listens for vanilla-cookieconsent's own
// cc:onConsent/cc:onChange DOM events, plus a direct check on mount for consent already
// stored from an earlier visit, since that event can otherwise fire before this mounts.
// Withdrawing consent removes the embed again.
//
// HubSpot's script only scans for containers once, when it loads, so each mount asks it for
// an iframe in this component's own container. The fallback stays up until that iframe is
// actually in the container, which HubSpot inserts some time after create() returns.
import site from '../data/site.json'

const SCRIPT_SRC = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'

const embedded = ref(false)
const container = ref<HTMLElement>()
const containerId = `hs-meetings-${useId()}`

const meetingsSrc = (() => {
    const url = new URL(site.meetings.salesRoundRobin)
    url.searchParams.set('embed', 'true')
    return url.toString()
})()

type EmbedWindow = Window & {
    CookieConsent?: { showPreferences: () => void, acceptedCategory?: (category: string) => boolean }
    hbspt?: { meetings?: { create: (selector: string) => unknown } }
}

let observer: MutationObserver | undefined
let pendingScript: HTMLScriptElement | undefined

function showCookiePreferences() {
    ;(window as EmbedWindow).CookieConsent?.showPreferences()
}

function stopWaitingForScript() {
    pendingScript?.removeEventListener('load', createEmbed)
    pendingScript = undefined
}

function createEmbed() {
    stopWaitingForScript()
    const create = (window as EmbedWindow).hbspt?.meetings?.create
    if (create && container.value) create(`#${CSS.escape(containerId)}`)
}

function loadEmbed() {
    if (!container.value || container.value.querySelector('iframe')) return
    if ((window as EmbedWindow).hbspt?.meetings?.create) {
        createEmbed()
        return
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (!script) {
        const injected = document.createElement('script')
        injected.src = SCRIPT_SRC
        // Dropped on failure so the next mount tries again.
        injected.onerror = () => injected.remove()
        document.head.appendChild(injected)
        script = injected
    }
    if (pendingScript === script) return
    stopWaitingForScript()
    pendingScript = script
    script.addEventListener('load', createEmbed, { once: true })
}

function removeEmbed() {
    stopWaitingForScript()
    container.value?.replaceChildren()
}

function syncWithConsent() {
    if ((window as EmbedWindow).CookieConsent?.acceptedCategory?.('analytics')) loadEmbed()
    else removeEmbed()
}

onMounted(() => {
    observer = new MutationObserver(() => {
        embedded.value = !!container.value?.querySelector('iframe')
    })
    if (container.value) observer.observe(container.value, { childList: true })
    syncWithConsent()
    window.addEventListener('cc:onConsent', syncWithConsent)
    window.addEventListener('cc:onChange', syncWithConsent)
})

onUnmounted(() => {
    observer?.disconnect()
    stopWaitingForScript()
    window.removeEventListener('cc:onConsent', syncWithConsent)
    window.removeEventListener('cc:onChange', syncWithConsent)
})
</script>

<template>
  <div>
    <!-- Negative margin only once the iframe is up: on the empty container it clips the fallback. -->
    <div :id="containerId" ref="container" :class="{ '-mb-20 md:-mb-6': embedded }" :data-src="meetingsSrc" />
    <div v-if="!embedded" class="ff-hubspot-consent-fallback text-center border bg-indigo-900 rounded-lg px-6 pt-8 pb-4">
      <h4 class="text-white font-medium">Choose a time to talk</h4>
      <p class="text-indigo-200">30-minute session with our team.</p>
      <CtaCustom
        label="Pick a time"
        icon="i-lucide-arrow-right"
        destination-key="hubspotMeeting"
        variant="highlight"
        position="consent-fallback"
        class="mb-2"
      />
      <p class="mt-4 text-indigo-200 italic font-xs">
        Prefer to view availability on this page?<br>
        <button type="button" class="cursor-pointer text-indigo-200 underline bg-transparent border-0 p-0" @click="showCookiePreferences">
          Enable analytics cookies.
        </button>
      </p>
    </div>
  </div>
</template>
