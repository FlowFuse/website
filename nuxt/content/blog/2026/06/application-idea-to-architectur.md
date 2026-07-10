---
title: "Turning an Application Idea into an Architecture"
subtitle: "A simple framework for designing industrial applications using repeatable building blocks"
description: "Learn how to turn industrial application ideas into clear architectures using a structured four-step framework based on FlowFuse building blocks."
date: 2026-06-26
authors: ["drew-gatti","sumit-shinde"]
image: /blog/2026/06/images/flowfuse-idea-to-architecture.png
tags:
  - flowfuse
  - post
cta:
  type: contact
  title: "Design your industrial architecture with FlowFuse"
  description: "Talk to our team to map your application idea into a scalable industrial architecture using FlowFuse building blocks."
meta:
  howto:
    name: "How to Turn an Industrial Application Idea into an Architecture"
    description: "Turn any industrial application idea into a clear architecture using a repeatable four-step framework: state what it does, pick the building block, decide where the data goes, and read off the design as a single sentence."
    totalTime: "PT15M"
    tool:
      - "An industrial application idea"
      - "FlowFuse building blocks (edge, data, and application patterns)"
    steps:
      - name: "Say what it does"
        text: "Describe the application in one plain sentence focused on the outcome, not the technology. For example, 'operators see live OEE for each line,' not 'a dashboard with a database.'"
        url: "the-four-moves"
      - name: "Pick the building block"
        text: "Decide which standard piece, or pieces, the idea is made of. If part of it is hardware near a machine and part is software people use, those are separate pieces joined by a connection."
        url: "the-four-moves"
      - name: "Decide where the data goes"
        text: "Name the data each piece takes in and sends out, then name where it lives: related records to a relational database, timestamped streams to a time-series database, live data for many consumers to a broker, or a one-off call to a single service."
        url: "the-four-moves"
      - name: "Read off the sentence"
        text: "Join the pieces and their connections into one sentence. That sentence is the architecture you build from."
        url: "the-four-moves"
  faq:
    - question: "How do I decide between an edge application and a cloud application?"
      answer: "Follow the seam in the idea itself. Anything that reads real equipment or has to keep working when the network drops belongs at the edge, near the machine. Anything a person logs into to view or act on data belongs in the cloud. If an idea has both, that's not one piece you have to force together, it's two pieces joined by a connection, usually a broker. Spotting that split early is what keeps an architecture clean."
    - question: "Which database should I use for industrial data: relational or time-series?"
      answer: "It depends on the shape of the data, not the industry. Records that relate to each other and get looked up and edited in place, like an asset registry where an asset belongs to a site and has an owner, belong in a relational database. A steady stream of timestamped readings you want to chart and trend over time, like equipment measurements, belongs in a time-series database. Naming the data shape tells you the target almost every time."
    - question: "When should data go to an MQTT broker instead of a database?"
      answer: "A broker is for live data that many things need at once, it moves data, it doesn't store it. A database is for data you want to keep and query later. They aren't competitors. A common pattern is a broker carrying live readings to every consumer that needs them right now, while one of those consumers writes the same readings into a time-series database for history. Use the broker for distribution, the database for memory."
    - question: "How do I design an OEE application?"
      answer: "Split it at the seam. One piece lives at the machine, reading the line and publishing its state to a broker. A second piece lives in the cloud, subscribing to that state, computing OEE, and showing it on a screen. Because you also want to chart trends, that cloud piece writes the readings to a time-series database for history. OEE isn't one monolithic build, it's an edge piece and a cloud piece joined by a broker, with history on the side."
    - question: "Do I need FlowFuse to use this framework?"
      answer: "No. The four moves, say what it does, pick the piece, decide where the data goes, read off the sentence, are technology-agnostic and work for reasoning about any industrial system. They map cleanly onto FlowFuse building blocks, which is where you get the payoff of designing a piece once and deploying it across a whole fleet, but the thinking comes first and stands on its own."
tldr: "A simple four-step framework helps turn industrial application ideas into clear architectures by focusing on responsibilities, not technologies."
---

Every industrial application starts with an idea.

