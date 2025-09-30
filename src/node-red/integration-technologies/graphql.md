---
eleventyNavigation:
  key: GraphQL API
  parent: "Integration Technologies"
meta:
   title: Integrating GraphQL APIs in Node-RED
   description: Learn how to integrate GraphQL APIs in Node-RED. This guide covers setting up endpoints, executing queries, handling variables, and using mutations for dynamic data.
   keywords: node-red, flowfuse, graphql api, queries, mutations
---

# {{meta.title}}

GraphQL is transforming the way APIs are designed. Unlike traditional REST APIs, which often require multiple requests to different endpoints, GraphQL provides a single, flexible endpoint that allows you to fetch exactly the data you need—nothing more, nothing less. In this article, you will learn how to integrate GraphQL with Node-RED and build APIs that efficiently serve your application’s data requirements.

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
   - **Token**: Add authentication if required (Bearer tokens are most common)

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

The debug panel will display an array of country objects, each containing exactly the fields you requested. This demonstrates GraphQL's precision in data fetching.

## Working with Dynamic Data

Static queries are useful for learning, but real applications need dynamic data. GraphQL provides two excellent approaches for this.

### Method 1: Mustache Templates (Simple Approach)

For straightforward use cases, you can inject data directly into your queries using Mustache syntax:

```graphql
query GetSpecificCountry {
  country(code: "{{countryCode}}") {
    name
    capital
    currency
    emoji
  }
}
```

**Setup your input message:**
```javascript
msg.payload = {
  countryCode: "FR"
};
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

## Modifying Data with Mutations

While queries retrieve data, mutations allow you to **create, update, or delete data**—similar to POST, PUT, and DELETE operations in REST APIs.

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

## Example: Complete Device Management System

Here's how you might structure a comprehensive **device management** in GraphQL:

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

*This query supports pagination and search, useful when managing large fleets of devices.*

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

When queries start to grow, you’ll often find yourself requesting the same fields across multiple operations. Fragments let you define those fields once and reuse them, keeping queries clean and consistent.

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
