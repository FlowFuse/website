#!/usr/bin/env node
// Copy the handbook markdown from the legacy 11ty tree (src/handbook) into the
// Nuxt Content tree (nuxt/content/handbook), rewriting the relative links and
// images that 11ty used to rewrite at build time so they resolve as plain
// markdown under Nuxt Content.
//
//   - relative `.md` links  -> absolute `/handbook/...` route URLs (trailing /)
//   - relative image paths  -> absolute `/handbook-media/...` URLs, and the
//                              referenced image is copied into nuxt/public.
//
// URL parity is the hard constraint: a file maps to the same route 11ty served
//   src/handbook/index.md            -> /handbook/
//   src/handbook/a/b.md              -> /handbook/a/b/
//   src/handbook/a/index.md          -> /handbook/a/
//
// Two handbook routes are .njk templates, not markdown, and stay on 11ty:
//   /handbook/engineering/product/features/  (features.njk)
//   /handbook/sales/subscription-agreement-1.5/  (subscription-agreement-1.5.njk)
const fs = require('fs')
const path = require('path')

const SRC = path.resolve(__dirname, '../src/handbook')
const CONTENT = path.resolve(__dirname, '../nuxt/content/handbook')
const PUBLIC_MEDIA = path.resolve(__dirname, '../nuxt/public/handbook-media')
const ROUTES_FILE = path.resolve(__dirname, '../nuxt/handbook.routes.json')
const REPO_ROOT = path.resolve(__dirname, '..')
// Source files Nuxt now owns; .eleventy.js reads this to stop 11ty rebuilding them.
const MIGRATED_SOURCES_FILE = path.resolve(__dirname, '../nuxt/handbook.migrated-sources.json')

// Map an absolute src/handbook/*.md file path to the route 11ty served.
function fileToRoute(absFile) {
    let rel = path.relative(SRC, absFile).split(path.sep).join('/')
    if (rel === 'index.md') return '/handbook/'
    if (rel.endsWith('/index.md')) return '/handbook/' + rel.slice(0, -'index.md'.length)
    return '/handbook/' + rel.slice(0, -'.md'.length) + '/'
}

// Map an absolute src/handbook/*.md file to its Nuxt Content path (no trailing /).
function fileToContentPath(absFile) {
    const route = fileToRoute(absFile)
    return route === '/handbook/' ? '/handbook' : route.replace(/\/$/, '')
}

const mdFiles = []
const skipped = []
function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            if (entry.name === 'images' || entry.name === 'media') continue
            walk(full)
        } else if (entry.name.endsWith('.md')) {
            // Routes containing spaces (or other characters Nuxt's prerenderer
            // cannot resolve) are left on 11ty to preserve their exact URL.
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

// Split a markdown link target into path + suffix (#anchor or ?query).
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
    return '/handbook-media/' + rel
}

function rewriteLinks(body, absFile) {
    const dir = path.dirname(absFile)

    // Images: ![alt](target "title")
    body = body.replace(/(!\[[^\]]*\]\()([^)\s]+)(\s+"[^"]*")?(\))/g, (full, pre, target, title, post) => {
        if (/^(https?:|data:|\/)/.test(target)) return full // absolute or remote
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

// Reset the content + media output dirs so removed source files don't linger.
fs.rmSync(CONTENT, { recursive: true, force: true })
fs.rmSync(PUBLIC_MEDIA, { recursive: true, force: true })

const routes = []
for (const absFile of mdFiles) {
    const contentRel = path.relative(SRC, absFile).split(path.sep).join('/')
    const dest = path.join(CONTENT, contentRel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    const body = rewriteLinks(fs.readFileSync(absFile, 'utf-8'), absFile)
    fs.writeFileSync(dest, body)
    routes.push(fileToContentPath(absFile))
}

routes.sort()
fs.mkdirSync(path.dirname(ROUTES_FILE), { recursive: true })
fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes, null, 2) + '\n')

// Record the repo-relative source files Nuxt now owns so 11ty can ignore them.
const migratedSources = mdFiles
    .map((f) => path.relative(REPO_ROOT, f).split(path.sep).join('/'))
    .sort()
fs.writeFileSync(MIGRATED_SOURCES_FILE, JSON.stringify(migratedSources, null, 2) + '\n')

console.log(`copy_handbook: ${mdFiles.length} markdown pages -> nuxt/content/handbook`)
console.log(`copy_handbook: ${copiedMedia.size} images -> nuxt/public/handbook-media`)
console.log(`copy_handbook: ${routes.length} routes -> ${path.relative(process.cwd(), ROUTES_FILE)}`)
if (skipped.length) {
    console.log(`copy_handbook: ${skipped.length} page(s) left on 11ty (unsafe URL chars): ${skipped.join(', ')}`)
}
