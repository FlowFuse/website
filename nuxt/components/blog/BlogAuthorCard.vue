<script setup lang="ts">
const props = defineProps<{
    author: any
}>()

// Some team records store email as a markdown link, e.g. "[a@b.com](mailto:a@b.com)".
const email = computed(() => props.author?.email?.replace(/^\[(.+)\]\(mailto:.+\)$/, '$1'))
</script>

<template>
  <div v-if="author?.bio" class="mt-12 bg-gray-50 rounded-lg p-6">
    <h3 class="text-lg font-medium mb-4">
      About the Author
    </h3>
    <div class="flex flex-col sm:flex-row gap-6">
      <div class="flex-shrink-0">
        <div
          class="w-24 h-24 rounded-full overflow-hidden bg-white shadow-md bg-cover bg-center"
          :style="{ backgroundImage: `url(/images/team/headshot-${author.headshot})` }"
        />
      </div>
      <div class="flex-grow">
        <h4 class="text-base font-medium mb-0">
          {{ author.name }}
        </h4>
        <p class="text-sm text-indigo-600 mb-3 -mt-1">
          {{ author.title }}
        </p>
        <p class="text-sm text-gray-700 mb-4">
          {{ author.bio }}
        </p>
        <div class="flex gap-3">
          <a v-if="email" :href="`mailto:${email}`" class="text-gray-600 hover:text-indigo-600 transition-colors" title="Email">
            <IconMail class="h-5 w-5" />
          </a>
          <a v-if="author.linkedin" :href="`https://www.linkedin.com/in/${author.linkedin}`" target="_blank" rel="noopener" class="text-gray-600 hover:text-indigo-600 transition-colors" title="LinkedIn">
            <IconLinkedin class="h-5 w-5" />
          </a>
          <a v-if="author.github" :href="`https://github.com/${author.github}`" target="_blank" rel="noopener" class="text-gray-600 hover:text-indigo-600 transition-colors" title="GitHub">
            <IconGithub class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
