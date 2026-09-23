#!/usr/bin/env node
// Populates nuxt/content/docs outside of a Nuxt build, so CI can resolve the docs before
// installing dependencies. Uses only node builtins: this runs before `npm install`.

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { syncDocs } from '../nuxt/lib/docs-sync.mjs'
import { syncGuides } from '../nuxt/lib/guides-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

const nuxtRoot = join(repoRoot, 'nuxt')

await syncDocs({ repoRoot, nuxtRoot })
// After syncDocs, which wipes the tree it writes into.
syncGuides({ repoRoot, nuxtRoot })
