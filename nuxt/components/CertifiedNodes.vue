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

// Same event the /node-red/ certified grid emits (src/node-red/index.njk), so
// clicks on a connector aggregate across every place it is featured.
// window.capture is injected by src/_includes/analytics/body.html and is absent
// outside production, hence the guard.
function captureNodeClick (name: string, bundle: Bundle) {
    const capture = (window as any).capture
    if (typeof capture === 'function') {
        capture('certified-node-click', { node: name, collection: bundle.tier, page: location.pathname })
    }
}
</script>

<template>
    <section v-if="data" class="mt-28">
        <div class="showcase-card rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div class="px-6 md:px-9 pt-7 md:pt-9 pb-7">
                <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-900">
                    <IntegrationsCertifiedIcon class="w-4 h-4" />FlowFuse Certified
                </span>
                <h2 class="mt-3">Certified Nodes you can trust in production</h2>
                <p v-if="data.intro" class="mt-2 max-w-3xl text-gray-600 leading-relaxed">{{ data.intro }}</p>
                <ul class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>Vetted, accountable authors</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>CVEs patched on FlowFuse's timeline</li>
                    <li class="flex items-center gap-2"><span class="font-semibold text-gray-900">✓</span>Ships with Hub &amp; Edge</li>
                </ul>
            </div>

            <div class="px-6 md:px-9 pt-7 pb-7 md:pb-9 border-t border-gray-100">
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
                            <NuxtLink
                                v-for="node in group.nodes"
                                :key="node.name"
                                :to="node.url"
                                class="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm hover:no-underline"
                                @click="captureNodeClick(node.name, b)"
                            >
                                <span class="flex-none grid place-items-center w-8 h-8 rounded-lg text-white font-semibold text-[11px]" :class="tileClass(b, node)">{{ node.abbr }}</span>
                                <div class="min-w-0">
                                    <div class="text-sm font-medium text-gray-900 leading-tight group-hover:text-indigo-600">{{ node.name }}</div>
                                    <div class="text-xs text-gray-500 leading-snug mt-0.5">{{ node.description }}</div>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="mt-8 pt-6 border-t border-gray-100 text-center">
                    <NuxtLink to="/integrations" class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                        Browse all integrations
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    </NuxtLink>
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
