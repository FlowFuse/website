<script setup lang="ts">
// "FlowFuse Expert", the same in the page's question box (FfExpertAsk) and in the header of
// the conversation modal (DocsExpertHost). When the box morphs into the modal,
// src/js/ai-expert-modal.js finds both by data-ff-expert-brand and flies the box's one up
// into the modal header, so the two have to stay the same size.
defineProps<{
    uid: string
    /** Render "Expert" as the dialog's heading, with this id for its aria-labelledby. */
    headingId?: string
}>()
</script>

<template>
  <div class="ff-expert-brand" data-ff-expert-brand>
    <span class="ff-expert-brand__wordmark" role="img" aria-label="FlowFuse">
      <FlowFuseWordmark :uid="uid" />
    </span>
    <h2 v-if="headingId" :id="headingId" class="ff-expert-brand__product">Expert</h2>
    <span v-else class="ff-expert-brand__product">Expert</span>
  </div>
</template>

<style scoped>
/* Only as wide as its content, in the box as in the modal, so the flight between them moves
   it without stretching it. */
.ff-expert-brand {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width: fit-content;
}

.ff-expert-brand__wordmark {
    display: inline-block;
    width: 6rem;
    height: 1.5rem;
    line-height: 0;
}

.ff-expert-brand__product {
    margin: 0 0 -0.25rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
    color: #374151;
}
</style>

<style>
/* Same pace as the box morphing into the input area (src/css/style.css, morphing-content). */
::view-transition-group(ff-expert-brand) {
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
}
</style>
