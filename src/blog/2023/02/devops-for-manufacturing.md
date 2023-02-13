---
title: DevOps for Manufacturing
subtitle: The impact of the DevOps movement will go beyond software development.
description: Changes made by DevOps will influence the future of process and practices in manufacturing too
date: 2023-02-13
authors: ["zeger-jan-van-de-weg"]
---

Over the past 5 years ‘DevOps’ has taken a hold of software development. 
DevOps is an intent and set of practices to bring system operations and 
application development closer together. The DevOps movement has had a profound
impact on software development, and will have the same impact on the industrial world.

<!--more-->

Tools like GitLab championed the integration of
testing, storing and monitoring code changes, which aids in the core idea behind
DevOps; foster collaboration and communication between development and operations.
Change the culture from strict separation of responsibilities to shared responsibility.
The core principles of DevOps are [described by GitLab](https://about.gitlab.com/topics/devops/) as:

1. The automation of the software development life cycle
2. Improve Collaboration and communication between cross functional teams
3. Continuous improvement, and minimize waste
4. Deliver smaller changes faster to benefit from short feedback loops

## DevOps challenges in Manufacturing

While DevOps has been widely adopted in the software industry, it has not yet seen widespread adoption in the manufacturing industry, particularly in the areas of operational technology (OT) and information technology (IT). There are a few reasons why this may be the case:

* Complexity: Manufacturing environments tend to be more complex than traditional software environments, with a greater variety of equipment, systems, and processes that must be coordinated. This complexity can make it difficult to implement DevOps practices and tools.
* Safety and reliability concerns: In manufacturing, there are often strict safety and reliability requirements that must be met. This can make it difficult to introduce the kind of experimentation and rapid iteration that are core to DevOps.
* Organizational silos: Manufacturing companies tend to be more hierarchical and siloed than software companies, which can make it difficult to foster the kind of cross-functional collaboration and communication that are essential to DevOps.
* IT/OT gap: There is often a divide between IT and OT teams in manufacturing companies, with different teams responsible for different parts of the technology stack. This can make it difficult to implement DevOps practices and tools that span across both IT and OT.

There’s actually many parallels between the lean manufacturing movement and DevOps. It’s only a matter of time that lean manufacturing and DevOps are applied in the software stack of the industry too.

## Requirement for DevOps in Manufacturing

Manufacturing has gone through many changes over the past century and have already embraced many principles. While DevOps isn’t going against “Kaizen”, “6 Sigma”, or other cultural manufacturing systems, it does warrant a second look at the culture to incorporate it. For one, both IT and OT should be able to propose changes, test, and deliver them.

A DevOps approach in manufacturing should focus on some key infrastructure changes:

* Consistent collaboration tools that facilitate a software development process that spans between OT and IT teams. Introducing consistent tools, like git or Node-RED, can go a long way to breaking down the silos between OT and IT. 
* Reducing the time to recover from software failure. With a focus on smaller, incremental changes it is important to have tooling that allows for quick update and roll-back of software that is deployed out to many devices, potentially in many remote locations. The ability to quickly roll-back after a software failure will be critical for safety reasons and plant downtime.
* Communication across the organization about the different types of data sources that are available. Digitalization is creating many opportunities for data collection and analysis of operation data. Tools like Node-RED are making it possible to collect data from legacy equipment and protocols. Making these data sources accessible to different teams for analysis and processing will start to break down the barriers between the teams and increase the rate of innovation.
* Enabling open software architectures that provides for optimal flexibility for innovation and incremental improvement. Unfortunately many organizations are stuck with closed proprietary solutions that are difficult to maintain and integrate with other systems. To move towards a devops approach for manufacturing, organizations need to be investing in open architectures that include decoupled software services and published data schemas and apis. Architecture patterns, like unified namespace, and specifications like Sparkplug are moving towards open software architecture for manufacturing.

## DevOps is bound to be a success in Manufacturing

The manufacturing industry is undergoing a tremendous change due to digitalization. IIoT / Industry 4.0 initiatives are transforming industries and companies to become more efficient, flexible and competitive. The collection, integration and analysis of manufacturing data is requiring a more software intensive approach for manufacturing facilities. For these initiatives to be successful, the manufacturing industry will need to embrace software tools and best practices like devops. A devops approach in manufacturing will bring the reliability and quality that is required for many organizations.

