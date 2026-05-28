#!/usr/bin/env node
// Migrate the node-red learning-resources cluster from 11ty to native Nuxt.
//
// Covers (URL parity is the hard constraint):
//   - the ~70 markdown doc pages under src/node-red/** (layouts/documentation.njk
//     with the eleventyNavigation "learningResources" sidebar)
//   - the data-driven core-nodes catalog (src/_data/coreNodes.json + node help
//     HTML fetched from the node-red GitHub locales + optional *-use-case.md)
//   - the eleventyNavigation sidebar tree (node-red.nav.json)
// The bespoke landing page src/node-red/index.njk is reproduced separately as
// nuxt/pages/node-red/index.vue (it is not a documentation page).
//
// Produces under nuxt/:
//   content/node-red/**.md     - doc pages + generated core-node pages
//   public/node-red-media/**   - referenced images
//   node-red.nav.json          - sidebar tree
//   node-red.routes.json       - prerender routes
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const EleventyFetch = require('@11ty/eleventy-fetch')
const xpath = require('xpath')
const { DOMParser } = require('@xmldom/xmldom')

const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src/node-red')
const INCLUDES = path.join(REPO, 'src/_includes')
const CONTENT = path.join(REPO, 'nuxt/content/node-red')
const PUBLIC_MEDIA = path.join(REPO, 'nuxt/public/node-red-media')
const NAV_FILE = path.join(REPO, 'nuxt/node-red.nav.json')
const ROUTES_FILE = path.join(REPO, 'nuxt/node-red.routes.json')
const CORE_NODES = require('../src/_data/coreNodes.json')
const SIGNUP_URL = 'https://app.flowfuse.com/account/create'

function parseFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!m) return { data: {}, body: raw }
    let data = {}
    try { data = yaml.load(m[1]) || {} } catch { data = {} }
    return { data, body: m[2] }
}

function fileToRoute(absFile) {
    let rel = path.relative(SRC, absFile).split(path.sep).join('/')
    if (rel === 'index.md') return '/node-red/'
    if (rel === 'learn.md') return '/node-red/learn/'
    if (rel.endsWith('/index.md')) return '/node-red/' + rel.slice(0, -'index.md'.length)
    return '/node-red/' + rel.slice(0, -'.md'.length) + '/'
}
const routeToContentPath = (route) => (route === '/node-red/' ? '/node-red' : route.replace(/\/$/, ''))
const slug = (s) => s.toLowerCase().replace(/\s+/g, '-')

// ---- media copy ---------------------------------------------------------
const copiedMedia = new Set()
function copyMedia(absImage) {
    // Map any src/ image to a stable /node-red-media/<path-relative-to-src/node-red>
    let rel
    if (absImage.startsWith(SRC)) {
        rel = path.relative(SRC, absImage)
    } else {
        rel = '_shared/' + path.relative(path.join(REPO, 'src'), absImage)
    }
    rel = rel.split(path.sep).join('/')
    const dest = path.join(PUBLIC_MEDIA, rel)
    if (!copiedMedia.has(dest) && fs.existsSync(absImage)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(absImage, dest)
        copiedMedia.add(dest)
    }
    return '/node-red-media/' + rel
}

function splitTarget(target) {
    const m = target.match(/^([^#?]*)([#?].*)?$/)
    return { p: m[1], suffix: m[2] || '' }
}

// ---- body transform -----------------------------------------------------
// `pageDir` is the directory of the page the body ultimately belongs to, so
// inlined-partial relative paths resolve the same way 11ty's {% include %} does.
function transformBody(body, pageDir) {
    // 1. Inline whitelisted markdown includes (resolved against _includes),
    //    so their content participates in the page's link/image rewriting.
    body = body.replace(/\{%\s*include\s+"((?:hardware\/|core-nodes\/)[^"]+\.md)"\s*%\}/g, (full, inc) => {
        const incPath = path.join(INCLUDES, inc)
        if (fs.existsSync(incPath)) {
            const { body: incBody } = parseFrontmatter(fs.readFileSync(incPath, 'utf-8'))
            return '\n\n' + incBody + '\n\n'
        }
        return ''
    })

    // 2. navigation-items-list include is handled by the caller (needs nav tree);
    //    leave a marker the caller replaces. Here just normalise the tag away if
    //    no marker substitution happened (safety).
    // (handled before calling transformBody — see renderPage)

    // 3. renderFlow paired shortcode -> ::render-flow MDC component.
    body = body.replace(/\{%\s*renderFlow\s*(\d+)?\s*%\}([\s\S]*?)\{%\s*endrenderFlow\s*%\}/g, (full, h, inner) => {
        const height = h ? Number(h) : 200
        const b64 = Buffer.from(inner.trim(), 'utf-8').toString('base64')
        return `\n\n::render-flow\n---\nheight: ${height}\nflow: "${b64}"\n---\n::\n\n`
    })

    // 4. sign-up-url include -> literal app signup URL.
    body = body.replace(/\{%\s*include\s+"sign-up-url\.njk"\s*%\}/g, SIGNUP_URL)

    // 5. Strip any remaining nunjucks tags / expressions.
    body = body.replace(/\{%[\s\S]*?%\}/g, '')

    // 6. Images: ![alt](target "title") -> /node-red-media path.
    body = body.replace(/(!\[[^\]]*\]\()([^)\s]+)(\s+"[^"]*")?(\))/g, (full, pre, target, title, post) => {
        if (/^(https?:|data:|\/)/.test(target)) return full
        const { p, suffix } = splitTarget(target)
        const abs = path.resolve(pageDir, p)
        if (!fs.existsSync(abs)) return full
        return pre + copyMedia(abs) + suffix + (title || '') + post
    })

    // 7. Links: [text](rel.md) -> route URL.
    body = body.replace(/(\]\()([^)\s]+)(\))/g, (full, pre, target, post) => {
        if (/^(https?:|mailto:|#|\/)/.test(target)) return full
        const { p, suffix } = splitTarget(target)
        if (!/\.md$/i.test(p)) return full
        const abs = path.resolve(pageDir, p)
        return pre + fileToRoute(abs) + suffix + post
    })

    return body
}

