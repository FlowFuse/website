<script setup>
import indexData from '../../blog.index.json'
import authorsData from '../../blog.authors.json'

const route = useRoute()
const parts = computed(() => {
    const s = route.params.slug
    return (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean)
})

const { pageSize, mainPageCount, cards, categories } = indexData
const cardByUrl = new Map(cards.map((c) => [c.url, c]))

// Tag filter buttons (order + labels mirror src/_data/blogTags.json).
const blogTags = [
    { label: 'All', value: 'posts', href: '/blog/' },
    { label: 'How-To', value: 'how-to', href: '/blog/how-to/' },
    { label: 'Node-RED', value: 'node-red', href: '/blog/node-red/' },
    { label: 'AI', value: 'ai', href: '/blog/ai/' },
    { label: 'UNS', value: 'uns', href: '/blog/uns/' },
    { label: 'Dashboard', value: 'dashboard', href: '/blog/dashboard/' },
    { label: 'FlowFuse', value: 'flowfuse', href: '/blog/flowfuse/' },
    { label: 'Releases', value: 'releases', href: '/blog/releases/' },
    { label: 'News', value: 'news', href: '/blog/news/' },
]

// ---------- dispatch ----------
const catKeys = Object.keys(categories)
const mode = computed(() => {
    const p = parts.value
    if (p.length === 0) return { type: 'index', seg: null, page: 0 }
    if (p.length === 1 && /^\d+$/.test(p[0])) return { type: 'index', seg: null, page: Number(p[0]) }
    if (p.length === 1 && catKeys.includes(p[0])) return { type: 'index', seg: p[0], page: 0 }
    if (p.length === 2 && catKeys.includes(p[0]) && /^\d+$/.test(p[1])) return { type: 'index', seg: p[0], page: Number(p[1]) }
    return { type: 'post', seg: null, page: 0 }
})
const isIndex = computed(() => mode.value.type === 'index')

const fmtDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()]
    return `${d.getUTCDate()} ${m}, ${d.getUTCFullYear()}`
}
const authorNames = (a) => (a || []).map((id) => authorsData[id]?.name || 'FlowFuse').join(', ')

// ---------- INDEX / CATEGORY ----------
const listCards = computed(() => {
    if (!isIndex.value) return []
    if (!mode.value.seg) return cards
    return (categories[mode.value.seg]?.urls || []).map((u) => cardByUrl.get(u)).filter(Boolean)
})
const pageCount = computed(() => mode.value.seg ? (categories[mode.value.seg]?.pageCount || 1) : mainPageCount)
const pageNum = computed(() => mode.value.page)
const pageCards = computed(() => listCards.value.slice(pageNum.value * pageSize, pageNum.value * pageSize + pageSize))
const baseUrl = computed(() => mode.value.seg ? `/blog/${mode.value.seg}/` : '/blog/')
const prevHref = computed(() => pageNum.value <= 1 ? baseUrl.value : `${baseUrl.value}${pageNum.value - 1}/`)
const nextHref = computed(() => `${baseUrl.value}${pageNum.value + 1}/`)

// ---------- POST ----------
const contentPath = computed(() => '/blog/' + parts.value.join('/'))
const postUrl = computed(() => contentPath.value + '/')
const meta = computed(() => cardByUrl.get(postUrl.value) || {})

