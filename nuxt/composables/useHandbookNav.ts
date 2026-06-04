export interface NavNode {
    name: string
    path: string
    group?: string
    order: number
    children: NavNode[]
}

export interface NavGroup {
    name: string
    order: number
    children: NavNode[]
}

interface RawPage {
    path: string
    title?: string | null
    navigation?: { group?: string | null; order?: number | null } | null
}

interface TreeNode {
    name: string
    path: string
    group?: string
    order: number
    children: Record<string, TreeNode>
}

export function buildHandbookNav(pages: RawPage[]): NavGroup[] {
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

            if (!current[part]) {
                current[part] = {
                    name: (isLeaf && page.title) ? page.title : part,
                    path: '/' + parts.slice(0, i + 1).join('/'),
                    group: isLeaf ? (page.navigation?.group ?? undefined) : undefined,
                    order: isLeaf ? (page.navigation?.order ?? Infinity) : Infinity,
                    children: {}
                }
            }
            current = current[part].children
        }
    }

    function toNavNodes(obj: Record<string, TreeNode>): NavNode[] {
        return Object.values(obj).map((node) => ({
            name: node.name,
            path: node.path,
            group: node.group,
            order: node.order,
            children: toNavNodes(node.children)
        }))
    }

    function sortNodes(nodes: NavNode[]): NavNode[] {
        return nodes
            .sort((a, b) => (a.order - b.order) || a.name.localeCompare(b.name))
            .map(n => ({ ...n, children: sortNodes(n.children) }))
    }

    const root = toNavNodes(tree)
    const handbookRoot = root.find(n => n.path === '/handbook')
    if (!handbookRoot) return []

    const groups: Record<string, NavGroup> = {}

    for (const section of sortNodes(handbookRoot.children)) {
        const groupName = section.group || 'Other'
        if (!groups[groupName]) {
            groups[groupName] = { name: groupName, order: Object.keys(groups).length, children: [] }
        }
        groups[groupName].children.push(section)
    }

    return Object.values(groups).filter(g => g.children.length > 0)
}
