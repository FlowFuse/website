import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'

function posixDirname(path: string): string {
    const i = path.lastIndexOf('/')
    return i <= 0 ? '/' : path.slice(0, i)
}

function posixResolve(base: string, rel: string): string {
    const parts = (base + rel).split('/')
    const out: string[] = []
    for (const p of parts) {
        if (p === '..') out.pop()
        else if (p !== '.') out.push(p)
    }
    return '/' + out.filter(Boolean).join('/')
}

// Converts relative image/link URLs in handbook markdown to absolute paths.
// This is needed because @nuxt/content serves pages with trailing-slash URLs,
// which would mis-resolve relative paths without this fix.
export default function remarkHandbookLinks() {
    return (tree: Root, file: VFile) => {
        const filePath: string = (file.path || file.history?.[0] || '') as string
        if (!filePath.includes('/handbook/')) return

        // Extract the handbook-relative portion: e.g. /handbook/engineering/frontend/layouts.md
        const handbookIdx = filePath.lastIndexOf('/handbook/')
        const relPath = filePath.slice(handbookIdx)
        const baseDir = posixDirname(relPath) + '/'

        function resolveUrl(url: string): string {
            if (!url) return url
            // Leave absolute, protocol, hash and mailto URLs unchanged
            if (/^(https?:|#|mailto:|\/|data:)/.test(url)) return url
            // Strip .md extension (+ optional anchor): ./foo.md#bar → ./foo#bar
            url = url.replace(/\.md(#.*)?$/, (_, anchor) => anchor ?? '')
            // Strip README: README#bar → #bar (or empty → current page)
            url = url.replace(/README(#.*)?$/, (_, anchor) => anchor ?? '.')
            // Resolve relative URL against the base directory
            const anchor = url.match(/#.*/)?.[0] ?? ''
            const pathPart = url.replace(/#.*$/, '')
            const resolved = posixResolve(baseDir, pathPart)
            return resolved + anchor
        }

        visit(tree, 'image', (node: any) => {
            node.url = resolveUrl(node.url)
        })

        visit(tree, 'link', (node: any) => {
            node.url = resolveUrl(node.url)
        })

        // Resolve src in raw HTML <img> tags
        visit(tree, 'html', (node: any) => {
            node.value = node.value.replace(
                /(<img\b[^>]*?\s)src="([^"]*?)"/gi,
                (_: string, prefix: string, url: string) => `${prefix}src="${resolveUrl(url)}"`
            )
        })
    }
}
