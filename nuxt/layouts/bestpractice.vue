<script setup lang="ts">
// The /bestpractice guides run on their own chrome rather than AppHeader/AppFooter: a dark
// bar with the FlowFuse logo, the red rule under it, and a light canvas with a white reading
// column. It carries the look the guides were prototyped in, so the section reads as its own
// thing under the FlowFuse brand.
//
// The logo is the deliberate way back out to the rest of the site: nothing links into this
// section from the site nav yet, and there is no site header here to navigate with.
import '~/assets/css/bestpractice.css'

const year = 2026
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
      <span class="bp-bar-spacer" />
      <a href="/docs/" class="bp-bar-link">Docs</a>
    </header>

    <div class="bp-shell">
      <slot />
    </div>

    <footer class="bp-foot">
      <span>&copy; {{ year }} FlowFuse, Inc.</span>
      <a href="/">flowfuse.com</a>
      <a href="/docs/">Docs</a>
      <a href="/privacy-policy">Privacy</a>
      <a href="/terms">Terms</a>
    </footer>
  </div>
</template>
