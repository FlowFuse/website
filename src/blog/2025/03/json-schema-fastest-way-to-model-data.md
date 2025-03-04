---
title: "JSON Schema: The Fastest Way to Model and Validate Your Data"
subtitle: "Streamline Your Data with JSON Schema: Model, Validate, and Standardize Effortlessly."
description: Learn how JSON Schema simplifies data modeling and validation for seamless industrial data operations and how you can leverage popular industrial low-code platforms to implement it.
date: 2025-03-06
authors: ["sumit-shinde"]
image:  /blog/2025/03/images/json-schema-fastest-way-to-validate-data.png
keywords: json schema, data validation, data modeling, industrial data, node-red, flowfuse, low-code, siemens plc, raspberry pi, json schema validator, structured data, mqtt, industrial automation, real-time data, edge computing, data consistency
tags:
  - node-red
---

Data consistency is the foundation of reliable and efficient operations. Our last article explored why structured schemas are essential for managing industrial data. Let’s take it further and implement it with JSON Schema, one of the quickest ways to define, validate, and enforce data structure. See how JSON Schema simplifies data modeling and validation, making it faster and more efficient to ensure accuracy across your systems.

<!--more-->


Let’s dive in.

## What is JSON Schema, and why is it the fastest and most efficient way to model data?

When working with industrial data, it is crucial to ensure that incoming information is structured correctly. Inconsistent or improperly formatted data can lead to errors, inefficiencies, and system failures. That is where JSON Schema comes in—it provides a standardized way to define and enforce data structures, ensuring that every data point meets the expected format before it is processed.

*JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It defines the structure, data types, and validation rules, ensuring consistency and interoperability across different applications and systems.*

What makes JSON Schema particularly fast and efficient is that it works directly with JSON, the most widely used format for modern applications. Unlike other schema definitions, there is no need for additional transformation or compilation. Validation happens in real time, allowing data to move seamlessly through APIs, databases, and automation workflows without unnecessary processing overhead. Its lightweight design makes it faster than XML Schema and more flexible than Protobuf, ensuring a balance of speed and adaptability.

## Getting Started with Implementing JSON Schema

There are multiple ways to implement JSON Schema, but a low-code approach can significantly speed up deployment for industrial environments. This is where [FlowFuse](/) comes in.

FlowFuse is an industrial data platform that acts as a complete toolkit for industrial data operations, simplifying all aspects of the process. Whether it’s integration—supporting almost all industrial protocols, hardware API integration, or offering over 5000 pre-built nodes—FlowFuse makes things easier. It handles data collection, aggregation, transformation (with no coding required, just drag-and-drop), MQTT broker management, and visualization with various pre-built widgets (again, no coding required).

From those over 5000 pre-built nodes, we have several that make implementing data schemas easier. We will use one of them today. For this practical example, I have a Siemens PLC integrated with a Raspberry Pi using Node-RED, receiving demo data for temperature and pressure. Let’s implement a data schema for it.

If you want to learn how to integrate Siemens S7 PLCs with FlowFuse, read the article [Getting Started: Integrating Siemens S7 PLCs with Node-RED](/blog/2025/01/integrating-siemens-s7-plcs-with-node-red-guide/) and  If you want to learn how to integrate a Raspberry Pi, read the following documents:

- [Setting Node-RED on Raspberry Pi 4](/node-red/hardware/raspberry-pi-4/)

- [Setting Up Node-RED on Raspberry Pi 5](/node-red/hardware/raspberry-pi-5/)

If you don’t have the S7 and Raspberry Pi, no worries. You can follow this with other data sources or even use mock data, which you can generate with the **Inject** and **Change** nodes.

### Prerequisites

Before you get started, make sure you have the following in place.

- **Running FlowFuse Remote Instance**: 
Ensure that you have a running FlowFuse remote instance on your edge device. This device should act as middleware, collecting data from industrial PLCs and systems.

