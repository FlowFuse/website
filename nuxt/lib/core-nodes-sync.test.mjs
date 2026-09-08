import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

import {
    extractHelp,
    fetchCoreNodeHelp,
    foldUseCaseHeadings,
    listNodes,
    renderCoreNodePage,
    slugFor,
    syncCoreNodes,
} from './core-nodes-sync.mjs'
import { processLibraryMarkdown } from './library-markdown.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..')

const CATALOGUE = {
    common: [{ xpath: 'inject', name: 'Inject', file: '20-inject', description: 'Injects a message', keywords: 'inject' }],
    network: [{ xpath: 'mqtt in', name: 'MQTT In', file: '10-mqtt', description: 'Subscribes' }],
}

test('a node slug matches the URL the page has always had', () => {
    assert.equal(slugFor('Read File'), 'read-file')
    assert.equal(slugFor('HTTP request'), 'http-request')
})

test('help is selected by name out of a file holding several nodes', () => {
    const html = [
        '<script type="text/html" data-help-name="mqtt in">IN</script>',
        '<script type="text/html" data-help-name="mqtt out">OUT</script>',
        '<script type="text/html" data-help-name="mqtt-broker">BROKER</script>',
    ].join('\n')

    assert.equal(extractHelp(html, 'mqtt in'), 'IN')
    assert.equal(extractHelp(html, 'mqtt out'), 'OUT')
})

test('a hyphenated request still finds a space-separated help name', () => {
    // The regression this guards: coreNodes.json asked for "mqtt-in" while upstream
    // renamed the block to "mqtt in". The Eleventy xpath found nothing and the page
    // shipped an empty help section instead of failing.
    const html = '<script type="text/html" data-help-name="mqtt in">IN</script>'

    assert.equal(extractHelp(html, 'mqtt-in'), 'IN')
})

test('a name that matches nothing returns empty rather than the wrong node', () => {
    const html = '<script type="text/html" data-help-name="udp in">IN</script>'

    assert.equal(extractHelp(html, 'tcp in'), '')
})

test('the catalogue flattens to nodes carrying their category and slug', () => {
    const nodes = listNodes(CATALOGUE)

    assert.deepEqual(nodes.map(n => `${n.category}/${n.slug}`), ['common/inject', 'network/mqtt-in'])
})

const ok = (body) => async () => ({ ok: true, status: 200, text: async () => body })

test('a fetch that cannot find the help name fails the build and names every miss', async () => {
    // The regression this guards: the Eleventy version got an empty node-set here, joined
    // it to '' and published the page anyway. Four pages shipped with no help that way.
    const fetchImpl = ok('<script data-help-name="something else">x</script>')

    await assert.rejects(
        () => fetchCoreNodeHelp({ coreNodes: CATALOGUE, fetchImpl }),
        (err) => /Upstream help not found for 2 core node\(s\)/.test(err.message)
            && /Inject/.test(err.message) && /MQTT In/.test(err.message)
    )
})

test('a 404 is a real mismatch and is not retried', async () => {
    let calls = 0
    const fetchImpl = async () => { calls++; return { ok: false, status: 404 } }

    await assert.rejects(() => fetchCoreNodeHelp({ coreNodes: CATALOGUE, fetchImpl, delay: 0 }), /404/)
    assert.equal(calls, 1, 'a 404 never becomes a success, so retrying only slows the build')
})

test('a transient 5xx is retried and then succeeds', async () => {
    let calls = 0
    const fetchImpl = async () => {
        calls++
        return calls === 1
            ? { ok: false, status: 503 }
            : { ok: true, status: 200, text: async () => '<script data-help-name="inject">i</script><script data-help-name="mqtt in">m</script>' }
    }

    const help = await fetchCoreNodeHelp({ coreNodes: CATALOGUE, fetchImpl, delay: 0 })

    assert.equal(help['common/inject'], 'i')
    assert.ok(calls > 1, 'one bad minute at GitHub must not fail a deploy')
})

test('a persistent 5xx gives up and fails the build', async () => {
    const fetchImpl = async () => ({ ok: false, status: 502 })

    await assert.rejects(
        () => fetchCoreNodeHelp({ coreNodes: CATALOGUE, fetchImpl, retries: 2, delay: 0 }),
        /Could not fetch core node help.*502/s
    )
})

