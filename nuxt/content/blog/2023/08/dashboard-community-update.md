---
title: Dashboard 2.0 - Community Update
subtitle: Our latest Community Update for Dashboard 2.0, including the latest new widgets, fixes and updates on what's next.
description: Our latest Community Update for Dashboard 2.0, including the latest new widgets, fixes and updates on what's next.
date: 2023-08-10
authors: ["joe-pavitt"]
image: "/blog/2023/08/images/Dashboard Community Update-Aug23.jpg"
tags:
    - posts
    - releases
    - community
    - dashboard
---

Welcome to the latest Node-RED Dashboard 2.0 update. We've added lots of new widgets, cleaned up compatibility issues alongside Dashboard 1.0 and made strides to improve the events system linking the Node-RED editor with the Dashboard.

<!--more-->

I firstly need to begin with a  _"Thank You"_ to the dozens of pre-alpha users we've had so far. Thanks for being patient whilst we're shipping fast and breaking things. We've had some great feedback, and we're working hard to implement is as best as possible.

With all of the changes we've been making, we've also made the decision to jump to minor version numbers, and so, **0.1.0 is available now**.

Below you'll find a summary of the changes we've made since our [last community update](/blog/2023/07/dashboard-0-1-release).

## New Widgets

### Template (<a href="https://dashboard.flowfuse.com/nodes/widgets/ui-template.html" target="_blank">docs</a>)

Steve has been doing some incredible work on the new `ui-template` widget. This widget allows you to create your own custom components using raw HTML, but also works with any of the components in the [Vuetify](https://vuetifyjs.com/en/components/all/) component library. It's a powerful tool that will enable users to be creative with their own widgets that are not currently available with the standard set of widgets.

![Examples of ui-template](https://dashboard.flowfuse.com/images/node-examples/ui-template.png)

The Template node also provides access to two built-in functions that can be used to send data back to Node-RED:
- **send(msg)**: Outputs a message (defined by the input to this function call) from this node in the Node-RED flow.
- **submit()**: Send a `FormData` object when attached to a `<form>` element. The created object will consist of the `name` attributes for each form element, corresponding to their respective `value` attributes.

### Toggle Switch (<a href="https://dashboard.flowfuse.com/nodes/widgets/ui-switch.html" target="_blank">docs</a>)

![Examples of ui-switch](https://dashboard.flowfuse.com/images/node-examples/ui-switch.png)

Adds a toggle switch to the user interface that can be rendered with a label, and traditional toggle switch, or, as in Dashboard 1.0, can be a square element with an icon & color provided.

## Fixes & Other Changes

### Sidebar

As requested on multiple occasions by the community when we released v0.0.4 of Dashboard 2.0, we've now added a side menu, as per Dashboard 1.0. Currently, this _just_ provides a link to the Dashboard UI, but gives us a canvas on which to expand functionality in the future.

### Improved Events System

We've re-structured the hierarchy of the events system to make it more streamlined. Now, the `ui-base` manages comms via single channels dedicated to each event type, and the widget's ID is then used as a topic. Previously, we had a separate channel for each `action:id`.

If you're interested in learning more about our events architecture, you can read about it [here](https://dashboard.flowfuse.com/contributing/guides/events.html) in the docs.

### Documentation Updates

It's not glamorous, but it's important. We've made sure that all documentation and help text inside Node-RED is fully up to date for the Dashboard 2.0 nodes. We've also include rendered examples for all widgets in our [online documentation](https://dashboard.flowfuse.com/) too.

We've also made sure that any legacy options that had been transferred over from Dashboard 1.0 that haven't been fully implemented yet are temporarily hidden. This means, any options you're seeing, _should_ be working. If they're not - it's a bug.

## What's Next?

We have a lot of things to keep us busy, we are documenting them all in GitHub, and have made public our [planning board](https://github.com/orgs/FlowFuse/projects/15/views/1). You can see what we're working on, what's coming up next, and what we've got planned for the future.

As always, we're open to ideas, feedback & contributions. If you'd like to get involved, please check out our GitHub Repository [here](https://github.com/FlowFuse/node-red-dashboard).

## Join Our Team

If you'd like to be paid to directly contribute to Dashboard 2.0, we are hiring for a 2-3 month position to do just that:

- [Contract Front-End Engineer – Node-RED Dashboard](https://boards.greenhouse.io/flowfuse/jobs/4911532004)
