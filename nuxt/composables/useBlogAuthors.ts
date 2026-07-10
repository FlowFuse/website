// Merges blogTeam + blogGuests into a single lookup keyed by filename stem,
// mirroring 11ty's `people = {...team, ...guests}` (src/_data/eleventyComputed.js).
export const useBlogAuthors = () =>
    useAsyncData('blog-authors', async () => {
        const [team, guests] = await Promise.all([
            queryCollection('blogTeam').all(),
            queryCollection('blogGuests').all(),
        ])

        const people: Record<string, any> = {}
        for (const entry of [...team, ...guests]) {
            const key = entry.stem?.split('/').pop()
            if (key) people[key] = entry
        }
        return people
    })
