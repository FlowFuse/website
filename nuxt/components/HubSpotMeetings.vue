<script setup lang="ts">
// src/_includes/hubspot/hs-book-meeting.njk plus the non-form branch of
// hubspot/consent-fallback.njk: the HubSpot meetings scheduler, with the "choose a time"
// panel that stands in for it.
//
// The embed is gated on analytics consent and MUST STAY THAT WAY. The .njk defined
// `window._ffLoadMeetings`, and src/js/cookieconsent-config.js calls it only once the
// visitor accepts; until then the embed is never injected. This registers the same global
// rather than loading on mount, so declining analytics still means no third-party
// scheduler script.
//
// The panel below is therefore not an error state: it is what a visitor who has not
// accepted analytics sees, and it gives them a way to book anyway. It is rendered
// unhidden and replaced once the embed is up, which is what the .njk did.
const props = defineProps<{ dataSrc: string, position: string }>()

const capture = useCapture()
const embedded = ref(false)

type ConsentWindow = Window & {
    _ffLoadMeetings?: (() => void) | null
    CookieConsent?: { showPreferences: () => void, acceptedCategory?: (category: string) => boolean }
}

function showCookiePreferences() {
    ;(window as ConsentWindow).CookieConsent?.showPreferences()
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
        embedded.value = true
    }
}

// Registered for cookieconsent-config.js to call on accept, exactly as the .njk did.
onMounted(() => {
    const win = window as ConsentWindow
    win._ffLoadMeetings = loadEmbed
    // cookieconsent-config.js's onConsent also calls _ffLoadMeetings on every page load
    // when consent is already stored, but that script can run before this component has
    // mounted and registered the callback above, silently dropping the call. Covering it
    // here too closes that race regardless of which one runs first.
    if (win.CookieConsent?.acceptedCategory?.('analytics')) loadEmbed()
})

onUnmounted(() => {
    ;(window as ConsentWindow)._ffLoadMeetings = null
})

// The scheduler is a cross-origin iframe, so a completed booking is otherwise invisible
// to this page's analytics. HubSpot doesn't document this postMessage contract, but a
// real test booking confirmed the shape below, including the booker's contact - richer
// than the `{ meetingBookSucceeded: true }` boolean HubSpot itself documents elsewhere.
const meetingsOrigin = new URL(props.dataSrc).origin

type MeetingBookedMessage = {
    meetingBookSucceeded?: boolean
    meetingsPayload?: {
        bookingResponse?: {
            postResponse?: {
                contact?: { email?: string, name?: string }
            }
        }
    }
}

// Also undocumented: the iframe posts { height: N } on every internal screen change, to let
// the parent resize the container. The value itself is meaningless (varies by viewport and
// which fields render), but a NEW value is a reasonable proxy for "moved to a different
// screen inside the embed" - so it's tracked as a step count, not as the height itself.
type MeetingResizeMessage = { height?: number }

type PosthogWindow = Window & {
    posthog?: { identify: (distinctId: string, properties?: Record<string, unknown>) => void }
}

let stepCount = 0
let lastHeight: number | null = null

function handleMeetingMessage(event: MessageEvent) {
    if (event.origin !== meetingsOrigin) return
    const data = event.data as MeetingBookedMessage & MeetingResizeMessage

    if (data?.meetingBookSucceeded) {
        const contact = data.meetingsPayload?.bookingResponse?.postResponse?.contact
        if (contact?.email) {
            ;(window as PosthogWindow).posthog?.identify(contact.email, { email: contact.email, name: contact.name })
        }
        capture('hubspot-meeting-booked', { position: props.position })
        return
    }

    if (typeof data?.height === 'number' && data.height !== lastHeight) {
        lastHeight = data.height
        stepCount += 1
        capture('hubspot-meeting-step-progressed', { position: props.position, step: stepCount })
    }
}

onMounted(() => window.addEventListener('message', handleMeetingMessage))
onUnmounted(() => window.removeEventListener('message', handleMeetingMessage))
</script>

<template>
  <div>
    <!-- The negative margin only makes sense once the real iframe is loaded: it tucks away
         HubSpot's own excess bottom whitespace. Applied while empty (fallback state), it
         pulls the fallback panel up into this container's parent's overflow-hidden and
         clips its top edge instead. -->
    <div class="meetings-iframe-container" :class="{ '-mb-20 md:-mb-6': embedded }" :data-src="props.dataSrc" />
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
