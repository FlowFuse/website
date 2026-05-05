---
title: "Applying The Bus Factor - How FlowFuse Deployed Stack Resilience in Real Life"
subtitle: What the Bus Factor Reveals About Industrial System Resilience - and What Happened When We Had to Find Out the Hard Way
meta:
    description: The bus factor isn't just a thought experiment. When travel complications left our lead architect stranded nine time zones away from a live Hannover Messe demo, the stack had to run itself. Here's what held, what didn't, and what it means for how you build industrial systems that survive the unexpected.
image:
date: 2026-05-28
time: 17:00 CET (11:00am ET)
duration: 60
video:
hosts: ["kristopher-sandoval"]
hubspot:
    formId: 8b6f4805-fc57-49f9-a282-3480328e9d9f
    downloadFormId: 
---
The bus factor is one of those concepts that engineers nod at in architecture reviews and then quietly ignore when the deadline is close. The idea is simple - if a key person gets hit by a bus, does the system keep running? Does anyone else know how to operate it? Is the knowledge in the team, or is it in one person's head?
<!--more-->

> Most industrial deployments, if they're being honest, have a bus factor of one.

---

## A Real-World Failure Scenario

This webinar uses a real incident — a travel disruption that left a FlowFuse DevRel and lead demo architect stranded in Japan during Hannover Messe 2026, nine time zones away from a live three-continent demo running on real hardware — as a lens for examining what bus-factor resilience actually looks like in a modern industrial stack.

Not in theory.  

Not in a lab.  

In a situation where the show floor opened regardless, and the system either worked or it didn't.

---

## What We Built (and Why It Matters)

We'll walk through the architecture behind the demo — a live supply chain simulation spanning San Francisco, Funabashi, and Hannover, built on Python/SimPy, MQTT, Node-RED, QuestDB, and Opto22 Groov RIO hardware — and use it as a concrete case study for the broader question every OT/IT engineer should be asking:

> What does your system need to be able to do when you can't be in the room?

We'll demo the specific functionality and features on FlowFuse that made all of this possible, as well as the architectural choices that enabled rapid repairs and deployment in the actual real-world environment.

---

## What You'll Learn

In this session, Kristopher will cover:

- What the bus factor is, why it's frustratingly underweighted in industrial system design, and how to actually measure it for your own stack  

- A demo of the real architecture behind the Hannover Messe demo — what was running, where, and why it was designed the way it was  

- What remote management looked like under genuine operational pressure — not a feature walkthrough, but a live account of what the tooling had to do  

- Where the stack held and where it exposed gaps — an honest assessment of what resilience looks like when the test isn't scheduled  

- How FlowFuse's centralised device management, remote deployment, and version control capabilities map onto bus-factor risk in distributed industrial environments  

- A practical framework for auditing your own deployment's bus factor — and the specific design patterns that reduce it  

---

## Who This Is For

This webinar is ideal for OT/IT engineers, automation architects, and industrial IoT practitioners who are responsible for systems that need to keep running whether or not the right person is available.

If you've ever been the single point of failure in your own stack — or quietly worried that someone else is — this session is for you.
