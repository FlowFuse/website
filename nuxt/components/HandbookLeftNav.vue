<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { buildNavigationMenuItems, type MenuTreeNode } from '~/utils/navigationMenu'

const route = useRoute()

const { data: navTree } = await useHandbookNav()

function sortNavItems(items: ContentNavigationItem[]): ContentNavigationItem[] {
    return [...items].sort((a, b) => {
        const orderA = (a.order as number | undefined) ?? Infinity
        const orderB = (b.order as number | undefined) ?? Infinity
        if (orderA !== Infinity || orderB !== Infinity) return orderA - orderB
        // No explicit order: directories before files, then by path
        const aIsDir = a.children !== undefined
        const bIsDir = b.children !== undefined
        if (aIsDir !== bIsDir) return aIsDir ? -1 : 1
        return a.path.localeCompare(b.path)
    })
}

function toTreeNode(item: ContentNavigationItem): MenuTreeNode {
    const children = item.children
        ? sortNavItems(item.children.filter(c => c.path !== item.path)).map(toTreeNode)
        : undefined
    return {
        title: item.title,
        path: item.path,
        icon: (item.icon as string | undefined) ?? 'i-lucide-file',
        children,
    }
}

const navItems = computed((): NavigationMenuItem[] => {
    const root = navTree.value?.[0]
    if (!root?.children) return []

    const tree = sortNavItems(root.children.filter(c => c.path !== root.path)).map(toTreeNode)
    return buildNavigationMenuItems(tree, route.path)
})
</script>

<template>
  <SidebarNav :items="navItems" />
</template>
