<script setup lang="ts">
const { data } = await useAsyncData('certified-nodes', () => queryCollection('certifiedNodes').first())

const bundles = computed(() => data.value?.bundles ?? [])
type Bundle = typeof bundles.value[number]

const active = ref<'it' | 'ot'>('it')
const activeBundle = computed(() => bundles.value.find(b => b.id === active.value) ?? bundles.value[0])
const nodeCount = (b?: Bundle) => b ? b.groups.reduce((n, g) => n + g.nodes.length, 0) : 0

const ACCENT: Record<string, string> = { indigo: 'bg-indigo-600', red: 'bg-red-600' }
const accentClass = (b: Bundle) => ACCENT[b.accent] ?? 'bg-gray-500'
const tileClass = (b: Bundle, node: { both?: boolean }) =>
    node.both ? 'bg-gradient-to-br from-indigo-600 to-red-600' : accentClass(b)
</script>

<template>
    <section v-if="data" class="mt-28">
        <CertifiedShowcaseCard>
            <template #header>
                <CertifiedShowcaseHeader :intro="data.intro" />
            </template>

            <div class="flex items-center justify-between gap-4 flex-wrap mb-5">
                <div class="inline-flex rounded-full bg-gray-100 border border-gray-200 p-1 gap-1" role="group" aria-label="Choose product">
                    <button
                        v-for="b in bundles"
                        :key="b.id"
                        type="button"
                        :aria-pressed="active === b.id"
                        class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        :class="active === b.id ? `text-white ${accentClass(b)}` : 'text-gray-600 hover:text-gray-800'"
                        @click="active = b.id"
                    >
                        <span class="w-2 h-2 rounded-full" :class="active === b.id ? 'bg-white' : accentClass(b)" />
                        {{ b.tier }}
                    </button>
                </div>
                <span class="text-sm text-gray-500">{{ nodeCount(activeBundle) }} certified connectors</span>
            </div>

            <div v-for="b in bundles" v-show="active === b.id" :key="b.id" class="flex flex-col gap-6">
                <p class="text-gray-600 -mt-1">{{ b.tagline }}</p>
                <div v-for="group in b.groups" :key="group.label">
                    <div class="flex items-center gap-3 mb-3">
                        <span class="text-xs font-semibold uppercase tracking-wider text-gray-500">{{ group.label }}</span>
                        <span class="flex-1 h-px bg-gray-200" />
                    </div>
                    <div class="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                        <CertifiedNodeTile
                            v-for="node in group.nodes"
                            :key="node.name"
                            :abbr="node.abbr"
                            :name="node.name"
                            :description="node.description"
                            :tile-class="tileClass(b, node)"
                        />
                    </div>
                </div>
            </div>
            <div class="mt-8 pt-6 border-t border-gray-100 text-center">
                <NuxtLink to="/integrations" class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                    Browse all integrations
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </NuxtLink>
            </div>
        </CertifiedShowcaseCard>
    </section>
</template>
