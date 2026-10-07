<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// The left column of a docs or handbook page: the section's search on top, its navigation
// under it. Both sections share it so the search and the first nav entry line up with the
// breadcrumb and the page title the same way on both.
defineProps<{
    items: NavigationMenuItem[]
    /** Names the section in the narrow-screen toggle, e.g. "Documentation". */
    label: string
}>()
</script>

<template>
  <!-- pt matches the content column's pt-8 so the first nav item lines up
       with the top of the page body rather than sitting above it. Below lg the
       wrapper gets out of the way (display: contents) so SidebarNav's own root is
       the grid/flex item its sticky and order rules address. -->
  <div class="pt-6 max-lg:contents">
    <!-- Below lg the header carries a search button instead. This stays mounted there, hidden,
         because that button opens this search's dialog. -->
    <div class="ff-sidebar-search max-lg:hidden pr-2">
      <slot name="search" />
    </div>
    <SidebarNav :items="items" :label="label" class="ff-sidebar-search__nav" />
  </div>
</template>

<style scoped>
/* The first nav entry sits under the search field level with the page title: its capitals
   start where the title's do (the 36px h1's cap top is 23px lower than a label's would be
   straight under the field). Nuxt UI pads every label to separate it from the group above;
   the first has no group above, so it loses that padding. */
@media (min-width: 1024px) {
    .ff-sidebar-search {
        margin-bottom: 23px;
    }

    .ff-sidebar-search__nav {
        padding-top: 0;
    }

    .ff-sidebar-search__nav :deep(nav > ul > li:first-child > [data-slot="label"]) {
        padding-top: 0;
    }
}

/* Group headings start on the same left edge as the search field and the logo above it;
   Nuxt UI insets labels to line up with link text, but ours are headings over indented
   links. */
.ff-sidebar-search__nav :deep([data-slot="label"]) {
    padding-left: 0;
}
</style>
