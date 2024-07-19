---
title: Using Environment Variables in Node-RED
subtitle: Predefined data to be used in your Node-RED instance 
description: Node-RED supports environment variables (env vars) slight different, how to use it and the gotcha's are explained in this article.
date: 2023-01-27 16:11:47.0
authors: ["zeger-jan-van-de-weg"]
tags:
    - posts
    - node-red
    - how-to
---

Programs, written with Node-RED or otherwise, need to sometimes retrieve information that wasn’t decided on during the creation of the program. 
<!--more-->

Contextual data like configuration, which user is executing the code, differentiate based on what device is executing a flow, or sometimes secrets which shouldn’t be exposed in the code. This is usually done through environment variables. These are pairs of strings, a key with an attached value, which are accessed by their key. Say you want to access an API endpoint with a key, you’d save the key as `API_KEY` with the value set to `yoursupersecretkey`. FlowFuse allows setting environment variables. Let’s start using them to understand how they work.

One of the options for the `inject` node is to inject a `env variable`, short for; you guessed it: Environment Variable. In this case we’re going to one that’s pre-defined by Node-RED: `NR_FLOW_NAME`. The name of each variable is in all caps by convention. When connecting this inject to a debug it prints “Flow 1” for me.

![Using an environment variable in Node-RED](./images/node-red-use-env-var.png "Using an environment variable in Node-RED")

Leveraging environment variables can also be done with other nodes, like for example `change`, `switch`. Note however; you can set the `inject` node to output the value for `FOO` even when it doesn’t exist, but it doesn’t allow you to check in the switch node for example if `FOO` exists.

Node-RED allows you to set environment variables, but not to change them when executing flows. If you want to update data during execution, look into using [persistent context](/docs/user/persistent-context/). Node-RED doesn’t support Environment Variables like other programming environments do. When the flow is deployed the environment variables are replaced with the known values at that time. This is the biggest gotcha for most developers.

### Predefined variables

Our first example was using a predefined variable, exposed by Node-RED. As of 3.0 it exposes a few environment variables among which `NR_NODE_NAME`, `NR_GROUP_NAME`, and `NR_FLOW_NAME`.

FlowFuse extends this list with for example a `FF_PROJECT_ID` allowing you to for example understand what group of instances sent a certain message, but also sets them for each [device agent](/docs/user/devices/). This allows users to pinpoint which device sent a message, for example to update a dashboard accordingly.

### Managing environments variables

In FlowFuse it’s easy to manage variables set for instances. Under settings in the environment tab it’s a form to set them. You’ll have to restart your instances to make them available in the cloud, and update the target snapshot for devices. When done, these are available.

!["Setting a environment variable in FlowFuse"](./images/flowforge-set-env-var.png "Setting a environment variable in FlowFuse")

