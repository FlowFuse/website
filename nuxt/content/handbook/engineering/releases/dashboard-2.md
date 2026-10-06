---
title: "Dashboard 2.0 Releases"
---

# Dashboard 2.0 Release Process

Releases of Node-RED Dashboard 2.0 are prepared by [Release Please](https://github.com/googleapis/release-please). There is no need to edit version numbers, create tags or write release notes by hand.

## How it works

- Every merge to `main` runs the [Prepare release](https://github.com/FlowFuse/node-red-dashboard/actions/workflows/release-please.yaml) workflow.
- Release Please reads the commits since the last release and opens, or updates, a single Pull Request titled `chore: Release X.Y.Z` (see [#2280](https://github.com/FlowFuse/node-red-dashboard/pull/2280) for an example).
- That Pull Request bumps the version in `package.json`, `package-lock.json` and `.github/.release-please-manifest.json`, and adds the release notes to `CHANGELOG.md`.
- It stays open and keeps updating as more changes land on `main`, until it is merged.

## Pull Request titles

Release Please works out the next version and the release notes from the commit messages on `main`. Pull Requests are squash merged, so the Pull Request title becomes the commit message, and must follow the [Conventional Commits](https://www.conventionalcommits.org/) format. The "Lint Pull Request Title" check enforces this on every Pull Request.

| Title prefix | Version bump | Release notes section |
| --- | --- | --- |
| `feat: ...` | Minor (`1.32.0` → `1.33.0`) | Features |
| `fix: ...` | Patch (`1.33.0` → `1.33.1`) | Bug Fixes |
| `feat!: ...` / `fix!: ...` | Major (`1.33.0` → `2.0.0`) | Breaking change |
| `docs:`, `chore:`, `ci:`, `test:`, ... | None | Not listed |

Write the title as you want it to read in the release notes, since that is where it ends up.

## Cutting a release

- Open the current `chore: Release X.Y.Z` Pull Request from the [Pull Requests](https://github.com/FlowFuse/node-red-dashboard/pulls) list.
- Check the version number and the generated `CHANGELOG.md` entry. Release Please overwrites manual edits to this Pull Request, so if a change is in the wrong section, missing or badly worded, correct it on the original Pull Request instead: edit its description to add a [commit override](https://github.com/googleapis/release-please#how-can-i-fix-release-notes) block, and Release Please will use that on its next run.

  ```text
  BEGIN_COMMIT_OVERRIDE
  fix: the corrected release note
  END_COMMIT_OVERRIDE
  ```

- Have someone else review the Pull Request, and merge when approved.

Merging it is the release. Release Please then creates the `vX.Y.Z` tag and the [GitHub Release](https://github.com/FlowFuse/node-red-dashboard/releases) with the generated notes, and the new tag triggers the [Publish Release](https://github.com/FlowFuse/node-red-dashboard/actions/workflows/publish-release.yml) workflow, which:

- runs the tests, builds and publishes the package to npm
- updates the [Node-RED Flow Library](https://flows.nodered.org/node/@flowfuse/node-red-dashboard) entry for the new version

If any step fails, a notification is posted to Slack with a link to the failed run.

## Checking the Node-RED Palette Manager

The Publish Release workflow updates the Node-RED catalogue automatically, but if `npm` is slow to make the new version available, the catalogue may not pick it up. To check:

- Navigate to the ["@flowfuse/node-red-dashboard"](https://flows.nodered.org/node/@flowfuse/node-red-dashboard) page.
- If the version shown is not current then you need to be signed in with an account (it uses GitHub to sign in)
- Once signed in, you should see the "check for update" link. Click it

![Update action](/handbook/engineering/images/dashboard-2-flows-update.png)

Within the next 25-30 minutes, the entry in Node-RED's Palette Manager will update for all Node-RED installations worldwide.
