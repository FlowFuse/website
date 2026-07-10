// Ports 11ty's `relatedPosts` filter (.eleventy.js): rank by shared-tag overlap,
// require at least (tagCount - 1) shared tags, fall back to latest 5 posts if none match.
export function pickRelatedPosts(allPosts: any[], current: { path: string, tags?: string[] }, limit = 5) {
    const requiredTags = current.tags ?? []

    const ranked = allPosts
        .filter(post => post.path !== current.path)
        .map(post => {
            const commonTags = requiredTags.reduce(
                (count, tag) => count + ((post.tags ?? []).includes(tag) ? 1 : 0),
                0
            )
            return { post, commonTags }
        })
        .filter(({ commonTags }) => commonTags >= Math.max(requiredTags.length - 1, 1))
        .sort((a, b) => b.commonTags - a.commonTags || +new Date(b.post.date) - +new Date(a.post.date))
        .slice(0, limit)
        .map(({ post }) => post)

    if (ranked.length > 0) return { posts: ranked, heading: 'Related Articles' }

    const recommended = allPosts.filter(post => post.path !== current.path).slice(0, limit)
    return { posts: recommended, heading: 'Recommended Articles' }
}
