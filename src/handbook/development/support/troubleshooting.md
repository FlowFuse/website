---
navTitle: Troubleshooting
---

# Troubleshooting

This page is a guide for how to deal with incoming support tickets related to FlowFuse.

## Common Issues

Below are sections for common areas that we see in support tickets. Whilst it is not exhaustive, it should provide a good starting point for troubleshooting, and ensuring we have enough details from the customer in order to help them.

### FlowFuse Platform

#### FlowFuse Cloud

Any outages or major issues on FlowFuse Cloud are tracked, and automatically logged in the [#ops-cloud](https://flowforgeworkspace.slack.com/archives/C03BXLH9HP1) Slack channel. You can then consult the [FlowFuse Cloud Incident Playbook](https://docs.google.com/document/d/1NMPWEFgHkVNN7RqHXUgijEGdNwZH-SlaAspOQr9Vg9k/edit?tab=t.0#heading=h.a7jq4bkz66hv) in order to take the relevant actions in debugging the raised issues.

#### FlowFuse Self-Hosted

Most support tickets we receive here are generally down to configuration options for installing and hosting FlowFuse, and enabling particular features.

For configuration-based support, the best place to start is consulting the [Configuring FlowFuse](/docs/install/configuration/) documentation.

### Hosted Instances

#### Memory Issues

An issue we have seen is where a Hosted Instance is running out of memory. This is normally seen either:

1. When the Instance is first being spun up due to the memory required to install dependencies.
2. A memory leak within the Node-RED instance, whereby memory usage gradually increases over a longer period of time.

The best way to diagnose which of these is the cause, you can check the "Performance" tab of the affected Hosted Instance. More information available [here](https://flowfuse.com/changelog/2025/06/instance-performance-memory/).

#### Restarting in Safe Mode

Any problems caused by the Node-RED flows themselves are best diagnosed by putting the Hosted Instance into safe mode. Please consult the [Node-RED Safe Mode](https://flowfuse.com/docs/debugging/) documentation for more information.

### Remote Instances

In any situation whereby a customer is having an issue with a Remote Instance, you should establish the following details:

- What hardware is the Remote Instance running on?
- What version of [Device Agent](/docs/device-agent/introduction/) is Remote Instance running?
    - Note: You can see this in the Device Overview in _FlowFuse Cloud_ -> _Remote Instances_ -> _Device_ -> _Overview_
- What version of NodeJS is the Remote Instance using?
- Does the Remote Instance have public network access?

#### Connectivity Issues

If we are seeing intermittent connectivity issues, then the most likely cause is:

1. The Remote Instance is running an old Node-RED version, before we introduced the device caching. This will be any Node-RED versions older than `v4.0.0`. You can see a full list [here](https://github.com/FlowFuse/helm/blob/main/flowforge-container/install-device-cache.sh#L3)
2. Physical network issues on the client's end. This is a last resort for "blame", but is an important factor we have to consider. If the Remote Instance is unable to check in with FlowFuse, then remote access will not be effective. 

### Account Management

#### Deleting an Account

If a user wishes to delete their account, you can point them to the relevant section of the documentation [here](https://flowfuse.com/docs/cloud/billing/#cancelling-your-subscription).

You should also, always ask, the reasons for wanting to delete the account. Understanding user churn is very important information to help us improve our product and service.

### FlowFuse Dashboard

When debugging FlowFuse Dashboard issues a very useful tool is the `_debug` view which is served up with every FlowFuse Dashboard. You can read more about it in the [FlowFuse Dashboard documentation](https://dashboard.flowfuse.com/contributing/widgets/debugging).

Any bugs found for FlowFuse Dashboard should be logged as as an issue in the [FlowFuse Dashboard repository](https://github.com/FlowFuse/node-red-dashboard/issues).

### Pricing
#### 2025 Pricing & Tier Changes

In summer of 2025, FlowFuse deprecated the Free tier and changed the pricing structure of the Starter tier. 

The Free tier was built to enable remote device management and provided for two remote instances, [free of charge.](https://flowfuse.com/blog/2024/12/flowfuse-release-2-12/). As we found that users were looking for cloud-hosted Node-RED instances, the Free tier did not meet this expectation, and was deprecated.

To support users seeking cloud-hosted Node-RED, the Starter tier was revised to provide a more powerful hosted instance, with greater CPU and memory than before. In addition, the tier went from offering two hosted instances and two remote instances, to only a single, more powerful hosted instance.

Existing Starter customers were notified of the change via emails on July 28 and August 15 (reminder)

Existing Free users were notified of the change via emails on August 4 and August 19.

To ease the transition of Free users to Starter, and Starter users to the revised pricing structure, [a coupon](https://dashboard.stripe.com/acct_1KJbS4J6VWAujNoL/coupons/n9TR0YgU) was offered. The coupon will give a customer a free month of Starter with one hosted instance (included with Starter) and one remote instance (because they're used to this when migrating from Free).

In addition, users were informed that they could receive an additional free month by choosing Annual billing at checkout.

