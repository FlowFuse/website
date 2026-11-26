import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import { internalHref } from '../lib/internal-href.mjs'

// Rewrites full https://flowfuse.com/... links in markdown to site-relative paths, so the
// parser's rehype-external-links step stops marking them rel="nofollow". See
// nuxt/lib/internal-href.mjs for why.
export default function remarkInternalLinks() {
    return (tree: Root) => {
        visit(tree, ['link', 'definition'], (node) => {
            const n = node as { url: string }
            n.url = internalHref(n.url)
        })
    }
}
