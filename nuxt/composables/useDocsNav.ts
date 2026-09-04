// The builder lives in nuxt/lib/ as plain JS so `node --test` can run it directly
// (same reason as docs-sync.mjs); this file is the typed surface components import.
// @ts-ignore untyped module
import { buildDocsNav as build, findDocsBreadcrumb as findBreadcrumb } from '../lib/docs-nav.mjs'

export interface DocsNavNode {
    // Matches @nuxt/content's ContentNavigationItem shape (title/path/children)
    title: string
    path: string
    group?: string
    groupOrder?: number
    order: number
    // false when this section's index page is a redirect stub - see nuxt/lib/docs-nav.mjs.
    link?: boolean
    children: DocsNavNode[]
}

export interface DocsNavGroup {
    name: string
    order: number
    children: DocsNavNode[]
}

export interface DocsNavPage {
    path: string
    title?: string | null
    navTitle?: string | null
    navOrder?: number | null
    navGroup?: string | null
    navGroupOrder?: number | null
    redirect?: { to: string } | null
}

/**
 * Sidebar tree for the docs section.
 *
 * Group headings are ranked by the `navGroupOrder` frontmatter of the sections they
 * hold, so reordering, renaming or adding a group is a change in FlowFuse/flowfuse's
 * docs/ tree and needs nothing here.
 */
export function buildDocsNav (pages: DocsNavPage[]): DocsNavGroup[] {
    return build(pages)
}

export function findDocsBreadcrumb (groups: DocsNavGroup[], path: string): DocsNavNode[] {
    return findBreadcrumb(groups, path)
}

export const useDocsNavTree = () =>
    useAsyncData('docs-nav', async () => buildDocsNav(await queryCollection('docs').all() as DocsNavPage[]))
