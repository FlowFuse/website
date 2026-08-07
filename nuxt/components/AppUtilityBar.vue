<script setup>
import { onMounted } from 'vue'
import { useEvents } from '~/composables/useEvents'

// Mirrors src/_includes/components/top-utility-bar.njk (11ty); keep both
// files in sync when editing.
const events = useEvents()

onMounted(() => {
    const items = document.querySelectorAll('.ff-utility-announce > .ff-utility-item')
    if (items.length === 0) return
    let i = 0
    items.forEach((el, k) => { el.style.display = (k === 0 ? 'inline-flex' : 'none') })
    if (items.length < 2) return
    setInterval(() => {
        items[i].style.display = 'none'
        i = (i + 1) % items.length
        items[i].style.display = 'inline-flex'
    }, 7000)
})
</script>

<template>
  <div class="ff-utility-bar w-full bg-indigo-700 text-indigo-100 text-sm px-6" data-nav-zone="utility">
    <div class="mx-auto max-screen-none lg:max-w-screen-xl 2xl:max-w-[1920px] flex items-center justify-between gap-4 py-3">
      <!-- Announcements (rotating): entries with no `expire` stay visible indefinitely -->
      <div class="ff-utility-announce min-w-0 flex-1 flex items-center">
        <a
          v-for="event in events"
          :key="event.link"
          :href="event.link"
          class="ff-utility-item group inline-flex items-center gap-2 min-w-0 no-underline hover:no-underline text-indigo-100 hover:text-white"
        >
          <span class="shrink-0 font-semibold">{{ event.type }}</span>
          <span class="hidden sm:block">-</span>
          <span class="truncate">{{ event.title }}</span>
          <span class="shrink-0 hidden sm:inline-flex items-center gap-1 font-medium text-white underline underline-offset-2">
            {{ event.buttonText }}
            <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </span>
        </a>
      </div>
      <!-- Mobile Sign In (quick-links nav below is hidden under md) -->
      <CtaSignIn variant="nav-text" position="utility-bar-mobile" class="md:hidden shrink-0 text-indigo-100 hover:text-white no-underline hover:no-underline font-medium" />
      <!-- Quick links (right) -->
      <nav class="hidden md:flex items-center gap-5 shrink-0" aria-label="Quick links">
        <a href="/about/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">About us</a>
        <a href="/blog/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">Blog</a>
        <a href="/docs/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">Docs</a>
        <a href="/support/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">Support</a>
        <a href="/docs/device-agent/install/overview/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">Install on edge</a>
        <span class="h-4 w-px bg-indigo-400/40" aria-hidden="true"></span>
        <CtaSignIn variant="nav-text" position="utility-bar" class="text-indigo-100 hover:text-white no-underline hover:no-underline font-medium" />
      </nav>
    </div>
  </div>
</template>
