## What is are Http-in nodes used for in Node-RED

The "HTTP In" node in Node-RED is a core node that allows you creates an HTTP endpoint within your flow. It essentially sets up an HTTP server that listens for incoming HTTP requests on a specified URL path and HTTP method (e.g., GET, POST). When a request is received at this endpoint, it triggers the flow and allows you to process the request and generate a response using other nodes in the flow. you can send any type of data as response wheather it is html page, JSON, string etc.

The baseurl will be the the the URL of NODE instace at which your flow is deplyed or url of node-red editor.

## Configuring http-in node

- **Method:** Specify the HTTP method (e.g., GET, POST, PUT, DELETE) that the node should listen for, for more information on [Http request methods](https://devdoc.net/web/developer.mozilla.org/en-US/docs/Web/HTTP/Methods.html).
- **URL:** Define the endpoint at which it should listen. The path should look like "/test", and you can also set parameters like "/test/:id" to access them using `msg.params.id`.

## Sending response

To send a response when a request comes at the endpoint, you need to use an "HTTP Response" node. You can set msg.payload to define the response data. Ensure that these nodes are connected sequentially. For example, an "HTTP In" node can be connected to a "Change" node or a "Function" node where you set the payload based on your logic, and then connected to the "HTTP Response" node. Alternatively, instead of a "Change" or "Function" node, you can use a custom node for accessing MongoDB or other databases to fetch the data for the response, and then connect it directly to the "HTTP Response" node to send the response back to the client.

Examples

1. In the example flow below, we have an HTTP In node configured with the GET method and "/test" as the URL path. This node returns an HTML page as a response when a request is received.

[{"id":"d705b6ca20481a18","type":"http in","z":"a2240ea952051e81","name":"","url":"/test","method":"get","upload":false,"swaggerDoc":"","x":220,"y":220,"wires":[["500bcf5db325f188"]]},{"id":"f74c362610a1f4dd","type":"debug","z":"a2240ea952051e81","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":780,"y":160,"wires":[]},{"id":"102ecacbf029fa61","type":"http response","z":"a2240ea952051e81","name":"","statusCode":"200","headers":{},"x":800,"y":280,"wires":[]},{"id":"500bcf5db325f188","type":"template","z":"a2240ea952051e81","name":"","field":"payload","fieldType":"msg","format":"html","syntax":"mustache","template":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Devs page</title>\n</head>\n\n<body>\n    <h1>Hello, Devs</h1>\n</body>\n\n</html>","output":"str","x":480,"y":220,"wires":[["f74c362610a1f4dd","102ecacbf029fa61"]]},{"id":"d0bd0e43011a33b1","type":"comment","z":"a2240ea952051e81","name":"The HTTP In node returns an HTML page as response when a request is received at the specified path.","info":"","x":510,"y":100,"wires":[]}]

2. 

[{"id":"d705b6ca20481a18","type":"http in","z":"a2240ea952051e81","name":"","url":"/todo/:id","method":"get","upload":false,"swaggerDoc":"","x":250,"y":320,"wires":[["cc28a4ae08042cd2"]]},{"id":"f74c362610a1f4dd","type":"debug","z":"a2240ea952051e81","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":860,"y":260,"wires":[]},{"id":"102ecacbf029fa61","type":"http response","z":"a2240ea952051e81","name":"","statusCode":"200","headers":{"content-type":"application/json"},"x":860,"y":380,"wires":[]},{"id":"d0bd0e43011a33b1","type":"comment","z":"a2240ea952051e81","name":"The HTTP In node returns the todo item associated with the requested ID provided as a request parameter.","info":"","x":520,"y":120,"wires":[]},{"id":"255028cacf698a4f","type":"inject","z":"a2240ea952051e81","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"[   {     \"id\": 1,     \"task\": \"Complete homework\",     \"completed\": false   },   {     \"id\": 2,     \"task\": \"Go for a run\",     \"completed\": true   },   {     \"id\": 3,     \"task\": \"Buy groceries\",     \"completed\": false   } ]","payloadType":"json","x":250,"y":200,"wires":[["560484dbf9da9f27"]]},{"id":"560484dbf9da9f27","type":"change","z":"a2240ea952051e81","name":"Store simulated todo JSON  in global context","rules":[{"t":"set","p":"todos","pt":"global","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":570,"y":200,"wires":[[]]},{"id":"cc28a4ae08042cd2","type":"function","z":"a2240ea952051e81","name":"Filter data based on recived param i","func":"let id = Number(msg.req.params.id);\nlet todoList = global.get('todos');\nlet todo = todoList.filter((task)=>task.id===id);\nmsg.payload = todo;\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":580,"y":320,"wires":[["f74c362610a1f4dd","102ecacbf029fa61"]]}]


3. 

## Output 




