---
title: 'FlowFuse''s New Database: The Easiest Way to Store Industrial IoT Data'
navTitle: 'FlowFuse''s New Database: The Easiest Way to Store Industrial IoT Data'
---

FlowFuse recently introduced a [beta release](/handbook/engineering/releases/#beta-release) built-in database service to their platform, making it easier than ever to store Industrial IoT data. In a typical setup, you would need to provision a database, manage connection strings and credentials, configure nodes, and handle security settings. The goal of this new feature is to simplify or even eliminate those steps entirely. In this article, you will learn how it works and how to get started.

<!--more-->

## Getting Started

FlowFuse Tables is available for Enterprise users. If you do not have an Enterprise FlowFuse account and are interested in trying it out, [contact us](/contact-us/) to get started.

### Step 1: Enable the Database in Your Project

Once the database feature is active on your account, the first step is to create a database instance for your team to use.

1. Log in to your FlowFuse platform.
2. In the navigation menu on the left, select the Tables option.
3. On the next screen, you will be prompted to "Choose which Database you'd like to get started with."
4. Currently, only Managed PostgreSQL is available. Click on Managed PostgreSQL to proceed.

![FlowFuse Tables](/blog/2025/08/images/tables.png){data-zoomable}
_FlowFuse Tables_

After you make your selection, FlowFuse will begin provisioning your dedicated database in the background. This process typically takes only a few moments. 

Once the provisioning is complete, you will see two tabs in the Tables section:

- **Explorer** – Allows you to manage your tables through the user interface. You can create tables, add columns, and view stored data.

![FlowFuse Tables: Explorer Tab](/blog/2025/08/images/tables-explorer.png){data-zoomable}
_FlowFuse Tables: Explorer Tab_

- **Credentials** – Provides the database connection details such as host, port, username, and password. These credentials allow you to access the FlowFuse-managed database from outside FlowFuse as well.

![FlowFuse Tables: Credentials Tab](/blog/2025/08/images/tables-credentials.png){data-zoomable}
_FlowFuse Tables: Credentials Tab_

### Step 2: Create Your First Table

With your database instance provisioned, you can now create a table to start storing data.

FlowFuse offers two ways to create a table:

#### Option 1: Using the Table Explorer (UI)

Navigate to the Explorer tab under the Tables section.

1. Click the **+** button.
2. A form will slide in from the right side of the screen.
3. In the first input field, enter the name of your table.
4. Click Add New Column to start defining the structure of your table:
   - Column Name: Enter the name of the column.
   - Type: Select the appropriate data type (e.g., text, bigint, boolean).
   - Default: Check this if you want to set a default value for the column and Once checked, enter the default value in the input field that appears next.
   - Nullable: Check this if the column can contain empty (null) values.

![Interface for creating FlowFuse tables](/blog/2025/08/images/create-table.png){data-zoomable}
_Interface for creating FlowFuse tables_

5. Click Save once your columns are defined.

#### Option 2: Using SQL via the Query Node

If you prefer writing raw SQL or need more control over your table structure, you can use the Query node in Node-RED.

1. Go to your FlowFuse instance where you plan to build the flow and use this table.
2. Once you're in the Node-RED editor, look at the left-side node palette. You will find the Query node under the FlowFuse category.

![FlowFuse Query Node](/blog/2025/08/images/query-node.png){data-zoomable}
_FlowFuse Query Node_

3. Drag the Query node into your flow.

>The Query node uses standard SQL syntax and is pre-configured to connect to your FlowFuse-managed database automatically — you do not need to manually enter any database credentials when working inside a FlowFuse Node-RED instance. 

4. Double-click the Query node and write your SQL command in the Query field.

Note: Table names and column names are case-sensitive in SQL when using certain databases like PostgreSQL. To avoid unexpected errors, it is recommended to wrap them in double quotes in your queries.: 

For example:
```sql
CREATE TABLE "maintenance_tasks" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "assigned_to" TEXT NOT NULL,
  "due_date" DATE NOT NULL,
  "status" TEXT NOT NULL CHECK ("status" IN ('pending', 'in_progress', 'completed')),
  "priority" TEXT NOT NULL CHECK ("priority" IN ('low', 'medium', 'high'))
);
```

> If you want to send the SQL query dynamically at runtime, you can pass it through `msg.query` instead of hardcoding it in the node configuration.

5. Add an Inject node to trigger the query and optionally connect a Debug node to see the output.
6. Deploy and click the inject button to create the table.

### Step 3: Performing Operations with Your Table

Once your table is ready, you can start interacting with it using the **Query** node. This node allows you to run SQL queries directly—whether it is inserting new data, retrieving records, updating rows, or deleting entries. You can perform all standard operations just as you would with the other database nodes. For this demonstration, you will see how to insert data into your table.

> For a complete walkthrough of CRUD operations, you can try out the flow provided at the end of this guide.

#### Inserting a New Record

1. In your Node-RED editor, drag a **Query** node from the FlowFuse category.

2. Add an **Inject** node.

3. Drag a Change node and place it between the Inject and **Query** nodes. Connect the Inject node to the Change node, and then connect the Change node to the Query node. Double-click the Change node and configure the following properties based on your SQL query requirements. For example:

   - `msg.title` = `"Check motor status"`
   - `msg.description` = `"Routine check of motor and related sensors"`
   - `msg.assigned_to` = `"technician_1"`
   - `msg.due_date` = `"2025-08-10"`
   - `msg.status` = `"pending"`
   - `msg.priority` = `"medium"`

4. Double-click the Query node and write the SQL command in the **Query** field, For example:


```mustache
INSERT INTO "maintenance_tasks" (
  "title",
  "description",
  "assigned_to",
  "due_date",
  "status",
  "priority"
) VALUES (
  {{{msg.title}}},
  {{{msg.description}}},
  {{{msg.assigned_to}}},
  {{{msg.due_date}}},
  {{{msg.status}}},
  {{{msg.priority}}}
);
```


> This node uses the [Mustache template system](https://github.com/janl/mustache.js) to dynamically generate queries based on message properties, using the `{{{ msg.property }}}` syntax.
>
> While convenient for quick testing and prototyping, this method is **not recommended for production use**. For better reliability and maintainability, consider using parameterized queries, for that follow [Using Parameters in Your Queries](#using-parameters-in-your-queries).

5. Optionally, connect a **Debug** node to the output of the Query node to inspect the result.

6. Deploy the flow and click the **Inject** button to execute the query.

Upon a successful insert operation, the Query node will output a `msg.payload` containing an empty array, and a `msg.pgsql` object that includes the executed command and a `rowCount` indicating the number of rows affected.

For update or delete operations, the behavior is the same. For select operations, the `msg.payload` will contain an array of the returned rows.

### Using Parameters in Your Queries

As mentioned earlier, placing Mustache-style strings directly into SQL queries is not considered a best practice. Instead, you should use parameterized queries to keep your queries cleaner, more reliable, and easier to maintain while following best practices.

The FlowFuse Query node supports both **numbered parameters** and **named parameters**, making your SQL queries more flexible, secure, and reusable.

#### Option 1: Numbered Parameters

Numbered parameters let you define placeholders in the SQL string and then pass actual values through `msg.params` as an array.

1. Drag an **Inject** node.

2. Drag a **Change** node and set properties based on your SQL command requirements. For example:

   - Set `msg.payload.priority` to 'high'
   - Set `msg.payload.status` to 'pending'

3. Add a **Change** node and set `msg.params` to `[msg.payload.priority, msg.payload.status]`.
4. Add a **Query** node and write an SQL query with numbered parameters. For example:

```sql
SELECT * FROM "maintenance_tasks"
WHERE "priority" = $1 AND "status" = $2;
```

5. Optionally, add a **Debug** node to view the output.
6. Connect the Inject node to the Change node that sets the payload values, then connect it to another Change node that sets the query parameters. Next, connect it to the Query node, and finally connect the Query node to the Debug node.
7. Deploy the flow and trigger the Inject node.

This query will retrieve rows where `priority` and `status` match the specified values. When you click the Inject node, the actual values from `msg.params` will be passed into the placeholders `$1` and `$2`.

#### Option 2: Named Parameters

Named parameters allow you to reference values by name using a dollar prefix (e.g., `$status`) in your SQL query. The actual values are passed using `msg.queryParameters` as an object.

1. Drag an **Inject** node.

2. Drag a **Change** node and set properties based on your SQL command requirements. For example:

   - Set `msg.payload.id` to 1
   - Set `msg.payload.status` to "in_progress"

3. Add another **Change** node and set `msg.queryParameters` to `{}`. Then add the following rules:

   - Set `msg.queryParameters.id` to `msg.payload.id`
   - Set `msg.queryParameters.status` to `msg.payload.status`

4. Add a **Query** node and write the SQL query using named parameters. For example:

   ```sql
   UPDATE "maintenance_tasks"
   SET "status" = $status
   WHERE "id" = $id;
   ```

5. Optionally, add a **Debug** node to view the output.

6. Connect the Inject node to the Change node that sets the payload values, then connect it to another Change node that sets the query parameters. Next, connect it to the Query node, and finally connect the Query node to the Debug node.

7. Deploy the flow and click the **Inject** button to trigger the update.

When the flow runs, the values in `msg.queryParameters` will replace `$status` and `$id` in the SQL statement, ensuring that your queries are dynamic, readable, and secure.

The Node-RED flow provided below demonstrates a complete set of database interactions. It covers table creation, all standard CRUD (Create, Read, Update, Delete) operations, and includes examples of how to use both numbered and named parameters.



::render-flow
---
height: 300
flow: "W3siaWQiOiIxYjMyZDRjODc4YWFlM2JlIiwidHlwZSI6ImRlYnVnIiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjQ3MCwieSI6NDIwLCJ3aXJlcyI6W119LHsiaWQiOiI1OWU0Yjk5NzIzNWI0ODZmIiwidHlwZSI6Imdyb3VwIiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJuYW1lIjoiIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI4OTFjN2Y1MGRmOTlkZTQyIiwiNmIwNjMwYzExMDFiZTU5YyIsIjM1ZWRhMGI2YzY5MGU4NWYiLCJkNjM4OTkwYjA0ZTc1ZjczIiwiMGUwYmRjODgxZDRmZjVlOSIsIjhmNjZmMjdmNGZlNWEzYjEiLCI1YzJkYTg1OTc5MmMxNmZhIl0sIngiOjU0LCJ5IjoyMzksInciOjUzMiwiaCI6MjIyfSx7ImlkIjoiODkxYzdmNTBkZjk5ZGU0MiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI1OWU0Yjk5NzIzNWI0ODZmIiwibmFtZSI6IiIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoxNTAsInkiOjMyMCwid2lyZXMiOltbIjZiMDYzMGMxMTAxYmU1OWMiXV19LHsiaWQiOiI2YjA2MzBjMTEwMWJlNTljIiwidHlwZSI6InRhYmxlcy1xdWVyeSIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6IjU5ZTRiOTk3MjM1YjQ4NmYiLCJuYW1lIjoiQ3JlYXRlIFRhYmxlIiwicXVlcnkiOiJDUkVBVEUgVEFCTEUgXCJtYWludGVuYW5jZV90YXNrc1wiIChcbiAgXCJpZFwiIFNFUklBTCBQUklNQVJZIEtFWSxcbiAgXCJ0aXRsZVwiIFRFWFQgTk9UIE5VTEwsXG4gIFwiZGVzY3JpcHRpb25cIiBURVhULFxuICBcImFzc2lnbmVkX3RvXCIgVEVYVCBOT1QgTlVMTCxcbiAgXCJkdWVfZGF0ZVwiIERBVEUgTk9UIE5VTEwsXG4gIFwic3RhdHVzXCIgVEVYVCBOT1QgTlVMTCBDSEVDSyAoXCJzdGF0dXNcIiBJTiAoJ3BlbmRpbmcnLCAnaW5fcHJvZ3Jlc3MnLCAnY29tcGxldGVkJykpLFxuICBcInByaW9yaXR5XCIgVEVYVCBOT1QgTlVMTCBDSEVDSyAoXCJwcmlvcml0eVwiIElOICgnbG93JywgJ21lZGl1bScsICdoaWdoJykpXG4pO1xuXG4iLCJzcGxpdCI6ZmFsc2UsInJvd3NQZXJNc2ciOjEsIngiOjMxMCwieSI6MzIwLCJ3aXJlcyI6W1siMzVlZGEwYjZjNjkwZTg1ZiJdXX0seyJpZCI6IjM1ZWRhMGI2YzY5MGU4NWYiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI1OWU0Yjk5NzIzNWI0ODZmIiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo0OTAsInkiOjMyMCwid2lyZXMiOltdfSx7ImlkIjoiZDYzODk5MGIwNGU3NWY3MyIsInR5cGUiOiJjb21tZW50IiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJnIjoiNTllNGI5OTcyMzViNDg2ZiIsIm5hbWUiOiJIYXJkY29kZSBxdWVyeSB3aXRoaW4gbm9kZSIsImluZm8iOiIiLCJ4IjoyMDAsInkiOjI4MCwid2lyZXMiOltdfSx7ImlkIjoiMGUwYmRjODgxZDRmZjVlOSIsInR5cGUiOiJjb21tZW50IiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJnIjoiNTllNGI5OTcyMzViNDg2ZiIsIm5hbWUiOiJEeW5hbWljYWxseSBwYXNzaW5nIHF1ZXJ5IiwiaW5mbyI6IiIsIngiOjE5MCwieSI6MzgwLCJ3aXJlcyI6W119LHsiaWQiOiI4ZjY2ZjI3ZjRmZTVhM2IxIiwidHlwZSI6ImluamVjdCIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6IjU5ZTRiOTk3MjM1YjQ4NmYiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJxdWVyeSIsInYiOiJTRUxFQ1QgKiBGUk9NIFwibWFpbnRlbmFuY2VfdGFza3NcIjsiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoxNTAsInkiOjQyMCwid2lyZXMiOltbIjVjMmRhODU5NzkyYzE2ZmEiXV19LHsiaWQiOiI1YzJkYTg1OTc5MmMxNmZhIiwidHlwZSI6InRhYmxlcy1xdWVyeSIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6IjU5ZTRiOTk3MjM1YjQ4NmYiLCJuYW1lIjoiU0VMRUNUIiwicXVlcnkiOiIiLCJzcGxpdCI6ZmFsc2UsInJvd3NQZXJNc2ciOjEsIngiOjMwMCwieSI6NDIwLCJ3aXJlcyI6W1siMWIzMmQ0Yzg3OGFhZTNiZSJdXX0seyJpZCI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsIm5hbWUiOiJDUlVEIHdpdGggTmFtZWQgUGFyYW1ldGVycyIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiYTcwYjc5ZTJkMTk2MzUxOCIsIjhhNjE3OTc3NDM4YWVkZDEiLCJlNzI1ZmNhMzM4YmZjNzYzIiwiZWY1Y2RlM2IyZTRhZTZlNSIsImFlMDcxY2Y4Mzk0N2MyMDQiLCIyNmRlMzQxMzAxYjUzNzhiIiwiZDFjMjQ1OGRkZWY1MWU4ZiIsImViNDA3MTI4Y2FlYTFjMmYiLCIwYjE5MmM4NWZhYWVlOTk2IiwiOGRiMWMyMjhlMWI0NjRmZCIsIjBhZDE0NDllZTc5MmI2MjMiLCI5YTgxYzg4NDMzNjI2YmY3IiwiNjdhZDNlZGRkNzkyMDU0NyIsIjdiNWUzZTUwMTRiYTYyY2IiLCIwMjhiZDk4YmRjZjU1YThhIiwiZDEyZTQ0YTFlZWZiM2Y2ZSIsIjdiN2MzYjM1ODZjNTdiNmQiLCJhM2Y1OGVkYzI5NzEyYjc1IiwiZTVhNzFiODY1YTgwMjQ4YyIsImQ2Y2JjNTVjNjZhMDJlMzYiLCI2YmFiMGUzNDQxNzhlZDRhIl0sIngiOjU0LCJ5Ijo0NzksInciOjkxMiwiaCI6MjYyfSx7ImlkIjoiYTcwYjc5ZTJkMTk2MzUxOCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI5OGYxYzEzNDU4MWUwY2RjIiwibmFtZSI6Ikluc2VydCIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoxNTAsInkiOjU4MCwid2lyZXMiOltbIjdiNWUzZTUwMTRiYTYyY2IiXV19LHsiaWQiOiI4YTYxNzk3NzQzOGFlZGQxIiwidHlwZSI6InRhYmxlcy1xdWVyeSIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiSW5zZXJ0IiwicXVlcnkiOiJJTlNFUlQgSU5UTyBcIm1haW50ZW5hbmNlX3Rhc2tzXCIgKFxuICBcInRpdGxlXCIsXG4gIFwiZGVzY3JpcHRpb25cIixcbiAgXCJhc3NpZ25lZF90b1wiLFxuICBcImR1ZV9kYXRlXCIsXG4gIFwic3RhdHVzXCIsXG4gIFwicHJpb3JpdHlcIlxuKSBWQUxVRVMgKFxuICAkdGl0bGUsXG4gICRkZXNjcmlwdGlvbixcbiAgJGFzc2lnbmVkX3RvLFxuICAkZHVlX2RhdGUsXG4gICRzdGF0dXMsXG4gICRwcmlvcml0eVxuKTtcbiIsInNwbGl0IjpmYWxzZSwicm93c1Blck1zZyI6MSwieCI6NzMwLCJ5Ijo1ODAsIndpcmVzIjpbWyJlNzI1ZmNhMzM4YmZjNzYzIl1dfSx7ImlkIjoiZTcyNWZjYTMzOGJmYzc2MyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjg3MCwieSI6NTgwLCJ3aXJlcyI6W119LHsiaWQiOiJlZjVjZGUzYjJlNGFlNmU1IiwidHlwZSI6InRhYmxlcy1xdWVyeSIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiVXBkYXRlIiwicXVlcnkiOiJVUERBVEUgXCJtYWludGVuYW5jZV90YXNrc1wiXG5TRVQgXCJzdGF0dXNcIiA9ICRzdGF0dXNcbldIRVJFIFwiaWRcIiA9ICRpZDtcbiIsInNwbGl0IjpmYWxzZSwicm93c1Blck1zZyI6MSwieCI6NzQwLCJ5Ijo2NjAsIndpcmVzIjpbWyIyNmRlMzQxMzAxYjUzNzhiIl1dfSx7ImlkIjoiYWUwNzFjZjgzOTQ3YzIwNCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI5OGYxYzEzNDU4MWUwY2RjIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InF1ZXJ5UGFyYW1ldGVycyIsInB0IjoibXNnIiwidG8iOiJ7fSIsInRvdCI6Impzb24ifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLmlkIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuaWQiLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLnN0YXR1cyIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLnN0YXR1cyIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1ODAsInkiOjY2MCwid2lyZXMiOltbImVmNWNkZTNiMmU0YWU2ZTUiXV19LHsiaWQiOiIyNmRlMzQxMzAxYjUzNzhiIiwidHlwZSI6ImRlYnVnIiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJnIjoiOThmMWMxMzQ1ODFlMGNkYyIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6ODcwLCJ5Ijo2NjAsIndpcmVzIjpbXX0seyJpZCI6ImQxYzI0NThkZGVmNTFlOGYiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJnIjoiOThmMWMxMzQ1ODFlMGNkYyIsIm5hbWUiOiJVcGRhdGUiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MTUwLCJ5Ijo2NjAsIndpcmVzIjpbWyIwMjhiZDk4YmRjZjU1YThhIl1dfSx7ImlkIjoiZWI0MDcxMjhjYWVhMWMyZiIsInR5cGUiOiJ0YWJsZXMtcXVlcnkiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI5OGYxYzEzNDU4MWUwY2RjIiwibmFtZSI6IlNFTEVDVCIsInF1ZXJ5IjoiU0VMRUNUICogRlJPTSBcIm1haW50ZW5hbmNlX3Rhc2tzXCJcbldIRVJFIFwicHJpb3JpdHlcIiA9ICRwcmlvcml0eSBBTkQgXCJzdGF0dXNcIiA9ICdwZW5kaW5nJztcbiIsInNwbGl0IjpmYWxzZSwicm93c1Blck1zZyI6MSwieCI6NzQwLCJ5Ijo2MjAsIndpcmVzIjpbWyI4ZGIxYzIyOGUxYjQ2NGZkIl1dfSx7ImlkIjoiMGIxOTJjODVmYWFlZTk5NiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI5OGYxYzEzNDU4MWUwY2RjIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InF1ZXJ5UGFyYW1ldGVycyIsInB0IjoibXNnIiwidG8iOiJ7fSIsInRvdCI6Impzb24ifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLnByaW9yaXR5IiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQucHJpb3JpdHkiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTgwLCJ5Ijo2MjAsIndpcmVzIjpbWyJlYjQwNzEyOGNhZWExYzJmIl1dfSx7ImlkIjoiOGRiMWMyMjhlMWI0NjRmZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjg3MCwieSI6NjIwLCJ3aXJlcyI6W119LHsiaWQiOiIwYWQxNDQ5ZWU3OTJiNjIzIiwidHlwZSI6ImluamVjdCIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiU0VMRUNUIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjE2MCwieSI6NjIwLCJ3aXJlcyI6W1siOWE4MWM4ODQzMzYyNmJmNyJdXX0seyJpZCI6IjlhODFjODg0MzM2MjZiZjciLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJnIjoiOThmMWMxMzQ1ODFlMGNkYyIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkLnByaW9yaXR5IiwicHQiOiJtc2ciLCJ0byI6ImhpZ2giLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MzUwLCJ5Ijo2MjAsIndpcmVzIjpbWyIwYjE5MmM4NWZhYWVlOTk2Il1dfSx7ImlkIjoiNjdhZDNlZGRkNzkyMDU0NyIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI5OGYxYzEzNDU4MWUwY2RjIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InF1ZXJ5UGFyYW1ldGVycyIsInB0IjoibXNnIiwidG8iOiJ7fSIsInRvdCI6Impzb24ifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLnRpdGxlIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQudGl0bGUiLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLmRlc2NyaXB0aW9uIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuZGVzY3JpcHRpb24iLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLmFzc2lnbmVkX3RvIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuYXNzaWduZWRfdG8iLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLmR1ZV9kYXRlIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuZHVlX2RhdGUiLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLnN0YXR1cyIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLnN0YXR1cyIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJxdWVyeVBhcmFtZXRlcnMucHJpb3JpdHkiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5wcmlvcml0eSIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1ODAsInkiOjU4MCwid2lyZXMiOltbIjhhNjE3OTc3NDM4YWVkZDEiXV19LHsiaWQiOiI3YjVlM2U1MDE0YmE2MmNiIiwidHlwZSI6ImNoYW5nZSIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZC50aXRsZSIsInB0IjoibXNnIiwidG8iOiJSZXBsYWNlIGFpciBjb25kaXRpb25lciBmaWx0ZXIiLCJ0b3QiOiJzdHIifSx7InQiOiJzZXQiLCJwIjoicGF5bG9hZC5kZXNjcmlwdGlvbiIsInB0IjoibXNnIiwidG8iOiJUaGUgYWlyIGZpbHRlciBpbiB0aGUgbWFpbiBvZmZpY2UgbmVlZHMgdG8gYmUgcmVwbGFjZWQgdG8gbWFpbnRhaW4gYWlyIHF1YWxpdHkuIiwidG90Ijoic3RyIn0seyJ0Ijoic2V0IiwicCI6InBheWxvYWQuYXNzaWduZWRfdG8iLCJwdCI6Im1zZyIsInRvIjoiamRvZSIsInRvdCI6InN0ciJ9LHsidCI6InNldCIsInAiOiJwYXlsb2FkLmR1ZV9kYXRlIiwicHQiOiJtc2ciLCJ0byI6IjIwMjUtMDgtMTUiLCJ0b3QiOiJzdHIifSx7InQiOiJzZXQiLCJwIjoicGF5bG9hZC5zdGF0dXMiLCJwdCI6Im1zZyIsInRvIjoicGVuZGluZyIsInRvdCI6InN0ciJ9LHsidCI6InNldCIsInAiOiJwYXlsb2FkLnByaW9yaXR5IiwicHQiOiJtc2ciLCJ0byI6ImhpZ2giLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MzIwLCJ5Ijo1ODAsIndpcmVzIjpbWyI2N2FkM2VkZGQ3OTIwNTQ3Il1dfSx7ImlkIjoiMDI4YmQ5OGJkY2Y1NWE4YSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI5OGYxYzEzNDU4MWUwY2RjIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQuaWQiLCJwdCI6Im1zZyIsInRvIjoiMSIsInRvdCI6Im51bSJ9LHsidCI6InNldCIsInAiOiJwYXlsb2FkLnN0YXR1cyIsInB0IjoibXNnIiwidG8iOiJpbl9wcm9ncmVzcyIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjozMjAsInkiOjY2MCwid2lyZXMiOltbImFlMDcxY2Y4Mzk0N2MyMDQiXV19LHsiaWQiOiJkMTJlNDRhMWVlZmIzZjZlIiwidHlwZSI6InRhYmxlcy1xdWVyeSIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiRGVsZXRlIiwicXVlcnkiOiJERUxFVEUgRlJPTSBcIm1haW50ZW5hbmNlX3Rhc2tzXCJcbldIRVJFIFwiaWRcIiA9ICRpZDtcbiIsInNwbGl0IjpmYWxzZSwicm93c1Blck1zZyI6MSwieCI6NzMwLCJ5Ijo3MDAsIndpcmVzIjpbWyJhM2Y1OGVkYzI5NzEyYjc1Il1dfSx7ImlkIjoiN2I3YzNiMzU4NmM1N2I2ZCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI5OGYxYzEzNDU4MWUwY2RjIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InF1ZXJ5UGFyYW1ldGVycyIsInB0IjoibXNnIiwidG8iOiJ7fSIsInRvdCI6Impzb24ifSx7InQiOiJzZXQiLCJwIjoicXVlcnlQYXJhbWV0ZXJzLmlkIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuaWQiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTgwLCJ5Ijo3MDAsIndpcmVzIjpbWyJkMTJlNDRhMWVlZmIzZjZlIl1dfSx7ImlkIjoiYTNmNThlZGMyOTcxMmI3NSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjg3MCwieSI6NzAwLCJ3aXJlcyI6W119LHsiaWQiOiJlNWE3MWI4NjVhODAyNDhjIiwidHlwZSI6ImluamVjdCIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6Ijk4ZjFjMTM0NTgxZTBjZGMiLCJuYW1lIjoiREVMRVRFIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjE2MCwieSI6NzAwLCJ3aXJlcyI6W1siZDZjYmM1NWM2NmEwMmUzNiJdXX0seyJpZCI6ImQ2Y2JjNTVjNjZhMDJlMzYiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJnIjoiOThmMWMxMzQ1ODFlMGNkYyIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkLmlkIiwicHQiOiJtc2ciLCJ0byI6IjIiLCJ0b3QiOiJudW0ifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MzMwLCJ5Ijo3MDAsIndpcmVzIjpbWyI3YjdjM2IzNTg2YzU3YjZkIl1dfSx7ImlkIjoiNmJhYjBlMzQ0MTc4ZWQ0YSIsInR5cGUiOiJjb21tZW50IiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJnIjoiOThmMWMxMzQ1ODFlMGNkYyIsIm5hbWUiOiJOYW1lZCBQYXJhbWV0ZXJzIiwiaW5mbyI6IiIsIngiOjE3MCwieSI6NTIwLCJ3aXJlcyI6W119LHsiaWQiOiI3ZDU4NGExNzY1MmY2NTQ1IiwidHlwZSI6Imdyb3VwIiwieiI6ImZhOWRhM2Y0NWY5NDkwNjciLCJuYW1lIjoiRXhhbXBsZSBmbG93OiBudW1iZXJlZCBwYXJhbWV0ZXJzIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyJjNjg2OTBkMjU0NmY2NWNmIiwiZWI2NWMxYTQ0YWUyNWRkNyIsImYzOGZlZDkwYzhlMWYyZjYiLCIyYjllNDg2Y2NhMjEyNjM2IiwiZjQ5MmQ2NmFhMjVlMjBhYSJdLCJ4Ijo1NCwieSI6NzU5LCJ3Ijo2NzIsImgiOjEyMn0seyJpZCI6ImM2ODY5MGQyNTQ2ZjY1Y2YiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6IjdkNTg0YTE3NjUyZjY1NDUiLCJuYW1lIjoiTnVtYmVyZWQgUGFyYW1ldGVycyIsImluZm8iOiIiLCJ4IjoxODAsInkiOjgwMCwid2lyZXMiOltdfSx7ImlkIjoiZWI2NWMxYTQ0YWUyNWRkNyIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6IjdkNTg0YTE3NjUyZjY1NDUiLCJuYW1lIjoiZnVuY3Rpb24gMyIsImZ1bmMiOiJtc2cucGFyYW1zID0ge31cbm1zZy5wYXJhbXMgPSBbbXNnLnBheWxvYWQudGl0bGUsIG1zZy5wYXlsb2FkLmRlc2NyaXB0aW9uLCBtc2cucGF5bG9hZC5hc3NpZ25lZF90bywgbXNnLnBheWxvYWQuZHVlX2RhdGUsIG1zZy5wYXlsb2FkLnN0YXR1cywgbXNnLnBheWxvYWQucHJpb3JpdHldXG5yZXR1cm4gbXNnO1xuIiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4IjozMjAsInkiOjg0MCwid2lyZXMiOltbIjJiOWU0ODZjY2EyMTI2MzYiXV19LHsiaWQiOiJmMzhmZWQ5MGM4ZTFmMmY2IiwidHlwZSI6ImluamVjdCIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6IjdkNTg0YTE3NjUyZjY1NDUiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJ7XCJ0aXRsZVwiOlwiUmVwbGFjZSBhaXIgY29uZGl0aW9uZXIgZmlsdGVyXCIsXCJkZXNjcmlwdGlvblwiOlwiVGhlIGFpciBmaWx0ZXIgaW4gdGhlIG1haW4gb2ZmaWNlIG5lZWRzIHRvIGJlIHJlcGxhY2VkIHRvIG1haW50YWluIGFpciBxdWFsaXR5LlwiLFwiYXNzaWduZWRfdG9cIjpcImpkb2VcIixcImR1ZV9kYXRlXCI6XCIyMDI1LTA4LTE1XCIsXCJzdGF0dXNcIjpcInBlbmRpbmdcIixcInByaW9yaXR5XCI6XCJoaWdoXCJ9IiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MTUwLCJ5Ijo4NDAsIndpcmVzIjpbWyJlYjY1YzFhNDRhZTI1ZGQ3Il1dfSx7ImlkIjoiMmI5ZTQ4NmNjYTIxMjYzNiIsInR5cGUiOiJ0YWJsZXMtcXVlcnkiLCJ6IjoiZmE5ZGEzZjQ1Zjk0OTA2NyIsImciOiI3ZDU4NGExNzY1MmY2NTQ1IiwibmFtZSI6Ikluc2VydCIsInF1ZXJ5IjoiSU5TRVJUIElOVE8gXCJtYWludGVuYW5jZV90YXNrc1wiIChcbiAgXCJ0aXRsZVwiLFxuICBcImRlc2NyaXB0aW9uXCIsXG4gIFwiYXNzaWduZWRfdG9cIixcbiAgXCJkdWVfZGF0ZVwiLFxuICBcInN0YXR1c1wiLFxuICBcInByaW9yaXR5XCJcbikgVkFMVUVTIChcbiAgJDEsICQyLCAkMywgJDQsICQ1LCAkNlxuKTtcbiIsInNwbGl0IjpmYWxzZSwicm93c1Blck1zZyI6MSwieCI6NDkwLCJ5Ijo4NDAsIndpcmVzIjpbWyJmNDkyZDY2YWEyNWUyMGFhIl1dfSx7ImlkIjoiZjQ5MmQ2NmFhMjVlMjBhYSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJmYTlkYTNmNDVmOTQ5MDY3IiwiZyI6IjdkNTg0YTE3NjUyZjY1NDUiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjYzMCwieSI6ODQwLCJ3aXJlcyI6W119LHsiaWQiOiI1M2I0OTYzZWYwMDVlYWRmIiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7IkBmbG93ZnVzZS9uci10YWJsZXMtbm9kZXMiOiIwLjEuMCJ9fV0="
---
::



## Wrapping Up

You've now learned how to leverage FlowFuse Tables to simplify database management in your Industrial IoT projects. Here's what you've accomplished:

- **Provisioned** a managed PostgreSQL database with zero configuration overhead
- **Created tables** using both the intuitive UI and flexible SQL approach  
- **Executed queries** safely using parameterized queries for production-ready flows
- **Performed CRUD operations** with the versatile Query node

The combination of FlowFuse Tables and the built-in [MQTT broker](/blog/2024/10/announcement-mqtt-broker/) eliminates the complexity of managing external database and messaging infrastructure, letting you focus on building automation solutions rather than wrestling with DevOps.

Ready to see how FlowFuse Tables can accelerate your next industrial project? [Book a demo with our team](/book-demo/) to explore the full platform capabilities.

*Next up: We'll dive into Query node advanced features including backpressure handling and streaming large datasets—essential techniques for high-volume industrial applications.*
