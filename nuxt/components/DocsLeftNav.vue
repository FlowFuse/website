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
    <div class="ff-docs-left-nav__search max-lg:hidden pr-2">
      <AlgoliaSearch index-filter="category:docs" placeholder="Search in Docs..." source-id="docs" detached shortcut />
    </div>
    <SidebarNav :items="items" label="Documentation" class="ff-docs-left-nav__nav" />
  </div>
</template>

<style scoped>
/* The first group heading sits under the search field level with the page title: its
   capitals start where the title's do (the 36px h1's cap top is 23px lower than this
   label's would be straight under the field). Nuxt UI pads every label to separate it from
   the group above; the first has no group above, so it loses that padding. */
@media (min-width: 1024px) {
    .ff-docs-left-nav__search {
        margin-bottom: 23px;
    }

    .ff-docs-left-nav__nav {
        padding-top: 0;
    }

    .ff-docs-left-nav__nav :deep(nav > ul > li:first-child > [data-slot="label"]) {
        padding-top: 0;
    }
}

/* Group headings start on the same left edge as the search field and the logo above it;
   Nuxt UI insets labels to line up with link text, but ours are headings over indented
   links. */
.ff-docs-left-nav__nav :deep([data-slot="label"]) {
    padding-left: 0;
}
</style>
