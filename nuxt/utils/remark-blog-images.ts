import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'

// Rewrites blog posts' relative image references (./images/foo.png) into absolute
// paths (/blog/YYYY/MM/images/foo.png). @nuxt/content has no relative-asset pipeline,
// and 11ty's own passthrough copy (src/**/images/**/*) already lands these files at
// that exact absolute location under nuxt/public/blog/... — so no images are moved.
export default function remarkBlogImages() {
    return (tree: Root, file: VFile) => {
        const filePath: string = (file.path || file.history?.[0] || '') as string
        const match = filePath.match(/\/blog\/(\d{4})\/(\d{2})\//)
        if (!match) return

        const [, year, month] = match

        function resolveUrl(url: string): string {
            if (!url || /^(https?:|#|mailto:|\/|data:)/.test(url)) return url
            const cleaned = url.replace(/^\.\//, '')
            if (!cleaned.startsWith('images/')) return url
            return `/blog/${year}/${month}/${cleaned}`
        }

        visit(tree, 'image', (node: any) => {
            node.url = resolveUrl(node.url)
        })

        visit(tree, 'html', (node: any) => {
            node.value = node.value.replace(
                /(<img\b[^>]*?\s)src="([^"]*?)"/gi,
                (_: string, prefix: string, url: string) => `${prefix}src="${resolveUrl(url)}"`
            )
        })
    }
}
