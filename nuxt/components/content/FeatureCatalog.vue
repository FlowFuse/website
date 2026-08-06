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
          <col style="width: 260px;" />
          <col v-for="n in PLANS.length + SOLUTIONS.length" :key="n" style="width: 100px;" />
        </colgroup>
        <thead>
          <tr>
            <th class="py-3 px-4 text-left align-bottom border-b-2 border-gray-200" rowspan="2">Feature</th>
            <th :colspan="PLANS.length" class="py-3 px-4 text-center border border-gray-200 rounded-lg border-l-2 border-l-gray-300">Plans</th>
            <th :colspan="SOLUTIONS.length" class="py-3 px-4 text-center border border-gray-200 rounded-lg border-l-2 border-l-gray-300">Solutions</th>
          </tr>
          <tr>
            <th
              v-for="(plan, i) in PLANS"
              :key="plan.id"
              class="text-center py-3 px-4 border-b-2 border-gray-200"
              :class="i === 0 ? 'border-l-2 border-l-gray-300' : 'border-r border-r-gray-100'"
            >{{ plan.label }}</th>
            <th
              v-for="(solution, i) in SOLUTIONS"
              :key="solution.id"
              class="text-center py-3 px-4 border-b-2 border-gray-200"
              :class="i === 0 ? 'border-l-2 border-l-gray-300' : 'border-r border-r-gray-100'"
            >{{ solution.label }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="section in sections" :key="section.id">
            <tr>
              <td :colspan="1 + PLANS.length + SOLUTIONS.length" class="py-2 px-4 bg-gray-100 font-semibold text-gray-600 text-xs uppercase tracking-wide">{{ section.title }}</td>
            </tr>
            <tr v-for="feature in section.features" :key="feature.id" class="border-t border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4 align-top border-r border-gray-100" :class="{ 'pl-8': feature.subfeature }">
                <template v-if="feature.subfeature"><span class="text-gray-500 mr-1">└</span><span class="text-gray-600 font-medium">{{ feature.title }}</span></template>
                <strong v-else>{{ feature.title }}</strong>
                <span v-if="feature.beta" class="text-xs text-indigo-600 font-medium bg-indigo-50 rounded" style="padding: 2px 8px;">Beta</span>
                <span v-if="feature.showOnPricing === false" class="text-xs text-gray-500 bg-gray-100 rounded" style="padding: 2px 8px;">Not on pricing</span>
                <template v-if="feature.description"><br /><span class="text-gray-500">{{ feature.description }}</span></template>
                <template v-if="feature.docsLink"><br /><a :href="feature.docsLink" target="_blank" rel="noopener" class="text-indigo-600 text-xs">Docs</a></template>
                <template v-for="entry in feature.changelog || []" :key="entry.url">
                  <br /><a :href="entry.url" target="_blank" rel="noopener" class="text-indigo-600 text-xs">Changelog<template v-if="entry.release"> ({{ entry.release }})</template></a>
                </template>
              </td>

              <td
                v-for="(plan, i) in PLANS"
                :key="'plan-' + plan.id"
                class="py-3 px-4 align-top text-center border-r border-gray-100"
                :class="i === 0 ? 'border-l-2 border-l-gray-300' : ''"
              >
                <template v-if="!feature.tiers"><span class="text-gray-400 text-xs">TBD</span></template>
                <template v-else-if="feature.tiers[plan.id]">&#x2713;</template>
                <template v-else>&#x2013;</template>
              </td>

              <td
                v-for="(solution, i) in SOLUTIONS"
                :key="'sol-' + solution.id"
                class="py-3 px-4 text-center align-top border-r border-gray-100"
                :class="i === 0 ? 'border-l-2 border-l-gray-300' : ''"
              >{{ (feature.solutions || []).includes(solution.id) ? '✓' : '–' }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
// @ts-ignore untyped module
import { PLANS } from '../../lib/feature-catalog.mjs'

const catalog = useFeatureCatalog()
const sections = computed(() => catalog.value?.sections || [])

const SOLUTIONS = [
    { id: 'mes', label: 'MES' },
    { id: 'scada', label: 'SCADA' },
    { id: 'uns', label: 'UNS' },
    { id: 'edge-connectivity', label: 'Edge Conn.' },
    { id: 'it-ot-middleware', label: 'IT/OT' },
    { id: 'data-integration', label: 'Data Int.' },
]

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
.ff-fc-fullscreen .ff-fc-toolbar {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}
</style>
