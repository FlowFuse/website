---
originalPath: cloud/README.md
updated: 2023-03-28 11:00:09 +0000
version: 1.5.0
navGroup: Overview
navTitle: FlowForge Cloud
---

# FlowForge Cloud

FlowForge Cloud is a hosted service allowing users to sign-up and start creating Node-RED instances without having to install and manage their own instance of FlowForge.
The [Concepts](../user/concepts.md) remain the same, but we run the platform for you.

## 30-day Free Trial

When users sign-up to FlowForge Cloud then get a 30-day free trial of the platform.
During that trial they are able to create one Small Node-RED Instance. This is a great
way to start using FlowForge and discover a lot of the value it provides.

Users can setup their billing details at any time during the trial - for example
if they want to create additional Node-RED instances. Those instances will get charged for,
but the trial instance will remain free until the end of the trial period.

At the end of the 30-day trial period, if billing has not been setup on the team,
the trial instance will be suspended. This means it will no longer be running and the
editor will not be accessible. Once billing has been setup on the team, the instance
can be resumed by the team owner.

If billing has been setup with the trial period ends, the trial instance will be
added to the team's monthly subscription.

The platform will email users about their trial when it is nearing the end to ensure
they know what is happening and whether they still need to setup billing.

## Billing

Customers are billed at the team level for each Node-RED instance they create. This is a recurring monthly charge.
See the [Billing](./billing.md) page for more detailed answers about billing.

## Support

Customers can get support by emailing support@flowforge.com, we presently only offer support for the flowforge application and your account, any issues relating to Node-RED such as your flows or a 3rd party node should be raised in the appropriate community forum, for example https://discourse.nodered.org/ or the GitHub project of the third party node.

### Requesting a new verification email

When a user signs up for FlowForge Cloud an email will be send to verify it.
If this email doesn't get delivered one can be resend by signing in to FlowForge
and click the button to resend it.

## Node-RED on FlowForge Cloud

FlowForge currently offers Node-RED 2.2 and 3.0 to customers. When creating a
new instance a [Stack](../user/concepts.md#stack) is chosen, which later
can be [upgraded to a later version](../user/changestack.md).

Each Node-RED can install custom modules as advertised in the [Flow Library](https://flows.nodered.org).

## Use of the File System

FlowForge Cloud provides support for using the standard File nodes in flows with
some limits. The standard filesystem is not persisted between Node-RED restarts,
so a custom set of nodes are used to store the files in persistent storage.

Each Node-RED instance has a quota of `100MB` of file storage. A single write operation is
limited to `10MB` in size.

Some 3rd party nodes try to access the filesystem directly. This can lead to
unpredictable results if the data is not persisted between restarts.

## Node-RED context

Node-RED Context can be used to store small pieces of application state within the
runtime. By default this is stored in memory only.

FlowForge Cloud provides an optional context store that can be used to persist
the data.

Persistent context has a quota limit set at `1MB` per instance.

## Network Connections

### HTTP(S) & Websockets

Node-RED expose an HTTPS interface on port 443 with each instance having its own hostname (example.flowforge.cloud). Plain HTTP requests to port 80 will receive a redirect to HTTPS on port 443.
You MUST connect using the hostname not the IP address to reach your Node-RED instance.
Websocket connections over SSL (wss:) are also supported.

The payload size per request is limited to 5MB, which is the Node-RED default.
When a request exceeds this limit, the whole request is rejected with a `413 Payload Too Large` error.

### TCP and UDP

The default TCP and UDP nodes have been removed from the Node-RED palette. This is
because it is not possible to route these sorts of connections to the container running
Node-RED inside the FlowForge Cloud platform.

### MQTT

MQTT Connections to an external broker using the standard MQTT nodes will work fine as the connection is initiated by Node-RED.

FlowForge does not provide an MQTT broker for general use by Node-RED instances. However the
Project Nodes can be used to easily pass messages between Node-RED instances running in the
platform.

### IP Addresses

Outbound connections from FlowForge will always come from the IP address `63.33.85.112`. 

This can make access to a remote database or corporate network possible where those systems are protected by IP address filtering firewalls. 

All incoming connections MUST use the hostname and not IP address.

## Single-Sign On

FlowForge supports configuring SAML-based Single Sign-On for particular email domains.

This can be configured on request for FlowForge Cloud by submitted a support request
via our [Contact Us](https://flowforge.com/contact-us/) page.

You must have the ability to configure an SAML endpoint on your Identity Provider,
and have authority to configure SSO for your email domain.

We have currently validated our SSO support with the following Identity Providers:

 - Google Workspace
 - OneLogin

If you are using a different Identity Provider, please still get in touch and we
can evaluate what will be required to enable it.

## Removing your account

Before you can delete your account, teams you own must either be deleted or have at least 1 other owner
Once this is done, you can remove your account by going to the "User Settings" page and clicking the "Delete Account" button.

See also: [cancelling your subscription](./billing.md#cancelling-your-subscription).