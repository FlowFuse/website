---
navTitle: Staging Environment
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

Amazon SES is setup on staging however it is still running in sandbox mode which means only verified address & domains can RECEIVE emails from it, this is currently limited to flowfuse.com email addresses and a small set of pre-approved disposable emails.

If you need to use another email address with staging then you should raise an issue 
in [CloudProject](https://github.com/FlowFuse/CloudProject) and assign to the CTO for review.

If approved, the email will need to be added to the SES configuration in the AWS console.

### Test Email accounts

We have enabled a small list of mailinator.com based email addresses for the purposes
of short-lived testing of sign-up and user management.

The inboxes for these email addresses are publicly accessible if known, so the list
is available on [this private issue](https://github.com/FlowFuse/CloudProject/issues/135).

### Accessing Staging

To access the staging environment, log in with your @flowfuse.com account through Google SSO. The url for the staging environment is https://forge.flowfuse.dev.

## Using staging

When setting up a team you'll need to enter billing details. For credit card
details, use [the Stripe mock data](https://stripe.com/docs/testing#testing-interactively).

As the staging cluster is purposefully smaller than production, please be mindful of deleting
resources after use.
