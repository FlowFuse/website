---
title: How to create and use Subflow in Node-RED
navTitle: How to create and use Subflow in Node-RED
---

In traditional programming, managing complex and repetitive tasks can quickly lead to a tangled mess of code that’s hard to maintain and update. To tackle this issue, developers use libraries or modules—reusable chunks of code that help organize functionality, minimize duplication, and keep codebases clean and manageable.

<!--more-->

Node-RED brings a similar solution to its visual programming environment with Subflows. Imagine Subflows as the visual counterpart to libraries. In this guide, we will explore what Subflows are, how to create them, and how to use them effectively to enhance your Node-RED experience.

## What Exactly Are Subflows?

![Image showing a Node-RED flow at the top selected for creating a Subflow, and the resulting Subflow at the bottom.](/blog/2024/09/images/subflow.png){data-zoomable}
_Image showing a Node-RED flow at the top selected for creating a Subflow, and the resulting Subflow at the bottom._

Subflows in Node-RED are a way to group together a set of nodes and reusable flows into a single, reusable node. This helps you manage and organize complex workflows by encapsulating repetitive or complex logic into a modular unit. You can think of Subflows as custom nodes that you create and use within your flows to simplify your design and reduce redundancy.

## Creating a Subflow in Node-RED

In this section, we will create a Subflow for a flow that sends requests to an API and returns results. If the request faces an issue, it retries until it reaches the maximum retry limit. Let's assume we need to use this flow in multiple places, for different APIs, each with different retry timeouts. To avoid duplicating the flow logic, we can create a Subflow.

To follow along, import the following flow into your Node-RED instance.



::render-flow
---
height: 200
flow: "W3siaWQiOiIxMzJmNGZkYzQwZDU1ZTg5IiwidHlwZSI6ImRlYnVnIiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJuYW1lIjoiZGVidWcgMiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6Mjg0MCwieSI6MjgwLCJ3aXJlcyI6W119LHsiaWQiOiI2MTI4MTlmNzY2MTdlNWE4IiwidHlwZSI6ImRlYnVnIiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJuYW1lIjoiZGVidWcgMyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoyODQwLCJ5IjoyMjAsIndpcmVzIjpbXX0seyJpZCI6IjdlOWU4ZTFhZjc1MWJiOTIiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MTQ2MCwieSI6MjQwLCJ3aXJlcyI6W1siODg5OWZlYTQ5NzA2NGI4YyJdXX0seyJpZCI6ImI0ZWNhMWRlMTQ1OTlkZDEiLCJ0eXBlIjoiZGVsYXkiLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiIiLCJwYXVzZVR5cGUiOiJkZWxheXYiLCJ0aW1lb3V0IjoiNSIsInRpbWVvdXRVbml0cyI6Im1pbGxpc2Vjb25kcyIsInJhdGUiOiIxIiwibmJSYXRlVW5pdHMiOiIxIiwicmF0ZVVuaXRzIjoic2Vjb25kIiwicmFuZG9tRmlyc3QiOiIxIiwicmFuZG9tTGFzdCI6IjUiLCJyYW5kb21Vbml0cyI6InNlY29uZHMiLCJkcm9wIjpmYWxzZSwiYWxsb3dyYXRlIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6MTkwMCwieSI6MjQwLCJ3aXJlcyI6W1siOTZjYTFlZDY5ZTdmYTdhYyJdXX0seyJpZCI6Ijk2Y2ExZWQ2OWU3ZmE3YWMiLCJ0eXBlIjoiaHR0cCByZXF1ZXN0IiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJuYW1lIjoiIiwibWV0aG9kIjoiR0VUIiwicmV0IjoidHh0IiwicGF5dG9xcyI6Imlnbm9yZSIsInVybCI6Imh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS90b2RvcyIsInRscyI6IiIsInBlcnNpc3QiOmZhbHNlLCJwcm94eSI6IiIsImluc2VjdXJlSFRUUFBhcnNlciI6ZmFsc2UsImF1dGhUeXBlIjoiIiwic2VuZGVyciI6ZmFsc2UsImhlYWRlcnMiOltdLCJ4IjoyMDUwLCJ5IjoyNDAsIndpcmVzIjpbWyJmNTIzYmIwMzRkYjM2MGE0Il1dfSx7ImlkIjoiM2ViNGVjNmI3MWZjMzgzYiIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiJpZiBzdWNjZXNzIiwicHJvcGVydHkiOiJzdGF0dXNDb2RlIiwicHJvcGVydHlUeXBlIjoibXNnIiwicnVsZXMiOlt7InQiOiJidHduIiwidiI6IjIwMCIsInZ0IjoibnVtIiwidjIiOiIyOTkiLCJ2MnQiOiJudW0ifSx7InQiOiJlbHNlIn1dLCJjaGVja2FsbCI6InRydWUiLCJyZXBhaXIiOmZhbHNlLCJvdXRwdXRzIjoyLCJ4IjoyNDIwLCJ5IjoyNDAsIndpcmVzIjpbWyI2MTI4MTlmNzY2MTdlNWE4Il0sWyJiYWQ0YmRiN2UwMGI3YTgwIl1dfSx7ImlkIjoiYmFkNGJkYjdlMDBiN2E4MCIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiJpZiBtYXggcmV0cmllcyIsInByb3BlcnR5IjoicmV0cnlfY291bnRlciIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiZ3RlIiwidiI6IjEwMDAwIiwidnQiOiJudW0ifSx7InQiOiJlbHNlIn1dLCJjaGVja2FsbCI6InRydWUiLCJyZXBhaXIiOmZhbHNlLCJvdXRwdXRzIjoyLCJ4IjoyNTkwLCJ5IjoyODAsIndpcmVzIjpbWyIxMzJmNGZkYzQwZDU1ZTg5Il0sWyJiNGVjYTFkZTE0NTk5ZGQxIl1dfSx7ImlkIjoiODg5OWZlYTQ5NzA2NGI4YyIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJkZWxheSIsInB0IjoibXNnIiwidG8iOiJyZXRyeV9pbnRlcnZhbCIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJyZXRyeV9jb3VudGVyIiwicHQiOiJtc2ciLCJ0byI6IjAiLCJ0b3QiOiJudW0ifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MTcyMCwieSI6MjQwLCJ3aXJlcyI6W1siYjRlY2ExZGUxNDU5OWRkMSJdXX0seyJpZCI6ImY1MjNiYjAzNGRiMzYwYTQiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJuYW1lIjoicmV0cnlfY291bnRlcisrIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJyZXRyeV9jb3VudGVyKzEiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjIyNDAsInkiOjI0MCwid2lyZXMiOltbIjNlYjRlYzZiNzFmYzM4M2IiXV19XQ=="
---
::



