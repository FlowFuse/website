#!/usr/bin/env node
// Migrate the integrations cluster from 11ty (src/integrations, layouts/integration.njk)
// to native Nuxt.
//
// The 11ty build is data-driven and NON-deterministic: it picks the "top 50 by
// weekly downloads + all certified" nodes from a live API, so the exact route
// set drifts over time. To keep route parity with the FROZEN baseline, this
// script reads the exact integration IDs from migration/routes-11ty.txt and
// fetches each one's metadata + README at build time, reproducing the data
// shape of src/_data/integrations.js and the rendering of layouts/integration.njk.
//
// Produces under nuxt/:
//   integrations.index.json   - per-node metadata + rendered README HTML + examples
//   integrations.routes.json  - prerender routes (/integrations + each /integrations/<id>)
const fs = require('fs')
const path = require('path')
const EleventyFetch = require('@11ty/eleventy-fetch')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

const REPO = path.resolve(__dirname, '..')
const ROUTES_11TY = path.join(REPO, 'migration/routes-11ty.txt')
const INDEX_FILE = path.join(REPO, 'nuxt/integrations.index.json')
const ROUTES_FILE = path.join(REPO, 'nuxt/integrations.routes.json')

const CACHE = '4h'

// Reproduce the 11ty `md` filter (.eleventy.js line ~398) used for readmes.
function renderMarkdown(content) {
    if (!content) return ''
    const md = new markdownIt({ html: true }).use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.headerLink(),
    })
    return md.render(content)
}

