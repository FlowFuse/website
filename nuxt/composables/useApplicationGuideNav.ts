import { findPageBreadcrumb } from '@nuxt/content/utils'
import type { NavigationMenuItem } from '@nuxt/ui'
import { buildNavigationMenuItems, type MenuTreeNode } from '~/utils/navigationMenu'

// Shared by the section landing page, the guide pages and the left nav so all three
// agree on order and on the /application-guide/{guide}/{slug}/ route shape.
export interface ApplicationGuidePageSummary {
    guide: string
    slug: string
    title: string
    navOrder: number
    parent?: string
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

// Sidebar/order is driven by the markdown pages' frontmatter (guide, slug, navOrder,
// navTitle) — the same way the docs sidebar is driven by its markdown frontmatter.
// The legacy YAML `applicationGuide` collection has been retired.
export const useApplicationGuidePages = () => useAsyncData('application-guide-nav', async () => {
    const pages = await queryCollection('applicationGuideDoc').all()

    return pages
        .map((page: Record<string, unknown>): ApplicationGuidePageSummary => ({
            guide: page.guide as string,
            slug: page.slug as string,
            title: (page.navTitle as string) || (page.title as string),
            navOrder: (page.navOrder as number) ?? Infinity,
            parent: page.parent as string | undefined,
            blurb: page.blurb as string | undefined,
            path: `/application-guide/${page.guide}/${page.slug}/`,
        }))
        .sort((a, b) => a.navOrder - b.navOrder)
}, {
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
})

export const pagesForGuide = (pages: ApplicationGuidePageSummary[] | null, guide: string) =>
    (pages ?? []).filter(page => page.guide === guide)

// One tree per guide, nested via the `parent` frontmatter field — shared by
// applicationGuideNavItems (rendered through the same NavigationMenuItem builder as
// Handbook/Docs) and findGuideBreadcrumb below.
function toGuideNode(inGuide: ApplicationGuidePageSummary[]) {
    const build = (page: ApplicationGuidePageSummary): MenuTreeNode => ({
        title: page.title,
        path: page.path.replace(/\/$/, ''),
        children: inGuide.filter(p => p.parent === page.slug).map(build),
    })
    return build
}

export const applicationGuideNavGroups = (pages: ApplicationGuidePageSummary[] | null): MenuTreeNode[] =>
    GUIDES.map((guide) => {
        const inGuide = pagesForGuide(pages, guide.id)
        return {
            title: guide.title,
            path: `/application-guide/${guide.id}`,
            children: inGuide.filter(p => !p.parent).map(toGuideNode(inGuide)),
        }
    })

// Left-nav items for the Application Guide — same NavigationMenuItem tree + SidebarNav
// as Handbook and Docs, built inline in each page rather than through a dedicated
// left-nav component, since there's no page-specific markup left to wrap.
export const applicationGuideNavItems = (pages: ApplicationGuidePageSummary[] | null, currentPath: string): NavigationMenuItem[] => [
    { label: 'Application Guide', to: '/application-guide' },
    ...applicationGuideNavGroups(pages).flatMap(group => [
        { type: 'label', label: group.title } satisfies NavigationMenuItem,
        ...buildNavigationMenuItems(group.children ?? [], currentPath),
    ]),
]

// Mirrors findDocsBreadcrumb/findPageBreadcrumb (handbook, docs) so all three sections
// derive breadcrumbs the same way. The per-guide group node ("FlowFuse Guide") isn't a
// real page — `page: false` marks it unlinked, the same convention @nuxt/content's own
// nav tree uses for directory-only nodes.
export function findGuideBreadcrumb(pages: ApplicationGuidePageSummary[] | null, path: string) {
    const root = {
        title: 'Application Guide',
        path: '/application-guide',
        children: applicationGuideNavGroups(pages).map(group => ({ ...group, page: false as const })),
    }
    const crumbs = findPageBreadcrumb([root], path, { current: true })
    return crumbs.map((crumb, i) => ({
        label: crumb.title ?? '',
        ...(i === crumbs.length - 1 || crumb.page === false ? {} : { to: crumb.path }),
    }))
}