### Creating subflow of selection

![Image showing process of creating subflow from the selection](/blog/2024/09/images/selecting-and-converting-subflow.gif){data-zoomable}
_Image showing process of creating subflow from the selection_

1. Select the flow you want to convert into a Subflow.
2. Open the main menu by clicking the top-right menu icon, and select "Selection to Subflow" under the Subflows option.

![Image showing subflow node added in the node palette](/blog/2024/09/images/subflow-showing-in-pallete.png){data-zoomable}
_Image showing subflow node added in the node palette_

Once selected, the Subflow will be added to the node palette like other nodes. The selected flow will also be converted into a single node representing the Subflow.

### Adding Properties to the Subflow

1. Double-click on the Subflow, then click on **"Edit Subflow template"**.

![Editing the Subflow template by clicking on the 'Edit Subflow Template' option.](/blog/2024/09/images/edit-template-option.png){data-zoomable}
_Editing the Subflow template by clicking on the 'Edit Subflow Template' option._

2. A new flow tab for the Subflow will open. Click on **"Edit Properties"** in the top-left corner.

![The edit properties button for a Subflow](/blog/2024/09/images/edit-properties.png){data-zoomable}
_The edit properties button for a Subflow_

3. To add environment properties, click on the **"+ add"** button located at the bottom-left.

![The 'Add' button for adding environment properties for subflow](/blog/2024/09/images/add-env.png){data-zoomable}
_The 'Add' button for adding environment properties for subflow_

4. In the field that opens, give the property a name and set its default value.
5. Once you have added all your properties, you can view a preview by switching to the **"UI PREVIEW"** tab.

![A preview of the Subflow environment properties](/blog/2024/09/images/ui-preivew-env.png){data-zoomable}
_A preview of the Subflow environment properties_

6. Click "Done" to save.

### Setting Added Environment Variables in the Nodes

Now that we have added properties for the Subflow (which are environment variables), we need to use them in the relevant nodes, such as the HTTP request node, which will require an API and the max-retry setting.

1. Double-click on the **HTTP request** node, set the environment variable as `${your_env_name}` into the URL feild, and click **Done** to save.

