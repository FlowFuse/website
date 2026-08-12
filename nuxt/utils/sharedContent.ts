// `nuxt generate` renders every prerendered route inside one long-lived Nitro process
// (confirmed: Nitro's prerender concurrency pool only overlaps I/O between routes, not
// the synchronous SSR render work itself, so throughput is bound by single-process CPU
// time, not core count). A plain module-scope promise here is therefore computed once
// and reused by every route that imports it, instead of every one of ~400 blog routes
// (and every handbook route) re-running the same @nuxt/content query.
// See https://roe.dev/blog/shared-data-nuxt-generate

let handbookNav: ReturnType<typeof queryCollectionNavigation> | null = null

export function getHandbookNav() {
    handbookNav ??= queryCollectionNavigation('handbook')
    return handbookNav
}

function queryAllBlogPosts() {
    return queryCollection('blog')
        .select('path', 'title', 'date', 'tags', 'authors', 'description', 'meta', 'image')
        .order('date', 'DESC')
        .all()
}

let blogPosts: ReturnType<typeof queryAllBlogPosts> | null = null

export function getAllBlogPosts() {
    blogPosts ??= queryAllBlogPosts()
    return blogPosts
}
