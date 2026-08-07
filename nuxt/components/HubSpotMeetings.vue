<script setup lang="ts">
// Ported from src/_includes/hubspot/hs-book-meeting.njk. Loading the meetings
// embed is gated behind analytics consent: src/js/cookieconsent-config.js
// (compiled into /js/cc.min.js, injected globally by nuxt/server/plugins/analytics.ts)
// calls window._ffLoadMeetings() from its onConsent/onFirstConsent handlers
// once analytics cookies are accepted - both on this page's load and on a
// later consent change. Until then, the fallback box below stays visible.
const props = defineProps<{
    dataSrc: string
}>()

const fallbackId = 'meetings-consent-placeholder'

onMounted(() => {
    (window as any)._ffLoadMeetings = function () {
        const placeholder = document.getElementById(fallbackId)
        if (!placeholder?.parentNode) return

        const parent = placeholder.parentNode

        const container = document.createElement('div')
        container.className = 'meetings-iframe-container -mb-20 md:-mb-6'
        container.setAttribute('data-src', props.dataSrc)
        parent.insertBefore(container, placeholder)

        const script = document.createElement('script')
        script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
        script.onload = () => { placeholder.remove() }
        script.onerror = () => { placeholder.classList.remove('hidden') }
        parent.insertBefore(script, placeholder)
        ;(window as any)._ffLoadMeetings = null
    }
})
</script>

<template>
  <div>
    <div :id="fallbackId" class="ff-hubspot-consent-fallback text-center border bg-indigo-900 rounded-lg px-6 pt-8 pb-4">
      <h4 class="text-white font-medium">
        Choose a time to talk
      </h4>
      <p class="text-indigo-200">
        30-minute session with our team.
      </p>
      <a
        href="https://meetings-eu1.hubspot.com/michael-davis/round-robin-sales-team"
        class="inline-block ff-btn ff-btn--highlight uppercase mb-2"
        style="cursor: pointer;"
        @click="() => (typeof (window as any).capture === 'function') && (window as any).capture('calendar_fallback_cta_clicked')"
      >
        Pick a time →
      </a>
      <p class="mt-4 text-indigo-200 italic font-xs">
        Prefer to view availability on this page?<br>
        <a
          class="cursor-pointer text-indigo-200 underline"
          @click="() => (window as any).CookieConsent && (window as any).CookieConsent.showPreferences()"
        >Enable analytics cookies.</a>
      </p>
    </div>
  </div>
</template>
