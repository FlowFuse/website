---
eleventyNavigation:
  key: GraphQL API
  parent: "Integration Technologies"
meta:
   title: Integrating GraphQL APIs in Node-RED
   description: Learn how to integrate GraphQL APIs in Node-RED. This guide covers setting up endpoints, executing queries, handling variables, and using mutations for dynamic data.
   keywords: node-red, flowfuse, graphql apis, queries, mutations
---

# {{meta.title}}

GraphQL is transforming the way APIs are designed. Unlike traditional REST APIs, which often require multiple requests to different endpoints, GraphQL provides a single, flexible endpoint that allows you to fetch exactly the data you need—nothing more, nothing less. In this article, you will learn how to integrate GraphQL with Node-RED and build APIs that efficiently serve your application's data requirements.

## Getting Started

First, you'll need to install the GraphQL package for Node-RED. This adds the essential nodes for working with GraphQL endpoints.

**Installation Steps:**

1. Open Node-RED and navigate to **Menu → Manage palette**
2. Go to the **Install** tab
3. Search for `node-red-contrib-graphql` and install it

## Setting Up Your GraphQL Connection

Once installed, you'll configure your first GraphQL endpoint. This is where you define how Node-RED connects to your GraphQL server.

**Configuration Process:**
1. Drag a `graphql` node onto your canvas
2. Double-click to open the configuration panel
3. Click the pencil icon next to **Endpoint** to create a new configuration
4. Fill in these essential settings:
   - **Name**: Use a descriptive name like "User Management API" or "Countries Database"
   - **Endpoint**: Your GraphQL server URL (e.g., `https://api.example.com/graphql`)
   - **Token**: Add authentication if required (Bearer tokens are the most common)

