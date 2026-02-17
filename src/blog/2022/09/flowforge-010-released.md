---
title: FlowFuse 0.10 released
subtitle: Secure HTTP end points, Read-only users and Static outbound IPs
description: Secure Node-RED HTTP end points, Read-only users and Static outbound IPs
date: 2022-09-30 12:00:00.0
authors: ["rob-marcer"]
video: mjR1iiEFiBg
tags:
    - posts
    - flowfuse
    - releases
---

Secure your HTTP endpoints, create read-only users in your teams and use our static IP address for outbound traffic

<!--more-->

Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above. 

We're pleased to announce version 0.10 is now available. The next release of the FlowFuse application containing new features, a number of improvements, and bug fixes. Keep reading for a promotion code to get your first month free on FlowFuse Cloud. 

## Features
[Secure HTTP Endpoints](https://github.com/FlowFuse/flowfuse/issues/578)
We've added the ability for you to secure your HTTP endpoints. You can now control who can access Dashboards or API endpoints you create in FlowFuse.

[Read-only Users](https://github.com/FlowFuse/flowfuse/issues/657)
We've added a new user role for Read-only access. This will allow users to login to your FlowFuse project and view the Node-RED flows without them being able to edit anything.

[Static Outbound IP Addresses](/docs/cloud/introduction/#ip-addresses)
We've updated FlowFuse Cloud so that all outbound traffic from your projects now comes from a single IP address. When trying to access a remote resource such as a database it is often a requirement for the IP address the traffic comes from to be fixed. 

## Improvements
We've made a number of improvements to the overall experience of running FlowFuse.

- Allow both key and component in a ff-data-table column definition [#43](https://github.com/FlowFuse/forge-ui-components/issues/43)
- Default Stack and Templates [#989](https://github.com/FlowFuse/flowfuse/issues/989)
- Provide platform containers and base stack container for administrators [#917](https://github.com/FlowFuse/flowfuse/issues/917)

## Bug Fixes
We've fixed the following bugs in this release.
- [Provide platform containers and base stack container for administrators](https://github.com/FlowFuse/flowfuse/issues/917)
- [User names can be same (but different case)](https://github.com/FlowFuse/flowfuse/issues/983)
- [User list not refreshing after changing user details](https://github.com/FlowFuse/flowfuse/issues/463)
- [Navigating directly to a device page gets the wrong team selected](https://github.com/FlowFuse/flowfuse/issues/986)
- [Node-RED Isn't ready when FlowFuse app says it is running following a project restart](https://github.com/FlowFuse/flowfuse/issues/941)
- [Invitations left for deleted teams](https://github.com/FlowFuse/flowfuse/issues/923)
- [Following email verification link twice throws error](https://github.com/FlowFuse/flowfuse/issues/1024)
- [Agent does not log stderr from the Node-RED process](https://github.com/FlowFuse/device-agent/issues/21)
- [On Kubernetes project names can not start with a number](https://github.com/FlowFuse/flowfuse/issues/948)
- [When creating projects stack options do not wrap](https://github.com/FlowFuse/flowfuse/issues/930)
- [Save button in admin user-edit dialog doesn't close dialog](https://github.com/FlowFuse/flowfuse/issues/979)
- [Setting UI doesn't allow me to update settings](https://github.com/FlowFuse/flowfuse/issues/911)

## Contributors
We'd like the thank the following for their contributions to this release:

[Pezmc](https://github.com/Pezmc) for their work on [Add device count and project counts by type to admin](https://github.com/FlowFuse/flowfuse/pull/949)

[ArshErgon](https://github.com/ArshErgon) for their work on [Update vue component name for NoVerifiedEmail.vue](https://github.com/FlowFuse/flowfuse/pull/977)

As an open-source project, we welcome the community involvement in what we're building. If you're interested in contributing, checkout our [guide in the docs](/docs/contribute/).

### Try it out

[Sign up for FlowFuse Cloud]({% include "main-cta-url.njk" %}?code=RELEASE010) with this link or at the checkout enter the code **RELEASE010** to get your first project free for a month.

### Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 0.10 and the stacks updated. Upgrade your project stacks to the latest version to make sure you get all the latest changes.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading FlowFuse on a local server](/docs/upgrade/#upgrading-flowfuse).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).
That also includes if you have any feedback or feature requests.

Customers of FlowFuse Cloud can raise a ticket by emailing support@flowfuse.com

We also have a `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
