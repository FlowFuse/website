---
navTitle: Versioning
---

# Versioning

## Preview Features

As part of our [continuous improvement](../company/values/#🔁-iterative-improvement) process at FlowFuse, we may designate certain functionalities as Preview Features. During this phase, all of our customers are given the unique opportunity to trial and test these features. While we ensure the provision of support services, it's important to understand that standard service-level agreements do not apply to these Preview Features. We highly value [customer feedback](./feedback.md) during this period; it not only contributes to our feature refinement process, but also shapes the future development of our offerings.

There are no extra charges associated with the utilization of Preview Features. Nevertheless, we want to clarify that as these features transition from their preview status to being generally available, they may become subject to changes in pricing in subsequent releases.

Preview Features exemplify our commitment to expedited innovation and iterative development, underpinned by a strong customer-centric approach. Although these features might not always be entirely complete during this phase, user feedback plays a crucial role in our efforts to enhance them, ensuring we consistently deliver high-quality and valuable solutions to meet customer needs.

## Latest Version

The latest version will always be tagged on GitHub [here](https://github.com/FlowFuse/flowfuse/releases/tag/v2.26.1)

## 2.x.y

The 2.0.0 release happened as part of the naming transition from FlowForge to FlowFuse, with the Minor version incrementing every 4 week release 
cycle.

Patch releases are generated if fixes need to be delivered ahead of the next scheduled Minor release. 

- As part of this release the Major version link between the Device Agent and the Flowfuse application is no longer guaranteed. The latest version of the Device Agent should continue to work with previous versions of the Forge app, but new features will require the latest version and feature announcements should include the minimum Forge App and Device Agent versions.


## 1.0

The 1.0 Release of FlowFuse represents a significant milestone, we are making a statement to our customers about the product.

Therefore the following are considerations & requirements in order to be able to stand behind that statement.

- We have the admin features required to manage the platform at an appropriate scale.
- We have the monitoring and alerting features to run a commercial SaaS platform.
- We have a suitable licensing model in place
- The pricing model is sufficiently mature and implemented in the platform as to support our plans for the 1.x timeline. 
- The devices feature is capable of supporting at least one real world use case end to end.
- Both the Forge app and Device Agent are at 1.0 and the interface between them is locked, such that agents running 1.0 can connect to any 1.x forge application.

### Backports

Once 1.0 has been released the 0.x line will become deprecated. In general no fixes will be backported to the 0.x line, critical security updates may be considered on a case by case basis.

After 1.0 each major release will be supported for at least 12 months. Customers may need to update through minor releases in order to receive fixes and new features. After a new major release the latest minor release will receive back ported fixes for the duration of the support period.

