---
title: "Building Historical Data Dashboard with FlowFuse Tables"
subtitle: "Collect, transform, store and visualize IIoT data using FlowFuse Tables"
description: "Learn how to Build a powerful historical data dashboard for your Industrial IoT applications using FlowFuse Tables."
date: 2025-08-14
authors: ["sumit-shinde"]
image: 
keywords: flowfuse tables, iiot dashboard, industrial iot, time series data, postgresql optimization, historical data visualization, node-red dashboard, sensor data, batch inserts, data analytics, iot monitoring, flowfuse tutorial, industrial automation, real-time charts, time series database
tags:
   - flowfuse
---

In Industrial IoT, tracking data over time is crucial. Whether you’re monitoring temperature changes throughout the day, spotting machine downtime, or analyzing production trends across shifts, a historical data dashboard helps you see important patterns clearly.

<!--more-->

This tutorial guides you through building such a dashboard using FlowFuse Tables. FlowFuse Tables currently provides a managed PostgreSQL database—a reliable and widely used system—which we will use throughout this tutorial to store time-series data.

## Why PostgreSQL for Time-Series Data?

You might wonder if PostgreSQL can efficiently handle large volumes of time-series data. The answer is yes—when configured properly. Without optimization, query performance can slow as data grows. However, by using techniques like batch inserts and smart indexing, PostgreSQL delivers fast and reliable access even at an industrial scale.

PostgreSQL is selected as the first database offering in FlowFuse Tables because it is flexible, reliable, and open source. It serves as a solid foundation for FlowFuse Tables. Whether your data comes from IIoT sensors or other sources, PostgreSQL is well equipped to handle it.

## Prerequisites

Before we begin, please ensure you have the following set up:

* A FlowFuse Enterprise account, as FlowFuse Tables is an exclusive Enterprise feature.
* The `@flowfuse/node-red-dashboard` package installed in your FlowFuse instance to create the user interface.
* The `node-red-contrib-moment` node installed for handling date and time operations within your flows.
* FlowFuse Tables configured for your FlowFuse Team with a managed PostgreSQL database.

If you are new to FlowFuse Tables, we highly recommend reading our [getting started guide](/blog/2025/08/getting-started-with-flowfuse-tables/) to familiarize yourself with the basics.

## Creating an Optimized Database Schema

Our first step is to design a database table structured for both high-speed writes and efficient queries.

### Step 1: Design and Create the Table

We will create a single table to hold all our sensor data. The key is to use appropriate data types and indexes to ensure performance.

1.  In your FlowFuse Node-RED instance, drag a **Query node** onto the canvas.

2.  Configure the node with the following SQL statement to create the table and its indexes:

   ```sql
   CREATE TABLE "sensor_readings" (
       "id" SERIAL PRIMARY KEY,
       "timestamp" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
       "sensor_id" VARCHAR(50) NOT NULL,
       "location" VARCHAR(100),
       "temperature" DECIMAL(5,2)
   );

   CREATE INDEX "idx_sensor_timestamp" ON "sensor_readings"("sensor_id", "timestamp" DESC);
   ```

**Schema Breakdown:**

* `TIMESTAMPTZ`: We use this data type to store timestamps with timezone information. This is critical for applications with sensors spread across different geographical locations, ensuring data is always consistent.
* **Index**: The composite index on `sensor_id` and `timestamp` (in descending order) is vital for query speed. It allows PostgreSQL to quickly locate and return results for a specific sensor while already ordering them from newest to oldest. This avoids expensive sorting when fetching the most recent readings for a given sensor.

> **Important:** The `DESC` in the composite index provides a significant performance boost for queries like:
>
> ```sql
> SELECT * 
> FROM sensor_readings
> WHERE sensor_id = 'sensor_01'
> ORDER BY timestamp DESC
> LIMIT 10;
> ```
>
> If you instead need results in chronological order, you could create an ascending index or let PostgreSQL reverse the order at query time.


3.  To execute this one-time setup, connect an **Inject node** to the input of the **Query node** and a **Debug node** to its output.
4.  Click **Deploy**, then click the button on the **Inject node** to create your table.

