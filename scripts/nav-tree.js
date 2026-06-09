// scripts/nav-tree.js
// Reproduce the 11ty `.eleventy.js` addCollection('nav') grouping/ordering for a
// documentation section (docs / handbook), emitted as a static nav JSON that the
// section page imports (mirrors nuxt/node-red.nav.json). Pure data, no routes.
//
// Input: an array of "entries", one per page that has nav metadata:
//   { route, url, navTitle, navGroup, navOrder }
//     route    served URL with trailing slash, e.g. '/docs/user/' (hierarchy key)
//     url      link target (redirect.to || route)
//     navTitle sidebar label (falls back to the path segment, humanised)
//     navGroup top-level group heading (only honoured at the section's top level)
//     navOrder numeric order within its parent (default MAX_SAFE_INTEGER)
//
// Output (matching node-red.nav.json item shape, plus grouping):
//   { root: { title, url }, groups: [ { name, children: [navItem,...] } ] }
//   navItem = { title, url, children: [navItem,...] }
const MAX = Number.MAX_SAFE_INTEGER

// Humanise a bare path segment when a directory node has no own page/title.
function humanise(seg) {
    return (seg || '').replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// Build the nested hierarchy map exactly like the 11ty reduce(): split each
// route into segments under `base` (e.g. 'docs'), and nest by segment.
// NOTE: like 11ty, a node is only created the FIRST time a segment is seen
// (shallowest-first via the depth sort); deeper entries walking through an
// existing parent segment must NOT overwrite that parent's metadata (the
// dim-1 review's C1 blocker — an `else` overwrite branch corrupted parent/root
// titles, urls, groups and order).
function buildHierarchy(entries) {
    const root = {}
    // Shallow routes first so parent index nodes are created before children.
    const sorted = entries.slice().sort((a, b) => {
        const da = a.route.split('/').filter(Boolean).length
        const db = b.route.split('/').filter(Boolean).length
        return da - db
    })
    for (const e of sorted) {
        // skip README artefacts (11ty filtered page.url.includes('README'))
        if (/README/i.test(e.route)) continue
        const segs = e.route.split('/').filter(Boolean) // ['docs','user',...]
        let acc = root
        for (const seg of segs) {
            if (!acc[seg]) {
                acc[seg] = {
                    name: e.navTitle || humanise(seg),
                    url: e.url,
                    order: e.navOrder ?? MAX,
                    group: e.navGroup, // only meaningful at top level
                    children: {},
                }
            }
            acc = acc[seg].children
        }
    }
    return root
}

// Sort by navOrder then by visible label. toArray nodes carry `title` (not
// `name`), so the tie-break compares titles.
const sortByOrderTitle = (a, b) => (a.order - b.order) || a.title.localeCompare(b.title)

// Convert {seg:node} maps to sorted arrays of { title, url, children }.
function toArray(map) {
    const arr = Object.values(map).map((n) => {
        const node = { title: n.name, url: n.url }
        const kids = toArray(n.children)
        if (kids.length) node.children = kids
        node.order = n.order
        return node
    })
    arr.sort(sortByOrderTitle)
    // strip the helper `order` field from the emitted tree
    for (const n of arr) delete n.order
    return arr
}

// Public: build { root, groups } for a section.
//   base       'docs' | 'handbook'
//   groupOrder array of group names in desired order (docs only; [] for handbook)
function buildNav(entries, base, groupOrder = []) {
    const hierarchy = buildHierarchy(entries)
    const section = hierarchy[base] || { name: base, url: `/${base}/`, children: {} }
    const root = { title: section.name, url: `/${base}/` }

    // Top-level children of the section, with group + order retained.
    const topNodes = Object.values(section.children).map((n) => ({
        node: n,
        group: n.group,
        order: n.order ?? MAX,
        name: n.name,
    }))

    const groups = {
        Other: { name: 'Other', order: MAX, children: [] },
    }
    for (const t of topNodes) {
        const built = toArray({ _: t.node })[0] // build this subtree once
        if (t.group) {
            if (!groups[t.group]) {
                const idx = groupOrder.indexOf(t.group)
                groups[t.group] = {
                    name: t.group,
                    order: idx >= 0 ? idx : MAX,
                    children: [],
                }
            }
            groups[t.group].children.push({ ...built, _order: t.order, _name: t.name })
        } else {
            groups.Other.children.push({ ...built, _order: t.order, _name: t.name })
        }
    }

    const groupArr = Object.values(groups)
        .filter((g) => g.children.length > 0)
        .sort((a, b) => (a.order - b.order) || a.name.localeCompare(b.name))
        .map((g) => {
            g.children.sort((a, b) => (a._order - b._order) || a._name.localeCompare(b._name))
            for (const c of g.children) { delete c._order; delete c._name }
            return { name: g.name, children: g.children }
        })

    return { root, groups: groupArr }
}

module.exports = { buildNav }
