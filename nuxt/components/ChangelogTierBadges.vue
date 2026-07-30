<script setup lang="ts">
const props = defineProps<{
    cloud?: string | null
    selfHosted?: string | null
}>()

const showCloud = computed(() => props.cloud && props.cloud !== 'Not available')
const showSelfHosted = computed(() => props.selfHosted && props.selfHosted !== 'Not available')

function onBadgeClick(hosting: string, tier?: string | null) {
    if (typeof (window as any).capture === 'function') {
        (window as any).capture('tier-badge-click', { hosting, tier, page: location.pathname })
    }
}
</script>

<template>
  <div v-if="showCloud || showSelfHosted" class="ff-tier-badges">
    <div v-if="showCloud" class="ff-tier-badge ff-tier--available" @click="onBadgeClick('cloud', cloud)">
      <span class="ff-tier-badge__label">Cloud</span>
      <span class="ff-tier-badge__value">{{ cloud }}</span>
    </div>
    <div v-if="showSelfHosted" class="ff-tier-badge ff-tier--available" @click="onBadgeClick('self-hosted', selfHosted)">
      <span class="ff-tier-badge__label">Self-Hosted</span>
      <span class="ff-tier-badge__value">{{ selfHosted }}</span>
    </div>
  </div>
</template>
