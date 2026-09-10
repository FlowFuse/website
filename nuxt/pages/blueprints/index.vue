<script setup lang="ts">
// Ported from src/blueprints.njk (11ty), which this replaces: page 1 of the Blueprint
// Library. Pages 2 and up are pages/blueprints/[page].vue; both render <BlueprintListing>.
//
// What the port changes on purpose:
//  - 11ty numbered its pagination from zero, so page 2 was /blueprints/1/. Nuxt numbers
//    from one, matching the blog and changelog listings already served here, so page 2 is
//    /blueprints/2/. As on /blog/1/, the old URL still resolves, now to page 1.
//  - The blueprints themselves come from FlowFuse/blueprint-library rather than from a
//    generated src/blueprints/ tree - see nuxt/modules/blueprints-source.ts.
import { BLUEPRINTS_DESCRIPTION, BLUEPRINTS_META_TITLE } from '../../composables/useBlueprintList'

useSeoMeta({
    title: BLUEPRINTS_META_TITLE,
    description: BLUEPRINTS_DESCRIPTION,
})
</script>

<template>
  <BlueprintListing :page="1" />
</template>
