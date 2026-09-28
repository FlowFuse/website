<script setup lang="ts">
// The HubSpot meetings scheduler, with a "choose a time" panel that stands in for it when
// analytics consent hasn't been given yet. Defaults to the shared sales calendar
// (site.meetings.salesRoundRobin); dataSrc overrides it for a campaign-specific one.
//
// Consent-gated and MUST STAY THAT WAY: listens for vanilla-cookieconsent's own
// cc:onConsent/cc:onChange DOM events (dispatched independent of its config-callback
// option), plus a direct check on mount for consent already stored from an earlier visit,
// since that event can otherwise fire before this component mounts.
import site from '../data/site.json'
import { parseMeetingMessage } from '../lib/hubspot-meeting-message.mjs'

const props = defineProps<{ position: string, dataSrc?: string }>()

const capture = useCapture()
const identify = useIdentify()
const embedded = ref(false)

const meetingsSrc = (() => {
    const url = new URL(props.dataSrc ?? site.meetings.salesRoundRobin)
    url.searchParams.set('embed', 'true')
    return url.toString()
})()
const meetingsOrigin = new URL(meetingsSrc).origin

type EmbedWindow = Window & {
    CookieConsent?: { showPreferences: () => void, acceptedCategory?: (category: string) => boolean }
    hbspt?: { meetings?: { create: (selector: string) => unknown } }
    posthog?: { capture: (event: string, props?: Record<string, unknown>, options?: Record<string, unknown>) => void }
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
    // itself isn't there (e.g. blocked), stay on the fallback rather than claim success
    // with nothing to show for it.
    if (!win.hbspt?.meetings?.create) return
    win.hbspt.meetings.create('.meetings-iframe-container')
    embedded.value = true
}

// stepCount is a rough proxy for progress, not a real step index or click count - the
// embed's resize messages can fire more than once per click, or zero times per click (e.g.
// a window resize) - so it rides as a property on the outcome event, not an event of its own.
let booked = false
let stepCount = 0
let lastHeight: number | null = null
let reported = false

function handleMeetingMessage(event: MessageEvent) {
    if (event.origin !== meetingsOrigin) return
    const parsed = parseMeetingMessage(event.data)

    if (parsed.type === 'booked') {
        if (booked) return
        booked = true
        if (parsed.email) identify(parsed.email, { name: parsed.name ?? undefined })
        capture('hubspot-meeting-booked', { position: props.position, step_count: stepCount })
        return
    }

    if (parsed.type === 'resize' && parsed.height !== lastHeight) {
        lastHeight = parsed.height
        stepCount += 1
    }
}

// step 1 is the embed's own first render (email-entry screen), automatic on load - not
// something the visitor did. > 1 means they got past it.
//
// Bypasses useCapture()/window.capture() here: PostHog batches captures and flushes the
// batch on its own pagehide listener, registered well before this component ever mounts, so
// a capture queued by ours (registered later) arrives after that flush already ran and is
// stranded - transport: sendBeacon alone doesn't fix that, since it only changes how a
// request is sent, not when; send_instantly skips the batch queue entirely.
function reportAbandonment() {
    if (reported || booked || stepCount <= 1) return
    reported = true
    ;(window as EmbedWindow).posthog?.capture(
        'hubspot-meeting-abandoned',
        { position: props.position, step_count: stepCount },
        { transport: 'sendBeacon', send_instantly: true }
    )
}

// A bfcache restore (pageshow with persisted) resumes this exact JS state rather than
// remounting, so a departure that already reported stays reportable if the visitor leaves
// again without booking.
function onPageshow(event: Event) {
    if ((event as PageTransitionEvent).persisted) reported = false
}

function loadEmbedIfConsented() {
    if ((window as EmbedWindow).CookieConsent?.acceptedCategory?.('analytics')) loadEmbed()
}

onMounted(() => {
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
