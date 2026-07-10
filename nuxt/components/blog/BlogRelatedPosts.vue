<script setup lang="ts">
defineProps<{
    heading: string
    posts: any[]
}>()
</script>

<template>
  <section v-if="posts.length" class="w-full pb-24">
    <div class="container m-auto text-left max-lg:px-6 md:max-w-screen-lg">
      <h2 class="mb-6">
        {{ heading }}
      </h2>
      <div class="grid gap-6 sm:grid-cols-3">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="group flex flex-col hover:no-underline"
        >
          <img
            :src="post.image || '/images/og-blog.jpg'"
            :alt="post.title"
            class="w-full aspect-[1.78] object-cover rounded-lg mb-3"
            loading="lazy"
          >
          <span v-if="post.tags?.[0]" class="text-xs uppercase tracking-wide text-red-500 font-semibold mb-1">{{ post.tags[0] }}</span>
          <h3 class="text-base font-semibold mb-0 group-hover:text-indigo-600 transition-colors">
            {{ post.title }}
          </h3>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
