---
title: "The Real Causes of PLC Communication Latency (And How to Fix Them)"
subtitle: "Find the few settings draining your milliseconds and the timing follows."
description: "Troubleshoot PLC communication latency by identifying common causes such as poll rates, timeout settings, connection limits, and protocol selection."
date: 2026-06-16
authors: ["drew-gatti","sumit-shinde"]
image:
tags:
  - post
  - plc
cta:
  type: contact
  title: "Still seeing PLC latency, or not sure your runtime can keep up?"
  description: "If you've worked through poll tiers, timeouts, and protocol splits and the link still isn't steady, or you're not sure whether your runtime can hold the timing your process needs, that's exactly what our team can help diagnose, and help you achieve with FlowFuse."
meta:
  howto:
    name: "How to Find and Fix PLC Communication Latency"
    description: "Diagnose and remove the real sources of latency on a PLC link: isolate the transport with a SISO test, tier poll rates to how fast the data actually changes, set timeouts from measurement instead of feel, spend the controller's scan budget deliberately, match the protocol to the data, and sample and batch at the source instead of fighting the network."
    totalTime: "PT1H30M"
    tool:
      - "PLC and controller"
      - "Oscilloscope or protocol analyzer"
      - "Time-series database"
      - "Node-RED or equivalent runtime"
    steps:
      - name: "Run a SISO test to find the leaking layer"
        text: "Run a single input, single output exchange directly on the controller, with no PLC logic involved, and watch it on a scope. If that bare exchange is unsteady, the transport itself is the problem. If it's steady but the real flow isn't, the time is being lost in data handling further up the stack."
        url: "run-a-siso-test-to-find-the-leaking-layer"
      - name: "Tier poll rates by how fast the data changes"
        text: "Stop polling every tag at one rate. Put fault bits, interlocks, and closed-loop values on a fast tier of 100 to 500 ms. Put running values like flow, pressure, and temperature on a normal tier of 1 to 5 seconds. Put counters, runtime hours, and setpoints on a slow tier of 30 seconds or more. Read nameplate and calibration data once at startup and cache it."
        url: "tier-poll-rates-by-how-fast-the-data-changes"
      - name: "Set timeouts from measurement, not from feel"
        text: "Measure the floor: time to send the request, the device's processing time, and time to send the response back. Multiply that floor by 1.5 to 2 to set the timeout. A timeout set too tight triggers retries that add load; a timeout set too loose holds up every request behind a dead one."
        url: "set-timeouts-from-measurement-not-from-feel"
      - name: "Spend the controller's scan budget deliberately"
        text: "Treat every request as time borrowed from the PLC's scan. Stop polling more tags than the fast tier needs, stay under each device's connection limit so requests don't queue or get refused, and keep high-volume telemetry off the same protocol driver as time-critical control data."
        url: "spend-the-controllers-scan-budget-deliberately"
      - name: "Match the protocol to the data instead of trusting one for everything"
        text: "Know what each protocol is actually built for: MQTT and OPC UA for volume and structure, not sub-loop response; WebSocket and Modbus TCP can hold low-millisecond reads but make no hard promise; EtherNet/IP is the surest way to guarantee single-digit-millisecond turns. Give the time-critical path its own protocol and keep its payload small, and let bulk telemetry ride a transport built for volume."
        url: "match-the-protocol-to-the-data"
      - name: "Sample and timestamp at the source"
        text: "Have the controller sample at a fixed rate as it reads the signal and stamp each reading with the time it was taken, so an uneven network delivery pace never touches the timing of the measurement itself. Solving fixed-interval sampling over the wire is solving it in the wrong place."
        url: "sample-and-timestamp-at-the-source"
      - name: "Buffer and batch instead of streaming single writes"
        text: "Let the controller hold telemetry in a buffer and pull it at the rate the data actually needs, then write the buffer to a time-series database in batches rather than one write at a time. Build each read from registers that sit together in the map, so the device isn't forced to read dead space or split one request into many."
        url: "buffer-and-batch-instead-of-streaming"
  faq:
    - question: "What actually causes PLC communication latency?"
      answer: "Almost never the runtime, the network, or the PLC's CPU. It's a handful of configuration choices made once at setup and never revisited: one poll rate applied to data that changes at four different speeds, a timeout set by guessing instead of measuring, a controller's scan budget spent without limits, and a protocol trusted to guarantee timing it was never built to guarantee."
    - question: "What is a SISO test and why run it first?"
      answer: "A SISO (single input, single output) test runs a minimal exchange directly on the controller with no PLC logic involved, watched on a scope. If that bare exchange is unsteady, the transport itself is the bottleneck. If it holds steady while the real system doesn't, the latency is in data handling further up the stack, which tells you which fixes to apply first."
    - question: "How should PLC poll rates be set to avoid latency?"
      answer: "By how fast the data actually changes, not by one rate for every tag. Fault and alarm bits belong on a fast tier of 100 to 500 ms, running process values on a normal tier of 1 to 5 seconds, counters and setpoints on a slow tier of 30 seconds or more, and nameplate or calibration data read once at startup and cached rather than polled at all."
    - question: "How do I set a timeout for a PLC connection?"
      answer: "Measure the floor rather than guessing a round number. The floor is the time to send the request, the device's own processing time, and the time to send the response back. Set the timeout at 1.5 to 2 times that floor. Too tight and the request fails under normal load, triggering retries that add more traffic; too loose and a dead request holds up everything behind it."
    - question: "Which protocol is best for low-latency PLC communication?"
      answer: "None of the common general-purpose protocols guarantee delivery inside a fixed time window by default. EtherNet/IP, run over an Ethernet controller that prioritizes the packet, is the surest way to guarantee single-digit-millisecond turns. MQTT, OPC UA, WebSocket, and Modbus TCP can still hold reliable low-millisecond timing if the fast path carries a small payload and doesn't share a driver with bulk telemetry, but the guarantee comes from how the data is handled, not from the protocol alone."
    - question: "Is Node-RED or FlowFuse fast enough for real-time PLC control?"
      answer: "Yes. Running Node-RED on Node.js adds a small, fixed overhead of a few milliseconds per pass, which doesn't drift over a long run or grow when a device gets busy. A swing of tens of milliseconds has a cause other than that fixed overhead, almost always one of the poll rate, timeout, scan budget, or protocol issues this article covers. The one real exception is putting heavy work like a slow database write in the same Node-RED instance as the fast path, since the runtime is a single process with one event loop; the fix is a separate instance, not a different runtime."
