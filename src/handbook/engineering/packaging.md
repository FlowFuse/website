---
navTitle: Packaging Guidelines
---

# Packaging Guidelines

This section describes the requirements we have for all GitHub repositories,
and npm modules we maintain.

To help ensure all of the requirements are met, an issue should be raised in
[`FlowFuse/admin`](https://github.com/FlowFuse/admin/issues/new/choose){rel="nofollow"}
using the `New Repository Checklist` and then worked through.

## GitHub projects

### Naming

- FlowFuse Components should start with `flowfuse-`
- If a Node-RED plugin/node should start with `nr-`
- Installers or Orchestration projects are named without the leading `flowfuse-` e.g. `installer` or `helm`

### Settings

- A rule should be added under the projects `settings/branches` to prevent pushing directly to the `main` branch
- The `Do not allow bypassing the above settings` rule should be ticked when creating the branch rules

### Content

All Git Repositories must contain the following files:

 - `README.md`
 - `LICENSE`

### Linting

All code repositories should be using ESLint V9 or greater and adopt our standard linting rules by copying
`eslint.config.mjs` from the [FlowFuse/.github repository](https://github.com/FlowFuse/.github/blob/main/eslint.config.mjs).

If a repository has any additional requirements for linting, such as handling Vue
code, then additional plugins can be added.

We stick closely to the [StandardJS](https://standardjs.com/), with one exception - 4 spaces not 2.

#### Scripts for linting in package.json

We add 2 common scripts for linting:
1. `lint`
2. `lint:fix`

Below is a typical example: 
```json
    "scripts": {
        // ...other scripts...
        "lint": "eslint -c eslint.config.mjs",
        "lint:fix": "eslint -c eslint.config.mjs --fix"
    },
```

### Notifications

Repositories should be added to the appropriate Slack channel. For core code repositories,
this would be in the `#gh-flowfuse` channel.

To create a subscription, go to that channel and type the message:

```
/github subscribe FlowFuse/NAME-OF-REPO comments reviews
```

This will subscribe to any notifications covering: `issues`, `pulls`, `commits`, `releases`, `deployments`, `comments` and `reviews`.

### Workflows

#### Project Automation

All code repositories must have the Project Automation workflow added. This is done
by adding [`.github/workflows/project-automation.yml`](https://github.com/FlowFuse/flowfuse/blob/main/.github/workflows/project-automation.yml).
This workflow will ensure any opened issues are automatically added to the [Product board](https://github.com/orgs/FlowFuse/projects/3) where it can be triaged and prioritised.

#### Release Publish

For any repositories that contain modules to be published to public npm, they should also
have a copy of [`.github/workflows/release-publish.yml`](https://github.com/FlowFuse/flowfuse/blob/main/.github/workflows/release-publish.yml).

For modules being published to the Certified Nodes npm registry this `release-publish.yml` file should be edited to point to the `https://registry.flowfuse.com` registry and to make use of the correct token.

An example can be in the [flowfuse/nr-mcp-server-nodes](https://github.com/Flowfuse/nr-mcp-server-nodes/blob/main/.github/workflose/release-publish.yml) project. The `CERTIFIED_NODES_PUBLISH_TOKEN` should be added to the projects Secrets and can be found in 1Password.

This workflow will publish to npm whenever the repository is tagged with a `vX.Y.Z` format
tag.

Note that each repository may have slightly different pre-publish requirements - for
example if there is a build step or not. You may need to customise the workflow
to match what is needed.

#### Private Repositories

For *private* repositories, you will also need to add a Repository Secret as
they cannot access the organization-wide secret we have in place.

1. Generate a [Personal Access Token](https://github.com/settings/tokens) with
   `repo, write:org` scope.

2. Add it as a Repository Secret to the Private Repo (https://github.com/FlowFuse/<repo-name>/settings/secrets/actions)
   with the name `PROJECT_ACCESS_TOKEN`

### Labels

We have a standard set of labels that should be applied to all repositories. This
ensures we have a consistent approach to planning and tracking of work.

The definitive list of labels is maintained [here](https://github.com/FlowFuse/.github/blob/main/labels.json)
and are synchronized across all repositories via GitHub Actions.

 - Type: `epic`, `story`, `task`, `bug`, `artwork`
 - Sizing: `XS - 1`, `S - 2`, `M - 3`, `L - 5`, `XL - 8`, `XXL - 13`
 - Area: `area:docs`, `area:db`, `area:migration`, `area:frontend`, `area:api`, `area:device`, `area:billing`, `area:infrastrucutre`, `area:install`, `design`
 - Priority: `priority:high`, `priority:medium`, `priority:low`
 - Status: `blocked`, `consideration`
 - Product Scope: `scope:devices`, `scope:enterprise`, `scope:node-red`, `scope:collaboration`
 - Other: `good first issue`, `upstream`, `needs-triage`, `headline`, `backport`, `research`


New repositories must be added to the list in [`flowforge-repositories.yml`](https://github.com/FlowFuse/.github/blob/main/flowforge-repositories.yml),
and then the [Synchronize Labels](https://github.com/FlowFuse/.github/actions/workflows/sync-labels.yml) action manually run.
 
## NPM packages

### Naming

*Note:* we are migrating to the `@flowfuse` scope of packages. See [this issue](https://github.com/FlowFuse/admin/issues/211)
for details. This section of the handbook will be updated as part of the migration.

- npm packages should be scoped as either `@flowfuse/` (pubilc) `@flowfuse-nodes/` (restricted) or `@flowfuse-certified-nodes/` (certified nodes)

Node-RED plugins should start with `nr-` e.g.
 - @flowforge/nr-storage
 - @flowforge/nr-auth

FlowFuse plugins should start with `forge-` e.g.

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
        "url": "git+https://github.com/FlowFuse/flowforge.git"
    },
    ```
 - homepage
    ```
    "homepage": "https://github.com/FlowFuse/flowforge#readme",
    ```
 - bugs
    ```
    "bugs": {
        "url": "https://github.com/FlowFuse/flowfuse/issues"
    },
    ```
 - license
   - Apache-2.0
   - SEE LICENSE IN ./LICENSE
 - author
    ```
    "author": {
        "name": "FlowFuse Inc."
    },
    ```
 - engines
    ```
    "engines": {
      "node": ">=16.x"
    }
    ```

Packages with `@flowfuse-nodes/` or `@flowfuse-certified-nodes/` scopes should also contain the `registry` section.
- publishConfig
   ```
   "publishConfig": {
      "registry": "https://registry.flowfuse.com"
   }
   ```

### Package Version Numbering

Package numbers should follow the Semantic Versioning Scheme as laid out on [semver.org](https://semver.org/).

Each component will stay in step with the core flowforge/flowforge release numbering for `major.minor` but will increment their own `fix` values as needed. e.g. On release of v0.2.0 all components will tag and release v0.2.0, but can independently release v0.2.1 as needed.

Major and minor releases will follow the schedule laid out in the [Cadence](./project-management#cadence) section of the handbook.

A Fix release can be made at any time, depending on the best judgement of the engineer making the fix but requires a review by another team member.

The process for making a release is documented [here](./releases/process.md).

### Adding NPM packages to Stacks

As we build more FlowFuse specific nodes we will need to add these to the Stacks

#### Localfs

Currently bundled packages for the localfs driver need to be added to the [nr-launcher](https://github.com/FlowFuse/nr-launcher) `package.json`  and the path to the node needs to be added to the `nodesDir` array in the `lib/launcher.js` file (around line 70). This will be updated in the next release to be controlled by the [driver-localfs](https://github.com/FlowFuse/driver-localfs) project

#### Docker

Any nodes or themes should be added to the `package.json` in `node-red-container/` directory of the [docker-compose](https://github.com/FlowFuse/docker-compose) project

#### K8s

Any nodes or themes should be added to the `package.json` in `node-red-container/` directory of the [helm](https://github.com/FlowFuse/helm) project
