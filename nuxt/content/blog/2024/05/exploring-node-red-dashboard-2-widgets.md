---
title: Exploring Node-RED Dashboard 2.0 Widgets
navTitle: Exploring Node-RED Dashboard 2.0 Widgets
---

This guide delves into Node-RED Dashboard 2.0 widgets. It is a guide on how to build a Dashboard application, and will cover many of the widgets available today.

<!--more-->

If you're new to Dashboard 2.0, we recommend starting with the [Getting Started with Dashboard 2.0](/blog/2024/03/dashboard-getting-started/) guide and make sure to install it.

## What Are Widgets?

Widgets in Node-RED Dashboard 2.0 are the building blocks for creating a user interface. In Dashboard 2.0, you get a variety of widgets like forms, templates, buttons, and others to make different parts of your interface.

## Building Applications with Dashboard 2.0 Widgets

!["Income-expense tracker build with dashboard 2.0"](/blog/2024/05/images/exploring-dashboard-2-widgets-incom-expense-tracker-system.gif "Income-expense tracker build with dashboard 2.0"){data-zoomable}
_Income-expense tracker build with dashboard 2.0_

In this guide, we'll create a basic application to input expenses and income. This will then be displayed in a chart and table for analysis. The application will utilize a wide range of widgets available in Dashboard 2.0, helping you understand and use them confidently.

### Adding Forms

For the income and expense submission, we'll incorporate a form using the **ui-form** widget.

1. Drag the **ui-form** widget onto the canvas.
2. Double-click on it to access various widget properties and select the **ui-group** where it should render.
4. Add "date", "description", "amount", and "note" form elements by clicking the **+element** button at the bottom left.

!["Screenshot displaying Income submission ui-form's configuration"](/blog/2024/05/images/exploring-dashboard-2-widgets-income-submission-form.png "Screenshot displaying Income submission ui-form's configuration"){data-zoomable}
_Screenshot displaying Income submission ui-form's configuration_

Once you've added the income submission form, repeat the process to add an expense submission form on another **ui-page** and **ui-group**. For more information on **ui-form**, refer to the [ui-form docs](https://dashboard.flowfuse.com/nodes/widgets/ui-form.html).

!["Screenshot displaying Expense submission ui-form's configuration"](/blog/2024/05/images/exploring-dashboard-2-widgets-expense-submission-form.png "Screenshot displaying Expense submission ui-form's configuration"){data-zoomable}
_Screenshot displaying Expense submission ui-form's configuration_

### Storing Form Data

The **ui-form** widget emits a payload object with key-value pairs of form elements upon submission. We'll store this data in a global context, If you are not familiar with Node-RED context, refer to [Understanding Node-RED varriables](/blog/2024/05/understanding-node-flow-global-environment-variables-in-node-red/).

1. Drag a **function** node onto the canvas and add the following code. This will store the submission in the `income` global context variable, and then modify `msg.payload` to pass on a notification to any further connected nodes.

```javascript
// Retrieve the existing 'income' array from the global context, or initialize it as an empty array if it doesn't exist
let income = global.get('income') || [];

// Push the incoming payload along with a 'type' property set to "income" into the 'income' array
income.push({
  ...msg.payload,
  type: "income",
});

// Store the updated 'income' array back into the global context
global.set('income', income);

// Set the message payload to a confirmation message for notification
msg.payload = "Thank you for submitting income!";

// Return the modified message
return msg;
```

Similarly, you can do this for storing expense data submitted using the expense submission form.

### Displaying Notifications

For displaying notifications on the dashboard, we'll utilize the **ui-notification** widget, which emits notifications to the user's dashboard. It accepts `msg.payload` which should be a string format or raw HTML/JavaScript for custom formatting.

