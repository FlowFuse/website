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

## Remaining scope (large; multi-session)

1. **Handbook → Nuxt Content / Docus** (167 markdown pages, `/handbook/...`).
   Blockers discovered:
   - 49 handbook `.md` files use **relative** `.md` links and relative
     `../../images/...` paths that 11ty rewrites at build time
     (`rewriteHandbookLinks`, image handler). A native migration must
     reproduce this rewriting (see proposed `scripts/copy_handbook.js`).
   - Two handbook routes are **`.njk` templates**, not markdown:
     `/handbook/engineering/product/features/` and
     `/handbook/sales/subscription-agreement-1.5/`. They must be ported
     separately or remain on 11ty.
   - The handbook **sidebar nav** is built in `.eleventy.js` (`addCollection('nav')`)
     from `navTitle`/`navGroup`/`navOrder` frontmatter and is **shared** by the
     two `.njk` pages, so removing the `.md` files from 11ty also affects them.
   - Docus v5 is a **global** Nuxt theme layer (pulls Nuxt UI Pro, og-image,
     llms, mcp-toolkit; ships its own catch-all route + content collections).
     Extending it globally overrides the bespoke FlowFuse marketing layout used
     by the already-migrated Nuxt pages and risks a non-green build. Recommended
     path: render the handbook with `@nuxt/content` v3 (the engine Docus is
     built on) under a dedicated handbook layout, OR scope Docus to a child
     layer — not a global `extends`.
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
