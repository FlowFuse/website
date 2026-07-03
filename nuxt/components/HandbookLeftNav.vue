<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'

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

function toMenuItem(item: ContentNavigationItem): NavigationMenuItem {
    const children = item.children
        ? sortNavItems(item.children.filter(c => c.path !== item.path)).map(toMenuItem)
        : undefined
    return {
        label: item.title,
        to: item.path,
        icon: (item.icon as string | undefined) ?? 'i-lucide-file',
        defaultOpen: route.path.startsWith(item.path + '/') || route.path === item.path,
        children: children?.length ? children : undefined,
    }
}

const navItems = computed((): NavigationMenuItem[] => {
    const root = navTree.value?.[0]
    if (!root?.children) return []

    return sortNavItems(root.children.filter(c => c.path !== root.path)).map(toMenuItem)
})
</script>

<template>
  <div class="lg:pt-2" data-handbook>
    <UNavigationMenu
      :items="navItems"
      orientation="vertical"
      color="neutral"
      highlight
    />
  </div>
</template>
