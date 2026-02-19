---
title:  Selecting a broker for your Unified Namespace
subtitle: The broker is the data backbone for the unified namespace, which one is right for you?
description: Discover how to choose the right broker for your Unified Namespace. Explore MQTT, Kafka, cloud options, and open-source solutions like Mosquitto and EMqX
date: 2024-01-19
authors: ["zeger-jan-van-de-weg"]
image: /blog/2024/01/images/broker-for-uns.png
tags:
    - posts
    - flowfuse
    - unified-namespace
---

When starting to roll out a new data distribution architecture for the unified namespace (UNS), one of the first questions you'll ask is, "What broker should I select for my UNS? The broker must implement a publish-subscribe (pub-sub) pattern, though that leaves plenty of options.

<!--more-->

## Technology selection

### Two protocols frontrunners

Currently, there are two protocols that are front runners for becoming the de facto data transfer choice in (industrial) IoT: [MQTT](/blog/2024/06/how-to-use-mqtt-in-node-red/) or [Kafka](/blog/2024/03/using-kafka-with-node-red/). They’ve been designed for different use cases and have different properties. At this time, MQTT is more often deployed as a broker in the unified namespace and is generally the best choice when starting to implement a unified namespace, it also features better support from hardware vendors.

First and foremost, MQTT has been designed to enable IoT use cases. The main design objectives were to be lightweight to enable low-bandwidth communication, enable low-power devices, and handle unreliable networks. MQTT enables a large number of data producers and consumers to collaborate.

Kafka is designed as an event streaming platform. Its initial adoption was mostly for data brokers between microservices all part of the same web backend for large sites like LinkedIn. When communicating data between servers or just a few data centers around the world, there’s less of a concern around the reliability of the connection or to enable constrained devices to participate in the shift towards a unified namespace.

Generally, MQTT is more often seen deployed in practice as data distribution architecture.


### The Cloud route

Cloud message queue brokers like AWS Kinesis and GCP Pub/Sub offer a high level of convenience. Scaling the infrastructure for real-time data processing and communication is their concern, the customer is mostly concerned about paying the bill. These brokers are fully managed, meaning they are maintained and updated by the cloud provider, reducing the burden on developers.

However, this convenience comes with the tradeoff of vendor lock-in. When selecting these brokers, the cloud vendor has usually adapted their technology to support many protocols, and these offerings are usually jack-of-all-trades solutions – master of none. It creates a situation where the unified namespace implementation will change in subtle ways to accommodate the vendor instead of the other way around. An organization might become so reliant on a particular vendor's products or services that they are unable to easily switch to another vendor or protocol that serves their business objectives better. The cost of changing is exacerbated by having to train personnel on new and open-source protocols.

In addition to vendor lock-in, cloud message queue brokers also introduce reliance on the network to the cloud providers. Network reliability for (industrial) IoT is a major concern due to the physically distributed nature, adding external dependencies creates more variability.


### Exotic options

RabbitMQ is a widely used open-source message broker that’s mostly used as an event message bus for web applications. It can also function as a hub in a unified namespace. The broker primarily supports the [AMQP](/node-red/protocol/amqp/) (Advanced Message Queuing Protocol), considered the industry standard for high-performance messaging systems. It also supports STOMP (Streaming Text Oriented Messaging Protocol) and MQTT (MQ Telemetry Transport), catering to various messaging needs.

NATS, short for Network Agnostic Messaging System, is another open-source message broker that is designed for simplicity and reliability. NATS implements its own protocols, making it harder to be interoperable with hardware and software previously purchased. NATS has requirements on message structure too, which creates another barrier to adoption for IoT use cases.

## How Node-RED Helps

Node-RED provides a powerful and flexible way to integrate with various brokers, supporting protocols such as [MQTT](/blog/2024/06/how-to-use-mqtt-in-node-red/), [Kafka](/blog/2024/03/using-kafka-with-node-red/), and [AMQP](/node-red/protocol/amqp/). It allows you to build and manage workflows that interact with your chosen broker, seamlessly connecting different data sources and systems.

However, using Node-RED alone in production environments requires additional considerations, such as server deployment, instance management, security implementation, and scalability. This is where FlowFuse enhances Node-RED's capabilities by adding production-ready features. FlowFuse simplifies managing and deploying Node-RED applications, providing essential functionalities like scalability, robust security, and efficient collaboration tools.

**[Sign up]({% include "sign-up-url.njk" %}) now for a free trial and experience how FlowFuse can streamline your Node-RED deployments and management.**

## Conclusion

An MQTT broker is currently recommended as a broker solution for your unified namespace. There are many different implementations of the protocol available. At FlowFuse, we’re using [Mosquitto](https://mosquitto.org/), due to its efficiency on resources and flexible authentication layer. Further, our customers are reporting to be happy with [EMqX](https://www.emqx.io/), which is written in Erlang – itself a messaging-oriented programming language – and has been put through its paces in practice. If you’re dipping your toes into the unified namespace, either of those or another MQTT broker is currently recommended.

Note that it’s recommended to allow yourself flexibility in the broker, and treat it as a message-passing system, and your organization will be able to easily swap it out later if any other broker is a better fit later on.