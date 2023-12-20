---
title: "Introduction to the Unified Namespace"
subtitle: "Making data available for Industry 4.0 use-cases"
description: "Making data available for Industry 4.0 use-cases"
authors: ["zeger-jan-van-de-weg"]
date: 2023-12-20
image: "/blog/2023/11/images/raspberry-pi-5-device-agent.png" #todo
tags:
    - posts
    - flowfuse
---

As your organization is generating more data there’s key architectural decisions to be made to ensure the full value can be unlocked and you’re leveraging not just the tip of the iceberg. The Unified Namespace provides a blueprint to allow data to be consumed by many data-consumers.

<!--more-->

To facilitate a many to many connection between data producers and data consumers, there are two changes to be made to your architecture:
1. Data transport through a hub-and-spokes model
1. Set structure of the Data

## Hub and spokes model replaces Point to Point

Traditionally, for example web servers serving web pages, the client requests a
page from a server. This is a point to point connection between those two parties.

![Point to point graphic](./images/uns-point-to-point.png "Point to Point connection")

For the same data to be transmitted to a new data consumer, the consumer needs
to make another request to obtain the data. This works great when you know what
data you need for building your solution, and if you know where to get it.

However, in manufacturing it’s not always possible to know up front who will
need your data. Some machines are built and placed years before another machine
would like to interact with the generated data. There might be many consumers
for the same data set. Lastly; consumers might not know when to fetch new data
points, and thus will try on a cycle or need another mechanism to understand if
new data is available.

This is why a hub and spoke model should be employed. For each data source or
data producer, a connection is made to a central hub; generally called a broker. 

![Hub and spoke graphic](./images/uns-hub.png "Unified Namespace Hub and Spokes communication")

## Structured data

When many producers are connected to many data consumers, but not directly,
the data producer needs to provide insight into what the events can be and will
contain. It cannot, nor should even if it could, tailor the event’s data structure
for a consumer so there’s decoupling on an architecture level. Structured data
makes information, without structure the consumer receives mere bytes.

This means that a schema for each event should be created and maintained. A
schema which both the producer and consumer can read and validate each event
against. As such a common Schema Definition Language (SDL) is chosen to provide
clarity of how the data is structured, how it can be parsed, and in some cases
also what it means for the developer.
