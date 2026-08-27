<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Single left-nav renderer shared by Handbook, Docs and Application Guide — each
// section builds its own NavigationMenuItem[] tree (see utils/navigationMenu.ts) and
// hands it here rather than hand-rolling its own <ul>/accordion markup.
defineProps<{ items: NavigationMenuItem[] }>()
</script>

<template>
  <div class="lg:pt-2 text-sm capitalize">
    <UNavigationMenu
      :items="items"
      orientation="vertical"
      color="neutral"
      highlight
    />
  </div>
</template>
