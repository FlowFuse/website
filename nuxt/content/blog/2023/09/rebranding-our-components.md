---
title: Updating our branding across GitHub, npm and Dockerhub
subtitle: Renaming our packages and containers and what it means for our users
description: Renaming our packages and containers and what it means for our users
date: 2023-09-27
authors: ["nick-oleary"]
image: "/blog/2023/09/images/tile-rebranding.png"
tags:
    - posts
    - community
    - news
---

Following our rename to FlowFuse last month, we are about to take the next
set of steps to complete the rebrand. This time, focussed on the technical
assets we produce.

<!--more-->

Rebranding a company isn't a small undertaking, especially when your company
name is also your product name. When we announced our [new name last month](/blog/2023/08/flowforge-is-now-flowfuse/) we
prioritised updating the website, our documentation and social media presences.
All of the most visible things relating to the company name.

But we knew that wasn't the whole job done. The name `flowforge` still appears
in the technical resources we use and the artefacts we publish. Changing them
is not as simple a task as changing some words on a website, so it has taken a bit
more time to get our plans in place for this next step.

I wanted to highlight the set of changes we'll be making in the coming days to
complete this migration. For the vast majority of users, expecially those using
FlowFuse Cloud, these changes will be completely transparent.

However, if you are contributing to any of our open source components, or consuming
our npm or Docker packages directly, then please read on.

There are four areas we need to migrate.

### GitHub Organization

As a company everything we do revolves around our GitHub Organization. Our
source code, release planning, this website, and far more all live there.

Step one of our migration will be renaming the organization to `FlowFuse`, so instead
of `https://github.com/flowforge` we will now live at `https://github.com/FlowFuse`.

Renaming organizations on GitHub, whilst not something done lightly, is well catered
for. Many existing urls should get automatically redirected - so any existing
links will still work. We will, of course, do the work to update any urls in our docs.

### NPM package names

We publish a number of packages to the public Node.js Package Manager (npm) repository
under the `@flowforge` name.

After this week's release is done, we'll be updating all of our packages to publish
under the `@flowfuse` name and no longer updating the packages under the old name.

This will impact anyone who has installed any of our components directly from `npm`. For
example, the Device Agent or Node-RED Dashboard 2.0.

We will provide specific upgrade instructions for each of the affected components once
the move is done.

### Docker Images

We publish container images to Dockerhub under the `flowforge` name. Once
we've updated our npm package names, we'll also be updating our container tags
to use the new name.

If you are using our helm or Docker Compose projects, we'll have a new release that
will help get you moved over to the new image names. Likewise our Digital Ocean
and AWS Marketplace offerings will be updated - and instructions provided for existing
users to migrate over.

### FlowFuse Cloud

The final step we have to make is to move FlowFuse Cloud over to its new home
at `app.flowfuse.com`. We have to co-ordinate the update with all of our customers
who use SSO to login to ensure they can continue to access the platform.

Once that is done, it will be a seamless transition for everyone. Existing Node-RED
instances will continue to use the `*.flowforge.cloud` domain, but then all new
instances will use the `*.flowfuse.cloud` domain.