*"We need OEE dashboards."*

*"We need a Unified Namespace."*

*"We need an asset registry."*

<!--more-->

The challenge isn't the idea. It's turning it into a clear architecture. Instead of starting with technologies, start with the responsibilities the application must fulfil. Once you can identify those, the architecture naturally follows.

This article introduces a simple four-step framework for turning application ideas into repeatable industrial architectures.

## How This Framework Works

![Four-step framework for turning an application idea into an architecture](./images/four-moves-framework.png)
_Turn any application idea into an architecture in four moves_

A FlowFuse application uses a small number of standard building blocks. Don't memorise them. Learn to recognise them. Think of it as learning to see the structure behind an application idea.

Every example in this guide follows the same four moves:

1. **Say what it does.** Start with the outcome. Describe the problem you're solving, not the technology you're using.
2. **Pick the building block.** Identify the FlowFuse building block, or combination of blocks, that delivers that outcome.
3. **Decide where the data goes.** Determine how data moves through the application and where it should live.
4. **Read off the sentence.** Combine the pieces into a single architectural statement.

That final sentence matters more than it might seem. If you can describe the architecture in one clear sentence, you've already made most of the important design decisions.

We'll apply these four moves three times: first to a hardware application, then to a software application, and finally to one that combines both.

## Example 1: A Hardware Idea

Let's start with a requirement many manufacturers are working towards today.

### The Idea

A company wants to build a Unified Namespace so that dashboards, analytics tools, and other applications can consume machine data consistently.

At this stage, forget MQTT, databases, and deployment. Focus on what needs to happen.

### 1. Say What It Does

The application reads data from local equipment and publishes it in a consistent structure for other systems to consume.

That's the outcome.

### 2. Pick the Building Block

Look at the hardware building blocks available, and recognise which one matches the requirement.

| Hardware Building Block | What it is                                                                    |
| ----------------------- | ----------------------------------------------------------------------------- |
| **Packaged App**        | A finished application that runs on a device with little or no configuration. |
| **Configurable App**    | The same application, but with site-specific settings.                        |
| **Edge Building Block** | Reusable functionality that you assemble into larger edge solutions.          |

This application talks directly to machines, PLCs, and sensors, so we're dealing with a hardware component.

It also needs adapting to the equipment at each site rather than deploying unchanged everywhere. That rules out a Packaged App and points us towards an **Edge Building Block**.

We now know the first piece of our architecture.

### 3. Decide Where the Data Goes

Now ask what happens to the data.

The application reads information from machines and makes it available to other systems: dashboards, analytics platforms, historians, reporting tools, or other applications.

Because multiple consumers need the same information in real time, a **Broker (MQTT)** is the natural destination. Rather than send data directly to each application, the Edge Building Block publishes it once and lets other systems subscribe to what they need.

![Architecture diagram of a Hardware Edge Building Block publishing equipment data to a Broker](./images/example-1-diagram.png)
_The Edge Building Block reads machine data and publishes it once, so any system can subscribe_

We've now identified both the application and its primary data destination.

### 4. Read Off the Sentence

Combine the pieces.

> A Hardware Edge Building Block reads local equipment data and publishes it to a Broker.

That's the architecture.

Notice what we skipped. We never discussed protocols, flows, dashboards, databases, or deployment details. We started with a requirement, picked the building block, decided where the data goes, and arrived at a clear architectural description, captured in a single sentence.

## Example 2: A Software Idea

The process doesn't change when hardware disappears from the picture. This time the four moves should already feel familiar, so we'll work through them as one continuous walk rather than four labelled steps.

### The Idea

A company wants a central asset registry where teams can view, search, and maintain information about equipment across multiple sites.

Operators, maintenance teams, and engineers all need the same information, and everyone should see changes immediately.

### Working Through the Moves

Said plainly, the application maintains a shared list of assets that users can view, search, and update. That's the outcome, not the implementation.

This time nothing touches machines, PLCs, or sensors. The application exists entirely for people. Users open screens, search records, update information, and view results. That points us towards a software building block.

