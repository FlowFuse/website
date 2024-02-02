---
title: History of Node-RED
subtitle: How it all started as told by Node-RED creator Nick O'Leary
description: How it all started by Node-RED creator Nick O'Leary
date: 
authors: 
image: 
tags:
    - posts
    - flowfuse
---


<!--more-->

In January 2013, I could have never foreseen that my fun little proof-of-concept project would become Node-RED, an open source low-code environment with millions of deployments in IoT and automation.

Long before IoT became the ubiquitous term it is today, I was working in IBM’s Emerging Technology Group playing around with capturing data from devices and doing interesting things with it. The team focused on very fast-paced, short, proof-of-concept projects and was afforded time to learn new skills, innovate and work on side projects.

My background working in the MQTT protocol space before it was known outside of IBM led me to a side project: I wanted some way to visualize mapping messages on an MQTT infrastructure to see how they come in on one topic and get sent out in another.

Starting with web visualization technology and Node.js runtime, which was relatively new at the time, I spent a day or two putting together a little demo of an application that would connect to an MQTT broker that had an API. Asking what mappings it had, the application drew a visualization in the browser which became a very early version of the topic explorer.

I wanted to make it more interactive. Not having the terms nailed down yet, I simply wanted to drag a blob onto the screen, draw a line, configure it, and then hit a button to apply the transformation. Just 24 hours later, I had a simple browser-based application that could define and apply mappings between MQTT topics. 

It very quickly became useful. 

My colleague Dave Conway Jones took the code to the next step, adapting it to add a serial node to work with the project data he was collecting. Over the next few weeks, as part of the team’s work on proof of concepts for customer engagements, they hard-coded different nodes into the palette and the utility of this new application was clear. 

With the blessing of IBM management to spend more time on the project, I spent a few days redesigning the code to make it easier to write in new nodes, unlocking the ability to quickly add in the function node, change node, and switch node, which became the basic building blocks of the tool.

It became Node-RED when the application was submitted as an idea to map web services visually as part of IBM’s new public cloud offering, and it started gathering more traction within the company. 

To get it into the hands of a wider audience, IBM supported the decision to make Node-RED open source, and it was published on npm and GitHub. Internally, Node-RED had a one-click deployment to IBM Cloud and was used by its developers to demo the IBM services available on the cloud.

I demoed Node-RED in late 2013 at a London IoT meetup and word spread among my peers in that community. A week later, I was at an open source hardware conference and entered a workshop. I was shocked to see Node-RED on everyone’s screens! The facilitator had seen Node-RED and reworked his workshop so that people didn’t have to worry about writing lines of code and were able to do useful things much more quickly.

Word also spread among the companies using IBM Cloud. One voiced concerns that Node-RED might have been an IBM-specific technology and suggested that we consider moving it to an open source foundation. This led to Node-RED becoming one of the founding projects in the relaunch of the Node.js Foundation. Having independent governance allowed companies like Hitachi to contribute to the project and have an equal voice in its development.

For software developers, time spent writing boilerplate code is not time adding value to the application they’re building. With low-code, Node-RED abstracts all that boilerplate so they can focus on the business problem. 

Device manufacturers paid attention when Node-RED was installed on the Raspberry Pi image, with its low-code accessibility attracting a broad range of people from systems engineers building automations to IoT hobbyists.

Now with millions of deployments, Node-RED continues to collect, transform, and integrate data through visualized dashboards. And, as this open source community grows it remains rooted in the two pillars of extensibility and a low-code, with an ever-expanding flow library to empower users to collaborate and build their projects. 

I couldn’t be happier to welcome you to the Node-RED community.
