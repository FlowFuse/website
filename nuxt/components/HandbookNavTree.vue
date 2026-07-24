<script setup>
// Dimension 1 — renders the static grouped nav emitted at copy time
// (nuxt/docs.nav.json / nuxt/handbook.nav.json), reproducing the 11ty
// navGroup/navOrder sidebar: the section-root link, then group headings, each
// with its ordered children. Group headings only appear at the top level; the
// recursive subtree lives in HandbookNavSubtree.vue.
defineProps({
    // { root: { title, url }, groups: [ { name, children: [navItem] } ] }
    nav: { type: Object, default: () => ({ root: null, groups: [] }) },
    current: { type: String, default: '' },
})

const norm = (p) => (p || '').replace(/\/+$/, '')
</script>

<template>
  <div class="hb-sidebar-nav">
    <NuxtLink
      v-if="nav?.root"
      :to="nav.root.url"
      class="block py-0.5 font-medium"
      :class="norm(nav.root.url) === norm(current) ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'"
    >{{ nav.root.title }}</NuxtLink>

    <template v-for="group in nav?.groups || []" :key="group.name">
      <p
        v-if="group.name !== 'Other'"
        class="handbook-nav-group mt-3 mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400"
      >{{ group.name }}</p>
      <HandbookNavSubtree :items="group.children" :current="current" />
    </template>
  </div>
</template>
