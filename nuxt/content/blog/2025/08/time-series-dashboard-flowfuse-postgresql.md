---
title: Building Historical Data Dashboard with FlowFuse Tables
navTitle: Building Historical Data Dashboard with FlowFuse Tables
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

4. Add a **Function node** and name it **"Batch Accumulator"**. Paste the following JavaScript code into the node — it already includes inline comments explaining each step. This function will accumulate incoming readings in batches until the specified batch size is reached, and then creates the SQL query to perform batch inserts into the database.

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

   ![Form widget configuration showing date, time, and window duration fields](/blog/2025/08/images/form-widget.png){data-zoomable}
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

   ![Date/Time Formatter node configuration showing timezone conversion settings](/blog/2025/08/images/moment.png){data-zoomable}
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

![Complete time range selector form](/blog/2025/08/images/form-time-range-selector.png){data-zoomable}
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

3.  Deploy the flow. Your complete historical data dashboard is now live — you can explore it and experiment with different time ranges to see the results.

![historical data dashboard retrieving historical data nd displying it](/blog/2025/08/images/historical-data-dashboard.gif){data-zoomable}
_Historical data dashboard retrieving and displaying historical data_

Below is the complete flow we built in this tutorial.



::render-flow
---
height: 300
flow: "W3siaWQiOiI5MDEzMzcyMTZiNjBiMjVhIiwidHlwZSI6InRhYiIsImxhYmVsIjoiRmxvdyAxIiwiZGlzYWJsZWQiOmZhbHNlLCJpbmZvIjoiIiwiZW52IjpbXX0seyJpZCI6ImU5YTNiNzFkNDBhZGRkOGIiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiOTAxMzM3MjE2YjYwYjI1YSIsIm5hbWUiOiJDcmVhdGUgVGFibGUiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbIjQ4YjEzODBmZjdiZmU3MTYiLCI0NGJiODc1MGQ5NjFlNDE1IiwiNGEzOTc2ZTA2MmIyZGRkMiJdLCJ4Ijo1NCwieSI6NTksInciOjU3MiwiaCI6ODJ9LHsiaWQiOiIwMTEzN2QwMmM0ODMyOTYyIiwidHlwZSI6Imdyb3VwIiwieiI6IjkwMTMzNzIxNmI2MGIyNWEiLCJuYW1lIjoiU2ltdWxhdGUgU2Vuc29yIGFuZCBwZXJmb3JtIGJhdGNoIGluc2VydCIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiZTQ2NWQ0MzI4ZDlkNDJkOSIsIjUwZmI4NTBlM2UzZGI1OGUiLCJiMjFkNmRhYmY3MzFlODY2IiwiZjgyNjljZjQxMmI0MjAwZiIsIjk2ZmRkNDY3MzkxOWIwZDIiLCIwNDM0MGFkM2I5ODRhMmRmIl0sIngiOjU0LCJ5IjoxNTksInciOjEwOTIsImgiOjgyfSx7ImlkIjoiODljODYwYTI3ZmYzZGIxMCIsInR5cGUiOiJncm91cCIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwibmFtZSI6Ikhpc3RvcmljYWwgZGF0YSBkYXNoYm9hcmQiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImY0OTMyMjliMjhhYzhjMTEiLCJiOTAxNzY3NjU1M2RjMTAwIiwiMzIyZGVlMzVhMmQ3NzAxNSIsImYzY2E1NTVlZjgxMTQ1M2MiLCIwY2I4ZDMyMzI3YTEwNTMzIiwiYjVkYzJlZDBmYWMwN2YwMiIsImYzYmZkZWU4N2FhYjYxZjgiLCI5NDgxMjAyZWI3YTUwN2I2IiwiMTU5YmQyOThkZTRhOTVkMCJdLCJ4Ijo1NCwieSI6MjU5LCJ3IjoxNjEyLCJoIjoxMjJ9LHsiaWQiOiI2OGZiY2RiMDNlM2E1MzQ2IiwidHlwZSI6Imdyb3VwIiwieiI6IjkwMTMzNzIxNmI2MGIyNWEiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyI0ZjI0YWI1YjU2MjhhMWJhIiwiZmJmMzZhN2IzYzU5NDYxZCJdLCJ4Ijo2MzQsInkiOjU5LCJ3IjozOTIsImgiOjgyfSx7ImlkIjoiNDhiMTM4MGZmN2JmZTcxNiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOTAxMzM3MjE2YjYwYjI1YSIsImciOiJlOWEzYjcxZDQwYWRkZDhiIiwibmFtZSI6IiIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoxNTAsInkiOjEwMCwid2lyZXMiOltbIjQ0YmI4NzUwZDk2MWU0MTUiXV19LHsiaWQiOiI0NGJiODc1MGQ5NjFlNDE1IiwidHlwZSI6InRhYmxlcy1xdWVyeSIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6ImU5YTNiNzFkNDBhZGRkOGIiLCJuYW1lIjoiQ3JlYXRlIFRhYmxlIiwicXVlcnkiOiIgICBDUkVBVEUgVEFCTEUgXCJzZW5zb3JfcmVhZGluZ3NcIiAoXG4gICAgICAgXCJpZFwiIFNFUklBTCBQUklNQVJZIEtFWSxcbiAgICAgICBcInRpbWVzdGFtcFwiIFRJTUVTVEFNUFRaIE5PVCBOVUxMIERFRkFVTFQgTk9XKCksXG4gICAgICAgXCJzZW5zb3JfaWRcIiBWQVJDSEFSKDUwKSBOT1QgTlVMTCxcbiAgICAgICBcImxvY2F0aW9uXCIgVkFSQ0hBUigxMDApLFxuICAgICAgIFwidGVtcGVyYXR1cmVcIiBERUNJTUFMKDUsMilcbiAgICk7XG5cbiAgIENSRUFURSBJTkRFWCBcImlkeF9zZW5zb3JfdGltZXN0YW1wXCIgT04gXCJzZW5zb3JfcmVhZGluZ3NcIihcInNlbnNvcl9pZFwiLCBcInRpbWVzdGFtcFwiIERFU0MpOyIsInNwbGl0IjpmYWxzZSwicm93c1Blck1zZyI6MSwieCI6MzMwLCJ5IjoxMDAsIndpcmVzIjpbWyI0YTM5NzZlMDYyYjJkZGQyIl1dfSx7ImlkIjoiNGEzOTc2ZTA2MmIyZGRkMiIsInR5cGUiOiJkZWJ1ZyIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6ImU5YTNiNzFkNDBhZGRkOGIiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo1MjAsInkiOjEwMCwid2lyZXMiOltdfSx7ImlkIjoiZTQ2NWQ0MzI4ZDlkNDJkOSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOTAxMzM3MjE2YjYwYjI1YSIsImciOiIwMTEzN2QwMmM0ODMyOTYyIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IjEiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoxNzAsInkiOjIwMCwid2lyZXMiOltbIjk2ZmRkNDY3MzkxOWIwZDIiXV19LHsiaWQiOiI1MGZiODUwZTNlM2RiNThlIiwidHlwZSI6InRhYmxlcy1xdWVyeSIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6IjAxMTM3ZDAyYzQ4MzI5NjIiLCJuYW1lIjoiUXVlcnkiLCJxdWVyeSI6ImNvbnN0IGJhdGNoU2l6ZSA9IDEwMDtcbmNvbnN0IHJlYWRpbmdzID0gY29udGV4dC5nZXQoJ3JlYWRpbmdzJykgfHwgW107XG5cbnJlYWRpbmdzLnB1c2gobXNnLnBheWxvYWQpO1xuXG5pZiAocmVhZGluZ3MubGVuZ3RoID49IGJhdGNoU2l6ZSkge1xuICAgIC8vIFByZXBhcmUgYmF0Y2ggaW5zZXJ0XG4gICAgY29uc3QgdmFsdWVzID0gcmVhZGluZ3MubWFwKChfLCBpKSA9PiBcbiAgICAgICAgYCgkJHtpKjcrMX0sICQke2kqNysyfSwgJCR7aSo3KzN9LCAkJHtpKjcrNH0sICQke2kqNys1fSwgJCR7aSo3KzZ9LCAkJHtpKjcrN30pYFxuICAgICkuam9pbignLCcpO1xuICAgIFxuICAgIG1zZy5xdWVyeSA9IGBcbiAgICAgICAgSU5TRVJUIElOVE8gXCJzZW5zb3JfcmVhZGluZ3NcIlxuICAgICAgICAoXCJ0aW1lc3RhbXBcIiwgXCJzZW5zb3JfaWRcIiwgXCJsb2NhdGlvblwiLCBcInRlbXBlcmF0dXJlXCIpXG4gICAgICAgIFZBTFVFUyAke3ZhbHVlc31cbiAgICBgO1xuICAgIFxuICAgIG1zZy5wYXJhbXMgPSByZWFkaW5ncy5mbGF0TWFwKHIgPT4gW1xuICAgICAgICBuZXcgRGF0ZSgpLFxuICAgICAgICByLnNlbnNvcl9pZCxcbiAgICAgICAgci5sb2NhdGlvbixcbiAgICAgICAgci50ZW1wZXJhdHVyZSxcbiAgICBdKTtcbiAgICBcbiAgICBjb250ZXh0LnNldCgncmVhZGluZ3MnLCBbXSk7XG4gICAgcmV0dXJuIG1zZztcbn1cblxuY29udGV4dC5zZXQoJ3JlYWRpbmdzJywgcmVhZGluZ3MpO1xucmV0dXJuIG51bGw7Iiwic3BsaXQiOmZhbHNlLCJyb3dzUGVyTXNnIjoxLCJ4Ijo4OTAsInkiOjIwMCwid2lyZXMiOltbImY4MjY5Y2Y0MTJiNDIwMGYiXV19LHsiaWQiOiJiMjFkNmRhYmY3MzFlODY2IiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6IjkwMTMzNzIxNmI2MGIyNWEiLCJnIjoiMDExMzdkMDJjNDgzMjk2MiIsIm5hbWUiOiJCYXRjaCBBY2N1bXVsYXRvciIsImZ1bmMiOiIvLyBTZXQgdGhlIG51bWJlciBvZiByZWNvcmRzIHRvIGNvbGxlY3QgYmVmb3JlIHRyaWdnZXJpbmcgYSBiYXRjaCBpbnNlcnRcbmNvbnN0IGJhdGNoU2l6ZSA9IDEwMDtcblxuLy8gUmV0cmlldmUgcHJldmlvdXNseSBzdG9yZWQgcmVhZGluZ3MgZnJvbSBjb250ZXh0IChvciBzdGFydCB3aXRoIGFuIGVtcHR5IGFycmF5KVxuY29uc3QgcmVhZGluZ3MgPSBjb250ZXh0LmdldCgncmVhZGluZ3MnKSB8fCBbXTtcblxuLy8gQWRkIHRoZSBuZXcgcmVhZGluZyAoZnJvbSBtc2cucGF5bG9hZCkgdG8gdGhlIHJlYWRpbmdzIGFycmF5XG5yZWFkaW5ncy5wdXNoKG1zZy5wYXlsb2FkKTtcblxuLy8gQ2hlY2sgaWYgd2UgaGF2ZSBlbm91Z2ggcmVhZGluZ3MgdG8gcGVyZm9ybSBhIGJhdGNoIGluc2VydFxuaWYgKHJlYWRpbmdzLmxlbmd0aCA+PSBiYXRjaFNpemUpIHtcblxuICAgIC8vIEdlbmVyYXRlIHBhcmFtZXRlciBwbGFjZWhvbGRlcnMgZm9yIGVhY2ggcmVhZGluZyAoNCBmaWVsZHMgcGVyIHJlY29yZClcbiAgICAvLyBFeGFtcGxlOiAoJDEsICQyLCAkMywgJDQpLCAoJDUsICQ2LCAkNywgJDgpLCAuLi5cbiAgICBjb25zdCB2YWx1ZXMgPSByZWFkaW5ncy5tYXAoKF8sIGkpID0+IFxuICAgICAgICBgKCQke2kgKiA0ICsgMX0sICQke2kgKiA0ICsgMn0sICQke2kgKiA0ICsgM30sICQke2kgKiA0ICsgNH0pYFxuICAgICkuam9pbignLCcpO1xuXG4gICAgLy8gQnVpbGQgdGhlIFNRTCBpbnNlcnQgcXVlcnkgd2l0aCBwbGFjZWhvbGRlcnNcbiAgICBtc2cucXVlcnkgPSBgXG4gICAgICAgIElOU0VSVCBJTlRPIHNlbnNvcl9yZWFkaW5nc1xuICAgICAgICAodGltZXN0YW1wLCBzZW5zb3JfaWQsIGxvY2F0aW9uLCB0ZW1wZXJhdHVyZSlcbiAgICAgICAgVkFMVUVTICR7dmFsdWVzfTtcbiAgICBgO1xuXG4gICAgLy8gRmxhdHRlbiB0aGUgcmVhZGluZ3MgaW50byBhIHNpbmdsZSBhcnJheSBvZiB2YWx1ZXMgbWF0Y2hpbmcgdGhlIHBsYWNlaG9sZGVyc1xuICAgIC8vIEZvciBlYWNoIHJlYWRpbmcsIHdlIHBhc3M6IGN1cnJlbnQgdGltZXN0YW1wLCBzZW5zb3JfaWQsIGxvY2F0aW9uLCB0ZW1wZXJhdHVyZVxuICAgIG1zZy5wYXJhbXMgPSByZWFkaW5ncy5mbGF0TWFwKHIgPT4gW1xuICAgICAgICByLnRpbWVzdGFtcCxcbiAgICAgICAgci5zZW5zb3JfaWQsXG4gICAgICAgIHIubG9jYXRpb24sXG4gICAgICAgIHIudGVtcGVyYXR1cmVcbiAgICBdKTtcblxuICAgIC8vIENsZWFyIHN0b3JlZCByZWFkaW5ncyBpbiBjb250ZXh0IG5vdyB0aGF0IHRoZXkgYXJlIGJlaW5nIGluc2VydGVkXG4gICAgY29udGV4dC5zZXQoJ3JlYWRpbmdzJywgW10pO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBtc2cgd2l0aCB0aGUgU1FMIHF1ZXJ5IGFuZCBwYXJhbWV0ZXJzIGZvciBleGVjdXRpb25cbiAgICByZXR1cm4gbXNnO1xufVxuXG4vLyBJZiBub3QgZW5vdWdoIHJlYWRpbmdzIGNvbGxlY3RlZCB5ZXQsIHN0b3JlIHRoZW0gYmFjayBpbnRvIGNvbnRleHRcbmNvbnRleHQuc2V0KCdyZWFkaW5ncycsIHJlYWRpbmdzKTtcblxucmV0dXJuIG51bGw7Iiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4Ijo3MzAsInkiOjIwMCwid2lyZXMiOltbIjUwZmI4NTBlM2UzZGI1OGUiXV19LHsiaWQiOiJmODI2OWNmNDEyYjQyMDBmIiwidHlwZSI6ImRlYnVnIiwieiI6IjkwMTMzNzIxNmI2MGIyNWEiLCJnIjoiMDExMzdkMDJjNDgzMjk2MiIsIm5hbWUiOiJkZWJ1ZyAyIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjEwNDAsInkiOjIwMCwid2lyZXMiOltdfSx7ImlkIjoiOTZmZGQ0NjczOTE5YjBkMiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiOTAxMzM3MjE2YjYwYjI1YSIsImciOiIwMTEzN2QwMmM0ODMyOTYyIiwibmFtZSI6IlNpbXVsYXRlIFNlbnNvciIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoie1x0ICAgXCJzZW5zb3JfaWRcIjogXCJzZW5zb3JfMDFcIixcdCAgIFwibG9jYXRpb25cIjogXCJQcm9kdWN0aW9uIExpbmUgQVwiLFx0ICAgXCJ0ZW1wZXJhdHVyZVwiOiAyMCArICRyYW5kb20oKSAqIDVcdH0iLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjM0MCwieSI6MjAwLCJ3aXJlcyI6W1siMDQzNDBhZDNiOTg0YTJkZiJdXX0seyJpZCI6IjA0MzQwYWQzYjk4NGEyZGYiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjkwMTMzNzIxNmI2MGIyNWEiLCJnIjoiMDExMzdkMDJjNDgzMjk2MiIsIm5hbWUiOiJBZGQgdGltZXN0YW1wIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZC50aW1lc3RhbXAiLCJwdCI6Im1zZyIsInRvIjoiaXNvIiwidG90IjoiZGF0ZSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1NDAsInkiOjIwMCwid2lyZXMiOltbImIyMWQ2ZGFiZjczMWU4NjYiXV19LHsiaWQiOiJmNDkzMjI5YjI4YWM4YzExIiwidHlwZSI6InVpLWNoYXJ0IiwieiI6IjkwMTMzNzIxNmI2MGIyNWEiLCJnIjoiODljODYwYTI3ZmYzZGIxMCIsImdyb3VwIjoiOTI2MTM2OTA1NTRkNWJiOSIsIm5hbWUiOiJIaXN0b3JpY2FsIERhdGEgQ2hhcnQiLCJsYWJlbCI6IiIsIm9yZGVyIjoxLCJjaGFydFR5cGUiOiJsaW5lIiwiY2F0ZWdvcnkiOiJUZW1wZXJhdHVyZSIsImNhdGVnb3J5VHlwZSI6InN0ciIsInhBeGlzTGFiZWwiOiIiLCJ4QXhpc1Byb3BlcnR5IjoidGltZXN0YW1wIiwieEF4aXNQcm9wZXJ0eVR5cGUiOiJwcm9wZXJ0eSIsInhBeGlzVHlwZSI6InRpbWUiLCJ4QXhpc0Zvcm1hdCI6IiIsInhBeGlzRm9ybWF0VHlwZSI6ImNjYyBISDptbSIsInhtaW4iOiIiLCJ4bWF4IjoiIiwieUF4aXNMYWJlbCI6IiIsInlBeGlzUHJvcGVydHkiOiJ0ZW1wZXJhdHVyZSIsInlBeGlzUHJvcGVydHlUeXBlIjoicHJvcGVydHkiLCJ5bWluIjoiIiwieW1heCI6IiIsImJpbnMiOjEwLCJhY3Rpb24iOiJyZXBsYWNlIiwic3RhY2tTZXJpZXMiOmZhbHNlLCJwb2ludFNoYXBlIjoiY2lyY2xlIiwicG9pbnRSYWRpdXMiOjQsInNob3dMZWdlbmQiOnRydWUsInJlbW92ZU9sZGVyIjoxLCJyZW1vdmVPbGRlclVuaXQiOiIzNjAwIiwicmVtb3ZlT2xkZXJQb2ludHMiOiIiLCJjb2xvcnMiOlsiIzAwOTVmZiIsIiNmZjAwMDAiLCIjZmY3ZjBlIiwiIzJjYTAyYyIsIiNhMzQ3ZTEiLCIjZDYyNzI4IiwiI2ZmOTg5NiIsIiM5NDY3YmQiLCIjYzViMGQ1Il0sInRleHRDb2xvciI6WyIjNjY2NjY2Il0sInRleHRDb2xvckRlZmF1bHQiOnRydWUsImdyaWRDb2xvciI6WyIjZTVlNWU1Il0sImdyaWRDb2xvckRlZmF1bHQiOnRydWUsIndpZHRoIjoiMTIiLCJoZWlnaHQiOjgsImNsYXNzTmFtZSI6IiIsImludGVycG9sYXRpb24iOiJsaW5lYXIiLCJ4IjoxNTQwLCJ5IjozMDAsIndpcmVzIjpbW11dfSx7ImlkIjoiYjkwMTc2NzY1NTNkYzEwMCIsInR5cGUiOiJ1aS1mb3JtIiwieiI6IjkwMTMzNzIxNmI2MGIyNWEiLCJnIjoiODljODYwYTI3ZmYzZGIxMCIsIm5hbWUiOiIiLCJncm91cCI6ImI5ZTk3NjJjODFiNTVhMDUiLCJsYWJlbCI6IiIsIm9yZGVyIjoxLCJ3aWR0aCI6MCwiaGVpZ2h0IjowLCJvcHRpb25zIjpbeyJsYWJlbCI6IlN0YXJ0Iiwia2V5Ijoic3RhcnQiLCJ0eXBlIjoiZGF0ZSIsInJlcXVpcmVkIjp0cnVlLCJyb3dzIjpudWxsfSx7ImxhYmVsIjoiVGltZSIsImtleSI6InRpbWUiLCJ0eXBlIjoidGltZSIsInJlcXVpcmVkIjp0cnVlLCJyb3dzIjpudWxsfSx7ImxhYmVsIjoiV2luZG93IChtaW51dGVzKSIsImtleSI6IndpbmRvdyIsInR5cGUiOiJudW1iZXIiLCJyZXF1aXJlZCI6dHJ1ZSwicm93cyI6bnVsbH1dLCJmb3JtVmFsdWUiOnsic3RhcnQiOiIiLCJ0aW1lIjoiIiwid2luZG93IjoiIn0sInBheWxvYWQiOiIiLCJzdWJtaXQiOiJzdWJtaXQiLCJjYW5jZWwiOiJjbGVhciIsInJlc2V0T25TdWJtaXQiOnRydWUsInRvcGljIjoidG9waWMiLCJ0b3BpY1R5cGUiOiJtc2ciLCJzcGxpdExheW91dCI6IiIsImNsYXNzTmFtZSI6IiIsInBhc3N0aHJ1IjpmYWxzZSwiZHJvcGRvd25PcHRpb25zIjpbXSwieCI6MTMwLCJ5IjozMDAsIndpcmVzIjpbWyIzMjJkZWUzNWEyZDc3MDE1Il1dfSx7ImlkIjoiMzIyZGVlMzVhMmQ3NzAxNSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiOTAxMzM3MjE2YjYwYjI1YSIsImciOiI4OWM4NjBhMjdmZjNkYjEwIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InN0YXJ0RGF0ZVRpbWUiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5zdGFydCAmIFwiVFwiICYgcGF5bG9hZC50aW1lICYgXCI6MDBcIiIsInRvdCI6Impzb25hdGEifSx7InQiOiJzZXQiLCJwIjoid2luZG93TWludXRlcyIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLndpbmRvdyIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjozNDAsInkiOjMwMCwid2lyZXMiOltbIjBjYjhkMzIzMjdhMTA1MzMiXV19LHsiaWQiOiJmM2NhNTU1ZWY4MTE0NTNjIiwidHlwZSI6InRhYmxlcy1xdWVyeSIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6Ijg5Yzg2MGEyN2ZmM2RiMTAiLCJuYW1lIjoiIiwicXVlcnkiOiIgICBTRUxFQ1QgXG4gICAgICAgXCJ0aW1lc3RhbXBcIixcbiAgICAgICBcInRlbXBlcmF0dXJlXCJcbiAgIEZST00gXCJzZW5zb3JfcmVhZGluZ3NcIlxuICAgV0hFUkUgXCJzZW5zb3JfaWRcIiA9ICdzZW5zb3JfMDEnXG4gICAgIEFORCBcInRpbWVzdGFtcFwiID49ICQxOjp0aW1lc3RhbXB0elxuICAgICBBTkQgXCJ0aW1lc3RhbXBcIiA8ICgkMTo6dGltZXN0YW1wdHogKyAkMjo6aW50ZXJ2YWwpIE9SREVSIEJZIFwidGltZXN0YW1wXCIgREVTQzsiLCJzcGxpdCI6ZmFsc2UsInJvd3NQZXJNc2ciOjEsIngiOjkzMCwieSI6MzAwLCJ3aXJlcyI6W1siZjQ5MzIyOWIyOGFjOGMxMSIsImYzYmZkZWU4N2FhYjYxZjgiXV19LHsiaWQiOiIwY2I4ZDMyMzI3YTEwNTMzIiwidHlwZSI6Im1vbWVudCIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6Ijg5Yzg2MGEyN2ZmM2RiMTAiLCJuYW1lIjoiIiwidG9waWMiOiIiLCJpbnB1dCI6InN0YXJ0RGF0ZVRpbWUiLCJpbnB1dFR5cGUiOiJtc2ciLCJpblR6IjoiQXNpYS9Lb2xrYXRhIiwiYWRqQW1vdW50IjowLCJhZGpUeXBlIjoiZGF5cyIsImFkakRpciI6ImFkZCIsImZvcm1hdCI6IiIsImxvY2FsZSI6ImVuLVVTIiwib3V0cHV0Ijoic3RhcnREYXRlVGltZSIsIm91dHB1dFR5cGUiOiJtc2ciLCJvdXRUeiI6IkVUQy9VVEMiLCJ4Ijo1NDAsInkiOjMwMCwid2lyZXMiOltbImI1ZGMyZWQwZmFjMDdmMDIiXV19LHsiaWQiOiJiNWRjMmVkMGZhYzA3ZjAyIiwidHlwZSI6ImNoYW5nZSIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6Ijg5Yzg2MGEyN2ZmM2RiMTAiLCJuYW1lIjoiU2V0IFBhcmFtcyIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBhcmFtcyIsInB0IjoibXNnIiwidG8iOiJbICAgICBtc2cuc3RhcnREYXRlVGltZSwgICAgIG1zZy53aW5kb3dNaW51dGVzICYgXCIgbWludXRlc1wiICAgXSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NzcwLCJ5IjozMDAsIndpcmVzIjpbWyJmM2NhNTU1ZWY4MTE0NTNjIl1dfSx7ImlkIjoiZjNiZmRlZTg3YWFiNjFmOCIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiOTAxMzM3MjE2YjYwYjI1YSIsImciOiI4OWM4NjBhMjdmZjNkYjEwIiwibmFtZSI6IklzIHBheWxvYWQgZW1wdHk/IiwicHJvcGVydHkiOiJwYXlsb2FkIiwicHJvcGVydHlUeXBlIjoibXNnIiwicnVsZXMiOlt7InQiOiJlbXB0eSJ9XSwiY2hlY2thbGwiOiJ0cnVlIiwicmVwYWlyIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6MTExMCwieSI6MzQwLCJ3aXJlcyI6W1siOTQ4MTIwMmViN2E1MDdiNiJdXX0seyJpZCI6Ijk0ODEyMDJlYjdhNTA3YjYiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjkwMTMzNzIxNmI2MGIyNWEiLCJnIjoiODljODYwYTI3ZmYzZGIxMCIsIm5hbWUiOiJOb3RpZmljYXRpb24gTWVzc2FnZSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiTm8gZGF0YSBmb3VuZCBmb3IgdGhlIHNlbGVjdGVkIHRpbWUgcmFuZ2UuIiwidG90Ijoic3RyIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjEzMjAsInkiOjM0MCwid2lyZXMiOltbIjE1OWJkMjk4ZGU0YTk1ZDAiXV19LHsiaWQiOiIxNTliZDI5OGRlNGE5NWQwIiwidHlwZSI6InVpLW5vdGlmaWNhdGlvbiIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6Ijg5Yzg2MGEyN2ZmM2RiMTAiLCJ1aSI6ImFmZWEwNGNlODczNWMwYTYiLCJwb3NpdGlvbiI6ImNlbnRlciBjZW50ZXIiLCJjb2xvckRlZmF1bHQiOnRydWUsImNvbG9yIjoiIzAwMDAwMCIsImRpc3BsYXlUaW1lIjoiMyIsInNob3dDb3VudGRvd24iOnRydWUsIm91dHB1dHMiOjEsImFsbG93RGlzbWlzcyI6dHJ1ZSwiZGlzbWlzc1RleHQiOiJDbG9zZSIsImFsbG93Q29uZmlybSI6ZmFsc2UsImNvbmZpcm1UZXh0IjoiQ29uZmlybSIsInJhdyI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsIm5hbWUiOiIiLCJ4IjoxNTMwLCJ5IjozNDAsIndpcmVzIjpbW11dfSx7ImlkIjoiNGYyNGFiNWI1NjI4YTFiYSIsInR5cGUiOiJjYXRjaCIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6IjY4ZmJjZGIwM2UzYTUzNDYiLCJuYW1lIjoiIiwic2NvcGUiOm51bGwsInVuY2F1Z2h0IjpmYWxzZSwieCI6NzIwLCJ5IjoxMDAsIndpcmVzIjpbWyJmYmYzNmE3YjNjNTk0NjFkIl1dfSx7ImlkIjoiZmJmMzZhN2IzYzU5NDYxZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiI5MDEzMzcyMTZiNjBiMjVhIiwiZyI6IjY4ZmJjZGIwM2UzYTUzNDYiLCJuYW1lIjoiZGVidWcgNiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5MjAsInkiOjEwMCwid2lyZXMiOltdfSx7ImlkIjoiOTI2MTM2OTA1NTRkNWJiOSIsInR5cGUiOiJ1aS1ncm91cCIsIm5hbWUiOiJIaXN0b3JpY2FsIENoYXJ0IiwicGFnZSI6ImQwM2EzODY1MGJmMzA4MmYiLCJ3aWR0aCI6IjEyIiwiaGVpZ2h0IjoxLCJvcmRlciI6Miwic2hvd1RpdGxlIjp0cnVlLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UiLCJncm91cFR5cGUiOiJkZWZhdWx0In0seyJpZCI6ImI5ZTk3NjJjODFiNTVhMDUiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiRm9ybSIsInBhZ2UiOiJkMDNhMzg2NTBiZjMwODJmIiwid2lkdGgiOiIxMiIsImhlaWdodCI6MSwib3JkZXIiOjEsInNob3dUaXRsZSI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSIsImdyb3VwVHlwZSI6ImRlZmF1bHQifSx7ImlkIjoiYWZlYTA0Y2U4NzM1YzBhNiIsInR5cGUiOiJ1aS1iYXNlIiwibmFtZSI6IlVJIE5hbWUiLCJwYXRoIjoiL2Rhc2hib2FyZCIsImFwcEljb24iOiIiLCJpbmNsdWRlQ2xpZW50RGF0YSI6dHJ1ZSwiYWNjZXB0c0NsaWVudENvbmZpZyI6WyJ1aS1jb250cm9sIiwidWktbm90aWZpY2F0aW9uIl0sInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwiaGVhZGVyQ29udGVudCI6InBhZ2UiLCJuYXZpZ2F0aW9uU3R5bGUiOiJpY29uIiwidGl0bGVCYXJTdHlsZSI6ImRlZmF1bHQiLCJzaG93UmVjb25uZWN0Tm90aWZpY2F0aW9uIjp0cnVlLCJub3RpZmljYXRpb25EaXNwbGF5VGltZSI6NSwic2hvd0Rpc2Nvbm5lY3ROb3RpZmljYXRpb24iOnRydWUsImFsbG93SW5zdGFsbCI6dHJ1ZX0seyJpZCI6ImQwM2EzODY1MGJmMzA4MmYiLCJ0eXBlIjoidWktcGFnZSIsIm5hbWUiOiJIaXN0b3JpY2FsIERhdGEgRGFzaGJvYXJkIiwidWkiOiJhZmVhMDRjZTg3MzVjMGE2IiwicGF0aCI6Ii9oaXN0b3JpY2FsLWRhdGEiLCJpY29uIjoiaG9tZSIsImxheW91dCI6ImdyaWQiLCJ0aGVtZSI6IjZkOGJmZjVmM2ZkZWQ1YzIiLCJicmVha3BvaW50cyI6W3sibmFtZSI6IkRlZmF1bHQiLCJweCI6IjAiLCJjb2xzIjoiMyJ9LHsibmFtZSI6IlRhYmxldCIsInB4IjoiNTc2IiwiY29scyI6IjYifSx7Im5hbWUiOiJTbWFsbCBEZXNrdG9wIiwicHgiOiI3NjgiLCJjb2xzIjoiOSJ9LHsibmFtZSI6IkRlc2t0b3AiLCJweCI6IjEwMjQiLCJjb2xzIjoiMTIifV0sIm9yZGVyIjozLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UifSx7ImlkIjoiNmQ4YmZmNWYzZmRlZDVjMiIsInR5cGUiOiJ1aS10aGVtZSIsIm5hbWUiOiJGRiBUaGVtZSIsImNvbG9ycyI6eyJzdXJmYWNlIjoiIzUwNDZlNSIsInByaW1hcnkiOiIjNTA0NmU1IiwiYmdQYWdlIjoiI2ZmZmZmZiIsImdyb3VwQmciOiIjZmZmZmZmIiwiZ3JvdXBPdXRsaW5lIjoiI2Q0ZDFmZiJ9LCJzaXplcyI6eyJkZW5zaXR5IjoiZGVmYXVsdCIsInBhZ2VQYWRkaW5nIjoiMTVweCIsImdyb3VwR2FwIjoiMTVweCIsImdyb3VwQm9yZGVyUmFkaXVzIjoiNHB4Iiwid2lkZ2V0R2FwIjoiMTJweCJ9fSx7ImlkIjoiYTBkYWIyYTVmOWY0ZTNkMiIsInR5cGUiOiJnbG9iYWwtY29uZmlnIiwiZW52IjpbXSwibW9kdWxlcyI6eyJAZmxvd2Z1c2UvbnItdGFibGVzLW5vZGVzIjoiMC4xLjAiLCJAZmxvd2Z1c2Uvbm9kZS1yZWQtZGFzaGJvYXJkIjoiMS4yNi4wIiwibm9kZS1yZWQtY29udHJpYi1tb21lbnQiOiI1LjAuMCJ9fV0="
---
::



## Conclusion

You have successfully built a historical data dashboard using FlowFuse Tables and Node-RED. By implementing efficient batch inserts and optimized query patterns, you have created a solution that is both powerful and scalable for demanding Industrial IoT environments.

With FlowFuse Tables now part of the platform, you can build complete industrial applications without juggling external databases or leaving the FlowFuse environment. FlowFuse is now a comprehensive data platform with the ability to collect, connect, transform, store, and visualize data. Combined with FlowFuse's enterprise features—team collaboration, version control, device management, and secure deployments—you have everything needed to take your IIoT projects from prototype to production within one integrated platform.

This means less complexity and faster time to value for your industrial data initiatives. Your historical dashboards, real-time monitoring, and OEE dashboards can all live in the same ecosystem, managed by the same team, with consistent security and governance controls.

Ready to build your own time-series dashboard? [Get started with FlowFuse Tables](https://app.flowfuse.com/account/create) or [explore our industrial blueprints](/blueprints/)
