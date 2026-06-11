---
title: "MQTT vs Sparkplug B: Which One (or Both) Do You Need?"
subtitle: "MQTT moves your data. Sparkplug B gives it structure. Here's how to choose."
description: "A practical guide to choosing between plain MQTT and Sparkplug B for industrial IoT: where MQTT's flexibility turns into a topic-namespace mess, what Sparkplug B's structure, binary payloads, and birth/death certificates fix, the QoS 0 trade-off nobody mentions, and why most large deployments end up running both."
date: 2026-06-11
authors: ["sumit-shinde"]
image: 
keywords: mqtt vs sparkplug b, sparkplug b, mqtt, industrial pub sub, mqtt topic namespace, sparkplug birth death certificate, mqtt qos, protobuf vs json, unified namespace, scada mqtt, iiot messaging, report by exception
tags:
  - post
  - mqtt
  - sparkplug
cta:
  type: contact
  title: "Make MQTT and Sparkplug B work without the plumbing"
  description: "Whether you settle on plain MQTT, Sparkplug B, or both, FlowFuse lets you connect your brokers and build dashboards and logic on that data with low-code, with an AI copilot that builds the flows for you from a prompt. FlowFuse supports both MQTT and Sparkplug B, along with all the major industrial protocols you are likely to run alongside them, so your data lands in one place regardless of what each device speaks. Talk to our team about your industrial data."
meta:
  howto:
    name: "How to Choose Between MQTT and Sparkplug B"
    description: "Decide between plain MQTT and Sparkplug B for an industrial deployment by working through scale, delivery guarantees, topic-naming discipline, bandwidth conditions, downstream consumers, and whether a mixed approach fits."
    totalTime: "PT15M"
    tool:
      - "MQTT broker"
      - "List of devices, sites, and vendors"
      - "Network bandwidth figures"
    steps:
      - name: "Map your scale and who touches the system"
        text: "Count devices, sites, teams, and vendors. A single site with a handful of sensors you fully control points to plain MQTT; many devices across multiple teams or vendors points toward Sparkplug B."
        url: "how-to-choose-between-mqtt-and-sparkplug-b"
      - name: "Decide whether you can tolerate losing a message"
        text: "Sparkplug B mandates QoS 0, fire and forget, for all data and lifecycle messages, with no delivery guarantee. If your data is regulated or safety-critical and every reading must be accounted for, use plain MQTT with a higher QoS level."
        url: "how-to-choose-between-mqtt-and-sparkplug-b"
      - name: "Audit your topic naming"
        text: "If teams are each inventing their own topic conventions and nobody can read the broker at a glance anymore, that disorder is the signal that Sparkplug B's fixed namespace is worth adopting."
        url: "how-to-choose-between-mqtt-and-sparkplug-b"
      - name: "Check your bandwidth and network conditions"
        text: "On constrained or costly links such as cellular or satellite, Sparkplug B's compact binary payloads and report-by-exception cut traffic meaningfully. On a fast local network the difference matters less."
        url: "how-to-choose-between-mqtt-and-sparkplug-b"
      - name: "Look at what consumes the data downstream"
        text: "If a SCADA system, historian, or analytics layer must understand the data without custom integration for every source, Sparkplug B's self-describing payloads pay off."
        url: "how-to-choose-between-mqtt-and-sparkplug-b"
      - name: "Consider running both"
        text: "Match each protocol to the data it carries: Sparkplug B for the bulk of telemetry, plain MQTT with higher QoS for the critical data that cannot be lost."
        url: "how-to-choose-between-mqtt-and-sparkplug-b"
  faq:
    - question: "What is the difference between MQTT and Sparkplug B?"
      answer: "MQTT is a lightweight publish/subscribe transport that moves messages between devices and a broker, but it does not define how topics are named or what payloads contain. Sparkplug B is a specification layered on top of MQTT, governed by the Eclipse Foundation, that adds a fixed topic namespace, a defined binary payload format using Google Protocol Buffers, and built-in device state through birth and death certificates. In short, MQTT moves the bytes; Sparkplug B makes them consistent and self-describing."
    - question: "When should I use plain MQTT instead of Sparkplug B?"
      answer: "Plain MQTT is the better fit for small or custom deployments where you control both ends, and for data you genuinely cannot lose. Sparkplug B mandates QoS 0 (fire and forget) for all data and lifecycle messages with no delivery guarantee, while plain MQTT lets you choose QoS 0, 1, or 2. For regulated environments with strict traceability, prototypes, or a handful of sensors, plain MQTT is simpler and gives you the delivery guarantees Sparkplug B does not."
    - question: "When is Sparkplug B worth the added complexity?"
      answer: "Sparkplug B earns its complexity when you have many devices, multiple teams or vendors, and a downstream system such as SCADA or analytics that must understand the data without custom integration for every source, and where losing the occasional telemetry reading is not a catastrophe. Real-time dashboards, OEE, and non-critical analytics are strong fits. The standardized topic structure and out-of-the-box device state cut integration and troubleshooting time sharply at scale."
    - question: "Why does Sparkplug B use binary Protocol Buffers instead of JSON?"
      answer: "Protocol Buffers are far more compact than JSON, typically 60 to 75 percent smaller for the same data, because they drop field names, repeated keys, and punctuation and encode numbers as compact binary rather than text. Combined with report-by-exception, where data is only sent when a value changes, this cuts bandwidth significantly on constrained links like cellular or satellite. The trade-off is that binary payloads are not human-readable and need tooling to inspect on the wire."
    - question: "Can you use MQTT and Sparkplug B together?"
      answer: "Yes, and at larger sites this is common. A typical pattern is to run Sparkplug B for the bulk of telemetry, where its structure and bandwidth savings pay off, and fall back to plain MQTT with higher QoS for critical data that absolutely cannot be lost. They are not really competitors; they are the same foundation with different amounts of structure and different delivery guarantees, so you match each to the data it carries."
