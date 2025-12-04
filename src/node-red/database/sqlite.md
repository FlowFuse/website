---
eleventyNavigation:
  key: Sqlite
  parent: Database
meta:
  title: Using SQLite with Node-RED
  description: Learn how to seamlessly integrate SQLite with Node-RED for efficient data management and application development.
  keywords: nodered sqlite, node red sqlite, node-red-node-sqlite, sqlite nodered, sqlite node red
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

This section demonstrates a simple workflow for Create, Read, Update, and Delete operations using SQLite in Node-RED. Each operation will demonstrate a different SQL query type available in the SQLite node, giving you practical experience with all four methods: Fixed Statement, Via msg.topic, Prepared Statement, and Batch Without Response with important crud operation.

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
   - Set `msg.params.$devce_id` to `DEV006` (type: string)
3. Drag the **sqlite** node and configure it:
   - Select **prepared statement** as the SQL query type.
   - Enter the SQL query:

```sql
DELETE FROM devices WHERE device_id = $id;
```

4. Add a **debug** node and connect all nodes.
5. Deploy the flow and click the inject button.

Below is the complete flow created throughout this guide. You can import it into Node-RED and experiment with it.

{% renderFlow %}
[{"id":"d21e92ea190bc7ec","type":"group","z":"9cf82b68bb89e8ce","name":"Create Table ( fixed statement )","style":{"label":true},"nodes":["f00f902c1450efdf","bfde4d14c6e59617","e81e71686d8f7deb"],"x":814,"y":499,"w":732,"h":82},{"id":"f00f902c1450efdf","type":"inject","z":"9cf82b68bb89e8ce","g":"d21e92ea190bc7ec","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":920,"y":540,"wires":[["bfde4d14c6e59617"]]},{"id":"bfde4d14c6e59617","type":"sqlite","z":"9cf82b68bb89e8ce","g":"d21e92ea190bc7ec","mydb":"c91139d411507971","sqlquery":"fixed","sql":"CREATE TABLE IF NOT EXISTS devices (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    device_id TEXT NOT NULL UNIQUE,\n    name TEXT,\n    status TEXT,\n    location TEXT,\n    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP\n);\n","name":"Create Table","x":1270,"y":540,"wires":[["e81e71686d8f7deb"]]},{"id":"e81e71686d8f7deb","type":"debug","z":"9cf82b68bb89e8ce","g":"d21e92ea190bc7ec","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1440,"y":540,"wires":[]},{"id":"c91139d411507971","type":"sqlitedb","db":"/tmp/sqlite","mode":"RWC"},{"id":"2afef789924f9006","type":"group","z":"9cf82b68bb89e8ce","name":"Read Records","style":{"label":true},"nodes":["28e25e4171753aa3","b9ee58532e463f13","6b58a9833530658b"],"x":814,"y":599,"w":732,"h":82},{"id":"28e25e4171753aa3","type":"inject","z":"9cf82b68bb89e8ce","g":"2afef789924f9006","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":920,"y":640,"wires":[["b9ee58532e463f13"]]},{"id":"b9ee58532e463f13","type":"sqlite","z":"9cf82b68bb89e8ce","g":"2afef789924f9006","mydb":"c91139d411507971","sqlquery":"fixed","sql":"SELECT * FROM devices;\n","name":"Create Table","x":1270,"y":640,"wires":[["6b58a9833530658b"]]},{"id":"6b58a9833530658b","type":"debug","z":"9cf82b68bb89e8ce","g":"2afef789924f9006","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1440,"y":640,"wires":[]},{"id":"600992a5a4832867","type":"group","z":"9cf82b68bb89e8ce","name":"Batch without response","style":{"label":true},"nodes":["d5c6a3a9b1e4e5e3","60394c3b5752bd0a","a1ba36a73c5ea529","ef56a2e3d4acef04"],"x":814,"y":699,"w":732,"h":82},{"id":"d5c6a3a9b1e4e5e3","type":"inject","z":"9cf82b68bb89e8ce","g":"600992a5a4832867","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":920,"y":740,"wires":[["ef56a2e3d4acef04"]]},{"id":"60394c3b5752bd0a","type":"sqlite","z":"9cf82b68bb89e8ce","g":"600992a5a4832867","mydb":"c91139d411507971","sqlquery":"batch","sql":"INSERT INTO devices (device_id, name, status, location)\nVALUES ($id, $name, $status, $location);","name":"Insert","x":1250,"y":740,"wires":[["a1ba36a73c5ea529"]]},{"id":"a1ba36a73c5ea529","type":"debug","z":"9cf82b68bb89e8ce","g":"600992a5a4832867","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1440,"y":740,"wires":[]},{"id":"ef56a2e3d4acef04","type":"function","z":"9cf82b68bb89e8ce","g":"600992a5a4832867","name":"Batch Insert","func":"// Sample 10 devices\nconst devices = [\n    { id: 'DEV002', name: 'Pressure Sensor', status: 'offline', location: 'Factory Floor 2' },\n    { id: 'DEV003', name: 'Humidity Sensor', status: 'online', location: 'Warehouse 1' },\n    { id: 'DEV004', name: 'Vibration Sensor', status: 'online', location: 'Factory Floor 3' },\n    { id: 'DEV005', name: 'Flow Sensor', status: 'offline', location: 'Plant 1' },\n    { id: 'DEV006', name: 'Level Sensor', status: 'online', location: 'Tank 1' },\n    { id: 'DEV007', name: 'Pressure Gauge', status: 'online', location: 'Plant 2' },\n    { id: 'DEV008', name: 'Temperature Sensor 2', status: 'offline', location: 'Warehouse 2' },\n    { id: 'DEV009', name: 'Humidity Sensor 2', status: 'online', location: 'Plant 3' },\n    { id: 'DEV010', name: 'Flow Meter', status: 'online', location: 'Factory Floor 4' }\n];\n\n// Generate batch SQL\nconst batchSQL = devices.map(d =>\n    `INSERT INTO devices (device_id, name, status, location) VALUES \n    ('${d.id}', '${d.name}', '${d.status}', '${d.location}');`\n).join('\\n');\n\nmsg.topic = batchSQL;\nreturn msg;\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":1090,"y":740,"wires":[["60394c3b5752bd0a"]]},{"id":"93cd5a78aaca71e9","type":"group","z":"9cf82b68bb89e8ce","name":"Update Record ( via prepared statement with array )","style":{"label":true},"nodes":["ef4a39126542c619","0f4902252f30bcc3","83379180a1455fa7","278dc932c6cefc56"],"x":814,"y":799,"w":732,"h":82},{"id":"ef4a39126542c619","type":"inject","z":"9cf82b68bb89e8ce","g":"93cd5a78aaca71e9","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":920,"y":840,"wires":[["83379180a1455fa7"]]},{"id":"0f4902252f30bcc3","type":"sqlite","z":"9cf82b68bb89e8ce","g":"93cd5a78aaca71e9","mydb":"c91139d411507971","sqlquery":"prepared","sql":"UPDATE devices SET status = $1 WHERE device_id = $2;","name":"Update","x":1260,"y":840,"wires":[["278dc932c6cefc56"]]},{"id":"83379180a1455fa7","type":"change","z":"9cf82b68bb89e8ce","g":"93cd5a78aaca71e9","name":"Set Params","rules":[{"t":"set","p":"params","pt":"msg","to":"[\"offline\", \"DEV002\"]","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":1090,"y":840,"wires":[["0f4902252f30bcc3"]]},{"id":"278dc932c6cefc56","type":"debug","z":"9cf82b68bb89e8ce","g":"93cd5a78aaca71e9","name":"debug 4","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1440,"y":840,"wires":[]},{"id":"3f2d2f3076c56843","type":"group","z":"9cf82b68bb89e8ce","name":"Delete Record ( via prepared statement with object )","style":{"label":true},"nodes":["b8583114a0b2431d","a2e98554e1069b9d","32ae6b9071efbc53","97f55b3622fb13e8"],"x":814,"y":899,"w":732,"h":82},{"id":"b8583114a0b2431d","type":"inject","z":"9cf82b68bb89e8ce","g":"3f2d2f3076c56843","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":920,"y":940,"wires":[["32ae6b9071efbc53"]]},{"id":"a2e98554e1069b9d","type":"sqlite","z":"9cf82b68bb89e8ce","g":"3f2d2f3076c56843","mydb":"c91139d411507971","sqlquery":"prepared","sql":"DELETE FROM devices WHERE device_id = $device_id;","name":"Delete","x":1250,"y":940,"wires":[["97f55b3622fb13e8"]]},{"id":"32ae6b9071efbc53","type":"change","z":"9cf82b68bb89e8ce","g":"3f2d2f3076c56843","name":"Set Params","rules":[{"t":"set","p":"params","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"params.$device_id","pt":"msg","to":"DEV006","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":1090,"y":940,"wires":[["a2e98554e1069b9d"]]},{"id":"97f55b3622fb13e8","type":"debug","z":"9cf82b68bb89e8ce","g":"3f2d2f3076c56843","name":"debug 5","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1440,"y":940,"wires":[]},{"id":"cff10bb5ee4f2cb5","type":"global-config","env":[],"modules":{"node-red-node-sqlite":"1.1.1"}}]
{% endrenderFlow %}
