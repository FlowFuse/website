<script setup lang="ts">
import type { GuidePanelContent } from '~/types/application-guide'

defineProps<{ panel: GuidePanelContent }>()
</script>

<template>
  <div>
    <div v-if="panel.kicker" class="ag-blip">
      <p class="ag-kicker">{{ panel.kicker }}</p>
      <p v-if="panel.kickerNote" class="ag-panel-note">{{ panel.kickerNote }}</p>
    </div>

    <p v-if="panel.diagramTitle" class="ag-diagram-title">{{ panel.diagramTitle }}</p>

    <GuideDiagram
      v-if="panel.diagram"
      :lanes="panel.diagram.lanes"
      :legend="panel.diagram.legend"
      :note="panel.diagram.note"
    />

    <p v-if="panel.summary" class="ag-prose">{{ panel.summary }}</p>

    <div v-if="panel.useWhen" class="ag-usewhen">
      <p class="ag-usewhen-label">{{ panel.useWhenHeading ?? 'Use it when' }}</p>
      <p class="ag-usewhen-text">{{ panel.useWhen }}</p>
    </div>

    <div v-if="panel.how" class="ag-sub">
      <h3 class="ag-sub-head">{{ panel.howHeading ?? 'How it works' }}</h3>
      <p class="ag-prose">{{ panel.how }}</p>
    </div>

    <div v-if="panel.lists?.length" class="ag-lists">
      <div v-for="list in panel.lists" :key="list.heading">
        <h3 class="ag-sub-head">{{ list.heading }}</h3>
        <ul class="ag-list">
          <li v-for="item in list.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div
      v-if="panel.callout"
      class="ag-callout"
      :class="panel.callout.tone === 'watch' ? 'ag-callout--watch' : 'ag-callout--good'"
    >
      <p class="ag-callout-label">{{ panel.callout.tone === 'watch' ? 'Watch out' : 'Good for' }}</p>
      <p class="ag-callout-text">{{ panel.callout.text }}</p>
    </div>

    <div v-if="panel.footnote" class="ag-footnote">
      <p>{{ panel.footnote.text }}</p>
      <NuxtLink v-if="panel.footnote.link" :to="panel.footnote.link.to">
        {{ panel.footnote.link.label }}
      </NuxtLink>
    </div>
  </div>
</template>
