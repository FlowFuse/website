<script setup lang="ts">
defineProps<{
    title: string
    section?: string
}>()
</script>

<template>
  <div style="display:flex;flex-direction:column;width:100%;height:100%;background:#312E81;padding:60px 70px;font-family:sans-serif;color:white;">
    <!-- Header: logo + site name -->
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:auto;">
      <img
        src="https://flowfuse.com/images/ff-minimal-red.svg"
        style="width:52px;height:52px;"
      />
      <span style="font-size:26px;font-weight:700;color:#ffffff;">FlowFuse</span>
      <span v-if="section" style="font-size:18px;color:#8892b0;margin-left:4px;">/ {{ section }}</span>
    </div>
    <!-- Page title -->
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="font-size:54px;font-weight:800;color:#ffffff;line-height:1.15;max-width:900px;">
        {{ title }}
      </div>
      <div style="font-size:22px;color:#A5B4FC;font-weight:500;">flowfuse.com</div>
    </div>
  </div>
</template>
