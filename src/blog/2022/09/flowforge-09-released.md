---
title: FlowForge 0.9 released
subtitle: Inter-Project Communication, Default Teams, and realtime device management.
description: Inter-Project Communication, Default Teams, and realtime device management.
date: 2022-09-01 12:00:00.0
authors: ["sam-machin"]
video: nCe_qs0G6ZQ
---

Suspend your projects, and introducing Team Types
<!--more-->

Keep reading for  the details of whats in this release our you can watch our 1 minute roundup video of the new release above. 

We're pleased to announce version 0.9 is now available. The next release of the FlowForge application containing new features, a number of improvements, and bug fixes.

## Features
[Suspend Projects](https://github.com/flowforge/flowforge/issues/893)
Sometimes you want to put a project to one side for a while, maybe your development has stalled or you're waiting on something external to be ready. Perhaps you don't need it to be running all the time. With the 0.8 release we've made some changed to how projects are run. You can now suspend a project, what this means is that the container in which your project runs is removed and nothing is running, Your flows  are safely stored in our database but the project isn't consuming any resources. This means that in FlowForge Cloud we also suspend billing you for it.
Your project will be there ready to start back up when you need it with just one click, the name and hence the URL are still reserved for you.
Remember that any context data or anything written to the filesystem will not persist through a restart or a suspend of a project.
As a result of this change we've also removed the facility to stop a project, Stopping only halted the Node-RED process it didn't remove the resources so was of very limited value, as of Node-RED 3.0 you can stop the flows from executing while still being able to make changes which is a better experience.
You can still restart the Node-RED process from the Forge app as before for example when you have updated a package in your flows.

[Team Types](https://github.com/flowforge/flowforge/issues/733)
We've introduced another concept into the platform with this release. Team Types will allow us to offer more advanced features to teams on FlowForge Cloud, You won't see much difference in this release but it allows us to build on in future releases.

[PostHog Analytics](https://github.com/flowforge/flowforge/issues/695)
We've added analytics to the platform, we're using [PostHog](https://posthog.com/) for this as they share our ethos of open source and self hosting, If you're running your own platform.
For FlowForge Cloud users the data is sent to our PostHog account, but if you're running your own instance then it won't send analytics to us, you are free to configure your own PostHog service though to receive the data yourself.


[Login with email](https://github.com/flowforge/flowforge/issues/856)
A common problem that we've seen from users is trying to login with their email address instead of their username, as of 0.8 you can now enter either at the login screen.

[Custom Dashboard Path](https://github.com/flowforge/flowforge/issues/774)
You can now change the path where the dashboard will be served from, the default is still /ui but you can now move that onto / or anything else. Helpful when migrating existing projects over to FlowForge.


## Improvements
We've made a number of improvements to the overall experience of running FlowForge.

- Improvements to the FlowForge Theme [#883](https://github.com/flowforge/flowforge/pull/883). 
- Upper-case characters in Project Names [#546](https://github.com/flowforge/flowforge/issues/546)
- Accept an update to T&Cs[#451](https://github.com/flowforge/flowforge/issues/451)
- Password reset requests are logged[#773](https://github.com/flowforge/flowforge/issues/773)
- Admin can manually verify users email [#902](https://github.com/flowforge/flowforge/issues/692)

## Bug Fixes
We've fixed the following bugs in this release.
- [Cannot edit template settings](https://github.com/flowforge/flowforge/issues/875)<br>
- [Project Link Nodes Appear in CE Install](https://github.com/flowforge/flowforge-nr-project-nodes/issues/10)
- [Project Link Nodes MQTT Connection](https://github.com/flowforge/flowforge-nr-project-nodes/issues/14)
- [Theme shows white characters on white background](https://github.com/flowforge/flowforge-nr-theme/issues/19)
- [Changing Project on device doesn't remove old modules](https://github.com/flowforge/flowforge-device-agent/issues/27)
- [Device Agent and Node-RED use different time in logs](https://github.com/flowforge/flowforge-device-agent/issues/30)


## Contributors
We'd like the thank the following for their contributions to this release:

[Bonantech](https://github.com/bonanitech) for his work [cleaning up the theme CSS](https://github.com/flowforge/flowforge-nr-theme/commit/30e21a3777dc3438ef206157ee9110728011f59c)

As an open-source project, we welcome the community involvement in what we're building. If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 0.9 and the stacks updated. Upgrade your project stacks to the latest version and start using the Project Link nodes now.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading FlowForge on a local server](http://flowforge.com/docs/install#upgrade).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Customers of FlowForge Cloud can raise a ticket by emailing support@flowforge.com

We also have a `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