*Important: For sensitive credentials such as tokens, use environment variables to prevent them from being exposed when sharing flows. Learn more about using environment variables in Node-RED [here](https://flowfuse.com/blog/2023/01/environment-variables-in-node-red/).*

## Understanding GraphQL Query Structure

GraphQL queries are intuitive once you understand the basic pattern. You're essentially describing the shape of the data you want to receive.

**Basic Query Example:**
```graphql
query {
  countries {
    code
    name
    capital
  }
}
```

This query says: "Get me a list of countries, but only return the code, name, and capital for each one." The server won't send population, area, or any other fields—just what you requested.

**Response Structure:**
```json
{
  "data": {
    "countries": [
      {
        "code": "US",
        "name": "United States",
        "capital": "Washington D.C."
      }
    ]
  }
}
```

Notice how the response mirrors your query structure—this consistency makes GraphQL predictable and easy to work with.

## Building Your First Query Flow

Let's create a practical example using a public GraphQL API to fetch country information, which is perfect for learning the basics without needing authentication.

**Step-by-Step Flow Creation:**

1. Drag an **Inject** node onto the canvas to trigger the query.
2. Drag a **GraphQL** node onto the canvas and configure it with the endpoint `https://countries.trevorblades.com`.
3. Use the following query in the GraphQL node:

   ```graphql
   query GetCountries {
     countries {
       code
       name
       capital
       currency
     }
   }
   ```
4. Drag a **Debug** node onto the canvas and set it to display `msg.payload`.
5. **Connect the Inject node to the GraphQL node, and then connect the GraphQL node to the Debug node.**
6. Deploy the flow and click the **Inject** button. Check the **Debug** panel for the output.

### What to Expect in Debug Output

The debug panel will display an array of country objects. Here's a trimmed example of what you should see:

```json
{
  "data": {
    "countries": [
      {
        "code": "AD",
        "name": "Andorra",
        "capital": "Andorra la Vella",
        "currency": "EUR"
      },
      {
        "code": "AE",
        "name": "United Arab Emirates",
        "capital": "Abu Dhabi",
        "currency": "AED"
      },
      {
        "code": "US",
        "name": "United States",
        "capital": "Washington D.C.",
        "currency": "USD,USN,USS"
      }
      // ... more countries
    ]
  }
}
```

Each country object contains exactly the fields you requested. This demonstrates GraphQL's precision in data fetching.

## Working with Dynamic Data

Before writing dynamic queries, note that the GraphQL node has a Syntax setting. You can select GraphQL (default) for standard queries and mutations, or Plain to send raw GraphQL payloads. This is useful for advanced or dynamic queries.

### Method 1: Mustache Templates (Simple Approach)

For straightforward use cases, you can inject data directly into your queries using Mustache syntax:

```graphql
query GetSpecificCountry($countryCode: ID!) {
  country(code: $countryCode) {
    name
    capital
    currency
    emoji
  }
}
```

**Set up your input message in function node:**
```javascript
msg.countryCode = "FR";
return msg; 
```

*When to use: Simple queries with one or two variables that don't need type checking.*

### Method 2: GraphQL Variables

For production applications, GraphQL variables provide better security and maintainability:

**Query with Variables:**
```graphql
query GetCountry($code: ID!) {
  country(code: $code) {
    name
    capital
    currency
    languages {
      name
      native
    }
  }
}
```

**Variables Setup:**
```javascript
msg.variables = {
  "code": "JP"
};
```

### What to Expect in Debug Output

When querying a single country with variables, you'll see:

```json
{
  "data": {
    "country": {
      "name": "Japan",
      "capital": "Tokyo",
      "currency": "JPY",
      "languages": [
        {
          "name": "Japanese",
          "native": "日本語"
        }
      ]
    }
  }
}
```

## Modifying Data with Mutations

While queries retrieve data, mutations allow you to **create, update, or delete data**—similar to POST, PUT, and DELETE operations in REST APIs.

*Note: The Countries demo API is read-only and does not include mutations. The examples below use a fictional device schema to illustrate how mutations work in Node-RED.*

### Basic Mutation Structure

```graphql
mutation CreateNewDevice($input: DeviceInput!) {
  createDevice(input: $input) {
    id
    name
    model
    location
    createdAt
    success
  }
}
```

### Setting Up Variables in Node-RED

Use `msg.variables` to pass dynamic input to your mutation:

```javascript
msg.variables = {
  "input": {
    "name": "Raspberry Pi 4A",
    "model": "Raspberry Pi 4",
    "location": "Factory Floor 1"
  }
};
return msg;
```

### What to Expect in Debug Output

When a device is successfully created, you'll see:

```json
{
  "data": {
    "createDevice": {
      "id": "7",
      "name": "Raspberry Pi 4A",
      "model": "Raspberry Pi 4",
      "location": "Factory Floor 1",
      "createdAt": "2024-03-21T12:30:45.123Z",
      "success": true
    }
  }
}
```

If validation fails, the error structure helps you identify the issue:

```json
{
  "data": {
    "createDevice": {
      "id": null,
      "success": false,
      "errors": [
        {
          "field": "name",
          "message": "Name is required"
        }
      ]
    }
  }
}
```

## Example: Complete Device Management System

Here's how you might structure a comprehensive **device management** in GraphQL:

*Note: The Device examples are illustrative. The specific types and fields such as DeviceInput, updateDevice, and deactivateDevice must exist in the target GraphQL schema, which can vary depending on the API you are working with.*

### Fetching Devices with Pagination

```graphql
query GetDevicesPaginated($limit: Int = 10, $offset: Int = 0, $searchTerm: String) {
  devices(limit: $limit, offset: $offset, search: $searchTerm) {
    id
    name
    type
    location
    lastSeenStatus
    createdAt
    lastSeenAt
  }
  deviceCount(search: $searchTerm)
}
```

*This query supports pagination and search, useful when managing large fleets of devices. Note that some GraphQL APIs use **cursor-based pagination** instead of `limit` and `offset`, so you may need to adapt your query accordingly.*

#### Expected Output

```json
{
  "data": {
    "devices": [
      {
        "id": "1",
        "name": "Raspberry Pi 4A",
        "type": "Sensor",
        "location": "Factory Floor 1",
        "lastSeenStatus": "Online",
        "createdAt": "2024-01-15T10:30:00Z",
        "lastSeenAt": "2024-03-20T14:22:00Z"
      },
      {
        "id": "2",
        "name": "Temperature Monitor A1",
        "type": "Sensor",
        "location": "Warehouse Section B",
        "lastSeenStatus": "Online",
        "createdAt": "2024-02-10T08:15:00Z",
        "lastSeenAt": "2024-03-21T09:10:00Z"
      }
    ],
    "deviceCount": 6
  }
}
```

### Creating New Devices

```graphql
mutation CreateDevice($input: DeviceInput!) {
  createDevice(input: $input) {
    id
    name
    type
    location
    createdAt
    success
    errors {
      field
      message
    }
  }
}
```

*Always return `success` and any validation errors to confirm the device was created properly.*

#### Expected Output (Success)

```json
{
  "data": {
    "createDevice": {
      "id": "7",
      "name": "Smart Thermostat",
      "type": "Controller",
      "location": "Office Area",
      "createdAt": "2024-03-21T12:30:00Z",
      "success": true,
      "errors": []
    }
  }
}
```

### Updating Existing Devices

```graphql
mutation UpdateDevice($id: ID!, $input: DeviceUpdateInput!) {
  updateDevice(id: $id, input: $input) {
    id
    name
    type
    location
    lastSeenStatus
    updatedAt
    success
  }
}
```

#### Expected Output

```json
{
  "data": {
    "updateDevice": {
      "id": "1",
      "name": "Raspberry Pi 4A",
      "type": "Sensor",
      "location": "Factory Floor 3",
      "lastSeenStatus": "Maintenance",
      "updatedAt": "2024-03-21T13:45:00Z",
      "success": true
    }
  }
}
```

### Deleting Devices (Soft Delete)

```graphql
mutation DeactivateDevice($id: ID!) {
  deactivateDevice(id: $id) {
    id
    isActive
    deactivatedAt
    success
  }
}
```

*Soft deletes allow you to retain historical device data for audits and compliance.*

#### Expected Output

```json
{
  "data": {
    "deactivateDevice": {
      "id": "4",
      "isActive": false,
      "deactivatedAt": "2024-03-21T14:00:00Z",
      "success": true
    }
  }
}
```

## Advanced Techniques

### Custom Headers for Authentication and Metadata

Some GraphQL APIs require additional headers for authentication or client identification. You can add them in the message object before sending the request:

```javascript
msg.customHeaders = {
  "Authorization": "Bearer xyz",
  "X-API-Version": "v2",
  "X-Client-ID": "node-red-integration"
};
return msg;
```

### Using Fragments for Code Reusability

When queries start to grow, you'll often find yourself requesting the same fields across multiple operations. Fragments let you define those fields once and reuse them, keeping queries clean and consistent.

```graphql
fragment DeviceBasicInfo on Device {
  id
  name
  type
  location
  createdAt
}

fragment DeviceOperationalInfo on Device {
  ...DeviceBasicInfo
  lastSeenStatus
  lastSeenAt
  maintenanceDue
}

query GetDeviceProfile($deviceId: ID!) {
  device(id: $deviceId) {
    ...DeviceOperationalInfo
  }
}
```

*Here, `DeviceBasicInfo` is reused inside `DeviceOperationalInfo`, so you can easily expand or maintain your schema without duplicating fields.*

#### Expected Output with Fragments

The output includes all fields from both fragments combined:

```json
{
  "data": {
    "device": {
      "id": "1",
      "name": "Raspberry Pi 4A",
      "type": "Sensor",
      "location": "Factory Floor 1",
      "createdAt": "2024-01-15T10:30:00Z",
      "lastSeenStatus": "Online",
      "lastSeenAt": "2024-03-20T14:22:00Z",
      "maintenanceDue": "2024-06-15T00:00:00Z"
    }
  }
}
```

Notice how the response includes all fields from `DeviceBasicInfo` (id, name, type, location, createdAt) plus the additional fields from `DeviceOperationalInfo` (lastSeenStatus, lastSeenAt, maintenanceDue). This demonstrates how fragments compose together to build the complete response.

## Complete Example Flow

The following example flow demonstrates creating, reading, updating, and deleting data using GraphQL, including performing queries with fragments for reusable field selections. This flow and the GraphQL node are for demonstration purposes only and do not include a demo API.

{% renderFlow %}
[{"id":"7cb18349cfb7f014","type":"graphql","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Get Single Device By ID","graphql":"fd163a325aa21cdb","format":"text","template":"query GetDevice($id: ID!) {\n  device(id: $id) {\n    id\n    name\n    type\n    model\n    location\n    lastSeenStatus\n    maintenanceDue\n  }\n}","syntax":"mustache","token":"","showDebug":false,"x":490,"y":240,"wires":[["1515cbad98355c5f"],["0c4068bd1821923b"]]},{"id":"6ac3b625b7e6e954","type":"inject","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"","props":[{"p":"variables","v":"{\"id\":\"1\"}","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":240,"wires":[["7cb18349cfb7f014"]]},{"id":"66d017b14ed8c60d","type":"graphql","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Get Devices","graphql":"fd163a325aa21cdb","format":"text","template":"query GetDevices {\n  devices {\n    id\n    name\n    type\n    location\n    lastSeenStatus\n    createdAt\n  }\n}","syntax":"mustache","token":"","showDebug":false,"x":450,"y":140,"wires":[["fdcc15f68872b4d0"],["beb63abd92f155ce"]]},{"id":"572aa9e659f5e27e","type":"inject","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":140,"wires":[["66d017b14ed8c60d"]]},{"id":"6d4f9a2cb159d8e5","type":"graphql","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Create Device","graphql":"fd163a325aa21cdb","format":"text","template":"mutation CreateDevice($input: DeviceInput!) {\n  createDevice(input: $input) {\n    id\n    name\n    type\n    model\n    location\n    createdAt\n    success\n    errors {\n      field\n      message\n    }\n  }\n}","syntax":"mustache","token":"","showDebug":false,"x":460,"y":340,"wires":[["f5527e179e1c8911"],["9fc70e8f8715f994"]]},{"id":"e0b89bf0a47dbae3","type":"inject","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"","props":[{"p":"variables","v":"{\"input\":{\"name\":\"Smart Thermostat\",\"type\":\"Controller\",\"model\":\"Nest V3\",\"location\":\"Office Area\"}}","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":340,"wires":[["6d4f9a2cb159d8e5"]]},{"id":"fdcc15f68872b4d0","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":120,"wires":[]},{"id":"beb63abd92f155ce","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":160,"wires":[]},{"id":"1515cbad98355c5f","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":220,"wires":[]},{"id":"0c4068bd1821923b","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":260,"wires":[]},{"id":"f5527e179e1c8911","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":320,"wires":[]},{"id":"9fc70e8f8715f994","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":360,"wires":[]},{"id":"e0d2739c55386644","type":"graphql","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Create Device","graphql":"fd163a325aa21cdb","format":"text","template":"mutation CreateDevice($input: DeviceInput!) {\n  createDevice(input: $input) {\n    id\n    name\n    type\n    model\n    location\n    createdAt\n    success\n    errors {\n      field\n      message\n    }\n  }\n}","syntax":"mustache","token":"","showDebug":false,"x":460,"y":440,"wires":[["f5c2e0346b4979aa"],["597bac49938cd7bc"]]},{"id":"b45422c8bffaa52d","type":"inject","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"","props":[{"p":"variables","v":"{\"input\":{\"name\":\"Smart Thermostat\",\"type\":\"Controller\",\"model\":\"Nest V3\",\"location\":\"Office Area\"}}","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":440,"wires":[["e0d2739c55386644"]]},{"id":"f5c2e0346b4979aa","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":420,"wires":[]},{"id":"597bac49938cd7bc","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":460,"wires":[]},{"id":"dae18c118b5a7d25","type":"graphql","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Update Device","graphql":"fd163a325aa21cdb","format":"text","template":"mutation UpdateDevice($id: ID!, $input: DeviceUpdateInput!) {\n  updateDevice(id: $id, input: $input) {\n    id\n    name\n    location\n    lastSeenStatus\n    updatedAt\n    success\n  }\n}","syntax":"mustache","token":"","showDebug":false,"x":460,"y":540,"wires":[["8372c53fd374ca0c"],["81ee27d5d002cdf7"]]},{"id":"06e715476d4a05a1","type":"inject","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"","props":[{"p":"variables","v":"{   \"id\": \"1\",   \"input\": {     \"location\": \"Factory Floor 3\",     \"lastSeenStatus\": \"Maintenance\"   } }","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":540,"wires":[["dae18c118b5a7d25"]]},{"id":"8372c53fd374ca0c","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":520,"wires":[]},{"id":"81ee27d5d002cdf7","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":560,"wires":[]},{"id":"b59476221e135579","type":"graphql","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Deactivate Device","graphql":"fd163a325aa21cdb","format":"text","template":"mutation DeactivateDevice($id: ID!) {\n  deactivateDevice(id: $id) {\n    id\n    isActive\n    deactivatedAt\n    success\n  }\n}","syntax":"mustache","token":"","showDebug":false,"x":470,"y":640,"wires":[["bc0b5067c9b64b4a"],["9bcd78c44b2d304a"]]},{"id":"2f45ba641ea8d272","type":"inject","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"","props":[{"p":"variables","v":"{   \"id\": \"4\" }","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":640,"wires":[["b59476221e135579"]]},{"id":"bc0b5067c9b64b4a","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":620,"wires":[]},{"id":"9bcd78c44b2d304a","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":660,"wires":[]},{"id":"7d7e6689f0c42fac","type":"graphql","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"fragment","graphql":"fd163a325aa21cdb","format":"text","template":"fragment DeviceBasicInfo on Device {\n  id\n  name\n  type\n  location\n  createdAt\n}\n\nfragment DeviceOperationalInfo on Device {\n  ...DeviceBasicInfo\n  lastSeenStatus\n  lastSeenAt\n  maintenanceDue\n}\n\nquery GetDeviceProfile($deviceId: ID!) {\n  device(id: $deviceId) {\n    ...DeviceOperationalInfo\n  }\n}","syntax":"mustache","token":"","showDebug":false,"x":440,"y":740,"wires":[["e818060c00087930"],["621b732245671f2f"]]},{"id":"ac37b7540e536255","type":"inject","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"","props":[{"p":"variables","v":"{   \"deviceId\": \"4\" }","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":740,"wires":[["7d7e6689f0c42fac"]]},{"id":"e818060c00087930","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":720,"wires":[]},{"id":"621b732245671f2f","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":760,"wires":[]},{"id":"f99baa69918d2a9a","type":"graphql","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Pagination","graphql":"fd163a325aa21cdb","format":"text","template":"query GetDevicesPaginated($limit: Int = 10, $offset: Int = 0, $searchTerm: String) {\n  devices(limit: $limit, offset: $offset, search: $searchTerm) {\n    id\n    name\n    type\n    location\n    lastSeenStatus\n    createdAt\n    lastSeenAt\n  }\n  deviceCount(search: $searchTerm)\n}","syntax":"mustache","token":"","showDebug":false,"x":450,"y":840,"wires":[["368fbd3d4f756b6a"],["cc1ef9d881065082"]]},{"id":"509af177c480ed03","type":"inject","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"","props":[{"p":"variables","v":"{   \"deviceId\": \"4\" }","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":840,"wires":[["f99baa69918d2a9a"]]},{"id":"368fbd3d4f756b6a","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":820,"wires":[]},{"id":"cc1ef9d881065082","type":"debug","z":"98a60b6dd0896e47","g":"9a0c28902989b739","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":860,"wires":[]},{"id":"fd163a325aa21cdb","type":"graphql-server","name":"","endpoint":"none","token":""},{"id":"574504396881aa85","type":"global-config","env":[],"modules":{"node-red-contrib-graphql":"2.2.0"}}]
{% endrenderFlow %}