test('one locale file serving several nodes is fetched once', async () => {
    const shared = {
        network: [
            { xpath: 'mqtt in', name: 'MQTT In', file: '10-mqtt' },
            { xpath: 'mqtt out', name: 'MQTT Out', file: '10-mqtt' },
        ],
    }
    let calls = 0
    const fetchImpl = async () => {
        calls++
        return { ok: true, status: 200, text: async () => '<script data-help-name="mqtt in">i</script><script data-help-name="mqtt out">o</script>' }
    }

    const help = await fetchCoreNodeHelp({ coreNodes: shared, fetchImpl, delay: 0 })

    assert.equal(calls, 1)
    assert.deepEqual(help, { 'network/mqtt-in': 'i', 'network/mqtt-out': 'o' })
})

test('a page leads with the FlowFuse use case and puts the mirrored help under its own heading', () => {
    const out = renderCoreNodePage(
        { name: 'Inject', description: 'Injects a message' },
        { useCase: 'Reach for this to kick a flow off.', help: '<p>upstream</p>', navOrder: 1 }
    )

    assert.match(out, /^---\n/)
    assert.match(out, /navTitle: "Inject"/)
    assert.match(out, /# Inject/)
    assert.ok(out.indexOf('Reach for this') < out.indexOf('## Node help'),
        'the use case must come before the mirrored help')
    assert.match(out, /mirrored from the Node-RED project/)
    assert.match(out, /<p>upstream<\/p>/)
})

test("a node page's browser title is the one the Eleventy page it replaces had", () => {
    // /node-red/core-nodes/mqtt-in/ 301s onto /docs/node-red/core-nodes/network/mqtt-in/, so the
    // title has to survive the move or the redirect hands Google a different page. The
    // docs page prefers metaTitle over navTitle for exactly this; without it the title
    // would be the bare node name.
    const out = renderCoreNodePage(
        { name: 'MQTT In', description: 'Subscribes to a topic' },
        { useCase: '', help: '<p>upstream</p>', navOrder: 1 }
    )

    assert.match(out, /metaTitle: "Node-RED - MQTT In Node"/)
    assert.match(out, /navTitle: "MQTT In"/)
})

test('a use-case include cannot add a second H1 to the page', () => {
    // mqtt-out-use-case.md opens with `# {{ meta.title }}`, which resolves to the node's
    // own name, so the page rendered "MQTT Out" as an H1 twice in a row. Eleventy had the
    // same duplicate but empty, which is why it survived this long.
    assert.equal(
        foldUseCaseHeadings('# MQTT Out\n\nReach for this to publish.\n', 'MQTT Out'),
        'Reach for this to publish.\n'
    )

    // An H1 that says something else is a section of the page, not its title.
    assert.equal(
        foldUseCaseHeadings('# What is TCP-Out Nodes in Node-RED ?\n\nbody\n', 'TCP Out'),
        '## What is TCP-Out Nodes in Node-RED ?\n\nbody\n'
    )

    // A `#` inside a fence is a comment in an example, not a heading.
    assert.equal(
        foldUseCaseHeadings('```bash\n# install it\n```\n', 'Exec'),
        '```bash\n# install it\n```\n'
    )
})

test('every real use-case include leaves the assembled page with exactly one H1', () => {
    // Over the committed includes rather than a fixture: the duplication was in the
    // content, not the code, and only two of the files had it.
    const useCaseDir = join(repoRoot, 'src/_includes/core-nodes')
    const offenders = []

    for (const file of readdirSync(useCaseDir).filter(f => f.endsWith('-use-case.md'))) {
        const name = file.replace(/-use-case\.md$/, '')
        const page = renderCoreNodePage(
            { name, description: 'd' },
            {
                useCase: foldUseCaseHeadings(
                    processLibraryMarkdown(readFileSync(join(useCaseDir, file), 'utf8'), { title: name }),
                    name),
                help: '<p>help</p>',
                navOrder: 1,
            }
        )
        // Outside fenced blocks, so a `#` comment in an example does not count.
        const h1s = page
            .split(/^```[\s\S]*?^```/gm)
            .flatMap(part => part.match(/^# .+$/gm) || [])
        if (h1s.length !== 1) offenders.push(`${file}: ${h1s.length} H1s (${h1s.join(' | ')})`)
    }

    assert.deepEqual(offenders, [], offenders.join('\n'))
})

test('a sync missing any node help fails loudly and names the node', () => {
    assert.throws(
        () => syncCoreNodes({
            repoRoot: '/nope',
            nuxtRoot: '/nope/nuxt',
            coreNodes: CATALOGUE,
            help: { 'common/inject': 'x' },
            logger: { info () {} },
        }),
        /No help fetched for.*MQTT In/s
    )
})

test('a node whose name matches its category does not collide with its category page', () => {
    // The Function node lives in the `function` category, and both want to be called
    // "function". Flat, the category page at core-nodes/function/ and the node page at
    // core-nodes/function.md resolved to the same URL and @nuxt/content kept whichever it
    // indexed last, with no build error. Nesting separates them: the category owns the
    // directory, the node is a file inside it.
    const root = mkdtempSync(join(tmpdir(), 'core-nodes-collide-'))
    const catalogue = { function: [{ xpath: 'function', name: 'Function', file: '10-function' }] }

    syncCoreNodes({
        repoRoot: root,
        nuxtRoot: join(root, 'nuxt'),
        coreNodes: catalogue,
        help: { 'function/function': '<p>f</p>' },
        logger: { info () {} },
    })

    const dir = join(root, 'nuxt/content/docs/node-red/core-nodes')
    assert.deepEqual(readdirSync(dir).sort(), ['function', 'index.md'])
    assert.deepEqual(readdirSync(join(dir, 'function')).sort(), ['function.md', 'index.md'])

    // /docs/node-red/core-nodes/function/ is the category, and the node is one level down.
    assert.match(readFileSync(join(dir, 'function/index.md'), 'utf8'), /navTitle: "Function"/)
    assert.match(readFileSync(join(dir, 'function/function.md'), 'utf8'), /navTitle: "Function"/)
})

test('a full sync writes a page per node plus the section index', () => {
    const root = mkdtempSync(join(tmpdir(), 'core-nodes-'))
    const help = { 'common/inject': '<p>i</p>', 'network/mqtt-in': '<p>m</p>' }

    const { count } = syncCoreNodes({
        repoRoot: root,
        nuxtRoot: join(root, 'nuxt'),
        coreNodes: CATALOGUE,
        help,
        logger: { info () {} },
    })

    const dir = join(root, 'nuxt/content/docs/node-red/core-nodes')

    assert.equal(count, 2)
    // index.md, not README.md: this writes straight into the content tree rather than
    // through guides-sync, which is what renames README on the way in. README.md here
    // prerenders as /docs/node-red/core-nodes/README/ and 404s the build.
    //
    // A directory per palette category, each with its own index, so the sidebar nests the
    // way the editor's palette does. Categories with no nodes in the catalogue are skipped.
    assert.deepEqual(readdirSync(dir).sort(), ['common', 'index.md', 'network'])
    assert.deepEqual(readdirSync(join(dir, 'common')).sort(), ['index.md', 'inject.md'])
    assert.deepEqual(readdirSync(join(dir, 'network')).sort(), ['index.md', 'mqtt-in.md'])

    assert.match(readFileSync(join(dir, 'index.md'), 'utf8'), /navTitle: "Core nodes"/)
    assert.match(readFileSync(join(dir, 'common/index.md'), 'utf8'), /navTitle: "Common"/)

    // Both the section index and the category page link the node at its nested URL.
    for (const page of ['index.md', 'common/index.md']) {
        assert.match(readFileSync(join(dir, page), 'utf8'), /\/docs\/node-red\/core-nodes\/common\/inject\//)
    }

    // navOrder ranks a node among its own category's nodes, so each category restarts at 1.
    assert.match(readFileSync(join(dir, 'common/inject.md'), 'utf8'), /navOrder: 1/)
    assert.match(readFileSync(join(dir, 'network/mqtt-in.md'), 'utf8'), /navOrder: 1/)
})
