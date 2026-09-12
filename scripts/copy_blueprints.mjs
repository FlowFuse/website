#!/usr/bin/env node
// Populates src/blueprints outside of a Nuxt build, so `npm start`/the 11ty build can
// resolve blueprints the same way a production build does. Mirrors scripts/sync_docs.mjs.

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { syncBlueprints } from '../nuxt/lib/blueprints-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

await syncBlueprints({ repoRoot })
