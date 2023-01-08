---
navTitle: Staging Enviornment
---
## Staging Environment

We have a staging environment running on AWS which is a scaled down replica of
our managed FlowForge offering, with a separate domain. Staging URL and sign in
details can be found in the Developer Vault in 1Password.

### AWS Account

It uses a separate AWS account ending in ..9937

Ben or ZJ can provision a user account for this account.

The services are running in EU-West-1.

### Nodes

The staging environment uses one node running on a t2.small for the management
app and a pair of t2.small nodes for the projects cluster. t2.small is the
smallest instance that can be used with EKS.

### Email

Amazon SES is setup on staging however it is still running in sandbox mode which means only verified address & domains can RECEIVE emails from it, this is currently limited to flowforge.com email addresses.

There is no intention to move this from sandbox as this helps to limit access to staging.

If you need to use another email address with staging then you should verify the address through SES in the AWS Console.

### Deployment

Currently there is no auto deployment to staging, this should be rectified in the future so that staging is running the code in the main branches  of the respective repos.

### Using staging

When setting up a team you'll need to enter billing details. For credit card
details, use [the Stripe mock data](https://stripe.com/docs/testing#testing-interactively).

### Using the FlowForge Device Agent with staging

Staging uses pre-release npm packages stored in a GitHub npm repository. To be able to use these packages you will need to authenticate with the repository.

You will need to create a GH Personal token

1. Go to your [classic personal access tokens](https://github.com/settings/tokens)
1. Click Generate New Token (and again pick the classic option)
1. You will probably be prompted for 2FA now
1. Give the token a meaningful name
1. Pick an expiration. I went with no expiration so I don't have to do this again and I'm going to limit the scope
1. Tick the box next to `read:packages`
1. Click generate token button at bottom of page

Store the token in your private 1Password vault

Create the following .npmrc file:

```
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
@flowforge:registry=https://npm.pkg.github.com/
```

where `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` is the token you just generated.

You need to place this in the project directory, e.g. `/opt/flowforge-device/project` or if you are running it in the dev env `flowforge-device-agent/var/project` (assume starting with `node index -d ./var -c ./var/device.yml`)
