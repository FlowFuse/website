// The `ff` icon collection (<UIcon name="i-ff-..." />) is every SVG in the directory
// nuxt.config.ts names under icon.customCollections. Nuxt Icon parses each one at build
// time, and a file without its own <svg> root, such as the bare <path> fragments the nav
// icons in nuxt/assets/nav-icons/ are, fails the whole build with "Cannot read properties
// of undefined (reading 'attribs')". Checked here so it fails in seconds, by name.
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const nuxtRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

test('every file in the ff icon collection is a complete SVG', () => {
    const config = readFileSync(join(nuxtRoot, 'nuxt.config.ts'), 'utf8')
    const declared = config.match(/prefix:\s*'ff',\s*dir:\s*join\(__dirname,\s*'([^']+)'\)/)
    assert.ok(declared, 'nuxt.config.ts no longer declares the ff collection the way this test reads it')

    const dir = join(nuxtRoot, declared[1])
    const files = readdirSync(dir).filter(f => f.endsWith('.svg'))
    assert.ok(files.length > 0, `${declared[1]} has no SVG files`)
    for (const file of files) {
        const text = readFileSync(join(dir, file), 'utf8')
        assert.match(text, /^\s*(<\?xml[^>]*\?>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/,
            `${declared[1]}/${file} has no <svg> root, so Nuxt Icon cannot parse it`)
    }
})
