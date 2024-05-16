---
navTitle: FlowFuse Dedicated
---

# FlowFuse Dedicated

FlowFuse Dedicated is our product offering where we will host a dedicated instance
of the platform for a customer.

This is a guide for the setup and delivery of a dedicated instance.

### Pre-deployment

In order to create the dedicated instance, some information will be required from the customer.

 - **A domain name to host the platform on**. The core platform (`forge.`), broker (`mqtt.`) and
   hosted instances will be made available under this domain.
   The customer will need to setup the DNS entry for this domain to point at the AWS Route53
   end-point.
 - **Choice of AWS region**. We default to `eu-west-1` but customers may want to choose one more
   local to them. Not all AWS regions are equal and we may need to review their choice for suitability.
 - **Capacity planning**. Whilst the platform will scale to meet demand, we want to sure we provision
   it at a suitable level for their intended usage. Understanding their planned usage and growth rate
   will help us pick the right node size for the cluster.
 - **Team/Instance types**. We will default to creating equivalent Team and Instance types as
   we use on FFCloud. If a customer has specific needs in this area, this should be identified prior
   to deployment.
 - **SSO Configuration**. As with FFCloud, if the customer plans to integrate with their SSO provider,
   we will need to capture the necessary information. This can be done after the initial deployment.


### Deployment

An issue should be raised in the CloudProject repository using the Dedicated Checklist template
and assigned to the member of the engineering/ops team who will do the setup.

This checklist covers the follow items:

1. Create a new AWS sub-account for each dedicated env.
2. Create user accounts for the ops team
2. Use Terraform to setup initial cluster
3. Setup grafana monitoring - including all the necessary alerting
4. Setup initial admin account - store details in 1Password
5. Setup initial Stacks, Instance Types and Team Types
6. Setup SSO for customer
7. Create initial account for customer admin user (if we’re giving them admin access)

### Migration

For existing customers of FFCloud who are choosing to move to a FFDedicated environment,
we need to consider how to migrate their existing account. This will need to be considered
on a case-by-case basis in discussion with the customer as there are a number of challenges
around providing a seamless migration.

For example, we cannot migrate access tokens between platforms. This will require devices
to be reprovisioned with new credentials as well as have their `device.yml` updated to point
to the new platform URL.

### Maintenance

We will agree a maintenance policy with the customer to fit their needs. We will require
the code to be kept up to date - the question is how we schedule updates.

#### FlowFuse Code Updates

We can either do CI/CD as we do for FF Cloud, or apply updates following each monthly release.

#### k8s Updates

We will coordinate maintenance windows with the customer for when we need to apply
updates to the underlying k8s infrastructure as this will require restarts of their
Node-RED instances.

