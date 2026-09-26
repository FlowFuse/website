<script setup lang="ts">
// src/_includes/hubspot/hs-book-meeting.njk plus the non-form branch of
// hubspot/consent-fallback.njk: the HubSpot meetings scheduler, with the "choose a time"
// panel that stands in for it. Defaults to the shared sales calendar
// (site.meetings.salesRoundRobin); dataSrc overrides it for a campaign-specific one.
//
// The embed is gated on analytics consent and MUST STAY THAT WAY: window._ffLoadMeetings is
// what nuxt/assets/js/cookieconsent-config.js calls once the visitor accepts, or on a later
// page load where consent is already stored - the latter is also checked directly on mount,
// since that call can otherwise race this component's own mount and get silently dropped.
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
    _ffLoadMeetings?: (() => void) | null
    CookieConsent?: { showPreferences: () => void, acceptedCategory?: (category: string) => boolean }
    hbspt?: { meetings?: { create: (selector: string) => unknown } }
}

function showCookiePreferences() {
    ;(window as EmbedWindow).CookieConsent?.showPreferences()
}

function loadEmbed() {
    if (embedded.value) return
    const existing = document.querySelector('script[src*="MeetingsEmbedCode.js"]')
    if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
        script.onload = () => { embedded.value = true }
        document.head.appendChild(script)
    } else {
        // Confirmed live (browser back/forward after an earlier visit): the script only
        // scans for .meetings-iframe-container on its own load, so a later mount's fresh,
        // empty container is otherwise never populated. This re-runs that scan for it.
        ;(window as EmbedWindow).hbspt?.meetings?.create('.meetings-iframe-container')
        embedded.value = true
    }
}

// stepCount is a rough proxy for progress, not a real step index or click count - the
// embed's resize messages can fire more than once per click, or zero times per click (e.g.
// a window resize) - so it's a property on the outcome event, not an event of its own.
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
// something the visitor did. > 1 means they got past it. pagehide covers a tab close or
// reload the same way body.html's $pageleave does; `reported` stops it firing twice if
// this also unmounts via in-site navigation.
function reportAbandonment() {
    if (reported || booked || stepCount <= 1) return
    reported = true
    capture('hubspot-meeting-abandoned', { position: props.position, step_count: stepCount })
}

onMounted(() => {
    const win = window as EmbedWindow
    win._ffLoadMeetings = loadEmbed
    if (win.CookieConsent?.acceptedCategory?.('analytics')) loadEmbed()

    window.addEventListener('message', handleMeetingMessage)
    window.addEventListener('pagehide', reportAbandonment)
})

onUnmounted(() => {
    ;(window as EmbedWindow)._ffLoadMeetings = null
    window.removeEventListener('message', handleMeetingMessage)
    window.removeEventListener('pagehide', reportAbandonment)
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
