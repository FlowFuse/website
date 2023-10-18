---
title: MES: Build vs Buy
subtitle: With the 0.6.0 Release of Dashboard 2.0, we now support third-party widget integration. Read more in this deep dive.
description: With the 0.6.0 Release of Dashboard 2.0, we now support third-party widget integration. Read more in this deep dive.
date: 2023-10-06
authors: ["joe-pavitt"]
image: "/blog/2023/10/images/tile-db-integration.png"
tags:
    - posts
    - releases
    - community
    - changelog
    - dashboard
---

With a new release, comes new features for Dashboard 2.0, and the focus of this release has been on improving the developer experience for those building third-party widgets for Dashboard 2.0.

<!--more-->

Dashboard 1.0 had a hugely popular ecosystem of third party widgets (e.g. `ui-worldmap`, `ui-svg`) and something we've been keen to support is a platform where these widgets (and more) can be built and used within Dashboard 2.0 too.

Whilst we can't support the existing Dashboard 1.0 extensions directly (given that we're now VueJS-based, rather than AngularJS), we hope that the framework, documentation and this article, will help springboard the community to build new (and transfer over old) widgets for Dashboard 2.0.

## Building from `ui-template`

As with Dashboard 1.0, we've utilised the flexibility of our `ui-template` node here to enable third-party integrations.

If you're used the new `ui-template` in Dashboard 2.0 already, you'll know that you can provide raw Vue (HTML) content and it'll render that into your Dashboard. In 0.6.0, we've added _a lot_ of new functionality to the guts of `ui-template`, which we can then extend with our third-party widgets.

This new functionality includes:

- **Custom Dependencies** - Injection of external widget dependencies (e.g. other JavaScript libraries) via `<head>`.
- **On Input** - `onInput` defines behaviour of the widget in Dashboard when it receives a message in Node-RED.
- **On Load** - `onMounted` defines functionality when a widget first loads in Dashboard.
- **Custom Functions** - Define general functions that can be called from within your widget at any point of your choosing
- **Extend Built-In Events** - Our built in `send` function can be called within your widget's template, and will send a message back to Node-RED, with any content of your choosing.
- **Custom SocketIO Event Handlers** - If you want to extend the communication between Dashboard and Node-RED, you can emit your own SocketIO events from Dashboard, and have respective handlers for those events in Node-RED.

We also have plans to expose more of this new functionality to the `ui-template` interface itself within Node-RED, but for now it's mostly available when developing third-party widgets.

## Useful Resources

If you're interested in building integrations, then we've also built a couple of resources to help you get started:

- [Widget Development Guide](https://dashboard.flowfuse.com/contributing/widgets/third-party.html) - A guide for how to structure your own widgets, and 
- [Example Integration (Repo)](https://github.com/FlowFuse/node-red-dashboard-example-node) - We've open sourced a very simple `ui-example` node that demonstrates how you can build your own widget for Dashboard 2.0, that utilises all of the features highlighted above.

## What else is new in 0.6.0?

Whilst we focussed this article on the third-party integrations, we did also squeeze quite a lot more into the 0.6.0 release too with plenty [other fixes and improvements](https://github.com/FlowFuse/node-red-dashboard/releases/tag/v0.6.0), including the separation of the Dash oard 2.0 nodes into a new "Dashboard 2" category in the Node-RED palette.

As always, thanks for reading and your interested in Dashboard 2.0. If you have any feature requests, bugs/complaints or general feedback, please do reach out, and raise issues on our relevant [GitHub repository](https://github.com/FlowFuse/node-red-dashboard).

- [Dashboard 2.0 Activity Tracker](https://github.com/orgs/FlowFuse/projects/15/views/1)
- [Dashboard 2.0 Planning Board](https://github.com/orgs/FlowFuse/projects/15/views/4)