To install and run the FlowFuse instance (Node-RED) on your device, use the [FlowFuse Device Agent](/docs/device-agent/quickstart/). This agent will help run and connect your device instance to the FlowFuse Cloud Team, enabling remote access from anywhere.

Do you not have a FlowFuse account yet? No worries! [Sign up now](https://app.flowfuse.com/account/create) and activate your [free tier](/blog/2024/12/flowfuse-release-2-12/). You can manage up to two edge devices at no cost.

- [node-red-contrib-json-full-schema-validator](https://flows.nodered.org/node/node-red-contrib-full-msg-json-schema-validation): 
This package will be required for JSON schema validation in your flows. Make sure it is installed in your Node-RED environment.

### Planning Your Data Schema

Before moving forward, the first step is to plan the data schema carefully. Since this schema will be used across your entire factory, involving all relevant team members in the planning process is crucial. This includes teams from operations, maintenance, IT, and engineering. Taking the time to gather input from all departments ensures that the schema reflects the real-world requirements of each group and helps avoid misalignment down the line.

When defining the schema, deciding which properties are necessary, what data types they should be, and what units they should have is essential. For example, if the data includes temperature, determine if it should be in Celsius or Fahrenheit and define the valid range for that data (e.g., -40°C to 150°C). Other factors, such as precision, mandatory fields, and additional attributes, should also be considered to ensure everyone’s needs are addressed.

By carefully planning and involving the whole team, you create a schema that supports consistent data flow across systems and departments. This collaborative approach leads to a well-rounded and effective data schema that helps align team expectations, minimizes future issues, and improves operational efficiency. Taking the time to get everyone on the same page ensures that your data will be consistent, reliable, and ready to drive informed decision-making across the organization.

Once you planned the data scheme, prepare it in the following format.

If you want to learn more about how to create JSON Schemas, check out this helpful : [Getting Started Guide](https://json-schema.org/learn/getting-started-step-by-step)

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

### Sharing This Schema Across Your Team

Now that we have planned and defined the JSON schema, we must ensure everyone can access and refer to it when needed. This helps team members understand the schema easily. To achieve this, we will use the [FlowFuse Shared Team Library](/docs/user/shared-library/) feature.

1. Drag the **Template** node onto the canvas, paste the data schema into it, and give it a meaningful name. If necessary, add a Comment node.  

![Adding a data schema to the Template node.](./images/template.png){data-zoomable}
_Adding a data schema to the Template node._

1. Next, deploy the flow. Then, go to the **main menu (top-right corner)**, click **Export**, switch to **Team Library**, create a new folder, give your data schema flow a meaningful name, and export it to that folder.

![Exporting Schema to Team Library](./images/export-to-team-lib.png){data-zoomable}
_Exporting Schema to Team Library_

Now, any team member who wants to view, use, or understand the data schema format can import it from the Team Library. However, they must be part of the same FlowFuse team where the data schema was exported.

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

If the data doesn't align with the data schema, it will pass through the "JSON Full Schema Validator" node and flow through the second output. The message will contain an error array with detailed information about what is wrong with the data (e.g., incorrect unit or out-of-range value).

When the data meets the schema, it passes through the first output without errors. The validated data is then sent to the next stage in the flow (e.g., to the Unified Namespace).

![Message passes through the first output and does not include errors when it aligns with the data schema.](./images/valid-data-message.png){data-zoomable}
_Message passes through the first output and does not include errors when it aligns with the data schema._

## Conclusion

To wrap things up, getting your data structure right is a game-changer for smooth integration and efficient operations. With explicit schemas, you ensure your data is consistent, reliable, and easy to work with. Tools like FlowFuse can take it up a notch by making data flow between systems even more straightforward. When everything is set up correctly, your data becomes a powerful tool that helps drive more intelligent decisions and boost efficiency. So, investing in your data’s structure pays off in the long run!