tldr: "Most PLC latency isn't the runtime, the network, or the CPU, it's a few unexamined settings. Run a SISO test to isolate the transport from your data handling. Tier poll rates to how fast each tag actually changes instead of polling everything at one rate. Set timeouts from a measured floor times 1.5 to 2, not by feel. Spend the controller's scan budget deliberately: poll only what needs the fast tier, respect connection limits, and keep telemetry off the time-critical protocol's driver. Match the protocol to the data, since none of the common ones guarantee timing by default. Then sample and timestamp at the source and batch writes instead of streaming single ones, so the timing is built in rather than fought for over the wire."
---

If you run control over a PLC link, a fast loop, an interlock, a setpoint that has to land on time, you know the feeling when the timing won't come right. You change the settings, you try again, and the response you need still isn't there. It's tempting to blame the runtime for being too slow, or to decide you need a deterministic protocol. Most of the time, neither is the cause.

<!--more-->

Latency on a PLC link comes from how the data is handled, not the runtime, the network, or the PLC's CPU. It comes from a few choices made when the system was set up and never looked at again, each one using time the loop can't spare.

This post follows the time. Where a PLC link loses its milliseconds, and which mistake puts it there.

## First, check if it's even the transport

Following the time means starting at the bottom. Before you change anything, find out which layer is slow. You can spend a day tuning poll rates when the real problem is the protocol shaking underneath you, or the other way around.

The simplest check is a SISO test: single input, single output. Run a tiny exchange straight on the controller, with no PLC logic in the loop, just a line or two of code, and watch it on a scope. If even that bare exchange jumps around from one pass to the next, the problem is the transport itself, not anything you built on top. If the bare exchange holds steady but your real flow doesn't, the time is going somewhere in your data handling. That one test tells you which half of this article to read first.

## The data doesn't change at one speed, and your poll rate shouldn't either

When the test points at your data handling, the first place to look is also where most of the lost time hides. It usually starts with a thirty-second choice: pick a scan rate, use it for every tag, move on. It works on day one, so it stays that way. But one rate is the wrong answer for almost every real system, and a quick calculation shows why.

Take a shared bus with twenty devices, all polled at 500 ms, where each read takes 50 ms. That's not 500 ms per device, it's a queue: twenty reads at 50 ms each is a full second to get through one cycle. By the time you read device twenty, its value is already a second old, and the next cycle hasn't started. You read a slow temperature sensor ten times before its value could have moved, and a fault bit that goes high for 800 ms can fall between two passes and never get seen. One rate ends up too fast for some tags and too slow for others.

