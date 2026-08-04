<script setup lang="ts">
import type { GuideBlock } from '~/types/bestpractice'

// Every guide page is a list of blocks. Keeping the page shapes in data means the
// two guides stay visually consistent and a new page is a YAML file, not a component.
defineProps<{ blocks: GuideBlock[] }>()

const cardGridClass = (columns?: number) => ({
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
}[columns ?? 2] ?? 'sm:grid-cols-2')
</script>

<template>
  <div>
    <section v-for="(block, index) in blocks" :key="index" class="mb-10">
      <p
        v-if="block.kicker"
        class="m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600"
      >{{ block.kicker }}</p>

      <h2
        v-if="block.heading"
        class="m-0 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400"
      >{{ block.heading }}</h2>

      <!-- Plain prose -->
      <p v-if="block.type === 'prose'" class="text-gray-600">{{ block.body }}</p>

      <!-- A layered diagram -->
      <GuideDiagram
        v-else-if="block.type === 'diagram'"
        :lanes="block.lanes ?? []"
        :legend="block.legend"
        :note="block.note"
      />

      <!-- Definition cards: the core pieces, the pattern families -->
      <div v-else-if="block.type === 'cards'" class="grid grid-cols-1 gap-4" :class="cardGridClass(block.columns)">
        <div
          v-for="item in block.items"
          :key="item.title"
          class="rounded-lg border border-gray-200 bg-white p-4"
        >
          <p class="m-0 font-semibold text-gray-800">{{ item.title }}</p>
          <p v-if="item.body" class="m-0 mt-1 text-sm text-gray-600">{{ item.body }}</p>
        </div>
      </div>

      <!-- Numbered method steps -->
      <ol v-else-if="block.type === 'steps'" class="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        <li
          v-for="(item, i) in block.items"
          :key="item.title"
          class="m-0 flex gap-3 rounded-lg border border-gray-200 bg-white p-4"
        >
          <span
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white"
          >{{ i + 1 }}</span>
          <span>
            <span class="block font-semibold text-gray-800">{{ item.title }}</span>
            <span v-if="item.body" class="mt-1 block text-sm text-gray-600">{{ item.body }}</span>
          </span>
        </li>
      </ol>

      <!-- Cards that navigate onwards -->
      <div v-else-if="block.type === 'linkCards'" class="grid grid-cols-1 gap-4" :class="cardGridClass(block.columns)">
        <NuxtLink
          v-for="item in block.items"
          :key="item.title"
          :to="item.link?.to ?? '/bestpractice/'"
          class="group rounded-lg border border-gray-200 bg-white p-4 no-underline transition hover:border-indigo-500 hover:no-underline hover:drop-shadow-md"
        >
          <p class="m-0 font-semibold text-gray-800 group-hover:text-indigo-700">{{ item.title }}</p>
          <p v-if="item.body" class="m-0 mt-1 text-sm text-gray-600">{{ item.body }}</p>
          <p v-if="item.link" class="m-0 mt-2 text-sm font-medium text-indigo-600">{{ item.link.label }}</p>
        </NuxtLink>
      </div>

      <!-- Tabbed pattern set -->
      <GuideTabs v-else-if="block.type === 'tabs'" :panels="block.panels ?? []" />

      <!-- Aside pointing at docs or another page -->
      <div v-else-if="block.type === 'note'" class="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p class="m-0 text-gray-600">{{ block.body }}</p>
        <NuxtLink v-if="block.link" :to="block.link.to" class="mt-2 inline-block font-medium">
          {{ block.link.label }}
        </NuxtLink>
      </div>

      <!-- The architecture, in one sentence -->
      <div v-else-if="block.type === 'sentence'" class="rounded-lg border-l-4 border-indigo-600 bg-indigo-50 p-4">
        <p class="m-0 text-lg leading-relaxed text-gray-800">{{ block.body }}</p>
      </div>
    </section>
  </div>
</template>
