import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { useResolveHref } from '../composables/useResolveHref'
import { CTA_DESTINATIONS } from '../lib/cta-destinations'

// [text](site:appURL) resolves against site.json, [text](cta:signUp) against CTA_DESTINATIONS.
export default function remarkSiteLinks() {
    const resolveHref = useResolveHref()

    return (tree: Root, file: VFile) => {
        visit(tree, 'link', (node) => {
            let href: unknown = node.url
            if (node.url.startsWith('site:')) href = resolveHref(node.url)
            else if (node.url.startsWith('cta:')) href = CTA_DESTINATIONS[node.url.slice('cta:'.length) as keyof typeof CTA_DESTINATIONS]?.href
            else return

            if (typeof href !== 'string') {
                throw new Error(`[remark-site-links] "${node.url}" in ${file.path || file.history?.[0]} doesn't resolve to a URL`)
            }
            node.url = href
        })
    }
}
