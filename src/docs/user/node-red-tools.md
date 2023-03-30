---
originalPath: user/node-red-tools.md
updated: 2023-03-28 11:00:09 +0000
version: 1.5.0
---
# FlowForge Node-RED Tools plugin

The Node-RED Tools Plugin is a module you can install into any Node-RED instance
running outside of FlowForge, that gives you the ability to work on your flows
locally.

The current version of the plugin allows you to create a new Instance Snapshot
using the flows you have locally and push them into an instance on FlowForge.

This can make it easier to develop hardware-specific flows locally, that can then
be pushed out to your devices through FlowForge.

## Install

This plugin can be installed through the Manage Palette option by searching for
`@flowforge/nr-tools-plugin` in the Node-RED editor, or on the command-line:

```bash
cd ~/.node-red
npm install @flowforge/nr-tools-plugin
```

This assumes the default location of the Node-RED user directory. If you are not
sure where that is, check the log output when Node-RED starts as it will log the
full path to the `User directory`.

## Usage

This initial version of the plugin allows you to create a snapshot of your locally
developed flows and push them into one of your instances running inside FlowForge.

### Connecting to FlowForge

Before you can do anything, you need to connect the plugin to a FlowForge platform.

1. In the Node-RED editor, open the FlowForge Tools sidebar and click on the cog
   icon to open the settings panel.

2. Enter the url of your FlowForge platform. For example, if you have signed-up
   to [FlowForge Cloud](https://app.flowforge.com/) then use the URL `https://app.flowforge.com`.

3. Click connect. This will open another window where you can log in to FlowForge
   and give permission for the plugin to connect to your account.

4. Once connected, close the settings panel.

### Working with Snapshots

The FlowForge Tools sidebar allows you to browse the teams you are a member of
and their instances.

When you select an instance, the sidebar lists its snapshots.

You can then create a new snapshot using the flows you have running locally.

### Create a Snapshot

1. Click the `+ snapshot` button to open the Create Snapshot dialog.

2. In the dialog, enter a name for the snapshot and an optional description.

3. The dialog lists the modules your flows are using, along with the version number.
   This information is included in the snapshot when sent back to the FlowForge instance.
   Check the notes below on how this is handled within FlowForge.

4. Click 'Create Snapshot'

At this point, a new snapshot will be created in FlowForge. You can then switch
to the FlowForge platform and from the Snapshot view either select the rollback
option to deploy that snapshot, or set it as the Device Target to deploy it to your
devices.

We'll be working on improving this workflow in future releases of the plugin - to
allow you to manage more from within the Node-RED plugin.

#### Adding modules to a snapshot

The snapshot created by the sidebar includes a list of the modules used by the flows.
If there are any modules included that have not already been added to your instance
you will need to manually add them via the `Instance Settings -> Palette -> Installed Modules`
view in the platform.

#### Defining Environment Variables

We do not currently support defining environment variables for the flows from
within the Node-RED Plugin. This means that when you create a snapshot from the
plugin, the platform will automatically merge in the currently defined environment
variables for that instance.

To manage your instance's environment variables, use the `Instance Settings -> Environment`
view in the platform.

