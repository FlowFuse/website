---
navTitle: Release Process
---
# Release Process

There are two processes, one for major/minor point releases. The second for patch
releases.

## Major/minor point releases

### Setup

 - Decide who will be Release Manager for this release. For Major/Minor releases this should be shared across the whole team to prevent it becoming a single point of failure. For Fix releases it can be the developer committing the fix.
 - Create a Release checklist issue using the [Release Checklist template](https://github.com/flowforge/admin/issues/new?assignees=&labels=&template=release.md&title=Release%3A)
 - Assign the issue to the Release Manager
 - Ensure you have the following installed on your machine:
    - git command-line tools.
    - [GitHub client](https://github.com/cli/cli)
    - [jq](https://stedolan.github.io/jq/download/)
    - [yq](https://mikefarah.gitbook.io/yq/#install)
 - Ensure you're machine is authenticated with the GitHub client: `gh auth login`
 - Ensure you are able to access the FlowForge repositories using the git cli without being prompted for a password: `ssh -T git@github.com`
 - When we are ready to start the release process the Release Manager should start a Slack Huddle in #dev and keep that open until the release is completed.

### Unmanaged Repositories

Not all repositories are covered by the release automation and must be published
separately. This is typically done by the development team in the build up to the
full release.

The Release Manager should verify the following repositories are up to date and
have been published as needed.

 - [`flowforge/usage-ping-collector`](https://github.com/flowforge/usage-ping-collector)
 - [`flowforge/forge-ui-components`](https://github.com/flowforge/forge-ui-components)
 - [`flowforge/flowforge-device-agent`](https://github.com/flowforge/flowforge-device-agent)
 - [`flowforge/flowforge-nr-theme`](https://github.com/flowforge/flowforge-nr-theme)
 - [`flowforge/flowforge-nr-project-nodes`](https://github.com/flowforge/flowforge-nr-project-nodes)
 - [`flowforge/flowforge-nr-persistent-context`](https://github.com/flowforge/flowforge-nr-persistent-context)

Refer to the section [Unmanaged Releases](#unmanaged-releases) for releasing these.

### Steps

 - Checkout the `flowforge/admin` repository if you do not already have it.
    - Ensure you have the latest with a `git pull`.
 - In the *parent* directory to where you have the `admin` checked out, run:
   
        ./admin/checkout-release 0.x.y
   
   This will create a directory called `release-0.x.y` and checkout all of the releasable
   repositories under it.

   NOTE: If you do not have a global git configuration, you will need to set `user.name` and `user.email`
   in each of those repositories.

 - Within the release directory run:
   
        cd release-0.x.y
        ../admin/prepare-release 0.x.y
   
   This will check all of the repositories are ready to be released, update
   their `package.json` files to reflect the new version (including cross-package
   dependencies) and update the CHANGELOG files.

   It will then raise PRs against each repository with these changes in.
- Do not panic when you see "All jobs have failed" for the `flowforge/flowforge` Release PR. 
      This is due to the repo pointing to newer versions of other packages which have not yet been published to npm.

 - Follow through the current release checklist in [`flowforge/admin`](https://github.com/flowforge/admin/issues) in the order they are listed.
   Each PR will need to be reviewed, merged and tagged taking care to verify each one has been published before moving to the next.
   Some steps will also require you to pause and re-run tests before continuing.
   Updated packages will be automatically published to npm by our GitHub actions.  You can check the publish status of these as follows:
    - Track the "Release Published" action on the GH repository
    - Keep an eye on npmjs.org page for each package
    - Watch for bot notifications in the [#gh-flowforge](https://flowforgeworkspace.slack.com/archives/C02UR3MBA1J) Slack channel (NOTE: the notifications can take quite a while to appear in the channel)
 - Once all the node module components have been built and published to npm the `installer`, `helm` and `docker-compose` components can be updated and tagged.
 - Run [staging CI pipeline publish](https://github.com/flowforge/CloudProject/actions/workflows/build-kube.yml), to ensure staging is running the latest release.

### Next Steps

 - As much as possible of the previous steps should be converted into a CI Pipeline making use of GitHub Actions.

## Patch releases

Patch releases are done as needed and have a much lighter process to allow
fixes to be released quickly.

The core `flowforge` repository has some automation in place to help with this process.
Until that is rolled out across the other repositories, some of the backporting work
must be done manually.

 - Changes must first be PR'd to the `main` branch and reviewed in the normal manner.
 - Before merging, the PR should have the label `backport` added.
 - If in `flowforge/flowforge`, when the PR is merged, an automation will run to create a new PR that backports
   the change to the maintenance branch. Otherwise, the backport PR must be manually created.
 - The backport PR must be reviewed and merged in the normal manner.
 - Once all of the required backport PRs are merged, raise a PR on the `maintenance` branch
   to update the version and `CHANGELOG.md` file with suitable details.
 - Create the GitHub release with the appropriate `vX.Y.Z` tag.

Finally, create two change request issues in the admin repo, one for staging and
one for production to upgrade to the latest version.

### Unmanaged Releases

The unmanaged repositories listed above have a simpler release process.

1. Make announcement in #dev so team is aware
1. Check that all changes have been merged to main
1. Update package.json version number
1. Run the `generate-changelog` script from `flowforge/admin` repository. This
   generates a list of the PRs merged since the last tagged release. Note: this
   script require the `gh` cli to be installed and logged in.
   Update CHANGELOG.md with the output of the script.
1. Open a new PR to merge the package.json and CHANGELOG.md changes - get it merged
1. Tag new release in GitHub with the appropriate version number eg `v0.1.1`. Copy the CHANGELOG update into the description.
1. Once the release is created, the GitHub Action will take care of publishing to NPM. Check the action to ensure it completes.

## Launch Lunch

To celebrate the launch of a new version of FlowForge, we organize a lunch on
the release day. Each team member is encouraged to order a lunch (Expensable up
to 25$ per launch) and join a social lunch zoom call.
