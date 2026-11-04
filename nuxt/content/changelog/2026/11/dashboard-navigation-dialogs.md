---
title: Navigation and Dialogs Without Extra Wiring
description: Buttons can now go to a page or open a dialog on their own, and ui-control can show, hide, enable and disable things from actions set up in the node.
date: 2026-11-XX 12:00:00
release: "X.Y"
authors: ["stephen-mclaughlin", "noley-holland"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/node-red-dashboard/issues/2350
  - https://github.com/FlowFuse/node-red-dashboard/issues/2352
  - https://github.com/FlowFuse/node-red-dashboard/issues/2315
---

You can now build dashboard navigation by picking options in the editor, instead of wiring change and function nodes to build a `msg.payload`.

<video autoplay loop muted playsinline aria-label="A ui-button set to navigate switching dashboard pages, a popup closing on an outside click, a modal staying open until its close button is pressed, and a ui-control node running a list of actions when an inject node sends it a message" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/11/images/dashboard-nav-dialogs.webm" type="video/webm" /></video>

**Buttons can navigate and open dialogs.** Set a `ui-button`'s payload type to:

- **navigate** to go to a page, or to Back, Previous page or Next page
- **popup** to open a dialog group that closes when you click outside it or press Esc
- **modal** to open a dialog group that stays open until you click its close button

If the dialog group is on another page, the dashboard switches to that page first and then opens it. The button still sends its message, so your flow can react to the click.

**ui-control can run actions set up in the node.** Set **On input** to **Run the actions below** and add rows that navigate, or show, hide, enable or disable a page, group or widget. Pick targets from your dashboard, or read them from a `msg` property. Any message into the node runs the list.

**ui-control nodes used only for commands no longer cost anything.** A new **None** output, now the default for new nodes, removes the output and stops the node listening to every connected browser. Existing nodes keep their current setting.

This feature is available to all FlowFuse Dashboard users from v1.36.0, on FlowFuse Cloud and Self Hosted.
