#!/usr/bin/env node
// Populates nuxt/content/blueprints and nuxt/public/blueprints outside of a Nuxt build.
// Uses only node builtins: the Build Site workflow runs this straight after checking out
// FlowFuse/blueprint-library, before installing dependencies, and commits the result to
// the `live` branch Netlify deploys.
//
// This replaces scripts/copy_blueprints.js, which wrote into src/blueprints/ for 11ty.
// `nuxt/modules/blueprints-source.ts` runs the same sync during a Nuxt build or dev start,
// so this is only needed where there is no Nuxt yet.

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { syncBlueprints } from '../nuxt/lib/blueprints-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

const { entries } = syncBlueprints({ repoRoot, nuxtRoot: join(repoRoot, 'nuxt') })

// Called explicitly, so unlike a build there is no committed tree to fall back on and
// nothing else that would report the library never having been found.
if (entries.length === 0) {
    console.error('No blueprints were published. Check out FlowFuse/blueprint-library beside this repo, or set FLOWFUSE_BLUEPRINTS_LOCAL.')
    process.exit(1)
}