// ---- collect markdown doc pages ----------------------------------------
const mdFiles = []
;(function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name.startsWith('.')) continue
        const full = path.join(dir, e.name)
        if (e.isDirectory()) {
            if (e.name === 'core-nodes' || e.name === 'images') continue
            walk(full)
        } else if (e.name.endsWith('.md')) {
            mdFiles.push(full)
        }
    }
})(SRC)

const pages = [] // { file, route, contentPath, navKey, parent, order, title, description, body }
for (const file of mdFiles) {
    const raw = fs.readFileSync(file, 'utf-8')
    const { data, body } = parseFrontmatter(raw)
    const nav = data.eleventyNavigation || {}
    const meta = data.meta || {}
    const route = fileToRoute(file)
    pages.push({
        file,
        dir: path.dirname(file),
        route,
        contentPath: routeToContentPath(route),
        navKey: nav.key,
        parent: nav.parent,
        order: nav.order,
        navTitle: nav.title,
        title: meta.title || nav.key || '',
        description: meta.description || '',
        body,
    })
}

// ---- core-node catalog --------------------------------------------------
async function fetchCoreNodeDoc(cat, node) {
    try {
        const url = `https://raw.githubusercontent.com/node-red/node-red/master/packages/node_modules/%40node-red/nodes/locales/en-US/${cat}/${node.file}.html`
        const data = await EleventyFetch(url, { duration: '4h', type: 'text' })
        const doc = new DOMParser({
            locator: {},
            errorHandler: { warning() {}, error() {}, fatalError(e) { console.error(e) } },
        }).parseFromString('<scripts>' + data.toString() + '</scripts>', 'text/xml')
        return xpath.select(`/scripts/script[starts-with(@data-help-name, "${node.xpath}")]/*`, doc).join(' ')
    } catch (e) {
        return ''
    }
}

// De-indent HTML so markdown doesn't treat indented lines as code blocks.
function cleanHelpHtml(html) {
    if (!html) return ''
    return html
        .split('\n')
        .map((l) => l.replace(/^\s+/, ''))
        .join('\n')
}

const coreNodePages = [] // generated like pages but with html body
const coreCategories = Object.keys(CORE_NODES) // common, function, network, parsers, sequence, storage

async function buildCoreNodes() {
    for (const cat of coreCategories) {
        const nodes = CORE_NODES[cat]
        for (const node of nodes) {
            const name = node.name
            const route = `/node-red/core-nodes/${slug(name)}/`
            const useCaseFile = path.join(INCLUDES, 'core-nodes', `${slug(name)}-use-case.md`)
            let useCase = ''
            if (fs.existsSync(useCaseFile)) {
                const { body } = parseFrontmatter(fs.readFileSync(useCaseFile, 'utf-8'))
                useCase = transformBody(body, path.join(INCLUDES, 'core-nodes'))
            }
            const help = cleanHelpHtml(await fetchCoreNodeDoc(cat, node))
            const bodyParts = [`# ${name}`, '']
            if (useCase) bodyParts.push(useCase, '')
            bodyParts.push('## Node Documentation', '')
            if (help) bodyParts.push('<div class="core-node-doc">', '', help, '', '</div>')
            coreNodePages.push({
                route,
                contentPath: routeToContentPath(route),
                navKey: name,
                parent: cat,
                title: `Node-RED - ${name} Node`,
                description: node.description || '',
                body: bodyParts.join('\n'),
            })
        }
    }
}

