---
navTitle: Plan
---
# Product Plan

## Background

Our [Product Strategy](./strategy.md) sets out 4 pillars that our product work is focussed around.

## Planning

We use three project boards to plan and track our work.

 - [Roadmap Board](https://github.com/orgs/flowforge/projects/5)
 - [Product Board](https://github.com/orgs/flowforge/projects/3/views/1)
 - [Development Board](https://github.com/orgs/flowforge/projects/1/views/1)

The detailed planning process can be found [here](../development/releases/planning.md)

## Principles

#### Convention over configuration

We want the default configuration of FlowForge to be the best user experience for
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
candidates to be exposed to FlowForge users. For example, options to customise the
editor appearance should be reserved options that we determine the right values for
to ensure a consistent user experience across FlowForge instances.

Options that have an impact on the behaviour of flows will need to be considered
on a case-by-case basis. But the starting point should always be to pick the right
default and only expose to the user if absolutely necessary.


See also: [Convention over Configuration on Wikipedia](https://en.wikipedia.org/wiki/Convention_over_configuration).

## Open Source & Enterprise

We offer a number of ways that users can run the FlowForge product, we will
always offer an open source version that has the core features. Features that
offer higher business value or permit users to share across larger groups will
be offered as part of our paid enterprise proposition. Our managed FlowForge
offering is public and will generally include all features that are available
but may not offer certain features such as SSO where integration is required
between the platform and an enterprise. We will offer customers the ability to
have a dedicated managed instance if thats is a deployment model they require.
A more detailed breakdown of the pricing and split between our Open Source and
Enterprise Editions is on the [pricing principles](pricing.md) page.
