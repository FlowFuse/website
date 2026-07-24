<script setup>
import { onMounted } from 'vue'

// Mirrors src/_includes/components/top-utility-bar.njk (11ty). Events come
// from 11ty global data and are not available here, so only the standing
// promos rotate; keep both files in sync when editing.
onMounted(() => {
    const items = document.querySelectorAll('.ff-utility-announce > .ff-utility-item')
    if (items.length < 2) return
    let i = 0
    items.forEach((el, k) => { el.style.display = (k === 0 ? 'inline-flex' : 'none') })
    setInterval(() => {
        items[i].style.display = 'none'
        i = (i + 1) % items.length
        items[i].style.display = 'inline-flex'
    }, 7000)
})
</script>

<template>
  <div class="ff-utility-bar w-full bg-indigo-700 text-indigo-100 text-sm px-6">
    <div class="mx-auto max-screen-none lg:max-w-screen-xl 2xl:max-w-[1920px] flex items-center justify-between gap-4 py-3">
      <!-- Announcements (standing promos) -->
      <div class="ff-utility-announce min-w-0 flex-1 flex items-center">
        <a href="/ai/" class="ff-utility-item group inline-flex items-center gap-2 min-w-0 no-underline hover:no-underline text-indigo-100 hover:text-white">
          <span class="shrink-0 font-semibold">New</span>
          <span class="hidden sm:block">-</span>
          <span class="truncate">Meet FlowFuse Expert: build industrial applications with AI.</span>
          <span class="shrink-0 hidden sm:inline-flex items-center gap-1 font-medium text-white underline underline-offset-2">
            Learn more
            <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </span>
        </a>
        <a href="/docs/device-agent/install/overview/" class="ff-utility-item group inline-flex items-center gap-2 min-w-0 no-underline hover:no-underline text-indigo-100 hover:text-white" style="display: none">
          <span class="shrink-0 font-semibold">Get started</span>
          <span class="hidden sm:block">-</span>
          <span class="truncate">Begin with installing the FlowFuse device agent on your hardware.</span>
          <span class="shrink-0 hidden sm:inline-flex items-center gap-1 font-medium text-white underline underline-offset-2">
            Download
            <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </span>
        </a>
      </div>
      <!-- Mobile Sign In (quick-links nav below is hidden under md) -->
      <a href="https://app.flowfuse.com" class="md:hidden shrink-0 text-indigo-100 hover:text-white no-underline hover:no-underline font-medium">Sign In</a>
      <!-- Quick links (right) -->
      <nav class="hidden md:flex items-center gap-5 shrink-0" aria-label="Quick links">
        <a href="/about/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">About us</a>
        <a href="/blog/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">Blog</a>
        <a href="/docs/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">Docs</a>
        <a href="/support/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">Support</a>
        <a href="/docs/device-agent/install/overview/" class="text-indigo-100 hover:text-white no-underline hover:no-underline">Download</a>
        <span class="h-4 w-px bg-indigo-400/40" aria-hidden="true"></span>
        <a href="https://app.flowfuse.com" class="text-indigo-100 hover:text-white no-underline hover:no-underline font-medium">Sign In</a>
      </nav>
    </div>
  </div>
</template>
