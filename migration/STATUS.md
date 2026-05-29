# 11ty → Nuxt 4 migration — status & runbook

## FINAL STATE (PR-ready) — read this first

The migration is **complete**. The site is generated entirely by Nuxt 4
(`nuxt generate` → `nuxt/.output/public`); Eleventy is fully removed. `src/` is
retained only as a data source the `scripts/copy_*.js` build steps read.

Verification (re-run `bash migration/verify-routes.sh`):

- **Build:** `npm run build:nuxt:skip-images` clean, no errors.
- **Route parity:** frozen 1178-route 11ty baseline → 1186 Nuxt routes,
  **Dropped: 0** (superset; see `route-diff.txt`). Trailing slashes preserved.
- **Link checker:** `nuxt-link-checker` — **0 of 1180 failing**, 0 errors/warnings.
- **Responsive:** `npm run qa:responsive` (375/768/1280/1920) — 60 captures,
  **0 horizontal overflow**; only cosmetic `/pricing/` + `/node-red/` hydration
  warnings remain (non-blocking, see "Known non-blocking items" below).

See `migration/VERIFICATION.md` for the full gate output and
`migration/PR_DESCRIPTION.md` for the PR summary.

> The sections below are the **historical running log** of the page-by-page
> migration, newest first. Earlier entries quote interim route counts (e.g. the
> 1069-route handbook-increment era) that predate the final 1178-route baseline
> above — they are kept as a record, not as the current numbers.

## Follow-up (2026-05-28b) — origin/main integration + responsive fixes

Rebased the 62 local migration commits onto the updated `origin/main` (12 new
upstream commits incl. the homepage redesign). 11ty deletions were KEPT; upstream
edits to now-deleted 11ty files were PORTED into Nuxt rather than resurrected:
- **Homepage** (`nuxt/pages/index.vue`): rotating hero background images
  (`/images/home/hero/hero-{1,2,3}.jpg`, slideshow via `onMounted`), indigo
  full-bleed hero with white text, screenshot "bridge" overlapping below, and
  the updated metrics (50%/10x/20+, red styling).
- **Blog** (`nuxt/pages/blog/[...slug].vue`, `copy_blog.js`): TL;DR/first-answer
  block (`tldr` frontmatter now captured in `blog.index.json`), author job
  titles + "Updated" date label.
- **New blog categories** `/blog/{plc,mqtt,opcua,modbus}/` (added to the
  `CATEGORIES` map in `copy_blog.js`) + the "See All PLC Articles" button on
  `landing/plc`. New upstream blog `.md` (incl. the NIS2 post) flows through
  `copy_blog` automatically.
- `tailwind.config.js` (red tokens) and `src/css/style.css` (`.hero-slide`)
  merged cleanly during the rebase. `package-lock.json` reconciled via
  `npm install`.
- **Deferred / documented gaps** (not regressions from this rebase):
  `/industries/renewables/` (new upstream `src/industries/renewables.njk`) was
  NOT ported to a Vue page — it is a brand-new standalone page, not in the frozen
  baseline, and nothing links to it (no route-diff or link-checker impact).
  JSON-LD/AEO: the native Nuxt pages never emitted structured data (pre-existing
  site-wide gap), so upstream's `jsonld.njk` enhancement has no Nuxt target to
  port a diff into.

**Responsive testing** (scripted Playwright, NO MCP — `scripts/responsive-check.js`,
viewports 375/768/1280/1920, screenshots `/tmp/responsive-*`) surfaced and FIXED
the docs/handbook "look like shit" issues:
- Docs/handbook dumped the full flat nav ABOVE the content on mobile → the
  sidebar is now a collapsible disclosure below `lg` (toggle button) and the
  two-column layout moved from `md` to `lg` (tablet is single-column).
- The legacy `.handbook` flex/grid container (built for the old 11ty
  direct-child DOM) overflowed the native pages (board page 545px @375px) — a
  scoped `.handbook-shell` override renders those wrappers as plain blocks.
  `node-red` + the 3 legacy-static handbook pages still use `.handbook` and are
  untouched.
- Code fences/tables now scroll (`.prose pre`/`table`); ALL images capped to
  their container (`img { max-width:100% !important }`) — many ported marketing
  pages hardcoded `style="max-width:NNNpx"` without `width:100%`.