const { data: entry } = await useAsyncData(
    () => `blog-${contentPath.value}`,
    // @nuxt/content lowercases stored content paths; query lowercased while the
    // served route keeps its original case for URL parity.
    () => isIndex.value ? Promise.resolve(null) : queryCollection('blog').path(contentPath.value.toLowerCase()).first()
)
if (!isIndex.value && !entry.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// Related: posts sharing the most tags; fall back to 5 most recent.
const related = computed(() => {
    if (isIndex.value) return []
    const myTags = new Set((meta.value.tags || []).filter((t) => t !== 'posts'))
    const scored = cards
        .filter((c) => c.url !== postUrl.value)
        .map((c) => ({ c, score: (c.tags || []).reduce((n, t) => n + (myTags.has(t) ? 1 : 0), 0) }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((x) => x.c)
    if (scored.length) return { heading: 'Related Articles:', list: scored }
    return { heading: 'Recommended Articles:', list: cards.filter((c) => c.url !== postUrl.value).slice(0, 5) }
})
const bioAuthors = computed(() => (meta.value.authors || []).map((id) => authorsData[id]).filter((a) => a && a.bio))
const toc = computed(() => entry.value?.body?.toc?.links ?? [])

useHead(() => ({
    title: isIndex.value
        ? (mode.value.seg ? `${categories[mode.value.seg].label} • FlowFuse Blog` : 'Blog • FlowFuse')
        : `${meta.value.title || entry.value?.title} • FlowFuse Blog`,
    meta: meta.value.description ? [{ name: 'description', content: meta.value.description }] : [],
}))
</script>

<template>
  <!-- INDEX / CATEGORY -->
  <div v-if="isIndex" class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
    <div class="px-2 flex items-center gap-12">
      <h1 class="mb-0">Blog</h1>
    </div>
    <div class="px-2 my-4 flex flex-wrap flex-row gap-4 md:justify-between">
      <a v-for="tag in blogTags" :key="tag.value" class="hover:no-underline" :href="tag.href">
        <button class="w-full ff-btn" :class="(tag.value === 'posts' ? route.path === '/blog/' || route.path === '/blog' : route.path.includes('/' + tag.value + '/')) ? 'ff-btn--primary' : 'ff-btn--primary-outlined'">{{ tag.label }}</button>
      </a>
    </div>
    <ul class="flex flex-wrap">
      <template v-for="(item, i) in pageCards" :key="item.url">
        <!-- Featured first card -->
        <li v-if="i === 0" class="w-full mt-2 px-2 pb-4">
          <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
            <div class="md:w-3/4 pr-2">
              <time class="block text-xs text-gray-500">{{ fmtDate(item.date) }}</time>
              <h2 class="mb-0 text-xl font-medium group-hover:underline">{{ item.title }}</h2>
              <div class="italic text-xs mb-3"><div class="author">{{ authorNames(item.authors) }}</div></div>
            </div>
            <div class="flex flex-col md:flex-row">
              <div class="ff-blog-tile pr-2 md:w-1/3"><img :src="item.image" :alt="item.title" class="w-full h-auto rounded" loading="lazy"></div>
              <div class="flex flex-col justify-between md:w-2/3 md:px-2">
                <div class="text-sm prose md:prose-md py-1"><p v-if="item.description">{{ item.description }}</p></div>
                <div class="group-hover:underline">read more...</div>
              </div>
            </div>
          </a>
        </li>
        <li v-else class="w-full md:w-1/3 my-2 px-2 pb-6 border-b">
          <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
            <time class="block text-xs mb-2 text-gray-500">{{ fmtDate(item.date) }}</time>
            <div class="ff-blog-tile"><img :src="item.image" :alt="item.title" class="w-full h-auto rounded" loading="lazy"></div>
            <h2 class="mt-1 mb-0 text-xl font-medium group-hover:underline">{{ item.title }}</h2>
            <div v-if="item.description" class="text-sm prose md:prose-md py-1">{{ item.description.slice(0, 120) }}</div>
            <div class="italic text-xs mb-3"><div class="author">{{ authorNames(item.authors) }}</div></div>
          </a>
        </li>
        <!-- Signup CTA after the featured card -->
        <li v-if="i === 0" class="w-full px-2 pt-2 pb-2 mb-2 flex flex-col border-t-2 border-b-2">
          <a id="sign-up" />
          <h3 class="mb-0 text-lg font-semibold">Sign up for our monthly email updates:</h3>
          <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" />
        </li>
      </template>
    </ul>
    <nav aria-label="Pagination" class="pagination mt-4 px-2">
      <ol class="flex flex-row w-full justify-between text-gray-600">
        <li class="w-40 justify-start"><a v-if="pageNum > 0" :href="prevHref">Previous</a></li>
        <li><span>{{ pageNum + 1 }} of {{ pageCount }}</span></li>
        <li class="w-40 justify-end text-right"><a v-if="pageNum < pageCount - 1" :href="nextHref">Next</a></li>
      </ol>
    </nav>
  </div>

  <!-- POST -->
  <div v-else class="w-full page post">
    <div class="post-title container m-auto text-center max-lg:px-6 flex mt-6 mb-6 md:max-w-screen-lg md:mt-12">
      <div class="text-left md:pr-32">
        <label>Article</label>
        <h1>{{ meta.title || entry.title }}</h1>
        <h4 v-if="meta.subtitle" v-html="meta.subtitle" />
        <div class="flex items-center gap-1 text-sm text-gray-500 mt-4">
          <span><template v-for="(id, i) in (meta.authors || [])" :key="id"><template v-if="i"> </template><span class="font-medium">{{ authorsData[id]?.name || 'FlowFuse' }}</span><span v-if="authorsData[id]?.title" class="text-gray-400">, {{ authorsData[id].title }}</span></template></span>
          <span class="text-gray-500">•</span>
          <time>{{ meta.lastUpdated ? 'Updated ' : '' }}{{ fmtDate(meta.lastUpdated || meta.date) }}</time>
        </div>
      </div>
    </div>
    <div class="blog nohero w-full pb-24">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8 items-stretch">
        <div class="ff-prose">
          <a class="inline-flex align-center gap-1 mb-4" href="/blog">&larr; Back to Blog Posts</a>
          <div class="prose w-full flex-grow">
            <div class="mb-4 hero-img">
              <lite-youtube v-if="meta.video" :videoid="meta.video" params="rel=0" style="margin-top:20px;margin-bottom:20px;width:100%;height:480px;" :title="`${meta.title} - YouTube video`" />
              <div v-else class="w-full h-auto"><img :src="meta.image" :alt="meta.title" class="w-full h-auto rounded"></div>
            </div>
            <section v-if="meta.tldr" id="tldr" aria-label="TL;DR" class="not-prose my-8 rounded-r-lg border-l-4 border-indigo-400 bg-indigo-50 px-6 py-5">
              <span class="text-indigo-400 text-xs uppercase font-bold tracking-wider">TL;DR</span>
              <p v-if="typeof meta.tldr === 'string'" class="mt-2 mb-0 text-sm leading-relaxed text-gray-700">{{ meta.tldr }}</p>
              <ul v-else class="mt-2 mb-0 list-disc space-y-1 pl-4 text-sm leading-relaxed text-gray-700">
                <li v-for="(point, i) in meta.tldr" :key="i">{{ point }}</li>
              </ul>
            </section>
            <ContentRenderer v-if="entry" :value="entry" />
          </div>

          <div class="mt-10">
            <div class="ff-blue-card blog-post-cta p-8 sm:p-12 m-auto max-w-prose">
              <div class="flex flex-col gap-6 sm:gap-8 text-center sm:text-left">
                <h3 class="mt-0 mb-0 !text-3xl text-indigo-800">Start building with your own industrial data</h3>
                <p class="mt-0 mb-0 max-w-4xl mx-auto sm:mx-0 leading-relaxed">Connect your systems, automate workflows, and see what’s possible in your environment.</p>
                <div class="flex justify-center sm:justify-start">
                  <a class="ff-btn ff-btn--highlight uppercase items-center text-base no-underline" href="https://app.flowfuse.com/account/create">Get Started</a>
                </div>
              </div>
            </div>
          </div>

          <div v-for="a in bioAuthors" :key="a.name" class="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-medium mb-4">About the Author</h3>
            <div class="flex flex-col sm:flex-row gap-6">
              <div class="flex-shrink-0">
                <div class="w-24 h-24 rounded-full overflow-hidden bg-white shadow-md" :style="`background-image:url(/images/team/headshot-${a.headshot});background-size:cover;background-position:center;`" />
              </div>
              <div class="flex-grow">
                <h4 class="text-base font-medium mb-0">{{ a.name }}</h4>
                <p class="text-sm text-indigo-600 mb-3 -mt-1">{{ a.title }}</p>
                <p class="text-sm text-gray-700 mb-4">{{ a.bio }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-72 max-w-full flex-shrink-0">
          <div v-if="toc.length" class="mt-6 flex flex-col">
            <p class="font-medium border-b pb-1 mb-2">On this page</p>
            <ul class="space-y-1 text-sm">
              <li v-for="link in toc" :key="link.id"><a :href="`#${link.id}`" class="text-gray-500 hover:text-blue-700">{{ link.text }}</a></li>
            </ul>
          </div>
          <div class="sticky top-20">
            <h3 class="mb-3 pt-6 border-t-2">{{ related.heading }}</h3>
            <ul class="ml-6 list-disc">
              <li v-for="p in related.list" :key="p.url" class="mb-3"><a :href="p.url">{{ p.title }}</a></li>
            </ul>
            <div class="mt-3 pt-6 flex flex-col border-t-2">
              <h3>Sign up for updates</h3>
              <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
