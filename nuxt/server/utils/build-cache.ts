/**
 * Build-time HTTP cache.
 *
 * Mirrors the role of @11ty/eleventy-fetch in the old Eleventy data pipeline:
 * persists GET responses to `.cache/integrations/` with per-call TTLs. Used by
 * the integrations composable to avoid hammering npm / GitHub on every build
 * and to survive GitHub's 60/hr anonymous rate limit.
 *
 * Built on `unstorage` (the same library Nitro uses internally) so the cache
 * layer is idiomatic to Nuxt and trivially swappable to another driver later.
 */
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { ofetch } from 'ofetch'
import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs-lite'

// cwd, not import.meta.url — Nitro bundles this file and the rewritten URL resolves above filesystem root.
const CACHE_DIR = resolve(process.cwd(), '.cache/integrations')

const storage = createStorage({
    driver: fsDriver({ base: CACHE_DIR })
})

export type CachedResponseType = 'json' | 'text'

export interface CachedFetchOptions {
    /** Cache lifetime in milliseconds. Defaults to 1h. */
    ttlMs?: number
    /** Response parsing mode. */
    type?: CachedResponseType
    /** Extra HTTP headers (e.g. GitHub User-Agent). */
    headers?: Record<string, string>
    /** Tag for cache key naming so different call-sites don't collide. */
    namespace?: string
}

interface CacheEntry<T> {
    url: string
    fetchedAt: number
    data: T
}

function cacheKey (namespace: string, url: string): string {
    const hash = createHash('sha1').update(url).digest('hex').slice(0, 16)
    return `${namespace}:${hash}.json`
}

/**
 * Fetch a URL with a disk-backed cache. Failed fetches are NOT cached, so a
 * transient outage doesn't poison the cache.
 */
export async function cachedFetch<T> (url: string, opts: CachedFetchOptions = {}): Promise<T> {
    const { ttlMs = 60 * 60 * 1000, type = 'json', headers, namespace = 'fetch' } = opts
    const key = cacheKey(namespace, url)

    const cached = await storage.getItem<CacheEntry<T>>(key)
    if (cached && Date.now() - cached.fetchedAt < ttlMs) {
        return cached.data
    }

    const data = await ofetch<T>(url, {
        headers,
        // Retry transient network failures so a single blip doesn't kill the build.
        // (Eleventy-fetch retried internally; ofetch defaults to 1.)
        retry: 2,
        retryDelay: 500,
        // Hard cap per request so one hung socket can't stall the entire build
        // (Netlify's 30-min outer cap is the only other backstop).
        timeout: 10_000,
        parseResponse: type === 'text' ? ((t: string) => t) as never : undefined
    })
    await storage.setItem(key, { url, fetchedAt: Date.now(), data })
    return data
}
