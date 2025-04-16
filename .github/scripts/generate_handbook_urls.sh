#!/usr/bin/env bash

set -e


if [[ "$GITHUB_REF" == "refs/heads/main" ]]; then
  echo "Running on main branch, comparing with previous commit"
  MODIFIED_FILES=$(git diff --name-only --diff-filter=AM HEAD^ HEAD -- src/handbook/)
else
  echo "Running on non-default branch, comparing with $GITHUB_BASE_REF branch"
  MODIFIED_FILES=$(git diff --name-only --diff-filter=AM origin/$GITHUB_BASE_REF...HEAD -- src/handbook/)
fi

echo "Modified files in the PR:"
echo "$MODIFIED_FILES"

MODIFIED_MD_FILES=$(echo "$MODIFIED_FILES" | grep -E '\.md$' || echo "")

if [ -z "$MODIFIED_MD_FILES" ]; then
    echo "No modified handbook markdown files found."
    exit 0
fi

ALL_URLS="" 

for FILE in $MODIFIED_MD_FILES; do
    RELATIVE_PATH=${FILE#src/handbook/}
    
    URL_PATH=${RELATIVE_PATH%.md}
    
    if [[ "$URL_PATH" == "index" ]]; then
        URL="https://flowfuse.com/handbook/"
    elif [[ "$RELATIVE_PATH" == *"/index.md" ]]; then
        DIR_PATH=${URL_PATH%/index}
        URL="https://flowfuse.com/handbook/$DIR_PATH/"
    else
        URL="https://flowfuse.com/handbook/$URL_PATH/"
    fi
    
    if [ -z "$ALL_URLS" ]; then
        ALL_URLS="$URL"
    else
        ALL_URLS="$ALL_URLS $URL"
    fi
done

echo "handbook_urls=$ALL_URLS" >> $GITHUB_OUTPUT

exit 0