// Reproduce the rewriteIntegrationLinks filter (.eleventy.js line ~417):
// turn relative README links/src into absolute repo links and repair anchors.
function rewriteIntegrationLinks(str, integration) {
    if (!str) return str
    const anchorIds = new Set()
    const anchorIdRegex = /id="([^"]+)"/g
    let anchorMatch
    while ((anchorMatch = anchorIdRegex.exec(str)) !== null) {
        anchorIds.add(anchorMatch[1])
    }
    const matcher = /((href|src)="([^"]*))"/g
    return str.replace(matcher, (fullMatch, group1, attr, url) => {
        if (/^(http|https|mailto:)/.test(url)) return fullMatch
        if (url.startsWith('#')) {
            const targetAnchor = url.substring(1)
            if (!anchorIds.has(targetAnchor)) {
                for (const existingAnchor of anchorIds) {
                    const normalizedExisting = existingAnchor.replace(/\./g, '')
                    if (normalizedExisting === targetAnchor) {
                        return `${attr}="#${existingAnchor}"`
                    }
                }
            }
            return fullMatch
        }
        if (integration.repository && integration.repository.url) {
            const repoUrl = integration.repository.url
                .replace('git+', '')
                .replace('.git', '')
                .replace('git://', 'https://')
            if (url.startsWith('./') || url.startsWith('../')) {
                const cleanUrl = url.replace(/^\.\.?\//, '')
                return `${attr}="${repoUrl}/blob/master/${cleanUrl}"`
            } else if (url.startsWith('/')) {
                const cleanUrl = url.replace(/^\//, '')
                return `${attr}="${repoUrl}/blob/master/${cleanUrl}"`
            } else if (!url.startsWith('#')) {
                return `${attr}="${repoUrl}/blob/master/${url}"`
            }
        }
        return fullMatch
    })
}

const stripRelativeTags = (html) =>
    html
        .replace(/<link\b[^>]*?\bhref=(?:["']|&quot;)(?!https?:\/\/)[^"'>&]*(?:["']|&quot;)[^>]*\/?>/gi, '')
        .replace(/<script\b[^>]*?\bsrc=(?:["']|&quot;)(?!https?:\/\/)[^"'>&]*(?:["']|&quot;)[^>]*>(?:[\s\S]*?<\/script>)?/gi, '')

function readBaselineIds() {
    const lines = fs.readFileSync(ROUTES_11TY, 'utf-8').split('\n')
    const ids = []
    for (const line of lines) {
        const m = line.match(/^\/integrations\/(.+)\/$/)
        if (m) ids.push(m[1])
    }
    return ids
}

async function fetchJson(url, opts = {}) {
    return EleventyFetch(url, { duration: CACHE, type: 'json', ...opts })
}

async function loadCertifiedIds() {
    try {
        const data = await fetchJson('https://catalog.flowfuse.com/catalogue.json')
        return new Set((data.modules || []).map((m) => m.id))
    } catch (err) {
        console.warn('copy_integrations: could not load certified catalogue:', err.message)
        return new Set()
    }
}

async function loadCatalogue() {
    try {
        const data = await fetchJson('https://ff-integrations.flowfuse.cloud/api/nodes')
        const map = {}
        for (const node of data.catalogue || []) map[node._id] = node
        return map
    } catch (err) {
        console.warn('copy_integrations: could not load node catalogue:', err.message)
        return {}
    }
}

async function fetchExamples(node) {
    if (!node.githubOwner || !node.githubRepo) return []
    try {
        const examplesUrl = `https://api.github.com/repos/${node.githubOwner}/${node.githubRepo}/contents/examples`
        const examplesResponse = await fetchJson(examplesUrl, {
            fetchOptions: { headers: { 'User-Agent': 'FlowFuse-Website' } },
        })
        if (!Array.isArray(examplesResponse)) return []
        const exampleFiles = examplesResponse.filter(
            (file) => file.name.endsWith('.json') && file.type === 'file'
        )
        return await Promise.all(
            exampleFiles.map(async (file) => {
                try {
                    const flowContent = await EleventyFetch(file.download_url, {
                        duration: CACHE,
                        type: 'text',
                        fetchOptions: { headers: { 'User-Agent': 'FlowFuse-Website' } },
                    })
                    let sanitizedFlow
                    try {
                        const flowJson = JSON.parse(flowContent)
                        const sanitizeNode = (n) => {
                            if (n && typeof n === 'object') {
                                if (typeof n.template === 'string') n.template = stripRelativeTags(n.template)
                                if (typeof n.html === 'string') n.html = stripRelativeTags(n.html)
                            }
                            return n
                        }
                        if (Array.isArray(flowJson)) flowJson.forEach(sanitizeNode)
                        else sanitizeNode(flowJson)
                        // Store as a parsed array/object; the Vue page base64-encodes it.
                        sanitizedFlow = flowJson
                    } catch (_) {
                        sanitizedFlow = null
                    }
                    return {
                        name: file.name.replace('.json', ''),
                        path: file.path,
                        url: file.html_url,
                        downloadUrl: file.download_url,
                        flow: sanitizedFlow,
                    }
                } catch (err) {
                    return {
                        name: file.name.replace('.json', ''),
                        path: file.path,
                        url: file.html_url,
                        downloadUrl: file.download_url,
                        flow: null,
                    }
                }
            })
        )
    } catch (err) {
        return []
    }
}

function rewriteReadmeImages(readme, node) {
    return readme
        .replace(/!\[(.*?)\]\((?!https?:\/\/)([^)]+)\)/g, (match, alt, imagePath) => {
            if (node.githubOwner && node.githubRepo && imagePath) {
                const cleanPath = imagePath.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')
                const rawUrl = `https://raw.githubusercontent.com/${node.githubOwner}/${node.githubRepo}/master/${cleanPath}`
                return `![${alt}](${rawUrl})`
            }
            return match
        })
        .replace(
            /<img([^>]*?)src=["']((?!https?:\/\/)(\.\.\/)?(\.\/)?[^"']+)["']([^>]*?)>/gi,
            (match, before, src, _a, _b, after) => {
                if (node.githubOwner && node.githubRepo) {
                    const cleanPath = src.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')
                    const rawUrl = `https://raw.githubusercontent.com/${node.githubOwner}/${node.githubRepo}/master/${cleanPath}`
                    return `<img${before}src="${rawUrl}"${after}>`
                }
                return match
            }
        )
}

