import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { existsSync, readdirSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

// Lives in nuxt/lib/, not alongside this file: Nuxt auto-registers everything in
// nuxt/modules/ as a Nuxt module, so a plain helper there fails the build.
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { syncDocs } from '../lib/docs-sync.mjs'

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

        await syncDocs({ repoRoot: dirname(nuxtRoot), nuxtRoot, logger })

        if (!existsSync(contentDocsDir)) return

        const docsRoutes = collectRoutes(contentDocsDir, '/docs')
        nuxt.options.nitro.prerender ??= {}
        const existing = (nuxt.options.nitro.prerender.routes as string[] | undefined) ?? []
        nuxt.options.nitro.prerender.routes = [...existing, ...docsRoutes]
        logger.info(`Added ${docsRoutes.length} docs routes for prerendering`)
    },
})
