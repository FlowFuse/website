export interface DocsNavNode {
    name: string
    path: string
    group?: string
    order: number
    children: DocsNavNode[]
}

export interface DocsNavGroup {
    name: string
    order: number
    children: DocsNavNode[]
}

interface RawPage {
    path: string
    title?: string | null
    navTitle?: string | null
    navOrder?: number | null
    navGroup?: string | null
}

interface TreeNode {
    name: string
    path: string
    group?: string
    order: number
    children: Record<string, TreeNode>
}

const GROUP_ORDER = [
    'FlowFuse User Manuals',
    'Device Agent',
    'FlowFuse Cloud',
    'FlowFuse Self-Hosted',
    'Support',
    'Contributing',
]

export function buildDocsNav(pages: RawPage[]): DocsNavGroup[] {
    const tree: Record<string, TreeNode> = {}

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
            const displayName = isLeaf ? (page.navTitle || page.title || part) : part

            if (!current[part]) {
                current[part] = {
                    name: displayName,
                    path: '/' + parts.slice(0, i + 1).join('/'),
                    group: isLeaf ? (page.navGroup ?? undefined) : undefined,
                    order: isLeaf ? (page.navOrder ?? Infinity) : Infinity,
                    children: {},
                }
            } else if (isLeaf) {
                // Update name/group/order when we reach the leaf for this node
                current[part].name = displayName
                current[part].group = page.navGroup ?? undefined
                current[part].order = page.navOrder ?? Infinity
            }

            current = current[part].children
        }
    }

    function toDocsNavNodes(obj: Record<string, TreeNode>): DocsNavNode[] {
        return Object.values(obj).map(node => ({
            name: node.name,
            path: node.path,
            group: node.group,
            order: node.order,
            children: toDocsNavNodes(node.children),
        }))
    }

    function sortNodes(nodes: DocsNavNode[]): DocsNavNode[] {
        return nodes
            .sort((a, b) => (a.order - b.order) || a.name.localeCompare(b.name))
            .map(n => ({ ...n, children: sortNodes(n.children) }))
    }

    const root = toDocsNavNodes(tree)
    const docsRoot = root.find(n => n.path === '/docs')
    if (!docsRoot) return []

    const groups: Record<string, DocsNavGroup> = {}

    for (const section of sortNodes(docsRoot.children)) {
        const groupName = section.group || 'Other'
        if (!groups[groupName]) {
            const groupIdx = GROUP_ORDER.indexOf(groupName)
            groups[groupName] = {
                name: groupName,
                order: groupIdx >= 0 ? groupIdx : GROUP_ORDER.length,
                children: [],
            }
        }
        groups[groupName].children.push(section)
    }

    return Object.values(groups)
        .filter(g => g.children.length > 0)
        .sort((a, b) => a.order - b.order)
}
