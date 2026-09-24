import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { useResolveHref } from '../composables/useResolveHref'
import { CTA_DESTINATIONS } from '../lib/cta-destinations'

// [text](site:appURL) resolves against site.json, [text](cta:signUp) against CTA_DESTINATIONS,
// with an optional query string: [text](cta:contactUs?subject=Certified%20Nodes).
export default function remarkSiteLinks() {
    const resolveHref = useResolveHref()

    return (tree: Root, file: VFile) => {
        visit(tree, 'link', (node) => {
            let href: unknown = node.url
            if (node.url.startsWith('site:')) href = resolveHref(node.url)
            else if (node.url.startsWith('cta:')) {
                const [key, search] = node.url.slice('cta:'.length).split(/\?(.*)/s)
                const destination = CTA_DESTINATIONS[key as keyof typeof CTA_DESTINATIONS]?.href
                href = destination && search ? `${destination}?${search}` : destination
            }
            else return

            if (typeof href !== 'string') {
                throw new Error(`[remark-site-links] "${node.url}" in ${file.path || file.history?.[0]} doesn't resolve to a URL`)
            }
            node.url = href
        })
    }
}
