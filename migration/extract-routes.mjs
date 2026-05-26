#!/usr/bin/env node
// Extract the set of served URL routes from a static build directory.
//
// Maps emitted .html files to the URLs they serve:
//   index.html            -> /
//   foo/index.html        -> /foo/        (11ty trailing-slash permalinks)
//   foo/bar.html          -> /foo/bar     (rare; flat file)
//
// Usage: node extract-routes.mjs <dir> [> routes.txt]
import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const root = process.argv[2]
if (!root) {
    console.error('usage: extract-routes.mjs <build-dir>')
    process.exit(1)
}

const routes = new Set()

function walk(dir) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry)
        const st = statSync(full)
        if (st.isDirectory()) {
            walk(full)
        } else if (entry.endsWith('.html')) {
            const rel = relative(root, full).split(sep).join('/')
            let route
            if (rel === 'index.html') {
                route = '/'
            } else if (rel.endsWith('/index.html')) {
                route = '/' + rel.slice(0, -'index.html'.length) // keeps trailing slash
            } else {
                route = '/' + rel.slice(0, -'.html'.length)
            }
            routes.add(route)
        }
    }
}

walk(root)
for (const r of [...routes].sort()) console.log(r)