### Step 2: Storing Sensor Data Efficiently with Batch Inserts

Writing every single sensor reading to the database individually can create significant overhead and slow down performance. A much more efficient method is to "batch" readings together and write them in a single transaction.

Let's build a flow to simulate sensor data and batch-insert it.

1.  Add an **Inject node** configured to repeat every **1 second** to simulate a continuous stream of data.

2.  Connect it to a **Change node** that generates a simulated sensor reading. Configure it to set `msg.payload` using the following JSONata expression:

```json
    {
        "sensor_id": "sensor_01",
        "location": "Production Line A",
        "temperature": 20 + $random() * 5
    }
```

3.  Add another **Change node** to add a precise timestamp to each reading.

      - Set `msg.payload.timestamp`
      - To the value type **timestamp**.

4. Add a **Function node** and name it **"Batch Accumulator"**. Paste the following JavaScript code into the node — it already includes inline comments explaining each step. This function will accumulate incoming readings in batches until the specified batch size is reached, and then create the SQL query to perform batch inserts into the database.

```javascript
// Set the number of records to collect before triggering a batch insert
const batchSize = 100;

// Retrieve previously stored readings from context (or start with an empty array)
const readings = context.get('readings') || [];

// Add the new reading (from msg.payload) to the readings array
readings.push(msg.payload);

// Check if we have enough readings to perform a batch insert
if (readings.length >= batchSize) {

    // Generate parameter placeholders for each reading (4 fields per record)
    // Example: ($1, $2, $3, $4), ($5, $6, $7, $8), ...
    const values = readings.map((_, i) => 
        `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`
    ).join(',');

    // Build the SQL insert query with placeholders
    msg.query = `
        INSERT INTO sensor_readings
        (timestamp, sensor_id, location, temperature)
        VALUES ${values};
    `;

    // Flatten the readings into a single array of values matching the placeholders
    // For each reading, we pass: current timestamp, sensor_id, location, temperature
    msg.params = readings.flatMap(r => [
        new Date(),          // Or use r.timestamp if actual reading time is available
        r.sensor_id,
        r.location,
        r.temperature
    ]);

    // Clear stored readings in context now that they are being inserted
    context.set('readings', []);

    // Return the msg with the SQL query and parameters for execution
    return msg;
}

// If not enough readings collected yet, store them back into context
context.set('readings', readings);

// Do not send anything forward yet
return null;
   ```

5.  Connect the output of the "Batch Accumulator" to a **Query node**. This node will receive the fully formed `msg.query` and execute the batch insert.

6.  Deploy the flow. It will now collect 100 readings (over 100 seconds) and perform a single, highly efficient database write instead of 100 separate ones.

## Building the Interactive Dashboard

With data flowing into our database, let's create a user interface to query and visualize it.

### Step 3: Create an Interactive Time Range Selector

We'll start with a form that allows users to select a date, time, and duration to view.

1. Drag a **ui\_form** node onto the canvas. Create a new dashboard group for it and add the following form elements:

   ![Form widget configuration showing date, time, and window duration fields](./images/form-widget.png){data-zoomable}
   *Time Range Selector form configuration in Node-RED Dashboard*

2. Connect the output of the form to a **Change** node to format the input. Add the following rules in the Change node:

   * Set `msg.startDateTime` to the JSONata expression:

     ```json
     payload.start & "T" & payload.time & ":00"
     ```
   * Set `msg.windowMinutes` to the expression:

     ```json
     payload.window
     ```

3. Add a **Date/Time Formatter** node. This is crucial for handling timezones correctly. Configure it as follows:

   * **Input property:** `msg.startDateTime`
   * **Input timezone:** your local timezone, for example, `Asia/Kolkata`
   * **Output timezone:** `Etc/UTC` (to match the database `TIMESTAMPTZ` standard)
   * **Output property:** `msg.startDateTime`

   ![Date/Time Formatter node configuration showing timezone conversion settings](./images/moment.png){data-zoomable}
   *Configuring the Date/Time Formatter node to convert from local timezone to UTC*

