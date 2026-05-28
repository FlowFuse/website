#!/usr/bin/env node
// Post-process generated Nuxt Content markdown so every relative image
// reference points at the absolute path copy_assets serves it from.
//
// Why this exists: the per-cluster copy_*.js scripts each rewrite image paths
// with their own regex, and several gaps slipped through — markdown image
// titles containing embedded quotes (blog), images resolved against the wrong
// base dir (customer-stories, node-red core-node use-cases), and HTML <img>
// tags the markdown-only regexes never matched (docs, handbook). Left relative,
// the browser resolves them against the page URL (e.g. /docs/admin/introduction/
// images/x.png) and 404s, even though copy_assets already published the file at
// its canonical /<path-relative-to-src> URL.
//
// This pass runs AFTER all content copy scripts. It only touches refs that are
// still relative AND resolve to a real file under an `images/` directory in
// src/ (which copy_assets mirrors verbatim into nuxt/public). Illustrative
// placeholders in the "how to write" handbook guides (image.jpg, your-image.png,
// <image>.png …) don't resolve to a real file and are left untouched.
//
// Resolution mirrors 11ty's lib/image-handler.js resolvedImagePath: try the
// markdown file's own directory first, then the src/ root.
const fs = require('node:fs')
const path = require('node:path')

const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src')
const CONTENT = path.join(REPO, 'nuxt/content')

const IMG_EXT = /\.(png|jpe?g|gif|svg|webp|avif)$/i

// Map a relative image target (from a content file whose source dir is srcDir)
// to the public URL copy_assets serves, or null to leave it unchanged.
function mapTarget(target, srcDir) {
    const clean = String(target).split(/[#?]/)[0]
    if (!clean || !IMG_EXT.test(clean)) return null
    if (/^(https?:|data:|mailto:|\/\/|\/)/.test(clean)) return null // already absolute/external

    let stripped = clean.replace(/^\.\//, '')
    const candidates = []
    if (stripped.startsWith('src/')) candidates.push(path.join(REPO, stripped))
    candidates.push(path.resolve(srcDir, clean), path.resolve(SRC, stripped))

    for (const abs of candidates) {
        if (!abs.startsWith(SRC)) continue
        if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) continue
        const relSrc = path.relative(SRC, abs).split(path.sep).join('/')
        // copy_assets only mirrors files that live under an `images/` directory.
        if (!relSrc.split('/').includes('images')) return null
        return '/' + relSrc
    }
    return null
}

const mdFiles = []
;(function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name)
        if (e.isDirectory()) walk(full)
        else if (e.name.endsWith('.md')) mdFiles.push(full)
    }
})(CONTENT)

let filesChanged = 0
let refsRewritten = 0
for (const file of mdFiles) {
    const srcDir = path.join(SRC, path.dirname(path.relative(CONTENT, file)))
    const original = fs.readFileSync(file, 'utf-8')

    let body = original
    // Markdown images: ![alt](target ...) — capture only the target token so a
    // trailing "title" (even one with embedded quotes) or {attrs} stays intact.
    body = body.replace(/(!\[[^\]]*\]\(\s*)([^\s)]+)/g, (full, pre, target) => {
        const url = mapTarget(target, srcDir)
        if (!url) return full
        refsRewritten++
        return pre + url
    })
    // HTML images: <img ... src="target" ...>
    body = body.replace(/(<img\b[^>]*?\ssrc=)(["'])([^"']+)(["'])/gi, (full, pre, q1, target, q2) => {
        const url = mapTarget(target, srcDir)
        if (!url) return full
        refsRewritten++
        return pre + q1 + url + q2
    })

    if (body !== original) {
        fs.writeFileSync(file, body)
        filesChanged++
    }
}

console.log(`normalize_content_images: rewrote ${refsRewritten} relative image ref(s) in ${filesChanged} file(s)`)
