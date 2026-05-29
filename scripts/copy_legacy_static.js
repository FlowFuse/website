// Places the few pages/files that 11ty generated but cannot be reproduced
// natively without Eleventy:
//   - 4 "straggler" pages whose URLs the Nuxt prerenderer cannot emit
//     (literal spaces in the path, or .njk-only templates):
//       /handbook/engineering/product/features/
//       /handbook/engineering/product/product swimlanes/
//       /handbook/sales/subscription-agreement-1.5/
//       /webinars/2025/live-from-the-shop-floor-...-revolution-pi/
//   - /404.html and /llms.txt
// Their final rendered HTML is committed under nuxt/legacy-static/ and copied
// verbatim into nuxt/public so the routes still resolve after 11ty removal.
//
// Also regenerates /_redirects from src/redirects.njk (its body is static, no
// templating) so the Netlify redirect rules are preserved.
const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const LEGACY = path.join(ROOT, 'nuxt', 'legacy-static')
const PUBLIC = path.join(ROOT, 'nuxt', 'public')

function walk(dir, out = []) {
    if (!fs.existsSync(dir)) return out
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full, out)
        else out.push(full)
    }
    return out
}

let count = 0
for (const f of walk(LEGACY)) {
    const rel = path.relative(LEGACY, f)
    const to = path.join(PUBLIC, rel)
    fs.mkdirSync(path.dirname(to), { recursive: true })
    fs.copyFileSync(f, to)
    count++
}

// _redirects: strip the YAML frontmatter from src/redirects.njk (the body is
// a static Netlify redirects file with no Nunjucks templating).
const redirectsSrc = path.join(ROOT, 'src', 'redirects.njk')
if (fs.existsSync(redirectsSrc)) {
    const raw = fs.readFileSync(redirectsSrc, 'utf8')
    const body = raw.replace(/^---[\s\S]*?---\r?\n/, '')
    fs.writeFileSync(path.join(PUBLIC, '_redirects'), body)
    count++
}

console.log(`copy_legacy_static: ${count} files into nuxt/public`)
