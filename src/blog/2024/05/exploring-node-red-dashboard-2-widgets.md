---
title: Exploring Node-RED Dashboard 2.0 widgetes.
subtitle: A guide to using Node-RED 2.0 Widgets for Dashboard Development.
description: Learn how to use Node-RED Dashboard 2.0 widgets to build interactive applications and dynamic dashboards effortlessly.
date: 2024-05-16
authors: ["sumit-shinde"]
image: 
tags:
    - posts
    - dashboard
---

This guide delves into Node-RED Dashboard 2.0 widgets, teaching you how to build applications using them.

<!--more-->

If you're new to Dashboard 2.0, we recommend starting with the [Getting Started with Dashboard 2.0](/blog/2024/03/dashboard-getting-started/) guide and make sure to install it.

## What Are Widgets?

Widgets in Node-RED Dashboard 2.0 are like building blocks for creating the user interface. They're made of front-end pieces of code and work on the client's side. In Dashboard 2.0, you get a variety of widgets like forms, templates, buttons, and others to make different parts of your interface.

## Building Applications with Dashboard 2.0 Widgets

!["Income-expense tracker build with dashboard 2.0"](./images/exploring-dashboard-2-widgets-incom-expense-tracker-system.gif "Income-expense tracker build with dashboard 2.0"){data-zoomable}

In this guide, we'll create a basic app where you can input expenses and income. That will be displayed on the chart and table for analysis. This app will utilize a significant number of the widgets available in Dashboard 2.0, helping you understand and use them confidently. 

### Adding Forms

To enable income and expense submission, we'll incorporate a form using the **ui-form** widget.