1. Drag the **ui-notification** widget onto the canvas.
2. Set the position property to **center**. You can also adjust colors or notification timeout by modifying the color and timeout properties. Please take a look at the [ui-notification docs](https://dashboard.flowfuse.com/nodes/widgets/ui-notification.html#properties) for more information on **ui-notification**.

!["Screenshot displaying ui-notification widgets configuration"](/blog/2024/05/images/exploring-dashboard-2-widgets-notification-widget.png "Screenshot displaying ui-notification widgets configuration"){data-zoomable}
_Screenshot displaying ui-notification widgets configuration_

### Listening for events

In Dashboard 2.0, the **ui-event** widget allows you to listen to user behavior or events. It does not render any content or components on the dashboard. Currently, this widget only listens for page views (`$pageview`) and leave (`$pageleave`) events.

With this, we can listen for page view and page leave events and trigger tasks based on those events. For instance, in our application, we will be displaying a table containing income and expense data, along with a chart. We'll update them when navigating to a new page or leaving a page.

1. Drag an **ui-event** widget onto the canvas.
2. Double-click on it and select the correct **ui-base** of your application.

For more information on ui-event refer to [ui-event docs](https://dashboard.flowfuse.com/nodes/widgets/ui-event.html).

### Retrieving Income-Expense Data

In our income-expense application, we will display the income and expenses in a single table.

1. Drag a **change** node onto the canvas.
2. Set `msg.payload` to the JSONata expression below, which merges the income and expense arrays.
   
```javascript
[$globalContext('income'), $globalContext('expense')]
```

3. Connect the output of the **ui-event** widget to the input of the **change** node.

!["Screenshot displaying the change node setting JSON expression to payload for retrieving and sorting data."](/blog/2024/05/images/exploring-dashboard-2-widgets-change-node.png "Screenshot displaying the change node setting JSON expression to payload for retrieving and sorting data."){data-zoomable}
_Screenshot displaying the change node setting JSON expression to payload for retrieving and sorting data._

### Displaying Data on the Table

To display data on the table, we use the **ui-table** widget in Dashboard 2.0. This widget accepts an array of objects as input. The columns in the table correspond to the properties of the objects within the array, and each row represents a different object with values corresponding to those properties.

1. Drag a **ui-table** widget onto the canvas.
2. Create a new **ui-page** and **ui-group** for it.
3. Connect the output of the **change** node to the input of the **ui-table** widget.

!["Screenshot displaying the ui-table widget configuration"](/blog/2024/05/images/exploring-dashboard-2-widgets-table-widget.png "Screenshot displaying the ui-table widget configuration"){data-zoomable}
_Screenshot displaying the ui-table widget configuration_

For more information on ui-table refer to [ui-table docs](https://dashboard.flowfuse.com/nodes/widgets/ui-table.html)

### Calculating total category-wise 

In our application, we will display data on the chart, showing the total income and total expenses for analysis. In this section, we will calculate the total expenses and income using the function node.

1. Drag the two **change** node onto the canvas.
2. For the first **Change** node Set `msg.payload` to `global.income` and `msg.topic` to "income" and give it name "retrive income". For the second **Change** node, set `msg.payload` to `global.expense` and `msg.topic` to "expense" and give that second change node name "retrive expense".

!["Screenshot displaying the change node retrieving income data from global context"](/blog/2024/05/images/exploring-dashboard-2-widgets-chart-widget-retrieve-income-change-node.png "Screenshot displaying the change node retrieving income data from global context"){data-zoomable}
_Screenshot displaying the change node retrieving income data from global context_

!["Screenshot displaying the change node retrieving expense data from global context"](/blog/2024/05/images/exploring-dashboard-2-widgets-chart-widget-retrieve-expense-change-node.png "Screenshot displaying the change node retrieving expense data from global context"){data-zoomable}
_Screenshot displaying the change node retrieving expense data from global context_

3. Drag a **Split** node onto the canvas.
4. Drag the **Change** node onto the canvas and set `msg.payload.amount` to the JSONata expression `$number(payload.amount)` and give it name "Convert amount to number".

!["Screenshot displaying the change node converting amount to number"](/blog/2024/05/images/exploring-dashboard-2-widgets-chart-widget-convert-amount-to-number-change-node.png "Screenshot displaying the change node converting amount to number"){data-zoomable}
_Screenshot displaying the change node converting amount to number_

5. Drag a **Join** node onto the canvas, select mode as **reduced expression**, and set the **Reduce exp** to `$A + payload.amount`. Set Initial value to `0`, and **Fix-up exp** to `$A`. Give this **join** node the name "Calculate total". This function operates similarly to using the javascript reduce method on an array to calculate the sum of its values. `$A` stores the accumulated value, and with every incoming message payload, it adds the `payload.amount` value to it, for more details on this refer to the [core node docs on join node](/node-red/core-nodes/join/).

!["Screenshot displaying the join node calculating the total income and expense data"](/blog/2024/05/images/exploring-dashboard-2-widgets-chart-widget-calculate-total-join-node.png "Screenshot displaying the join node calculating the total income and expense data"){data-zoomable}
_Screenshot displaying the join node calculating the total income and expense data_

7. Drag an another join node onto the canvas set mode to manual, combine each to complete message, to create to array and After a number of message parts to 2 and give it name "combine two objects into array".

!["Screenshot displaying the join node combining the income and expense object into the array"](/blog/2024/05/images/exploring-dashboard-2-widgets-chart-widget-retrieve-combine-object-join-node.png "Screenshot displaying the join node combining the income and expense object into the"){data-zoomable}
_Screenshot displaying the join node combining the income and expense object into the array_

7. Connect the output of the **ui-event** widget to the input of the **Change** node named "Retrieve Income" and "Retrieve Expense". Then, connect the outputs of the "Retrieve Income" and "Retrieve Expense" **Change** nodes to the input of the **Split** node. 

8. Next, connect the output of the **Split** node to the **Change** node named "Convert Amount to Number". Afterward, connect the output of that **Change** node to the input of the **Join** node named "Calculate Total". Finally, connect the output of the "Calculate Total" **Join** node to the input of the **Join** node named "Combine Objects into Array".

### Displaying data on the chart 

To display charts on the dashboard, we have to use the ui-chart widget which allows us to display different types of charts on a dashboard including linear, bar, scatter, etc. This accepts an array and object as input.

1. Drag a **ui-chart** widget onto the canvas.
2. Double-click on the widget and select Type as **bar**.
3. Configure the series to **category** and the y-axis to **amount**. This configuration informs the chart that the **amount** property of the input objects will be plotted on the y-axis and category to the x-axis of the chart.
4. Connect the output of the **join** node named "Combine Objects into Array" to the **ui-chart** widget's input.
   
!["Screenshot displaying the ui-chart widget's configuration"](/blog/2024/05/images/exploring-dashboard-2-widgets-chart-widget.png "Screenshot displaying the ui-chart widget's configuration"){data-zoomable}
_Screenshot displaying the ui-chart widget's configuration_

### Adding custom footer with ui-template

With the **ui-template** widget, we can add a custom component to our app using Vue.js. It also allows adding custom CSS for the dashboard and lot of other things. For more information refer to [ui-template docs](https://dashboard.flowfuse.com/nodes/widgets/ui-template.html).

Using this widget, we will add a footer to our application.

1. Drag an **ui-template** widget onto the canvas.
2. Set the widget type (scoped UI) that will render this widget on the entire dashboard, eliminating the need to add separate footers for each page of the dashboard.
3. Insert the following vue.js code in the **ui-template** widget. 

```javascript
<template>
  <!-- Footer Component -->
  <div class="footer">
    <!-- Description of the Income-Expense Tracker -->
    <div>
      Welcome to our comprehensive income expense tracker! Take control of your finances by monitoring your income and
      expenses effortlessly. Our user-friendly interface makes it simple to record transactions, categorize expenses, and
      analyze your financial trends. With real-time insights into your spending habits, you can make smarter financial
      decisions and achieve your money goals faster.
    </div>
    <!-- Copyright Information -->
    <div class="copyright">
      <!-- Display Current Year and Copyright Information -->
      2024 — <strong>Vuetify</strong>
    </div>
  </div>
</template>
<style scoped>
  /* Make the footer occupy all available space */
  .footer {
    position:absolute;
    bottom:0;
    background-color:rgb(26,26,26);
    color:rgb(238,238,238);
    height:130px;
    text-align:center;
    padding:14px;
  }

  .copyright{
    margin-top:10px;
  }
</style>
```

!["Screenshot displaying the ui-template widget's configuration"](/blog/2024/05/images/exploring-dashboard-2-widgets-template-widget.png "Screenshot displaying the ui-template widget's configuration"){data-zoomable}

### Deploying your application flow



::render-flow
---
height: 450
flow: "W3siaWQiOiIzMDFjMWZkOGUyOWMzYWFlIiwidHlwZSI6InVpLXRlbXBsYXRlIiwieiI6IjdhYzM4OTBkZmE3NDcwM2IiLCJncm91cCI6IiIsInBhZ2UiOiIiLCJ1aSI6ImEwYTg1YTVmNGMyOWFmNTAiLCJuYW1lIjoiRm9vdGVyIiwib3JkZXIiOjAsIndpZHRoIjowLCJoZWlnaHQiOjAsImhlYWQiOiIiLCJmb3JtYXQiOiI8dGVtcGxhdGU+XG4gIDwhLS0gRm9vdGVyIENvbXBvbmVudCAtLT5cbiAgPGRpdiBjbGFzcz1cImZvb3RlclwiPlxuICAgIDwhLS0gRGVzY3JpcHRpb24gb2YgdGhlIEluY29tZS1FeHBlbnNlIFRyYWNrZXIgLS0+XG4gICAgPGRpdj5cbiAgICAgIFdlbGNvbWUgdG8gb3VyIGNvbXByZWhlbnNpdmUgaW5jb21lIGV4cGVuc2UgdHJhY2tlciEgVGFrZSBjb250cm9sIG9mIHlvdXIgZmluYW5jZXMgYnkgbW9uaXRvcmluZyB5b3VyIGluY29tZSBhbmRcbiAgICAgIGV4cGVuc2VzIGVmZm9ydGxlc3NseS4gT3VyIHVzZXItZnJpZW5kbHkgaW50ZXJmYWNlIG1ha2VzIGl0IHNpbXBsZSB0byByZWNvcmQgdHJhbnNhY3Rpb25zLCBjYXRlZ29yaXplIGV4cGVuc2VzLFxuICAgICAgYW5kXG4gICAgICBhbmFseXplIHlvdXIgZmluYW5jaWFsIHRyZW5kcy4gV2l0aCByZWFsLXRpbWUgaW5zaWdodHMgaW50byB5b3VyIHNwZW5kaW5nIGhhYml0cywgeW91IGNhbiBtYWtlIHNtYXJ0ZXIgZmluYW5jaWFsXG4gICAgICBkZWNpc2lvbnMgYW5kIGFjaGlldmUgeW91ciBtb25leSBnb2FscyBmYXN0ZXIuXG4gICAgPC9kaXY+XG4gICAgPCEtLSBDb3B5cmlnaHQgSW5mb3JtYXRpb24gLS0+XG4gICAgPGRpdiBjbGFzcz1cImNvcHlyaWdodFwiPlxuICAgICAgPCEtLSBEaXNwbGF5IEN1cnJlbnQgWWVhciBhbmQgQ29weXJpZ2h0IEluZm9ybWF0aW9uIC0tPlxuICAgICAyMDI0IOKAlCA8c3Ryb25nPlZ1ZXRpZnk8L3N0cm9uZz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuICAvKiBNYWtlIHRoZSBmb290ZXIgb2NjdXB5IGFsbCBhdmFpbGFibGUgc3BhY2UgKi9cbiAgLmZvb3RlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI2LCAyNik7XG4gICAgY29sb3I6IHJnYigyMzgsIDIzOCwgMjM4KTtcbiAgICBoZWlnaHQ6IDEzMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxNHB4O1xuICB9XG5cbiAgLmNvcHlyaWdodCB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgfVxuPC9zdHlsZT4iLCJzdG9yZU91dE1lc3NhZ2VzIjp0cnVlLCJwYXNzdGhydSI6dHJ1ZSwicmVzZW5kT25SZWZyZXNoIjp0cnVlLCJ0ZW1wbGF0ZVNjb3BlIjoid2lkZ2V0OnVpIiwiY2xhc3NOYW1lIjoiIiwieCI6OTEwLCJ5Ijo3MDAsIndpcmVzIjpbW11dfSx7ImlkIjoiMzQyZjNlZTIxNWQzMmZkYyIsInR5cGUiOiJncm91cCIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwibmFtZSI6Ik5ldyBJY29tZSBwYWdlIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyJkMDI4Yzg3ODM1MGQxOWUxIiwiNDNlNzliYjc3ZDcxOGM5NSIsIjViYTVkOGJmZjFhNzdiZWEiXSwieCI6Mjc0LCJ5IjoyNzksInciOjc1MiwiaCI6ODJ9LHsiaWQiOiJkMDI4Yzg3ODM1MGQxOWUxIiwidHlwZSI6InVpLWZvcm0iLCJ6IjoiN2FjMzg5MGRmYTc0NzAzYiIsImciOiIzNDJmM2VlMjE1ZDMyZmRjIiwibmFtZSI6IkluY29tZSBTdWJtaXNzaW9uIEZvcm0iLCJncm91cCI6Ijk2MTUyODk0M2UxYmI2OTgiLCJsYWJlbCI6IiIsIm9yZGVyIjoxLCJ3aWR0aCI6IjAiLCJoZWlnaHQiOiIwIiwib3B0aW9ucyI6W3sibGFiZWwiOiJEYXRlIiwia2V5IjoiZGF0ZSIsInR5cGUiOiJkYXRlIiwicmVxdWlyZWQiOnRydWUsInJvd3MiOm51bGx9LHsibGFiZWwiOiJEZXNjcmlwdGlvbiIsImtleSI6ImRlc2NyaXB0aW9uIiwidHlwZSI6InRleHQiLCJyZXF1aXJlZCI6dHJ1ZSwicm93cyI6bnVsbH0seyJsYWJlbCI6IkFtb3VudCIsImtleSI6ImFtb3VudCIsInR5cGUiOiJudW1iZXIiLCJyZXF1aXJlZCI6dHJ1ZSwicm93cyI6bnVsbH0seyJsYWJlbCI6Ik5vdGUiLCJrZXkiOiJub3RlIiwidHlwZSI6InRleHQiLCJyZXF1aXJlZCI6ZmFsc2UsInJvd3MiOm51bGx9XSwiZm9ybVZhbHVlIjp7ImRhdGUiOiIiLCJkZXNjcmlwdGlvbiI6IiIsImFtb3VudCI6IiIsIm5vdGUiOiIifSwicGF5bG9hZCI6IiIsInN1Ym1pdCI6InN1Ym1pdCIsImNhbmNlbCI6ImNsZWFyIiwicmVzZXRPblN1Ym1pdCI6dHJ1ZSwidG9waWMiOiJ0b3BpYyIsInRvcGljVHlwZSI6Im1zZyIsInNwbGl0TGF5b3V0IjoiIiwiY2xhc3NOYW1lIjoiIiwieCI6NDEwLCJ5IjozMjAsIndpcmVzIjpbWyI1YmE1ZDhiZmYxYTc3YmVhIl1dfSx7ImlkIjoiNDNlNzliYjc3ZDcxOGM5NSIsInR5cGUiOiJ1aS1ub3RpZmljYXRpb24iLCJ6IjoiN2FjMzg5MGRmYTc0NzAzYiIsImciOiIzNDJmM2VlMjE1ZDMyZmRjIiwidWkiOiJhMGE4NWE1ZjRjMjlhZjUwIiwicG9zaXRpb24iOiJjZW50ZXIgY2VudGVyIiwiY29sb3JEZWZhdWx0Ijp0cnVlLCJjb2xvciI6IiMwMDAwMDAiLCJkaXNwbGF5VGltZSI6IjMiLCJzaG93Q291bnRkb3duIjp0cnVlLCJvdXRwdXRzIjowLCJhbGxvd0Rpc21pc3MiOnRydWUsImRpc21pc3NUZXh0IjoiQ2xvc2UiLCJyYXciOmZhbHNlLCJjbGFzc05hbWUiOiIiLCJuYW1lIjoiIiwieCI6OTEwLCJ5IjozMjAsIndpcmVzIjpbXX0seyJpZCI6IjViYTVkOGJmZjFhNzdiZWEiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiN2FjMzg5MGRmYTc0NzAzYiIsImciOiIzNDJmM2VlMjE1ZDMyZmRjIiwibmFtZSI6IlN0b3JlIGluY29tZSIsImZ1bmMiOiJsZXQgaW5jb21lID0gZ2xvYmFsLmdldCgnaW5jb21lJykgfHwgW107XG5cbmluY29tZS5wdXNoKHtcbiAgICAuLi5tc2cucGF5bG9hZCxcbiAgICB0eXBlOlwiaW5jb21lXCIsXG59KTtcblxuZ2xvYmFsLnNldCgnaW5jb21lJywgaW5jb21lKTtcblxubXNnLnBheWxvYWQgPSBcIlRoYW5rIHlvdSBmb3Igc3VibWl0dGluZyBpbmNvbWUhXCJcblxucmV0dXJuIG1zZzsiLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjY1MCwieSI6MzIwLCJ3aXJlcyI6W1siNDNlNzliYjc3ZDcxOGM5NSJdXX0seyJpZCI6Ijk2MTUyODk0M2UxYmI2OTgiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiSW5jb21lIFN1Ym1pc3Npb24gRm9ybSIsInBhZ2UiOiJkOTU0ZDczZjlkY2QxNDcyIiwid2lkdGgiOiIxMiIsImhlaWdodCI6IjEiLCJvcmRlciI6MSwic2hvd1RpdGxlIjp0cnVlLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UifSx7ImlkIjoiZDk1NGQ3M2Y5ZGNkMTQ3MiIsInR5cGUiOiJ1aS1wYWdlIiwibmFtZSI6Ik5ldyBJbmNvbWUiLCJ1aSI6ImEwYTg1YTVmNGMyOWFmNTAiLCJwYXRoIjoiL25ldy1JY29tZSIsImljb24iOiJiYW5rLXRyYW5zZmVyLWluIiwibGF5b3V0Ijoibm90ZWJvb2siLCJ0aGVtZSI6ImFlZWVjM2ZjMTA3N2ViMWMiLCJvcmRlciI6MSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6ImFlZWVjM2ZjMTA3N2ViMWMiLCJ0eXBlIjoidWktdGhlbWUiLCJuYW1lIjoiZGFzaGJvYXJkIiwiY29sb3JzIjp7InN1cmZhY2UiOiIjMWExYTFhIiwicHJpbWFyeSI6IiMwMDk0Y2UiLCJiZ1BhZ2UiOiIjZWVlZWVlIiwiZ3JvdXBCZyI6IiNmZmZmZmYiLCJncm91cE91dGxpbmUiOiIjY2NjY2NjIn0sInNpemVzIjp7InBhZ2VQYWRkaW5nIjoiMTJweCIsImdyb3VwR2FwIjoiMTJweCIsImdyb3VwQm9yZGVyUmFkaXVzIjoiNHB4Iiwid2lkZ2V0R2FwIjoiMTJweCJ9fSx7ImlkIjoiNGFmYjQ4MTRiZTU2YTlhOCIsInR5cGUiOiJncm91cCIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwibmFtZSI6Ik5ldyBFeHBlbnNlIHBhZ2UiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImU4MmI3MTlkODk5Y2JmNzMiLCIzNDU3ODQ4NjUyYWQ3NWUxIiwiYmQ5MGE5YWQ2MTI0MDhkMyJdLCJ4IjoxMDU0LCJ5IjoyNzksInciOjc1MiwiaCI6ODJ9LHsiaWQiOiJlODJiNzE5ZDg5OWNiZjczIiwidHlwZSI6InVpLWZvcm0iLCJ6IjoiN2FjMzg5MGRmYTc0NzAzYiIsImciOiI0YWZiNDgxNGJlNTZhOWE4IiwibmFtZSI6IkV4cGVuc2UgU3VibWlzc2lvbiBGb3JtIiwiZ3JvdXAiOiI4NTQ3MDY2NTFjZDhhOGYyIiwibGFiZWwiOiIiLCJvcmRlciI6MSwid2lkdGgiOiIxMiIsImhlaWdodCI6IjEiLCJvcHRpb25zIjpbeyJsYWJlbCI6IkRhdGUiLCJrZXkiOiJkYXRlIiwidHlwZSI6ImRhdGUiLCJyZXF1aXJlZCI6dHJ1ZSwicm93cyI6bnVsbH0seyJsYWJlbCI6IkRlc2NyaXB0aW9uIiwia2V5IjoiZGVzY3JpcHRpb24iLCJ0eXBlIjoidGV4dCIsInJlcXVpcmVkIjp0cnVlLCJyb3dzIjpudWxsfSx7ImxhYmVsIjoiQ2F0ZWdvcnkiLCJrZXkiOiJjYXRlZ29yeSIsInR5cGUiOiJ0ZXh0IiwicmVxdWlyZWQiOnRydWUsInJvd3MiOm51bGx9LHsibGFiZWwiOiJBbW91bnQiLCJrZXkiOiJhbW91bnQiLCJ0eXBlIjoibnVtYmVyIiwicmVxdWlyZWQiOnRydWUsInJvd3MiOm51bGx9LHsibGFiZWwiOiJOb3RlIiwia2V5Ijoibm90ZSIsInR5cGUiOiJ0ZXh0IiwicmVxdWlyZWQiOmZhbHNlLCJyb3dzIjpudWxsfV0sImZvcm1WYWx1ZSI6eyJkYXRlIjoiIiwiZGVzY3JpcHRpb24iOiIiLCJjYXRlZ29yeSI6IiIsImFtb3VudCI6IiIsIm5vdGUiOiIifSwicGF5bG9hZCI6IiIsInN1Ym1pdCI6InN1Ym1pdCIsImNhbmNlbCI6ImNsZWFyIiwicmVzZXRPblN1Ym1pdCI6dHJ1ZSwidG9waWMiOiJ0b3BpYyIsInRvcGljVHlwZSI6Im1zZyIsInNwbGl0TGF5b3V0IjoiIiwiY2xhc3NOYW1lIjoiIiwieCI6MTE5MCwieSI6MzIwLCJ3aXJlcyI6W1siYmQ5MGE5YWQ2MTI0MDhkMyJdXX0seyJpZCI6IjM0NTc4NDg2NTJhZDc1ZTEiLCJ0eXBlIjoidWktbm90aWZpY2F0aW9uIiwieiI6IjdhYzM4OTBkZmE3NDcwM2IiLCJnIjoiNGFmYjQ4MTRiZTU2YTlhOCIsInVpIjoiYTBhODVhNWY0YzI5YWY1MCIsInBvc2l0aW9uIjoiY2VudGVyIGNlbnRlciIsImNvbG9yRGVmYXVsdCI6dHJ1ZSwiY29sb3IiOiIjMDAwMDAwIiwiZGlzcGxheVRpbWUiOiIzIiwic2hvd0NvdW50ZG93biI6dHJ1ZSwib3V0cHV0cyI6MCwiYWxsb3dEaXNtaXNzIjp0cnVlLCJkaXNtaXNzVGV4dCI6IkNsb3NlIiwicmF3IjpmYWxzZSwiY2xhc3NOYW1lIjoiIiwibmFtZSI6IiIsIngiOjE2OTAsInkiOjMyMCwid2lyZXMiOltdfSx7ImlkIjoiYmQ5MGE5YWQ2MTI0MDhkMyIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwiZyI6IjRhZmI0ODE0YmU1NmE5YTgiLCJuYW1lIjoiU3RvcmUgZXhwZW5zZSIsImZ1bmMiOiJsZXQgZXhwZW5zZSA9IGdsb2JhbC5nZXQoJ2V4cGVuc2UnKSB8fCBbXTtcblxuZXhwZW5zZS5wdXNoKHtcbiAgICAuLi5tc2cucGF5bG9hZCxcbiAgICB0eXBlOiBcImV4cGVuc2VcIixcbn0pO1xuXG5nbG9iYWwuc2V0KCdleHBlbnNlJywgZXhwZW5zZSk7XG5cbm1zZy5wYXlsb2FkID0gXCJUaGFuayB5b3UgZm9yIHN1Ym1pdHRpbmcgZXhwZW5zZSFcIlxuXG5yZXR1cm4gbXNnOyIsIm91dHB1dHMiOjEsInRpbWVvdXQiOjAsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6MTQyMCwieSI6MzIwLCJ3aXJlcyI6W1siMzQ1Nzg0ODY1MmFkNzVlMSJdXX0seyJpZCI6Ijg1NDcwNjY1MWNkOGE4ZjIiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiRXhwZW5zZSBTdWJtaXNzaW9uIEZvcm0iLCJwYWdlIjoiOTdiZjNlODdmNGJkZGRjMSIsIndpZHRoIjoiMTIiLCJoZWlnaHQiOiIxIiwib3JkZXIiOjIsInNob3dUaXRsZSI6dHJ1ZSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6Ijk3YmYzZTg3ZjRiZGRkYzEiLCJ0eXBlIjoidWktcGFnZSIsIm5hbWUiOiJOZXcgRXhwZW5zZSIsInVpIjoiYTBhODVhNWY0YzI5YWY1MCIsInBhdGgiOiIvbmV3LWV4cGVuc2UiLCJpY29uIjoiYmFuay10cmFuc2Zlci1vdXQiLCJsYXlvdXQiOiJub3RlYm9vayIsInRoZW1lIjoiYWVlZWMzZmMxMDc3ZWIxYyIsIm9yZGVyIjoyLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UifSx7ImlkIjoiNzcyMTdlMjU2ZWY3NTMyOCIsInR5cGUiOiJncm91cCIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwibmFtZSI6IllvdXIgaWNvbWUgYW5kIGV4cGVuc2UgdGFibGUiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbIjQ1MmQ1NjFiZjc5NzI3Y2IiLCIwYzY0NTY3YzgxZGQ2YThkIl0sIngiOjI3NCwieSI6Mzk5LCJ3Ijo1NzIsImgiOjgyfSx7ImlkIjoiNDUyZDU2MWJmNzk3MjdjYiIsInR5cGUiOiJ1aS10YWJsZSIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwiZyI6Ijc3MjE3ZTI1NmVmNzUzMjgiLCJncm91cCI6ImU4NDhhNWU0OGE2NTQ5YzkiLCJuYW1lIjoiIiwibGFiZWwiOiJ0ZXh0Iiwib3JkZXIiOjIsIndpZHRoIjowLCJoZWlnaHQiOjAsIm1heHJvd3MiOjAsInBhc3N0aHJ1IjpmYWxzZSwiYXV0b2NvbHMiOnRydWUsInNlbGVjdGlvblR5cGUiOiJjbGljayIsImNvbHVtbnMiOltdLCJ4Ijo3NzAsInkiOjQ0MCwid2lyZXMiOltbXV19LHsiaWQiOiIwYzY0NTY3YzgxZGQ2YThkIiwidHlwZSI6ImNoYW5nZSIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwiZyI6Ijc3MjE3ZTI1NmVmNzUzMjgiLCJuYW1lIjoiTWVyZ2UgaW5jb21lIGFuZCBleHBlbnNlIGRhdGEiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IlsgICAgJGdsb2JhbENvbnRleHQoXCJpbmNvbWVcIiksXHQgICAkZ2xvYmFsQ29udGV4dChcImV4cGVuc2VcIilcdF0iLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjQ0MCwieSI6NDQwLCJ3aXJlcyI6W1siNDUyZDU2MWJmNzk3MjdjYiJdXX0seyJpZCI6ImU4NDhhNWU0OGE2NTQ5YzkiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiWW91ciBJbmNvbWUgYW5kIEV4cGVuc2UiLCJwYWdlIjoiN2FiZjBiM2NiNmYzOGNhMyIsIndpZHRoIjoiMTIiLCJoZWlnaHQiOiI1Iiwib3JkZXIiOjIsInNob3dUaXRsZSI6dHJ1ZSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6IjdhYmYwYjNjYjZmMzhjYTMiLCJ0eXBlIjoidWktcGFnZSIsIm5hbWUiOiJZb3VyIEluY29tZSBhbmQgZXhwZW5zZSIsInVpIjoiYTBhODVhNWY0YzI5YWY1MCIsInBhdGgiOiIveW91ci1pY29tZS1leHBlbnNlIiwiaWNvbiI6ImNhbGVuZGFyLW11bHRpcGxlLWNoZWNrIiwibGF5b3V0IjoiZ3JpZCIsInRoZW1lIjoiYWVlZWMzZmMxMDc3ZWIxYyIsIm9yZGVyIjozLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UifSx7ImlkIjoiMWI3ODc2OWQ2ZDI3ZDEwMiIsInR5cGUiOiJncm91cCIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwibmFtZSI6IkV2ZW50IGxpc3RlciIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiOWNlNmRiMDRiMmM5ZDdiMiJdLCJ4Ijo3NCwieSI6NDc5LCJ3IjoxNTIsImgiOjgyfSx7ImlkIjoiOWNlNmRiMDRiMmM5ZDdiMiIsInR5cGUiOiJ1aS1ldmVudCIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwiZyI6IjFiNzg3NjlkNmQyN2QxMDIiLCJ1aSI6ImEwYTg1YTVmNGMyOWFmNTAiLCJuYW1lIjoiIiwieCI6MTUwLCJ5Ijo1MjAsIndpcmVzIjpbWyIwYzY0NTY3YzgxZGQ2YThkIiwiMmNhNTUyYzdlNTZiMzYxOSIsImE3MzYwZTRhNjJiZmM1MTgiXV19LHsiaWQiOiIzMjUwMjgwN2YyNGY3OWI4IiwidHlwZSI6Imdyb3VwIiwieiI6IjdhYzM4OTBkZmE3NDcwM2IiLCJuYW1lIjoiT3ZlcnZpZXcgY2hhcnQiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbIjQyNGIzNTkwMDcyMmU3NDAiLCIwNThhNzdhNjU2NTNkM2Y4IiwiNzI0NjIyOGU1N2FjMWZjNSIsIjJjYTU1MmM3ZTU2YjM2MTkiLCIyM2E0YTdkMTViNDQ4NzZiIiwiYTczNjBlNGE2MmJmYzUxOCIsImZlMzA4NTgxYjhhNWI5ZjEiXSwieCI6Mjc0LCJ5Ijo1MTksInciOjEzOTIsImgiOjE0Mn0seyJpZCI6IjQyNGIzNTkwMDcyMmU3NDAiLCJ0eXBlIjoidWktY2hhcnQiLCJ6IjoiN2FjMzg5MGRmYTc0NzAzYiIsImciOiIzMjUwMjgwN2YyNGY3OWI4IiwiZ3JvdXAiOiI1NGVjYTgzZmViN2MxNDc5IiwibmFtZSI6Ik92ZXJ2aWV3IENoYXJ0IiwibGFiZWwiOiJjaGFydCIsIm9yZGVyIjoyLCJjaGFydFR5cGUiOiJiYXIiLCJjYXRlZ29yeSI6InRvcGljIiwiY2F0ZWdvcnlUeXBlIjoicHJvcGVydHkiLCJ4QXhpc1Byb3BlcnR5IjoiIiwieEF4aXNQcm9wZXJ0eVR5cGUiOiJtc2ciLCJ4QXhpc1R5cGUiOiJjYXRlZ29yeSIsInlBeGlzUHJvcGVydHkiOiJwYXlsb2FkIiwieW1pbiI6IiIsInltYXgiOiIiLCJhY3Rpb24iOiJyZXBsYWNlIiwicG9pbnRTaGFwZSI6ImNpcmNsZSIsInBvaW50UmFkaXVzIjo0LCJzaG93TGVnZW5kIjpmYWxzZSwicmVtb3ZlT2xkZXIiOjEsInJlbW92ZU9sZGVyVW5pdCI6IjM2MDAiLCJyZW1vdmVPbGRlclBvaW50cyI6IiIsImNvbG9ycyI6WyIjMWViMzNjIiwiI2FlYzdlOCIsIiNmZjdmMGUiLCIjNWYyZWQxIiwiIzk4ZGY4YSIsIiNkNjI3MjgiLCIjZmY5ODk2IiwiIzk0NjdiZCIsIiNjNWIwZDUiXSwid2lkdGgiOiIxMiIsImhlaWdodCI6IjYiLCJjbGFzc05hbWUiOiIiLCJ4IjoxNTYwLCJ5Ijo2MDAsIndpcmVzIjpbW11dfSx7ImlkIjoiMDU4YTc3YTY1NjUzZDNmOCIsInR5cGUiOiJqb2luIiwieiI6IjdhYzM4OTBkZmE3NDcwM2IiLCJnIjoiMzI1MDI4MDdmMjRmNzliOCIsIm5hbWUiOiJDYWxjdWxhdGUgdG90YWwiLCJtb2RlIjoicmVkdWNlIiwiYnVpbGQiOiJvYmplY3QiLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJrZXkiOiJ0b3BpYyIsImpvaW5lciI6IlxcbiIsImpvaW5lclR5cGUiOiJzdHIiLCJhY2N1bXVsYXRlIjp0cnVlLCJ0aW1lb3V0IjoiIiwiY291bnQiOiIiLCJyZWR1Y2VSaWdodCI6ZmFsc2UsInJlZHVjZUV4cCI6IiRBK3BheWxvYWQuYW1vdW50IiwicmVkdWNlSW5pdCI6IjAiLCJyZWR1Y2VJbml0VHlwZSI6Im51bSIsInJlZHVjZUZpeHVwIjoiJEEiLCJ4IjoxMDAwLCJ5Ijo2MDAsIndpcmVzIjpbWyJmZTMwODU4MWI4YTViOWYxIl1dfSx7ImlkIjoiNzI0NjIyOGU1N2FjMWZjNSIsInR5cGUiOiJzcGxpdCIsInoiOiI3YWMzODkwZGZhNzQ3MDNiIiwiZyI6IjMyNTAyODA3ZjI0Zjc5YjgiLCJuYW1lIjoiIiwic3BsdCI6IlxcbiIsInNwbHRUeXBlIjoic3RyIiwiYXJyYXlTcGx0IjoxLCJhcnJheVNwbHRUeXBlIjoibGVuIiwic3RyZWFtIjpmYWxzZSwiYWRkbmFtZSI6IiIsIngiOjU1MCwieSI6NjAwLCJ3aXJlcyI6W1siMjNhNGE3ZDE1YjQ0ODc2YiJdXX0seyJpZCI6IjJjYTU1MmM3ZTU2YjM2MTkiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjdhYzM4OTBkZmE3NDcwM2IiLCJnIjoiMzI1MDI4MDdmMjRmNzliOCIsIm5hbWUiOiJSZXRyaWV2ZSBpbmNvbWUiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6ImluY29tZSIsInRvdCI6Imdsb2JhbCJ9LHsidCI6InNldCIsInAiOiJ0b3BpYyIsInB0IjoibXNnIiwidG8iOiJpbmNvbWUiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MzgwLCJ5Ijo1NjAsIndpcmVzIjpbWyI3MjQ2MjI4ZTU3YWMxZmM1Il1dfSx7ImlkIjoiMjNhNGE3ZDE1YjQ0ODc2YiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiN2FjMzg5MGRmYTc0NzAzYiIsImciOiIzMjUwMjgwN2YyNGY3OWI4IiwibmFtZSI6IkNvbnZlcnQgYW1vdW50IHRvIG51bWJlciIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQuYW1vdW50IiwicHQiOiJtc2ciLCJ0byI6IiRudW1iZXIocGF5bG9hZC5hbW91bnQpXHQiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjc2MCwieSI6NjAwLCJ3aXJlcyI6W1siMDU4YTc3YTY1NjUzZDNmOCJdXX0seyJpZCI6ImE3MzYwZTRhNjJiZmM1MTgiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjdhYzM4OTBkZmE3NDcwM2IiLCJnIjoiMzI1MDI4MDdmMjRmNzliOCIsIm5hbWUiOiJSZXRyaWV2ZSBpbmNvbWUiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6ImV4cGVuc2UiLCJ0b3QiOiJnbG9iYWwifSx7InQiOiJzZXQiLCJwIjoidG9waWMiLCJwdCI6Im1zZyIsInRvIjoiZXhwZW5zZSIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjozODAsInkiOjYyMCwid2lyZXMiOltbIjcyNDYyMjhlNTdhYzFmYzUiXV19LHsiaWQiOiJmZTMwODU4MWI4YTViOWYxIiwidHlwZSI6ImpvaW4iLCJ6IjoiN2FjMzg5MGRmYTc0NzAzYiIsImciOiIzMjUwMjgwN2YyNGY3OWI4IiwibmFtZSI6IkNvbWJpbmUgdHdvIG9iamVjdCBpbnRvIG9uZSBhcnJheSIsIm1vZGUiOiJjdXN0b20iLCJidWlsZCI6ImFycmF5IiwicHJvcGVydHkiOiIiLCJwcm9wZXJ0eVR5cGUiOiJmdWxsIiwia2V5IjoidG9waWMiLCJqb2luZXIiOiJcXG4iLCJqb2luZXJUeXBlIjoic3RyIiwiYWNjdW11bGF0ZSI6ZmFsc2UsInRpbWVvdXQiOiIiLCJjb3VudCI6IjIiLCJyZWR1Y2VSaWdodCI6ZmFsc2UsInJlZHVjZUV4cCI6IiIsInJlZHVjZUluaXQiOiIiLCJyZWR1Y2VJbml0VHlwZSI6IiIsInJlZHVjZUZpeHVwIjoiIiwieCI6MTI3MCwieSI6NjAwLCJ3aXJlcyI6W1siNDI0YjM1OTAwNzIyZTc0MCJdXX0seyJpZCI6IjU0ZWNhODNmZWI3YzE0NzkiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiT3ZlcnZpZXciLCJwYWdlIjoiNDdiZGU3OWU5NDY5MzNkMiIsIndpZHRoIjoiMTIiLCJoZWlnaHQiOiI0Iiwib3JkZXIiOi0xLCJzaG93VGl0bGUiOnRydWUsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiI0N2JkZTc5ZTk0NjkzM2QyIiwidHlwZSI6InVpLXBhZ2UiLCJuYW1lIjoiT3ZlcnZpZXciLCJ1aSI6ImEwYTg1YTVmNGMyOWFmNTAiLCJwYXRoIjoiL292ZXJ2aWV3IiwiaWNvbiI6Imdvb2dsZS1hbmFseXRpY3MiLCJsYXlvdXQiOiJub3RlYm9vayIsInRoZW1lIjoiYWVlZWMzZmMxMDc3ZWIxYyIsIm9yZGVyIjotMSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6ImEwYTg1YTVmNGMyOWFmNTAiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJEYXNoYm9hcmQiLCJwYXRoIjoiL2Rhc2hib2FyZCIsImluY2x1ZGVDbGllbnREYXRhIjp0cnVlLCJhY2NlcHRzQ2xpZW50Q29uZmlnIjpbInVpLW5vdGlmaWNhdGlvbiIsInVpLWNvbnRyb2wiLCJ1aS1jaGFydCIsInVpLXRhYmxlIl0sInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwibmF2aWdhdGlvblN0eWxlIjoiaWNvbiJ9XQ=="
---
::



1. Deploy the flow by clicking the top right **Deploy** button.
2. Locate the ***Open Dashboard** button at the top-right corner of the Dashboard 2.0 sidebar and click on it to navigate to the dashboard.

Now that we've built an income-expense tracker application and gained a basic understanding of Dashboard 2.0 widgets for building dashboards.

### Up next

If you want to enhance this simple application by adding more features or want to make the application personalize for users, consider the following resources:

- [Webinar](/webinars/2024/node-red-dashboard-multi-user/) - This webinar provides an in-depth discussion of the Personalised Multi-User Dashboards feature and offers guidance on how to get started with it.

- [Comprehensive guide: Node-RED Dashboard 2.0 layout, sidebar, and styling](https://flowfuse.com/blog/2024/05/node-red-dashboard-2-layout-navigation-styling/) - This comprehensive guide will cover everything about Node-RED Dashboard 2.0 styling, layouts and sidebars.

- [Displaying logged-in users on Dashboard 2.0](/blog/2024/04/displaying-logged-in-users-on-dashboard/) - This detailed guide demonstrates how to display logged-in users on Dashboard 2.0 which using the FlowFuse Multiuser addon and FlowFuse.

- [How to Build an Admin Dashboard with Node-RED Dashboard 2.0](/blog/2024/04/building-an-admin-panel-in-node-red-with-dashboard-2/) - This detailed guide demonstrates how to build a secure admin page in Node-RED Dashboard 2.0.

- [How to Build An Application With Node-RED Dashboard 2.0](/blog/2024/04/how-to-build-an-application-with-node-red-dashboard-2/) - This guide, covers how you can build personalize multiuser dashboard using flow fuse multi-user addon.

- [Multi-User Dashboard for Ticket/Task Management blueprint](/blueprints/flowfuse-dashboard/multi-user-dashboard/) -  this blueprint allows you to utilize templates to develop a personalized multi-user dashboard quickly. This Task management blueprint has all features such as adding, updating, and deleting tasks, user profiles, and admin dashboard.