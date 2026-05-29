// Relocates the static assets that 11ty used to pass through (.eleventy.js
// addPassthroughCopy) into nuxt/public, so the Nuxt build no longer depends on
// Eleventy. Reads from src/ (the asset source of truth) and writes to
// nuxt/public/ preserving paths.
//
// Honours SKIP_IMAGES=true to skip the large src/**/images copy for fast
// iteration (the previously-copied images persist in nuxt/public since
// clean:nuxt no longer wipes it).
const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'src')
const PUBLIC = path.join(ROOT, 'nuxt', 'public')
const SKIP_IMAGES = process.env.SKIP_IMAGES === 'true'

function copyFile(from, to) {
    fs.mkdirSync(path.dirname(to), { recursive: true })
    fs.copyFileSync(from, to)
}

// Recursively collect files under dir matching an optional predicate.
function walk(dir, predicate, out = []) {
    if (!fs.existsSync(dir)) return out
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full, predicate, out)
        else if (!predicate || predicate(full)) out.push(full)
    }
    return out
}

let count = 0

// 1. src/public/ -> nuxt/public/ (favicons, robots.txt, CNAME, browserconfig,
//    safari-pinned-tab, mstile*, apple-touch, android-chrome, .well-known/).
const publicSrc = path.join(SRC, 'public')
for (const f of walk(publicSrc)) {
    const rel = path.relative(publicSrc, f)
    copyFile(f, path.join(PUBLIC, rel))
    count++
}

// 2. src/**/images/**/* -> nuxt/public/<path-relative-to-src>.
//    Always copied: matches 11ty's addPassthroughCopy behaviour, which ran
//    unconditionally regardless of SKIP_IMAGES. The flag is reserved for any
//    future image-optimization pipeline (currently a no-op).
const imageFiles = walk(SRC, (f) => f.split(path.sep).includes('images'))
    for (const f of imageFiles) {
        const rel = path.relative(SRC, f)
        copyFile(f, path.join(PUBLIC, rel))
        count++
    }
    console.log(`copy_assets: copied ${imageFiles.length} image files`)

// 3. Remaining individual passthroughs from .eleventy.js.
const extras = [
    ...walk(path.join(SRC, 'blueprints'), (f) => f.endsWith('flow.json')),
    path.join(SRC, 'events', 'hm25-invite.ics'),
    path.join(SRC, 'webinars', '2025', 'simplifying-opc-ua', 'opc-ua-webinar-flows.zip'),
    path.join(SRC, 'js', 'ai-expert-modal.js'),
    path.join(SRC, 'js', 'hm-promo-banner.js'),
]
for (const f of extras) {
    if (!fs.existsSync(f)) continue
    const rel = path.relative(SRC, f)
    copyFile(f, path.join(PUBLIC, rel))
    count++
}

console.log(`copy_assets: ${count} files into nuxt/public`)
