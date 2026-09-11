// The Blueprint Library listing, as src/blueprints.njk paginated it: 12 per page.
export const BLUEPRINTS_PAGE_SIZE = 12

// The listing copy, from src/blueprints.njk's frontmatter. `title` was the <h1> and
// `meta.title` the <title>; the wording differs between them in the source and is kept.
export const BLUEPRINTS_TITLE = 'Blueprint Library'
export const BLUEPRINTS_META_TITLE = 'Blueprints Library'
export const BLUEPRINTS_DESCRIPTION = 'Explore FlowFuse Blueprints, choose templates for quick setups, perfect for learning and fast solution-building. Customizable for unique needs. Simplify your Node-RED projects with FlowFuse Blueprints!'

export interface BlueprintListEntry {
    path: string
    title: string
    description?: string
    image?: string
    tags?: string[]
    author?: string
    blueprintId?: string
}

// Ordered by path, descending. 11ty ordered the collection by date and reversed it, but no
// blueprint README carries a date, so every entry fell back to its file mtime - the CI
// checkout time, identical for all of them - and the tie broke on input path. Reverse path
// order is that same order, made explicit. The one blueprint that does set a `date`
// (manufacturing/oee-dashboard) sorted to the very end there and now sits with its
// category, which is the only visible difference.
const ORDER_FIELD = 'path'

// `page` is read through toValue so the slice follows a client-side move between listing
// pages, which reuses this component rather than remounting it.
export function useBlueprintList (page: MaybeRefOrGetter<number>) {
    const { data: allEntries } = useAsyncData('blueprints-all', () =>
        queryCollection('blueprints')
            .select('path', 'title', 'description', 'image', 'tags', 'author', 'blueprintId')
            .order(ORDER_FIELD, 'DESC')
            .all() as Promise<BlueprintListEntry[]>
    )

    const totalPages = computed(() => Math.max(1, Math.ceil((allEntries.value || []).length / BLUEPRINTS_PAGE_SIZE)))

    const entries = computed(() => {
        const start = (Math.max(1, toValue(page)) - 1) * BLUEPRINTS_PAGE_SIZE
        return (allEntries.value || []).slice(start, start + BLUEPRINTS_PAGE_SIZE)
    })

    return { entries, totalPages }
}
