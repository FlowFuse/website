---
title: First Pre-Alpha Release of the new Node-RED Dashboard
subtitle: Introducing v0.0.1 – An Initial Glimpse at the Future of Dashboarding in Node-RED
description: The first release of the successor to the Node-RED Dashboard has arrived, marking the beginning of the pre-alpha phase.
date: 2023-07-27
authors: ["joe-pavitt", "marian-demme"]
image: /blog/2023/07/images/nr-dashboard-tile.png
tags:
    - posts
    - releases
    - dashboard
---

Just weeks ago, we at FlowFuse [announced our plan](../../06/dashboard-announcement) to develop a successor to the Node-RED Dashboard. Today, we're excited to reveal the pre-alpha release of this highly anticipated project, bringing us one step closer to a new era of data visualization in Node-RED.

<!--more-->

## Sneak Peek into the New Node-RED Dashboard

<!-- ![](./images/placeholder.png "new Node-RED Dashboard Overview")-->

The Node-RED Dashboard successor is now available for install as an npm package under the name [@flowforge/node-red-dashboard](https://www.npmjs.com/package/@flowforge/node-red-dashboard) in your Node-RED palette manager.

This pre-alpha version includes the first set of Vue.js-based elements familiar to Node-RED Dashboard users:

!["new Node-RED Dashboard Elements"](./images/nr-dashboard-screenshot.png "new Node-RED Dashboard Elements")

This is but a hint of what's to come. The objective of these pre-alpha releases is to provide early access to the current status.

The strength of the project comes from the community. Your insights, suggestions and contributions play a significant role in shaping the future of this dashboard. Keep them coming through our [Github page](https://github.com/FlowFuse/node-red-dashboard).

## Current Status and Next Steps

As of now, we've implemented the following Dashboard Widgets:

- UI Text ([ui-text Widget](https://github.com/FlowFuse/node-red-dashboard/issues/38))
- Text Input ([ui-text-input Widget](https://github.com/FlowFuse/node-red-dashboard/issues/39))
- Range Slider ([ui-slider Widget](https://github.com/FlowFuse/node-red-dashboard/issues/47))
- Dropdown/Select ([ui-dropdown Widget](https://github.com/FlowFuse/node-red-dashboard/issues/45))

We've also introduced a new widget:

- Markdown ([ui-markdown Widget](https://github.com/FlowFuse/node-red-dashboard/issues/62))

Not yet part of the first Pre-Alpha Release:

- Toggle Switch ([ui-switch Widget](https://github.com/FlowFuse/node-red-dashboard/issues/42))
- Color Picker ([ui-color-picker Widget](https://github.com/FlowFuse/node-red-dashboard/issues/46))
- Number Input ([ui-numeric Widget](https://github.com/FlowFuse/node-red-dashboard/issues/41))
- Form ([ui-form Widget](https://github.com/FlowFuse/node-red-dashboard/issues/49))
- Date selector ([ui-date-picker](https://github.com/FlowFuse/node-red-dashboard/issues/32))

Our immediate focus is to continue adding the missing elements from the original Node-RED Dashboard, releasing each as soon as they're fully developed. This will significantly increase the frequency of our releases in the upcoming weeks.

In addition to these releases, we plan to publish regular blog posts titled "What's New in Node-RED Dashboard". These posts will keep you informed of all the latest features, updates, and improvements.