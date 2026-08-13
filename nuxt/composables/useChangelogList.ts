// How many entries are in the markup before any scrolling. The whole archive is
// fetched in one query either way (it always was - the old paginated page fetched
// everything and sliced it), so this only governs how much is rendered up front.
export const CHANGELOG_INITIAL_VISIBLE = 20
export const CHANGELOG_VISIBLE_STEP = 20

export interface ChangelogEntry {
    path: string
    title: string
    description?: string
    date: string
    release: string
    authors?: string[]
}

export interface ChangelogReleaseGroup {
    release: string
    entries: ChangelogEntry[]
}

export function useChangelogList () {
    const { data: allEntries } = useAsyncData(
        'changelog-all',
        () => queryCollection('changelog').order('date', 'DESC').all()
    )

    const search = ref('')
    const visibleCount = ref(CHANGELOG_INITIAL_VISIBLE)

    const entries = computed(() => (allEntries.value || []) as unknown as ChangelogEntry[])

    const matching = computed(() => {
        const term = search.value.trim().toLowerCase()
        if (!term) return entries.value
        return entries.value.filter(e =>
            e.title?.toLowerCase().includes(term) || e.description?.toLowerCase().includes(term))
    })

    const visible = computed(() => matching.value.slice(0, visibleCount.value))
    const hasMore = computed(() => visibleCount.value < matching.value.length)

    function groupByRelease (list: ChangelogEntry[]): ChangelogReleaseGroup[] {
        const groups: ChangelogReleaseGroup[] = []
        for (const entry of list) {
            const last = groups.at(-1)
            // The list is already date-ordered and releases ship in date order, so
            // consecutive runs are exactly the groups.
            if (last && last.release === entry.release) last.entries.push(entry)
            else groups.push({ release: entry.release, entries: [entry] })
        }
        return groups
    }

    /** Groups actually rendered right now. */
    const visibleGroups = computed(() => groupByRelease(visible.value))

    function showMore () {
        visibleCount.value = Math.min(visibleCount.value + CHANGELOG_VISIBLE_STEP, matching.value.length)
    }

    watch(search, () => { visibleCount.value = CHANGELOG_INITIAL_VISIBLE })

    return { matching, visibleGroups, hasMore, search, showMore }
}
