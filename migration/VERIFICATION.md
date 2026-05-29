# Verification — 11ty → Nuxt 4 migration (final / PR-ready)

Date: 2026-05-29

> Records the verification gates for the completed migration. The `site-verify`
> plugin referenced in CLAUDE.md is not installed here, so the equivalent checks
> were run manually (build, link-checker, route parity, responsive sweep).
> An earlier point-in-time snapshot (the 2026-05-26 handbook increment, 1069-route
> era) is preserved in the git history of this file.

## Build

- `npm run build:nuxt:skip-images` (`copy_*` steps → `nuxt generate`) completes
  with **no errors** (exit 0). Eleventy is fully removed; this is a pure Nuxt 4
  static build to `nuxt/.output/public`.

## Route parity (the hard constraint)

`migration/route-diff.txt` — generated Nuxt route set vs the **frozen 1178-route**
11ty baseline (`migration/routes-11ty.txt`):

```
# 11ty routes:  1178
# Nuxt routes:  1186
# Dropped:      0
# Added:        8   (/200, /terms/, /privacy-policy/, 4 new blog categories, 1 new blog post)
OK: Nuxt build is a superset of 11ty routes (zero dropped URLs).
```

Zero legacy URLs dropped or renamed — trailing slashes preserved. Re-run any time
with `bash migration/verify-routes.sh`.

## Link checker (nuxt-link-checker, failOnError: true)

```
Nuxt Link Checker Summary
  Failing Pages: 0 of 1180
  Total errors: 0
  Total warnings: 0
```

## Responsive sweep (scripted Playwright, no MCP browser)

`npm run qa:responsive` — viewports 375 / 768 / 1280 / 1920, 15 representative
URLs (docs + handbook emphasised, plus one page per migrated cluster):

```
60 captures (15 urls x 4 viewports), 8 flagged
```

- **All captures HTTP 200; zero horizontal overflow (`ovfX=0`) at every viewport.**
- Docs and handbook render cleanly at all four widths.
- The 8 flags are the known, cosmetic "Hydration completed but contains
  mismatches" console warnings on `/pricing/` and `/node-red/` only (documented in
  `STATUS.md` as non-blocking; the pages render correctly).

## Process hygiene

- No orphaned raw dev servers (`nuxt dev` / `vite` / `eleventy` / `http.server`).
- The local preview runs as the sprite-env `web` service (static `nuxt/.output/public`).
