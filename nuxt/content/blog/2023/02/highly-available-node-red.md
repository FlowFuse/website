---
title: Toward Highly Available Node-RED
subtitle: How mission critical use-cases can be supported through FlowFuse soon
description: Often requested features for Node-RED include HA or Highly Available
date: 2023-02-15
authors: ["zeger-jan-van-de-weg"]
image: /blog/2023/02/images/roadmap-unsplash.jpg
tags:
    - posts
    - node-red
    - flowfuse
---

Over the past few months we've held a lot of product discovery sessions and a topic
which keeps coming up is "HA Node-RED". All software will have failures, with
HA (high availability) the intent is to allow the workload to be processed
regardless. There's quite a few considerations which are often not covered
during product discovery calls, I'm going to discuss some of those points in this article.

<!--more-->

When my job title was software engineer I was fortunate to design and
implement a HA system. It's an incredibly challenging and rewarding task for
any software engineer. As a topic, it's studied when obtaining a Computer Science
Bachelors degree, masters and even PhD. When tasked
to make a HA system, it took me a good month to define what our goals
were, and what we were willing to exchange for the properties sought. This
might be extra hardware, engineering hours, as well as organizational challenges.
For now, let's focus on the first two.

Let's start with defining the goal; reduce the impact of a Node-RED instance
being unresponsive for an arbitrary reason. In many use-cases the MTTR (Mean Time To
Recovery) is what's measured. When for example a hardware failure takes down the instance and the time to 
detection is zero, it will likely still take a few hours to recover. Most of
the recovery work is also manual, and knowledge on how to recover is usually 
[tribal knowledge](https://en.wikipedia.org/wiki/Tribal_knowledge). If the right
person is on-site, the right hardware is available, you kept great backups,
and are able to deploy the new hardware right away without support from other
functions you might just achieve an MTTR of 120 minutes!

### 5-10 minute Mean Time to Recovery

What's needed to bring this back to say 10 minutes? First, adopting FlowFuse will
help massively here. FlowFuse can be installed on-premise, or you can use our
managed Cloud offering. The software is the same, provided the on-premise
install uses our [Kubernetes install](/docs/install/kubernetes/) method.

The key of the installation is the fact that the hardware layer is generalized
as a fleet. Detecting failures is included in the install, and very fast. Comparing
that to most alerting systems currently, it's usually a difference between night
and day. Furthermore, to decrease the recovery time significantly 
there's a requirement to make software responsible for the whole procedure. Human intervention is much too slow.

To get the MTTR down to 5 minutes there's a requirement to either make hardware
automatically available to the fleet, or to over-provision (more hardware is
available than is needed at any given moment). When a hardware failure occurs
FlowFuse is configured to ensure all Node-RED instances that are KIA are
replaced. Bringing down the time to recovery to about 5 minutes.
For many use-cases a MTTR of 5 minutes is _good enough_.

### Sub minute MTTR

To go below the minute, or dare I say go below 10 seconds, we'll need to increase
the number of running Node-RED instances. Let's start with a hot-spare. Meaning
there's a running Node-RED instance with the flows exactly the same as another,
ready to pick up the work when the first has some failure. Note this isn't like
a relay race, there's no baton being passed from one Node-RED to the other. While
some data and messages might be lost, it's possible to redirect all workload from
the plagued Node-RED to the hot-spare in a matter of seconds. Hot-spares taking
over are usually only observed by humans a good few minutes after they replace a failed instance.

### Sub second!

Before this post turns into a theoretical exercise we'd really need to understand
which trade-offs are acceptable to you. There's the [CAP Theorem](https://en.wikipedia.org/wiki/CAP_theorem)
which states 3 guarantees are wanted: Consistency, Availability, and Partition Tolerance. You get to pick
only two. In manufacturing the line must never be stopped due to a software failure where possible,
so Availability is the most important. The question is, what comes next? Is it Consistency meaning
all 3 instances have the same view of the global state? Or maybe Partition Tolerance where it's vital for each instance need to be able to predict the intended action even if it can't communicate to the others?

Whichever 2 you choose will dictate engineering choices in the pursuit of a great HA solution.

### The roadmap

With FlowFuse v1.4, released February 2023, a 5 minute mean time to recovery is
achieved for all flows running locally, that is: in the cluster. Going beyond this
milestone requires your input! I'd love to chat about your challenges, please 
[pick a timeslot to discuss your requirements](https://meetings-eu1.hubspot.com/zeger-jan)!
