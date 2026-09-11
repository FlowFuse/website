---
title: Bringing High Availability to Node-RED
subtitle: How we are tackling the hard problems of HA in FlowFuse
description: Explore how FlowFuse tackles HA challenges, statefulness, and work routing, revolutionizing Node-RED's reliability.
date: 2023-06-02 12:00:00
authors: ["nick-oleary"]
image: /images/blog/tile-ha-nr.jpg
tags:
    - posts
    - node-red
    - high availablity 
---

Many companies look to deploy Node-RED into use cases that require the application
to have a high degree of availability, reliability, and scalability. Following up
our [previous post on the subject](/blog/2023/02/highly-available-node-red/), in this
post I’m going to look at some of the technical details of achieving HA, the
approaches available and what that means for the work we’re doing at FlowFuse
and upstream in Node-RED.

<!--more-->

Everyone we speak to has a different set of requirements for this topic. To help
with the discussion, I’m going to look at two ways of approaching it:

 - The **hot-spare approach** where you have a second instance of the application
   ready to take over when the primary fails. This achieves availability but
   doesn’t contribute to scalability.
 - The **load-balanced approach** where you have a second active instance of the
   application and work is shared between them. If either fails, the other
   continues running. A side-effect of this approach is a higher potential
   through-put and scalability; although in practice you need to ensure capacity
   to tolerate an instance failing.

To consider which approach is most appropriate in the context of Node-RED, we
need to look at the benefits and complications of each approach. It comes down
to two factors; statefulness and how work is routed.

### Statefulness

There are two types of state to consider when thinking about a Node-RED flow:
**explicit** and **implicit** state.

Explicit state is what is programmed into the flow. For example, a flow may store
state in Context or use an external database service. Within FlowFuse we provide
two types of context - the default in-memory context store and a database-backed 
persistent store. Currently the database-backed store includes a memory-caching
layer to provide better performance and interoperability. That gets tricky when
you want to have multiple instances sharing the same store. The context API
doesn’t provide a way to atomically update values - so you can get into classic
concurrency issues around two applications trying to update the same value.

The other type of state is that which is implicitly maintained in a flow - even
if the user hasn’t explicitly configured it. For example, the Smooth node can be
used to calculate a running average value of messages passing through it. The
node does that by keeping in memory the recent values so it can recalculate the 
average with each update. If you have multiple instances, then the node will be
calculating the average for just the message its instances sees.

Another example of implicit state is the Batch node that can be used to group
messages into batches. Again - it will only be able to do that for the selection
of messages the instance receives.

It very much depends on the requirements of a flow and what nodes it uses, as to
how the state can be handled.

In the hot-spare approach, as only one instance is active at any time, a lot of
the explicit state handling will work as expected. However the implicit state
remains bound to the individual Node-RED instances.

In the load-balanced approach, care has to be taken to ensure any state generated
by the flow is done in a way that copes with multiple instances accessing it at
the same time.

A key take-away from this being that a flow has to be created with HA and/or scaling
in mind.

### Routing work

Node-RED makes it easy to integrate with lots of different sources of events.
A couple of the most common being HTTP and MQTT. When considering how to handle
multiple instances of an application we need to think about how work is routed
to those instances.

HTTP is the most well understood; you put a load-balancing proxy in front of the
Node-RED instances and it takes care of sharing out the incoming requests. In
the hot-spare scenario, the proxy needs to know which instance is active - that
requires some coordination within the platform to track that properly.

MQTT is commonly used with Node-RED, but unlike HTTP which is in-bound, MQTT
works by having Node-RED create an out-bound connection to a broker and then
subscribing to the topics of interest. In the early days of MQTT that would mean
each instance would subscribe to the same set of topics and receive every message.
That doesn’t really fit any HA model.

With the publication of MQTTv5, the concept of Shared Subscriptions was added;
the ability for a group of clients to connect, subscribe to the same topic and
have the broker distribute messages between them. At this point you do get load
balancing across your Node-RED instances - as long as the MQTT nodes are suitably
configured.

There are lots of other nodes that can be used to trigger flows, whether by
listening for events on an API, connecting to locally attached hardware and many
things in between. Typically, those that are more cloud-aligned, such as messaging
systems like Kafka and AMQP will have very well established ways of doing load
balancing.

