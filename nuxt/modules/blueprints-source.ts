import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { dirname } from 'node:path'

// Lives in nuxt/lib/, not alongside this file: Nuxt auto-registers everything in
// nuxt/modules/ as a Nuxt module, so a plain helper there fails the build.
// @ts-ignore untyped module, kept as plain JS so `node --test` can run it directly
import { syncBlueprints } from '../lib/blueprints-sync.mjs'
import { BLUEPRINTS_PAGE_SIZE } from '../composables/useBlueprintList'

const logger = useLogger('blueprints-source')

export default defineNuxtModule({
    meta: { name: 'blueprints-source' },
    setup (_options, nuxt) {
        const nuxtRoot = nuxt.options.rootDir
        const repoRoot = dirname(nuxtRoot)

        const { entries } = syncBlueprints({ repoRoot, nuxtRoot, logger })

        // A production build with no blueprints means the library was neither checked out
        // beside this repo nor committed by the Build Site workflow. Publishing an empty
        // Blueprint Library looks like a content change rather than a broken build, and on
        // the netlify preset the pages would still SSR, so nothing else would flag it.
        if (entries.length === 0) {
            const message = '[blueprints-source] no blueprints resolved - check out FlowFuse/blueprint-library beside this repo or set FLOWFUSE_BLUEPRINTS_LOCAL'
            if (process.env.NODE_ENV === 'production') throw new Error(message)
            logger.warn(`${message} (continuing: /blueprints/ will be empty in dev)`)
        }

        const pageCount = Math.max(1, Math.ceil(entries.length / BLUEPRINTS_PAGE_SIZE))
        const routes = [
            '/blueprints/',
            ...Array.from({ length: pageCount - 1 }, (_, i) => `/blueprints/${i + 2}/`),
            '/blueprints/submit/',
            ...entries.map(({ category, slug }: { category: string, slug: string }) => `/blueprints/${category}/${slug}/`),
        ]

        nuxt.options.nitro.prerender ??= {}
        const existing = (nuxt.options.nitro.prerender.routes as string[] | undefined) ?? []
        nuxt.options.nitro.prerender.routes = [...existing, ...routes]
        logger.info(`Added ${routes.length} blueprint routes for prerendering`)
    },
})
