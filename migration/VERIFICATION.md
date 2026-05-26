# Verification — 11ty → Nuxt migration (handbook increment)

Date: 2026-05-26

> The `site-verify` plugin referenced in CLAUDE.md is not installed in this
> environment, so the equivalent checks were run manually (build, link-checker,
> route parity, HTTP health, and browser rendering).

## Build

- `npm run build:nuxt:skip-images` (hybrid: 11ty → `nuxt/public`, then
  `nuxt generate`) completes with **no errors**.
- `nuxt generate` prerendered **339 routes** (166 handbook pages + Nuxt pages +
  payloads) successfully — no prerender errors.

## Link checker (nuxt-link-checker, failOnError: true)

```
Nuxt Link Checker Summary
  Failing Pages: 0 of 168
  Total errors: 0
  Total warnings: 0
```

## Route parity (the hard constraint)

`migration/route-diff.txt` (Nuxt build vs frozen 1069-route 11ty baseline):

```
# 11ty routes:  1069
# Nuxt routes:  1072
# Dropped:      0
# Added:        3   (/200, /terms/, /privacy-policy/)
OK: Nuxt build is a superset of 11ty routes (zero dropped URLs).
```

The 169 `/handbook/...` routes are all present; 166 are now Nuxt-rendered
(verified `id="__nuxt"` / `_payload` markers in the output), the 2 `.njk`/
space-named pages remain 11ty-served, and `/handbook/` index resolves.

## HTTP health (live preview, sprite-env `web` service, port 3000)

```
sprite URL (auth-gated proxy): 200
local /            : 200
local /handbook/   : 200
local /pricing/    : 200
local /terms/      : 200
```

Note: the public `*.sprites.app` URL 302→ a sprites.dev auth page (sprite
network policy); the app itself is verified on `http://localhost:3000`.

## Browser rendering (Playwright)

- `/` — homepage renders with full CSS (FlowFuse marketing layout).
- `/handbook/company/values/` — Nuxt-rendered: nested sidebar nav (full
  handbook tree), FlowFuse header/footer, content with rewritten internal
  links and images. Title `Values • FlowFuse Handbook`.

## Process hygiene

- No orphaned raw dev servers (`nuxt dev`/`vite`/`eleventy`/`http.server`).
- Long-running server runs as the sprite-env `web` service (not a raw process).
