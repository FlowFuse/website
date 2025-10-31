---
eleventyNavigation:
  key: Query
  parent: FlowFuse Tables
meta:
  title: Query
  description: The Query node allows you to run SQL queries against FlowFuse Tables, supporting parameterized queries, Mustache templates, and AI-assisted query generation for seamless database interactions.
---

# {{ meta.title }}

The Query node allows you to write and run queries against database tables managed by [FlowFuse Tables](/docs/user/ff-tables/). The node is pre-configured to connect automatically when used within a FlowFuse Node-RED instance.

With **FlowFuse AI Assistant** integration, queries can be generated from natural language prompts, making database operations accessible without SQL expertise.

## Outputs

The response (rows) is provided in `msg.payload` as an array. When **Split results** is enabled with **Number of rows = 1**, `msg.payload` contains a single row object instead.

### Additional Metadata

- `msg.pgsql.rowCount` - Number of rows affected
- `msg.pgsql.command` - The executed command

For multiple queries, `msg.pgsql` is returned as an array.

## Inputs

SQL queries can be configured directly in the node or passed dynamically via `msg.query`.

### Parameterized Queries (Recommended)

Pass parameters as an array via `msg.params`:

##### Input Data
{% raw %}
```javascript
msg.params = [ msg.id ];
```
{% endraw %}

##### Query defined in the node
{% raw %}
```sql
SELECT * FROM table WHERE id = $1
```
{% endraw %}

> Tip: For production environments, it is recommended to use parameterized queries instead. Parameterized queries automatically handle quoting and escaping, making them safer and more reliable.

### Named Parameters

Pass parameters as an object via `msg.queryParameters`:

##### Input Data
{% raw %}
```javascript
msg.queryParameters.id = msg.id;
```
{% endraw %}

##### Query defined in the node
{% raw %}
```sql
SELECT * FROM table WHERE id = $id;
```
{% endraw %}

### Mustache Templates

Reference message properties using Mustache syntax:

##### Query defined in the node
{% raw %}
```sql
SELECT * FROM table WHERE id = {{{ msg.id }}}
SELECT * FROM table WHERE name = '{{{ msg.name }}}'
```
{% endraw %}

> Note: Care must be taken to ensure incoming string data is properly escaped (e.g., single quotes must be doubled: `'` to `''`) to prevent syntax errors and SQL injection.
 
> Note: Inserting dynamic values into SQL statements using Mustache templates exposes your data to SQL Injection risks if the input is untrusted. We strongly recommend using Parameterized Queries or Named Parameters instead; these features are designed to safely separate data from the SQL command.

## Important Details

### Case Sensitivity
By default, PostgreSQL converts unquoted table and column names to lowercase, making them case-insensitive (e.g., `SELECT DataVal FROM MyTable` is the same as `SELECT dataval FROM  mytable`).
To avoid errors and ensure portability, it is common to use only lowercase, unquoted identifiers. 
However, where required, you can wrap names in double quotes (e.g., `SELECT "DataVal" FROM "MyTable"`) to explicitly force them to be case-sensitive if the names were defined that way.

### Security Best Practices
Parameterized queries are **strongly recommended** for production use over Mustache templates for security and maintainability.

### Named Parameters Limitation
Named parameters are emulated (not native PostgreSQL), making them less robust than numeric parameters.

### Backpressure Management
When **Split results** is enabled, the node waits for `msg.tick` before releasing the next batch, preventing memory issues. It exposes `node.tickConsumer` and `node.tickProvider` for automatic flow control.

### Split Results Sequences
Streaming messages follow sequence conventions with:
- `msg.parts.id`
- `msg.parts.index`
- `msg.parts.count`
- `msg.complete` flag

## Requirements

FlowFuse Tables requires **Enterprise tier** and must be enabled for your team.

## Example Flow

