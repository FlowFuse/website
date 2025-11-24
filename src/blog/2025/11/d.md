---
title: "How to Protect Your Factory From Bad Data: A Must-Have Read for Manufacturing"
subtitle: "How to validate industrial data before it enters your systems."
description: 
date: 2025-11-21
authors: ["sumit-shinde"]
image: 
keywords: 
tags:
    - flowfuse
---

Bad data is like a silent assassin in manufacturing operations—it corrupts your production analytics, triggers false equipment alarms, and makes your automation systems act erratically. One minute your line is running smoothly, the next your SCADA dashboard shows impossible sensor readings or your PLCs are making control decisions based on faulty data.

<!--more-->

In this article, you'll build a production-grade data quality checker using FlowFuse that validates and monitors your industrial data streams in real-time. You'll learn how to catch bad data before it impacts production and set up intelligent alerts when data quality drops below acceptable thresholds.

## The Problem with Trusting Your Data

Most industrial applications assume the data they receive is valid. Your flow expects temperature sensors to send numbers between 0-100°C. Your dashboard assumes every MQTT message contains a properly formatted JSON object. Your automation logic trusts that PLC status codes follow the documented format. There's usually no validation checking if these assumptions actually hold true.

This works fine until it doesn't. Sensors drift out of calibration. Network issues corrupt packets during transmission. A firmware update changes the data format without warning. An edge device loses connection and starts sending error messages instead of sensor readings. When these things happen, the bad data flows straight through your system unchecked.

Consider what happens with a simple temperature sensor. It's been working fine for months, always sending values like `{"temp": 72.5, "unit": "C"}`. Then one day, electromagnetic interference from a nearby motor causes a transmission error, and your system receives `{"temp": "ERR", "unit": "C"}`. Your code tries to do math with "ERR", fails silently or throws an exception, and now your entire monitoring flow is broken. Or worse, it coerces "ERR" to NaN or 0, and you're making decisions based on garbage data without realizing it.

The same pattern repeats across your infrastructure. An OPC-UA server returns null when it loses connection to a device, but your flow treats null as zero. An API response changes from returning integers to floats, breaking your validation logic. A JSON payload arrives incomplete because of packet loss, missing the fields your application needs. Timestamps come in different formats from different systems, making it impossible to correlate events accurately.

What makes this particularly problematic is scale. One sensor sending bad data occasionally is manageable. But in a real manufacturing environment, you might have hundreds of sensors, multiple PLCs, several edge gateways, and various third-party integrations all sending data continuously. With that many sources, data quality issues aren't occasional—they're constant. Sensors malfunction, networks hiccup, protocols mismatch, and formats drift.

Without proper validation, you end up spending more time troubleshooting data issues than actual equipment problems. Your team investigates alerts that turn out to be sensor glitches. Your reports contain incorrect numbers because some records were incomplete. Your predictive maintenance model makes bad predictions because it was trained on corrupted data. The system you built to improve operations becomes a source of confusion and wasted effort.

The solution isn’t to hope for perfect data — it’s to stop trusting data by default and start validating it explicitly. And that’s exactly the kind of data validation flow we’re building in this guide.

## Getting Started

Before we build anything, we need to answer a simple but critical question:

**What makes data “good”?**

This isn’t about what data you collect or which machine it comes from. It’s about whether the data is **reliable enough to drive decisions without causing chaos**.

Good data helps you automate confidently.

Bad data lies… and when your automation trusts those lies, operations suffer.

To separate trustworthy data from the troublemakers, we focus on four core pillars of data quality:

1. **Type Correctness**
2. **Completeness**
3. **Range Validation**
4. **Format Consistency**

Worry not, we’ll break each of these down with practical, real-world examples so you can apply them immediately.

### Prequsite

Before we start, make sure you have a running FlowFuse remote instance on your edge that is collecting data. If you don't have a real data source, don't worry—we'll have a simulated setup for that as well. Just make sure you have a FlowFuse account and instance running. If you don't have account, create now with our [free trial](https://app.flowfuse.com/account/create/).

### Building Your Data Quality Checker

Now that we know what “good data” should look like, let’s start putting guardrails in place. In this section, we’ll build a FlowFuse workflow that checks every incoming value before it enters your system — no more silent failures, no more ghost alarms.





