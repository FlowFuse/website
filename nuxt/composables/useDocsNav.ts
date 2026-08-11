// The builder lives in nuxt/lib/ as plain JS so `node --test` can run it directly
// (same reason as docs-sync.mjs); this file is the typed surface components import.
// @ts-ignore untyped module
import { buildDocsNav as build } from '../lib/docs-nav.mjs'

export interface DocsNavNode {
    name: string
    path: string
    group?: string
    groupOrder?: number
    order: number
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
