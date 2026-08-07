<script setup lang="ts">
import type { CertifiedCollection, IntegrationCatalogEntry } from '../../types/integrations'
import { INTEGRATION_CATEGORIES } from '../../types/integrations'
import { monogram, nodeProducts, tileClass } from '../../utils/integrations-ui'

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

const productOptions: CertifiedCollection[] = ['hub', 'edge']
function onSelect (p: 'all' | CertifiedCollection) {
    if (p !== 'all') emit('update:product', p)
}
</script>

<template>
    <section class="container m-auto md:max-w-6xl px-4">
        <CertifiedShowcaseCard>
            <template #header>
                <CertifiedShowcaseHeader intro="Choosing a node from a README is a gamble. Every Certified Node is vetted, owned by a named maintainer, and patched by FlowFuse — bundled with the product that fits your job." />
            </template>

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
                        <CertifiedNodeTile
                            v-for="node in group.nodes"
                            :key="node._id"
                            :abbr="monogram(node.name || node._id)"
                            :name="node.name"
                            :description="node.description"
                            :tile-class="tileClass(node)"
                        />
                    </div>
                </div>
            </div>
        </CertifiedShowcaseCard>
    </section>
</template>
