#!/usr/bin/env bash

set -e

# Script to check if files from specific pattern groups have changed in a PR
# Groups: handbook

if [[ "$GITHUB_REF" == "refs/heads/main" ]]; then
  echo "Running on main branch, comparing with previous commit"
  changed_files=$(git diff --name-only HEAD^ HEAD)
else
  echo "Running on non-default branch, comparing with $GITHUB_BASE_REF branch"
  changed_files=$(git diff --name-only origin/$GITHUB_BASE_REF...HEAD)
fi


if [ -z "$changed_files" ]; then
  echo "No files changed in this PR compared to $GITHUB_BASE_REF branch."
  echo "handbook_changed=false" >> $GITHUB_OUTPUT
  exit 0
fi

handbook_changed=false

for file in $changed_files; do
  if [[ $file == handbook/* ]]; then
    handbook_changed=true
  fi
  
  if $handbook_changed; then
    break
  fi
done

echo "Changed groups:"
echo "  Handbook: $backend_changed"

echo "handbook_changed=$handbook_changed" >> $GITHUB_OUTPUT

exit 0
