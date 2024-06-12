---
title: Changes to Multi-Tenancy in Node-RED Dashboard 2.0
subtitle: With a recent update in Node-RED Dashboard 2.0, we've made some significant changes to the multi-tenancy feature set. Discover what's new and how it can benefit your projects.
description: With a recent update in Node-RED Dashboard 2.0, we've made some significant changes to the multi-tenancy feature. Discover what's new and how it can benefit your projects.
date: 2024-06-14
authors: ["joe-pavitt"]
image: /blog/2024/05/images/node-red-dashboard-2-layout-navigation-styling.png
tags:
   - posts
   - news
   - flowfuse
   - dashboard 2.0
---

We've listened to a lot of community feedback about our initial decision to make the FlowFuse User Addon to specific FlowFuse team tiers, and with that, also shield away the ability to constrain communications (using a client's socket ID) to specific users. As such, we've made some significant changes to how you can build Dashboards with multi-tenancy in mind.

<!--more-->

A quick summary of the changes are as follows:

- **Socket constraint configuration moved to core:** The ability to constrain communications to a specific client (using the `msg._client.socketId`) has been moved to the core of Dashboard 2.0, and is no longer a feature of the FlowFuse User Addon. As such, it's available to all users, for all node types.
- **Open-sourcing the FlowFuse user addon:** The addon is now available to install in _all_ instances of Node-RED running on FlowFuse, so that's all team tiers on FlowFuse Cloud, and any self-hosted instances of FlowFuse too.
- **Cloudflare auth plugin:** Release of the first community-created Auth Plugin for Dashboard for adding a `user` object when authenticating with Cloudflare.

## Using Client Data

Since our `1.10.0` release of Dashboard, we've introduced a new sidebar tab, "Client Data". This will act as a portal to control whether data about the connected clients is included in any events emitted in the Node-RED editor (appended into `msg._client`), and then define which nodes accept that data as a constraint for communication.

![Screenshot showing the new "Client Data" sidebar available with Dashboard](./images/dashboard-multi-tenancy-sidebar.png){data-zoomable}
_Screenshot showing the new "Client Data" sidebar available with Dashboard_

In this case, if we send a `msg` to any `ui-notification` or `ui-control` which a specified `msg._client.socketId`, then that `msg` will _only_ be sent to the relevant socket connection.

## Building Multi-Tenant Dashboards

We have introduced a new section to our documentation on [Design Patterns](https://dashboard.flowfuse.com/getting-started.html#design-patterns). To summarise them quickly, we now consider there to be two primary design patterns when building with Dashboard:

- **Single Source of Truth**: All users of your Dashboard will see the same data. This is useful for industrial IoT or Home Automation applications.
- **Multi-Tenancy**: Data shown in a particular widget is unique to a given client/session/user. This represents a more traditional web application, where each user has their own session and associated data.

Note that these patterns can be intertwined, some widgets on a screen may be driven by "Single Source of Truth", and others by "Multi-Tenancy".

#### Building a Single Source of Truth Dashboard

![Example flow diagram to show the flow of data in a "Single Source of Truth" architecture](./images/design-pattern-single.png){data-zoomable}
_Example flow diagram to show the flow of data in a "Single Source of Truth" architecture_

Data can be sent to these widgets at any time, when a user connects to the Dashboard, the respective widget will load the relevant data from the centralised data source in Node-RED and show it to the user.

#### Building a Multi-Tenancy Dashboard

![Example flow diagram to show the flow of data in a "Multi-Tenancy" architecture](./images/design-pattern-client.png){data-zoomable}
_Example flow diagram to show the flow of data in a "Multi-Tenancy" architecture_

In this pattern, a very useful node is the `ui-event` node which fires a `msg` when a user views a page. This `msg` will contain a `msg._client` object, detailing the client's connection.

This `_client` object contains the `socketId` of the user (and potentially more depending on any [Authentication plugins](#authentication-plugins) used). This `msg` can then be passed through to any other widget, and if configured to "Accept Client Constraints" that `msg` will only be sent to the specified client.

## Authentication Plugins

In this release we've also added a special category of plugins, "Authentication Plugins". 

These plugins register themselves with Dashboard, and are permitted to add to the `msg._client` object. This can be useful for adding additional information about the client, such as their user ID, e-mail address or username.

This data can then be used to constrain communications to a specific _user_ rather than just a _socket connection_, which is far more reliable and secure.

Any active plugins you have installed, will also be detailed in the new "Client Data" sidebar (detailed above) so you can see which plugins are active and what data they are adding to the `msg._client` object.

### FlowFuse User Addon

Whilst the plugin was first published a few months back, after hearing community feedback, we've made changes and are now open-sourcing the project. As such, it's available to all users running Node-RED through FlowFuse.

The addon appends a `user` object to the `msg._client` object, populated with the details of the FlowFuse user performing the relevant actions in Dashboard.

You can then use this information to send data to specific user's Dashboards, and show user-specific data in your widgets.

It's worth noting that instances must have ["FlowFuse User Authentication"](https://flowfuse.com/blog/2024/04/displaying-logged-in-users-on-dashboard/#enabling-flowfuse-user-authentication) switched on in the instance's settings.

You can install the FlowFuse User Addon from the Palette Manager in the Node-RED editor.

### Cloudfare User Addon (Community Contribution)

We're also thrilled to announce that the first community-contributed plugin has been open-sourced which will append a `user` object to the `msg._client` object when authenticating with Cloudflare.

You can view the project here, and get started by installing it from the Palate Manager in the Node-RED editor.



