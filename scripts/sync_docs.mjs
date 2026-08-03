#!/usr/bin/env node
// Populates nuxt/content/docs outside of a Nuxt build, so CI can commit the result as a
// snapshot. Uses only node builtins: this runs before `npm install`.

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { syncDocs } from '../nuxt/lib/docs-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

await syncDocs({ repoRoot, nuxtRoot: join(repoRoot, 'nuxt') })
