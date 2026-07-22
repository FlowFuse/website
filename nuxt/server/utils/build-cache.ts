import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { ofetch } from 'ofetch'
import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs-lite'

const CACHE_DIR = resolve(process.cwd(), '.cache/integrations')

const storage = createStorage({
    driver: fsDriver({ base: CACHE_DIR })
})

export type CachedResponseType = 'json' | 'text'

export interface CachedFetchOptions {
    ttlMs?: number
    type?: CachedResponseType
    headers?: Record<string, string>
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
        timeout: 10_000,
        parseResponse: type === 'text' ? ((t: string) => t) as never : undefined
    })
    // Best-effort: the deployed serverless function's filesystem is read-only outside
    // /tmp, so this write always fails there. Don't let a failed cache write discard
    // data we already successfully fetched.
    try {
        await storage.setItem(key, { url, fetchedAt: Date.now(), data })
    } catch (err) {
        console.warn(`[build-cache] failed to persist cache entry for ${key}:`, err)
    }
    return data
}
