---
title: "Shop-Floor Demos"
---
# Shop-floor monitoring demos

As a manufacturing iPaaS provider, AI and feature development needs to be constantly tested in scenarios as close as possible to real world usage. This helps quicker iteration on our AI application-building capabilities, and shows external stakeholders and future customers the capabilities FlowFuse has and the pace of our development.

Two outputs are required from this program:

1. Footage we can put in front of prospects and users, showing the platform being used end to end.
2. GitHub issues for **every** point of friction found. With it, the AI engineering team can rank what to fix now, next month, and later.

## Recording and Filming

### What is being demo'd

First and foremost, the product is being tested, not the person filming. The demo tests how long it takes one person, using AI and the platform as they exist today, to go from an empty team to a working monitored line.

Secondly, the demo is building an application as described later on this page. It takes one hour and the recording is a point-to-point representation: no editing, one take. A demo takes an hour, unless the complete result was achieved sooner. If the full demo cannot be built in an hour, that is a valid result, as it shows where time can be gained.

### Rules for the demo

1. One take. No pauses, no second take when things go south. The product fails if/when things go wrong; that's not the recorder's fault, it shows what went right and wrong.
2. Start from the empty team, on camera. Show it is empty.
3. Use only what's available to customers too.
   - Yes:
     - Blueprints
     - FlowFuse Expert / third-party MCP
     - Docs
     - Google / ChatGPT
   - No:
     - Pre-made flows / snapshots
     - Content you have access to but new users don't
     - Slack hotline to other engineers during the demo
4. Narrate what you want to achieve, think, hope to get as a result. Verbalize details you read and pick up on, or details you wanted to see/read but are missing.
5. When you leave the product — opening the docs, a Google search, initiating a terminal SSH session, or so — record these too.

### Setup the demo

1. Install OBS, ensure you can record your screen and audio (see also OBS settings below).
2. Turn on "Do Not Disturb". Ensure your notifications are off, chat and mail closed, no customer names, tokens, or credentials visible at any point. Nothing is edited afterwards, so anything on screen is published.
3. A fresh team, empty, on the tier a customer would have. No pre-existing instances, no library content you made earlier.
4. A data source ready. Do not use random or simulated values — step through the hard part of connecting to the data source. Use real hardware with protocols like:
   1. Modbus TCP
   2. OPC-UA
   3. MQTT + legacy protocol

### OBS settings

OBS is open source video/audio capture software that's great for this demo. Record at least your screen and audio; having your webcam recording would be appreciated.

The settings to work with:

- 1920x1080, 30 fps, full screen capture of the display you will work on.
- Recording format MKV, remux to MP4 afterwards.
- Quality: CRF 20 or 6000 kbps, hardware encoder if available.
- Microphone on a separate audio track. Narration is required.
- Check free disk space is above 20 GB before starting.
- Record, do not stream.

### Post-demo action items

#### GitHub issues

The list of blockers you ran into, or items to smooth over, should each have an attached issue. Many issues are likely already reported and being scheduled — search for those issues and leave a comment *for each demo you ran into this issue* so engineers can resolve it. Keep a list of the issues.

#### Upload the recording

1. Remux to MP4. Name it `DEMO_<application>_<yourname>_<YYYYMMDD>.mp4`.
2. Upload the raw file to our internal Google Drive. Do not edit or trim.
3. Clean up the team, and other created assets that were part of the demo.
4. Post the list of issues in a text file next to the demo.

#### Iterate on this page

Help other team members by answering any questions you had to figure out yourself to complete your demo, and add them to the handbook. Update the script where possible, and where you can make it more realistic.

#### Ping ZJ

ZJ will review each demo, and the issues we ran into. Point him to the directory where your recording is. If there's a blocker or must-fix item, let him know directly so it can be actioned prior to watching the full demo.

## Scripts for applications to build

Each demo builds one of the following applications. The applications to build are always stretch goals, and it's unlikely that you can completely achieve the full spec and requirements. If you record multiple demos, do not start a second demo of the same application until all scripts have been covered. Each application is mapped to a different data-acquisition pattern on purpose, so the program exercises Modbus, OPC UA, MQTT, serial, and REST/file ingestion.

### Line OEE monitoring

**What it is:** Availability, performance, and quality per line or machine, against a work order.

**Shop-floor sources:**
- PLC tags over Modbus TCP (FlowFuse certified Modbus node) or OPC UA: run/stop bit, part counter, reject counter, cycle counter.
- Ideal cycle time and planned quantity from ERP or MES, pulled over REST or read from a shared file/table.
- Shift calendar and planned downtime as configuration.

