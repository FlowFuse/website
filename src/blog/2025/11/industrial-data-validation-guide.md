---
title: "How to Protect Your Factory From Bad Data: A Must-Have Read for IIOT"
subtitle: "How to validate industrial data before it enters your systems."
description: 
date: 2025-11-26
authors: ["sumit-shinde"]
image: 
keywords: 
tags:
    - flowfuse
---

Bad data quietly corrupts production analytics, triggers false equipment alarms, and causes automation systems to make faulty control decisions. Unlike system crashes, these issues go unnoticed until they've already propagated through your operations—affecting multiple processes and causing unexpected shutdowns or production anomalies.

<!--more-->

This article shows you how to build a data validation gateway using FlowFuse that stops bad data before it reaches your critical systems. You'll implement validation checkpoints, establish quality rules, and configure alerts, creating a protective barrier that ensures only reliable data flows into your production environment.

Below is a short video demonstration of the data validation gateway we'll be building together.

<!-- todo -->

## The Problem with Trusting Your Data

Most industrial applications assume incoming data is valid—temperature sensors send numbers between 0-100°C, MQTT messages contain properly formatted JSON, PLC status codes follow documented formats. There's usually no validation checking if these assumptions hold true.

This works until it doesn't. Sensors drift out of calibration. Network issues corrupt packets. Firmware updates change data formats without warning. When these things happen, bad data flows straight through unchecked.

Consider a temperature sensor sending `{"temp": 72.5, "unit": "C"}`. Then electromagnetic interference corrupts transmission, and your system receives `{"temp": "ERR", "unit": "C"}`. Your code tries to do math with "ERR"—it fails silently, throws an exception, or worse, coerces "ERR" to NaN or 0. Now you're making decisions based on garbage data without realizing it.

Scale makes this worse. With hundreds of sensors, multiple PLCs, edge gateways, and third-party integrations sending data continuously, quality issues aren't occasional—they're constant. You spend more time troubleshooting data problems than actual equipment problems. Reports contain incorrect numbers. Predictive models make bad predictions from corrupted training data.

The solution isn't hoping for perfect data—it's validating it explicitly. That's what we're building in this guide.

## Understanding Data Quality

Before we build anything, we need to answer a simple but critical question:

**What makes data "good"?**

This isn't about what data you collect or which machine it comes from. It's about whether the data is **reliable enough to drive decisions without causing chaos**.

Good data enables confident automation and informed decision-making.

Bad data misleads—and when your automation acts on misleading information, your team and operations pay the price.

To build effective validation, you need to check multiple dimensions of data quality. Some key aspects include:

- **Type Correctness**: Is the temperature a number or the string "ERR"?
- **Completeness**: Are all required fields present?
- **Range Validation**: Is the temperature between 0-100°C or an impossible 500°C?
- **Format Consistency**: Is the timestamp in ISO 8601 format or some custom format?

These aren't rigid categories—they're lenses through which you examine your data. Real validation often combines several of these checks together.

## Building Your Data Quality Checker

Now that we understand what "good data" looks like, let's build guardrails to enforce it. In this section, we'll create a FlowFuse workflow that validates every incoming value before it enters your system and sends alerts so you can take action.

