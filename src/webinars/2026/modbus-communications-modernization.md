---
title: "Modbus Communications: Keep, Bridge, or Replace?"
subtitle: Why a Protocol From 1979 Still Runs Your Factory. Where It Wins, Where It Hurts, and How to Bridge It to the Modern Data Stack
meta:
    description: Schneider Electric, a Modbus pioneer, and FlowFuse debate Modbus communications and show how to modernize legacy PLCs without rip-and-replace.
image: /images/webinars/modbus-communications-modernization.jpg
date: 2026-08-25
time: 17:00 CET (11:00am ET)
duration: 60
video: yad3KwBrQwI
hosts: ["kristopher-sandoval", "mandeep-sidhu"]
hubspot:
    formId: d3ab1705-0a83-4a28-8673-9bc3e2948033
    downloadFormId: 
---

Modbus Communications is a 47-year-old protocol that still runs a huge share of the modern factory floor, and Mandeep Sidhu (Schneider Electric) and Kristopher Sandoval (FlowFuse) sat down to settle the question everyone asks about it: keep it, bridge it, or replace it? The recording is above, catch the full session to see how they answer it.

<!--more-->

## What This Modbus Communications Recording Covers

- [The origin story](#why-modbus-communications-still-run-the-modern-factory-floor): how Modicon invented Modbus, gave it away royalty-free, and accidentally guaranteed its immortality.
- [The honest scorecard](#honest-scorecard): where Modbus beats OPC UA and MQTT on simplicity and ubiquity, and where it loses.
- [The keep, bridge, or replace decision framework](#decision-framework), and why bridging wins by default.
- [A live demo](#live-demo) bridging Modbus registers into a unified namespace and dashboard with FlowFuse and Node-RED.
- The live Q&A, where attendees brought their own Modbus-at-scale dilemmas.

## Why Modbus Communications Still Run the Modern Factory Floor

If the world ended tomorrow, two things would persist: cockroaches and Modbus. It's the world's most stubborn manufacturing protocol, and there's a good chance it's powering a bigger chunk of your shop floor than you realize, and quietly running some surprising places too.

In the recording, Mandeep traces Modbus Communications back to its 1968 origins at Bedford Associates and Schneider's Modicon platform, and shows how a 1979 connectivity protocol ended up becoming an open, royalty-free standard that never really left. It's a short watch, and it reframes the "isn't this too old?" question most engineers start with.

## The Honest Scorecard: Modbus vs. OPC UA and MQTT {#honest-scorecard}

Kristopher and Mandeep put Modbus, OPC UA, and MQTT side by side and score them honestly, no protocol tribalism. Watch for the page-count comparison alone (spoiler: one spec is a lot longer than the other), it's a good gut check for how much complexity you actually need for the problem in front of you.

## Keep, Bridge, or Replace: The Decision Framework {#decision-framework}

This is the core of the session: a practical framework for deciding when to leave a Modbus device alone, when it's actually worth replacing, and why bridging is the default answer more often than not. If you've got a mixture of legacy devices and a growing list of systems that want their data, this is the part of the recording worth pausing and rewinding. It pairs well with our guide on [bridging Modbus to MQTT and a unified namespace](/blog/2024/12/publishing-modbus-data-to-uns/), which walks through the same pattern in more technical detail.

## Live Demo: Bridging Modbus Data with FlowFuse and Node-RED {#live-demo}

Around the halfway mark, Kristopher switches over to a live demo in FlowFuse and Node-RED: raw Modbus registers going in one end, and a named, typed, dashboarded data stream coming out the other. If you'd rather follow along with a written walkthrough afterward, our [Using Modbus with FlowFuse](/blog/2025/09/using-modbus-with-flowfuse/) guide covers the same setup step by step.

Also worth a look once you're in the recording: the live Q&A, where attendees bring in real issues, from Modbus TCP connections that quietly go blank to how much visibility you can actually get into what's on the bus. If any of that sounds familiar, our posts on [Modbus polling best practices](/blog/2026/04/modbus-polling-best-practices/) and [diagnosing Modbus degradation](/blog/2026/04/diagnosing-modbus-degradation/) dig further into the same failure modes. And if you're still weighing Modbus against the alternatives, [why OPC UA isn't replacing Modbus yet](/blog/2026/03/why-opcua-is-not-replacing-modbus-yet/) and [Modbus TCP vs. Modbus RTU](/blog/2026/02/modbus-tcp-vs-modbus-rtu/) are good next reads, and the [Modbus protocol page](/node-red/protocol/modbus/) has the full Node-RED node documentation whenever you're ready to build.

## Who This Session Is For

This session is built for Controls Engineers, OT/IIoT Solutions Architects, and Plant Operations Managers who want to stop treating legacy protocols as a liability and start treating them as an asset, without drowning in custom integration code. Watch the recording above, and if a Modbus bridging project is already on your list, [talk to our team](/book-demo/) or [send us a message](/contact-us/) about your specific keep, bridge, or replace dilemma.
