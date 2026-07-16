---
title: "Handling Clock Drift in Distributed Edge Devices"
subtitle: "Prevent clock drift in distributed edge deployments."
description: "Learn how to prevent clock drift on distributed edge devices using NTP, local time servers, and FlowFuse to ensure accurate timestamps and reliable IIoT data."
date: 2026-07-16
authors: ["sumit-shinde"]
image: /blog/2026/07/images/clock-drift-blog.png
tags:
  - flowfuse
meta:
  howto:
    name: "How to Synchronize Time Across Distributed Edge Devices"
    description: "Learn how to configure NTP, use local time servers, and monitor clock drift with FlowFuse to keep timestamps accurate across distributed edge devices."
    tool:
      - "FlowFuse"
      - "Node-RED"
      - "chrony"
      - "NTP"
    steps:
      - name: "Check which time synchronization service is running"
        text: "Determine whether your devices use chrony, ntpd, or systemd-timesyncd before making any configuration changes."
        url: "step-one-keep-device-clocks-synchronized"

      - name: "Configure an NTP client"
        text: "Configure chrony or another supported NTP client to synchronize the device clock with reliable time servers."
        url: "choose-an-ntp-client-deliberately"

      - name: "Configure multiple or local NTP servers"
        text: "Use multiple NTP servers for redundancy, or configure a local NTP server for air-gapped industrial networks."
        url: "use-multiple-time-sources"

      - name: "Synchronize devices in air-gapped networks"
        text: "Point edge devices to a local NTP server so every device shares the same time even without internet access."
        url: "air-gapped-networks-still-need-time-synchronization"

      - name: "Monitor clock drift with FlowFuse"
        text: "Create a FlowFuse flow that checks clock drift, generates alerts when thresholds are exceeded, and logs historical drift data."
        url: "monitoring-drift-from-flowfuse"

  faq:
    - question: "Why do edge device clocks drift?"
      answer: "Edge devices use hardware clocks that naturally gain or lose time. NTP periodically corrects this drift, but devices can become inaccurate if they lose access to a time server or don't have a working real-time clock."

    - question: "Can I use NTP without internet access?"
      answer: "Yes. In air-gapped environments, deploy a local NTP server inside the OT network and configure every edge device to synchronize with it."

    - question: "How accurate is NTP for industrial applications?"
      answer: "NTP typically keeps devices synchronized within a few milliseconds on a stable network, which is sufficient for historian logging, dashboards, OEE calculations, and most industrial monitoring applications."

    - question: "When should I use PTP instead of NTP?"
      answer: "Use PTP when your application requires sub-millisecond or microsecond synchronization, such as motion control, synchronized robotics, or sequence-of-events recording."

    - question: "How can I monitor clock drift in FlowFuse?"
      answer: "Use a Node-RED flow in FlowFuse to periodically run `chronyc tracking`, parse the clock offset, compare it against a threshold, and generate alerts or store the results for historical analysis."
cta:
  type: contact
  title: "Monitor and Manage Edge Devices with FlowFuse"
  description: "Deploy Industrial applications, monitor edge devices, detect clock drift, and manage industrial deployments from a single platform. See how FlowFuse simplifies managing distributed edge infrastructure."
tldr: "Clock drift is a common problem in distributed edge deployments and can lead to unreliable timestamps, out-of-order events, and inaccurate production data. This guide explains why clocks drift, how to keep devices synchronized using NTP or local time servers, when to use RTCs, and how to monitor clock drift in FlowFuse before it impacts your operations."
---

Edge devices keep their own clocks, and those clocks drift over time. The result is unreliable timestamps, out-of-order events, and inaccurate historical data.

<!--more-->

In this article, we'll look at why clock drift happens, how to keep device clocks synchronized, and how to communicate with a local time source.

## Why edge clocks drift

Every computer keeps time using a crystal oscillator. These crystals are accurate but not perfect: some run slightly fast, others slightly slow, and their accuracy changes with temperature and age. Two devices that start with the same time gradually drift apart.

That's the slow cause. In production, there are usually bigger reasons clocks become inaccurate.

### No real-time clock

Most servers and desktops include a battery-backed Real-Time Clock (RTC) that keeps time while the machine is powered off. Many low-cost edge devices don't.

The Raspberry Pi is the best-known example. After being powered off, it has no reliable way to remember the current time, so it must wait until it can reach a time server. Without network access, it may boot thinking it's days, months, or even years in the past.

The operating system doesn't know the time is wrong. It simply starts timestamping data with whatever time it believes is correct.

### No access to a time server

