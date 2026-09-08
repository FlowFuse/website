// Guards on src/_data/chrome.json, the shared marketing nav and footer.
//
// The file is rendered by two independent templates, so the things that can drift
// are checked here rather than left to a reviewer noticing.
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const chrome = JSON.parse(readFileSync(join(repo, 'src/_data/chrome.json'), 'utf8'))

const navLinks = chrome.header.dropdowns.flatMap(d => d.columns.flatMap(c => c.links))
// A "Start building" row is either a reserved CTA destination (no href of its
// own - ctaDestinations.json holds it) or an ordinary page link.
const startBuildingLinks = chrome.header.startBuilding.items.filter(i => i.href)
const footerLinks = [
    ...chrome.footer.sections.flatMap(s => s.groups.flatMap(g => g.links)),
    ...chrome.footer.company.grid.flatMap(g => g.links),
    ...chrome.footer.company.trailing.links,
]
// A dropdown that has a landing page is a link as well as a panel trigger.
const dropdownLandingLinks = chrome.header.dropdowns.filter(d => d.href)
const allLinks = [...navLinks, ...chrome.header.direct, ...dropdownLandingLinks,
    ...startBuildingLinks, ...footerLinks]

// Every row that draws an icon, whichever list it came from - the two guards
// below are about the icon set, not about where the link points.
const iconRows = [...navLinks, ...chrome.header.startBuilding.items]

test('every icon key resolves to an icon file', () => {
    for (const { icon, label, cta } of iconRows) {
        assert.ok(icon, `${label || cta} has no icon`)
        assert.ok(existsSync(join(repo, `src/_includes/components/icons/${icon}.svg`)),
            `${label || cta} points at a missing icon: ${icon}.svg`)
    }
})

