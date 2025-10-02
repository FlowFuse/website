---
eleventyNavigation:
  key: Firebase
  parent: Database
meta:
  title: Using Firebase with Node-RED
  description: Learn how to integrate Cloud Firestore with Node-RED to build real-time event-driven applications. This guide covers Firestore setup, reading, writing, and listening to data using Node-RED.
  keywords: node-red, flowfuse, integration, firebase, cloud firestore, google firebase
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

{% renderFlow %}
[{"id":"57c1f30f8a825e5c","type":"group","z":"b5ce73e91740e4b2","name":"","style":{"label":true,"stroke":"#7fb7df"},"nodes":["5792767043952f56","15d852f4a29abec1","16c12e22e1f3b257","c4d08c57eec14060","f69b62a66076edf1"],"x":114,"y":279,"w":972,"h":122},{"id":"5792767043952f56","type":"inject","z":"b5ce73e91740e4b2","g":"57c1f30f8a825e5c","name":"Send Timestamp","props":[{"p":"payload.timestamp","v":"","vt":"date"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":240,"y":360,"wires":[["c4d08c57eec14060"]]},{"id":"15d852f4a29abec1","type":"debug","z":"b5ce73e91740e4b2","g":"57c1f30f8a825e5c","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":980,"y":360,"wires":[]},{"id":"16c12e22e1f3b257","type":"comment","z":"b5ce73e91740e4b2","g":"57c1f30f8a825e5c","name":"Set Timestamp to \"timestampOverwritten\"","info":"","x":320,"y":320,"wires":[]},{"id":"c4d08c57eec14060","type":"firestore-out","z":"b5ce73e91740e4b2","g":"57c1f30f8a825e5c","name":"Overwrite Timestamp","database":"e8796a1869e179bc","collection":"demo","collectionType":"str","document":"timestampOverwritten","documentType":"str","queryMethod":"set","queryOptions":{"merge":false},"x":540,"y":360,"wires":[]},{"id":"f69b62a66076edf1","type":"firestore-in","z":"b5ce73e91740e4b2","g":"57c1f30f8a825e5c","name":"Timestamp Changes","database":"e8796a1869e179bc","collection":"","collectionType":"str","collectionGroup":"","collectionGroupType":"str","constraints":{},"document":"demo/timestampOverwritten","documentType":"str","filter":"none","inputs":0,"passThrough":false,"x":770,"y":360,"wires":[["15d852f4a29abec1"]]},{"id":"e8796a1869e179bc","type":"firebase-config","name":"My Database","authType":"email","claims":{},"createUser":false,"status":{"firestore":false,"storage":false},"useClaims":false},{"id":"8f193a9c1fc939fb","type":"group","z":"b5ce73e91740e4b2","name":"","style":{"stroke":"#c8e7a7","label":true},"nodes":["7376db537268899b","bd18e498f7c61507","19355c55dc280ad7","0ef7c0721cf81927","29aaf3383098e09e","735b562a594841f3","6a90881898ed3551","ee3a2b0bc367a47e","ca1a112e5c6cbdb2","9acbf29beeba99c3","ce937eb6b8c8ca65","16d258ae4b97ca34","78d3b0d5f0f884f4","cf5f66733f714098","fe80dd5b71c8eebe","a8a4da4c647877d1","4d5563941ff8ff6e","108e033753b35f5a","6e2869b197f278f5","d8baeef2707a77b5","1b5c69ac26a6eed7","c87c1434f562e22c","770a532dd82c2c5d","1addc1cfbb75e991"],"x":114,"y":439,"w":972,"h":582},{"id":"7376db537268899b","type":"inject","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Add Alan","props":[{"p":"payload"},{"p":"user","v":"alanisawesome","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"date_of_birth\":\"June 23, 1912\",\"full_name\":\"Alan Turing\",\"nickname\":\"Alan The Machine\"}","payloadType":"json","x":220,"y":520,"wires":[["a8a4da4c647877d1"]]},{"id":"bd18e498f7c61507","type":"inject","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Add Steve","props":[{"p":"payload"},{"p":"user","v":"steveisapple","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"full_name\":\"Steve Jobs\",\"nickname\":\"Steve The King\",\"hobby\":\"Computer\"}","payloadType":"json","x":220,"y":580,"wires":[["a8a4da4c647877d1"]]},{"id":"19355c55dc280ad7","type":"inject","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Modify Alan Nickname","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"nickname\":\"Alan is Genius\"}","payloadType":"json","x":260,"y":700,"wires":[["108e033753b35f5a"]]},{"id":"0ef7c0721cf81927","type":"inject","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Remove Steve","props":[{"p":"user","v":"steveisapple","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":240,"y":860,"wires":[["d8baeef2707a77b5"]]},{"id":"29aaf3383098e09e","type":"debug","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload.changes","targetType":"msg","statusVal":"","statusType":"auto","x":980,"y":540,"wires":[]},{"id":"735b562a594841f3","type":"debug","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"debug 4","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload.changes","targetType":"msg","statusVal":"","statusType":"auto","x":980,"y":700,"wires":[]},{"id":"6a90881898ed3551","type":"debug","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"debug 5","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload.changes","targetType":"msg","statusVal":"","statusType":"auto","x":980,"y":860,"wires":[]},{"id":"ee3a2b0bc367a47e","type":"debug","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"debug 6","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":980,"y":980,"wires":[]},{"id":"ca1a112e5c6cbdb2","type":"inject","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Get All Users","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":230,"y":980,"wires":[["770a532dd82c2c5d"]]},{"id":"9acbf29beeba99c3","type":"debug","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"debug 7","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload.docs","targetType":"msg","statusVal":"","statusType":"auto","x":560,"y":980,"wires":[]},{"id":"ce937eb6b8c8ca65","type":"comment","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Add Alan to \"users\"","info":"","x":250,"y":480,"wires":[]},{"id":"16d258ae4b97ca34","type":"comment","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Modify the Alan's Nickname","info":"","x":280,"y":660,"wires":[]},{"id":"78d3b0d5f0f884f4","type":"comment","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Remove Steve from \"users\"","info":"","x":280,"y":820,"wires":[]},{"id":"cf5f66733f714098","type":"comment","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Get All Users from \"users\"","info":"","x":270,"y":940,"wires":[]},{"id":"fe80dd5b71c8eebe","type":"comment","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Print All Users Changes","info":"","x":780,"y":940,"wires":[]},{"id":"a8a4da4c647877d1","type":"firestore-out","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Add User","database":"e8796a1869e179bc","collection":"users","collectionType":"str","document":"user","documentType":"msg","queryMethod":"set","queryOptions":{"merge":false},"x":400,"y":540,"wires":[]},{"id":"4d5563941ff8ff6e","type":"firestore-in","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"User added","database":"e8796a1869e179bc","collection":"users","collectionType":"str","collectionGroup":"","collectionGroupType":"str","constraints":{},"document":"","documentType":"str","filter":"added","inputs":0,"passThrough":false,"x":750,"y":540,"wires":[["29aaf3383098e09e"]]},{"id":"108e033753b35f5a","type":"firestore-out","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Update User Nickname","database":"e8796a1869e179bc","collection":"users","collectionType":"str","document":"alanisawesome","documentType":"str","queryMethod":"update","queryOptions":{"merge":true},"x":530,"y":700,"wires":[]},{"id":"6e2869b197f278f5","type":"firestore-in","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"User Modified","database":"e8796a1869e179bc","collection":"users","collectionType":"str","collectionGroup":"","collectionGroupType":"str","constraints":{},"document":"","documentType":"str","filter":"modified","inputs":0,"passThrough":false,"x":750,"y":700,"wires":[["735b562a594841f3"]]},{"id":"d8baeef2707a77b5","type":"firestore-out","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Remove User","database":"e8796a1869e179bc","collection":"users","collectionType":"str","document":"user","documentType":"msg","queryMethod":"delete","queryOptions":{"merge":false},"x":440,"y":860,"wires":[]},{"id":"1b5c69ac26a6eed7","type":"firestore-in","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"User Removed","database":"e8796a1869e179bc","collection":"users","collectionType":"str","collectionGroup":"","collectionGroupType":"str","constraints":{},"document":"","documentType":"str","filter":"removed","inputs":0,"passThrough":false,"x":760,"y":860,"wires":[["6a90881898ed3551"]]},{"id":"c87c1434f562e22c","type":"firestore-in","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"All Users Changes","database":"e8796a1869e179bc","collection":"users","collectionType":"str","collectionGroup":"","collectionGroupType":"str","constraints":{},"document":"","documentType":"str","filter":"none","inputs":0,"passThrough":false,"x":770,"y":980,"wires":[["ee3a2b0bc367a47e"]]},{"id":"770a532dd82c2c5d","type":"firestore-get","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Get Users","database":"e8796a1869e179bc","collection":"users","collectionType":"str","collectionGroup":"","collectionGroupType":"str","constraints":{},"document":"","documentType":"str","passThrough":false,"x":400,"y":980,"wires":[["9acbf29beeba99c3"]]},{"id":"1addc1cfbb75e991","type":"inject","z":"b5ce73e91740e4b2","g":"8f193a9c1fc939fb","name":"Remove Alan Nickname","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"nickname\":\"DELETE\"}","payloadType":"json","x":260,"y":740,"wires":[["108e033753b35f5a"]]},{"id":"3b1dbdd5845f591a","type":"global-config","env":[],"modules":{"@gogovega/node-red-contrib-cloud-firestore":"0.2.0"}}]
{% endrenderFlow %}

<div style="border: 2px solid #7fb7df; padding: 20px; border-radius: 10px; margin-top: 40px; background-color: #f5faff;">

### Try FlowFuse's Built-In Database Service

[FlowFuse now includes a fully integrated database service that makes connecting and querying your data effortless](/blog/2025/08/getting-started-with-flowfuse-tables/). With the FlowFuse Query Node, you do not need to configure the connection manually—the node sets itself up automatically.

Even better, the [FlowFuse AI Assistant allows you to query your tables using natural language](/blog/2025/09/ai-assistant-flowfuse-tables/). Simply type your request, and it will generate the correct SQL for you based on your table.

Deploy, manage, scale, and secure your Node-RED applications with FlowFuse, and take full control of your industrial workflows and data.

[**Start with FlowFuse today**](https://app.flowfuse.com/) 

</div>