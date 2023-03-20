---
navTitle: Packaging Guidelines
---

# Packaging Guidelines

This section describes the requirements we have for all GitHub repositories,
and npm modules we maintain.

To help ensure all of the requirements are met, an issue should be raised in
[`flowforge/admin`](https://github.com/flowforge/admin/issues/new/choose) using
the `New Repository Checklist` and then worked through.

## Github projects

### Naming

- Flow Forge Components should start with `flowforge-`
- If a Node-RED plugin/node should start with `flowforge-nr-`
- Installers or Orchestration projects are named without the leading `flowforge-` e.g. `installer` or `helm`

### Settings

- A rule should be added under the projects `settings/branches` to prevent pushing directly to the `main` branch

### Content

All Git Repositories must contain the following files:

 - `README.md`
 - `LICENSE`

### Linting

All code repositories should adopt our standard linting rules by copying the
`.eslintrc` from the [flowforge/.github repository](https://github.com/flowforge/.github/blob/main/.eslintrc).

If a repository has any additional requirements for linting, such as handling Vue
code, then additional plugins can be added.

We use [StandardJS](https://standardjs.com/), with one exception - 4 spaces not 2.

### Notifications

Repositories should be added to the appropriate Slack channel. For core code repositories,
this would be in the `#gh-flowforge` channel.

To create a subscription, go to that channel and type the message:

```
/github subscribe flowforge/NAME-OF-REPO comments reviews
```

This will subscribe to any notifications covering: `issues`, `pulls`, `commits`, `releases`, `deployments`, `comments` and `reviews`.

### Workflows

#### Project Automation

All code repositories must have the Project Automation workflow added. This is done
by adding [`.github/workflows/project-automation.yml`](https://github.com/flowforge/flowforge/blob/main/.github/workflows/project-automation.yml).
This workflow will ensure any opened issues are automatically added to the [Product board](https://github.com/orgs/flowforge/projects/3) where it can be triaged and prioritised.

#### Release Publish

For any repositories that contain modules to be published to npm, they should also
have a copy of [`.github/workflows/release-publish.yml`](https://github.com/flowforge/flowforge/blob/main/.github/workflows/release-publish.yml).

This workflow will publish to npm whenever the repository is tagged with a `vX.Y.Z` format
tag.

Note that each repository may have slightly different pre-publish requirements - for
example if there is a build step or not. You may need to customise the workflow
to match what is needed.

#### Private Repositories

For *private* repositories, you will also need to add a Repository Secret as
they cannot access the organisation-wide secret we have in place.

1. Generate a [Personal Access Token](https://github.com/settings/tokens) with
   `repo, write:org` scope.

2. Add it as a Repository Secret to the Private Repo (https://github.com/flowforge/<repo-name>/settings/secrets/actions)
   with the name `PROJECT_ACCESS_TOKEN`

### Labels

We have a standard set of labels that should be applied to all repositories. This
ensures we have a consistent approach to planning and tracking of work.

 - Type: `epic`, `story`, `task`, `bug`
 - Sizing: `1`, `2`, `3`, `5`, `8`, `13`
 - Area: `area:docs`, `area:db`, `area:migration`, `area:frontend`, `area:api`, `area:device`
 - Priority: `priority:high`, `priority:medium`, `priority:low`
 - Status: `blocked`
 - Product Scope: `scope:devices`, `scope:enterprise`, `scope:node-red`, `scope:collaboration`
 - Other: `good first issue`, `upstream`, `needs-triage`

The labels are synchronized across the repositories via a GitHub Action in the [`.github`](https://github.com/flowforge/.github)
repository.
 
New repositories must be added to the list in [`flowforge-repositories.yml`](https://github.com/flowforge/.github/blob/main/flowforge-repositories.yml),
and then the [Synchronize Labels](https://github.com/flowforge/.github/actions/workflows/sync-labels.yml) action manually run.
 
## NPM packages

### Naming

- All packages should be scoped to `@flowforge`

Node-RED plugins should start with `nr-` e.g.
 - @flowforge/nr-storage
 - @flowforge/nr-auth

Flow Forge plugins should start with `forge-` e.g.

 - @flowforge/forge-driver-localfs
 - @flowforge/forge-driver-docker
 - @flowforge/forge-driver-k8s

### Content

The `package.json` must contain the following keys

 - description
 - repository
     ```
     "repository": {
        "type": "git",
        "url": "git+https://github.com/flowforge/flowforge.git"
    },
    ```
 - homepage
    ```
    "homepage": "https://github.com/flowforge/flowforge#readme",
    ```
 - bugs
    ```
    "bugs": {
        "url": "https://github.com/flowforge/flowforge/issues"
    },
    ```
 - license
   - Apache-2.0
   - SEE LICENSE IN ./LICENSE
 - author
    ```
    "author": {
        "name": "FlowFlow Inc."
    },
    ```
 - engines
    ```
    "engines": {
      "node": ">=16.x"
    }
    ```

### Package Version Numbering

Package numbers should follow the Semantic Versioning Scheme as laid out on [semver.org](https://semver.org/).

Each component will stay in step with the core flowforge/flowforge release numbering for `major.minor` but will increment their own `fix` values as needed. e.g. On release of v0.2.0 all components will tag and release v0.2.0, but can independently release v0.2.1 as needed.

Major and minor releases will follow the schedule laid out in the [Cadence](index.md#cadence) section of the handbook.

A Fix release can be made at any time, depending on the best judgement of the engineer making the fix but requires a review by another team member.

The process for making a release is documented [here](../releases/process.md).


### Adding NPM packages to Stacks

As we build more FlowForge specific nodes we will need to add these to the Stacks

#### Localfs

Currently bundled packages for the localfs driver need to be added to the [flowforge-nr-launcher](https://github.com/flowforge/flowforge-nr-launcher) `package.json`  and the path to the node needs to be added to the `nodesDir` array in the `lib/launcher.js` file (around line 70). This will be updated in the next release to be controlled by the [flowforge-driver-localfs](https://github.com/flowforge/flowforge-driver-localfs) project

#### Docker

Any nodes or themes should be added to the `package.json` in `node-red-container/` directory of the [docker-compose](https://github.com/flowforge/docker-compose) project

#### K8s

Any nodes or themes should be added to the `package.json` in `node-red-container/` directory of the [helm](https://github.com/flowforge/helm) project