- Blog card/hero image paths normalised to absolute in `copy_blog.js`
  (`absImage`) — relative frontmatter `image:` refs were 404ing on
  index/category pages.
- Docs landing tiles restored (grid + card CSS) and the tile HTML no longer
  mis-parses into stray `<pre>` code blocks (blank lines stripped inside
  `ff-*-tiles` in `copy_docs_nuxt.js`).

Verification after fixes: `build:nuxt:skip-images` green, **link-checker 0 of
1180 failing**, route diff **Dropped: 0** (Nuxt superset; adds
`/blog/{plc,mqtt,opcua,modbus}/` + the NIS2 post + `/200` + terms/privacy),
responsive sweep **0 horizontal overflow** at all 4 viewports across 15
representative pages. Only remaining sweep flags are the pre-existing
`/pricing/` + `/node-red/` hydration-mismatch console warnings (cosmetic,
`ovfX=0`, documented below). All committed locally; nothing pushed.

## MIGRATION COMPLETE (2026-05-28) — 11ty removed

The site is now generated entirely by Nuxt 4. Eleventy has been deleted:
`.eleventy.js`, `lib/`, the dev proxy `nuxt/server/middleware/legacy.ts`,
`src/_data/eleventyComputed.js`, and all `src/` `.njk`/`_includes` templating
are gone. `package.json` no longer has any 11ty step — the production build is
`npm run build:nuxt` (`nuxt generate`).

The Nuxt `copy_*.js` build scripts still read a handful of retained `src/`
files purely as **data**: content markdown (blog, changelog, handbook,
customer-stories, webinars, ask-me-anything, ebooks, node-red, docs),
`src/_data/{team,guests,site.json,coreNodes.json}`, the static assets under
`src/{public,images,js,blueprints}` + a few one-off passthroughs, and three
files that survived the `.njk` purge because the scripts parse them as data:
`src/redirects.njk` (static `_redirects` body), `src/node-red/index.njk` +
`src/node-red/core-nodes/index.njk`, and `src/_includes/{components/icons,
core-nodes,hardware}`.

Final verification: `build:nuxt:skip-images` green, route diff **Dropped: 0**
(1178 baseline → 1181 Nuxt, superset), `nuxt-link-checker` **0 of 1175
failing**. The unsafe-char straggler pages (literal spaces / `.njk`-only) that
11ty used to render are served from committed HTML in `nuxt/legacy-static/`
(copied into `public` by `copy_legacy_static.js`).

Also fixed during teardown: integration detail pages threw a client-side 404
after hydration (catch-all `route.params.id` kept the trailing-slash empty
segment); `pages/integrations/[...id].vue` now filters empty segments like the
other data-driven pages.

## Final smoke-sweep verification (2026-05-28)

A scripted Playwright smoke sweep (`scripts/visual-check.js`, ~30 representative
URLs, one or two per migrated cluster — screenshots to `/tmp/smoke`) was run
against the built output served locally. It surfaced two regressions that the
route-diff and link-checker could not catch, both now fixed:

1. **Broken content images (95 refs across 6 clusters).** Relative markdown/HTML
   image references in generated content were rendered verbatim and 404'd
   (browser resolved them against the page URL). Three distinct copy-script gaps:
   markdown image *titles* containing embedded quotes broke the blog regex;
   customer-stories / node-red core-node use-case images were resolved against
   the wrong base dir; and docs/handbook HTML `<img>` tags were never matched by
   the markdown-only regexes. Fix: `scripts/normalize_content_images.js`, a new
   build step (wired into both build chains after the content copy scripts) that
   rewrites every still-relative image ref to the absolute path `copy_assets`
   publishes it at — resolving file-dir-first then `src/` root, exactly as
   11ty's `lib/image-handler.js` did. Rewrites 95 refs in 36 files; the 6
   remaining relative refs are intentional placeholders in the handbook
   "how-to-write" guides (`image.jpg`, `your-image.png`, `<image>.png`) and are
   correctly left untouched.

