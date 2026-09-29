import { defineNuxtModule, extendRouteRules, useLogger } from '@nuxt/kit'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

// Lives in nuxt/lib/, not alongside this file: Nuxt auto-registers everything in
// nuxt/modules/ as a Nuxt module, so a plain helper there fails the build.
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { syncDocs } from '../lib/docs-sync.mjs'
// @ts-ignore same
import { syncGuides } from '../lib/guides-sync.mjs'
// @ts-ignore same
import { docsRedirectRules, prerenderableRoutes } from '../lib/docs-redirects.mjs'

const logger = useLogger('docs-source')

function collectPages(dir: string, basePath: string): Array<{ route: string, file: string }> {
    const pages: Array<{ route: string, file: string }> = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        const path = join(dir, entry.name)
        if (entry.isDirectory()) {
            pages.push(...collectPages(path, `${basePath}/${entry.name}`))
        } else if (entry.name.endsWith('.md')) {
            const slug = basename(entry.name, '.md')
            pages.push({ route: slug === 'index' ? `${basePath}/` : `${basePath}/${slug}/`, file: path })
        }
    }
    return pages
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
        const docsPages = collectPages(contentDocsDir, '/docs')
        // A floor rather than a log line, following the same call in nuxt.config.ts for the
        // integrations. Collecting nothing means the tree above did not land, and on the
        // netlify preset unprerendered routes still SSR, so the only symptom would be a
        // thinner static site and slow cold pages - nothing that looks like a failure.
        // Checked on what was collected, not on what survives the redirect filter below:
        // that filter is meant to drop routes, so a floor on its output would be a floor
        // on how many redirects the docs happen to declare.
        if (docsPages.length === 0) {
            throw new Error(
                '[docs-source] collected 0 docs pages to prerender - refusing to build /docs with no pages'
            )
        }

        // A page whose frontmatter is only `layout: redirect` + `redirect.to` (e.g.
        // docs/install/index.md) becomes a real 301 instead of a rendered page. Reading the
        // frontmatter here rather than through queryCollection because route rules have to
        // exist before the content database does.
        const redirectRules = docsRedirectRules(
            docsPages.map(({ route, file }) => ({ route, source: readFileSync(file, 'utf8') }))
        )
        for (const [route, rule] of Object.entries(redirectRules)) {
            extendRouteRules(route, rule)
        }

        // A redirected route must also stay out of the prerender list, or the stub written
        // for it answers the URL with a 200 before the rule is consulted. Filtering against
        // routeRules after extending them covers the redirects declared here and the
        // hand-written docs entries in nuxt/redirects.ts in one pass.
        const prerenderRoutes = prerenderableRoutes(
            docsPages.map(({ route }) => route),
            nuxt.options.routeRules
        )

        nuxt.options.nitro.prerender ??= {}
        const existing = (nuxt.options.nitro.prerender.routes as string[] | undefined) ?? []
        nuxt.options.nitro.prerender.routes = [...existing, ...prerenderRoutes]
        logger.info(`Added ${prerenderRoutes.length} docs routes for prerendering, and ${Object.keys(redirectRules).length} docs redirects as route rules`)
    },
})
