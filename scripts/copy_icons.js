#!/usr/bin/env node
// Copy the legacy 11ty icon SVGs into the Nuxt project so the Icon.vue component
// can glob them within its own root (Vite cannot glob outside the workspace).
// Mirrors the `{% include "components/icons/<name>.svg" %}` shortcode usage.
const fs = require('fs')
const path = require('path')

const REPO = path.resolve(__dirname, '..')
const SRC = path.join(REPO, 'src/_includes/components/icons')
const DEST = path.join(REPO, 'nuxt/components/icons')

fs.rmSync(DEST, { recursive: true, force: true })
fs.mkdirSync(DEST, { recursive: true })

let n = 0
for (const name of fs.readdirSync(SRC)) {
    if (!name.endsWith('.svg')) continue
    fs.copyFileSync(path.join(SRC, name), path.join(DEST, name))
    n++
}
console.log(`copy_icons: ${n} icons -> nuxt/components/icons`)