| Software Building Block   | What it is                                                                               |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| **Packaged App**          | A self-contained application that performs a specific function without a user interface. |
| **Data-Driven App**       | A user-facing application whose content is driven by data.                               |
| **Shared Building Block** | Reusable functionality that you incorporate into other applications.                     |

The requirement revolves around people viewing and managing data through an interface, which makes it a **Data-Driven App**.

Now the data. Assets are records. An asset belongs to a site. It may have an owner, a status, maintenance history, and other attributes. Users search these records, update them, and relate them to one another. This is structured business data, which makes a **Relational Database** the natural choice. The Data-Driven App reads and updates the information stored there.

![Architecture diagram of a Software Data-Driven App reading and updating asset records in a Relational Database](./images/example-2-diagram.png)
_Asset records live in the Relational Database; the Data-Driven App is the interface users work through_

### Read Off the Sentence

Combine the pieces.

> A Software Data-Driven App manages asset information stored in a Relational Database.

That's the architecture.

Same four moves, same single-sentence result. We started with a business requirement, picked the application type, and decided where the data belongs, without touching implementation. Only the pieces changed.

## Example 3: Combining Hardware and Software (OEE)

The first two examples were deliberately simple: one hardware application, one software application. Most real-world industrial applications combine both. By now the moves should feel like second nature, so we'll again work through them as one continuous walk.

### The Idea

A manufacturer wants operators and supervisors to see live OEE for every production line. They also want historical data so they can analyse trends, compare performance, and spot opportunities for improvement.

This requirement spans two worlds. Machines generate the data. People consume the results.

Make it concrete. Say Line 3 is a packaging line, and the manufacturer wants the supervisor's screen to show that it's running at 78% OEE right now, with a downtime event logged at 14:32. To get there, the line's PLC has to publish its running state and part counts, something in the cloud has to turn those into an OEE figure, and the day's readings have to land somewhere you can chart them tomorrow. Hold that picture while we work through it.

### Working Through the Moves

Said plainly, the solution needs to collect production data from equipment, calculate OEE metrics, present those metrics to users, and store historical data for analysis. That's already more than one responsibility, which tells us we're combining building blocks, not picking a single one.

The machine side is the pattern from Example 1: production data needs collecting from equipment and making available to other systems. That's a **Hardware Edge Building Block**.

The user side is the pattern from Example 2: operators need dashboards showing current performance and historical trends. That's a **Software Data-Driven App**.

Now the data. The hardware component publishes machine state and production events. On Line 3, that's the running/stopped flag and the part count ticking up. Multiple consumers may need that information, so the first destination is a **Broker**. The software application subscribes to the broker, consumes the machine data, and calculates OEE, turning Line 3's raw counts into that 78% figure on the supervisor's screen.

The requirement also calls for historical analysis. OEE values, production counts, and downtime events like the 14:32 stop are all time-based measurements, which makes a **Time-Series Database** the natural place to store them.

![Architecture diagram of an Edge Building Block, Broker, Data-Driven App, and Time-Series Database working together for OEE](./images/example-3-diagram.png)
_Two familiar patterns connected: the edge piece publishes, the cloud app calculates and displays, the database remembers_

### Read Off the Sentence

Combine the pieces.

> A Hardware Edge Building Block publishes machine data to a Broker, which a Software Data-Driven App consumes to calculate and display OEE, storing historical metrics in a Time-Series Database.

That's the architecture.

We didn't design OEE from scratch. We recognised two patterns we'd already seen and connected them. The challenge wasn't inventing a new architecture. It was recognising which building blocks the job needed and how they fit together.

## Conclusion

At the start of this article, an OEE system, a Unified Namespace, and an asset registry looked like completely different applications. By now they should look familiar, not because the business problems are the same, but because the process for designing them is.

Each started with a requirement, broke down into a set of responsibilities, mapped onto FlowFuse building blocks, and resolved into a single architectural sentence.

That's the real purpose of this framework: to help you see the structure behind an application before implementation begins. Once you can do that, you stop asking "What should we build?" and start asking "Which patterns are already here?"

Next time a requirement lands on your desk, run the four moves before you open a diagram. The answer is usually much simpler than it first appears.