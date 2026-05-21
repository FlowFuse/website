/// <reference path="../../types/shims.d.ts" />
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItAttrs from 'markdown-it-attrs'
// Relative paths (not `~/` aliases) because this file is also imported by
// nuxt.config.ts via jiti, which doesn't resolve Nuxt's path aliases.
import type {
    Integration,
    IntegrationCatalogEntry,
    IntegrationExample
} from '../../types/integrations'
import { INTEGRATIONS_API } from '../../types/integrations'
import { cachedFetch } from './build-cache'

const MAX_EXAMPLES_PER_NODE = 20

// Cache durations match the previous Eleventy data pipeline:
// - catalog/npm: change frequently (new versions daily) → 1h
// - GitHub directory listings + flow file contents: change rarely → 6h
const TTL_CATALOG_MS = 60 * 60 * 1000
const TTL_NPM_MS = 60 * 60 * 1000
const TTL_GITHUB_MS = 6 * 60 * 60 * 1000

const GITHUB_HEADERS = {
    'User-Agent': 'FlowFuse-Website',
    Accept: 'application/vnd.github+json'
}

// Markdown-it configured to match the Eleventy markdownLib (line ~1366 of .eleventy.js):
// html: true, plus anchor + footnote + attrs. (The code-clipboard plugin is Eleventy-
// runtime specific and intentionally not ported.)
const md = new MarkdownIt({ html: true })
    .use(MarkdownItAnchor, { permalink: MarkdownItAnchor.permalink.headerLink() })
    .use(MarkdownItFootnote)
    .use(MarkdownItAttrs)

/**
 * Build the enriched node list for detail pages.
 *
 * Mirrors src/_data/integrations.js: top-50 by weekly downloads + all
 * ffCertified nodes, each augmented with README + GitHub examples.
 *
 * Memoised at module level so the ~67 detail pages share a single fetch
 * during `nuxt generate`. On rejection the cache is cleared so dev sessions
 * can recover without a full restart.
 */
let _enrichedCache: Promise<Integration[]> | null = null
export function buildEnrichedIntegrations (): Promise<Integration[]> {
    if (!_enrichedCache) {
        _enrichedCache = _buildEnrichedIntegrations()
        _enrichedCache.catch(() => { _enrichedCache = null })
    }
    return _enrichedCache
}

async function _buildEnrichedIntegrations (): Promise<Integration[]> {
    interface ApiResponse { catalogue: IntegrationCatalogEntry[] }
    const data = await cachedFetch<ApiResponse>(INTEGRATIONS_API, {
        ttlMs: TTL_CATALOG_MS,
        namespace: 'catalog'
    })
    const catalogue = data.catalogue ?? []

    // Top 50 by weekly downloads
    const topNodes = [...catalogue]
        .sort((a, b) => (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0))
        .slice(0, 50)

    const topNodesMap = new Map<string, IntegrationCatalogEntry>(
        topNodes.map(node => [node._id, node])
    )

    // Ensure all certified nodes are included even if outside the top 50
    for (const node of catalogue) {
        if (node.ffCertified && !topNodesMap.has(node._id)) {
            topNodes.push(node)
            topNodesMap.set(node._id, node)
        }
    }

    const enriched = await Promise.all(topNodes.map(node => enrichNode(node)))
    return enriched.sort(sortCertifiedThenDownloads)
}

function sortCertifiedThenDownloads (a: Integration, b: Integration): number {
    if (a.ffCertified && !b.ffCertified) return -1
    if (!a.ffCertified && b.ffCertified) return 1
    return (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0)
}

