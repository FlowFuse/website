---
title: FlowFuse 1.0 released
subtitle: FlowFuse at 1.0, a huge milestone for us.
description: FlowFuse is now 1.0!
date: 2022-10-27 18:00:00.0
authors: ["rob-marcer"]
video: 5TLT7CQR7iI
tags:
    - posts
    - flowfuse
    - releases
---

Predefined environment variables for your Instances and Devices, manage your Project's modules and import your existing flows (and credentials) into your FlowFuse [Projects](/docs/user/concepts/#instance).

<!--more-->

<!-- Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above.  -->

We're pleased to announce version 1.0 FlowFuse is now available. Keep reading for a promotion code to get your first month free on FlowFuse. Version 1.0 represents our vision of the base set of features needed for you to get great value from using FlowFuse in a production environment. That's not to say we are done, we will continue to add features, improve our interfaces and fix bugs with the same enthusiasm as we've worked towards 1.0. We'd like to hear your feedback on what we will be including in [1.1 and beyond](https://github.com/orgs/FlowFuse/projects/5).

## Features
[Standard Environment Variables set for both Projects and Devices](https://github.com/FlowFuse/flowfuse/issues/841)

Projects now get a set of predefined environment variables that can be used by their flows. These give your flows access to the projects unique id and name. When the flows are deployed to [devices](/docs/user/concepts/#device), they also get the device's id and name. That makes is easier to deploy flows across multiple devices and have each able to identify itself.

[Add additional node modules to your projects](https://github.com/FlowFuse/flowfuse/issues/405)
This feature allows you to pre-define additional Node-RED nodes and node modules you may want to be installed in your FlowFuse project, making it easier to manage.

[Import existing projects into FlowFuse](https://github.com/FlowFuse/flowfuse/issues/835)

You can now import your existing flow and credentials files straight into your FlowFuse project - making it really easy to move your existing projects into the platform.

## Improvements
We've made a number of improvements to the overall experience of running FlowFuse.

- Editable Stack labels [#915](https://github.com/FlowFuse/flowfuse/issues/915)
- Check for suitable version of Node on Devices [#37](https://github.com/FlowFuse/device-agent/issues/37)
- Realtime Project status details in Project overview  [#990](https://github.com/FlowFuse/flowfuse/issues/990)
- Improve Template creation & Edit Project Settings UX [#1041](https://github.com/FlowFuse/flowfuse/issues/1041)

## Bug Fixes
We've fixed the following bugs in this release.
- [Pressing return in search box reloads page](https://github.com/FlowFuse/flowfuse/issues/1143)
- [Vue Router Warn](https://github.com/FlowFuse/flowfuse/issues/1126)
- [Kebab menu in Settings breaks](https://github.com/FlowFuse/forge-ui-components/issues/58)
- [flowforge-nr-launcher missing try/catch on http request](https://github.com/FlowFuse/flowfuse/issues/1096)
- [Invite with + in email address is incorrectly sanitised](https://github.com/FlowFuse/flowfuse/issues/1145)
- [Table does not sort correctly when empty fields are present](https://github.com/FlowFuse/forge-ui-components/issues/59)
- [4xx Errors not shown in App](https://github.com/FlowFuse/flowfuse/issues/929)
- [Inconsistent errors returned from the API](https://github.com/FlowFuse/flowfuse/issues/1076)
- [Module install not working on windows](https://github.com/FlowFuse/flowforge-nr-launcher/issues/77)
- [Avatar lettering is mis-allinged when only rendering 1 character](https://github.com/FlowFuse/flowfuse/issues/1038)
- [it.only is not prohibited](https://github.com/FlowFuse/flowfuse/issues/968)
- [No feedback when an API error occurs editing user](https://github.com/FlowFuse/flowfuse/issues/966)
- [Start action is available on a running project](https://github.com/FlowFuse/flowfuse/issues/1040)
- 
## Contributors
We'd like the thank the following for their contributions to this release:

[Jozefik](https://github.com/Jozefik) for their work on [Adding limits to admin panel](https://github.com/FlowFuse/flowfuse/pull/1082).

As an open-source project, we welcome community involvement in what we're building. If you're interested in contributing, checkout our [guide in the docs](/docs/contribute/).

### Try it out

[Sign up for FlowFuse-Managed Premium]({% include "sign-up-url.njk" %}?code=RELEASE1) with this link or at the checkout enter the code **RELEASE1** to get your first project free for a month. As an open source project you can also use [FlowFuse-Community](/docs/install/) for free, forever.


### Upgrading FlowFuse

Our managed [FlowFuse]({{ site.appURL }}) is already running 1.0. Upgrade your project Stacks to the latest version to make sure you get all the latest changes.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading FlowFuse on a local server](/docs/upgrade/#upgrading-flowfuse).

### Getting help

If you hit any problems with the platform, or have questions to ask, please raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).
That also includes if you have any feedback or feature requests.

Customers of FlowFuse Cloud can raise a ticket by emailing support@flowfuse.com

We also have a `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
