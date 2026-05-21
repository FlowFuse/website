---
navTitle: Dependency Updates
---

# Dependency Updates

This page covers how we triage [Dependabot](https://docs.github.com/en/code-security/concepts/supply-chain-security/about-dependabot-pull-requests) pull requests across our repositories so the backlog stays under control.

## Why we triage weekly

Dependabot opens pull requests as soon as new versions ship. Left alone, those PRs pile up, conflict with each other, and become risky to merge in bulk. A short, regular triage slot keeps each batch small enough to review carefully and stops the backlog from reforming.

## Ownership

The triage rotation is owned by the engineering team. One engineer takes the slot each week, works through the open Dependabot PRs across our repositories, and hands off at the end of the week. Budget around 30 minutes — anything that does not fit in that slot gets escalated rather than rushed.

## Weekly process

Work through Dependabot PRs in this order:

1. **Wait at least 12 hours after a version is published before merging.** Compromised or broken releases are usually flagged within that window. Merging immediately after publish removes that safety margin.
2. **Check for an active npm advisory or breach report on the package.** Look at the package's npm page and the GitHub advisory database before approving. If anything is open against that version, hold the PR until it clears.
3. **Read the release notes for each bump.** Confirm there are no breaking changes that affect how we use the package. Patch and minor bumps still occasionally ship behavior changes worth knowing about.
4. **Merge the safe, small bumps first.** Patch and minor updates with a contained diff and clean release notes go in early. Leave anything with an unusually large diff for closer review.
5. **CI must pass before merging — no exceptions.** A red build on a dependency PR is the signal that something needs investigation, not a bypass.
6. **Check all repositories.** - Dependabot is active in all our repositiories. 

## Major version bumps

Major version bumps do not fit in the weekly slot. When one appears:

1. Pull the PR out of the weekly batch.
2. Assign an owner who knows the affected code.
3. Schedule it into a milestone alongside time to read the migration guide, update our usage, and verify the change end-to-end.

Treat the major bump as its own piece of work, not as routine maintenance.

## Mutually exclusive bumps

Two open PRs sometimes touch the same `package.json` or `package-lock.json` entries and cannot both merge cleanly. Flag these as soon as you spot them:

- Pick the bump you want to land first and merge it.
- Comment on the second PR with `@dependabot recreate` so Dependabot rebuilds it against the updated lockfile.
- If the second bump becomes redundant after the first lands, close it and let Dependabot reopen the PR on the next scan.

Catching these early avoids wasted CI runs and reviewer time.

## Stale or conflicted PRs

Dependabot rebases its PRs automatically when conflicts appear, but stops doing so once a PR has been open for 30 days without merging. Triaging weekly keeps PRs inside that window.

Dependabot exposes a [list of commands](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-pull-request-comment-commands) in the collapsed comment at the bottom of every PR. Use these to refresh stuck branches:

- `@dependabot rebase` — rebase the branch on the latest target. This is the right call for ordinary lockfile conflicts.
- `@dependabot recreate` — rebuild the PR from scratch, overwriting any edits made to the branch. Use this when the PR has been hand-edited and you want Dependabot to take it back over, or when rebase has not produced a clean branch.
- `@dependabot merge` — auto-merge once CI passes. Safe to comment preemptively as long as the checks above have been done.

If Dependabot replies that it cannot rebase, the branch has usually been hand-edited and Dependabot will not force-push over your commits. In that case:

1. If you want Dependabot to keep managing the branch, mark your hand-edited commits with `[dependabot skip]` or `[skip dependabot]` in the commit message. Dependabot will then rebase and force-push over them as needed.
2. Otherwise, treat the PR as a normal branch — pull it down locally, resolve the conflict by hand, and push the fix back up.
3. If the hand-edited changes are no longer needed, close the PR and let Dependabot open a fresh one.
4. Do not delete commits from the Dependabot branch without recording why in the PR — the next person triaging needs to understand what changed.

## When in doubt

Hold the PR and raise it in the engineering channel. A dependency that waits a week to merge is fine; a bad dependency that ships to production is not.
