---
navTitle: Principles
---

## Product Principles

Embedded within our strategy are the principles that guide our decision-making and product evolution, representing our commitment to providing a user-centered platform that seamlessly merges the virtues of open-source development with enterprise-grade functionality.

### Convention over configuration

We want the default configuration of FlowFuse to be the best user experience for
the majority of users. 

Every new option we add to the platform, whether for an administrator or end-user,
represents another choice they have to deal with. This increases the cognitive burden
of using the platform and can have a negative impact on user experience. It also
increases the engineering cost to develop and test features where there are many
possible combinations to consider.

For every feature we add that has some scope for configuration, our starting point
in the design is to **identify the right configuration and hard-code it in**.

This removes the choice from users' hands and minds. It does not prevent us from
choosing to make it more configurable in the future if user-feedback/business-needs
requires it.

Where there is a strong case to expose an option to the end user, it should still
be provided with a sensible default value where possible that removes the need
for the user to set it themselves. This gives users the ability to customise
the option if/when they are ready to. But the default value should be the right
answer for most users.

Some configuration options cannot be defaulted - the user has to do make a choice.
For example, setting up email on the platform. The UX around these options must
be carefully considered to help the user get to the right choice with a minimum
of effort.

Node-RED provides a lot of configuration options. We should not assume they are all
candidates to be exposed to FlowFuse users. For example, options to customise the
editor appearance should be reserved options that we determine the right values for
to ensure a consistent user experience across FlowFuse instances.

Options that have an impact on the behaviour of flows will need to be considered
on a case-by-case basis. But the starting point should always be to pick the right
default and only expose to the user if absolutely necessary.

See also: [Convention over Configuration on Wikipedia](https://en.wikipedia.org/wiki/Convention_over_configuration).

### Low level of shame 

GitLab Head of Remote Darren M.

> In many organizations, you take a risk when you put forth any work that’s not perfect — where you haven’t spent endless cycles planning for contingencies or counterpoints. Because of this, you’re incentivized to invest a lot of time and effort into preparing for ‘What if?’ scenarios before any work is presented.

The downside to that is clear. If you do eventually put forth the work, but it needed to be course corrected a long time ago, you’ve now squandered a lot of time that you could have spent improving it via iteration.

Having a low level of shame requires you to combat a natural inclination to conceal work until it’s perfect, and instead celebrate the small changes.

See also: [Low level of shame - GitLab handbook](https://handbook.gitlab.com/handbook/values/#low-level-of-shame)

### Open Source & Enterprise

We offer a number of ways that users can run the FlowFuse product, we will
always offer an open source version that has the core features. Features that
offer higher business value or permit users to share across larger groups will
be offered as part of our paid propositions. FlowFuse Cloud is public and will
generally include all open-source features that are available but may not offer
certain features such as SSO where integration is required between the platform
and an enterprise. We offer customers the ability to have a dedicated managed
instance if that is a deployment model they require.
A more detailed breakdown of the pricing and split between our Open Source and
Enterprise Editions is on the [pricing principles](pricing.md) page.
