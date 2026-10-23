<script setup lang="ts">
useSeoMeta({
    title: 'Your meeting is booked',
    description: 'A calendar invitation is on its way to your inbox. In the meantime, see how other teams use FlowFuse.',
    robots: 'noindex',
})
</script>

<template>
  <div class="w-full">
    <PageHero
        title="Your meeting is booked"
        description="A calendar invitation is on its way to your inbox. In the meantime, see how other teams use FlowFuse."
    />
    <div class="w-full max-w-md sm:max-w-screen-lg m-auto px-6 pb-4">
      <SocialProof />
    </div>
    <div class="flex flex-col max-w-5xl mx-auto gap-x-10 px-6">
      <div class="max-w-md sm:max-w-screen-lg m-auto pb-6">
        <ExploreMoreStories />
      </div>
    </div>
  </div>
</template>
