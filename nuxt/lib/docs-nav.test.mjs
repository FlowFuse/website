import { test } from 'node:test'
import assert from 'node:assert/strict'

import { buildDocsNav, findDocsBreadcrumb, findDocsSurround, flattenDocsNav } from './docs-nav.mjs'

// A section is a direct child of /docs; its index page carries the group frontmatter.
function section (path, { group, groupOrder, order, navTitle } = {}) {
    return { path, navGroup: group, navGroupOrder: groupOrder, navOrder: order, navTitle }
}

const names = groups => groups.map(g => g.name)

test('groups render in declared navGroupOrder, not the order they were read', () => {
    const nav = buildDocsNav([
        section('/docs/contribute', { group: 'Contributing', groupOrder: 6 }),
        section('/docs/user', { group: 'User Manuals', groupOrder: 1 }),
        section('/docs/cloud', { group: 'Cloud', groupOrder: 3 }),
    ])

    assert.deepEqual(names(nav), ['User Manuals', 'Cloud', 'Contributing'])
})

test('a group takes the lowest navGroupOrder among its sections', () => {
    const nav = buildDocsNav([
        section('/docs/install', { group: 'Self-Hosted', groupOrder: 4 }),
        section('/docs/admin', { group: 'Self-Hosted', groupOrder: 9 }),
        section('/docs/cloud', { group: 'Cloud', groupOrder: 5 }),
    ])

    // 4 wins for Self-Hosted, so it sorts ahead of Cloud despite admin's 9.
    assert.deepEqual(names(nav), ['Self-Hosted', 'Cloud'])
})

test('a section with a group but no navGroupOrder still joins that group', () => {
    const nav = buildDocsNav([
        section('/docs/community-support', { group: 'Support', groupOrder: 5 }),
        section('/docs/debugging', { group: 'Support' }),
    ])

    assert.deepEqual(names(nav), ['Support'])
    assert.deepEqual(nav[0].children.map(c => c.path), ['/docs/community-support', '/docs/debugging'])
})

test('groups with no navGroupOrder at all sort last, alphabetically', () => {
    const nav = buildDocsNav([
        section('/docs/zebra', { group: 'Zebra' }),
        section('/docs/apple', { group: 'Apple' }),
        section('/docs/user', { group: 'User Manuals', groupOrder: 1 }),
    ])

    assert.deepEqual(names(nav), ['User Manuals', 'Apple', 'Zebra'])
})

test('a section with no navGroup lands in Other', () => {
    const nav = buildDocsNav([
        section('/docs/user', { group: 'User Manuals', groupOrder: 1 }),
        section('/docs/stray'),
    ])

    assert.deepEqual(names(nav), ['User Manuals', 'Other'])
})

test('sections sort by navOrder inside a group, unordered ones last by name', () => {
    const nav = buildDocsNav([
        section('/docs/upgrade', { group: 'Self-Hosted', groupOrder: 4, order: 3 }),
        section('/docs/quick-start', { group: 'Self-Hosted', groupOrder: 4, order: 1 }),
        section('/docs/zzz', { group: 'Self-Hosted', groupOrder: 4 }),
        section('/docs/admin', { group: 'Self-Hosted', groupOrder: 4 }),
    ])

    assert.deepEqual(nav[0].children.map(c => c.path), [
        '/docs/quick-start',
        '/docs/upgrade',
        '/docs/admin',
        '/docs/zzz',
    ])
})

test('deeper pages nest under their section and keep navOrder', () => {
    const nav = buildDocsNav([
        section('/docs/user', { group: 'User Manuals', groupOrder: 1, navTitle: 'Using FlowFuse' }),
        section('/docs/user/concepts', { order: 2, navTitle: 'Concepts' }),
        section('/docs/user/introduction', { order: 1, navTitle: 'Introduction' }),
        section('/docs/user/teams/billing', { order: 1, navTitle: 'Billing' }),
    ])

    const user = nav[0].children[0]
    assert.equal(user.title, 'Using FlowFuse')
    assert.deepEqual(user.children.map(c => c.title), ['Introduction', 'Concepts', 'teams'])
    assert.deepEqual(user.children[2].children.map(c => c.title), ['Billing'])
})

