export const BLOG_PAGE_SIZE = 19

// Matches the historical src/blog/*.njk tag-listing pages (blogTags.json controls
// which of these show as nav buttons; 'tips' has a route but isn't in that button list).
export const BLOG_TAGS = ['how-to', 'node-red', 'ai', 'uns', 'dashboard', 'flowfuse', 'releases', 'news', 'plc', 'mqtt', 'opcua', 'modbus', 'tips']

// Mirrors .eleventy.js's DEV_MODE_POSTS: future-dated posts are hidden outside production
// (Netlify sets CONTEXT), so deploy previews and dev can still preview scheduled posts.
export function isFuturePost(date: string | Date): boolean {
    return new Date(date) > new Date() && process.env.CONTEXT === 'production'
}

export function useBlogList(tag: string | null, pageNumber: number) {
    const { data: allEntries } = useAsyncData(
        tag ? `blog-all-${tag}` : 'blog-all',
        async () => {
            const all = await queryCollection('blog')
                .select('path', 'title', 'date', 'tags', 'authors', 'description', 'meta', 'image')
                .order('date', 'DESC')
                .all()
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
