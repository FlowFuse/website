---
title: Dialogs, Customizable Icons and Histograms Now Available in FlowFuse Dashboard
subtitle: Our latest update for FlowFuse Dashboard introduces a new group type, Dialog, a new chart variation, Histogram and customization support for the application icon.
description: Our latest update for FlowFuse Dashboard introduces a new group type, Dialog, a new chart variation, Histogram and customization support for the application icon.
lastUpdated: 2026-06-03
date: 2024-10-11
authors: ["gayan-sandamal"]
image: /blog/2024/10/images/dashboard-1-18-0-blog-tile.png
tags:
   - posts
   - news
   - flowfuse
   - dashboard
keywords: flowfuse dashboard, node-red dashboard, histogram chart, dialog modal, app icon, dashboard customization, node-red dashboard 2.0, ui group, pwa icon, data visualization
cta:
  type: sign-up
  title: "Build Better Dashboards with FlowFuse"
  description: "Get access to the latest FlowFuse Dashboard features including histograms, dialog groups, and custom app icons. Start your free trial today."
meta:
  faq:
    - question: "What is the new Histogram chart type in FlowFuse Dashboard?"
      answer: "The Histogram chart type visualizes the frequency distribution of data across predefined ranges. You pass in raw data and the chart automatically organizes it into ranges and shows how often each range occurs, without requiring manual data processing."
    - question: "How do I configure a Histogram in Node-RED Dashboard?"
      answer: "Add a ui-chart node, select Histogram as the chart type, pass your raw data to it, and configure the range settings. See the full example in the Dashboard documentation at dashboard.flowfuse.com."
    - question: "What is the Dialog group type in FlowFuse Dashboard?"
      answer: "The Dialog group type lets you render a dashboard group as a modal dialog overlay instead of inline on the page. You control when it opens and closes using the ui-control node's Show/Hide command."
    - question: "How do I open and close a Dialog in the dashboard?"
      answer: "Use the ui-control node and send a Show or Hide command targeting the dialog group. This gives you programmatic control over dialog visibility without writing custom Template node HTML."
    - question: "Can I customize the app icon for my Node-RED Dashboard?"
      answer: "Yes. Go to the ui-base settings node in your flow and provide an icon URL. The icon will appear in the browser tab and as the home screen icon when the dashboard is installed as a Progressive Web App (PWA)."
    - question: "What other changes are included in Dashboard 1.18.0?"
      answer: "Version 1.18.0 also added group tooltips for line charts, pointerdown/pointerup events for Button Group, show node status for Button Group, key type options for UI Table, and dynamic layout switching for UI Switch."
    - question: "Where can I read the full 1.18.0 release notes?"
      answer: "The complete release notes are available on GitHub at https://github.com/FlowFuse/node-red-dashboard/releases/tag/v1.18.0."
tldr: "FlowFuse Dashboard 1.18.0 adds three major features: a Histogram chart type for frequency distribution visualization, a Dialog/Modal group type for low-code overlay panels, and customizable app icon support for branding in the browser tab and as a PWA. These changes reduce the need for custom Template node workarounds."
---

This update introduces new ways to enhance data visualization and customization in your dashboards. With key improvements, including a new chart type, customizable app icon support and a dialog feature for groups, this release helps tailor dashboards for better user interaction and flexibility.

<!--more-->

## New Chart Type: Histogram

Histograms are an essential tool for data analysis, offering a clear way to visualize distributions. The latest Dashboard update introduces a fully customizable histogram chart type, allowing you to present frequency distributions for your data.

Whether analyzing performance metrics or user activity, histograms can give you a clear view of how data points are distributed across predefined ranges. You can now easily group data and control the range, providing deeper insights at a glance.

![Screenshot showing the new Histogram chart type](./images/chart-histogram.png){data-zoomable}
_Screenshot showing the new Histogram chart type_

The real advantage of this new Histogram chart type is that it simplifies the process for you. Just pass in the raw data, and the histogram will automatically organize it into meaningful ranges, then display how often each range occurs. This makes it incredibly easy to extract valuable insights without the need for manual data processing.

You can see an example flow for the Histogram chart type [here](https://dashboard.flowfuse.com/nodes/widgets/ui-chart.html#histograms) in our documentation.

## Customizable App Icon

Branding is an essential part of any user experience and with this new feature, you can customize your dashboard's app icon. The Node-RED Dashboard 2.0 now allows users to provide their own application icon, which appears in the browser tab and when the dashboard is installed as a Progressive Web App (PWA). This customization helps reinforce your brand, whether you’re developing IoT solutions, monitoring systems or creating dashboards for end-users.

![Screenshot showing the customizable app icon in browser and as a PWA](./images/app-icon-installation.png){data-zoomable style="max-width: 400px; margin: auto;"}
_Screenshot showing the customizable app icon in browser and as a PWA_

You can configure the icon by navigating to the base UI settings (ui-base) and providing an icon URL. 

You can read more about how to use this feature in the [App Icon Documentation](https://dashboard.flowfuse.com/nodes/config/ui-base.html#application-icon)

## Building Dialogs

Organizing data on dashboards has become more efficient with the new "Dialog/Modal" feature. Groups in Dashboard now have a new ["Type"](https://dashboard.flowfuse.com/nodes/config/ui-group.html#type) property, so they can be rendered inline as before, or instead rendered as a Dialog. The display of the dialog groups can be controlled (opened/closed) via the [Control](https://dashboard.flowfuse.com/nodes/widgets/ui-control.html#show-hide) node.

This removes the need for building custom modals and dialogs in a Template node, and makes the entire experience of building your dialogs low-code.

![Screenshot showing groups rendered as dialogs in the dashboard](./images/ui-group-type-dialog.png){data-zoomable}
_Screenshot showing groups rendered as dialogs in the dashboard_

By utilizing groups as dialogs, users can maintain a clean dashboard while still having quick access to detailed data when required. 

You can read more about the new property, and see an example flow in the [UI Group Documentation](https://dashboard.flowfuse.com/nodes/config/ui-group.html#type)

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