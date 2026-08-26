<script setup lang="ts">
// Left nav for the Application Guide — same NavigationMenuItem tree + SidebarNav as
// Handbook and Docs. Two guide groups (FlowFuse / Node-RED); within each, pages form a
// shallow tree via the `parent` frontmatter (a page nests under the page whose slug it
// names) — see useApplicationGuideNav's applicationGuideNavGroups.
import type { NavigationMenuItem } from '@nuxt/ui'
import { buildNavigationMenuItems } from '~/utils/navigationMenu'

const route = useRoute()
const { data: pages } = await useApplicationGuidePages()

const items = computed((): NavigationMenuItem[] => [
    { label: 'Application Guide', to: '/application-guide' },
    ...applicationGuideNavGroups(pages.value).flatMap(group => [
        { type: 'label', label: group.title } satisfies NavigationMenuItem,
        ...buildNavigationMenuItems(group.children ?? [], route.path),
    ]),
])
</script>

<template>
  <SidebarNav :items="items" />
</template>
