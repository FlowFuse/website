---
title: "FlowFuse 2.5: New features to visualize snapshots, LDAP integration, and more"
subtitle: Enhancing security, visualization, and deployment flexibility.
description: Discover the new features in FlowFuse 2.5, including LDAP integration, visual snapshot comparisons, blueprint previews, snapshot import/export support, and custom domain deployment for dashboards and APIs.
date: 2024-06-06
authors: ["grey-dziuba"]
image: /blog/2024/06/images/release-2-5-graphic.png
tags:
   - posts
   - flowfuse
   - releases
   - LDAP
   - snapshot
   - blueprint
   - Node-RED
   

---

FlowFuse 2.5 introduces LDAP integration, snapshot comparison, extends the ability to preview flow to Blueprints, rounds out the management for snapshots, and allows you to point your own domain names at your FlowFuse instances.

<!--more-->

## Support for LDAP integration [#2558](https://github.com/FlowFuse/flowfuse/issues/2558)

In our commitment to making FlowFuse more versatile and secure, we've introduced support for LDAP alongside our existing SAML SSO options. This has been a much requested feature that we are excited to release.  This allows organizations to manage user authentication seamlessly, leveraging their existing LDAP infrastructure. With this feature, you can ensure that access controls are robust and aligned with your company's security policies.

## Compare Snapshots Visually to see differences [#3624](https://github.com/FlowFuse/flowfuse/issues/3624)

Keeping track of changes and updates has never been easier. With our new visual comparison tool, you can now compare snapshots and see the differences at a glance. This feature provides a clear, graphical representation of changes, making it simple to identify modifications and understand their impact.

## Preview Blueprints before Deployment [#3838](https://github.com/FlowFuse/flowfuse/issues/3838)

Similarly to the feature to be able to compare snapshots we have enabled this same feature to allow users to preview team flows and blueprints prior to deploying.  This expedites the process when you are attempting to find the correct flow for your application.  We find that our users will be able to expedite the exploration of both their own team library and the blueprints.

## Import and Export support for snapshots [#3628](https://github.com/FlowFuse/flowfuse/issues/3628)

Managing your Node-RED artifacts just got simpler with our new import and export support for snapshots. With just a few clicks, you can easily transfer configurations between deployments or back up your current setup. This feature is perfect for those who need to replicate environments within their own enterprise with multiple deployments or ensure their configurations are safely stored.

## Deploy Dashboard and APIs running on Flowfuse via your own Domain Names [#324](https://github.com/FlowFuse/flowfuse/issues/324)

Branding and accessibility are crucial, and with FlowFuse 2.5, you can now deploy dashboards and APIs on your own domain names. This enhancement allows you to present a consistent brand experience and makes it easier for users to access your services. Whether you're deploying internally or externally, this feature provides the flexibility you need.

## Full list of release features and bug fixes

You can view everything included in 2.5 on the [Github Release page](https://github.com/FlowFuse/flowfuse/releases/tag/v2.5.0).

We also regularly release updates to [FlowFuse Cloud]({{ site.appURL }}) in between our monthly releases. You can follow the updates as they are made via our [ChangeLog](/changelog).

## What's next?

We're always working to enhance your experience with FlowFuse. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page](/changelog/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/FlowFuse/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowFuse. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose). 

Together, we can make FlowFuse better with each release!

## Try it out

We're confident you can have self managed FlowFuse running locally in under 30 minutes.
You can install FlowFuse yourself via a variety of install options. You can find out more details [here](/docs/install/introduction/).

If you'd rather use our hosted offering: [Get started for free]({% include "main-cta-url.njk" %}) on FlowFuse Cloud.

## Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 2.5.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there. Additionally you can go to the [community forum](https://discourse.nodered.org/c/vendors/flowfuse/24) if you have
any feedback or feature requests.
