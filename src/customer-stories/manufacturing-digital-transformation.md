---
title: "How Does a Large Manufacturer Turn Production Events into Action at Scale?"
description: "A large US manufacturer operationalized real-time production data across thousands of devices and dozens of sites using FlowFuse to govern, scale, and standardize the workflows that turn shop-floor events into action."
image: /images/stories/large-us-manufacturing.jpg
date: 2023-05-04
usecase:
  - production-monitoring
logo:
hubspot:
    formId: 826044fa-9760-4f47-84d0-bfe0234f1fa7
story:
    brand: Manufacturing Company
    url:
    quote: The low code paradigm makes it possible for companies to decentralize innovation within an organization, letting the people who run operations build the systems that govern them.
    challenge: Pilot applications worked on a single line, but the company had no way to govern, version, and deploy thousands of operational workflows consistently across dozens of sites.
    solution: Using FlowFuse as the operational layer to govern, scale, and standardize production-event workflows across the fleet.
    products:
        - FlowFuse
        - FlowFuse Device Agent
        - FlowFuse Dashboard
        - FlowFuse Project Nodes
        - Node-RED
    results:
        - Governed and versioned thousands of operational instances deployed across thousands of remote devices and dozens of sites.
        - Used FlowFuse delivery pipelines and collaboration tools to standardize execution and improve the reliability of operational rollouts.
---

A **large US-based manufacturer operationalized real-time production data** across its entire operation, turning shop-floor events into action at thousands of sites. Using FlowFuse as its operational layer, the company governs, versions, and scales hundreds of standardized workflows across dozens of locations and over ten thousand employees.

<!--more-->

## What operational problem was the manufacturer trying to solve?

The manufacturer had production data but no way to act on it in real time. Data sat on paper or stayed locked inside machinery, so the company had no live visibility into operations, no way to predict maintenance, and no mechanism to respond to shop-floor events as they happened.

The daily operations stand-up showed the gap clearly. A team gathered at a white board, working from numbers written on paper. By the time anyone read a figure, the moment to act on it had passed. Events happened on the line; the response lived a shift behind. This is the operational gap manufacturers hit constantly: the data is there, the action isn't.

## Why didn't the company's existing MES, ERP, or dashboards solve it?

Existing systems each held a piece of the problem and none closed the loop from event to action. The MES executed production orders but didn't orchestrate a response when a line drifted. ERP planned but didn't run the line. Historians stored data but didn't act on it. Dashboards displayed numbers but drove no workflow.

The company's MES focused on **what** to build and **how** to build it, not on measuring, understanding, or improving the process while it ran. This is the limit manufacturers run into across the board: rigid systems built for execution or planning, not for operational logic that responds in real time. The company needed an operational layer sitting across these systems to turn production events into governed, repeatable responses.

## What operational workflow did the manufacturer build?

The manufacturer built a workflow that watches the line and acts on what it sees, then runs that same pattern everywhere. Industrial computers collect data from sensors, PLCs, and cameras on the production lines, interpret it in real time to understand equipment efficiency, and drive an immediate response.

That response pushes live status to monitors on the shop floor, so the operations team sees the current state of every line as it changes, and sends data upstream to the cloud for fleet-level visibility. The white-board stand-up became a meeting run off live operational data on screen. The same event-to-action pattern extended into continuous-improvement workflows, process changes to staffing handbooks, and coordination between production areas that had previously depended on manual hand-offs.

A team of five former manufacturing engineers built hundreds of these applications. Because they knew the operations intimately, they encoded real operational logic into workflows the floor trusted. Reusable building blocks let them standardize that logic into shared patterns every application could follow, keeping quality high and technical debt low as the library grew.

## How did the manufacturer operationalize these workflows across thousands of sites?

The manufacturer uses **FlowFuse as its operational layer** to deploy, govern, and version thousands of instances across thousands of remote devices. FlowFuse maintains multiple versions across the fleet, so each site runs a known, governed configuration rather than a one-off, and delivery pipelines move changes through staged rollouts instead of manual hand-pushes.

Building one workflow on one line was never the hard part. Operationalizing thousands of them across dozens of sites was. Without a platform underneath, the company had no reliable way to version instances, deploy them consistently, govern who changed what, or know which version ran where. FlowFuse collaboration and review tools let the team lead inspect and standardize junior developers' work before it reaches the floor. The workflows run on Node-RED inside FlowFuse, but the platform around them is what makes them deployable, governable, and repeatable across the whole operation.

## What were the operational outcomes?

The manufacturer moved from paper and white boards to **real-time operational response running across thousands of governed instances.** Operations teams now act on events as they happen rather than a shift later, and hundreds of standardized applications deploy and update through governed pipelines instead of manual effort.

This cut the engineering overhead of running the fleet and kept execution consistent from site to site. New continuous-improvement logic, once proven on one line, now rolls out across plants as a versioned, repeatable workflow. The project leader sees this low-code, operational model as the future of how manufacturers build: it decentralizes innovation, letting the subject-matter experts who run operations build and govern the systems that drive them, at a scale manual development could never reach.

## Frequently asked questions

### What is an operational layer in manufacturing?

An operational layer sits across existing systems like MES, ERP, and historians and turns production events into governed, repeatable action. It orchestrates workflows, governs who can change them, and deploys them consistently across sites — handling the execution and scaling that planning and record-keeping systems were never built to do.

### How does FlowFuse help manufacturers scale operational applications?

FlowFuse deploys, versions, and governs operational instances across thousands of remote devices and multiple sites. Delivery pipelines move changes through staged rollouts, version control keeps each site on a known configuration, and collaboration tools let teams review and standardize work before it reaches the production floor.

### Can manufacturing engineers build operational workflows without software experience?

Yes. The low-code visual model lets former manufacturing engineers encode operational logic without extensive software development experience. Reusable building blocks standardize that logic into shared patterns, so a team of five engineers can build and maintain hundreds of governed applications across an operation.

### What is the difference between collecting data and operationalizing it?

Collecting data means recording or displaying it; operationalizing it means acting on it in real time. A dashboard shows a line's status, but an operationalized workflow detects an event, decides on a response, and drives action — pushing alerts to the floor or triggering a downstream process automatically.
