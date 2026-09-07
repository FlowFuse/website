<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useDocsNavTree } from '~/composables/useDocsNav'
import { buildNavigationMenuItems } from '~/utils/navigationMenu'

const route = useRoute()

const { data: navGroups } = await useDocsNavTree()

const items = computed((): NavigationMenuItem[] => [
    { label: 'Documentation', to: '/docs/' },
    ...(navGroups.value ?? []).flatMap(group => [
        { type: 'label', label: group.name } satisfies NavigationMenuItem,
        ...buildNavigationMenuItems(group.children, route.path),
    ]),
])
</script>

<template>
  <SidebarNav :items="items" />
</template>
