<script setup lang="ts">
useSeoMeta({
    title: 'How Was Your FlowFuse Trial? — Share Feedback',
    description: 'Your FlowFuse trial has ended. Tell us what you hoped to build, how far you got, and what stopped you. Three quick questions, under a minute.',
})
</script>

<template>
  <MqlContactPage
    social-proof-placement="left"
    title="Help us build a better <span class='text-indigo-600'>free trial experience</span> for everyone"
    description="Your FlowFuse trial has ended, and we'd like to know why you didn't continue. Maybe time ran out. Maybe a feature you needed wasn't there, or another tool fit better. Whatever the reason, it shows us what to fix."
  >
    <template #callout>
      <ProseNote class="mt-6 text-left">
        We read every response. Your answers go straight to the product team and shape what we build next.
      </ProseNote>
    </template>

    <div class="border border-indigo-200 rounded-xl p-6 bg-white shadow-sm overflow-hidden">
      <HubSpotForm form-id="fce63d1c-4618-4617-b20a-45c5b74ffd35" cta="cta-trial-feedback" reference="trial-feedback" />
    </div>
  </MqlContactPage>
</template>
