---
title: Dashboard REST API data points with Node-RED
subtitle: Within a couple of minutes you'll learn how to request data from a REST endpoint and build a chart to display data points
description: Within a couple of minutes you'll learn how to request data from a REST endpoint and build a chart to display data points
authors: ["zeger-jan-van-de-weg"]
image: # TODO
date: 2023-09-19
tags:
    - posts
    - how-to
    - node-red
---

There are many different ways to get data for a Node-RED dashboard. One common
way is to use a REST API. A REST API is a set of web services that allow
developers to interact with a server and its resources. To get data from a REST
API, you can use the HTTP nodes in Node-RED to send HTTP requests to the API and receive the data in the response. In this post we'll guide you through the process.

<!--more-->

First, let's consider what data we want to get. For a dashboard chart it's nice
if there were at least two dimensions to it. For this guide we'll create a chart
of the number of downloads for a certain NPM package.

### Getting some data

Reading the data for a package is done through a `HTTP GET` request, for example:
`https://api.npmjs.org/downloads/range/last-month/@flowforge/node-red-dashboard`.

A simple flow to achieve this would be:

!["Simple flow to for a HTTP GET request"](./images/inject-http-simple.png "Simple flow to for a HTTP GET request")

Where we paste the URL from above into the settings panel:

!["HTTP GET URL setting"](./images/http-get-npmapi.png "HTTP GET URL setting").

When running this flow by clicking the bubble left of the `Inject` node you'll
see a blob of text in the `Debug` pane. This is a great first start, but a blob
isn't useful for the rest of the flow. We need to parse the data as JSON. While
the [JSON node](/node-red/core-nodes/JSON) would work, the HTTP request node can
do this natively. Let `a parsed JSON object` the `Return` settings of the HTTP request node.

So now we got the data, and a little more than we need, so let's change the
message output to keep only what we're interested in; `payload.downloads`. To
do this, we'll use the [change node](/node-red/core-nodes/change).

![Change node to set the payload with downloads](./images/change-node-set-downloads-payload.png "Change node to set the payload")

## Building the Dashboard

For this article we're going to be using the new dashboard and we'll install
`@flowforge/node-red-dashbaord`. Please follow the instruction [on the Dashboard website](https://dashboard.flowfuse.com/getting-started.html#installation).

Now we drag in the `chart` node that's available after installing the dashboard
package and make sure it' input comes from the configured `change` node. Before
hitting the deploy button the dashboard itself needs configuring:

First add configuration for the `ui-group`: ![Configure the UI Group](./images/dashboard-config-chart.png "Configure the chart")

To setup the `ui-group` correctly you'll need to add configuration for the `ui-page`: !["Configure the ui-group"](./images/dashboard-config-ui-group.png "Configure the UI group").

To create the UI page it requires another 2 config settings, `ui-base`, and the theming through `ui-theme`.

![Configure the UI Base](./images/dashboard-config-ui-base.png)

The default theme is great, so just accept that, and save all dialogs to continue the chart creation.

### Normalizing the data

The data for the chart needs to be changed before we can show it. The messages should have a `x` and `y` key. So let's prepare the data with
a combination of the [Split](/node-red/core-nodes/split) and change node.

The Split node with the default configuration allows to 30 elements of the array
to be mapped individually. The change node will set the `payload.x` and `payload.y`
on the message:

![Change node to prepare the data for a chart](./images/change-node-prepare-data-chart.png "Prepare data for the chart")

Connect the change node output to a new chart node, and voila:

![Data in the chart node](./images/chart-with-data.png)

## Keeping the data up-to-date

While we created a chart and it has some data, there's one more thing to explain.
How can the data be kept up-to-date? It's straight forward to have the `Inject`
node [run every night](/node-red/core-nodes/inject/#run-a-flow-daily-at-midnight). But the chart would now have multiple data points
for the same day. This paints multiple lines on top of each other. While that works,
the hover of the chart will display the duplication and it's wastefull.

So before we update the chart we need to send a message to the chart where the
[payload is `[]`](https://dashboard.flowfuse.com/nodes/widgets/ui-chart.html#removing-data). That way the chart is empty, and right afterwards it will
receive the new data to write.

!["RESTful data to a chart"](./images/rest-dashboard-final-flow.png)