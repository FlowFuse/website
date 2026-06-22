import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineSitemapEventHandler(async () => {
    try {
        const xml = await readFile(join(process.cwd(), 'public/sitemap-legacy.xml'), 'utf-8')
        const urls: { loc: string; lastmod?: string; priority?: number }[] = []

        for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
            const block = match[1]
            const rawLoc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
            if (!rawLoc) continue
            // Strip domain so nuxt-sitemap canonicalises with the correct base URL
            const loc = rawLoc.replace(/^https?:\/\/[^/]+/, '')
            const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]
            const priority = block.match(/<priority>(.*?)<\/priority>/)?.[1]
            urls.push({
                loc,
                ...(lastmod && { lastmod }),
                ...(priority && { priority: parseFloat(priority) }),
            })
        }

        return urls
    } catch {
        // 11ty hasn't run yet (dev without running 11ty first)
        return []
    }
})