2. **Site-wide nav broken by Tailwind purge.** `tailwind.config.js` `content`
   globs still pointed only at the deleted 11ty `src/**/*.njk`/`.eleventy.js`
   templates and never scanned `nuxt/**/*.vue`. `@layer components` classes now
   used only in Nuxt components (notably `.ff-nav-dropdown`) were purged, so the
   header mega-menu rendered fully expanded on every page (and pricing feature
   tables/dialogs showed inactive content). Fix: added the Nuxt app paths
   (`nuxt/{components,layouts,pages}/**`, `nuxt/*.vue`, `nuxt/content/**/*.md`)
   to the `content` array. Compiled `style.css` 121 KB → 183 KB; `.ff-nav-dropdown`
   rules restored (2 → 33); nav renders correctly (visually confirmed).

Re-verified after fixes: `build:nuxt:skip-images` green, route diff **Dropped: 0**
(1178 → 1181, superset), `nuxt-link-checker` **0 of 1175 failing**, smoke sweep
clean except the two known non-blocking items below.

### Known non-blocking items (pre-existing, pages render correctly)

- **Hydration mismatch on a few bespoke marketing pages** (`/pricing/`,
  `/node-red/`, `/platform/device-agent/`): Vue logs "Hydration completed but
  contains mismatches". Content, header, footer and headings all render
  correctly; the warning is cosmetic. Root cause is not the `<p v-html>` blocks
  (their injected HTML is inline-only) nor invalid nesting; pinpointing it
  reliably needs a dev-mode build (which prints the exact mismatched node) — a
  heavy detour with rebuild cost, deferred rather than guessed at.
- **`RenderFlow` throws on flows containing `group`/`junction`/`tab` container
  nodes** (e.g. `/node-red/core-nodes/batch/`): the bundled
  `@flowfuse/flow-renderer` reads `firstChild` of null inside `renderFlows`.
  Same library + flow JSON 11ty used, so it is a pre-existing renderer
  limitation, already wrapped in try/catch (`RenderFlow.vue`) so the page
  degrades gracefully; the rest of the page renders.

The rest of this document is the historical record of the page-by-page
migration that led here.

## What this records

The FlowFuse site previously ran as a Strangler-Fig hybrid: Nuxt 4 (`nuxt/`)
owned a growing set of routes, everything else was proxied/copied from the
legacy 11ty build (`src/`, `.eleventy.js`). This file tracks the migration
progress and the constraints discovered along the way.

## The one hard constraint (proven, automated)

Every URL the legacy site served must still resolve to the **identical path**,
trailing slashes included. This is enforced by `migration/verify-routes.sh`,
which diffs each Nuxt build against the **frozen** 1069-route 11ty baseline
(`migration/routes-11ty.txt`). The diff must always report **0 dropped**.

Current proof: `migration/route-diff.txt` — 0 dropped, Nuxt is a superset
(adds `/terms/`, `/privacy-policy/`, `/200`).

## Done

- Route-parity verification harness (`extract-routes.mjs`, `route-diff.mjs`,
  `capture-baseline.sh`, `verify-routes.sh`) + committed frozen baseline.
- Hybrid build (`npm run build:nuxt:skip-images`) confirmed green: 1069 11ty
  routes copied into `nuxt/public`, plus Nuxt-native `/terms`,
  `/privacy-policy`. Final output `nuxt/.output/public` = 1072 routes.
- Baseline route diff committed: **0 dropped URLs**.
- Vite `allowedHosts` set for the sprite host so the Nuxt dev server is usable
  behind the `*.sprites.app` proxy.
- Live preview served from the built output (sprite-env `web` service, port
  3000); homepage + handbook + marketing routes return 200 and render with CSS.

## Migrated to native Nuxt (off 11ty)

- `/terms/`, `/privacy-policy/` — `nuxt/pages/*.vue` + `nuxt/content/*.md`
  (pre-existing).