test('title falls back to the page title then to the path segment', () => {
    const nav = buildDocsNav([
        { path: '/docs/a', navGroup: 'G', navGroupOrder: 1, navOrder: 1, navTitle: 'Nav wins', title: 'Title loses' },
        { path: '/docs/b', navGroup: 'G', navGroupOrder: 1, navOrder: 2, title: 'Title used' },
        { path: '/docs/c', navGroup: 'G', navGroupOrder: 1, navOrder: 3 },
    ])

    assert.deepEqual(nav[0].children.map(c => c.title), ['Nav wins', 'Title used', 'c'])
})

test('pages outside /docs are ignored', () => {
    assert.deepEqual(buildDocsNav([section('/handbook/company', { group: 'Company', groupOrder: 1 })]), [])
    assert.deepEqual(buildDocsNav([]), [])
})

test('findDocsBreadcrumb returns the real-title ancestor chain, spanning groups', () => {
    const nav = buildDocsNav([
        section('/docs/user', { group: 'User Manuals', groupOrder: 1, navTitle: 'Using FlowFuse' }),
        section('/docs/user/teams/billing', { order: 1, navTitle: 'Billing' }),
        section('/docs/cloud', { group: 'Cloud', groupOrder: 2, navTitle: 'FlowFuse Cloud' }),
    ])

    assert.deepEqual(
        findDocsBreadcrumb(nav, '/docs/user/teams/billing').map(c => [c.title, c.path]),
        [
            ['Using FlowFuse', '/docs/user'],
            ['teams', '/docs/user/teams'],
            ['Billing', '/docs/user/teams/billing'],
        ],
    )
})

test('findDocsBreadcrumb returns nothing for an unknown path', () => {
    const nav = buildDocsNav([section('/docs/user', { group: 'User Manuals', groupOrder: 1 })])
    assert.deepEqual(findDocsBreadcrumb(nav, '/docs/nonexistent'), [])
})

// Most section index pages in FlowFuse/flowfuse are `layout: redirect` stubs pointing at
// the section's introduction page. They still carry the frontmatter the section is
// grouped, labelled and ranked by.
function redirectStub (path, { group, groupOrder, order, navTitle } = {}) {
    return { ...section(path, { group, groupOrder, order, navTitle }), redirect: { to: path + '/introduction' } }
}

test('a redirect stub still groups, titles and ranks the section its children create', () => {
    const nav = buildDocsNav([
        redirectStub('/docs/user', { group: 'User Manuals', groupOrder: 1, order: 1, navTitle: 'Using FlowFuse' }),
        section('/docs/user/introduction', { order: 1, navTitle: 'Introduction' }),
        section('/docs/user/concepts', { order: 2, navTitle: 'Concepts' }),
    ])

    assert.deepEqual(names(nav), ['User Manuals'])
    const user = nav[0].children[0]
    assert.equal(user.title, 'Using FlowFuse')
    assert.equal(user.path, '/docs/user')
    assert.deepEqual(user.children.map(c => c.title), ['Introduction', 'Concepts'])
})

test('a redirect stub is not a link target, so the sidebar never points at a 301', () => {
    const nav = buildDocsNav([
        redirectStub('/docs/user', { group: 'User Manuals', groupOrder: 1, navTitle: 'Using FlowFuse' }),
        section('/docs/user/introduction', { order: 1, navTitle: 'Introduction' }),
    ])

    assert.equal(nav[0].children[0].link, false)
    // A real page in the same position stays linkable.
    const real = buildDocsNav([section('/docs/quick-start', { group: 'G', groupOrder: 1 })])
    assert.notEqual(real[0].children[0].link, false)
})

