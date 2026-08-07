#!/usr/bin/env node
// Re-runs the docs sync whenever the resolved docs change, so editing a page in a local
// flowfuse checkout shows up without restarting the dev server. The docs-source Nuxt
// module syncs once during setup and never again, which is what made a restart necessary.
// Mirrors scripts/watch_blueprints.js.

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import nodemon from 'nodemon'

import { resolveSource } from '../nuxt/lib/docs-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

// Same precedence the build uses, rather than a second hardcoded path that could drift
// from it: FLOWFUSE_DOCS_LOCAL, then a sibling checkout, then a clone.
const source = resolveSource({ repoRoot })

if (source.kind === 'clone') {
    console.log(`Docs resolve to a clone of ${source.ref} - no local checkout to watch, skipping`)
    process.exit(0)
}

console.log(`Watching ${source.docsDir} for docs changes`)

// Options object rather than a command string: docsDir comes from the environment and
// would need shell quoting if it contained a space.
nodemon({
    watch: [source.docsDir],
    ext: 'md,png,jpg,jpeg,gif,svg',
    exec: 'npm run docs',
    // The Nuxt module already synced on startup, so only react to actual edits.
    runOnChangeOnly: true,
})

nodemon.on('restart', (files) => {
    console.log(`Docs change detected (${files?.join(', ') || 'unknown'}) - syncing`)
}).on('exit', () => {
    console.log('Docs sync complete')
})
