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

// A node the tree only invented to hold children, e.g. /docs/user/teams when the pages are
// /docs/user/teams/billing, or /docs/install when install/index.md is a redirect and so
// never reaches `linkable`. Both are navigable positions, neither is a page.
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

test('a redirect page still names and groups its section, but is not a page', () => {
    const nav = buildDocsNav([
        { path: '/docs/install', navGroup: 'Self-Hosted', navGroupOrder: 1, navTitle: 'Installing FlowFuse', redirect: { to: '/docs/install/introduction' } },
        section('/docs/install/introduction', { order: 1, navTitle: 'Introduction' }),
    ])

    // The section's title and group are declared on the redirect page. Dropping it used to
    // cost the section both, leaving a sidebar entry called "install" inside Other.
    assert.deepEqual(names(nav), ['Self-Hosted'])
    const install = nav[0].children[0]
    assert.equal(install.title, 'Installing FlowFuse')
    assert.equal(install.isPage, false, 'a reader cannot land on it')
    assert.equal(install.redirectTo, '/docs/install/introduction')
    assert.equal(install.children[0].isPage, true)
})

test('a childless redirect page keeps its target, for an entry that still goes somewhere', () => {
    // docs/community-support.md points at the Node-RED forum and has no children. The
    // sidebar links these straight to the target rather than to the redirecting URL.
    const nav = buildDocsNav([
        { path: '/docs/community-support', navGroup: 'Support', navGroupOrder: 1, navTitle: 'Community Support', redirect: { to: 'https://discourse.nodered.org/c/vendors/flowfuse/24' } },
    ])

    const entry = nav[0].children[0]
    assert.equal(entry.title, 'Community Support')
    assert.equal(entry.isPage, false)
    assert.equal(entry.redirectTo, 'https://discourse.nodered.org/c/vendors/flowfuse/24')
    assert.deepEqual(entry.children, [])
})

test('a position invented to hold children has no redirect target', () => {
    const nav = buildDocsNav([
        section('/docs/user', { group: 'User Manuals', groupOrder: 1, navTitle: 'Using FlowFuse' }),
        section('/docs/user/teams/billing', { order: 1, navTitle: 'Billing' }),
    ])

    const teams = nav[0].children[0].children[0]
    assert.equal(teams.path, '/docs/user/teams')
    assert.equal(teams.isPage, false)
    assert.equal(teams.redirectTo, undefined, 'nothing to link it to, so it renders as text')
})

test('a redirect section is not a reading stop, but its pages are', () => {
    const nav = buildDocsNav([
        { path: '/docs/install', navGroup: 'Self-Hosted', navGroupOrder: 1, navTitle: 'Installing FlowFuse', redirect: { to: '/docs/install/introduction' } },
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