Most devices periodically synchronize with a time server to correct clock drift, but that isn't always possible in industrial environments. Many OT networks intentionally block internet access, and some are completely air-gapped.

If a device can't reach a trusted time source, it keeps relying on its own clock, drifting a little further each day. A few milliseconds won't matter. A few weeks or months usually will.

### Backup power doesn't last forever

Some industrial gateways include an RTC but use a supercapacitor instead of a battery to keep it running during power outages. That works well for short outages, but leave the device unpowered for several days or weeks and the capacitor eventually discharges, resetting the clock.

Some industrial Linux systems then fall back to the operating system build date or another fixed timestamp. That's why you'll occasionally find multiple devices reporting exactly the same incorrect date from years ago. If several devices suddenly think it's the same day in the past, it's usually a sign the backup clock has been lost.

Leave a fleet running long enough and the clocks won't agree anymore. Most devices will only be slightly off, while a few can end up completely wrong.

## What drift does to your data

Clock drift rarely causes obvious failures. Devices stay online, messages keep arriving, and dashboards still update. The timestamps just quietly become unreliable, and by the time anyone notices, the root cause is hard to trace.

Events start appearing in the wrong order. If one PLC reports a motor stop, another an emergency stop, and a third a conveyor jam, but their clocks disagree, the sequence you see may not match what actually happened.

Data also lands in the wrong time bucket. A reading stamped a few seconds late can fall into the wrong aggregation window and quietly skew averages, production counts, and OEE calculations. The timestamp isn't invalid, just inaccurate.

Cross-machine correlation suffers too. Comparing robot cycles with conveyor speed only works when every device shares the same timeline, and drift breaks that.

The mistake to avoid is replacing the device timestamp with the server timestamp on arrival. It works fine until the network drops. If a device buffers an hour of data and uploads it at once, overwriting the timestamps makes an hour of production appear to happen in seconds. The server timestamp says when the message arrived; the device timestamp says when the event happened. Keep both: use the device timestamp as event time, and the server timestamp only for latency or delay detection.

## Step one: keep device clocks synchronized

The best place to solve clock drift is the operating system. If the device clock stays accurate, every application running on that device benefits. If the clock is wrong, no amount of application logic can completely fix it.

Before changing anything, check what's actually running on your devices. Fleets are rarely uniform — different hardware vendors, OS images, and firmware versions often ship with different defaults, so it's worth confirming rather than assuming:

```bash
which chronyc    # chrony present?
which ntpq       # classic ntpd present?
timedatectl show-timesync --all   # systemd-timesyncd, on many minimal images
```

Whichever client is present, the underlying goal is the same: keep it pointed at a reliable source and give it a way to hold accurate time across reboots and network outages.

### Choose an NTP client deliberately

On many modern Linux distributions, **chrony** is the default and has largely replaced the older **ntpd** service. It tends to suit edge environments well: it synchronizes quickly after boot, keeps tracking clock drift while offline, and recovers cleanly when the network becomes available again. But it isn't universal — some minimal or vendor-specific images ship with `ntpd`, `systemd-timesyncd`, or nothing at all. Check first, and install or switch only if it makes sense for your fleet.

If you do use chrony, a basic configuration is enough for most deployments:

```bash
# /etc/chrony/chrony.conf
pool pool.ntp.org iburst
driftfile /var/lib/chrony/drift
makestep 1.0 3
rtcsync
```

### Use multiple time sources

Avoid relying on a single time server. If that server has the wrong time or becomes unavailable, every device depending on it inherits the problem.

Using several independent time sources lets your NTP client compare responses, ignore outliers, and maintain a more reliable clock.

### Air-gapped networks still need time synchronization

No internet doesn't mean you have to give up on NTP. A common approach is to run a local time server inside the OT network and point every edge device to it — the protocol doesn't change, so this is just a matter of replacing the public pool entry in each device's config with the local server's IP address (`server 10.0.5.10 iburst` in place of `pool pool.ntp.org iburst`, whether the client is chrony or ntpd).

Even if that server isn't synchronized with the internet, every device will at least agree on the same time. For most industrial applications, consistent timestamps across the plant are far more important than perfect UTC accuracy. If accurate wall-clock time is required, that local server can be synchronized using GPS or another external reference.

### Add a real-time clock where possible

If your hardware doesn't include an RTC, consider adding one. For devices like the Raspberry Pi, an inexpensive battery-backed RTC module lets the system boot with the correct time even before the network is available.

This is especially useful for devices that power on, perform a task, and shut down again before NTP has a chance to synchronize.

