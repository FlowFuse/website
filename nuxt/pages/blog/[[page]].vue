<script setup lang="ts">
import type { BlogPost } from '~/server/api/blog.get'

definePageMeta({ layout: 'default' })

const route = useRoute()
const currentPage = computed(() => {
    const p = route.params.page
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

const prevHref = computed(() => currentPage.value === 2 ? '/blog/' : `/blog/${currentPage.value - 1}/`)
const nextHref = computed(() => `/blog/${currentPage.value + 1}/`)
</script>

<template>
    <div class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
        <div class="px-2">
            <h1 class="mb-0">Blog</h1>
        </div>

        <ul class="flex flex-wrap">
            <template v-for="(post, index) in posts" :key="post.url">

                <!-- Featured post (first on each page) -->
                <li v-if="index === 0" class="w-full mt-2 px-2 pb-4">
                    <NuxtLink :href="post.url" class="w-full flex flex-col group hover:no-underline">
                        <div class="md:w-3/4 pr-2">
                            <time class="block text-xs text-gray-500">{{ formatDate(post.date) }}</time>
                            <h2 class="mb-0 text-xl font-medium group-hover:underline">{{ post.title }}</h2>
                            <div class="italic text-xs mb-3">
                                <span v-for="(author, i) in post.authors" :key="author.id">{{ i > 0 ? ', ' : '' }}{{ author.name }}</span>
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row">
                            <div class="ff-blog-tile pr-2 md:w-1/3">
                                <img
                                    :src="post.image ?? '/images/og-blog.jpg'"
                                    :alt="post.title"
                                    width="285"
                                    class="w-full h-auto"
                                />
                            </div>
                            <div class="flex flex-col justify-between md:w-2/3 md:px-2">
                                <div>{{ truncate(post.description) }}</div>
                                <div class="group-hover:underline">read more...</div>
                            </div>
                        </div>
                    </NuxtLink>
                </li>

                <!-- Regular posts (3-column grid) -->
                <li v-else class="w-full md:w-1/3 my-2 px-2 pb-6 border-b">
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

            </template>
        </ul>

        <nav aria-label="Pagination" class="pagination mt-4">
            <ol class="flex flex-row w-full justify-between text-gray-600">
                <li
                    class="flex md:flex-initial w-40 justify-start pl-2 ff-nav-blog-p"
                    :style="currentPage <= 1 ? 'opacity: 0; pointer-events: none;' : ''"
                >
                    <NuxtLink :href="prevHref">Previous</NuxtLink>
                </li>
                <li>
                    <span>{{ currentPage }} of {{ pageCount }}</span>
                </li>
                <li
                    class="flex md:flex-initial w-40 justify-end pr-2 ff-nav-blog-n"
                    :style="currentPage >= pageCount ? 'opacity: 0; pointer-events: none;' : ''"
                >
                    <NuxtLink :href="nextHref">Next</NuxtLink>
                </li>
            </ol>
        </nav>
    </div>
</template>
