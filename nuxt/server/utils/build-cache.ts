// Disk-backed HTTP cache for build-time fetches; survives GitHub's 60/hr anon rate limit.
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
    ttlMs?: number
    type?: CachedResponseType
    headers?: Record<string, string>
    /** Cache key prefix so different call-sites don't collide. */
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

// Failed fetches are NOT cached: setItem only runs after ofetch resolves, so a
// transient outage doesn't poison the cache for the next hour.
export async function cachedFetch<T> (url: string, opts: CachedFetchOptions = {}): Promise<T> {
    const { ttlMs = 60 * 60 * 1000, type = 'json', headers, namespace = 'fetch' } = opts
    const key = cacheKey(namespace, url)

    const cached = await storage.getItem<CacheEntry<T>>(key)
    if (cached && Date.now() - cached.fetchedAt < ttlMs) {
        return cached.data
    }

    const data = await ofetch<T>(url, {
        headers,
        retry: 2,
        retryDelay: 500,
        // Hard cap per request so one hung socket can't stall the whole build.
        timeout: 10_000,
        parseResponse: type === 'text' ? ((t: string) => t) as never : undefined
    })
    await storage.setItem(key, { url, fetchedAt: Date.now(), data })
    return data
}
