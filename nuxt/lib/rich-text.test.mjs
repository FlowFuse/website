import { test } from 'node:test'
import assert from 'node:assert/strict'
import { richText } from './rich-text.mjs'

test('plain text passes through', () => {
    assert.equal(richText('FlowFuse for SCADA'), 'FlowFuse for SCADA')
})

test('empty and missing input render nothing', () => {
    assert.equal(richText(''), '')
    assert.equal(richText(undefined), '')
})

test('accents become coloured spans', () => {
    assert.equal(
        richText('The FlowFuse !!Advantage!!'),
        'The FlowFuse <span class="text-red-600">Advantage</span>'
    )
    assert.equal(
        richText('==Integrate== OT and IT Data'),
        '<span class="text-indigo-600">Integrate</span> OT and IT Data'
    )
})

test('links and bold still work alongside accents', () => {
    assert.equal(
        richText('See the [PLC overview](/landing/plc/) for **all** ==protocols=='),
        'See the <a href="/landing/plc/">PLC overview</a> for <strong>all</strong> <span class="text-indigo-600">protocols</span>'
    )
})

test('a newline becomes a line break with a space after it', () => {
    assert.equal(
        richText('From Data Source to Application:\n==Streamline Your UNS Workflows=='),
        'From Data Source to Application:<br> <span class="text-indigo-600">Streamline Your UNS Workflows</span>'
    )
})

test('markup in the source is escaped, not rendered', () => {
    assert.equal(richText('<script>x</script>'), '&lt;script&gt;x&lt;/script&gt;')
    assert.equal(richText('==<b>x</b>=='), '<span class="text-indigo-600">&lt;b&gt;x&lt;/b&gt;</span>')
})

test('an unclosed marker is left as text', () => {
    assert.equal(richText('a == b'), 'a == b')
    assert.equal(richText('wow!! really'), 'wow!! really')
})
