---
title: New Chart Type, Customizable Icon and Groups as Dialogs Now Available in FlowFuse Dashboard
subtitle: Our latest update for FlowFuse Dashboard introduces a new group type, Dialog, a new chart variation, Histogram and customization support for the application icon.
description: Our latest update for FlowFuse Dashboard introduces a new group type, Dialog, a new chart variation, Histogram and customization support for the application icon.
date: 2024-10-11
authors: ["gayan-sandamal"]
image: /blog/2024/08/images/dashboard-2-1150-release.png
tags:
   - posts
   - news
   - flowfuse
   - dashboard
---

At FlowFuse, we strive to improve your dashboard experience by introducing features that enhance data visualization and customization. This update brings new ways to tailor your dashboards with key improvements, including a new chart type, a customizable app icon, and a dialog feature for groups.

## New Chart Type: Histogram

Histograms are an essential tool for data analysis, offering a clear way to visualize distributions. The latest FlowFuse update introduces a fully customizable histogram chart type, allowing you to present frequency distributions for data values. Whether analyzing performance metrics or user activity, histograms give you a clear view of how data points are distributed across predefined ranges. You can now easily group data and control the range, providing deeper insights at a glance.

![Screenshot showing the new Histogram chart type in the FlowFuse Dashboard](./images/chart-histogram.png){data-zoomable}
_Screenshot showing the new Histogram chart type in the FlowFuse Dashboard_

With this feature, visualizing data distribution is easier than ever. Histograms are ideal for applications like monitoring error rates, analyzing sensor data, or displaying survey results.

## Customizable App Icon

Branding is an essential part of any user experience and with this new feature, you can customize your dashboard's app icon. The FlowFuse Dashboard now allows users to provide their own application icon, which appears in the browser tab and when the dashboard is installed as a Progressive Web App (PWA). This customization helps reinforce your brand, whether you’re developing IoT solutions, monitoring systems or creating dashboards for end-users.

![Screenshot showing the customizable app icon in browser and as a PWA](./images/app-icon-installation.png){data-zoomable style="max-width: 400px; margin: auto;"}
_Screenshot showing the customizable app icon in browser and as a PWA_

You can configure the icon by navigating to the base UI settings (ui-base) and providing an icon URL. [App Icon Documentation](https://dashboard.flowfuse.com/nodes/config/ui-base.html#application-icon)

## Groups as Dialogs

Organizing data on dashboards has become more efficient with the new "Groups as Dialogs" feature. You can now display specific widget groups in dialog windows that are triggered manually. This feature is perfect for decluttering complex dashboards or highlighting important metrics when needed. Dialogs can be opened using `ui-control` nodes, allowing you to decide when and how they appear.

![Screenshot showing groups rendered as dialogs in the dashboard](./images/ui-group-type-dialog.png){data-zoomable}
_Screenshot showing groups rendered as dialogs in the dashboard_

By utilizing groups as dialogs, users can maintain a clean dashboard while still having quick access to detailed data when required. [UI Group Type Documentation](https://dashboard.flowfuse.com/nodes/config/ui-group.html#type)

## What else is new?

You can find the full 1.18.0 Release Notes [here](https://github.com/FlowFuse/node-red-dashboard/releases/tag/v1.18.0).

Just to highlight a few, particularly valuable, updates and fixes:
 - UI Chart - Group tooltips for line chart.
 - UI Button Group
    - Show node status
    - Add pointerdown/pointerup event handling and fix button theming bug
 - UI Table - Support key type option for entering fixed strings as item labels
 - UI Switch - Layout Switching with Dynamic Configuration Support

## What's Next?

Work has already begun on the next release, `1.19.0`, you can see what items we have queued up [here](https://github.com/orgs/FlowFuse/projects/15/views/1), if you've got any feedback or suggestions, please do let us know, and feel free to open new issues on our [GitHub](https://github.com/FlowFuse/node-red-dashboard/issues)