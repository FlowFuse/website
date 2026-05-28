---
title: "Using Firebase with Node-RED (2026 Updated)"
description: "Learn how to integrate Cloud Firestore with Node-RED to build real-time event-driven applications. This guide covers Firestore setup, reading, writing, and listening to data using Node-RED."
---

# {{meta.title}}

Firebase provides two database options: Realtime Database (RTDB) and Cloud Firestore. This guide focuses on Cloud Firestore, Firebase's newer, more flexible document database with better performance, richer queries, and multi-regional support.

Cloud Firestore is a scalable NoSQL document database that offers real-time synchronization, offline support, and seamless integration with Node-RED. Using this combination, developers can build event-driven flows for IoT dashboards, notifications, and synchronized device management.

## Prerequisites

Before you start, ensure you have the following:

- **Node-RED instance**: Ensure you have a running Node-RED instance. The quickest and easiest way to set up Node-RED is via FlowFuse. [Sign up](https://app.flowforge.com/account/create/) to get started. Once you have a FlowFuse instance, you can easily manage, deploy, scale, and collaborate with your team on flows securely.
- **Firebase account**: You will need a Firebase account with the necessary configuration details to create projects and access Cloud Firestore.

## Step 1: Install the Cloud Firestore Node-RED Package

To connect Node-RED with Cloud Firestore, you need to install the required Node-RED node.

1. Open your Node-RED editor.
2. Go to **Menu → Manage palette → Install**.
3. In the search box, enter: `@gogovega/node-red-contrib-cloud-firestore`
4. Click **Install** next to the package.
5. After installation, restart your Node-RED instance to ensure the configuration node loads properly.
6. The Firestore nodes will appear in your palette, ready to use in your flows.

## Step 2: Configure the Firestore Node

Once the Firestore nodes are installed, you need to configure them with your Firebase project credentials.

1. Drag a Firestore node (e.g., Firestore Out node) onto the Node-RED canvas.
2. Double-click the node to open its configuration panel.
3. Click the **+** icon next to the **Database** field to add a new configuration.
4. In the **Authentication** tab:
   * Select **Email/Password** as the authentication type.
   * Enter your Firebase **API key** (from your project's web app settings).
   * Enter the **email** and **password** of a Firebase user with access to Firestore.
5. In the **Database** section:
   * Enter your **Firebase Project ID**.
6. Click **Done** to save the configuration.

> **Security Note**: Keep your credentials secure. Avoid exposing your API key, email, or password publicly. When sharing flows, use [environment variables](https://flowfuse.com/blog/2023/01/environment-variables-in-node-red/) to keep sensitive information safe.

## Step 3: Create a Document

Before sending data from Node-RED, you need a collection where the data will be stored. Firestore organizes data in documents within collections.

1. Drag a **Firestore Out** node onto the Node-RED canvas.
2. Double-click the node to open its configuration panel.
3. Select the **Firestore configuration** you created in Step 2.
4. Set the **Operation** to `Set / Create Document`.
5. Enter the **Collection** name and **Document ID**:
   * You can enter them as static strings, e.g., `devices` and `raspberry_pi_5_01`.
   * Or you can set them dynamically using `msg.collection` and `msg.document`.
6. Drag an **Inject** node onto the canvas and connect it to the Firestore node. Configure the payload data you want to store. For example, set `msg.payload` to:

```json
{
  "device_id": "device_001",
  "status": "online",
  "last_seen": "2025-09-22T13:10:00Z",
  "location": "Room 101"
}
```

7. Click **Done** to save the configuration.
8. Deploy the flow.

To test, click the **Inject** button on the Inject node to send the data to Firestore. You should see the Firestore node update its status:

* **Querying…** – Node-RED is sending the data to Firestore.
* **Done** – Data has been successfully written to your collection.

## Step 4: Updating a Document

Updating an existing document in Firestore lets you change one or more fields without replacing the entire document.

1. Drag a **Firestore Out** node onto the Node-RED canvas.
2. Double-click the node to open its configuration panel.
3. Select the **Firestore configuration** you created earlier.
4. Set the **Operation** to `Update Document`.
5. Specify the **Collection** name and the **Document ID** you want to update.
   * Example: `devices` and `raspberry_pi_5_01`.
6. Connect an **Inject** node to provide the updated data. For example, set `msg.payload` to:

```json
{
  "status": "offline",
  "last_seen": "2025-09-23T11:45:00Z"
}
```

7. Deploy the flow.
8. Click the **Inject** button. The Firestore node will update the specified fields in the document.

> **Note**: Fields not included in `msg.payload` will remain unchanged.

## Step 5: Deleting a Document

To remove a document from a Firestore collection:

1. Drag another **Firestore Out** node onto the Node-RED canvas.
2. Double-click the node to open its configuration panel.
3. Select your Firestore configuration.
4. Set the **Operation** to `Delete Document`.
5. Enter the **Collection** and **Document ID** to delete.
   * Example: `devices` and `raspberry_pi_5_01`.
6. Connect an **Inject** node to trigger the deletion.
7. Deploy the flow and click the **Inject** button.

Once executed, the specified document will be permanently removed from the collection.

## Step 6: Reading Data from Firestore

The **Firestore Get** node allows Node-RED to read data from a Firestore collection or document. This is useful for dashboards, data processing, or one-time data retrieval.

1. Drag a **Firestore Get** node onto the Node-RED canvas.
2. Double-click the node to open its configuration panel.
3. Select the **Firestore configuration** you created in Step 2.
4. Choose the **Type**:
   * **Collection** – Reads all documents within a single collection.
   * **Collection Group** – Reads documents across multiple collections with the same name.
     > If **Collection** or **Collection Group** is selected, specify the name in the **Collection / Group** field.
   * **Document** – Reads a single document.
     > If **Document** is selected, specify the **Collection** and **Document ID**. You can also enter them together in a single field using the format `collectionName/documentName`.
5. To sort or filter your data, check the option **"Do you want to sort and order your data?"**. Then configure the query constraints, such as:
   * `limitToFirst` or `limitToLast` – Limit the number of results returned.
   * `startAt` / `startAfter` – Start the query at a specific value.
   * `endAt` / `endBefore` – End the query at a specific value.
   * `orderBy` – Sort documents by a specific field.
   * `where` – Apply filters to select specific documents.
6. Connect a Debug node to the Firestore node to monitor the output and deploy the flow.

## Step 7: Listening for Real-time Changes

Unlike the **Firestore Get** node, which retrieves data only once, the **Firestore In** node establishes a real-time listener. This means Node-RED will continuously receive updates whenever documents are **added**, **modified**, or **removed** in the specified collection, collection group, or document.

This capability is particularly useful for building live dashboards, sending notifications, or keeping device states synchronized without repeatedly polling the database.

1. Drag a **Firestore In** node onto the Node-RED canvas.
2. Double-click the node to open its configuration panel.
3. Select the **Firestore configuration** you created in Step 2.
4. Choose the **Type**:
   * **Collection** – Listens to all documents within a single collection.
   * **Collection Group** – Listens to documents across multiple collections with the same name.
     > If **Collection** or **Collection Group** is selected, specify the name in the **Collection / Group** field.
   * **Document** – Listens to changes in a single document.
     > If **Document** is selected, specify the **Collection** and **Document ID**. You can also enter them together in a single field using the format `collectionName/documentName`.
5. When **Collection** or **Collection Group** is selected, choose the type of changes you want to listen for with the **filter** field:
   * **Added documents**
   * **Modified documents**
   * **Removed documents**
6. To refine your listener, enable **"Do you want to sort and order your data?"** and configure query constraints such as:
   * `limitToFirst` or `limitToLast` – Limit the number of results returned.
   * `startAt` / `startAfter` – Start the query at a specific value.
   * `endAt` / `endBefore` – End the query at a specific value.
   * `orderBy` – Sort documents by a specific field.
   * `where` – Apply filters to select specific documents.
7. Connect a Debug node to the Firestore node to monitor the output and deploy the flow.

## Example Flow

The flow below demonstrates all the concepts covered in this guide. You can explore and modify it as needed.



::render-flow
---
height: 200
flow: "W3siaWQiOiI1N2MxZjMwZjhhODI1ZTVjIiwidHlwZSI6Imdyb3VwIiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJuYW1lIjoiIiwic3R5bGUiOnsibGFiZWwiOnRydWUsInN0cm9rZSI6IiM3ZmI3ZGYifSwibm9kZXMiOlsiNTc5Mjc2NzA0Mzk1MmY1NiIsIjE1ZDg1MmY0YTI5YWJlYzEiLCIxNmMxMmUyMmUxZjNiMjU3IiwiYzRkMDhjNTdlZWMxNDA2MCIsImY2OWI2MmE2NjA3NmVkZjEiXSwieCI6MTE0LCJ5IjoyNzksInciOjk3MiwiaCI6MTIyfSx7ImlkIjoiNTc5Mjc2NzA0Mzk1MmY1NiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsImciOiI1N2MxZjMwZjhhODI1ZTVjIiwibmFtZSI6IlNlbmQgVGltZXN0YW1wIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkLnRpbWVzdGFtcCIsInYiOiIiLCJ2dCI6ImRhdGUifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjQwLCJ5IjozNjAsIndpcmVzIjpbWyJjNGQwOGM1N2VlYzE0MDYwIl1dfSx7ImlkIjoiMTVkODUyZjRhMjlhYmVjMSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjU3YzFmMzBmOGE4MjVlNWMiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5ODAsInkiOjM2MCwid2lyZXMiOltdfSx7ImlkIjoiMTZjMTJlMjJlMWYzYjI1NyIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiNTdjMWYzMGY4YTgyNWU1YyIsIm5hbWUiOiJTZXQgVGltZXN0YW1wIHRvIFwidGltZXN0YW1wT3ZlcndyaXR0ZW5cIiIsImluZm8iOiIiLCJ4IjozMjAsInkiOjMyMCwid2lyZXMiOltdfSx7ImlkIjoiYzRkMDhjNTdlZWMxNDA2MCIsInR5cGUiOiJmaXJlc3RvcmUtb3V0IiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiNTdjMWYzMGY4YTgyNWU1YyIsIm5hbWUiOiJPdmVyd3JpdGUgVGltZXN0YW1wIiwiZGF0YWJhc2UiOiJlODc5NmExODY5ZTE3OWJjIiwiY29sbGVjdGlvbiI6ImRlbW8iLCJjb2xsZWN0aW9uVHlwZSI6InN0ciIsImRvY3VtZW50IjoidGltZXN0YW1wT3ZlcndyaXR0ZW4iLCJkb2N1bWVudFR5cGUiOiJzdHIiLCJxdWVyeU1ldGhvZCI6InNldCIsInF1ZXJ5T3B0aW9ucyI6eyJtZXJnZSI6ZmFsc2V9LCJ4Ijo1NDAsInkiOjM2MCwid2lyZXMiOltdfSx7ImlkIjoiZjY5YjYyYTY2MDc2ZWRmMSIsInR5cGUiOiJmaXJlc3RvcmUtaW4iLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsImciOiI1N2MxZjMwZjhhODI1ZTVjIiwibmFtZSI6IlRpbWVzdGFtcCBDaGFuZ2VzIiwiZGF0YWJhc2UiOiJlODc5NmExODY5ZTE3OWJjIiwiY29sbGVjdGlvbiI6IiIsImNvbGxlY3Rpb25UeXBlIjoic3RyIiwiY29sbGVjdGlvbkdyb3VwIjoiIiwiY29sbGVjdGlvbkdyb3VwVHlwZSI6InN0ciIsImNvbnN0cmFpbnRzIjp7fSwiZG9jdW1lbnQiOiJkZW1vL3RpbWVzdGFtcE92ZXJ3cml0dGVuIiwiZG9jdW1lbnRUeXBlIjoic3RyIiwiZmlsdGVyIjoibm9uZSIsImlucHV0cyI6MCwicGFzc1Rocm91Z2giOmZhbHNlLCJ4Ijo3NzAsInkiOjM2MCwid2lyZXMiOltbIjE1ZDg1MmY0YTI5YWJlYzEiXV19LHsiaWQiOiJlODc5NmExODY5ZTE3OWJjIiwidHlwZSI6ImZpcmViYXNlLWNvbmZpZyIsIm5hbWUiOiJNeSBEYXRhYmFzZSIsImF1dGhUeXBlIjoiZW1haWwiLCJjbGFpbXMiOnt9LCJjcmVhdGVVc2VyIjpmYWxzZSwic3RhdHVzIjp7ImZpcmVzdG9yZSI6ZmFsc2UsInN0b3JhZ2UiOmZhbHNlfSwidXNlQ2xhaW1zIjpmYWxzZX0seyJpZCI6IjhmMTkzYTljMWZjOTM5ZmIiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsIm5hbWUiOiIiLCJzdHlsZSI6eyJzdHJva2UiOiIjYzhlN2E3IiwibGFiZWwiOnRydWV9LCJub2RlcyI6WyI3Mzc2ZGI1MzcyNjg4OTliIiwiYmQxOGU0OThmN2M2MTUwNyIsIjE5MzU1YzU1ZGMyODBhZDciLCIwZWY3YzA3MjFjZjgxOTI3IiwiMjlhYWYzMzgzMDk4ZTA5ZSIsIjczNWI1NjJhNTk0ODQxZjMiLCI2YTkwODgxODk4ZWQzNTUxIiwiZWUzYTJiMGJjMzY3YTQ3ZSIsImNhMWExMTJlNWM2Y2JkYjIiLCI5YWNiZjI5YmVlYmE5OWMzIiwiY2U5MzdlYjZiOGM4Y2E2NSIsIjE2ZDI1OGFlNGI5N2NhMzQiLCI3OGQzYjBkNWYwZjg4NGY0IiwiY2Y1ZjY2NzMzZjcxNDA5OCIsImZlODBkZDViNzFjOGVlYmUiLCJhOGE0ZGE0YzY0Nzg3N2QxIiwiNGQ1NTYzOTQxZmY4ZmY2ZSIsIjEwOGUwMzM3NTNiMzVmNWEiLCI2ZTI4NjliMTk3ZjI3OGY1IiwiZDhiYWVlZjI3MDdhNzdiNSIsIjFiNWM2OWFjMjZhNmVlZDciLCJjODdjMTQzNGY1NjJlMjJjIiwiNzcwYTUzMmRkODJjMmM1ZCIsIjFhZGRjMWNmYmI3NWU5OTEiXSwieCI6MTE0LCJ5Ijo0MzksInciOjk3MiwiaCI6NTgyfSx7ImlkIjoiNzM3NmRiNTM3MjY4ODk5YiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsImciOiI4ZjE5M2E5YzFmYzkzOWZiIiwibmFtZSI6IkFkZCBBbGFuIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidXNlciIsInYiOiJhbGFuaXNhd2Vzb21lIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IntcImRhdGVfb2ZfYmlydGhcIjpcIkp1bmUgMjMsIDE5MTJcIixcImZ1bGxfbmFtZVwiOlwiQWxhbiBUdXJpbmdcIixcIm5pY2tuYW1lXCI6XCJBbGFuIFRoZSBNYWNoaW5lXCJ9IiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MjIwLCJ5Ijo1MjAsIndpcmVzIjpbWyJhOGE0ZGE0YzY0Nzg3N2QxIl1dfSx7ImlkIjoiYmQxOGU0OThmN2M2MTUwNyIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsImciOiI4ZjE5M2E5YzFmYzkzOWZiIiwibmFtZSI6IkFkZCBTdGV2ZSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InVzZXIiLCJ2Ijoic3RldmVpc2FwcGxlIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IntcImZ1bGxfbmFtZVwiOlwiU3RldmUgSm9ic1wiLFwibmlja25hbWVcIjpcIlN0ZXZlIFRoZSBLaW5nXCIsXCJob2JieVwiOlwiQ29tcHV0ZXJcIn0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjoyMjAsInkiOjU4MCwid2lyZXMiOltbImE4YTRkYTRjNjQ3ODc3ZDEiXV19LHsiaWQiOiIxOTM1NWM1NWRjMjgwYWQ3IiwidHlwZSI6ImluamVjdCIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiTW9kaWZ5IEFsYW4gTmlja25hbWUiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IntcIm5pY2tuYW1lXCI6XCJBbGFuIGlzIEdlbml1c1wifSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjI2MCwieSI6NzAwLCJ3aXJlcyI6W1siMTA4ZTAzMzc1M2IzNWY1YSJdXX0seyJpZCI6IjBlZjdjMDcyMWNmODE5MjciLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJSZW1vdmUgU3RldmUiLCJwcm9wcyI6W3sicCI6InVzZXIiLCJ2Ijoic3RldmVpc2FwcGxlIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjQwLCJ5Ijo4NjAsIndpcmVzIjpbWyJkOGJhZWVmMjcwN2E3N2I1Il1dfSx7ImlkIjoiMjlhYWYzMzgzMDk4ZTA5ZSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiZGVidWcgMyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQuY2hhbmdlcyIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjk4MCwieSI6NTQwLCJ3aXJlcyI6W119LHsiaWQiOiI3MzViNTYyYTU5NDg0MWYzIiwidHlwZSI6ImRlYnVnIiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJkZWJ1ZyA0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZC5jaGFuZ2VzIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTgwLCJ5Ijo3MDAsIndpcmVzIjpbXX0seyJpZCI6IjZhOTA4ODE4OThlZDM1NTEiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsImciOiI4ZjE5M2E5YzFmYzkzOWZiIiwibmFtZSI6ImRlYnVnIDUiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkLmNoYW5nZXMiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5ODAsInkiOjg2MCwid2lyZXMiOltdfSx7ImlkIjoiZWUzYTJiMGJjMzY3YTQ3ZSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiZGVidWcgNiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5ODAsInkiOjk4MCwid2lyZXMiOltdfSx7ImlkIjoiY2ExYTExMmU1YzZjYmRiMiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsImciOiI4ZjE5M2E5YzFmYzkzOWZiIiwibmFtZSI6IkdldCBBbGwgVXNlcnMiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MjMwLCJ5Ijo5ODAsIndpcmVzIjpbWyI3NzBhNTMyZGQ4MmMyYzVkIl1dfSx7ImlkIjoiOWFjYmYyOWJlZWJhOTljMyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiZGVidWcgNyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQuZG9jcyIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjU2MCwieSI6OTgwLCJ3aXJlcyI6W119LHsiaWQiOiJjZTkzN2ViNmI4YzhjYTY1IiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsImciOiI4ZjE5M2E5YzFmYzkzOWZiIiwibmFtZSI6IkFkZCBBbGFuIHRvIFwidXNlcnNcIiIsImluZm8iOiIiLCJ4IjoyNTAsInkiOjQ4MCwid2lyZXMiOltdfSx7ImlkIjoiMTZkMjU4YWU0Yjk3Y2EzNCIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJNb2RpZnkgdGhlIEFsYW4ncyBOaWNrbmFtZSIsImluZm8iOiIiLCJ4IjoyODAsInkiOjY2MCwid2lyZXMiOltdfSx7ImlkIjoiNzhkM2IwZDVmMGY4ODRmNCIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJSZW1vdmUgU3RldmUgZnJvbSBcInVzZXJzXCIiLCJpbmZvIjoiIiwieCI6MjgwLCJ5Ijo4MjAsIndpcmVzIjpbXX0seyJpZCI6ImNmNWY2NjczM2Y3MTQwOTgiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiR2V0IEFsbCBVc2VycyBmcm9tIFwidXNlcnNcIiIsImluZm8iOiIiLCJ4IjoyNzAsInkiOjk0MCwid2lyZXMiOltdfSx7ImlkIjoiZmU4MGRkNWI3MWM4ZWViZSIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJQcmludCBBbGwgVXNlcnMgQ2hhbmdlcyIsImluZm8iOiIiLCJ4Ijo3ODAsInkiOjk0MCwid2lyZXMiOltdfSx7ImlkIjoiYThhNGRhNGM2NDc4NzdkMSIsInR5cGUiOiJmaXJlc3RvcmUtb3V0IiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJBZGQgVXNlciIsImRhdGFiYXNlIjoiZTg3OTZhMTg2OWUxNzliYyIsImNvbGxlY3Rpb24iOiJ1c2VycyIsImNvbGxlY3Rpb25UeXBlIjoic3RyIiwiZG9jdW1lbnQiOiJ1c2VyIiwiZG9jdW1lbnRUeXBlIjoibXNnIiwicXVlcnlNZXRob2QiOiJzZXQiLCJxdWVyeU9wdGlvbnMiOnsibWVyZ2UiOmZhbHNlfSwieCI6NDAwLCJ5Ijo1NDAsIndpcmVzIjpbXX0seyJpZCI6IjRkNTU2Mzk0MWZmOGZmNmUiLCJ0eXBlIjoiZmlyZXN0b3JlLWluIiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJVc2VyIGFkZGVkIiwiZGF0YWJhc2UiOiJlODc5NmExODY5ZTE3OWJjIiwiY29sbGVjdGlvbiI6InVzZXJzIiwiY29sbGVjdGlvblR5cGUiOiJzdHIiLCJjb2xsZWN0aW9uR3JvdXAiOiIiLCJjb2xsZWN0aW9uR3JvdXBUeXBlIjoic3RyIiwiY29uc3RyYWludHMiOnt9LCJkb2N1bWVudCI6IiIsImRvY3VtZW50VHlwZSI6InN0ciIsImZpbHRlciI6ImFkZGVkIiwiaW5wdXRzIjowLCJwYXNzVGhyb3VnaCI6ZmFsc2UsIngiOjc1MCwieSI6NTQwLCJ3aXJlcyI6W1siMjlhYWYzMzgzMDk4ZTA5ZSJdXX0seyJpZCI6IjEwOGUwMzM3NTNiMzVmNWEiLCJ0eXBlIjoiZmlyZXN0b3JlLW91dCIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiVXBkYXRlIFVzZXIgTmlja25hbWUiLCJkYXRhYmFzZSI6ImU4Nzk2YTE4NjllMTc5YmMiLCJjb2xsZWN0aW9uIjoidXNlcnMiLCJjb2xsZWN0aW9uVHlwZSI6InN0ciIsImRvY3VtZW50IjoiYWxhbmlzYXdlc29tZSIsImRvY3VtZW50VHlwZSI6InN0ciIsInF1ZXJ5TWV0aG9kIjoidXBkYXRlIiwicXVlcnlPcHRpb25zIjp7Im1lcmdlIjp0cnVlfSwieCI6NTMwLCJ5Ijo3MDAsIndpcmVzIjpbXX0seyJpZCI6IjZlMjg2OWIxOTdmMjc4ZjUiLCJ0eXBlIjoiZmlyZXN0b3JlLWluIiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJVc2VyIE1vZGlmaWVkIiwiZGF0YWJhc2UiOiJlODc5NmExODY5ZTE3OWJjIiwiY29sbGVjdGlvbiI6InVzZXJzIiwiY29sbGVjdGlvblR5cGUiOiJzdHIiLCJjb2xsZWN0aW9uR3JvdXAiOiIiLCJjb2xsZWN0aW9uR3JvdXBUeXBlIjoic3RyIiwiY29uc3RyYWludHMiOnt9LCJkb2N1bWVudCI6IiIsImRvY3VtZW50VHlwZSI6InN0ciIsImZpbHRlciI6Im1vZGlmaWVkIiwiaW5wdXRzIjowLCJwYXNzVGhyb3VnaCI6ZmFsc2UsIngiOjc1MCwieSI6NzAwLCJ3aXJlcyI6W1siNzM1YjU2MmE1OTQ4NDFmMyJdXX0seyJpZCI6ImQ4YmFlZWYyNzA3YTc3YjUiLCJ0eXBlIjoiZmlyZXN0b3JlLW91dCIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiUmVtb3ZlIFVzZXIiLCJkYXRhYmFzZSI6ImU4Nzk2YTE4NjllMTc5YmMiLCJjb2xsZWN0aW9uIjoidXNlcnMiLCJjb2xsZWN0aW9uVHlwZSI6InN0ciIsImRvY3VtZW50IjoidXNlciIsImRvY3VtZW50VHlwZSI6Im1zZyIsInF1ZXJ5TWV0aG9kIjoiZGVsZXRlIiwicXVlcnlPcHRpb25zIjp7Im1lcmdlIjpmYWxzZX0sIngiOjQ0MCwieSI6ODYwLCJ3aXJlcyI6W119LHsiaWQiOiIxYjVjNjlhYzI2YTZlZWQ3IiwidHlwZSI6ImZpcmVzdG9yZS1pbiIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiVXNlciBSZW1vdmVkIiwiZGF0YWJhc2UiOiJlODc5NmExODY5ZTE3OWJjIiwiY29sbGVjdGlvbiI6InVzZXJzIiwiY29sbGVjdGlvblR5cGUiOiJzdHIiLCJjb2xsZWN0aW9uR3JvdXAiOiIiLCJjb2xsZWN0aW9uR3JvdXBUeXBlIjoic3RyIiwiY29uc3RyYWludHMiOnt9LCJkb2N1bWVudCI6IiIsImRvY3VtZW50VHlwZSI6InN0ciIsImZpbHRlciI6InJlbW92ZWQiLCJpbnB1dHMiOjAsInBhc3NUaHJvdWdoIjpmYWxzZSwieCI6NzYwLCJ5Ijo4NjAsIndpcmVzIjpbWyI2YTkwODgxODk4ZWQzNTUxIl1dfSx7ImlkIjoiYzg3YzE0MzRmNTYyZTIyYyIsInR5cGUiOiJmaXJlc3RvcmUtaW4iLCJ6IjoiYjVjZTczZTkxNzQwZTRiMiIsImciOiI4ZjE5M2E5YzFmYzkzOWZiIiwibmFtZSI6IkFsbCBVc2VycyBDaGFuZ2VzIiwiZGF0YWJhc2UiOiJlODc5NmExODY5ZTE3OWJjIiwiY29sbGVjdGlvbiI6InVzZXJzIiwiY29sbGVjdGlvblR5cGUiOiJzdHIiLCJjb2xsZWN0aW9uR3JvdXAiOiIiLCJjb2xsZWN0aW9uR3JvdXBUeXBlIjoic3RyIiwiY29uc3RyYWludHMiOnt9LCJkb2N1bWVudCI6IiIsImRvY3VtZW50VHlwZSI6InN0ciIsImZpbHRlciI6Im5vbmUiLCJpbnB1dHMiOjAsInBhc3NUaHJvdWdoIjpmYWxzZSwieCI6NzcwLCJ5Ijo5ODAsIndpcmVzIjpbWyJlZTNhMmIwYmMzNjdhNDdlIl1dfSx7ImlkIjoiNzcwYTUzMmRkODJjMmM1ZCIsInR5cGUiOiJmaXJlc3RvcmUtZ2V0IiwieiI6ImI1Y2U3M2U5MTc0MGU0YjIiLCJnIjoiOGYxOTNhOWMxZmM5MzlmYiIsIm5hbWUiOiJHZXQgVXNlcnMiLCJkYXRhYmFzZSI6ImU4Nzk2YTE4NjllMTc5YmMiLCJjb2xsZWN0aW9uIjoidXNlcnMiLCJjb2xsZWN0aW9uVHlwZSI6InN0ciIsImNvbGxlY3Rpb25Hcm91cCI6IiIsImNvbGxlY3Rpb25Hcm91cFR5cGUiOiJzdHIiLCJjb25zdHJhaW50cyI6e30sImRvY3VtZW50IjoiIiwiZG9jdW1lbnRUeXBlIjoic3RyIiwicGFzc1Rocm91Z2giOmZhbHNlLCJ4Ijo0MDAsInkiOjk4MCwid2lyZXMiOltbIjlhY2JmMjliZWViYTk5YzMiXV19LHsiaWQiOiIxYWRkYzFjZmJiNzVlOTkxIiwidHlwZSI6ImluamVjdCIsInoiOiJiNWNlNzNlOTE3NDBlNGIyIiwiZyI6IjhmMTkzYTljMWZjOTM5ZmIiLCJuYW1lIjoiUmVtb3ZlIEFsYW4gTmlja25hbWUiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IntcIm5pY2tuYW1lXCI6XCJERUxFVEVcIn0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjoyNjAsInkiOjc0MCwid2lyZXMiOltbIjEwOGUwMzM3NTNiMzVmNWEiXV19LHsiaWQiOiIzYjFkYmRkNTg0NWY1OTFhIiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7IkBnb2dvdmVnYS9ub2RlLXJlZC1jb250cmliLWNsb3VkLWZpcmVzdG9yZSI6IjAuMi4wIn19XQ=="
---
::



<div style="border: 2px solid #7fb7df; padding: 20px; border-radius: 10px; margin-top: 40px; background-color: #f5faff;">

### Try FlowFuse's Built-In Database Service

[FlowFuse now includes a fully integrated database service that makes connecting and querying your data effortless](/blog/2025/08/getting-started-with-flowfuse-tables/). With the FlowFuse Query Node, you do not need to configure the connection manually—the node sets itself up automatically.

Even better, the [FlowFuse Expert allows you to query your tables using natural language](/blog/2025/09/ai-assistant-flowfuse-tables/). Simply type your request, and it will generate the correct SQL for you based on your table.

Deploy, manage, scale, and secure your Node-RED applications with FlowFuse, and take full control of your industrial workflows and data.

[**Start with FlowFuse today**](https://app.flowfuse.com/) 

</div>