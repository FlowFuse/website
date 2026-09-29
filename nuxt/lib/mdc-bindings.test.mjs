import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { findFiles } from './find-files.mjs'
import { GUIDES_SOURCE } from './guides-sync.mjs'
import { isDirectory } from './meta-title-length.mjs'
import { bindableMustaches, unclosedMdcBlocks } from './mdc-bindings.mjs'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')

// The trees this repository owns and always has in a checkout. FlowFuse/flowfuse's own
// docs go through the same MDC pipeline and the same function checks them, but they are
// only on disk after a docs sync (nuxt/content/docs is build-generated and gitignored), and
// whether that has run by the time `npm test` does is decided in another repository's
// workflow - so requiring them here would make this test's coverage depend on something
// this repository cannot see. They are scanned below if they happen to be present.
const REQUIRED_TREES = [GUIDES_SOURCE, 'nuxt/content/handbook']
const OPTIONAL_TREES = ['nuxt/content/docs']

test('a mustache in prose is reported', () => {
    // MDC compiles `{{ ... }}` in prose into a Vue binding against the page scope, so the
    // text renders as nothing at all. Confirmed against this branch's dev server: the
    // parsed AST holds `{ type: 'element', tag: 'binding', props: { value: 'msg.payload' } }`
    // and the served HTML has an empty gap where the words were.
    assert.deepEqual(bindableMustaches('P {{ msg.payload }} Q'), [{ line: 1, text: 'P {{ msg.payload }} Q' }])
    assert.equal(bindableMustaches('tight {{payload.name}} here').length, 1)
})

test('a triple-brace mustache is reported, which a {{ ... }} pattern misses', () => {
    // `{{{triple}}}` binds too - MDC reads it as the expression `{triple` - but a pattern
    // whose body is `[^{}]*` cannot match it, because the body starts with a brace. This is
    // the Template node's own escape hatch for unescaped substitution, so it appears in
    // exactly the prose most at risk of carrying it.
    assert.equal(bindableMustaches('P {{{triple}}} Q').length, 1)
})

test('a mustache spanning two lines is reported, and it does not merely render empty', () => {
    // A `{{` with its `}}` on a later line, and a `{{` with no `}}` at all, both crash the
    // markdown parser outright rather than binding: micromark throws
    // "Cannot access index N in a splice buffer of size N". So the shapes a single-line,
    // must-be-closed pattern misses are the ones that break a build, not just a sentence.
    assert.deepEqual(bindableMustaches('P {{\nmsg.payload\n}} Q').map(h => h.line), [1])
    assert.deepEqual(bindableMustaches('P {{ msg.payload with no close').map(h => h.line), [1])
})

test('a mustache inside code is not reported, because that is the fix', () => {
    // Inline code spans, fenced blocks and indented blocks all reach the page as typed.
    // Every Node-RED page that shows mustache syntax does it this way.
    assert.deepEqual(bindableMustaches('P `{{ msg.payload }}` Q'), [])
    assert.deepEqual(bindableMustaches('```\n{{ msg.payload }}\n```'), [])
    assert.deepEqual(bindableMustaches('```json\n{"a": "{{ b }}"}\n```'), [])
    assert.deepEqual(bindableMustaches('~~~\n{{ msg.payload }}\n~~~'), [])
    assert.deepEqual(bindableMustaches('    {{ msg.payload }}'), [])
    // A fence inside an MDC component block still counts as a fence.
    assert.deepEqual(bindableMustaches('::render-flow\n```json\n{{ x }}\n```\n::'), [])
})

test('a mustache in inline HTML is reported, unlike one in an HTML block', () => {
    // MDC leaves `{{ }}` alone inside a raw HTML *block* but binds it inside *inline* HTML:
    // `<span>{{ msg.payload }}</span>` in a paragraph binds exactly like bare prose. Both
    // are reported, deliberately - telling them apart needs the parser, and the fix for
    // either is the same.
    assert.equal(bindableMustaches('P <span>{{ msg.payload }}</span> Q').length, 1)
    assert.equal(bindableMustaches('<div>\n{{ msg.payload }}\n</div>').length, 1)
})

test('the line number points at the offending line, not the file', () => {
    const md = ['# T', '', 'fine', '', 'P {{ a }} Q', '', '`{{ b }}`', '', 'R {{ c }} S'].join('\n')
    assert.deepEqual(bindableMustaches(md).map(h => h.line), [5, 9])
})

for (const tree of REQUIRED_TREES) {
    // Guards the scan below against passing because it found nothing to scan.
    test(`${tree} exists where this test expects it`, () => {
        assert.ok(isDirectory(join(REPO_ROOT, tree)), `expected ${tree} to exist`)
    })
}

test('no content file carries a mustache MDC would read as a binding', () => {
    // The Node-RED pages document the Template node, whose whole subject is mustache
    // syntax, so this tree is the one where a stray `{{ }}` in prose is likeliest - and
    // losing a sentence to it leaves no trace anywhere: no warning, no failed build, no
    // empty element, just missing words.
    const hits = []
    for (const tree of [...REQUIRED_TREES, ...OPTIONAL_TREES]) {
        const dir = join(REPO_ROOT, tree)
        if (!isDirectory(dir)) continue
        for (const path of findFiles(dir, ['.md'])) {
            for (const hit of bindableMustaches(readFileSync(path, 'utf8'))) {
                hits.push(`${relative(REPO_ROOT, path)}:${hit.line}: ${hit.text}`)
            }
        }
    }
    assert.deepEqual(hits, [], `put the mustache in a code span or a fenced block:\n${hits.join('\n')}`)
})

test('an MDC component block that is never closed is reported', () => {
    // `::component{...}` opens a container and the closing `::` is not optional. Without
    // it the container swallows the rest of the file, so every heading after it stops
    // being a heading, and nothing errors: the component still renders. This shipped once,
    // on three guides whose CTA was converted from a raw `<a onclick=...>`, and the only
    // symptom was 23 anchors in those pages' own tables of contents pointing at headings
    // that had quietly stopped existing.
    assert.deepEqual(
        unclosedMdcBlocks('# T\n\n::cta-image{src="a" cta="sign-up"}\n\n## Heading\n'),
        [{ line: 3, component: 'cta-image' }]
    )

    // Closed, nested, and inside a fence are all fine.
    assert.deepEqual(unclosedMdcBlocks('::cta-image{src="a"}\n::\n\n## Heading\n'), [])
    assert.deepEqual(unclosedMdcBlocks('::callout{icon="x"}\ntext\n::\n\n::cta-image{src="a"}\n::\n'), [])
    assert.deepEqual(unclosedMdcBlocks('```\n::cta-image{src="a"}\n```\n'), [])
})

test('every MDC component block in the guides is closed', () => {
    const offenders = []
    for (const path of findFiles(join(REPO_ROOT, GUIDES_SOURCE), ['.md'])) {
        for (const { line, component } of unclosedMdcBlocks(readFileSync(path, 'utf8'))) {
            offenders.push(`${relative(REPO_ROOT, path)}:${line}: ::${component} is never closed`)
        }
    }
    assert.deepEqual(offenders, [], offenders.join('\n'))
})
