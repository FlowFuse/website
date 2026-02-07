---
updated: 2026-01-16 11:34:09 +0100
title: PDF Report Generator
description: Build PDF reports from your data.
image: blueprints/manufacturing/pdf-report-generator/oee-shift-report.png
tags:
    - blueprints
    - manufacturing
layout: layouts/blueprint.njk
blueprintId: lwkL6W0nDB
---

This Blueprint provides a means of generating PDF reports from a database.  It comes complete with a sample OEE database and a dashboard for selecting the facility, date and shift to build an OEE Shift Report.

## Getting Started with Blueprint

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

To test and explore the blueprint, sample data will be automatically generated in the "Database" tab of the flows.

Additionally, a dashboard has been included which is driven by the database and presents a set of fields for you to select a shift and generate a PDF report on the fly.

### Setting Up the Blueprint in the Real World

To use this blueprint with your own data, where necessary, replace the **SQLite** nodes with the database nodes suited to your data source.

To adapt the queries to your database structure:  

1. If your field names are different, edit the SQLite nodes and change the source field names in the queries (do not change the alias names as they define the structure of the returned data and its properties).
2. If your table names are different, edit the SQLite nodes and change the table names and if necessary use an alias.
3. Do not change the parameters that start with `$`, as they are used for dynamic values in the query.

For example: we have following query to retrieve the production data:

```sql
SELECT
    pd.id as id,
    pd.planned_runtime_minutes as planned_runtime_minutes,
    pd.runtime_minutes as runtime_minutes,
    pd.shift_date as shift_date,
    pd.planned_downtime_seconds as planned_downtime_seconds,
    pd.unplanned_downtime_seconds as unplanned_downtime_seconds,
    pd.total_units as total_units,
    pd.good_units as good_units,
    pd.scrap_units as scrap_units,
    pd.availability as availability,
    pd.performance as performance,
    pd.quality as quality,
    pd.oee_score as oee_score
FROM
    ProductionData pd
WHERE
    pd.facility_id = $facility_id
    AND pd.planned_shift_id = $shift_id;
```

If your database table is named `perf_data` instead of `ProductionData` and it uses different field names, such as `runtime` instead of `planned_runtime_minutes`, `shift_ident` instead of `planned_shift_id`, `machine` instead of `facility_id`, you should update the query field names to suit.
After modification, it should look like this:

```sql
SELECT
    pd.id as id,
    pd.runtime as planned_runtime_minutes,  -- updated field name
    pd.runtime_minutes as runtime_minutes,
    pd.shift_date as shift_date,
    pd.planned_downtime_seconds as planned_downtime_seconds,
    pd.unplanned_downtime_seconds as unplanned_downtime_seconds,
    pd.total_units as total_units,
    pd.good_units as good_units,
    pd.scrap_units as scrap_units,
    pd.availability as availability,
    pd.performance as performance,
    pd.quality as quality,
    pd.oee_score as oee_score
FROM
    perf_data pd -- updated table name
WHERE
    pd.machine = $facility_id  -- updated field name
    AND pd.shift_ident = $shift_id;  -- updated field name
```

## Conclusion

This Blueprint provides a basis for how to get your data from a database and compile a PDF report from its tables in a low code manner.
