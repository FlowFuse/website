---
title: "Tracking Who Has Opened a Dashboard"
subtitle: "Using FlowFuse Authentication Audit Dashboard v2 Access"
description: Learn how to track user visits to your Node-RED Dashboard v2 using FlowFuse Authentication. Secure access and identify users accessing your dashboard with this implementation. 
date: 2023-11-13
authors: ["ben-hardill"]
image: "/blog/2023/11/images/dashboard-user-flow.png"
tags:
    - node-red
    - dashboard
    - flowfuse
---

As we continue to add features to the Node-RED Dashboard v2 one feature request that came in was to track which users had visited a Dashboard. Multi user support for the Dashboard is on the backlog but this could be solved with the parts that are currently available.

<!--more-->

## FlowFuse Authentication

One of the features we offer on FlowFuse is the ability to protect HTTP endpoints and Dashboards using the same FlowFuse user authentication that protects access to the FlowFuse Application and the Node-RED instances.

We even offer a specific RBAC 'viewer' role that just allows access to these endpoints but not the FlowFuse application.

FlowFuse authentication can be enabled from the Instance Settings page on the Security tab

This can be used to secure access to a Dashboard hosted in a Node-RED Instance. At the moment the Dashboard while protected by this authentication, it is not aware of which user is accessing it.

But if we include an element in the Dashboard loaded via a HTTP-in/HTTP-response node we gain access to details of the authenticated user.

## Implementation

First we will create a HTTP-in/HTTP-response pair to serve up a single pixel SVG image. I chose SVG as it doesn't require creating a binary image file to load.

The following flow snippet includes both the HTTP-in/HTTP-response nodes and a change node to set the `msg.payload` to the SVG content and to set the HTTP headers to include the correct mime type.

There is also a second change node which extracts the user information.

```json
[{"id":"7f22dc81d8192d4d","type":"http in","z":"98c8d7ea66149291","name":"","url":"/tracker","method":"get","upload":false,"swaggerDoc":"","x":210,"y":460,"wires":[["7d36739c02cd04ec","5f4647c97917cce1"]]},{"id":"58fd30516a077e29","type":"http response","z":"98c8d7ea66149291","name":"","statusCode":"","headers":{},"x":630,"y":460,"wires":[]},{"id":"7d36739c02cd04ec","type":"change","z":"98c8d7ea66149291","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"<svg width=\"1\" height=\"1\"> <rect width=\"1\" height=\"1\" style=\"fill:rgb(255,255,255);stroke-width:3;stroke:rgb(0,0,0)\" /> Sorry, your browser does not support inline SVG.</svg>","tot":"str"},{"t":"set","p":"headers","pt":"msg","to":"{\"Content-Type\":\"image/svg+xml\"}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":420,"y":460,"wires":[["58fd30516a077e29"]]},{"id":"5f4647c97917cce1","type":"change","z":"98c8d7ea66149291","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"req.session.user","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":420,"y":520,"wires":[["ddc02b4e9c30c807"]]},{"id":"ddc02b4e9c30c807","type":"debug","z":"98c8d7ea66149291","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":600,"y":520,"wires":[]}]
```

Next we need to add the SVG to the Dashboard, this can be done by adding a Template node with the following HTML content.

```html
<div>
    <object data="/tracker" height="1" width="1"></object>
</div>
```

This will load the image every time the Dashboard page loads and hence trigger the earlier flow allowing the user to be logged.

## Linking to SSO Users

With the release of FlowFuse v1.14.0 the session object will also include the users email address which is the shared identifier between FlowFuse and the SSO system. This will allow the logging to use a single unified identifier.