The reason it's the wrong model is that the data isn't all one kind. A temperature drifts over minutes. A runtime counter ticks once an hour. An alarm bit can flip in under a second. A setpoint only changes when an operator touches it. Polling all four at the same rate fits none of them, and it wastes the controller's time on the ones that didn't need it.

The fix is to set the rate to how fast the data actually changes:

- **Fast, 100 to 500 ms:** fault and alarm bits, interlocks, values that drive closed-loop control. A missed change here has real consequences.
- **Normal, 1 to 5 seconds:** running values like flow, pressure, temperature, current draw. They change all the time, but not in an instant. A two-second poll catches the trend without flooding the bus.
- **Slow, 30 seconds to a few minutes:** counters, runtime hours, setpoints. They change by operator action, or build up slowly enough that fast polling is pure waste.
- **Once, then cache:** nameplate data, firmware versions, calibration values. Read them at startup and never poll again.

To sort any tag, ask whether a delay changes a control decision or only the timestamp on a record. If it changes a decision, it goes on the fast tier. If it only changes a timestamp, it's telemetry and belongs slower. Then ask how many tags really need the fast path, because it's almost always far fewer than the number on it now. Most points in most systems are reads, and most of those reads are not urgent.

## A timeout is a measurement, not a guess

Once the rates are sorted, the next thing that turns a slow moment into a stall is the timeout, and people usually set it by guessing a round number.

Both directions hurt. Too tight, and the request fails the moment the device is busy. That fires a retry, which adds more traffic to an already busy link, which makes the next request more likely to fail too. Too loose, and the master sits stuck on a dead request far longer than it should, holding up everything behind it. Either way, you've made latency.

The way to set it is to measure the floor and add margin. The floor has three parts: time to send the request, the device's own processing time, and time to send the response back. Take a slow serial device. Eight milliseconds to send, seventy-five for the device to process, twenty-five for the response: about 108 ms before anything has gone wrong. A 100 ms timeout fails that read every time. A 150 ms timeout usually passes but fails under load, which is the worst case because it's hard to catch. A 250 ms timeout gives you real room. Find your floor, multiply by 1.5 to 2, and don't treat the margin as wasted time. It's the difference between a link that holds under load and one that drops frames when the device gets busy. The datasheet gives you a starting number. A protocol analyzer gives you the real one.

## The controller's scan time is borrowed, so spend it deliberately

