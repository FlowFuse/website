<script setup>
const props = defineProps({
    meta: { type: Object, required: true },
    page: { type: Object, default: null },
})
const isFuture = computed(() => props.meta.date && new Date(props.meta.date) >= new Date())
</script>

<template>
  <div class="w-full page webinar">
    <div v-if="meta.title" class="webinar-title container m-auto text-center max-lg:px-6 flex mt-6 mb-6 md:max-w-screen-lg md:mt-12">
      <div class="text-left md:pr-32">
        <label>{{ meta.type === 'ama' ? 'Ask Me Anything' : 'Webinar' }}</label>
        <h1>{{ meta.title }}</h1>
        <h4 v-if="meta.subtitle">{{ meta.subtitle }}</h4>
        <div class="mt-8 flex flex-wrap gap-4 text-gray-500">
          <time>{{ meta.shortDate }}</time>
          <time v-if="meta.time">{{ meta.time }}</time>
          <time v-if="meta.duration">{{ meta.duration }}</time>
        </div>
      </div>
    </div>
    <div class="blog nohero w-full pt-6 pb-24">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8">
        <div>
          <a class="mb-4 inline-flex align-center gap-1" href="/webinars/">&larr; Back to Webinars</a>
          <div v-if="meta.video" class="mb-4" style="max-width: 706px;">
            <div style="position: relative; padding-bottom: 56.25%; height: 0;">
              <iframe :src="`https://www.youtube.com/embed/${meta.video}?rel=0`" title="YouTube video"
                      style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
            </div>
          </div>
          <div v-else-if="meta.image" class="max-w-[706px] mb-6">
            <img :src="meta.image" :alt="`Image representing ${meta.title}`" class="w-full rounded-lg" />
          </div>
          <div class="prose">
            <ContentRenderer :value="page" />
          </div>
        </div>
        <div class="w-72 max-w-full flex-shrink-0">
          <div v-if="isFuture && meta.hubspotFormId && !meta.hubspotDownloadFormId" class="mt-6 flex flex-col">
            <h3 class="mb-3">Register Here:</h3>
            <HubSpotForm :form-id="meta.hubspotFormId" />
          </div>
          <div class="mt-6 flex flex-col">
            <h3 class="mb-3">Presented by:</h3>
            <div v-for="host in meta.hosts" :key="host.name" class="team-card--sm">
              <div class="ff-headshot" :style="`background-image: url(${host.headshot})`" />
              <div class="team-card-info">
                <label>{{ host.name }}</label>
                <span>{{ host.title }}</span>
              </div>
            </div>
            <div v-if="meta.hubspotDownloadFormId" class="mt-6 flex flex-col">
              <h3 class="mb-3">Download webinar slides</h3>
              <HubSpotForm :form-id="meta.hubspotDownloadFormId" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
