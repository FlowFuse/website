#!/usr/bin/env node
// Copy the product docs markdown from the legacy 11ty tree (src/docs) into the
// Nuxt Content tree (nuxt/content/docs), mirroring scripts/copy_handbook.js.
//
// src/docs is itself generated at build time by scripts/copy_docs.js from the
// external FlowFuse repo (../flowfuse/docs); run that first.
//
//   - relative `.md` links  -> absolute `/docs/...` route URLs (trailing /)
//   - relative image paths  -> absolute `/docs-media/...` URLs, and the
//                              referenced image is copied into nuxt/public.
//   - `navTitle` is promoted to `title` so the sidebar nav + <title> resolve.
//   - redirect pages (`layout: redirect`) keep their route but the served page
//     performs the client redirect (captured in docs.index.json).
//
// URL parity is the hard constraint: a file maps to the same route 11ty served
//   src/docs/index.md       -> /docs/
//   src/docs/a/b.md         -> /docs/a/b/
//   src/docs/a/index.md     -> /docs/a/
const fs = require('fs')
const path = require('path')

const SRC = path.resolve(__dirname, '../src/docs')
const CONTENT = path.resolve(__dirname, '../nuxt/content/docs')
const PUBLIC_MEDIA = path.resolve(__dirname, '../nuxt/public/docs-media')
const ROUTES_FILE = path.resolve(__dirname, '../nuxt/docs.routes.json')
const INDEX_FILE = path.resolve(__dirname, '../nuxt/docs.index.json')

function fileToRoute(absFile) {
    let rel = path.relative(SRC, absFile).split(path.sep).join('/')
    if (rel === 'index.md') return '/docs/'
    if (rel.endsWith('/index.md')) return '/docs/' + rel.slice(0, -'index.md'.length)
    return '/docs/' + rel.slice(0, -'.md'.length) + '/'
}

function fileToContentPath(absFile) {
    const route = fileToRoute(absFile)
    return route === '/docs/' ? '/docs' : route.replace(/\/$/, '')
}

const mdFiles = []
const skipped = []
function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walk(full)
        } else if (entry.name.endsWith('.md')) {
            const rel = path.relative(SRC, full)
            if (/[ %?#]/.test(rel)) {
                skipped.push(rel)
                continue
            }
            mdFiles.push(full)
        }
    }
}
walk(SRC)

function splitTarget(target) {
    const m = target.match(/^([^#?]*)([#?].*)?$/)
    return { p: m[1], suffix: m[2] || '' }
}

const copiedMedia = new Set()
function copyMedia(absImage) {
    const rel = path.relative(SRC, absImage).split(path.sep).join('/')
    const dest = path.join(PUBLIC_MEDIA, rel)
    if (!copiedMedia.has(dest) && fs.existsSync(absImage)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(absImage, dest)
        copiedMedia.add(dest)
    }
    return '/docs-media/' + rel
}

// Blank lines inside the docs-index `ff-*-tiles` HTML containers (e.g. after a
// multi-line inline SVG) terminate the markdown HTML block, so the deeply
// indented continuation gets parsed as indented code blocks and renders as
// stray <pre> of raw HTML. Drop blank lines within those containers so the
// block stays intact and renders as the intended card grid.
function stripBlankLinesInTileBlocks(body) {
    const out = []
    let inTiles = false
    let depth = 0
    for (const line of body.split('\n')) {
        if (!inTiles && /^\s*<div\s+class="ff-(offering|product-feature)-tiles/.test(line)) {
            inTiles = true
            depth = 0
        }
        if (inTiles) {
            if (line.trim() === '') continue
            out.push(line)
            depth += (line.match(/<div\b/g) || []).length
            depth -= (line.match(/<\/div>/g) || []).length
            if (depth <= 0) inTiles = false
        } else {
            out.push(line)
        }
    }
    return out.join('\n')
}

function rewriteLinks(body, absFile) {
    const dir = path.dirname(absFile)
    body = stripBlankLinesInTileBlocks(body)

    // Images: ![alt](target "title")
    body = body.replace(/(!\[[^\]]*\]\()([^)\s]+)(\s+"[^"]*")?(\))/g, (full, pre, target, title, post) => {
        if (/^(https?:|data:|\/)/.test(target)) return full
        const { p, suffix } = splitTarget(target)
        const abs = path.resolve(dir, p)
        if (!fs.existsSync(abs)) return full
        return pre + copyMedia(abs) + suffix + (title || '') + post
    })

    // Links: [text](target) where target is a relative .md
    body = body.replace(/(\]\()([^)\s]+)(\))/g, (full, pre, target, post) => {
        if (/^(https?:|mailto:|#|\/)/.test(target)) return full
        const { p, suffix } = splitTarget(target)
        if (!/\.md$/i.test(p)) return full
        const abs = path.resolve(dir, p)
        return pre + fileToRoute(abs) + suffix + post
    })

    return body
}

// Minimal frontmatter parse: returns { fm: rawYamlLines[], body }.
function splitFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!m) return { fmLines: [], body: raw }
    return { fmLines: m[1].split(/\r?\n/), body: m[2] }
}

