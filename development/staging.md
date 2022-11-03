# Staging Environment

We have a staging environment running on AWS which is a scaled down replica of
our managed FlowForge offering, with a separate domain. Staging URL and sign in
details can be found in the Developer Vault in 1Password.

## AWS Account

It uses a separate AWS account ending in ..9937

Ben or ZJ can provision a user account for this account.

The services are running in EU-West-1.

## Nodes

The staging environment uses one node running on a t2.small for the management
app and a pair of t2.small nodes for the projects cluster. t2.small is the
smallest instance that can be used with EKS.

## Email

Amazon SES is setup on staging however it is still running in sandbox mode which means only verified address & domains can RECEIVE emails from it, this is currently limited to flowforge.com email addresses.

There is no intention to move this from sandbox as this helps to limit access to staging.

If you need to use another email address with staging then you should verify the address through SES in the AWS Console.

## Deployment

Currently there is no auto deployment to staging, this should be rectified in the future so that staging is running the code in the main branches  of the respective repos.

## Using staging

When setting up a team you'll need to enter billing details. For credit card
details, use [the Stripe mock data](https://stripe.com/docs/testing#testing-interactively).
