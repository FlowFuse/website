# Release Process

There's two processes, one for major/minor point releases. The second for patch
releases.

## Major/minor point releases

### Setup

 - Decide who will be Release Manager for this release. For Major/Minor releases this should be shared across the whole team to prevent it becoming a single point of failure. For Fix releases it can be the developer committing the fix.
 - Create a Release check list issue (using template) on the flowforge/admin project to keep track of all components included in the release (e.g. https://github.com/flowforge/admin/issues/7)
 - Assign the issue to the Release Manager
 - Ensure you have a valid login token for npmjs as the flowforge user (credentials in the shared password vault)
 - Create a directory to hold fresh checkout of all packages being released (e.g. `mkdir flowforge-x.y.z`)
 - Ensure you have the [GitHub client](https://github.com/cli/cli) and [jq](https://stedolan.github.io/jq/download/) and installed on your machine
 - Ensure you're machine is authenticated witht he GitHub client: `gh auth login`

### Steps

 - Use the `checkout-release` script (available in the admin project) to check out clean clones of the packages required to do a release 
 (e.g. `./admin/checkout-release 0.4.0` will create a directory called `release-0.4.0` containing all the required projects). This script must be run at the same level as your `/admin` directory. 
 - If required, ensure that the correct `user.name` and `user.email` git configuration settings are in place for each repository (only a problem if not using a global configuration)
 - From within the `release-0.4.0` directory run the `prepare-release 0.4.0` script (available in the admin project). This will update all the required
 `package.json` and `CHANGELOG.md` file updates then raise PRs to update the projects. (e.g. `../admin/prepare-release 0.6.0`)
 - Do not panic when you see "All jobs have failed" for `flowforge/flowforge`. The repo will be pointing to newer versions of other packages, which have not yet been published to npm. 
 - Have update PR reviewed by somebody other than the Release Manager
 - All package numbering PRs to be merged, and releases to be tagged, in the order defined in the admin project release issue. Between each release
 ensure that the previous package has been sucessfully published to npmjs.org. You can track this in three ways:
    - Track the "Release Published" action on the GH repository
    - A bot will post to #gh-flowforge Slack channel, although slightly delayed
    - Keep an eye on npmjs.org page for each package.
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
