# Migrate the FlowFuse website from Eleventy (11ty) to a pure Nuxt 4 static build

## What this PR does

Completes the migration of the FlowFuse website off Eleventy and onto a single
**Nuxt 4** static-generation stack, and removes Eleventy entirely. The site is
now built by `nuxt generate` to `nuxt/.output/public` and published by Netlify —
there is no longer any 11ty build, dev proxy, or Nunjucks templating.

Every URL the legacy 11ty site served still resolves to the **identical path**
(trailing slashes included). This is the one hard constraint of the migration and
it is enforced automatically (see *Verification* below).

## Why

The site previously ran as a Strangler-Fig hybrid: Nuxt owned a growing set of
routes while everything else was proxied/copied from the legacy 11ty build. That
dual stack was transitional. This PR finishes the job so the codebase is a single,
modern, maintainable Nuxt 4 app instead of two parallel rendering engines.

## High-level changes

- **All sections rendered natively by Nuxt.** Marketing pages are bespoke
  `nuxt/pages/**/*.vue`; markdown-driven sections (blog, changelog, handbook,
  docs, customer-stories, webinars/AMAs, ebooks) use `@nuxt/content` v3
  collections.
- **`src/` is now a data source only.** The build-time `scripts/copy_*.js` steps
  read the markdown and `src/_data/*` and generate the Nuxt content collections +
  route lists. There are no `.njk` templates or `.eleventy.js` anymore.
- **Eleventy removed:** `.eleventy.js`, `lib/`, the dev proxy
  (`nuxt/server/middleware/legacy.ts`), `src/_data/eleventyComputed.js`, and all
  `src/` `.njk`/`_includes` templating are deleted. The production build is a
  plain `npm run build` → `build:nuxt` → `nuxt generate`.
  > Note: `@11ty/eleventy-fetch` is intentionally retained — it is a generic HTTP
  > caching-fetch library used by `copy_node_red.js`, `copy_integrations.js`, and
  > a couple of `src/_data/*` scripts, not the 11ty build engine.
- **Straggler pages** that the Nuxt prerenderer cannot reproduce (literal spaces
  in the URL, `/404.html`, `/llms.txt`) are served from committed HTML under
  `nuxt/legacy-static/` (copied into `public` by `copy_legacy_static.js`) so their
  URLs are preserved.

## Dev & build commands

```bash
npm install            # npm workspaces; nuxt/ is a workspace
npm run dev            # nuxt dev (3000) + postcss + docs + blueprints watchers
npm run build          # → build:nuxt → copy_* steps then `nuxt generate`
npm run build:nuxt:skip-images   # faster iteration (skips image processing)
```

- Running `nuxt dev` behind a remote proxy? Allowlist your host without committing
  it: `NUXT_DEV_ALLOWED_HOSTS=my-host.example.com npm run dev`.
- Optional QA helpers (require Playwright): `npm run qa:responsive`,
  `npm run qa:smoke`.

## Verification gates

| Gate | Result |
|------|--------|
| `nuxt generate` (`npm run build:nuxt:skip-images`) | clean, no errors |
| Route parity (`migration/verify-routes.sh` vs frozen 1178-route 11ty baseline) | **Dropped: 0** — Nuxt build is a superset (see `migration/route-diff.txt`) |
| `nuxt-link-checker` (`failOnError: true`) | **0 failing** |
| Responsive sweep — `npm run qa:responsive`, viewports 375/768/1280/1920, docs + handbook + one page per cluster | 60 captures, **0 horizontal overflow**, all HTTP 200 |

The route-parity check is the proof for the "URLs never change" constraint: the
frozen `migration/routes-11ty.txt` (1178 routes) is diffed against the generated
Nuxt route set; the build fails if any legacy URL is dropped or renamed. The
committed `migration/route-diff.txt` is the evidence artifact.

### CI

- `.github/workflows/test.yml` already builds the site with
  `npm run build:nuxt:skip-images` and runs the hyperlink link-check against
  `nuxt/.output/public`.
- `.github/workflows/build.yml` syncs docs + blueprints and pushes to the `live`
  branch (Netlify builds `live` via `netlify.toml [build] = npm run build:nuxt`).
- `netlify.toml [dev]` was the one stale reference to the deleted 11ty engine;
  it now runs `npm run dev` on port 3000.

## Known / deferred items (non-blocking)

- **Cosmetic hydration warnings** on a few bespoke marketing pages (`/pricing/`,
  `/node-red/`, `/platform/device-agent/`): "Hydration completed but contains
  mismatches". Content/header/footer all render correctly; pinpointing the exact
  node reliably needs a dev-mode build. Deferred rather than guessed at.
- **`@flowfuse/flow-renderer`** throws on flows containing `group`/`junction`/`tab`
  container nodes (same library + flow JSON 11ty used) — a pre-existing renderer
  limitation, wrapped in try/catch so the page degrades gracefully.
- **Generated-content tracking is intentionally split by cluster:** blog,
  integrations, and node-red commit their generated `nuxt/content/**` +
  `*.json` (they pull from external/volatile sources, so snapshotting them in git
  gives reproducible builds and a working `nuxt dev` without a full rebuild),
  while handbook/docs/changelog/events/ebooks/customer-stories gitignore theirs
  and regenerate at build time. Each cluster is internally consistent; unifying
  the two strategies is left for a follow-up if the team prefers.
- **Sidebar nav ordering** for docs/handbook is currently alphabetical from
  `queryCollectionNavigation`; the legacy `navGroup`/`navOrder` grouping is
  captured in the generated index JSON but not yet applied to the tree.
- **Site-wide integrations not re-wired:** Algolia search box and HubSpot chat are
  global-script integrations documented as degraded (pre-existing gap).

See `migration/STATUS.md` for the full page-by-page migration record and
`migration/README.md` for the verification harness.
