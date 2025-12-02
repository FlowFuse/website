---
title: "Building Weather Dashboard in Node-RED"
subtitle: "Build a live weather dashboard in Node-RED with FlowFuse"
description: Learn how to build a real-time weather dashboard in Node-RED using the OpenWeather API and FlowFuse Dashboard.
date: 2025-11-21
authors: ["sumit-shinde"]
image: 
keywords: 
tags:
    - node-red
---

A weather dashboard is honestly the best first project if you're getting into Node-RED. Takes about 10-15 minutes from start to finish, and by the end you'll understand how the whole thing works - connecting to APIs, processing data, and displaying it visually.

This isn't one of our typical deep-dive industrial posts - it's a straightforward starter tutorial that we think everyone getting into Node-RED should have access to. You're building something real: calling an actual weather API, handling live JSON responses, and watching data update on your screen. Once you've done it, the whole flow-based approach just clicks.

We'll use FlowFuse Dashboard for the UI since it's modern and easier to work with. If you know how to drag nodes around and hit the deploy button, you're ready to start.

## What You'll Need

Before you start, make sure you have:

- **Node-RED Instance:** You need Node-RED running somewhere. Easiest option is FlowFuse - [grab a free trial](https://app.flowfuse.com/account/create) and you get a cloud-hosted instance ready to go. No server setup, no port forwarding hassles.
- **OpenWeatherMap Account:** Sign up at openweathermap.org. The free tier gives you enough API calls for this project and then some.

## Installing FlowFuse Dashboard

First thing, get the dashboard package installed:

1. Click the hamburger menu in the top right corner
2. Select Manage palette
3. Go to the Install tab
4. Type `@flowfuse/node-red-dashboard` in the search box
5. Click the install button next to it

Wait for it to finish. You'll see a bunch of new dashboard nodes pop up in your left sidebar - things like ui-gauge, ui-text, ui-chart. That's how you know it worked.

## Getting Your API Key

Log in to your OpenWeather account. Once you're signed in:

1. Go to your account section
2. Find API keys
3. Copy the default key (or generate a new one)
4. Save it in a text file or note app

## Setting Up the API Connection

First, we need to connect to the weather API and make sure it's working.

1. Drag an **inject node** onto the canvas
2. Double-click to configure it
3. Change **Repeat** from "none" to "interval"
4. Set it to repeat every 5 minutes (or whatever interval you prefer)
5. Check the box for **Inject once after** and set it to 0.1 seconds - this will trigger the flow immediately when you deploy
6. Click Done
7. Drag an **http request node** to the right of it
8. Drag a **debug node** to the right of the http request node

Double-click the http request node to open its settings:

9. Make sure **Method** is set to GET
10. In the **URL** field, paste: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric`
11. Replace `YOUR_API_KEY` with the actual API key you copied from OpenWeatherMap
12. Replace `London` with your city if you want
13. Select the Return as parsed JSON.
14. Click Done

The `units=metric` gives you Celsius. Change it to `units=imperial` for Fahrenheit. For more details on what parameters you can use, check out the [OpenWeatherMap API documentation](https://openweathermap.org/current).

Now wire the nodes together by clicking and dragging from the inject node's right side to the http request node's left side, then from the http request node to the debug node.

Click the **Deploy** button in the top right, then click the button on the left side of the inject node. Open the debug panel on the right sidebar if it's not already open.

You should see a JSON object with weather data - temperature, humidity, wind speed, description, and more. This is the raw data coming back from the API.

If you see a 401 error instead, your API key needs a few more minutes to activate. Wait 10-15 minutes and try clicking the inject button again.

## Processing the Weather Data

Now that you're getting data from the API, you need to extract the specific values you want to display. We'll use a function node to pull out temperature, humidity, weather description, and wind speed.

1. Drag a function node and add following code into it and connect it to the http request node:

```javascript
// Extract the data we need
const temp = msg.payload.main.temp;
const humidity = msg.payload.main.humidity;
const description = msg.payload.weather[0].description;
const windSpeed = msg.payload.wind.speed;
const city = msg.payload.name;

// Create separate messages for each value
return [
    { payload: city, topic: "city" },
    { payload: description, topic: "description" },
    { payload: temp, topic: "temperature" },
    { payload: humidity, topic: "humidity" },
    { payload: windSpeed, topic: "wind" },
];
```

2. Set the Function node’s **Outputs** (in the Setup tab) to 5, since the function will return five separate messages.
3. Click Done

This function node splits the API response into separate outputs - one for temperature, one for humidity, and so on. Each output gets its own topic label so you can track what's what.

## Building the Dashboard

Now you'll see your weather data displayed on screen. This demonstrates how Node-RED connects data sources to visual components. We'll organize the dashboard into separate groups for better visual organization.

### Configuring the City Name Display

Start by displaying which city you're tracking:

1. Drag a **ui-text** node onto the canvas
2. Connect it to **output 1** of your function node (the city output)
3. Double-click the ui-text node to open its settings
4. Set **Label** to "Location"
5. For **Group**, click the pencil icon to create a new group called "Weather Overview"
6. Click Add, then Done

You've just created your first dashboard element and dashboard group. Groups organize widgets on the page and function as containers.

### Configuring the Weather Description

Add a text field to show current conditions:

1. Drag another **ui-text** node onto the canvas
2. Connect it to **output 2** of your function node (description output)
3. Double-click to configure
4. Set **Label** to "Conditions"
5. Use the same "Weather Overview" group
6. Click Done

The API returns descriptions like "scattered clouds" or "light rain" - human-readable conditions.

### Configuring the Temperature Gauge

Next, add a circular gauge for temperature:

1. Drag a **ui-gauge** node onto the canvas
2. Connect it to **output 3** of your function node (the temperature output)
3. Double-click to open settings
4. Set **Label** to "Temperature (°C)"
5. Set **Min** to 0 and **Max** to 50 (adjust these based on your climate)
6. Add the color segments you want, as shown in the reference image.
7. For **Group**, click the pencil icon to create a **new group** called "Temperature & Humidity"
8. Click Add to create the group
9. Set **Size** to 3x3 (this controls how much space it takes up)
10. Under the **Appearance** tab, you can select a color scheme if desired
11. Click Done

The gauge will automatically color-code based on the value - cooler temperatures display in blue tones, warmer in orange/red.

### Configuring the Humidity Gauge

Add the humidity gauge to the same group:

1. Drag another **ui-gauge** node onto the canvas
2. Connect it to **output 4** of your function node (humidity output)
3. Double-click to configure
4. Set **Label** to "Humidity (%)"
5. Set **Min** to 0 and **Max** to 100 (humidity is always a percentage)
6. Add the color segments you want, as shown in the reference image.
7. Use the same "Temperature & Humidity" group from the dropdown
8. Set **Size** to 3x3 to match the temperature gauge
9. Click Done

The two gauges will display side by side in the same group, making it easy to compare both metrics at once.

## Configuring the Wind Speed Display

Next, create a dedicated chart to display wind speed trends over time:

1. Drag a **ui-chart** node onto your flow.
2. Connect it to **output 5** of your function node (the wind speed output).
3. Double-click the chart node to configure it.
4. Set **Label** to **"Wind Speed (m/s)"**.
5. Set **Type** to **Line chart**.
6. For the **X-axis**, select **Timestamp**.
7. Set **Y-axis** to use **msg.payload**.
8. Set **Series** to **msg.topic**.
9. Under **Group**, click the pencil icon and create a **new group** named **"Wind Speed"**.
10. Click **Add**, then **Done** to save the configuration.

The chart will begin plotting once data starts flowing in. It will appear empty at first, which is normal.

## Viewing Your Dashboard

Hit the Deploy button in the top right corner.

Then, open the Dashboard 2.0 sidebar and click the Open Dashboard button. You should now see a dashboard similar to the one shown below.

