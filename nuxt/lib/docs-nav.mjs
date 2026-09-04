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

const stripSlash = path => (path.endsWith('/') ? path.slice(0, -1) : path) || '/'

/**
 * Give each node the frontmatter of the redirect stub sitting at its path, if there is one.
 *
 * `link: false` marks it as a label rather than a destination: nuxt/utils/navigationMenu.ts
 * omits `to` for those, so the branch is still titled, grouped and expandable without the
 * sidebar ever pointing at a URL that 301s. The node keeps its own path, which is what the
 * menu's auto-expand and the breadcrumb trail match on.
 *
 * @param {Array<{path: string, title: string, group?: string, groupOrder?: number, order: number, children: Array}>} nodes
 * @param {Map<string, {navTitle?: string|null, title?: string|null, navGroup?: string|null, navGroupOrder?: number|null, navOrder?: number|null}>} stubs
 */
function applyStubFrontmatter (nodes, stubs) {
    for (const node of nodes) {
        const stub = stubs.get(stripSlash(node.path))
        if (stub) {
            node.title = stub.navTitle || stub.title || node.title
            if (stub.navGroup != null) node.group = stub.navGroup
            if (stub.navGroupOrder != null) node.groupOrder = stub.navGroupOrder
            if (stub.navOrder != null) node.order = stub.navOrder
            node.link = false
        }
        applyStubFrontmatter(node.children, stubs)
    }
}

/**
 * @param {Array<{path: string, title?: string|null, navTitle?: string|null, navOrder?: number|null, navGroup?: string|null, navGroupOrder?: number|null, redirect?: {to: string}|null}>} pages
 */
export function buildDocsNav (pages) {
    const tree = {}

    // A page whose only purpose is `redirect: { to }` (e.g. FlowFuse/flowfuse's
    // docs/admin/licensing.md and docs/community-support.md) has no content of its own to
    // link to from the sidebar. Rendering it as a nav entry means every single docs page
    // gets flagged by nuxt-link-checker's `redirects` inspection, so it never becomes a
    // link target.
    //
    // Its frontmatter still matters though. Most section index pages in FlowFuse/flowfuse
    // are redirect stubs (docs/user, docs/install, docs/admin, docs/cloud, docs/device-agent,
    // docs/hardware, docs/migration, docs/contribute), and each one carries the navGroup,
    // navGroupOrder, navTitle and navOrder that its whole section is grouped, labelled and
    // ranked by. Discarding the page discarded that too, so those sections were built only
    // from the paths of their children: no group (they fell into "Other"), and titled by raw
    // path segment ("user", "admin"). Three groups had every member stubbed and vanished
    // entirely. So the metadata is kept here and applied to the node the children create,
    // and only the link is withheld.
    const linkable = []
    const stubs = new Map()
    for (const page of pages) {
        if (page.redirect) stubs.set(stripSlash(page.path), page)
        else linkable.push(page)
    }

    const sorted = [...linkable].sort((a, b) => {
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
                    children: {},
                }
            } else if (isLeaf) {
                // Update title/group/order when we reach the leaf for this node
                current[part].title = displayTitle
                current[part].group = page.navGroup ?? undefined
                current[part].groupOrder = page.navGroupOrder ?? undefined
                current[part].order = page.navOrder ?? Infinity
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
            children: toDocsNavNodes(node.children),
        }))
    }

    function sortNodes (nodes) {
        return nodes
            .sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title))
            .map(n => ({ ...n, children: sortNodes(n.children) }))
    }

    const root = toDocsNavNodes(tree)
    // Before grouping and sorting, which both read these fields.
    applyStubFrontmatter(root, stubs)

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