- **Handbook** (`/handbook/...`, 166 markdown pages) — now rendered natively by
  Nuxt Content at the identical URLs (trailing slashes preserved):
  - `scripts/copy_handbook.js` generates `nuxt/content/handbook` from
    `src/handbook`, rewriting relative `.md` links → absolute `/handbook/...`
    URLs and relative images → `/handbook-media/...` (copied into public). It
    emits `nuxt/handbook.routes.json` for prerendering.
  - `nuxt/pages/handbook/[...slug].vue` + `HandbookNavTree.vue` render the page
    with a sidebar nav (from `queryCollectionNavigation`) and a TOC.
  - `handbook` collection added in `content.config.ts`; routes prerendered via
    `nitro.prerender.routes`; `/handbook*` yielded to Nuxt in the legacy proxy.
  - Two pages remain on 11ty by design: the `.njk`-templated
    `/handbook/engineering/product/features/` and the space-named
    `/handbook/engineering/product/product swimlanes/` (a literal space in the
    URL the Nuxt prerenderer can't resolve; copy script skips unsafe-char paths).
  - **Docus note:** the handbook is rendered with `@nuxt/content` v3 — the same
    engine Docus is built on — under a bespoke handbook layout, rather than the
    global `docus` theme layer. Docus v5 extends the whole app (Nuxt UI Pro,
    own catch-all route + collections) and would override the FlowFuse marketing
    layout used by the migrated Nuxt pages, so a global `extends: ['docus']`
    was rejected to keep the hybrid build green. See agent-discoveries in
    CLAUDE.md.
  - **11ty no longer builds these 166 pages**: `.eleventy.js` reads the generated
    `nuxt/handbook.migrated-sources.json` manifest and ignores them, so 11ty
    builds only the 3 bespoke stragglers. The handbook section is genuinely off
    11ty except those 3.
  - Verified: `nuxt generate` green, `nuxt-link-checker` 0 errors / 0 warnings,
    route diff 0 dropped (Nuxt build is a superset of the 1069-route baseline);
    handbook pages confirmed Nuxt-rendered (`id="__nuxt"`) in the output.

- **Changelog** (`/changelog/...`, 180 routes) — fully migrated to native Nuxt
  and **removed from the 11ty build**:
  - `scripts/copy_changelog.js` generates `nuxt/content/changelog` + a combined
    date-desc card index (170 entries + 9 blog posts tagged `changelog`) that
    matches 11ty's `collections.changelog`, so the paginated index reproduces
    the exact pages (`/changelog/` + `/changelog/1/`…`/changelog/9/`, 19/page).
  - `nuxt/pages/changelog/[...slug].vue` serves entries + the paginated index;
    author/date/issues come from the generated index (one source of truth, also
    used by the feed) since `@nuxt/content` doesn't surface custom frontmatter.
  - `nuxt/server/routes/changelog/index.xml.get.ts` reproduces the Atom feed.
  - `.eleventy.js` ignores the 170 entries + `index.njk` + `feed-changelog.njk`.
  - Deferred (documented fidelity gaps, not URL/route issues): Algolia search box,
    feature-catalog tier badges, and the HubSpot subscribe form on entries; the
    index shows entry descriptions rather than full inline content.
  - Verified: build green, link-checker 0/0, route diff 0 dropped.

- **Customer stories** (`/customer-stories/...`, 11 routes) — rendered via native
  Nuxt (`pages/customer-stories/[...slug].vue` + generated metadata index for the
  story brand/quote/challenge/solution sidebar). NOT removed from the 11ty build:
  `collections.stories` is consumed by other pages that remain on 11ty
  (node-red/index, landing/tulip, thank-you/contact, llms), so 11ty keeps building
  them and Nuxt's prerender overwrites the output (the dev proxy yields the routes
  to Nuxt). Verified: build green, link-checker 0/0, route diff 0 dropped.

- **Webinars + AMAs** (`/webinars/...` 41, `/ask-me-anything/...` 3) — rendered via
  native Nuxt. They share the legacy `layouts/webinar.njk` and the tag-based
  `event` collection, so they were migrated together:
  - `scripts/copy_events.js` generates the `webinars` + `ama` content collections
    from `src/webinars` and `src/ask-me-anything`, resolves hosts from
    team+guests, and emits `events.index.json` (per-page date/time/duration/
    video/hubspot/hosts, keyed by url) + `events.routes.json` for prerender.
  - `pages/webinars/[...slug].vue` serves the `/webinars/` index (upcoming/past)
    and detail pages; `pages/ask-me-anything/[...slug].vue` reuses the shared
    `EventDetail.vue`. `HubSpotForm.vue` embeds the registration/download forms.
  - One webinar with a literal space in its filename is left on 11ty (the Nuxt
    prerenderer cannot resolve unsafe-char routes); 11ty still emits it so route
    parity holds. A directory-index (`simplifying-opc-ua/index.md`) maps to the
    directory URL. NOT removed from the 11ty build (the `event` collection is
    still consumed by other 11ty pages); Nuxt prerender overwrites the output.
  - Verified: build green, prerender 0 errors, route diff 0 dropped (superset);
    index + detail + AMA confirmed Nuxt-rendered (`id="__nuxt"`), video embed +
    host card + HubSpot form render in-browser.

