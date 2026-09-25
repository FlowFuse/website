#!/usr/bin/env node
// Populates nuxt/content/docs outside of a Nuxt build, so CI can resolve the FlowFuse/flowfuse
// docs before installing dependencies. Uses only node builtins: this runs before `npm install`.
//
// Does not materialize the guides (nuxt/content-guides/): they are a native
// content-collection source read straight from that directory (see content.config.ts), not
// a copy this script produces, so a caller after just this script's own docs will not see
// them under nuxt/content/docs. It still copies the guides' non-markdown assets and still
// fails on a path collision with a flowfuse page, same as a full Nuxt build would.

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { syncDocs } from '../nuxt/lib/docs-sync.mjs'
import { syncGuideAssets } from '../nuxt/lib/guides-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

const nuxtRoot = join(repoRoot, 'nuxt')

await syncDocs({ repoRoot, nuxtRoot })
// Assets only: the guide pages themselves are a collection source, never copied.
syncGuideAssets({ repoRoot, nuxtRoot })
