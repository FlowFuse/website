<script setup lang="ts">
defineProps<{
    member?: { name: string, title?: string, headshot?: string } | null
}>()
</script>

<template>
  <div class="team-card--sm">
    <div
        class="ff-headshot"
        :style="{ backgroundImage: member ? `url(/images/team/headshot-${member.headshot})` : 'url(/images/flowfuse-icon.png)' }"
    />
    <div class="team-card-info my-auto">
      <label>{{ member ? member.name : 'FlowFuse' }}</label>
      <span v-if="member?.title">{{ member.title }}</span>
    </div>
  </div>
</template>
