// DIMENSION 4 — ANCHOR REPAIR (post-build).
//
// Port of the legacy 11ty fuzzy anchor-repair (the `rewriteIntegrationLinks`
// filter, .eleventy.js): for an in-page `#fragment` link whose target id does
// not exist, find the real heading id it was meant to reach and rewrite the
// link to it.
//
// 11ty only bridged the period-dropping case (compare ids with `.` removed).
// We generalise this to also bridge the residue that @nuxt/content/MDC's id
// post-processing leaves behind that the slugger plugin cannot pre-empt:
//   - consecutive dashes collapsed   (`step-1---connection` -> `step-1-connection`)
//   - a leading-digit `_` prefix      (`1.-copy...` -> `_1.-copy...`)
//   - any other punctuation differences between the authored fragment and the
//     rendered id
// by matching on a normalised form (lower-cased, all non-alphanumerics removed).
// The repair only ever touches links that are ALREADY broken (the fragment is
// not an exact id on the target page), so working links are never altered.
//
// It is cross-page aware: a `/docs/x/#frag` link is repaired against the ids of
// the /docs/x/ page, not only same-page `#frag` links.
//
// Runs over nuxt/.output/public after `nuxt generate`.
const fs = require('fs')
const path = require('path')

const PUBLIC = path.resolve(__dirname, '..', 'nuxt', '.output', 'public')

function walk (dir, out = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name)
        if (e.isDirectory()) walk(full, out)
        else if (e.name.endsWith('.html')) out.push(full)
    }
    return out
}

// File path -> the route key other pages link to (no trailing slash, no .html).
function routeKey (file) {
    let rel = '/' + path.relative(PUBLIC, file).split(path.sep).join('/')
    rel = rel.replace(/\/index\.html$/i, '').replace(/\.html$/i, '')
    return rel === '' ? '/' : rel
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

const ID_RE = /\sid="([^"]+)"/g
const HREF_RE = /href="([^"]*#[^"]*)"/g

if (!fs.existsSync(PUBLIC)) {
    console.log('repair_anchors: no build output at ' + PUBLIC + ' - skipping')
    process.exit(0)
}

const files = walk(PUBLIC)

// Pass 1: collect every page's ids (exact set + normalised -> exact map).
const pages = new Map() // key -> { ids:Set, normMap:Map }
const content = new Map() // file -> html
for (const file of files) {
    const html = fs.readFileSync(file, 'utf8')
    content.set(file, html)
    const ids = new Set()
    const normMap = new Map()
    let m
    ID_RE.lastIndex = 0
    while ((m = ID_RE.exec(html)) !== null) {
        const id = m[1]
        ids.add(id)
        const n = norm(id)
        if (n && !normMap.has(n)) normMap.set(n, id) // first wins, like 11ty
    }
    pages.set(routeKey(file), { ids, normMap })
}

// Pass 2: repair broken `#fragment` links against the target page's ids.
let repaired = 0
let filesTouched = 0
for (const file of files) {
    let html = content.get(file)
    const selfKey = routeKey(file)
    let changed = false

    html = html.replace(HREF_RE, (full, href) => {
        const hi = href.indexOf('#')
        const before = href.slice(0, hi)
        const frag = href.slice(hi + 1)
        if (!frag) return full

        // Resolve which page this fragment belongs to.
        let target
        if (before === '' || before === selfKey || before === selfKey + '/') {
            target = pages.get(selfKey)
        } else if (before.startsWith('/')) {
            const key = before.replace(/\/$/, '')
            target = pages.get(key) || pages.get(before)
        } else {
            return full // relative cross-page / external - leave alone
        }
        if (!target) return full
        if (target.ids.has(frag)) return full // already valid

        const fix = target.normMap.get(norm(frag))
        if (!fix || fix === frag) return full

        repaired++
        changed = true
        return `href="${before}#${fix}"`
    })

    if (changed) {
        fs.writeFileSync(file, html)
        filesTouched++
    }
}

console.log(`repair_anchors: repaired ${repaired} anchor link(s) across ${filesTouched} file(s)`)