tldr: "MQTT is a lightweight transport that moves industrial data but says nothing about what that data means, how topics are named, or whether a device is still alive. That flexibility turns into a mess at scale. Sparkplug B layers a fixed topic namespace, compact binary payloads, and birth/death certificates on top of MQTT to fix exactly that, at the cost of more complexity and a hard QoS 0 (fire-and-forget) delivery model for telemetry with no guarantee. Use plain MQTT for small or custom setups and data you cannot lose; use Sparkplug B for many-device, multi-vendor systems feeding SCADA or analytics; and expect larger deployments to run both, matching each protocol to the data it carries."
---

MQTT is everywhere in industrial setups. It has been the default for moving sensor data and machine states around for a long time now, mostly because it's lightweight and it just works on almost anything.

<!--more-->

The catch is that it doesn't really tell you anything about the data itself. Say a broker gets a message on `plant1/line4/temp` with a value of `72`. Is that Celsius? Fahrenheit? Is the device still running, or did it go offline a few hours ago and that's just the last number it sent? MQTT won't tell you. It moves the bytes and the rest is up to you, which means everyone ends up handling it their own way.

That's the problem Sparkplug B tries to solve. It adds the structure that plain MQTT leaves out, so your data actually makes sense to something like a SCADA system without you having to write custom code for every device.

So do you need one, the other, or both? That's what this post is about.

## MQTT vs Sparkplug B at a glance

| | Plain MQTT | Sparkplug B |
|---|---|---|
| What it is | A lightweight transport for moving messages | A specification layered on top of MQTT |
| Topic structure | You define your own | Fixed, standardized namespace |
| Payload format | Anything you want, usually JSON | Binary Protocol Buffers, defined schema |
| Device state | Not built in; roll your own heartbeat | Birth and death certificates out of the box |
| Bandwidth | Heavier, especially with JSON | Compact; report-by-exception cuts traffic sharply |
| Delivery guarantee | Pick your QoS: 0, 1, or 2 | QoS 0 for all data and lifecycle messages ("fire and forget"); host STATE uses QoS 1 |
| Readable on the wire | Yes, if you use JSON | No, needs tooling to decode |
| Best fit | Small or custom setups, data you can't lose | Many devices, multiple vendors, SCADA and analytics |

The rest of this post unpacks why each row lands where it does.

## A pattern that repeats

There's a story that plays out on a lot of teams, and in my experience it goes roughly the same way every time.

A team starts with plain MQTT because it's the obvious choice. A handful of PLCs and sensors, JSON payloads, a broker like Mosquitto in the middle, and a dashboard reading off it. It works. Then the system grows, more lines, a second site, new people, and as it grows it starts to strain in three specific places. Those three places are worth walking through, because they're the same three gaps almost everyone hits, and they're exactly what Sparkplug B was designed to close.

## Where plain MQTT starts to hurt