test('a group whose sections are all redirect stubs still renders', () => {
    // Device Agent, FlowFuse Cloud and Contributing each had every member stubbed, so the
    // group came out empty and was filtered away entirely.
    const nav = buildDocsNav([
        redirectStub('/docs/device-agent', { group: 'Device Agent', groupOrder: 2, order: 1, navTitle: 'Device Agent' }),
        section('/docs/device-agent/quickstart', { order: 1, navTitle: 'Quickstart' }),
        redirectStub('/docs/hardware', { group: 'Device Agent', groupOrder: 2, order: 2, navTitle: 'Hardware Guides' }),
        section('/docs/hardware/raspbian', { order: 1, navTitle: 'Raspberry Pi' }),
    ])

    assert.deepEqual(names(nav), ['Device Agent'])
    assert.deepEqual(nav[0].children.map(c => c.title), ['Device Agent', 'Hardware Guides'])
})

test('a stubbed section no longer falls into Other titled by its path segment', () => {
    const nav = buildDocsNav([
        redirectStub('/docs/admin', { group: 'Self-Hosted', groupOrder: 4, order: 4, navTitle: 'Administering FlowFuse' }),
        section('/docs/admin/introduction', { order: 1, navTitle: 'Introduction' }),
        section('/docs/quick-start', { group: 'Self-Hosted', groupOrder: 4, order: 1, navTitle: 'Quick Start' }),
    ])

    assert.deepEqual(names(nav), ['Self-Hosted'])
    assert.deepEqual(nav[0].children.map(c => c.title), ['Quick Start', 'Administering FlowFuse'])
})

test('a redirect stub with no pages beneath it contributes nothing', () => {
    // docs/admin/licensing.md and docs/community-support.md are leaf redirects with no
    // children; they should not appear as dead, unclickable labels.
    const nav = buildDocsNav([
        section('/docs/debugging', { group: 'Support', groupOrder: 5, navTitle: 'Debugging' }),
        redirectStub('/docs/community-support', { group: 'Support', groupOrder: 5 }),
    ])

    assert.deepEqual(nav[0].children.map(c => c.title), ['Debugging'])
})

test('breadcrumbs through a stubbed section use its real title', () => {
    const nav = buildDocsNav([
        redirectStub('/docs/user', { group: 'User Manuals', groupOrder: 1, navTitle: 'Using FlowFuse' }),
        section('/docs/user/concepts', { order: 1, navTitle: 'Concepts' }),
    ])

    assert.deepEqual(
        findDocsBreadcrumb(nav, '/docs/user/concepts').map(c => c.title),
        ['Using FlowFuse', 'Concepts'],
    )
})

// A node the tree only invented to hold children, e.g. /docs/user/teams when the only page
// beneath it is /docs/user/teams/billing, or a section whose index page is a redirect stub
// and so never reaches `linkable`. Both are navigable positions, neither is a page.
test('isPage separates real pages from the nodes the tree invented', () => {
    const nav = buildDocsNav([
        section('/docs/user', { group: 'User Manuals', groupOrder: 1, navTitle: 'Using FlowFuse' }),
        section('/docs/user/teams/billing', { order: 1, navTitle: 'Billing' }),
    ])

    const user = nav[0].children[0]
    assert.equal(user.isPage, true)
    assert.equal(user.children[0].path, '/docs/user/teams')
    assert.equal(user.children[0].isPage, false, 'teams holds billing but has no page of its own')
    assert.equal(user.children[0].children[0].isPage, true)
})

test('a stubbed section names and groups its pages without being one of them', () => {
    const nav = buildDocsNav([
        redirectStub('/docs/install', { group: 'Self-Hosted', groupOrder: 1, navTitle: 'Installing FlowFuse' }),
        section('/docs/install/introduction', { order: 1, navTitle: 'Introduction' }),
    ])

    const install = nav[0].children[0]
    assert.equal(install.title, 'Installing FlowFuse')
    assert.equal(install.isPage, false, 'a reader cannot land on it')
    assert.equal(install.children[0].isPage, true)
})

test('a redirect section is not a reading stop, but its pages are', () => {
    const nav = buildDocsNav([
        redirectStub('/docs/install', { group: 'Self-Hosted', groupOrder: 1, navTitle: 'Installing FlowFuse' }),
        section('/docs/install/introduction', { order: 1, navTitle: 'Introduction' }),
        section('/docs/install/kubernetes', { order: 2, navTitle: 'Kubernetes' }),
    ])

    assert.deepEqual(flattenDocsNav(nav).map(p => p.path), ['/docs/install/introduction', '/docs/install/kubernetes'])
    assert.deepEqual(findDocsSurround(nav, '/docs/install/introduction').map(p => p && p.path), [null, '/docs/install/kubernetes'])
})

