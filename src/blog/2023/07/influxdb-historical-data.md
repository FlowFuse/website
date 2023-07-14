---
title: Creating a Historical Data Dashboard with InfluxDB and Node-RED
subtitle: Detailed instructions on how to create a Node-RED dashboard that shows historical data.
description: 
date: 2023-07-18
authors: ["andrew-lynch"]
image: blog/2023/07/images/node-red-influxdb.png
---

Every new dashboard is met with the fast-following request, “can we save this data and somehow look back on it?”  Yes, you can, and let’s use InfluxDB to make it happen!

<!--more-->

Edge devices are often polling sensors at regular intervals and are a perfect candidate to be paired with a database purpose-built for time-series data, like InfluxDB.  Let’s capture some data, create a live chart, store the data, and then create a GUI for retrieving the data.

Here’s a screenshot of the dashboard we will create, which is divided into two sections. The first section displays live data, while the second section consists of fields that enable users to query the database and retrieve historical data.  Looking at the live data, the chart depicts a sinusoidal graph that represents the scale measurements used for quality assurance in the aggregate production process at an automated mining operation. The graph showcases fluctuations in weight over time, indicating variations in the samples being weighed. This monitoring process ensures the quality and consistency of the aggregates being produced.  The historical data shows a snippet of this information that was retrieved from InfluxDB.



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


Here’s a photo from inside the mine.  Samples of aggregate are taken from off the belt going down the tunnel.



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


Here is a screenshot of the simple Node-RED flow to create that dashboard.  We will dive into the details through this article, and, by the end, you will be able to create this flow yourself.



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


**Capturing serial port data**

The live view is fed by data coming from a simple scale with a serial interface.  This [Brecknell LPS-150](https://www.brecknellscales.com/wp-content/uploads/2022/09/LPS-Series_u_en_fr_501724-1.pdf) scale will auto power-on, remembers the last tare setting, and continuously sends its reading via RS-232, so it is a great unit to use for unattended IoT projects.



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")


On the Node-RED side, a serial node can be configured to capture this incoming data.  If your device running Node-RED doesn’t have an RS-232 port, there are many variations of RS-232-to-USB cables to help you connect.  This scale is sending data at a very high-speed interval so it is important to use a “delay” node before the rest of your flow gets bogged down.

Below, I have configured the serial port node with the same settings that were used to set up the scale. These settings are commonly documented as "9600 8N1" in shorthand.  In serial communication it is necessary for the two devices to have the exact same settings or the data becomes garbled.  The incoming stream of ASCII text is divided using the hex value 0x0D, which corresponds to the return character. This character is used as a delimiter to separate the individual chunks of text within the incoming data stream.

.

<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")


With this “delay” node, we now have a new message from the scale at a rate of 1 msg per 5 seconds



<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.png "image_tooltip")


The debugger allows us to see the raw data as it is captured.



<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.png "image_tooltip")


Unfortunately, these values are not in a friendly form to work with.  Ideally, we want our payload to just be a number, not this string with odd characters, extra spaces, and the units.



<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image8.png "image_tooltip")


We need to extract the numeric part of the string using a regular expression with a “change” node and the JSONata expression $number($match(msg.payload,  /-?(\d+(\.\d+)?)/ , 10).match).  “$match” and “/-?(\d+(\.\d+)?)/” help the function pull out the numeric components of the string and “$number” parses these components to be an actual number data type.

Here are the properties of the “change” node.



<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image9.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image9.png "image_tooltip")


When we look in the debugger we see the payload specified as a “number” and the value displayed in blue, both indications that we have successfully extracted the weight as the correct data type.



<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image10.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image10.png "image_tooltip")


**Setting up serverless InfluxDB in the cloud**

Now we have some live data, let’s store it using InfluxDB. Below are the steps to set up an account with the InfluxDB free service.  Navigate to [https://www.influxdata.com/products/influxdb-overview/](https://www.influxdata.com/products/influxdb-overview/) and let’s begin.  Click on “Get Started for Free” under Cloud, InfluxDB Cloud Serverless.



<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image11.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image11.png "image_tooltip")