async function buildNode(id, catalogueEntry, certifiedIds) {
    // Base node from the live catalogue (downloads, version, name, npmScope...).
    // Fall back to a minimal stub if the API no longer lists it.
    const node = catalogueEntry
        ? JSON.parse(JSON.stringify(catalogueEntry))
        : { _id: id, name: id, description: '', version: '', downloads: { week: 0 }, npmOwners: [id.split('/')[0]] }

    node._id = id
    node.ffCertified = certifiedIds.has(id)

    try {
        const nodeDetails = await fetchJson(`https://registry.npmjs.org/${id}`)
        node.author = nodeDetails.author
        node.maintainers = nodeDetails.maintainers || []
        node.homepage = nodeDetails.homepage
        node.bugs = nodeDetails.bugs
        node.repository = nodeDetails.repository
        node.time = nodeDetails.time
        node.lastUpdated = nodeDetails.time?.modified || nodeDetails.time?.[node.version]
        node.created = nodeDetails.time?.created
        node.license = nodeDetails.license || nodeDetails.versions?.[node.version]?.license
        if (!node.version) {
            node.version = nodeDetails['dist-tags']?.latest || ''
        }

        if (nodeDetails.repository?.url) {
            const repoUrl = nodeDetails.repository.url
                .replace('git+', '')
                .replace('.git', '')
                .replace('git://', 'https://')
            const githubMatch = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
            if (githubMatch) {
                node.githubOwner = githubMatch[1]
                node.githubRepo = githubMatch[2]
            }
        }

        node.examples = await fetchExamples(node)

        if (nodeDetails.readme) {
            let readme = rewriteReadmeImages(nodeDetails.readme, node)
            node.readme = stripRelativeTags(readme)
        } else {
            node.readme = ''
        }
    } catch (err) {
        if (!err.message || !err.message.includes('404')) {
            console.warn(`copy_integrations: failed npm fetch for ${id}: ${err.message}`)
        }
        node.readme = ''
        node.examples = []
    }

    // Render README -> HTML exactly like layouts/integration.njk:
    //   integration.readme | md | rewriteIntegrationLinks | safe
    const html = rewriteIntegrationLinks(renderMarkdown(node.readme || ''), node)

    return {
        id,
        url: `/integrations/${id}/`,
        ffCertified: node.ffCertified,
        name: node.name || id,
        description: node.description || '',
        version: node.version || '',
        downloadsWeek: node.downloads?.week ?? 0,
        npmScope: node.npmScope || (node.npmOwners && node.npmOwners[0]) || '',
        author: node.author
            ? { name: node.author.name || node.author, url: node.author.url || '' }
            : null,
        repositoryUrl: node.repository?.url
            ? node.repository.url.replace('git+', '').replace('.git', '')
            : '',
        githubOwner: node.githubOwner || '',
        githubRepo: node.githubRepo || '',
        lastUpdated: node.lastUpdated || '',
        created: node.created || '',
        readmeHtml: html,
        examples: (node.examples || []).map((e) => ({ name: e.name, flow: e.flow })),
    }
}

async function main() {
    const ids = readBaselineIds()
    console.log(`copy_integrations: ${ids.length} integration IDs from baseline`)
    const [catalogue, certifiedIds] = await Promise.all([loadCatalogue(), loadCertifiedIds()])

    const integrations = []
    for (const id of ids) {
        const entry = await buildNode(id, catalogue[id], certifiedIds)
        integrations.push(entry)
        console.log(`  - ${id}${entry.ffCertified ? ' (certified)' : ''}${entry.readmeHtml ? '' : ' [no readme]'}`)
    }

    // Sort: certified first, then by weekly downloads desc (matches 11ty order)
    integrations.sort((a, b) => {
        if (a.ffCertified && !b.ffCertified) return -1
        if (!a.ffCertified && b.ffCertified) return 1
        return b.downloadsWeek - a.downloadsWeek
    })

    const routes = ['/integrations', ...integrations.map((i) => i.url.replace(/\/$/, ''))]
    fs.writeFileSync(INDEX_FILE, JSON.stringify({ integrations }, null, 2) + '\n')
    fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes.sort(), null, 2) + '\n')
    console.log(`copy_integrations: wrote ${integrations.length} integrations, ${routes.length} routes`)
}

main().catch((err) => {
    console.error('copy_integrations failed:', err)
    process.exit(1)
})
