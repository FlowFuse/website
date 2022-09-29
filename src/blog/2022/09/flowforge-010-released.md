---
title: FlowForge 0.10 released
subtitle: Secure HTTP end points, Read-only users and Static outbound IPs
description: Secure Node-RED HTTP end points, Read-only users and Static outbound IPs
date: 2022-09-30 12:00:00.0
authors: ["rob-marcer"]
video: mjR1iiEFiBg
---

Secure your HTTP endpoints, create read-only users in your teams and use our static IP address for outbound traffic

<!--more-->

Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above. 

We're pleased to announce version 0.10 is now available. The next release of the FlowForge application containing new features, a number of improvements, and bug fixes. Keep reading for a promotion code to get your first month free on FlowForge Cloud. 

## Features
[Secure HTTP Endpoints](https://github.com/flowforge/flowforge/issues/578)
We've added the ability for you to secure your HTTP endpoints. You can now control who can access Dashboards or API endpoints you create in FlowForge.

[Read-only Users](https://github.com/flowforge/flowforge/issues/657)
We've added a new user role for Read-only access. This will allow users to login to your FlowForge project and view the Node-RED flows without them being able to edit anything.

[Static Outbound IP Addresses](https://github.com/flowforge/CloudProject/issues/59)
We've updated FlowForge Cloud so that all outbound traffic from your projects now comes from a single IP address. When trying to access a remote resource such as a database it is often a requirement for the IP address the traffic comes from to be fixed. 

## Improvements
We've made a number of improvements to the overall experience of running FlowForge.

- Allow both key and component in a ff-data-table column definition [#43](https://github.com/flowforge/forge-ui-components/issues/43)
- Default Stack and Templates [#989](https://github.com/flowforge/flowforge/issues/989)
- Provide platform containers and base stack container for administrators [#917](https://github.com/flowforge/flowforge/issues/917)

## Bug Fixes
We've fixed the following bugs in this release.
- [Provide platform containers and base stack container for administrators](https://github.com/flowforge/flowforge/issues/917)
- [User names can be same (but different case)](https://github.com/flowforge/flowforge/issues/983)
- [User list not refreshing after changing user details](https://github.com/flowforge/flowforge/issues/463)
- [Navigating directly to a device page gets the wrong team selected](https://github.com/flowforge/flowforge/issues/986)
- [Node-RED Isn't ready when FlowForge app says it is running following a project restart](https://github.com/flowforge/flowforge/issues/941)
- [Invitations left for deleted teams](https://github.com/flowforge/flowforge/issues/923)
- [Following email verification link twice throws error](https://github.com/flowforge/flowforge/issues/1024)
- [Agent does not log stderr from the Node-RED process](https://github.com/flowforge/flowforge-device-agent/issues/21)
- [On Kubernetes project names can not start with a number](https://github.com/flowforge/flowforge/issues/948)
- [When creating projects stack options do not wrap](https://github.com/flowforge/flowforge/issues/930)
- [Save button in admin user-edit dialog doesn't close dialog](https://github.com/flowforge/flowforge/issues/979)
- [Setting UI doesn't allow me to update settings](https://github.com/flowforge/flowforge/issues/911)

## Contributors
We'd like the thank the following for their contributions to this release:

TO BE CONFIRMED - TO BE CONFIRMED - TO BE CONFIRMED - TO BE CONFIRMED

As an open-source project, we welcome the community involvement in what we're building. If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Try it out

[Sign up for FlowForge Cloud](https://app.flowforge.com/account/create?code=RELEASE010) with this link  or at the checkout enter the code **RELEASE010** to get your first project free for a month.

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 0.10 and the stacks updated. Upgrade your project stacks to the latest version and start using the Project Link nodes now.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading FlowForge on a local server](http://flowforge.com/docs/install#upgrade).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Customers of FlowForge Cloud can raise a ticket by emailing support@flowforge.com

We also have a `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