// ---- nav tree -----------------------------------------------------------
function buildNavTree() {
    // Collect all nav-bearing entries: md pages, core-nodes index, core categories, core nodes.
    const entries = []
    for (const p of pages) {
        if (!p.navKey) continue
        entries.push({ key: p.navKey, parent: p.parent, order: p.order, title: p.navTitle || p.navKey, url: p.route })
    }
    // Core Nodes index page (src/node-red/core-nodes/index.njk: key "Core Nodes", order 4)
    entries.push({ key: 'Core Nodes', parent: undefined, order: 4, title: 'Core Nodes', url: '/node-red/core-nodes/' })
    // Categories (from nav.njk): parent "Core Nodes", url = first node of category
    coreCategories.forEach((cat) => {
        const first = CORE_NODES[cat][0]
        entries.push({
            key: cat,
            parent: 'Core Nodes',
            order: undefined,
            title: cat.charAt(0).toUpperCase() + cat.slice(1),
            url: `/node-red/core-nodes/${slug(first.name)}/`,
        })
    })
    // Core node pages
    for (const c of coreNodePages) {
        entries.push({ key: c.navKey, parent: c.parent, order: undefined, title: c.navKey, url: c.route })
    }

    // Build tree by parent==key.
    const byParent = new Map()
    for (const e of entries) {
        const pk = e.parent || '__root__'
        if (!byParent.has(pk)) byParent.set(pk, [])
        byParent.get(pk).push(e)
    }
    const sortFn = (a, b) => {
        const ao = a.order ?? 999
        const bo = b.order ?? 999
        if (ao !== bo) return ao - bo
        return 0 // preserve insertion order otherwise
    }
    function children(key) {
        const kids = (byParent.get(key) || []).slice().sort(sortFn)
        return kids.map((k) => ({
            title: k.title,
            url: k.url,
            children: children(k.key),
        }))
    }
    return children('__root__')
}

async function main() {
    console.log('copy_node_red: building core-node catalog (fetching node help)...')
    await buildCoreNodes()

    fs.rmSync(CONTENT, { recursive: true, force: true })
    fs.rmSync(PUBLIC_MEDIA, { recursive: true, force: true })
    fs.mkdirSync(CONTENT, { recursive: true })

    // helper: render navigation-items-list children of a given nav key as markdown.
    function navItemsList(parentKey) {
        const kids = pages.filter((p) => p.parent === parentKey)
        const lines = kids.map((k) => `- [${k.title}](${k.route}): ${k.description}`)
        return lines.join('\n')
    }

    const routes = []

    // Write doc pages
    for (const p of pages) {
        let body = p.body
        // Replace navigation-items-list include with rendered child list for this page's key.
        body = body.replace(/\{%\s*include\s+"navigation-items-list\.njk"\s*%\}/g, () => navItemsList(p.navKey))
        body = transformBody(body, p.dir)

        const fm = ['---']
        fm.push(`title: ${JSON.stringify(p.title)}`)
        if (p.description) fm.push(`description: ${JSON.stringify(p.description)}`)
        fm.push('---', '')
        const out = fm.join('\n') + body

        const rel = p.route === '/node-red/' ? 'index.md' : routeToContentPath(p.route).slice('/node-red/'.length) + '.md'
        const dest = path.join(CONTENT, rel)
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.writeFileSync(dest, out)
        routes.push(routeToContentPath(p.route))
    }

    // Write core-node pages
    for (const c of coreNodePages) {
        const fm = ['---', `title: ${JSON.stringify(c.title)}`]
        if (c.description) fm.push(`description: ${JSON.stringify(c.description)}`)
        fm.push('---', '')
        const out = fm.join('\n') + c.body
        const rel = routeToContentPath(c.route).slice('/node-red/'.length) + '.md'
        const dest = path.join(CONTENT, rel)
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.writeFileSync(dest, out)
        routes.push(routeToContentPath(c.route))
    }
    // core-nodes index page (the landing for /node-red/core-nodes/)
    {
        const indexNjk = fs.readFileSync(path.join(SRC, 'core-nodes/index.njk'), 'utf-8')
        const { body } = parseFrontmatter(indexNjk)
        const out = ['---', 'title: "Node-RED Core Nodes"', '---', '', body].join('\n')
        const dest = path.join(CONTENT, 'core-nodes/index.md')
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.writeFileSync(dest, out)
        routes.push('/node-red/core-nodes')
    }

    const nav = buildNavTree()
    fs.writeFileSync(NAV_FILE, JSON.stringify(nav, null, 2) + '\n')

    // Emit the bespoke landing page FAQ (rendered by pages/node-red/index.vue).
    try {
        const { data } = parseFrontmatter(fs.readFileSync(path.join(SRC, 'index.njk'), 'utf-8'))
        const faq = (data.meta && data.meta.faq) || []
        fs.writeFileSync(path.join(REPO, 'nuxt/node-red.faq.json'), JSON.stringify(faq, null, 2) + '\n')
    } catch (e) {
        console.warn('copy_node_red: could not emit landing FAQ:', e.message)
    }

    routes.sort()
    fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes, null, 2) + '\n')

    console.log(`copy_node_red: ${pages.length} doc pages, ${coreNodePages.length} core-node pages`)
    console.log(`copy_node_red: ${copiedMedia.size} images -> nuxt/public/node-red-media`)
    console.log(`copy_node_red: ${routes.length} routes`)
}

main().catch((e) => { console.error('copy_node_red failed:', e); process.exit(1) })
