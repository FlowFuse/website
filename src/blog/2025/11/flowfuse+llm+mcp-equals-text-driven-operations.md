---
title: "FlowFuse + LLM + MCP = Text Driven Operations"
subtitle: "Moving from a Code driven interface to LLMs interpreting humans."
description: "Discover how FlowFuse combines LLMs and Model Context Protocol (MCP) with Node-RED to enable text-driven operations, transforming industrial data into actionable insights through natural language queries."
date: 2025-11-12
authors: ["zeger-jan-van-de-weg"]
image: /blog/2025/11/images/flowfuse+llm+mcp-equals-text-driven-operations.png
video: vaesYCyEESY
keywords: MCP, Node-RED MCP, LLM
tags:
  - flowfuse
  - node-red
---

In industrial operations it's all about getting more out of the CAPEX already
spent. Achieving higher efficiency means everyone needs to get data from a lot of
different machines, have an understanding how these machines form lines and fit
together, and holistically understand these as a group of assets that collectively
can achieve more.

<!--more-->

With the rapid adoption of Artificial Intelligence (AI), Model Context
Protocol, low-code platforms it's clear that the future of operations is
conversational.
The interface to machines is becoming plain text, allowing teams to obtain effects
and scale operational excellence across entire business units simply by asking
the right questions.

## The Context Challenge

Data capture involves integrating various machine protocols (like
[OPC-UA](/node-red/protocol/opc-ua/) or [Modbus](/node-red/protocol/modbus/)),
transporting, combining, and visualizing the information. While low-code tools
like Node-RED have decreased the implementation time to mere hours, the full
problem isn't solved: what happens *after* the data is collected?

Often, raw sensor data—like pressure, voltage, and temperature readings—lacks
context to immediately understand there's a problem worth solving. Even when a dashboard
has been built, spotting an issue (such as a high energy consumption on `machine 1`)
doesn't inherently guide the operator on how to resolve it.
Furthermore, data flow often involves a psychological hurdle, moving from areas
where an engineer feels comfortable (perhaps the data storage side) to areas of
less expertise (like machine protocols or physical voltage readings).

The goal is to asking high-level questions, such as:
"What changed in the energy consumption for machine 4?".

## Text: The New Language of Control

Removing code, often a complex layer, can be now achieved because of Large Language
Models (LLMs) and the Model Context Protocol (MCP).

LLMs, like ChatGPT, predict the next word in a sentence, allowing humans to
query systems using **natural language** rather than complex code. 
LLMs face fundamental limitations though: they are typically cloud-based, can be
slow, and are trained at specific points in time, meaning they cannot inherently
react to real-time, event-based data or proprietary local context.

This is where the **Model Context Protocol (MCP)** steps in. The promise of
MCP is to give models more context through an agreed-upon protocol. 
MCP allows operators to define exactly what read-only information (resources) or
functionality (tools) they want to expose to the LLM.

*   **Resources** are read-only, like sensor readings, employee staff lists, vacation calendars, or specification sheets (e.g., upper and lower temperature limits).
*   **Tools** are functions that allow the LLM to perform an action or change a state in the physical world.

By feeding this context into an MCP server (such as the official [FlowFuse MCP node](/node-red/flowfuse/mcp/)),
the LLM transforms into a powerful operational partner.

For example, an operator can ask: "Can you show me the last five temp sensor readings recorded?".
Once the model identifies an anomaly, the operator can incorporate specifications and ask: "Are any of these values outside of spec for upper temp or lower temp?".
If a problem is confirmed, the system can use staff and location data to answer a pointed question like: **"Who are all the staff located nearest to the problem, and what is the quickest way to get there?"**.
This capability quickly transforms complex data into actionable steps—finding the problem, comparing it to specs, finding the right person, and routing them to the site—all within a matter of minutes.

## Orchestrating Effects Across the Machine Fleet

The ability to propagate these text-driven decisions across many machines by the
same team is enabled by Node-RED serving as the essential integration layer.

FlowFuse, a major corporate sponsor of Node-RED, aims to fuse the digital realm
with machines and the shop floor for IoT use cases. Node-RED acts as the shell
that connects proprietary and legacy machine protocols (OT side) to the modern MCP structure.

If a manufacturing facility wants to allow an LLM to control a physical device,
Node-RED can integrate the machine (e.g., a Siemens S7 stack light) and wrap the
control logic in an MCP tool. The LLM requests an action
(e.g., "turn the stack light green"), the MCP tool sends the action through
Node-RED's established adapters, and the action is executed.

This means that existing organizational logic and machine adapters, which have
already been integrated into Node-RED, can be instantly made LLM and AI ready.
This rapid adaptation allows a very broad spectrum of engineers to be applied to
problems, moving past relying on "tribal knowledge" held by a single expert.

## Text-Driven Playbooks and the Human in the Loop

Looking ahead, this technology enables the creation of **text-driven playbooks**.
An operator might input a natural language prompt: 
"How do we optimize a certain procedure in the factory?". The resulting
operational procedure, driven by the LLM and executed via MCP tools, becomes a
documented playbook. This system helps organizations achieve operational excellence
by turning human text input into processes that the rest of the company can read,
understand, and replicate.

However, the industry must move cautiously. A critical element of the future of
operations is the necessity of a `human in the loop`.

AI is predictive and, in certain ways, random, meaning that if context slightly
changes, the output is not deterministic. When the consequences of an action are
physical or high-stakes
(e.g., stopping a production line, or an irreversible action like boiling an egg),
full control should not be handed over to a non-deterministic system. The risk of
an AI being "as confident when they're wrong as when they're right" necessitates human oversight.

For the near future (the next five years), the AI acts as a partner or a fault
partner, making the uncomfortable aspects of complex flows more manageable. It is
currently best applied in reversible or digital tasks, such as generating reports
or triggering low-consequence actions like turning a stack light orange to signal
an engineer. As trust grows and impacts iterate, AI will gain more influence and
context, but the final, consequential decisions will remain with the human.

The combination of LLMs, MCP, and Node-RED provides operators with super powers.
The operational floor is transforming from a place where experts write complex
code for singular machines, to a conversational environment where high-level, natural
language queries drive intelligent, scalable actions across the entire enterprise.

Ready to experience text-driven operations in your own facility?
[Try FlowFuse for free]({% include "main-cta-url.njk" %}) or request a personalized demo to see how LLM-powered automation can transform your industrial processes.
[Contact us today](https://flowfuse.com/contact-us/) or sign up for our upcoming webinar to stay ahead in the Industry 4.0 revolution.
