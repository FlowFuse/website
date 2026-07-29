<script setup lang="ts">
import { findFeatureByChangelog, deriveTierLabel } from '../composables/useFeatureCatalog'

const props = defineProps<{
    entry: { path: string, title: string, description?: string, date: string | Date, authors?: string[] }
}>()

const team = useTeam()
const authorNames = computed(() => (props.entry.authors || []).map(username => team[username]?.name).filter(Boolean).join(', '))

const catalogFeature = computed(() => findFeatureByChangelog(props.entry.path))
const tierCloud = computed(() => deriveTierLabel(catalogFeature.value?.cloud))
const tierSelfHosted = computed(() => deriveTierLabel(catalogFeature.value?.selfHosted))

const formattedDate = computed(() => new Date(props.entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }))
</script>

<template>
  <li class="w-full my-2 py-6 border-b flex flex-col md:flex-row">
    <div class="w-full flex flex-col flex-none md:w-72 md:pr-4">
      <NuxtLink :to="entry.path" class="flex flex-col group hover:no-underline">
        <time class="block text-xs text-gray-500">{{ formattedDate }}</time>
        <h2 class="mb-0 text-xl font-medium group-hover:underline">{{ entry.title }}</h2>
        <div v-if="authorNames" class="italic text-xs mb-3">
          <div class="author">{{ authorNames }}</div>
        </div>
      </NuxtLink>
      <ChangelogTierBadges :cloud="tierCloud" :self-hosted="tierSelfHosted" />
    </div>
    <div class="flex-grow pt-4">
      <div class="prose">
        <p>{{ entry.description }}</p>
      </div>
    </div>
  </li>
</template>
