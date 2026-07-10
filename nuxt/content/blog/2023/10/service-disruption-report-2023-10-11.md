---
title: Service Disruption Report for October 11th, 2023
date: 2023-10-18
description: ____________
authors: ["nick-oleary"]
tags:
    - posts 
    - flowfuse
    - news
---

On October 11th, 2023, we had an issue where users were not able to access the
Node-RED editor, recieving a 'Access Denied' error message.
This post examines the issue that was hit, the timeline of events and
what we've done to resolve it.

<!--more-->

## Summary

As part of our company rebranding, we planned a migration for our FlowFuse Cloud
platform from `app.flowforge.com` to `app.flowfuse.com`.

We applied this change in co-ordination with our customers using Single Sign On
as it required an update to their configuration to match.

This was done on Tuesday October 10th and all confirmed working with those customers.

On Wednesday October 11th we received two reports that separate users could not
access their Node-RED editors. We quickly identified the issue was related to
how the Node-RED editors authenticated users against the platform for non-SSO users.

A workaround was identified to ensure users were logged in via the new domain.

We then looked at options to mitigate this for other users. We could not roll
back the domain name migration as it would have required co-ordinated action with
multiple SSO customers - who were not otherwise impacted by this issue.

## Resolution

We tested various approaches of adding automatic redirection from one domain to
the other. Due to the fact all existing Instances and Devices had the old domain
name hardcoded into their settings, we were limited in what we could do here.

We ultimately applied a single redirect for `https://app.flowforge.com` to
`https://app.flowfuse.com` - without any redirecting of paths beneath either domain.

This URL is only accessed by real users when coming to log into the platform. By
redirecting at that point in time, it ensures they are logged into the new domain
and everything works as expected.

For users with active sessions on the old domain, a simple log out and log back in
will get them on to the new domain.


## Next Steps

Having resolved the immediate issue we looked at how this situation came to happen
and why it wasn't caught in our preparation for the migration.

We have a staging environment where we verify any changes before they get applied
to production. We all have SSO enabled in that environment and a small number of
test users without SSO enabled.

Our testing had focused on the SSO users which, by virtue of the SSO process, ensured
they ended up logged into the new domain.

The testing done with non-SSO users was more limited and didn't hit the right combination
of having existing log sessions on one or other of the domains to match the scenario
hit by our customers.

We also identified some items to follow up on around how the existing Instances
and Devices handle HTTP redirects. Currently, the Device Agent is not configured
to follow redirects. That is a change we have [added to the backlog](https://github.com/FlowFuse/device-agent/issues/182).

## Timeline

*All times are BST.*

**Tuesday October 10th**

We updated the platform's primary domain name to `app.flowfuse.com` whilst keeping `app.flowforge.com` active. This was done in co-ordination with our SSO customers who needed to make an update to their SSO configuration at the same time. Both customers reported success following the change.

Our own validation demonstrated we could login via our own SSO, access editors, and devices continued to work as before (in particular, device editor and snapshot gathering).

**Wednesday October 11th**

 - **11:50** and **11:57** - we received two support request from a user getting an 'access denied' error when trying to access an editor.
 - **12:09** - Workaround shared with both customers to login via the new domain first
 - **12:30** - We applied a blanket redirect for `app.flowforge.com` to `app.flowfuse.com`. 
 - **12:50** - We then reduced the scope of the redirect so that devices would not be impacted
 - **13:14** - A secondary issue with logging into the editor when logged in on the new domain was reported internally.
 - **13:44** - Reverted all of the redirect handling whilst reviewing the problems with the previous redirects.
 - **14:20** - We applied a redirect to just the root of the domain and documented for our support channel

 No further reports were received after this time.