![The URL field of an HTTP request node in Node-RED with an environment variable added.](/blog/2024/09/images/http-request-url-env-adding.png){data-zoomable}
_The URL field of an HTTP request node in Node-RED with an environment variable added._

2. Next, double-click on the **switch** node named "if max retries," update the hardcoded max retry condition value to the environment variable you set for it, and click **Done** to save.

![The switch node in Node-RED with a max retry condition set using an environment variable.](/blog/2024/09/images/max-retry-setting.png){data-zoomable}
_The switch node in Node-RED with a max retry condition set using an environment variable._

### Managing Subflow Input and Output Ports

As we know, any node in Node-RED requires input and output ports to manage its data flow. Similarly, a Subflow node requires these ports to function correctly. In our Subflow example, it needs to be triggered and therefore requires at least one input port and one or more output ports. Specifically, our Subflow has two outputs: one for successfully fetched data and another to indicate when the maximum retry limit has been exceeded.

1. In the **Subflow** tab, at the top, you will see an option for **inputs** with values 0 and 1. Click on **1** to add an input port (as a any Node-RED node can have only one input port). Once set to 1, you will see an input port added in the Subflow tab. Connect it to the appropriate node; in our example, it should be connected to the first **change** node.

![Option to add input port for subflow](/blog/2024/09/images/input-adding-subflow.png){data-zoomable}
_Option to add input port for subflow_

2. Next, right after the **inputs** option, you will see an option for **outputs**. Unlike inputs, you can add as many outputs as you need. Once you've added the outputs, connect them to the appropriate nodes. In our example, the first output should be connected to the first input of both **switch** nodes.

![Option to add output ports for subflow](/blog/2024/09/images/output-adding-subflow.png){data-zoomable}
_Option to add output ports for subflow_

### Adding Status for Subflow Nodes

To effectively manage and monitor the execution of Subflows, you can add status indicators to your Subflow nodes. This allows you to see if the Subflow is functioning correctly and helps in debugging if something goes wrong. To add a status indicator:

1. In the Subflow flow tab at the top, click on the **Status** node option to add a status node. This status node can be connected to the Node-RED status node to capture and display all statuses, or you can configure it to use `msg.payload`.

![Option to add status for subflow](/blog/2024/09/images/status-adding-subflow.png){data-zoomable}
_Option to add status for subflow_

   In our example, we need two indicators: one to display when the flow is retrying to request and another to indicate that the fetch operation has successfully completed.

2. Drag two **Change** nodes onto the Canvas. Connect one Change node to the **if success** switch node's first output and set the `msg.payload` to `"completed"`. Connect the other Change node to the **if max retries** switch node's first output and set its `msg.payload` to `"retrying"`. Then, connect both Change nodes to the input of the Subflow status node.

### Customizing the Appearance of a Subflow Node

Node-RED allows you to customize the appearance of Subflow nodes, including setting the color, icon, port labels, and selecting the category in which it will be visible in the node palette.

1. In the Subflow flow tab, click on the **"Edit Properties"** option in the top-left corner and switch to the **"Appearance"** tab. 

![Image showing the apperance tab of subflow](/blog/2024/09/images/customizing-apperance.png){data-zoomable}
_Image showing the apperance tab of subflow_

2. Select a category from the available categories or add a new one by clicking on **"Add new"**.
3. Choose a color for the Subflow node and select an icon.
4. Provide labels for the ports so that when someone hovers over the Subflow input or output ports, they can quickly understand their purpose.

### Adding Documentation for a Subflow Node

Node-RED allows you to add documentation for Subflow nodes, providing guidance on how to use them. This documentation will be rendered in the help sidebar, similar to other nodes.

1. In the Subflow flow tab, click on the **"Edit Properties"** option in the top-left corner and switch to the **"Description"** tab.

![Image showing the description tab of subflow](/blog/2024/09/images/documentation-tab.png){data-zoomable}
_Image showing the apperance tab of subflow_

2. Enter the documentation content in markdown format that provides guidance on how to use the Subflow node effectively.
3. Click **Done** to save.

Once saved, the documentation will be displayed in the help sidebar when users click on the Subflow node in the Node-RED palette or hover over and select the help option for that node.



