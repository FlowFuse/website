---
title: Connect Your Shop Floor to Your ERP – Odoo Edition
navTitle: Connect Your Shop Floor to Your ERP – Odoo Edition
---

A major problem in manufacturing today is when your ERP system isn't getting real-time information from the factory floor. This gap causes big issues, like ordering too much material because inventory numbers are old, or missing important production deadlines. This lack of instant, correct information directly leads to higher costs and lost opportunities for your business.

<!--more-->

This problem often comes from old ways of recording data. Many factories still rely on paperwork, which takes up valuable space, and manual entries. These methods require extra human effort, causing big delays and added costs. These old, error-prone ways are simply not sustainable for modern manufacturing.

This post gives you a vital solution. We'll show you how to connect your factory floor directly to your ERP system using FlowFuse. This way, you'll see near real-time data in your ERP, helping you avoid issues such as costly over-orders, missed deadlines, and the burdens of excessive paperwork. For this article, we'll focus on integrating with the popular ERP system, Odoo.

## Basic Demo: Automating Production Data from the Shop Floor to Odoo with FlowFuse

Before we start diving into how you can connect your shop floor to ERP, let's first see a simple demo. This basic demo shows how FlowFuse acts as a smart link, making sure your production line data is always accurate in your ERP. We're doing this with a Raspberry Pi running the [FlowFuse Agent](/platform/device-agent/), which talks to a Siemens S7 PLC. A counter in the PLC, which ticks up every second to act like products being made, is precisely read using the [S7 protocol](/blog/2025/01/integrating-siemens-s7-plcs-with-node-red-guide/) through FlowFuse. This accurate count is then automatically sent to Odoo as the quantity for a "table leg product," keeping your inventory data always up-to-date.

This is just a simple example of what FlowFuse can do. But it has much more power! Imagine FlowFuse also checking your production orders (MOs) in your ERP to see what you need to make. It can look at your Bills of Material (BOMs) in your ERP to figure out all the parts required. If it sees you're short on something, it can automatically create purchase orders in your ERP to buy the missing parts. It can even make new manufacturing orders for components you need to build.

<lite-youtube videoid="bxVq_8m-GOk" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

Below is the complete flow for this demo, in case you would like to explore it further or try it out yourself after reading the article



