---
eleventyNavigation:
  key: REST API
  parent: "Integration Technologies"
meta:
   title: Creating REST API's with Node-RED
   description: Learn how to create REST APIs in Node-RED and fetch data from an API.
   keywords: node-red, flowfuse, rest api
---

# {{meta.title}}

A REST API (Representational State Transfer Application Programming Interface) is a type of web service that follows the principles of REST, which are guidelines for building scalable and efficient networked applications. It enables different software applications to communicate and interact with each other over the internet using standard HTTP methods (GET, POST, PUT, DELETE, etc.) and formats (JSON, XML, etc.).

In this documentation, we will show you how to create REST APIs in Node-RED and how to fetch data from API. To create APIs, we will utilize the HTTP nodes.

## Creating a GET API

1. Drag an "http-in" onto the workspace, double click on it and select the Method to for which operation you need, set URL endpoint.
2. Drag an chagne node onto the workspace and set the `msg.payload` to data you want to send as response.
3. Then Drag an http response node, in it and set the status code if want.
4. Connect the "http-in" node's output to the input of the function node and the function node's output to the input of the http response node.

{% renderFlow %}
[{"id":"27333f67794bdc72","type":"http in","z":"977143edb097b685","name":"","url":"/test","method":"get","upload":false,"swaggerDoc":"","x":320,"y":220,"wires":[["f351033226953150"]]},{"id":"a7ee48616541a36a","type":"http response","z":"977143edb097b685","name":"","statusCode":"200","headers":{},"x":760,"y":220,"wires":[]},{"id":"dcfc8d1126f139d5","type":"comment","z":"977143edb097b685","name":"Http-in node created API sending todo list as response","info":"","x":540,"y":140,"wires":[]},{"id":"f351033226953150","type":"change","z":"977143edb097b685","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"todos","tot":"global"}],"action":"","property":"","from":"","to":"","reg":false,"x":540,"y":220,"wires":[["a7ee48616541a36a"]]}]
{% endrenderFlow %}

## Creating a POST, PUT, and DELETE API

1. Drag an "HTTP In" node onto the workspace. Double-click on it and select the desired method (POST, PUT, DELETE).
2. Add a node to the canvas based on your application's needs. For example, if you've selected DELETE, you may use a Change node to perform operations to delete data stored in Node-RED context. Set `msg.payload` to the response data you want to send, make sure the msg.payload is originated from "http-in" node.
3. Drag an "HTTP Response" node onto the workspace. Configure it and set the status code if needed.
4. Connect the output of the "HTTP In" node to the input of the node handling your application logic (e.g., Change node for DELETE operation). Then, connect the output of this node to the input of the HTTP Response node.

{% renderFlow %}
[{"id":"8893fc84b3391b34","type":"http in","z":"977143edb097b685","name":"","url":"/todo/delete","method":"delete","upload":true,"swaggerDoc":"","x":250,"y":720,"wires":[["088808484586fdc1"]]},{"id":"04a60e7af4d6d522","type":"http response","z":"977143edb097b685","name":"","statusCode":"204","headers":{},"x":740,"y":720,"wires":[]},{"id":"088808484586fdc1","type":"function","z":"977143edb097b685","name":"Delete the todo item","func":"let todoList = global.get('todos') || [];\nlet id = msg.payload.id;\n\n// Find the index of the item to delete\nlet index = todoList.findIndex(item => item.id === id);\n\nif (index !== -1) {\n    // Remove the item from the todoList array\n    todoList.splice(index, 1);\n    global.set('todos', todoList);\n    msg.payload = \"Item deleted successfully.\";\n    msg.statusCode = 204; // No Content\n} else {\n    msg.payload = \"Item not found.\";\n    msg.statusCode = 404; // Not Found\n}\n\nreturn msg;\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":520,"y":720,"wires":[["04a60e7af4d6d522"]]}]
{% endrenderFlow %}

{% renderFlow %}
[{"id":"825a6296456b7c27","type":"http in","z":"977143edb097b685","name":"","url":"/todo","method":"post","upload":true,"swaggerDoc":"","x":260,"y":1460,"wires":[["0133494821cf99ca","9fe48410514631f8"]]},{"id":"0133494821cf99ca","type":"debug","z":"977143edb097b685","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":540,"y":1420,"wires":[]},{"id":"5284a06365a7f8f7","type":"http response","z":"977143edb097b685","name":"","statusCode":"201","headers":{},"x":860,"y":1500,"wires":[]},{"id":"9fe48410514631f8","type":"function","z":"977143edb097b685","name":"store todo in todolist ","func":"let todoList = global.get('todos') || [];\nlet newTodo = msg.payload;\n\ntodoList.push(newTodo);\nglobal.set('todos',todoList)\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":560,"y":1500,"wires":[["5284a06365a7f8f7"]]}]
{% endrenderFlow %}

{% renderFlow %}
[{"id":"8893fc84b3391b34","type":"http in","z":"977143edb097b685","name":"","url":"/todo/update","method":"put","upload":true,"swaggerDoc":"","x":400,"y":280,"wires":[["088808484586fdc1"]]},{"id":"04a60e7af4d6d522","type":"http response","z":"977143edb097b685","name":"","statusCode":"200","headers":{},"x":900,"y":280,"wires":[]},{"id":"088808484586fdc1","type":"function","z":"977143edb097b685","name":"update the todo item","func":"let todoList = global.get('todos') || [];\nlet id = msg.payload.id;\nlet newTodo = msg.payload.newtodo;\n\n// Find the index of the item to update\nlet index = todoList.findIndex(item => item.id === id);\n\nif (index !== -1) {\n    // Update the todo item\n    todoList[index].task = newTodo;\n    global.set('todos', todoList);\n    msg.payload = \"Item updated successfully.\";\n    msg.statusCode = 200; // OK\n} else {\n    msg.payload = \"Item not found.\";\n    msg.statusCode = 404; // Not Found\n}\n\nreturn msg;\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":660,"y":280,"wires":[["04a60e7af4d6d522"]]},{"id":"ea3e7e96bbccf530","type":"comment","z":"977143edb097b685","name":"Http in node created api for updating the todo item","info":"","x":650,"y":200,"wires":[]}]
{% endrenderFlow %}

For more details, refer to the [CRUD API Blueprint](https://flowfuse.com/blueprints/getting-started/crud/), where we have created CRUD APIs to store, retrieve, delete, and update the data from MongoDB database.

## Example: Reading Data

Now that you've learned how to create REST APIs in Node-RED, let's explore an example of reading data using a HTTP GET request. This example will demonstrate how to fetch data from an external API and process it and display on dashboard chart.

For the example we will fetch the data of Node-RED Dashboard 2.0 Downloads from npm registry api.
`https://api.npmjs.org/downloads/range/last-month/@flowforge/node-red-dashboard`.

A simple flow to fetch data from npm registry  would be:

<iframe width="100%" height="225px" src="https://flows.nodered.org/flow/7c2dd3ccde70746a40ef8f5aa58c591c/share?height=100" allow="clipboard-read; clipboard-write" style="border: none;"></iframe>

Where we paste the API URL into the settings panel:

!["HTTP GET URL setting"](./images/http-get-npmapi.png "HTTP GET URL setting")

When running this flow you'll see a blob of text in the `Debug` pane. This is a
great first start, but a blob isn't useful for the rest of the flow.

We need to parse the data as JSON. While the [JSON node](/node-red/core-nodes/json)
would work, the HTTP request node can do this natively. Let `a parsed JSON object`
the `Return` settings of the HTTP request node.

So now we got the data, and a little more than we need, so let's change the
message output to keep only what we're interested in; `payload.downloads`. To
do this, we'll use the [change node](/node-red/core-nodes/change).

![Change node to set the payload with downloads](./images/change-node-set-downloads-payload.png "Change node to set the payload")

### Building the Dashboard

Follow the [Dashboard getting started guide](/blog/2024/03/dashboard-getting-started/) to get up and running.

Now we drag in the `chart` node that's available after installing the dashboard
package and make sure it' input comes from the configured `change` node. Before
hitting the deploy button the dashboard itself needs configuring:

First add configuration for the `ui-group`: ![Configure the UI Group](./images/dashboard-config-chart.png "Configure the chart")

To setup the `ui-group` correctly you'll need to add configuration for the `ui-page`: !["Configure the ui-group"](./images/dashboard-config-ui-group.png "Configure the UI group").

To create the UI page it requires another 2 config settings, `ui-base`, and the theming through `ui-theme`.

![Configure the UI Base](./images/dashboard-config-ui-base.png)

The default theme is great, so just accept that, and save all dialogs to continue the chart creation.

#### Normalizing the data

The data for the chart needs to be changed before we can show it. The messages should have a `x` and `y` key. So let's prepare the data with
a combination of the [Split](/node-red/core-nodes/split) and change node.

The Split node with the default configuration allows to 30 elements of the array
to be mapped individually. The change node will set the `payload.x` and `payload.y`
on the message:

![Change node to prepare the data for a chart](./images/change-node-prepare-data-chart.png "Prepare data for the chart")

Connect the change node output to a new chart node, and voila:

![Data in the chart node](./images/chart-with-data.png)

### Keeping the data up-to-date

While we created a chart and it has some data, there's one more thing to explain.
How can the data be kept up-to-date? It's straight forward to have the `Inject`
node [run every night](/node-red/core-nodes/inject/),
but the chart would now have multiple data points
for the same day. This paints multiple lines on top of each other. While that works,
the hover of the chart will display the duplication and it's wastefull.

So before we update the chart we need to send a message to the chart where the
[payload is `[]`](https://dashboard.flowfuse.com/nodes/widgets/ui-chart.html#removing-data).
That way the chart is emptied first, and right afterwards it will
receive the new data to write.

<iframe width="100%" height="500px" src="https://flows.nodered.org/flow/47f4cda247f2f2e0172ab61c795308bb/share" allow="clipboard-read; clipboard-write" style="border: none;"></iframe>