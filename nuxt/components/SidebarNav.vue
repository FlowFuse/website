<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Single left-nav renderer shared by Handbook, Docs and Application Guide — each
// section builds its own NavigationMenuItem[] tree (see utils/navigationMenu.ts) and
// hands it here rather than hand-rolling its own <ul>/accordion markup.
//
// Below `lg` the .handbook grid (src/css/style.handbook.css) collapses to a single
// reversed column, which put this nav *after* the article: on a phone the section index
// started thousands of pixels down the page, and the only navigation above the fold was
// the "On this page" list for the page you were already on. Below `lg` it renders as a
// disclosure instead: `order-1` lifts it to the top of that reversed column, it sticks
// under the site header, and the tree itself only unfolds when asked for.
defineProps<{
    items: NavigationMenuItem[]
    /** Names the section in the narrow-screen toggle, e.g. "Documentation". */
    label?: string
}>()

const route = useRoute()
const open = ref(false)

// Following a link re-renders the page around this component rather than unmounting it,
// so the panel has to be closed by hand or it covers the page the reader just chose.
watch(() => route.path, () => { open.value = false })
</script>

<template>
  <!-- -ml-6 cancels the pl-6 the page wrapper puts on this column so the bar and its
       borders run edge to edge; px-6 puts the text back where it was. The bar sits flush
       under the header both at rest and while stuck, so border-t reads as the header's
       own dividing line and border-b separates the bar from the article. -->
  <div
    class="lg:pt-2 text-sm capitalize max-lg:order-1 max-lg:sticky max-lg:z-30
           max-lg:top-(--ff-header-height) max-lg:-ml-6 max-lg:px-6 max-lg:bg-white
           max-lg:border-t max-lg:border-b"
  >
    <button
      id="sidebar-nav-toggle"
      type="button"
      class="lg:hidden flex w-full items-center justify-between gap-4 py-3 bg-transparent border-0 cursor-pointer text-left font-medium text-gray-700"
      :aria-expanded="open"
      aria-controls="sidebar-nav-menu"
      @click="open = !open"
    >
      <span class="flex items-center gap-2">
        <UIcon name="i-lucide-menu" class="size-5 shrink-0" />
        {{ label ?? 'Menu' }}
      </span>
      <UIcon
        name="i-lucide-chevron-down"
        class="size-5 shrink-0 transition-transform ease-in-out duration-300"
        :class="{ 'rotate-180': open }"
      />
    </button>
    <!-- Capped and scrollable so a long section index cannot fill the whole viewport. -->
    <div
      id="sidebar-nav-menu"
      class="max-lg:max-h-[70svh] max-lg:overflow-y-auto max-lg:overscroll-contain max-lg:pb-4"
      :class="{ 'max-lg:hidden': !open }"
    >
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        color="neutral"
        highlight
      />
    </div>
  </div>
</template>

<style scoped>
/* Group headers ("Get FlowFuse running") read as headers: body text size rather
   than the caption size Nuxt UI defaults labels to. */
:deep([data-slot="label"]) {
    font-size: 0.875rem;
    line-height: 1.5rem;
}

/* The pages under a header sit indented from it, so the grouping is visible
   without reading the words. Applied to every link so the existing nesting
   keeps its relative steps. */
:deep([data-slot="link"]) {
    padding-left: 1.75rem;
}
</style>
