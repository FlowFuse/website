<script setup lang="ts">
defineProps<{
    intro?: string
}>()
</script>

<template>
    <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-900">
        <IntegrationsCertifiedIcon class="w-4 h-4" />FlowFuse Certified
    </span>
    <h2 class="mt-3">Certified Nodes you can trust in production</h2>
    <p v-if="intro" class="mt-2 max-w-3xl text-gray-600 leading-relaxed">{{ intro }}</p>
    <ul class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
        <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>Vetted, accountable authors</li>
        <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>CVEs patched on FlowFuse's timeline</li>
        <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>Ships with Hub &amp; Edge</li>
    </ul>
</template>
