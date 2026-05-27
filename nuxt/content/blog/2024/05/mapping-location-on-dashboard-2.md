---
title: Mapping location data within Node-RED Dashboard 2.0.
navTitle: Mapping location data within Node-RED Dashboard 2.0.
---

Fleet management in IoT uses sensors and software to collect real-time data on vehicles, such as location, fuel consumption, and driver behavior. This data allows companies to optimize routes, reduce costs, improve safety, and enhance overall operational efficiency of their fleet. Building an application that allows the tracking of location to support Fleet management is what this post is about.

<!--more-->

Before moving further, make sure you have installed Dashboard 2.0. If you are new to Dashboard 2.0, please refer to [Getting Started with Dashboard 2.0](/blog/2024/03/dashboard-getting-started/) for more information.

## Installing world map custom node

To render an interactive world map webpage for plotting location data, we will use a popular custom node called [node-red-contrib-web-worldmap-page](https://flows.nodered.org/node/node-red-contrib-web-worldmap). This node offers extensive features enabling us to render a world map and plot various items with different icons, colors, NATO symbologies, ranges, and more.

1. Click the Node-RED Settings (top-right).
2. Click "Manage Palette".
3. Switch to the "Install" tab.
4. Search for `node-red-contrib-web-worldmap`.
5. Click "Install".

## Retrieving location Data

Before plotting locations, we need to obtain the data first. For this purpose, we will utilize the [Edenburg Open Public Transportation API](https://tfe-opendata.readme.io/docs/getting-started). This API provides the live locations of all of Edenburg's public buses and trams, enabling us to access the necessary data for plotting on Worldmap within Dashboard 2.0.

1. Drag an **Inject** node onto the canvas and set the repeat property to a 20-second interval.
2. Drag an HTTP request node onto the canvas, Dobule-click on it and choose **GET** method, and enter `https://tfe-opendata.com/api/v1/vehicle_locations` in the URL field and select return  as **a parsed json object**. This API is public, so no need for environment variables. For private APIs, consider using [environment variables](/blog/2023/01/environment-variables-in-node-red) for security.

!["Screenshot of the HTTP request node configuration for retrieving data from the API"](/blog/2024/05/images/mapping-location-on-dashboard-2-http-request-node.png "Screenshot of the HTTP request node configuration for retrieving data from the API"){data-zoomable}

3. Connect the **Inject** node's output to the **HTTP request** node's input.

## Formatting Location Data

To ensure compatibility with the Worldmap custom node, we need to format the location data appropriately. 

1. Drag the **Change** node onto the canvas, and set the `msg.payload` to `msg.payload.vehicles`, and give it name **Set payload**.

![Screenshot of the Change node setting the payload to the vehicles JSON array containing actual vehicle location data](/blog/2024/05/images/mapping-location-on-dashboard-2-change-node.png "Screenshot of the Change node setting the payload to the vehicles JSON array containing actual vehicle location data"){data-zoomable}

2. Drag a **Split** node onto the canvas.
3. Add another **Change** node to the canvas. Configure it to set and delete properties as shown in the image below, and give it name **Change and delete properties**. By changing and deleting properties of the location, we ensure that only the properties acceptable by the **Worldmap** node are included in the location data.

![Screenshot of the Change node configuring properties to ensure compatibility with the Worldmap node](/blog/2024/05/images/mapping-location-on-dashboard-2-change-node-changing-and-deleting-properties.png "Screenshot of the Change node configuring properties to ensure compatibility with the Worldmap node"){data-zoomable}

4. Drag a **Switch** node onto the canvas and add conditions to check if `msg.payload.vehicle_type` is equal to **tram** or not.

![Screenshot of the Switch node checking if the vehicle type is tram or not](/blog/2024/05/images/mapping-location-on-dashboard-2-switch-node-checking-is-vehicale-type-is-tram-or-not.png "Screenshot of the Switch node checking if the vehicle type is tram or not"){data-zoomable}

5. Add another **Change** node to the canvas and give it a name **set icon and icon color for tram**. Set `msg.payload.icon` to **fa-train** and `msg.payload.iconColor` to **yellow**.

![Screenshot of the Change node setting the icon and icon color for tram](/blog/2024/05/images/mapping-location-on-dashboard-2-change-node-setting-icon-for-tram.png "Screenshot of the Change node setting the icon and icon color for tram"){data-zoomable}

7. Add another **Change** node to the canvas and give it a name **set icon and icon color for bus**. Set `msg.payload.icon` to **bus** and `msg.payload.iconColor` to **red**.

![Screenshot of the Change node setting the icon and icon color for bus](/blog/2024/05/images/mapping-location-on-dashboard-2-change-node-setting-icon-for-bus.png "Screenshot of the Change node setting the icon and icon color for bus"){data-zoomable}

8. Connect the **HTTP request** node's output to the input of the **Change** node named **Set payload**, and connect the output of that **Change** node to the input of the **Split** node.
9. Then, connect the output of the **Split** node to the input of the **Change** node named **Change and delete properties**, and connect the output of the "Change and delete properties" node to the input of the **Switch** node. Then **Switch** node's first output to the input of the **Change** node named **set icon and icon color for tram**, and its second output to the input of the **Change** node named **set icon and icon color for bus**.
 
## Plotting location data on Worldmap

1. Drag a **Worldmap** node onto the canvas. Set the path to **/worldmap** and keep the rest of the settings unchanged, although you can modify other properties according to your preferences.

!["Screenshot displaying the configuration of the Worldmap custom node"](/blog/2024/05/images/mapping-location-on-dashboard-2-worldmap-node.png "Screenshot displaying the configuration of the Worldmap custom node"){data-zoomable}

2. With the **worldmap** node configured, it will generate a world map with plotted data accessible at the specified path.
3. Connect the **Function** node's output to **Worldmap** node's input.

Now we have successfully created a page with a world map displaying plotted vehicle location data. To confirm, you can visit `https://<your-instance-name>.flowfuse.cloud/worldmap`.

## Rendering map on Dashboard 2.0

To render worlmap webpage on dashboard 2.0 we will use **iframe** custom widget which will allow us to embed an external webpage into Dashboard 2.0 applications using an iframe.

### Installing iframe custom widget

1. Click the Node-RED Settings (top-right)
2. Click **Manage Palette**
3. Switch to the **Install** tab
4. Search for `@flowfuse/node-red-dashboard-2-ui-iframe`
5. Click **Install**

### Rendering worlmap on Dashboard 2.0

1. Drag an **iframe** widget onto the canvas.
2. Select **ui-group** and **ui-base** for it, where you want to render the webpage.
3. Set height and width for it according to your preference and set URL to **/worlmap**.

!["Screenshot showing configurations of iframe widget for rendering worlmap page on dashboard"](/blog/2024/05/images/mapping-location-on-dashboard-2-iframe-widget.png "Screenshot showing configurations of iframe widget for rendering worlmap page on dashboard"){data-zoomable}

## Deploying the flow

!["Image displaying live locations of UK public transport on the dashboard"](/blog/2024/05/images/mapping-location-on-dashboard-2-uk-live-transport.gif "Image displaying live locations of UK public transport on the dashboard"){data-zoomable}



::render-flow
---
height: 200
flow: "W3siaWQiOiI0ZTQ1ZThlZjg3MGI4NmZiIiwidHlwZSI6Imdyb3VwIiwieiI6ImVhY2M2OGU3MmYxMjBiMGUiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyJiNjkxN2Q4My5kMWJhYyIsIjM4NDIxNzEuNGQ0ODdlOCIsImI0ZjJlMmRhYmQ1YjgyMjAiLCI1ZjBkMTQ5ZDRkYzM4OTE2IiwiMmZmN2U5NTAxYWQ1MGNkNSIsImEwOGYwYTgzNmFjNDEyYTciLCJiYzg5MWRjMmFhYWVkYzM5IiwiNzI2YThkYTNmZTkzMGU1NCIsImIzZGQ3ODE0ZWE1MjcwY2EiLCIwYzVkNmJjZmQ3MWQ0MGRhIiwiZTAzN2VlM2QxZjcwMmQyNSIsImQ3Y2E2YzNjZGYxNzZlNGUiXSwieCI6ODE0LCJ5Ijo3NTksInciOjE4NzIsImgiOjMyMn0seyJpZCI6ImI2OTE3ZDgzLmQxYmFjIiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiJlYWNjNjhlNzJmMTIwYjBlIiwiZyI6IjRlNDVlOGVmODcwYjg2ZmIiLCJuYW1lIjoiIiwibWV0aG9kIjoiR0VUIiwicmV0Ijoib2JqIiwicGF5dG9xcyI6Imlnbm9yZSIsInVybCI6Imh0dHBzOi8vdGZlLW9wZW5kYXRhLmNvbS9hcGkvdjEvdmVoaWNsZV9sb2NhdGlvbnMiLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6IiIsInNlbmRlcnIiOmZhbHNlLCJoZWFkZXJzIjpbXSwieCI6MTE5MCwieSI6OTAwLCJ3aXJlcyI6W1siYTA4ZjBhODM2YWM0MTJhNyJdXX0seyJpZCI6IjM4NDIxNzEuNGQ0ODdlOCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZWFjYzY4ZTcyZjEyMGIwZSIsImciOiI0ZTQ1ZThlZjg3MGI4NmZiIiwibmFtZSI6ImdldCB0cmFuc3BvcmF0YXRpb24gZGF0YSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiNSIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjoiIiwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4Ijo5NzAsInkiOjkwMCwid2lyZXMiOltbImI2OTE3ZDgzLmQxYmFjIl1dfSx7ImlkIjoiYjRmMmUyZGFiZDViODIyMCIsInR5cGUiOiJ3b3JsZG1hcCIsInoiOiJlYWNjNjhlNzJmMTIwYjBlIiwiZyI6IjRlNDVlOGVmODcwYjg2ZmIiLCJuYW1lIjoid29ybGRtYXAiLCJsYXQiOiIiLCJsb24iOiIiLCJ6b29tIjoiIiwibGF5ZXIiOiJPU01HIiwiY2x1c3RlciI6IiIsIm1heGFnZSI6IiIsInVzZXJtZW51Ijoic2hvdyIsImxheWVycyI6InNob3ciLCJwYW5pdCI6ImZhbHNlIiwicGFubG9jayI6ImZhbHNlIiwiem9vbWxvY2siOiJmYWxzZSIsImhpZGVyaWdodGNsaWNrIjoiZmFsc2UiLCJjb29yZHMiOiJtZ3JzIiwic2hvd2dyaWQiOiJmYWxzZSIsInNob3dydWxlciI6ImZhbHNlIiwiYWxsb3dGaWxlRHJvcCI6ImZhbHNlIiwicGF0aCI6Ii93b3JsZG1hcCIsIm92ZXJsaXN0IjoiRFIsQ08sUkEsRE4iLCJtYXBsaXN0IjoiT1NNRyxPU01DLEVzcmlDLEVzcmlTLFVLT1MiLCJtYXBuYW1lIjoiIiwibWFwdXJsIjoiIiwibWFwb3B0IjoiIiwibWFwd21zIjpmYWxzZSwieCI6MjYwMCwieSI6OTAwLCJ3aXJlcyI6W119LHsiaWQiOiI1ZjBkMTQ5ZDRkYzM4OTE2IiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiZWFjYzY4ZTcyZjEyMGIwZSIsImciOiI0ZTQ1ZThlZjg3MGI4NmZiIiwibmFtZSI6IlJldHJpZXZpbmcsIGZvcm1hdHRpbmcsIGFuZCBwbG90dGluZyBsb2NhdGlvbiBkYXRhIG9uIGEgd29ybGQgbWFwLiIsImluZm8iOiIiLCJ4IjoxMzkwLCJ5Ijo4MDAsIndpcmVzIjpbXX0seyJpZCI6IjJmZjdlOTUwMWFkNTBjZDUiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJlYWNjNjhlNzJmMTIwYjBlIiwiZyI6IjRlNDVlOGVmODcwYjg2ZmIiLCJuYW1lIjoiUmVuZGVyaW5nIGEgbWFwIHdpdGggcGxvdHRlZCBkYXRhIG9uIERhc2hib2FyZCAyLjAuIiwiaW5mbyI6IiIsIngiOjE0NDAsInkiOjk4MCwid2lyZXMiOltdfSx7ImlkIjoiYTA4ZjBhODM2YWM0MTJhNyIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZWFjYzY4ZTcyZjEyMGIwZSIsImciOiI0ZTQ1ZThlZjg3MGI4NmZiIiwibmFtZSI6IlNldCBwYXlsb2FkIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLnZlaGljbGVzIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjEzOTAsInkiOjkwMCwid2lyZXMiOltbIjcyNmE4ZGEzZmU5MzBlNTQiXV19LHsiaWQiOiJiYzg5MWRjMmFhYWVkYzM5IiwidHlwZSI6ImNoYW5nZSIsInoiOiJlYWNjNjhlNzJmMTIwYjBlIiwiZyI6IjRlNDVlOGVmODcwYjg2ZmIiLCJuYW1lIjoiQ2hhbmdlIGFuZCBkZWxldGUgcHJvcGVydGllcyIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQubGF0IiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQubGF0aXR1ZGUiLCJ0b3QiOiJtc2cifSx7InQiOiJkZWxldGUiLCJwIjoicGF5bG9hZC5sYXRpdHVkZSIsInB0IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6InBheWxvYWQubG9uIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQubG9uZ2l0dWRlIiwidG90IjoibXNnIn0seyJ0IjoiZGVsZXRlIiwicCI6InBheWxvYWQubG9uZ2l0dWRlIiwicHQiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicGF5bG9hZC5jb2xvciIsInB0IjoibXNnIiwidG8iOiJibHVlIiwidG90Ijoic3RyIn0seyJ0Ijoic2V0IiwicCI6InBheWxvYWQubmFtZSIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLnZlaGljbGVfaWQiLCJ0b3QiOiJtc2cifSx7InQiOiJkZWxldGUiLCJwIjoicGF5bG9hZC52ZWhpY2xlX2lkIiwicHQiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MTc3MCwieSI6OTAwLCJ3aXJlcyI6W1siYjNkZDc4MTRlYTUyNzBjYSJdXX0seyJpZCI6IjcyNmE4ZGEzZmU5MzBlNTQiLCJ0eXBlIjoic3BsaXQiLCJ6IjoiZWFjYzY4ZTcyZjEyMGIwZSIsImciOiI0ZTQ1ZThlZjg3MGI4NmZiIiwibmFtZSI6IiIsInNwbHQiOiJcXG4iLCJzcGx0VHlwZSI6InN0ciIsImFycmF5U3BsdCI6MSwiYXJyYXlTcGx0VHlwZSI6ImxlbiIsInN0cmVhbSI6ZmFsc2UsImFkZG5hbWUiOiIiLCJ4IjoxNTUwLCJ5Ijo5MDAsIndpcmVzIjpbWyJiYzg5MWRjMmFhYWVkYzM5Il1dfSx7ImlkIjoiYjNkZDc4MTRlYTUyNzBjYSIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiZWFjYzY4ZTcyZjEyMGIwZSIsImciOiI0ZTQ1ZThlZjg3MGI4NmZiIiwibmFtZSI6ImlzIHZlaGljYWwgdHlwZSBpcyB0cmFtIiwicHJvcGVydHkiOiJwYXlsb2FkLnZlaGljbGVfdHlwZSIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiZXEiLCJ2IjoidHJhbSIsInZ0Ijoic3RyIn0seyJ0IjoiZWxzZSJ9XSwiY2hlY2thbGwiOiJ0cnVlIiwicmVwYWlyIjpmYWxzZSwib3V0cHV0cyI6MiwieCI6MjA0MCwieSI6OTAwLCJ3aXJlcyI6W1siMGM1ZDZiY2ZkNzFkNDBkYSJdLFsiZTAzN2VlM2QxZjcwMmQyNSJdXX0seyJpZCI6IjBjNWQ2YmNmZDcxZDQwZGEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImVhY2M2OGU3MmYxMjBiMGUiLCJnIjoiNGU0NWU4ZWY4NzBiODZmYiIsIm5hbWUiOiJzZXQgaWNvbiBhbmQgaWNvbiBjb2xvciBmb3IgdHJhbSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQuaWNvbiIsInB0IjoibXNnIiwidG8iOiJmYS10cmFpbiIsInRvdCI6InN0ciJ9LHsidCI6InNldCIsInAiOiJwYXlsb2FkLmljb25Db2xvciIsInB0IjoibXNnIiwidG8iOiJ5ZWxsb3ciLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MjMxMCwieSI6ODYwLCJ3aXJlcyI6W1siYjRmMmUyZGFiZDViODIyMCJdXX0seyJpZCI6ImUwMzdlZTNkMWY3MDJkMjUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImVhY2M2OGU3MmYxMjBiMGUiLCJnIjoiNGU0NWU4ZWY4NzBiODZmYiIsIm5hbWUiOiJzZXQgaWNvbiBhbmQgaWNvbiBjb2xvciBmb3IgYnVzIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZC5pY29uIiwicHQiOiJtc2ciLCJ0byI6ImJ1cyIsInRvdCI6InN0ciJ9LHsidCI6InNldCIsInAiOiJwYXlsb2FkLmljb25Db2xvciIsInB0IjoibXNnIiwidG8iOiJyZWQiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MjMxMCwieSI6OTQwLCJ3aXJlcyI6W1siYjRmMmUyZGFiZDViODIyMCJdXX0seyJpZCI6ImQ3Y2E2YzNjZGYxNzZlNGUiLCJ0eXBlIjoidWktaWZyYW1lIiwieiI6ImVhY2M2OGU3MmYxMjBiMGUiLCJnIjoiNGU0NWU4ZWY4NzBiODZmYiIsIm5hbWUiOiIiLCJncm91cCI6IjE1ZDJkZmE1NWU5OWVhNDMiLCJvcmRlciI6MCwic3JjIjoiL3dvcmxkbWFwIiwid2lkdGgiOiIxMiIsImhlaWdodCI6IjEwIiwieCI6MTM3MCwieSI6MTA0MCwid2lyZXMiOltdfSx7ImlkIjoiMTVkMmRmYTU1ZTk5ZWE0MyIsInR5cGUiOiJ1aS1ncm91cCIsIm5hbWUiOiJVLksgVHJhbnNwb3J0YXRpb24gTGl2ZSIsInBhZ2UiOiJlMDk4ZTMwNDdiNGE0ZWFhIiwid2lkdGgiOiIxMiIsImhlaWdodCI6IjEiLCJvcmRlciI6LTEsInNob3dUaXRsZSI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiJlMDk4ZTMwNDdiNGE0ZWFhIiwidHlwZSI6InVpLXBhZ2UiLCJuYW1lIjoiVS5LIFRyYW5zcG9ydGF0aW9uIExpdmUiLCJ1aSI6ImMyZTFhYTU2ZjUwZjAzYmQiLCJwYXRoIjoiL3dvcmxkbWFwIiwiaWNvbiI6ImVhcnRoIiwibGF5b3V0IjoiZ3JpZCIsInRoZW1lIjoiMTI5ZTk5NTc0ZGVmOTBhMyIsIm9yZGVyIjotMSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6ImMyZTFhYTU2ZjUwZjAzYmQiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJEYXNoYm9hcmQiLCJwYXRoIjoiL2Rhc2hib2FyZCIsInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwibmF2aWdhdGlvblN0eWxlIjoiZGVmYXVsdCJ9LHsiaWQiOiIxMjllOTk1NzRkZWY5MGEzIiwidHlwZSI6InVpLXRoZW1lIiwibmFtZSI6IkFub3RoZXIgVGhlbWUiLCJjb2xvcnMiOnsic3VyZmFjZSI6IiMwMDAwMDAiLCJwcmltYXJ5IjoiI2ZmNDAwMCIsImJnUGFnZSI6IiNmMGYwZjAiLCJncm91cEJnIjoiI2ZmZmZmZiIsImdyb3VwT3V0bGluZSI6IiNkOWQ5ZDkifSwic2l6ZXMiOnsicGFnZVBhZGRpbmciOiI5cHgiLCJncm91cEdhcCI6IjEycHgiLCJncm91cEJvcmRlclJhZGl1cyI6IjlweCIsIndpZGdldEdhcCI6IjZweCJ9fV0="
---
::



1. With your flow updated to include the above, click the **Deploy** button in the top-right of the Node-RED Editor.
2. Locate the **Open Dashboard** button at the top-right corner of the Dashboard 2.0 sidebar and click on it to navigate to the dashboard.

Now you can view the live location of Edinburgh public transport vehicles on the dashboard. Additionally, clicking on each vehicle reveals further details such as its name, speed, and other properties you've included. Moreover, if you wish to track the live locations of your own vehicles instead of Edinburgh's public transport vehicles, you can connect your devices and access GPS and sensor data using the [Flowfuse device agent](/platform/device-agent/).

## Conclusion 

In conclusion, this guide shows an easy way to map location data on Dashboard 2.0. By following these steps, you can make interactive dashboards that give you real-time info, useful for things like managing fleets and tracking logistics.