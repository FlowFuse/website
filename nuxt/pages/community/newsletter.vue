<script setup>
// Native Nuxt reproduction of src/community/newsletter.njk — lists blog posts
// tagged "newsletter" (collections.newsletter), newest first.
import blogIndex from '../../blog.index.json'
import authorsData from '../../blog.authors.json'

const newsletters = computed(() =>
    blogIndex.cards.filter((c) => c.tags.includes('newsletter'))
)

const fmtDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()]
    return `${d.getUTCDate()} ${m}, ${d.getUTCFullYear()}`
}
const authorNames = (a) => (a || []).map((id) => authorsData[id]?.name || 'FlowFuse').join(', ')

useHead({ title: 'Newsletter • FlowFuse' })
</script>

<template>
  <div class="newsletter nohero container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
    <div class="px-2"><h1>Newsletter</h1></div>
    <ul class="flex flex-wrap">
      <template v-for="(item, i) in newsletters" :key="item.url">
        <li v-if="i === 0" class="w-full mt-2 px-2 pb-4">
          <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
            <div class="md:w-1/2 pr-2">
              <time class="block text-xs text-gray-500">{{ fmtDate(item.date) }}</time>
              <h3 class="mb-0 font-medium group-hover:underline">{{ item.title }}</h3>
              <div class="italic text-xs mb-3"><div class="author">{{ authorNames(item.authors) }}</div></div>
            </div>
            <div class="flex flex-col md:flex-row">
              <div class="pr-2 md:w-1/3">
                <div class="w-full h-auto mb-10"><img :src="item.image" :alt="item.title" class="w-full h-auto rounded" loading="lazy"></div>
              </div>
              <div class="flex flex-col justify-between md:w-2/3 md:px-2">
                <div><p v-if="item.description">{{ item.description }}</p></div>
                <div class="group-hover:underline">read more...</div>
              </div>
            </div>
          </a>
        </li>
        <li v-else class="w-full md:w-1/3 my-2 px-2 pb-6 border-b">
          <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
            <div>
              <time class="block text-xs mb-2 text-gray-500">{{ fmtDate(item.date) }}</time>
              <div><div class="w-full h-auto mb-4"><img :src="item.image" :alt="item.title" class="w-full h-auto rounded" loading="lazy"></div></div>
              <h3 class="mt-1 mb-0 font-medium group-hover:underline">{{ item.title }}</h3>
            </div>
            <div class="text-sm prose prose-blue md:prose-md py-1"><p v-if="item.description">{{ item.description }}</p></div>
            <div class="italic text-xs mb-3"><div class="author">{{ authorNames(item.authors) }}</div></div>
          </a>
        </li>
        <div v-if="i === 0" class="w-full px-2 pt-2 pb-2 mb-2 flex flex-col border-t-2 border-b-2">
          <a id="sign-up" />
          <h5 class="mb-0">Sign up for our monthly email updates:</h5>
          <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" />
        </div>
      </template>
    </ul>
  </div>
</template>
