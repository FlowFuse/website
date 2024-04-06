---
navTitle: Dashboard 2.0 Releases
---

# Dashboard 2.0 Release Process

The following steps are taken in order to cut a release for Node-RED Dashboard 2.0:

## Code (Version) Updates

- Update the `package.json` to the new version number
- `npm install` locally to update the `package-lock.json`
- Commit the changes to the two files to a new branch named `vX.Y.X`
- Push the changes to the branch, and open a Pull Request, titled `vX.Y.X`
- Have someone else review the Pull Request, and merge when approved

## GitHub Release

- Navigate to the Dashboard [Releases](https://github.com/FlowFuse/node-red-dashboard/releases) page and click _"Draft a new release"_
- In the "Choose a tag" dropdown, type in the new version number, and select the _"Create new tag vX.Y.X"_ option
- Select "Generate release notes", this will auto-populate with all Pull Requests contained within the release.
- Manually group the list of PRs in the release notes into the following categories:
    - **New Widgets & Variations:** For any new widgets/nodes, or types of a widget, e.g. new chart types or gauge types.
    - **Fixes & Improvements:** Bug fixes and/or smaller improvements to existing code.
    - **Documentation:** Any PRs dedicated to documentation improvements.
    - **Dependencies:** PRs linked to changing a version number of a dependency, or adding a new dependency.
    - **Administration:** PRs that are related to the administration of the repository, e.g. CI/CD changes, etc.
- Click "Publish Release"
- Doing so will automatically trigger the publication of the updates to npm via a [GitHub Action](https://github.com/FlowFuse/node-red-dashboard/actions)

## Publish to Node-RED Palette Manager

Once the package has been updated on `npm`, you need to update the entry for Dashboard 2.0 in Node-RED Palette Manager too:

- Navigate to the ["Adding a node"](https://flows.nodered.org/add/node) section of the Node-RED Palette Manager
- Enter `@flowfuse/node-red-dashboard` into the library name field
- Click "Add Node"

Within the next 25-30 minutes, the entry Node-RED's Palette Manager will live update for all Node-RED's worldwide.