// Nuxt-only smoke sweep: navigate a representative URL per migrated cluster,
// capture uncaught page errors / console errors / render signals, screenshot
// each to OUT (default /tmp/smoke), then exit. Run via: node scripts/visual-check.js
// Requires Playwright (npx playwright install chromium). Screenshots go to /tmp,
// never the repo. Set CHROME_PATH to use a system Chrome instead of the bundled one.
const fs = require('node:fs')
const path = require('node:path')

let chromium
try {
  ;({ chromium } = require('playwright'))
} catch (_) {
  console.error('Playwright is required for this QA script. Install it with:\n  npx playwright install chromium\nor add it as a devDependency: npm i -D playwright')
  process.exit(2)
}

const BASE = process.env.BASE || 'http://localhost:3000'
const OUT = process.env.OUT || '/tmp/smoke'
fs.mkdirSync(OUT, { recursive: true })

// Third-party hosts whose failures are expected when serving the static site
// offline (no real network/keys) — not migration bugs.
const THIRD_PARTY = [
  'hubspot', 'hsforms', 'hs-scripts', 'hs-analytics', 'hscollectedforms',
  'algolia', 'googletagmanager', 'google-analytics', 'gstatic', 'googleapis',
  'youtube', 'ytimg', 'doubleclick', 'cdn.jsdelivr', 'unpkg', 'segment',
  'cookieconsent', 'reo.dev', 'clarity.ms', 'linkedin', 'facebook', 'twitter',
  'cdn.cookielaw', 'usemessages', 'hs-banner', 'hubspotusercontent',
]
const isThirdParty = (s = '') => THIRD_PARTY.some((h) => s.includes(h))

const URLS = [
  ['home', '/'],
  ['pricing', '/pricing/'],
  ['about', '/about/'],
  ['blog-index', '/blog/'],
  ['blog-category', '/blog/flowfuse/'],
  ['blog-post', '/blog/2025/01/flowfuse-release-2-13/'],
  ['changelog-index', '/changelog/'],
  ['changelog-entry', '/changelog/2023/09/custom-node-support/'],
  ['handbook-index', '/handbook/'],
  ['handbook-page', '/handbook/company/board/'],
  ['docs-index', '/docs/'],
  ['docs-page', '/docs/admin/introduction/'],
  ['stories-index', '/customer-stories/'],
  ['stories-detail', '/customer-stories/leveraging-node-red-and-flowfuse-to-automate-precision-manufacturing/'],
  ['webinars-index', '/webinars/'],
  ['webinar-detail', '/webinars/2023/dashboard-20/'],
  ['ama', '/ask-me-anything/ama-nodered-april/'],
  ['ebook', '/ebooks/beginner-guide-to-a-professional-nodered/'],
  ['solutions', '/solutions/it-ot-middleware/'],
  ['vs', '/vs/kepware/'],
  ['whitepaper', '/whitepaper/open-source-software-for-manufacturing/'],
  ['jobs', '/jobs/solutions-engineer/'],
  ['partners', '/partners/'],
  ['integrations-index', '/integrations/'],
  ['integration-detail', '/integrations/@flowfuse/node-red-dashboard-2-user-addon/'],
  ['node-red-index', '/node-red/'],
  ['node-red-core-node', '/node-red/core-nodes/batch/'],
  ['events', '/events/hannover-messe-2026/'],
  ['platform-dashboard', '/platform/dashboard/'],
  ['platform-device-agent', '/platform/device-agent/'],
]

const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null

;(async () => {
  const browser = await chromium.launch({
    // Use a system Chrome via CHROME_PATH if provided, else Playwright's bundled Chromium.
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } })
  const results = []

  for (const [name, u] of URLS.filter(([n]) => !ONLY || ONLY.includes(n))) {
    const page = await ctx.newPage()
    const consoleErrors = []
    const pageErrors = []
    const firstPartyFailedReq = []
    page.on('console', (m) => {
      if (m.type() !== 'error') return
      const loc = m.location() && m.location().url ? m.location().url : ''
      if (isThirdParty(loc) || isThirdParty(m.text())) return
      consoleErrors.push(m.text().slice(0, 300))
    })
    page.on('pageerror', (e) => pageErrors.push((e.message || String(e)).slice(0, 300)))
    page.on('requestfailed', (req) => {
      const url = req.url()
      if (isThirdParty(url)) return
      if (url.startsWith(BASE)) firstPartyFailedReq.push(url.replace(BASE, '') + ' (' + (req.failure() && req.failure().errorText) + ')')
    })
    page.on('response', (resp) => {
      const url = resp.url()
      if (isThirdParty(url) || !url.startsWith(BASE)) return
      if (resp.status() >= 400) firstPartyFailedReq.push(url.replace(BASE, '') + ' (HTTP ' + resp.status() + ')')
    })

    let status = null
    try {
      const resp = await page.goto(BASE + u, { waitUntil: 'load', timeout: 45000 })
      status = resp ? resp.status() : null
      await page.waitForTimeout(1800) // let client hydration settle
    } catch (e) {
      pageErrors.push('NAV: ' + (e.message || String(e)).slice(0, 200))
    }

    const title = await page.title().catch(() => '')
    const info = await page.evaluate(() => {
      const text = document.body ? document.body.innerText : ''
      return {
        bodyLen: text.length,
        hasNuxt: !!document.getElementById('__nuxt'),
        hasHeader: !!document.querySelector('header, nav'),
        hasFooter: !!document.querySelector('footer'),
        looks404: /page not found|404/i.test(text.slice(0, 400)),
        h1: (document.querySelector('h1') || {}).innerText || '',
      }
    }).catch(() => ({ bodyLen: 0, hasNuxt: false, hasHeader: false, hasFooter: false, looks404: false, h1: '' }))

    await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: false }).catch(() => {})
    results.push({ name, u, status, title, ...info, consoleErrors, pageErrors, firstPartyFailedReq })
    await page.close()
  }

  await browser.close()
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(results, null, 2))

  let fails = 0
  for (const r of results) {
    const bad =
      (r.status && r.status >= 400) ||
      r.pageErrors.length ||
      r.consoleErrors.length ||
      r.firstPartyFailedReq.length ||
      r.looks404 ||
      r.bodyLen < 200 ||
      !r.hasNuxt
    if (bad) fails++
    console.log(
      `[${bad ? 'FAIL' : ' ok '}] ${r.u}  status=${r.status} body=${r.bodyLen} nuxt=${r.hasNuxt} hdr=${r.hasHeader} ftr=${r.hasFooter} 404=${r.looks404} h1="${(r.h1 || '').slice(0, 50)}"`
    )
    for (const e of r.pageErrors) console.log('      PAGEERR: ' + e)
    for (const e of r.consoleErrors.slice(0, 6)) console.log('      CONSOLE: ' + e)
    for (const e of r.firstPartyFailedReq.slice(0, 6)) console.log('      REQFAIL: ' + e)
  }
  console.log(`\n=== ${results.length} URLs, ${fails} flagged ===`)
  process.exit(0)
})().catch((e) => { console.error('FATAL', e); process.exit(1) })
