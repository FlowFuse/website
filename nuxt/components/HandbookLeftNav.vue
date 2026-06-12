<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const { data: navTree } = await useAsyncData('handbook-nav', () =>
    queryCollectionNavigation('handbook')
)

function toMenuItem(item: ContentNavigationItem): NavigationMenuItem {
    const children = item.children
        ?.filter(c => c.path !== item.path)
        .map(toMenuItem)
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

    const sections = [...root.children]
        .filter(c => c.path !== root.path)
        .sort((a, b) => ((a.order as number) ?? Infinity) - ((b.order as number) ?? Infinity))
        .map(toMenuItem)

    return sections
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
