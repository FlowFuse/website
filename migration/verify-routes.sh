#!/usr/bin/env bash
# Route-parity verification for the 11ty -> Nuxt migration.
#
# Proves the migrated Nuxt build serves a SUPERSET of the FROZEN legacy 11ty
# routes (migration/routes-11ty.txt), i.e. no URL that previously returned 200
# is dropped or renamed -- even for sections that 11ty no longer builds because
# they were migrated to native Nuxt / Docus.
#
# The baseline is frozen on purpose; capture it once with capture-baseline.sh.
#
# Run from the repo root:  bash migration/verify-routes.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -s migration/routes-11ty.txt ]; then
    echo "ERROR: migration/routes-11ty.txt (frozen baseline) is missing."
    echo "Capture it once on the pre-migration tree: bash migration/capture-baseline.sh"
    exit 1
fi

echo "==> [1/3] Building Nuxt hybrid output -> nuxt/.output/public"
npm run build:nuxt:skip-images

echo "==> [2/3] Extracting Nuxt route set"
node migration/extract-routes.mjs nuxt/.output/public > migration/routes-nuxt.txt

echo "==> [3/3] Diffing against frozen 11ty baseline (Nuxt must be a superset)"
node migration/route-diff.mjs migration/routes-11ty.txt migration/routes-nuxt.txt \
    | tee migration/route-diff.txt