4. Add another **Change** node to set the query parameters for the SQL query. Set `msg.params` to the following JSONata expression:

   ```
   [
       msg.startDateTime,
       msg.windowMinutes & " minutes"
   ]
   ```

5. Connect this to a **Query** node with the following parameterized SQL, which fetches data for the selected time window:

   ```sql
   SELECT 
       "timestamp",
       "temperature"
   FROM "sensor_readings"
   WHERE "sensor_id" = 'sensor_01'
     AND "timestamp" >= $1::timestamptz
     AND "timestamp" < ($1::timestamptz + $2::interval) ORDER BY "timestamp" DESC;
   ```

6. Connect a **Debug** node after the Query node to test the flow.

7. Drag a **Switch** node onto the canvas and add a condition to check whether `msg.payload` is empty. Connect the output of the Query node to the Switch node.

8. Connect the output for the "empty" condition from the Switch node to a **Change** node that sets `msg.payload` to:

   ```
   No data found for the selected time range.
   ```

9. Drag a **ui\_notification** node, select the appropriate UI group, and connect it to the output of the Change node.

10. Deploy the flow. On the dashboard, select a **date**, **time**, and **window** using the form. Verify in the debug panel that the correct data is returned, or that a notification appears if no data is found.

![Complete time range selector form](./images/form-time-range-selector.png){data-zoomable}
_Complete time range selector form_

### Step 4: Display the Data in a Chart

The final step is to visualize the query result.

1.  Connect the output of the final **Query node** to a **ui_chart** widget.

2.  Configure the chart node:

      - Group: Create new group for chart.
      - Type: Line
      - X: Set to `timestamp` as a key.
      - Y: Set to `temperature` as a key.
      - Series: Set to "Temperature" as string.

3.  Deploy the flow. Your complete historical data dashboard is now live — you can explore it and experiment with different time ranges to see the results

![historical data dashboard retrieving historical data nd displying it](./images/historical-data-dashboard.gif){data-zoomable}
_Historical data dashboard retrieving and displaying historical data_

Below is the complete flow we built in this tutorial.

