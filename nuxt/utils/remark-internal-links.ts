import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import { internalHref } from '../lib/internal-href.mjs'

export default function remarkInternalLinks() {
    return (tree: Root) => {
        visit(tree, ['link', 'definition'], (node) => {
            const n = node as { url: string }
            n.url = internalHref(n.url)
        })
    }
}
