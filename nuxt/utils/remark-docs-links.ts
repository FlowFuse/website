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

// Normalises a link fragment to the heading id @nuxt/content generates
// (github-slugger style: lowercase, drop chars outside [a-z0-9-], collapse and
// trim dashes). The upstream docs authored anchors with a different slugifier
// (keeping ? & . ( ) and repeated dashes), so raw fragments miss their target.
function slugifyAnchor(anchor: string): string {
    if (!anchor) return ''
    let raw = anchor.replace(/^#/, '')
    // Fragments may arrive percent-encoded (e.g. %3F for ?, %26 for &); decode
    // first so those characters are dropped rather than leaving hex residue.
    try { raw = decodeURIComponent(raw) } catch { /* keep raw on malformed input */ }
    const slug = raw.toLowerCase()
        .replace(/[^a-z0-9-]+/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    return slug ? '#' + slug : ''
}

// Normalises image/link URLs in docs markdown so they resolve in the static
// @nuxt/content output. Relative links are resolved against the current file to
// absolute /docs/... paths. Absolute links carried over from the upstream docs
// (which link internally as /docs/foo/bar.md and .../README.md) get their .md
// extension and README index stripped, since the static site serves those pages
// at extensionless, trailing-slash URLs.
export default function remarkDocsLinks() {
    return (tree: Root, file: VFile) => {
        const filePath: string = (file.path || file.history?.[0] || '') as string
        if (!filePath.includes('/docs/')) return

        const docsIdx = filePath.lastIndexOf('/docs/')
        const relPath = filePath.slice(docsIdx)
        const baseDir = posixDirname(relPath) + '/'

        function resolveUrl(url: string): string {
            if (!url) return url
            // Leave external links, mailto and data URIs untouched.
            if (/^(https?:|mailto:|data:)/.test(url)) return url

            // In-page anchors: normalise to the generated heading id.
            if (url.startsWith('#')) return slugifyAnchor(url)

            // Absolute site paths: the upstream docs link internally with .md
            // extensions (e.g. /docs/hardware/raspbian.md, /docs/user/team/README.md).
            // Strip .md and the README index without relative resolution.
            if (url.startsWith('/')) {
                const anchor = slugifyAnchor(url.match(/#.*/)?.[0] ?? '')
                let pathPart = url.replace(/#.*$/, '')
                pathPart = pathPart.replace(/\.md$/, '')
                pathPart = pathPart.replace(/\/README$/, '/')
                return pathPart + anchor
            }

            // Relative links: strip .md extension (+ optional anchor)
            url = url.replace(/\.md(#.*)?$/, (_, anchor) => anchor ?? '')
            // Strip README reference — resolves to the directory index
            url = url.replace(/README(#.*)?$/, (_, anchor) => anchor ?? '.')
            const anchor = slugifyAnchor(url.match(/#.*/)?.[0] ?? '')
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

        // Resolve src/href in raw HTML <img> and <a> tags
        visit(tree, 'html', (node: any) => {
            node.value = node.value.replace(
                /(<(?:img|a)\b[^>]*?\s)(src|href)="([^"]*?)"/gi,
                (_: string, prefix: string, attr: string, url: string) => `${prefix}${attr}="${resolveUrl(url)}"`,
            )
        })
    }
}
