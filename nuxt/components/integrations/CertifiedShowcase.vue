<script setup lang="ts">
import type { CertifiedCollection, IntegrationCatalogEntry } from '../../types/integrations'
import { INTEGRATION_CATEGORIES } from '../../types/integrations'
import { certifiedHref, monogram, nodeProducts, tileClass } from '../../utils/integrations-ui'

const props = defineProps<{
    nodes: IntegrationCatalogEntry[]
    product: CertifiedCollection
}>()
const emit = defineEmits<{ 'update:product': [CertifiedCollection] }>()

const TAGLINE: Record<CertifiedCollection, string> = {
    hub: 'Move data between the databases, brokers, and APIs your business runs on.',
    edge: 'Connect the PLCs, machines, and controllers across your plant floor.'
}

const certified = computed(() =>
    props.nodes.filter(n => n.tier === 'certified' && nodeProducts(n).includes(props.product))
)

const groups = computed(() => {
    const map = new Map<string, { key: string, label: string, nodes: IntegrationCatalogEntry[] }>()
    for (const n of certified.value) {
        const key = (n.categories?.[0] && INTEGRATION_CATEGORIES[n.categories[0]]) ? n.categories[0] : 'other'
        const label = INTEGRATION_CATEGORIES[key] ?? 'Other'
        if (!map.has(key)) map.set(key, { key, label, nodes: [] })
        map.get(key)!.nodes.push(n)
    }
    return [...map.values()]
})

// Same event the /node-red/ certified grid emits (src/node-red/index.njk), so
// clicks on a connector aggregate across every place it is featured.
// window.capture is injected by src/_includes/analytics/body.html and is absent
// outside production, hence the guard.
function captureNodeClick (node: IntegrationCatalogEntry) {
    const capture = (window as any).capture
    if (typeof capture === 'function') {
        capture('certified-node-click', { node: node._id, collection: props.product, page: location.pathname })
    }
}

const productOptions: CertifiedCollection[] = ['hub', 'edge']
function onSelect (p: 'all' | CertifiedCollection) {
    if (p !== 'all') emit('update:product', p)
}
</script>

<template>
    <section class="container m-auto md:max-w-6xl px-4">
        <div class="showcase-card rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div class="px-6 md:px-9 pt-7 md:pt-9 pb-7">
                <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-900">
                    <IntegrationsCertifiedIcon class="w-4 h-4" />FlowFuse Certified
                </span>
                <h2 class="mt-3">Certified Nodes you can trust in production</h2>
                <p class="mt-2 max-w-3xl text-gray-600 leading-relaxed">
                    Choosing a node from a README is a gamble. Every Certified Node is vetted, owned by a named maintainer, and patched by FlowFuse — bundled with the product that fits your job.
                </p>
                <ul class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>Vetted, accountable authors</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>CVEs patched on FlowFuse's timeline</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>Ships with Hub &amp; Edge</li>
                </ul>
            </div>

            <div class="px-6 md:px-9 pt-7 pb-7 md:pb-9 border-t border-gray-100">
                <div class="flex items-center justify-between gap-4 flex-wrap mb-5">
                    <IntegrationsProductToggle :active="product" :options="productOptions" variant="solid" label="Choose product" @select="onSelect" />
                    <span class="text-sm text-gray-500">{{ certified.length }} certified connectors</span>
                </div>

                <p class="text-gray-600 mb-6">{{ TAGLINE[product] }}</p>

                <div class="flex flex-col gap-6">
                    <div v-for="group in groups" :key="group.key">
                        <div v-if="group.key !== 'other'" class="flex items-center gap-3 mb-3">
                            <span class="text-xs font-semibold uppercase tracking-wider text-gray-500">{{ group.label }}</span>
                            <span class="flex-1 h-px bg-gray-200" />
                        </div>
                        <div class="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                            <component
                                :is="certifiedHref(node) ? 'a' : 'div'"
                                v-for="node in group.nodes"
                                :key="node._id"
                                :href="certifiedHref(node) || undefined"
                                class="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm hover:no-underline"
                                @click="captureNodeClick(node)"
                            >
                                <span class="flex-none grid place-items-center w-8 h-8 rounded-lg text-white font-semibold text-[11px]" :class="tileClass(node)">{{ monogram(node.name || node._id) }}</span>
                                <div class="min-w-0">
                                    <div class="text-sm font-medium text-gray-900 leading-tight group-hover:text-indigo-600">{{ node.name }}</div>
                                    <div class="text-xs text-gray-500 leading-snug mt-0.5">{{ node.description }}</div>
                                </div>
                            </component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.showcase-card {
    background:
        radial-gradient(55% 55% at 100% 0%, color-mix(in srgb, var(--color-red-600, #dc2626) 12%, transparent), transparent 72%),
        radial-gradient(58% 60% at 0% 100%, color-mix(in srgb, var(--color-indigo-600, #4f46e5) 12%, transparent), transparent 72%),
        #fff;
}
</style>