test('every icon key is in the Nuxt icon map', () => {
    // Eleventy loads icons off disk by name, Nuxt needs an explicit import.
    const map = readFileSync(join(repo, 'nuxt/utils/navIcons.ts'), 'utf8')
    const covered = new Set([...map.matchAll(/^\s*'([^']+)':/gm)].map(m => m[1]))
    for (const { icon, label, cta } of iconRows) {
        assert.ok(covered.has(icon),
            `${label || cta} uses icon "${icon}" - add it to nuxt/utils/navIcons.ts`)
    }
})

test('no nav or footer link points at a redirected path', () => {
    // A 301 makes an old URL keep working, which also makes the link checker
    // accept it. So a page that was removed and redirected can sit in the nav
    // indefinitely, still labelled, pointing somewhere it was never meant to.
    // Advertise the destination, not the redirect.
    // Both maps, because they are written in different shapes. nuxt/redirects.ts uses the
    // full Nitro rule object; nuxt/redirects-node-red.ts is a plain `from: to` record fed
    // through a builder. Reading only the first left every /node-red/** redirect invisible
    // here, which is exactly the set most likely to be left behind in the nav.
    const redirectsSrc = readFileSync(join(repo, 'nuxt/redirects.ts'), 'utf8')
    const nodeRedSrc = readFileSync(join(repo, 'nuxt/redirects-node-red.ts'), 'utf8')
    const sources = new Set(
        [
            ...redirectsSrc.matchAll(/^\s*'([^']+)':\s*{\s*redirect:\s*{\s*to:\s*'([^']+)'/gm),
            ...nodeRedSrc.matchAll(/^\s*'([^']+)':\s*'([^']+)',/gm),
        ]
            // A rule whose destination is its own source sends the link nowhere
            // else, so it is not the drift this test is looking for. There is one
            // in the file today (/docs/user/expert/), which is its own bug.
            .filter(([, from, to]) => from !== to)
            .map(([, from]) => from)
    )
    for (const { href, label } of allLinks) {
        assert.ok(!sources.has(href),
            `"${label}" links to ${href}, which redirects elsewhere in nuxt/redirects.ts. `
            + 'Point it at the destination or drop the entry.')
    }
})

test('both Tailwind builds resolve an @source onto the data file', () => {
    // There are two independent Tailwind builds: src/css/style.css for Eleventy and
    // nuxt/assets/css/theme.css for the Nuxt bundle, which only scans nuxt/ and is
    // loaded second. A utility that exists in one build but not the other loses to
    // any lower-breakpoint rule the later sheet does have. Dropping either @source
    // silently breaks layout on half the site.
    //
    // Tailwind resolves @source relative to the stylesheet that declares it, and
    // says nothing when the path misses, so check where each one actually lands
    // rather than that the line reads plausibly. A wrong number of ../ steps is
    // the failure this is here to catch.
    const target = join(repo, 'src/_data/chrome.json')
    for (const css of ['src/css/style.css', 'nuxt/assets/css/theme.css']) {
        const text = readFileSync(join(repo, css), 'utf8')
        const declared = text.match(/@source\s+"([^"]*_data\/chrome\.json)"/)
        assert.ok(declared, `${css} must declare @source for src/_data/chrome.json`)
        const landed = resolve(dirname(join(repo, css)), declared[1])
        assert.equal(landed, target,
            `${css} declares @source "${declared[1]}", which resolves to ${landed} `
            + 'instead of src/_data/chrome.json, so that build scans nothing')
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

test('every dropdown column is placed in its own column track', () => {
    // The panel is two rows - one for the eyebrows, one for the lists - and one
    // track per column. Each list then lays its own links out inside its single
    // cell. It used to be one shared row per link across every column, which
    // meant a tall row in one column set the spacing of the plain link beside
    // it, so a two-link column got stretched to the height of a six-row one.
    // A column that is placed in the wrong track silently lands on top of
    // another one, so the track numbers are checked rather than assumed.
    for (const dd of chrome.header.dropdowns) {
        // The row template lives in style.css, deliberately: an arbitrary
        // Tailwind value written in this JSON is not extracted, so a class here
        // would compile to nothing and the panel would lose its rows silently.
        assert.doesNotMatch(dd.megaClasses, /grid-rows-/,
            `${dd.label} declares grid rows as a class; put them in style.css`)
        dd.columns.forEach((col, i) => {
            const track = i + 1
            assert.match(col.listClasses, new RegExp(`md:col-start-${track}\\b`),
                `${dd.label} > "${col.title}" is column ${track} but its list is not in that track`)
            assert.match(col.titleGrid, new RegExp(`md:col-start-${track}\\b`),
                `${dd.label} > "${col.title}" is column ${track} but its eyebrow is not in that track`)
            // A column with no eyebrow has nothing above its list, so the list
            // takes both rows; one with an eyebrow starts on the second.
            const expected = col.title ? 'md:row-start-2' : 'md:row-start-1 md:row-span-2'
            assert.ok(col.listClasses.includes(expected),
                `${dd.label} > "${col.title}" should place its list with "${expected}"`)
        })
    }
})

test('every Start building row names exactly one destination', () => {
    // The menu is the header's primary action and each row is one way to get a
    // first instance running, so a row that resolves to nothing (or to two
    // things) is a dead primary action rather than a cosmetic slip. A `cta` row
    // deliberately carries no label or href: ctaDestinations.json owns that
    // row's copy, URL and PostHog event, which is what keeps every sign-up
    // click on a single event name across both renderers.
    const ctaDestinations = JSON.parse(
        readFileSync(join(repo, 'src/_data/ctaDestinations.json'), 'utf8'))
    const items = chrome.header.startBuilding.items
    assert.ok(items.length > 0, 'the Start building menu has no rows')
    assert.ok(chrome.header.startBuilding.label, 'the Start building menu has no trigger label')
    for (const item of items) {
        if (item.cta) {
            assert.ok(!item.href && !item.label,
                `Start building row "${item.cta}" also sets a label or href - `
                + 'a cta row takes both from src/_data/ctaDestinations.json')
            assert.ok(ctaDestinations[item.cta],
                `Start building row names cta "${item.cta}", which is not in `
                + 'src/_data/ctaDestinations.json')
        } else {
            assert.ok(item.href && item.label,
                `Start building row ${JSON.stringify(item)} needs both a label and an href`)
        }
    }
})

test('the Start building menu is rendered by both renderers', () => {
    // Two independent templates draw this menu, and the Eleventy one is an
    // include rather than a component import, so nothing but a check like this
    // notices if one of them is dropped and the header quietly loses its
    // primary action on half the site.
    const eleventy = readFileSync(join(repo, 'src/_includes/layouts/base.njk'), 'utf8')
    const nuxtHeader = readFileSync(join(repo, 'nuxt/components/AppHeader.vue'), 'utf8')
    // Once for the desktop CTA cluster, once for the mobile drawer.
    assert.equal(eleventy.match(/components\/nav-start-building\.njk/g)?.length, 2)
    assert.equal(nuxtHeader.match(/<NavStartBuilding/g)?.length, 2)
})

test('a dropdown landing page is not one of its own panel links', () => {
    // The trigger and the row would then be two ways to the same page sitting a
    // few pixels apart, which reads as a mistake rather than a shortcut. The
    // Platform panel is the exception and states it: /product/ is the first row
    // of its Overview column on purpose, because that column IS the product
    // list and dropping the row would hide the overview from the panel.
    const allowed = new Set(['Platform'])
    for (const dd of chrome.header.dropdowns) {
        if (!dd.href || allowed.has(dd.label)) continue
        const clash = dd.columns.flatMap(c => c.links).find(l => l.href === dd.href)
        assert.ok(!clash, `${dd.label} links to ${dd.href}, which is also its `
            + `"${clash?.label}" row - drop one of the two`)
    }
})

test('a described row keeps its description a plain one-liner', () => {
    // Descriptions render as text, not markup, and sit on one nav row: a long
    // one wraps past the two lines the row reserves and pushes the panel taller
    // than the rows beside it.
    for (const { label, description } of navLinks) {
        if (description === undefined) continue
        assert.equal(typeof description, 'string', `${label} has a non-string description`)
        assert.ok(!/[<>]/.test(description), `${label}'s description contains markup`)
        assert.ok(description.length <= 80,
            `${label}'s description is ${description.length} chars - keep it under 80`)
    }
})

test('the footer bottom row keeps its two alignment slots', () => {
    // 4/2/2/2 on purpose: the nested grid lines up under the Solutions
    // sub-columns above and the trailing group under Resources.
    assert.equal(chrome.footer.company.grid.length, 3)
    assert.ok(chrome.footer.company.trailing.links.length > 0)
})
