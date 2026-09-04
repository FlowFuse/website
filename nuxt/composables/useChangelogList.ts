import { withTrailingSlash } from '~/utils/withTrailingSlash'

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
        async () => {
            const entries = await queryCollection('changelog').order('date', 'DESC').all()
            return entries.map(entry => ({ ...entry, path: withTrailingSlash(entry.path) }))
        }
    )

    const visibleCount = ref(CHANGELOG_INITIAL_VISIBLE)

    const entries = computed(() => (allEntries.value || []) as unknown as ChangelogEntry[])

    const visible = computed(() => entries.value.slice(0, visibleCount.value))
    const hasMore = computed(() => visibleCount.value < entries.value.length)

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
        visibleCount.value = Math.min(visibleCount.value + CHANGELOG_VISIBLE_STEP, entries.value.length)
    }

    /**
     * Renders through the end of `release` so that /changelog/#release-2-20 resolves on
     * arrival: only the newest entries are in the markup, so an older release's anchor
     * does not exist until its entries are rendered. Returns false for an unknown release.
     */
    function revealRelease (release: string): boolean {
        // Releases ship in date order and the list is date-ordered, so the run is contiguous.
        const last = entries.value.findLastIndex(e => e.release === release)
        if (last < 0) return false
        visibleCount.value = Math.max(visibleCount.value, last + 1)
        return true
    }

    return { entries, visibleGroups, hasMore, showMore, revealRelease }
}
