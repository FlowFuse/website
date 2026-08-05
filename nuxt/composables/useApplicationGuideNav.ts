// Shared by the section landing page, the guide pages and the left nav so all three
// agree on order and on the /application-guide/{guide}/{slug}/ route shape.
export interface ApplicationGuidePageSummary {
    guide: string
    slug: string
    title: string
    navOrder: number
    blurb?: string
    path: string
}

export const GUIDES = [
    {
        id: 'flowfuse',
        title: 'FlowFuse Guide',
        tagline: 'Turn an app idea into FlowFuse pieces you can name and say in one sentence.',
    },
    {
        id: 'node-red',
        title: 'Node-RED Guide',
        tagline: 'Turn an architecture sentence into a clean flow shape you can read at a glance.',
    },
] as const

export const guideById = (id: string) => GUIDES.find(guide => guide.id === id)

export const useApplicationGuidePages = () => useAsyncData('application-guide-nav', async () => {
    const pages = await queryCollection('applicationGuide').all()

    return pages
        .map((page: Record<string, unknown>): ApplicationGuidePageSummary => ({
            guide: page.guide as string,
            slug: page.slug as string,
            title: page.title as string,
            navOrder: (page.navOrder as number) ?? Infinity,
            blurb: page.blurb as string | undefined,
            path: `/application-guide/${page.guide}/${page.slug}/`,
        }))
        .sort((a, b) => a.navOrder - b.navOrder)
}, {
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
})

export const pagesForGuide = (pages: ApplicationGuidePageSummary[] | null, guide: string) =>
    (pages ?? []).filter(page => page.guide === guide)
