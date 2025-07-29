---
eleventyNavigation:
  key: Modbus
  parent: "Communication Protocols"
meta:
  title: Using Modbus with Node-RED
  description: Learn to use Modbus with Node-RED, including how to build a Modbus server and how to send and read data to and from that server.
  keywords: node red modbus, node-red-contrib-modbus, node-red modbus, modbus node red, modbus nodered, node red modbus rtu, modbus failure on state sending get more about it by logging, node red modbus server
   modbus
---

# {{meta.title}}

In manufacturing companies there is often a small set of production data, currently only available to an equipment operator through the HMI, which would be enormously valuable to a greater audience if there were some way to easily display and share it.

Node-RED, along with Modbus and Dashboard modules, can easily create a web-based dashboard, shareable with a weblink and viewable on any web browser on the network.  Imagine the advantages of digital signage in the breakroom spurring healthy competition or a manager being able to check daily totals and live process values from the phone in their pocket.

## What is Modbus

Modbus is a serial protocol that is often found in the industrial world to allow devices to communicate. Originally developed by Schneider Electric, it is an open protocol and has been adopted by brands across the industry.  [Simply Modbus](https://www.simplymodbus.ca/) is a terrific resource to learn more about how the communication is structured. The beauty of Node-RED’s low-code environment is that a user only has to understand Modbus at the highest level to be able to implement it.  


The transport layer for Modbus can be either TCP over the Internet or RTU over RS-485/422/232.  There is a client-server relationship among devices where the clients read and write data which is stored by server using a numerical address.  There are four types of these addresses, 1) Output Coil and 2) Discrete Input addresses, which hold 1-bit data, and 3) Input Register and 4) Holding Register addresses, which hold 16-bit data.  Typically a PLC will be the Server and an HMI will be the client, reading and writing to the memory in the PLC, in order to give an operator control over machinery.  

## What is an HMI

An HMI, or human machine interface, is a piece of software that allows an operator to use a machine.  An HMI development environment typically allows programmers to choose among an array of digital assets to visualize the machine on the screen and create an intuitive interface to control the machine.  The HMI software may also offload some of the high-level logic from the PLC, however, the time-critical lower-level logic should stay on the PLC.  Node-RED can take this a step further, you may use it to create a simple HMI, but its real strength comes from its internet based heritage, and its ability to help share data from the PLC to the cloud.

Let’s look at the details of how you would use Node-RED for HMI and Modbus to
build an HMI with Node-RED to connect Modbus data to a dashboard accessible from any web browser.

## Installation of the Modbus package

