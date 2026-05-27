---
title: Building a Weather Dashboard in Node-RED (2026)
navTitle: Building a Weather Dashboard in Node-RED (2026)
---

A weather dashboard is honestly the best first project if you're getting into Node-RED. Takes about 10-15 minutes from start to finish, and by the end you'll understand how the whole thing works - connecting to APIs, processing data, and displaying it visually.

<!--more-->

This isn't one of our typical deep-dive industrial posts—it's a straightforward starter tutorial. You'll be building something real: calling an actual weather API, handling JSON responses, and watching live data appear on your dashboard. It's the kind of project that makes Node-RED's flow-based approach suddenly make sense. Once you've built it, you'll have a solid foundation for more complex projects.

We'll use FlowFuse Dashboard for the UI since it's modern and easier to work with. If you know how to drag nodes around and hit the deploy button, you're ready to start.

## What You'll Need

Before you start, make sure you have:

- **Node-RED Instance:** You need Node-RED running somewhere. Easiest option is FlowFuse, [grab a free trial](https://app.flowfuse.com/account/create) and you get a cloud-hosted instance ready to go. No server setup, no port forwarding hassles.
- **OpenWeatherMap Account:** Sign up at `openweathermap.org`. The free tier gives you enough API calls for this project.

## Installing FlowFuse Dashboard

First, get the dashboard package installed:

1. Click the hamburger menu in the top right corner
2. Select Manage palette
3. Go to the Install tab
4. Type `@flowfuse/node-red-dashboard` in the search box
5. Click the install button next to it

Wait for it to finish. You'll see a bunch of new dashboard nodes pop up in your left sidebar, things like **ui-gauge**, **ui-text**, **ui-chart**. That's how you know it worked.

## Getting Your API Key

Log in to your OpenWeather account. Once you're signed in:

1. Go to your account section
2. Find API keys
3. Copy the default key (or generate a new one)
4. Save it in a text file or a note app.

## Setting Up the API Connection

First, we need to connect to the weather API and make sure it's working.

1. Drag an **inject** node onto the canvas
2. Double-click to configure it
3. Change **Repeat** from "none" to "interval"
4. Set it to repeat every 5 seconds (or whatever interval you prefer)
5. Check the box for **Inject once after** and set it to 0.1 seconds, this will trigger the flow immediately when you deploy
6. Click Done

![Inject node configured to trigger the weather API every 5 seconds](/blog/2025/12/images/trigger-weather-api.png){data-zoomable}
_Inject node configured to trigger the weather API every 5 seconds_

7. Drag an **http request** node to the right of it
8. Drag a **debug** node to the right of the **http request** node
9. Double-click the **http request** node to open its settings:
10. Make sure **Method** is set to GET
11. In the **URL** field, paste: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric`
12. Replace `YOUR_API_KEY` with the actual API key you copied from OpenWeatherMap
13. Replace `London` with your city if you want
14. Select the Return as **parsed JSON**.

![HTTP request node configured to fetch weather data from OpenWeatherMap API](/blog/2025/12/images/http-request.png){data-zoomable}
_HTTP request node configured to fetch weather data from OpenWeatherMap API_

14.  Click Done

The `units=metric` gives you Celsius. Change it to `units=imperial` for Fahrenheit. For more details on what parameters you can use, check out the [OpenWeatherMap API documentation](https://openweathermap.org/current).

Now wire the nodes together by clicking and dragging from the **inject** node's right side to the **http request** node's left side, then from the **http request** node to the **debug** node.

Click the **Deploy** button in the top right and open the debug panel on the right sidebar if it's not already open.

You should see a JSON object with weather data, temperature, humidity, wind speed, description, and more. This is the raw data coming back from the API.

If you see a 401 error, your API key may still be activating. Wait 10–15 minutes and try again, or verify the key again in case it’s invalid or mistyped.

## Processing the Weather Data

Now that you're getting data from the API, you need to extract the specific values you want to display. We'll use a **function** node to pull out temperature, humidity, weather description, and wind speed.

1. Drag a **function** node and add following code into it and connect it to the **http request** node:

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

> **Tip:** If you're using FlowFuse, you don't need to write this JavaScript manually. You can use the FlowFuse Expert to generate the function code for you—just describe what you want the **function** node to do. Check out the [article](/blog/2025/07/flowfuse-ai-assistant-better-node-red-manufacturing/) for more details.

2. Set the **function** node's **Outputs** (in the Setup tab) to 5, since the function will return five separate messages.

![Function node configured with 5 outputs to split weather data](/blog/2025/12/images/function-setup-tab.png){data-zoomable}
_Function node configured with 5 outputs to split weather data_

3. Click Done

This **function** node splits the API response into separate outputs - one for temperature, one for humidity, and so on. Each output gets its own topic label so you can track what's what.

## Building the Dashboard

Now you'll see your weather data displayed on screen. This demonstrates how Node-RED connects data sources to visual components. We'll organize the dashboard into separate groups for better visual organization.

### Configuring the City Name Display

Start by displaying which city you're tracking:

1. Drag a **ui-text** node onto the canvas
2. Connect it to **output 1** of your **function** node (the city output)
3. Double-click the **ui-text** node to open its settings
4. Set **Label** to "City"
5. For **Group**, click the pencil icon to create a new group called "Weather Info"
6. Click Add, then Done

![UI text node configured to display city name in Weather Info group](/blog/2025/12/images/city-display.png){data-zoomable}
_UI text node configured to display city name in Weather Info group_

You've just created your first dashboard element and dashboard group. Groups organize widgets on the page and function as containers.

### Configuring the Weather Description

Add a text field to show current conditions:

1. Drag another **ui-text** node onto the canvas
2. Connect it to **output 2** of your **function** node (description output)
3. Double-click to configure
4. Set **Label** to "Conditions"
5. Use the same "Weather Info" group
6. Click Done

![UI text node configured to display weather conditions](/blog/2025/12/images/condition-display.png){data-zoomable}
_UI text node configured to display weather conditions_

The API returns descriptions like "scattered clouds" or "light rain" - human-readable conditions.

### Configuring the Temperature Gauge

Next, add a circular gauge for temperature:

1. Drag a **ui-gauge** node onto the canvas
2. Connect it to **output 3** of your **function** node (the temperature output)
3. Double-click to open settings
4. Set **Label** to "Temperature (°C)"
5. Set **Min** to 0 and **Max** to 50 (adjust these based on your climate)
6. Add the color segments you want, as shown in the reference image.
7. For **Group**, click the pencil icon to create a **new group** called "Temperature & Humidity"
8. Click Add to create the group
9. Under the **Appearance** tab, you can select a color scheme if desired
10. Click Done

![Temperature gauge configured with color-coded segments in Temperature & Humidity group](/blog/2025/12/images/temperature-gauge.png){data-zoomable}
_Temperature gauge configured with color-coded segments in Temperature & Humidity group_

The gauge will automatically color-code based on the value - cooler temperatures display in blue tones, warmer in orange/red.

### Configuring the Humidity Gauge

Add the humidity gauge to the same group:

1. Drag another **ui-gauge** node onto the canvas
2. Connect it to **output 4** of your **function** node (humidity output)
3. Double-click to configure
4. Set **Label** to "Humidity (%)"
5. Set **Min** to 0 and **Max** to 100 (humidity is always a percentage)
6. Add the color segments you want, as shown in the reference image.
7. Use the same "Temperature & Humidity" group from the dropdown
9. Click Done

![Humidity gauge configured to display percentage values with color coding](/blog/2025/12/images/humidity-gauge.png){data-zoomable}
_Humidity gauge configured to display percentage values with color coding_

The two gauges will display side by side in the same group, making it easy to compare both metrics at once.

## Configuring the Wind Speed Display

Next, create a dedicated chart to display wind speed trends over time:

1. Drag a **ui-chart** node onto your flow.
2. Connect it to **output 5** of your **function** node (the wind speed output).
3. Double-click the **ui-chart** node to configure it.
4. Set **Label** to **"Wind Speed (m/s)"**.
5. Set **Type** to **Line chart**.
6. For the **X-axis**, select **Timestamp**.
7. Set **Y-axis** to use **msg.payload**.
8. Set **Series** to **msg.topic**.
9. Under **Group**, click the pencil icon and create a **new group** named **"Wind Speed"**.
10. Click **Add**, then **Done** to save the configuration.

![Wind speed chart configured as a line chart to show trends over time](/blog/2025/12/images/wind-speed-chart.png){data-zoomable}
_Wind speed chart configured as a line chart to show trends over time_

## Viewing Your Dashboard

Hit the Deploy button in the top right corner.

Then, open the Dashboard 2.0 sidebar and click the Open Dashboard button. You should now see a dashboard similar to the one shown below.

![Complete weather dashboard displaying real-time weather data](/blog/2025/12/images/weather-dashboard.png){data-zoomable}
_Complete weather dashboard displaying real-time weather data_

Below is the complete flow. Import it, enter your API URL with your API key in the **http request** node, and deploy the flow:



::render-flow
---
height: 300
flow: "W3siaWQiOiJmNGMwODU5MTY1NGMyOWVmIiwidHlwZSI6ImluamVjdCIsInoiOiI5Y2Y4MmI2OGJiODllOGNlIiwibmFtZSI6IlRyaWdnZXIgV2VhdGhlciBBUEkiLCJwcm9wcyI6W10sInJlcGVhdCI6IjUiLCJjcm9udGFiIjoiIiwib25jZSI6dHJ1ZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MTAwLCJ5IjoxMzAwLCJ3aXJlcyI6W1siNzBkM2RhYjUzMjgwMmM5NyJdXX0seyJpZCI6IjcwZDNkYWI1MzI4MDJjOTciLCJ0eXBlIjoiaHR0cCByZXF1ZXN0IiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJuYW1lIjoiT3BlbldlYXRoZXIgUmVxdWVzdCIsIm1ldGhvZCI6IkdFVCIsInJldCI6Im9iaiIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiIiLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6IiIsInNlbmRlcnIiOmZhbHNlLCJoZWFkZXJzIjpbXSwieCI6MzQwLCJ5IjoxMzAwLCJ3aXJlcyI6W1siODQ5YTkwMjViYjJmOGE3OCJdXX0seyJpZCI6Ijg0OWE5MDI1YmIyZjhhNzgiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsIm5hbWUiOiJQcm9jZXNzIFdlYXRoZXIgRGF0YSIsImZ1bmMiOiIvLyBFeHRyYWN0IHRoZSBkYXRhIHdlIG5lZWRcbmNvbnN0IHRlbXAgPSBtc2cucGF5bG9hZC5tYWluLnRlbXA7XG5jb25zdCBodW1pZGl0eSA9IG1zZy5wYXlsb2FkLm1haW4uaHVtaWRpdHk7XG5jb25zdCBkZXNjcmlwdGlvbiA9IG1zZy5wYXlsb2FkLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG5jb25zdCB3aW5kU3BlZWQgPSBtc2cucGF5bG9hZC53aW5kLnNwZWVkO1xuY29uc3QgY2l0eSA9IG1zZy5wYXlsb2FkLm5hbWU7XG5cbi8vIENyZWF0ZSBzZXBhcmF0ZSBtZXNzYWdlcyBmb3IgZWFjaCB2YWx1ZVxucmV0dXJuIFtcbiAgICB7IHBheWxvYWQ6IGNpdHksIHRvcGljOiBcImNpdHlcIiB9LFxuICAgIHsgcGF5bG9hZDogZGVzY3JpcHRpb24sIHRvcGljOiBcImRlc2NyaXB0aW9uXCIgfSxcbiAgICB7IHBheWxvYWQ6IHRlbXAsIHRvcGljOiBcInRlbXBlcmF0dXJlXCIgfSxcbiAgICB7IHBheWxvYWQ6IGh1bWlkaXR5LCB0b3BpYzogXCJodW1pZGl0eVwiIH0sXG4gICAgeyBwYXlsb2FkOiB3aW5kU3BlZWQsIHRvcGljOiBcIndpbmRcIiB9LFxuXTsiLCJvdXRwdXRzIjo1LCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjU4MCwieSI6MTMwMCwid2lyZXMiOltbImIzMmVjM2RjMDM2Yzk4MWUiXSxbImQ2YTFjZmFhMzc0YmYzZTkiXSxbIjUzMTNkMDIxN2Y1NWUyY2YiXSxbImZjYTM3Yzc1N2ZiNGQ2OWQiXSxbImI2NjhiZjE4NWU2ODY4NDciXV19LHsiaWQiOiI1MzEzZDAyMTdmNTVlMmNmIiwidHlwZSI6InVpLWdhdWdlIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJuYW1lIjoiVGVtcGVyYXR1cmUiLCJncm91cCI6Ijk0NzBlNTFhOGVjODZkOGUiLCJvcmRlciI6MSwidmFsdWUiOiJwYXlsb2FkIiwidmFsdWVUeXBlIjoibXNnIiwid2lkdGgiOiIzIiwiaGVpZ2h0IjoiMyIsImd0eXBlIjoiZ2F1Z2UtaGFsZiIsImdzdHlsZSI6Im5lZWRsZSIsInRpdGxlIjoiVGVtcGVyYXR1cmUiLCJhbHdheXNTaG93VGl0bGUiOmZhbHNlLCJmbG9hdGluZ1RpdGxlUG9zaXRpb24iOiJ0b3AtbGVmdCIsInVuaXRzIjoiwrBDIiwiaWNvbiI6IiIsInByZWZpeCI6IiIsInN1ZmZpeCI6IiIsInNlZ21lbnRzIjpbeyJmcm9tIjoiMCIsImNvbG9yIjoiIzAwOGNiNCIsInRleHQiOiIiLCJ0ZXh0VHlwZSI6InZhbHVlIn0seyJmcm9tIjoiMTUiLCJjb2xvciI6IiMwMGEzZDciLCJ0ZXh0IjoiIiwidGV4dFR5cGUiOiJ2YWx1ZSJ9LHsiZnJvbSI6IjI1IiwiY29sb3IiOiIjZmVjNzAwIiwidGV4dCI6IiIsInRleHRUeXBlIjoidmFsdWUifSx7ImZyb20iOiIzNSIsImNvbG9yIjoiI2ZmYWEwMCIsInRleHQiOiIiLCJ0ZXh0VHlwZSI6InZhbHVlIn0seyJmcm9tIjoiNTAiLCJjb2xvciI6IiNmZjYyNTEiLCJ0ZXh0IjoiIiwidGV4dFR5cGUiOiJ2YWx1ZSJ9XSwibWluIjowLCJtYXgiOiI1MCIsInNpemVUaGlja25lc3MiOjE2LCJzaXplR2FwIjo0LCJzaXplS2V5VGhpY2tuZXNzIjo4LCJzdHlsZVJvdW5kZWQiOnRydWUsInN0eWxlR2xvdyI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsIngiOjc5MCwieSI6MTMwMCwid2lyZXMiOltbXV19LHsiaWQiOiJiMzJlYzNkYzAzNmM5ODFlIiwidHlwZSI6InVpLXRleHQiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImdyb3VwIjoiNWE4OWFjNzE3MWY1MWNjMyIsIm9yZGVyIjoxLCJ3aWR0aCI6IjAiLCJoZWlnaHQiOiIwIiwibmFtZSI6IkNpdHkgRGlzcGxheSIsImxhYmVsIjoiQ2l0eToiLCJmb3JtYXQiOiJ7e21zZy5wYXlsb2FkfX0iLCJsYXlvdXQiOiJyb3ctc3ByZWFkIiwic3R5bGUiOnRydWUsImZvbnQiOiJBcmlhbCxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZiIsImZvbnRTaXplIjoiMjEiLCJjb2xvciI6IiMwMDAwMDAiLCJ3cmFwVGV4dCI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZhbHVlIjoicGF5bG9hZCIsInZhbHVlVHlwZSI6Im1zZyIsIngiOjc5MCwieSI6MTIyMCwid2lyZXMiOltdfSx7ImlkIjoiZDZhMWNmYWEzNzRiZjNlOSIsInR5cGUiOiJ1aS10ZXh0IiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJncm91cCI6IjVhODlhYzcxNzFmNTFjYzMiLCJvcmRlciI6Mywid2lkdGgiOiIwIiwiaGVpZ2h0IjoiMCIsIm5hbWUiOiJDb25kaXRpb25zIERpc3BsYXkiLCJsYWJlbCI6IkNvbmRpdGlvbnM6IiwiZm9ybWF0Ijoie3ttc2cucGF5bG9hZH19IiwibGF5b3V0Ijoicm93LXNwcmVhZCIsInN0eWxlIjp0cnVlLCJmb250IjoiQXJpYWwsQXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWYiLCJmb250U2l6ZSI6IjIxIiwiY29sb3IiOiIjMDAwMDAwIiwid3JhcFRleHQiOmZhbHNlLCJjbGFzc05hbWUiOiIiLCJ2YWx1ZSI6InBheWxvYWQiLCJ2YWx1ZVR5cGUiOiJtc2ciLCJ4Ijo4MTAsInkiOjEyNjAsIndpcmVzIjpbXX0seyJpZCI6ImZjYTM3Yzc1N2ZiNGQ2OWQiLCJ0eXBlIjoidWktZ2F1Z2UiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsIm5hbWUiOiJIdW1pZGl0eSBHYXVnZSIsImdyb3VwIjoiOTQ3MGU1MWE4ZWM4NmQ4ZSIsIm9yZGVyIjoyLCJ2YWx1ZSI6InBheWxvYWQiLCJ2YWx1ZVR5cGUiOiJtc2ciLCJ3aWR0aCI6IjMiLCJoZWlnaHQiOiIzIiwiZ3R5cGUiOiJnYXVnZS1oYWxmIiwiZ3N0eWxlIjoibmVlZGxlIiwidGl0bGUiOiJIdW1pZGl0eSIsImFsd2F5c1Nob3dUaXRsZSI6ZmFsc2UsImZsb2F0aW5nVGl0bGVQb3NpdGlvbiI6InRvcC1sZWZ0IiwidW5pdHMiOiIlIiwiaWNvbiI6IiIsInByZWZpeCI6IiIsInN1ZmZpeCI6IiIsInNlZ21lbnRzIjpbeyJmcm9tIjoiMCIsImNvbG9yIjoiI2Q5NTAwMCIsInRleHQiOiIiLCJ0ZXh0VHlwZSI6InZhbHVlIn0seyJmcm9tIjoiMzAiLCJjb2xvciI6IiM2Zjc2MDgiLCJ0ZXh0IjoiIiwidGV4dFR5cGUiOiJ2YWx1ZSJ9LHsiZnJvbSI6IjgwIiwiY29sb3IiOiIjZmVjNzAwIiwidGV4dCI6IiIsInRleHRUeXBlIjoidmFsdWUifSx7ImZyb20iOiIxMDAiLCJjb2xvciI6IiNkOTUwMDAiLCJ0ZXh0IjoiIiwidGV4dFR5cGUiOiJ2YWx1ZSJ9XSwibWluIjowLCJtYXgiOiIxMDAiLCJzaXplVGhpY2tuZXNzIjoxNiwic2l6ZUdhcCI6NCwic2l6ZUtleVRoaWNrbmVzcyI6OCwic3R5bGVSb3VuZGVkIjp0cnVlLCJzdHlsZUdsb3ciOmZhbHNlLCJjbGFzc05hbWUiOiIiLCJ4Ijo4MDAsInkiOjEzNDAsIndpcmVzIjpbW11dfSx7ImlkIjoiYjY2OGJmMTg1ZTY4Njg0NyIsInR5cGUiOiJ1aS1jaGFydCIsInoiOiI5Y2Y4MmI2OGJiODllOGNlIiwiZ3JvdXAiOiI3YjIwMjVjMTA0Y2Q1MDZlIiwibmFtZSI6IldpbmQgU3BlZWQiLCJsYWJlbCI6IldpbmQgU3BlZWQgKG0vcykiLCJvcmRlciI6MSwiY2hhcnRUeXBlIjoibGluZSIsImNhdGVnb3J5IjoidG9waWMiLCJjYXRlZ29yeVR5cGUiOiJtc2ciLCJ4QXhpc0xhYmVsIjoiIiwieEF4aXNQcm9wZXJ0eSI6IiIsInhBeGlzUHJvcGVydHlUeXBlIjoidGltZXN0YW1wIiwieEF4aXNUeXBlIjoidGltZSIsInhBeGlzRm9ybWF0IjoiIiwieEF4aXNGb3JtYXRUeXBlIjoiYXV0byIsInhtaW4iOiIiLCJ4bWF4IjoiIiwieUF4aXNMYWJlbCI6IiIsInlBeGlzUHJvcGVydHkiOiJwYXlsb2FkIiwieUF4aXNQcm9wZXJ0eVR5cGUiOiJtc2ciLCJ5bWluIjoiIiwieW1heCI6IiIsImJpbnMiOjEwLCJhY3Rpb24iOiJhcHBlbmQiLCJzdGFja1NlcmllcyI6ZmFsc2UsInBvaW50U2hhcGUiOiJjaXJjbGUiLCJwb2ludFJhZGl1cyI6NCwic2hvd0xlZ2VuZCI6dHJ1ZSwicmVtb3ZlT2xkZXIiOjEsInJlbW92ZU9sZGVyVW5pdCI6IjM2MDAiLCJyZW1vdmVPbGRlclBvaW50cyI6IiIsImNvbG9ycyI6WyIjMDA5NWZmIiwiI2ZmMDAwMCIsIiNmZjdmMGUiLCIjMmNhMDJjIiwiI2EzNDdlMSIsIiNkNjI3MjgiLCIjZmY5ODk2IiwiIzk0NjdiZCIsIiNjNWIwZDUiXSwidGV4dENvbG9yIjpbIiM2NjY2NjYiXSwidGV4dENvbG9yRGVmYXVsdCI6dHJ1ZSwiZ3JpZENvbG9yIjpbIiNlNWU1ZTUiXSwiZ3JpZENvbG9yRGVmYXVsdCI6dHJ1ZSwid2lkdGgiOiIxMiIsImhlaWdodCI6IjQiLCJjbGFzc05hbWUiOiIiLCJpbnRlcnBvbGF0aW9uIjoibGluZWFyIiwieCI6NzkwLCJ5IjoxMzgwLCJ3aXJlcyI6W1tdXX0seyJpZCI6Ijk0NzBlNTFhOGVjODZkOGUiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiVGVtcGVyYXR1cmUgJiBIdW1pZGl0eSIsInBhZ2UiOiJmMWViOTliMWU3MTRkNDExIiwid2lkdGgiOjYsImhlaWdodCI6MSwib3JkZXIiOjIsInNob3dUaXRsZSI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSIsImdyb3VwVHlwZSI6ImRlZmF1bHQifSx7ImlkIjoiNWE4OWFjNzE3MWY1MWNjMyIsInR5cGUiOiJ1aS1ncm91cCIsIm5hbWUiOiJXZWF0aGVyIEluZm8iLCJwYWdlIjoiZjFlYjk5YjFlNzE0ZDQxMSIsIndpZHRoIjoiNiIsImhlaWdodCI6IjQiLCJvcmRlciI6MSwic2hvd1RpdGxlIjpmYWxzZSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIiwiZ3JvdXBUeXBlIjoiZGVmYXVsdCJ9LHsiaWQiOiI3YjIwMjVjMTA0Y2Q1MDZlIiwidHlwZSI6InVpLWdyb3VwIiwibmFtZSI6IldpbmQgU3BlZWQiLCJwYWdlIjoiZjFlYjk5YjFlNzE0ZDQxMSIsIndpZHRoIjoiMTIiLCJoZWlnaHQiOjEsIm9yZGVyIjozLCJzaG93VGl0bGUiOmZhbHNlLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UiLCJncm91cFR5cGUiOiJkZWZhdWx0In0seyJpZCI6ImYxZWI5OWIxZTcxNGQ0MTEiLCJ0eXBlIjoidWktcGFnZSIsIm5hbWUiOiJXZWF0aGVyIERhc2hib2FyZCIsInVpIjoiYWZlYTA0Y2U4NzM1YzBhNiIsInBhdGgiOiIvd2VhdGhlciIsImljb24iOiJob21lIiwibGF5b3V0IjoiZ3JpZCIsInRoZW1lIjoiOTM4MjJhN2I0MzY3M2M1OCIsImJyZWFrcG9pbnRzIjpbeyJuYW1lIjoiRGVmYXVsdCIsInB4IjoiMCIsImNvbHMiOiIzIn0seyJuYW1lIjoiVGFibGV0IiwicHgiOiI1NzYiLCJjb2xzIjoiNiJ9LHsibmFtZSI6IlNtYWxsIERlc2t0b3AiLCJweCI6Ijc2OCIsImNvbHMiOiI5In0seyJuYW1lIjoiRGVza3RvcCIsInB4IjoiMTAyNCIsImNvbHMiOiIxMiJ9XSwib3JkZXIiOjEsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOnRydWUsImRpc2FibGVkIjpmYWxzZX0seyJpZCI6ImFmZWEwNGNlODczNWMwYTYiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJVSSBOYW1lIiwicGF0aCI6Ii9kYXNoYm9hcmQiLCJpbmNsdWRlQ2xpZW50RGF0YSI6dHJ1ZSwiYWNjZXB0c0NsaWVudENvbmZpZyI6WyJ1aS1jb250cm9sIiwidWktbm90aWZpY2F0aW9uIl0sImhlYWRlckNvbnRlbnQiOiJwYWdlIiwidGl0bGVCYXJTdHlsZSI6ImRlZmF1bHQiLCJzaG93UmVjb25uZWN0Tm90aWZpY2F0aW9uIjp0cnVlLCJub3RpZmljYXRpb25EaXNwbGF5VGltZSI6NSwic2hvd0Rpc2Nvbm5lY3ROb3RpZmljYXRpb24iOnRydWUsImFsbG93SW5zdGFsbCI6dHJ1ZX0seyJpZCI6IjkzODIyYTdiNDM2NzNjNTgiLCJ0eXBlIjoidWktdGhlbWUiLCJuYW1lIjoiRGVmYXVsdCBUaGVtZSIsImNvbG9ycyI6eyJzdXJmYWNlIjoiIzAwYTNkNyIsInByaW1hcnkiOiIjMDA5NGNlIiwiYmdQYWdlIjoiI2VlZWVlZSIsImdyb3VwQmciOiIjZmZmZmZmIiwiZ3JvdXBPdXRsaW5lIjoiI2NjY2NjYyJ9LCJzaXplcyI6eyJkZW5zaXR5IjoiZGVmYXVsdCIsInBhZ2VQYWRkaW5nIjoiMTJweCIsImdyb3VwR2FwIjoiMTJweCIsImdyb3VwQm9yZGVyUmFkaXVzIjoiNHB4Iiwid2lkZ2V0R2FwIjoiMTJweCJ9fSx7ImlkIjoiOTUwYjNiMzk5ZWEyMmVhNiIsInR5cGUiOiJnbG9iYWwtY29uZmlnIiwiZW52IjpbXSwibW9kdWxlcyI6eyJAZmxvd2Z1c2Uvbm9kZS1yZWQtZGFzaGJvYXJkIjoiMS4yOS4wIn19XQ=="
---
::



## What's Next?

That's it! You've built a real-time weather dashboard and learned the basics of Node-RED—connecting to APIs, processing data, and building visual interfaces.

Throughout this tutorial, you used FlowFuse to host Node-RED and FlowFuse Dashboard for the UI. If you're just starting out, FlowFuse makes things easier—no server setup, no port forwarding, and your dashboard works anywhere. Plus, when you're ready to build bigger projects, features like team collaboration, DevOps pipelines, RBAC, snapshots, and audit logs are already built in.

Try expanding your dashboard by adding more cities, creating historical charts, or setting up weather alerts. The pattern stays the same—you're just swapping data sources and visualizations.

[Start your free FlowFuse trial](https://app.flowfuse.com/account/create) and keep building.
