Flow Forge Packaging Guidelines

## Github projects

### Naming

- Flow Forge Components should start with `flowforge-`
- If a Node-RED plugin/node should start with `flowforge-nr-`
- Installers or Orchestration projects are named without the leading `flowforge-` e.g. `installer` or `helm`

### Content

All Git Repositories must contain the following files:

 - README.md
 - LICENSE

### Notifications

Repositories should be added to the appropriate Slack channel. For core code repositories,
this would be in the `#gh-flowforge` channel.

To create a subscription, go to that channel and type the message:

```
/github subscribe flowforge/NAME-OF-REPO comments
```

This will subscribe to any notifications covering: `issues`, `pulls`, `commits`, `releases`, `deployments` and `comments`

### Workflows

All code repositories must have the Project Automation workflow added. This is done
by adding [`.github/workflows/project-automation.yml`](https://github.com/flowforge/flowforge/blob/main/.github/workflows/project-automation.yml). This workflow will ensure any
issues or PRs opened/closed against the repo are automatically tracked on the Development
[Project board](https://github.com/orgs/flowforge/projects/1)

#### Private Repositories

For *private* repositories, you will also need to add a Repository Secret as
they cannot access the organisation-wide secret we have in place.

1. Generate a [Personal Access Token](https://github.com/settings/tokens) with
   `repo, write:org` scope.

2. Add it as a Repository Secret to the Private Repo (https://github.com/flowforge/<repo-name>/settings/secrets/actions)
   with the name `PROJECT_ACCESS_TOKEN`

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

Each component will stay in step with the core flowforge/flowforge release numbering for `major.minor` but will increment their own `fix` values as needed. e.g. On release of v0.2.0 all components will tag and release v0.2.0, but can independantly release v0.2.1 as needed.
