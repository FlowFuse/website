<script lang="ts">
let retainedIframe: HTMLIFrameElement | null = null
</script>

<script setup lang="ts">
// The HubSpot meetings scheduler, with a "choose a time" panel that stands in for it when
// analytics consent hasn't been given yet. Always the shared sales calendar
// (site.meetings.salesRoundRobin).
//
// Consent-gated and MUST STAY THAT WAY: listens for vanilla-cookieconsent's own
// cc:onConsent/cc:onChange DOM events, plus a direct check on mount for consent already
// stored from an earlier visit, since that event can otherwise fire before this mounts.
import site from '../data/site.json'

const embedded = ref(false)
const container = ref<HTMLElement>()

const meetingsSrc = (() => {
    const url = new URL(site.meetings.salesRoundRobin)
    url.searchParams.set('embed', 'true')
    return url.toString()
})()

type EmbedWindow = Window & {
    CookieConsent?: { showPreferences: () => void, acceptedCategory?: (category: string) => boolean }
    hbspt?: { meetings?: { create: (selector: string) => unknown } }
}

function showCookiePreferences() {
    ;(window as EmbedWindow).CookieConsent?.showPreferences()
}

function loadEmbed() {
    if (embedded.value) return
    const win = window as EmbedWindow
    const existing = document.querySelector('script[src*="MeetingsEmbedCode.js"]')
    if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
        script.onload = () => { embedded.value = true }
        script.onerror = () => script.remove()
        document.head.appendChild(script)
        return
    }
    // HubSpot's script only scans for containers once, so a later mount re-attaches the
    // earlier iframe: create() again would leak a pair of window listeners per visit.
    if (retainedIframe && container.value && !container.value.querySelector('iframe')) {
        container.value.appendChild(retainedIframe)
        embedded.value = true
        return
    }
    if (win.hbspt?.meetings?.create) {
        win.hbspt.meetings.create('.meetings-iframe-container')
        embedded.value = true
        return
    }
    existing.addEventListener('load', loadEmbed, { once: true })
}

function loadEmbedIfConsented() {
    if ((window as EmbedWindow).CookieConsent?.acceptedCategory?.('analytics')) loadEmbed()
}

onMounted(() => {
    loadEmbedIfConsented()
    window.addEventListener('cc:onConsent', loadEmbedIfConsented)
    window.addEventListener('cc:onChange', loadEmbedIfConsented)
})

onBeforeUnmount(() => {
    retainedIframe = container.value?.querySelector('iframe') ?? retainedIframe
})

onUnmounted(() => {
    window.removeEventListener('cc:onConsent', loadEmbedIfConsented)
    window.removeEventListener('cc:onChange', loadEmbedIfConsented)
})
</script>

<template>
  <div>
    <!-- Negative margin only once the iframe is up: on the empty container it clips the fallback. -->
    <div ref="container" class="meetings-iframe-container" :class="{ '-mb-20 md:-mb-6': embedded }" :data-src="meetingsSrc" />
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
