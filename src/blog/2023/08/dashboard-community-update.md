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
---

Welcome to the latest Node-RED Dashboard 2.0 update. We've added lots of new widgets, cleaned up compatibility issues alongside Dashboard 1.0 and made strides to improve the events system linking the Node-RED editor with the Dashboard.

<!--more-->

I firstly need to begin with a  "Thank You" to the dozens of pre-alpha users we've had so far. Thanks for being patient whilst we're shipping fast and breaking things. We've had some great feedback, and we're working hard to implement is as best as possible.

Below you'll find a summary of the changes we've made since our [last community update](/blog/2023/07/dashboard-0-1-release).

## New Widgets

### Template (<a href="https://flowforge.github.io/flowforge-nr-dashboard/nodes/widgets/ui-template.html" target="_blank">docs</a>)

Steve has been doing some increddible work on the new `ui-template` widget. This widget allows you to create your own custom components using raw HTML, but also works with any of the components in the [Vuetify](https://vuetifyjs.com/en/components/all/) component library. It's a powerful tool that will enable users to be creative with their own widgets that are not currently available with the standard set of widgets.

![Examples of ui-template](https://flowforge.github.io/flowforge-nr-dashboard/assets/ui-template.9d278589.png)

The Template node also provides access to two built-in functions that can be used to send data back to Node-RED:
- **send(msg)**: Outputs a message (defined by the input to this function call) from this node in the Node-RED flow.
- **submit()**: Send a `FormData` object when attached to a `<form>` element. The created object will consnist of the `name` attributes for each form element, corresponding to their respective `value` attributes.

### Toggle Switch (<a href="https://flowforge.github.io/flowforge-nr-dashboard/nodes/widgets/ui-switch.html" target="_blank">docs</a>)

![Examples of ui-switch](https://flowforge.github.io/flowforge-nr-dashboard/assets/ui-switch.fb5583c2.png)

Adds a toggle switch to the user interface that can be rendered with a label, and traditional toggle switch, or, as in Dashboard 1.0, can be a square element with an icon & colour provided.

## Fixes & Other Changes

### Sidebar

As requested on multiple occassions by the community when we released v0.0.4 of Dashboard 2.0, we've now added a side menu, as per Dashboard 1.0. Currently, this _just_ provides a link to the Dashboard UI, but gives us a canvas on which to expand functionality in the future.

### Improved Events System

We've re-structured the hierarchy of the events system to make it more streamlined. Now, the `ui-base` manages comms via single channels dedicated to each event type, and the widget's ID is then used as a topic. Previously, we had a separate channel for each `action:id`.

If you're interested in learning more about our events architecture, you can read about it [here](https://flowforge.github.io/flowforge-nr-dashboard/contributing/guides/events.html) in the docs.

### Documentation Updates

It's not glamorous, but it's important. We've made sure that all documentation and help text inside Node-RED is fully up to date for the Dashboard 2.0 nodes. We've also include rendered examples for all widgets in our [online documentation](https://flowforge.github.io/flowforge-nr-dashboard/) too.

We've also made sure that any legacy options that had been transferred over from Dashboard 1.0 that haven't been fully implemented yet are temporarily hidden. This means, any options you're seeing, _should_ be working. If they're not - it's a bug.

## What's Next?

We have a lot of things to keep us busy, we are documenting them all in GitHub, and have made public our [planning board](https://github.com/orgs/flowforge/projects/15/views/1). You can see what we're working on, what's coming up next, and what we've got planned for the future [here]()

As always, we're open to ideas, feedback & contributions. If you'd like to get involved, please check out our GitHub Repository [here](https://github.com/flowforge/flowforge-nr-dashboard).

## Join Our Team

If you'd like to be paid to directly contribute to Dashboard 2.0, we are hiring for a 2-3 month position to do just that:

- [Contract Front-End Engineer – Node-RED Dashboard](https://boards.greenhouse.io/flowforge/jobs/4911532004)
