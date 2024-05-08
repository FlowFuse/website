## What are Http-in nodes used for in Node-RED

The "HTTP In" node in Node-RED is a core node that allows you to create an HTTP endpoint within your flow. It essentially sets up an HTTP server that listens for incoming HTTP requests on a specified URL path and HTTP method (e.g., GET, POST). When a request is received at this endpoint, it triggers the flow and allows you to process the request and generate a response using other nodes in the flow. you can send any type of data as a response whether it is html page, JSON, string, etc.

The baseurl will be the URL of the Node-RED instance at which your flow is deployed or the URL of the Node-RED editor.

## Configuring http-in node

- **Method:** Specify the HTTP method (e.g., GET, POST, PUT, DELETE) that the node should listen for, for more information on [Http request methods](https://devdoc.net/web/developer.mozilla.org/en-US/docs/Web/HTTP/Methods.html).
- **URL:** Define the endpoint at which it should listen. The path should look like "/test", and you can also set parameters like "/test/:id" to access them using `msg.params.id`.

## Sending response

*Note: This node does not send any response to the request. The flow must include an **HTTP Response node** to complete the request.*

## Examples

1. In the example flow below, we have an HTTP In node configured with the GET method and "/test" as the URL path. This node returns an HTML page as a response when a request is received.

{% renderFlow %}
[{"id":"d705b6ca20481a18","type":"http in","z":"a2240ea952051e81","name":"","url":"/test","method":"get","upload":false,"swaggerDoc":"","x":220,"y":220,"wires":[["500bcf5db325f188"]]},{"id":"f74c362610a1f4dd","type":"debug","z":"a2240ea952051e81","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":780,"y":160,"wires":[]},{"id":"102ecacbf029fa61","type":"http response","z":"a2240ea952051e81","name":"","statusCode":"200","headers":{},"x":800,"y":280,"wires":[]},{"id":"500bcf5db325f188","type":"template","z":"a2240ea952051e81","name":"","field":"payload","fieldType":"msg","format":"html","syntax":"mustache","template":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Devs page</title>\n</head>\n\n<body>\n    <h1>Hello, Devs</h1>\n</body>\n\n</html>","output":"str","x":480,"y":220,"wires":[["f74c362610a1f4dd","102ecacbf029fa61"]]},{"id":"d0bd0e43011a33b1","type":"comment","z":"a2240ea952051e81","name":"The HTTP In node returns an HTML page as response when a request is received at the specified path.","info":"","x":510,"y":100,"wires":[]}]
{% endrenderFlow %}

2. In the example flow below, we have an HTTP In node configured to return the todo item as a JSON object stored in the global context, associated with the requested ID provided as a request parameter.

{% renderFlow %}
[{"id":"d705b6ca20481a18","type":"http in","z":"b152a914653d9fce","name":"","url":"/todo/:id","method":"get","upload":false,"swaggerDoc":"","x":270,"y":360,"wires":[["cc28a4ae08042cd2"]]},{"id":"f74c362610a1f4dd","type":"debug","z":"b152a914653d9fce","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":880,"y":300,"wires":[]},{"id":"102ecacbf029fa61","type":"http response","z":"b152a914653d9fce","name":"","statusCode":"200","headers":{},"x":880,"y":420,"wires":[]},{"id":"d0bd0e43011a33b1","type":"comment","z":"b152a914653d9fce","name":"The HTTP In node returns the todo item associated with the requested ID provided as a request parameter.","info":"","x":540,"y":160,"wires":[]},{"id":"255028cacf698a4f","type":"inject","z":"b152a914653d9fce","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"[   {     \"id\": 1,     \"task\": \"Complete homework\",     \"completed\": false   },   {     \"id\": 2,     \"task\": \"Go for a run\",     \"completed\": true   },   {     \"id\": 3,     \"task\": \"Buy groceries\",     \"completed\": false   } ]","payloadType":"json","x":270,"y":240,"wires":[["560484dbf9da9f27"]]},{"id":"560484dbf9da9f27","type":"change","z":"b152a914653d9fce","name":"Store simulated todo JSON  in global context","rules":[{"t":"set","p":"todos","pt":"global","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":590,"y":240,"wires":[[]]},{"id":"cc28a4ae08042cd2","type":"function","z":"b152a914653d9fce","name":"Filter data based on recived param i","func":"let id = Number(msg.req.params.id);\nlet todoList = global.get('todos');\nlet todo = todoList.filter((task)=>task.id===id);\nmsg.payload = todo;\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":600,"y":360,"wires":[["f74c362610a1f4dd","102ecacbf029fa61"]]}]
{% endrenderFlow %}

3. In the example flow below, we have an HTTP In node configured with the POST method and "/todo" as the URL path. When a POST request containing a todo JSON object is received, it stores it in the todo list within the global context.

{% renderFlow %}
[{"id":"203195252f71d9f4","type":"http in","z":"b152a914653d9fce","name":"","url":"/todo","method":"post","upload":true,"swaggerDoc":"","x":220,"y":280,"wires":[["93df3c07ae4ad228","995da14e2a688758"]]},{"id":"93df3c07ae4ad228","type":"debug","z":"b152a914653d9fce","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":500,"y":240,"wires":[]},{"id":"eb447a5a61f6654d","type":"http response","z":"b152a914653d9fce","name":"","statusCode":"201","headers":{},"x":820,"y":320,"wires":[]},{"id":"995da14e2a688758","type":"function","z":"b152a914653d9fce","name":"store todo in todolist ","func":"let todoList = global.get('todos') || [];\nlet newTodo = msg.payload;\n\ntodoList.push(newTodo);\nglobal.set('todos',todoList)\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":520,"y":320,"wires":[["eb447a5a61f6654d"]]},{"id":"503937c4fc8b7902","type":"comment","z":"b152a914653d9fce","name":"The HTTP In node stores the todo object in the todolist when a POST request with a todo object is received.","info":"","x":520,"y":180,"wires":[]}]
{% endrenderFlow %}

## Output 

- **payload:**
  For a GET request, contains an object of any query string parameters. Otherwise, contains the body of the HTTP request.
- **req object:**
  An HTTP request object. This object contains multiple properties that provide information about the request.
  - **body:** The body of the incoming request. The format will depend on the request.
  - **headers:** An object containing the HTTP request headers.
  - **query:** An object containing any query string parameters.
  - **params:** An object containing any route parameters.
  - **cookies:** An object containing the cookies for the request.
  - **files:** If enabled within the node, an object containing any files uploaded as part of a POST request.
- **res object:** An HTTP response object. This property should not be used directly;



