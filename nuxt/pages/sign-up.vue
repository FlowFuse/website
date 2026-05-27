<script setup>
// Reproduces the legacy redirect page (layout: redirect) for /sign-up/.
const TO = 'https://app.flowfuse.com/account/create'
useHead({
    title: 'Create an account for FlowFuse • FlowFuse',
    meta: [
        { 'http-equiv': 'refresh', content: `0; url='${TO}'` },
        { name: 'robots', content: 'noindex' },
    ],
    link: [{ rel: 'canonical', href: TO }],
})
onMounted(() => window.location.replace(TO))
</script>

<template>
  <div class="container m-auto max-w-4xl px-6 pt-12">
    <p>You should be redirected to <a :href="TO">{{ TO }}</a></p>
  </div>
</template>
