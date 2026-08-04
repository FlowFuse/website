<script setup lang="ts">
const route = useRoute()
const { data: pages } = await useBestPracticePages()

const groups = computed(() => GUIDES.map(guide => ({
    ...guide,
    pages: pagesForGuide(pages.value, guide.id),
})))
</script>

<template>
  <nav aria-label="Best Practice">
    <NuxtLink to="/bestpractice/" class="bp-nav-back">Both guides</NuxtLink>
    <div v-for="group in groups" :key="group.id" class="bp-nav-group">
      <p class="bp-nav-group-title">{{ group.title }}</p>
      <ul class="bp-nav-list">
        <li v-for="page in group.pages" :key="page.path">
          <NuxtLink
            :to="page.path"
            class="bp-nav-link"
            :class="{ 'bp-nav-link--active': route.path === page.path }"
          >{{ page.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
