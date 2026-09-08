import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { existsSync, readdirSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

// Lives in nuxt/lib/, not alongside this file: Nuxt auto-registers everything in
// nuxt/modules/ as a Nuxt module, so a plain helper there fails the build.
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { syncDocs } from '../lib/docs-sync.mjs'
// @ts-ignore same
import { syncGuides } from '../lib/guides-sync.mjs'
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

        // Order matters: syncDocs wipes content/docs before writing, so the guides overlaid
        // from this repo have to land after it, not before.
        await syncDocs({ repoRoot, nuxtRoot, logger })
        syncGuides({ repoRoot, nuxtRoot, logger })

        if (!existsSync(contentDocsDir)) return

        // Collected after the overlay, so the guide pages get prerendered with the rest
        // of /docs and need no route list of their own in nuxt.config.
        const docsRoutes = collectRoutes(contentDocsDir, '/docs')
        // A floor rather than a log line, following the same call in nuxt.config.ts for the
        // integrations. Collecting nothing means the tree above did not land, and on the
        // netlify preset unprerendered routes still SSR, so the only symptom would be a
        // thinner static site and slow cold pages - nothing that looks like a failure.
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
