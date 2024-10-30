---
title: "MQTT Service Now Available on FlowFuse"
subtitle: We are thrilled to announce a significant milestone for FlowFuse, we now offer our very own MQTT service, built-in and ready to use with your node-RED applications.
description: We are thrilled to announce a significant milestone for FlowFuse, we now offer our very own MQTT service, built-in and ready to use with your node-RED applications.
date: 2024-10-30
authors: ["joe-pavitt"]
image: /blog/2024/10/images/ff-mqtt.png
tags:
   - posts
   - news
   - flowfuse
   - node-red
---

You may have seen in our [recent product update](/blog/2024/10/flowfuse-release-2-10) that we have release our very own MQTT service, built-in and ready to use alongside your Node-RED applications. We are always engaging with users and prospective customers and this has consistently been a request, and so we are delighted to announce that this is now live on FlowFuse Cloud for our Team and Enterprise teams.

<!--more-->

The MQTT Service is available now on FlowFuse Cloud. FlowFuse permits you to setup your own secure clients to begin publishing and subscribing to your own topics.

You can now use FlowFuse to manage your own MQTT Clients alongside your Node-RED instances, making it easier to build full-stack, event-driven applications within FlowFuse.

## Pricing

If you're on the Team or Enterprise tiers of FlowFuse Cloud, then you don't have to pay any extra to get started with the MQTT Service. 

- **Team Tier:** Includes **5 clients for free** as part of your existing plan
- **Enterprise Tier:** Includes **20 clients for free** as part of your existing plan

In the near future we'll be publishing extra packages of clients that you can add to your team, beyond the amounts included with the base tiers.

## Getting Started

To get started with your own MQTT Clients, navigate to [FlowFuse Cloud](https://app.flowfuse.com), and Sign In.

1. Click the new "Broker" option in the left navigation menu
2. Click "Create Client"

![Screenshot of FlowFuse's "Create Client" interface](./images/mqtt-broker-add-client.png){data-zoomable}
_Screenshot of FlowFuse's "Create Client" interface_

3. Fill out the client's credentials (Username + Password)
4. Define the "Access Control Rules" (see more below)
5. Click "Confirm"

With your client created, you can then, in Node-RED, use the MQTT nodes to connect to your new client.

Setting up a new broker in Node-RED, you can use your credentials accordingly:

![Screenshot of the MQTT Config, "Connection" tab in the Node-RED Editor](./images/mqtt-broker-config.png){data-zoomable}{width=400}
_Screenshot of the MQTT Config, "Connection" tab in the Node-RED Editor_

And the respective "Security" tab:

![Screenshot of the MQTT Config, "Security" tab in the Node-RED Editor](./images/mqtt-broker-security.png){data-zoomable}{width=440}
_Screenshot of the MQTT Config, "Security" tab in the Node-RED Editor_

### Access Control Rules

In MQTT, you can publish and subscribe to _topics_. 

These topics are strings that you can use to organise your data. In the Access Control Rules, you can define which topics your client can publish and subscribe to.

For example, in a flow deployed to many PLCs on your factory floor, you might be publishing to the topics `factory/body-shop/plc/1`, `factory/body-shop/plc/2`, etc.

![Simplified example of MQTT data flow for a Factory Floor](./images/mqtt-factory-architecture.jpg){data-zoomable}
_Simplified example of MQTT data flow for a Factory Floor_

Then, in a Cloud-Hosted flow, you can subscribe to `factory/body-shop/plc/#` to receive all messages from all PLCs in the body shop, and display relevant data into a Dashboard.

Each client that you create can be constrained in two ways:

- **Action**: You can limit clients to whether than can _only_ subscribe, _only_ publish, or conduct both actions.
- **Topic**: You can control which topics a given client can interact with.

These constraints are particularly useful to ensure security throughout your MQTT network, and to ensure that data is only being sent and received by the correct components.