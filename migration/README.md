# Migration verification harness

Tooling that proves the 11ty → Nuxt 4 migration never drops or renames a URL.

## The hard constraint

Every URL the legacy 11ty site serves (including its intentional trailing
slashes) must resolve to the **identical path** in the Nuxt build. The Nuxt
route set must be a **superset** of the 11ty route set — zero dropped URLs.

## Files

- `extract-routes.mjs` — walks a static build dir and prints the served routes
  (maps `foo/index.html` → `/foo/`, root `index.html` → `/`).
- `route-diff.mjs` — diffs an old vs new route list; exits non-zero if any
  11ty route is missing from the Nuxt build.
- `verify-routes.sh` — end-to-end: builds the 11ty baseline, builds the Nuxt
  hybrid output, extracts both route sets, writes the diff.
- `routes-11ty.txt` — committed snapshot of the legacy 11ty route set.
- `routes-nuxt.txt` — committed snapshot of the Nuxt build route set.
- `route-diff.txt` — committed proof: the diff result (must show 0 dropped).

## Run it

```bash
bash migration/verify-routes.sh
```

A migration step that drops or renames a URL is a failure even if every page
"looks right". Re-run this after migrating each section and confirm
`route-diff.txt` still reports `0` dropped.
