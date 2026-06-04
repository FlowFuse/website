---
navTitle: Editing the Handbook
---
# Editing the Handbook

There are two ways to contribute changes to the handbook: **Nuxt Studio** (recommended for everyone) and **Git** (for engineers and technical contributors).

## Nuxt Studio (recommended)

Nuxt Studio is a browser-based CMS. You do not need to install anything or know Git to use it.

1. Navigate to any handbook page.
2. Click **"Edit this page"** in the right sidebar.
3. Sign in with your GitHub account.
4. Make your changes in the editor — Studio shows a live preview as you type.
5. When ready, click **Save** / **Submit for review**. Studio will open a pull-request on GitHub on your behalf.
6. Ask a colleague to review the pull-request. Once approved and merged, your changes go live.

Changes to the handbook always go through a pull-request review, whether submitted via Studio or Git. This ensures at least two people agree before anything is published.

---

## Git (for engineers)

If you are comfortable with Git and the command line, you can contribute directly to the [website repository](https://github.com/FlowFuse/website).

### New contributions

1. Check out the latest `main` branch.
2. Create a new branch with a descriptive `kebab-case` name.
3. Edit files under `src/handbook/` (the source of truth for handbook content).
4. Commit your changes and push the branch.
5. Open a Pull Request on GitHub and assign a reviewer.
6. Once approved, the reviewer merges the PR.

### Adding to an existing pull-request

1. Check out the branch associated with the open PR.
2. Make your changes, commit, and push — the PR updates automatically.
3. Coordinate with the PR owner on who will review and merge.

### Reviewing a pull-request

1. Check out the branch on your machine.
2. Review the changes; leave comments or suggestions on GitHub.
3. Approve and merge once you are satisfied.

---

## Glossary

### Branch
A complete copy of the project you can edit without affecting the live site. Changes stay on your branch until merged.

### Commit
Saving a set of changes to a branch.

### Git
A version-control system used to track changes to files collaboratively. Our developers use it for code; Nuxt Studio uses it behind the scenes for handbook edits.

### GitHub
The website that hosts our Git repositories and where pull-request reviews happen.

### Handbook
FlowFuse's public document explaining how we run the company.

### Live
The current published version of the handbook, accessible at [/handbook/](/handbook/).

### Markdown
The text format used for handbook pages. It lets you add headings, links, images, and lists using plain text characters. See the [Markdown guide](/handbook/company/guides/markdown/).

### Pull-Request
A request to merge changes from a branch into `main`. It is the point where a colleague reviews and approves your work before it goes live.

### Reviewer
A team member who checks your work and provides feedback before it is published.
