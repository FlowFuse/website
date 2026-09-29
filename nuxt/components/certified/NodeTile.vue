<script setup lang="ts">
/*
    Certified connector tile, shared by the /pricing/ and /integrations/ showcases.

    `href` is the node's documentation page (certifiedHref in utils/integrations-ui.ts):
    the publisher's docs URL, which can be on another site, or else the collection
    index under /docs/flowfuse-nodes/. That is why this is a plain <a> and not a
    <NuxtLink>. A tile with no target stays a <div> rather than becoming a link that
    goes nowhere.

    Callers attach their own click handler (for analytics); with a single root
    element it lands on the tile itself.
*/
defineProps<{
    abbr: string
    name: string
    description?: string
    tileClass: string
    href?: string | null
}>()
</script>

<template>
    <component
        :is="href ? 'a' : 'div'"
        :href="href || undefined"
        class="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm hover:no-underline"
    >
        <span class="flex-none grid place-items-center w-8 h-8 rounded-lg text-white font-semibold text-[11px]" :class="tileClass">{{ abbr }}</span>
        <div class="min-w-0">
            <div class="text-sm font-medium text-gray-900 leading-tight" :class="{ 'group-hover:text-indigo-600': !!href }">{{ name }}</div>
            <div class="text-xs text-gray-500 leading-snug mt-0.5">{{ description }}</div>
        </div>
    </component>
</template>
