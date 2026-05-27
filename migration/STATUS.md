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
2. **Docs → Docus** (`/docs/...`). The docs markdown is **not in this repo** —
   it is copied at build time from an external FlowFuse repo
   (`scripts/copy_docs.js`, sources `../flowfuse/docs`). Only `src/docs/docs.json`
   is tracked here. Docs migration cannot be completed without that content
   available; the 11ty baseline contains **0** `/docs/...` routes for the same
   reason.
3. **Marketing sections** (~900 routes: home, pricing, product, integrations,
   blog, customer-stories, blueprints, events, webinars, etc.) — convert
   `.njk`/data-driven pages to native Nuxt pages one cluster at a time, removing
   each from the legacy proxy (`nuxt/server/middleware/legacy.ts`) and adding it
   to `nitro.prerender.routes`.
4. **Remove 11ty** once nothing routes to it: delete `.eleventy.js`, `src/`
   templating, 11ty build steps; simplify `package.json` build to
   `npm run generate --workspace=nuxt`.

## How to verify after any migration step

```bash
bash migration/verify-routes.sh   # rebuilds Nuxt, diffs vs frozen baseline
```
Confirm `migration/route-diff.txt` still reports `Dropped: 0`. A dropped or
renamed URL is a migration failure even if the page looks correct.
