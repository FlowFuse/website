#!/usr/bin/env node
// Migrate the ebooks cluster from 11ty (src/ebooks, layouts/ebook.njk) to Nuxt.
//
// Produces under nuxt/:
//   content/ebooks/<slug>.md   - ebook markdown bodies
//   ebooks.index.json          - per-page metadata (title/images/contentTable/
//                                hubspot) keyed by url
//   ebooks.routes.json         - prerender routes
//
// URL parity: src/ebooks/<slug>.md -> /ebooks/<slug>/
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src/ebooks')
const CONTENT = path.join(REPO, 'nuxt/content/ebooks')
const INDEX_FILE = path.join(REPO, 'nuxt/ebooks.index.json')
const ROUTES_FILE = path.join(REPO, 'nuxt/ebooks.routes.json')

function parseFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!m) return { data: {}, body: raw }
    let data = {}
    try { data = yaml.load(m[1]) || {} } catch { data = {} }
    return { data, body: m[2] }
}

// src/ebooks/<file> relative paths like ../images/.. resolve under src/, served
// from the public root. Normalise to an absolute /images/... URL.
function absImage(p) {
    if (!p) return ''
    if (/^(https?:|\/)/.test(p)) return p
    const resolved = path.resolve(SRC, p) // e.g. <repo>/src/images/dashboard/x.gif
    const rel = path.relative(path.join(REPO, 'src'), resolved).split(path.sep).join('/')
    return '/' + rel
}

fs.rmSync(CONTENT, { recursive: true, force: true })
fs.mkdirSync(CONTENT, { recursive: true })

const ebooks = []
for (const name of fs.readdirSync(SRC)) {
    if (!name.endsWith('.md')) continue
    const slug = name.replace(/\.md$/, '')
    const url = `/ebooks/${slug}/`
    const raw = fs.readFileSync(path.join(SRC, name), 'utf-8')
    const { data } = parseFrontmatter(raw)
    fs.writeFileSync(path.join(CONTENT, name), raw)
    ebooks.push({
        slug,
        url,
        title: (data.meta && data.meta.title) || '',
        contentTitle: data.contentTitle || (data.meta && data.meta.title) || '',
        description: (data.meta && data.meta.description) || '',
        image: absImage(data.image || ''),
        coverImage: absImage(data.coverImage || data.image || ''),
        secondaryImage: absImage(data.secondaryImage || ''),
        tertiaryImage: absImage(data.tertiaryImage || ''),
        contentTable: data.contentTable || [],
        hubspotFormId: (data.hubspot && data.hubspot.formId) || '',
    })
}

ebooks.sort((a, b) => a.slug.localeCompare(b.slug))
const routes = ebooks.map((e) => e.url.replace(/\/$/, ''))
fs.writeFileSync(INDEX_FILE, JSON.stringify({ ebooks }, null, 2) + '\n')
fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes.sort(), null, 2) + '\n')

console.log(`copy_ebooks: ${ebooks.length} ebooks, ${routes.length} routes`)
