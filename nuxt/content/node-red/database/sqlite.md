---
title: "Using SQLite with Node-RED (2026 Updated)"
description: "Learn how to seamlessly integrate SQLite with Node-RED for efficient data management and application development."
---

# {{ meta.title }}

SQLite is a lightweight, self-contained database that does not require a server. It is ideal for quick setups, small applications, and IoT devices, as it stores data directly in files and is easy to manage.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following:

- Ensure you have a running Node-RED instance. The quickest and easiest way to have a manageable and scalable Node-RED instance is by [signing up on FlowFuse](https://app.flowfuse.com/) and creating an instance.
- Install the `node-red-node-sqlite` package using the **Palette Manager**. This is the official Node-RED SQLite node maintained by the Node-RED team, ensuring reliability and compatibility.  

### Configuring SQLite in Node-RED

1. Drag the **sqlite** node onto the Node-RED canvas and double-click it.  
2. In the **Database** field, click the **+** icon to add a new configuration. Enter the database name.  
   - Example: `yourdbname`  
   - For a temporary database `/tmp/yourdbname`.  
3. Select the appropriate **Mode/Permissions**:  
   - **Read-Write-Create**  
   - **Read-Write**  
   - **Read-Only**  
4. Click **Add**, then **Done** to save the configuration.  

### Understanding Types of SQL Queries Available

The SQLite node provides four options to specify the SQL query type:

- **Fixed Statement** – A static SQL query defined directly in the node.  
- **Via `msg.topic`** – Accepts the SQL query dynamically from the incoming message's `msg.topic`.  
- **Prepared Statement** – Uses placeholders in the SQL query, with values supplied via `msg.params` for safer and reusable queries.  
- **Batch Without Response** – Executes multiple queries in a batch without returning any results, useful for bulk inserts or updates.  

Most users are familiar with **Fixed Statement** and **Via `msg.topic`**, so let us explore the other two options in more detail.

#### Prepared Statement

Prepared statements let you safely insert values into queries without worrying about SQL injection. Instead of concatenating strings, you use placeholders and pass the actual values separately.

There are two ways to pass parameters:

**1. Using Named Parameters (Object)**

Use `$` placeholders in your query and pass values as an object in `msg.params`:

```javascript
// Function node before sqlite
msg.params = {
  $id: 1,
  $name: "John Doe"
}
return msg;
```

**SQL Query:**
```sql
INSERT INTO user_table (user_id, user) VALUES ($id, $name);
```

**2. Using Positional Parameters (Array)**

Use item-number placeholders ($1, $2, etc.) and pass the values as an array in `msg.params`.

```javascript
// Function node before sqlite
msg.params = [1, "John Doe"];
return msg;
```

**SQL Query:**
```sql
INSERT INTO user_table (user_id, user) VALUES ($1, $2);
```

#### Batch Without Response

Batch mode allows you to execute **multiple SQL statements in a single operation** without retrieving any results. This is ideal for bulk inserts, updates, deletes, or schema changes where you don't need data returned.

The SQL statements are **dynamically generated in code** and passed as a single string in `msg.topic`, with each statement separated by a semicolon.

**Example - Simple Batch:**

```javascript
// Function node before sqlite
// Generate multiple SQL statements
msg.topic = `
    INSERT INTO user_table (user_id, user) VALUES (1, 'Alice');
    INSERT INTO user_table (user_id, user) VALUES (2, 'Bob');
    UPDATE user_table SET user = 'Alice Smith' WHERE user_id = 1;
`;
return msg;
```

**Example - Programmatically Generated Batch:**

```javascript
// Function node before sqlite
// Build SQL from array of data
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

// Generate INSERT statements dynamically
const inserts = users.map(u => 
    `INSERT INTO user_table (user_id, user) VALUES (${u.id}, '${u.name}');`
).join('\n');

msg.topic = inserts;
return msg;
```

> **Note:** If any of the values used to build batch SQL statements come from user input or external sources, always sanitize them or switch to prepared statements. Building SQL strings directly can expose your application to SQL injection vulnerabilities.

### Complete CRUD Operations Example

This section demonstrates a simple workflow for Create, Read, Update, and Delete operations using SQLite in Node-RED. Each operation will demonstrate a different SQL query type available in the SQLite node, giving you practical experience with all four methods: Fixed Statement, Via msg.topic, Prepared Statement, and Batch Without Response with important CRUD operations.

> **Note:** The following examples use a `devices` table instead of the `user_table` shown in the Prepared Statement and Batch examples above. This provides a more complete, real-world scenario for demonstrating CRUD operations. The importable flow at the end of this section includes all the necessary table creation and operations for the `devices` table.

#### Create Table

1. Drag an **inject** node onto the canvas.
2. Drag the **sqlite** node onto the canvas and double-click it.
3. Select the correct SQLite configuration from the database dropdown.
4. Choose **fixed statement** as the SQL query type.
5. Enter the following SQL in the query field:

```sql
CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL UNIQUE,
    name TEXT,
    status TEXT,
    location TEXT,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

6. Add a **debug** node and connect all nodes.
7. Deploy the flow and click the inject button.

#### Insert

1. Drag an **inject** node onto the canvas.
2. Drag a **function** node and add the following code:

```javascript
const devices = [
    { id: 'DEV002', name: 'Pressure Sensor', status: 'offline', location: 'Factory Floor 2' },
    { id: 'DEV003', name: 'Humidity Sensor', status: 'online', location: 'Warehouse 1' },
    { id: 'DEV004', name: 'Vibration Sensor', status: 'online', location: 'Factory Floor 3' },
    { id: 'DEV005', name: 'Flow Sensor', status: 'offline', location: 'Plant 1' },
    { id: 'DEV006', name: 'Level Sensor', status: 'online', location: 'Tank 1' }
];

const batchSQL = devices.map(d =>
    `INSERT INTO devices (device_id, name, status, location) VALUES 
    ('${d.id}', '${d.name}', '${d.status}', '${d.location}');`
).join('\n');

msg.topic = batchSQL;
return msg;
```

3. Drag the **sqlite** node and configure it:
   - Select **batch without response** as the SQL query type.
4. Add a **debug** node and connect all nodes.
5. Deploy the flow and click the inject button.

#### Read

1. Drag an **inject** node onto the canvas.
2. Drag the **sqlite** node onto the canvas and double-click it.
3. Select the correct SQLite configuration from the database dropdown.
4. Choose **fixed statement** as the SQL query type.
5. Enter the following SQL in the query field:

```sql
SELECT * FROM devices;
```

6. Add a **debug** node and connect all nodes.
7. Deploy the flow and click the inject button.

#### Update

1. Drag an **inject** node onto the canvas.
2. Drag a **change** node and configure it:
   - Set `msg.params` to `["offline", "DEV002"]` (type: JSON)
3. Drag the **sqlite** node and configure it:
   - Select **prepared statement** as the SQL query type.
   - Enter the SQL query:

```sql
UPDATE devices SET status = $1 WHERE device_id = $2;
```

4. Add a **debug** node and connect all nodes.
5. Deploy the flow and click the inject button.

#### Delete 

1. Drag an **inject** node onto the canvas.
2. Drag a **change** node and configure it:
   - Set `msg.params` to `{}` (type: JSON)
   - Set `msg.params.$device_id` to `DEV006` (type: string)
3. Drag the **sqlite** node and configure it:
   - Select **prepared statement** as the SQL query type.
   - Enter the SQL query:

```sql
DELETE FROM devices WHERE device_id = $id;
```

4. Add a **debug** node and connect all nodes.
5. Deploy the flow and click the inject button.

Below is the complete flow created throughout this guide. You can import it into Node-RED and experiment with it.



::render-flow
---
height: 200
flow: "W3siaWQiOiI3Mzk3ZDM2MzZiZjllZWM5IiwidHlwZSI6Imdyb3VwIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJuYW1lIjoiQ3JlYXRlIFRhYmxlICggZml4ZWQgc3RhdGVtZW50ICkiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbIjg0M2M2YmRkZDFmYTg4ZGQiLCJjNzEzNGYzMDU0Nzc1ZWQ5IiwiNDYyYTA2NDNmNWY4NWE4NSJdLCJ4IjoxMDM0LCJ5Ijo0NDU5LCJ3Ijo3MzIsImgiOjgyfSx7ImlkIjoiODQzYzZiZGRkMWZhODhkZCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI3Mzk3ZDM2MzZiZjllZWM5IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjExNDAsInkiOjQ1MDAsIndpcmVzIjpbWyJjNzEzNGYzMDU0Nzc1ZWQ5Il1dfSx7ImlkIjoiYzcxMzRmMzA1NDc3NWVkOSIsInR5cGUiOiJzcWxpdGUiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI3Mzk3ZDM2MzZiZjllZWM5IiwibXlkYiI6ImM5MTEzOWQ0MTE1MDc5NzEiLCJzcWxxdWVyeSI6ImZpeGVkIiwic3FsIjoiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgZGV2aWNlcyAoXG4gICAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULFxuICAgIGRldmljZV9pZCBURVhUIE5PVCBOVUxMIFVOSVFVRSxcbiAgICBuYW1lIFRFWFQsXG4gICAgc3RhdHVzIFRFWFQsXG4gICAgbG9jYXRpb24gVEVYVCxcbiAgICBsYXN0X3NlZW4gREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUFxuKTtcbiIsIm5hbWUiOiJDcmVhdGUgVGFibGUiLCJ4IjoxNDkwLCJ5Ijo0NTAwLCJ3aXJlcyI6W1siNDYyYTA2NDNmNWY4NWE4NSJdXX0seyJpZCI6IjQ2MmEwNjQzZjVmODVhODUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI3Mzk3ZDM2MzZiZjllZWM5IiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTY2MCwieSI6NDUwMCwid2lyZXMiOltdfSx7ImlkIjoiYzkxMTM5ZDQxMTUwNzk3MSIsInR5cGUiOiJzcWxpdGVkYiIsImRiIjoiL3RtcC9zcWxpdGUiLCJtb2RlIjoiUldDIn0seyJpZCI6IjE5MWYwNjk0MjJkMGY5YjQiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsIm5hbWUiOiJSZWFkIFJlY29yZHMiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImYxNDUyNzY0OTVlNmE3YmQiLCJiNmU2MWVjYjAzNzliOTNiIiwiMDJjNzcyMzEwMzM5MTgyNSJdLCJ4IjoxMDM0LCJ5Ijo0NTU5LCJ3Ijo3MzIsImgiOjgyfSx7ImlkIjoiZjE0NTI3NjQ5NWU2YTdiZCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiIxOTFmMDY5NDIyZDBmOWI0IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjExNDAsInkiOjQ2MDAsIndpcmVzIjpbWyJiNmU2MWVjYjAzNzliOTNiIl1dfSx7ImlkIjoiYjZlNjFlY2IwMzc5YjkzYiIsInR5cGUiOiJzcWxpdGUiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiIxOTFmMDY5NDIyZDBmOWI0IiwibXlkYiI6ImM5MTEzOWQ0MTE1MDc5NzEiLCJzcWxxdWVyeSI6ImZpeGVkIiwic3FsIjoiU0VMRUNUICogRlJPTSBkZXZpY2VzO1xuIiwibmFtZSI6IlJlYWQiLCJ4IjoxNDcwLCJ5Ijo0NjAwLCJ3aXJlcyI6W1siMDJjNzcyMzEwMzM5MTgyNSJdXX0seyJpZCI6IjAyYzc3MjMxMDMzOTE4MjUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiIxOTFmMDY5NDIyZDBmOWI0IiwibmFtZSI6ImRlYnVnIDMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTY2MCwieSI6NDYwMCwid2lyZXMiOltdfSx7ImlkIjoiYzliZjhjMjFhNzNjZjRmMSIsInR5cGUiOiJncm91cCIsInoiOiI5Y2Y4MmI2OGJiODllOGNlIiwibmFtZSI6IkJhdGNoIHdpdGhvdXQgcmVzcG9uc2UiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImQ4ZDJmZDhmZjRkYTY0ZmUiLCI3ZDc1NTZhYTI3ZmE2Y2E4IiwiZDE1YTY0ZGFlZDMyMjE1OCIsImVhNTkyMGI2NDM2MmU0MTIiXSwieCI6MTAzNCwieSI6NDY1OSwidyI6NzMyLCJoIjo4Mn0seyJpZCI6ImQ4ZDJmZDhmZjRkYTY0ZmUiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiYzliZjhjMjFhNzNjZjRmMSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoxMTQwLCJ5Ijo0NzAwLCJ3aXJlcyI6W1siZWE1OTIwYjY0MzYyZTQxMiJdXX0seyJpZCI6IjdkNzU1NmFhMjdmYTZjYTgiLCJ0eXBlIjoic3FsaXRlIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiYzliZjhjMjFhNzNjZjRmMSIsIm15ZGIiOiJjOTExMzlkNDExNTA3OTcxIiwic3FscXVlcnkiOiJiYXRjaCIsInNxbCI6IklOU0VSVCBJTlRPIGRldmljZXMgKGRldmljZV9pZCwgbmFtZSwgc3RhdHVzLCBsb2NhdGlvbilcblZBTFVFUyAoJGlkLCAkbmFtZSwgJHN0YXR1cywgJGxvY2F0aW9uKTsiLCJuYW1lIjoiSW5zZXJ0IiwieCI6MTQ3MCwieSI6NDcwMCwid2lyZXMiOltbImQxNWE2NGRhZWQzMjIxNTgiXV19LHsiaWQiOiJkMTVhNjRkYWVkMzIyMTU4IiwidHlwZSI6ImRlYnVnIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiYzliZjhjMjFhNzNjZjRmMSIsIm5hbWUiOiJkZWJ1ZyAyIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjE2NjAsInkiOjQ3MDAsIndpcmVzIjpbXX0seyJpZCI6ImVhNTkyMGI2NDM2MmU0MTIiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiJjOWJmOGMyMWE3M2NmNGYxIiwibmFtZSI6IkJhdGNoIEluc2VydCIsImZ1bmMiOiIvLyBTYW1wbGUgMTAgZGV2aWNlc1xuY29uc3QgZGV2aWNlcyA9IFtcbiAgICB7IGlkOiAnREVWMDAyJywgbmFtZTogJ1ByZXNzdXJlIFNlbnNvcicsIHN0YXR1czogJ29mZmxpbmUnLCBsb2NhdGlvbjogJ0ZhY3RvcnkgRmxvb3IgMicgfSxcbiAgICB7IGlkOiAnREVWMDAzJywgbmFtZTogJ0h1bWlkaXR5IFNlbnNvcicsIHN0YXR1czogJ29ubGluZScsIGxvY2F0aW9uOiAnV2FyZWhvdXNlIDEnIH0sXG4gICAgeyBpZDogJ0RFVjAwNCcsIG5hbWU6ICdWaWJyYXRpb24gU2Vuc29yJywgc3RhdHVzOiAnb25saW5lJywgbG9jYXRpb246ICdGYWN0b3J5IEZsb29yIDMnIH0sXG4gICAgeyBpZDogJ0RFVjAwNScsIG5hbWU6ICdGbG93IFNlbnNvcicsIHN0YXR1czogJ29mZmxpbmUnLCBsb2NhdGlvbjogJ1BsYW50IDEnIH0sXG4gICAgeyBpZDogJ0RFVjAwNicsIG5hbWU6ICdMZXZlbCBTZW5zb3InLCBzdGF0dXM6ICdvbmxpbmUnLCBsb2NhdGlvbjogJ1RhbmsgMScgfSxcbiAgICB7IGlkOiAnREVWMDA3JywgbmFtZTogJ1ByZXNzdXJlIEdhdWdlJywgc3RhdHVzOiAnb25saW5lJywgbG9jYXRpb246ICdQbGFudCAyJyB9LFxuICAgIHsgaWQ6ICdERVYwMDgnLCBuYW1lOiAnVGVtcGVyYXR1cmUgU2Vuc29yIDInLCBzdGF0dXM6ICdvZmZsaW5lJywgbG9jYXRpb246ICdXYXJlaG91c2UgMicgfSxcbiAgICB7IGlkOiAnREVWMDA5JywgbmFtZTogJ0h1bWlkaXR5IFNlbnNvciAyJywgc3RhdHVzOiAnb25saW5lJywgbG9jYXRpb246ICdQbGFudCAzJyB9LFxuICAgIHsgaWQ6ICdERVYwMTAnLCBuYW1lOiAnRmxvdyBNZXRlcicsIHN0YXR1czogJ29ubGluZScsIGxvY2F0aW9uOiAnRmFjdG9yeSBGbG9vciA0JyB9XG5dO1xuXG4vLyBHZW5lcmF0ZSBiYXRjaCBTUUxcbmNvbnN0IGJhdGNoU1FMID0gZGV2aWNlcy5tYXAoZCA9PlxuICAgIGBJTlNFUlQgSU5UTyBkZXZpY2VzIChkZXZpY2VfaWQsIG5hbWUsIHN0YXR1cywgbG9jYXRpb24pIFZBTFVFUyBcbiAgICAoJyR7ZC5pZH0nLCAnJHtkLm5hbWV9JywgJyR7ZC5zdGF0dXN9JywgJyR7ZC5sb2NhdGlvbn0nKTtgXG4pLmpvaW4oJ1xcbicpO1xuXG5tc2cudG9waWMgPSBiYXRjaFNRTDtcbnJldHVybiBtc2c7XG4iLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjEzMTAsInkiOjQ3MDAsIndpcmVzIjpbWyI3ZDc1NTZhYTI3ZmE2Y2E4Il1dfSx7ImlkIjoiZTE5OWQzNTQwNjYwOTQ3MSIsInR5cGUiOiJncm91cCIsInoiOiI5Y2Y4MmI2OGJiODllOGNlIiwibmFtZSI6IlVwZGF0ZSBSZWNvcmQgKCB2aWEgcHJlcGFyZWQgc3RhdGVtZW50IHdpdGggYXJyYXkgKSIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiOTY4ODI3OGMyOTg5NWFiMCIsImVhNzFmYmMzZWY1Y2M4YmQiLCI5MjA4ZTZlZjMwMjE4ZTM1IiwiMWFkNWM4MWQ5MjVhMDMxMCJdLCJ4IjoxMDM0LCJ5Ijo0NzU5LCJ3Ijo3MzIsImgiOjgyfSx7ImlkIjoiOTY4ODI3OGMyOTg5NWFiMCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiJlMTk5ZDM1NDA2NjA5NDcxIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjExNDAsInkiOjQ4MDAsIndpcmVzIjpbWyI5MjA4ZTZlZjMwMjE4ZTM1Il1dfSx7ImlkIjoiZWE3MWZiYzNlZjVjYzhiZCIsInR5cGUiOiJzcWxpdGUiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiJlMTk5ZDM1NDA2NjA5NDcxIiwibXlkYiI6ImM5MTEzOWQ0MTE1MDc5NzEiLCJzcWxxdWVyeSI6InByZXBhcmVkIiwic3FsIjoiVVBEQVRFIGRldmljZXMgU0VUIHN0YXR1cyA9ICQxIFdIRVJFIGRldmljZV9pZCA9ICQyOyIsIm5hbWUiOiJVcGRhdGUiLCJ4IjoxNDgwLCJ5Ijo0ODAwLCJ3aXJlcyI6W1siMWFkNWM4MWQ5MjVhMDMxMCJdXX0seyJpZCI6IjkyMDhlNmVmMzAyMThlMzUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiZTE5OWQzNTQwNjYwOTQ3MSIsIm5hbWUiOiJTZXQgUGFyYW1zIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGFyYW1zIiwicHQiOiJtc2ciLCJ0byI6IltcIm9mZmxpbmVcIiwgXCJERVYwMDJcIl0iLCJ0b3QiOiJqc29uIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjEzMTAsInkiOjQ4MDAsIndpcmVzIjpbWyJlYTcxZmJjM2VmNWNjOGJkIl1dfSx7ImlkIjoiMWFkNWM4MWQ5MjVhMDMxMCIsInR5cGUiOiJkZWJ1ZyIsInoiOiI5Y2Y4MmI2OGJiODllOGNlIiwiZyI6ImUxOTlkMzU0MDY2MDk0NzEiLCJuYW1lIjoiZGVidWcgNCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoxNjYwLCJ5Ijo0ODAwLCJ3aXJlcyI6W119LHsiaWQiOiI2NzA4NWQ5ZmE5YjdiNWRkIiwidHlwZSI6Imdyb3VwIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJuYW1lIjoiRGVsZXRlIFJlY29yZCAoIHZpYSBwcmVwYXJlZCBzdGF0ZW1lbnQgd2l0aCBvYmplY3QgKSIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiYzU1MWE0OTdiZjc3NmMxNSIsIjE3NjdjZDk5ZTNiMDNiZDIiLCJiMzU3MDI1MDAxM2M4NzAzIiwiOWVjNTM2YTM5ZTA1NWZmZSJdLCJ4IjoxMDM0LCJ5Ijo0ODU5LCJ3Ijo3MzIsImgiOjgyfSx7ImlkIjoiYzU1MWE0OTdiZjc3NmMxNSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI2NzA4NWQ5ZmE5YjdiNWRkIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjExNDAsInkiOjQ5MDAsIndpcmVzIjpbWyJiMzU3MDI1MDAxM2M4NzAzIl1dfSx7ImlkIjoiMTc2N2NkOTllM2IwM2JkMiIsInR5cGUiOiJzcWxpdGUiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI2NzA4NWQ5ZmE5YjdiNWRkIiwibXlkYiI6ImM5MTEzOWQ0MTE1MDc5NzEiLCJzcWxxdWVyeSI6InByZXBhcmVkIiwic3FsIjoiREVMRVRFIEZST00gZGV2aWNlcyBXSEVSRSBkZXZpY2VfaWQgPSAkZGV2aWNlX2lkOyIsIm5hbWUiOiJEZWxldGUiLCJ4IjoxNDcwLCJ5Ijo0OTAwLCJ3aXJlcyI6W1siOWVjNTM2YTM5ZTA1NWZmZSJdXX0seyJpZCI6ImIzNTcwMjUwMDEzYzg3MDMiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiNjcwODVkOWZhOWI3YjVkZCIsIm5hbWUiOiJTZXQgUGFyYW1zIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGFyYW1zIiwicHQiOiJtc2ciLCJ0byI6Int9IiwidG90IjoianNvbiJ9LHsidCI6InNldCIsInAiOiJwYXJhbXMuJGRldmljZV9pZCIsInB0IjoibXNnIiwidG8iOiJERVYwMDYiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MTMxMCwieSI6NDkwMCwid2lyZXMiOltbIjE3NjdjZDk5ZTNiMDNiZDIiXV19LHsiaWQiOiI5ZWM1MzZhMzllMDU1ZmZlIiwidHlwZSI6ImRlYnVnIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiNjcwODVkOWZhOWI3YjVkZCIsIm5hbWUiOiJkZWJ1ZyA1IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjE2NjAsInkiOjQ5MDAsIndpcmVzIjpbXX0seyJpZCI6IjRjNDY0OTY0MzkxZTFjMWMiLCJ0eXBlIjoiZ2xvYmFsLWNvbmZpZyIsImVudiI6W10sIm1vZHVsZXMiOnsibm9kZS1yZWQtbm9kZS1zcWxpdGUiOiIxLjEuMSJ9fV0="
---
::


