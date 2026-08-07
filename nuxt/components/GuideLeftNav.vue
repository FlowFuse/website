<script setup lang="ts">
const route = useRoute()
const { data: pages } = await useApplicationGuidePages()

const groups = computed(() => GUIDES.map(guide => ({
    ...guide,
    pages: pagesForGuide(pages.value, guide.id),
})))
</script>

<template>
  <nav aria-label="FlowFuse Application Guide">
    <NuxtLink to="/application-guide/" class="ag-nav-back">Both guides</NuxtLink>
    <div v-for="group in groups" :key="group.id" class="ag-nav-group">
      <p class="ag-nav-group-title">{{ group.title }}</p>
      <ul class="ag-nav-list">
        <li v-for="page in group.pages" :key="page.path">
          <NuxtLink
            :to="page.path"
            class="ag-nav-link"
            :class="{ 'ag-nav-link--active': route.path === page.path }"
          >{{ page.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
