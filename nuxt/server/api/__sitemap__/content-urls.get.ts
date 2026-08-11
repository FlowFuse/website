import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { queryCollection } from '@nuxt/content/server'
import { getGitLastmod } from '../../../lib/git-lastmod.mjs'

// docs/handbook/changelog/blog/ebooks/whitepapers deliberately carry no `sitemap` schema
// field in content.config.ts - @nuxtjs/sitemap's @nuxt/content integration re-splices
// each collection's onUrl/filter as raw source text into a generated file with no closure
// over this module's imports or helpers, which git-based lastmod needs. This route does
// the same job (loc/lastmod/images) as a normal Nitro handler instead.

const toAbsoluteUrl = (event: Parameters<typeof getSiteConfig>[0], path: string) =>
    (path.startsWith('http') ? path : `${getSiteConfig(event).url}${path}`)

// Runs at prerender time (during `nuxt generate`), inside the git checkout, so walking up
// from cwd to find `.git` is robust whether the build is invoked from the repo root or the
// `nuxt/` workspace - unlike at request time in the deployed function, where no .git exists.
function findRepoRoot (start: string): string {
    let dir = start
    for (let i = 0; i < 6; i++) {
        if (existsSync(join(dir, '.git'))) return dir
        const parent = dirname(dir)
        if (parent === dir) break
        dir = parent
    }
    return start
}

const REPO_ROOT = findRepoRoot(process.cwd())

type ContentEntry = Record<string, unknown> & { path?: string, stem: string }
type SitemapUrl = { loc: string, lastmod?: Date, images?: { loc: string }[] }

interface ContentSource {
    collection: string
    // Repo-relative directory the collection's files live in, for git-log lastmod.
    // Omit when a collection derives lastmod another way (e.g. docs' `updated` field).
    fileRoot?: string
    filter?: (entry: ContentEntry) => boolean
    lastmod?: (entry: ContentEntry) => string | undefined
    images?: (entry: ContentEntry) => string[]
    rewriteLoc?: (loc: string) => string
}

const stringField = (entry: ContentEntry, key: string) => {
    const value = entry[key]
    return typeof value === 'string' && value ? value : undefined
}

const CONTENT_SOURCES: ContentSource[] = [
    {
        collection: 'docs',
        // Already git-derived once, at docs-sync time, against the flowfuse/flowfuse repo
        // this content came from - not this repo's history.
        lastmod: entry => stringField(entry, 'updated'),
        // Redirect stub pages (section index pages that just 301 elsewhere) aren't a
        // real destination.
        filter: entry => entry.layout !== 'redirect',
    },
    { collection: 'handbook', fileRoot: 'nuxt/content' },
    { collection: 'changelog', fileRoot: 'src' },
    {
        collection: 'blog',
        fileRoot: 'src',
        images: entry => [stringField(entry, 'image')].filter((path): path is string => Boolean(path)),
    },
    {
        collection: 'ebooks',
        fileRoot: 'nuxt/content',
        images: entry => ['image', 'coverImage', 'thumbnail', 'secondaryImage', 'tertiaryImage']
            .map(key => stringField(entry, key))
            .filter((path): path is string => Boolean(path)),
    },
    {
        collection: 'whitepapers',
        fileRoot: 'nuxt/content',
        images: entry => ['image', 'thumbnail']
            .map(key => stringField(entry, key))
            .filter((path): path is string => Boolean(path)),
        rewriteLoc: loc => loc.replace(/^\/whitepapers\//, '/whitepaper/'),
    },
]

export default defineSitemapEventHandler(async (event) => {
    const urls: SitemapUrl[] = []

    for (const source of CONTENT_SOURCES) {
        try {
            const entries = await queryCollection(event, source.collection as never).all() as ContentEntry[]
            for (const entry of entries) {
                // `.navigation` entries are @nuxt/content's per-directory nav metadata,
                // not real pages - @nuxtjs/sitemap's own content integration excludes
                // them the same way.
                if (!entry.path || entry.path.endsWith('.navigation')) continue
                if (source.filter && !source.filter(entry)) continue

                const url: SitemapUrl = { loc: source.rewriteLoc ? source.rewriteLoc(entry.path) : entry.path }

                const lastmod = source.lastmod
                    ? source.lastmod(entry)
                    : (source.fileRoot ? getGitLastmod(REPO_ROOT, `${source.fileRoot}/${entry.stem}.md`) : undefined)
                if (lastmod) url.lastmod = new Date(lastmod)

                const images = source.images?.(entry) ?? []
                if (images.length) url.images = images.map(loc => ({ loc: toAbsoluteUrl(event, loc) }))

                urls.push(url)
            }
        } catch (err) {
            console.error(`[sitemap] failed to query "${source.collection}" collection for content-urls:`, err)
        }
    }

    return urls
})
