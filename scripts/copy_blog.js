#!/usr/bin/env node
// Migrate the blog cluster from 11ty (src/blog) to native Nuxt (@nuxt/content).
//
// Produces, under nuxt/:
//   content/blog/**          - every blog post markdown, transformed so it
//                              renders as plain MDC:
//                                {% renderFlow H %}JSON{% endrenderFlow %}
//                                  -> ::render-flow component (flow base64)
//                                {% raw %}/{% endraw %}        -> stripped
//                                {{ site.X }}                  -> literal value
//                                {% include "sign-up-url.njk" %} -> app signup URL
//                                other {% ... %} nunjucks tags -> stripped
//                                relative .md links            -> /blog/.../ URLs
//                                relative images               -> absolute served paths
//   blog.index.json          - all post cards (date desc) + per-category ordered
//                              url lists + pagination metadata for the index,
//                              category and pagination pages.
//   blog.authors.json        - author metadata (team + guests) keyed by id.
//   blog.routes.json         - prerender routes: every post + paginated index +
//                              category pages + the Atom feed.
//   blog.migrated-sources.json - repo-relative sources Nuxt now owns (11ty ignores).
//
// URL parity (hard constraint), matching 11ty exactly:
//   src/blog/YYYY/MM/slug.md -> /blog/YYYY/MM/slug/
//   index pagination (size 19, newest first): page 0 -> /blog/, page N -> /blog/N/
//   category pages: /blog/<cat>/ + /blog/<cat>/N/  (see CATEGORIES below)
//   feed                     -> /blog/index.xml
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src/blog')
const SRC_ROOT = path.join(REPO, 'src')
const CONTENT = path.join(REPO, 'nuxt/content/blog')
const INDEX_FILE = path.join(REPO, 'nuxt/blog.index.json')
const ROUTES_FILE = path.join(REPO, 'nuxt/blog.routes.json')
const AUTHORS_FILE = path.join(REPO, 'nuxt/blog.authors.json')
const MIGRATED_SOURCES_FILE = path.join(REPO, 'nuxt/blog.migrated-sources.json')
const site = JSON.parse(fs.readFileSync(path.join(REPO, 'src/_data/site.json'), 'utf-8'))
const SIGNUP_URL = site.appURL + '/account/create'
const PAGE_SIZE = 19

// URL segment -> the 11ty collection tag it paginates (see src/blog/<cat>.njk).
const CATEGORIES = {
    ai: { tag: 'ai', label: 'AI', excludeBlueprints: true },
    dashboard: { tag: 'dashboard', label: 'Dashboard' },
    flowfuse: { tag: 'flowfuse', label: 'FlowFuse' },
    'how-to': { tag: 'how-to', label: 'How-To' },
    news: { tag: 'news', label: 'News' },
    'node-red': { tag: 'node-red', label: 'Node-RED' },
    releases: { tag: 'releases', label: 'Releases' },
    tips: { tag: 'tips', label: 'Quick Tips' },
    uns: { tag: 'unified-namespace', label: 'UNS' },
    plc: { tag: 'plc', label: 'PLC' },
    mqtt: { tag: 'mqtt', label: 'MQTT' },
    opcua: { tag: 'opcua', label: 'OPC UA' },
    modbus: { tag: 'modbus', label: 'Modbus' },
}

function parseFrontmatter(raw) {
    const m = raw.match(/^---(?:js)?\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!m) return { data: {}, body: raw }
    let data = {}
    try { data = yaml.load(m[1]) || {} } catch { data = {} }
    return { data, body: m[2], fmRaw: m[1] }
}

function walk(dir, out = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name.startsWith('.')) continue
        const full = path.join(dir, e.name)
        if (e.isDirectory()) {
            if (e.name === 'images') continue
            walk(full, out)
        } else if (e.name.endsWith('.md')) {
            out.push(full)
        }
    }
    return out
}

function fileToRoute(absFile) {
    const rel = path.relative(SRC, absFile).split(path.sep).join('/')
    return '/blog/' + rel.replace(/\.md$/, '') + '/'
}
function fileToContentPath(absFile) {
    return fileToRoute(absFile).replace(/\/$/, '')
}

