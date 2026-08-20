// Builds the docs sidebar tree from the pages of the `docs` content collection.
//
// Lives in nuxt/lib/ as plain JS, like docs-sync.mjs, so `node --test` can run it
// directly. nuxt/composables/useDocsNav.ts re-exports it with types for components.
//
// Every input is frontmatter from FlowFuse/flowfuse's docs/ tree: `navGroup` names the
// sidebar heading a section sits under, `navGroupOrder` ranks those headings and
// `navOrder` ranks pages within one. Nothing about the structure is declared here, so
// restructuring the docs is a change in the docs repo alone.

import { findPageBreadcrumb } from '@nuxt/content/utils'

/**
 * @param {Array<{path: string, title?: string|null, navTitle?: string|null, navOrder?: number|null, navGroup?: string|null, navGroupOrder?: number|null, redirect?: {to: string}|null}>} pages
 */
export function buildDocsNav (pages) {
    const tree = {}

    // A page whose only purpose is `redirect: { to }` (e.g. FlowFuse/flowfuse's
    // docs/install/index.md and docs/community-support.md) has no content of its own, but it
    // is where its section's `navTitle`, `navGroup` and `navGroupOrder` are declared. It
    // used to be dropped here, which cost twelve sections their title and their group: the
    // sidebar labelled them with the directory slug and dumped them in Other.
    //
    // So it stays in the tree and contributes its frontmatter, and `isPage` marks it as
    // somewhere a reader cannot land. Nothing links to the redirecting URL itself, which is
    // what would otherwise flag every docs page in nuxt-link-checker's `redirects`
    // inspection: DocsLeftNav renders a section as an unlinked heading, and a childless
    // entry links to `redirectTo` instead.
    const sorted = [...pages].sort((a, b) => {
        const depthA = a.path.split('/').filter(Boolean).length
        const depthB = b.path.split('/').filter(Boolean).length
        return depthA - depthB
    })

    for (const page of sorted) {
        const parts = page.path.split('/').filter(Boolean)
        let current = tree

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i]
            const isLeaf = i === parts.length - 1
            const displayTitle = isLeaf ? (page.navTitle || page.title || part) : part

            if (!current[part]) {
                current[part] = {
                    title: displayTitle,
                    path: '/' + parts.slice(0, i + 1).join('/'),
                    group: isLeaf ? (page.navGroup ?? undefined) : undefined,
                    groupOrder: isLeaf ? (page.navGroupOrder ?? undefined) : undefined,
                    order: isLeaf ? (page.navOrder ?? Infinity) : Infinity,
                    // False while this is somewhere a reader cannot land: a position
                    // invented to hold children, e.g. /docs/user/teams when the only page
                    // is /docs/user/teams/billing, or a page that only redirects.
                    isPage: isLeaf && !page.redirect,
                    redirectTo: isLeaf ? (page.redirect?.to ?? undefined) : undefined,
                    children: {},
                }
            } else if (isLeaf) {
                // Update title/group/order when we reach the leaf for this node
                current[part].title = displayTitle
                current[part].group = page.navGroup ?? undefined
                current[part].groupOrder = page.navGroupOrder ?? undefined
                current[part].order = page.navOrder ?? Infinity
                current[part].isPage = !page.redirect
                current[part].redirectTo = page.redirect?.to ?? undefined
            }

            current = current[part].children
        }
    }

    function toDocsNavNodes (obj) {
        return Object.values(obj).map(node => ({
            title: node.title,
            path: node.path,
            group: node.group,
            groupOrder: node.groupOrder,
            order: node.order,
            isPage: node.isPage,
            redirectTo: node.redirectTo,
            children: toDocsNavNodes(node.children),
        }))
    }

    function sortNodes (nodes) {
        return nodes
            .sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title))
            .map(n => ({ ...n, children: sortNodes(n.children) }))
    }

    const root = toDocsNavNodes(tree)
    const docsRoot = root.find(n => n.path === '/docs')
    if (!docsRoot) return []

    const groups = {}

    for (const section of sortNodes(docsRoot.children)) {
        const groupName = section.group || 'Other'
        if (!groups[groupName]) {
            groups[groupName] = { name: groupName, order: Infinity, children: [] }
        }
        // Lowest wins: several sections share a heading and each declares the rank, so a
        // section that omits navGroupOrder (or disagrees) cannot drag the group out of
        // place. Groups nobody ranked keep Infinity and fall to the end, sorted by name.
        if (typeof section.groupOrder === 'number') {
            groups[groupName].order = Math.min(groups[groupName].order, section.groupOrder)
        }
        groups[groupName].children.push(section)
    }

    return Object.values(groups)
        .filter(g => g.children.length > 0)
        .sort((a, b) => (a.order - b.order) || a.name.localeCompare(b.name))
}

/**
 * Ancestor chain for a docs path, for breadcrumbs. Groups themselves aren't pages (no
 * `path` of their own), so this flattens straight to their sections before handing off
 * to @nuxt/content's own findPageBreadcrumb - same helper handbook uses.
 *
 * @param {ReturnType<typeof buildDocsNav>} groups
 * @param {string} path
 */
export function findDocsBreadcrumb (groups, path) {
    // findPageBreadcrumb excludes the current page by default - callers here want the
    // full chain (they decide themselves whether the last crumb should link anywhere).
    return findPageBreadcrumb(groups.flatMap(g => g.children), path, { current: true })
}

function withoutTrailingSlash (path) {
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
}

/**
 * Every docs page in sidebar reading order: groups in `navGroupOrder`, sections in
 * `navOrder`, each section followed by its own children.
 *
 * Positions the tree invented to hold children are skipped, so the sequence only contains
 * pages a reader can actually land on. Each entry carries its group name, because the
 * sequence runs straight through the manual and a reader crossing from the last page of one
 * group into the first of the next deserves to be told.
 *
 * @param {ReturnType<typeof buildDocsNav>} groups
 * @returns {Array<{path: string, title: string, group: string}>}
 */
export function flattenDocsNav (groups) {
    const pages = []

    function walk (nodes, group) {
        for (const node of nodes) {
            if (node.isPage) pages.push({ path: node.path, title: node.title, group })
            walk(node.children, group)
        }
    }

    for (const group of groups ?? []) walk(group.children, group.name)

    return pages
}

/**
 * The pages either side of `path` in that reading order, as `[previous, next]`, with null
 * where there is nothing to go to.
 *
 * A path that is not a page of its own, an invented node or an unknown URL, gets no
 * neighbours rather than the neighbours of the nearest position: offering a pair of links
 * on a page that does not render is worse than offering none.
 *
 * @param {ReturnType<typeof buildDocsNav>} groups
 * @param {string} path
 */
export function findDocsSurround (groups, path) {
    const pages = flattenDocsNav(groups)
    const current = pages.findIndex(page => page.path === withoutTrailingSlash(path ?? ''))

    if (current === -1) return [null, null]

    return [pages[current - 1] ?? null, pages[current + 1] ?? null]
}
