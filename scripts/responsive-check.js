// Scripted responsive sweep across 4 viewports (NO MCP browser).
// Navigates a representative URL per cluster (docs + handbook emphasised),
// screenshots each to /tmp/responsive/<viewport>/<name>.png, and flags layout
// problems: horizontal overflow, off-screen content, missing render signals.
// Run: node scripts/responsive-check.js   (optional: ONLY=docs-page,handbook-page)
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
const OUT = process.env.OUT || '/tmp/responsive'

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
]

const THIRD_PARTY = [
  'hubspot', 'hsforms', 'hs-scripts', 'hs-analytics', 'hscollectedforms',
  'algolia', 'googletagmanager', 'google-analytics', 'gstatic', 'googleapis',
  'youtube', 'ytimg', 'doubleclick', 'cdn.jsdelivr', 'unpkg', 'segment',
  'cookieconsent', 'reo.dev', 'clarity.ms', 'linkedin', 'facebook', 'twitter',
  'cdn.cookielaw', 'usemessages', 'hs-banner', 'hubspotusercontent',
]
const isThirdParty = (s = '') => THIRD_PARTY.some((h) => s.includes(h))

// Representative URL per cluster; docs + handbook get extra coverage.
const URLS = [
  ['home', '/'],
  ['docs-index', '/docs/'],
  ['docs-page', '/docs/device-agent/introduction/'],
  ['docs-deep', '/docs/user/concepts/'],
  ['handbook-index', '/handbook/'],
  ['handbook-page', '/handbook/company/board/'],
  ['handbook-eng', '/handbook/engineering/'],
  ['blog-index', '/blog/'],
  ['blog-post-tldr', '/blog/2026/04/it-vs-ot-who-owns-the-edge/'],
  ['blog-category-plc', '/blog/plc/'],
  ['pricing', '/pricing/'],
  ['solutions', '/solutions/it-ot-middleware/'],
  ['changelog', '/changelog/'],
  ['node-red', '/node-red/'],
  ['integrations', '/integrations/'],
]

const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null
const TARGETS = URLS.filter(([n]) => !ONLY || ONLY.includes(n))

;(async () => {
  const browser = await chromium.launch({
    // Use a system Chrome via CHROME_PATH if provided, else Playwright's bundled Chromium.
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })

  const all = []
  for (const vp of VIEWPORTS) {
    const dir = path.join(OUT, vp.name)
    fs.mkdirSync(dir, { recursive: true })
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 })

    for (const [name, u] of TARGETS) {
      const page = await ctx.newPage()
      const consoleErrors = []
      page.on('console', (m) => {
        if (m.type() !== 'error') return
        const loc = (m.location() && m.location().url) || ''
        if (isThirdParty(loc) || isThirdParty(m.text())) return
        consoleErrors.push(m.text().slice(0, 200))
      })

      let status = null
      try {
        const resp = await page.goto(BASE + u, { waitUntil: 'load', timeout: 45000 })
        status = resp ? resp.status() : null
        await page.waitForTimeout(1200)
      } catch (e) {
        consoleErrors.push('NAV: ' + (e.message || String(e)).slice(0, 150))
      }

      const m = await page.evaluate(() => {
        const de = document.documentElement
        const overflowX = de.scrollWidth - de.clientWidth
        // find elements wider than the viewport (likely overflow culprits)
        const vw = window.innerWidth
        const wide = []
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width > vw + 2 && r.height > 4) {
            const cls = (el.className && el.className.toString ? el.className.toString() : '').slice(0, 60)
            wide.push(el.tagName.toLowerCase() + (cls ? '.' + cls.trim().replace(/\s+/g, '.') : '') + ' w=' + Math.round(r.width))
          }
          if (wide.length >= 6) break
        }
        const sidebar = document.querySelector('aside, [class*="sidebar"], nav[class*="side"]')
        return {
          overflowX,
          scrollWidth: de.scrollWidth,
          clientWidth: de.clientWidth,
          wide,
          bodyLen: document.body ? document.body.innerText.length : 0,
          hasNuxt: !!document.getElementById('__nuxt'),
          sidebarVisible: sidebar ? (sidebar.getBoundingClientRect().width > 0 && getComputedStyle(sidebar).display !== 'none') : null,
          sidebarWidth: sidebar ? Math.round(sidebar.getBoundingClientRect().width) : null,
          h1: (document.querySelector('h1') || {}).innerText || '',
        }
      }).catch(() => ({ overflowX: 0, wide: [], bodyLen: 0, hasNuxt: false }))

      await page.screenshot({ path: path.join(dir, name + '.png'), fullPage: true }).catch(() => {})
      all.push({ vp: vp.name, name, u, status, ...m, consoleErrors })
      await page.close()
    }
    await ctx.close()
  }
  await browser.close()
  fs.mkdirSync(OUT, { recursive: true })
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(all, null, 2))

  let flagged = 0
  for (const r of all) {
    const overflow = r.overflowX > 3
    const bad = overflow || (r.status && r.status >= 400) || r.consoleErrors.length || r.bodyLen < 200 || !r.hasNuxt
    if (bad) flagged++
    console.log(
      `[${bad ? 'FLAG' : ' ok '}] ${r.vp.padEnd(7)} ${r.u.padEnd(46)} status=${r.status} ovfX=${r.overflowX} sb=${r.sidebarVisible}/${r.sidebarWidth} body=${r.bodyLen}`
    )
    if (overflow) for (const w of r.wide) console.log('         WIDE: ' + w)
    for (const e of r.consoleErrors.slice(0, 3)) console.log('         CONSOLE: ' + e)
  }
  console.log(`\n=== ${all.length} captures (${TARGETS.length} urls x ${VIEWPORTS.length} viewports), ${flagged} flagged ===`)
  process.exit(0)
})().catch((e) => { console.error('FATAL', e); process.exit(1) })
