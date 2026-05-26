#!/usr/bin/env node
// Migrate the changelog cluster from 11ty (src/changelog) to native Nuxt.
//
// Produces, under nuxt/:
//   content/changelog/**            - the 170 changelog entry markdown files
//                                     (relative .md links -> absolute URLs,
//                                     relative images -> /changelog-media/...)
//   changelog.index.json            - the combined, date-desc card list used by
//                                     the paginated index: the 170 changelog
//                                     entries PLUS the 9 blog posts tagged
//                                     `changelog` (which 11ty mixes into the
//                                     same paginated collection). Matches 11ty's
//                                     `collections.changelog` so pagination
//                                     produces the identical /changelog/N/ pages.
//   changelog.routes.json           - prerender routes: every entry + the
//                                     paginated index pages + the RSS feed.
//   changelog.team.json             - author metadata (name) keyed by id.
//
// URL parity (hard constraint), matching 11ty exactly:
//   src/changelog/YYYY/MM/slug.md   -> /changelog/YYYY/MM/slug/
//   index pagination (size 19, newest first): page 0 -> /changelog/,
//                                             page N -> /changelog/N/
//   feed                            -> /changelog/index.xml
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src/changelog')
const BLOG = path.join(REPO, 'src/blog')
const CONTENT = path.join(REPO, 'nuxt/content/changelog')
const MEDIA = path.join(REPO, 'nuxt/public/changelog-media')
const INDEX_FILE = path.join(REPO, 'nuxt/changelog.index.json')
const ROUTES_FILE = path.join(REPO, 'nuxt/changelog.routes.json')
const TEAM_FILE = path.join(REPO, 'nuxt/changelog.team.json')
const MIGRATED_SOURCES_FILE = path.join(REPO, 'nuxt/changelog.migrated-sources.json')
const PAGE_SIZE = 19

function parseFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!m) return { data: {}, body: raw }
    let data = {}
    try { data = yaml.load(m[1]) || {} } catch { data = {} }
    return { data, body: m[2] }
}

// ---- changelog entry files ---------------------------------------------
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

function entryRoute(absFile) {
    const rel = path.relative(SRC, absFile).split(path.sep).join('/')
    return '/changelog/' + rel.replace(/\.md$/, '') + '/'
}
function entryContentPath(absFile) {
    return entryRoute(absFile).replace(/\/$/, '')
}

const copiedMedia = new Set()
function copyMedia(absImage) {
    const rel = path.relative(SRC, absImage).split(path.sep).join('/')
    const dest = path.join(MEDIA, rel)
    if (!copiedMedia.has(dest) && fs.existsSync(absImage)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(absImage, dest)
        copiedMedia.add(dest)
    }
    return '/changelog-media/' + rel
}

function rewrite(body, absFile) {
    const dir = path.dirname(absFile)
    body = body.replace(/(!\[[^\]]*\]\()([^)\s]+)(\s+"[^"]*")?(\))/g, (full, pre, target, title, post) => {
        if (/^(https?:|data:|\/)/.test(target)) return full
        const p = target.split(/[#?]/)[0]
        const abs = path.resolve(dir, p)
        if (!fs.existsSync(abs)) return full
        return pre + copyMedia(abs) + (title || '') + post
    })
    body = body.replace(/(\]\()([^)\s]+)(\))/g, (full, pre, target, post) => {
        if (/^(https?:|mailto:|#|\/)/.test(target)) return full
        const m = target.match(/^([^#?]*)([#?].*)?$/)
        if (!/\.md$/i.test(m[1])) return full
        const abs = path.resolve(dir, m[1])
        return pre + entryRoute(abs) + (m[2] || '') + post
    })
    return body
}

fs.rmSync(CONTENT, { recursive: true, force: true })
fs.rmSync(MEDIA, { recursive: true, force: true })

const entryFiles = walk(SRC)
const cards = []
const migratedSources = []

for (const absFile of entryFiles) {
    const rel = path.relative(SRC, absFile).split(path.sep).join('/')
    const raw = fs.readFileSync(absFile, 'utf-8')
    const { data } = parseFrontmatter(raw)
    const dest = path.join(CONTENT, rel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, rewrite(raw, absFile))
    migratedSources.push(path.relative(REPO, absFile).split(path.sep).join('/'))
    cards.push({
        type: 'changelog',
        path: entryContentPath(absFile),
        url: entryRoute(absFile),
        title: data.title || '',
        date: data.date ? new Date(data.date).toISOString() : null,
        authors: data.authors || [],
        description: data.description || data.subtitle || '',
        subtitle: data.subtitle || '',
        issues: data.issues || [],
    })
}

// ---- blog posts tagged `changelog` (rendered as summary cards) ----------
function asArray(t) { return Array.isArray(t) ? t : t ? [t] : [] }
for (const absFile of walk(BLOG)) {
    const { data } = parseFrontmatter(fs.readFileSync(absFile, 'utf-8'))
    if (!asArray(data.tags).includes('changelog')) continue
    const rel = path.relative(BLOG, absFile).split(path.sep).join('/')
    cards.push({
        type: 'post',
        url: '/blog/' + rel.replace(/\.md$/, '') + '/',
        title: data.title || '',
        date: data.date ? new Date(data.date).toISOString() : null,
        authors: data.authors || [],
        description: data.description || data.subtitle || data.excerpt || '',
    })
}

// Newest first (11ty: reverse: true over a date-ascending collection).
cards.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

// ---- team author names --------------------------------------------------
const team = {}
const teamDir = path.join(REPO, 'src/_data/team')
function loadTeam(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.isDirectory()) { loadTeam(path.join(dir, e.name)); continue }
        if (!e.name.endsWith('.json')) continue
        try {
            const d = JSON.parse(fs.readFileSync(path.join(dir, e.name), 'utf-8'))
            team[e.name.replace(/\.json$/, '')] = { name: d.name || '', title: d.title || '' }
        } catch {}
    }
}
if (fs.existsSync(teamDir)) loadTeam(teamDir)

// ---- routes: entries + pagination + feed --------------------------------
const pageCount = Math.max(1, Math.ceil(cards.length / PAGE_SIZE))
const routes = []
for (const c of cards) if (c.type === 'changelog') routes.push(c.url.replace(/\/$/, ''))
routes.push('/changelog') // page 0
for (let i = 1; i < pageCount; i++) routes.push('/changelog/' + i)
routes.push('/changelog/index.xml')

fs.writeFileSync(INDEX_FILE, JSON.stringify({ pageSize: PAGE_SIZE, pageCount, cards }, null, 2) + '\n')
fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes.sort(), null, 2) + '\n')
fs.writeFileSync(TEAM_FILE, JSON.stringify(team, null, 2) + '\n')
fs.writeFileSync(MIGRATED_SOURCES_FILE, JSON.stringify(migratedSources.sort(), null, 2) + '\n')

console.log(`copy_changelog: ${entryFiles.length} entries -> nuxt/content/changelog`)
console.log(`copy_changelog: ${cards.length} cards (${cards.length - entryFiles.length} blog posts) -> ${pageCount} index pages`)
console.log(`copy_changelog: ${copiedMedia.size} images, ${Object.keys(team).length} team members`)
console.log(`copy_changelog: ${routes.length} prerender routes`)
