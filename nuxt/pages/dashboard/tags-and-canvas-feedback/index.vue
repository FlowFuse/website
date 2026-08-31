<script setup lang="ts">
useSeoMeta({
    title: 'FlowFuse Dashboard Tags & Canvas — Give Feedback',
    description: 'We\'re designing Tags and Canvas for FlowFuse Dashboard. Before the design locks in, tell us what you\'d bind, what you\'d want stored, and what it would take to replace how you wire data today.',
})
</script>

<template>
  <MqlContactPage
    title="Help Us Build <span class='text-indigo-600'>Tags and Canvas</span> for FlowFuse Dashboard"
    description="We're early in designing two additions to FlowFuse Dashboard. Tags hold live state server-side, so a page shows real data the moment it opens instead of waiting on the next message. Canvas is a new page type you draw on, so your dashboard can look like your actual process instead of a grid of widgets."
  >
    <template #callout>
      <ProseNote class="mt-6 text-left">
        Neither has shipped yet, which means there's still time to shape them. Your answers go straight to the team building it.
      </ProseNote>
    </template>

    <div class="border border-indigo-200 rounded-xl p-6 bg-white shadow-sm overflow-hidden">
      <HubSpotForm form-id="7d7335cc-8520-4aa1-9193-ccf65938d6b6" cta="cta-contact-us" reference="dashboard-feedback" />
    </div>
  </MqlContactPage>
</template>