Rates and timeouts are two settings, but step back and there's a simple idea underneath both. The PLC's first job is running the process, not talking to you. It works through a [fixed scan](/blog/2025/12/what-is-plc/#the-scan-cycle), and communication is squeezed in around the logic that actually drives the machine. Every request you send borrows time from that work. Set your rates and timeouts well and you're spending that borrowed time with care. Three habits waste it.

- **Polling more than you need.** This is the poll rate problem from the controller's side. A big set of points read at a fast rate burns budget on data that didn't need the rate, leaving less room for the data that does. Tiering isn't only about the bus. It gives the scan its time back.
- **Ignoring the connection limit.** Many devices accept only a few connections at once, sometimes as few as one to four. Point too many clients at one device, or fire too many requests at once, and the extras wait in line or get turned away. Over TCP that shows up as connections backing off on a timer that climbs through 250, 500, then 1000 ms. It looks like random network latency, but it's the device turning work away because it ran out of sockets. Know the limit and stay under it.
- **Stacking everything on one protocol.** Most PLCs run each protocol through its own driver and process, with its own share of resources. Put fast control data and high-volume telemetry on the same protocol and they fight over the same driver, so the fast path picks up the load from the slow path. It also helps to know which way each connection opens, whether the controller reaches out or something reaches in, because that changes how the work gets scheduled and what it costs.

## Match the protocol to the data, not the other way around

Even with a driver to itself, a protocol only holds a steady turn time if it was built to. Most of the common ones weren't, and trusting them to is its own mistake, separate from anything resources can fix.

Start with what each one is for:

- **MQTT** is pub/sub transport, built to move lots of telemetry, wrong for steady sub-loop response.
- **OPC UA** is strong for structured, modeled data and a poor fit for sub-100 ms control.
- **WebSocket** is light and often the quickest of the general-purpose options, but it makes no promise on turn time.
- **Modbus TCP** can hold steady low-millisecond reads in good conditions, but never as a hard promise.

None of these four guarantees delivery inside a fixed time window. They're non-deterministic by default.

A real-time protocol like EtherNet/IP, with an Ethernet controller that gives the packet priority on the wire, is the surest way to guarantee single-digit-millisecond turns. But it isn't the only way. You can hold reliable single-digit-millisecond timing over the non-deterministic protocols too, as long as the fast path carries a small payload and doesn't share a driver with the telemetry. The protocol sets the ceiling on what's easy to guarantee. How you handle the data decides what you actually reach.

So the answer is to give the time-critical path its own route, picked by testing which protocol that controller actually holds steady. Match the protocol to the data: let bulk telemetry ride a transport built for volume, and put the fast path on whatever gives it the most reliable turn time. And keep that fast path lean: carry only the points you need to make the decision, and fetch everything else after the fact from a database or a slower read. The fewer tags on the fast path, the steadier its turn time. Most slow links come from trusting one protocol to deliver timing it was never built to deliver.

## The steadiest timing is built at the source, not fixed downstream

Tiering, timeouts, and protocol splits all cut wasted time. But the steadiest timing comes from a change in where the work happens: do it in the PLC, at the source, instead of trying to fix it downstream over the network.

Start with sampling. If you need a fixed gap between readings, the network can't give it to you. MQTT won't, WebSocket won't, none of them will. Everything past the point where the signal is read is transport, and transport doesn't promise a fixed gap. So build the guarantee in at the source: have the controller sample at a fixed rate as it reads the signal, and stamp each reading with the time it was taken. Once a sample carries its own timestamp, it doesn't matter that the transport delivers it at an uneven pace, because the timing of the measurement is already saved. Trying to fix this by controlling when data lands over the wire is solving it in the wrong place.

That same move fixes the polling load. Instead of reading without pause, let the controller hold telemetry in a buffer and pull the buffer at the slower rate the data actually needs. The controller stops handling requests that never had to happen, and because each reading was already timestamped at the source, the slower, uneven pull never touches the timing of the data.

Then move the buffer in batches, not a trickle. Build an array, say a window of samples, each with a timestamp and value, and write the whole batch to a time-series database at once. These databases are built for batch writes, so this is far lighter on both the database and the controller than a stream of single writes. One thing to watch when you batch: build each request from registers that sit together. Stack points that are scattered across the register map into one request, and you force the device to read the dead space between them, or split the read into many small ones behind the scenes. Either way the cycle slows. Group points that are next to each other, and let the gaps fall on request edges.

And make sure the receiving end is built for the rate too. Reliability isn't only an upstream worry. A time-series database can take data at high speed, but feed it single writes at that speed and the cost climbs far above batched writes. Whatever takes the data, database, broker, or app, should be set up for the rate it's actually getting.

## The runtime isn't your variable

By the time poll rates, timeouts, protocol selection, and data handling are tuned, the runtime is just one fixed cost in the path, and a predictable one. FlowFuse runs Node-RED on Node.js rather than compiled embedded code, which adds a small overhead to each pass through a flow: a few milliseconds, the same every time. It doesn't drift over a long run, and it doesn't grow when a device on the line gets busy. A well-built flow holds low-millisecond timing all day.

That fixed cost is also a useful diagnostic. A constant few-millisecond add has no way to produce a swing of tens of milliseconds. So if your timing is swinging by that much, the cause is somewhere else, and it's almost always one of the four things this article has walked through: an overloaded poll rate, a timeout set by feel, a connection limit hit and ignored, or a protocol asked to guarantee timing it was never built to guarantee.

There's one case worth naming on its own. Node-RED runs as a single process with one event loop, so a heavy transform or a slow database write anywhere in that instance blocks everything else in it, including the fast path, every time it fires. Putting that work on a different tab doesn't change this, since tabs in the editor share the same event loop. That isn't the runtime being slow, it's two jobs sharing a process that shouldn't be shared. The fix is the one used everywhere else in this piece: give the fast path its own lane by moving the heavy work to a separate instance.

## Final thought

A slow PLC link is the configuration assuming the data is simpler than it is. One rate for data that moves at four different speeds. A timeout that's never been measured. A scan budget spent without counting. A protocol asked to promise what it was never designed to promise.

None of that is a tool problem. It's a mismatch between what the system expects and what the data actually needs. Close that gap, by how fast each tag changes, by what the wire actually measures, by what each protocol was actually built for, and the timing follows on its own.
