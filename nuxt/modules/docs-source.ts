import { defineNuxtModule, extendRouteRules, useLogger } from '@nuxt/kit'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

// Lives in nuxt/lib/, not alongside this file: Nuxt auto-registers everything in
// nuxt/modules/ as a Nuxt module, so a plain helper there fails the build.
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { syncDocs } from '../lib/docs-sync.mjs'
// @ts-ignore untyped module, same reason
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

        await syncDocs({ repoRoot: dirname(nuxtRoot), nuxtRoot, logger })

        if (!existsSync(contentDocsDir)) return

        const docsPages = collectPages(contentDocsDir, '/docs')

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
