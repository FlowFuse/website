<script setup lang="ts">
const { data } = await useAsyncData('certified-nodes', () => queryCollection('certifiedNodes').first())

const bundles = computed(() => data.value?.bundles ?? [])
type Bundle = typeof bundles.value[number]
const items = computed(() => bundles.value.map(b => ({ value: b.id, label: b.tier, bundle: b })))

const nodeCount = (b: Bundle) => b.groups.reduce((n, g) => n + g.nodes.length, 0)

const ACCENT: Record<string, string> = { indigo: 'bg-indigo-600', red: 'bg-red-600' }
const accentClass = (b: Bundle) => ACCENT[b.accent] ?? 'bg-gray-500'
</script>

<template>
  <section v-if="data" class="mt-28">
    <h2 class="text-center mb-3"><span class="text-indigo-600">Certified</span> Nodes</h2>
    <p v-if="data.intro" class="text-center text-gray-500 max-w-2xl mx-auto mb-10">{{ data.intro }}</p>

    <UTabs
      :items="items"
      default-value="it"
      :unmount-on-hide="false"
      :ui="{ list: 'w-fit mx-auto', trigger: 'px-6 py-2.5 text-base', content: 'mt-8' }"
    >
      <template #leading="{ item }">
        <span class="cert-dot size-2.5 rounded-full transition-colors" :class="accentClass(item.bundle)" />
      </template>

      <template #content="{ item }">
        <div class="flex flex-col gap-8">
          <p class="text-center text-gray-600">
            {{ item.bundle.tagline }}
            <span class="block text-sm text-gray-400 mt-1">{{ nodeCount(item.bundle) }} certified connectors, ready to drop into a flow</span>
          </p>
          <div v-for="group in item.bundle.groups" :key="group.label">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-400">{{ group.label }}</span>
              <span class="flex-1 h-px bg-gray-200" />
            </div>
            <div class="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="node in group.nodes"
                :key="node.name"
                class="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm"
              >
                <span class="flex-none grid place-items-center size-8 rounded-lg text-[11px] font-extrabold text-white" :class="accentClass(item.bundle)">{{ node.abbr }}</span>
                <div class="min-w-0">
                  <div class="text-sm font-semibold text-gray-900">{{ node.name }}</div>
                  <div class="text-xs leading-snug text-gray-500 mt-0.5">{{ node.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UTabs>
  </section>
</template>

<style scoped>
[data-state="active"] .cert-dot {
  background-color: #fff;
}
</style>
