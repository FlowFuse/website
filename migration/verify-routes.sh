#!/usr/bin/env bash
# Route-parity verification for the 11ty -> Nuxt migration.
#
# Proves the migrated Nuxt build serves a SUPERSET of the legacy 11ty routes,
# i.e. no URL that previously returned 200 is dropped or renamed.
#
# Steps:
#   1. Build the legacy 11ty site in isolation -> _site_baseline  (the "before")
#   2. Build the hybrid/Nuxt output -> nuxt/.output/public         (the "after")
#   3. Extract both route sets and diff them.
#
# Run from the repo root:  bash migration/verify-routes.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> [1/4] Building legacy 11ty baseline -> _site_baseline"
SKIP_IMAGES=true ELEVENTY_RUN_MODE=build CONTEXT=production \
    npx @11ty/eleventy --output=./_site_baseline --quiet

echo "==> [2/4] Building Nuxt hybrid output -> nuxt/.output/public"
npm run build:nuxt:skip-images

echo "==> [3/4] Extracting route sets"
node migration/extract-routes.mjs _site_baseline        > migration/routes-11ty.txt
node migration/extract-routes.mjs nuxt/.output/public   > migration/routes-nuxt.txt

echo "==> [4/4] Diffing (Nuxt must be a superset of 11ty)"
node migration/route-diff.mjs migration/routes-11ty.txt migration/routes-nuxt.txt \
    | tee migration/route-diff.txt
