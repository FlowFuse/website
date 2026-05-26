#!/usr/bin/env node
// Compare the legacy 11ty route set against the migrated Nuxt build route set.
//
// HARD CONSTRAINT: the Nuxt build must serve a SUPERSET of the 11ty routes.
// Any route present in the 11ty build but missing from the Nuxt build is a
// DROPPED URL and a migration failure.
//
// Usage: node route-diff.mjs <old-routes.txt> <new-routes.txt>
// Exit code 1 if any route was dropped.
import { readFileSync } from 'node:fs'

const [, , oldFile, newFile] = process.argv
if (!oldFile || !newFile) {
    console.error('usage: route-diff.mjs <old-routes.txt> <new-routes.txt>')
    process.exit(1)
}

const load = (f) => new Set(readFileSync(f, 'utf-8').split('\n').map((l) => l.trim()).filter(Boolean))

const oldRoutes = load(oldFile)
const newRoutes = load(newFile)

const dropped = [...oldRoutes].filter((r) => !newRoutes.has(r)).sort()
const added = [...newRoutes].filter((r) => !oldRoutes.has(r)).sort()

console.log(`# Route diff`)
console.log(`# 11ty routes:  ${oldRoutes.size}`)
console.log(`# Nuxt routes:  ${newRoutes.size}`)
console.log(`# Dropped:      ${dropped.length}`)
console.log(`# Added:        ${added.length}`)
console.log('')

if (dropped.length) {
    console.log('## DROPPED (present in 11ty, missing from Nuxt) -- MIGRATION FAILURE')
    for (const r of dropped) console.log(`- ${r}`)
    console.log('')
}

if (added.length) {
    console.log('## ADDED (new in Nuxt, not in 11ty)')
    for (const r of added) console.log(`+ ${r}`)
    console.log('')
}

if (!dropped.length) {
    console.log('OK: Nuxt build is a superset of 11ty routes (zero dropped URLs).')
}

process.exit(dropped.length ? 1 : 0)