::render-flow
---
height: 200
flow: "W3siaWQiOiJjYWI5NzdjOGUwZDFjMDU0IiwidHlwZSI6Imdyb3VwIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyI2YmE5MzQzNDgxZTNiMDQxIiwiOGEzYWRiMzFhZGJiNzQ3NSIsImJmZTM3YTk0NmE2ZWQyMGEiLCIzMDQ3MTlkOGJlM2Y1Njk0Il0sIngiOjY2NCwieSI6Mzk5LCJ3Ijo3MzIsImgiOjEyMn0seyJpZCI6IjZiYTkzNDM0ODFlM2IwNDEiLCJ0eXBlIjoib2Rvby14bWxycGMtdXBkYXRlIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJnIjoiY2FiOTc3YzhlMGQxYzA1NCIsIm5hbWUiOiIiLCJob3N0IjoiMTg4MThiZGVmZDFmMjdjZSIsIm1vZGVsIjoicHJvZHVjdC50ZW1wbGF0ZSIsImZpbHRlciI6IiIsIm9mZnNldCI6MCwibGltaXQiOjEwMCwieCI6MTI3MCwieSI6NDgwLCJ3aXJlcyI6W1tdXX0seyJpZCI6IjhhM2FkYjMxYWRiYjc0NzUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJnIjoiY2FiOTc3YzhlMGQxYzA1NCIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IltbMzhdLHtcInF0eV9hdmFpbGFibGVcIjpwYXlsb2FkfV0iLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjEwMjAsInkiOjQ4MCwid2lyZXMiOltbIjZiYTkzNDM0ODFlM2IwNDEiXV19LHsiaWQiOiJiZmUzN2E5NDZhNmVkMjBhIiwidHlwZSI6ImRlYnVnIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJnIjoiY2FiOTc3YzhlMGQxYzA1NCIsIm5hbWUiOiJHb29kIFByb2R1Y3QgUHJvZHVjZWQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTA1MCwieSI6NDQwLCJ3aXJlcyI6W119LHsiaWQiOiIzMDQ3MTlkOGJlM2Y1Njk0IiwidHlwZSI6InM3IGluIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJnIjoiY2FiOTc3YzhlMGQxYzA1NCIsImVuZHBvaW50IjoiMTQyYzEwM2E3NzM1ZWE5OSIsIm1vZGUiOiJzaW5nbGUiLCJ2YXJpYWJsZSI6IkNvdW50ZXIiLCJkaWZmIjp0cnVlLCJuYW1lIjoiUzcgIiwieCI6NzQwLCJ5Ijo0ODAsIndpcmVzIjpbWyI4YTNhZGIzMWFkYmI3NDc1IiwiYmZlMzdhOTQ2YTZlZDIwYSJdXX0seyJpZCI6IjE4ODE4YmRlZmQxZjI3Y2UiLCJ0eXBlIjoib2Rvby14bWxycGMtY29uZmlnIiwidXJsIjoiIiwiZGIiOiIiLCJ1c2VybmFtZSI6IiIsInBhc3N3b3JkIjoiIn0seyJpZCI6IjE0MmMxMDNhNzczNWVhOTkiLCJ0eXBlIjoiczcgZW5kcG9pbnQiLCJ0cmFuc3BvcnQiOiJpc28tb24tdGNwIiwiYWRkcmVzcyI6IjE5Mi4xNjguMS42IiwicG9ydCI6IjEwMiIsInJhY2siOiIwIiwic2xvdCI6IjEiLCJsb2NhbHRzYXBoaSI6IjAxIiwibG9jYWx0c2FwbG8iOiIwMCIsInJlbW90ZXRzYXBoaSI6IjAxIiwicmVtb3RldHNhcGxvIjoiMDAiLCJjb25ubW9kZSI6InJhY2stc2xvdCIsImFkYXB0ZXIiOiIiLCJidXNhZGRyIjoyLCJjeWNsZXRpbWUiOjEwMDAsInRpbWVvdXQiOjIwMDAsIm5hbWUiOiIiLCJ2YXJ0YWJsZSI6W3siYWRkciI6IkRCMSxYNC4wIiwibmFtZSI6IlRyaWdnZXIifSx7ImFkZHIiOiJEQjEsRFcwIiwibmFtZSI6IkNvdW50ZXIifV19XQ=="
---
::



## Getting Data Into and Out of Odoo with FlowFuse

In this section, we will show you how you can connect your ERP (Odoo) with your shop floor using FlowFuse. This connection lets you read information, create new records, update existing ones, and search for specific data, bringing real-time factory insights right into your business system.

### Prerequisites

Before you begin, make sure you have the following:

