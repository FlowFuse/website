<script setup lang="ts">
// Left nav for the Application Guide, styled like DocsLeftNav (.handbook-nav).
// Two guide groups (FlowFuse / Node-RED); within each, pages form a shallow tree
// via the `parent` frontmatter (a page nests under the page whose slug it names).
const route = useRoute()
const { data: pages } = await useApplicationGuidePages()

const groups = computed(() => GUIDES.map(guide => {
    const inGuide = (pages.value ?? []).filter(p => p.guide === guide.id)
    const childrenOf = (slug: string) => inGuide.filter(p => p.parent === slug)
    const roots = inGuide.filter(p => !p.parent)
    return { ...guide, tree: roots.map(r => ({ ...r, children: childrenOf(r.slug) })) }
}))

const norm = (p: string) => (p.endsWith('/') ? p.slice(0, -1) : p)
const isActive = (p: string) => norm(route.path) === norm(p)
</script>

<template>
  <div class="lg:pt-2 text-sm" data-el="application-guide-nav">
    <ul class="handbook-nav">
      <li :class="{ active: norm(route.path) === '/application-guide' }">
        <NuxtLink href="/application-guide/">Application Guide</NuxtLink>
      </li>
      <template v-for="group in groups" :key="group.id">
        <li class="handbook-nav-group">{{ group.title }}</li>
        <template v-for="node in group.tree" :key="node.path">
          <li :class="{ active: isActive(node.path) }">
            <NuxtLink :href="node.path">{{ node.title }}</NuxtLink>
          </li>
          <li
            v-for="child in node.children"
            :key="child.path"
            class="handbook-nav-nested"
            :class="{ active: isActive(child.path) }"
          >
            <NuxtLink :href="child.path">{{ child.title }}</NuxtLink>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>
