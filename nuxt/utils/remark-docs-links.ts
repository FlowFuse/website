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

// Converts relative image/link URLs in docs markdown to absolute /docs/... paths.
// Needed because @nuxt/content serves pages with trailing-slash URLs which
// would mis-resolve relative paths without this fix.
export default function remarkDocsLinks() {
    return (tree: Root, file: VFile) => {
        const filePath: string = (file.path || file.history?.[0] || '') as string
        if (!filePath.includes('/docs/')) return

        const docsIdx = filePath.lastIndexOf('/docs/')
        const relPath = filePath.slice(docsIdx)
        const baseDir = posixDirname(relPath) + '/'

        function resolveUrl(url: string): string {
            if (!url) return url
            if (/^(https?:|#|mailto:|\/|data:)/.test(url)) return url
            // Strip .md extension (+ optional anchor)
            url = url.replace(/\.md(#.*)?$/, (_, anchor) => anchor ?? '')
            // Strip README reference — resolves to the directory index
            url = url.replace(/README(#.*)?$/, (_, anchor) => anchor ?? '.')
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
                (_: string, prefix: string, url: string) => `${prefix}src="${resolveUrl(url)}"`,
            )
        })
    }
}
