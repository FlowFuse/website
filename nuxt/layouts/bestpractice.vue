<script setup lang="ts">
// The /bestpractice guides run on their own chrome rather than AppHeader/AppFooter: a dark
// bar with the FlowFuse logo, the red rule under it, and a light canvas with a white reading
// column. It carries the look the guides were prototyped in, so the section reads as its own
// thing under the FlowFuse brand.
//
// The logo is the deliberate way back out to the rest of the site: nothing links into this
// section from the site nav yet, and there is no site header here to navigate with.
//
// The guide nav lives here rather than on the page so every page in the section has it,
// including the landing page.
import '~/assets/css/bestpractice.css'
</script>

<template>
  <div class="bp-root font-sans">
    <a href="#bp-content" class="skip-to-main">Skip to main content</a>

    <header class="bp-bar">
      <a href="/" class="bp-bar-logo" aria-label="FlowFuse home">
        <img src="/images/ff-logo--wordmark--white.svg" alt="FlowFuse" width="150" height="26">
      </a>
      <span class="bp-bar-divider" />
      <NuxtLink to="/bestpractice/" class="bp-bar-title">Best Practice</NuxtLink>
    </header>

    <div class="bp-shell">
      <aside class="bp-nav">
        <GuideLeftNav />
      </aside>
      <slot />
    </div>
  </div>
</template>
