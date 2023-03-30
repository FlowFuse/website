---
originalPath: upgrade/open-source-to-premium.md
updated: 2023-03-28 11:00:09 +0000
version: 1.5.0
---
## Upgrading to Premium

For self-managed FlowForge installations without a license you can unlock more
features with a premium license. As an admin a license can be uploaded to
FlowForge in the admin panel, under the settings tab. When a license is uploaded
a restart of the `forge` app is required.

After the forge application has restarted, the Node-RED runtimes need to be
updated to leverage these features. As restarting Node-RED might need to be
coordinated, FlowForge will not automatically restart all instances.
