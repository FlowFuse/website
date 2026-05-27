<script setup>
const JOB_BOARD = 'https://boards.greenhouse.io/flowfuse'
useHead({
    title: 'Careers • FlowFuse',
    meta: [
        { name: 'description', content: 'Check out our openings at FlowFuse and join the team reliably delivering Node-RED applications in a continuous, collaborative, and secure manner.' },
        { name: 'robots', content: 'noindex' },
    ],
})
onMounted(() => window.location.replace(JOB_BOARD))
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full page hero">
      <div class="content">
        <div class="prose prose-blue container pt-12 m-auto max-w-4xl px-6">
          <p>You will be re-directed to our job postings board</p>
        </div>
      </div>
    </div>
  </div>
</template>
