#!/usr/bin/env node
// Migrate the webinars + ask-me-anything clusters from 11ty to native Nuxt.
//
// Both share the legacy layouts/webinar.njk template and the tag-based `event`
// collection that drives the /webinars/ index. They are migrated together.
//
// Produces under nuxt/:
//   content/webinars/<year>/<slug>.md      - webinar markdown bodies
//   content/ask-me-anything/<slug>.md       - AMA markdown bodies
//   public/events-media/**                  - any relative images referenced
//   events.index.json                       - per-page metadata (date/time/hosts/
//                                             hubspot/video/image) keyed by url,
//                                             since @nuxt/content does not surface
//                                             arbitrary frontmatter without a schema
//   events.routes.json                      - prerender routes (index + all pages)
//
// URL parity:
//   src/webinars/<year>/<slug>.md   -> /webinars/<year>/<slug>/
//   src/ask-me-anything/<slug>.md   -> /ask-me-anything/<slug>/
//   index                           -> /webinars/
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const REPO = path.resolve(__dirname, '..')
const WEBINARS_SRC = path.join(REPO, 'src/webinars')
const AMA_SRC = path.join(REPO, 'src/ask-me-anything')
const CONTENT = path.join(REPO, 'nuxt/content')
const MEDIA = path.join(REPO, 'nuxt/public/events-media')
const INDEX_FILE = path.join(REPO, 'nuxt/events.index.json')
const ROUTES_FILE = path.join(REPO, 'nuxt/events.routes.json')

// --- people (team + guests), keyed by file slug, matching src/_data/eleventyComputed people ---
function loadPeople(dir) {
    const out = {}
    if (!fs.existsSync(dir)) return out
    for (const name of fs.readdirSync(dir)) {
        if (!name.endsWith('.json')) continue
        try { out[name.replace(/\.json$/, '')] = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf-8')) } catch {}
    }
    return out
}
const PEOPLE = { ...loadPeople(path.join(REPO, 'src/_data/team')), ...loadPeople(path.join(REPO, 'src/_data/guests')) }

// Mirror the legacy renderTeamMember shortcode: missing -> FlowFuse fallback card.
function resolveHost(slug) {
    const p = PEOPLE[slug]
    if (!p) return { name: 'FlowFuse', title: '', headshot: '/images/flowfuse-icon.png' }
    return {
        name: p.name || 'FlowFuse',
        title: p.title || '',
        headshot: p.headshot ? `/images/team/headshot-${p.headshot}` : '/images/flowfuse-icon.png',
    }
}

// Mirror the legacy shortDate filter: spacetime '{date} {month-short}, {year}'.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function shortDate(d) {
    const dt = new Date(d)
    return `${dt.getUTCDate()} ${MONTHS[dt.getUTCMonth()]}, ${dt.getUTCFullYear()}`
}

// Mirror the legacy duration filter.
function durationFmt(mins) {
    if (mins > 60) {
        const hrs = Math.floor(mins / 60)
        return `${hrs}h ${mins % 60}m`
    }
    return `${mins} mins`
}

function parseFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!m) return { data: {}, body: raw }
    let data = {}
    try { data = yaml.load(m[1]) || {} } catch { data = {} }
    return { data, body: m[2] }
}

