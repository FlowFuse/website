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

If you want to create your own Team for work purposes, request your team to be
upgraded using manual billing by filing a [change request issue](/handbook/operations/change/#flowfuse-cloud-change-control).

## Deployment to FlowFuse Cloud

Any pull requests that are merged into `main` will automatically trigger a deployment to the production environment. As such, it is vitally important that PR Reviews are conducted thoroughly, following our guidance [here](../contributing#conducting-code-reviews).

All pull requests can be tested in a full staging environment ahead of being merged. Details on how to do this can be found in our [Contributing](../contributing#test-changes-in-staging) guide.

## Observability

 - [Observability](./observability.md) - how we monitor production