async function enrichNode (entry: IntegrationCatalogEntry): Promise<Integration> {
    const node: Integration = { ...entry }

    if (!node.categories) node.categories = []

    // Mirror Eleventy's "catalogue_<cat>" prefix + "catalogue" group
    node.categories = node.categories.map(c => c.includes('catalogue') ? c : `catalogue_${c}`)
    if (!node.categories.includes('catalogue')) node.categories.push('catalogue')

    try {
        const npm = await cachedFetch<NpmRegistryPackage>(
            `https://registry.npmjs.org/${node._id}`,
            { ttlMs: TTL_NPM_MS, namespace: 'npm' }
        )

        node.author = npm.author ?? node.author
        node.maintainers = npm.maintainers ?? []
        node.homepage = npm.homepage
        node.bugs = npm.bugs
        node.repository = npm.repository
        node.time = npm.time
        node.lastUpdated = npm.time?.modified ?? npm.time?.[node.version]
        node.created = npm.time?.created
        node.license = npm.license ?? npm.versions?.[node.version]?.license

        if (npm.repository?.url) {
            const repoUrl = cleanGitUrl(npm.repository.url)
            const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
            if (match && match[1] && match[2]) {
                const owner = match[1]
                const repo = match[2]
                node.githubOwner = owner
                node.githubRepo = repo
                node.examples = await fetchExamples(owner, repo)
            }
        }

        if (npm.readme) {
            const withAbsoluteAssets = rewriteRelativeAssets(npm.readme, node.githubOwner, node.githubRepo)
            const rendered = md.render(withAbsoluteAssets)
            const linked = rewriteIntegrationLinks(rendered, node)
            // Strip <link>/<script> tags with relative paths. Required because we
            // render markdown with `html: true`, so a malicious upstream README
            // could otherwise embed `<script src="./pwn.js">` directly.
            // Matches the deleted Eleventy _data/integrations.js:205.
            node.readme = stripRelativeTags(linked)
        }
    } catch (err) {
        console.warn(`[integrations] enrich failed for ${node._id}:`, (err as Error).message)
    }

    return node
}

function cleanGitUrl (url: string): string {
    return url.replace('git+', '').replace('.git', '').replace('git://', 'https://')
}

interface NpmRegistryPackage {
    author?: { name?: string; email?: string; url?: string }
    maintainers?: { name?: string; email?: string }[]
    homepage?: string
    bugs?: { url?: string }
    repository?: { type?: string; url?: string }
    time?: Record<string, string>
    license?: string
    versions?: Record<string, { license?: string }>
    readme?: string
}

interface GithubContentItem {
    name: string
    path: string
    type: string
    html_url: string
    download_url: string
}

async function fetchExamples (owner: string, repo: string): Promise<IntegrationExample[]> {
    try {
        const listing = await cachedFetch<GithubContentItem[]>(
            `https://api.github.com/repos/${owner}/${repo}/contents/examples`,
            { ttlMs: TTL_GITHUB_MS, namespace: 'gh-examples', headers: GITHUB_HEADERS }
        )

        if (!Array.isArray(listing)) return []

        const flowFiles = listing
            .filter(file => file.type === 'file' && file.name.endsWith('.json'))
            .slice(0, MAX_EXAMPLES_PER_NODE)

        return Promise.all(flowFiles.map(file => fetchFlow(file)))
    } catch {
        // No /examples folder, or API error — both are fine
        return []
    }
}

async function fetchFlow (file: GithubContentItem): Promise<IntegrationExample> {
    const base: IntegrationExample = {
        name: file.name.replace('.json', ''),
        path: file.path,
        url: file.html_url,
        downloadUrl: file.download_url
    }

    try {
        const raw = await cachedFetch<string>(file.download_url, {
            ttlMs: TTL_GITHUB_MS,
            namespace: 'gh-flow',
            type: 'text',
            headers: GITHUB_HEADERS
        })
        base.flow = sanitiseFlow(raw)
    } catch (err) {
        console.warn(`[integrations] flow fetch failed ${file.name}:`, (err as Error).message)
    }

    return base
}

function escapeForHtml (s: string): string {
    return s.replace(/&/g, '\\u0026').replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
}

function stripRelativeTags (html: string): string {
    return html
        .replace(/<link\b[^>]*?\bhref=(?:["']|&quot;)(?!https?:\/\/)[^"'>&]*(?:["']|&quot;)[^>]*\/?>/gi, '')
        .replace(/<script\b[^>]*?\bsrc=(?:["']|&quot;)(?!https?:\/\/)[^"'>&]*(?:["']|&quot;)[^>]*>(?:[\s\S]*?<\/script>)?/gi, '')
}

