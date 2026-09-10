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
const props = defineProps<{ dataSrc: string }>()

const capture = useCapture()
const embedded = ref(false)

const FALLBACK_MEETING_URL = 'https://meetings-eu1.hubspot.com/michael-davis/round-robin-sales-team'

type ConsentWindow = Window & {
    _ffLoadMeetings?: (() => void) | null
    CookieConsent?: { showPreferences: () => void }
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
// It also calls it on load when consent is already stored, so an existing acceptance is
// covered without this component reading cookies itself.
onMounted(() => {
    ;(window as ConsentWindow)._ffLoadMeetings = loadEmbed
})

onUnmounted(() => {
    ;(window as ConsentWindow)._ffLoadMeetings = null
})
</script>

<template>
  <div>
    <div class="meetings-iframe-container -mb-20 md:-mb-6" :data-src="props.dataSrc" />
    <div v-if="!embedded" class="ff-hubspot-consent-fallback text-center border bg-indigo-900 rounded-lg px-6 pt-8 pb-4">
      <h4 class="text-white font-medium">Choose a time to talk</h4>
      <p class="text-indigo-200">30-minute session with our team.</p>
      <a
          :href="FALLBACK_MEETING_URL"
          class="inline-block ff-btn ff-btn--highlight uppercase mb-2"
          @click="capture('calendar_fallback_cta_clicked')"
      >Pick a time &rarr;</a>
      <p class="mt-4 text-indigo-200 italic font-xs">
        Prefer to view availability on this page?<br>
        <button type="button" class="cursor-pointer text-indigo-200 underline bg-transparent border-0 p-0" @click="showCookiePreferences">
          Enable analytics cookies.
        </button>
      </p>
    </div>
  </div>
</template>
