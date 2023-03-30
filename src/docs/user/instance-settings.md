---
originalPath: user/instance-settings.md
updated: 2023-03-28 11:00:09 +0000
version: 1.5.0
---
# Instance Settings

The Instance Settings allow you to customize many aspects of your Node-RED runtime.

Instance Settings are split into a number of sections:

 - [General](#general)
 - [Environment](#environment)
 - [Editor](#editor)
 - [Security](#security)
 - [Palette](#palette)

## General

This section includes a number of actions you can take on the instance:

### Change Stack

The Stack determines the version of Node-RED being used. If a new stack
is available, you can use this option to update you stack.

### Copy Instance

This allows you to create a copy of the instance in your team. 

### Import Instance

This allows you to take existing Node-RED flow and credential files and import them
into your instance.

### Suspend Instance

This stops the instance entirely.

### Delete Instance

If you're really sure you don't want the instance anymore, this allows you to delete
it. You cannot undo deleting an instance.

## Environment

This allows you to manage the environment variables. More information
on working with environment variables is available [here](./envvar.md).

## Editor

This covers a number of options to customize the Node-RED editor. This includes:

 - Disabling the editor entirely
 - Modifying the paths the editor and dashboard are served on
 - Controlling the runtime timezone

## Security

This allows you to modify the security settings of the runtime. In particular
this covers the security applied to any HTTP routes served by the runtime.

The default option is not to apply any security - so any HTTP In nodes, or Node-RED
Dashboard can be accessed by anyone.

You can optionally enabled Basic Authentication, with a single hardcoded username
and password.

Alternatively you can require anyone accessing those routes to be logged into
FlowForge.

## Palette

This allows you to manage what extra nodes are installed inside Node-RED, as well
as any restrictions you want to apply to the Palette Manager within Node-RED.