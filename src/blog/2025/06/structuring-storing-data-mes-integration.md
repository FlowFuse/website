---
title: "Structuring and Storing Data for Effective MES Integration"
subtitle: Making Factory Data Tell the Right Story for Your MES
description: Learn how to organize, structure, and store your factory data effectively to make your Manufacturing Execution System (MES) work at its best with FlowFuse.
date: 2025-06-18
authors: ["sumit-shinde"]
image:
keywords:
tags:
   - flowfuse
---

Collecting factory data for your MES is just the first step. If that data isn't properly organized, cleaned, and stored, it's a jumbled mess, leading to missed opportunities and wasted investments in your MES.

MES is critical today, and its potential shouldn't be wasted by disorganized, "dump" information. Getting your factory data in order with a clear plan directly impacts your business's success, allowing your MES to quickly find, understand, and compare information. This streamlines operations, cuts costly errors, and empowers confident decisions, boosting production, reducing costs, and improving quality. Without structured, accurate, and immediately ready data, collecting it becomes a waste of time and money.

<!--more-->

FlowFuse simplifies [live factory data acquisition](/blog/2025/06/data-acquisition-for-mes/), and now it's time to make that data work harder. This article dives into best practices for structuring and storing factory data, helping you maximize your MES's performance and turn raw information into a powerful tool.

## Core Strategies for Structuring Your Factory Data

Now that we understand the importance of data structuring, let's explore how to achieve it. This involves giving your data a clear shape and defining rules, ensuring that every system, that is part of your MES, can easily interpret the meaning of each piece of information.

Here are some straightforward ways we get data structred:

* **Making a Plan for Your Data (Data Modeling):** This is like drawing a simple map for your data. It helps you decide exactly what pieces of information you'll collect (like machine temperature, how many items are made, or who operated the machine) and how they connect to each other. This keeps everything neat and consistent. For example, a data model might say that every "production run" must have a "start time" and an "end time." This makes sure your MES always gets the full picture and avoids confusing or incomplete information.

* **Speaking the Same Language (Standardizing):** Imagine if everyone in your factory used different words for the same thing. It would be confusing! Standardizing means always using the same names, units, and formats everywhere. For example, if you measure temperature, always use Celsius. If one machine sends "TempC" and another just "Temperature," standardizing ensures both are read as "Temperature in Celsius." This prevents your MES from getting confused by different terms for the same data.

* **Adding the Full Story (Contextulization):** A raw number like "100" by itself doesn't tell you much. But if you add "100 items made by Machine A on June 10th at 2:00 PM in Batch 123," suddenly you know the whole story! This means attaching important details like the exact time, the machine's name, the batch number, or who was working at that moment. This extra information makes raw numbers meaningful, so your MES can track things accurately and you can make smarter decisions based on the full picture.

## How FlowFuse Brings Your Data Strategy to Life

FlowFuse simplifies data structuring with its intuitive, drag-and-drop environment. Raw machine data—often just numeric signals—can be enriched, formatted, and organized in real time, **without writing any code**.

You can easily:

* Add timestamps to readings
* Associate data with specific machines or lines
* Convert units (e.g., Fahrenheit to Celsius)
* Rename fields for consistency

FlowFuse comes with standard tools called **nodes**, like `split`, `change`, `join`, and `switch`. These let you visually tell FlowFuse how to transform your data. These nodes handle all the technical work for you. You just connect the blocks that clean your data, add context, and prepare it for use in monitoring dashboards or other industrial applications.

Another simple and powerful node allows you to implement data modeling, standardization, and contextualization, along with checks to ensure data is within the correct range or of the correct data type. We call this method **JSON Schema validation**.

> **JSON Schema** is a vocabulary that allows you to annotate and validate JSON documents. It defines the structure, data types, and validation rules, ensuring consistency and interoperability across different applications and systems.