::render-flow
---
height: 200
flow: "W3siaWQiOiJlYTU0MzZiNTkyYTg2YjkwIiwidHlwZSI6InN1YmZsb3ciLCJuYW1lIjoiQVBJIFJldHJ5ICIsImluZm8iOiIjIyBoZWUiLCJjYXRlZ29yeSI6ImZ1bmN0aW9uIiwiaW4iOlt7IngiOjUwLCJ5IjozMCwid2lyZXMiOlt7ImlkIjoiODg5OWZlYTQ5NzA2NGI4YyJ9XX1dLCJvdXQiOlt7IngiOjExNDAsInkiOjYwLCJ3aXJlcyI6W3siaWQiOiIzZWI0ZWM2YjcxZmMzODNiIiwicG9ydCI6MH1dfSx7IngiOjE2MTAsInkiOjEyMCwid2lyZXMiOlt7ImlkIjoiMDkyNTQ3NzM3YTBjYmVlMiIsInBvcnQiOjB9XX1dLCJlbnYiOlt7Im5hbWUiOiJVUkwiLCJ0eXBlIjoic3RyIiwidmFsdWUiOiIifSx7Im5hbWUiOiJNQVhfUkVUUlkiLCJ0eXBlIjoic3RyIiwidmFsdWUiOiIifV0sIm1ldGEiOnt9LCJjb2xvciI6IiNEN0Q3QTAiLCJpbnB1dExhYmVscyI6WyJUcmlnZ2VyIl0sIm91dHB1dExhYmVscyI6WyJBUEkgUmVzcG9uc2UiLCJNYXggUmV0cnkgRXhlZWRlZCJdLCJpY29uIjoibm9kZS1yZWQvd2hpdGUtZ2xvYmUuc3ZnIn0seyJpZCI6ImI0ZWNhMWRlMTQ1OTlkZDEiLCJ0eXBlIjoiZGVsYXkiLCJ6IjoiZWE1NDM2YjU5MmE4NmI5MCIsIm5hbWUiOiIiLCJwYXVzZVR5cGUiOiJkZWxheXYiLCJ0aW1lb3V0IjoiNSIsInRpbWVvdXRVbml0cyI6Im1pbGxpc2Vjb25kcyIsInJhdGUiOiIxIiwibmJSYXRlVW5pdHMiOiIxIiwicmF0ZVVuaXRzIjoic2Vjb25kIiwicmFuZG9tRmlyc3QiOiIxIiwicmFuZG9tTGFzdCI6IjUiLCJyYW5kb21Vbml0cyI6InNlY29uZHMiLCJkcm9wIjpmYWxzZSwiYWxsb3dyYXRlIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6NDAwLCJ5Ijo4MCwid2lyZXMiOltbIjk2Y2ExZWQ2OWU3ZmE3YWMiXV19LHsiaWQiOiI5NmNhMWVkNjllN2ZhN2FjIiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiJlYTU0MzZiNTkyYTg2YjkwIiwibmFtZSI6IiIsIm1ldGhvZCI6IkdFVCIsInJldCI6InR4dCIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiIke1VSTH0iLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6IiIsInNlbmRlcnIiOmZhbHNlLCJoZWFkZXJzIjpbXSwieCI6NTUwLCJ5Ijo4MCwid2lyZXMiOltbImY1MjNiYjAzNGRiMzYwYTQiXV19LHsiaWQiOiIzZWI0ZWM2YjcxZmMzODNiIiwidHlwZSI6InN3aXRjaCIsInoiOiJlYTU0MzZiNTkyYTg2YjkwIiwibmFtZSI6ImlmIHN1Y2Nlc3MiLCJwcm9wZXJ0eSI6InN0YXR1c0NvZGUiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJydWxlcyI6W3sidCI6ImJ0d24iLCJ2IjoiMjAwIiwidnQiOiJudW0iLCJ2MiI6IjI5OSIsInYydCI6Im51bSJ9LHsidCI6ImVsc2UifV0sImNoZWNrYWxsIjoidHJ1ZSIsInJlcGFpciI6ZmFsc2UsIm91dHB1dHMiOjIsIngiOjkyMCwieSI6ODAsIndpcmVzIjpbW10sWyJiYWQ0YmRiN2UwMGI3YTgwIl1dfSx7ImlkIjoiYmFkNGJkYjdlMDBiN2E4MCIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiZWE1NDM2YjU5MmE4NmI5MCIsIm5hbWUiOiJpZiBtYXggcmV0cmllcyIsInByb3BlcnR5IjoicmV0cnlfY291bnRlciIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiZ3RlIiwidiI6Ik1BWF9SRVRSWSIsInZ0IjoiZW52In0seyJ0IjoiZWxzZSJ9XSwiY2hlY2thbGwiOiJ0cnVlIiwicmVwYWlyIjpmYWxzZSwib3V0cHV0cyI6MiwieCI6MTA5MCwieSI6MTIwLCJ3aXJlcyI6W1siMDkyNTQ3NzM3YTBjYmVlMiJdLFsiYjRlY2ExZGUxNDU5OWRkMSJdXX0seyJpZCI6Ijg4OTlmZWE0OTcwNjRiOGMiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImVhNTQzNmI1OTJhODZiOTAiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoiZGVsYXkiLCJwdCI6Im1zZyIsInRvIjoicmV0cnlfaW50ZXJ2YWwiLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicmV0cnlfY291bnRlciIsInB0IjoibXNnIiwidG8iOiIwIiwidG90IjoibnVtIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjIyMCwieSI6ODAsIndpcmVzIjpbWyJiNGVjYTFkZTE0NTk5ZGQxIl1dfSx7ImlkIjoiZjUyM2JiMDM0ZGIzNjBhNCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZWE1NDM2YjU5MmE4NmI5MCIsIm5hbWUiOiJyZXRyeV9jb3VudGVyKysiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJyZXRyeV9jb3VudGVyIiwicHQiOiJtc2ciLCJ0byI6InJldHJ5X2NvdW50ZXIrMSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NzQwLCJ5Ijo4MCwid2lyZXMiOltbIjNlYjRlYzZiNzFmYzM4M2IiXV19LHsiaWQiOiIwOTI1NDc3MzdhMGNiZWUyIiwidHlwZSI6ImNoYW5nZSIsInoiOiJlYTU0MzZiNTkyYTg2YjkwIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiTWF4IHJldHJ5IGV4ZWVkZWQiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MTM2MCwieSI6MTIwLCJ3aXJlcyI6W1tdXX0seyJpZCI6IjEzMmY0ZmRjNDBkNTVlODkiLCJ0eXBlIjoiZGVidWciLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiJkZWJ1ZyAyIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoidHJ1ZSIsInRhcmdldFR5cGUiOiJmdWxsIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoyNDIwLCJ5IjozMjAsIndpcmVzIjpbXX0seyJpZCI6IjYxMjgxOWY3NjYxN2U1YTgiLCJ0eXBlIjoiZGVidWciLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiJkZWJ1ZyAzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjI0MjAsInkiOjIwMCwid2lyZXMiOltdfSx7ImlkIjoiN2U5ZThlMWFmNzUxYmI5MiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoxODQwLCJ5IjoyNjAsIndpcmVzIjpbWyJjY2FkYzJiYTQwYmI4NjA2Il1dfSx7ImlkIjoiY2NhZGMyYmE0MGJiODYwNiIsInR5cGUiOiJzdWJmbG93OmVhNTQzNmI1OTJhODZiOTAiLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiIiLCJlbnYiOlt7Im5hbWUiOiJVUkwiLCJ2YWx1ZSI6Imh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS9waG90b3NTIiwidHlwZSI6InN0ciJ9LHsibmFtZSI6Ik1BWF9SRVRSWSIsInZhbHVlIjoiMTAwMDAiLCJ0eXBlIjoic3RyIn1dLCJ4IjoyMTYwLCJ5IjoyNjAsIndpcmVzIjpbWyI2MTI4MTlmNzY2MTdlNWE4Il0sWyIxMzJmNGZkYzQwZDU1ZTg5Il1dfV0="
---
::



Now, just like regular Node-RED nodes, you can effectively use this Subflow node in your projects. With its added documentation, customized appearance, and status indicators, it integrates seamlessly into your Node-RED environment, enhancing both usability and functionality.

### Benefits of using subflows.

- **Modularity**: Subflows allow you to group related nodes into a single, reusable unit, making complex flows easier to manage.
- **Code Reuse**: They help avoid duplicating similar logic across different parts of your flow, saving time and effort.
- **Simplified Design**: Subflows can simplify your main flow by hiding complexity within a single node.
- **Easier Maintenance**: Updating a Subflow automatically updates all instances where it is used, making maintenance quicker.

## Conclusion

In this guide, we explored the concept of subflows in Node-RED, including their definition and purpose. We walked through the steps to create and configure subflows, demonstrating how to integrate them into your main flow. Additionally, we discussed how to edit and update existing subflows, and provided best practices for managing and organizing them effectively.