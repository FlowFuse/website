<script setup>
import indexData from '../../events.index.json'

const route = useRoute()
const slug = computed(() => {
    const s = route.params.slug
    return (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean).join('/')
})
const isIndex = computed(() => slug.value === '')

const events = indexData.events
const upcoming = events
    .filter((e) => e.date && new Date(e.date) >= new Date())
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
const past = events
    .filter((e) => !e.date || new Date(e.date) < new Date())
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const path = computed(() => `/webinars/${slug.value}`)
const meta = computed(() => events.find((e) => e.url.replace(/\/$/, '') === path.value) || {})

const { data: page } = await useAsyncData(
    () => `webinar-${slug.value}`,
    () => isIndex.value ? Promise.resolve(null) : queryCollection('webinars').path(path.value).first()
)
if (!isIndex.value && !page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead(() => ({
    title: isIndex.value ? 'Webinars • FlowFuse' : `${meta.value.title} • FlowFuse`,
    meta: [{ name: 'description', content: isIndex.value ? 'Explore past and upcoming webinars showcasing Node-RED and FlowFuse advancements.' : (meta.value.description || '') }],
}))
</script>

<template>
  <!-- INDEX -->
  <div v-if="isIndex" class="webinar nohero container m-auto text-left max-w-4xl pt-8 pb-24 w-full px-2">
    <h1>Webinars</h1>
    <div class="flex flex-col gap-6">
      <div v-for="item in upcoming" :key="item.url">
        <h3 class="w-full text-indigo-400">
          {{ item.type === 'ama' ? 'Upcoming "Ask Me Anything" Session' : 'Upcoming Webinar:' }}
          <span class="text-indigo-600 italic text-lg ml-2">{{ item.shortDate }}</span>
        </h3>
        <ul>
          <li class="webinar-tile">
            <div class="flex flex-col md:flex-row">
              <a :href="item.url" class="webinar-tile-img relative mb-4 md:mb-0 flex md:w-1/2 mr-2 rounded-lg">
                <div class="w-full h-auto">
                  <img :src="item.image || '/images/og-webinar.jpg'" :alt="item.title" class="rounded-lg w-full" />
                </div>
              </a>
              <div class="flex flex-col justify-between md:w-1/2 md:px-2">
                <div class="grow">
                  <h4>{{ item.title }}</h4>
                  <p v-if="item.subtitle" class="text-gray-600">{{ item.subtitle }}</p>
                </div>
                <div>
                  <a class="inline-flex ff-btn ff-btn--primary text-sm" :href="item.url">More Info</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h3 v-if="past.length" class="w-full text-indigo-400 mt-6">Past Webinars</h3>
    <ul class="grid md:grid-cols-3 gap-4">
      <li v-for="item in past" :key="item.url" class="w-full my-2 pb-6 border-b">
        <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
          <time class="block text-xs mb-2 text-gray-500">{{ item.shortDate }}</time>
          <div class="w-full h-auto shadow rounded mb-4">
            <img :src="item.image || '/images/og-blog.jpg'" :alt="item.title" class="rounded w-full" />
          </div>
          <h3 class="mt-1 mb-0 font-medium group-hover:underline">{{ item.title }}</h3>
        </a>
      </li>
    </ul>
  </div>

  <!-- WEBINAR DETAIL -->
  <EventDetail v-else :meta="meta" :page="page" />
</template>
