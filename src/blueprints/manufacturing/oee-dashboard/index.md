---
updated: 2025-11-27 21:56:12 +0530
title: OEE Dashboard
description: Get started with this ready-to-use, fully customizable OEE dashboard template. Connect your data to track availability, performance, and quality in real time.
image: blueprints/manufacturing/oee-dashboard/oee-dashboard.png
tags:
    - blueprints
    - manufacturing
    - MES
layout: layouts/blueprint.njk
blueprintId: KoV08ENaBx
---

The OEE (Overall Equipment Effectiveness) Dashboard Blueprint provides a structured framework for visualizing and monitoring equipment performance, availability, and quality in manufacturing environments. This blueprint helps teams track key real-time metrics to improve efficiency and reduce downtime.

![OEE Dashboard Blueprint](./oee-dashboard--1.png)  
*OEE Dashboard Blueprint*

![OEE Dashboard Blueprint](./oee-dashboard--2.png)  
*OEE Dashboard Blueprint*

## Features

- **Real-time OEE Calculation:** Tracks Availability, Performance, and Quality metrics at the line level.
- **Visualization of Production Efficiency:** Displays good and defective product counts.
- **Downtime Summary:** Shows the duration for each downtime reason.
- **Top Underperforming Machines:** Identifies the lowest-performing machines in a production line based on OEE.
- **Recent Downtime Events:** Provides insights into the latest downtime incidents.
- **Historical Chart:** Displays daily OEE trends for production lines.
- **Customizable Dashboards:** Users can modify layouts and visualizations with a low-code Node-RED interface.

## Getting Started with OEE Dashboard Blueprint

### Prerequisites

Before moving forward, ensure you have the following prepared:

- A FlowFuse account with the Starter, Team, or Enterprise tier.

### Setting Up the Blueprint

1. To get started with the blueprint, click the "Start" button at the bottom. This will redirect you to the FlowFuse platform instance creation interface with the blueprint pre-selected.
2. Select the appropriate settings based on your preferences, such as instance type, application, and Node-RED version.
3. Click the “Create Instance” button.

Once the instance is successfully created, you can:

- Click the “Open Editor” button in the top-right corner to navigate to the Node-RED Editor.

### Testing the Blueprint with Simulated Data  

To test and explore the blueprint, use the simulated data. A flow is available in the blueprint to generate and insert simulated production and downtime data into an SQLite table, which is automatically created upon deployment. 

To use this flow:  

1. Switch to the **"Simulated Data Generation"** flow tab. 

![Simulated Data Generation tab](./simulated-data-gen.png)  
*Simulated Data Generation tab*

1. To start the process, click the inject node labeled **"Click to generate and insert demo data"**.  
2. Wait for a minute while the data is generated and inserted.  

This will populate the database with production and downtime records for the last 30 days, allowing you to analyze and test the dashboard effectively.

### Setting Up the Blueprint in the Real World

To implement the blueprint in a production environment, replace the **SQLite** node with the database where your production and downtime data is persisted. This can be **TimescaleDB**, **InfluxDB**, or any other suitable database.  

If you use **TimescaleDB** or another SQL-based database, the transition will be straightforward, as they share similar query structures. However, additional modifications will be required for **InfluxDB**, which is not SQL-based.  

For detailed instructions, refer to [how to set up and use different databases with Node-RED](/node-red/database/).

#### Blueprint Flexibility with Data  

The OEE Dashboard Blueprint is designed to be adaptable to various manufacturing setups. Users can integrate it with different data sources and customize dashboard elements according to specific needs.  

#### Customizing SQL Queries to Fit Your Database  

The blueprint includes two SQLite nodes connected to a **Template** node containing SQL queries:  

1. One SQLite flow retrieves data from the last X hours for a specified production line, combining results from both tables.

![flow to retrieve production and downtime data from the last X hours for only the specified line.](./first-sql-flows.png)  
*flow to retrieve production and downtime data from the last X hours for only the specified line.*

1. The other SQLite flow retrieves all data from both tables, combining results from both tables.

![Retrieve production and downtime data from only from the specified line.](./second-sql-flows.png)  
*Retrieve production and downtime data from only from the specified line.*

#### Modifying SQL Queries for Your Setup:  

