import { test } from 'node:test'
import assert from 'node:assert/strict'

import { renderRichText } from './rich-text.mjs'

test('keeps the inline tags the content files use', () => {
    assert.equal(renderRichText('<strong>Cut effort</strong> and ship'), '<strong>Cut effort</strong> and ship')
    assert.equal(renderRichText('one<br>two'), 'one<br>two')
    assert.equal(renderRichText('one<br />two'), 'one<br>two')
    assert.equal(renderRichText('export a <code>.gwbk</code> file'), 'export a <code>.gwbk</code> file')
    assert.equal(renderRichText('save you <i>a lot</i>'), 'save you <i>a lot</i>')
})

test('keeps a span whose classes are all allowlisted, in either quote style', () => {
    assert.equal(
        renderRichText('<span class="text-red-600">Scale up</span> safely'),
        '<span class="text-red-600">Scale up</span> safely',
    )
    assert.equal(
        renderRichText("<span class='font-medium'>Enterprise Suite</span>"),
        '<span class="font-medium">Enterprise Suite</span>',
    )
    assert.equal(
        renderRichText("<span class='text-indigo-400 font-semibold'>x</span>"),
        '<span class="text-indigo-400 font-semibold">x</span>',
    )
})

test('rejects a class that is not purely typography', () => {
    // One bad token disqualifies the whole tag, which then stays text.
    assert.equal(
        renderRichText('<span class="font-medium absolute inset-0">x</span>'),
        '&lt;span class=&quot;font-medium absolute inset-0&quot;&gt;x</span>',
    )
    assert.equal(
        renderRichText('<span class="bg-[url(evil)]">x</span>'),
        '&lt;span class=&quot;bg-[url(evil)]&quot;&gt;x</span>',
    )
})

test('keeps site-absolute and https links, and marks external ones', () => {
    assert.equal(
        renderRichText("<a href='/pricing'>pricing</a>"),
        '<a href="/pricing">pricing</a>',
    )
    assert.equal(
        renderRichText('<a href="https://github.com/FlowFuse" class="font-semibold">GitHub</a>'),
        '<a href="https://github.com/FlowFuse" class="font-semibold" target="_blank" rel="noopener">GitHub</a>',
    )
})

test('rejects every other href shape', () => {
    for (const href of ['javascript:alert(1)', 'data:text/html,x', '//evil.example.com', 'http://insecure.example.com']) {
        const out = renderRichText(`<a href="${href}">x</a>`)
        assert.ok(out.startsWith('&lt;a href='), `${href} should not render as a link, got ${out}`)
    }
})

test('rejects attributes other than class and href', () => {
    assert.equal(renderRichText('<a href="/x" onclick="alert(1)">x</a>'), '&lt;a href=&quot;/x&quot; onclick=&quot;alert(1)&quot;&gt;x</a>')
    assert.equal(renderRichText('<span style="color:red">x</span>'), '&lt;span style=&quot;color:red&quot;&gt;x</span>')
    assert.equal(renderRichText('<a href="/x" target="_blank">x</a>'), '&lt;a href=&quot;/x&quot; target=&quot;_blank&quot;&gt;x</a>')
})

test('escapes every tag that is not on the list', () => {
    assert.equal(renderRichText('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;')
    assert.equal(renderRichText('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;')
    assert.equal(renderRichText('<div>x</div>'), '&lt;div&gt;x&lt;/div&gt;')
    assert.equal(renderRichText('use <ip> here'), 'use &lt;ip&gt; here')
})

test('escapes bare text', () => {
    assert.equal(renderRichText('a & b'), 'a &amp; b')
    assert.equal(renderRichText('5 < 6'), '5 &lt; 6')
})

test('empty input renders nothing', () => {
    assert.equal(renderRichText(''), '')
    assert.equal(renderRichText(undefined), '')
    assert.equal(renderRichText(null), '')
})
