---
navTitle: Release Process
---
# Release Process

We do two types or releases:

 - [Scheduled Releases](#scheduled-releases) - _for the planned release of the entire set of product repositories._
 - [Fix Releases](#fix-releases) - _for ad-hoc release of individual repositories._

## Scheduled Releases

We publish a new release of FlowFuse in line with our [release plan](./planning.md#cadence). Each
release has a Release Manager who oversees the process. This role rotates around
the team to ensure everyone is able to do it and that we don't have any single
points of failure in the process.

### Setup

The Release Manager should take the following steps at the *start* of the release
iteration:

  - Create a Release checklist issue using the [Release Checklist template](https://github.com/FlowFuse/admin/issues/new?assignees=&labels=&template=release.md&title=Release%3A){rel="nofollow"}.
 - Assign the issue to the Release Manager
 - Ensure the following tools are installed and working:
    - git command-line tools
      - Ensure ssh key access is setup so git interactions do not require continual
        password typing - `ssh -T git@github.com`
      -  Ensure you have git configured with an appropriate `user.name` and `user.email`
    - [GitHub client](https://github.com/cli/cli)
      - Ensure the client is logged in using `gh auth login`
    - [jq](https://stedolan.github.io/jq/download/)
    - [yq](https://mikefarah.gitbook.io/yq/#install)

On release day, the Release Manager takes the lead in running the release process,
following the steps in the checklist.

The release is split into four phases:

1. Phase One: Check parts not covered by the automation are up to date.
2. Phase Two: Run the release automation and verify each stage completes properly.
3. Phase Three: Steps to deploy the release to Staging/Production environments.
4. Phase Four: Publicise the release.

The Release Manager chooses when to start the release process. We usually aim to
start the release process at 10am/11am (UK/CET) as that gets to the end of Phase
Two before the team [Launch Lunch](#launch-lunch).

A huddle should be started in the `#dev` channel at the start of the process to
enable others to contribute where needed.

It is also useful for the wider team if the Release Manager posts status updates
to `#dev` throughout the process.

If at any point a team member identifies a problem that needs checking before the
release can continue, they should post a message to `#dev` and join the huddle
to ensure the Release Manage is aware.

### Phase One

#### Check Development Board

Check the [Development Board](https://github.com/orgs/FlowFuse/projects/1/views/33)
for any items still in the 'Verify' column. Check what actions need to be completed
to resolve them.

**Note:** Items should have already been verified by the engineering team before
release day. Leaving verification to release day leaves no time to resolve any
newly discovered issues.

#### Check Usage Ping Collector is up to date

Ensure [https://github.com/FlowFuse/usage-ping-collector]() has been updated. The CTO
tracks this and will flag if an update is needed.

#### Unmanaged Repositories

Not all repositories are covered by the release automation and must be published
separately. This is typically done by the development team in the build up to the
full release and should be coordinated by the CTO or Senior Engineer prior to release
day.

The Release Manager should verify the following repositories are up to date and
have been published as needed.

 - [`flowforge/forge-ui-components`](https://github.com/FlowFuse/forge-ui-components)
 - [`flowforge/flowforge-device-agent`](https://github.com/FlowFuse/flowforge-device-agent)
 - [`flowforge/flowforge-nr-project-nodes`](https://github.com/FlowFuse/flowforge-nr-project-nodes)
 - [`flowforge/flowforge-nr-file-nodes`](https://www.github.com//flowforge/flowforge-nr-file-nodes)
 - [`flowforge/flowforge-nr-persistent-context`](https://github.com/FlowFuse/flowforge-nr-persistent-context)
 - [`flowforge/flowforge-nr-tools-plugin`](https://www.github.com//flowforge/flowforge-nr-tools-plugin)

Verify [`flowforge/flowforge-nr-launcher`](https://www.github.com//flowforge/flowforge-nr-launcher) `package.json` has been updated to pull in the latest versions of `file-nodes`/`persistent-context`/`project-nodes`.

If any need to be updated, refer to the section [Unmanaged Releases](#unmanaged-releases) for releasing these.

### Phase Two

This phase is largely automated using the `create-release` script in the `admin` repository.

Follow these steps to run the script:

1. Clone the [`flowforge/admin`](https://github.com/FlowFuse/admin) repository if you do not already have it.
   Ensure you have the latest with a `git pull`.
2. In the *parent* directory to where you have the `admin` checked out, run the
   following command, replace `1.x.y` with the proper release version.
   ```bash
   ./admin/create-release 1.x.y
   ```
   
   This will create a directory called `release-1.x.y`.

   Then, for each managed repository in turn it will:
 
     - Checks if a matching GitHub release already exists, if so it moves on to the next repo.
     - Checks for any outstanding PRs and waits for confirmation to continue if it finds any.
     - Checks to see if the repo has already been cloned into the release directory.
         - if it has been, ensures it is on `main` and pulls from origin
         - otherwise, clones it
     - Checks that all @flowforge/* dependencies are on npm at the matching version
        - If any dependency is missing, it waits for you to ask it to check again.
     - Creates a clean `release-x.y.z` branch
     - Updates CHANGELOG, package.json and package-lock.json files and commits changes
     - Pushes changes back to GitHub
     - Opens a PR
        - At this point, the PR should be reviewed to ensure all updates look correct
          and all tests are passing. Once merged, the process can continue. 
     - Checks the outstanding PRs again - waits for confirmation to continue
     - Creates a *draft* GitHub release and provides its url.
        - The Release Manager should review the draft - check the release notes look appropriate
          and take note of any first-time contributors from outside the FF team.
        - The script waits for you to confirm you have reviewed the draft
     - Publishes the release and moves onto the next repo
   
3. Digital Ocean Droplet requires a manual step once the GitHub Action has finished, 
   follow [these](./digital-ocean.md) steps to have the new image reviewed and published

### Phase Three

Once everything has been published, the Release Manager should:

1. Run the staging CI pipeline [Build for Staging](https://github.com/FlowFuse/CloudProject/actions/workflows/build-kube.yml) against the main branch, to ensure staging is running the latest release.
  - Once that completes, verify it has deployed cleanly on Staging
2. Raise a "FlowFuse Cloud Change Requests" Issue in [CloudProject Project](https://github.com/FlowFuse/CloudProject/issues/new/choose) to request Production to be updated to the new version.
3. Notify the CTO/Senior Engineer that the release is ready to publish to production.

Once Production has been updated and verified, the Release Manager should announce
the availability of the release in `#dev`. At this point, the marketing team
will take over for Phase Four

### Phase Four

The final phase is where we tell the world about our work. This activity is led
by the PM and Marketing team.


## Fix Releases

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

Finally, create two change request issues in the CloudProject repo, one for staging and
one for production to upgrade to the latest version.

### Unmanaged Releases

The Unmanaged Repositories have a simpler release process. They are released
as needed in coordination with the CTO/Senior Enginneer.

All release activity should be highlighted in #dev so the team is aware.

1. Check that all changes have been merged to main
1. Update the `package.json` version number
1. Run the `generate-changelog` script from `flowforge/admin` repository. This
   generates a list of the PRs merged since the last tagged release. Note: this
   script require the `gh` cli to be installed and logged in.
   Update `CHANGELOG.md` with the output of the script.
1. Open a new PR with the `package.json` and `CHANGELOG.md` changes. Get the PR reviewed
   by someone else and then merged.
1. Create a new GitHub Release with the appropriate version number eg `v0.1.1`.
1. Once the release is created, the GitHub Action will take care of publishing to
   NPM. Check the action to ensure it completes.

## Launch Lunch

To celebrate the launch of a new version of FlowFuse, we organize a lunch on
the release day. See also the [peopleops section](../../peopleops/compensation#launch-lunch).
