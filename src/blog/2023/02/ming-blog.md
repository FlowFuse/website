---
title: MING Stack for IoT
subtitle: A technology stack for IoT
description: MING technology stack includes key componets in all IoT solutions M - Mosquitto/MQTT, I-InfluxDB, N-Node-RED, G-Granfana
date: 2023-02-23
lastUpdated: 2025-07-23
authors: ["ian-skerrett"]
image: /blog/2023/02/images/tile-ming.jpg
tags:
    - posts 
    - node-red
    - community
---

The folks at Balena have created a bundle they call the [MING stack](https://hub.balena.io/organizations/marc6/apps/MING), (Mosquitto/MQTT, InfluxDB, Node-RED and Grafana) which first appeared back in [2019](https://forums.balena.io/t/ming-an-iot-sensor-stack-mosquitto-influxdb-nodered-grafana/36540). It is an interesting way to look at the IoT tech stack and a pattern I have seen used many times. 

<!--more-->

In the early days of the web, the [LAMP stack](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) was popularized as being the open source tech stack for hosting web sites. First used in 1998, LAMP stood for Linux, Apache, MySQL and Python/Perl/PHP. The LAMP stack did a lot to popularize open source software and create architecture patterns for building web applications. The LAMP stack did a lot to simplify a confusing technology landscape back in the early days of the web.

Can the IoT industry benefit from a MING stack? There is a fair amount of complexity building IoT systems. Therefore, having defined architecture patterns might help reduce some of the confusion. In fact, MING does bring together the key open source components of an IoT system:

* [Mosquitto](https://mosquitto.org/) is the popular open source MQTT broker. MQTT has become the default protocol for IoT communications. The MQTT pub/sub protocol solves a lot for the communication challenges for IoT applications. In fact, I would define the M as being MQTT since there are a lot of MQTT broker implementations available.
* [InfluxDB](https://www.influxdata.com/) is the popular open source time series database. Many IoT use cases are based on analyzing trends from different IoT devices. The classic examples is preventive maintenance of factory equipment. Having a time series database in your IoT architecture to record trending information will solve a lot of your data problems.
* [Node-RED](/node-red/) is the popular low-code development environment that helps create flows of data. IoT systems are often pulling data from many different sources. The data needs to be filtered, analysed or transformed before being forward to another service. Node-RED has a large community of data nodes that makes it easy to collect data from a wide variety of sources. For instance in the industrial world, Node-RED nodes are available for OPC-UA, Modbus, S7, MQTT, various PLC platforms like Opto22, etc, etc.
* Finally [Grafana](https://grafana.com/) is a popular open source visualization platform. Real time monitoring of IoT data is often the first applications deployed for IoT systems. Having graphing and dashboard technology available in your architecture makes perfect sense. 

Another important feature of MING is that it can be deployed on the edge or in the cloud. IoT systems are inheritenty distributed so having the same technology available at different tiers is useful for lower barriers to adoption.

The LAMP stack was successful because it was:
* Open source and freely available for anyone to adopt and use.
* Highly flexible and customizable that allowed developers to adopt the stack to their use case.
* Back by large developer communities creating plugins/extensions, documentation, tutorials, etc.
* Easy to learn for developers with limited experience.

The MING stack has all the same characteristics. All four technologies are open source, highly flexible, back by large developer communities and relatively easy to learn. There are a lot of similarities between MING and LAMP.

Is MING relevant for IoT use cases? In my experience, people building IoT solutions are using 3-4 of the MING components. What is your experience?

## Simplify IoT Complexity with FlowFuse’s MIND Stack

If you’re concerned about managing multiple components in your IoT stack, FlowFuse has you covered. By bundling three of the four core elements of the MING stack—MQTT, Node-RED, and Grafana. FlowFuse simplifies your setup and management. This streamlined approach means fewer moving parts and less complexity, allowing you to focus on what matters most: your data and your applications.

With the FlowFuse [MIND stack](/blog/2024/05/node-red-mind-stack-with-flowfuse/), you get a unified platform that integrates MQTT for efficient communication, Node-RED for seamless integration and data transformation, and [Dashboard 2.0](/platform/dashboard/) for powerful visualizations—all from one place. This integration reduces configuration and maintenance overhead while ensuring consistent performance and security across your deployments. Explore the MIND stack now.

**Want an easier, more secure, and scalable IoT stack? Start your [free trial]({% include "sign-up-url.njk" %}) of FlowFuse today.**