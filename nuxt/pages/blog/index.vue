<script setup lang="ts">
import type { BlogPost } from '~/server/api/blog.get'

definePageMeta({ layout: 'default' })

const route = useRoute()
const currentPage = computed(() => {
    const p = route.query.page
    const n = p ? Number(p) : 1
    return Number.isFinite(n) && n >= 1 ? n : 1
})

const { data } = await useAsyncData(
    () => `blog-${currentPage.value}`,
    () => $fetch<{ posts: BlogPost[]; total: number; pageCount: number }>(`/api/blog?page=${currentPage.value}`)
)

const posts = computed(() => data.value?.posts ?? [])
const pageCount = computed(() => data.value?.pageCount ?? 1)

useHead({
    title: computed(() => currentPage.value > 1
        ? `Blog - Page ${currentPage.value} • FlowFuse`
        : 'Blog • FlowFuse'
    ),
    meta: [
        { name: 'description', content: 'The FlowFuse blog: articles, tutorials and updates on Node-RED, industrial IoT and the FlowFuse platform.' },
        { property: 'og:title', content: 'FlowFuse Blog' },
    ],
})

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    const day = d.getUTCDate()
    const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    const year = d.getUTCFullYear()
    return `${day} ${month}, ${year}`
}

function truncate(text: string, words = 20): string {
    const ws = text.split(/\s+/).filter(Boolean)
    return ws.length <= words ? text : `${ws.slice(0, words).join(' ')}...`
}

function paginationTo(page: number) {
    return page === 1 ? '/blog/' : { query: { page } }
}
</script>

<template>
    <div class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
        <div class="px-2">
            <h1 class="mb-0">Blog</h1>
        </div>

        <ul class="flex flex-wrap">

            <!-- Featured post (first on each page) -->
            <li v-if="posts[0]" class="w-full mt-2 px-2 pb-4">
                <NuxtLink :href="posts[0].url" class="w-full flex flex-col group hover:no-underline">
                    <div class="md:w-3/4 pr-2">
                        <time class="block text-xs text-gray-500">{{ formatDate(posts[0].date) }}</time>
                        <h2 class="mb-0 text-xl font-medium group-hover:underline">{{ posts[0].title }}</h2>
                        <div class="italic text-xs mb-3">
                            <span v-for="(author, i) in posts[0].authors" :key="author.id">{{ i > 0 ? ', ' : '' }}{{ author.name }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row">
                        <div class="ff-blog-tile pr-2 md:w-1/3">
                            <img
                                :src="posts[0].image ?? '/images/og-blog.jpg'"
                                :alt="posts[0].title"
                                width="285"
                                class="w-full h-auto"
                            />
                        </div>
                        <div class="flex flex-col justify-between md:w-2/3 md:px-2">
                            <div>{{ truncate(posts[0].description) }}</div>
                            <div class="group-hover:underline">read more...</div>
                        </div>
                    </div>
                </NuxtLink>
            </li>

            <!-- Newsletter banner -->
            <li v-if="posts.length > 0" class="w-full px-2 pt-2 pb-2 mb-2 flex flex-col border-t-2 border-b-2">
                <a id="sign-up"></a>
                <h3 class="mb-0 text-lg font-semibold">Sign up for our monthly email updates:</h3>
                <ClientOnly>
                    <HubSpotForm
                        form-id="159c173d-dd95-49bd-922b-ff3ef243e90c"
                        cta="cta-blog-subscribe"
                        reference="blog"
                    />
                </ClientOnly>
            </li>

            <!-- Regular posts (3-column grid) -->
            <li v-for="post in posts.slice(1)" :key="post.url" class="w-full md:w-1/3 my-2 px-2 pb-6 border-b">
                <NuxtLink :href="post.url" class="w-full flex flex-col group hover:no-underline">
                    <div>
                        <time class="block text-xs mb-2 text-gray-500">{{ formatDate(post.date) }}</time>
                        <div class="ff-blog-tile">
                            <img
                                :src="post.image ?? '/images/og-blog.jpg'"
                                :alt="post.title"
                                width="285"
                                class="w-full h-auto"
                            />
                        </div>
                        <h2 class="mt-1 mb-0 text-xl font-medium group-hover:underline">{{ post.title }}</h2>
                    </div>
                    <div class="text-sm prose prose-blue py-1">{{ truncate(post.description) }}</div>
                    <div class="italic text-xs mb-3">
                        <span v-for="(author, i) in post.authors" :key="author.id">{{ i > 0 ? ', ' : '' }}{{ author.name }}</span>
                    </div>
                </NuxtLink>
            </li>

        </ul>

        <div v-if="pageCount > 1" class="flex justify-center mt-4">
            <UPagination
                :page="currentPage"
                :total="data?.total ?? 0"
                :items-per-page="19"
                :to="paginationTo"
                active-color="secondary"
                active-variant="subtle"
            />
        </div>
    </div>
</template>
