import fs from 'node:fs'

// 1. inline prerender routes from nuxt.config.ts
const cfg = fs.readFileSync('nuxt/nuxt.config.ts', 'utf8')
const m = cfg.match(/routes:\s*\[([\s\S]*?)\],\s*\n\s*crawlLinks/)
const inline = [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]).filter((s) => s.startsWith('/'))

// 2. json route files
const jsons = ['handbook', 'changelog', 'customer-stories', 'events', 'ebooks', 'docs', 'blog', 'integrations', 'node-red']
const native = new Set(inline)
for (const j of jsons) {
    const a = JSON.parse(fs.readFileSync(`nuxt/${j}.routes.json`, 'utf8'))
    a.forEach((r) => native.add(r))
}

const norm = (r) => {
    if (r === '/') return '/'
    if (/\.[a-z0-9]+$/i.test(r)) return r
    return r.endsWith('/') ? r : r + '/'
}
const nativeN = new Set([...native].map(norm))
nativeN.add('/')

const base = fs.readFileSync('migration/routes-11ty.txt', 'utf8').trim().split('\n').map((s) => s.trim()).filter(Boolean)
const only = base.filter((b) => {
    if (b === '/') return false
    const noslash = b.replace(/\/$/, '')
    return !(nativeN.has(b) || nativeN.has(noslash) || nativeN.has(noslash + '/') || native.has(noslash) || native.has(b))
})
console.log('baseline routes:', base.length)
console.log('native nuxt routes:', nativeN.size)
console.log('=== 11ty-ONLY routes (in baseline, NOT produced by nuxt generate) ===')
console.log('count:', only.length)
console.log(only.join('\n'))