To adapt the queries to your database structure:  

1. If your field names are different, only update the field names in the query—do not change the alias names inside, as they define the structure of the returned data and its properties.
2. Replace table names with the actual table names used in your database.
3. Do not change the parameters that start with $, as they are used for dynamic values in the query.

For example: we have following query to retrive the production data:

```sql
SELECT
    timestamp as timestamp,
    machine_name as machine_name,
    area as area,
    line as line,
    total_produced_units as total_produced_units,
    good_units as good_units,
    defect_units as defect_units,
    target_output as target_output
FROM ProductionData 
WHERE
    timestamp BETWEEN $startTime AND $endTime AND line = $line;
```

If your database uses different field names, such as time instead of timestamp, machine instead of machine_name, section instead of area, production_line instead of line, produced_units instead of total_produced_units, quality_units instead of good_units, faulty_units instead of defect_units, or planned_output instead of target_output, you should update the query accordingly. After modification, it should look like this:

```sql
SELECT
    time AS timestamp,
    machine AS machine_name,
    section AS area,
    production_line AS line,
    produced_units AS total_produced_units,
    quality_units AS good_units,
    faulty_units AS defect_units,
    planned_output AS target_output
FROM YourTableName 
WHERE 
    time BETWEEN $startTime AND $endTime AND production_line = $line;
```

To help you update them easily, I have added the SQL query with placeholders, along with instructions in the comment node named "Key Instructions: Read Before Proceeding." Make sure to read and follow them before proceeding.

#### Configuring Dashboard for Your Production Line 

The blueprint includes a single page that calculates and visualizes OEE for "Line-1" by default. You can modify this by following these steps:  

![Configuration Group](./configuration-group.png)  
*Configuration Group*

1. Locate the Change node labeled **"Set and store the current line and shift duration in context."**  
2. Update the **"line"** value to match your actual production line name.  
3. Set the **"shift_duration"** value to specify the actual shift duration of the line for the last **X hours** that you want to calculate OEE for.  
4. Update the **"shiftDuration24h"** value to represent the total shift duration within a **24-hour period**.  

#### Creating Additional Dashboard Pages for Other Lines  

If you need to create dashboard pages for additional production lines, follow these steps:  

1. **Copy the existing flow** from the current flow tab.  
2. **Create a new flow tab** in Node-RED and paste the copied flow.  
3. Locate the Change node labeled **"Set and store the current line and shift duration in context."** in the configuration group and update it with:  
   - The correct **line name**.  
   - The **shift_duration** value for the last **X hours** you want to calculate OEE for.  
   - The **shiftDuration24h** value for the total shift duration in **24 hours**.
4. Create a new page for the production line.
5. Locate the **"OEE Dashboard for Line 1."** Subflow.  
6. Double-click to configure it and **add a new groups** for each dashboard element and change the name of the subflow.  
7. When creating groups and pages, follow these configurations:  

##### Dashboard Group Size Configuration  

| Group Name | Width x Height |
|------------|--------------|
| Quality group | 3x2 |
| Availibility group | 3x2 |
| Performance group | 3x2 |
| OEE group | 3x2 |
| Production data group | 6x2 |
| Recent downtime groupe | 6x2 |
| Downtime summery group | 6x2 |
| Top underperforming machine group | 6x2 |
| OEE trend over time group | 12x1 |  

##### Dashboard Page Settings  

Ensure the following settings are applied to the new dashboard page:  

- **Theme**: Select **"OEE Blueprint Theme"**  
- **Layout**: Choose **"Grid"** layout  
- **Responsive Layout Table**: Change **Small Desktop Column Count** from **9 to 6**

Once you have added the flow and configuration correctly, you will see another page for your additional line.

## Conclusion

The OEE Dashboard Blueprint provides a comprehensive and adaptable solution for tracking and improving manufacturing efficiency. By offering real-time insights into production performance, downtime events, and quality metrics, this dashboard helps teams make data-driven decisions to optimize operations. With its low-code Node-RED integration, users can easily customize queries, dashboard layouts, and data sources to fit their specific manufacturing environment. Whether using simulated data for testing or integrating with live production databases, this blueprint serves as a powerful tool to enhance Overall Equipment Effectiveness.
