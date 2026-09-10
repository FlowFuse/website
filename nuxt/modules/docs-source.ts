import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { existsSync, readdirSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

// Lives in nuxt/lib/, not alongside this file: Nuxt auto-registers everything in
// nuxt/modules/ as a Nuxt module, so a plain helper there fails the build.
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { syncDocs } from '../lib/docs-sync.mjs'
// @ts-ignore same
import { GUIDES_SOURCE, syncGuideAssets } from '../lib/guides-sync.mjs'
// @ts-ignore same

const logger = useLogger('docs-source')

function collectRoutes(dir: string, basePath: string): string[] {
    const routes: string[] = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        if (entry.isDirectory()) {
            routes.push(...collectRoutes(join(dir, entry.name), `${basePath}/${entry.name}`))
        } else if (entry.name.endsWith('.md')) {
            const slug = basename(entry.name, '.md')
            routes.push(slug === 'index' ? `${basePath}/` : `${basePath}/${slug}/`)
        }
    }
    return routes
}

export default defineNuxtModule({
    meta: { name: 'docs-source' },
    async setup(_options, nuxt) {
        const nuxtRoot = nuxt.options.rootDir
        const contentDocsDir = join(nuxtRoot, 'content', 'docs')

        const repoRoot = dirname(nuxtRoot)
        const guidesDir = join(repoRoot, GUIDES_SOURCE)

        await syncDocs({ repoRoot, nuxtRoot, logger })
        // The guide pages themselves are a second source of the `docs` collection (see
        // content.config.ts) and are never copied into content/docs - this only copies
        // their non-markdown assets and fails the build on a path collision with a page
        // from FlowFuse/flowfuse. Order no longer matters against syncDocs because of
        // that: nothing here writes into contentDocsDir any more.
        syncGuideAssets({ repoRoot, nuxtRoot, logger })

        // Collected from both of the `docs` collection's sources, so every page gets
        // prerendered with the rest of /docs and neither source needs a route list of its
        // own in nuxt.config. contentDocsDir covers FlowFuse/flowfuse's docs, materialized
        // by syncDocs; guidesDir covers this repo's guides, read directly.
        const docsRoutes = [
            ...(existsSync(contentDocsDir) ? collectRoutes(contentDocsDir, '/docs') : []),
            ...(existsSync(guidesDir) ? collectRoutes(guidesDir, '/docs') : []),
        ]
        // A floor rather than a log line, following the same call in nuxt.config.ts for the
        // integrations. Both arms above swallow a missing tree, so collecting nothing means
        // a source did not land; on the netlify preset unprerendered routes still SSR, so
        // the only symptom would be a thinner static site and slow cold pages.
        if (docsRoutes.length === 0) {
            throw new Error(
                '[docs-source] collected 0 docs routes to prerender - refusing to build /docs with no pages'
            )
        }
        nuxt.options.nitro.prerender ??= {}
        const existing = (nuxt.options.nitro.prerender.routes as string[] | undefined) ?? []
        nuxt.options.nitro.prerender.routes = [...existing, ...docsRoutes]
        logger.info(`Added ${docsRoutes.length} docs routes for prerendering`)
    },
})