- **Running FlowFuse Instance:** Make sure you have a FlowFuse instance set up and running. If you don't have an account, check out our [free trial](https://app.flowfuse.com/account/create).
- **node-red-contrib-odoo-xmlrpc-filters-fields:** Ensure you have [node-red-contrib-odoo-xmlrpc-filters-fields](https://flows.nodered.org/node/node-red-contrib-odoo-xmlrpc-filters-fields) installed. This package will enable operations like reading, creating, updating, and searching data, with specific capabilities for filtering records and selecting precise fields.

### Configuring the Odoo Connection Node

Before you can send or receive any data from Odoo, FlowFuse needs to know how to connect to your Odoo instance. This is a one-time setup for your connection details, which can then be reused across all your Odoo nodes in FlowFuse.

1.  Drag any `odoo-xmlrpc` node (like `odoo-xmlrpc-read` or `odoo-xmlrpc-create`) onto your Node-RED canvas.
2.  Double-click on the node to open its configuration.
3.  Next to the "Host" field, click the pencil icon to add a new Odoo connection.
4.  In the configuration dialog, you'll need to enter your Odoo instance's details:
- Host URL: This is the web address of your Odoo instance (e.g., `https://databaseName.odoo.com`).
- Database: The name of your Odoo database.
- Username: Your Odoo login username (e.g., your email address).
- Password: Your Odoo login password.
5.  Click "Add" to save this configuration.

![Configuring Odoo Node](/blog/2025/06/images/configuration-odoo.png)
_Configuring Odoo Node_

Now, any `odoo-xmlrpc` node you use can select this saved host configuration, meaning you only have to enter your credentials once.

*Note: These configuration details (Host, Database, Username, Password) are confidential. To prevent exposing them when sharing your flows, it's crucial to use **FlowFuse Environment Variables**. These variables allow you to store sensitive information securely outside of your flow code. For more information, refer to our guide on [Environment Variables in Node-RED](/blog/2023/01/environment-variables-in-node-red/).*

### Understanding Odoo Models

Once your connection is set up, the next key concept for interacting with Odoo is understanding **Models**. In Odoo, a "model" represents a specific type of business object or data record, much like a table in a traditional database. Every piece of data you want to read, create, update, or delete belongs to a specific model.

Common Odoo models relevant to manufacturing include:

- `product.template`: For general product information (e.g., product names, descriptions).
- `stock.quant`: For inventory quantities and locations.
- `mrp.production`: For manufacturing orders/production orders.
- `res.partner`: For contacts (customers, suppliers).
- `stock.picking`: For internal transfers or delivery orders.

When you use an `odoo-xmlrpc` node in FlowFuse, you'll always need to specify which `model` you want to work with. If you're unsure of a specific model's name, you can often find it by enabling "Developer Mode" in your Odoo instance and hovering over fields in the Odoo interface.

Let’s get started. When explaining each operation, I will demonstrate it using different models such as `product.product` or `mrp.production`. This is just for demonstration and your understanding. You can perform these operations in the same way with other models—just make sure to pass the correct parameters according to the model and its data.

### Reading Data from Odoo

To read data from Odoo, you'll use the `odoo-xmlrpc-search_read` node. This node requires you to send the id (or ids) of the record(s) you wish to read to this node with `msg.payload`. The `msg.payload` should contain an array of the IDs you want to read.

Here is how you can read products data:

1. Drag an inject node onto your canvas.
2. Connect it to a change node. Here, you'll set the query details:
- Set `msg.payload` to the following array:

```json
[ID]
```

Replace ID with the actual product ID you want to read. You can include multiple IDs, for example:

```json
[1, 5, 12]
```

4. Connect the change node to an odoo-xmlrpc-search_read node. Select your Odoo connection, enter model to `product.product` (or the Odoo model you want to query).
5. Connect to a debug node to view the data.
6. Deploy the flow and click the inject node button to see the result.

<lite-youtube videoid="9CdVOp_bDMk" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>



::render-flow
---
height: 200
flow: "W3siaWQiOiI0ZjJiZDk4MTRmMDdjNmE2IiwidHlwZSI6Im9kb28teG1scnBjLXJlYWQiLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsIm5hbWUiOiIiLCJob3N0IjoiMTg4MThiZGVmZDFmMjdjZSIsIm1vZGVsIjoicHJvZHVjdC50ZW1wbGF0ZSIsIngiOjExOTAsInkiOjI4MCwid2lyZXMiOltbIjU2MDFhZmZkYmE3NTIzMjYiXV19LHsiaWQiOiI1NjAxYWZmZGJhNzUyMzI2IiwidHlwZSI6ImRlYnVnIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJuYW1lIjoiZGVidWcgNiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTUwMCwieSI6MjgwLCJ3aXJlcyI6W119LHsiaWQiOiI0ZThiMjI4NzdlMzNiNDk2IiwidHlwZSI6ImluamVjdCIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IlJlYWQgcHJvZHVjdHMgd2l0aCBpZCAyMyBhbmQgMzkiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6NTcwLCJ5IjoyODAsIndpcmVzIjpbWyJiMjFjZGQ3OGFkODFkNjVhIl1dfSx7ImlkIjoiYjIxY2RkNzhhZDgxZDY1YSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IlszOSwyM10iLCJ0b3QiOiJqc29uIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjkwMCwieSI6MjgwLCJ3aXJlcyI6W1siNGYyYmQ5ODE0ZjA3YzZhNiJdXX0seyJpZCI6IjE4ODE4YmRlZmQxZjI3Y2UiLCJ0eXBlIjoib2Rvby14bWxycGMtY29uZmlnIiwidXJsIjoiJHtIT1NUfSIsImRiIjoiJHtEQl9OQU1FfSIsInVzZXJuYW1lIjoiJHtVU0VSTkFNRX0gIiwicGFzc3dvcmQiOiIke1BBU1NXT1JEfSJ9XQ=="
---
::



### Creating New Record in Odoo

To create new records in Odoo using FlowFuse, use the `odoo-xmlrpc-create` node. This node requires you to send an array of objects containing the record information as `msg.payload`. The array can include multiple objects, allowing you to create multiple records at once.

Here is how you can create manufacturing order:

1. Drag an inject node onto your canvas and set it to trigger manually.
2. Connect it to a change node. Configure it to set `msg.payload` with the details for your new Odoo manufacturing order:
- Set `msg.payload` to:
```json
[{
    "product_id": 39,      
    "product_qty": 500,     
    "product_uom_id": 1 
}]
```

3. Connect the change node to an `odoo-xmlrpc-create` node. Select your configured Odoo connection for its Host and enter model to `mrp.production`
4. Connect the `odoo-xmlrpc-create node` to a debug node to see the ID of the new record Odoo creates.

<lite-youtube videoid="bq_yaF8etmw" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>



::render-flow
---
height: 200
flow: "W3siaWQiOiJkODlkOThhNWVjOWE4NzMzIiwidHlwZSI6Im9kb28teG1scnBjLWNyZWF0ZSIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IiIsImhvc3QiOiIxODgxOGJkZWZkMWYyN2NlIiwibW9kZWwiOiJtcnAucHJvZHVjdGlvbiIsImZpbHRlciI6IiIsIm9mZnNldCI6MCwibGltaXQiOjEwMCwieCI6MTIwMCwieSI6MzgwLCJ3aXJlcyI6W1siZWExMDFmNWNhYjY1YTI0MSJdXX0seyJpZCI6Ijk5YmEyZmZkYTEwY2YyZDkiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJuYW1lIjoiQ3JlYXRlIE5ldyBNTyIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4Ijo2MjAsInkiOjM4MCwid2lyZXMiOltbIjMzZTAzMDFiNmU4Zjc4MzgiXV19LHsiaWQiOiJlYTEwMWY1Y2FiNjVhMjQxIiwidHlwZSI6ImRlYnVnIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJuYW1lIjoiZGVidWcgNSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTUwMCwieSI6MzgwLCJ3aXJlcyI6W119LHsiaWQiOiIzM2UwMzAxYjZlOGY3ODM4IiwidHlwZSI6ImNoYW5nZSIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiW3tcInByb2R1Y3RfaWRcIjozMCxcInByb2R1Y3RfcXR5XCI6MjAwLFwicHJvZHVjdF91b21faWRcIjoxfV0iLCJ0b3QiOiJqc29uIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjkwMCwieSI6MzgwLCJ3aXJlcyI6W1siZDg5ZDk4YTVlYzlhODczMyJdXX0seyJpZCI6IjE4ODE4YmRlZmQxZjI3Y2UiLCJ0eXBlIjoib2Rvby14bWxycGMtY29uZmlnIiwidXJsIjoiJHtIT1NUfSIsImRiIjoiJHtEQl9OQU1FfSIsInVzZXJuYW1lIjoiJHtVU0VSTkFNRX0gIiwicGFzc3dvcmQiOiIke1BBU1NXT1JEfSJ9XQ=="
---
::



### Updating Existing Data in Odoo

To modify existing records in Odoo using FlowFuse, you'll use the `odoo-xmlrpc-update` node. This node requires the ID of the record(s) you want to update and the new values for the fields you wish to change. The `msg.payload` should contain an array, where the first element is a list of record IDs and the second element is an object with the fields to update.

Here is how you can update the status of manufacturing order:

1. Drag an inject node onto your canvas. Configure it to trigger manually.
2. Connect it to a change node. This node will prepare the `msg.payload` with the order ID and the new status.

- Set `msg.payload` to :
```json
[
    [13],
    {"state": "progress"}
]
```

3. Connect the change node to an `odoo-xmlrpc-update` node. Select your configured Odoo connection for its Host and enter model to `mrp.production`.
4. Connect the `odoo-xmlrpc-update` node to a debug node to confirm the update operation. (A successful update typically returns true or an empty payload).
5. Deploy the flow and click the inject node button to see the result.

<lite-youtube videoid="SsPfHxCwMI8" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>



::render-flow
---
height: 200
flow: "W3siaWQiOiJlNDNkYzA1ZWI3ZGY3ZWNmIiwidHlwZSI6ImluamVjdCIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IlVwZGF0ZSBNTyBTdGF0dXMiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6NjEwLCJ5Ijo1NDAsIndpcmVzIjpbWyIxMWJiZDIxZjEzMTRiODM5Il1dfSx7ImlkIjoiNDdiMDFmNTZiNDgwMGM1YyIsInR5cGUiOiJkZWJ1ZyIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6ImRlYnVnIDMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjE1MDAsInkiOjU0MCwid2lyZXMiOltdfSx7ImlkIjoiYmQ5ZGU0MDRmMmFjMWEyZSIsInR5cGUiOiJvZG9vLXhtbHJwYy11cGRhdGUiLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsIm5hbWUiOiIiLCJob3N0IjoiMTg4MThiZGVmZDFmMjdjZSIsIm1vZGVsIjoibXJwLnByb2R1Y3Rpb24iLCJmaWx0ZXIiOiIiLCJvZmZzZXQiOjAsImxpbWl0IjoxMDAsIngiOjEyMDAsInkiOjU0MCwid2lyZXMiOltbIjQ3YjAxZjU2YjQ4MDBjNWMiXV19LHsiaWQiOiIxMWJiZDIxZjEzMTRiODM5IiwidHlwZSI6ImNoYW5nZSIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiWyAgICAgWzE4XSwgICAgIHtcInN0YXRlXCI6IFwicHJvZ3Jlc3NcIn0gXSIsInRvdCI6Impzb24ifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6OTAwLCJ5Ijo1NDAsIndpcmVzIjpbWyJiZDlkZTQwNGYyYWMxYTJlIl1dfSx7ImlkIjoiMTg4MThiZGVmZDFmMjdjZSIsInR5cGUiOiJvZG9vLXhtbHJwYy1jb25maWciLCJ1cmwiOiIke0hPU1R9IiwiZGIiOiIke0RCX05BTUV9IiwidXNlcm5hbWUiOiIke1VTRVJOQU1FfSAiLCJwYXNzd29yZCI6IiR7UEFTU1dPUkR9In1d"
---
::



### Deleting Records from Odoo (Unlink)

To delete records in Odoo using FlowFuse, you'll use the `odoo-xmlrpc-unlink` node. This node requires you to send the id (or ids) of the record(s) you wish to remove. The `msg.payload` should contain an array of the IDs you want to delete.

Here is how you can delete product from inventory:

1. Drag an inject node onto your canvas. Configure it to trigger manually.
2. Connect the inject node to a change node. This node will prepare the msg.payload with the ID(s) of the record(s) to delete.
- Set `msg.payload` to a JSON array containing the ID of the manufacturing order to delete:

```json
[16]
```

3. Connect the change node to an `odoo-xmlrpc-unlink`. Select your configured Odoo connection for its Host and enter model to `mrp.production`.
4. Connect the `odoo-xmlrpc-unlink` to a debug node to confirm the unlink operation.
5. Deploy the flow and click the inject node button to see the result.

<lite-youtube videoid="1O1JYRtX-Sg" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>



::render-flow
---
height: 200
flow: "W3siaWQiOiJmMTQyNDFiYjI0YWY4ZGM4IiwidHlwZSI6Im9kb28teG1scnBjLXVubGluayIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IiIsImhvc3QiOiIxODgxOGJkZWZkMWYyN2NlIiwibW9kZWwiOiJwcm9kdWN0LnRlbXBsYXRlIiwieCI6MTE5MCwieSI6NzAwLCJ3aXJlcyI6W1siMjMxZTMyZTcwNzUzYWIyMiJdXX0seyJpZCI6Ijk0NTJkMTI1ZmQwNTlmNzkiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJuYW1lIjoiRGVsZXRlIHRoZSBwcm9kdWN0IHdpdGggSUQgNjAiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6NTgwLCJ5Ijo3MDAsIndpcmVzIjpbWyJjZmNhYmVhZThiMjkxYTljIl1dfSx7ImlkIjoiMjMxZTMyZTcwNzUzYWIyMiIsInR5cGUiOiJkZWJ1ZyIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6ImRlYnVnIDciLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjE1MDAsInkiOjcwMCwid2lyZXMiOltdfSx7ImlkIjoiY2ZjYWJlYWU4YjI5MWE5YyIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMjk1ZDQwNzkwYmQyMWY0OCIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6Ils2MF0iLCJ0b3QiOiJqc29uIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjkwMCwieSI6NzAwLCJ3aXJlcyI6W1siZjE0MjQxYmIyNGFmOGRjOCJdXX0seyJpZCI6IjE4ODE4YmRlZmQxZjI3Y2UiLCJ0eXBlIjoib2Rvby14bWxycGMtY29uZmlnIiwidXJsIjoiJHtIT1NUfSIsImRiIjoiJHtEQl9OQU1FfSIsInVzZXJuYW1lIjoiJHtVU0VSTkFNRX0gIiwicGFzc3dvcmQiOiIke1BBU1NXT1JEfSJ9XQ=="
---
::



### Advanced Search with Filters and Fields

For advanced queries, you'll use the `odoo-xmlrpc-search_read` node. This versatile node combines the ability to search for records using complex criteria (filters) and to retrieve only the specific data fields you need from those results.

#### Understanding Filters

Filters are conditions you apply to narrow down your search results. They are structured as a **list of lists**, where each inner list defines a single condition: `[field, operator, value]`.

-   `field`: The name of the Odoo field you want to filter by (e.g., `qty_available`, `state`, `name`).
-   `operator`: How you want to compare the field. Common operators include:
    -   `=`: Equal to
    -   `!=`: Not equal to
    -   `>`: Greater than
    -   `<`: Less than
    -   `>=`: Greater than or equal to
    -   `<=`: Less than or equal to
    -   `in`: Value is in a list (e.g., `[["id", "in", [1, 2, 3]]`)
    -   `not in`: Value is not in a list
    -   `ilike`: Case-insensitive "like" (contains substring)
    -   `=like`: Case-sensitive "like"
-   `value`: The value you're comparing against.

When you include multiple conditions within your filters list, Odoo treats them as an "AND" relationship by default. This means all conditions must be true for a record to be returned.

**Example Filters:**
-   `[[["list_price", "<", 10]]]`: Find products with less than 10 units in stock.
-   `[[["state", "=", "progress"], ["product_id", "=", 38]]]`: Find manufacturing orders for a specific product that are currently "in progress."
-   `[[["name", "ilike", "coating"]]]`: Find products where the name contains "coating" (case-insensitive).

#### Understanding Fields

The `fields` parameter allows you to specify exactly which columns or properties you want to retrieve for the matching records. This is important for efficiency, as it avoids pulling unnecessary data, making your flows faster and your payloads smaller.

-   **Structure:** A simple list of field names (e.g., `["name", "qty_available", "default_code"]`).

#### Controlling Results: Offset and Limit

For larger datasets, you'll want to control how many records are returned and where the results start.

- offset: This parameter specifies the number of records to skip from the beginning of the result set. It's useful for pagination.
- limit: This parameter specifies the maximum number of records to return in a single query. It's crucial for managing the amount of data you retrieve.

#### Example Flow

Here’s an example FlowFuse flow to find products with list price (more than 1000) that are also marked as "saleable" in Odoo, retrieving only their name, quantity, internal reference, and list price, and limiting the results.

1. Drag an inject node onto your canvas and configure it to trigger manually.
2. Connect it to a change node. This node will define your search criteria (filters and fields) and also set the offset and limit.
- Set `msg.filters` to JSON:

```json
[[
    ["list_price", ">", 1000],
    ["sale_ok", "=", true]
]]
```
- Set `msg.fields` to JSON:

```json
["name", "qty_available", "default_code", "standard_price"]
```
- Set `msg.offset` to Number 0 (Start from the first record).
- Set `msg.limit` to Number 5 (Retrieve a maximum of 10 records).

3. Connect the change node to an `odoo-xmlrpc-search_read` node. Select your configured Odoo connection.
4. Connect to a debug node to inspect the filtered and selected data in the debug sidebar.
5. Deploy the flow and click the inject node button to see the result.

<lite-youtube videoid="8Asa3z2VctQ" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>



::render-flow
---
height: 200
flow: "W3siaWQiOiIwY2ZlMjZmZDViNDE2OWU3IiwidHlwZSI6ImRlYnVnIiwieiI6IjI5NWQ0MDc5MGJkMjFmNDgiLCJuYW1lIjoiZGVidWcgNCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTUwMCwieSI6ODQwLCJ3aXJlcyI6W119LHsiaWQiOiI2NTYwMjM0NDliYTVkZWU5IiwidHlwZSI6ImluamVjdCIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IlJlYWQgVG9wIDUgU2FsZWFibGUgUHJvZHVjdHMgPjEwMDAiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6NTUwLCJ5Ijo4NDAsIndpcmVzIjpbWyI3Zjc5MWJmYzhjYWEwNzIxIl1dfSx7ImlkIjoiOGFkYTVhOTcyZDk0ZGQ5ZCIsInR5cGUiOiJvZG9vLXhtbHJwYy1zZWFyY2gtcmVhZCIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IiIsImhvc3QiOiIxODgxOGJkZWZkMWYyN2NlIiwibW9kZWwiOiJwcm9kdWN0LnByb2R1Y3QiLCJmaWx0ZXIiOiIiLCJvZmZzZXQiOjAsImxpbWl0IjoxMDAsIngiOjEyMTAsInkiOjg0MCwid2lyZXMiOltbIjBjZmUyNmZkNWI0MTY5ZTciXV19LHsiaWQiOiI3Zjc5MWJmYzhjYWEwNzIxIiwidHlwZSI6ImNoYW5nZSIsInoiOiIyOTVkNDA3OTBiZDIxZjQ4IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImZpbHRlcnMiLCJwdCI6Im1zZyIsInRvIjoiW1tbXCJsaXN0X3ByaWNlXCIsXCI+XCIsMTAwMF0sW1wic2FsZV9va1wiLFwiPVwiLHRydWVdXV0iLCJ0b3QiOiJqc29uIn0seyJ0Ijoic2V0IiwicCI6ImxpbWl0IiwicHQiOiJtc2ciLCJ0byI6IjUiLCJ0b3QiOiJudW0ifSx7InQiOiJzZXQiLCJwIjoib2Zmc2V0IiwicHQiOiJtc2ciLCJ0byI6IjAiLCJ0b3QiOiJudW0ifSx7InQiOiJzZXQiLCJwIjoiZmllbGRzIiwicHQiOiJtc2ciLCJ0byI6IltcIm5hbWVcIixcInF0eV9hdmFpbGFibGVcIixcImRlZmF1bHRfY29kZVwiLFwibHN0X3ByaWNlXCJdIiwidG90IjoianNvbiJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo5MDAsInkiOjg0MCwid2lyZXMiOltbIjhhZGE1YTk3MmQ5NGRkOWQiXV19LHsiaWQiOiIxODgxOGJkZWZkMWYyN2NlIiwidHlwZSI6Im9kb28teG1scnBjLWNvbmZpZyIsInVybCI6IiR7SE9TVH0iLCJkYiI6IiR7REJfTkFNRX0iLCJ1c2VybmFtZSI6IiR7VVNFUk5BTUV9ICIsInBhc3N3b3JkIjoiJHtQQVNTV09SRH0ifV0="
---
::



## Final thought

So, we've talked about how those manual data methods—paper, spreadsheets—can really slow things down, cause mistakes, and cost money in your factory. And let's be honest, many digital fixes out there just add more complexity or demand specialized coding skills that your team might not have.

This is where FlowFuse comes in. FlowFuse is a platform made for factory floors that runs on your devices right there. It connects to all your machines, old or new, and even your ERP systems like Odoo. FlowFuse collects, cleans, and moves your data. It helps your engineers, who know your operations best, build industrial applications and solutions using simple drag-and-drop actions. This means they can link your factory data directly to your ERP, getting rid of all those manual steps and saving your IT team time and money.

What's the real payoff? You get to see less wasted time and money, fewer mistakes with accurate, real-time data, and simply better control over your whole factory. FlowFuse helps your entire operation run smarter and more reliably. If you're looking for a practical way to bring these kinds of improvements to your own manufacturing processes, we'd be glad to discuss how FlowFuse can assist. [Get in touch here](/contact-us/)
