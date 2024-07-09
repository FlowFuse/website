---
originalPath: development/contributing.md
updated: git modified
---

# Contributing

## Coding Best Practices

### Linting

All code repositories adopt our standard linting rules found in the [flowforge/.github repository](https://github.com/FlowFuse/.github/blob/main/.eslintrc).

We use [StandardJS](https://standardjs.com/), with one exception - 4 spaces not 2.

If you're using VSCode, then we recommend using the [ESLint extenstion](https://github.com/Microsoft/vscode-eslint) and setting `all` for the `Eslint › Code Actions On Save: Mode` setting:

<img width="429" alt="ESLint - Action on Save" src="../images/eslint_actiononsave.png">

In the case of working with `vue` or `njk` files (found in the [frontend](https://github.com/FlowFuse/flowfuse/tree/main/frontend) and [website][website-repo] repositories), then you can add `vue` and `njk` to the `Eslint: Probe` setting in order to enable auto-formatting on save for these file types.

<img width="478" alt="ESLint - Probe" src="../images/eslint_probe.png">

### Editor Config

The [website repository][website-repo] uses a [`.editorconfig`](https://editorconfig.org)
to allow editors to automatically pick up the correct style for that repository.
Some editors, like neovim, has this pre-installed. If you're using VSCode, an
[plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
is available.

## Git Best Practices

### Committing

Take care when adding files to a commit. It's easy just to `git add -A` (i.e. add all local changes to a commit) but this can result in commits and PRs being clogged with excessive changes that aren't linked to the actual issue/feature at hand.

Take your time when committing files. Review each file carefully and ensure what you're adding to a commit is relevant and necessary.

#### Git Commit Messages

- Capitalise the first letter, no trailing dot, 72 chars or less.
- First line should be an imperative/present tense, e.g. `Change` (not `Changed` or `Changes`)
- Do not include the issue number in the first line, this means that commit message are then suitable to include in a changelog as-is.
- Second line should either be blank, or reference to an issue/PR using one of the GitHub recognised keywords, e.g. `closes #...` `fixes #...` `part of #...`
- The remainder should be any further narrative that is needed. Wrapped at 72 chars.

#### Branching vs. Forking

Commits must never be pushed directly to `main`. Instead, branch or fork from the relevant branch (most likely `main`) and work from there.

It is preferred that new work be added on a branch (rather than in a forked repository), although this is not enforced. Branch names should be short, informative, and if directly linked to a single issue number, reference such issue number, e.g. `29-issue-summary`.

Once code is merged, please close any related branches in order to keep the repository tidy.

### Pull Requests

PRs, when opened, should have at least one reviewer assigned, and a consequent review approved, before any merge takes place. If a PR is opened for review/discussion purposes, this PR should be set to `draft` state.

When merging a PR, you should choose the "Merge pull request" option. There is no need to rebase or squash the PR commits.

When conducting a PR review, if you are the last (or only) reviewer and all reviews (including your own) are approvals, unless there is a comment from the author stating otherwise, you are free to conduct the merge. Otherwise, leave the merge to the author of the PR, or a future reviewer.

For a comprehensive review of the Pull Request, utilize the designated FlowFuse pre-staging environment. As of the composition of this document, the pre-staging verification is only available for the primary [FlowFuse NPM package](https://github.com/FlowFuse/flowfuse).

Pre-staging environment is created for each Pull Request created within `FlowFuse/flowfuse` repo which includes changes in the source code. Read more in the [Test Changes in Staging](#test-changes-in-staging) section.

## Conducting Code Reviews

As part of our commitment to quality, all code changes should be reviewed by at least one other developer before being merged. This is to ensure that the code is of a high standard, and that any potential issues are caught early.

When code is ready to review, developer should open a Pull Request (PR) and assign a reviewer. The reviewer should then review the code, and provide feedback in the form of comments on the PR.

When reviewing code, consider the following:

- **Functionality:** Has the acceptance criteria on the attached issue been met? Does the code do what it is supposed to do? You ***must explicitly test the functionality***. It is recommended to do so in a [staging environment](#test-changes-in-staging) as well as pulling code changes locally and testing on your own machine. 
- **Test Coverage:** Are there tests for the new code introduced? Are the test cases sufficient, and do they cover more than just golden path?
- **Documentation:** Ensure that supporting documentation has been written, this is especially important for new features and options introduced.

### Test Changes in Staging

For FlowFuse, when changes are merged into the `main` branch, they are [automatically deployed to the production environment](./ops/production#deployment-to-flowfuse-cloud). As such, it is vital a thorough review has been conducted before merging, and that the changes have been tested in a staging environment.

When a pull request includes modifications to the source code, a dedicated pre-staging environment is automatically generated. This pre-staging environment is a complete replica of the staging environment, ensuring that it mirrors the conditions and configurations found in staging. The pre-staging environment serves as a testing ground, allowing developers to thoroughly evaluate their changes before they are merged into the main codebase. This ensures that any issues can be identified and addressed in an isolated setting, maintaining the integrity of the staging environment.

![Example entry in the PR status to show the "Deploy Staging" job](../images/screenshots/devops-pr-staging.png)

The environment itself will then be available at: `https://<pr-number>.flowfuse.dev/` . Information about the pre-staging deployment is sent to `gh-pipelines` Slack channel.

Access credentials for the pre-staging environment are located in the FlowFuse 1Password vault.

The FlowFuse application deployed from the Pull Request comes pre-configured. The environment is terminated upon PR merging or closure. 



[website-repo]: https://github.com/FlowFuse/website