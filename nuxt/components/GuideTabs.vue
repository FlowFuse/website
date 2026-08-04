<script setup lang="ts">
import type { GuidePanelContent } from './GuidePanel.vue'

// The tab is reflected in the URL hash so a specific pattern can be linked to
// directly - these pages get shared a panel at a time in customer conversations.
const props = defineProps<{ panels: GuidePanelContent[] }>()

const slugify = (label: string) => label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const active = ref(0)
const route = useRoute()

const selectFromHash = (hash: string) => {
    const target = hash.replace(/^#/, '')
    if (!target) return
    const index = props.panels.findIndex(panel => slugify(panel.label) === target)
    if (index !== -1) active.value = index
}

onMounted(() => selectFromHash(window.location.hash))
watch(() => route.hash, hash => selectFromHash(hash))

const select = (index: number) => {
    active.value = index
    // replaceState rather than a router push: the tab is a view of one page, so it
    // should not add a history entry per click.
    if (import.meta.client) {
        window.history.replaceState(null, '', `#${slugify(props.panels[index].label)}`)
    }
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-1" role="tablist">
      <button
        v-for="(panel, index) in panels"
        :id="`tab-${slugify(panel.label)}`"
        :key="panel.label"
        type="button"
        role="tab"
        :aria-selected="active === index"
        :aria-controls="slugify(panel.label)"
        class="rounded-t-md border-b-2 px-3 py-2 text-sm font-medium transition-colors"
        :class="active === index
          ? 'border-indigo-600 text-indigo-700'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
        @click="select(index)"
      >{{ panel.label }}</button>
    </div>

    <!-- The panel carries the bare slug as its id so #<slug> is a real anchor, not just a
         selector this component interprets - the link checker in CI resolves anchors against
         the built HTML, and the overview pages deep-link straight to individual patterns. -->
    <div
      v-for="(panel, index) in panels"
      v-show="active === index"
      :id="slugify(panel.label)"
      :key="panel.label"
      role="tabpanel"
      :aria-labelledby="`tab-${slugify(panel.label)}`"
    >
      <GuidePanel :panel="panel" />
    </div>
  </div>
</template>
