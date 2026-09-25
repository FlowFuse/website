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
  <!-- pt matches the content column's pt-8 so the first nav item lines up
       with the top of the page body rather than sitting above it. Below lg the
       wrapper gets out of the way (display: contents) so SidebarNav's own root is
       the grid/flex item its sticky and order rules address. -->
  <div class="pt-6 max-lg:contents">
    <!-- Below lg the header carries a search button instead. This stays mounted there, hidden,
         because that button opens this component's dialog. -->
    <div class="max-lg:hidden mb-4 pr-2">
      <AlgoliaSearch index-filter="category:docs" placeholder="Search in Docs..." source-id="docs" detached shortcut />
    </div>
    <SidebarNav :items="items" label="Documentation" />
  </div>
</template>
