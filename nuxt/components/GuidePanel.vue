<script setup lang="ts">
import type { GuidePanelContent } from '~/types/bestpractice'

defineProps<{ panel: GuidePanelContent }>()
</script>

<template>
  <div>
    <div v-if="panel.kicker" class="bp-blip">
      <p class="bp-kicker">{{ panel.kicker }}</p>
      <p v-if="panel.kickerNote" class="bp-panel-note">{{ panel.kickerNote }}</p>
    </div>

    <p v-if="panel.diagramTitle" class="bp-diagram-title">{{ panel.diagramTitle }}</p>

    <GuideDiagram
      v-if="panel.diagram"
      :lanes="panel.diagram.lanes"
      :legend="panel.diagram.legend"
      :note="panel.diagram.note"
    />

    <p v-if="panel.summary" class="bp-prose">{{ panel.summary }}</p>

    <div v-if="panel.useWhen" class="bp-usewhen">
      <p class="bp-usewhen-label">{{ panel.useWhenHeading ?? 'Use it when' }}</p>
      <p class="bp-usewhen-text">{{ panel.useWhen }}</p>
    </div>

    <div v-if="panel.how" class="bp-sub">
      <h3 class="bp-sub-head">{{ panel.howHeading ?? 'How it works' }}</h3>
      <p class="bp-prose">{{ panel.how }}</p>
    </div>

    <div v-if="panel.lists?.length" class="bp-lists">
      <div v-for="list in panel.lists" :key="list.heading">
        <h3 class="bp-sub-head">{{ list.heading }}</h3>
        <ul class="bp-list">
          <li v-for="item in list.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div
      v-if="panel.callout"
      class="bp-callout"
      :class="panel.callout.tone === 'watch' ? 'bp-callout--watch' : 'bp-callout--good'"
    >
      <p class="bp-callout-label">{{ panel.callout.tone === 'watch' ? 'Watch out' : 'Good for' }}</p>
      <p class="bp-callout-text">{{ panel.callout.text }}</p>
    </div>

    <div v-if="panel.footnote" class="bp-footnote">
      <p>{{ panel.footnote.text }}</p>
      <NuxtLink v-if="panel.footnote.link" :to="panel.footnote.link.to">
        {{ panel.footnote.link.label }}
      </NuxtLink>
    </div>
  </div>
</template>
