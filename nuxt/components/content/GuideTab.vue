<script setup lang="ts">
// One panel inside :::guide-tabs. Registers its label with the parent and shows
// its markdown children only when it is the active tab.
import { inject, computed } from 'vue'

const props = defineProps<{ label?: string }>()

const ctx = inject<{ active: { value: number }, register: () => number } | null>('guideTabs', null)
const index = ctx ? ctx.register() : 0
const isActive = computed(() => !ctx || ctx.active.value === index)
</script>

<template>
  <div v-show="isActive" class="ff-tab-panel" role="tabpanel">
    <slot />
  </div>
</template>