// Pull a top-level scalar (navTitle:, navGroup:, navOrder:) from frontmatter lines.
function scalar(fmLines, key) {
    const re = new RegExp(`^${key}:\\s*(.+?)\\s*$`)
    for (const line of fmLines) {
        const mm = line.match(re)
        if (mm) return mm[1].replace(/^['"]|['"]$/g, '')
    }
    return undefined
}

// Pull redirect.to (nested under `redirect:`) from frontmatter lines.
function redirectTo(fmLines) {
    let inRedirect = false
    for (const line of fmLines) {
        if (/^redirect:\s*$/.test(line)) { inRedirect = true; continue }
        if (inRedirect) {
            const mm = line.match(/^\s+to:\s*(.+?)\s*$/)
            if (mm) return mm[1].replace(/^['"]|['"]$/g, '')
            if (/^\S/.test(line)) inRedirect = false
        }
        // single-line form: redirect: { to: ... }
        const inline = line.match(/^redirect:\s*\{\s*to:\s*([^}]+?)\s*\}/)
        if (inline) return inline[1].replace(/^['"]|['"]$/g, '')
    }
    return undefined
}

fs.rmSync(CONTENT, { recursive: true, force: true })
fs.rmSync(PUBLIC_MEDIA, { recursive: true, force: true })

const routes = []
const index = {}
let redirectCount = 0
for (const absFile of mdFiles) {
    const contentRel = path.relative(SRC, absFile).split(path.sep).join('/')
    const dest = path.join(CONTENT, contentRel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })

    const raw = fs.readFileSync(absFile, 'utf-8')
    const { fmLines, body: rawBody } = splitFrontmatter(raw)
    const navTitle = scalar(fmLines, 'navTitle')
    const navGroup = scalar(fmLines, 'navGroup')
    const navOrderRaw = scalar(fmLines, 'navOrder')
    const navOrder = navOrderRaw !== undefined ? Number(navOrderRaw) : undefined
    const redir = redirectTo(fmLines)

    const route = fileToRoute(absFile)
    const contentPath = fileToContentPath(absFile)

    // Promote navTitle -> title so @nuxt/content's nav + page title resolve,
    // unless a title is already present.
    const hasTitle = fmLines.some((l) => /^title:\s*/.test(l))
    const extra = []
    if (!hasTitle && navTitle) extra.push(`title: ${JSON.stringify(navTitle)}`)

    const newFm = ['---', ...fmLines.filter((l) => l.length), ...extra, '---', '']
    const body = rewriteLinks(newFm.join('\n') + rawBody, absFile)
    fs.writeFileSync(dest, body)

    routes.push(contentPath)
    const entry = {}
    if (navTitle) entry.navTitle = navTitle
    if (navGroup) entry.navGroup = navGroup
    if (navOrder !== undefined && !Number.isNaN(navOrder)) entry.navOrder = navOrder
    if (redir) { entry.redirect = redir; redirectCount++ }
    index[route] = entry
}

routes.sort()
fs.mkdirSync(path.dirname(ROUTES_FILE), { recursive: true })
fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes, null, 2) + '\n')
fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2) + '\n')

console.log(`copy_docs_nuxt: ${mdFiles.length} markdown pages -> nuxt/content/docs`)
console.log(`copy_docs_nuxt: ${copiedMedia.size} images -> nuxt/public/docs-media`)
console.log(`copy_docs_nuxt: ${redirectCount} redirect pages`)
console.log(`copy_docs_nuxt: ${routes.length} routes -> ${path.relative(process.cwd(), ROUTES_FILE)}`)
if (skipped.length) {
    console.log(`copy_docs_nuxt: ${skipped.length} page(s) skipped (unsafe URL chars): ${skipped.join(', ')}`)
}
