#!/usr/bin/env node
// Re-fetches every core node's built-in help from the Node-RED project and rewrites the
// committed snapshot at nuxt/lib/core-node-help.json.
//
// Run this deliberately, when upstream's help has changed. It is NOT part of the build:
// the /docs/node-red/core-nodes/** pages are generated from the snapshot so a deploy
// never depends on raw.githubusercontent.com being reachable.
//
//   node scripts/refresh_core_node_help.mjs
//
// Then commit the diff to nuxt/lib/core-node-help.json alongside whatever prompted it.

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { refreshCoreNodeHelp } from '../nuxt/lib/core-nodes-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const coreNodes = JSON.parse(readFileSync(join(repoRoot, 'src/_data/coreNodes.json'), 'utf8'))
const dest = join(repoRoot, 'nuxt/lib/core-node-help.json')

const help = await refreshCoreNodeHelp({ coreNodes })
const keys = Object.keys(help).sort()
const sorted = Object.fromEntries(keys.map(k => [k, help[k]]))

writeFileSync(dest, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8')
console.log(`Wrote help for ${keys.length} nodes to nuxt/lib/core-node-help.json`)
