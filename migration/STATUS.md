# 11ty → Nuxt 4 migration — status & runbook

## What this records

The FlowFuse site runs as a Strangler-Fig hybrid: Nuxt 4 (`nuxt/`) owns a
growing set of routes, everything else is proxied/copied from the legacy 11ty
build (`src/`, `.eleventy.js`). This file tracks migration progress and the
constraints discovered along the way.

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
   - **Bespoke `.njk` marketing pages still on 11ty** (~30 routes): platform/ (5),
     events/ (3), landing/ (11), thank-you/ (4), pricing/index (1, large tier
     tables), about (1, full team grid + values + benefits), index/homepage (1),
     community/newsletter (1, depends on the blog), certified-nodes (1,
     data-driven catalog), 404. Convert following the solutions/vs/partners
     pattern (reuse the components above). A few need data/infra: about needs a
     team-data bundle; platform/dashboard embeds the Node-RED migration tool;
     support's Algolia search + HubSpot chat are site-wide-script integrations
     (currently degraded — documented fidelity gaps).
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

## Blog is the keystone dependency for the last marketing pages

Several remaining pages embed **blog-derived collections** and so cannot be
finished until the blog cluster (`/blog/...`, 429 routes — the largest remaining
piece, with `renderFlow` embeds, category/tag/author pages, pagination and Atom
feeds) is migrated:
- `thank-you/*` (4) — `layouts/thank-you.njk` → `explore-more-content.njk` lists
  `collections.posts` (latest blog) + `collections.webinar`.
- `community/newsletter` (1) — lists `collections.newsletter` (blog posts tagged
  newsletter).
- homepage (`/`) and several sections surface "latest on the blog".
The webinar/stories halves of these can reuse the already-migrated events +
customer-stories data; the blog half needs the blog collection. Recommend
migrating the blog next (it unblocks the most remaining work), then these pages.

## How to verify after any migration step

```bash
bash migration/verify-routes.sh   # rebuilds Nuxt, diffs vs frozen baseline
```
Confirm `migration/route-diff.txt` still reports `Dropped: 0`. A dropped or
renamed URL is a migration failure even if the page looks correct.
