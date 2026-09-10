import { test } from 'node:test'
import assert from 'node:assert/strict'

import { renderRichText } from './rich-text.mjs'

test('keeps the three tags the content files actually use', () => {
    assert.equal(renderRichText('<strong>Cut effort</strong> and ship'), '<strong>Cut effort</strong> and ship')
    assert.equal(renderRichText('one<br>two'), 'one<br>two')
    assert.equal(renderRichText('one<br />two'), 'one<br>two')
    assert.equal(
        renderRichText('<span class="text-red-600">Scale up</span> safely'),
        '<span class="text-red-600">Scale up</span> safely',
    )
    // One industry file single-quotes the class; both spellings must survive.
    assert.equal(
        renderRichText("<span class='text-red-600'>First Article</span> rest"),
        '<span class="text-red-600">First Article</span> rest',
    )
})

test('escapes everything else, so content cannot inject markup', () => {
    assert.equal(renderRichText('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;')
    assert.equal(renderRichText('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;')
    // A span with any other class is not the accent span, so its opening tag stays text.
    assert.equal(renderRichText('<span class="text-black">x</span>'), '&lt;span class=&quot;text-black&quot;&gt;x</span>')
    assert.equal(renderRichText('a & b'), 'a &amp; b')
    assert.equal(renderRichText('5 < 6'), '5 &lt; 6')
})

test('empty input renders nothing', () => {
    assert.equal(renderRichText(''), '')
    assert.equal(renderRichText(undefined), '')
    assert.equal(renderRichText(null), '')
})
