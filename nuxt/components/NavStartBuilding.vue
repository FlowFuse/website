<script setup>
// The header's primary action: one row per place a first instance can live.
// Mirrors src/_includes/components/nav-start-building.njk (11ty); keep both
// files in sync when editing.
//
// Rendered twice by AppHeader, because the header has two surfaces and they are
// different places in the document: the desktop CTA cluster (right of the nav,
// left of Book a Demo) and the mobile drawer, which is the only header surface
// that exists under md. The caller's own class hides whichever copy does not
// apply at the current breakpoint.
//
// Rows come from chrome.header.startBuilding, shared with the Eleventy layout.
// A row carrying a `cta` key renders through that reserved destination's own
// component, so its copy, href and PostHog event stay owned by
// src/_data/ctaDestinations.json instead of being restated here - that is what
// keeps every sign-up click on one event name.
import chrome from '../../src/_data/chrome.json'

const menu = chrome.header.startBuilding
</script>

<template>
  <li class="ff-nav-dropdown ff-nav-startbuilding relative hover:cursor-pointer" data-nav-section="Start building">
    <span class="flex items-center gap-1">
      <span class="ff-nav-label">{{ menu.label }}</span>
      <span class="ff-nav-chevron"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></span>
    </span>
    <ul class="ff-nav-startbuilding-panel">
      <!-- Plain <a>, like every other link in AppHeader: one of these rows is an
           11ty-served page, and a full navigation reaches it either way. -->
      <li v-for="item in menu.items" :key="item.cta || item.href">
        <CtaSignUp v-if="item.cta === 'signUp'" variant="nav-text" position="start-building-menu" :nav-icon="item.icon" />
        <a v-else class="flex items-center gap-2" :href="item.href"><NavIcon :name="item.icon" /><span class="ff-nav-label">{{ item.label }}</span></a>
      </li>
    </ul>
  </li>
</template>
