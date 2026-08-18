<script setup lang="ts">
import type { IntegrationCatalogEntry } from '../../types/integrations'
import { INTEGRATION_CATEGORIES, PRODUCT_LABELS } from '../../types/integrations'
import { certifiedHref, monogram, nodeProducts, tileClass } from '../../utils/integrations-ui'

const props = defineProps<{
    node: IntegrationCatalogEntry
    generatedIds: Set<string>
}>()

const hasGeneratedPage = computed(() => props.generatedIds.has(props.node._id))
const href = computed<string | null>(() => {
    if (props.node.docsUrl) return props.node.docsUrl
    if (props.node.tier === 'certified') return certifiedHref(props.node)
    return hasGeneratedPage.value
        ? `/integrations/${props.node._id}/`
        : `https://flows.nodered.org/node/${props.node._id}`
})
const isInternal = computed(() =>
    props.node.docsUrl || hasGeneratedPage.value || props.node.tier === 'certified'
)
const isExternalLink = computed(() => href.value && !isInternal.value)
const externalAttrs = computed(() =>
    isExternalLink.value ? { target: '_blank', rel: 'noopener noreferrer' } : {}
)

const tile = computed(() => tileClass(props.node))
const mono = computed(() => monogram(props.node.name || props.node._id))
const categoryLabel = computed(() => {
    const key = props.node.categories?.[0]
    return (key && INTEGRATION_CATEGORIES[key]) || ''
})
const products = computed(() => nodeProducts(props.node))
const showMeta = computed(() => props.node.tier !== 'certified')
const shortDescription = computed(() => {
    if (!props.node.description) return ''
    const words = props.node.description.split(' ')
    return words.length > 18 ? words.slice(0, 18).join(' ') + '…' : props.node.description
})
</script>

<template>
    <li class="integration-card group border border-gray-200 rounded-xl bg-white transition hover:border-gray-300 hover:shadow-md">
        <component :is="href ? 'a' : 'div'" :href="href || undefined" v-bind="externalAttrs" class="relative flex h-full flex-col gap-3 p-4">
            <div class="flex items-start gap-3">
                <span class="flex-none grid place-items-center w-10 h-10 rounded-lg text-white font-semibold text-sm" :class="tile">{{ mono }}</span>
                <div class="min-w-0 flex-1">
                    <h3 class="text-[15px] font-medium leading-tight text-gray-900 group-hover:text-indigo-600 truncate">{{ node.name }}</h3>
                    <div v-if="categoryLabel" class="text-xs text-gray-500 mt-0.5">{{ categoryLabel }}</div>
                </div>
                <svg
                    v-if="isExternalLink"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-4 h-4 shrink-0 text-gray-300 group-hover:text-gray-500"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
            </div>

            <p class="text-sm leading-relaxed text-gray-500 grow">{{ shortDescription }}</p>

            <div class="flex items-center gap-1.5 flex-wrap">
                <span v-if="node.tier === 'certified'" class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-300">
                    <IntegrationsCertifiedIcon class="w-3.5 h-3.5" />Certified
                </span>
                <span v-else-if="node.tier === 'recommended'" class="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200">
                    Recommended
                </span>
                <span v-for="p in products" :key="p" class="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded ring-1 ring-inset" :class="p === 'hub' ? 'bg-indigo-50 text-indigo-700 ring-indigo-200' : 'bg-red-50 text-red-700 ring-red-200'">{{ PRODUCT_LABELS[p] }}</span>

                <span v-if="showMeta" class="ml-auto flex items-center gap-3 text-xs text-gray-500 tabular-nums">
                    <span>v{{ node.version }}</span>
                    <span v-if="node.downloads?.week" class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        {{ node.downloads.week.toLocaleString() }}
                    </span>
                </span>
            </div>
        </component>
    </li>
</template>