const copiedMedia = new Set()
function copyMedia(absImage) {
    const rel = path.relative(REPO, absImage).split(path.sep).join('/').replace(/^src\//, '')
    const dest = path.join(MEDIA, rel)
    if (!copiedMedia.has(dest) && fs.existsSync(absImage)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(absImage, dest)
        copiedMedia.add(dest)
    }
    return '/events-media/' + rel
}

// Rewrite relative image and .md links in the body. Absolute (/...) and external
// links are left untouched.
function rewrite(body, absFile, urlForSlug) {
    const dir = path.dirname(absFile)
    body = body.replace(/(!\[[^\]]*\]\()([^)\s]+)(\s+"[^"]*")?(\))/g, (full, pre, target, title, post) => {
        if (/^(https?:|data:|\/)/.test(target)) return full
        const p = target.split(/[#?]/)[0]
        const abs = path.resolve(dir, p)
        if (!fs.existsSync(abs)) return full
        return pre + copyMedia(abs) + (title || '') + post
    })
    body = body.replace(/(\]\()([^)\s]+)(\))/g, (full, pre, target, post) => {
        if (/^([a-z][\w+.-]*:|#|\/)/i.test(target)) return full
        const m = target.match(/^([^#?]*)([#?].*)?$/)
        if (!m[1]) return full
        if (/\.md$/i.test(m[1])) {
            const slug = path.basename(m[1], '.md')
            return pre + urlForSlug(slug) + (m[2] || '') + post
        }
        // Relative downloadable asset (e.g. a .zip attachment) beside the
        // content: copy it through and serve it from /events-media/.
        const abs = path.resolve(dir, m[1])
        if (/\.[a-z0-9]+$/i.test(m[1]) && fs.existsSync(abs)) {
            return pre + copyMedia(abs) + (m[2] || '') + post
        }
        return full
    })
    return body
}

function walkMd(dir) {
    const out = []
    if (!fs.existsSync(dir)) return out
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const abs = path.join(dir, entry.name)
        if (entry.isDirectory()) out.push(...walkMd(abs))
        else if (entry.name.endsWith('.md')) out.push(abs)
    }
    return out
}

function entryMeta(data, url, type) {
    return {
        type,
        url,
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: (data.meta && data.meta.description) || data.description || '',
        image: data.image || '',
        date: data.date ? new Date(data.date).toISOString() : null,
        shortDate: data.date ? shortDate(data.date) : '',
        time: data.time || '',
        duration: data.duration != null ? durationFmt(data.duration) : '',
        video: data.video || '',
        hubspotFormId: (data.hubspot && data.hubspot.formId) || '',
        hubspotDownloadFormId: (data.hubspot && data.hubspot.downloadFormId) || '',
        hosts: (data.hosts || []).map(resolveHost),
    }
}

fs.rmSync(path.join(CONTENT, 'webinars'), { recursive: true, force: true })
fs.rmSync(path.join(CONTENT, 'ask-me-anything'), { recursive: true, force: true })
fs.rmSync(MEDIA, { recursive: true, force: true })

const events = []
const skipped = []

// Webinars: preserve <year>/<slug> structure. A directory-index (index.md)
// maps to the directory URL (drops the trailing /index), matching 11ty.
for (const abs of walkMd(WEBINARS_SRC)) {
    const rel = path.relative(WEBINARS_SRC, abs).split(path.sep).join('/') // year/slug(/index).md
    const noExt = rel.replace(/\.md$/, '')
    const slugPath = noExt.replace(/\/index$/, '')
    const url = `/webinars/${slugPath}/`
    // The Nuxt prerenderer cannot resolve routes containing unsafe characters
    // (e.g. a literal space). 11ty still builds these into the static output,
    // so route parity is preserved; skip them here. Mirrors the handbook
    // unsafe-char handling.
    if (/[\s]/.test(url)) { skipped.push(url); continue }
    const raw = fs.readFileSync(abs, 'utf-8')
    const { data } = parseFrontmatter(raw)
    const dest = path.join(CONTENT, 'webinars', rel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, rewrite(raw, abs, (slug) => `/webinars/${path.dirname(slugPath)}/${slug}/`))
    events.push(entryMeta(data, url, 'webinar'))
}

// AMAs: flat slug.
for (const abs of walkMd(AMA_SRC)) {
    const name = path.basename(abs)
    const slug = name.replace(/\.md$/, '')
    const url = `/ask-me-anything/${slug}/`
    const raw = fs.readFileSync(abs, 'utf-8')
    const { data } = parseFrontmatter(raw)
    const dest = path.join(CONTENT, 'ask-me-anything', name)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, rewrite(raw, abs, (s) => `/ask-me-anything/${s}/`))
    events.push(entryMeta(data, url, 'ama'))
}

// Date-desc for indexing.
events.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const routes = ['/webinars', ...events.map((e) => e.url.replace(/\/$/, ''))]
fs.writeFileSync(INDEX_FILE, JSON.stringify({ events }, null, 2) + '\n')
fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes.sort(), null, 2) + '\n')

const nWebinars = events.filter((e) => e.type === 'webinar').length
const nAma = events.filter((e) => e.type === 'ama').length
console.log(`copy_events: ${nWebinars} webinars, ${nAma} AMAs, ${copiedMedia.size} images, ${routes.length} routes` +
    (skipped.length ? `, ${skipped.length} left on 11ty (unsafe chars): ${skipped.join(', ')}` : ''))