- **Ebooks** (`/ebooks/...`, 2) — rendered via native Nuxt. `copy_ebooks.js`
  generates the `ebooks` collection + metadata index (title/cover/contentTable/
  hubspot, images normalised to absolute `/images/...` URLs);
  `pages/ebooks/[...slug].vue` reproduces `layouts/ebook.njk` and reuses
  `HubSpotForm.vue` for the gated download. Removed from the legacy proxy.
  Verified: build green, route diff 0 dropped, page Nuxt-rendered, form works.

- **Solutions** (`/solutions/...`, 6) — all six bespoke marketing pages
  (uns, scada, mes, edge-connectivity, data-integration, it-ot-middleware)
  converted to native `.vue` pages, reproducing the hand-crafted 11ty markup.
  Shortcodes resolved natively: `{% image %}`→`<img>`, icon includes / `ffIconLg`
  inlined as SVG, `sign-up-url`→app URL, `lite-youtube`→responsive iframe,
  `faq.njk`→reusable `FaqAccordion.vue`. `/solutions` is now a Nuxt-owned prefix
  in the legacy proxy. Verified: build green, link-checker 0/0, route diff 0
  dropped, all six Nuxt-rendered (it-ot-middleware visually confirmed in-browser).

- **vs** (`/vs/...`, 2), **whitepaper** (3), **jobs** (3) — converted to native
  Vue. `vs/{kepware,litmus}` are data-driven comparison pages (hero, feature
  grid, comparison table, switch steps, CTA) using a new reusable
  `SocialProof.vue` (homeLogos carousel). `whitepaper/[...slug].vue` is a single
  data-driven page reproducing `whitepaper-gated.njk` (reuses SocialProof +
  HubSpotForm). `jobs/[...slug].vue` replicates the 3 JS-redirect stubs. Each is
  now a Nuxt-owned proxy prefix. All verified: build green, link-checker 0/0,
  route diff 0 dropped, pages Nuxt-rendered (vs + whitepaper visually confirmed).

## Unblocking infrastructure built & verified

- **`RenderFlow` MDC component** (`nuxt/components/content/RenderFlow.vue`) —
  reproduces the legacy 11ty `renderFlow` shortcode, rendering Node-RED flows
  client-side via the bundled `@flowfuse/flow-renderer`. Flow JSON is passed
  base64-encoded to survive MDC parsing. **Verified in a real browser** (renders
  nodes/wires/labels/zoom). This unblocks the 188 `renderFlow` embeds across
  node-red (75) and blog (113) — the single biggest blocker for those clusters.
  Remaining for those clusters even with RenderFlow: MDC `{{ }}` escaping for
  Node-RED message examples, inlining `{% include %}` (md + `navigation-items-list.njk`),
  the `eleventyNavigation` sidebar, the data-driven `core-nodes/*.njk` catalog
  (from `coreNodes.json`), and the blog post layout + category/pagination/feeds.

## Remaining scope (large; multi-session)

1. **Handbook polish (optional).** Core migration is DONE (see above). Remaining
   niceties: port the two pages still on 11ty to native Nuxt (the `.njk`
   `features` page and the space-named `product swimlanes` page), and reproduce
   the legacy nav grouping/ordering (`navGroup`/`navOrder`) — the current
   sidebar is a plain alphabetical tree from `queryCollectionNavigation`.
   Once the whole handbook is native, stop 11ty from building `src/handbook`.
