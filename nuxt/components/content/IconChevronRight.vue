<!--
  MDC replacement for the icon-chevron-right custom element that the upstream
  FlowFuse/flowfuse docs define in an inline <script>. @nuxt/content never executes that
  script, so docs-source.ts strips it and this component resolves the tag instead, the
  same way ChecklistItem.vue does for <checklist-item>.
-->
<template>
  <svg class="ff-icon ff-icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
</template>