For this example the Free plan will work fine.



<p id="gdcalert12" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image12.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert13">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image12.png "image_tooltip")


Create a bucket to store the data.



<p id="gdcalert13" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image13.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert14">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image13.png "image_tooltip")




<p id="gdcalert14" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image14.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert15">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image14.png "image_tooltip")




<p id="gdcalert15" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image15.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert16">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image15.png "image_tooltip")


Generate a token to direct the calls from Node-RED to your InfluxDB account when they hit the InfluxDB server:



<p id="gdcalert16" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image16.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert17">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image16.png "image_tooltip")


I selected “Generate All Access API Token,” but eventually you will want a custom, more restricted approach.



<p id="gdcalert17" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image17.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert18">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image17.png "image_tooltip")


Copy your token and do not share it!  (mine will be deleted later)



<p id="gdcalert18" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image18.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert19">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image18.png "image_tooltip")


**Connecting Node-RED to InfluxDB**

Navigate to “Manage Palette” in the Node-RED hamburger menu in the upper right corner of the flow editor.  I did a search for InfluxDB and selected the most popular one, “node-red-contrib-influxdb” by looking at the number of downloads per week at [https://flows.nodered.org/node/node-red-contrib-influxdb](https://flows.nodered.org/node/node-red-contrib-influxdb).  When you are just starting out, it can be a smart decision to go with the popular option. The popularity indicates a level of trust and adoption within the community, making it a reliable choice for beginners



<p id="gdcalert19" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image19.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert20">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image19.png "image_tooltip")


After installing this package you will see three new nodes in your flow editor.



<p id="gdcalert20" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image20.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert21">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image20.png "image_tooltip")


Drag and drop the “influxdb out” node into your flow, double click on it, and start filling out the needed fields.  The naming convention of “test&lt;<THING>>” works well for initial setups to make it clear what names should go where.



<p id="gdcalert21" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image21.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert22">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image21.png "image_tooltip")


It was a little unclear what URL to use with this serverless option, but I guessed it was the same as the URL for the InfluxDB resource center account page, “[https://us-east-1-1.aws.cloud2.influxdata.com/](https://us-east-1-1.aws.cloud2.influxdata.com/)” and it worked.  Then, enter the API token that was generated earlier.



<p id="gdcalert22" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image22.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert23">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image22.png "image_tooltip")


The “influxdb out” node is now ready to start storing payloads.  The documentation for the InfluxDB nodes at [https://flows.nodered.org/node/node-red-contrib-influxdb](https://flows.nodered.org/node/node-red-contrib-influxdb) gives more detail as to extra options, such as tags, that you might want to attach to your data being stored.  In this simple example, we are just going to send the “influxdb out” node a number via the msg.payload.



<p id="gdcalert23" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image23.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert24">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image23.png "image_tooltip")


Here is a chart of the live data which is also being stored.



<p id="gdcalert24" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image24.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert25">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image24.png "image_tooltip")


The InfluxDB Data Explorer helps you create a SQL call and allows you to run it right in the browser so you can verify that your data is being stored correctly.



<p id="gdcalert25" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image25.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert26">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image25.png "image_tooltip")


**Creating a historical data GUI**

Now we have our data being stored, but we aren’t quite finished. We still want an easy way to pull this information up and for it to be presented in a chart, just like the live data.

Here is the Dashboard group we will create for this GUI.



<p id="gdcalert26" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image26.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert27">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image26.png "image_tooltip")


And here is the flow to create it.



<p id="gdcalert27" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image27.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert28">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image27.png "image_tooltip")


A “template” node creates a convenient way to create a plain text output with variable properties within.  Below you can see that msg.query is created from a string of text with “rangeStart” and “rangeEnd” dynamically inserted using the “mustache” syntax.  More information about how to query InfluxDB can be found here:  [https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/query-influxdb/](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/query-influxdb/).



<p id="gdcalert28" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image28.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert29">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image28.png "image_tooltip")


Using the "Form" dashboard node is an easy way to collect all the required information for our query.  We need to be able to enter in a date and time to start gathering the data, and a window to know how long a range of values to pull.



<p id="gdcalert29" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image29.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert30">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image29.png "image_tooltip")


Here is the code from the “time/date” function node.  A bit of juggling of local time versus UTC time is needed to allow the user to intuitively query the correct data for their timezone. 



<p id="gdcalert30" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image30.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert31">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image30.png "image_tooltip")


Here is the “change” node used to create the msg.rangeEnd.  The JSONatta expression is $fromMillis($toMillis(msg.rangeStart) + msg.payload.window * 60 * 1000).  The expression combines the milliseconds from the msg.rangeStart with the calculated milliseconds in the “Window (minutes)” from the GUI.



<p id="gdcalert31" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image31.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert32">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image31.png "image_tooltip")


Now that the query is coming back from InfluxDB, let’s break down how to transform this data object into one that can be read by the “chart” node.  Below, we see on the left column what the object looks like from InfluxDB and on the right we see how it must be structured to be viewed in the chart.



<p id="gdcalert32" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image32.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert33">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image32.png "image_tooltip")


Rob Marcer has a great article on working with persistent chart data found here: [https://flowforge.com/blog/2023/05/persisting-chart-data-in-node-red/](https://flowforge.com/blog/2023/05/persisting-chart-data-in-node-red/).

We can use a series of nodes from the Node-RED core package to transform this data.

 



<p id="gdcalert33" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image33.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert34">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image33.png "image_tooltip")


First, a “switch” node is used to determine if the response InfluxDB contains any data so that we can either format the data properly, or clear the chart and indicate “No Data.”



<p id="gdcalert34" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image34.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert35">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image34.png "image_tooltip")


The “Label” field in the “chart” node can also be dynamically created with the mustache syntax.



<p id="gdcalert35" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image35.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert36">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image35.png "image_tooltip")


If the “is not empty” “switch” node sees an empty payload, this “change” node sets the payload to an empty array, clearing the chart, and sets the msg.title to “No Data” so users know their query, though successful, returned an empty set of values.



<p id="gdcalert36" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image36.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert37">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image36.png "image_tooltip")


The parameters for the “split” node can be left as-is.



<p id="gdcalert37" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image37.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert38">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image37.png "image_tooltip")


In the “chartData” “change” node, will pull out the two values we need for the chart, milliseconds since the UNIX epoch for the x-value and the measurement from the scale for the y-value.  A simple JSONatta expression helps us transform the date from a string to milliseconds for the x-value.



<p id="gdcalert38" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image38.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert39">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image38.png "image_tooltip")


The “join” node just needs to be set to “Combine each” msg.chartData object and configured “to create” an array.



<p id="gdcalert39" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image39.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert40">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image39.png "image_tooltip")


The final “change” node, “format,” is where we prescribe the format needed for the “chart” node, [{"series":[""],"data":[[]],"labels":[""]}], and finally we insert our msg.chartData array into that structure.  Notice msg.title is now set to “Data Received.”



<p id="gdcalert40" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image40.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert41">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image40.png "image_tooltip")


And, there you have it.  You can query the same range of data found on the live chart to ensure the code is working and then you can use the dashboard to pull up historical data, way in the past from what is shown on the live chart.



<p id="gdcalert41" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image41.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert42">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image41.png "image_tooltip")


**Final Thoughts**

This was a data-driven journey, capturing values from a scale for comprehensive testing. We were able to develop a simple, yet powerful dashboard that visualizes this live data while using InfluxDB as a reliable storage solution. We also designed an intuitive interface for efficient data querying to generate charts to analyze historical data.

InfluxDB's capabilities go beyond these initial achievements. It can be deployed locally, has the ability to handle high sample rates, can apply data scrubbing functions, and store this filtered data to enhance data quality and accessibility. Most importantly, this data visualization enables us to spot trends effortlessly and gain valuable predictive insights by examining historical data leading up to specific events.  We are empowered to uncover meaningful patterns, make informed decisions, and drive innovation in data management and analysis.
