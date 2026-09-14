<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useDocsNavTree } from '~/composables/useDocsNav'
import { buildNavigationMenuItems } from '~/utils/navigationMenu'

const route = useRoute()

const { data: navGroups } = await useDocsNavTree()

const items = computed((): NavigationMenuItem[] => [
    { label: 'Documentation', to: '/docs' },
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
    <SidebarNav :items="items" label="Documentation" />
  </div>
</template>
