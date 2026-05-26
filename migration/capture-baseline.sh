#!/usr/bin/env bash
# Capture the FROZEN legacy 11ty route baseline.
#
# Run this ONCE, before migrating anything, on the pristine pre-migration tree.
# It records every URL the legacy 11ty site served into routes-11ty.txt, which
# is then committed and treated as immutable. verify-routes.sh diffs every
# subsequent Nuxt build against this frozen reference, so removing a section
# from 11ty (e.g. moving the handbook to Docus) still fails the check unless
# Nuxt serves the identical URLs.
#
# Do NOT re-run after migration has begun, or you will erase the evidence of
# routes that 11ty no longer builds.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Building pristine 11ty baseline -> _site_baseline"
SKIP_IMAGES=true ELEVENTY_RUN_MODE=build CONTEXT=production \
    npx @11ty/eleventy --output=./_site_baseline --quiet

echo "==> Recording frozen route baseline -> migration/routes-11ty.txt"
node migration/extract-routes.mjs _site_baseline > migration/routes-11ty.txt
wc -l migration/routes-11ty.txt