Keeping the operating system synchronized solves most clock drift issues. The next step is making sure your application preserves the correct timestamps and alerts you when a device starts drifting.

## Monitoring drift from FlowFuse

If FlowFuse is already running on your edge devices, it's a convenient place to turn "is this clock still trustworthy?" into an alertable signal, instead of something you only discover after the data's already wrong. The flow below works with chrony; if a device runs ntpd instead, swap the command in step 2 for `ntpq -p` and adjust the parsing in step 3 to match its output format.

1. Add an inject node to the canvas, name it "Check clock every 5 min", and set it to repeat on an interval of 5 minutes. Drift is a trend, not a single reading, so a one-off check won't tell you whether the offset is growing.

2. Add an exec node after it, name it "Get chrony offset", and set the command to:

```bash
chronyc tracking
```

This pulls the actual offset from the OS rather than estimating it, including how well the clock is disciplined, not just what time it currently reports.

3. Add a function node after the exec node, name it "Parse offset", and set it to:

```javascript
const lines = msg.payload.split('\n');
const data = {};
lines.forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) data[key.trim()] = rest.join(':').trim();
});

const parseOffset = (v) => v ? parseFloat(v) * 1000 : null; // to ms

msg.payload = {
    stratum: parseInt(data['Stratum']),
    lastOffsetMs: parseOffset(data['Last offset']),
    rmsOffsetMs: parseOffset(data['RMS offset']),
    leapStatus: data['Leap status'],
    timestamp: new Date().toISOString()
};
return msg;
```

`stratum` tells you how many hops this device is from a reference clock, rising over time can mean it's fallen back to a worse source. `leapStatus` should read `Normal`, anything else means don't trust this reading at all, treat it as a hard failure rather than "slightly off."

4. Add a switch node after the function node, name it "Over threshold?", checking `payload.lastOffsetMs`. Set the threshold to match what the data is actually used for, not an arbitrary number:

| Use case | Alert threshold |
|---|---|
| Historian logging, dashboards, OEE, production reporting | 500ms–1s |
| Cross-machine event correlation (PLC sequencing, alarm ordering) | ~50–100ms |
| Anything needing sub-millisecond precision | Not a job for NTP — see PTP below |

5. Wire the switch node's failing branch to a function node, name it "Build alert", and have it construct a message identifying the device, the offset, and the stratum.

6. Wire that to wherever your alerts already go, an MQTT topic, or existing Slack/email nodes.

7. Wire the output of step 3 (Parse offset) to a database node, an InfluxDB or SQLite node works fine, so every reading gets logged, not just the ones that fail the threshold. The useful signal is the offset trend per device over time, not a single alert; this is what lets you catch a clock that's degrading before it crosses the line.

Deploy, and trigger the inject node manually once. You should see a parsed offset reading in the debug sidebar, and a row written to your drift-history store if you added step 7.

## How accurate does your clock need to be?

Not every industrial application needs microsecond precision. For most use cases, such as historian logging, dashboards, OEE calculations, condition monitoring, and production reporting, NTP provides more than enough accuracy. With a stable network, a well-configured NTP client can typically keep devices synchronized within a few milliseconds. That's already far more accurate than applications aggregating data into one-second or one-minute intervals require.

PTP (Precision Time Protocol) is a different story. It's designed for applications where events must be synchronized with sub-millisecond or even microsecond precision, such as motion control, synchronized robotics, or sequence-of-events recording in power systems. PTP requires compatible hardware and network infrastructure, making it more complex to deploy.

If your application doesn't have strict timing requirements, NTP is usually the simpler and more practical choice.

## Wrapping up

Clock drift is one of those problems that's easy to ignore until it starts affecting production data. Devices keep running, dashboards continue updating, and messages still arrive, but inaccurate timestamps make troubleshooting, event correlation, and reporting increasingly difficult.

Fortunately, preventing it doesn't require complex infrastructure. A reliable NTP client, multiple or local time sources, and hardware with a real-time clock where appropriate will eliminate most clock synchronization issues. Just as importantly, preserve the original device timestamps instead of replacing them with server timestamps, and monitor clock drift so problems are detected before they affect your data.

FlowFuse makes this easier by giving you a central place to deploy Node-RED applications, monitor edge devices, and build flows that continuously check clock health across your fleet. Instead of discovering bad timestamps after they've corrupted historical data, you can identify drifting devices early and fix them before they impact operations.

As your edge deployment grows from a handful of devices to hundreds, keeping every device on the same timeline becomes essential. Accurate clocks lead to accurate data, and accurate data leads to better operational decisions.
