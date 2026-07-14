import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItAttrs from 'markdown-it-attrs'
import sanitizeHtml from 'sanitize-html'
import type {
    Integration,
    IntegrationCatalogEntry,
    IntegrationExample
} from '../../types/integrations'
import { INTEGRATIONS_API } from '../../types/integrations'
import { cachedFetch } from './build-cache'

const MAX_EXAMPLES_PER_NODE = 20

const TTL_CATALOG_MS = 60 * 60 * 1000
const TTL_NPM_MS = 60 * 60 * 1000
const TTL_GITHUB_MS = 6 * 60 * 60 * 1000

const GITHUB_HEADERS = {
    'User-Agent': 'FlowFuse-Website',
    Accept: 'application/vnd.github+json'
}

const md = new MarkdownIt({ html: true })
    .use(MarkdownItAnchor, { permalink: MarkdownItAnchor.permalink.headerLink() })
    .use(MarkdownItFootnote)
    .use(MarkdownItAttrs)

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

    const topNodes = [...catalogue]
        .sort((a, b) => (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0))
        .slice(0, 50)

    const topNodesMap = new Map<string, IntegrationCatalogEntry>(
        topNodes.map(node => [node._id, node])
    )

    for (const node of catalogue) {
        if (node.ffCertified && !topNodesMap.has(node._id)) {
            topNodes.push(node)
            topNodesMap.set(node._id, node)
        }
    }

    const results = await Promise.all(topNodes.map(node => enrichNode(node)))
    const failed = results.filter(r => r.failed).map(r => r.node._id)
    const failureRate = failed.length / results.length

    if (failureRate > FAILURE_THRESHOLD) {
        const sample = failed.slice(0, 5).join(', ')
        const more = failed.length > 5 ? `, …+${failed.length - 5} more` : ''
        throw new Error(
            `[integrations] ${failed.length}/${results.length} nodes failed enrichment ` +
            `(${Math.round(failureRate * 100)}%, threshold ${Math.round(FAILURE_THRESHOLD * 100)}%): ${sample}${more}`
        )
    }
    if (failed.length > 0) {
        console.warn(`[integrations] ${failed.length}/${results.length} nodes shipped with degraded enrichment: ${failed.join(', ')}`)
    }

    return results.map(r => r.node).sort(sortCertifiedThenDownloads)
}

const FAILURE_THRESHOLD = 0.25

function sortCertifiedThenDownloads (a: Integration, b: Integration): number {
    if (a.ffCertified && !b.ffCertified) return -1
    if (!a.ffCertified && b.ffCertified) return 1
    return (b.downloads?.week ?? 0) - (a.downloads?.week ?? 0)
}

async function enrichNode (entry: IntegrationCatalogEntry): Promise<{ node: Integration, failed: boolean }> {
    const node: Integration = { ...entry }

    node.tier = entry.ffCertified ? 'recommended' : undefined

    if (!node.categories) node.categories = []

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
            node.readme = sanitizeReadme(linked)
        }
    } catch (err) {
        console.warn(`[integrations] enrich failed for ${node._id}:`, (err as Error).message)
        return { node, failed: true }
    }

    return { node, failed: false }
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
        // No /examples folder is the common case; treat fetch errors the same.
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

const README_SANITIZE_OPTS: sanitizeHtml.IOptions = {
    allowedTags: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'blockquote', 'ul', 'ol', 'li',
        'em', 'strong', 'code', 'pre', 'kbd', 'samp', 'var', 'del', 's', 'sub', 'sup',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'hr', 'br', 'div', 'span',
        'details', 'summary',
    ],
    allowedAttributes: {
        a: ['href', 'name', 'target', 'rel', 'title'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        '*': ['id', 'class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https', 'data'] },
    disallowedTagsMode: 'discard',
}

function sanitizeReadme (html: string): string {
    return sanitizeHtml(html, README_SANITIZE_OPTS)
}

function sanitiseFlow (raw: string): string {
    let result = escapeForHtml(raw)
    try {
        const parsed = JSON.parse(raw)
        const visit = (n: Record<string, unknown>) => {
            if (n && typeof n === 'object') {
                if (typeof n.template === 'string') n.template = sanitizeReadme(n.template)
                if (typeof n.html === 'string') n.html = sanitizeReadme(n.html)
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
