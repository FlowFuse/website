---
title: "Staging Environment"
---

# Staging Environment

We have a staging environment running on AWS which is a scaled down replica of
our managed FlowFuse offering, with a separate domain. Staging URL and sign in
details can be found in the Developer Vault in 1Password.

## Deployment

Any change to core product repositories triggers a series of GitHub Actions that results
in staging being updated with the latest code. This can take up to 30 minutes to complete.

The deploy action can be monitored [here](https://github.com/FlowFuse/helm/actions/workflows/flowforge-container.yml).

## AWS Account

Access to the AWS account is restricted and not generally available. If you believe
you have a need to access the AWS account, raise an [Access/Permission Request issue](https://github.com/FlowFuse/admin/issues/new/choose)
and assign to the CTO for review.

## Email

Amazon SES is setup on staging however it is still running in sandbox mode which means only verified address & domains can RECEIVE emails from it, this is currently limited to `flowfuse.com` and `flowfuse.dev` email addresses.

If you need to use another email address with staging then you should raise an issue 
in [CloudProject](https://github.com/FlowFuse/CloudProject) and assign to the CTO for review.

If approved, the email will need to be added to the SES configuration in the AWS console.

### Test Email accounts

As the `flowfuse.com` email domain is configured to use SSO, it cannot be used to create test accounts in the Staging environment. Instead, use `<user>@flowfuse.dev`; we have an email forwarder in place so email sent to `foo@flowfuse.dev` will get relayed to `foo@flowfuse.com`. This also works with `foo+test@flowfuse.dev` type addresses. This means you can setup multiple test accounts under your own email. It also means we have visibility on who owns particular test accounts in the staging environment.

### Accessing Staging

To access the staging environment, log in with your @flowfuse.com account through Google SSO. The url for the staging environment is https://forge.flowfuse.dev.

## Using staging

When setting up a team you'll need to enter billing details. For credit card
details, use [the Stripe mock data](https://stripe.com/docs/testing#testing-interactively).

As the staging cluster is purposefully smaller than production, please be mindful of deleting
resources after use.
