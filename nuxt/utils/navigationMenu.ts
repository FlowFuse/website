import type { NavigationMenuItem } from '@nuxt/ui'

// Shared by Handbook/Docs/Application Guide left navs: turns a generic {title, path,
// children} tree into the NavigationMenuItem[] shape UNavigationMenu (vertical,
// accordion-backed) expects, auto-expanding any branch that contains the current route.
export interface MenuTreeNode {
    title: string
    path: string
    icon?: string
    children?: MenuTreeNode[]
}

function isOrContains(nodePath: string, currentPath: string): boolean {
    const norm = (p: string) => (p.endsWith('/') ? p.slice(0, -1) : p) || '/'
    const active = norm(currentPath)
    const node = norm(nodePath)
    return active === node || active.startsWith(node + '/')
}

export function buildNavigationMenuItems(nodes: MenuTreeNode[], currentPath: string): NavigationMenuItem[] {
    return nodes.map((node) => {
        const children = node.children?.length ? buildNavigationMenuItems(node.children, currentPath) : undefined
        return {
            label: node.title,
            to: node.path,
            icon: node.icon,
            defaultOpen: children ? isOrContains(node.path, currentPath) : undefined,
            children,
        }
    })
}
