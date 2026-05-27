#!/usr/bin/env node
// Migrate the customer-stories cluster from 11ty (src/customer-stories) to Nuxt.
//
// Produces under nuxt/:
//   content/customer-stories/*.md        - the 10 story markdown bodies
//                                           (relative .md links + images rewritten)
//   public/customer-stories-media/**      - any relative images referenced
//   customer-stories.index.json           - story metadata (frontmatter) for the
//                                           index grid + per-story sidebar, since
//                                           @nuxt/content does not surface nested
//                                           custom frontmatter without a schema.
//   customer-stories.routes.json          - prerender routes (index + 10 stories)
//   customer-stories.migrated-sources.json- files for .eleventy.js to ignore
//
// URL parity: src/customer-stories/<slug>.md -> /customer-stories/<slug>/ ;
//             index -> /customer-stories/
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src/customer-stories')
const CONTENT = path.join(REPO, 'nuxt/content/customer-stories')
const MEDIA = path.join(REPO, 'nuxt/public/customer-stories-media')
const INDEX_FILE = path.join(REPO, 'nuxt/customer-stories.index.json')
const ROUTES_FILE = path.join(REPO, 'nuxt/customer-stories.routes.json')
const MIGRATED_SOURCES_FILE = path.join(REPO, 'nuxt/customer-stories.migrated-sources.json')

function parseFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!m) return { data: {}, body: raw }
    let data = {}
    try { data = yaml.load(m[1]) || {} } catch { data = {} }
    return { data, body: m[2] }
}

const storyRoute = (slug) => `/customer-stories/${slug}/`

const copiedMedia = new Set()
function copyMedia(absImage) {
    const rel = path.relative(SRC, absImage).split(path.sep).join('/')
    const dest = path.join(MEDIA, rel)
    if (!copiedMedia.has(dest) && fs.existsSync(absImage)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(absImage, dest)
        copiedMedia.add(dest)
    }
    return '/customer-stories-media/' + rel
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
        const slug = path.basename(m[1], '.md')
        return pre + storyRoute(slug) + (m[2] || '') + post
    })
    return body
}

fs.rmSync(CONTENT, { recursive: true, force: true })
fs.rmSync(MEDIA, { recursive: true, force: true })
fs.mkdirSync(CONTENT, { recursive: true })

const stories = []
const migrated = []
for (const name of fs.readdirSync(SRC)) {
    if (!name.endsWith('.md')) continue
    const abs = path.join(SRC, name)
    const slug = name.replace(/\.md$/, '')
    const raw = fs.readFileSync(abs, 'utf-8')
    const { data } = parseFrontmatter(raw)
    fs.writeFileSync(path.join(CONTENT, name), rewrite(raw, abs))
    migrated.push(`src/customer-stories/${name}`)
    const s = data.story || {}
    stories.push({
        slug,
        url: storyRoute(slug),
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || '',
        image: data.image || '',
        logo: data.logo || s.logo || '',
        date: data.date ? new Date(data.date).toISOString() : null,
        story: {
            brand: s.brand || '',
            url: s.url || '',
            logo: s.logo || '',
            quote: s.quote || '',
            challenge: s.challenge || '',
            solution: s.solution || '',
            products: s.products || [],
        },
    })
}

stories.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const routes = ['/customer-stories', ...stories.map((s) => s.url.replace(/\/$/, ''))]
fs.writeFileSync(INDEX_FILE, JSON.stringify({ stories }, null, 2) + '\n')
fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes.sort(), null, 2) + '\n')
fs.writeFileSync(MIGRATED_SOURCES_FILE, JSON.stringify(migrated.sort(), null, 2) + '\n')

console.log(`copy_customer_stories: ${stories.length} stories, ${copiedMedia.size} images, ${routes.length} routes`)