The most popular package used for connecting Modbus devices is [node-red-contrib-modbus](https://flows.nodered.org/node/node-red-contrib-modbus); it has a wide range of configuration options and is well-documented in many blogs.  On its own, this Modbus package just provides the means of communicating the 1-bit and 16-bit data.  In doing so, your flow will be able to write 1-bit and 16-bit data to the PLC and read 1-bit and 16-bit data, which will arrive in an array.  So, just like with other protocols (MQTT, HTTP, etc) fully integrating Modbus into your flow requires data manipulation and a well-thought-out schema for how this data will be packed into your msg objects.  For example, below a payload of [false,false,false] comes in from a “Modbus Read” node, but how do you turn that into useful information?  Maybe, you want to work with all alarms as a group, use a “Change” node to create a payload that is an object holding the related keys, with a topic that lets us know that these are all “alarms.”

![Configuring the Modbus node](./images/modbus-1-13.png "Configuring the Modbus node")

Note: for an even more comprehensive node to parse this data, check out [node-red-contrib-buffer-parser](https://flows.nodered.org/node/node-red-contrib-buffer-parser) by Flowforge’s own, Steve McLaughlin.
To install, first click on the hamburger menu in the upper right of the Node-RED editor and then click on “Manage palette.”

![Accessing the palette manager](./images/modbus-1-8.png "Accessing the palette manager")

Next, click on the “Install” tab, search for “modbus” in the search bar, and click on the “install” button next to [node-red-contrib-modbus](https://flows.nodered.org/node/node-red-contrib-modbus).  As you can see there are many other custom nodes, but this one is a great jumping off point. It's always good to try other options too, and see what the community has to offer.

![Installing the custom node](./images/modbus-1-10.png "Installing the custom node")

Finally, click on the “Install” button in the pop-up.

![Installing the custom node](./images/modbus-1-1.png "Installing the custom node")

Success, your new set of nodes are ready to use.

![The new nodes are now in the palette](./images/modbus-1-6.png "The new nodes are now in the palette")

Similarly, install one more package `@flowfuse/node-red-dashboard`. This package contains a set of widgets we will use to build a dashboard for visualizing data. For more information visit [Node-RED Dashboard 2.0 Official website](https://dashboard.flowfuse.com/).

## Bulding Modbus server 

When using Modbus for communication, it is necessary to have a Modbus server, which acts as a middleman. In our case we are building that server on the Node-RED instance running on PLC running a motor turning a belt with a belt scale. 

![Configuring the Modbus server node](./images/modbus-server.png "Configuring the Modbus server node")

Add the Modbus server node and configure it as shown in the above image. This node is set to handle up to 1000 coils, discrete inputs, holding registers, and input registers. This means the server can manage up to 1000 binary states for control, monitor 1000 binary states, store up to 1000 read/write data points, and monitor 1000 read-only data points.
Setting these parameters to 1000 allows the server to handle a broad range of devices and data points within your Modbus network, ensuring flexibility and scalability.

## Sending data to Modbus server

To send data to the Modbus server, add two write nodes to the workspace. Double click on each node to configure them. Click on the pencil icon next to the "Server" field to add the Modbus server details. Once the server is added into one write node, it will be available for the other write node as well.

We have added two write nodes because we will be sending following simulated data to the server. One write node will handle coil data and the other will handle register data.

![Example data from Modbus](./images/modbus-1-14.png "Example data from Modbus")

For the first write node, set the quantity to 5 since we will be sending five types of coil data (isEStopReleased, isMotorSwitchedOn, isMotorRunning, isTailSwitchPulsing, isMaterialOnBelt ). For the second write node, set the quantity to 4 since we will be sending four types of register data( MotorAmps, motorHourMeter, beltTonsPerHour, and beltTotalTons ).

![Configuring the Modbus send output coils write node](./images/modbus-with-node-red-send-output-coil.png "Configuring the Modbus send output coils write node")

![Configuring the Modbus send output coils write node](./images/modbus-with-node-red-send-holding-registers.png "Configuring the Modbus send output coils write node")

After configuring the nodes, add an inject node and set the `msg.payload` to "true" as a boolean for the coil data and set repeat to the "20 seconds" of interval. Then, add a join node to combine the messages into an array and connect the wires towards the write node configured for coil data.

![Configuring the join node combine output coil data](./images/modbus-with-node-red-combine-output-coils-data.png "Configuring the join node combine output coil data")

Similarly, add another inject node and set the `msg.payload` to `random() * 200` as a JSONata expression for the register data and set repeat to the "20 seconds" of interval. Use a join node to combine the 4 messages into an array and connect the wires towards the write node configured for register data.

![Configuring the join node combine output coil data](./images/modbus-with-node-red-combine-holding-register-data.png "Configuring the join node combine output coil data")

Finally, you can add Modbus response nodes to see the data sent over modbus server.

## Reading data from Modbus server

Now we will read that simulated that is getting sent on modbus server. All of this data is related so it has been grouped by consecutive numbers to make acquiring the data simpler.  You can also group data by the rate you expect to be polling for it, so that your Modbus nodes don’t have to make several calls to collect the data.  In the Modbus protocol the client specifies a start address and a number of subsequent addresses to read, and the server responds with all of this data at once.  Creating groups allows much more efficient communication.

This PLC uses the coil/register numbering convention with output coils in the 0nnnnn format and the holding registers in the 4nnnnn format.  Our Modbus nodes in Node-RED use a data address numbering convention which is zero-based, so we will have to remember to subtract 1 from the coils and registers.

Two “Modbus Read” nodes will work to capture these two types of data, coils and registers.  Drag them into the flow and double click on one to start configuring them.  First we will have to specify our Modbus Server, so click on the pencil icon to “add new.”  In the next “Modbus Read” node we configure, we can just select our newly added server from the drop-down menu.

![Adding a Modbus server](./images/modbus-1-3.png "Adding a Modbus server")

Let’s assume that your PLC is connected to your local area network and we will be communicating over TCP.  Enter in the IP address of the PLC, the rest of the configuration can be left as-is.  502 is the default port for Modbus and generally the Unit-Id is 1, sometimes 0, sometimes ignored.  The “Queues” and “Optionals” can stay as-is as well. 

![Setting the protocol and IP address](./images/modbus-1-2.png "Setting the protocol and IP address")

Click On “Add” and you will see your new server selected in the drop-down menu.  Now let’s set this “Modbus Read” node to read our Coils once every second.

![Setting how often data is read in the first Modbus read node](./images/modbus-1-5.png "Setting how often data is read in the first Modbus read node")

Similarly, set up the other “Modbus Read” node to read the holding registers. Click on the “Done” Button.  Why the Modbus standard uses FC 3 to read the 4nnnnn registers and why there is both a zero-based and one-based convention is just a painful reality when using Modbus.

![Setting how often data is read in the second Modbus read node](./images/modbus-1-15.png "Setting how often data is read in the second Modbus read node")

You can add some “Modbus Response” nodes to the “Modbus Read” nodes and click “Deploy” in order to see the data coming through, right in the editor.

![Checking the data is arriving OK](./images/modbus-1-7.png "Checking the data is arriving OK")

## Simple visualization

Finally, let’s create a dashboard of this incoming data using node-red-dashboard.

![Example dashboard showing the data](./images/modbus-with-node-red-dashboard.png "Example dashboard showing the data")

“Change” nodes are an easy way to split apart the arrays of coils and registers into discrete messages.

![Splitting up the data using change nodes](./images/modbus-1-9.png "Splitting up the data using change node")

The `msg.payload` is set to the entry at the correct index of the incoming `msg.payload` array, and the msg.fontColor is set using conditional formatting of “green” and “red”, for true and false, respectively.

![Image showing change node config for retrieving and setting data from an array read from Modbus.](./images/modbus-with-node-red-change-node.png "Image showing change node config for retrieving and setting data from an array read from Modbus.")

The output coil data is displayed on the dashboard using a text widget. When the value is false, the color will be red; otherwise, it will be green, indicating the active status.

![Configuring the change node](./images/modbus-with-node-red-text-node.png "Configuring the change node")

![Image showing added style to the tempalate widget](./images/modbus-with-node-red-template-widget-stylesheet.png "Image showing added style to the tempalate widget")

Final flow is given below:

{% renderFlow 300 %}
[{"id":"4cf44f4cbc592b99","type":"tab","label":"Flow 1","disabled":false,"info":"","env":[]},{"id":"b48b43414657ca4e","type":"modbus-read","z":"4cf44f4cbc592b99","name":"","topic":"text","showStatusActivities":false,"logIOActivities":false,"showErrors":false,"showWarnings":true,"unitid":"1","dataType":"Coil","adr":"0","quantity":"5","rate":"1","rateUnit":"s","delayOnStart":false,"startDelayTime":"","server":"145bc96e15c34554","useIOFile":false,"ioFile":"","useIOForPayload":false,"emptyMsgOnFail":false,"x":130,"y":540,"wires":[["f6fb47f18928d28f","3bf66c619694a1a4","35bc45f58dc5c661","5b3a8b0c7cd968fa","f87af242b2287b7c"],[]]},{"id":"e28ae04240af481e","type":"modbus-read","z":"4cf44f4cbc592b99","name":"","topic":"","showStatusActivities":false,"logIOActivities":false,"showErrors":false,"showWarnings":true,"unitid":"1","dataType":"HoldingRegister","adr":"0","quantity":"4","rate":"1","rateUnit":"s","delayOnStart":false,"startDelayTime":"","server":"145bc96e15c34554","useIOFile":false,"ioFile":"","useIOForPayload":false,"emptyMsgOnFail":false,"x":130,"y":800,"wires":[["9dd39216e9bbd6fd","c4389848cebd29c7","dffa222847521883","286d69415ef78e7c"],[]]},{"id":"c302edd625716894","type":"modbus-server","z":"4cf44f4cbc592b99","name":"Modbus server","logEnabled":false,"hostname":"127.0.0.1","serverPort":"10502","responseDelay":100,"delayUnit":"ms","coilsBufferSize":10000,"holdingBufferSize":10000,"inputBufferSize":10000,"discreteBufferSize":10000,"showErrors":false,"x":520,"y":260,"wires":[[],[],[],[],[]]},{"id":"7f20fcaea773cb1b","type":"inject","z":"4cf44f4cbc592b99","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":140,"y":260,"wires":[["c302edd625716894"]]},{"id":"bc7bdfd9d81369af","type":"inject","z":"4cf44f4cbc592b99","name":"","props":[{"p":"payload"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random() * 150","payloadType":"jsonata","x":110,"y":1020,"wires":[["2c019b52b54a2e0d"]]},{"id":"2c019b52b54a2e0d","type":"join","z":"4cf44f4cbc592b99","name":"combine holiding register data","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":false,"timeout":"","count":"4","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"","reduceFixup":"","x":350,"y":1020,"wires":[["8bf7d588de60fb33"]]},{"id":"6c14cb9ab888c12d","type":"inject","z":"4cf44f4cbc592b99","name":"","props":[{"p":"payload"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"true","payloadType":"bool","x":110,"y":1140,"wires":[["1a59e443e0258194"]]},{"id":"1a59e443e0258194","type":"join","z":"4cf44f4cbc592b99","name":"combine coil output data","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":false,"timeout":"","count":"5","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"","reduceFixup":"","x":330,"y":1140,"wires":[["cdb7e5d53210cb6d"]]},{"id":"62338bd2af1d3c0d","type":"modbus-response","z":"4cf44f4cbc592b99","name":"","registerShowMax":20,"x":870,"y":1020,"wires":[]},{"id":"d1eff51eac0af203","type":"modbus-response","z":"4cf44f4cbc592b99","name":"","registerShowMax":20,"x":870,"y":1120,"wires":[]},{"id":"8bf7d588de60fb33","type":"modbus-write","z":"4cf44f4cbc592b99","name":"send holding registers","showStatusActivities":false,"showErrors":false,"showWarnings":true,"unitid":"1","dataType":"MHoldingRegisters","adr":"0","quantity":"4","server":"145bc96e15c34554","emptyMsgOnFail":false,"keepMsgProperties":false,"delayOnStart":false,"startDelayTime":"","x":640,"y":1020,"wires":[["62338bd2af1d3c0d"],[]]},{"id":"cdb7e5d53210cb6d","type":"modbus-write","z":"4cf44f4cbc592b99","name":"send output coils ","showStatusActivities":false,"showErrors":false,"showWarnings":true,"unitid":"1","dataType":"MCoils","adr":"0","quantity":"5","server":"145bc96e15c34554","emptyMsgOnFail":false,"keepMsgProperties":false,"delayOnStart":false,"startDelayTime":"","x":630,"y":1140,"wires":[["d1eff51eac0af203"],[]]},{"id":"405acf6300a072d6","type":"ui-text","z":"4cf44f4cbc592b99","group":"a00b86fb96b216a6","order":1,"width":0,"height":0,"name":"","label":"isEStopReleased","format":"{{msg.payload}}","layout":"row-spread","style":false,"font":"","fontSize":16,"color":"#717171","className":"","x":690,"y":460,"wires":[]},{"id":"52cb610e23488ba2","type":"ui-text","z":"4cf44f4cbc592b99","group":"a00b86fb96b216a6","order":3,"width":0,"height":0,"name":"","label":"isMotorSwitchedOn","format":"{{msg.payload}}","layout":"row-spread","style":false,"font":"","fontSize":16,"color":"#717171","className":"","x":690,"y":500,"wires":[]},{"id":"224a2c2948d7d9a5","type":"ui-text","z":"4cf44f4cbc592b99","group":"a00b86fb96b216a6","order":4,"width":0,"height":0,"name":"","label":"isMotorRunning","format":"{{msg.payload}}","layout":"row-spread","style":false,"font":"","fontSize":16,"color":"#717171","className":"","x":680.111083984375,"y":537.7777709960938,"wires":[]},{"id":"82fce135993ad1ab","type":"ui-text","z":"4cf44f4cbc592b99","group":"a00b86fb96b216a6","order":5,"width":0,"height":0,"name":"","label":"isTailswitchPulsing","format":"{{msg.payload}}","layout":"row-spread","style":false,"font":"","fontSize":16,"color":"#717171","className":"","x":690,"y":580,"wires":[]},{"id":"f6fb47f18928d28f","type":"change","z":"4cf44f4cbc592b99","name":"isEStopReleased","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[0]","tot":"msg"},{"t":"set","p":"class","pt":"msg","to":"msg.payload ? \"green\":\"red\"","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":410,"y":460,"wires":[["405acf6300a072d6"]]},{"id":"3bf66c619694a1a4","type":"change","z":"4cf44f4cbc592b99","name":"isMotorSwitchedOn","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[1]","tot":"msg"},{"t":"set","p":"class","pt":"msg","to":"msg.payload ? \"green\":\"red\"","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":410,"y":500,"wires":[["52cb610e23488ba2"]]},{"id":"35bc45f58dc5c661","type":"change","z":"4cf44f4cbc592b99","name":"isMotorRunning","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[2]","tot":"msg"},{"t":"set","p":"class","pt":"msg","to":"msg.payload ? \"green\":\"red\"","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":400,"y":540,"wires":[["224a2c2948d7d9a5"]]},{"id":"5b3a8b0c7cd968fa","type":"change","z":"4cf44f4cbc592b99","name":"isTailswitchPulsing","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[3]","tot":"msg"},{"t":"set","p":"class","pt":"msg","to":"msg.payload ? \"green\":\"red\"","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":410,"y":580,"wires":[["82fce135993ad1ab"]]},{"id":"f87af242b2287b7c","type":"change","z":"4cf44f4cbc592b99","name":"isMaterialOnBelt","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[4]","tot":"msg"},{"t":"set","p":"class","pt":"msg","to":"msg.payload ? \"green\":\"red\"","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":400,"y":620,"wires":[["7ab41bd5d19d5f7f"]]},{"id":"7ab41bd5d19d5f7f","type":"ui-text","z":"4cf44f4cbc592b99","group":"a00b86fb96b216a6","order":2,"width":0,"height":0,"name":"","label":"isMaterialOnBelt","format":"{{msg.payload}}","layout":"row-spread","style":false,"font":"","fontSize":16,"color":"#717171","className":"","x":680,"y":620,"wires":[]},{"id":"cc8b32c267214e28","type":"ui-template","z":"4cf44f4cbc592b99","group":"","page":"","ui":"5ff82627d2caf841","name":"stylesheet","order":0,"width":0,"height":0,"head":"","format":".green span {\n    color: green;\n}\n\n.red span {\n    color: red;\n}\n","storeOutMessages":true,"passthru":true,"resendOnRefresh":true,"templateScope":"site:style","className":"","x":940,"y":560,"wires":[[]]},{"id":"c4f0157670882335","type":"ui-gauge","z":"4cf44f4cbc592b99","name":"motorAmps","group":"ef2cffe3b927bbb6","order":1,"width":"0","height":"0","gtype":"gauge-half","gstyle":"needle","title":"gauge","units":"units","icon":"","prefix":"","suffix":"","segments":[{"from":"0","color":"#ba6e26"},{"from":"100","color":"#ba6e26"}],"min":0,"max":"150","sizeThickness":16,"sizeGap":4,"sizeKeyThickness":8,"styleRounded":true,"styleGlow":false,"className":"","x":710,"y":760,"wires":[]},{"id":"df73d7c58bbf6069","type":"ui-text","z":"4cf44f4cbc592b99","group":"ef2cffe3b927bbb6","order":2,"width":0,"height":0,"name":"","label":"motorHourMeter","format":"{{msg.payload}}","layout":"row-spread","style":false,"font":"","fontSize":16,"color":"#717171","className":"","x":720,"y":800,"wires":[]},{"id":"4d14a50a008a4606","type":"ui-text","z":"4cf44f4cbc592b99","group":"98ab0c19d66959eb","order":2,"width":0,"height":0,"name":"","label":"beltTotalTons","format":"{{msg.payload}}","layout":"row-spread","style":false,"font":"","fontSize":16,"color":"#717171","className":"","x":710,"y":880,"wires":[]},{"id":"9dd39216e9bbd6fd","type":"change","z":"4cf44f4cbc592b99","name":"motorAmps","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[0]","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":390,"y":760,"wires":[["c4f0157670882335"]]},{"id":"c4389848cebd29c7","type":"change","z":"4cf44f4cbc592b99","name":"motorHourMeter","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[1]","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":400,"y":800,"wires":[["df73d7c58bbf6069"]]},{"id":"dffa222847521883","type":"change","z":"4cf44f4cbc592b99","name":"beltTonsPerHour","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[2]","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":410,"y":840,"wires":[["b45120d07ed4a8bb"]]},{"id":"286d69415ef78e7c","type":"change","z":"4cf44f4cbc592b99","name":"beltTotalTons","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload[3]","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":390,"y":880,"wires":[["4d14a50a008a4606"]]},{"id":"b45120d07ed4a8bb","type":"ui-chart","z":"4cf44f4cbc592b99","group":"98ab0c19d66959eb","name":"beltTonsPerHour","label":"chart","order":1,"chartType":"line","category":"beltTonsPerHour","categoryType":"str","xAxisLabel":"","xAxisProperty":"","xAxisPropertyType":"msg","xAxisType":"time","yAxisLabel":"","yAxisProperty":"","ymin":"","ymax":"","action":"append","pointShape":"false","pointRadius":4,"showLegend":true,"removeOlder":1,"removeOlderUnit":"3600","removeOlderPoints":"","colors":["#1f77b4","#aec7e8","#ff7f0e","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5"],"width":"6","height":"5","className":"","x":730,"y":840,"wires":[[]]},{"id":"af0626137803b160","type":"comment","z":"4cf44f4cbc592b99","name":"Reading holding register data from modbus server","info":"","x":510,"y":700,"wires":[]},{"id":"bf74f24e625763ff","type":"comment","z":"4cf44f4cbc592b99","name":"Sending output coil data to modbus server","info":"","x":480,"y":1080,"wires":[]},{"id":"c5ab6f8dcb96b79b","type":"comment","z":"4cf44f4cbc592b99","name":"Sending holding register data to modbus server","info":"","x":500,"y":960,"wires":[]},{"id":"8e1387959a33f353","type":"comment","z":"4cf44f4cbc592b99","name":"Reading output coil data from modbus server","info":"","x":490,"y":400,"wires":[]},{"id":"b85a4192ee8a8c38","type":"comment","z":"4cf44f4cbc592b99","name":"Modbus server ","info":"","x":300,"y":180,"wires":[]},{"id":"145bc96e15c34554","type":"modbus-client","name":"Modbus server","clienttype":"tcp","bufferCommands":true,"stateLogEnabled":false,"queueLogEnabled":false,"failureLogEnabled":true,"tcpHost":"127.0.0.1","tcpPort":"10502","tcpType":"DEFAULT","serialPort":"/dev/ttyUSB","serialType":"RTU-BUFFERD","serialBaudrate":"9600","serialDatabits":"8","serialStopbits":"1","serialParity":"none","serialConnectionDelay":"100","serialAsciiResponseStartDelimiter":"0x3A","unit_id":"1","commandDelay":"1","clientTimeout":"1000","reconnectOnTimeout":true,"reconnectTimeout":"2000","parallelUnitIdsAllowed":true,"showErrors":false,"showWarnings":true,"showLogs":true},{"id":"a00b86fb96b216a6","type":"ui-group","name":"Output coils","page":"3876c3cdc50d68a5","width":"3","height":"1","order":1,"showTitle":true,"className":"","visible":"true","disabled":"false"},{"id":"5ff82627d2caf841","type":"ui-base","name":"My Dashboard","path":"/dashboard","includeClientData":true,"acceptsClientConfig":["ui-notification","ui-control"],"showPathInSidebar":false,"navigationStyle":"default","titleBarStyle":"default"},{"id":"ef2cffe3b927bbb6","type":"ui-group","name":"Holding registers","page":"3876c3cdc50d68a5","width":"3","height":"3","order":2,"showTitle":true,"className":"","visible":"true","disabled":"false"},{"id":"98ab0c19d66959eb","type":"ui-group","name":"holding register ","page":"3876c3cdc50d68a5","width":"6","height":"1","order":3,"showTitle":false,"className":"","visible":"true","disabled":"false"},{"id":"3876c3cdc50d68a5","type":"ui-page","name":"Home","ui":"5ff82627d2caf841","path":"/","icon":"home","layout":"grid","theme":"36efce4ebdf1ae91","order":1,"className":"","visible":false,"disabled":"false"},{"id":"36efce4ebdf1ae91","type":"ui-theme","name":"Default Theme","colors":{"surface":"#0094ce","primary":"#0094ce","bgPage":"#eeeeee","groupBg":"#ffffff","groupOutline":"#cccccc"},"sizes":{"pagePadding":"12px","groupGap":"12px","groupBorderRadius":"4px","widgetGap":"12px"}}]
{% endrenderFlow %}

The way that we set up this example worked well for the small sample size and quickly getting content on the dashboard, but as you work through your own needs, think about the data structures that will be the most conducive to efficiently working with your data.
