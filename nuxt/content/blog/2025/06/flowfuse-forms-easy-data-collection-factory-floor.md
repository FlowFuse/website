---
title: 'FlowFuse Forms: Easy Data Collection for Your Factory Floor'
navTitle: 'FlowFuse Forms: Easy Data Collection for Your Factory Floor'
---

It's often a pain to get important data from the factory floor. Things like doing quality checks still rely on old methods like manual notes and slow spreadsheets. This can lead to delays, errors, and a lot of wasted time before anyone can actually use the information. It's especially tough when you need quick feedback from an operator.

<!--more-->

This article will show you an easy way to gather data via a form entry. We'll look at how forms in FlowFuse Dashboard can make collecting data from factory workers much simpler. You'll learn how to build useful forms that connects your team's knowledge directly to your industrial processes. As a practical example, we'll walk you through building a solution to digitize production recipe updates, showing you exactly how to implement it.

## Prerequisites

Before you begin, make sure you have the following:

- **Node-RED:** Make sure you have an instance of Node-RED up and running. The quickest way to do this is via FlowFuse. If you don't have an account, check out our [free trial](https://app.flowfuse.com/account/create).

Then you'll need to add two more sets of nodes to your palette:

- **FlowFuse Dashboard:** Ensure you have [FlowFuse Dashboard](https://flows.nodered.org/node/@flowfuse/node-red-dashboard) (also known as Node-RED Dashboard 2.0 in the community) installed and properly configured on your instance.
- **SQLite:** Install the [node-red-node-sqlite](https://flows.nodered.org/node/node-red-node-sqlite) package, which will be used in the practical example.

and finally:

- **Basic Node-RED Knowledge:** You are familiar with creating and deploying basic flows in Node-RED. If not, consider taking the [Node-RED Fundamentals Course](https://node-red-academy.learnworlds.com/course/node-red-getting-started) *sponsored by FlowFuse.*

## Building Forms in FlowFuse Dashboard

The FlowFuse Dashboard makes it easy to build interactive industrial applications using drag-and-drop components — **no coding required**. 

One of these components is the [Form](https://dashboard.flowfuse.com/nodes/widgets/ui-form.html) widget, which allows you to create versatile forms within your applications. The Form widget supports a wide range of input types, including:

- Text Fields
- Number Inputs
- Date Pickers,
- Multi-line Text Areas
- Dropdown Selection
- Checkboxes

A key benefit of this widget is that you can configure the form fields either statically (with predefined values) or dynamically (updated through your Node-RED flow), depending on your application’s needs.

### Adding and Configuring the Form Widget

1. Drag the **Form** widget onto the canvas.
2. Double-click on the widget and create a new group for it with the correct page configuration to render it. (note: if this is the first widget you have, this will automatically be created for you)
3. Set an appropriate size (width and height) according to your preferences.
4. Enter the label for the form.

Now that we have completed all the basic and necessary configurations for the form, let’s add the input elements.

### Adding Input Fields to the Form Statically

![Adding Form Elements](/blog/2025/06/images/adding-form-element.gif){data-zoomable}
_Adding Form Elements_

The widget supports various input element types that can be tailored to specific use cases — from collecting simple text to selecting dates or choosing from predefined options.

**To add input elements:**

1. Click the **+ add** button in the widget’s configuration dialog.
2. A new configuration row will appear for the element.
3. Configure each input element with the following fields:

- **Label**: This is the visible label for the field shown to the user.
- **Name**: A unique key used in the message payload (e.g., `msg.payload.firstname`) when the form is submitted.
- **Type**: Select the input type. Supported types include:
  - **Text**: For short text inputs (e.g., name, city).
  - **Number**: For numeric inputs (e.g., age, price).
  - **Date**: For selecting a date.
  - **Text Area**: For longer free-form text.
  - **Dropdown**: For selecting from a list of predefined values.  
    _We will cover how to add options to the dropdown field in a later section._
  - **Checkbox**: For boolean values (checked or unchecked).
- **Required**: Check this box to make the field mandatory. The form cannot be submitted unless this field is filled.
- **Row**:: If Multiline is selected, this defines the number of visible rows in the text area.

### Adding Options to Dropdown Inputs Statically

When you add Dropdown type input element to the Form widget, you need to provide a list of `options` that the user can choose from. These options can be configured in the widget's configuration dialog.

1. In the widget's configuration dialog, switch to the "Dropdown Options" tab.
2. Click the **+ add** button to insert a new option row.
3. In the new row, fill in the following fields:
   - **Dropdown**: Select the dropdown input field you want to add options to.
   - **Value**: The internal value that will be sent in the form payload when this option is selected.
   - **Label**: The visible text shown to the user in the dropdown list.

Repeat this process for each option you want to add.

### Pre-filling Forms with Default Values

You can pre-fill forms with default values to streamline user input, reduce typing errors, and save time. This is especially useful in scenarios like editing an existing recipe, where the current details can be loaded directly into the form.

We can pass data to the `ui-form` node in our flow to set these values dynamically. To do this, send an object in `msg.payload` to the input of the relevant node. Each key of `msg.payload` corresponds to a form field and its value represents the pre-filled data.

For example, if your form includes fields for `product_name` and `target_temperature_c`, you can send a `msg.payload` like this:

```javascript
{
    "product_name": "Eco-Friendly Coating",
    "target_temperature_c": 120.0
};
```

### Add Form Input Elements Dynamically at Runtime

In some cases, you may need to define form elements dynamically based on real-time data. 

For example, you might want to show additional fields based on a user’s selection or load dropdown options from an external API. This dynamic capability adds a new level of flexibility and interactivity to your forms.

**To define form fields at runtime:**

1. Use the `msg.ui_update.options`.
2. `options` should contain an array of objects, where each object defines the new configuration for the element:

Below are the supported element types and their corresponding JSON configurations:

| **Element Type** | **JSON Configuration** |
|------------------|------------------------|
| **Text** | ```{ "type": "text", "label": "Name", "key": "name", "required": true }``` |
| **Multiline** | ```{ "type": "multiline", "label": "Name", "key": "name", "required": true, "rows": 4 } ``` |
| **Password** | ```{ "type": "password", "label": "Password", "key": "password", "required": true } ``` |
| **Email** | ```{ "type": "email", "label": "E-Mail Address", "key": "email", "required": true } ``` |
| **Number** | ```{ "type": "number", "label": "Age", "key": "age", "required": true }``` |
| **Checkbox** | ```{ "type": "checkbox", "label": "Subscribe to Newsletter", "key": "newsletter" } ``` |
| **Switch** | ```{ "type": "switch", "label": "Enable Notifications", "key": "notifications" }``` |
| **Date** | ```{ "type": "date", "label": "Date of Birth", "key": "dob", "required": true } ``` |
| **Time** | ```{ "type": "time", "label": "Time of Birth", "key": "tob", "required": true } ``` |
| **Dropdown** | ```{ "type": "dropdown", "label": "Dropdown", "key": "selection" } ``` |

### Adding Options to Dropdown Inputs Dynamically at Runtime

To update the options of a dropdown field at runtime, use the `msg.ui_update.dropdownOptions` property in your flow.

This is useful when you want to update just the dropdown options without changing the rest of the form.

**Example:**

```json
[
   {
        "dropdown": "Machine Type",
        "value": "A",
        "label": "Option A"
   },
   {
        "dropdown": "Machine Type",
        "value": "B",
        "label": "Option B"
   }
]
```

The "dropdown" refers to the name of the dropdown field you want to add options for. The "value" represents the internal value that is sent when the user selects the option. The "label" is the option displayed to the user in the dropdown.

## Handling Input Data Collected from the Dashboard Form

When a user submits the dashboard form, the input data is sent to Node-RED, where it can be accessed and processed. This enables you to perform tasks such as validating the data, transforming it, or sending it to other systems like databases or APIs.

### Retrieving Submitted Data

The data submitted from the form is transmitted to any nodes connected to the output of the `ui-from` node, and is contained within `msg.payload`. Each field’s value can be accessed using the field’s key or name as the property within `msg.payload`.

For example, let’s say the form includes the following fields:

- Device Name (key: `device_name`)  
- Device ID (key: `device_id`)  
- Device Serial Number (key: `serial_number`)  
- Country (key: `country`)  

After submission, you can access these values like this in your flow:

- Device Name: `msg.payload.device_name`  
- Device ID: `msg.payload.device_id`  
- Device Serial Number: `msg.payload.serial_number`  
- Country: `msg.payload.country`

You can use this data anywhere in your flow — for example, to save it in a database or store it in [FlowFuse’s context storage](/docs/user/persistent-context/#flowfuse-persistent-context). Crucially, this collected data can also directly instruct machines on the shop floor, with FlowFuse Device Agent managing that precise control.

## Building Your Dynamic Production Recipe Update Form

In this section, you will build an advanced flow for dynamically updating production recipes using FlowFuse Forms.

A production recipe, often referred to as a manufacturing recipe or master batch record, is a critical set of instructions that defines the precise parameters, ingredients, and steps required to produce a specific product consistently. This includes details like material quantities, temperature, mixing speeds, pressures, and hold times.

This setup uses a **ui-dropdown** for selecting recipes and a **ui-form** that dynamically populates and allows updates to recipe parameters. Everything you have learned so far will come together here to create a practical and interactive solution.

### Set Up Your SQLite Database

Use the following flow to quickly set up your SQLite database. It creates a recipes table and populates it with demo data.

**Steps:**

1. Import the flow into your Node-RED editor (from the example provided below).

2. Deploy the flow to activate it.

3. Click the Inject node labeled "Populate Demo Recipes" to insert the sample data.



::render-flow
---
height: 300
flow: "W3siaWQiOiJkMjQ4YjgzODc5NDBhNWJjIiwidHlwZSI6Imdyb3VwIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyJiOTY5M2NjODQzMTFhZThlIiwiZTc2MTljZmU3YzdmZGFhOSIsImY5ZTM1YzljM2IyMTNkNDciLCJjNzE5ZjJiNDNhZWY3ZDQ0IiwiNjlhOTE0YmIwNDc5OTI1YyIsImJiM2RhNzVkY2YyYjRjZGQiXSwieCI6NTQsInkiOjc5LCJ3Ijo3NTIsImgiOjE2Mn0seyJpZCI6ImI5NjkzY2M4NDMxMWFlOGUiLCJ0eXBlIjoic3FsaXRlIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJnIjoiZDI0OGI4Mzg3OTQwYTViYyIsIm15ZGIiOiI1ZTM0NWJmNzRmMDhmNDdjIiwic3FscXVlcnkiOiJmaXhlZCIsInNxbCI6IkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHJlY2lwZXMgKFxuICAgIHJlY2lwZV9pZCBURVhUIFBSSU1BUlkgS0VZIE5PVCBOVUxMLCAgICAgICAgICAtLSBVbmlxdWUgaW50ZXJuYWwgaWRlbnRpZmllciAoZS5nLiwgJ1BYLUJMRU5ELVYzJylcbiAgICBwcm9kdWN0X25hbWUgVEVYVCBOT1QgTlVMTCwgICAgICAgICAgICAgICAgICAgLS0gSHVtYW4tcmVhZGFibGUgcHJvZHVjdCBuYW1lIChlLmcuLCAnUHJlbWl1bSBQb2x5bWVyIEJsZW5kJylcbiAgICB2ZXJzaW9uX25vIFRFWFQgTk9UIE5VTEwsICAgICAgICAgICAgICAgICAgICAgLS0gUmVjaXBlIHZlcnNpb24gKGUuZy4sICczLjEnLCAnQS1SZXYnKVxuICAgIHRhcmdldF90ZW1wZXJhdHVyZV9jIFJFQUwgTk9UIE5VTEwsICAgICAgICAgICAtLSBUYXJnZXQgdGVtcGVyYXR1cmUgaW4gQ2Vsc2l1c1xuICAgIG1peGluZ19zcGVlZF9ycG0gSU5URUdFUiBOT1QgTlVMTCwgICAgICAgICAgICAtLSBNaXhpbmcgc3BlZWQgaW4gUmV2b2x1dGlvbnMgUGVyIE1pbnV0ZVxuICAgIHByZXNzdXJlX2JhciBSRUFMLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBQcmVzc3VyZSBpbiBCYXIgKG1vcmUgY29tbW9uIHRoYW4gUFNJIGluIG1hbnkgcmVnaW9ucylcbiAgICBtYXRlcmlhbF9hX2tnIFJFQUwgTk9UIE5VTEwsICAgICAgICAgICAgICAgICAgLS0gUXVhbnRpdHkgb2YgbWFpbiBtYXRlcmlhbCBBIGluIGtpbG9ncmFtc1xuICAgIG1hdGVyaWFsX2Jfa2cgUkVBTCwgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBRdWFudGl0eSBvZiBzZWNvbmRhcnkgbWF0ZXJpYWwgQiBpbiBraWxvZ3JhbXMgKG9wdGlvbmFsIGZvciBzb21lIHJlY2lwZXMpXG4gICAgY2F0YWx5c3RfbWwgUkVBTCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIFF1YW50aXR5IG9mIGNhdGFseXN0IGluIG1pbGxpbGl0ZXJzIChzcGVjaWZpYyBhZGRpdGl2ZSlcbiAgICBob2xkX3RpbWVfbWluIElOVEVHRVIgTk9UIE5VTEwsICAgICAgICAgICAgICAgLS0gSG9sZCB0aW1lIGluIG1pbnV0ZXMgYXQgdGFyZ2V0IHRlbXBlcmF0dXJlXG4gICAgZGVzY3JpcHRpb24gVEVYVCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIE9wdGlvbmFsIG5vdGVzIGFib3V0IHRoZSByZWNpcGVcbiAgICBjcmVhdGVkX2RhdGUgVEVYVCBOT1QgTlVMTCAgICAgICAgICAgICAgICAgICAgLS0gRGF0ZSByZWNpcGUgd2FzIGNyZWF0ZWQvbGFzdCB1cGRhdGVkIChJU08gZm9ybWF0KVxuKTsiLCJuYW1lIjoiIiwieCI6NDcwLCJ5IjoxMjAsIndpcmVzIjpbWyJmOWUzNWM5YzNiMjEzZDQ3Il1dfSx7ImlkIjoiZTc2MTljZmU3YzdmZGFhOSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsImciOiJkMjQ4YjgzODc5NDBhNWJjIiwibmFtZSI6IkNyZWF0ZSBSZWNpcGUgdGFibGUiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjp0cnVlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyMDAsInkiOjEyMCwid2lyZXMiOltbImI5NjkzY2M4NDMxMWFlOGUiXV19LHsiaWQiOiJmOWUzNWM5YzNiMjEzZDQ3IiwidHlwZSI6ImRlYnVnIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJnIjoiZDI0OGI4Mzg3OTQwYTViYyIsIm5hbWUiOiJkZWJ1ZyAxIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjcwMCwieSI6MTIwLCJ3aXJlcyI6W119LHsiaWQiOiJjNzE5ZjJiNDNhZWY3ZDQ0IiwidHlwZSI6InNxbGl0ZSIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwiZyI6ImQyNDhiODM4Nzk0MGE1YmMiLCJteWRiIjoiNWUzNDViZjc0ZjA4ZjQ3YyIsInNxbHF1ZXJ5IjoiZml4ZWQiLCJzcWwiOiJJTlNFUlQgSU5UTyByZWNpcGVzIChyZWNpcGVfaWQsIHByb2R1Y3RfbmFtZSwgdmVyc2lvbl9ubywgdGFyZ2V0X3RlbXBlcmF0dXJlX2MsIG1peGluZ19zcGVlZF9ycG0sIHByZXNzdXJlX2JhciwgbWF0ZXJpYWxfYV9rZywgbWF0ZXJpYWxfYl9rZywgY2F0YWx5c3RfbWwsIGhvbGRfdGltZV9taW4sIGRlc2NyaXB0aW9uLCBjcmVhdGVkX2RhdGUpXG5WQUxVRVNcbignUE9MWV9CTEVORF9WMy4xJywgJ0FkdmFuY2VkIFBvbHltZXIgUmVzaW4nLCAnMy4xJywgMTk1LjAsIDg1MCwgMS41LCAxMjUwLjAsIDQ1MC4wLCAxNS4wLCA2MCwgJ0ltcHJvdmVkIHRlbnNpbGUgc3RyZW5ndGggZm9yIGluamVjdGlvbiBtb2xkaW5nLiBSZXF1aXJlcyBoaWdoIHNoZWFyLicsICcyMDI1LTAxLTEwJyksXG4oJ0NPQVRJTkdfRUNPX1YxLjInLCAnRWNvLVNoaWVsZCBQcm90ZWN0aXZlIENvYXRpbmcnLCAnMS4yJywgMTEwLjAsIDMyMCwgMC44LCA4MDAuMCwgMjAwLjAsIDUuMCwgMzAsICdMb3cgVk9DIGZvcm11bGF0aW9uLCBxdWljayBkcnkgdGltZS4gTWl4IGdlbnRseS4nLCAnMjAyNC0xMS0yMicpLFxuKCdBREhFU0lWRV9GQVNUX0NVUkUnLCAnSW5kdXN0cmlhbCBBZGhlc2l2ZSBYLTUwMCcsICcxLjAnLCA3MC4wLCA1NTAsIDIuMSwgMzAwLjAsIDEyMC4wLCAxMC4wLCAxNSwgJ0Zhc3QtY3VyaW5nIGZvcm11bGF0aW9uIGZvciByYXBpZCBhc3NlbWJseS4gTXVzdCBtYWludGFpbiBwcmVjaXNlIHRlbXBlcmF0dXJlLicsICcyMDI1LTAzLTAxJyksXG4oJ0ZPT0RfTElRVUlEX1BVUkUnLCAnUHVyZUJldiBCZXZlcmFnZSBCYXNlJywgJzIuMCcsIDg1LjAsIDE4MCwgMC41LCAyMDAwLjAsIDUwMC4wLCBOVUxMLCA0NSwgJ0Zvb2QtZ3JhZGUgbGlxdWlkIGJhc2UuIEVuc3VyZSBzdGVyaWxlIGNvbmRpdGlvbnMuIE5vIGNhdGFseXN0IHVzZWQuJywgJzIwMjUtMDItMTUnKSxcbignUEhBUk1BX0FQSV9NSVgnLCAnQVBJIENvbXBvdW5kIEJsZW5kIEFscGhhJywgJzEuMCcsIDQ1LjAsIDQwMCwgMS4yLCA1MC4wLCAyNS4wLCAyLjAsIDkwLCAnQWN0aXZlIFBoYXJtYWNldXRpY2FsIEluZ3JlZGllbnQgYmxlbmQuIFRlbXBlcmF0dXJlIHNlbnNpdGl2ZS4gU3RyaWN0IGhvbGQgdGltZS4nLCAnMjAyNS0wNC0wNScpOyIsIm5hbWUiOiIiLCJ4Ijo0NzAsInkiOjIwMCwid2lyZXMiOltbImJiM2RhNzVkY2YyYjRjZGQiXV19LHsiaWQiOiI2OWE5MTRiYjA0Nzk5MjVjIiwidHlwZSI6ImluamVjdCIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwiZyI6ImQyNDhiODM4Nzk0MGE1YmMiLCJuYW1lIjoiUG9wdWxhdGUgRGVtbyBSZWNpcGVzIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjIxMCwieSI6MjAwLCJ3aXJlcyI6W1siYzcxOWYyYjQzYWVmN2Q0NCJdXX0seyJpZCI6ImJiM2RhNzVkY2YyYjRjZGQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsImciOiJkMjQ4YjgzODc5NDBhNWJjIiwibmFtZSI6ImRlYnVnIDIiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzAwLCJ5IjoyMDAsIndpcmVzIjpbXX0seyJpZCI6IjVlMzQ1YmY3NGYwOGY0N2MiLCJ0eXBlIjoic3FsaXRlZGIiLCJkYiI6Ii90bXAvc3FsaXRlIiwibW9kZSI6IlJXQyJ9XQ=="
---
::



### Initial Setup: Populate Dropdown and Define Form Structure

We want this flow to run when our dashboard page loads. It queries your exiting recipes and then dynamically defines both the **ui-dropdown's** options and the **ui-form's** structure.

1. Drag an Event node onto the canvas. This node send a message when the dashboard page loads.

2. Connect the **ui-event** node to an **sqlite** node. Configure it to connect to your SQLite database, set SQL Query to fixed, and enter `SELECT recipe_id FROM recipes;` as the query. Ensure Return Output is set to a "Parsed JSON Object".

3. Connect the **sqlite** node's output to a new **function** node. Name it "Generate Form & Dropdown Definition". In this function, you will write JavaScript to dynamically create the form's elements and populate the dropdown options. Set the function to have 2 outputs.

```javascript
// msg.payload contains the recipe_id and recipe_name from SQLite query.
let dropdownOptions = [];
if (msg.payload && Array.isArray(msg.payload)) {
    dropdownOptions = msg.payload.map(recipe => {
        return {
            value: recipe.recipe_id,        // Internal value for dropdown
            label: recipe.recipe_name       // Display text for dropdown
        };
    });
}

// --- Define the ui_form structure (all input elements) ---
let formElements = [
    { type: "text", label: "Recipe ID", key: "recipe_id_display", readOnly: true },
    { type: "text", label: "Product Name", key: "product_name", readOnly: true },
    { type: "text", label: "Version No.", key: "version_no", readOnly: true },
    { type: "number", label: "Target Temp (°C)", key: "target_temperature_c", required: true },
    { type: "number", label: "Mixing Speed (RPM)", key: "mixing_speed_rpm", required: true },
    { type: "number", label: "Pressure (Bar)", key: "pressure_bar" },
    { type: "number", "label": "Material A (kg)", "key": "material_a_kg", "required": true },
    { type: "number", "label": "Material B (kg)", "key": "material_b_kg" },
    { type: "number", "label": "Catalyst (ml)", "key": "catalyst_ml" },
    { type: "number", "label": "Hold Time (min)", "key": "hold_time_min", "required": true },
    { type: "multiline", "label": "Description", "key": "description", "readOnly": true, "rows": 3 }
];

// Output 1: For the ui_dropdown node (msg.options)
let msg1 = { options: dropdownOptions }; 

// Output 2: For the ui_form node (msg.ui_update.options)
let msg2 = { ui_update: { options: formElements } };

return [msg1, msg2]; // Send two separate messages
```

4. Drag a **ui-dropdown** node onto the canvas. Configure its dashboard group and label (Select Recipe ID:). Ensure its "Options" list is empty, as it will be populated dynamically. Connect the first output of the "Generate Form & Dropdown Definition" **function** to the input of this **ui_dropdown** node.

5. Drag a **ui-form** widget onto the canvas. Configure its dashboard group and label (Recipe Parameters). Crucially, leave its "Options" list completely empty in its properties. Set the "Submit" button text to Apply and "Cancel" to Clear.  Connect the second output of the "Generate Form & Dropdown Definition" **function** to the input of this **ui-form** node.

6. Deploy your flow and open the dashboard. You should now see your form with the "Select Recipe" dropdown populated.

### Populate Form on Recipe Selection

This flow segment pre-fills the form with recipe details when an operator selects a recipe from the dropdown.

1. Connect the output of your dropdown node (from Step 2). This output will carry the selected `recipe_id` in `msg.payload`.

2. Connect the **ui-dropdown** output to a **change** node. Name it Set Params & Flow Context. Set `msg.params.$recipe_id` to `msg.payload` and `flow.selected_recipe_id` to `msg.payload`.

3. Connect the **change** node to an **sqlite** node. Configure it for your database, set SQL Query to prepared statement, and enter `SELECT * FROM recipes WHERE recipe_id = $recipe_id;` as the prepared statement. Ensure you add a rule in change node:
   - `msg.params.$recipe_id` to `msg.payload.recipe_id`

4. Connect the **sqlite** node's output to a **function** node. Name it Show values to form fields. This function will format the retrieved recipe details to pre-fill the form.

```javascript
let recipeDetails = msg.payload[0]; // Get the first (and only) result

if (recipeDetails) {
    // Map recipe details to the keys of your form elements for pre-filling.
    msg.payload = {
        recipe_id_display: recipeDetails.recipe_id, // For the display field in ui_form
        product_name: recipeDetails.product_name,
        version_no: recipeDetails.version_no,
        target_temperature_c: recipeDetails.target_temperature_c,
        mixing_speed_rpm: recipeDetails.mixing_speed_rpm,
        pressure_bar: recipeDetails.pressure_bar,
        material_a_kg: recipeDetails.material_a_kg,
        material_b_kg: recipeDetails.material_b_kg,
        catalyst_ml: recipeDetails.catalyst_ml,
        hold_time_min: recipeDetails.hold_time_min,
        description: recipeDetails.description
    };
} else {
    // If selection is cleared, prepare an empty payload (except for selected_recipe_id)
    msg.payload = {}; 
}
return msg;
```

5. Connect the output of the Show values to form fields **function** node back to the input of your form widget (from Step 2).

### Handle Form Submission & Update Database

This flow segment processes the data when the operator clicks the "Apply" button, updating the recipe in your database and providing feedback.

1. Connect a new wire from the main output of your **ui-form** widget. This output fires when the form is submitted.

2. Connect the form's output to a **change** node. Name it Prepare Update Params. This node will prepare the `msg.params` object for the SQLite update.

- Rules:
   - set `msg.params` to JSON `{}`.
   - set `msg.params.$recipe_id` to `flow.selected_recipe_id`.

For each editable field in your form (e.g., target_temperature_c, mixing_speed_rpm), add a rule: set `msg.params.$[FIELD_NAME] to msg.payload.[FIELD_NAME]`.

3. Connect the **change** node to an **sqlite** node.
   - Configure it for your database, set SQL Query to prepared statement.
   - Paste your UPDATE SQL query into the "Prepared Statement" field, using the $parameters that match your msg.params.

4. Connect the **sqlite** node's output to a **switch** node. Name it Check for Update Success.

- Set Property to payload and Rules to is empty.
- Add 1 output.

5. Connect the **switch** node's output to a **change** node. Name it Success Message.
- Set `msg.payload` to str "Recipe updated successfully".

6. Connect the **change** node to a **ui-notification** node to display the success message on the dashboard.
7. Deploy the flow, open the dashboard, and try selecting different recipes and updating them.

For practice, we use an SQLite database. However, since your recipe is often used across an entire production line, it is recommended to store it in a dedicated database instead of locally in SQLite. This ensures it is accessible to all systems and can be utilized by other components in the workflow.

*Note: This is just a simple demo we built. When using it in a production environment, you might need to make additional considerations based on your specific requirements."*

![FlowFuse form designed for updating production recipes. The form shows a dropdown for recipe selection, dynamically populates fields with recipe parameters, and allows the user to modify and submit updates.](/blog/2025/06/images/recipe-update-form.gif){data-zoomable}
_A demonstration of the dynamic **form for recipe updates** in action, showing how it streamlines data entry and submission._

Below is the complete flow of the system we built.



::render-flow
---
height: 300
flow: "W3siaWQiOiJhNmViMjg0ODE1OWM2OGY0IiwidHlwZSI6InVpLWZvcm0iLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsIm5hbWUiOiJGb3JtIiwiZ3JvdXAiOiI4M2I1NzY2NDM0ZTQyMDA1IiwibGFiZWwiOiIiLCJvcmRlciI6Miwid2lkdGgiOjAsImhlaWdodCI6MCwib3B0aW9ucyI6W3sibGFiZWwiOiJkZW1vIiwia2V5IjoiZGVtbyIsInR5cGUiOiJ0ZXh0IiwicmVxdWlyZWQiOmZhbHNlLCJyb3dzIjpudWxsfV0sImZvcm1WYWx1ZSI6eyJkZW1vIjoiIn0sInBheWxvYWQiOiIiLCJzdWJtaXQiOiJBcHBseSIsImNhbmNlbCI6IkNsZWFyIiwicmVzZXRPblN1Ym1pdCI6dHJ1ZSwidG9waWMiOiJ0b3BpYyIsInRvcGljVHlwZSI6Im1zZyIsInNwbGl0TGF5b3V0IjoiIiwiY2xhc3NOYW1lIjoiIiwicGFzc3RocnUiOmZhbHNlLCJkcm9wZG93bk9wdGlvbnMiOltdLCJ4IjoxMTcwLCJ5Ijo4MDAsIndpcmVzIjpbWyIyNjMwM2E4ZDY3ODVkYzY4Il1dfSx7ImlkIjoiNWIyZjFmMWU0MjM5MTYyNSIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IkdlbmVyYXRlIEZvcm0gJiBEcm9wZG93biBEZWZpbml0aW9uIiwiZnVuYyI6Ii8vIG1zZy5wYXlsb2FkIGNvbnRhaW5zIHRoZSByZWNpcGVfaWQgYW5kIHJlY2lwZV9uYW1lIGZyb20gU1FMaXRlIHF1ZXJ5LlxubGV0IGRyb3Bkb3duT3B0aW9ucyA9IFtdO1xuaWYgKG1zZy5wYXlsb2FkICYmIEFycmF5LmlzQXJyYXkobXNnLnBheWxvYWQpKSB7XG4gICAgZHJvcGRvd25PcHRpb25zID0gbXNnLnBheWxvYWQubWFwKHJlY2lwZSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjaXBlLnJlY2lwZV9pZCwgICAgICAgIC8vIEludGVybmFsIHZhbHVlIGZvciBkcm9wZG93blxuICAgICAgICAgICAgbGFiZWw6IHJlY2lwZS5yZWNpcGVfbmFtZSAgICAgICAvLyBEaXNwbGF5IHRleHQgZm9yIGRyb3Bkb3duXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbi8vIC0tLSBEZWZpbmUgdGhlIHVpX2Zvcm0gc3RydWN0dXJlIChhbGwgaW5wdXQgZWxlbWVudHMpIC0tLVxubGV0IGZvcm1FbGVtZW50cyA9IFtcbiAgICB7IHR5cGU6IFwidGV4dFwiLCBsYWJlbDogXCJQcm9kdWN0IE5hbWVcIiwga2V5OiBcInByb2R1Y3RfbmFtZVwiLCByZWFkT25seTogdHJ1ZSB9LFxuICAgIHsgdHlwZTogXCJ0ZXh0XCIsIGxhYmVsOiBcIlZlcnNpb24gTm8uXCIsIGtleTogXCJ2ZXJzaW9uX25vXCIsIHJlYWRPbmx5OiB0cnVlIH0sXG4gICAgeyB0eXBlOiBcIm51bWJlclwiLCBsYWJlbDogXCJUYXJnZXQgVGVtcCAowrBDKVwiLCBrZXk6IFwidGFyZ2V0X3RlbXBlcmF0dXJlX2NcIiwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICB7IHR5cGU6IFwibnVtYmVyXCIsIGxhYmVsOiBcIk1peGluZyBTcGVlZCAoUlBNKVwiLCBrZXk6IFwibWl4aW5nX3NwZWVkX3JwbVwiLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgIHsgdHlwZTogXCJudW1iZXJcIiwgbGFiZWw6IFwiUHJlc3N1cmUgKEJhcilcIiwga2V5OiBcInByZXNzdXJlX2JhclwiIH0sXG4gICAgeyB0eXBlOiBcIm51bWJlclwiLCBcImxhYmVsXCI6IFwiTWF0ZXJpYWwgQSAoa2cpXCIsIFwia2V5XCI6IFwibWF0ZXJpYWxfYV9rZ1wiLCBcInJlcXVpcmVkXCI6IHRydWUgfSxcbiAgICB7IHR5cGU6IFwibnVtYmVyXCIsIFwibGFiZWxcIjogXCJNYXRlcmlhbCBCIChrZylcIiwgXCJrZXlcIjogXCJtYXRlcmlhbF9iX2tnXCIgfSxcbiAgICB7IHR5cGU6IFwibnVtYmVyXCIsIFwibGFiZWxcIjogXCJDYXRhbHlzdCAobWwpXCIsIFwia2V5XCI6IFwiY2F0YWx5c3RfbWxcIiB9LFxuICAgIHsgdHlwZTogXCJudW1iZXJcIiwgXCJsYWJlbFwiOiBcIkhvbGQgVGltZSAobWluKVwiLCBcImtleVwiOiBcImhvbGRfdGltZV9taW5cIiwgXCJyZXF1aXJlZFwiOiB0cnVlIH0sXG4gICAgeyB0eXBlOiBcIm11bHRpbGluZVwiLCBcImxhYmVsXCI6IFwiRGVzY3JpcHRpb25cIiwgXCJrZXlcIjogXCJkZXNjcmlwdGlvblwiLCBcInJlYWRPbmx5XCI6IHRydWUsIFwicm93c1wiOiAzIH1cbl07XG5cbi8vIE91dHB1dCAxOiBGb3IgdGhlIHVpX2Ryb3Bkb3duIG5vZGUgKG1zZy5vcHRpb25zKVxubGV0IG1zZzEgPSB7IG9wdGlvbnM6IGRyb3Bkb3duT3B0aW9ucyB9O1xuXG4vLyBPdXRwdXQgMjogRm9yIHRoZSB1aV9mb3JtIG5vZGUgKG1zZy51aV91cGRhdGUub3B0aW9ucylcbmxldCBtc2cyID0geyB1aV91cGRhdGU6IHsgb3B0aW9uczogZm9ybUVsZW1lbnRzIH0gfTtcblxucmV0dXJuIFttc2cxLCBtc2cyXTsgLy8gU2VuZCB0d28gc2VwYXJhdGUgbWVzc2FnZXMiLCJvdXRwdXRzIjoyLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjg3MCwieSI6NzgwLCJ3aXJlcyI6W1siODBhNWE5ZjQwZTE5ZjVhNyJdLFsiYTZlYjI4NDgxNTljNjhmNCJdXX0seyJpZCI6IjkwMzg1NzJkYTQyODIxNmMiLCJ0eXBlIjoic3FsaXRlIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJteWRiIjoiNWUzNDViZjc0ZjA4ZjQ3YyIsInNxbHF1ZXJ5IjoicHJlcGFyZWQiLCJzcWwiOiJTRUxFQ1QgKiBGUk9NIHJlY2lwZXMgV0hFUkUgcmVjaXBlX2lkID0gJHJlY2lwZV9pZDsiLCJuYW1lIjoiIiwieCI6MTYxMCwieSI6NzYwLCJ3aXJlcyI6W1siNDYyZGI4NDJiYTUzNWFmNiJdXX0seyJpZCI6ImMyNTM2ZDdlN2EyNjBiYzEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGFyYW1zIiwicHQiOiJtc2ciLCJ0byI6Int9IiwidG90IjoianNvbiJ9LHsidCI6InNldCIsInAiOiJwYXJhbXMuJHJlY2lwZV9pZCIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkIiwidG90IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6InNlbGVjdGVkX3JlY2lwZV9pZCIsInB0IjoiZmxvdyIsInRvIjoicGF5bG9hZCIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoxNDIwLCJ5Ijo3NjAsIndpcmVzIjpbWyI5MDM4NTcyZGE0MjgyMTZjIl1dfSx7ImlkIjoiNDYyZGI4NDJiYTUzNWFmNiIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IlNob3cgdmFsdWVzIHRvIGZvcm0gZmllbGRzIiwiZnVuYyI6Ii8vIG1zZy5wYXlsb2FkIHdpbGwgYmUgYW4gYXJyYXkgd2l0aCBvbmUgb2JqZWN0OiBbeyByZWNpcGVfaWQ6ICcuLi4nLCByZWNpcGVfbmFtZTogJy4uLicsIC4uLiB9XVxubGV0IHJlY2lwZURldGFpbHMgPSBtc2cucGF5bG9hZFswXTsgLy8gR2V0IHRoZSBmaXJzdCAoYW5kIG9ubHkpIHJlc3VsdFxuXG5pZiAocmVjaXBlRGV0YWlscykge1xuICAgIC8vIE1hcCByZWNpcGUgZGV0YWlscyBkaXJlY3RseSB0byB0aGUga2V5cyBvZiB5b3VyIGZvcm0gZWxlbWVudHNcbiAgICAvLyBUaGlzIG1zZy5wYXlsb2FkIHdpbGwgYmUgc2VudCB0byB0aGUgdWlfZm9ybSB0byBwcmUtZmlsbCBpdHMgZmllbGRzXG4gICAgbXNnLnBheWxvYWQgPSB7XG4gICAgICAgIHNlbGVjdGVkX3JlY2lwZV9pZDogcmVjaXBlRGV0YWlscy5yZWNpcGVfaWQsIC8vIEtlZXAgdGhlIGRyb3Bkb3duIHNlbGVjdGVkXG4gICAgICAgIHByb2R1Y3RfbmFtZTogcmVjaXBlRGV0YWlscy5wcm9kdWN0X25hbWUsXG4gICAgICAgIHZlcnNpb25fbm86IHJlY2lwZURldGFpbHMudmVyc2lvbl9ubyxcbiAgICAgICAgdGFyZ2V0X3RlbXBlcmF0dXJlX2M6IHJlY2lwZURldGFpbHMudGFyZ2V0X3RlbXBlcmF0dXJlX2MsXG4gICAgICAgIG1peGluZ19zcGVlZF9ycG06IHJlY2lwZURldGFpbHMubWl4aW5nX3NwZWVkX3JwbSxcbiAgICAgICAgcHJlc3N1cmVfYmFyOiByZWNpcGVEZXRhaWxzLnByZXNzdXJlX2JhcixcbiAgICAgICAgbWF0ZXJpYWxfYV9rZzogcmVjaXBlRGV0YWlscy5tYXRlcmlhbF9hX2tnLFxuICAgICAgICBtYXRlcmlhbF9iX2tnOiByZWNpcGVEZXRhaWxzLm1hdGVyaWFsX2Jfa2csXG4gICAgICAgIGNhdGFseXN0X21sOiByZWNpcGVEZXRhaWxzLmNhdGFseXN0X21sLFxuICAgICAgICBob2xkX3RpbWVfbWluOiByZWNpcGVEZXRhaWxzLmhvbGRfdGltZV9taW4sXG4gICAgICAgIGRlc2NyaXB0aW9uOiByZWNpcGVEZXRhaWxzLmRlc2NyaXB0aW9uXG4gICAgfTtcbn0gZWxzZSB7XG4gICAgLy8gQ2xlYXIgbm9uLWRyb3Bkb3duIGZpZWxkcyBpZiBubyByZWNpcGUgZm91bmQgKGUuZy4sIGlmIGRyb3Bkb3duIGNsZWFyZWQpXG4gICAgbGV0IGN1cnJlbnRTZWxlY3Rpb24gPSBtc2cucGF5bG9hZC5zZWxlY3RlZF9yZWNpcGVfaWQ7XG4gICAgbXNnLnBheWxvYWQgPSB7IHNlbGVjdGVkX3JlY2lwZV9pZDogY3VycmVudFNlbGVjdGlvbiB9OyAvLyBLZWVwIGRyb3Bkb3duIHZhbHVlIGJ1dCBjbGVhciBvdGhlcnNcbn1cblxucmV0dXJuIG1zZzsiLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjE4NDAsInkiOjc2MCwid2lyZXMiOltbIjlmZjQyM2FhZTAxOGFiMDQiXV19LHsiaWQiOiJlNDk1ZjliYzc5MDYyYmUzIiwidHlwZSI6InNxbGl0ZSIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibXlkYiI6IjVlMzQ1YmY3NGYwOGY0N2MiLCJzcWxxdWVyeSI6ImZpeGVkIiwic3FsIjoiU0VMRUNUIHJlY2lwZV9pZCBGUk9NIHJlY2lwZXM7IiwibmFtZSI6IiIsIngiOjU3MCwieSI6NzgwLCJ3aXJlcyI6W1siNWIyZjFmMWU0MjM5MTYyNSJdXX0seyJpZCI6IjlkNjAxM2ZhMTY2MzU2Y2YiLCJ0eXBlIjoidWktZXZlbnQiLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsInVpIjoiZWUwNTJkYmRiNThjZjYzMiIsIm5hbWUiOiIiLCJ4Ijo0MDAsInkiOjc4MCwid2lyZXMiOltbImU0OTVmOWJjNzkwNjJiZTMiXV19LHsiaWQiOiI4MGE1YTlmNDBlMTlmNWE3IiwidHlwZSI6InVpLWRyb3Bkb3duIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJncm91cCI6IjgzYjU3NjY0MzRlNDIwMDUiLCJuYW1lIjoiRHJvcGRvd24iLCJsYWJlbCI6IlNlbGVjdCBSZWNpcGUgSUQ6IiwidG9vbHRpcCI6IiIsIm9yZGVyIjoxLCJ3aWR0aCI6MCwiaGVpZ2h0IjowLCJwYXNzdGhydSI6ZmFsc2UsIm11bHRpcGxlIjpmYWxzZSwiY2hpcHMiOmZhbHNlLCJjbGVhcmFibGUiOmZhbHNlLCJvcHRpb25zIjpbeyJsYWJlbCI6IiIsInZhbHVlIjoiIiwidHlwZSI6InN0ciJ9XSwicGF5bG9hZCI6IiIsInRvcGljIjoidG9waWMiLCJ0b3BpY1R5cGUiOiJtc2ciLCJjbGFzc05hbWUiOiIiLCJ0eXBlSXNDb21ib0JveCI6dHJ1ZSwibXNnVHJpZ2dlciI6Im9uQ2hhbmdlIiwieCI6MTE5MCwieSI6NzYwLCJ3aXJlcyI6W1siYzI1MzZkN2U3YTI2MGJjMSJdXX0seyJpZCI6IjlmZjQyM2FhZTAxOGFiMDQiLCJ0eXBlIjoibGluayBvdXQiLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsIm5hbWUiOiJsaW5rIG91dCAxIiwibW9kZSI6ImxpbmsiLCJsaW5rcyI6WyJhNGMxNjc2YzdjNjU2ZmYzIl0sIngiOjIwMjUsInkiOjc2MCwid2lyZXMiOltdfSx7ImlkIjoiYTRjMTY3NmM3YzY1NmZmMyIsInR5cGUiOiJsaW5rIGluIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJuYW1lIjoibGluayBpbiAxIiwibGlua3MiOlsiOWZmNDIzYWFlMDE4YWIwNCJdLCJ4Ijo5MDUsInkiOjgyMCwid2lyZXMiOltbImE2ZWIyODQ4MTU5YzY4ZjQiXV19LHsiaWQiOiIyNjMwM2E4ZDY3ODVkYzY4IiwidHlwZSI6ImNoYW5nZSIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBhcmFtcyIsInB0IjoibXNnIiwidG8iOiJ7fSIsInRvdCI6Impzb24ifSx7InQiOiJzZXQiLCJwIjoicGFyYW1zLiRyZWNpcGVfaWQiLCJwdCI6Im1zZyIsInRvIjoic2VsZWN0ZWRfcmVjaXBlX2lkIiwidG90IjoiZmxvdyJ9LHsidCI6InNldCIsInAiOiJwYXJhbXMuJHByb2R1Y3RfbmFtZSIsInB0IjoiZmxvdyIsInRvIjoicGF5bG9hZC5wcm9kdWN0X25hbWUiLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicGFyYW1zLiR2ZXJzaW9uX25vIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQudmVyc2lvbl9ubyIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJwYXJhbXMuJHRhcmdldF90ZW1wZXJhdHVyZV9jIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQudGFyZ2V0X3RlbXBlcmF0dXJlX2MiLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicGFyYW1zLiRtaXhpbmdfc3BlZWRfcnBtIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQubWl4aW5nX3NwZWVkX3JwbSIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJwYXJhbXMuJHByZXNzdXJlX2JhciIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLnByZXNzdXJlX2JhciIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJwYXJhbXMuJG1hdGVyaWFsX2Ffa2ciLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5tYXRlcmlhbF9hX2tnIiwidG90IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6InBhcmFtcy4kbWF0ZXJpYWxfYl9rZyIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLm1hdGVyaWFsX2Jfa2ciLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicGFyYW1zLiRjYXRhbHlzdF9tbCIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLmNhdGFseXN0X21sIiwidG90IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6InBhcmFtcy4kaG9sZF90aW1lX21pbiIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLmhvbGRfdGltZV9taW4iLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoicGFyYW1zLiRkZXNjcmlwdGlvbiIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLmRlc2NyaXB0aW9uIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjE0MjAsInkiOjgwMCwid2lyZXMiOltbIjY1NmZiNDgzMmU5MjI0YjciXV19LHsiaWQiOiI2NTZmYjQ4MzJlOTIyNGI3IiwidHlwZSI6InNxbGl0ZSIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibXlkYiI6IjVlMzQ1YmY3NGYwOGY0N2MiLCJzcWxxdWVyeSI6InByZXBhcmVkIiwic3FsIjoiLS0gVXBkYXRlIGtleSBwYXJhbWV0ZXJzIGZvciBhIHNwZWNpZmljIHJlY2lwZVxuVVBEQVRFIHJlY2lwZXNcblNFVCBcbiAgICB0YXJnZXRfdGVtcGVyYXR1cmVfYyA9ICR0YXJnZXRfdGVtcGVyYXR1cmVfYyxcbiAgICBtaXhpbmdfc3BlZWRfcnBtID0gJG1peGluZ19zcGVlZF9ycG0sXG4gICAgcHJlc3N1cmVfYmFyID0gJHByZXNzdXJlX2JhcixcbiAgICBtYXRlcmlhbF9hX2tnID0gJG1hdGVyaWFsX2Ffa2csXG4gICAgbWF0ZXJpYWxfYl9rZyA9ICRtYXRlcmlhbF9iX2tnLFxuICAgIGNhdGFseXN0X21sID0gJGNhdGFseXN0X21sLFxuICAgIGhvbGRfdGltZV9taW4gPSAkaG9sZF90aW1lX21pbixcbiAgICBkZXNjcmlwdGlvbiA9ICRkZXNjcmlwdGlvbixcbiAgICB2ZXJzaW9uX25vID0gJHZlcnNpb25fbm9cbldIRVJFIHJlY2lwZV9pZCA9ICRyZWNpcGVfaWQiLCJuYW1lIjoiIiwieCI6MTYxMCwieSI6ODAwLCJ3aXJlcyI6W1siZTgyNTI2ZDM2N2IwMjhiMyJdXX0seyJpZCI6IjgxYTg0ZGNhYjMwMWExOGYiLCJ0eXBlIjoidWktbm90aWZpY2F0aW9uIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJ1aSI6ImVlMDUyZGJkYjU4Y2Y2MzIiLCJwb3NpdGlvbiI6ImNlbnRlciBjZW50ZXIiLCJjb2xvckRlZmF1bHQiOnRydWUsImNvbG9yIjoiIzAwMDAwMCIsImRpc3BsYXlUaW1lIjoiMyIsInNob3dDb3VudGRvd24iOnRydWUsIm91dHB1dHMiOjEsImFsbG93RGlzbWlzcyI6dHJ1ZSwiZGlzbWlzc1RleHQiOiJDbG9zZSIsImFsbG93Q29uZmlybSI6ZmFsc2UsImNvbmZpcm1UZXh0IjoiQ29uZmlybSIsInJhdyI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsIm5hbWUiOiIiLCJ4IjoyMTEwLCJ5Ijo4MDAsIndpcmVzIjpbW11dfSx7ImlkIjoiZTgyNTI2ZDM2N2IwMjhiMyIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsIm5hbWUiOiIiLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJydWxlcyI6W3sidCI6ImVtcHR5In1dLCJjaGVja2FsbCI6InRydWUiLCJyZXBhaXIiOmZhbHNlLCJvdXRwdXRzIjoxLCJ4IjoxNzcwLCJ5Ijo4MDAsIndpcmVzIjpbWyIyMGU5NDIyNDQzODQ0N2MxIl1dfSx7ImlkIjoiMjBlOTQyMjQ0Mzg0NDdjMSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IlJlY2lwZSB1cGRhdGVkIHN1Y2Nlc3NmdWxseS4iLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MTkyMCwieSI6ODAwLCJ3aXJlcyI6W1siODFhODRkY2FiMzAxYTE4ZiJdXX0seyJpZCI6IjgzYjU3NjY0MzRlNDIwMDUiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiUmVjaXBlIEZvcm0iLCJwYWdlIjoiYTlhYTE3ZTNjZmNkNzZkMCIsIndpZHRoIjo2LCJoZWlnaHQiOjEsIm9yZGVyIjoxLCJzaG93VGl0bGUiOnRydWUsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSIsImdyb3VwVHlwZSI6ImRlZmF1bHQifSx7ImlkIjoiNWUzNDViZjc0ZjA4ZjQ3YyIsInR5cGUiOiJzcWxpdGVkYiIsImRiIjoiL3RtcC9zcWxpdGUiLCJtb2RlIjoiUldDIn0seyJpZCI6ImVlMDUyZGJkYjU4Y2Y2MzIiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJNeSBEYXNoYm9hcmQiLCJwYXRoIjoiL2Rhc2hib2FyZCIsImFwcEljb24iOiIiLCJpbmNsdWRlQ2xpZW50RGF0YSI6dHJ1ZSwiYWNjZXB0c0NsaWVudENvbmZpZyI6WyJ1aS1ub3RpZmljYXRpb24iLCJ1aS1jb250cm9sIl0sInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwiaGVhZGVyQ29udGVudCI6InBhZ2UiLCJuYXZpZ2F0aW9uU3R5bGUiOiJkZWZhdWx0IiwidGl0bGVCYXJTdHlsZSI6ImRlZmF1bHQiLCJzaG93UmVjb25uZWN0Tm90aWZpY2F0aW9uIjp0cnVlLCJub3RpZmljYXRpb25EaXNwbGF5VGltZSI6MSwic2hvd0Rpc2Nvbm5lY3ROb3RpZmljYXRpb24iOnRydWUsImFsbG93SW5zdGFsbCI6dHJ1ZX0seyJpZCI6ImE5YWExN2UzY2ZjZDc2ZDAiLCJ0eXBlIjoidWktcGFnZSIsIm5hbWUiOiJSZWNpcGUiLCJ1aSI6ImVlMDUyZGJkYjU4Y2Y2MzIiLCJwYXRoIjoiL3JlY2lwZSIsImljb24iOiJob21lIiwibGF5b3V0Ijoibm90ZWJvb2siLCJ0aGVtZSI6IjMyNjg1NWNmNjU0MTk5YmMiLCJicmVha3BvaW50cyI6W3sibmFtZSI6IkRlZmF1bHQiLCJweCI6IjAiLCJjb2xzIjoiMyJ9LHsibmFtZSI6IlRhYmxldCIsInB4IjoiNTc2IiwiY29scyI6IjYifSx7Im5hbWUiOiJTbWFsbCBEZXNrdG9wIiwicHgiOiI3NjgiLCJjb2xzIjoiOSJ9LHsibmFtZSI6IkRlc2t0b3AiLCJweCI6IjEwMjQiLCJjb2xzIjoiMTIifV0sIm9yZGVyIjoxLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjp0cnVlLCJkaXNhYmxlZCI6ZmFsc2V9LHsiaWQiOiIzMjY4NTVjZjY1NDE5OWJjIiwidHlwZSI6InVpLXRoZW1lIiwibmFtZSI6IkRlZmF1bHQgVGhlbWUiLCJjb2xvcnMiOnsic3VyZmFjZSI6IiMyMjIzMjIiLCJwcmltYXJ5IjoiIzIyMjMyMiIsImJnUGFnZSI6IiNlZWVlZWUiLCJncm91cEJnIjoiI2ZmZmZmZiIsImdyb3VwT3V0bGluZSI6IiNjY2NjY2MifSwic2l6ZXMiOnsiZGVuc2l0eSI6ImRlZmF1bHQiLCJwYWdlUGFkZGluZyI6IjEycHgiLCJncm91cEdhcCI6IjEycHgiLCJncm91cEJvcmRlclJhZGl1cyI6IjRweCIsIndpZGdldEdhcCI6IjEycHgifX1d"
---
::



## Conclusion

So, getting your factory data digital doesn't have to be a headache. Relying on paper or tricky old systems just causes slowdowns and mistakes. Plus, many digital form tools are too complicated or don't play nice with your current setup.

That's where FlowFuse comes in. It lets your engineers build exactly what they need for the factory, using simple drag-and-drop tools – no coding required. This means you can ditch the manual steps, cut down on errors, save time, and even lower your IT costs.

Also wiith FlowFuse, you get accurate, real-time data and better control, helping your factory run smarter and much more efficiently.

*Want to see how FlowFuse can reduce costs, boost profits, and increase production? [Get in touch with us.](/contact-us/)*
