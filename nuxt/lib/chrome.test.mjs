// Guards on src/_data/chrome.json, the shared marketing nav and footer.
//
// The file is rendered by two independent templates, so the things that can drift
// are checked here rather than left to a reviewer noticing.
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const chrome = JSON.parse(readFileSync(join(repo, 'src/_data/chrome.json'), 'utf8'))

const navLinks = chrome.header.dropdowns.flatMap(d => d.columns.flatMap(c => c.links))
const footerLinks = [
    ...chrome.footer.sections.flatMap(s => s.groups.flatMap(g => g.links)),
    ...chrome.footer.company.grid.flatMap(g => g.links),
    ...chrome.footer.company.trailing.links,
]
const allLinks = [...navLinks, ...chrome.header.direct, ...footerLinks]

test('every icon key resolves to an icon file', () => {
    for (const { icon, label } of navLinks) {
        assert.ok(icon, `${label} has no icon`)
        assert.ok(existsSync(join(repo, `src/_includes/components/icons/${icon}.svg`)),
            `${label} points at a missing icon: ${icon}.svg`)
    }
})

test('every icon key is in the Nuxt icon map', () => {
    // Eleventy loads icons off disk by name, Nuxt needs an explicit import.
    const map = readFileSync(join(repo, 'nuxt/utils/navIcons.ts'), 'utf8')
    const covered = new Set([...map.matchAll(/^\s*'([^']+)':/gm)].map(m => m[1]))
    for (const { icon, label } of navLinks) {
        assert.ok(covered.has(icon),
            `${label} uses icon "${icon}" - add it to nuxt/utils/navIcons.ts`)
    }
})

test('no nav or footer link points at a redirected path', () => {
    // A 301 makes an old URL keep working, which also makes the link checker
    // accept it. So a page that was removed and redirected can sit in the nav
    // indefinitely, still labelled, pointing somewhere it was never meant to.
    // Advertise the destination, not the redirect.
    const redirects = readFileSync(join(repo, 'src/redirects.njk'), 'utf8')
    const sources = new Set(
        redirects.split('\n')
            .map(l => l.trim())
            .filter(l => l.startsWith('/'))
            .map(l => l.split(/\s+/))
            // A rule whose destination is its own source sends the link nowhere
            // else, so it is not the drift this test is looking for. There is one
            // in the file today (/docs/user/expert/), which is its own bug.
            .filter(([from, to]) => from !== to)
            .map(([from]) => from)
    )
    for (const { href, label } of allLinks) {
        assert.ok(!sources.has(href),
            `"${label}" links to ${href}, which redirects elsewhere in src/redirects.njk. `
            + 'Point it at the destination or drop the entry.')
    }
})

test('both Tailwind builds are told to scan the data file', () => {
    // There are two independent Tailwind builds: src/css/style.css for Eleventy and
    // nuxt/assets/css/theme.css for the Nuxt bundle, which only scans nuxt/ and is
    // loaded second. A utility that exists in one build but not the other loses to
    // any lower-breakpoint rule the later sheet does have. Dropping either @source
    // silently breaks layout on half the site, so assert both are present.
    for (const css of ['src/css/style.css', 'nuxt/assets/css/theme.css']) {
        const text = readFileSync(join(repo, css), 'utf8')
        assert.match(text, /@source\s+"[^"]*_data\/chrome\.json"/,
            `${css} must declare @source for src/_data/chrome.json`)
    }
})

test('every utility class in the data file is a plain literal', () => {
    // Tailwind extracts candidates as literal text. A class assembled at render
    // time would never reach either build, so the class strings have to be whole.
    const classFields = [
        ...chrome.header.dropdowns.flatMap(d => [d.megaClasses,
            ...d.columns.flatMap(c => [c.titleGrid, c.listClasses])]),
        ...chrome.footer.sections.flatMap(s => [s.gridClasses, ...s.groups.map(g => g.classes)]),
    ].filter(Boolean)
    assert.ok(classFields.length > 0)
    for (const field of classFields) {
        assert.ok(!/[{}$]/.test(field), `class string looks interpolated: ${field}`)
    }
})

test('the footer bottom row keeps its two alignment slots', () => {
    // 4/2/2/2 on purpose: the nested grid lines up under the Solutions
    // sub-columns above and the trailing group under Resources.
    assert.equal(chrome.footer.company.grid.length, 3)
    assert.ok(chrome.footer.company.trailing.links.length > 0)
})
