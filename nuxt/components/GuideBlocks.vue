<script setup lang="ts">
import type { GuideBlock } from '~/types/bestpractice'

// Every guide page is a list of blocks. Keeping the page shapes in data means the
// two guides stay visually consistent and a new page is a YAML file, not a component.
defineProps<{ blocks: GuideBlock[] }>()

const gridClass = (columns?: number) => `bp-grid bp-grid--${columns ?? 2}`
</script>

<template>
  <div>
    <section v-for="(block, index) in blocks" :key="index" class="bp-section">
      <!-- A kicker on its own block gets the accent rule, as on a pattern panel -->
      <div v-if="block.kicker" class="bp-blip">
        <p class="bp-kicker">{{ block.kicker }}</p>
        <p v-if="block.type === 'prose' && block.body" class="bp-prose">{{ block.body }}</p>
      </div>

      <h2 v-if="block.heading" class="bp-cat-head">{{ block.heading }}</h2>

      <!-- Plain prose. Skipped when the kicker block above already rendered it. -->
      <p v-if="block.type === 'prose' && !block.kicker" class="bp-prose">{{ block.body }}</p>

      <!-- A layered diagram -->
      <GuideDiagram
        v-else-if="block.type === 'diagram'"
        :lanes="block.lanes ?? []"
        :legend="block.legend"
        :note="block.note"
      />

      <!-- Definition cards: the core pieces, the pattern families -->
      <div v-else-if="block.type === 'cards'" :class="gridClass(block.columns)">
        <div v-for="item in block.items" :key="item.title" class="bp-card">
          <p class="bp-card-title">{{ item.title }}</p>
          <p v-if="item.body" class="bp-card-body">{{ item.body }}</p>
        </div>
      </div>

      <!-- Numbered method steps -->
      <ol v-else-if="block.type === 'steps'" class="bp-steps">
        <li v-for="(item, i) in block.items" :key="item.title" class="bp-step">
          <span class="bp-step-n">{{ i + 1 }}</span>
          <span class="bp-step-text">
            <span class="bp-step-title">{{ item.title }}</span>
            <span v-if="item.body" class="bp-step-body">{{ item.body }}</span>
          </span>
        </li>
      </ol>

      <!-- Cards that navigate onwards. A single one reads as the "next page" invitation. -->
      <div v-else-if="block.type === 'linkCards' && (block.items?.length ?? 0) > 1" :class="gridClass(block.columns)">
        <NuxtLink
          v-for="item in block.items"
          :key="item.title"
          :to="item.link?.to ?? '/bestpractice/'"
          class="bp-card"
        >
          <p class="bp-card-title">{{ item.title }}</p>
          <p v-if="item.body" class="bp-card-body">{{ item.body }}</p>
          <p v-if="item.link" class="bp-card-go">{{ item.link.label }}</p>
        </NuxtLink>
      </div>

      <NuxtLink
        v-else-if="block.type === 'linkCards' && block.items?.length === 1"
        :to="block.items[0].link?.to ?? '/bestpractice/'"
        class="bp-next"
      >
        <p class="bp-next-lead">{{ block.items[0].title }}</p>
        <p v-if="block.items[0].body" class="bp-next-text">{{ block.items[0].body }}</p>
        <p v-if="block.items[0].link" class="bp-next-go">{{ block.items[0].link.label }}</p>
      </NuxtLink>

      <!-- Tabbed pattern set -->
      <GuideTabs v-else-if="block.type === 'tabs'" :panels="block.panels ?? []" />

      <!-- Aside pointing at docs or another page -->
      <div v-else-if="block.type === 'note'" class="bp-note">
        <p>{{ block.body }}</p>
        <NuxtLink v-if="block.link" :to="block.link.to">{{ block.link.label }}</NuxtLink>
      </div>

      <!-- The architecture, in one sentence -->
      <div v-else-if="block.type === 'sentence'" class="bp-sentence">
        <p>{{ block.body }}</p>
      </div>
    </section>
  </div>
</template>