{% renderFlow 500 %}
{% raw %}
[{"id":"9cd7498d4f832f1e","type":"group","z":"9db2d9ed7f00b8af","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["f27702ab8c8a58d2","da6e293fa363b172","f74ede3fbcf4ef32","8bfb39f252c16a79","41e1f9e0e97768a8"],"x":34,"y":39,"w":892,"h":142},{"id":"f27702ab8c8a58d2","type":"tables-query","z":"9db2d9ed7f00b8af","g":"9cd7498d4f832f1e","name":"","query":"","split":false,"rowsPerMsg":1,"x":670,"y":140,"wires":[["8bfb39f252c16a79"]]},{"id":"da6e293fa363b172","type":"inject","z":"9db2d9ed7f00b8af","g":"9cd7498d4f832f1e","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":140,"y":140,"wires":[["f74ede3fbcf4ef32"]]},{"id":"f74ede3fbcf4ef32","type":"template","z":"9db2d9ed7f00b8af","g":"9cd7498d4f832f1e","name":"Set Query","field":"query","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"CREATE TABLE \"sensor_data\" (\n    \"id\" SERIAL PRIMARY KEY,\n    \"sensor_id\" TEXT NOT NULL,\n    \"timestamp\" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    \"temperature\" REAL,\n    \"unit\" TEXT DEFAULT 'celsius'\n);\n","output":"str","x":300,"y":140,"wires":[["f27702ab8c8a58d2"]]},{"id":"8bfb39f252c16a79","type":"debug","z":"9db2d9ed7f00b8af","g":"9cd7498d4f832f1e","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":830,"y":140,"wires":[]},{"id":"41e1f9e0e97768a8","type":"comment","z":"9db2d9ed7f00b8af","g":"9cd7498d4f832f1e","name":"Pass the query via msg.query","info":"","x":180,"y":80,"wires":[]},{"id":"91fa219afc78e395","type":"group","z":"9db2d9ed7f00b8af","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["aefa193bfd04e5c2","e5bd3fbf9af5e519","6cc5a12665df32cb","1ebe4f1381fe71dd","7a397cd61dd6a210"],"x":34,"y":519,"w":892,"h":142},{"id":"aefa193bfd04e5c2","type":"tables-query","z":"9db2d9ed7f00b8af","g":"91fa219afc78e395","name":"","query":"SELECT * FROM public.sensor_readings WHERE \"temperature\" > {{{msg.temperatureThreshold}}};","split":false,"rowsPerMsg":1,"x":670,"y":620,"wires":[["6cc5a12665df32cb"]]},{"id":"e5bd3fbf9af5e519","type":"inject","z":"9db2d9ed7f00b8af","g":"91fa219afc78e395","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":140,"y":620,"wires":[["7a397cd61dd6a210"]]},{"id":"6cc5a12665df32cb","type":"debug","z":"9db2d9ed7f00b8af","g":"91fa219afc78e395","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":830,"y":620,"wires":[]},{"id":"1ebe4f1381fe71dd","type":"comment","z":"9db2d9ed7f00b8af","g":"91fa219afc78e395","name":"Using Mustache template","info":"","x":170,"y":560,"wires":[]},{"id":"7a397cd61dd6a210","type":"change","z":"9db2d9ed7f00b8af","g":"91fa219afc78e395","name":"Set temperatureThreshold","rules":[{"t":"set","p":"temperatureThreshold","pt":"msg","to":"20","tot":"num"}],"action":"","property":"","from":"","to":"","reg":false,"x":350,"y":620,"wires":[["aefa193bfd04e5c2"]]},{"id":"e00a02a11a322683","type":"group","z":"9db2d9ed7f00b8af","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["14d47d8931a2855b","58a32e0340ed268d","762caff19e1722b7","997d92441f4d2eeb","ae3e4a6940a8e236"],"x":34,"y":359,"w":892,"h":142},{"id":"14d47d8931a2855b","type":"tables-query","z":"9db2d9ed7f00b8af","g":"e00a02a11a322683","name":"","query":"DELETE FROM \"sensor_data\"\nWHERE \"id\" = $id;\n","split":false,"rowsPerMsg":1,"x":670,"y":460,"wires":[["762caff19e1722b7"]]},{"id":"58a32e0340ed268d","type":"inject","z":"9db2d9ed7f00b8af","g":"e00a02a11a322683","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":140,"y":460,"wires":[["ae3e4a6940a8e236"]]},{"id":"762caff19e1722b7","type":"debug","z":"9db2d9ed7f00b8af","g":"e00a02a11a322683","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":830,"y":460,"wires":[]},{"id":"997d92441f4d2eeb","type":"comment","z":"9db2d9ed7f00b8af","g":"e00a02a11a322683","name":"Named parameterized query","info":"","x":180,"y":400,"wires":[]},{"id":"ae3e4a6940a8e236","type":"change","z":"9db2d9ed7f00b8af","g":"e00a02a11a322683","name":"Set queryParameters","rules":[{"t":"set","p":"queryParameters","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"queryParameters.id","pt":"msg","to":"3","tot":"num"}],"action":"","property":"","from":"","to":"","reg":false,"x":340,"y":460,"wires":[["14d47d8931a2855b"]]},{"id":"fd2f3651994d44d3","type":"group","z":"9db2d9ed7f00b8af","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["423532459421ddb0","f14ffc1ff606f377","28579ce56dbb5dab","35f9bc3ff82a3789","68d530295082581a","2cb15cbf3a1a3878"],"x":34,"y":199,"w":892,"h":142},{"id":"423532459421ddb0","type":"tables-query","z":"9db2d9ed7f00b8af","g":"fd2f3651994d44d3","name":"","query":"INSERT INTO \"sensor_data\" (\"sensor_id\", \"temperature\", \"unit\")\nVALUES ($1, $2, $3);\n","split":false,"rowsPerMsg":1,"x":670,"y":300,"wires":[["28579ce56dbb5dab"]]},{"id":"f14ffc1ff606f377","type":"inject","z":"9db2d9ed7f00b8af","g":"fd2f3651994d44d3","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":140,"y":300,"wires":[["68d530295082581a"]]},{"id":"28579ce56dbb5dab","type":"debug","z":"9db2d9ed7f00b8af","g":"fd2f3651994d44d3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":830,"y":300,"wires":[]},{"id":"35f9bc3ff82a3789","type":"comment","z":"9db2d9ed7f00b8af","g":"fd2f3651994d44d3","name":"Numeric parameterized query","info":"","x":180,"y":240,"wires":[]},{"id":"68d530295082581a","type":"function","z":"9db2d9ed7f00b8af","g":"fd2f3651994d44d3","name":"Simulate Sensor","func":"// Simulate sensor data and output as an object in msg.payload\n\nlet temperature = (20 + Math.random() * 10).toFixed(2);\nlet sensorIds = [\"sensor_01\", \"sensor_02\", \"sensor_03\"];\nlet sensor_id = sensorIds[Math.floor(Math.random() * sensorIds.length)];\n\nmsg.payload = {\n    sensor_id: sensor_id,\n    temperature: Number(temperature),\n    unit: \"celsius\",\n};\n\nreturn msg;\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":320,"y":300,"wires":[["2cb15cbf3a1a3878"]]},{"id":"2cb15cbf3a1a3878","type":"change","z":"9db2d9ed7f00b8af","g":"fd2f3651994d44d3","name":"Set Params","rules":[{"t":"set","p":"params","pt":"msg","to":"[msg.payload.sensor_id, msg.payload.temperature, msg.payload.unit]","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":510,"y":300,"wires":[["423532459421ddb0"]]},{"id":"bf517ea3d503dd5a","type":"global-config","env":[],"modules":{"@flowfuse/nr-tables-nodes":"0.1.0"}}]
{% endraw %}
{% endrenderFlow %}

## Generate Queries with AI Assistant

In the Query node, click **"Assistant"**, enter plain English like *"Show me all readings from today"*, and the AI automatically generates the SQL query.

![Query Node AI Assistant](./src/blog/2025/09/images/flowfuse-ai-assistance-table-demo.gif)

For more detailed information on natural language queries with the Query node, read this article: [AI Assistant for FlowFuse Tables](https://flowfuse.com/blog/2025/09/ai-assistant-flowfuse-tables/).
