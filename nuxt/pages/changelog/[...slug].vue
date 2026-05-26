<script setup>
import indexData from '../../changelog.index.json'
import team from '../../changelog.team.json'

const route = useRoute()
const parts = computed(() => {
    const s = route.params.slug
    return (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean)
})

// Dispatch: [] -> index page 0; ["N"] -> index page N; else -> entry.
const isIndex = computed(() => parts.value.length === 0 || (parts.value.length === 1 && /^\d+$/.test(parts.value[0])))
const pageNum = computed(() => (parts.value.length === 1 && /^\d+$/.test(parts.value[0]) ? Number(parts.value[0]) : 0))

const authorNames = (authors) => (authors || []).map((a) => team[a]?.name || a).filter(Boolean).join(', ')
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '')

// ---------- INDEX / PAGINATION ----------
const { pageSize, pageCount, cards } = indexData
const pageCards = computed(() => isIndex.value ? cards.slice(pageNum.value * pageSize, pageNum.value * pageSize + pageSize) : [])

// ---------- ENTRY ----------
const entryPath = computed(() => '/changelog/' + parts.value.join('/'))
const entryUrl = computed(() => entryPath.value + '/')
// Metadata (title/date/authors/issues/subtitle) comes from the generated index;
// @nuxt/content does not surface custom frontmatter without a schema, and this
// keeps a single source of truth shared with the index cards and the feed.
const meta = computed(() => cards.find((c) => c.url === entryUrl.value) || {})
const { data: entry } = await useAsyncData(
    () => `changelog-entry-${entryPath.value}`,
    () => isIndex.value ? Promise.resolve(null) : queryCollection('changelog').path(entryPath.value).first()
)
if (!isIndex.value && !entry.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
const recent = computed(() => cards.filter((c) => c.type === 'changelog' && c.url !== entryUrl.value).slice(0, 5))

useHead(() => ({
    title: isIndex.value ? 'Changelog • FlowFuse' : `${meta.value.title || entry.value?.title} • FlowFuse Changelog`
}))
</script>

<template>
  <!-- INDEX / PAGINATION -->
  <div v-if="isIndex" class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full px-6">
    <div class="w-full sm:flex justify-between">
      <h1 class="mb-0">Changelog</h1>
      <div class="flex flex-row max-sm:mt-4 justify-between sm:justify-end gap-4 items-end">
        <p class="my-0">Getting all the news on new features we ship</p>
        <a href="/changelog/index.xml" title="View the changelog RSS feed" class="mb-2 hover:text-blue-800">RSS</a>
      </div>
    </div>
    <ul class="flex flex-wrap border-t mt-4">
      <li v-for="item in pageCards" :key="item.url" class="w-full my-2 py-6 border-b flex flex-col md:flex-row">
        <div class="w-full flex flex-col flex-none md:w-72 md:pr-4">
          <a :href="item.url" class="flex flex-col group hover:no-underline">
            <time class="block text-xs text-gray-500">{{ fmtDate(item.date) }}</time>
            <h2 class="mb-0 text-xl font-medium group-hover:underline">{{ item.title }}</h2>
            <div v-if="authorNames(item.authors)" class="italic text-xs mb-3 author">{{ authorNames(item.authors) }}</div>
          </a>
        </div>
        <div class="flex-grow pt-4">
          <div class="prose">
            <p v-if="item.description">{{ item.description }}</p>
            <a :href="item.url" class="group-hover:underline">read more...</a>
          </div>
        </div>
      </li>
    </ul>
    <nav aria-label="Pagination" class="pagination mt-4">
      <ol class="flex flex-row w-full justify-between text-gray-600">
        <li class="w-40 justify-start" :style="pageNum === 0 ? 'opacity:0;pointer-events:none' : ''">
          <a :href="pageNum <= 1 ? '/changelog/' : `/changelog/${pageNum - 1}/`">Previous</a>
        </li>
        <li><span>{{ pageNum + 1 }} of {{ pageCount }}</span></li>
        <li class="w-40 justify-end text-right" :style="pageNum >= pageCount - 1 ? 'opacity:0;pointer-events:none' : ''">
          <a :href="`/changelog/${pageNum + 1}/`">Next</a>
        </li>
      </ol>
    </nav>
  </div>

  <!-- ENTRY -->
  <div v-else class="w-full page post">
    <div class="post-title container m-auto text-center max-lg:px-6 flex mt-6 mb-6 md:max-w-screen-lg md:mt-12">
      <div class="text-left md:pr-32">
        <label>Changelog</label>
        <h1>{{ meta.title || entry.title }}</h1>
        <h4 v-if="meta.subtitle">{{ meta.subtitle }}</h4>
      </div>
    </div>
    <div class="blog nohero w-full pb-24">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8 items-stretch">
        <div class="ff-prose flex-grow">
          <a class="inline-flex align-center gap-1 mb-4" href="/changelog/">&larr; Back to the Changelog</a>
          <div class="prose"><ContentRenderer :value="entry" /></div>
        </div>
        <div class="w-72 max-w-full flex-shrink-0">
          <div class="sticky top-20 mt-6 flex flex-col">
            <template v-if="authorNames(meta.authors)">
              <h3 class="mb-3">Written By:</h3>
              <p>{{ authorNames(meta.authors) }}</p>
            </template>
            <p>Published on: <time>{{ fmtDate(meta.date) }}</time></p>
            <template v-if="meta.issues && meta.issues.length">
              <div class="py-6 border-t-2">
                <h3 class="mb-3">Related GitHub Issues</h3>
                <ul class="space-y-2 list-disc pl-5">
                  <li v-for="issue in meta.issues" :key="issue">
                    <a :href="String(issue).startsWith('http') ? issue : `https://github.com/FlowFuse/flowfuse/issues/${String(issue).replace(/^#/, '')}`"
                       class="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener">
                      #{{ String(issue).replace(/^#/, '').split('/').pop() }}
                    </a>
                  </li>
                </ul>
              </div>
            </template>
            <h3 class="mb-3 pt-6 border-t-2">Recent Updates:</h3>
            <ul class="ml-6 list-disc">
              <li v-for="r in recent" :key="r.url" class="mb-3"><a :href="r.url">{{ r.title }}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
