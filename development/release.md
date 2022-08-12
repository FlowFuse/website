# Release Process

There are two processes, one for major/minor point releases. The second for patch
releases.

## Major/minor point releases

### Setup

 - Decide who will be Release Manager for this release. For Major/Minor releases this should be shared across the whole team to prevent it becoming a single point of failure. For Fix releases it can be the developer committing the fix.
 - Create a Release check list issue (using template) on the flowforge/admin project to keep track of all components included in the release (e.g. https://github.com/flowforge/admin/issues/7)
 - Assign the issue to the Release Manager
 - Ensure you have the following installed on your machine:
    - [GitHub client](https://github.com/cli/cli)
    - [jq](https://stedolan.github.io/jq/download/)
    - [yq](https://mikefarah.gitbook.io/yq/#install)
 - Ensure you're machine is authenticated with the GitHub client: `gh auth login`


### Unmanaged Repositories

Not all repositories are covered by the release automation and must be published
separately. This is typically done by the development team in the build up to the
full release.

The Release Manager should verify the following repositories are up to date and
have been published as needed.

 - `flowforge/usage-ping-collector`
 - `flowforge/forge-ui-components`
 - `flowforge/flowforge-device-agent`
 - `flowforge/flowforge-nr-theme`
 - `flowforge/flowforge-nr-project-nodes`

See the process for releasing to these further down the page.
### Steps

 - Checkout the `flowforge/admin` repository if you do not already have it.
    - Ensure you have the latest with a `git pull`.
 - In the *parent* directory to where you have the `admin` checked out, run:
   
        ./admin/checkout-release 0.x.y
   
   This will create a directory called `release-0.x.y` and checkout all of the releasable
   repositories under it.

   If you do not have a global git configuration, you will need to set `user.name` and `user.email`
   in each of those repositories.

 - Within the release directory run:
   
        cd release-0.x.y
        ../admin/prepare-release 0.x.y
   
   This will check all of the repositories are ready to be released, update
   their `package.json` files to reflect the new version (including cross-package
   dependencies) and update the CHANGELOG files.

   It will then raise PRs against each repository with these changes in.
 - Do not panic when you see "All jobs have failed" for `flowforge/flowforge`. The repo will be pointing to newer versions of other packages, which have not yet been published to npm.
 - Follow through the release checklist to review each PR in turn, get it merged then create the GitHub release.
   The updated packages will be automatically published to npm by our GitHub actions. Verify each one has published
   before moving to the next. You can do this by:
    - Track the "Release Published" action on the GH repository
    - Keep an eye on npmjs.org page for each package.
    - A bot will post to #gh-flowforge Slack channel, although this can be quite delayed
 - Once all the node module components have been built and published to npm the `installer`, `helm` and `docker-compose` components can be updated and tagged.
 - Run [staging CI pipeline publish](https://github.com/flowforge/CloudProject/actions/workflows/build-kube.yml), to ensure staging is running the latest release.

### Next Steps

 - As much as possible of the previous steps should be converted into a CI Pipeline making use of GitHub Actions.

## Patch releases

Patch releases are done at hoc basis, and have a much lighter process to allow
fixes to quickly be released.

1. In the #dev slack channel, explain the need for a patch release and invite others
to have their fixes included.
1. Create a patch release issue in the `flowforge/admin` repository with a list of all PRs
to cherry pick into `X.Y-maint`
1. Create PRs for each of these changes with the target branch being `X.Y-maint`
1. Have the list of changes approved by one other developer, who also merges the list of PRs
1. Create a new PR to `X.Y-maint` to bump the version, and update the CHANGELOG.md
1. Check the list of PRs target merge branch again for each PR
1. Assign all PRs to one developer, and get them merged.
1. Once merged, checkout `X.Y-maint` and tag using `git tag v0.X.Y -m "<One line description of this release>"
1. Push the tag to the GitHub repository, and create a corresponding GitHub release
1. Create two change request issues, one for staging and one for production to upgrade to the latest version

### Unmanaged Releases

The unmanaged repoisitories listed above have a simpler release process.

1. Make announcement in #dev so team is aware
1. Check that all changes have been merged to main
1. Update package.json version number
1. Run the `generate-changelog` script from `flowforge/admin` repository. This
   generates a list of the PRs merged since the last tagged release. Note: this
   script require the `gh` cli to be installed and logged in.
   Update CHANGELOG.md with the output of the script.
1. Open a new PR to merge the package.json and CHANGELOG.md changes - get it merged
1. Tag new release in GitHub with the appropriate verison number eg `v0.1.1`. Copy the CHANGELOG update into the description.
1. Once the release is created, the GitHub Action will take care of publishing to NPM. Check the action to ensure it completes.
