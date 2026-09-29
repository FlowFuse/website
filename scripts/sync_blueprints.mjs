#!/usr/bin/env node
// Populates nuxt/content/blueprints and nuxt/public/blueprints outside of a Nuxt build.
// Uses only node builtins beyond the clone path, so it runs before dependencies are
// installed. Netlify's production build reaches the same sync through
// nuxt/modules/blueprints-source.ts, so this is only needed where there is no Nuxt yet.
//
// This replaces scripts/copy_blueprints.mjs, which wrote into src/blueprints/ for 11ty.

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { syncBlueprints } from '../nuxt/lib/blueprints-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

const { entries } = await syncBlueprints({ repoRoot, nuxtRoot: join(repoRoot, 'nuxt') })

// Called explicitly, so unlike a build there is no committed tree to fall back on and
// nothing else that would report the library never having been found.
if (entries.length === 0) {
    console.error('No blueprints were published. Check out FlowFuse/blueprint-library beside this repo, set FLOWFUSE_BLUEPRINTS_LOCAL, or configure GH_BOT_APP_ID/GH_BOT_APP_KEY to clone it.')
    process.exit(1)
}