**Dashboard:**
- Top row: current OEE %, and A / P / Q as three separate figures. Never show a single OEE number without its three components.
- Shift-to-date bar: good count, reject count, target count, projected end-of-shift count.
- Line state timeline for the current shift: running / stopped / changeover / planned down, as a colour band, not a chart of raw booleans.
- Pareto of downtime reasons for the shift and for the last 7 days.
- Drill path: plant → line → machine → event list. Three clicks maximum to a raw event.

**Alerting:**
- OEE below target for a continuous 15 minutes: notify line supervisor.
- Projected end-of-shift count below plan by more than 5%: notify at the shift midpoint, not continuously.
- Counter frozen while the run bit is true for more than 2 cycle times: notify maintenance; this is usually a sensor fault, not a production fault.

### Downtime capture with operator reason codes (andon)

**What it is:** Automatic stop detection, operator classification of the stop, escalation while the line is down.

**Shop-floor sources:**
- Stop detection from the same PLC run bit, with a debounce so micro-stops under a configured threshold are aggregated rather than raised individually.
- Operator input from a tablet or panel PC at the line, served by the Dashboard on the edge instance.
- Optional stack-light input via digital IO where the PLC is not accessible.

**Dashboard (two distinct surfaces):**
- Operator surface: large touch targets, one question at a time, reason code tree of no more than three levels, free-text comment optional. Must work offline against the local instance and must render on a 10-inch screen.
- Supervisor surface: all lines, current state, minutes down, unclassified stops count, open escalations.

**Alerting:**
- Stop exceeding the configured threshold: raise an andon event immediately.
- No operator classification within 5 minutes of a stop: escalate to shift lead.
- Down for 20 minutes: escalate to maintenance lead. 45 minutes: escalate to plant manager.
- Escalation stops the moment the line restarts; it does not require manual clearing.

### Energy and utilities monitoring

**What it is:** Electricity, compressed air, gas, and water consumption per machine, line, or zone, with cost and per-unit-produced normalisation.

**Shop-floor sources:**
- Modbus RTU/TCP energy meters (serial via the Device Agent on the line gateway is the common real-world case).
- Pulse counters for air and water on digital inputs.
- Tariff and cost data from configuration or a REST endpoint.

**Dashboard:**
- kWh today, this shift, this month, each against the same period previous.
- kWh per good part produced. This is the number that gets budget approved; it requires the counter from line OEE monitoring, so the demo must join two sources.
- Load profile for the last 24 hours at 1-minute resolution, with shift boundaries marked.
- Baseload figure: consumption during non-production hours. Show it explicitly.
- Ranking of machines or zones by consumption and by consumption per part.

**Alerting:**
- Baseload above threshold for 30 minutes outside production hours: notify facilities the next working morning, not at 02:00.
- Demand approaching the contracted peak: notify immediately, this one is expensive.
- Compressed air flow above zero while the line is idle: leak indication, daily digest is sufficient.

### Quality and in-process SPC

**What it is:** In-line measurements captured, charted, and checked against control and specification limits.

**Shop-floor sources:**
- Measurement devices over serial or TCP (gauges, scales, vision systems) writing strings that need parsing.
- OPC UA tags where the measurement is computed in the PLC.
- Part and order identifiers joined from the line controller, so measurements are traceable to a work order.

**Dashboard:**
- Control chart (X-bar / R or individuals) per characteristic, with UCL/LCL and specification limits shown as separate lines. Specification and control limits must be visually distinct.
- Cp and Cpk for the current run.
- Last 50 measurements as a table with timestamp, value, order, operator.
- Histogram against specification limits.

**Alerting:**
- Point outside specification: immediate, to quality and to the line.
- Western Electric rule violations (run of 7, trend of 7, 2 of 3 beyond 2 sigma): notify quality only. These are process signals, not part failures, and must not go to the operator as alarms.
- Measurement stream silent for longer than the expected sampling interval: notify, the gauge has probably been unplugged.

### Condition monitoring and maintenance triggers

**What it is:** Equipment health from vibration, temperature, motor current, and runtime, converted into maintenance actions.

**Shop-floor sources:**
- Sensors publishing MQTT (frequently Sparkplug B) or read over Modbus.
- Runtime hours accumulated from the run bit.
- Existing CMMS over REST for work order creation.

**Dashboard:**
- Asset list with a single health state per asset, plus the reason for that state.
- Trend per measurement with the alarm and warning thresholds drawn on the chart.
- Runtime hours since last service, against service interval, as a progress figure.
- Last 10 threshold crossings per asset.

**Alerting:**
- Warning threshold crossed and held for 10 minutes: create a CMMS work order, do not page anyone.
- Alarm threshold: notify maintenance immediately.
- Runtime approaching service interval at 90%: weekly digest.
- Rate-of-change alerts are more useful than absolute thresholds for bearing temperature; include at least one in the demo.
