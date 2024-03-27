---
originalPath: upgrade/open-source-to-premium.md
updated: 2024-03-14 16:19:12 +0000
version: 2.2.0
navTitle: Installing a license
---

## Upgrading to Premium and Enterprise from Starter

For self-managed FlowFuse installations without a license you can unlock more
features with a premium license. As an admin a license can be uploaded to
FlowFuse in the admin panel, under the settings tab. When a license is uploaded
a restart of the `forge` app is required.

After the forge application has restarted, the Node-RED runtimes need to be
updated to leverage these features. As restarting Node-RED might need to be
coordinated, FlowFuse will not automatically restart all instances.