Managing out-bound connections gets more complicated in the hot-spare scenario.

If we only had to deal with in-bound connections, the hot-spare instance can just
sit there waiting for work to be passed its way. But once you have out-bound
connections, then you have a problem. The hot-spare instance should only create
its out-bound connections when it becomes the active instance. In real terms,
that means the Node-RED flows should only be started when the instance becomes
active.

With our goal to minimize the Mean Time To Recovery (MTTR), we need to find a
way to get that spare instance running as quickly as possible; if it takes just
as long to start the spare instance as it does to restart the failed primary
instance, then it isn’t much of an improvement.

The key here is that Node-RED allows you to start the runtime without the flows
running. That gets everything loaded and the runtime ready ahead of time. It can
then start the flows at a moment's notice with a simple call to the runtime admin
API.


### Detecting failure

A key requirement of the hot-spare approach to HA is knowing when to failover to
the spare.

This requires close monitoring of the active instance to know whether it's still
working. How quickly you can detect failure is key to reducing the time to recovery.
This is where you have to think about the different ways an instance could fail -
has it crashed, has it hung, has it got ‘stuck’?

Detecting failure usually involves some combination of heartbeat ‘pings’ between
the instances to check each is able to respond to requests. The spare instance
then needs to be able to decide for itself whether it should become the active
instance - and do so safely. You do not want to accidentally have two instances
active at the same time. This can get quite complicated to achieve safely, but
there are a number of approaches that can be used. We’ll be exploring them as we
continue our journey towards HA.

### Editing Flows

Within the Node-RED architecture, each instance also serves up its own editor.
This is what you get when you point your web browser at it.

In a HA world, once you have multiple instances running behind an HTTP load
balancer, there is a tricky question of how you edit the flows. If each request
hits a different instance, just loading the editor will result in different bits
coming from different instances. That can typically be solved at the load balancer
level by creating sticky-sessions; ensuring for a given client, each request is
routed to a consistent instance. That solves part of the issue, but the next
challenge is what to do when the Deploy button is pressed. That is how new flows
are passed from the editor to the runtime. When you have multiple instances, we
need to make sure that they all get updated. That is quite a tricky problem to
solve with the current Node-RED APIs - and something we’ll be working on both in
FlowFuse and in the upstream Node-RED project to resolve.

That said, a more immediate solution could well be to take advantage of separate 
development/production instances. You develop in a single instance and, when happy
with what you’ve got, roll it out to your HA-ready production instance. This
bypasses the need to edit the flows in the HA environment at all.

Whichever method is used, there is a question of how you minimize downtime whilst
deploying an update. In a purely in-bound environment, solutions can be built
where the new application is deployed alongside the old version and, when everything
is ready, the in-bound events are redirected to the new version. But that isn’t
feasible when you have out-bound connections to deal with as well. For some users,
having a scheduled maintenance window for doing updates will be completely acceptable.

As with the hot-spare approach to failover, a similar method could be used that
starts new instances of Node-RED alongside the old, but with the flows all stopped.
Then, once everything is ready, the old instances are stopped and the new instances
started - minimizing the downtime, although not completely removing it.

### Continuing the HA journey at FlowFuse

So the question is how are we going to apply all of this to what we’re building
at FlowFuse. We cannot do everything at once, so we have to prioritize which
scenarios we’re going to address first. Consequently, drawing from customer
feedback, we have chosen to start with the scaling side of high availability - 
allowing multiple copies of an instance to be run with appropriate load
balancing put in front of it.

We are building FlowFuse as an open platform with the ability to run on top of
Docker Compose and Kubernetes. As we get into some of these HA features, we will
need to look carefully at where we can lean on these underlying technologies -
we don’t want to reinvent the wheel here.

Our initial focus is going to be when running in a Kubernetes environment - just
as we do with our hosted FlowFuse Cloud platform. Kubernetes provides lots of
the building blocks for creating a scalable and highly available solution, but
it certainly doesn’t do all of the work for you.

We've identified our initial set of tasks and changes to how we'll run Node-RED
instance with the k8s environment. You can follow our progress with this
[issue](https://github.com/FlowFuse/flowfuse/issues/2156) on our backlog.

I hope this post has given some useful insight into the problems we’re looking
to solve at FlowFuse. As it's such an important requirement for many users we’ll
keep you updated as we make progress.




