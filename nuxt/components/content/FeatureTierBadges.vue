<script setup lang="ts">
const props = defineProps<{
    // Plan names from useChangelogPlans / useDocsPlans. Empty renders nothing, which is the
    // case on every page whose feature is not in the catalog.
    //
    // A comma separated string is accepted as well as an array, because this component is also
    // rendered from inside markdown on release blogs. MDC's propsToData joins an all-strings
    // array prop with spaces (it is written for `class`), which would turn a plan list into one
    // string and make the v-for below iterate its characters. Release blogs therefore pass a
    // comma separated string, a separator no plan name contains.
    plans: string[] | string
}>()

const planList = computed(() => Array.isArray(props.plans)
    ? props.plans
    : props.plans.split(',').map(plan => plan.trim()).filter(Boolean))

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
  <div v-if="planList.length" class="ff-tier-badges not-prose">
    <span class="ff-tier-badges__label">Available in</span>
    <NuxtLink
      v-for="plan in planList"
      :key="plan"
      to="/pricing/#comparison"
      class="ff-tier-badge"
      @click="onBadgeClick(plan)"
    >{{ plan }}</NuxtLink>
  </div>
</template>
