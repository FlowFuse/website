// Derives the SEO surface of a docs page from its frontmatter: the title, the brand
// qualifier the global title template appends to it, the description, the canonical url,
// the og-image props and the article's dateModified. Kept free of Nuxt and Vue imports so
// it can be unit tested with `node --test`; the page component only wires the result into
// useHead/useSeoMeta/useSchemaOrg/defineOgImage.

import { toIso } from './relative-time.mjs'

const SITE_URL = 'https://flowfuse.com'

/**
 * Docs frontmatter is written by docs-sync from the FlowFuse/flowfuse repo, so the shape
 * is narrower than a hand-authored page: `navTitle` is always present, `title` comes from
 * the H1 that @nuxt/content parses, a description exists only under `meta`, and `updated`
 * carries a git commit date that is often the empty string.
 *
 * @param {{ navTitle?: string, title?: string, meta?: { description?: string }, updated?: string } | null} page
 * @param {string} path the route path, used as-is for the canonical url
 * @param {string[]} slugParts the `[...slug]` segments; empty on the docs root
 */
export function docsSeo (page, path, slugParts = []) {
    // Bare, with no brand: the global title template appends "• {siteName}" to it.
    const heading = page?.navTitle || page?.title || slugParts.at(-1) || 'Documentation'

    return {
        heading,
        // Nested pages qualify the brand with "Docs"; the section root does not, because
        // its own title already reads Documentation.
        siteName: slugParts.length ? 'FlowFuse Docs' : 'FlowFuse',
        // Undefined, not '': useSeoMeta drops the tag instead of emitting an empty one.
        description: page?.meta?.description || undefined,
        canonicalUrl: `${SITE_URL}${path}`,
        // The heading alone, because the card template prints "FlowFuse / Docs" above it.
        ogImage: { title: heading, section: 'Docs' },
        dateModified: toIso(page?.updated) ?? undefined,
    }
}
