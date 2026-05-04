---
title: "The Node-RED Revolution: How Low-Code is Democratizing Industrial Automation"
subtitle: "Looking back on where Node-RED came from to understand the impact it has had on industry"
description: "Looking back on where Node-RED came from to understand the impact it has had on industry"
date: 2025-10-09
keywords: 
authors: ["nick-oleary"]
image: /blog/2025/10/images/node-red-revolution.png
tags:
  - flowfuse
  - node-red
---

To understand the impact Node-RED has had on industrial automation, it's useful to understand where it has come from and what has enabled its success.

<!--more-->

Almost 20 years ago, I was helping to develop an MQTT broker. One of the features of the broker was to create message transformations; taking messages from one topic, modifying their structure and republishing on another topic. It was a really useful feature, but it was only ever exposed via a programming API. Customers had to write lots of code to make use of it. It was also difficult to examine what transformations had already been created. I would often find myself getting a piece of paper and writing out the transformations to help spot any unexpected interactions between them. At the time, I dreamed of a way to better visualise what was happening - but that was far out of scope of our requirements at the time.

Fast forward a few years, and I found myself faced with a similar challenge; working on customer projects that often required pulling data from different sources and having to write the same bits of code again and again to get the job done. This time, I was more in a position to do something about it, and after a couple days of coding, I had a simple demo of a tool that could visualise MQTT topics and how messages would get routed between them. Then we added a way to pull data from a Serial port, a way to run custom code against the messages, a way to do HTTP requests - each week, a new customer project would raise a new requirement and this little side project would prove its worth again and again.

This is, of course, the Node-RED origin story. But how has this little side project become the widely adopted success it has - and why is it so valuable to Industrial users? I think there are three parts to this; its low-code visual nature, its Open Source availability and its extensibility.

## Low-Code Visualisation

One of my original motivations for Node-RED was to save time by not having to write the same pieces of boiler-plate code each time I needed to do a particular task. Dragging a node into the workspace takes seconds and replaces minutes - or even hours - of traditional code development time.

This abstraction empowers anyone to start building applications in Node-RED. System engineers understand the problem they are trying to solve. Node-RED gives them the ability to build their solutions without having to think about the lines of code each node represents - they can focus on the task at hand.

## Open Source

The move away from proprietary solutions gives users more control and influence over the tools they use. Open Source Software brings principles of collaboration, transparency, and interoperability. It was a very deliberate choice to make Node-RED Open Source in its early days; we knew the project’s future lay in building an open community around it - with contributors from many backgrounds.

## Extensibility

A natural consequence of the Open Source path the project took was to make it easy to extend what Node-RED could do. Enabling the community to build their own nodes greatly accelerated the adoption of the project - with the Open Source ethos underpinning that work.

Whilst we see Node-RED used in many industries, it finds a natural home in the Industrial automation space. Being able to run anywhere from edge-of-network devices to the cloud gives a lot of flexibility in the types of solutions it can be applied to. At its heart, Node-RED is all about accessing data, wherever it may be and doing something meaningful with that data.
 
We see it being used alongside traditional PLCs, providing an easier point of integration - pulling data from many different systems in one place, providing a dashboard visualization in situ, and making the data available to the wider organization. Having a consistent developer experience for all those tasks makes Node-RED a natural choice.

## Scaling Node-RED within your organization

Through the early life of the project, we focussed on the core of Node-RED being a high-quality, reliable, low-code development tool. Through the community, we knew there were companies beginning to adopt Node-RED at scale, but some of the challenges they were facing were out of scope of what the core project could address.

The flexibility of Node-RED comes at a cost of how you scale and manage your Node-RED infrastructure. All organizations have a responsibility to keep their IT infrastructure secured and well-maintained - and that has to be considered when adopting any technology.

For all of its strengths, the choice of Open Source at the core does pose some questions that should not be overlooked. For example, who can be relied on to fix issues if you don’t have the engineering capacity within your own organization? How do you manage all of those Node-RED instances throughout your organization?

These were the questions that motivated me to start FlowFuse - and is where we elevate Node-RED to be a robust enterprise-ready platform. Just as the early development of Node-RED was driven by our own requirements, FlowFuse has been built based on first-hand experience of what’s needed to scale Node-RED.

A great example is one of our early customers who is a large manufacturer in the US. They began adopting Node-RED in 2018 across their facilities. At the time, they had to build a lot of custom automation to manage it, but the overheads were becoming unmanageable. With their small IT team, they found it hard to properly track the different versions of flows deployed across their sites. They moved over to FlowFuse which has enabled them to continue scaling their operations and now have thousands of Node-RED instances being managed by the platform.

This is a common pattern we see; FlowFuse solves the operational challenges that slow down digital transformation; engineers are able to focus on solving real business problems with confidence.

## Join us at Node-RED Con

Next month we’re sponsoring the Node-RED Con virtual event - a free day of talks from the Node-RED community all about how it’s being used in industry. There are lots of fascinating talks scheduled and I’d urge you to [register to attend](https://events.zoom.us/ev/AqhqiQ8mTK2lnAoOEH8c8TA1a_9MzVhZq_T7d1-kMHlHDt2_Qh_0~AtAGpC_uhX5LxGrRFYeO63TLtQlUXVUdpy3DY5mEZFgC79PyUeKZzgp8njVUDVZdS3SBo8HS1wGVPdosNhe2VVxCpw).