const docsFixture = () => buildDocsNav([
    section('/docs/user', { group: 'User Manuals', groupOrder: 1, navTitle: 'Using FlowFuse', order: 1 }),
    section('/docs/user/concepts', { order: 2, navTitle: 'Concepts' }),
    section('/docs/user/teams/billing', { order: 1, navTitle: 'Billing' }),
    section('/docs/cloud', { group: 'Cloud', groupOrder: 2, navTitle: 'FlowFuse Cloud', order: 1 }),
    section('/docs/cloud/billing', { order: 2, navTitle: 'Cloud Billing' }),
])

test('flattenDocsNav reads in sidebar order, depth first, groups in group order', () => {
    assert.deepEqual(flattenDocsNav(docsFixture()).map(p => p.path), [
        '/docs/user',
        '/docs/user/concepts',
        '/docs/user/teams/billing',
        '/docs/cloud',
        '/docs/cloud/billing',
    ])
})

test('flattenDocsNav leaves out the invented nodes', () => {
    // /docs/user/teams sits between concepts and billing in the tree and must not appear.
    assert.ok(!flattenDocsNav(docsFixture()).some(p => p.path === '/docs/user/teams'))
})

test('each flattened page carries its group, so a card can say where it is going', () => {
    const byPath = Object.fromEntries(flattenDocsNav(docsFixture()).map(p => [p.path, p.group]))

    assert.equal(byPath['/docs/user/concepts'], 'User Manuals')
    assert.equal(byPath['/docs/cloud/billing'], 'Cloud')
})

test('a page in the middle gets both neighbours', () => {
    const [prev, next] = findDocsSurround(docsFixture(), '/docs/user/concepts')

    assert.deepEqual([prev.path, prev.title], ['/docs/user', 'Using FlowFuse'])
    assert.deepEqual([next.path, next.title], ['/docs/user/teams/billing', 'Billing'])
})

test('the reading path continues across a group boundary', () => {
    // Last page of User Manuals leads into the first page of Cloud, which is why each
    // neighbour carries its group name.
    const [prev, next] = findDocsSurround(docsFixture(), '/docs/user/teams/billing')

    assert.equal(next.path, '/docs/cloud')
    assert.equal(next.group, 'Cloud')
    assert.equal(prev.group, 'User Manuals')
})

test('the first page has no previous and the last has no next', () => {
    const nav = docsFixture()

    assert.equal(findDocsSurround(nav, '/docs/user')[0], null)
    assert.equal(findDocsSurround(nav, '/docs/cloud/billing')[1], null)
})

test('a trailing slash on the current path still finds the neighbours', () => {
    // route.path arrives with the trailing slash on a prerendered page; the tree stores
    // paths without it.
    const [prev, next] = findDocsSurround(docsFixture(), '/docs/user/concepts/')

    assert.equal(prev.path, '/docs/user')
    assert.equal(next.path, '/docs/user/teams/billing')
})

test('an unknown path, or an invented node, has no neighbours at all', () => {
    const nav = docsFixture()

    // Offering neighbours for a position that renders no page would put a pair of links
    // on a page that does not exist.
    assert.deepEqual(findDocsSurround(nav, '/docs/user/teams'), [null, null])
    assert.deepEqual(findDocsSurround(nav, '/docs/nonexistent'), [null, null])
})

test('a single-page manual has no neighbours either way', () => {
    const nav = buildDocsNav([section('/docs/only', { group: 'G', groupOrder: 1 })])

    assert.deepEqual(findDocsSurround(nav, '/docs/only'), [null, null])
})

test('flattening an empty tree is empty, not an error', () => {
    assert.deepEqual(flattenDocsNav([]), [])
    assert.deepEqual(findDocsSurround([], '/docs/user'), [null, null])
})
