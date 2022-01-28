# Release Process

The follow process should be followed for a FlowForge release

## Setup

 - Decide who will be Release Manager for this release. This should be shared across the whole team to prevent it becoming a single point of failure.
 - Create a Release check list issue (using template) on the flowforge/admin project to keep track of all components included in the release (e.g. https://github.com/flowforge/admin/issues/7)
 - Assign the issue to the Release Manager
 - Ensure you have a valid login token for npmjs as the flowforge user (credentials in the shared password vault)
 - Create a directory to hold fresh checkout of all packages being released (e.g. `mkdir flowforge-x.y.z`)

## Steps

 - PR raised to update all relevent version numbers (Please reffer to [Packaging](packaging.md#package-verion-numbering) for details). This should include updating any entries in the `dependencies` section of the `package.json` if applicable and remember to run `npm install` and check in the new updated `package-lock.json` as part of the PR.
 - All package numbering PRs to be merged upfront
 - Create Releases tagged in Github projects
 - The following tasks should be completed in order of dependency e.g. if Component A depends on Component B then Component B should br published first
   - Clean clone of the project using the tag created for the release in the previous step (e.g. `git clone -b 'v0.1.0' --single-branch --depth 1 git@github.com:flowforge/flowforge.git`)
    - Run `npm install`
    - Run any build step needed (e.g. `npm run build` for the flowforge/flowforge project)
    - Run `npm publish` in the project directory. (If this is the first release of a scoped package remember to add `--access=public`)
 - Once all the components have been built and published to npm the `installer`, `helm` and `docker-compose` components can be updated and tagged.

## Next Steps

 - As much as possible of the previous steps should be converted into a CI Pipeline making use of GitHub Actions.