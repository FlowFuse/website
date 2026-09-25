// Checks the generated sitemap for the two failures that otherwise pass unnoticed.
//
// server/api/__sitemap__/content-urls.get.ts fills the sitemap from the @nuxt/content
// collections, and it catches its own errors: a collection that fails to query, or a
// source glob that matches nothing, just leaves that section out. The lastmod it adds
// comes from lib/git-lastmod.mjs, which returns nothing when `git log` fails (no .git in
// the build, say), so every page silently loses its date. Neither fails a build, and the
// sitemap still looks fine at a glance. nuxt.config.ts runs this against the rendered
// /sitemap.xml in the sitemap:prerender:done hook and fails the build on any problem.

// Top-level path of each section content-urls.get.ts publishes. The blueprints are left
// out: a build without access to the private library has none, by design.
export const CONTENT_SECTIONS = ['docs', 'handbook', 'changelog', 'blog', 'customer-stories', 'ebooks', 'whitepaper']

// Sections whose lastmod comes only from git history, so a failed walk empties them all.
// The blog is not listed: posts with `lastUpdated` keep a date either way.
export const GIT_DATED_SECTIONS = ['handbook', 'changelog', 'customer-stories', 'ebooks', 'whitepaper']

/**
 * @param {string} xml the rendered /sitemap.xml
 * @returns {string[]} one message per problem; empty when the sitemap is complete
 */
export function sitemapProblems (xml) {
    const counts = new Map()
    for (const [, body] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
        const loc = body.match(/<loc>([^<]+)<\/loc>/)?.[1]
        if (!loc) continue
        const section = new URL(loc, 'https://flowfuse.com').pathname.split('/')[1]
        const entry = counts.get(section) ?? { urls: 0, dated: 0 }
        entry.urls++
        if (/<lastmod>/.test(body)) entry.dated++
        counts.set(section, entry)
    }

    const problems = []
    for (const section of CONTENT_SECTIONS) {
        if (!counts.get(section)?.urls) {
            problems.push(`no /${section}/ URLs: its collection returned nothing to server/api/__sitemap__/content-urls.get.ts`)
        }
    }
    for (const section of GIT_DATED_SECTIONS) {
        const entry = counts.get(section)
        if (entry?.urls && entry.dated === 0) {
            problems.push(`none of the ${entry.urls} /${section}/ URLs has a lastmod: lib/git-lastmod.mjs found no git history (is the build running in a git checkout?)`)
        }
    }
    return problems
}