1. Drag the **ui-form** widget onto the canvas.
2. Double-click it to access various widget properties; refer to the [ui-form properties docs](https://dashboard.flowfuse.com/nodes/widgets/ui-form.html#properties) for details.
3. Select the ui-group where it should render.
4. Add date, description, amount, and note form elements by clicking the **+element** button at the bottom left.

!["Screenshot displaying Income submission ui-form's configuration"](./images/exploring-dashboard-2-widgets-income-submission-form.png "Screenshot displaying Income submission ui-form's configuration"){data-zoomable}

Once you've added the income submission form, repeat the process to add an expense submission form on another **ui-page** and **ui-group**.

!["Screenshot displaying Expense submission ui-form's configuration"](./images/exploring-dashboard-2-widgets-expense-submission-form.png "Screenshot displaying Expense submission ui-form's configuration"){data-zoomable}

### Storing Form Data

The **ui-form** widget emits a payload object with key-value pairs of form elements upon submission. We'll store this data in a global context.

1. Drag a **function** node onto the canvas and use the following code which also contains a notification message set to payload:

```javascript
let income = global.get('income') || [];

income.push({
  ...msg.payload,
  type: "income",
});

global.set('income', income);

msg.payload = "Thank you for submitting income!";

return msg;
```

### Displaying Notifications

For displaying notifications on the dashboard, we'll utilize the **ui-notification** widget, which allows showing notifications at different positions on the dashboard. It accepts `msg.payload` to send string messages or raw HTML/JavaScript for custom formatting.

1. Drag the **ui-notification** widget onto the canvas.
2. Set the position property to center. You can also adjust colors or notification timeout by modifying the color and timeout properties. Please take a look at the [ui-notification docs](https://dashboard.flowfuse.com/nodes/widgets/ui-notification.html#properties) for more information on **ui-notification.

!["Screenshot displaying ui-notification widgets configuration"](./images/exploring-dashboard-2-widgets-notification-widget.png "Screenshot displaying ui-notification widgets configuration"){data-zoomable}

### Listening events 

In Dashboard 2.0, the **ui-event** widget allows you to listen to user behavior or events. It does not render any content or components on the dashboard. Currently, this widget only listens for page views and leaves events.

With this, we can listen for a page view and page leave event and trigger tasks based on those events. For instance, in our application, we will be displaying a table containing income-expense data and a chart. that we will update when we visit a new page or leave a page.

1. Drag an **ui-event** widget onto the canvas.
2. Double-click on it and select the correct **ui-base** of your application.

For more information on ui-event refer to [ui-event docs](https://dashboard.flowfuse.com/nodes/widgets/ui-event.html).

### Retrieving Income-Expense Data

In our income-expense application, we will display the income and expenses in a single table.

1. Drag a **change** node onto the canvas.
2. Set `msg.payload` to the JSON expression below, which merges two income and expense array.
3. Connect the output of the **ui-event** widget to the input of the **change** node.

```javascript
[$globalContext('income'), $globalContext('expense')]
```
!["Screenshot displaying the change node setting JSON expression to payload for retrieving and sorting data."](./images/exploring-dashboard-2-widgets-change-node.png "Screenshot displaying the change node setting JSON expression to payload for retrieving and sorting data."){data-zoomable}

### Displaying Data on the Table

To display data on the table, we use the **ui-table** widget in Dashboard 2.0. This widget accepts an array of objects as input. The columns in the table correspond to the properties of the objects within the array, and each row represents a different object with values corresponding to those properties.

1. Drag a **ui-table** widget onto the canvas.
2. Create a new **ui-page** and **ui-group** for it.
3. Connect the output of the **change** node to the input of the **ui-table** widget.

!["Screenshot displaying the ui-table widget configuration"](./images/exploring-dashboard-2-widgets-table-widget.png "Screenshot displaying the ui-table widget configuration"){data-zoomable}

For more information on ui-table refer to [ui-table docs](https://dashboard.flowfuse.com/nodes/widgets/ui-table.html)

### Calculating total category-wise 

In our application, we will display data on the chart with the total income and total expenses for analysis. For that in this section, we will calculate the total expense and income using the function node.

1. Drag an **function** node onto canvas.
2. Paste the following code in it, we have added comments in the code for your better understanding.

```javascript
// Get income and expense arrays from a global context, or set them as empty arrays if not found
let income = global.get('income') || [];
let expense = global.get('expense') || [];

// Initialize an empty result array
let result = [];

// Send an empty payload to reset the chart
node.send({ payload: [] });

// Calculate total income by summing up amounts in the income array
let totalIncome = income.reduce((sum, item) => sum + parseFloat(item.amount), 0);
result.push({ category: "Income", amount: totalIncome });

// Calculate total expense by summing up amounts in the expense array
let totalExpense = expense.reduce((sum, item) => sum + parseFloat(item.amount), 0);
result.push({ category: "Expense", amount: totalExpense });

// Set the result array as the payload of the message
msg.payload = result;

// Return the message
return msg;
```

### Displaying data on the chart 

To display charts on the dashboard, we have to use the ui-chart widget which allows us to display different types of charts on a dashboard including linear, bar, scatter, etc. This accepts an array and object as input.

1. Drag a **ui-chart** widget onto the canvas.
2. Double-click on the widget and select Type as **bar**.
3. Configure the series to **category** and the y-axis to **amount**. This configuration informs the chart that the **amount** property of the input objects will be plotted on the y-axis of the chart.
4. Connect the output of the ui-event widget's output to the input of the function node and the function node's output to the ui-chart widget's output.

!["Screenshot displaying the ui-chart widget's configuration"](./images/exploring-dashboard-2-widgets-chart-widget.png "Screenshot displaying the ui-chart widget's configuration"){data-zoomable}

### Adding custom footer with ui-template

With the ui-template widget, we can add a custom component to our app using Vue.js. It also allows adding custom CSS for the dashboard and more. For more information refer to [ui-template docs](https://dashboard.flowfuse.com/nodes/widgets/ui-template.html).

Using this widget, we will add a footer to our application.

1. Drag an ui-template widget onto the canvas.
2. Set the type widget( ui scoped ) that will render this widget on the entire dashboard so that we will not need to add separate footers for each page of the dashboard.
3. Insert the following vue.js code in the ui-template widget. 

```javascript
// Get income and expense arrays from a global context, or set them as empty arrays if not found
let income = global.get('income') || [];
let expense = global.get('expense') || [];

// Initialize an empty result array
let result = [];

// Send an empty payload to reset the chart
node.send({ payload: [] });

// Calculate total income by summing up amounts in the income array
let totalIncome = income.reduce((sum, item) => sum + parseFloat(item.amount), 0);
result.push({ category: "Income", amount: totalIncome });

// Calculate total expense by summing up amounts in the expense array
let totalExpense = expense.reduce((sum, item) => sum + parseFloat(item.amount), 0);
result.push({ category: "Expense", amount: totalExpense });

// Set the result array as the payload of the message
msg.payload = result;

// Return the message
return msg;
```

!["Screenshot displaying the ui-template widget's configuration"](./images/exploring-dashboard-2-widgets-template-widget.png "Screenshot displaying the ui-template widget's configuration"){data-zoomable}

### Deploying your application flow

{% renderFlow %}
[{"id":"7ac3890dfa74703b","type":"tab","label":"Flow 1","disabled":false,"info":"","env":[]},{"id":"342f3ee215d32fdc","type":"group","z":"7ac3890dfa74703b","name":"New Icome page","style":{"label":true},"nodes":["d028c878350d19e1","43e79bb77d718c95","5ba5d8bff1a77bea"],"x":274,"y":159,"w":752,"h":82},{"id":"4afb4814be56a9a8","type":"group","z":"7ac3890dfa74703b","name":"New Expense page","style":{"label":true},"nodes":["e82b719d899cbf73","3457848652ad75e1","bd90a9ad612408d3"],"x":274,"y":279,"w":752,"h":82},{"id":"e6ee60438b20dc44","type":"group","z":"7ac3890dfa74703b","name":"Overview chart","style":{"label":true},"nodes":["424b35900722e740","f21a87c5c5aec0b2"],"x":274,"y":519,"w":592,"h":82},{"id":"77217e256ef75328","type":"group","z":"7ac3890dfa74703b","name":"Your icome and expense table","style":{"label":true},"nodes":["452d561bf79727cb","0c64567c81dd6a8d"],"x":274,"y":399,"w":572,"h":82},{"id":"1b78769d6d27d102","type":"group","z":"7ac3890dfa74703b","name":"Event lister","style":{"label":true},"nodes":["9ce6db04b2c9d7b2"],"x":54,"y":459,"w":152,"h":82},{"id":"e82b719d899cbf73","type":"ui-form","z":"7ac3890dfa74703b","g":"4afb4814be56a9a8","name":"Expense Submission Form","group":"854706651cd8a8f2","label":"","order":1,"width":"12","height":"1","options":[{"label":"Date","key":"date","type":"date","required":true,"rows":null},{"label":"Description","key":"description","type":"text","required":true,"rows":null},{"label":"Category","key":"category","type":"text","required":true,"rows":null},{"label":"Amount","key":"amount","type":"number","required":true,"rows":null},{"label":"Note","key":"note","type":"text","required":false,"rows":null}],"formValue":{"date":"","description":"","category":"","amount":"","note":""},"payload":"","submit":"submit","cancel":"clear","resetOnSubmit":true,"topic":"topic","topicType":"msg","splitLayout":"","className":"","x":410,"y":320,"wires":[["bd90a9ad612408d3"]]},{"id":"3457848652ad75e1","type":"ui-notification","z":"7ac3890dfa74703b","g":"4afb4814be56a9a8","ui":"a0a85a5f4c29af50","position":"center center","colorDefault":true,"color":"#000000","displayTime":"3","showCountdown":true,"outputs":0,"allowDismiss":true,"dismissText":"Close","raw":false,"className":"","name":"","x":910,"y":320,"wires":[]},{"id":"d028c878350d19e1","type":"ui-form","z":"7ac3890dfa74703b","g":"342f3ee215d32fdc","name":"Income Submission Form","group":"961528943e1bb698","label":"","order":1,"width":"0","height":"0","options":[{"label":"Date","key":"date","type":"date","required":true,"rows":null},{"label":"Description","key":"description","type":"text","required":true,"rows":null},{"label":"Amount","key":"amount","type":"number","required":true,"rows":null},{"label":"Note","key":"note","type":"text","required":false,"rows":null}],"formValue":{"date":"","description":"","amount":"","note":""},"payload":"","submit":"submit","cancel":"clear","resetOnSubmit":true,"topic":"topic","topicType":"msg","splitLayout":"","className":"","x":410,"y":200,"wires":[["5ba5d8bff1a77bea"]]},{"id":"43e79bb77d718c95","type":"ui-notification","z":"7ac3890dfa74703b","g":"342f3ee215d32fdc","ui":"a0a85a5f4c29af50","position":"center center","colorDefault":true,"color":"#000000","displayTime":"3","showCountdown":true,"outputs":0,"allowDismiss":true,"dismissText":"Close","raw":false,"className":"","name":"","x":910,"y":200,"wires":[]},{"id":"5ba5d8bff1a77bea","type":"function","z":"7ac3890dfa74703b","g":"342f3ee215d32fdc","name":"Store income","func":"let income = global.get('income') || [];\n\nincome.push({\n    ...msg.payload,\n    type:\"income\",\n});\n\nglobal.set('income', income);\n\nmsg.payload = \"Thank you for submitting income!\"\n\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":650,"y":200,"wires":[["43e79bb77d718c95"]]},{"id":"424b35900722e740","type":"ui-chart","z":"7ac3890dfa74703b","g":"e6ee60438b20dc44","group":"54eca83feb7c1479","name":"Overview Chart","label":"chart","order":2,"chartType":"bar","category":"category","categoryType":"property","xAxisProperty":"","xAxisPropertyType":"msg","xAxisType":"category","yAxisProperty":"amount","ymin":"","ymax":"","action":"append","pointShape":"circle","pointRadius":4,"showLegend":false,"removeOlder":1,"removeOlderUnit":"3600","removeOlderPoints":"","colors":["#1eb33c","#aec7e8","#ff7f0e","#5f2ed1","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5"],"width":"12","height":"6","className":"","x":760,"y":560,"wires":[[]]},{"id":"f21a87c5c5aec0b2","type":"function","z":"7ac3890dfa74703b","g":"e6ee60438b20dc44","name":"Calculate the total income and expenses.","func":"// Get income and expense arrays from global context, or set them as empty arrays if not found\nlet income = global.get('income') || [];\nlet expense = global.get('expense') || [];\n\n// Initialize an empty result array\nlet result = [];\n\n// Send an empty payload to reset chart\nnode.send({ payload: [] });\n\n// Calculate total income by summing up amounts in the income array\nlet totalIncome = income.reduce((sum, item) => sum + parseFloat(item.amount), 0);\nresult.push({ category: \"Income\", amount: totalIncome });\n\n// Calculate total expense by summing up amounts in the expense array\nlet totalExpense = expense.reduce((sum, item) => sum + parseFloat(item.amount), 0);\nresult.push({ category: \"Expense\", amount: totalExpense });\n\n// Set the result array as the payload of the message\nmsg.payload = result;\n\n// Return the message\nreturn msg;\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":460,"y":560,"wires":[["424b35900722e740"]]},{"id":"452d561bf79727cb","type":"ui-table","z":"7ac3890dfa74703b","g":"77217e256ef75328","group":"e848a5e48a6549c9","name":"","label":"text","order":2,"width":0,"height":0,"maxrows":0,"passthru":false,"autocols":true,"selectionType":"click","columns":[],"x":770,"y":440,"wires":[[]]},{"id":"301c1fd8e29c3aae","type":"ui-template","z":"7ac3890dfa74703b","group":"","page":"","ui":"a0a85a5f4c29af50","name":"Footer","order":0,"width":0,"height":0,"head":"","format":"<template>\n  <div class=\"footer\">\n    <div>\n      Welcome to our comprehensive income expense tracker! Take control of your finances by monitoring your income and\n      expenses effortlessly. Our user-friendly interface makes it simple to record transactions, categorize expenses, and\n      analyze your financial trends. With real-time insights into your spending habits, you can make smarter financial\n      decisions and achieve your money goals faster.\n    </div>\n    <div class=\"copyright\">\n      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  /* Make the footer occupy all available space */\n  .footer {\n    position:absolute;\n    bottom:0;\n    background-color:rgb(26,26,26);\n    color:rgb(238,238,238);\n    height:130px;\n    text-align:center;\n    padding:14px;\n  }\n\n  .copyright{\n    margin-top:10px;\n  }\n</style>","storeOutMessages":true,"passthru":true,"resendOnRefresh":true,"templateScope":"widget:ui","className":"","x":530,"y":660,"wires":[[]]},{"id":"0c64567c81dd6a8d","type":"change","z":"7ac3890dfa74703b","g":"77217e256ef75328","name":"Merge income and expense data","rules":[{"t":"set","p":"payload","pt":"msg","to":"[    $globalContext(\"income\"),\t   $globalContext(\"expense\")\t]","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":440,"y":440,"wires":[["452d561bf79727cb"]]},{"id":"bd90a9ad612408d3","type":"function","z":"7ac3890dfa74703b","g":"4afb4814be56a9a8","name":"Store expense","func":"let expense = global.get('expense') || [];\n\nexpense.push({\n    ...msg.payload,\n    type: \"expense\",\n});\n\nglobal.set('expense', expense);\n\nmsg.payload = \"Thank you for submitting expense!\"\n\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":640,"y":320,"wires":[["3457848652ad75e1"]]},{"id":"9ce6db04b2c9d7b2","type":"ui-event","z":"7ac3890dfa74703b","g":"1b78769d6d27d102","ui":"a0a85a5f4c29af50","name":"","x":130,"y":500,"wires":[["0c64567c81dd6a8d","f21a87c5c5aec0b2"]]},{"id":"854706651cd8a8f2","type":"ui-group","name":"Expense Submission Form","page":"97bf3e87f4bdddc1","width":"12","height":"1","order":2,"showTitle":true,"className":"","visible":"true","disabled":"false"},{"id":"a0a85a5f4c29af50","type":"ui-base","name":"Dashboard","path":"/dashboard","includeClientData":true,"acceptsClientConfig":["ui-notification","ui-control","ui-chart","ui-table"],"showPathInSidebar":false,"navigationStyle":"icon"},{"id":"961528943e1bb698","type":"ui-group","name":"Income Submission Form","page":"d954d73f9dcd1472","width":"12","height":"1","order":1,"showTitle":true,"className":"","visible":"true","disabled":"false"},{"id":"54eca83feb7c1479","type":"ui-group","name":"Overview","page":"47bde79e946933d2","width":"12","height":"4","order":-1,"showTitle":true,"className":"","visible":"true","disabled":"false"},{"id":"e848a5e48a6549c9","type":"ui-group","name":"Your Income and Expense","page":"7abf0b3cb6f38ca3","width":"12","height":"5","order":2,"showTitle":true,"className":"","visible":"true","disabled":"false"},{"id":"97bf3e87f4bdddc1","type":"ui-page","name":"New Expense","ui":"a0a85a5f4c29af50","path":"/new-expense","icon":"bank-transfer-out","layout":"notebook","theme":"aeeec3fc1077eb1c","order":2,"className":"","visible":"true","disabled":"false"},{"id":"d954d73f9dcd1472","type":"ui-page","name":"New Income","ui":"a0a85a5f4c29af50","path":"/new-Icome","icon":"bank-transfer-in","layout":"notebook","theme":"aeeec3fc1077eb1c","order":1,"className":"","visible":"true","disabled":"false"},{"id":"47bde79e946933d2","type":"ui-page","name":"Overview","ui":"a0a85a5f4c29af50","path":"/overview","icon":"google-analytics","layout":"notebook","theme":"aeeec3fc1077eb1c","order":-1,"className":"","visible":"true","disabled":"false"},{"id":"7abf0b3cb6f38ca3","type":"ui-page","name":"Your Income and expense","ui":"a0a85a5f4c29af50","path":"/your-icome-expense","icon":"calendar-multiple-check","layout":"grid","theme":"aeeec3fc1077eb1c","order":3,"className":"","visible":"true","disabled":"false"},{"id":"aeeec3fc1077eb1c","type":"ui-theme","name":"dashboard","colors":{"surface":"#1a1a1a","primary":"#0094ce","bgPage":"#eeeeee","groupBg":"#ffffff","groupOutline":"#cccccc"},"sizes":{"pagePadding":"12px","groupGap":"12px","groupBorderRadius":"4px","widgetGap":"12px"}}]
{% endrenderFlow %}


1. Deploy the flow by clicking the top right **Deploy** button.
2. Locate the ***Open Dashboard** button at the top-right corner of the Dashboard 2.0 sidebar and click on it to navigate to the dashboard.

Now that we've built an income-expense tracker application and gained a basic understanding of Dashboard 2.0 widgets for building dashboards.

### Up next

If you want to enhance this simple application by adding more features or want to make the application personalize for users, consider the following resources:

[Webinar](/webinars/2024/node-red-dashboard-multi-user/) - This webinar provides an in-depth discussion of the Personalised Multi-User Dashboards feature and offers guidance on how to get started with it.

[Comprehensive guide: Node-RED Dashboard 2.0 layout, sidebar, and styling](https://flowfuse.com/blog/2024/05/node-red-dashboard-2-layout-navigation-styling/) - This comprehensive guide will cover everything about Node-RED Dashboard 2.0 styling, layouts and sidebars.

[Displaying logged-in users on Dashboard 2.0](/blog/2024/04/displaying-logged-in-users-on-dashboard/) - This detailed guide demonstrates how to display logged-in users on Dashboard 2.0 which using the FlowFuse Multiuser addon and FlowFuse.

[How to Build an Admin Dashboard with Node-RED Dashboard 2.0](/blog/2024/04/building-an-admin-panel-in-node-red-with-dashboard-2/) - This detailed guide demonstrates how to build a secure admin page in Node-RED Dashboard 2.0.

[How to Build An Application With Node-RED Dashboard 2.0](/blog/2024/04/how-to-build-an-application-with-node-red-dashboard-2/) - This guide, covers how you can build personalize multiuser dashboard using flow fuse multi-user addon.

[Multi-User Dashboard for Ticket/Task Management blueprint](/blueprints/flowfuse-dashboard/multi-user-dashboard/#multi-user-dashboard-for-ticket%2Ftask-management) -  this blueprint allows you to utilize templates to develop a personalized multi-user dashboard quickly. This Task management blueprint has all features such as adding, updating, and deleting tasks, user profiles, and admin dashboard.



