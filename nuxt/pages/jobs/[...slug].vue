<script setup>
const JOBS = {
    'developer-relations-advocate': {
        title: 'Job Opening - Developer Relations Advocate',
        description: 'At FlowFuse, a Developer Relations Advocate goes beyond traditional developer advocacy. This role combines technical evangelism with business development to educate the Node-RED community while identifying real opportunities for FlowFuse growth.',
        url: '', // site.openings.dr — currently unset
    },
    'engineering-manager': {
        title: 'Job Opening - Engineering Manager',
        description: '',
        url: 'https://job-boards.greenhouse.io/flowfuse/jobs/5566913004',
    },
    'solutions-engineer': {
        title: 'Job Opening - Solutions Engineer',
        description: '',
        url: '', // site.openings.se — currently unset
    },
}

const route = useRoute()
const slug = computed(() => {
    const s = route.params.slug
    return (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean).join('/')
})
const job = computed(() => JOBS[slug.value])
if (!job.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead(() => ({
    title: `${job.value.title} • FlowFuse`,
    meta: [
        { name: 'description', content: job.value.description },
        { name: 'robots', content: 'noindex' },
    ],
}))

onMounted(() => {
    if (job.value.url) window.location.replace(job.value.url)
})
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full page hero">
      <div class="content">
        <div class="prose prose-blue container pt-12 m-auto max-w-4xl px-6">
          <p>You will be re-directed to the job posting</p>
        </div>
      </div>
    </div>
  </div>
</template>
