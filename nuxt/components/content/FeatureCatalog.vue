<template>
  <div id="feature-catalog-outer" class="mb-10" :class="{ 'ff-fc-fullscreen': isFullscreen }">
    <div class="ff-fc-toolbar flex justify-end mb-2">
      <button
        type="button"
        class="text-xs text-gray-500 hover:text-indigo-600 border border-gray-200 rounded px-2 py-1 transition-colors"
        @click="toggleFullscreen"
      >
        <span v-if="!isFullscreen">&#x26F6; Expand table</span>
        <span v-else>&#x2715; Close</span>
      </button>
    </div>

    <div class="overflow-x-auto max-w-full">
      <table class="border-collapse text-sm" style="width: max-content; min-width: 100%;">
        <colgroup>
          <col style="width: 220px;" />
          <col v-for="n in 8" :key="n" :style="n <= 2 ? 'width: 110px;' : 'width: 100px;'" />
        </colgroup>
        <thead>
          <tr>
            <th class="py-3 px-4 text-left align-bottom border-b-2 border-gray-200" rowspan="2">Feature</th>
            <th colspan="1" class="py-3 px-4 text-center border border-gray-200 rounded-lg border-l-2 border-l-gray-300">FlowFuse Cloud</th>
            <th colspan="1" class="py-3 px-4 text-center border border-gray-200 rounded-lg border-l-2 border-l-gray-300">Self Hosted</th>
            <th colspan="6" class="py-3 px-4 text-center border border-gray-200 rounded-lg border-l-2 border-l-gray-300">Solutions</th>
          </tr>
          <tr>
            <th
              v-for="h in tierHeaders"
              :key="h.key"
              class="text-center py-3 px-4 border-b-2 border-gray-200"
              :class="h.first ? 'border-l-2 border-l-gray-300' : 'border-r border-r-gray-100'"
            >{{ h.label }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="section in sections" :key="section.label">
            <tr>
              <td colspan="9" class="py-2 px-4 bg-gray-100 font-semibold text-gray-600 text-xs uppercase tracking-wide">{{ section.label }}</td>
            </tr>
            <tr v-for="feature in section.features" :key="feature.id" class="border-t border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4 align-top border-r border-gray-100" :class="{ 'pl-8': feature.subfeature }">
                <template v-if="feature.subfeature"><span class="text-gray-500 mr-1">└</span><span class="text-gray-600 font-medium">{{ feature.label }}</span></template>
                <strong v-else>{{ feature.label }}</strong>
                <span v-if="feature.beta" class="text-xs text-indigo-600 font-medium bg-indigo-50 rounded" style="padding: 2px 8px;">Beta</span>
                <template v-if="feature.description"><br /><span class="text-gray-500">{{ feature.description }}</span></template>
                <template v-if="feature.docsLink"><br /><a :href="feature.docsLink" target="_blank" rel="noopener" class="text-indigo-600 text-xs">Docs</a></template>
                <template v-for="cl in changelogLinks(feature)" :key="cl.url">
                  <br /><a :href="cl.url" target="_blank" rel="noopener" class="text-indigo-600 text-xs">Changelog<template v-if="changelogLinks(feature).length > 1"> ({{ cl.release }})</template></a>
                </template>
              </td>

              <template v-for="group in groups" :key="group">
                <template v-if="feature[group]">
                  <td
                    v-for="(tier, i) in tiers"
                    :key="group + '-' + tier"
                    class="py-3 px-4 align-top text-center border-r border-gray-100"
                    :class="[i === 0 ? 'border-l-2 border-l-gray-300' : '', cellDimmed(feature[group][tier]) ? 'opacity-40' : '']"
                  >
                    <template v-if="cellOf(feature, group, tier) && cellOf(feature, group, tier).value === true">&#x2713;</template>
                    <span v-else-if="cellOf(feature, group, tier) && cellOf(feature, group, tier).value === 'contact'" class="text-gray-500 text-xs">On request</span>
                    <template v-else-if="cellOf(feature, group, tier) && cellOf(feature, group, tier).value === 'list'">{{ (cellOf(feature, group, tier).options || []).join(', ') }}</template>
                    <template v-else-if="cellOf(feature, group, tier) && cellOf(feature, group, tier).value">{{ cellOf(feature, group, tier).value }}</template>
                    <template v-else-if="!(cellOf(feature, group, tier) && cellOf(feature, group, tier).note)">&#x2013;</template>
                    <template v-if="cellOf(feature, group, tier) && cellOf(feature, group, tier).note"><br v-if="cellOf(feature, group, tier).value" /><span class="text-gray-500 text-xs">{{ cellOf(feature, group, tier).note }}</span></template>
                  </td>
                </template>
                <td v-else colspan="1" class="py-3 px-4 text-center text-gray-300 border-r border-gray-100 border-l-2 border-l-gray-300">N/A</td>
              </template>

              <td
                v-for="(sol, i) in solutions"
                :key="'sol-' + sol"
                class="py-3 px-4 text-center align-top border-r border-gray-100"
                :class="i === 0 ? 'border-l-2 border-l-gray-300' : ''"
              >{{ feature.solutions && feature.solutions.includes(sol) ? '✓' : '–' }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { parse as parseYaml } from 'yaml'
import featureCatalogRaw from '../../../src/_data/featureCatalog.yaml?raw'
import { ref, onMounted, onUnmounted } from 'vue'

// `yaml`'s parse() is a pure parser (no arbitrary type construction); featureCatalog.yaml is trusted in-repo data.
const featureCatalog = parseYaml(featureCatalogRaw) || {}
const sections = featureCatalog.sections || []

const tiers = ['enterprise']
const groups = ['cloud', 'selfHosted']
const solutions = ['mes', 'scada', 'uns', 'edge-connectivity', 'it-ot-middleware', 'data-integration']

const tierHeaders = [
  { key: 'c-enterprise', label: 'Enterprise', first: true },
  { key: 'sh-enterprise', label: 'Enterprise', first: true },
  { key: 'mes', label: 'MES', first: true },
  { key: 'scada', label: 'SCADA', first: false },
  { key: 'uns', label: 'UNS', first: false },
  { key: 'edge', label: 'Edge', first: false },
  { key: 'itot', label: 'IT/OT', first: false },
  { key: 'dataint', label: 'Data Int.', first: false },
]

function cellOf (feature, group, tier) {
  return feature[group] ? feature[group][tier] : undefined
}
function cellDimmed (cell) {
  return !!(cell && cell.dimmed)
}
function changelogLinks (feature) {
  const cl = feature.changelog
  if (!cl) return []
  if (Array.isArray(cl)) return cl
  return [{ url: cl, release: null }]
}

const isFullscreen = ref(false)
function toggleFullscreen () {
  isFullscreen.value = !isFullscreen.value
  if (import.meta.client) {
    document.body.style.overflow = isFullscreen.value ? 'hidden' : ''
  }
}
function onKeydown (e) {
  if (e.key === 'Escape' && isFullscreen.value) toggleFullscreen()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<style scoped>
.ff-fc-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #fff;
  overflow: auto;
  padding: 0 1rem;
  margin-bottom: 0 !important;
}
.ff-fc-fullscreen :deep(table) {
  min-width: 100%;
}
.ff-fc-toolbar {
  /* in fullscreen, keep the close button reachable */
}
.ff-fc-fullscreen .ff-fc-toolbar {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}
</style>
