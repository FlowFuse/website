export const CHANGELOG_PAGE_SIZE = 19

export function useChangelogList(pageNumber: number) {
    const { data: allEntries } = useAsyncData(
        'changelog-all',
        () => queryCollection('changelog').order('date', 'DESC').all()
    )

    const totalPages = computed(() => Math.max(1, Math.ceil((allEntries.value || []).length / CHANGELOG_PAGE_SIZE)))

    const entries = computed(() => {
        const start = (pageNumber - 1) * CHANGELOG_PAGE_SIZE
        return (allEntries.value || []).slice(start, start + CHANGELOG_PAGE_SIZE)
    })

    return { entries, totalPages }
}
