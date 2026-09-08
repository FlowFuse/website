import { test } from 'node:test'
import assert from 'node:assert/strict'

import { buildDocsNav, findDocsBreadcrumb } from './docs-nav.mjs'

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
