---
navTitle: Production Environment
---

# Production Environment

Our production environment runs in `EU-West-1` in a dedicated AWS account.

Access to the AWS account is restricted and not generally available. If you believe
you have a need to access the AWS account, raise an [Access/Permission Request issue](https://github.com/FlowFuse/admin/issues/new/choose)
and assign to the CTO for review.

## Using production

SSO is enabled for all `@flowfuse.com` employees. Everyone is a member of `FlowForge Team`
where Applications/Instances can be created.

By default, FlowFuse employee accounts do not have Admin level access. A dedicated
admin account exists with details in `1Password` for those with approved admin level
access.

If you want to create your own Team for work purposes, use your Brex card when setting
up the billing details. You can then request a Stripe Coupon to cover the costs
by raising an issue in [CloudProject](https://github.com/FlowFuse/CloudProject)

## Deployment

We deploy the latest product code on a weekly basis. This is done by creating a
new [maintenance release](../releases/process.md#unmanaged-releases), including updates
to the [`helm`](https://github.com/FlowFuse/helm) templates. They are then applied
manually to production by the engineering team.

The automated deployment to staging has been prepared to apply to production with
a manual verification step blocking the final deploy. We have not yet fully enabled
this mode but we are getting closer to doing so.

## Observability

 - [Observability](../observability.md) - how we monitor production

