export const POSTS_PER_PAGE = 19

// @nuxt/content v3 stores `tags` as a JSON array column; fetching all posts and
// filtering/paginating in JS is simpler and safer than relying on JSON-in-SQL matching,
// and cheap enough at this scale (~400 posts).
export const useBlogPosts = () =>
    useAsyncData('blog-posts-all', () =>
        queryCollection('blog').order('date', 'DESC').all()
    )
