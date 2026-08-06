<script setup lang="ts">
const props = defineProps<{
    // Plan names from useChangelogPlans / useDocsPlans. Empty renders nothing, which is the
    // case on every page whose feature is not in the catalog.
    plans: string[]
}>()

// window.capture is injected by the site's analytics script (see
// src/_includes/analytics/body.html) and is a no-op wrapper around
// posthog.capture - it's absent outside production, hence the guard.
function onBadgeClick (plan: string) {
    if (typeof (window as any).capture === 'function') {
        (window as any).capture('tier-badge-click', { plan, page: location.pathname })
    }
}
</script>

<template>
  <div v-if="props.plans.length" class="ff-tier-badges not-prose">
    <span class="ff-tier-badges__label">Available in</span>
    <NuxtLink
      v-for="plan in props.plans"
      :key="plan"
      to="/pricing/#comparison"
      class="ff-tier-badge"
      @click="onBadgeClick(plan)"
    >{{ plan }}</NuxtLink>
  </div>
</template>
