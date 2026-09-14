import { getAllBlogPosts } from '../utils/sharedContent'

export const BLOG_PAGE_SIZE = 19

// Matches the historical src/blog/*.njk tag-listing pages (blogTags.json controls
// which of these show as nav buttons; 'tips' has a route but isn't in that button list).
export const BLOG_TAGS = ['how-to', 'node-red', 'ai', 'uns', 'dashboard', 'flowfuse', 'releases', 'news', 'plc', 'mqtt', 'opcua', 'modbus', 'tips']

// Mirrors .eleventy.js's DEV_MODE_POSTS: future-dated posts are hidden outside production,
// so deploy previews and dev can still preview scheduled posts. The flag is baked at build
// time (see nuxt.config.ts) rather than read from process.env here: a scheduled post gets no
// prerendered file, so its URL is served by the Netlify function, where process.env.CONTEXT
// is always undefined. That switched this check off and served the post before its date.
export function isFuturePost(date: string | Date): boolean {
    return new Date(date) > new Date() && useRuntimeConfig().public.isProductionContext
}

export function useBlogList(tag: string | null, pageNumber: number) {
    const { data: allEntries } = useAsyncData(
        tag ? `blog-all-${tag}` : 'blog-all',
        async () => {
            const all = await getAllBlogPosts()
            return all.filter(entry => !isFuturePost(entry.date) && (!tag || (entry.tags || []).includes(tag)))
        }
    )

    const totalPages = computed(() => Math.max(1, Math.ceil((allEntries.value || []).length / BLOG_PAGE_SIZE)))

    const entries = computed(() => {
        const start = (pageNumber - 1) * BLOG_PAGE_SIZE
        return (allEntries.value || []).slice(start, start + BLOG_PAGE_SIZE)
    })

    return { entries, totalPages }
}