function asArray(t) { return Array.isArray(t) ? t : t ? [t] : [] }
// Card/hero image refs are rendered as-is in the browser; a relative frontmatter
// path (e.g. "blog/2025/07/images/x.png") resolves against the page URL and 404s
// on index/category pages. Normalise to the absolute path copy_assets publishes.
function absImage(img) {
    if (!img) return null
    if (/^(https?:|\/)/.test(img)) return img
    return '/' + String(img).replace(/^\.?\//, '')
}

// Map a nunjucks variable path like "site.appURL" to its literal value.
function siteValue(expr) {
    const parts = expr.split('.')
    if (parts[0] !== 'site') return undefined
    let v = site
    for (const p of parts.slice(1)) { v = v?.[p]; if (v === undefined) return undefined }
    return typeof v === 'string' ? v : undefined
}

// Resolve a relative image/link target (relative to the post dir) to the
// absolute path the site serves (11ty copies src/** through to the web root).
function resolveServedPath(target, dir) {
    let p = target
    if (p.startsWith('src/')) p = path.join(REPO, p)
    else p = path.resolve(dir, p)
    const rel = path.relative(SRC_ROOT, p).split(path.sep).join('/')
    if (rel.startsWith('..')) return null
    return '/' + rel
}

function transformBody(body, absFile) {
    const dir = path.dirname(absFile)

    // 1. Strip raw guards (keep inner literal text).
    body = body.replace(/\{%\s*raw\s*%\}/g, '').replace(/\{%\s*endraw\s*%\}/g, '')

    // 2. renderFlow paired shortcode -> ::render-flow MDC component.
    body = body.replace(/\{%\s*renderFlow\s*(\d+)?\s*%\}([\s\S]*?)\{%\s*endrenderFlow\s*%\}/g, (full, h, inner) => {
        const height = h ? Number(h) : 200
        const b64 = Buffer.from(inner.trim(), 'utf-8').toString('base64')
        return `\n\n::render-flow\n---\nheight: ${height}\nflow: "${b64}"\n---\n::\n\n`
    })

    // 3. sign-up-url include -> the literal app signup URL.
    body = body.replace(/\{%\s*include\s*"sign-up-url\.njk"\s*%\}/g, SIGNUP_URL)

    // 4. {{ site.X }} -> literal value.
    body = body.replace(/\{\{\s*(site\.[a-zA-Z0-9_.]+)\s*\}\}/g, (full, expr) => {
        const v = siteValue(expr)
        return v !== undefined ? v : full
    })

    // 5. The single storyTile macro call (building-on-flowfuse-devices) has no
    //    native equivalent; drop it (and its {% from %} import is stripped below).
    body = body.replace(/\{\{\s*storyTile\([\s\S]*?\)\s*\}\}/g, '')

    // 6. Strip any remaining nunjucks tags ({% set %}, {% from %}, stray includes).
    body = body.replace(/\{%[\s\S]*?%\}/g, '')

    // 7. Images: ![alt](target "title") -> absolute served path.
    body = body.replace(/(!\[[^\]]*\]\()([^)\s]+)(\s+"[^"]*")?(\))/g, (full, pre, target, title, post) => {
        if (/^(https?:|data:|\/)/.test(target)) return full
        const served = resolveServedPath(target, dir)
        return served ? pre + served + (title || '') + post : full
    })

    // 8. Links: resolve relative targets the way 11ty did — against the post's
    //    rendered URL (which is a directory), NOT the source file path. The
    //    legacy site left blog relative links untouched and let the browser
    //    resolve them against the page URL; @nuxt/content instead resolves them
    //    against the page path treated as a file, dropping a segment. That is
    //    why `../../04/foo` in a /blog/2022/05/<post>/ page was resolving to
    //    `/blog/04/foo` (year lost) instead of `/blog/2022/04/foo`.
    const postUrl = fileToRoute(absFile)
    body = body.replace(/(\]\()([^)\s]+)(\))/g, (full, pre, target, post) => {
        // Skip anything with a URI scheme (http:, mailto:, even malformed ones
        // like a `lhttps:` typo), pure fragments, and already-absolute paths.
        if (/^([a-z][\w+.-]*:|#|\/)/i.test(target)) return full
        const m = target.match(/^([^#?]*)([#?][\s\S]*)?$/)
        if (!m || !m[1]) return full
        // Assets (images etc.) are handled by the image step / passthrough.
        if (/\.(png|jpe?g|gif|svg|webp|avif|mp4|webm|pdf|zip|json)$/i.test(m[1])) return full
        let route
        try {
            route = new URL(m[1], 'https://h' + postUrl).pathname
        } catch {
            return full
        }
        route = route.replace(/\/index\.md$/i, '/').replace(/\.md$/i, '')
        if (route && !route.endsWith('/') && !/\.[a-z0-9]+$/i.test(route)) route += '/'
        return pre + route + (m[2] || '') + post
    })

    return body
}

// ---- authors (team + guests) -------------------------------------------
function parseMailto(email) {
    if (!email) return ''
    const m = String(email).match(/\(mailto:([^)]+)\)/)
    return m ? m[1] : (String(email).includes('@') && !email.includes('[') ? email : '')
}
function loadAuthors(dir, out) {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.isDirectory()) { loadAuthors(path.join(dir, e.name), out); continue }
        if (!e.name.endsWith('.json')) continue
        try {
            const d = JSON.parse(fs.readFileSync(path.join(dir, e.name), 'utf-8'))
            out[e.name.replace(/\.json$/, '')] = {
                name: d.name || '',
                title: d.title || '',
                bio: d.bio || '',
                headshot: d.headshot || '',
                github: d.github || '',
                linkedin: d.linkedin || '',
                email: parseMailto(d.email),
            }
        } catch {}
    }
}
const authors = {}
loadAuthors(path.join(REPO, 'src/_data/team'), authors)
loadAuthors(path.join(REPO, 'src/_data/guests'), authors)

