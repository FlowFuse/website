<script setup lang="ts">
// HubSpot meetings scheduler, loaded only with analytics consent. MUST STAY THAT WAY.
import site from '../data/site.json'

const SCRIPT_SRC = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'

const embedded = ref(false)
const container = ref<HTMLElement>()
const containerKey = ref(0)
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
let requested = false

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
    if (!create || !container.value) return
    requested = true
    create(`#${CSS.escape(containerId)}`)
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
        injected.onerror = () => injected.remove()
        document.head.appendChild(injected)
        script = injected
    }
    if (pendingScript === script) return
    stopWaitingForScript()
    pendingScript = script
    script.addEventListener('load', createEmbed, { once: true })
}

// A new container makes an iframe HubSpot inserts late land in the detached old one.
function removeEmbed() {
    stopWaitingForScript()
    if (!requested) return
    requested = false
    embedded.value = false
    containerKey.value++
}

function hasAnalyticsConsent() {
    return !!(window as EmbedWindow).CookieConsent?.acceptedCategory?.('analytics')
}

function syncWithConsent() {
    if (!hasAnalyticsConsent()) removeEmbed()
    else nextTick(() => { if (hasAnalyticsConsent()) loadEmbed() })
}

watch(container, (el) => {
    observer?.disconnect()
    if (el) observer?.observe(el, { childList: true })
}, { flush: 'post' })

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
    <div :id="containerId" :key="containerKey" ref="container" :class="{ '-mb-20 md:-mb-6': embedded }" :data-src="meetingsSrc" />
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
