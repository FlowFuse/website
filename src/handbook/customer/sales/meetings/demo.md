# Demo

This document explains the process of delivering a sales demo of the features of FlowFuse. It is not intended to cover all features but to give potential customers a good understanding of FlowFuse's value.

## Setup - Before the demo

Before we begin a sales demo we need to set up an environment. Make sure you are
already logged into your flowforge account (@flowfuse.com email) on production, not as an administrator.

Create a new team for this demo, you need to do this before the demo so that
you don’t have to show your credit card details on screen. After creating the
team, apply [this coupon](https://dashboard.stripe.com/coupons/zkNy9DxL) to your
newly created team. On the stripe team page, click "Actions" > "Apply Coupon".

Please also make this team your 'default team' under your user settings.

Create one instance called ‘Central-<demo-customer-name>’, and another instance called "Data-Acquisition-<demo-customer-name>".

Make sure you have an example device ready, [install the latest device agent/docs/device-agent/introduction/). Do not yet install the device within FlowFuse, that's done during the demo using the web ui.

```
cd /tmp
```
```
mkdir demo-<company-name>
```
```
cd demo-<company-name>
```
```
flowforge-device-agent -d . --ui --ui-user foo --ui-pass bar
```

## Live Demo

[Demo Track 1](https://docs.google.com/document/d/1sOaaNq4Cf2GkX4EFeEBgDB0XuL-gm1WJIEefZUpmNtM/edit)
[Demo Track 2](https://docs.google.com/document/d/1CwpOapiOeOnM0FgPs_4SJAIDoQv-TRpOAKNnVRCZUsw/edit)

### Key Terminology

1. [Teams](/docs/user/concepts/#team)
1. [Applications](/docs/user/concepts/#application)
1. [Instances](/docs/user/concepts/#instance)
1. [Devices](/docs/user/concepts/#device)
1. [Snapshots](/docs/user/concepts/#instance-snapshot)

### Features to cover:

1. Remote Device Management
2. Dashboards
3. DevOps Pipeline
4. High Availability
5. Database integration
6. Persistent context & storage
7. Team Management & Library

## Housekeeping

Once the demo is complete ensure you delete all devices, instances, applications and finally the team you created.
