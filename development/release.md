# Release Process

The follow process should be followed for a FlowForge release.

## Setup

 - Decide who will be Release Manager for this release. For Major/Minor releases this should be shared across the whole team to prevent it becoming a single point of failure. For Fix releases it can be the developer committing the fix.
 - Create a Release check list issue (using template) on the flowforge/admin project to keep track of all components included in the release (e.g. https://github.com/flowforge/admin/issues/7)
 - Assign the issue to the Release Manager
 - Ensure you have a valid login token for npmjs as the flowforge user (credentials in the shared password vault)
 - Create a directory to hold fresh checkout of all packages being released (e.g. `mkdir flowforge-x.y.z`)

## Steps

 - Use the `checkout-release` script (from the admin project) to check out clean clones of the packages required to do a release 
 (e.g. `./checkout-release 0.4.0` will create a directory called `release-0.4.0` containing all the required projects)
 - If required, ensure that the correct `user.name` and `user.email` git configuration settings are in place for each repository
 - From within the `release-0.4.0` directory run the `prepare-release 0.4.0` script (from the admin project). This will update all the required
 `package.json` and `CHANGELOG.md` file updates then raise PRs to update the projects.
 - Have update PR reviewed by somebody other than the Release Manager
 - All package numbering PRs to be merged, and releases to be tagged, in the order defined in the admin project release issue. Between each release
 ensure that the previous package has been sucessfully published to npmjs.org.
 - Once all the node module components have been built and published to npm the `installer`, `helm` and `docker-compose` components can be updated and tagged.

## Next Steps

 - As much as possible of the previous steps should be converted into a CI Pipeline making use of GitHub Actions.