<script setup lang="ts">
// The HubSpot meetings scheduler, with a "choose a time" panel that stands in for it when
// analytics consent hasn't been given yet. Defaults to the shared sales calendar
// (site.meetings.salesRoundRobin); dataSrc overrides it for a campaign-specific one.
//
// Consent-gated and MUST STAY THAT WAY: listens for vanilla-cookieconsent's own
// cc:onConsent/cc:onChange DOM events, plus a direct check on mount for consent already
// stored from an earlier visit, since that event can otherwise fire before this mounts.
import site from '../data/site.json'
import { parseMeetingMessage } from '../lib/hubspot-meeting-message.mjs'
import { createMeetingTracker } from '../lib/hubspot-meeting-tracker.mjs'

const props = defineProps<{ position: string, dataSrc?: string }>()

const capture = useCapture()
const identify = useIdentify()
const embedded = ref(false)
const tracker = createMeetingTracker()

const utmDefaults = (): Record<string, string> => ({
    utm_source: 'website',
    utm_medium: 'embedded_calendar',
    utm_campaign: `${useRoute().path.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home'}-${props.position}`,
})

function buildSrc(withUtm: boolean) {
    const url = new URL(props.dataSrc ?? site.meetings.salesRoundRobin)
    url.searchParams.set('embed', 'true')
    if (withUtm) {
        for (const [key, value] of Object.entries(utmDefaults())) {
            if (!url.searchParams.has(key)) url.searchParams.set(key, value)
        }
    }
    return url.toString()
}

const meetingsSrc = ref(buildSrc(true))
const meetingsOrigin = new URL(meetingsSrc.value).origin

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
        document.head.appendChild(script)
        return
    }
    // A later mount (e.g. browser back/forward) gets a fresh, empty container the
    // already-loaded script never scans for on its own - this re-runs that scan. If hbspt
    // isn't ready yet (script tag present but still loading, on a fast nav right after an
    // earlier mount added it), wait for its load event and retry once.
    if (win.hbspt?.meetings?.create) {
        win.hbspt.meetings.create('.meetings-iframe-container')
        embedded.value = true
        return
    }
    existing.addEventListener('load', loadEmbed, { once: true })
}

function handleMeetingMessage(event: MessageEvent) {
    if (event.origin !== meetingsOrigin) return
    const parsed = parseMeetingMessage(event.data)

    if (parsed.type === 'booked') {
        if (!tracker.recordBooked()) return
        if (parsed.email) identify(parsed.email, { name: parsed.name ?? undefined })
        capture('hubspot-meeting-booked', { position: props.position, step_count: tracker.stepCount })
        return
    }

    if (parsed.type === 'resize') tracker.recordResize(parsed.height)
}

// send_instantly makes PostHog compress synchronously, the only kind that finishes during unload.
function reportAbandonment() {
    if (!tracker.recordAbandonment()) return
    capture(
        'hubspot-meeting-abandoned',
        { position: props.position, step_count: tracker.stepCount },
        { transport: 'sendBeacon', send_instantly: true }
    )
}

function onPageshow(event: Event) {
    if ((event as PageTransitionEvent).persisted) tracker.resumeFromBfcache()
}

function loadEmbedIfConsented() {
    if ((window as EmbedWindow).CookieConsent?.acceptedCategory?.('analytics')) loadEmbed()
}

onMounted(() => {
    if (/[?&]utm_/.test(window.location.search)) meetingsSrc.value = buildSrc(false)
    loadEmbedIfConsented()
    window.addEventListener('cc:onConsent', loadEmbedIfConsented)
    window.addEventListener('cc:onChange', loadEmbedIfConsented)
    window.addEventListener('message', handleMeetingMessage)
    window.addEventListener('pagehide', reportAbandonment)
    window.addEventListener('pageshow', onPageshow)
})

onUnmounted(() => {
    window.removeEventListener('cc:onConsent', loadEmbedIfConsented)
    window.removeEventListener('cc:onChange', loadEmbedIfConsented)
    window.removeEventListener('message', handleMeetingMessage)
    window.removeEventListener('pagehide', reportAbandonment)
    window.removeEventListener('pageshow', onPageshow)
    reportAbandonment()
})
</script>

<template>
  <div>
    <!-- The negative margin only makes sense once the real iframe is loaded, to tuck away
         HubSpot's own excess bottom whitespace - applied while empty, it pulls the fallback
         panel up into this container's parent's overflow-hidden and clips its top edge. -->
    <div class="meetings-iframe-container" :class="{ '-mb-20 md:-mb-6': embedded }" :data-src="meetingsSrc" />
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
