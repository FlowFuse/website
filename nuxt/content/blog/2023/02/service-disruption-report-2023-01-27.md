---
title: Service Disruption Report for January 27th, 2023
date: 2023-02-10
authors: ["nick-oleary"]
tags:
    - posts 
    - flowfuse
    - news
---

On January 27th, 2023, we were alerted to an issue on FlowFuse Cloud where a user
was not able to access a newly created Node-RED Project, receiving a 404 error
instead. This post examines the issue that was hit, the timeline of events and
what we've done to resolve it.

<!--more-->

## Summary

We hit a limit in the AWS Load Balancer that capped how many projects could be
exposed to the internet within our FlowFuse Cloud deployment. The result of this
was that users could create a new Node-RED project, but they would not be able
to access the editor.

We freed up capacity on the platform to allow user projects to be created without
hitting the limit, whilst also asking AWS to increase the limit in question which
they duly did.

However, we later discovered a second limit that was also being applied. That limit
was not one AWS permits us to change.

We successfully completely deployment of a change to our platform architecture
today that removes these limits from our environment.

In total, this lead to approximately 2 hours of disruptions on January 27th 2023 and again
on February 8th 2023 during which newly created Node-RED projects were not accessible.

Our logs show that two users were impacted during these times.

## Technical Details

When running FlowFuse within a Kubernetes environment, each project creates a
new Ingress Object configuration to tell the platform how to route HTTP traffic
to that project.

Our FlowFuse Cloud deployment runs within Amazon Elastic Kubernetes Service (EKS)
and uses the Application Load Balancer (ALB) service as its ingress controller.

When the FlowFuse platform creates the new Ingress Object configuration, EKS passes
that to ALB to generate the necessary configuration, which, given the configuration we
were using, created both a Target Group and Rule object.

With a default of limit of 100 Target Groups and Rules, that meant we had a technical
limit of 100 Node-RED projects within the FlowFuse Cloud environment. Increasing
the Rule limit did not solve the problem as the Target Group limit still applied.

Our initial mitigation was to delete any Node-RED projects we had created for
our own internal testing. We also identified that we could safely delete any rules
for suspended projects. A suspended project is one that is not actively running
in the platform. The code that resumes a suspended project would recreate any ingress
objects needed - so deleting the rule whilst suspended would not have any impact
on the project.

This gave us a small amount of headroom on the platform which crucially meant we
had time to develop a longer term solution.

## Resolution

There were two possible routes we could take to resolve this issue:

 - Investigate how to reuse existing Target Groups rather than create one for each project

   Our intial research was inconclusive on how to achieve this. The AWS docs weren't
   clear enough to give us a definitive answer we felt comfortable to invest our time
   in.

 - Move away from ALB in favour of nginx to provide our ingress load balancing.

   This was always our long term strategy as it was a prerequisite to FlowFuse
   features we have in the roadmap such as providing custom domains to projects.
   However it was potentially a large piece of work with a complicated migration
   for the existing environment.

Given it fitted with our longer-term strategic goals, we decided to move ahead
with replacing ALB with nginx.

After some initial development work and experimentation, we felt comfortable that
the migration was not as complicated as initially feared. We would have to manually
copy the existing ALB rules over - something that could be scripted. Once we had
nginx deployed we could push a small code change to FlowFuse to use it rather than
ALB, and also switch over the DNS entry to point at nginx.

Following a successful run through in our testing/staging environment, we decided
to move ahead updating the production environment.

This change was applied today, whilst we closely monitored the system to ensure
no further disruption occurred. We have validated that new projects can be
created without issue and everything is working as it should.

## Next Steps

With FlowFuse Cloud updated to use the new load balancer, we'll be closely monitoring
it over the next few days to ensure it operates normally.

We will also be taking on some follow-up activities to minimise the risk of this
type of issue happening again:

1. Review all AWS limits within our architecture. Identify any that pose a potential
   issue in the future. Ensure they are documented and a plan put in place to mitigate
   the impact based on our expected platform growth.
2. Add additional external monitoring for project liveness.
3. Review all logging around k8s apis

## Timeline

*All times are GMT.*

**2023-01-27 22:15** : (Friday evening) Customer reports via our support channel a newly created project was not accessible and returning a 404 error.

**2023-01-27 22:22** : We start examining the platform logs

**2023-01-27 22:47** : We identify we've hit the default Rules limit on the AWS Application Load Balancer

**2023-01-27 23:15** : To free-up capacity on the platform we delete any ununsed internal projects we were using for general testing. We also identify we can safely delete any rules associated with suspended projects.

**2023-01-27 23:41** : We complete deleting rules to give us enough head-room to see us through the weekend.

**2023-01-30 10:00** : We submit a request to AWS to increase the rule limit to 200 which is accepted and actioned later that day.

...

**2023-02-08 14:05** : Another customer reports seeing a newly created project returning a 404 error. We examine the ALB configuration and whilst it reports the new limit has been changed to 200, it appears to still be limiting at 100. We start identifing more suspended projects we can delete the rules for to free up capacity.

**2023-02-08 14:20** : Sufficient capacity is freed to enable the customer's projects to be accessible.

**2023-02-08 15:00** : We identify we've hit the ALB Target Group limit. This is a hard limit that AWS does not allow you to change. We begin researching options.

**2023-02-09** : Commited to plan to replace ALB with nginx. Successful migration of our staging environment.

**2023-02-10** : Change applied to production, FlowFuse 1.3.3 deployed and DNS updated to use the new load balancer.
