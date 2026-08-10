import { test } from 'node:test'
import assert from 'node:assert/strict'

import { buildDocsNav } from './docs-nav.mjs'

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
    assert.equal(user.name, 'Using FlowFuse')
    assert.deepEqual(user.children.map(c => c.name), ['Introduction', 'Concepts', 'teams'])
    assert.deepEqual(user.children[2].children.map(c => c.name), ['Billing'])
})

test('name falls back to title then to the path segment', () => {
    const nav = buildDocsNav([
        { path: '/docs/a', navGroup: 'G', navGroupOrder: 1, navOrder: 1, navTitle: 'Nav wins', title: 'Title loses' },
        { path: '/docs/b', navGroup: 'G', navGroupOrder: 1, navOrder: 2, title: 'Title used' },
        { path: '/docs/c', navGroup: 'G', navGroupOrder: 1, navOrder: 3 },
    ])

    assert.deepEqual(nav[0].children.map(c => c.name), ['Nav wins', 'Title used', 'c'])
})

test('pages outside /docs are ignored', () => {
    assert.deepEqual(buildDocsNav([section('/handbook/company', { group: 'Company', groupOrder: 1 })]), [])
    assert.deepEqual(buildDocsNav([]), [])
})
