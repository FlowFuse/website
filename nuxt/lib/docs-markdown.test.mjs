import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
    convertCallouts,
    injectFrontmatter,
    joinHtmlBlocks,
    processMarkdown,
    stripInlineScripts,
    stripTemplateEngineOverride,
} from './docs-markdown.mjs'

test('joinHtmlBlocks drops blank lines inside a top-level html block', () => {
    const input = [
        '<div class="ff-product-feature-tiles">',
        '   <a class="ff-tile" href="/docs/user/team/">',
        '      <div class="decorator">',
        '         <svg></svg>',
        '',
        '      </div>',
        '      <div>',
        '         <label>Device Groups</label>',
        '      </div>',
        '   </a>',
        '</div>',
    ].join('\n')

    assert.equal(joinHtmlBlocks(input).includes('\n\n'), false)
    assert.match(joinHtmlBlocks(input), /<label>Device Groups<\/label>/)
})

test('joinHtmlBlocks preserves blank lines outside html blocks', () => {
    const input = '# Title\n\nSome prose.\n\n<div class="x">\n   <p>a</p>\n</div>\n\nMore prose.\n'
    const out = joinHtmlBlocks(input)

    assert.match(out, /# Title\n\nSome prose\./)
    assert.match(out, /<\/div>\n\nMore prose\./)
})

test('joinHtmlBlocks leaves an unclosed opener untouched', () => {
    const input = '<div class="never-closed">\n\nstill markdown\n\n## Heading\n'

    assert.equal(joinHtmlBlocks(input), input)
})

test('joinHtmlBlocks ignores inline tags at column 0', () => {
    const input = '<label>not a block</label>\n\nnext paragraph\n'

    assert.equal(joinHtmlBlocks(input), input)
})

test('stripInlineScripts removes column-0 script blocks', () => {
    const input = '---\ntitle: x\n---\n\n<script>\n   customElements.define("icon-chevron-right", C);\n</script>\n\n# Heading\n'
    const out = stripInlineScripts(input)

    assert.equal(out.includes('<script'), false)
    assert.equal(out.includes('customElements'), false)
    assert.match(out, /# Heading/)
})

test('stripInlineScripts leaves indented scripts in code samples alone', () => {
    const input = '```html\n    <script>alert(1)</script>\n```\n'

    assert.equal(stripInlineScripts(input), input)
})

test('convertCallouts rewrites note, warning and critical shortcodes', () => {
    const out = convertCallouts('{% note %}\nBe careful.\n{% endnote %}')

    assert.match(out, /ff-callout--note/)
    assert.match(out, /<p class="ff-callout__title">Note<\/p>/)
    assert.match(out, /\n\nBe careful\.\n\n/)
})

test('convertCallouts strips leftover nunjucks tags', () => {
    assert.equal(convertCallouts('{% set x = 1 %}\ntext').trim(), 'text')
})

test('injectFrontmatter adds provenance to existing frontmatter', () => {
    const out = injectFrontmatter('---\ntitle: x\n---\nbody', 'README.md', '2026-07-24', '2.32.1')

    assert.match(out, /^---\noriginalPath: README\.md\nupdated: 2026-07-24\nversion: 2\.32\.1\ntitle: x\n---/)
})

test('injectFrontmatter creates frontmatter when the file has none', () => {
    const out = injectFrontmatter('body', 'a/b.md', '', '')

    assert.match(out, /^---\noriginalPath: a\/b\.md\n/)
    assert.match(out, /---\nbody$/)
})

test('stripTemplateEngineOverride removes the eleventy-only field', () => {
    assert.equal(stripTemplateEngineOverride('a\ntemplateEngineOverride: njk,md\nb\n'), 'a\nb\n')
})

test('processMarkdown keeps callout bodies parseable as markdown', () => {
    // joinHtmlBlocks must not eat the blank lines convertCallouts inserts.
    const out = processMarkdown('{% note %}\nSee the [docs](/docs/).\n{% endnote %}', 'x.md', '', '')

    assert.match(out, /ff-callout__content">\n\nSee the \[docs\]\(\/docs\/\)\.\n\n<\/div>/)
})

test('processMarkdown fixes a realistic card grid end to end', () => {
    const input = [
        '<script>',
        '   customElements.define("icon-chevron-right", C);',
        '</script>',
        '',
        '# FlowFuse Documentation',
        '',
        '<div class="ff-offering-tiles">',
        '   <div class="ff-tile">',
        '      <label>Self-Hosted</label>',
        '',
        '      <ul>',
        '         <li><a href="/docs/quick-start/">Quick Start<icon-chevron-right /></a></li>',
        '      </ul>',
        '   </div>',
        '</div>',
        '',
    ].join('\n')

    const out = processMarkdown(input, 'README.md', '2026-07-24', '2.32.1')

    assert.equal(out.includes('<script'), false)
    assert.match(out, /# FlowFuse Documentation/)
    // The grid is one uninterrupted html block, so nothing inside becomes an indented code block.
    const grid = out.slice(out.indexOf('<div class="ff-offering-tiles">'), out.indexOf('</div>\n', out.indexOf('<div class="ff-offering-tiles">')))
    assert.equal(grid.includes('\n\n'), false)
    assert.match(out, /<icon-chevron-right \/>/)
})
