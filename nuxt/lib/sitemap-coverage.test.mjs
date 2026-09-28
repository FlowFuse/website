import { test } from 'node:test'
import assert from 'node:assert/strict'

import { CONTENT_SECTIONS, sitemapProblems } from './sitemap-coverage.mjs'

const url = (path, lastmod) =>
    `<url><loc>https://flowfuse.com${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
const sitemap = urls => `<?xml version="1.0" encoding="UTF-8"?><urlset>${urls.join('')}</urlset>`
const complete = () => CONTENT_SECTIONS.map(section => url(`/${section}/page/`, '2026-01-01'))

test('a sitemap with every section, all dated, has no problems', () => {
    assert.deepEqual(sitemapProblems(sitemap(complete())), [])
})

test('a missing section is reported by name', () => {
    const urls = complete().filter(u => !u.includes('/changelog/'))
    const problems = sitemapProblems(sitemap(urls))
    assert.equal(problems.length, 1)
    assert.match(problems[0], /no \/changelog\/ URLs/)
})

test('a git-dated section with no lastmod at all is reported', () => {
    const urls = complete().map(u => u.includes('/handbook/') ? url('/handbook/page/') : u)
    const problems = sitemapProblems(sitemap(urls))
    assert.equal(problems.length, 1)
    assert.match(problems[0], /\/handbook\/ URLs has a lastmod/)
})

test('a git-dated section with some dates is fine', () => {
    const urls = [...complete(), url('/handbook/undated/')]
    assert.deepEqual(sitemapProblems(sitemap(urls)), [])
})

test('the blog may be undated, since only some posts take their date from git', () => {
    const urls = complete().map(u => u.includes('/blog/') ? url('/blog/page/') : u)
    assert.deepEqual(sitemapProblems(sitemap(urls)), [])
})

test('pages outside the content sections do not count towards a section', () => {
    const urls = [...complete().filter(u => !u.includes('/ebooks/')), url('/ebooks-landing/')]
    assert.match(sitemapProblems(sitemap(urls))[0], /no \/ebooks\/ URLs/)
})