{% renderFlow 300 %}
[{"id":"f6f6bd2c78547168","type":"group","z":"a9e721cc8fbe46fe","name":"Create Table","style":{"label":true},"nodes":["52f82d4aa9a97588","0d98257815fb40e3","65d5d7b8975fc2f0"],"x":194,"y":219,"w":572,"h":82},{"id":"52f82d4aa9a97588","type":"inject","z":"a9e721cc8fbe46fe","g":"f6f6bd2c78547168","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":290,"y":260,"wires":[["0d98257815fb40e3"]]},{"id":"0d98257815fb40e3","type":"tables-query","z":"a9e721cc8fbe46fe","g":"f6f6bd2c78547168","name":"Create Table","query":"   CREATE TABLE \"sensor_readings\" (\n       \"id\" SERIAL PRIMARY KEY,\n       \"timestamp\" TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n       \"sensor_id\" VARCHAR(50) NOT NULL,\n       \"location\" VARCHAR(100),\n       \"temperature\" DECIMAL(5,2)\n   );\n\n   CREATE INDEX \"idx_sensor_timestamp\" ON \"sensor_readings\"(\"sensor_id\", \"timestamp\" DESC);","split":false,"rowsPerMsg":1,"x":470,"y":260,"wires":[["65d5d7b8975fc2f0"]]},{"id":"65d5d7b8975fc2f0","type":"debug","z":"a9e721cc8fbe46fe","g":"f6f6bd2c78547168","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":660,"y":260,"wires":[]},{"id":"15627074513a2ad7","type":"group","z":"a9e721cc8fbe46fe","name":"Simulate Sensor and perform batch insert","style":{"label":true},"nodes":["eb1bb5193ddde8ba","60315b8ef9fe44ae","c6390c75effe5e20","296d4a80db186ac8","d9be1d81b114f59e","08258bdd680649c5"],"x":194,"y":319,"w":1092,"h":82},{"id":"eb1bb5193ddde8ba","type":"inject","z":"a9e721cc8fbe46fe","g":"15627074513a2ad7","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":310,"y":360,"wires":[["d9be1d81b114f59e"]]},{"id":"60315b8ef9fe44ae","type":"tables-query","z":"a9e721cc8fbe46fe","g":"15627074513a2ad7","name":"Query","query":"const batchSize = 100;\nconst readings = context.get('readings') || [];\n\nreadings.push(msg.payload);\n\nif (readings.length >= batchSize) {\n    // Prepare batch insert\n    const values = readings.map((_, i) => \n        `($${i*7+1}, $${i*7+2}, $${i*7+3}, $${i*7+4}, $${i*7+5}, $${i*7+6}, $${i*7+7})`\n    ).join(',');\n    \n    msg.query = `\n        INSERT INTO \"sensor_readings\"\n        (\"timestamp\", \"sensor_id\", \"location\", \"temperature\")\n        VALUES ${values}\n    `;\n    \n    msg.params = readings.flatMap(r => [\n        new Date(),\n        r.sensor_id,\n        r.location,\n        r.temperature,\n    ]);\n    \n    context.set('readings', []);\n    return msg;\n}\n\ncontext.set('readings', readings);\nreturn null;","split":false,"rowsPerMsg":1,"x":1030,"y":360,"wires":[["296d4a80db186ac8"]]},{"id":"c6390c75effe5e20","type":"function","z":"a9e721cc8fbe46fe","g":"15627074513a2ad7","name":"Batch Accumulator","func":"const batchSize = 100;\nconst readings = context.get('readings') || [];\n\nreadings.push(msg.payload);\n\nif (readings.length >= batchSize) {\n    // Prepare batch insert\n    const values = readings.map((_, i) => \n        `($${i*7+1}, $${i*7+2}, $${i*7+3}, $${i*7+4}, $${i*7+5}, $${i*7+6}, $${i*7+7})`\n    ).join(',');\n    \n    msg.query = `\n        INSERT INTO \"sensor_readings\"\n        (\"timestamp\", \"sensor_id\", \"location\", \"temperature\")\n        VALUES ${values}\n    `;\n    \n    msg.params = readings.flatMap(r => [\n        new Date(),\n        r.sensor_id,\n        r.location,\n        r.temperature,\n    ]);\n    \n    context.set('readings', []);\n    return msg;\n}\n\ncontext.set('readings', readings);\nreturn null;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":870,"y":360,"wires":[["60315b8ef9fe44ae"]]},{"id":"296d4a80db186ac8","type":"debug","z":"a9e721cc8fbe46fe","g":"15627074513a2ad7","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1180,"y":360,"wires":[]},{"id":"d9be1d81b114f59e","type":"change","z":"a9e721cc8fbe46fe","g":"15627074513a2ad7","name":"Simulate Sensor","rules":[{"t":"set","p":"payload","pt":"msg","to":"{\t   \"sensor_id\": \"sensor_01\",\t   \"location\": \"Production Line A\",\t   \"temperature\": 20 + $random() * 5,\t   \"humidity\": 40 + $random() * 20,\t   \"pressure\": 1010 + $random() * 10,\t   \"quality_score\": $floor(85 + $random() * 15)   \t}","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":480,"y":360,"wires":[["08258bdd680649c5"]]},{"id":"08258bdd680649c5","type":"change","z":"a9e721cc8fbe46fe","g":"15627074513a2ad7","name":"Add timestamp","rules":[{"t":"set","p":"payload.timestamp","pt":"msg","to":"iso","tot":"date"}],"action":"","property":"","from":"","to":"","reg":false,"x":680,"y":360,"wires":[["c6390c75effe5e20"]]},{"id":"97ce85da34597712","type":"group","z":"a9e721cc8fbe46fe","name":"Historical data dashboard","style":{"label":true},"nodes":["e4afef5f243c8da0","717eabd27b6fbe18","fc6a0e85d73405a2","876e69e260a0f3bf","0c50224e220917b2","9336c25df2fcbbaa","efd22abf990fb7a2","d4662e7d33bdb59f","d68234bc2f2b18f2"],"x":194,"y":419,"w":1612,"h":122},{"id":"e4afef5f243c8da0","type":"ui-chart","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","group":"bb833d0dec39ffd7","name":"Historical Data Chart","label":"","order":1,"chartType":"line","category":"Temperature","categoryType":"str","xAxisLabel":"","xAxisProperty":"timestamp","xAxisPropertyType":"property","xAxisType":"time","xAxisFormat":"","xAxisFormatType":"ccc HH:mm","xmin":"","xmax":"","yAxisLabel":"","yAxisProperty":"temperature","yAxisPropertyType":"property","ymin":"","ymax":"","bins":10,"action":"replace","stackSeries":false,"pointShape":"circle","pointRadius":4,"showLegend":true,"removeOlder":1,"removeOlderUnit":"3600","removeOlderPoints":"","colors":["#0095ff","#ff0000","#ff7f0e","#2ca02c","#a347e1","#d62728","#ff9896","#9467bd","#c5b0d5"],"textColor":["#666666"],"textColorDefault":true,"gridColor":["#e5e5e5"],"gridColorDefault":true,"width":"12","height":8,"className":"","interpolation":"linear","x":1680,"y":460,"wires":[[]]},{"id":"717eabd27b6fbe18","type":"ui-form","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","name":"","group":"6d7a8eed50e3a59b","label":"","order":1,"width":0,"height":0,"options":[{"label":"Start","key":"start","type":"date","required":true,"rows":null},{"label":"Time","key":"time","type":"time","required":true,"rows":null},{"label":"Window (minutes)","key":"window","type":"number","required":true,"rows":null}],"formValue":{"start":"","time":"","window":""},"payload":"","submit":"submit","cancel":"clear","resetOnSubmit":true,"topic":"topic","topicType":"msg","splitLayout":"","className":"","passthru":false,"dropdownOptions":[],"x":270,"y":460,"wires":[["fc6a0e85d73405a2"]]},{"id":"fc6a0e85d73405a2","type":"change","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","name":"","rules":[{"t":"set","p":"startDateTime","pt":"msg","to":"payload.start & \"T\" & payload.time & \":00\"","tot":"jsonata"},{"t":"set","p":"windowMinutes","pt":"msg","to":"payload.window","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":480,"y":460,"wires":[["0c50224e220917b2"]]},{"id":"876e69e260a0f3bf","type":"tables-query","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","name":"","query":"   SELECT \n       \"timestamp\",\n       \"temperature\"\n   FROM \"sensor_readings\"\n   WHERE \"sensor_id\" = 'sensor_01'\n     AND \"timestamp\" >= $1::timestamptz\n     AND \"timestamp\" < ($1::timestamptz + $2::interval) ORDER BY \"timestamp\" DESC;","split":false,"rowsPerMsg":1,"x":1070,"y":460,"wires":[["e4afef5f243c8da0","efd22abf990fb7a2"]]},{"id":"0c50224e220917b2","type":"moment","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","name":"","topic":"","input":"startDateTime","inputType":"msg","inTz":"Asia/Kolkata","adjAmount":0,"adjType":"days","adjDir":"add","format":"","locale":"en-US","output":"startDateTime","outputType":"msg","outTz":"ETC/UTC","x":680,"y":460,"wires":[["9336c25df2fcbbaa"]]},{"id":"9336c25df2fcbbaa","type":"change","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","name":"Set Params","rules":[{"t":"set","p":"params","pt":"msg","to":"[     msg.startDateTime,     msg.windowMinutes & \" minutes\"   ]","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":910,"y":460,"wires":[["876e69e260a0f3bf"]]},{"id":"efd22abf990fb7a2","type":"switch","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","name":"Is payload empty?","property":"payload","propertyType":"msg","rules":[{"t":"empty"}],"checkall":"true","repair":false,"outputs":1,"x":1250,"y":500,"wires":[["d4662e7d33bdb59f"]]},{"id":"d4662e7d33bdb59f","type":"change","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","name":"Notification Message","rules":[{"t":"set","p":"payload","pt":"msg","to":"No data found for the selected time range.","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":1460,"y":500,"wires":[["d68234bc2f2b18f2"]]},{"id":"d68234bc2f2b18f2","type":"ui-notification","z":"a9e721cc8fbe46fe","g":"97ce85da34597712","ui":"14350e2db0cc0391","position":"center center","colorDefault":true,"color":"#000000","displayTime":"3","showCountdown":true,"outputs":1,"allowDismiss":true,"dismissText":"Close","allowConfirm":false,"confirmText":"Confirm","raw":false,"className":"","name":"","x":1670,"y":500,"wires":[[]]},{"id":"bb833d0dec39ffd7","type":"ui-group","name":"Historical Chart","page":"d79b42b732ce9e5b","width":"12","height":1,"order":2,"showTitle":true,"className":"","visible":"true","disabled":"false","groupType":"default"},{"id":"6d7a8eed50e3a59b","type":"ui-group","name":"Form","page":"d79b42b732ce9e5b","width":"12","height":1,"order":1,"showTitle":false,"className":"","visible":"true","disabled":"false","groupType":"default"},{"id":"14350e2db0cc0391","type":"ui-base","name":"My Dashboard","path":"/dashboard","appIcon":"","includeClientData":true,"acceptsClientConfig":["ui-notification","ui-control"],"showPathInSidebar":false,"headerContent":"page","navigationStyle":"default","titleBarStyle":"default","showReconnectNotification":true,"notificationDisplayTime":1,"showDisconnectNotification":true},{"id":"d79b42b732ce9e5b","type":"ui-page","name":"Historical Data Dashboard","ui":"14350e2db0cc0391","path":"/historical-data","icon":"home","layout":"grid","theme":"6d8bff5f3fded5c2","breakpoints":[{"name":"Default","px":"0","cols":"3"},{"name":"Tablet","px":"576","cols":"6"},{"name":"Small Desktop","px":"768","cols":"9"},{"name":"Desktop","px":"1024","cols":"12"}],"order":2,"className":"","visible":"true","disabled":"false"},{"id":"6d8bff5f3fded5c2","type":"ui-theme","name":"FF Theme","colors":{"surface":"#5046e5","primary":"#5046e5","bgPage":"#ffffff","groupBg":"#ffffff","groupOutline":"#d4d1ff"},"sizes":{"density":"default","pagePadding":"15px","groupGap":"15px","groupBorderRadius":"4px","widgetGap":"12px"}},{"id":"a1e6e28bf926d3f8","type":"group","z":"a9e721cc8fbe46fe","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["da0e835628f95a0f","f7dde47e73470bfa"],"x":774,"y":219,"w":392,"h":82},{"id":"da0e835628f95a0f","type":"catch","z":"a9e721cc8fbe46fe","g":"a1e6e28bf926d3f8","name":"","scope":null,"uncaught":false,"x":860,"y":260,"wires":[["f7dde47e73470bfa"]]},{"id":"f7dde47e73470bfa","type":"debug","z":"a9e721cc8fbe46fe","g":"a1e6e28bf926d3f8","name":"debug 6","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1060,"y":260,"wires":[]},{"id":"01fd548fa46a547c","type":"global-config","env":[],"modules":{"@flowfuse/nr-tables-nodes":"0.1.0","@flowfuse/node-red-dashboard":"1.26.0","node-red-contrib-moment":"5.0.0"}}]
{% endrenderFlow %}

## Conclusion

You have successfully built a historical data dashboard using FlowFuse Tables and Node-RED. By implementing efficient batch inserts and optimized query patterns, you have created a solution that is both powerful and scalable for demanding Industrial IoT environments.

With FlowFuse Tables now part of the platform, you can build complete industrial applications without juggling external databases or leaving the FlowFuse environment. FlowFuse is now a comprehensive data platform with the ability to collect, connect, transform, store, and visualize data. Combined with FlowFuse's enterprise features—team collaboration, version control, device management, and secure deployments—you have everything needed to take your IIoT projects from prototype to production within one integrated platform.

This means less complexity and faster time to value for your industrial data initiatives. Your historical dashboards, real-time monitoring, and OEE dashboards can all live in the same ecosystem, managed by the same team, with consistent security and governance controls.

Ready to build your own time-series dashboard? [Get started with FlowFuse Tables](https://app.flowfuse.com/account/create) or [explore our industrial blueprints](/blueprints/)
