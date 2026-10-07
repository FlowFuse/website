<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useDocsNavTree } from '~/composables/useDocsNav'
import { buildNavigationMenuItems } from '~/utils/navigationMenu'

const route = useRoute()

const { data: navGroups } = await useDocsNavTree()

// No "Documentation" entry on top: the search button sits there, and the breadcrumb and
// the site header both lead back to /docs.
const items = computed((): NavigationMenuItem[] => [
    ...(navGroups.value ?? []).flatMap(group => [
        { type: 'label', label: group.name } satisfies NavigationMenuItem,
        ...buildNavigationMenuItems(group.children, route.path),
    ]),
])
</script>

<template>
  <SidebarWithSearch :items="items" label="Documentation">
    <template #search>
      <AlgoliaSearch index-filter="category:docs" placeholder="Search in Docs..." source-id="docs" detached shortcut morph />
    </template>
  </SidebarWithSearch>
</template>
