<script setup lang="ts">
// Rendered at the end of a release blog section, from the post's `features:` frontmatter.
// See nuxt/lib/release-features.mjs for how these are resolved out of the feature catalog.
const props = defineProps<{
    changelog?: Array<{ url: string, label: string }>
    docs?: { href: string, label: string } | null
}>()
</script>

<template>
  <div v-if="props.changelog?.length || props.docs" class="not-prose">
    <div v-if="props.changelog?.length" class="ff-related-changelogs">
      Changelog:
      <template v-for="(entry, i) in props.changelog" :key="entry.url">
        <span v-if="i > 0"> | </span><NuxtLink :to="entry.url">{{ entry.label }}</NuxtLink>
      </template>
    </div>
    <div v-if="props.docs" class="ff-related-docs">
      Docs: <NuxtLink :to="props.docs.href">{{ props.docs.label }}</NuxtLink>
    </div>
  </div>
</template>
