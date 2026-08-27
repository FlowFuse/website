<script setup lang="ts">
// Fixed-copy note for blog/changelog markdown: ::product-update-note
// Wraps @nuxt/ui's built-in ProseNote (::note) so the recurring "three products"
// announcement text lives in one place instead of being duplicated across every post
// (see PR #5595, which pasted the raw ::note block into ~30 files).
</script>

<template>
  <ProseNote>
    Exciting Update! FlowFuse is now available as three different products:
    <a href="/product/edge/">FlowFuse Edge for OT teams</a>,
    <a href="/product/hub/">FlowFuse Hub for IT teams</a>, and
    <a href="/product/fleet/">FlowFuse Fleet</a> for managing devices at scale.
    Visit the <a href="/product/">FlowFuse Product Page</a> to learn how the platform
    enables you to build and manage industrial apps at scale.
  </ProseNote>
</template>
