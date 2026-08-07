<script setup lang="ts">
defineProps<{
    abbr: string
    name: string
    description?: string
    tileClass: string
}>()
</script>

<template>
    <div class="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm">
        <span class="flex-none grid place-items-center w-8 h-8 rounded-lg text-white font-semibold text-[11px]" :class="tileClass">{{ abbr }}</span>
        <div class="min-w-0">
            <div class="text-sm font-medium text-gray-900 leading-tight">{{ name }}</div>
            <div class="text-xs text-gray-500 leading-snug mt-0.5">{{ description }}</div>
        </div>
    </div>
</template>
