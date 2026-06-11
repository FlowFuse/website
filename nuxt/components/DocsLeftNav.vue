<script setup lang="ts">
import { buildDocsNav, type DocsNavNode, type DocsNavGroup } from '~/composables/useDocsNav'

const route = useRoute()

const { data: pages } = await useAsyncData('docs-nav', () =>
    queryCollection('docs').all()
)

const navGroups = computed<DocsNavGroup[]>(() => {
    if (!pages.value) return []
    return buildDocsNav(pages.value as any[])
})

function normPath(p: string) {
    return p.replace(/\/$/, '') || '/'
}

function isActive(nodePath: string): boolean {
    return normPath(route.path) === normPath(nodePath)
}

function hasActiveDescendant(node: DocsNavNode): boolean {
    if (isActive(node.path)) return true
    return node.children.some(hasActiveDescendant)
}

const manuallyExpanded = ref<Set<string>>(new Set())

function toggle(path: string) {
    const next = new Set(manuallyExpanded.value)
    if (next.has(path)) {
        next.delete(path)
    } else {
        next.add(path)
    }
    manuallyExpanded.value = next
}

function isOpen(node: DocsNavNode): boolean {
    return manuallyExpanded.value.has(node.path) || hasActiveDescendant(node)
}

function ulStyle(node: DocsNavNode) {
    return isOpen(node) ? { maxHeight: 'initial' } : {}
}
</script>

<template>
  <div class="border-r lg:pt-2 text-sm" data-docs>
    <ul class="handbook-nav" data-el="navigation">
      <li :class="{ active: isActive('/docs') }">
        <NuxtLink href="/docs">Documentation</NuxtLink>
      </li>

      <template v-for="group in navGroups" :key="group.name">
        <li class="handbook-nav-group">{{ group.name }}</li>

        <template v-for="entry in group.children" :key="entry.path">
          <li :class="{ active: isActive(entry.path), open: isOpen(entry) && entry.children.length > 0 }">
            <NuxtLink :href="entry.path">{{ entry.name }}</NuxtLink>
            <button v-if="entry.children.length"
              @click="toggle(entry.path)"
              :aria-expanded="isOpen(entry).toString()"
              :aria-label="`Toggle ${entry.name} submenu`">
              <span class="ff-icon icon-expand">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
              <span class="ff-icon icon-minimise">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              </span>
            </button>
          </li>

          <li v-if="entry.children.length" class="contents">
            <ul class="handbook-nav-nested" :style="ulStyle(entry)">
              <template v-for="child in entry.children" :key="child.path">
                <li :class="{ active: isActive(child.path), open: isOpen(child) && child.children.length > 0 }">
                  <NuxtLink :href="child.path">{{ child.name }}</NuxtLink>
                  <button v-if="child.children.length"
                    @click="toggle(child.path)"
                    :aria-expanded="isOpen(child).toString()"
                    :aria-label="`Toggle ${child.name} submenu`">
                    <span class="ff-icon icon-expand">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                    <span class="ff-icon icon-minimise">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    </span>
                  </button>
                </li>

                <li v-if="child.children.length" class="contents">
                  <ul class="handbook-nav-nested-2" :style="ulStyle(child)">
                    <li v-for="grandchild in child.children" :key="grandchild.path"
                      :class="{ active: isActive(grandchild.path) }">
                      <NuxtLink :href="grandchild.path">{{ grandchild.name }}</NuxtLink>
                    </li>
                  </ul>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>