It's worth hearing this from the person who built it. [Arlen Nipper](https://industry4o.com/2024/08/22/mqtt-sparkplug/) co-invented MQTT and later wrote the Sparkplug specification, and he's blunt about the trade-off at the heart of the protocol:

> Both the good and the bad thing about MQTT is, you can publish anything you want on any topic.

That freedom is why MQTT spread, and it's also where the strain comes from once you scale. It tends to show up in three specific places.

The first strain is payload bloat. JSON is easy to read, which is why people reach for it, but it isn't efficient. A single temperature reading written as `{"sensorId":32,"sensorValue":24.5}` is around 36 bytes when the actual data is a handful. That feels like nothing until you're pushing thousands of tags a second, and then it adds up fast.

The second is structure, or the lack of it. MQTT doesn't define any topic layout, so every integration team invents its own conventions. One group publishes temperature to `line2/temp`, another to `plant/line5/sensors/temperature/value`, and a contractor wires up something nobody can explain later. [Walker Reynolds](https://www.eclipse.org/community/eclipse_newsletter/2021/february/1.php), the systems integrator who popularized the Unified Namespace idea, summed up the trade-off:

> Yes, MQTT is flexible — you can basically publish any payload to any topic, but this can create a mess in the topic namespace.

Keeping it all consistent across multiple plants and vendors turns into a constant chore. This is the `plant1/line4/temp` problem from the intro, just multiplied by every team that ever touched the system. Nothing is wrong, exactly, and it all keeps running, but at some point nobody can open the broker and understand the whole thing anymore. (If you're working through how to impose order on a sprawling MQTT setup, [getting the most out of MQTT for industrial IoT](https://flowfuse.com/blog/2024/11/getting-the-most-out-of-mqtt-for-industrial-iot/) goes deeper on this.)

The third strain is the one that quietly causes the most trouble: state. If a device drops offline, it isn't always obvious. Plain MQTT will happily show you the last value a sensor published, steady as anything, long after the sensor itself has gone dark. Teams end up bolting on their own heartbeat logic just to answer the question "is this device actually alive?" There is a built-in MQTT feature that helps, the Last Will and Testament, where a client registers a message that the broker sends automatically if the connection drops, but you have to set it up yourself on every device, and plenty of setups never get around to it.

For small projects and proofs of concept, none of this matters and plain MQTT is completely fine. The cracks only show when you scale, twenty-plus lines or multiple sites, which is right about when teams start looking at Sparkplug B.

## What Sparkplug B changes

Sparkplug B is a specification that sits on top of MQTT, [governed by the Eclipse Foundation](https://sparkplug.eclipse.org/specification/version/3.0/documents/sparkplug-specification-3.0.0.pdf), and built specifically for industrial use. It doesn't replace MQTT, it adds the conventions MQTT deliberately leaves out: a fixed topic structure, a defined binary payload format using Google Protocol Buffers, and built-in device state. Look at what each one does for the three problems above.

For the structure problem, Sparkplug defines the topic layout so no team gets to invent its own. Every topic starts with `spBv1.0` to mark the version and encoding, then a group ID that bundles your edge nodes, usually by plant or site, followed by the message type, the edge node ID, and the device ID. The rigidity is the point. Onboarding a new line gets faster simply because everyone already speaks the same language.

For the bloat problem, the binary Protobuf format is far more compact than JSON. Protobuf payloads typically run 60 to 75% smaller than the equivalent JSON for the same data, since it drops the field names, repeated keys, and punctuation that JSON carries and encodes numbers as compact binary instead of text. Sparkplug also lets you batch many tag updates into a single message instead of one message per tag, which cuts broker overhead and network chatter, and it only sends when a value changes rather than polling. That report-by-exception approach, according to the [Eclipse Sparkplug project](https://projects.eclipse.org/projects/iot.sparkplug), has been shown to cut network bandwidth by 80 to 95%, though only when the full state management is actually implemented. On constrained links like cellular or satellite, where bandwidth costs real money, that combination adds up quickly. (If you want to see what those binary savings look like in practice, here's a hands-on walkthrough of [optimizing industrial data with Protocol Buffers](https://flowfuse.com/blog/2025/11/optimize-industrial-data-protocol-buffers/).)

For the state problem, Sparkplug uses birth and death certificates. A device publishes a birth certificate when it comes online, listing everything it offers, and a death certificate when it disconnects. So instead of writing custom scripts to guess whether a device is alive, you get that state visible in the SCADA system out of the box. One detail most write-ups blur is worth getting right: the delivery of that death certificate on an unexpected disconnect is handled by MQTT's own Last Will mechanism, not by Sparkplug. Sparkplug defines the meaning and structure; MQTT does the delivering.

The real payoff isn't any single number, it's operational simplicity. Less time spent troubleshooting whether a device is alive or decoding someone else's topic scheme, and more time on the actual process.

## The QoS catch

Sparkplug B carries a trade-off that rarely makes it into the comparison posts, and to my mind it's a serious one.

The [Sparkplug B spec mandates QoS 0](https://github.com/eclipse-sparkplug/sparkplug/blob/master/docs/normative_statements.md) for all data and lifecycle messages, the NBIRTH, DBIRTH, NDATA, DDATA, NDEATH, and DDEATH messages that carry your actual telemetry and device state. The one exception is the Primary Host Application's STATE message, which uses QoS 1 so host availability is signalled reliably. But for the data you care about, QoS 0 means "fire and forget." The publisher sends a message and moves on, with no delivery guarantee. In theory that's maximum speed. In practice, if the network hiccups or the broker restarts, that data is gone. For a real-time dashboard, fine. For a regulated environment where every reading has to be accounted for, that's a genuine risk. Plain MQTT, by contrast, lets you pick your quality of service: QoS 0, QoS 1 for "at least once," or QoS 2 for "exactly once." If you can't afford to lose data, you choose a higher level and pay for it in some performance.

The other costs are smaller but real. The binary payload that saves you bandwidth is also harder to debug, since you can't just read it off the wire without the right tooling. And teams used to sending plain JSON have a learning curve to climb: topic conventions, birth and death messages, protobuf schemas. For a handful of sensors, that overhead isn't worth it. Plain MQTT is simpler and does the job.

## How to choose between MQTT and Sparkplug B

If you want a way to work through the decision rather than a verdict, run your situation past these in order.

1. **Map your scale and who touches the system.** Count devices, sites, teams, and vendors. A single site with a handful of sensors you fully control points to plain MQTT; many devices across multiple teams or vendors points toward Sparkplug B.
2. **Decide whether you can tolerate losing a message.** Sparkplug B mandates QoS 0, fire and forget, for all data and lifecycle messages, with no delivery guarantee. If your data is regulated or safety-critical and every reading must be accounted for, use plain MQTT with a higher QoS level.
3. **Audit your topic naming.** If teams are each inventing their own topic conventions and nobody can read the broker at a glance anymore, that disorder is the signal that Sparkplug B's fixed namespace is worth adopting.
4. **Check your bandwidth and network conditions.** On constrained or costly links such as cellular or satellite, Sparkplug B's compact binary payloads and report-by-exception cut traffic meaningfully. On a fast local network the difference matters less.
5. **Look at what consumes the data downstream.** If a SCADA system, historian, or analytics layer must understand the data without custom integration for every source, Sparkplug B's self-describing payloads pay off.
6. **Consider running both.** Match each protocol to the data it carries: Sparkplug B for the bulk of telemetry, plain MQTT with higher QoS for the critical data that cannot be lost.

## MQTT, Sparkplug B, or both

Run those steps and a shape usually emerges. Plain MQTT fits when you control both ends, want flexibility, or genuinely cannot lose a message and need a higher QoS than Sparkplug allows for data: small deployments, prototypes, regulated data with strict traceability. Sparkplug B earns its complexity when many devices and vendors feed something downstream that has to understand the data on its own, and the odd dropped reading isn't a catastrophe: real-time dashboards, OEE, non-critical analytics.

And often the honest answer is both. The pattern I've seen at larger manufacturers is to run Sparkplug B for the bulk of their telemetry and fall back to plain MQTT with higher QoS, or another protocol entirely, for the critical data that absolutely cannot be lost. They aren't really competitors. They're the same foundation with different amounts of structure and different guarantees, and the smart move is matching each to the data it's carrying.

Whichever way you land, the next step is wiring it up. If you're building on FlowFuse, here are practical guides for [using MQTT in FlowFuse](https://flowfuse.com/blog/2024/06/how-to-use-mqtt-in-node-red/) and for [using MQTT Sparkplug B with FlowFuse](https://flowfuse.com/blog/2024/08/using-mqtt-sparkplugb-with-node-red/).
