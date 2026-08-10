// Builds the docs sidebar tree from the pages of the `docs` content collection.
//
// Lives in nuxt/lib/ as plain JS, like docs-sync.mjs, so `node --test` can run it
// directly. nuxt/composables/useDocsNav.ts re-exports it with types for components.
//
// Every input is frontmatter from FlowFuse/flowfuse's docs/ tree: `navGroup` names the
// sidebar heading a section sits under, `navGroupOrder` ranks those headings and
// `navOrder` ranks pages within one. Nothing about the structure is declared here, so
// restructuring the docs is a change in the docs repo alone.

/**
 * @param {Array<{path: string, title?: string|null, navTitle?: string|null, navOrder?: number|null, navGroup?: string|null, navGroupOrder?: number|null, redirect?: {to: string}|null}>} pages
 */
export function buildDocsNav (pages) {
    const tree = {}

    // A page whose only purpose is `redirect: { to }` (e.g. FlowFuse/flowfuse's
    // docs/admin/licensing.md and docs/community-support.md) has no content of its own to
    // link to from the sidebar. Rendering it as a nav entry means every single docs page
    // gets flagged by nuxt-link-checker's `redirects` inspection, so it's left out.
    const linkable = pages.filter(page => !page.redirect)

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
            const displayName = isLeaf ? (page.navTitle || page.title || part) : part

            if (!current[part]) {
                current[part] = {
                    name: displayName,
                    path: '/' + parts.slice(0, i + 1).join('/'),
                    group: isLeaf ? (page.navGroup ?? undefined) : undefined,
                    groupOrder: isLeaf ? (page.navGroupOrder ?? undefined) : undefined,
                    order: isLeaf ? (page.navOrder ?? Infinity) : Infinity,
                    children: {},
                }
            } else if (isLeaf) {
                // Update name/group/order when we reach the leaf for this node
                current[part].name = displayName
                current[part].group = page.navGroup ?? undefined
                current[part].groupOrder = page.navGroupOrder ?? undefined
                current[part].order = page.navOrder ?? Infinity
            }

            current = current[part].children
        }
    }

    function toDocsNavNodes (obj) {
        return Object.values(obj).map(node => ({
            name: node.name,
            path: node.path,
            group: node.group,
            groupOrder: node.groupOrder,
            order: node.order,
            children: toDocsNavNodes(node.children),
        }))
    }

    function sortNodes (nodes) {
        return nodes
            .sort((a, b) => (a.order - b.order) || a.name.localeCompare(b.name))
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
