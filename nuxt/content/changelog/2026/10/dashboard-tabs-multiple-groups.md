---
title: Multiple Groups per Tab in Dashboard
description: Dashboard pages using the Tabs layout can now show several groups in a single tab.
date: 2026-10-22 12:00:00
release: "3.2"
authors: ["noley-holland"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/node-red-dashboard/issues/1679
---

You can now put several groups in one tab on a Dashboard page that uses the Tabs layout.

Previously, every group became its own tab. A page with a compose form, its attachments, and a preview needed three separate tabs, or everything stacked on one long page. Now those groups can share a "Compose" tab and sit side by side, just like a Grid page.

To get started:

1. Open a page that uses the **Tabs** layout and add your tabs to the new **Tabs** list.
2. Open each group and pick its **Tab**.

![Adding tabs to a page, choosing a tab in a group's settings, then switching between tabs on the Dashboard](./images/dashboard-tabs-multiple-groups.gif)
*Adding tabs in the page settings, assigning a group to a tab, then flipping through tabs on the Dashboard, each holding several groups.*

You can also drag groups between tabs, and reorder tabs, from the **Layout** view in the Dashboard sidebar.

Existing Tabs pages look exactly the same until you add tabs.

This feature is available to all FlowFuse Dashboard users from v1.33.0, on FlowFuse Cloud and Self Hosted.