// ---- emit content + build card index -----------------------------------
fs.rmSync(CONTENT, { recursive: true, force: true })

const files = walk(SRC)
const cards = []
const migratedSources = []

for (const absFile of files) {
    const rel = path.relative(SRC, absFile).split(path.sep).join('/')
    if (/[ %?#]/.test(rel)) continue // unsafe URL chars -> leave on 11ty
    const raw = fs.readFileSync(absFile, 'utf-8')
    const { data, body } = parseFrontmatter(raw)
    const newBody = transformBody(body, absFile)
    const dest = path.join(CONTENT, rel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    // Re-emit with a minimal frontmatter (title for @nuxt/content page title).
    const fm = {
        title: data.title || '',
        navTitle: data.title || '',
    }
    fs.writeFileSync(dest, `---\n${yaml.dump(fm)}---\n${newBody}`)
    migratedSources.push(path.relative(REPO, absFile).split(path.sep).join('/'))

    cards.push({
        url: fileToRoute(absFile),
        path: fileToContentPath(absFile),
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || data.excerpt || data.meta?.description || data.subtitle || '',
        date: data.date ? new Date(data.date).toISOString() : null,
        authors: asArray(data.authors),
        image: absImage(data.image) || '/images/og-blog.jpg',
        video: data.video || '',
        tags: asArray(data.tags),
        lastUpdated: data.lastUpdated ? new Date(data.lastUpdated).toISOString() : null,
        tldr: data.tldr || null,
    })
}

// Newest first (11ty: reverse:true over date-ascending collection).
cards.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

// ---- routes: posts + index + categories + feed --------------------------
const routes = []
for (const c of cards) routes.push(c.path)

function pageRoutes(base, list) {
    const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
    routes.push(base) // page 0
    for (let i = 1; i < pages; i++) routes.push(base + '/' + i)
    return pages
}

// Main index: every blog post (the legacy collections.posts spans all posts;
// the literal "posts" tag is inconsistently applied in source). Matches the
// frozen 11ty baseline of 20 paginated index pages.
const mainCards = cards
const mainPages = pageRoutes('/blog', mainCards)

// Categories.
const categories = {}
for (const [seg, cfg] of Object.entries(CATEGORIES)) {
    let list = cards.filter((c) => c.tags.includes(cfg.tag))
    if (cfg.excludeBlueprints) list = list.filter((c) => !c.tags.includes('blueprints'))
    const pages = pageRoutes('/blog/' + seg, list)
    categories[seg] = { label: cfg.label, tag: cfg.tag, pageCount: pages, urls: list.map((c) => c.url) }
}

routes.push('/blog/index.xml')

// ---- write outputs ------------------------------------------------------
fs.writeFileSync(INDEX_FILE, JSON.stringify({
    pageSize: PAGE_SIZE,
    mainPageCount: mainPages,
    cards,
    categories,
}, null, 2) + '\n')
fs.writeFileSync(AUTHORS_FILE, JSON.stringify(authors, null, 2) + '\n')
fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes.sort(), null, 2) + '\n')
fs.writeFileSync(MIGRATED_SOURCES_FILE, JSON.stringify(migratedSources.sort(), null, 2) + '\n')

console.log(`copy_blog: ${cards.length} posts -> nuxt/content/blog`)
console.log(`copy_blog: main index ${mainPages} pages (${mainCards.length} posts)`)
for (const [seg, c] of Object.entries(categories)) {
    console.log(`copy_blog: /blog/${seg}/ -> ${c.pageCount} pages (${c.urls.length} posts)`)
}
console.log(`copy_blog: ${routes.length} prerender routes, ${Object.keys(authors).length} authors`)
