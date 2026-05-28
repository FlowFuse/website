// Generates sitemap.xml from the final static build (nuxt/.output/public),
// replacing the 11ty src/sitemap.njk. Walks the emitted .html files, maps them
// to their URLs (same logic as migration/extract-routes.mjs), and writes the
// sitemap into the output directory. Run as the last build step, after
// `nuxt generate`.
const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'nuxt', '.output', 'public')
const BASE = 'https://flowfuse.com'

if (!fs.existsSync(OUT)) {
    console.error('gen_sitemap: nuxt/.output/public not found; run after nuxt generate')
    process.exit(0)
}

function walk(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full, out)
        else if (entry.name.endsWith('.html')) out.push(full)
    }
    return out
}

const routes = new Set()
for (const f of walk(OUT)) {
    const rel = path.relative(OUT, f).split(path.sep).join('/')
    if (rel === '200.html' || rel === '404.html') continue
    let route
    if (rel === 'index.html') route = '/'
    else if (rel.endsWith('/index.html')) route = '/' + rel.slice(0, -'index.html'.length)
    else route = '/' + rel.slice(0, -'.html'.length)
    routes.add(route)
}

const lastmod = new Date().toISOString()
const urls = [...routes].sort().map((r) => {
    const loc = `${BASE}${r}`.replace(/&/g, '&amp;')
    const priority = r === '/' ? '1.0' : '0.6'
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
})
urls.push(`  <url>\n    <loc>https://app.flowfuse.com/account/create/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>0.9</priority>\n  </url>`)

const xml = `<?xml version="1.0" encoding="utf-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), xml)
console.log(`gen_sitemap: wrote sitemap.xml with ${routes.size + 1} urls`)
