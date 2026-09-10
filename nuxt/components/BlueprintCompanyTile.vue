<script setup lang="ts">
// src/_includes/blueprints/ - the `renderCompanyTile` shortcode from .eleventy.js, whose
// only two callers were the blueprint card and the blueprint layout. The .company-tile
// classes it emitted are still styled by src/css/style.css.
//
// The shortcode interpolated the company's fields straight into an HTML string. These come
// from a data file rather than page content, but they are still values from another
// repository, so they are bound as attributes and text here instead.
//
// The logo is decorative: the company name sits next to it as text, so an alt would just
// repeat it. The shortcode emitted no alt at all.
defineProps<{
    company: { name: string, img: string, url: string }
}>()
</script>

<template>
  <div class="company-tile">
    <img class="company-tile-logo" :src="company.img" alt="">
    <a :href="company.url" class="no-underline text-gray-700">{{ company.name }}</a>
  </div>
</template>