To implement JSON schema, install the node [`node-red-contrib-json-full-schema-validator`](https://flows.nodered.org/node/node-red-contrib-full-msg-json-schema-validation).Once done What you have to do is just plan the data schema, such as deciding which properties are necessary, what data types they should be, and what units they should have. For example, if the data includes temperature, determine if it should be in Celsius or Fahrenheit and define the valid range for that data (e.g., -40°C to 150°C). Other factors include precision, mandatory fields, and additional attributes. Then, prepare it in the following JSON format. If you want to learn more about how to define JSON Schemas, check out this helpful: [Getting Started Guide](https://json-schema.org/learn/getting-started-step-by-step):

```json
{
  "title": "Hydraulic Pump",
  "type": "object",
  "required": ["timestamp", "temperature", "pressure"],
  "properties": {
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp of when the data was recorded."
    },
    "temperature": {
      "type": "object",
      "required": ["value", "unit"],
      "properties": {
        "value": {
          "type": "number",
          "description": "The temperature value.",
          "minimum": 0
        },
        "unit": {
          "type": "string",
          "enum": ["Celsius"],
          "description": "The unit of the temperature value."
        }
      }
    },
    "pressure": {
      "type": "object",
      "required": ["value", "unit"],
      "properties": {
        "value": {
          "type": "number",
          "description": "The pressure value.",
          "minimum": 0
        },
        "unit": {
          "type": "string",
          "enum": ["Pascal"],
          "description": "The unit of the pressure value."
        }
      }
    }
  }
}
```

This JSON schema defines the structure for data related to a hydraulic pump. It includes three key properties: `timestamp`, `temperature`, and `pressure`. The `timestamp` must be in a valid date-time format. Both `temperature` and `pressure` require two properties: value (a number representing the actual measurement) and `unit` (which must be Celsius for `temperature` and Pascal for `pressure`). Both values must be greater than or equal to zero. This schema ensures that all data is recorded with the correct units and valid values, maintaining consistency and reliability.

### Implementing Data Schema Validation

Let's implement the data schema validation mechanism to ensure each incoming data adheres to the specified JSON schema.

1. Drag the **JSON Full Schema Validator** node onto the Node-RED canvas.
2. Double-click the node to open its settings.
3. Copy and paste your schema into the node’s schema field.

![Configuring "JSON Full Schema Validator" node with JSON schema for our data ](./images/json-full-validator-node.png){data-zoomable}
_Configuring "JSON Full Schema Validator" node with JSON schema for our data_

4. Click **Done** to save the changes.
5. Connect the input of the **JSON Full Schema Validator** node to the data source from where your data is coming.
6. Connect the node's first output to another node to process or handle the validated data (e.g., an MQTT node, a database node, or any other destination).
7. Connect the second output to the flow that will handle the situation where data does not meet the schema. This could be a notification flow sending an email or Telegram to your team or a dashboard alert.
8. Deploy the flow.

Now, let's understand this with an example. Below is the data that we are receiving from the PLC. After transforming it, we’ve added essential properties such as unit and value. However, notice that the data doesn't meet the schema definition because the temperature is given in Fahrenheit and is a negative number, which isn't within the expected range.

![Message passes through the second output and includes errors when it does not align with the data schema.](./images/invalid-data.png){data-zoomable}
_Message passes through the second output and includes errors when it does not align with the data schema._

If the data doesn't align with the data schema, it will pass through the "JSON Full Schema Validator" node and flow through the second output. The message will contain an error array with detailed information about what is wrong with the data (e.g., incorrect unit or out-of-range value). From this output, you can easily connect email or Telegram nodes to send alert notifications.

When the data meets the schema, it passes through the first output without errors. The validated data is then sent to the next stage in the flow.

![Message passes through the first output and does not include errors when it aligns with the data schema.](./images/valid-data-message.png){data-zoomable}
_Message passes through the first output and does not include errors when it aligns with the data schema._

## Where to Keep All That Factory Data

Once your factory data is nicely structured and contextualized and checked, you need a safe and smart place to keep it. Different kinds of information often need different types of storage to be most useful.

Choosing the right storage ensures your data is easily accessible and performs well for your MES. Here are the main kinds of storage typically use for factory data:

* **Time-Series Databases (TSDBs):** These are fantastic for data that changes constantly, like temperature readings from a sensor every few seconds, or how fast a machine is running. They're built to handle massive amounts of incoming updates and are perfect for spotting trends over time. Imagine them as a super-efficient diary that records every single moment. Good examples include **InfluxDB** and **TimescaleDB**.

* **Standard Databases (SQL Databases):** If you have structured information with clear connections, like production orders, how much material went into a batch, or results from quality checks, these are your go-to. They keep everything really neat and make sure pieces of information are correctly linked. Think of them like a well-organized spreadsheet or a library catalog. You'll often see **PostgreSQL** or **MySQL** used here.

* **Data Lakes or Cloud Storage:** These are for when you have huge amounts of all sorts of data, even if it's not perfectly organized yet. You might use them for long-term historical records or for data you plan to analyze later using advanced tools. Picture them as a huge warehouse where you can store anything, ready for when you need to sort through it. **Amazon S3** and **Azure Data Lake Storage** are common examples.

When you're deciding where to store your data, you'll think about things like how much data you have and how fast it's coming in, how often you need to look at it (right now versus historical trends), what it will cost, and if it can grow with your factory. You'll also consider how well it connects with your other systems and how you'll keep the data safe.

**FlowFuse also Helps with Data Storage**

FlowFuse also shines here, as it isn't only for contextualizing and transforming data; it also ensures that data lands in the right place to be stored. 

FlowFuse has many nodesfor almost every database and cloud storage system you'll find in a modern factory. This includes direct connections for regular databases like MySQL and PostgreSQL for your organized production data. It also has special nodes for time-series databases like InfluxDB and TimescaleDB to handle fast-moving sensor and machine data. Plus, FlowFuse connects strongly to big Data Lakes and Cloud Storage services like Amazon S3, Google Cloud Storage, and Microsoft Azure.

**FlowFuse makes it easy to build dashboards and industrial applications**

FlowFuse doesn't just manage your data; it empowers you to build the user interface (UI) for your MES with ease. You can create dashboards and industrial applications featuring clear visuals and intuitive controls. This is all achieved with a no-code, drag-and-drop approach using ready-made components.

FlowFuse offers a comprehensive collection of UI widgets, packaged as  ["FlowFuse Dashboard"](https://dashboard.flowfuse.com), to simplify this process. These tools allow you to design the screens your operators use to visualize critical information and control industrial processes effectively.

## Final Thought

Your factory's success hinges on smart decisions, and smart decisions need good data. It's not enough to just collect information from your machines; you need to make sense of it.

That means organizing your data so it's clear and consistent. Think of it like putting all your tools in the right place – easy to find when you need them. You also need to clean up the data, getting rid of errors so you can trust what you see. Finally, you need to store it smartly, choosing the best spot for different types of information so it's always ready for use.
FlowFuse helps with all of this. It's like your data's personal assistant, collecting raw information, tidying it up, and sending it to the right storage, all without complicated coding. This ensures your Manufacturing Execution System (MES) gets the accurate, reliable data it needs to help you run your factory smoother and make better choices.

If you want to see FlowFuse in action, [book a demo](/book-demo/) today!