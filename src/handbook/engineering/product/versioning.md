---
navTitle: Versioning
---

# Versioning

## Preview Features

As part of our [continuous improvement](/handbook/values/#🔁-iterative-improvement) process at FlowFuse, we may designate certain functionalities as Preview Features. During this phase, all of our customers are given the unique opportunity to trial and test these features. While we ensure the provision of support services, it's important to understand that standard service-level agreements do not apply to these Preview Features. We highly value [customer feedback](./feedback.md) during this period; it not only contributes to our feature refinement process, but also shapes the future development of our offerings.

There are no extra charges associated with the utilization of Preview Features. Nevertheless, we want to clarify that as these features transition from their preview status to being generally available, they may become subject to changes in pricing in subsequent releases.

Preview Features exemplify our commitment to expedited innovation and iterative development, underpinned by a strong customer-centric approach. Although these features might not always be entirely complete during this phase, user feedback plays a crucial role in our efforts to enhance them, ensuring we consistently deliver high-quality and valuable solutions to meet customer needs.


## Supporting FlowFuse Versions

We utilize Semantic Versioning (SemVer) for all releases. Our version numbers follow the `MAJOR.MINOR.PATCH` format.
A `Major` release signifies significant changes that **may** include breaking changes or incompatible API updates,
while a `Minor` release introduces new features and functionality in a backward-compatible manner.
`Patch` releases are reserved for backward-compatible bug fixes and security improvements.

The latest released version is always considered the current stable version and receives bug fixes and security patches.
Improvements, new features etc, will make it to the next stable release. 
Critical security patches are backported to the current stable release as well as the two previous monthly minor releases.