> Before we start, make sure you have a running FlowFuse instance that is collecting data. If you don't have a real data source, don't worry—we'll provide a simulated setup as well. Just make sure you have a FlowFuse account and instance running. If you don't have an account, create one now with our [free trial](https://app.flowfuse.com/account/create/).

### Installing the JSON Schema Validator Node

For our validation system, we'll use [JSON Schema](https://json-schema.org/), a powerful, industry-standard way to define what valid data should look like. Think of it as a contract that your data must fulfill before entering your system.

JSON Schema lets you specify exactly what fields should exist, what types they should be, what ranges are acceptable, and what formats are required. Instead of writing dozens of if-statements to check each condition, you define the rules once in a schema, and the validator does the heavy lifting.

To get started, install the `node-red-contrib-json-full-schema-validator` node in your FlowFuse instance:

1. Open your FlowFuse instance
2. Click the hamburger menu (three horizontal lines) in the top right
3. Select **Manage palette**
4. Go to the **Install** tab
5. Search for `node-red-contrib-json-full-schema-validator`
6. Click **Install** next to the node

Once installed, you'll find the "json-schema-validator" node in your palette under the function category.

### Creating Your First Validation Schema

Let's start with a practical example—validating temperature sensor data from a manufacturing line. Here's what we expect our sensor to send:

```json
{
  "temp": 72.5,
  "unit": "C",
  "sensor_id": "TEMP_LINE_01",
  "timestamp": "2025-11-21T10:30:00Z"
}
```

Now let's create a JSON Schema that validates this structure:

```json
{
  "type": "object",
  "required": ["temp", "unit", "sensor_id", "timestamp"],
  "properties": {
    "temp": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "description": "Temperature reading in specified unit"
    },
    "unit": {
      "type": "string",
      "enum": ["C", "F"],
      "description": "Temperature unit (Celsius or Fahrenheit)"
    },
    "sensor_id": {
      "type": "string",
      "pattern": "^TEMP_[A-Z0-9_]+$",
      "description": "Sensor identifier following naming convention"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 formatted timestamp"
    }
  },
  "additionalProperties": false
}
```

Let's break down what this schema validates:

- **Type Safety:** temp must be number (catches "ERR", null, undefined)
- **Required Fields:** All 4 must exist (catches incomplete messages)
- **Range Limits:** 0-100°C (catches sensor drift, spikes)
- **Format Rules:** ISO timestamps, TEMP_* naming (catches config errors)

The `additionalProperties: false` line is particularly important—it rejects any data with unexpected fields, preventing schema drift over time.

#### Building the Validation Flow

Now let's build the complete validation flow:

1. Drag in your data input node such as MQTT In node, HTTP In node, or Inject node (for testing)

2. Drag the **JSON Full Schema Validator** node into your flow

3. Double-click the validator node and paste your JSON schema into the schema field.

![JSON Schema Validator node configured with schema rules](./images/json-validator.png){data-zoomable}
_JSON Schema Validator node configured with schema rules_

4. The validator node has two outputs:
   - **Output 1**: Valid data that passes all schema checks
   - **Output 2**: Invalid data that fails validation
   
When validation fails, the node adds a `msg.error` property as an array, where each item provides detailed information about what went wrong (missing fields, incorrect types, out-of-range values, etc.)

5. Connect Output 1 to your normal processing pipeline (database writes, dashboards, automation logic)

6. Connect Output 2 to an error handler that, Logs the error details (check `msg.error` for specific validation failures)

### Testing Your Validator

Time to test your validator. We'll use the temperature sensor schema from above, but you can follow these same steps with any schema you create. Just make sure your test payload matches what your schema expects—same field names, correct data types, and proper structure. Then you can tweak the values to trigger validation failures and see how your error handling responds. 

Add an **Inject** node with this valid payload:

```json
{
  "temp": 72.5,
  "unit": "C",
  "sensor_id": "TEMP_LINE_01",
  "timestamp": "2025-11-21T10:30:00Z"
}
```

This passes all checks and routes to your valid data handler.

Now test with bad data:

```json
{
  "temp": "ERR",
  "unit": "C",
  "sensor_id": "TEMP_LINE_01",
  "timestamp": "2025-11-21T10:30:00Z"
}
```

This fails because temp is a string instead of a number, routing to your error handler. The `msg.error` output shows exactly what's wrong:

```json
{
  "keyword": "type",
  "dataPath": ".temp",
  "schemaPath": "#/properties/temp/type",
  "params": {
    "type": "number"
  },
  "message": "should be number"
}
```

These detailed error messages eliminate guesswork. You see the field, the problem, and where validation failed.

Test additional scenarios to see how the validator catches different issues:

**Missing required field:**
```json
{
  "temp": 72.5,
  "unit": "C",
  "timestamp": "2025-11-21T10:30:00Z"
}
```

**Out of range value:**
```json
{
  "temp": 150,
  "unit": "C",
  "sensor_id": "TEMP_LINE_01",
  "timestamp": "2025-11-21T10:30:00Z"
}
```

**Invalid enum value:**
```json
{
  "temp": 72.5,
  "unit": "K",
  "sensor_id": "TEMP_LINE_01",
  "timestamp": "2025-11-21T10:30:00Z"
}
```

Each failure produces specific error messages that pinpoint the exact issue.

## Setting Up Error Alerts

Now that your validator is catching bad data on Output 2, let's set up Telegram notifications so you get instant mobile alerts whenever validation fails.

### Installing the Telegram Node

First, install the Telegram node from the palette:

1. Click the **hamburger menu** (three horizontal lines) in the top right
2. Select **Manage palette**
3. Go to the **Install** tab
4. Search for `node-red-contrib-telegrambot`
5. Click **Install** next to the node
6. Wait for installation to complete

Once installed, you'll find the "telegram sender" and "telegram receiver" nodes in your palette.

### Creating Your Telegram Bot and Getting Your Chat ID

Before you can send alerts, you need to create a Telegram bot and get your Chat ID. We have a detailed guide that walks you through the entire process: [Follow our complete Telegram setup guide](/node-red/notification/telegram/#creating-a-bot-in-telegram)

Once you have your **bot token** and **Chat ID**, come back here to continue with the alert setup.

### Create the Alert Message

Now we'll format the error information into a clear Telegram message.

1. Find your validator node (the JSON Schema Validator)
2. Look at its **second output** (the bottom one),  this is where bad data with error comes out
3. Drag a **function** node onto the canvas
4. Connect it to the validator's **second output**.
5. Double-click the function node to open it
6. Change the **Name** at the top to: `Format Alert` and add following javascript:

```javascript
// Get error information
const errors = msg.error || [];
const badData = msg.payload || {};

// Build error list
let errorText = "";
errors.forEach((err, index) => {
    errorText += `${index + 1}. Field: ${err.dataPath || 'unknown'}\n`;
    errorText += `   Problem: ${err.message}\n\n`;
});

// Get current time
const time = new Date().toLocaleString();

// Build the alert message
msg.payload = {
  chatId: "PUT_YOUR_CHAT_ID_HERE",
  type: "message",
  content: `🚨 DATA VALIDATION FAILED

Time: ${time}
Sensor: ${badData.sensor_id || 'Unknown'}

ERRORS FOUND:
${errorText}

BAD DATA:
${JSON.stringify(badData, null, 2)}`
};

return msg;
```

1. Find the line `chatId: "PUT_YOUR_CHAT_ID_HERE"`
2. Replace `PUT_YOUR_CHAT_ID_HERE` with your actual Chat ID.
3. Click **Done**
4. Drag **telegram sender** node onto the canvas
5. Connect your **Format Alert** function node to the **telegram sender** node
6. Double-click the **telegram sender** node
7. Click the **+** icon next to **Bot** to add your bot configuration
8. Paste your **Bot Token** that you got from BotFather
9. Give it a name like "Factory Alert Bot"
10. Click **Add**, then **Done**
11. Click **Deploy**

Now test your setup by triggering a validation failure. You should receive an instant Telegram message showing exactly what went wrong, which sensor failed, and the complete error details.

## Wrapping Up

You now have a working validator that stops corrupted data before it reaches your dashboards and automation logic. Bad sensor readings, malformed payloads, missing fields—your system catches them all and sends you detailed Telegram alerts the moment validation fails.

Pick one critical data source and deploy your validator there first. Watch how it performs, adjust your schema based on real patterns, then roll it out to additional sources. Apply this approach everywhere data enters your system—MQTT streams, API endpoints, PLC connections. You'll shift from constantly troubleshooting mysterious failures to preventing them entirely.

Pay attention to your validation metrics. High failure rates from specific sensors signal equipment problems. Recurring error patterns reveal network issues or configuration drift. Your validator becomes can also be an early warning system for operational problems.

The validation patterns you build today make your automation trustworthy tomorrow.

Want to learn how FlowFuse helps you collect, transform, and visualize industrial data while bridging IT and OT systems, reducing costs, and improving operational efficiency? [Contact us](/contact-us/) or [Book Demo](/book-demo/)