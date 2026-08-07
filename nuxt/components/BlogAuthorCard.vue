<script setup lang="ts">
defineProps<{
    author?: { slug: string, name: string, title?: string, headshot?: string, bio?: string, email?: string, linkedin?: string, github?: string } | null
}>()
</script>

<template>
  <div v-if="author?.bio" class="mt-12 bg-gray-50 rounded-lg p-6">
    <h3 class="text-lg font-medium mb-4">About the Author</h3>
    <div class="flex flex-col sm:flex-row gap-6">
      <div class="flex-shrink-0">
        <div
            class="w-24 h-24 rounded-full overflow-hidden bg-white shadow-md"
            :style="{ backgroundImage: `url(/images/team/headshot-${author.headshot})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        />
      </div>
      <div class="flex-grow">
        <h4 class="text-base font-medium mb-0">
          <NuxtLink :to="authorPath(author.slug)" class="hover:underline">{{ author.name }}</NuxtLink>
        </h4>
        <p class="text-sm text-indigo-600 mb-3 -mt-1">{{ author.title }}</p>
        <p class="text-sm text-gray-700 mb-4">{{ author.bio }}</p>
        <div class="flex gap-3 text-sm">
          <a v-if="author.email" :href="`mailto:${author.email}`" title="Email" class="text-gray-600 hover:text-indigo-600 transition-colors">
            <UIcon name="i-lucide-mail" class="w-5 h-5" />
          </a>
          <a v-if="author.linkedin" :href="`https://www.linkedin.com/in/${author.linkedin}`" target="_blank" rel="noopener" title="LinkedIn" class="text-gray-600 hover:text-indigo-600 transition-colors">
            <IconsLinkedinIcon class="w-5 h-5" />
          </a>
          <a v-if="author.github" :href="`https://github.com/${author.github}`" target="_blank" rel="noopener" title="GitHub" class="text-gray-600 hover:text-indigo-600 transition-colors">
            <IconsGithubIcon class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