function sanitiseFlow (raw: string): string {
    let result = escapeForHtml(raw)
    try {
        const parsed = JSON.parse(raw)
        const visit = (n: Record<string, unknown>) => {
            if (n && typeof n === 'object') {
                if (typeof n.template === 'string') n.template = stripRelativeTags(n.template)
                if (typeof n.html === 'string') n.html = stripRelativeTags(n.html)
            }
        }
        if (Array.isArray(parsed)) {
            parsed.forEach(visit)
        } else {
            visit(parsed)
        }
        result = JSON.stringify(parsed)
            .replace(/&/g, '\\u0026')
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
    } catch {
        // not valid JSON; keep escaped raw
    }
    return result
}

/**
 * Rewrites relative asset URLs in raw README markdown to absolute raw.githubusercontent.com
 * paths so images and embedded HTML render correctly off-domain. Runs on the markdown
 * *before* rendering, so it covers `![]()` syntax and any `<img>` tags the README
 * embeds via the HTML escape hatch.
 */
function rewriteRelativeAssets (readme: string, owner?: string, repo?: string): string {
    if (!owner || !repo) return readme

    const base = `https://raw.githubusercontent.com/${owner}/${repo}/master/`

    return readme
        .replace(/!\[(.*?)\]\((?!https?:\/\/)([^)]+)\)/g, (_match, alt: string, imagePath: string) => {
            const cleanPath = imagePath.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')
            return `![${alt}](${base}${cleanPath})`
        })
        .replace(/<img([^>]*?)src=["']((?!https?:\/\/)(\.\.\/)?(\.\/)?[^"']+)["']([^>]*?)>/gi, (_match, before: string, src: string, _r1, _r2, after: string) => {
            const cleanPath = src.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')
            return `<img${before}src="${base}${cleanPath}"${after}>`
        })
}

/**
 * Post-render rewrite for the README HTML:
 *  1. Collects all anchor IDs that ended up in the rendered HTML.
 *  2. Fixes same-page `#anchor` links whose target lost periods during ID slugification
 *     (e.g. README author wrote `#migration-from-0.1.2` but the rendered ID became
 *     `migration-from-0-1-2`; markdown-it-anchor's slugger normalises differently).
 *  3. Rewrites any remaining relative href/src paths to `${repo}/blob/master/${path}`.
 *
 * Ports the logic from the deleted Eleventy filter `.eleventy.js:387-453`.
 */
function rewriteIntegrationLinks (html: string, node: Integration): string {
    if (!html) return html

    const anchorIds = new Set<string>()
    const anchorIdRegex = /id="([^"]+)"/g
    let m: RegExpExecArray | null
    while ((m = anchorIdRegex.exec(html)) !== null) {
        if (m[1]) anchorIds.add(m[1])
    }

    const repoUrl = node.repository?.url ? cleanGitUrl(node.repository.url) : ''
    const attrMatcher = /((href|src)="([^"]*))"/g

    return html.replace(attrMatcher, (fullMatch, _full, attr: string, url: string) => {
        if (/^(https?:|mailto:)/.test(url)) return fullMatch

        if (url.startsWith('#')) {
            const target = url.slice(1)
            if (!anchorIds.has(target)) {
                for (const existing of anchorIds) {
                    if (existing.replace(/\./g, '') === target) {
                        return `${attr}="#${existing}"`
                    }
                }
            }
            return fullMatch
        }

        if (!repoUrl) return fullMatch

        if (url.startsWith('./') || url.startsWith('../')) {
            return `${attr}="${repoUrl}/blob/master/${url.replace(/^\.\.?\//, '')}"`
        }
        if (url.startsWith('/')) {
            return `${attr}="${repoUrl}/blob/master/${url.replace(/^\//, '')}"`
        }
        return `${attr}="${repoUrl}/blob/master/${url}"`
    })
}
