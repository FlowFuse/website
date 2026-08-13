<script setup lang="ts">
// @ts-ignore untyped module
import { planHref } from '../../lib/feature-catalog.mjs'

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

// Each badge links to its own plan's product page. Anything that is not a plan name renders
// unlinked rather than pointing at a page that does not exist; the catalog only ever produces
// plan names, so this is a guard for hand written markup.
const badges = computed(() => planList.value.map(plan => ({ plan, href: planHref(plan) })))

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
    <template v-for="badge in badges" :key="badge.plan">
      <NuxtLink
        v-if="badge.href"
        :to="badge.href"
        class="ff-tier-badge"
        @click="onBadgeClick(badge.plan)"
      >{{ badge.plan }}</NuxtLink>
      <span v-else class="ff-tier-badge">{{ badge.plan }}</span>
    </template>
  </div>
</template>
