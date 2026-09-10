import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { docsPathForSourceFile } from './docs-content-path.mjs'
import { GUIDES_SOURCE, listGuideFiles } from './guides-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..')

test('a guide read from content-guides maps to the /docs path it is served at', () => {
    // The whole reason this exists: keying off `/docs/` alone skipped this source, and
    // nuxt/utils/remark-docs-links.ts then left every relative image URL in the guides
    // unresolved, so the browser resolved it against the page's own URL and 404'd.
    assert.equal(
        docsPathForSourceFile('/repo/nuxt/content-guides/node-red/database/influxdb.md'),
        '/docs/node-red/database/influxdb.md'
    )
    assert.equal(
        docsPathForSourceFile('/repo/nuxt/content-guides/application-guide/index.md'),
        '/docs/application-guide/index.md'
    )
})

test('a materialized page from FlowFuse/flowfuse keeps resolving as it did', () => {
    assert.equal(
        docsPathForSourceFile('/repo/nuxt/content/docs/user/concepts.md'),
        '/docs/user/concepts.md'
    )
})

test('a page from neither source is not a docs page', () => {
    assert.equal(docsPathForSourceFile('/repo/nuxt/content/handbook/team.md'), null)
    assert.equal(docsPathForSourceFile(''), null)
    assert.equal(docsPathForSourceFile(undefined), null)
})

test('every guide that uses a relative asset URL is a page this can resolve', () => {
    // A relative URL is only safe because something rewrites it. If a guide's path stops
    // being recognised here, the rewrite goes back to silently not happening, so this
    // asserts the two stay in step over the real tree rather than over a fixture.
    const guidesDir = join(repoRoot, GUIDES_SOURCE)
    const unresolvable = []

    for (const relPath of listGuideFiles(guidesDir).filter(f => f.endsWith('.md'))) {
        const body = readFileSync(join(guidesDir, relPath), 'utf8')
        if (!/!\[[^\]]*\]\((\.\.?\/)/.test(body)) continue
        if (!docsPathForSourceFile(join(guidesDir, relPath))) unresolvable.push(relPath)
    }

    assert.deepEqual(unresolvable, [], unresolvable.join('\n'))
})