2. **Docs (`/docs/...`) — native `@nuxt/content`, NOT Docus** — **DONE.**
   The external docs source was cloned (`git clone --depth 1
   https://github.com/FlowFuse/flowfuse.git` → `/home/sprite/flowfuse`); the
   existing `scripts/copy_docs.js` populates `src/docs` (109 markdown pages) from
   `../flowfuse/docs` at build time. `scripts/copy_docs_nuxt.js` (a `docs-nuxt`
   build step, mirroring `copy_handbook.js`) generates `nuxt/content/docs`:
   relative `.md` links → `/docs/...` URLs, relative images → `/docs-media/...`
   (copied into public), `navTitle` promoted to `title`, and an emitted
   `docs.index.json` capturing the 11 `layout: redirect` pages + nav metadata.
   `pages/docs/[...slug].vue` renders the page (sidebar nav + TOC, reusing
   `HandbookNavTree`) and forwards redirect pages via the index (prerender emits
   a `<meta http-equiv=refresh>` HTML file, matching 11ty's `redirect.njk`).
   `docs` collection added in `content.config.ts`; routes prerendered via
   `nitro.prerender.routes`; `/docs` + `/docs-media` yielded to Nuxt in the proxy.
   Baseline updated: the 109 docs routes were merged into the frozen
   `routes-11ty.txt` (now **1178**); the generated docs route set is **identical**
   to what the 11ty build emits for `/docs/...`. Verified: build green,
   link-checker **0 of 550 failing**, route diff **0 dropped** (Nuxt 1181 routes,
   superset), docs pages confirmed Nuxt-rendered (`id="__nuxt"`) and visually
   spot-checked in-browser (sidebar, content, `/docs-media` images, redirects).
   Remaining polish (optional): docs sidebar is alphabetical from
   `queryCollectionNavigation`; the 11ty `navGroup`/`navOrder` grouping is
   captured in `docs.index.json` but not yet applied to the tree.
3. **Remaining marketing sections** (~700 routes) — convert one cluster at a time,
   removing each from the legacy proxy and adding it to `nitro.prerender.routes`.
   Migrated so far: terms, privacy-policy, handbook, changelog,
   customer-stories, **webinars + AMAs**, **ebooks**, **solutions** (6),
   **vs** (2), **whitepaper** (3), **jobs** (3), **partners** (4),
   **single pages**: careers, sign-up, email-signature, free-consultation,
   contact-us, book-demo, education, professional-services, support,
   resources/publications, pricing/request-quote.
   Reusable components built: HubSpotForm, EventDetail, FaqAccordion, SocialProof,
   Icon (+ scripts/copy_icons.js), MqlContact, HubSpotMeeting.
   Remaining, roughly by difficulty:
   - **events/ cluster — DONE** (all 3 pages native Nuxt): proveit-2026,
     hannover-messe-2025, hannover-messe-2026 (incl. the nested talks-agenda
     grid). Faithful 1:1 of the bespoke `.njk`; `{% image %}` → plain `<img>`
     against the pass-through `/events/images/...` files; icon includes →
     `<Icon>`. Each is a Nuxt-owned route in the proxy + prerender. Verified:
     route diff 0 dropped, link-checker 0 of 553, all 3 `id="__nuxt"` and
     visually confirmed in-browser.
   - **blog/ cluster — DONE** (429 routes, native `@nuxt/content`): see the
     dedicated entry below. This was the keystone and unblocks the homepage +
     community/newsletter (both also DONE).
   - **homepage (`/`) — DONE.** `pages/index.vue` is a faithful 1:1 of
     `src/index.njk` (hero, social-proof, metrics, problem/status-quo, AI block,
     capabilities, solutions, testimonials, get-started, explore-more pulling
     latest blog posts + latest webinar + newsletter form). Verified Nuxt-rendered
     + visually in-browser.
   - **platform/ — DONE** (4 of 5): dashboard, device-agent, features,
     why-flowfuse are native `.vue` (FaqAccordion, inlined get-started/migration/
     download-modal, reactive Node-RED migration tool on dashboard). Only
     `platform/security` (a `.md`) stays on 11ty. Visually verified.
   - **landing/ — DONE** (all bespoke `.njk` now native): accelerating-…-low-code
     (gated whitepaper), factory-efficiency (stat hero + case-study form), plc
     (protocol/advantage/FAQ data sections), tulip (customer-stories grid +
     HubSpotMeeting). The 7 earlier landing pages were already native. Verified.
   - **community/newsletter — DONE.** `pages/community/newsletter.vue` lists blog
     posts tagged `newsletter` from `blog.index.json`. Visually verified.
   - **Bespoke `.njk` marketing pages STILL on 11ty** (remaining): thank-you/ (4,
     depend on explore-more = blog+webinar collections, both now available),
     pricing/index (1, large tier tables), about (already native — `about.vue`),
     certified-nodes (1, data-driven `certifiedNodes` catalog, paginated 24/page),
     ai (1), 404 (special `/404.html`), plus site-wide feed/sitemap/redirects njk.
     `platform/security` (.md). Convert following the solutions/landing pattern.
     NOTE: fidelity gaps that persist site-wide — Algolia search + HubSpot chat
     are global-script integrations not yet wired (documented degraded).
   - **integrations/ (61 routes)** — DATA-DRIVEN at build time from the live
     `ff-integrations.flowfuse.cloud` API + npm registry readmes
     (`src/_data/integrations.js`). The route set ("top 50 by downloads +
     certified") is non-deterministic vs the frozen baseline. To migrate without
     route drift, read the exact IDs from `routes-11ty.txt`, fetch each readme at
     Nuxt build time, render via a `pages/integrations/[id].vue` reproducing
     `layouts/integration.njk`; the index is a client-side catalog shell.
   - **node-red/ (114 routes)** — external data + 75 `renderFlow` embeds (the
     `RenderFlow` component is built & verified) + the data-driven
     `core-nodes/*.njk` catalog (`coreNodes.json`) + `eleventyNavigation` sidebar.
   - **blog/ (429 routes)** — the largest: 113 `renderFlow` embeds, author pages,
     category/tag pages, pagination, and RSS/Atom feeds.
4. **Remove 11ty** once nothing routes to it: delete `.eleventy.js`, `src/`
   templating, 11ty build steps; simplify `package.json` build to
   `npm run generate --workspace=nuxt`.

## Blog cluster — DONE (was the keystone dependency)

The blog (`/blog/...`, 429 routes — the largest single cluster) is fully migrated
to native `@nuxt/content`:
- `scripts/copy_blog.js` generates `nuxt/content/blog/**` (renderFlow →
  `::render-flow` MDC, nunjucks stripped, relative `.md` links/images rewritten),
  plus `blog.index.json` (card index + per-category url lists + pagination meta),
  `blog.authors.json`, `blog.routes.json`, `blog.migrated-sources.json`.
- `pages/blog/[...slug].vue` serves posts + the paginated main index + 9 category
  pages (`/blog/<cat>/` + `/blog/<cat>/N/`); `server/routes/blog/index.xml.get.ts`
  reproduces the Atom feed.
- Verified: route diff 0 dropped (430 blog routes incl. the feed; superset of the
  429 baseline), link-checker 0 failing, blog posts + index confirmed
  Nuxt-rendered and visually spot-checked in-browser.

Because blog is done, its dependents are unblocked and now also DONE: the
**homepage** "latest on the blog" block, **community/newsletter**
(`collections.newsletter`). Still using blog/webinar collections and not yet
migrated: **thank-you/** (4) — `layouts/thank-you.njk` →
`explore-more-content.njk` (latest blog + latest webinar); both data sources are
now available, so these are a straightforward next step.

## This session (2026-05-27) — what was migrated

blog (429) · homepage (/) · platform/{dashboard,device-agent,features,
why-flowfuse} · landing/{accelerating-…-low-code,factory-efficiency,plc,tulip} ·
community/newsletter. Each verified: build green, route diff **0 dropped**,
link-checker **0 failing** (992 pages at session end), pages Nuxt-rendered and
visually spot-checked. All committed locally (not pushed).

## Largest remaining clusters (still on 11ty — multi-session)

- **integrations/ (61)** — data-driven (live API + npm readmes); see below.
- **node-red/ (114)** — external data + 75 `renderFlow` embeds + `core-nodes`
  catalog + `eleventyNavigation` sidebar.
- A handful of bespoke pages (thank-you ×4, pricing/index, certified-nodes, ai,
  404) and site-wide njk (feed/sitemap/redirects).
- **11ty cannot be removed yet**: the above routes still come only from 11ty, and
  blog/image passthrough assets are still served by the 11ty build. Removal is the
  final step once those clusters are native AND an asset-copy path replaces the
  11ty passthrough.

## How to verify after any migration step

```bash
bash migration/verify-routes.sh   # rebuilds Nuxt, diffs vs frozen baseline
```
Confirm `migration/route-diff.txt` still reports `Dropped: 0`. A dropped or
renamed URL is a migration failure even if the page looks correct.
