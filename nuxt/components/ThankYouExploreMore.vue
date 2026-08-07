<script setup lang="ts">
import { isFuturePost } from '~/composables/useBlogList'

const props = defineProps<{
    readingResources?: string
    collectionName?: string
    downloadFollowUp?: boolean
    hubspotReference: string
}>()

const { data: blogPosts } = await useAsyncData(`thank-you-blog-${props.collectionName || 'all'}`, async () => {
    const all = await queryCollection('blog')
        .select('path', 'title', 'date', 'tags')
        .order('date', 'DESC')
        .all()
    return all
        .filter(post => !isFuturePost(post.date) && (!props.collectionName || (post.tags || []).includes(props.collectionName)))
        .slice(0, 3)
})

// Mirrors explore-more-content.njk: takes the single latest-dated webinar overall
// (not "next upcoming or most recent past"), then checks if that one date is in the future.
const { data: webinar } = await useAsyncData('thank-you-webinar', async () => {
    const all = await queryCollection('webinars')
        .select('path', 'title', 'date', 'time')
        .order('date', 'DESC')
        .limit(1)
        .all()
    return all[0] ?? null
})

const webinarIsUpcoming = computed(() => webinar.value && new Date(webinar.value.date) >= new Date())

const blogListUrl = computed(() => `/blog/${props.collectionName || ''}`)
</script>

<template>
  <div>
    <template v-if="readingResources === 'stories'">
      <ThankYouStoriesBlock />
      <h4 class="mt-20 w-full text-center text-gray-500 pt-12 border-t">
        Learn more about how FlowFuse helps with your industrial data applications
      </h4>
    </template>

    <div class="w-full max-w-md md:max-w-none mx-auto flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-x-8 pt-8">
      <div class="w-full my-2 grid grid-cols-1 pb-4">
        <div class="pb-2 md:pb-0">
          <a href="/blog/">
            <img src="/images/home/blog.png" alt="Image of hands typing on laptop working on Node-RED flows" class="w-full max-w-[448px] mx-auto mb-4 aspect-video object-cover rounded-lg">
          </a>
          <h3 class="text-xl font-bold pb-3">
            Latest on the blog
          </h3>
          <a v-for="(post, index) in blogPosts" :key="post.path" :href="post.path" class="w-full flex flex-col group" :class="{ 'border-b': index !== (blogPosts?.length ?? 0) - 1 }">
            <h4 class="my-2 font-light text-lg">
              <span class="text-gray-500 group-hover:text-blue-700">{{ post.title }}</span>
            </h4>
          </a>
        </div>
        <a :href="blogListUrl" class="group hover:no-underline w-full text-right flex flex-row items-center justify-end gap-1">
          <span class="group-hover:underline">See all</span>
          <UIcon name="i-lucide-arrow-right" class="w-5 h-5 shrink-0" />
        </a>
      </div>

      <div v-if="webinar" class="w-full my-2 grid grid-cols-1 pb-4">
        <div class="pb-2 md:pb-0">
          <a :href="webinar.path">
            <img src="/images/home/webinar.png" alt="Image of hands typing on laptop working on Node-RED flows" class="w-full max-w-[448px] mx-auto mb-4 aspect-video object-cover rounded-lg">
          </a>
          <h3 class="text-xl font-bold pb-3">
            {{ webinarIsUpcoming ? 'Upcoming' : 'Latest' }} Webinar
          </h3>
          <div class="w-full flex flex-col">
            <h4 class="my-2 font-light text-lg">
              <span class="text-gray-500">{{ webinar.title }}</span>
            </h4>
          </div>
          <div class="w-full border-t pt-3 font-light text-gray-500">
            <time :datetime="webinar.date">{{ new Date(webinar.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</time>
            <template v-if="webinarIsUpcoming && webinar.time">
              &nbsp;|&nbsp;<time>{{ webinar.time }}</time>
            </template>
          </div>
        </div>
        <a
          :href="webinar.path"
          class="mt-4 ff-btn uppercase inline-block self-end justify-self-end"
          :class="downloadFollowUp ? 'ff-btn--primary' : 'ff-btn--primary-outlined'"
        >{{ webinarIsUpcoming ? 'REGISTER NOW' : 'WATCH WEBINAR' }}</a>
      </div>

      <div class="w-full my-2 grid grid-cols-1">
        <div class="pb-2 md:pb-0">
          <img src="/images/home/newsletter.png" alt="Image of hands typing on laptop working on Node-RED flows" class="w-full max-w-[448px] mx-auto mb-4 aspect-video object-cover rounded-lg">
          <h3 class="text-xl font-bold pb-3">
            Newsletter
          </h3>
          <h4 class="font-bold pb-3 pt-2 text-lg">
            Sign up for our monthly email updates
          </h4>
        </div>
        <div class="-mb-1 self-end w-full">
          <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" cta="cta-blog-subscribe" :reference="hubspotReference" />
        </div>
      </div>
    </div>
  </div>
</template>
