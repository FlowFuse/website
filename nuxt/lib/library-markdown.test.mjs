import assert from 'node:assert/strict'
import test from 'node:test'

import {
    convertRenderFlow,
    processLibraryMarkdown,
    protectMustaches,
    resolveTitleInterpolation,
    rewriteLibraryPaths,
} from './library-markdown.mjs'

test('a fence indented under a list item is still protected', () => {
    // Anchored at column 0 this missed every indented fence, so the mustache rewrite
    // reached into code samples: the Template node's page teaches Mustache syntax in a
    // block indented under a list item, and shipped it with backticks inside the sample.
    const input = [
        '* Template:',
        '    ```text',
        '    {%- raw -%}',
        '    {',
        '        "product": "{{payload.0}}"',
        '    }',
        '    {% endraw %}',
        '    ```',
        '',
        'And in prose, {{payload.0}} must still be protected.',
    ].join('\n')

    const out = protectMustaches(input)

    // Untouched inside the fence, and the guards took their whole lines with them so the
    // closing fence still lines up with the opening one.
    assert.match(out, /^ {4}```text\n {4}\{\n {8}"product": "\{\{payload\.0\}\}"\n {4}\}\n {4}```$/m)
    // Still code-spanned outside it, which is the whole point of the pass.
    assert.match(out, /prose, `\{\{payload\.0\}\}` must/)
})

test('renderFlow becomes the render-flow component with its height carried over', () => {
    const out = convertRenderFlow('{% renderFlow 300 %}\n[{"id":"a"}]\n{% endrenderFlow %}')

    assert.equal(out, '::render-flow{:height="300"}\n```json\n[{"id":"a"}]\n```\n::')
})

test('renderFlow without a height omits the attribute so the component default applies', () => {
    const out = convertRenderFlow('{% renderFlow %}\n[]\n{% endrenderFlow %}')

    assert.equal(out, '::render-flow\n```json\n[]\n```\n::')
})

test('several flows on one page each convert', () => {
    const page = [
        '{% renderFlow 200 %}', '[1]', '{% endrenderFlow %}',
        'prose',
        '{% renderFlow 400 %}', '[2]', '{% endrenderFlow %}',
    ].join('\n')

    const out = convertRenderFlow(page)

    assert.equal(out.match(/::render-flow/g).length, 2)
    assert.match(out, /height="200"/)
    assert.match(out, /height="400"/)
})

test('a flow survives the full pipeline, which otherwise strips Nunjucks tags', () => {
    // The regression this guards: convertCallouts ends by removing every remaining
    // {% ... %}, so a flow converted too late is silently deleted along with its JSON.
    const out = processLibraryMarkdown('{% renderFlow 300 %}\n[{"id":"a"}]\n{% endrenderFlow %}')

    assert.match(out, /::render-flow\{:height="300"\}/)
    assert.match(out, /\[\{"id":"a"\}\]/)
})

test('the H1 interpolation resolves to the frontmatter title', () => {
    assert.equal(resolveTitleInterpolation('# {{meta.title}}', 'Using Modbus'), '# Using Modbus')
    assert.equal(resolveTitleInterpolation('# {{ meta.title }}', 'Using Modbus'), '# Using Modbus')
})

test('a page with no title leaves the interpolation alone rather than emptying the heading', () => {
    assert.equal(resolveTitleInterpolation('# {{ meta.title }}'), '# {{ meta.title }}')
})

test('Node-RED mustaches are moved into code spans so MDC cannot bind them', () => {
    assert.equal(protectMustaches('set it to {{ msg.payload }} here'),
        'set it to `{{ msg.payload }}` here')
})

test('a mustache already in a code span is not double-wrapped', () => {
    assert.equal(protectMustaches('use `{{ msg.payload }}` here'), 'use `{{ msg.payload }}` here')
})

test('raw guards are removed but what they protected is kept', () => {
    const out = protectMustaches('{% raw %}\n{{ payload }}\n{% endraw %}')

    assert.equal(out, '`{{ payload }}`\n')
})

test('a fenced block keeps its exact bytes, mustaches and all', () => {
    const page = ['before {{ a }}', '```json', '{"format":"{{msg.payload}}"}', '```', 'after {{ b }}'].join('\n')

    const out = protectMustaches(page)

    assert.match(out, /\{"format":"\{\{msg\.payload\}\}"\}/)
    assert.match(out, /before `\{\{ a \}\}`/)
    assert.match(out, /after `\{\{ b \}\}`/)
})

test('a flow JSON fence is not mangled by mustache protection', () => {
    // ui-text nodes carry format:"{{msg.payload}}" inside the flow, so the two transforms
    // meet on every dashboard example in the library.
    const out = processLibraryMarkdown(
        '{% renderFlow 300 %}\n[{"type":"ui-text","format":"{{msg.payload}}"}]\n{% endrenderFlow %}'
    )

    assert.match(out, /"format":"\{\{msg\.payload\}\}"/)
    assert.doesNotMatch(out, /`\{\{msg\.payload\}\}`/)
})

test('a caution callout keeps its box instead of becoming a bare paragraph', () => {
    // The regression this guards: docs-markdown's convertCallouts knows note, warning and
    // critical, then strips every remaining Nunjucks tag, so {% caution %} lost its
    // styling silently. The OPC UA guide uses it for "not supported on FlowFuse Cloud".
    const out = processLibraryMarkdown('{% caution %}\nNot supported on Cloud.\n{% endcaution %}')

    assert.match(out, /ff-callout--caution/)
    assert.match(out, /Not supported on Cloud\./)
})

test('a mustache in the middle of a longer code span is left alone', () => {
    // The regression this guards: checking only for an adjacent backtick re-wrapped this
    // and split the span in two, leaving the mustache bare and MDC free to bind it.
    const out = protectMustaches('a template like `<p>Hello {{payload.name}}!</p>`.')

    assert.equal(out, 'a template like `<p>Hello {{payload.name}}!</p>`.')
})

test('a raw guard wrapping a code span from the outside still leaves the span whole', () => {
    const out = protectMustaches('like this: {% raw %}`<p>{{payload.name}}</p>`{% endraw %}.')

    assert.equal(out, 'like this: `<p>{{payload.name}}</p>`.')
})

test('library links move to the docs tree', () => {
    assert.equal(rewriteLibraryPaths('[x](/node-red/protocol/modbus/)'), '[x](/docs/node-red/protocol/modbus/)')
    assert.equal(rewriteLibraryPaths('src="/node-red/hardware/images/a.png"'), 'src="/docs/node-red/hardware/images/a.png"')
})

test('the FlowFuse node pages go to their own docs section, not under node-red', () => {
    assert.equal(rewriteLibraryPaths('[x](/node-red/flowfuse/mcp/)'), '[x](/docs/flowfuse-nodes/mcp/)')
})

test('a link to /node-red/ itself is left alone, because that page stays on Eleventy', () => {
    assert.equal(rewriteLibraryPaths('[what is it](/node-red/)'), '[what is it](/node-red/)')
})
