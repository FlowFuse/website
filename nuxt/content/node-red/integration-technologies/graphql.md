---
title: "Integrating GraphQL APIs in Node-RED"
description: "Learn how to integrate GraphQL APIs in Node-RED. This guide covers setting up endpoints, executing queries, handling variables, and using mutations for dynamic data."
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



::render-flow
---
height: 200
flow: "W3siaWQiOiI3Y2IxODM0OWNmYjdmMDE0IiwidHlwZSI6ImdyYXBocWwiLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IkdldCBTaW5nbGUgRGV2aWNlIEJ5IElEIiwiZ3JhcGhxbCI6ImZkMTYzYTMyNWFhMjFjZGIiLCJmb3JtYXQiOiJ0ZXh0IiwidGVtcGxhdGUiOiJxdWVyeSBHZXREZXZpY2UoJGlkOiBJRCEpIHtcbiAgZGV2aWNlKGlkOiAkaWQpIHtcbiAgICBpZFxuICAgIG5hbWVcbiAgICB0eXBlXG4gICAgbW9kZWxcbiAgICBsb2NhdGlvblxuICAgIGxhc3RTZWVuU3RhdHVzXG4gICAgbWFpbnRlbmFuY2VEdWVcbiAgfVxufSIsInN5bnRheCI6Im11c3RhY2hlIiwidG9rZW4iOiIiLCJzaG93RGVidWciOmZhbHNlLCJ4Ijo0OTAsInkiOjI0MCwid2lyZXMiOltbIjE1MTVjYmFkOTgzNTVjNWYiXSxbIjBjNDA2OGJkMTgyMTkyM2IiXV19LHsiaWQiOiI2YWMzYjYyNWI3ZTZlOTU0IiwidHlwZSI6ImluamVjdCIsInoiOiI5OGE2MGI2ZGQwODk2ZTQ3IiwiZyI6IjlhMGMyODkwMjk4OWI3MzkiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJ2YXJpYWJsZXMiLCJ2Ijoie1wiaWRcIjpcIjFcIn0iLCJ2dCI6Impzb24ifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjcwLCJ5IjoyNDAsIndpcmVzIjpbWyI3Y2IxODM0OWNmYjdmMDE0Il1dfSx7ImlkIjoiNjZkMDE3YjE0ZWQ4YzYwZCIsInR5cGUiOiJncmFwaHFsIiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiJHZXQgRGV2aWNlcyIsImdyYXBocWwiOiJmZDE2M2EzMjVhYTIxY2RiIiwiZm9ybWF0IjoidGV4dCIsInRlbXBsYXRlIjoicXVlcnkgR2V0RGV2aWNlcyB7XG4gIGRldmljZXMge1xuICAgIGlkXG4gICAgbmFtZVxuICAgIHR5cGVcbiAgICBsb2NhdGlvblxuICAgIGxhc3RTZWVuU3RhdHVzXG4gICAgY3JlYXRlZEF0XG4gIH1cbn0iLCJzeW50YXgiOiJtdXN0YWNoZSIsInRva2VuIjoiIiwic2hvd0RlYnVnIjpmYWxzZSwieCI6NDUwLCJ5IjoxNDAsIndpcmVzIjpbWyJmZGNjMTVmNjg4NzJiNGQwIl0sWyJiZWI2M2FiZDkyZjE1NWNlIl1dfSx7ImlkIjoiNTcyYWE5ZTY1OWY1ZTI3ZSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IiIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyNzAsInkiOjE0MCwid2lyZXMiOltbIjY2ZDAxN2IxNGVkOGM2MGQiXV19LHsiaWQiOiI2ZDRmOWEyY2IxNTlkOGU1IiwidHlwZSI6ImdyYXBocWwiLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IkNyZWF0ZSBEZXZpY2UiLCJncmFwaHFsIjoiZmQxNjNhMzI1YWEyMWNkYiIsImZvcm1hdCI6InRleHQiLCJ0ZW1wbGF0ZSI6Im11dGF0aW9uIENyZWF0ZURldmljZSgkaW5wdXQ6IERldmljZUlucHV0ISkge1xuICBjcmVhdGVEZXZpY2UoaW5wdXQ6ICRpbnB1dCkge1xuICAgIGlkXG4gICAgbmFtZVxuICAgIHR5cGVcbiAgICBtb2RlbFxuICAgIGxvY2F0aW9uXG4gICAgY3JlYXRlZEF0XG4gICAgc3VjY2Vzc1xuICAgIGVycm9ycyB7XG4gICAgICBmaWVsZFxuICAgICAgbWVzc2FnZVxuICAgIH1cbiAgfVxufSIsInN5bnRheCI6Im11c3RhY2hlIiwidG9rZW4iOiIiLCJzaG93RGVidWciOmZhbHNlLCJ4Ijo0NjAsInkiOjM0MCwid2lyZXMiOltbImY1NTI3ZTE3OWUxYzg5MTEiXSxbIjlmYzcwZThmODcxNWY5OTQiXV19LHsiaWQiOiJlMGI4OWJmMGE0N2RiYWUzIiwidHlwZSI6ImluamVjdCIsInoiOiI5OGE2MGI2ZGQwODk2ZTQ3IiwiZyI6IjlhMGMyODkwMjk4OWI3MzkiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJ2YXJpYWJsZXMiLCJ2Ijoie1wiaW5wdXRcIjp7XCJuYW1lXCI6XCJTbWFydCBUaGVybW9zdGF0XCIsXCJ0eXBlXCI6XCJDb250cm9sbGVyXCIsXCJtb2RlbFwiOlwiTmVzdCBWM1wiLFwibG9jYXRpb25cIjpcIk9mZmljZSBBcmVhXCJ9fSIsInZ0IjoianNvbiJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyNzAsInkiOjM0MCwid2lyZXMiOltbIjZkNGY5YTJjYjE1OWQ4ZTUiXV19LHsiaWQiOiJmZGNjMTVmNjg4NzJiNGQwIiwidHlwZSI6ImRlYnVnIiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjkwLCJ5IjoxMjAsIndpcmVzIjpbXX0seyJpZCI6ImJlYjYzYWJkOTJmMTU1Y2UiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IkVycm9yIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjY5MCwieSI6MTYwLCJ3aXJlcyI6W119LHsiaWQiOiIxNTE1Y2JhZDk4MzU1YzVmIiwidHlwZSI6ImRlYnVnIiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjkwLCJ5IjoyMjAsIndpcmVzIjpbXX0seyJpZCI6IjBjNDA2OGJkMTgyMTkyM2IiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IkVycm9yIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjY5MCwieSI6MjYwLCJ3aXJlcyI6W119LHsiaWQiOiJmNTUyN2UxNzllMWM4OTExIiwidHlwZSI6ImRlYnVnIiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjkwLCJ5IjozMjAsIndpcmVzIjpbXX0seyJpZCI6IjlmYzcwZThmODcxNWY5OTQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IkVycm9yIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjY5MCwieSI6MzYwLCJ3aXJlcyI6W119LHsiaWQiOiJlMGQyNzM5YzU1Mzg2NjQ0IiwidHlwZSI6ImdyYXBocWwiLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IkNyZWF0ZSBEZXZpY2UiLCJncmFwaHFsIjoiZmQxNjNhMzI1YWEyMWNkYiIsImZvcm1hdCI6InRleHQiLCJ0ZW1wbGF0ZSI6Im11dGF0aW9uIENyZWF0ZURldmljZSgkaW5wdXQ6IERldmljZUlucHV0ISkge1xuICBjcmVhdGVEZXZpY2UoaW5wdXQ6ICRpbnB1dCkge1xuICAgIGlkXG4gICAgbmFtZVxuICAgIHR5cGVcbiAgICBtb2RlbFxuICAgIGxvY2F0aW9uXG4gICAgY3JlYXRlZEF0XG4gICAgc3VjY2Vzc1xuICAgIGVycm9ycyB7XG4gICAgICBmaWVsZFxuICAgICAgbWVzc2FnZVxuICAgIH1cbiAgfVxufSIsInN5bnRheCI6Im11c3RhY2hlIiwidG9rZW4iOiIiLCJzaG93RGVidWciOmZhbHNlLCJ4Ijo0NjAsInkiOjQ0MCwid2lyZXMiOltbImY1YzJlMDM0NmI0OTc5YWEiXSxbIjU5N2JhYzQ5OTM4Y2Q3YmMiXV19LHsiaWQiOiJiNDU0MjJjOGJmZmFhNTJkIiwidHlwZSI6ImluamVjdCIsInoiOiI5OGE2MGI2ZGQwODk2ZTQ3IiwiZyI6IjlhMGMyODkwMjk4OWI3MzkiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJ2YXJpYWJsZXMiLCJ2Ijoie1wiaW5wdXRcIjp7XCJuYW1lXCI6XCJTbWFydCBUaGVybW9zdGF0XCIsXCJ0eXBlXCI6XCJDb250cm9sbGVyXCIsXCJtb2RlbFwiOlwiTmVzdCBWM1wiLFwibG9jYXRpb25cIjpcIk9mZmljZSBBcmVhXCJ9fSIsInZ0IjoianNvbiJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyNzAsInkiOjQ0MCwid2lyZXMiOltbImUwZDI3MzljNTUzODY2NDQiXV19LHsiaWQiOiJmNWMyZTAzNDZiNDk3OWFhIiwidHlwZSI6ImRlYnVnIiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjkwLCJ5Ijo0MjAsIndpcmVzIjpbXX0seyJpZCI6IjU5N2JhYzQ5OTM4Y2Q3YmMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IkVycm9yIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjY5MCwieSI6NDYwLCJ3aXJlcyI6W119LHsiaWQiOiJkYWUxOGMxMThiNWE3ZDI1IiwidHlwZSI6ImdyYXBocWwiLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IlVwZGF0ZSBEZXZpY2UiLCJncmFwaHFsIjoiZmQxNjNhMzI1YWEyMWNkYiIsImZvcm1hdCI6InRleHQiLCJ0ZW1wbGF0ZSI6Im11dGF0aW9uIFVwZGF0ZURldmljZSgkaWQ6IElEISwgJGlucHV0OiBEZXZpY2VVcGRhdGVJbnB1dCEpIHtcbiAgdXBkYXRlRGV2aWNlKGlkOiAkaWQsIGlucHV0OiAkaW5wdXQpIHtcbiAgICBpZFxuICAgIG5hbWVcbiAgICBsb2NhdGlvblxuICAgIGxhc3RTZWVuU3RhdHVzXG4gICAgdXBkYXRlZEF0XG4gICAgc3VjY2Vzc1xuICB9XG59Iiwic3ludGF4IjoibXVzdGFjaGUiLCJ0b2tlbiI6IiIsInNob3dEZWJ1ZyI6ZmFsc2UsIngiOjQ2MCwieSI6NTQwLCJ3aXJlcyI6W1siODM3MmM1M2ZkMzc0Y2EwYyJdLFsiODFlZTI3ZDVkMDAyY2RmNyJdXX0seyJpZCI6IjA2ZTcxNTQ3NmQ0YTA1YTEiLCJ0eXBlIjoiaW5qZWN0IiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InZhcmlhYmxlcyIsInYiOiJ7ICAgXCJpZFwiOiBcIjFcIiwgICBcImlucHV0XCI6IHsgICAgIFwibG9jYXRpb25cIjogXCJGYWN0b3J5IEZsb29yIDNcIiwgICAgIFwibGFzdFNlZW5TdGF0dXNcIjogXCJNYWludGVuYW5jZVwiICAgfSB9IiwidnQiOiJqc29uIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjI3MCwieSI6NTQwLCJ3aXJlcyI6W1siZGFlMThjMTE4YjVhN2QyNSJdXX0seyJpZCI6IjgzNzJjNTNmZDM3NGNhMGMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2OTAsInkiOjUyMCwid2lyZXMiOltdfSx7ImlkIjoiODFlZTI3ZDVkMDAyY2RmNyIsInR5cGUiOiJkZWJ1ZyIsInoiOiI5OGE2MGI2ZGQwODk2ZTQ3IiwiZyI6IjlhMGMyODkwMjk4OWI3MzkiLCJuYW1lIjoiRXJyb3IiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjkwLCJ5Ijo1NjAsIndpcmVzIjpbXX0seyJpZCI6ImI1OTQ3NjIyMWUxMzU1NzkiLCJ0eXBlIjoiZ3JhcGhxbCIsInoiOiI5OGE2MGI2ZGQwODk2ZTQ3IiwiZyI6IjlhMGMyODkwMjk4OWI3MzkiLCJuYW1lIjoiRGVhY3RpdmF0ZSBEZXZpY2UiLCJncmFwaHFsIjoiZmQxNjNhMzI1YWEyMWNkYiIsImZvcm1hdCI6InRleHQiLCJ0ZW1wbGF0ZSI6Im11dGF0aW9uIERlYWN0aXZhdGVEZXZpY2UoJGlkOiBJRCEpIHtcbiAgZGVhY3RpdmF0ZURldmljZShpZDogJGlkKSB7XG4gICAgaWRcbiAgICBpc0FjdGl2ZVxuICAgIGRlYWN0aXZhdGVkQXRcbiAgICBzdWNjZXNzXG4gIH1cbn0iLCJzeW50YXgiOiJtdXN0YWNoZSIsInRva2VuIjoiIiwic2hvd0RlYnVnIjpmYWxzZSwieCI6NDcwLCJ5Ijo2NDAsIndpcmVzIjpbWyJiYzBiNTA2N2M5YjY0YjRhIl0sWyI5YmNkNzhjNDRiMmQzMDRhIl1dfSx7ImlkIjoiMmY0NWJhNjQxZWE4ZDI3MiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoidmFyaWFibGVzIiwidiI6InsgICBcImlkXCI6IFwiNFwiIH0iLCJ2dCI6Impzb24ifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjcwLCJ5Ijo2NDAsIndpcmVzIjpbWyJiNTk0NzYyMjFlMTM1NTc5Il1dfSx7ImlkIjoiYmMwYjUwNjdjOWI2NGI0YSIsInR5cGUiOiJkZWJ1ZyIsInoiOiI5OGE2MGI2ZGQwODk2ZTQ3IiwiZyI6IjlhMGMyODkwMjk4OWI3MzkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjY5MCwieSI6NjIwLCJ3aXJlcyI6W119LHsiaWQiOiI5YmNkNzhjNDRiMmQzMDRhIiwidHlwZSI6ImRlYnVnIiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiJFcnJvciIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2OTAsInkiOjY2MCwid2lyZXMiOltdfSx7ImlkIjoiN2Q3ZTY2ODlmMGM0MmZhYyIsInR5cGUiOiJncmFwaHFsIiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiJmcmFnbWVudCIsImdyYXBocWwiOiJmZDE2M2EzMjVhYTIxY2RiIiwiZm9ybWF0IjoidGV4dCIsInRlbXBsYXRlIjoiZnJhZ21lbnQgRGV2aWNlQmFzaWNJbmZvIG9uIERldmljZSB7XG4gIGlkXG4gIG5hbWVcbiAgdHlwZVxuICBsb2NhdGlvblxuICBjcmVhdGVkQXRcbn1cblxuZnJhZ21lbnQgRGV2aWNlT3BlcmF0aW9uYWxJbmZvIG9uIERldmljZSB7XG4gIC4uLkRldmljZUJhc2ljSW5mb1xuICBsYXN0U2VlblN0YXR1c1xuICBsYXN0U2VlbkF0XG4gIG1haW50ZW5hbmNlRHVlXG59XG5cbnF1ZXJ5IEdldERldmljZVByb2ZpbGUoJGRldmljZUlkOiBJRCEpIHtcbiAgZGV2aWNlKGlkOiAkZGV2aWNlSWQpIHtcbiAgICAuLi5EZXZpY2VPcGVyYXRpb25hbEluZm9cbiAgfVxufSIsInN5bnRheCI6Im11c3RhY2hlIiwidG9rZW4iOiIiLCJzaG93RGVidWciOmZhbHNlLCJ4Ijo0NDAsInkiOjc0MCwid2lyZXMiOltbImU4MTgwNjBjMDAwODc5MzAiXSxbIjYyMWI3MzIyNDU2NzFmMmYiXV19LHsiaWQiOiJhYzM3Yjc1NDBlNTM2MjU1IiwidHlwZSI6ImluamVjdCIsInoiOiI5OGE2MGI2ZGQwODk2ZTQ3IiwiZyI6IjlhMGMyODkwMjk4OWI3MzkiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJ2YXJpYWJsZXMiLCJ2IjoieyAgIFwiZGV2aWNlSWRcIjogXCI0XCIgfSIsInZ0IjoianNvbiJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyNzAsInkiOjc0MCwid2lyZXMiOltbIjdkN2U2Njg5ZjBjNDJmYWMiXV19LHsiaWQiOiJlODE4MDYwYzAwMDg3OTMwIiwidHlwZSI6ImRlYnVnIiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjkwLCJ5Ijo3MjAsIndpcmVzIjpbXX0seyJpZCI6IjYyMWI3MzIyNDU2NzFmMmYiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IkVycm9yIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjY5MCwieSI6NzYwLCJ3aXJlcyI6W119LHsiaWQiOiJmOTliYWE2OTkxOGQyYTlhIiwidHlwZSI6ImdyYXBocWwiLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IlBhZ2luYXRpb24iLCJncmFwaHFsIjoiZmQxNjNhMzI1YWEyMWNkYiIsImZvcm1hdCI6InRleHQiLCJ0ZW1wbGF0ZSI6InF1ZXJ5IEdldERldmljZXNQYWdpbmF0ZWQoJGxpbWl0OiBJbnQgPSAxMCwgJG9mZnNldDogSW50ID0gMCwgJHNlYXJjaFRlcm06IFN0cmluZykge1xuICBkZXZpY2VzKGxpbWl0OiAkbGltaXQsIG9mZnNldDogJG9mZnNldCwgc2VhcmNoOiAkc2VhcmNoVGVybSkge1xuICAgIGlkXG4gICAgbmFtZVxuICAgIHR5cGVcbiAgICBsb2NhdGlvblxuICAgIGxhc3RTZWVuU3RhdHVzXG4gICAgY3JlYXRlZEF0XG4gICAgbGFzdFNlZW5BdFxuICB9XG4gIGRldmljZUNvdW50KHNlYXJjaDogJHNlYXJjaFRlcm0pXG59Iiwic3ludGF4IjoibXVzdGFjaGUiLCJ0b2tlbiI6IiIsInNob3dEZWJ1ZyI6ZmFsc2UsIngiOjQ1MCwieSI6ODQwLCJ3aXJlcyI6W1siMzY4ZmJkM2Q0Zjc1NmI2YSJdLFsiY2MxZWY5ZDg4MTA2NTA4MiJdXX0seyJpZCI6IjUwOWFmMTc3YzQ4MGVkMDMiLCJ0eXBlIjoiaW5qZWN0IiwieiI6Ijk4YTYwYjZkZDA4OTZlNDciLCJnIjoiOWEwYzI4OTAyOTg5YjczOSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InZhcmlhYmxlcyIsInYiOiJ7ICAgXCJkZXZpY2VJZFwiOiBcIjRcIiB9IiwidnQiOiJqc29uIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjI3MCwieSI6ODQwLCJ3aXJlcyI6W1siZjk5YmFhNjk5MThkMmE5YSJdXX0seyJpZCI6IjM2OGZiZDNkNGY3NTZiNmEiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOThhNjBiNmRkMDg5NmU0NyIsImciOiI5YTBjMjg5MDI5ODliNzM5IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2OTAsInkiOjgyMCwid2lyZXMiOltdfSx7ImlkIjoiY2MxZWY5ZDg4MTA2NTA4MiIsInR5cGUiOiJkZWJ1ZyIsInoiOiI5OGE2MGI2ZGQwODk2ZTQ3IiwiZyI6IjlhMGMyODkwMjk4OWI3MzkiLCJuYW1lIjoiRXJyb3IiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjkwLCJ5Ijo4NjAsIndpcmVzIjpbXX0seyJpZCI6ImZkMTYzYTMyNWFhMjFjZGIiLCJ0eXBlIjoiZ3JhcGhxbC1zZXJ2ZXIiLCJuYW1lIjoiIiwiZW5kcG9pbnQiOiJub25lIiwidG9rZW4iOiIifSx7ImlkIjoiNTc0NTA0Mzk2ODgxYWE4NSIsInR5cGUiOiJnbG9iYWwtY29uZmlnIiwiZW52IjpbXSwibW9kdWxlcyI6eyJub2RlLXJlZC1jb250cmliLWdyYXBocWwiOiIyLjIuMCJ9fV0="
---
::


