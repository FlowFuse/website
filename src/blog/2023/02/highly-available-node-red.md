---
title: "Roadmap item: toward Highly Available Node-RED"
subtitle: How mission critical use-cases can be supported through FlowForge soon
description: Often requested features for Node-RED include HA or Highly Available
date: 2023-02-08
authors: ["zeger-jan-van-de-weg"]
image: roadmap-unsplash.jpg
---

Over the past months we've done a lot of product discovery calls, and a topic
that keeps coming up is "HA Node-RED". All software will have failures, with
HA (high availability) the intent is to allow the workload to be processed
regardless. There's quite a few considerations that are often not discussed
during product discovery calls that I'd like to go over in this article.

<!--more-->

When my job title was software engineer I've been fortunate to design and
implement an HA system. It's an incredibly challenging and rewarding task for
any software engineer, it's a topic studied when obtaining your Computer Science
Bachelors degree, and if you want to even your masters degree and PhD. When tasked
to make a system HA it took me at least a good month to define what our goals
were, and what we're willing to exchange for the properties sought after. This
might be extra hardware, engineering hours, but also organisational challenges.
For now, let's focus on the first two.

Let's start with defining the goal; reduce the impact of a Node-RED instance
being unresponsive for an arbitrary reason. In many use-cases the Mean Time To
Recovery (MTTR) is what's measured. Assuming a Node-RED instance (not FlowForge managed)
now, when for example a hardware failure takes down the instance and the time to
detection is zero, it will likely still take a few hours to recover. Most of
the recovery work is also manual, and knowledge on how to recover is usually 
[tribal knowledge](https://en.wikipedia.org/wiki/Tribal_knowledge). If the right
person is on-site, and the right hardware is available, and you kept great backups,
and are able to deploy the new hardware right away without support from other
functions; still your MTTR is likely 120 minutes!

### 5 minute Mean Time to Recovery

What's needed to bring this back to say 10 minutes? First, adopting FlowForge will
help massively here. FlowForge can be installed on-premise, or you can use our
managed Cloud offering. The software is the same, provided the on-premise
install uses the [Kubernetes install](https://flowforge.com/docs/install/kubernetes/) method.

The key of the installation is the fact that the hardware layer is generalized
as a fleet. Detecting failures is included in the install, and very fast. Comparing
that to most alerting systems currently, it's usually a difference between night
and day. Furthermore, to decrease the recovery time significantly from before
there's a requirement to make software responsible for the whole procedure. Human
need to just watch, they're much too slow.

To get the MTTR down to 5 minutes there's a requirement to either make hardware
automatically available to the fleet, or to over-provision (more hardware is
available than there's an immediate need for). When a hardware failure occurs
FlowForge is configured to ensure all Node-RED instances that are KIA are
replaced. Bringing down the time to recovery to about 5 minutes.
For many use-cases a MTTR of 5 minutes is _good enough_.

### Sub minute MTTR

To go below the minute, or dare I say go below 10 seconds, we'll need to increase
the number of running Node-RED instances. Let's start with a hot-spare. Meaning
there's a running Node-RED instance with the flows exactly the same as another,
ready to pick up the work when the first has some failure. Note this isn't like
a relay race, there's no baton being passed from one Node-RED to another. While
some data and messages might be lost, it's possible to redirect all workload from
the plagued Node-RED to the hot-spare in a matter of seconds. Hot-spares taking
over are usually only observed by humans at least a good few minutes after they
happened.

### Sub second!

Before this posts turn into a theoretical exercise we'd really need to understand
what trade-offs are acceptable for you. There's the [CAP Theorem](https://en.wikipedia.org/wiki/CAP_theorem)
that states 3 guarantees are wanted: Consistency, Availability, and Partition Tolerance. You get to pick
only two. In manufacturing the line must never be stopped due to a software failure where possible,
so Availability is one to pick. Now, do you want to drop Consistency? Meaning
all 3 instances have the same view of global state? Or Partition Tolerance; when
the network becomes unreliable (which it always is!) and partitioned all flows
are moving onwards with the operations?

### The roadmap

With FlowForge v1.4, released February 2023, a 5 minute mean time to recovery is
achieved for all flows running locally, that is: in the cluster. Going beyond this
milestone requires your input! I'd love to chat about your challenges, please 
[pick a timeslot to discuss your requirements](https://meetings-eu1.hubspot.com/zeger-jan)!
